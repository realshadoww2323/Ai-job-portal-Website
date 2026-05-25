// This is a simple in-memory store for when MongoDB is not available
// This allows the app to work for demonstrations without any setup.

const jobTitles = ['Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist', 'AI Engineer', 'DevOps Engineer', 'Product Manager', 'UI/UX Designer', 'Mobile App Developer', 'Cybersecurity Analyst', 'Cloud Architect', 'QA Engineer', 'Marketing Manager', 'HR Specialist', 'Project Manager', 'Business Analyst', 'Systems Administrator', 'Network Engineer', 'Machine Learning Engineer'];
const companies = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple', 'Tesla', 'Adobe', 'Salesforce', 'Intel', 'Oracle', 'Spotify', 'Uber', 'Airbnb', 'Zomato', 'Swiggy', 'Infosys', 'TCS', 'Wipro', 'HCL'];
const locations = ['Bangalore', 'Hyderabad', 'Pune', 'Remote', 'Hybrid', 'Mumbai', 'Delhi', 'Chennai', 'Noida', 'Gurugram', 'San Francisco', 'London', 'Berlin', 'New York', 'Singapore'];
const skills = ['React', 'Node.js', 'Python', 'Java', 'Next.js', 'Tailwind CSS', 'AWS', 'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'TypeScript', 'Flutter', 'Go', 'Rust', 'TensorFlow', 'PyTorch'];

const generateJobs = (count) => {
  const jobs = [];
  for (let i = 1; i <= count; i++) {
    const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const jobSkills = Array.from({ length: 3 }, () => skills[Math.floor(Math.random() * skills.length)]);
    const exp = `${Math.floor(Math.random() * 5)}-${Math.floor(Math.random() * 5) + 5} Years`;
    const salary = `₹${Math.floor(Math.random() * 20) + 5} - ₹${Math.floor(Math.random() * 30) + 25} LPA`;

    jobs.push({
      _id: i.toString(),
      title: `${title}${i > 100 ? ' (Senior)' : ''}`,
      company: `${company} ${['Solutions', 'Tech', 'Systems', 'Global', 'Inc'][Math.floor(Math.random() * 5)]}`,
      description: `Join our team as a ${title}. We are looking for talented individuals to help us build the next generation of ${company} products. You will work on cutting-edge technologies including ${jobSkills.join(', ')}.\n\nAt ${company}, we believe in fostering a culture of innovation, collaboration, and relentless pursuit of excellence. As a key member of our engineering and product teams, you will be responsible for designing, developing, and maintaining high-performance software solutions that directly impact millions of users worldwide.\n\nAbout the Role:\nThis is a unique opportunity to tackle complex, high-scale technical challenges in a fast-paced environment. You will collaborate closely with product managers, designers, and fellow engineers to turn ambitious ideas into robust, scalable features. Your day-to-day will involve deep-dive problem solving, architecture design, and writing code that is clean, maintainable, and well-tested.\n\nKey Responsibilities:\n- Collaborate with cross-functional teams to define, design, and ship new features.\n- Write clean, maintainable, and efficient code following best practices.\n- Identify and resolve bottlenecks and bugs to ensure optimal performance.\n- Participate in code reviews to maintain code quality and share knowledge.\n- Mentor junior team members and help raise the engineering bar.\n- Stay up-to-date with emerging technologies and industry trends to continuously improve our technical stack.\n\nRequirements & Qualifications:\n- Strong foundation in computer science principles, algorithms, and data structures.\n- Proven experience in building and deploying scalable applications in production.\n- Excellent problem-solving skills and a strong sense of ownership.\n- Strong communication skills, with the ability to articulate technical decisions to both technical and non-technical stakeholders.\n\nWhat We Offer:\n- Highly competitive base salary, generous equity packages, and annual performance bonuses.\n- Comprehensive health, dental, vision, and mental wellness insurance.\n- Unlimited paid time off (PTO) and flexible working hours.\n- Remote work options with a generous home-office stipend.\n- Professional development opportunities, including learning stipends, conference sponsorships, and leadership training.\n- A supportive and inclusive work environment where your ideas are valued and your growth is prioritized.\n\nIf you are passionate about technology, thrive on solving hard problems, and want to make a real difference, we would love to hear from you. Apply now to embark on an exciting journey with ${company} and help us shape the future of our industry!`,
      requirements: [...new Set(jobSkills)],
      location,
      salaryRange: salary,
      experience: exp,
      status: 'active',
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000))
    });
  }
  return jobs;
};

