export const MOCK_MENTORS = Array.from({ length: 25 }).map((_, i) => {
  const roles = [
    'Senior Staff Engineer', 'AI Research Scientist', 'Engineering Manager', 'Principal Frontend Dev',
    'Data Scientist', 'Product Manager', 'UX Researcher', 'Cloud Architect', 'Security Analyst',
    'Backend Engineer', 'Full Stack Developer', 'DevOps Engineer', 'Machine Learning Engineer',
    'Mobile Developer', 'Game Developer', 'Systems Engineer', 'Database Administrator',
    'Site Reliability Engineer', 'Software Architect', 'Blockchain Developer'
  ];
  const companies = [
    'Google', 'OpenAI', 'Stripe', 'Vercel', 'Amazon', 'Meta', 'Netflix', 'Apple', 'Microsoft',
    'Uber', 'Airbnb', 'Spotify', 'Twitter', 'LinkedIn', 'Dropbox', 'Slack', 'Zoom', 'Tesla',
    'Adobe', 'Salesforce'
  ];
  const allSkills = [
    'System Design', 'React', 'Career Advice', 'Machine Learning', 'Python', 'Interview Prep',
    'Leadership', 'Resume Review', 'Negotiation', 'Next.js', 'TypeScript', 'Portfolio Review',
    'Data Analysis', 'Product Strategy', 'User Testing', 'Cloud Computing', 'Cybersecurity',
    'API Design', 'Microservices', 'CI/CD', 'Blockchain', 'Smart Contracts', 'Docker', 'Kubernetes'
  ];
  
  const skills = Array.from({ length: 3 }).map(() => allSkills[Math.floor(Math.random() * allSkills.length)]);
  
  const names = [
    'Sarah Jenkins', 'David Chen', 'Elena Rodriguez', 'James Wilson', 'Michael Chang',
    'Emily Davis', 'Robert Taylor', 'Jessica Martinez', 'William Anderson', 'Sophia Thomas',
    'Daniel Jackson', 'Olivia White', 'Matthew Harris', 'Ava Martin', 'Joseph Thompson',
    'Isabella Garcia', 'Samuel Robinson', 'Mia Clark', 'Anthony Lewis', 'Charlotte Lee',
    'Christopher Walker', 'Amelia Hall', 'Andrew Allen', 'Harper Young', 'Joshua King'
  ];
  
  return {
    id: `m${i + 1}`,
    name: names[i % names.length],
    role: roles[Math.floor(Math.random() * roles.length)],
    company: companies[Math.floor(Math.random() * companies.length)],
    avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${(i % 50) + 1}.jpg`,
    rating: (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1),
    reviews: Math.floor(Math.random() * 300) + 50,
    skills: [...new Set(skills)], // ensure unique
    availability: ['Next available: Tomorrow', 'Next available: Thursday', 'Next available: Today', 'Next available: Next Week'][Math.floor(Math.random() * 4)],
    price: i % 4 === 0 ? 'Free' : `₹${(Math.floor(Math.random() * 5) + 2) * 1000}/hr`
  };
});

export const MOCK_GIGS = Array.from({ length: 35 }).map((_, i) => {
  const titles = [
    'Build a Next.js Landing Page', 'Optimize Postgres Database Queries', 'Create Python Script for Data Scraping',
    'Figma to React Component Library', 'Develop a Mobile App React Native', 'Write Smart Contracts in Solidity',
    'Design UI/UX for E-commerce Site', 'Set up CI/CD Pipeline on AWS', 'Perform Security Audit of Web App',
    'Build a Machine Learning Model for Sales Prediction', 'Develop a Custom WordPress Theme',
    'Create a RESTful API using Node.js', 'Migrate Legacy System to Cloud', 'Develop a VR Game Prototype',
    'Implement OAuth2 Authentication', 'Create an Interactive Data Dashboard', 'Write Technical Documentation',
    'Fix Bugs in Existing Angular App', 'Optimize Website for SEO', 'Develop a Chatbot using Dialogflow',
    'Create a Blockchain Voting System', 'Design a Logo and Brand Identity', 'Set up Google Analytics and Tag Manager',
    'Develop a Shopify App', 'Create a Web Scraper in Node.js', 'Perform Load Testing on Web Server',
    'Develop a Desktop App using Electron', 'Create a 3D Animation Video', 'Write a Research Paper on AI Ethics',
    'Develop a Custom CRM System', 'Create a Plugin for Figma', 'Set up a Kubernetes Cluster',
    'Develop a DApp on Ethereum', 'Create a Custom Linux Distribution', 'Design a Hardware Prototype'
  ];
  const companies = [
    'TechStart Inc.', 'DataFlow Solutions', 'Market Research LLC', 'Creative Agency', 'Mobile Innovators',
    'Crypto Wizards', 'Design Studio', 'Cloud Experts', 'Security Pros', 'AI Solutions',
    'Web Masters', 'API Builders', 'Cloud Migrators', 'VR Game Studios', 'Auth Experts',
    'Data Vis Inc.', 'Tech Docs LLC', 'Bug Fixers', 'SEO Masters', 'Chatbot Solutions',
    'Blockchain Builders', 'Brand Agency', 'Analytics Pros', 'Shopify Experts', 'Scraping Pros',
    'Load Testers', 'Desktop App Builders', 'Animation Studio', 'Research Institute', 'CRM Experts',
    'Figma Plugin Builders', 'Kubernetes Pros', 'DApp Developers', 'Linux Customizers', 'Hardware Innovators'
  ];
  const allSkills = [
    'Next.js', 'Tailwind CSS', 'Framer Motion', 'PostgreSQL', 'SQL', 'Performance Optimization',
    'Python', 'BeautifulSoup', 'Requests', 'React', 'TypeScript', 'Storybook',
    'React Native', 'Mobile Development', 'Solidity', 'Smart Contracts', 'Figma', 'UI/UX Design',
    'AWS', 'CI/CD', 'Docker', 'Security Audit', 'Penetration Testing', 'Machine Learning', 'Data Science',
    'WordPress', 'PHP', 'Node.js', 'Express', 'Cloud Migration', 'VR', 'Unity',
    'OAuth2', 'Authentication', 'Data Visualization', 'D3.js', 'Technical Writing', 'Angular',
    'SEO', 'Marketing', 'Dialogflow', 'Chatbots', 'Blockchain', 'Voting Systems',
    'Logo Design', 'Branding', 'Google Analytics', 'Shopify', 'Web Scraping', 'Load Testing',
    'Electron', 'Desktop Development', '3D Animation', 'Research', 'CRM', 'Kubernetes',
    'Ethereum', 'Linux', 'Hardware'
  ];
  
  const skills = Array.from({ length: 3 }).map(() => allSkills[Math.floor(Math.random() * allSkills.length)]);

  return {
    id: `g${i + 1}`,
    title: titles[i % titles.length],
    company: companies[i % companies.length],
    budget: i % 3 === 0 ? `₹${(Math.floor(Math.random() * 50) + 10) * 1000}` : `₹${Math.floor(Math.random() * 10) + 2},000/hr`,
    duration: ['1-2 Weeks', 'Ongoing (10hrs/wk)', '3 Days', '3 Weeks', '1 Month', '3 Months', '6 Months'][Math.floor(Math.random() * 7)],
    type: i % 3 === 0 ? 'Fixed Price' : (i % 2 === 0 ? 'Hourly' : 'Bounty'),
    skills: [...new Set(skills)], // ensure unique
    description: `We are looking for an experienced professional to help us with ${titles[i % titles.length].toLowerCase()}. This project requires strong skills in ${skills.join(', ')}. The ideal candidate will have a proven track record of delivering high-quality results on time and within budget. If you are passionate about what you do and are looking for a challenging and rewarding opportunity, we encourage you to apply.`,
    posted: ['2 hours ago', '5 hours ago', '1 day ago', '2 days ago', '1 week ago'][Math.floor(Math.random() * 5)],
    verified: Math.random() > 0.3
  };
});
