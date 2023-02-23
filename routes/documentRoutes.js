const express = require("express");
const router = express.Router();

const { authenticateUser, authorizeRoles } = require("../middlewares/fullAuth");

const {
  createDocument,
  getAllDocuments,
} = require("../controllers/documentController");

router.route("/createDocument").post(authenticateUser, createDocument);
router.route("/getAllDocuments").get(authenticateUser, getAllDocuments);

module.exports = router;
