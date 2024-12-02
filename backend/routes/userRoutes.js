// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');  // Import User model
const router = express.Router();

// User login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user in the database
    const user = await User.findOne({ username });

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return the role of the user (either 'admin' or 'student')
    res.status(200).json({ message: 'Login successful', role: user.role });
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;