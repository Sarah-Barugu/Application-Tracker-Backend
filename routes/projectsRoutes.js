const express = require("express");
const router = express.Router();

const { authenticateUser, authorizeRoles } = require("../middlewares/fullAuth");

const {
  createProject,
  getAllProjects,
  updateProject,
} = require("../controllers/projectsController");

router.route("/createProject").post(authenticateUser, createProject);
router.route("/getAllProjects").get(authenticateUser, getAllProjects);
router.route("/updateProject/:id").patch(authenticateUser, updateProject);

module.exports = router;
