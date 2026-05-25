const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./src/models/Job');
const User = require('./src/models/User');

dotenv.config();

const jobTitles = ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist', 'AI Engineer', 'DevOps Engineer', 'Product Manager', 'UI/UX Designer', 'Mobile App Developer', 'Cybersecurity Analyst', 'Cloud Architect', 'QA Engineer', 'Marketing Manager', 'HR Specialist', 'Project Manager', 'Business Analyst', 'Systems Administrator', 'Network Engineer', 'Machine Learning Engineer'];
const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple', 'Tesla', 'Adobe', 'Salesforce', 'Intel', 'Oracle', 'Spotify', 'Uber', 'Airbnb', 'Zomato', 'Swiggy', 'Infosys', 'TCS', 'Wipro', 'HCL'];
const locations = ['Bangalore', 'Hyderabad', 'Pune', 'Remote', 'Hybrid', 'Mumbai', 'Delhi', 'Chennai', 'Noida', 'Gurugram', 'San Francisco', 'London', 'Berlin', 'New York', 'Singapore'];
const skills = ['React', 'Node.js', 'Python', 'Java', 'Next.js', 'Tailwind CSS', 'AWS', 'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'TypeScript', 'Flutter', 'Go', 'Rust', 'TensorFlow', 'PyTorch'];

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai-job-portal');
    console.log('Connected to DB for job seeding');

    // Find a recruiter to assign these jobs to
    let recruiter = await User.findOne({ role: 'recruiter' });
    if (!recruiter) {
      console.log('No recruiter found, creating a default one');
      recruiter = new User({
        name: 'Default Recruiter',
        email: 'recruiter@example.com',
        password: 'password123', // In real use, this should be hashed
        role: 'recruiter',
        companyName: 'Tech Corp'
      });
      await recruiter.save();
    }

    console.log('Clearing existing jobs...');
    await Job.deleteMany({});

    const jobsCount = 1005;
    const batchSize = 100;
    
    console.log(`Generating ${jobsCount} jobs...`);

    for (let i = 0; i < jobsCount; i += batchSize) {
      const batch = [];
      const currentBatchSize = Math.min(batchSize, jobsCount - i);
      
      for (let j = 0; j < currentBatchSize; j++) {
        const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
        const company = companies[Math.floor(Math.random() * companies.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const jobSkills = Array.from({ length: 3 }, () => skills[Math.floor(Math.random() * skills.length)]);
        const exp = `${Math.floor(Math.random() * 5)}-${Math.floor(Math.random() * 5) + 5} Years`;
        const salary = `₹${Math.floor(Math.random() * 20) + 5} - ₹${Math.floor(Math.random() * 30) + 25} LPA`;

        batch.push({
          recruiterId: recruiter._id,
          title: `${title}${i + j > 100 ? ' (Senior)' : ''}`,
          company: `${company} ${['Solutions', 'Tech', 'Systems', 'Global', 'Inc'][Math.floor(Math.random() * 5)]}`,
          description: `Join our team as a ${title}. We are looking for talented individuals to help us build the next generation of ${company} products. You will work on cutting-edge technologies including ${jobSkills.join(', ')}.\n\nAt ${company}, we believe in fostering a culture of innovation and collaboration. As a key member of our engineering team, you will be responsible for designing, developing, and maintaining high-performance software solutions that impact millions of users worldwide.\n\nKey Responsibilities:\n- Collaborate with cross-functional teams to define, design, and ship new features.\n- Write clean, maintainable, and efficient code following best practices.\n- Identify and resolve bottlenecks and bugs to ensure optimal performance.\n- Participate in code reviews to maintain code quality and share knowledge.\n- Stay up-to-date with emerging technologies and industry trends to continuously improve our technical stack.\n\nWhat We Offer:\n- Competitive salary and equity packages.\n- Comprehensive health, dental, and vision insurance.\n- Flexible working hours and remote work options.\n- Professional development opportunities and learning stipends.\n- A supportive and inclusive work environment where your ideas are valued.\n\nIf you are passionate about technology and want to make a real difference, we would love to hear from you. Apply now to embark on an exciting journey with ${company}!`,
          requirements: [...new Set(jobSkills)],
          location,
          salaryRange: salary,
          experience: exp,
          status: 'active'
        });
      }
      
      await Job.insertMany(batch);
      console.log(`Inserted batch ${i / batchSize + 1} (${i + currentBatchSize}/${jobsCount})`);
    }

    console.log('Job seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding jobs:', err);
    process.exit(1);
  }
};

seedJobs();
