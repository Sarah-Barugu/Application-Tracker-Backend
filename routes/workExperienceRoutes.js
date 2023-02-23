const express = require("express");
const router = express.Router();

const { authenticateUser, authorizeRoles } = require("../middlewares/fullAuth");

const {
  createWorkExperience,
  getAllWorkExperience,
  updateWorkExperience,
} = require("../controllers/workExperienceController");

router
  .route("/createWorkExperience")
  .post(authenticateUser, createWorkExperience);
router
  .route("/getAllWorkExperience")
  .get(authenticateUser, getAllWorkExperience);
router
  .route("/updateWorkExperience/:id")
  .patch(authenticateUser, updateWorkExperience);

module.exports = router;
