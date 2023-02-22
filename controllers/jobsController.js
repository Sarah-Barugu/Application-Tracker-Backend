const Jobs = require("../models/jobsModel");

const createJobs = async (req, res) => {
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
};

const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find();

  res.status(200).json({
    msg: "Fetched Successfully",
    result: jobs.length,
    data: jobs,
  });
};

const updateJobs = async (req, res) => {
  const jobs = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    msg: "job Updated",
    data: jobs,
  });
};

const deleteJobs = async (req, res) => {
  await Jobs.findByIdAndUpdate(req.params.id, { isTrash: true });

  res.status(200).json({
    msg: "Deleted Successfully",
  });
};

const getAllJobsHistory = async (req, res) => {
  const jobs = await Jobs.find();

  res.status(200).json({
    msg: "Fetched Successfully",
    result: jobs.length,
    data: jobs,
  });
};

module.exports = {
  createJobs,
  getAllJobs,
  updateJobs,
  deleteJobs,
  getAllJobsHistory,
};
