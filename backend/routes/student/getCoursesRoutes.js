const express = require('express');
const router = express.Router();
const Course = require('../../models/Course');

// Route to get all courses for a particular year and semester
router.get('/:year/:sem', async (req, res) => {
  try {
    const { year, sem } = req.params;

    // Validate year and semester
    if (!/^[1-4]$/.test(year)) {
      return res.status(400).json({ message: 'Invalid year. Must be between 1 and 4.' });
    }
    if (!/^[1-2]$/.test(sem)) {
      return res.status(400).json({ message: 'Invalid semester. Must be 1 or 2.' });
    }

    // Fetch courses based on year and semester
    const courses = await Course.find({ year, sem });

    // Check if courses exist
    if (courses.length === 0) {
      return res.status(404).json({ message: 'No courses found for the selected year and semester.' });
    }

    // Send courses as JSON response
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    res.status(500).json({ message: 'Server error while fetching courses.' });
  }
});

module.exports = router;