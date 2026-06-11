const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true }
});

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String },
  questions: [questionSchema],
  task: {
    question: { type: String }
  }
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  duration: { type: String },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  rating: { type: Number, default: 4.5 },
  certificateAvailable: { type: Boolean, default: true },
  skills: [{ type: String }],
  price: { type: String, default: 'Free' },
  category: { type: String },
  roadmap: [{ type: String }],
  videoUrl: { type: String },
  modules: [moduleSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
