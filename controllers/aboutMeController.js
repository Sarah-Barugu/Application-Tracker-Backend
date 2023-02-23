const About = require("../models/aboutMeModel");

const createAboutMe = async (req, res) => {
  try {
    const about = await About.create({
      about: req.body.about,
      userId: req.user,
    });

    res.status(201).json({
      msg: "About Me created",
      data: about,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const getAboutMe = async (req, res) => {
  try {
    // const about = await About.findById(req.user);
    const about = await About.findOne({ userId: req.user });

    console.log(req.user);
    res.status(200).json({
      msg: "Fetched Successfully",
      // resultQuantity: about.length,
      data: about,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const updateAboutMe = async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      msg: "About Me Updated",
      data: about,
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
  createAboutMe,
  getAboutMe,
  updateAboutMe,
};
