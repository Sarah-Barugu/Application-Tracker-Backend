const User = require("../models/userModel");
const Email = require("../utils/email");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const createJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = createJWT(user._id);

  res.cookie("token", token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 1000 * 60 * 60 * 24
    ),
    httpOnly: true,
    secure: req.secure,
  });

  (user.password = undefined),
    res.status(statusCode).json({ msg: "success", token, data: { user } });
  // res.status(statusCode).json({ msg: 'success', token, data: {user}, name: user.name, userId: user._id, role: user.role})
};

//register user
const signUp = async (req, res) => {
  try {
    const { emailAddress } = req.body;
    const user = await User.findOne({ emailAddress });
    if (user) {
      return res.status(400).json({
        msg: "A user with this email already exist on our database",
      });
    }

    const newUser = await User.create({
      ...req.body,
      emailAddress,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    await new Email(newUser).sendWelcome();
    createSendToken(newUser, 201, req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    if (!emailAddress || !password) {
      return res.status(400).json({
        msg: "Please provide emailAddress and password",
      });
    }
    const user = await User.findOne({ emailAddress });

    if (!user) {
      return res.status(401).json({
        msg: "Invalid Credentials",
      });
    }
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        msg: "Invalid Credentials",
      });
    }

    createSendToken(user, 200, req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("token", "loggedout", {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });

    res.status(200).json({ msg: "logged-Out Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { emailAddress } = req.body;

    if (!emailAddress) {
      return res.status(400).json({
        msg: "Please provide your email",
      });
    }
    // 1) Get user based on Posted email
    const user = await User.findOne({ emailAddress });
    if (!user) {
      return res.status(404).json({
        msg: "Invalid email",
      });
    }
    // 2) Generate the random reset token

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
      const resetURL = `https://${req.get(
        "host"
      )}/api/v1/auth/resetPassword/${resetToken}`;
      await new Email(user, resetURL).sendPasswordReset();

      res.status(200).json({
        status: "success",
        message: "Token sent to email!",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(400).json({
        msg: "There was an error sending the email. Try again later!",
      });
      // return next(new AppError('There was an error sending the email. Try again later!'), 400);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return res.status(400).json({
        msg: "Token is invalid or has expired",
      });
      // return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    createSendToken(user, 200, req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = {
  signUp,
  login,
  logout,
  forgotPassword,
  changePassword,
};