const categories = ['Web Development', 'Data Science', 'Machine Learning', 'Cloud Computing', 'Cybersecurity', 'UI/UX Design', 'Blockchain'];
const roadmaps = {
  'Web Development': ['HTML/CSS', 'JS Basics', 'React', 'Node.js', 'PostgreSQL', 'Deployment'],
  'Data Science': ['Python', 'Statistics', 'Pandas/NumPy', 'Visualization', 'ML Models', 'Deployment'],
  'Machine Learning': ['Math', 'Python', 'Scikit-Learn', 'TensorFlow', 'Neural Nets', 'LLMs'],
  'Cloud Computing': ['AWS Core', 'Networking', 'Security', 'S3/EC2', 'Lambda', 'Kubernetes'],
  'Cybersecurity': ['Networking', 'Linux', 'Ethical Hacking', 'Pen Testing', 'Security Ops', 'CISSP'],
  'UI/UX Design': ['Principles', 'Figma', 'User Research', 'Prototyping', 'Testing', 'Design Systems'],
  'Blockchain': ['Cryptography', 'Bitcoin Basics', 'Solidity', 'Ethereum', 'Smart Contracts', 'Web3.js']
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

const generateCourses = (count) => {
  const courses = [];
  const generatedNames = new Set();
  let i = 1;
  let attempts = 0;
  
  const adjectives = ['Advanced', 'Comprehensive', 'Complete', 'Modern', 'Practical', 'Professional', 'Ultimate', 'Essential', 'Applied', 'Interactive', 'Intensive', 'Accelerated', 'Foundational', 'Core', 'Mastering'];
  const formats = ['Bootcamp', 'Mastery', 'Specialization', 'Deep Dive', 'Pro', 'Masterclass', 'Certification', 'Program', 'Course', 'Workshop'];

  while (courses.length < count && attempts < count * 10) {
    attempts++;
    const category = categories[Math.floor(Math.random() * categories.length)];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const format = formats[Math.floor(Math.random() * formats.length)];
    const name = `${adj} ${category} ${format}`;
    
    if (generatedNames.has(name)) continue;
    generatedNames.add(name);

    const roadmap = roadmaps[category] || ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];
    
    const modules = roadmap.map((step, idx) => {
      const moduleData = getModuleData(step);
      return {
        title: step,
        videoUrl: moduleData.videoUrl,
        questions: moduleData.questions
      };
    });

    courses.push({
      _id: i.toString(),
      name: name,
      provider: ['Coursera', 'Udemy', 'edX', 'Meta', 'Google'][Math.floor(Math.random() * 5)],
      duration: `${Math.floor(Math.random() * 10) + 4} Weeks`,
      level: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)],
      rating: (Math.random() * (5 - 4) + 4).toFixed(1),
      price: Math.random() > 0.3 ? `$${Math.floor(Math.random() * 100) + 20}` : 'Free',
      category: category,
      roadmap: roadmap,
      skills: [category, 'Problem Solving'],
      createdAt: new Date(),
      videoUrl: videoUrls[category] || 'https://www.youtube.com/embed/jBzwzrDvZ18',
      modules: modules
    });
    i++;
  }
  return courses;
};

const mockStore = {
  users: [
    { id: 'admin1', name: 'Admin User', email: 'admin@example.com', password: 'password123', role: 'admin', lastLogin: new Date(), interviewStatus: { attended: false } },
    { id: 'seeker1', name: 'John Doe', email: 'seeker@example.com', password: 'password123', role: 'seeker', lastLogin: new Date(Date.now() - 3600000), interviewStatus: { attended: true, lastAttendedAt: new Date(), score: 85 } },
    { id: 'recruiter1', name: 'Jane Smith', email: 'recruiter@example.com', password: 'password123', role: 'recruiter', lastLogin: new Date(Date.now() - 86400000), interviewStatus: { attended: false } }
  ],
  jobs: generateJobs(1005),
  courses: generateCourses(525),
  applications: [],
  codes: [
    { _id: '1', code: 'AIPORTAL50', discount: '50%', type: 'Job Posting', status: 'active', expiry: '2026-12-31' },
    { _id: '2', code: 'FREEJOB', discount: '100%', type: 'Job Posting', status: 'active', expiry: '2026-06-30' },
    { _id: '3', code: 'LEARNAI20', discount: '20%', type: 'Premium Course', status: 'active', expiry: '2026-09-15' },
    { _id: '4', code: 'WELCOME10', discount: '10%', type: 'All Services', status: 'expired', expiry: '2025-12-31' }
  ]
};

// Helper to find a user
const findUser = (email) => mockStore.users.find(u => u.email === email);

// Helper to add a user
const addUser = (user) => {
  const newUser = { 
    ...user, 
    id: Date.now().toString(), 
    lastLogin: new Date(),
    interviewStatus: { attended: false }
  };
  mockStore.users.push(newUser);
  return newUser;
};

module.exports = { mockStore, findUser, addUser };
