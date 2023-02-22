const About = require("../models/aboutMeModel");

const createAboutMe = async (req, res) => {
  const about = await About.create({
    about: req.body.about,
    userId: req.user,
  });

  res.status(201).json({
    msg: "About Me created",
    data: about,
  });
};

const getAboutMe = async (req, res) => {
  const about = await About.findById(req.user);

  res.status(200).json({
    msg: "Fetched Successfully",
    result: about.length,
    data: about,
  });
};

const updateAboutMe = async (req, res) => {
  const about = await About.findByIdAndUpdate(req.user, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    msg: "About Me Updated",
    data: about,
  });
};

module.exports = {
  createAboutMe,
  getAboutMe,
  updateAboutMe,
};
