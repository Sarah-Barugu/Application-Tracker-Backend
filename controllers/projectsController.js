const Projects = require("../models/projectsModel");

const createProject = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const project = await Projects.find({ userId: req.user });

    res.status(200).json({
      msg: "Fetched Successfully",
      resultQuantity: project.length,
      data: project,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Projects.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      msg: "Project Updated",
      data: project,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

// const deleteProject = async (req, res) => {
//   await Projects.findByIdAndUpdate(req.user, { isDeleted: true });

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
