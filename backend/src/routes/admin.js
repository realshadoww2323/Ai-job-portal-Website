const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { mockStore } = require('../utils/mockDb');
const auth = require('../middleware/auth');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admin only.' });
  }
};

// GET all users (Admin only)
router.get('/users', auth, isAdmin, async (req, res) => {
  try {
    if (global.useMockDb) {
      return res.json(mockStore.users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        lastLogin: u.lastLogin,
        interviewStatus: u.interviewStatus,
        status: 'Verified'
      })));
    }
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET stats (Admin only)
router.get('/stats', auth, isAdmin, async (req, res) => {
  try {
    if (global.useMockDb) {
      return res.json({
        totalUsers: mockStore.users.length,
        totalJobs: mockStore.jobs.length,
        totalCourses: mockStore.courses.length,
        interviewsAttended: mockStore.users.filter(u => u.interviewStatus?.attended).length
      });
    }
    // Mongo implementation would go here
    res.json({ message: 'Stats fetched' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
