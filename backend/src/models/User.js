const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['seeker', 'recruiter', 'admin'], 
    default: 'seeker' 
  },
  googleId: { type: String },
  avatar: { type: String },
  
  // Job Seeker Profile
  profile: {
    skills: [{ type: String }],
    experience: [{
      title: String,
      company: String,
      startDate: Date,
      endDate: Date,
      description: String
    }],
    education: [{
      degree: String,
      institution: String,
      graduationYear: Number
    }],
    resumeUrl: String
  },
  
  // User Activity Tracking
  lastLogin: { type: Date, default: Date.now },
  interviewStatus: {
    attended: { type: Boolean, default: false },
    lastAttendedAt: { type: Date },
    score: { type: Number }
  },
  
  // Advanced AI Features Storage
  careerTwin: {
    readinessScore: Number,
    topRoles: [String],
    hiringProbability: Number,
    expectedSalary: String,
    roadmap: {
      oneYear: String,
      threeYears: String,
      fiveYears: String
    },
    lastGeneratedAt: Date
  },
  interviewPredictions: {
    technicalRoundSuccess: Number,
    hrRoundSuccess: Number,
    overallProbability: Number,
    strengths: [String],
    weaknesses: [String],
    recommendations: [String],
    lastPredictedAt: Date
  },
  cultureMatches: [{
    companyName: String,
    cultureMatchScore: Number,
    startupFitScore: Number,
    corporateFitScore: Number,
    remoteCompatibility: Number,
    explanation: String,
    matchedAt: { type: Date, default: Date.now }
  }],
  elevatorPitch: {
    content: String,
    mode: String,
    generatedAt: Date
  },
  careerPivots: [{
    targetRole: String,
    transferableSkills: [{
      old_skill: String,
      new_skill: String,
      relevance: String
    }],
    bridgePlan: [{
      week: String,
      task: String
    }],
    rewrittenSummary: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
