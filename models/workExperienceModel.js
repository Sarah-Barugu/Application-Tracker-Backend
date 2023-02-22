const mongoose = require("mongoose");

const workExperienceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  jobTitle: {
    type: String,
  },
  companyName: {
    type: String,
  },
  jobDescription: {
    type: String,
  },
  startDate: {
    type: Number,
  },
  endDate: {
    type: Number,
  },
});

const Work = mongoose.model("Work", workExperienceSchema);

exports.module = Work;
