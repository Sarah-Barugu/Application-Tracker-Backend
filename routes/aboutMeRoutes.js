const express = require("express");
const router = express.Router();

const { authenticateUser, authorizeRoles } = require("../middlewares/fullAuth");

const {
  createAboutMe,
  getAboutMe,
  updateAboutMe,
} = require("../controllers/aboutMeController");

router.route("/createAboutMe").post(authenticateUser, createAboutMe);
router.route("/getAboutMe").get(authenticateUser, getAboutMe);
router.route("/updateAboutMe").patch(authenticateUser, updateAboutMe);

module.exports = router;
