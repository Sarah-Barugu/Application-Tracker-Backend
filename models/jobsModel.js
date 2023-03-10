const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  companyLogo: {
    type: String,
  },
  jobRole: {
    type: String,
  },
  location: {
    type: String,
  },
  salary: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
  postedAt: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
    select: false,
  },
  jobDescription: {
    type: String,
  },
  responsibilities: {
    type: String,
  },
  qualifications: {
    type: String,
  },
  requiredEducationalLevel: {
    type: String,
  },
  experienceLevel: {
    type: String,
  },
  jobType: {
    type: String,
  },
  jobRoleType: {
    type: String,
  },
  status: {
    type: String,
    enum: ["OPEN", "CLOSED"],
    default: "OPEN",
  },
  usersApplied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
    },
  ],
});

jobsSchema.pre(/^find/, function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

const Jobs = mongoose.model("Jobs", jobsSchema);

module.exports = Jobs;
