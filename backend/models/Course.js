const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course_code: { type: String, required: true, unique: true },
  courses: { type: String, required: true },
  year: { type: Number, required: true },
  sem: { type: Number, required: true },
  credits: { type: Number, required: true },
  course_description: { type: String, required: true },
  pname: { type: String, required: true },
  plink: { type: String, required: true },
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;