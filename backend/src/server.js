const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
global.useMockDb = false;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai-job-portal')
  .then(() => {
    console.log('Connected to MongoDB');
    global.useMockDb = false;
  })
  .catch(err => {
    console.warn('⚠️ MongoDB connection failed. Switching to MOCK DATABASE MODE (In-Memory).');
    global.useMockDb = true;
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/admin', require('./routes/admin'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend service is running' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
