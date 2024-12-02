// admin/courseActionsRoutes.js
const express = require('express');
const router = express.Router();
const Course = require('../../models/Course');

// Route to add a new course
router.post('/add', async (req, res) => {
  const { course_code, courses, year, sem, credits, course_description, pname, plink } = req.body;

  // Basic validation
  if (!course_code || !courses || !year || !sem || !credits || !course_description || !pname || !plink) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newCourse = new Course({
      course_code,
      courses,
      year,
      sem,
      credits,
      course_description,
      pname,
      plink
    });

    await newCourse.save();
    res.status(201).json({
      message: 'Course added successfully',
      course: newCourse
    });
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ message: 'Error adding course', error: error.message });
  }
});

// Route to update an existing course by course code
router.put('/update/:course_code', async (req, res) => {
  const { course_code } = req.params;
  const { courses, year, sem, credits, course_description, pname, plink } = req.body;

  // Basic validation
  if (!courses || !year || !sem || !credits || !course_description || !pname || !plink) {
    return res.status(400).json({ message: 'All fields are required to update a course' });
  }

  try {
    const updatedCourse = await Course.findOneAndUpdate(
      { course_code },
      { courses, year, sem, credits, course_description, pname, plink },
      { new: true } // Return the updated course
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({
      message: 'Course updated successfully',
      course: updatedCourse
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
});

// Route to delete a course by course code
router.delete('/delete/:course_code', async (req, res) => {
  const { course_code } = req.params;

  try {
    const deletedCourse = await Course.findOneAndDelete({ course_code });

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
});

module.exports = router;