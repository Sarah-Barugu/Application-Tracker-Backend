const Jobs = require("../models/jobsModel");
const JobsApplied = require("../models/jobsAppliedModel");

const createJobsApplied = async (req, res) => {
  try {
    const userId = req.user;
    const jobId = req.params.id;

    // Check if the job exists
    const job = await Jobs.findById(jobId);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    // Check if the user has already applied for the job
    if (job.usersApplied.map(String).includes(String(userId.id))) {
      return res
        .status(400)
        .json({ msg: "You have already applied for this job" });
    } else {
      console.log(userId, job.usersApplied[0]);
      // Add the user to the list of users who have applied for the job
      job.usersApplied.push(userId);
      await job.save();
    }

    // Check if a JobsApplied document exists for the user
    let jobsApplied = await JobsApplied.findOne({ userId });
    if (!jobsApplied) {
      // If a JobsApplied document does not exist, create one
      jobsApplied = await JobsApplied.create({ userId, jobsId: [] });
    }

    // Check if the job already exists in the user's JobsApplied document
    if (jobsApplied.jobsId.includes(jobId)) {
      return res
        .status(400)
        .json({ msg: "You have already applied for this job" });
    }

    // Add the job to the list of jobs the user has applied for
    jobsApplied.jobsId.push(jobId);
    await jobsApplied.save();

    return res.status(200).json({ msg: "Job applied successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

// const getAllAppliedJobs = async (req, res) => {
//   const userJobsApplied = await JobsApplied.findOne({ userId: req.user });

//   if (!userJobsApplied) {
//     return res.status(404).json({
//       msg: "No applied jobs found for this user",
//     });
//   }

//   const appliedJobIds = userJobsApplied.jobsId;

//   const jobs = await Jobs.find({ _id: { $in: appliedJobIds } });

//   if (!jobs) {
//     return res.status(404).json({
//       msg: "No jobs found for the applied job ids",
//     });
//   }

//   res.status(200).json({
//     msg: "Jobs Applied Fetched",
//     result: jobs.length,
//     data: jobs,
//   });
// };

const getAllAppliedJobs = async (req, res) => {
  try {
    const userJobsApplied = await JobsApplied.findOne({ userId: req.user });

    if (!userJobsApplied) {
      return res.status(404).json({
        msg: "No applied jobs found for this user",
      });
    }

    const appliedJobIds = userJobsApplied.jobsId;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const jobs = await Jobs.find({ _id: { $in: appliedJobIds } })
      .skip(startIndex)
      .limit(limit);

    const totalJobs = await Jobs.countDocuments({
      _id: { $in: appliedJobIds },
    });
    const totalPages = Math.ceil(totalJobs / limit);

    if (!jobs) {
      return res.status(404).json({
        msg: "No jobs found for the applied job ids",
      });
    }

    res.status(200).json({
      msg: "Jobs Applied Fetched",
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

const getAllJobOffers = async (req, res) => {
  try {
    const userJobExist = await JobsApplied.findOne({ userId: req.user });

    const jobOffers = userJobExist.jobsId.map((job) => {
      job.status === "OFFERED";
    });

    res.json(200).json({
      msg: "Jobs offers Fetched",
      resultQuantity: jobOffers.length,
      data: jobOffers,
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
  createJobsApplied,
  getAllAppliedJobs,
  getAllJobOffers,
};
