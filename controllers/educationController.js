const Education = require("../models/educationModel");

const createEducation = async (req, res) => {
  try {
    const education = await Education.create({
      school: req.body.school,
      course: req.body.course,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      userId: req.user,
    });

    res.status(201).json({
      msg: "Education created",
      data: education,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const getAllEducation = async (req, res) => {
  try {
    const education = await Education.find({ userId: req.user });

    res.status(200).json({
      msg: "Fetched Successfully",
      resultQuantity: education.length,
      data: education,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      msg: "Education Updated",
      data: education,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

// const deleteEducation= async (req, res) => {
//   await Education.findByIdAndUpdate(req.user, { isDeleted: true });

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
