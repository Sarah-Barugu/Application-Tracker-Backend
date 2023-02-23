const {
  createOffer,
  getAllUserJobOffers,
  acceptOffer,
  declineOffer,
} = require("../controllers/jobOfferController");
const express = require("express");
const router = express.Router();
const { authenticateUser, authorizeRoles } = require("../middlewares/fullAuth");

router
  .route("/offerJob/:jobId/:userId")
  .post(authenticateUser, authorizeRoles("admin"), createOffer);
router
  .route("/declineOffer/:offerId")
  .post(authenticateUser, authorizeRoles("user"), declineOffer);
router
  .route("/acceptOffer/:offerId")
  .post(authenticateUser, authorizeRoles("user"), acceptOffer);
router
  .route("/userOffers")
  .get(authenticateUser, authorizeRoles("user"), getAllUserJobOffers);

module.exports = router;
