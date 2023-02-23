const express = require("express");
const router = express.Router();

const { authenticateUser, authorizeRoles } = require("../middlewares/fullAuth");

const {
  signUp,
  login,
  logout,
  forgotPassword,
  changePassword,
} = require("../controllers/authController");

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").delete(authenticateUser, logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").post(changePassword);

module.exports = router;
