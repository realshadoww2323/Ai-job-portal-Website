const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { mockStore } = require('../utils/mockDb');
const auth = require('../middleware/auth');

// GET all jobs
router.get('/', async (req, res) => {
  try {
    if (global.useMockDb) return res.json(mockStore.jobs);
    const jobs = await Job.find().sort({ createdAt: -1 }).populate('recruiterId', 'name companyName');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET jobs posted by the logged-in recruiter
router.get('/me', auth, async (req, res) => {
  try {
    if (global.useMockDb) {
      const myJobs = mockStore.jobs.filter(j => j.recruiterId === req.user.id || !j.recruiterId);
      return res.json(myJobs);
    }
    const jobs = await Job.find({ recruiterId: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET job by id
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('recruiterId', 'name companyName');
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// POST create job
router.post('/', auth, async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const { title, company, description, requirements, location, salaryRange } = req.body;

    if (global.useMockDb) {
      const newJob = { id: Date.now().toString(), recruiterId, title, company, description, requirements, location, salaryRange, status: 'active', createdAt: new Date() };
      mockStore.jobs.push(newJob);
      return res.status(201).json(newJob);
    }
    
    // Call AI Service to get embedding for the job description
    let embeddedJD = [];
    try {
      const axios = require('axios');
      const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/embed`, {
        text: `${title} ${description} ${requirements.join(' ')}`
      });
      embeddedJD = aiResponse.data.embedding;
    } catch (aiError) {
      console.error('AI Service Error (Embedding):', aiError.message);
      // Fallback: Continue without embedding if AI service is down
    }

    const newJob = new Job({
      recruiterId, 
      title, 
      company, 
      description, 
      requirements, 
      location, 
      salaryRange,
      embeddedJD
    });
    
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
