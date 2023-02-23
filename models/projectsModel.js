const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  projectTitle: {
    type: String,
  },
  projectLink: {
    type: String,
  },
  projectDescription: {
    type: String,
  },
});

const Projects = mongoose.model("Projects", projectsSchema);

module.exports = Projects;
