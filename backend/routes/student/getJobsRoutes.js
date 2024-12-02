// student/getJobsRoutes.js

const express = require('express');
const router = express.Router();
const Job = require('../../models/Job');

// Fetch all jobs for students
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
});

module.exports = router;