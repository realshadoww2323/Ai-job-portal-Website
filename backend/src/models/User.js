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
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
