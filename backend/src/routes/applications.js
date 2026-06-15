const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');
const { mockStore } = require('../utils/mockDb');
const axios = require('axios');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); // Temporary storage for resumes

const auth = require('../middleware/auth');

// POST apply for a job
router.post('/apply/:jobId', auth, upload.single('resume'), async (req, res) => {
  try {
    const applicantId = req.user.id;
    const { jobId } = req.params;

    if (global.useMockDb) {
      const application = { id: Date.now().toString(), jobId, applicantId, status: 'applied', aiMatchScore: 85, createdAt: new Date() };
      mockStore.applications.push(application);
      return res.status(201).json(application);
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    // Mock resume text extraction (In production, use PyPDF2 or similar in AI service)
    const resumeText = "This is a resume for a candidate with skills in React, Node.js and Python.";
    
    // Call AI Service for ATS Matching
    let aiMatchScore = 0;
    let atsReport = { missingSkills: [], suggestions: [] };

    try {
      const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/match-job`, {
        resume_text: resumeText,
        job_description: `${job.title} ${job.description} ${job.requirements.join(' ')}`
      });
      
      aiMatchScore = aiResponse.data.match_score;
      atsReport = {
        missingSkills: aiResponse.data.missing_skills,
        suggestions: aiResponse.data.boost_suggestions,
        formattingScore: 85 // Mocked
      };
    } catch (aiError) {
      console.error('AI Service Error (Matching):', aiError.message);
    }

    const application = new Application({
      jobId,
      applicantId,
      resumeUrl: req.file ? req.file.path : 'mocked-resume-url.pdf',
      aiMatchScore,
      atsReport
    });

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all applications for jobs posted by the logged-in recruiter
router.get('/recruiter', auth, async (req, res) => {
  try {
    if (global.useMockDb) {
      // Find all jobs for this recruiter
      const myJobs = mockStore.jobs.filter(j => j.recruiterId === req.user.id || !j.recruiterId);
      const myJobIds = myJobs.map(j => j.id || j._id);
      
      // Find applications for these jobs
      const myApplications = mockStore.applications.filter(app => myJobIds.includes(app.jobId));
      
      // We might need to attach some basic user info and job info for mock
      const enrichedApps = myApplications.map(app => {
        const job = mockStore.jobs.find(j => (j.id || j._id) === app.jobId);
        const applicant = mockStore.users.find(u => (u.id || u._id) === app.applicantId);
        return {
          ...app,
          jobId: job ? { _id: job.id || job._id, title: job.title, location: job.location, status: job.status, createdAt: job.createdAt } : app.jobId,
          applicantId: applicant ? { _id: applicant.id || applicant._id, name: applicant.name, email: applicant.email, profile: applicant.profile } : app.applicantId
        };
      });
      return res.json(enrichedApps);
    }

    // Mongo DB Flow
    const myJobs = await Job.find({ recruiterId: req.user.id }, '_id title location status createdAt');
    const myJobIds = myJobs.map(j => j._id);
    
    const applications = await Application.find({ jobId: { $in: myJobIds } })
      .populate('applicantId', 'name email profile')
      .populate('jobId', 'title location status createdAt')
      .sort({ createdAt: -1 });
      
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET applications for a specific job (Recruiter view)
router.get('/job/:jobId', async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId }).populate('applicantId', 'name email profile');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
