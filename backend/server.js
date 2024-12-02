// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Import route modules
const userRoutes = require('./routes/userRoutes');  // Import user login route
const practiceQuestionRoutes = require('./routes/practiceQuestionRoutes');
const jobRoutes = require('./routes/jobRoutes');
const blogRoutes = require('./routes/blogRoutes'); // No need to pass 'upload' anymore
const courseRoutes = require('./routes/courseRoutes');

// Initialize the app
const app = express();

// Middleware setup
app.use(cors());  // Enable CORS
app.use(bodyParser.json());  // Parse JSON request body
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve uploaded files

// MongoDB connection to 'yourdb' database
mongoose.connect('mongodb://localhost:27017/yourdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected to yourdb'))
  .catch((err) => console.log('Database connection error:', err));

// Routes setup
app.use('/api/users', userRoutes);  // Routes for user login and registration
app.use('/api/practice-questions', practiceQuestionRoutes);  // Routes for practice questions
app.use('/api/jobs', jobRoutes);  // Routes for jobs
app.use('/api/blogs', blogRoutes);  // Routes for blogs with image upload
app.use('/api/courses', courseRoutes);

// Default 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Start the server
app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});