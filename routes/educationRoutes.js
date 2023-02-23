const express = require("express");
const router = express.Router();

const { authenticateUser, authorizeRoles } = require("../middlewares/fullAuth");

const {
  createEducation,
  getAllEducation,
  updateEducation,
} = require("../controllers/educationController");

router.route("/createEducation").post(authenticateUser, createEducation);
router.route("/getAllEducation").get(authenticateUser, getAllEducation);
router.route("/updateEducation/:id").patch(authenticateUser, updateEducation);

module.exports = router;
