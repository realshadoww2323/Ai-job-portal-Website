const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const users = [
  {
    name: 'John Seeker',
    email: 'seeker@example.com',
    password: 'password123',
    role: 'seeker'
  },
  {
    name: 'Jane Recruiter',
    email: 'recruiter@example.com',
    password: 'password123',
    role: 'recruiter',
    companyName: 'Tech Corp'
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin'
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai-job-portal');
    console.log('Connected to DB');

    // Clear existing users
    await User.deleteMany({ email: { $in: users.map(u => u.email) } });
    console.log('Cleared existing test users');

    for (const u of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(u.password, salt);
      
      const newUser = new User({
        ...u,
        password: hashedPassword
      });
      
      await newUser.save();
      console.log(`User created: ${u.email} (${u.role})`);
    }

    console.log('Seeding complete!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding users:', err);
    mongoose.connection.close();
  }
};

seedUsers();
