const express = require('express');
const Job = require('../models/Job');  // Make sure this is importing the Job model correctly

const router = express.Router();

// Fetch all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
});

// Create a new job
router.post('/', async (req, res) => {
  try {
    const { title, description, location, tags, jobType, applyLink } = req.body;

    // Validate the required fields
    if (!title || !description || !location || !tags || !jobType || !applyLink) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new job document
    const job = new Job({ title, description, location, tags, jobType, applyLink });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error });
  }
});

module.exports = router;
