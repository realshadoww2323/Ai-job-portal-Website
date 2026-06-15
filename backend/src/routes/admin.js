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

// POST mentorship booking (open endpoint for demo)
router.post('/bookings', async (req, res) => {
  try {
    const booking = { id: Date.now().toString(), ...req.body, createdAt: new Date() };
    if (global.useMockDb) {
      mockStore.mentorshipBookings.push(booking);
      return res.status(201).json(booking);
    }
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET mentorship bookings
router.get('/bookings', async (req, res) => {
  try {
    if (global.useMockDb) {
      return res.json(mockStore.mentorshipBookings);
    }
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST gig application (open endpoint for demo)
router.post('/applications', async (req, res) => {
  try {
    const application = { id: Date.now().toString(), ...req.body, createdAt: new Date() };
    if (global.useMockDb) {
      mockStore.gigApplications.push(application);
      return res.status(201).json(application);
    }
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET job applications
router.get('/applications', auth, isAdmin, async (req, res) => {
  try {
    if (global.useMockDb) {
      return res.json(mockStore.applications || mockStore.gigApplications);
    }
    const Application = require('../models/Application');
    const applications = await Application.find()
      .populate('jobId', 'title company location')
      .populate('applicantId', 'name email profile')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
