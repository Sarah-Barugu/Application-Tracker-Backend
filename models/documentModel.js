const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  documentName: {
    type: String,
  },
  uploadFile: {
    type: String,
  },
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
