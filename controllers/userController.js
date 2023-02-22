const User = require("../models/userModel");
const path = require("path");
const { StatusCodes } = require("http-status-codes");

const getMyAccount = async (req, res) => {
  const user = await User.findById(req.user);
  res.status(StatusCodes.OK).json({ msg: "My Account", user });
};

const getAllUsers = async (req, res) => {
  const user = await User.find({ role: "user" });
  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  res.status(StatusCodes.OK).json({
    msg: "Successful",
    result: user.length,
    user,
  });
};

const getSingleUser = async (req, res) => {
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
};

const updateProfile = async (req, res) => {
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
    "../public/user/" + `${userImage.name}`
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
};

const deleteUser = async (req, res) => {
  await User.findByIdAndUpdate(req.user, { isTrash: true });

  res.status(StatusCodes.OK).json({
    status: "delete successful",
  });
};

module.exports = {
  getMyAccount,
  getAllUsers,
  getSingleUser,
  updateProfile,
  deleteUser,
};
