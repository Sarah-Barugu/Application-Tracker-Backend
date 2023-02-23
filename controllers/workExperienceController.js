const Work = require("../models/workExperienceModel");

const createWorkExperience = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const getAllWorkExperience = async (req, res) => {
  try {
    const work = await Work.find({ userId: req.user });

    res.status(200).json({
      msg: "Fetched Successfully",
      resultQuantity: work.length,
      data: work,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const updateWorkExperience = async (req, res) => {
  try {
    const work = await Work.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      msg: "Experience Updated",
      data: work,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

// const deleteWorkExperience = async (req, res) => {
//   await Work.findByIdAndUpdate(req.user, { isDeleted: true });

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
