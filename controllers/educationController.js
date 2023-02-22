const Education = require("../models/educationModel");

const createEducation = async (req, res) => {
  const education = await Education.create({
    jobTitle: req.body.jobTitle,
    companyName: req.body.companyName,
    jobDescription: req.body.jobDescription,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    userId: req.user,
  });

  res.status(201).json({
    msg: "Education created",
    data: education,
  });
};

const getAllEducation = async (req, res) => {
  const education = await Education.findById(req.user);

  res.status(200).json({
    msg: "Fetched Successfully",
    result: education.length,
    data: education,
  });
};

const updateEducation = async (req, res) => {
  const education = await Education.findByIdAndUpdate(req.user, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    msg: "Education Updated",
    data: education,
  });
};

// const deleteEducation= async (req, res) => {
//   await Education.findByIdAndUpdate(req.user, { isTrash: true });

//   res.status(200).json({
//     msg: "Deleted Successfully",
//   });
// };

module.exports = {
  createEducation,
  getAllEducation,
  updateEducation,
  // deleteWorkExperience,
};
