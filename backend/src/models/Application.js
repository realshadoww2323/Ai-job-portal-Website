const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  resumeUrl: { type: String, required: true },
  
  status: { 
    type: String, 
    enum: ['applied', 'shortlisted', 'interviewed', 'rejected'], 
    default: 'applied' 
  },
  
  // AI Generated fields
  aiMatchScore: { type: Number, min: 0, max: 100 },
  atsReport: {
    missingSkills: [{ type: String }],
    formattingScore: { type: Number },
    suggestions: [{ type: String }]
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
