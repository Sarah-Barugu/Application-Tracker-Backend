const mongoose = require("mongoose");

const jobsAppliedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  jobsId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
    },
  ]
});

const JobsApplied = mongoose.model("JobsApplied", jobsAppliedSchema);

module.exports = JobsApplied;
