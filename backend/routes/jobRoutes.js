const express = require('express');
const router = express.Router();

// Import the student and admin route files
const getJobsRoutes = require('./student/getJobsRoutes');
const createJobRoutes = require('./admin/createJobRoutes');

// Use the imported routes
router.use('/student/jobs', getJobsRoutes);       // Student route to fetch all jobs
router.use('/admin/jobs/create', createJobRoutes); // Admin route to create a new job

module.exports = router;