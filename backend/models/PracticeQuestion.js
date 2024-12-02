const mongoose = require('mongoose');

const practiceQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  topic: { type: String, required: true },
  company: { type: String, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model('PracticeQuestion', practiceQuestionSchema);