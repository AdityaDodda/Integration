// admin/createJobRoutes.js

const express = require('express');
const router = express.Router();
const Job = require('../../models/Job');

// Create a new job (admin-side route)
router.post('/', async (req, res) => {
  try {
    const { title, description, location, tags, jobType, applyLink } = req.body;
    const job = new Job({ title, description, location, tags, jobType, applyLink });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error });
  }
});

module.exports = router;