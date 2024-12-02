// models/Blog.js

const mongoose = require('mongoose');

// Define the Blog Schema
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true }, // The title of the blog
  sections: [
    {
      sectionTitle: { type: String, required: true }, // Title of the section
      sectionContent: { type: String, required: true }, // Content of the section
    },
  ],
  imageUrl: { type: String, required: false }, // URL of the uploaded image for the blog
  comments: [
    { type: String }, // Array of comments
  ],
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

// Create a model based on the schema
const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;