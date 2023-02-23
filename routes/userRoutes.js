const express = require("express");
const router = express.Router();

const { authenticateUser, authorizeRoles } = require("../middlewares/fullAuth");

const {
  getMyAccount,
  getAllUsers,
  getSingleUser,
  updateProfile,
  deleteUser,
} = require("../controllers/userController");

router.route("/getMyAccount").get(authenticateUser, getMyAccount);
router
  .route("/getAllUsers")
  .get(authenticateUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/getSingleUser/:id")
  .get(authenticateUser, authorizeRoles("admin"), getSingleUser);
router.route("/updateProfile").patch(authenticateUser, updateProfile);
router.route("/deleteUser").delete(authenticateUser, deleteUser);

module.exports = router;
