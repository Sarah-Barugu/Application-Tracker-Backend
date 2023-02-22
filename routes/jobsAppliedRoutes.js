const express = require('express')
const router = express.Router()
const { authenticateUser, authorizeRoles} = require('../middlewares/fullAuth')



const { createJobsApplied, getAllAppliedJobs, getAllJobOffers } = require('../controllers/jobsAppliedController')

router.route('/createJobsApplied/:id').post(authenticateUser, authorizeRoles('user'), createJobsApplied)
router.route('/getAllAppliedJobs').get(authenticateUser, authorizeRoles('user'), getAllAppliedJobs)
router.route('/getAllJobOffers').get(authenticateUser, getAllJobOffers)

module.exports = router