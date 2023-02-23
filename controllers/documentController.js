const Document = require("../models/documentModel");

const createDocument = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({
        msg: "No File Uploaded",
      });
    }
    const userDocs = req.files.image;

    if (!userDocs.mimetype.startsWith("image")) {
      return res.status(400).json({
        msg: "Please Upload Your Document",
      });
    }

    const maxSize = 1024 * 1024 * 5;

    if (userDocs.size > maxSize) {
      return res.status(400).json({
        msg: "Please upload image smaller than 5MB",
      });
    }

    const docsPath = path.join(
      __dirname,
      "../public/uploadDocs/" + `${userDocs.name}`
    );
    await userDocs.mv(docsPath);

    const document = await Document.create({
      documentName: req.body.documentName,
      uploadFile: docsPath,
      userId: req.user,
    });

    if (req.file) req.body.uploadFile = userDocs;

    res.status(201).json({
      msg: "Document created",
      data: document,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const getAllDocuments = async (req, res) => {
  try {
    const document = await Document.find({ userId: req.user });

    res.status(200).json({
      msg: "Fetched Successfully",
      resultQuantity: document.length,
      data: document,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = {
  createDocument,
  getAllDocuments,
};
