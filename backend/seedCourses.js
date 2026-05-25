const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./src/models/Course');

dotenv.config();


const categories = [
  'Web Development', 'Mobile Development', 'Data Science', 'Machine Learning', 
  'Cloud Computing', 'Cybersecurity', 'DevOps', 'UI/UX Design', 'Digital Marketing', 
  'Blockchain', 'Game Development', 'AR/VR', 'Artificial Intelligence', 'Software Testing'
];

const providers = ['Coursera', 'Udemy', 'edX', 'LinkedIn Learning', 'Pluralsight', 'Google', 'Microsoft', 'AWS', 'Meta'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];

const roadmapSteps = {
  'Web Development': ['HTML/CSS', 'JavaScript Basics', 'React/Vue', 'Node.js', 'Database (SQL/NoSQL)', 'Deployment'],
  'Data Science': ['Python for Data Science', 'Statistics', 'Data Cleaning', 'Data Visualization', 'Machine Learning Basics', 'Deep Learning'],
  'Machine Learning': ['Math for ML', 'Python/R', 'Supervised Learning', 'Unsupervised Learning', 'Neural Networks', 'Deployment'],
  'Cloud Computing': ['Cloud Fundamentals', 'AWS/Azure/GCP Basics', 'Networking', 'Security', 'Serverless', 'Architechture'],
  'Cybersecurity': ['Network Security', 'Cryptography', 'Ethical Hacking', 'Incident Response', 'Compliance', 'Advanced Pentesting'],
  'DevOps': ['Linux Basics', 'Scripting', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Monitoring'],
  'UI/UX Design': ['Design Principles', 'Figma Basics', 'User Research', 'Prototyping', 'Usability Testing', 'Design Systems']
};

const videoUrls = {
  'Web Development': 'https://www.youtube.com/embed/zJSY8tbf_ys',
  'Data Science': 'https://www.youtube.com/embed/X3paOmcrTjQ',
  'Machine Learning': 'https://www.youtube.com/embed/7eh4d6sabA0',
  'Cloud Computing': 'https://www.youtube.com/embed/M988_fsOSWo',
  'Cybersecurity': 'https://www.youtube.com/embed/zIWGjkr0ENE',
  'DevOps': 'https://www.youtube.com/embed/hQcFE0RD0cQ',
  'UI/UX Design': 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
  'Digital Marketing': 'https://www.youtube.com/embed/bixR-KIJKYM',
  'Blockchain': 'https://www.youtube.com/embed/gyMwXuJrbJQ',
  'Game Development': 'https://www.youtube.com/embed/zJSY8tbf_ys',
  'AR/VR': 'https://www.youtube.com/embed/zJSY8tbf_ys',
  'Artificial Intelligence': 'https://www.youtube.com/embed/ad79nYk2keg',
  'Software Testing': 'https://www.youtube.com/embed/bwj2s_5e12U',
  'Mobile Development': 'https://www.youtube.com/embed/fis26HvvDII'
};

const getModuleData = (step) => {
  const dataMap = {
    'HTML/CSS': {
      videoUrl: 'https://www.youtube.com/embed/mU6anWqZJcc',
      questions: [
        { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Text Markup Language', 'Hyper Tabular Markup Language', 'None of these'], answer: 'Hyper Text Markup Language' },
        { question: 'Which property is used to change the background color in CSS?', options: ['color', 'bgcolor', 'background-color', 'background'], answer: 'background-color' },
        { question: 'What does CSS stand for?', options: ['Creative Style Sheets', 'Computer Style Sheets', 'Cascading Style Sheets', 'Colorful Style Sheets'], answer: 'Cascading Style Sheets' },
        { question: 'Which HTML tag is used to define an internal style sheet?', options: ['<script>', '<style>', '<css>', '<design>'], answer: '<style>' },
        { question: 'Which HTML attribute is used to define inline styles?', options: ['class', 'style', 'styles', 'font'], answer: 'style' }
      ]
    },
    'JavaScript Basics': {
      videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
      questions: [
        { question: 'Inside which HTML element do we put the JavaScript?', options: ['<script>', '<javascript>', '<js>', '<scripting>'], answer: '<script>' },
        { question: 'How do you write "Hello World" in an alert box?', options: ['msgBox("Hello World");', 'alertBox("Hello World");', 'msg("Hello World");', 'alert("Hello World");'], answer: 'alert("Hello World");' },
        { question: 'How do you create a function in JavaScript?', options: ['function myFunction()', 'function:myFunction()', 'create myFunction()', 'def myFunction()'], answer: 'function myFunction()' },
        { question: 'How do you call a function named "myFunction"?', options: ['call function myFunction()', 'call myFunction()', 'myFunction()', 'execute myFunction()'], answer: 'myFunction()' },
        { question: 'How to write an IF statement in JavaScript?', options: ['if i = 5', 'if i == 5 then', 'if (i == 5)', 'if i = 5 then'], answer: 'if (i == 5)' }
      ]
    },
    'JS Basics': {
      videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
      questions: [
        { question: 'Inside which HTML element do we put the JavaScript?', options: ['<script>', '<javascript>', '<js>', '<scripting>'], answer: '<script>' },
        { question: 'How do you write "Hello World" in an alert box?', options: ['msgBox("Hello World");', 'alertBox("Hello World");', 'msg("Hello World");', 'alert("Hello World");'], answer: 'alert("Hello World");' },
        { question: 'How do you create a function in JavaScript?', options: ['function myFunction()', 'function:myFunction()', 'create myFunction()', 'def myFunction()'], answer: 'function myFunction()' },
        { question: 'How do you call a function named "myFunction"?', options: ['call function myFunction()', 'call myFunction()', 'myFunction()', 'execute myFunction()'], answer: 'myFunction()' },
        { question: 'How to write an IF statement in JavaScript?', options: ['if i = 5', 'if i == 5 then', 'if (i == 5)', 'if i = 5 then'], answer: 'if (i == 5)' }
      ]
    },
    'React': {
      videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
      questions: [
        { question: 'What is used in React to increase performance?', options: ['Virtual DOM', 'Original DOM', 'Both A and B', 'None of the above'], answer: 'Virtual DOM' },
        { question: 'What is a state in React?', options: ['A permanent storage.', 'Internal storage of the component.', 'External storage of the component.', 'None of the above.'], answer: 'Internal storage of the component.' },
        { question: 'What are the two types of components in React?', options: ['Class and Functional', 'State and Props', 'Virtual and Original', 'None'], answer: 'Class and Functional' },
        { question: 'How can you pass data to a child component in React?', options: ['State', 'Props', 'Context', 'Redux'], answer: 'Props' },
        { question: 'Which hook is used to perform side effects in a functional component?', options: ['useState', 'useContext', 'useEffect', 'useReducer'], answer: 'useEffect' }
      ]
    },
    'React/Vue': {
      videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
      questions: [
        { question: 'What is used in React to increase performance?', options: ['Virtual DOM', 'Original DOM', 'Both A and B', 'None of the above'], answer: 'Virtual DOM' },
        { question: 'What is a state in React?', options: ['A permanent storage.', 'Internal storage of the component.', 'External storage of the component.', 'None of the above.'], answer: 'Internal storage of the component.' },
        { question: 'What are the two types of components in React?', options: ['Class and Functional', 'State and Props', 'Virtual and Original', 'None'], answer: 'Class and Functional' },
        { question: 'How can you pass data to a child component in React?', options: ['State', 'Props', 'Context', 'Redux'], answer: 'Props' },
        { question: 'Which hook is used to perform side effects in a functional component?', options: ['useState', 'useContext', 'useEffect', 'useReducer'], answer: 'useEffect' }
      ]
    },
    'Node.js': {
      videoUrl: 'https://www.youtube.com/embed/TlB_eWDSMt4',
      questions: [
        { question: 'Which of the following command is used to start a REPL session?', options: ['$ node', '$ node start', '$ node repl', '$ node console'], answer: '$ node' },
        { question: 'Node.js is written in?', options: ['JavaScript', 'C', 'C++', 'All of the above'], answer: 'All of the above' },
        { question: 'What is npm?', options: ['Node Package Manager', 'Node Project Manager', 'New Project Manager', 'None'], answer: 'Node Package Manager' },
        { question: 'Which core module in Node.js is used to create a web server?', options: ['url', 'http', 'fs', 'path'], answer: 'http' },
        { question: 'How do you import a module in Node.js?', options: ['import', 'include', 'require()', 'fetch()'], answer: 'require()' }
      ]
    },
    'Python': {
      videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
      questions: [
        { question: 'What is the maximum possible length of an identifier?', options: ['31 characters', '63 characters', '79 characters', 'None of the above'], answer: 'None of the above' },
        { question: 'Who developed the Python language?', options: ['Zim Den', 'Guido van Rossum', 'Niene Stom', 'Wick van Rossum'], answer: 'Guido van Rossum' },
        { question: 'How do you insert comments in Python code?', options: ['//', '/*', '#', '--'], answer: '#' },
        { question: 'Which keyword is used to create a function in Python?', options: ['function', 'def', 'create', 'fun'], answer: 'def' },
        { question: 'What is the correct file extension for Python files?', options: ['.pyth', '.pt', '.pyt', '.py'], answer: '.py' }
      ]
    },
    'Python for Data Science': {
      videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
      questions: [
        { question: 'Which library is commonly used for data manipulation in Python?', options: ['Numpy', 'Pandas', 'Matplotlib', 'Scipy'], answer: 'Pandas' },
        { question: 'What is a DataFrame?', options: ['A 1D array', 'A 2D table of data', 'A 3D tensor', 'A type of string'], answer: 'A 2D table of data' },
        { question: 'How do you insert comments in Python code?', options: ['//', '/*', '#', '--'], answer: '#' },
        { question: 'Which keyword is used to create a function in Python?', options: ['function', 'def', 'create', 'fun'], answer: 'def' },
        { question: 'What is the correct file extension for Python files?', options: ['.pyth', '.pt', '.pyt', '.py'], answer: '.py' }
      ]
    },
    'Networking': {
      videoUrl: 'https://www.youtube.com/embed/qiQR5rTSshw',
      questions: [
        { question: 'Which protocol is used to reliably transfer data over the internet?', options: ['UDP', 'TCP', 'IP', 'HTTP'], answer: 'TCP' },
        { question: 'What does DNS stand for?', options: ['Domain Name System', 'Dynamic Network Server', 'Data Name Service', 'Digital Network System'], answer: 'Domain Name System' },
        { question: 'What is the standard port for HTTP?', options: ['21', '22', '80', '443'], answer: '80' },
        { question: 'What is the standard port for HTTPS?', options: ['21', '22', '80', '443'], answer: '443' },
        { question: 'Which layer of the OSI model does an IP address belong to?', options: ['Data Link', 'Network Layer', 'Transport', 'Application'], answer: 'Network Layer' }
      ]
    },
    'Network Security': {
      videoUrl: 'https://www.youtube.com/embed/zIWGjkr0ENE',
      questions: [
        { question: 'What is a firewall primarily used for?', options: ['Cooling servers', 'Filtering network traffic', 'Encrypting passwords', 'Storing backups'], answer: 'Filtering network traffic' },
        { question: 'Which attack overwhelms a server with traffic?', options: ['Phishing', 'SQL Injection', 'DDoS', 'Man-in-the-Middle'], answer: 'DDoS' },
        { question: 'What is a VPN?', options: ['Virtual Private Network', 'Visual Public Network', 'Virtual Public Node', 'None'], answer: 'Virtual Private Network' },
        { question: 'Which attack intercepts communication between two parties?', options: ['DDoS', 'Phishing', 'Man-in-the-Middle', 'Malware'], answer: 'Man-in-the-Middle' },
        { question: 'What does IPS stand for?', options: ['Intrusion Prevention System', 'Internal Protection System', 'Internet Protocol Security', 'None'], answer: 'Intrusion Prevention System' }
      ]
    },
    'Linux': {
      videoUrl: 'https://www.youtube.com/embed/hQcFE0RD0cQ',
      questions: [
        { question: 'Which command is used to list directory contents?', options: ['cd', 'ls', 'pwd', 'mkdir'], answer: 'ls' },
        { question: 'Who is the creator of Linux?', options: ['Linus Torvalds', 'Richard Stallman', 'Bill Gates', 'Steve Jobs'], answer: 'Linus Torvalds' },
        { question: 'Which command is used to change directories?', options: ['mv', 'cd', 'rm', 'mkdir'], answer: 'cd' },
        { question: 'Which command is used to display the current working directory?', options: ['ls', 'cd', 'pwd', 'whoami'], answer: 'pwd' },
        { question: 'How do you copy a file in Linux?', options: ['copy', 'mv', 'cp', 'rm'], answer: 'cp' }
      ]
    },
    'Ethical Hacking': {
      videoUrl: 'https://www.youtube.com/embed/fNzpcB7ODxQ',
      questions: [
        { question: 'What is the goal of ethical hacking?', options: ['Stealing data', 'Identifying vulnerabilities', 'Crashing servers', 'Selling exploits'], answer: 'Identifying vulnerabilities' },
        { question: 'What type of hacker is an ethical hacker?', options: ['Black Hat', 'White Hat', 'Grey Hat', 'Red Hat'], answer: 'White Hat' },
        { question: 'What is social engineering?', options: ['Manipulating people into giving up confidential info', 'Writing malware', 'Cracking passwords', 'Configuring firewalls'], answer: 'Manipulating people into giving up confidential info' },
        { question: 'What is a zero-day exploit?', options: ['An attack that fails immediately', 'An attack on an unknown vulnerability', 'An attack on day zero of the month', 'None'], answer: 'An attack on an unknown vulnerability' },
        { question: 'Which tool is a popular network mapper?', options: ['Photoshop', 'Nmap', 'Excel', 'Word'], answer: 'Nmap' }
      ]
    },
    'Pen Testing': {
      videoUrl: 'https://www.youtube.com/embed/B7tTQ272OHE',
      questions: [
        { question: 'What does Pen Testing stand for?', options: ['Penetration Testing', 'Pentagon Testing', 'Penalty Testing', 'Pencil Testing'], answer: 'Penetration Testing' },
        { question: 'Which phase comes first in a pen test?', options: ['Exploitation', 'Reconnaissance', 'Reporting', 'Post-Exploitation'], answer: 'Reconnaissance' },
        { question: 'What is a reverse shell?', options: ['A shell on a turtle', 'A shell that initiates a connection back to the attacker', 'A protective barrier', 'None'], answer: 'A shell that initiates a connection back to the attacker' },
        { question: 'What is privilege escalation?', options: ['Gaining higher level permissions on a system', 'Losing permissions', 'Moving laterally', 'None'], answer: 'Gaining higher level permissions on a system' },
        { question: 'Which tool is commonly used for exploiting vulnerabilities?', options: ['Wireshark', 'Metasploit', 'Nmap', 'Ping'], answer: 'Metasploit' }
      ]
    },
    'Advanced Pentesting': {
      videoUrl: 'https://www.youtube.com/embed/B7tTQ272OHE',
      questions: [
        { question: 'What does Pen Testing stand for?', options: ['Penetration Testing', 'Pentagon Testing', 'Penalty Testing', 'Pencil Testing'], answer: 'Penetration Testing' },
        { question: 'Which phase comes first in a pen test?', options: ['Exploitation', 'Reconnaissance', 'Reporting', 'Post-Exploitation'], answer: 'Reconnaissance' },
        { question: 'What is a reverse shell?', options: ['A shell on a turtle', 'A shell that initiates a connection back to the attacker', 'A protective barrier', 'None'], answer: 'A shell that initiates a connection back to the attacker' },
        { question: 'What is privilege escalation?', options: ['Gaining higher level permissions on a system', 'Losing permissions', 'Moving laterally', 'None'], answer: 'Gaining higher level permissions on a system' },
        { question: 'Which tool is commonly used for exploiting vulnerabilities?', options: ['Wireshark', 'Metasploit', 'Nmap', 'Ping'], answer: 'Metasploit' }
      ]
    },
    'Security Ops': {
      videoUrl: 'https://www.youtube.com/embed/_emYMF9uxMc',
      questions: [
        { question: 'What does SOC stand for?', options: ['Security Operations Center', 'System Outage Control', 'Secure Online Communications', 'Standard Operating Conditions'], answer: 'Security Operations Center' },
        { question: 'Which tool is commonly used in a SOC?', options: ['Photoshop', 'SIEM', 'Visual Studio', 'AutoCAD'], answer: 'SIEM' },
        { question: 'What is threat hunting?', options: ['Proactively searching for cyber threats inside a network', 'Waiting for alerts', 'Installing antivirus', 'None'], answer: 'Proactively searching for cyber threats inside a network' },
        { question: 'What does EDR stand for?', options: ['Endpoint Detection and Response', 'External Data Route', 'Error Diagnostic Report', 'None'], answer: 'Endpoint Detection and Response' },
        { question: 'What is a playbook in SOC?', options: ['A book of games', 'A set of procedures to handle specific incidents', 'A password list', 'None'], answer: 'A set of procedures to handle specific incidents' }
      ]
    },
    'Incident Response': {
      videoUrl: 'https://www.youtube.com/embed/_emYMF9uxMc',
      questions: [
        { question: 'What is the first step in the incident response lifecycle?', options: ['Eradication', 'Recovery', 'Preparation', 'Containment'], answer: 'Preparation' },
        { question: 'Why is containment important during an incident?', options: ['To restore backups', 'To prevent further damage', 'To write the final report', 'To punish the attacker'], answer: 'To prevent further damage' },
        { question: 'What is the final step in incident response?', options: ['Lessons Learned', 'Containment', 'Detection', 'Preparation'], answer: 'Lessons Learned' },
        { question: 'What does IOC stand for?', options: ['Indicator of Compromise', 'Internal Operations Control', 'Internet of Computers', 'None'], answer: 'Indicator of Compromise' },
        { question: 'Why is chain of custody important?', options: ['To ensure digital evidence is admissible in court', 'To speed up recovery', 'To reduce costs', 'None'], answer: 'To ensure digital evidence is admissible in court' }
      ]
    },
    'CISSP': {
      videoUrl: 'https://www.youtube.com/embed/_nyZhYnCNLA',
      questions: [
        { question: 'What does CISSP stand for?', options: ['Certified Information Systems Security Professional', 'Computer Internet Security Systems Protocol', 'Common Information Security Standard Practice', 'Certified Internet Security Systems Programmer'], answer: 'Certified Information Systems Security Professional' },
        { question: 'Which domain covers physical security?', options: ['Domain 1', 'Domain 3', 'Domain 5', 'Domain 7'], answer: 'Domain 5' },
        { question: 'What is the CIA triad?', options: ['Confidentiality, Integrity, Availability', 'Control, Identity, Access', 'Cost, Impact, Assessment', 'None'], answer: 'Confidentiality, Integrity, Availability' },
        { question: 'What is principle of least privilege?', options: ['Users are given only the minimum permissions needed', 'Everyone is an admin', 'No one has access', 'None'], answer: 'Users are given only the minimum permissions needed' },
        { question: 'What is risk mitigation?', options: ['Reducing the impact or likelihood of a risk', 'Ignoring a risk', 'Transferring a risk to insurance', 'None'], answer: 'Reducing the impact or likelihood of a risk' }
      ]
    },
    'Cryptography': {
      videoUrl: 'https://www.youtube.com/embed/jhXCTbFnK8o',
      questions: [
        { question: 'What is the process of hiding information?', options: ['Hashing', 'Decryption', 'Encryption', 'Spoofing'], answer: 'Encryption' },
        { question: 'Which algorithm is asymmetric?', options: ['AES', 'DES', 'RSA', 'RC4'], answer: 'RSA' },
        { question: 'What is a hash function?', options: ['A one-way mathematical function that converts data into a fixed size string', 'A two-way encryption method', 'A type of password', 'None'], answer: 'A one-way mathematical function that converts data into a fixed size string' },
        { question: 'Which algorithm is commonly used for secure hashing?', options: ['MD5', 'SHA-256', 'DES', 'RC4'], answer: 'SHA-256' },
        { question: 'What is symmetric encryption?', options: ['Using the same key for both encryption and decryption', 'Using different keys', 'Not using keys', 'None'], answer: 'Using the same key for both encryption and decryption' }
      ]
    },
    'Compliance': {
      videoUrl: 'https://www.youtube.com/embed/zIWGjkr0ENE',
      questions: [
        { question: 'What does GDPR govern?', options: ['Data privacy in Europe', 'Credit card security', 'Healthcare records', 'Corporate financial reporting'], answer: 'Data privacy in Europe' },
        { question: 'Which compliance standard applies to handling credit card data?', options: ['HIPAA', 'SOX', 'PCI DSS', 'ISO 27001'], answer: 'PCI DSS' },
        { question: 'What does HIPAA protect?', options: ['Healthcare information', 'Financial records', 'European citizens', 'None'], answer: 'Healthcare information' },
        { question: 'What does SOC 2 focus on?', options: ['Security, availability, and processing integrity of cloud services', 'Credit card transactions', 'Employee safety', 'None'], answer: 'Security, availability, and processing integrity of cloud services' },
        { question: 'What is an audit trail?', options: ['A chronological record of system activities', 'A hiking path', 'A budget plan', 'None'], answer: 'A chronological record of system activities' }
      ]
    }
  };

  return dataMap[step] || {
    videoUrl: 'https://www.youtube.com/embed/jBzwzrDvZ18',
    questions: [
      { question: `What is the primary focus of ${step}?`, options: ['Fundamentals', 'Advanced Concepts', 'Deployment', 'None of the above'], answer: 'Fundamentals' },
      { question: `Which of these best describes a core concept in ${step}?`, options: ['Option A', 'Option B', 'Option C', 'Option D'], answer: 'Option A' },
      { question: 'What is a common challenge in this area?', options: ['Complexity', 'Simplicity', 'Cost', 'Time'], answer: 'Complexity' },
      { question: 'How often should you practice?', options: ['Daily', 'Weekly', 'Monthly', 'Never'], answer: 'Daily' },
      { question: 'What is the best way to learn?', options: ['Watching videos', 'Reading books', 'Building projects', 'Sleeping'], answer: 'Building projects' }
    ]
  };
};

const generateCourses = () => {
  const courses = [];
  const generatedNames = new Set();
  let attempts = 0;
  
  const adjectives = ['Advanced', 'Comprehensive', 'Complete', 'Modern', 'Practical', 'Professional', 'Ultimate', 'Essential', 'Applied', 'Interactive', 'Intensive', 'Accelerated', 'Foundational', 'Core', 'Mastering'];
  const formats = ['Bootcamp', 'Mastery', 'Specialization', 'Deep Dive', 'Pro', 'Masterclass', 'Certification', 'Program', 'Course', 'Workshop'];

  while (courses.length < 520 && attempts < 5200) {
    attempts++;
    const category = categories[Math.floor(Math.random() * categories.length)];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const format = formats[Math.floor(Math.random() * formats.length)];
    const name = `${adj} ${category} ${format}`;
    
    if (generatedNames.has(name)) continue;
    generatedNames.add(name);

    const roadmap = roadmapSteps[category] || ['Fundamentals', 'Basic Practice', 'Intermediate Projects', 'Advanced Concepts', 'Real-world Application', 'Certification'];
    const videoUrl = videoUrls[category] || 'https://www.youtube.com/embed/jBzwzrDvZ18';
    
    const modules = roadmap.map((step, idx) => {
      const moduleData = getModuleData(step);
      return {
        title: step,
        videoUrl: moduleData.videoUrl,
        questions: moduleData.questions
      };
    });

    courses.push({
      name: name,
      provider: providers[Math.floor(Math.random() * providers.length)],
      duration: `${Math.floor(Math.random() * 20) + 5} weeks`,
      level: levels[Math.floor(Math.random() * levels.length)],
      rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
      certificateAvailable: Math.random() > 0.2,
      skills: [category, 'Problem Solving', 'Project Management'].slice(0, 3),
      price: Math.random() > 0.3 ? `$${Math.floor(Math.random() * 100) + 10}` : 'Free',
      category: category,
      roadmap: roadmap,
      videoUrl: videoUrl,
      modules: modules
    });
  }
  return courses;
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai-job-portal');
    console.log('MongoDB connected for seeding...');
    await Course.deleteMany({});
    console.log('Old courses cleared.');
    const courses = generateCourses();
    await Course.insertMany(courses);
    console.log(`Successfully seeded ${courses.length} courses!`);
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
