const User = require("../models/userModel");
const path = require("path");
const { StatusCodes } = require("http-status-codes");

const getMyAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.status(StatusCodes.OK).json({ msg: "My Account", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({ role: "user" });
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    res.status(StatusCodes.OK).json({
      msg: "Successful",
      resultQuantity: user.length,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        msg: `No User with id: ${req.params.id}`,
      });
    }

    res.status(StatusCodes.OK).json({
      msg: "successful",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({
        msg: "No picture Uploaded",
      });
    }
    const userImage = req.files.image;

    if (!userImage.mimetype.startsWith("image")) {
      return res.status(400).json({
        msg: "Please Upload Your profile picture",
      });
    }

    const maxSize = 1024 * 1024;

    if (userImage.size > maxSize) {
      return res.status(400).json({
        msg: "Please upload image smaller than 1MB",
      });
    }

    const imagePath = path.join(
      __dirname,
      "../public/userProfile/" + `${userImage.name}`
    );
    await userImage.mv(imagePath);

    // 3) update user document
    const updateUser = await User.findByIdAndUpdate(
      req.user,
      {
        fullName: req.body.fullName,
        emailAddress: req.body.emailAddress,
        phone: req.body.phone,
        address: req.body.address,
        location: req.body.location,
        gender: req.body.gender,
        birthday: req.body.birthday,
        skills: req.body.skills,
        tools: req.body.tools,
        profilePhoto: imagePath,
        aboutMe: req.body.aboutMe,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(StatusCodes.OK).json({
      status: "success",
      data: {
        user: updateUser,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user, { isDeleted: true });

    res.status(StatusCodes.OK).json({
      status: "delete successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = {
  getMyAccount,
  getAllUsers,
  getSingleUser,
  updateProfile,
  deleteUser,
};
