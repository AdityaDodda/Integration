const mongoose = require('mongoose');

// Define the job schema
const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    tags: { type: [String], required: true },
    jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract'], required: true },
    applyLink: { type: String, required: true },
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

// Create the model based on the schema
const Job = mongoose.model('Job', jobSchema);

// Export the Job model
module.exports = Job;
