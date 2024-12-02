// student/getPracticeQuestionsRoutes.js

const express = require('express');
const router = express.Router();
const PracticeQuestion = require('../../models/PracticeQuestion');

// Get all practice questions for students
router.get('/', async (req, res) => {
  try {
    const questions = await PracticeQuestion.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch practice questions' });
  }
});

module.exports = router;