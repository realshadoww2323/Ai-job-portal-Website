const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { mockStore } = require('../utils/mockDb');

// GET all courses
router.get('/', async (req, res) => {
  try {
    if (global.useMockDb) return res.json(mockStore.courses);
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET course by id
router.get('/:id', async (req, res) => {
  try {
    if (global.useMockDb) {
      const course = mockStore.courses.find(c => c._id === req.params.id);
      if (!course) return res.status(404).json({ error: 'Course not found' });
      return res.json(course);
    }
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
