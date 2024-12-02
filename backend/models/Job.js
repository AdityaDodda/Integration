const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  tags: { type: [String], required: true },
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract'], required: true },
  applyLink: { type: String, required: true }, // New field
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);