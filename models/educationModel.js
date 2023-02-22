const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  school: {
    type: String,
  },
  course: {
    type: String,
  },
  startDate: {
    type: Number,
  },
  endDate: {
    type: Number,
  },
});

const Education = mongoose.model("Education", educationSchema);

exports.module = Education;
