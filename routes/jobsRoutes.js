const express = require("express");
const router = express.Router();

const { authenticateUser, authorizeRoles } = require("../middlewares/fullAuth");

const {
  createJobs,
  getAllJobs,
  updateJobs,
  deleteJobs,
  getAllJobsHistory,
} = require("../controllers/jobsController");

router
  .route("/createJobs")
  .post(authenticateUser, authorizeRoles("admin"), createJobs);
router.route("/getJobs").get(authenticateUser, getAllJobs);
router
  .route("/updateJobs/:id")
  .patch(authenticateUser, authorizeRoles("admin"), updateJobs);
router
  .route("/deleteJobs/:id")
  .delete(authenticateUser, authorizeRoles("admin"), deleteJobs);
router.route("/getAllJobsHistory").get(authenticateUser, getAllJobsHistory);

module.exports = router;
