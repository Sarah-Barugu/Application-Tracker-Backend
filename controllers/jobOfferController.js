const JobOffer = require("../models/jobOffersModel");
const Jobs = require("../models/jobsModel");
const User = require("../models/userModel");

const createOffer = async (req, res) => {
  try {
    // Get the job and user from the database
    const job = await Jobs.findById(req.params.jobId);
    const user = await User.findById(req.params.userId);

    // Check if the job and user exist
    if (!job || !user) {
      return res.status(404).json({
        msg: "Job or user not found",
      });
    }

    // Check if an offer already exists for the given job and user IDs
    const existingOffer = await JobOffer.findOne({
      jobId: job._id,
      userId: user._id,
    });
    if (existingOffer) {
      return res.status(400).json({
        msg: "An offer for this job to this user already exists",
      });
    }

    // Create the job offer and save it to the database
    const offer = new JobOffer({
      jobId: job._id,
      userId: user._id,
    });
    await offer.save();

    return res.status(200).json({
      msg: "Offer has been sent",
      data: offer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

// const getAllUserJobOffers = async (req, res) => {
//   try {
//     // Get the job offers where the user id equals the id of the current logged in user
//     const jobOffers = await JobOffer.find({userId: req.user})

//     if (!jobOffers) {
//       return res.status(400).json({
//         msg: 'You have no job Offers yet'
//       })
//     }

//     return res.status(200).json({
//       msg: 'Here are your job offers',
//       data: jobOffers
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       msg: 'Internal server error'
//     });
//   }
// }

const getAllUserJobOffers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Get the job offers where the user id equals the id of the current logged in user
    const jobOffers = await JobOffer.find({ userId: req.user })
      .populate(["userId", "jobId"])
      .skip(startIndex)
      .limit(limit);

    const totalJobOffers = await JobOffer.countDocuments({ userId: req.user });
    const totalPages = Math.ceil(totalJobOffers / limit);

    if (!jobOffers) {
      return res.status(400).json({
        msg: "You have no job Offers yet",
      });
    }

    return res.status(200).json({
      msg: "Here are your job offers",
      resultQuantity: jobOffers.length,
      data: jobOffers,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const acceptOffer = async (req, res) => {
  try {
    // Get the job offer and the user from the database
    const offer = await JobOffer.findById(req.params.offerId);

    // Check if the offer and user exist
    if (!offer) {
      return res.status(404).json({
        msg: "Offer or user not found",
      });
    }

    // Check if the user is the one to whom the offer was made
    if (offer.userId.toString() !== req.user._id.toString()) {
      console.log(offer.userId, req.user._id);
      return res.status(403).json({
        msg: "You are not authorized to accept this offer",
      });
    }

    // Accept the offer
    offer.status = "ACCEPTED";
    await offer.save();

    return res.status(200).json({
      msg: "Offer has been accepted",
      data: offer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error,
    });
  }
};

const declineOffer = async (req, res) => {
  try {
    // Get the job offer and the user from the database
    const offer = await JobOffer.findById(req.params.offerId);

    // Check if the offer and user exist
    if (!offer) {
      return res.status(404).json({
        msg: "Offer or user not found",
      });
    }

    // Check if the user is the one to whom the offer was made
    if (offer.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        msg: "You are not authorized to decline this offer",
      });
    }

    // Decline the offer
    offer.status = "DECLINED";
    await offer.save();

    return res.status(200).json({
      msg: "Offer has been declined",
      data: offer,
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
  createOffer,
  getAllUserJobOffers,
  acceptOffer,
  declineOffer,
};
