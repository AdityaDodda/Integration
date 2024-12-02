// practiceQuestionRoutes.js
const express = require('express');
const router = express.Router();

// Import the student and admin route files
const getPracticeQuestionsRoutes = require('./student/getPracticeQuestionsRoutes');
const createPracticeQuestionRoutes = require('./admin/createPracticeQuestionRoutes');

// Use the imported routes
router.use('/student/practice-questions', getPracticeQuestionsRoutes);    // Student route to fetch all practice questions
router.use('/admin/practice-questions', createPracticeQuestionRoutes);    // Admin route to create a new practice question

module.exports = router;