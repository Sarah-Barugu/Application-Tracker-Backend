const Work = require("../models/workExperienceModel");

const createWorkExperience = async (req, res) => {
  const work = await Work.create({
    jobTitle: req.body.jobTitle,
    companyName: req.body.companyName,
    jobDescription: req.body.jobDescription,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    userId: req.user,
  });

  res.status(201).json({
    msg: "Work experience created",
    data: work,
  });
};

const getAllWorkExperience = async (req, res) => {
  const work = await Work.findById(req.user);

  res.status(200).json({
    msg: "Fetched Successfully",
    result: work.length,
    data: work,
  });
};

const updateWorkExperience = async (req, res) => {
  const work = await Work.findByIdAndUpdate(req.user, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    msg: "Experience Updated",
    data: work,
  });
};

// const deleteWorkExperience = async (req, res) => {
//   await Work.findByIdAndUpdate(req.user, { isTrash: true });

//   res.status(200).json({
//     msg: "Deleted Successfully",
//   });
// };

module.exports = {
  createWorkExperience,
  getAllWorkExperience,
  updateWorkExperience,
  // deleteWorkExperience,
};
