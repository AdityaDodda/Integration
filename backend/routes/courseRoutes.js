const express = require('express');
const router = express.Router();

// Middleware to check user role
const checkRole = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming `req.user` contains the user's role
    if (userRole === role) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };
};

// Import the student and admin route files
const getCoursesRoutes = require('./student/getCoursesRoutes');
const courseActionsRoutes = require('./admin/courseActionsRoutes');

// Student routes (no middleware for simplicity in this example)
router.use('/student/courses', getCoursesRoutes);
// Admin routes with role-based access control
router.use('/admin/courses/actions', checkRole('admin'), courseActionsRoutes);

module.exports = router;