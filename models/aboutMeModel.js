const mongoose = require("mongoose");

const aboutMeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  about: {
    type: String,
  },
});

const About = mongoose.model("About", aboutMeSchema);

exports.module = About;
