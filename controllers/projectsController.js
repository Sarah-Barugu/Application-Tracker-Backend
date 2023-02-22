const Projects = require("../models/projectsModel");

const createProject = async (req, res) => {
  const project = await Projects.create({
    projectTitle: req.body.projectTitle,
    projectLink: req.body.projectLink,
    projectDescription: req.body.projectDescription,
    userId: req.user,
  });

  res.status(201).json({
    msg: "Project created",
    data: project,
  });
};

const getAllProjects = async (req, res) => {
  const project = await Projects.findById(req.user);

  res.status(200).json({
    msg: "Fetched Successfully",
    result: project.length,
    data: project,
  });
};

const updateProject = async (req, res) => {
  const project = await Projects.findByIdAndUpdate(req.user, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    msg: "Project Updated",
    data: project,
  });
};

// const deleteProject = async (req, res) => {
//   await Projects.findByIdAndUpdate(req.user, { isTrash: true });

//   res.status(200).json({
//     msg: "Deleted Successfully",
//   });
// };

module.exports = {
  createProject,
  getAllProjects,
  updateProject,
  // deleteProject,
};
