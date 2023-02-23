const Jobs = require("../models/jobsModel");

const createJobs = async (req, res) => {
  try {
    const jobs = await Jobs.create({
      companyLogo: req.body.companyLogo,
      companyName: req.body.companyName,
      jobRole: req.body.jobRole,
      location: req.body.location,
      salary: req.body.salary,
      skills: req.body.skills,
      jobDescription: req.body.jobDescription,
      responsibilities: req.body.responsibilities,
      qualifications: req.body.qualifications,
      requiredEducationalLevel: req.body.requiredEducationalLevel,
      experienceLevel: req.body.experienceLevel,
      jobType: req.body.jobType,
      jobRoleType: req.body.jobRoleType,
    });

    res.status(201).json({
      msg: "Job Created",
      data: jobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

// const getAllJobs = async (req, res) => {
//   const jobs = await Jobs.find();

//   res.status(200).json({
//     msg: "Fetched Successfully",
//     result: jobs.length,
//     data: jobs,
//   });
// };

const getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalJobs = await Jobs.countDocuments();
    const totalPages = Math.ceil(totalJobs / limit);

    const jobs = await Jobs.find().skip(startIndex).limit(limit);

    res.status(200).json({
      msg: "Fetched Successfully",
      resultQuantity: jobs.length,
      data: jobs,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
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

const updateJobs = async (req, res) => {
  try {
    const jobs = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      msg: "job Updated",
      data: jobs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const deleteJobs = async (req, res) => {
  try {
    await Jobs.findByIdAndUpdate(req.params.id, { isDeleted: true });

    res.status(200).json({
      msg: "Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const getAllJobsHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalJobs = await Jobs.countDocuments();
    const totalPages = Math.ceil(totalJobs / limit);

    const jobs = await Jobs.find().skip(startIndex).limit(limit);

    res.status(200).json({
      msg: "History Fetched Successfully",
      resultQuantity: jobs.length,
      data: jobs,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
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

module.exports = {
  createJobs,
  getAllJobs,
  updateJobs,
  deleteJobs,
  getAllJobsHistory,
};
