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
    'PostgreSQL': {
      videoUrl: 'https://www.youtube.com/embed/qw--VYLpxG4',
      questions: [
        { question: 'What type of database is PostgreSQL?', options: ['NoSQL', 'Graph', 'Relational', 'Document'], answer: 'Relational' },
        { question: 'Which command is used to create a table?', options: ['CREATE TABLE', 'ADD TABLE', 'NEW TABLE', 'MAKE TABLE'], answer: 'CREATE TABLE' },
        { question: 'What language is used to query PostgreSQL?', options: ['Python', 'SQL', 'JavaScript', 'C++'], answer: 'SQL' },
        { question: 'Which clause is used to filter records?', options: ['ORDER BY', 'WHERE', 'GROUP BY', 'HAVING'], answer: 'WHERE' },
        { question: 'What does ACID stand for?', options: ['Atomicity, Consistency, Isolation, Durability', 'Active, Concurrent, Isolated, Direct', 'All, Core, Inside, Data', 'None'], answer: 'Atomicity, Consistency, Isolation, Durability' }
      ]
    },
    'Deployment': {
      videoUrl: 'https://www.youtube.com/embed/G608gB44HHE',
      questions: [
        { question: 'What is CI/CD?', options: ['Continuous Integration / Continuous Deployment', 'Code Integration / Code Deployment', 'Core Internal / Core Data', 'None'], answer: 'Continuous Integration / Continuous Deployment' },
        { question: 'Which platform is commonly used for deploying web apps?', options: ['Photoshop', 'Vercel', 'Excel', 'Word'], answer: 'Vercel' },
        { question: 'What is a container?', options: ['A box for shipping', 'A standard unit of software', 'A database', 'A framework'], answer: 'A standard unit of software' },
        { question: 'What does Docker do?', options: ['Edits photos', 'Containerizes applications', 'Writes code', 'Tests applications'], answer: 'Containerizes applications' },
        { question: 'What is a production environment?', options: ['Where code is written', 'Where code is tested', 'Where the live app runs', 'Where code is stored'], answer: 'Where the live app runs' }
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
    'Statistics': {
      videoUrl: 'https://www.youtube.com/embed/xxpc-HPKN28',
      questions: [
        { question: 'What is the mean?', options: ['The middle value', 'The most frequent value', 'The average value', 'The difference between highest and lowest'], answer: 'The average value' },
        { question: 'What is the median?', options: ['The middle value', 'The most frequent value', 'The average value', 'None'], answer: 'The middle value' },
        { question: 'What does standard deviation measure?', options: ['The average', 'The spread of data', 'The most frequent value', 'The total sum'], answer: 'The spread of data' },
        { question: 'What is a normal distribution?', options: ['A straight line', 'A bell-shaped curve', 'A square wave', 'A random scatter'], answer: 'A bell-shaped curve' },
        { question: 'What is a p-value used for?', options: ['Measuring distance', 'Hypothesis testing', 'Calculating area', 'Drawing graphs'], answer: 'Hypothesis testing' }
      ]
    },
    'Pandas/NumPy': {
      videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg',
      questions: [
        { question: 'What is NumPy primarily used for?', options: ['Web development', 'Numerical computing', 'UI design', 'Database management'], answer: 'Numerical computing' },
        { question: 'What is the core data structure in Pandas?', options: ['Array', 'List', 'DataFrame', 'Dictionary'], answer: 'DataFrame' },
        { question: 'How do you read a CSV file in Pandas?', options: ['pd.open_csv()', 'pd.read_csv()', 'pd.load_csv()', 'pd.get_csv()'], answer: 'pd.read_csv()' },
        { question: 'What does shape attribute return in NumPy?', options: ['The data type', 'The dimensions of the array', 'The sum of elements', 'The memory size'], answer: 'The dimensions of the array' },
        { question: 'How do you select a column in a Pandas DataFrame?', options: ['df.column_name', 'df["column_name"]', 'Both A and B', 'None of the above'], answer: 'Both A and B' }
      ]
    },
    'Visualization': {
      videoUrl: 'https://www.youtube.com/embed/a9UrKTVEeZA',
      questions: [
        { question: 'Which library is commonly used for plotting in Python?', options: ['Requests', 'Matplotlib', 'Flask', 'Django'], answer: 'Matplotlib' },
        { question: 'What kind of plot is best for showing proportions?', options: ['Line plot', 'Scatter plot', 'Pie chart', 'Histogram'], answer: 'Pie chart' },
        { question: 'What is Seaborn built on top of?', options: ['Plotly', 'Matplotlib', 'Bokeh', 'D3.js'], answer: 'Matplotlib' },
        { question: 'Which plot is used to show the distribution of a dataset?', options: ['Histogram', 'Line chart', 'Pie chart', 'Bar chart'], answer: 'Histogram' },
        { question: 'What does a scatter plot display?', options: ['Time series data', 'Relationship between two variables', 'Hierarchical data', 'Categorical data'], answer: 'Relationship between two variables' }
      ]
    },
    'ML Models': {
      videoUrl: 'https://www.youtube.com/embed/Gv9_4yMHFhI',
      questions: [
        { question: 'What is a target variable?', options: ['The variable to be predicted', 'The input feature', 'The learning rate', 'The loss function'], answer: 'The variable to be predicted' },
        { question: 'What is overfitting?', options: ['Model performs well on training but poorly on test data', 'Model performs poorly on both', 'Model performs perfectly on both', 'None'], answer: 'Model performs well on training but poorly on test data' },
        { question: 'Which metric is used for classification?', options: ['MSE', 'Accuracy', 'R-squared', 'MAE'], answer: 'Accuracy' },
        { question: 'What is cross-validation?', options: ['A method to assess model generalization', 'A way to clean data', 'An optimization algorithm', 'A type of neural network'], answer: 'A method to assess model generalization' },
        { question: 'What is a loss function?', options: ['A measure of model error', 'A type of data', 'A visualization technique', 'None'], answer: 'A measure of model error' }
      ]
    },
    'Math': {
      videoUrl: 'https://www.youtube.com/embed/T6sXqgOq54E',
      questions: [
        { question: 'Which branch of math is foundational for ML algorithms?', options: ['Linear Algebra', 'Geometry', 'Topology', 'Number Theory'], answer: 'Linear Algebra' },
        { question: 'What is a matrix?', options: ['A movie', 'A 2D array of numbers', 'A single number', 'A 3D shape'], answer: 'A 2D array of numbers' },
        { question: 'What does Calculus help optimize in ML?', options: ['Data size', 'Loss functions', 'Network speed', 'Memory usage'], answer: 'Loss functions' },
        { question: 'What is a vector?', options: ['A quantity with magnitude and direction', 'A type of database', 'A single point', 'None'], answer: 'A quantity with magnitude and direction' },
        { question: 'What is Probability used for in ML?', options: ['Drawing shapes', 'Handling uncertainty', 'Writing text', 'Styling UI'], answer: 'Handling uncertainty' }
      ]
    },
    'Scikit-Learn': {
      videoUrl: 'https://www.youtube.com/embed/0B5eIE_1vpU',
      questions: [
        { question: 'What is Scikit-Learn?', options: ['A web framework', 'A machine learning library in Python', 'A database', 'A UI library'], answer: 'A machine learning library in Python' },
        { question: 'Which method is used to train a model in Scikit-Learn?', options: ['train()', 'fit()', 'learn()', 'predict()'], answer: 'fit()' },
        { question: 'Which method is used to make predictions?', options: ['predict()', 'forecast()', 'guess()', 'infer()'], answer: 'predict()' },
        { question: 'What module is used to split data?', options: ['sklearn.split', 'sklearn.model_selection.train_test_split', 'sklearn.data.split', 'None'], answer: 'sklearn.model_selection.train_test_split' },
        { question: 'What is a Pipeline in Scikit-Learn?', options: ['A tube for water', 'A sequence of data processing steps', 'A type of model', 'None'], answer: 'A sequence of data processing steps' }
      ]
    },
    'TensorFlow': {
      videoUrl: 'https://www.youtube.com/embed/tPYj3fFJGjk',
      questions: [
        { question: 'Who developed TensorFlow?', options: ['Facebook', 'Microsoft', 'Google', 'Amazon'], answer: 'Google' },
        { question: 'What is a tensor?', options: ['A 1D array', 'A multi-dimensional array', 'A type of variable', 'A function'], answer: 'A multi-dimensional array' },
        { question: 'Which high-level API is commonly used with TensorFlow?', options: ['Keras', 'PyTorch', 'Scikit', 'Flask'], answer: 'Keras' },
        { question: 'What is an epoch?', options: ['A type of data', 'One complete pass through the training data', 'A loss function', 'None'], answer: 'One complete pass through the training data' },
        { question: 'What is used to minimize the loss function?', options: ['An optimizer', 'A compiler', 'A parser', 'A viewer'], answer: 'An optimizer' }
      ]
    },
    'Neural Nets': {
      videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
      questions: [
        { question: 'What are the building blocks of a neural network?', options: ['Cells', 'Neurons (Nodes)', 'Blocks', 'Modules'], answer: 'Neurons (Nodes)' },
        { question: 'What is an activation function?', options: ['A function that starts the computer', 'A function that introduces non-linearity', 'A sorting algorithm', 'None'], answer: 'A function that introduces non-linearity' },
        { question: 'What is Backpropagation?', options: ['An algorithm to update weights', 'A way to move backwards in code', 'A database rollback', 'None'], answer: 'An algorithm to update weights' },
        { question: 'Which layer receives the initial data?', options: ['Hidden Layer', 'Output Layer', 'Input Layer', 'Dense Layer'], answer: 'Input Layer' },
        { question: 'What is a hidden layer?', options: ['A secret file', 'A layer between input and output', 'An invisible element', 'None'], answer: 'A layer between input and output' }
      ]
    },
    'LLMs': {
      videoUrl: 'https://www.youtube.com/embed/zjkBMFhNj_g',
      questions: [
        { question: 'What does LLM stand for?', options: ['Large Language Model', 'Low Level Memory', 'Local Learning Module', 'Linear Logic Matrix'], answer: 'Large Language Model' },
        { question: 'Which architecture are modern LLMs typically based on?', options: ['CNN', 'RNN', 'Transformer', 'GAN'], answer: 'Transformer' },
        { question: 'What is a token?', options: ['A physical coin', 'A piece of a word or sentence', 'A password', 'None'], answer: 'A piece of a word or sentence' },
        { question: 'What is "prompt engineering"?', options: ['Building bridges', 'Crafting inputs to get desired outputs from an LLM', 'Writing low-level code', 'None'], answer: 'Crafting inputs to get desired outputs from an LLM' },
        { question: 'What is fine-tuning?', options: ['Adjusting volume', 'Training a pre-trained model on specific data', 'Cleaning data', 'None'], answer: 'Training a pre-trained model on specific data' }
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
    'AWS Core': {
      videoUrl: 'https://www.youtube.com/embed/3hLmDS179YE',
      questions: [
        { question: 'What is AWS?', options: ['A Web Server', 'Amazon Web Services', 'Advanced Wireless System', 'None'], answer: 'Amazon Web Services' },
        { question: 'Which AWS service is used for compute?', options: ['S3', 'RDS', 'EC2', 'IAM'], answer: 'EC2' },
        { question: 'What is an AWS Region?', options: ['A physical location with data centers', 'A software program', 'A type of database', 'None'], answer: 'A physical location with data centers' },
        { question: 'What does IAM stand for?', options: ['Identity and Access Management', 'Internal Area Network', 'Internet Access Module', 'None'], answer: 'Identity and Access Management' },
        { question: 'Which service provides scalable object storage?', options: ['EC2', 'S3', 'Lambda', 'VPC'], answer: 'S3' }
      ]
    },
    'Security': {
      videoUrl: 'https://www.youtube.com/embed/inWWhwq6Qq4',
      questions: [
        { question: 'What is the principle of least privilege?', options: ['Giving users maximum access', 'Giving users only the access they need', 'No access for anyone', 'None'], answer: 'Giving users only the access they need' },
        { question: 'What does MFA stand for?', options: ['Multi-Factor Authentication', 'Main File Access', 'Modern Format API', 'None'], answer: 'Multi-Factor Authentication' },
        { question: 'What is encryption in transit?', options: ['Encrypting data stored on a disk', 'Encrypting data as it moves across a network', 'Hiding a hard drive', 'None'], answer: 'Encrypting data as it moves across a network' },
        { question: 'What is a DDoS attack?', options: ['Stealing passwords', 'Overwhelming a service with traffic', 'Deleting files', 'None'], answer: 'Overwhelming a service with traffic' },
        { question: 'What is a security group in cloud computing?', options: ['A team of guards', 'A virtual firewall for instances', 'A chat room', 'None'], answer: 'A virtual firewall for instances' }
      ]
    },
    'S3/EC2': {
      videoUrl: 'https://www.youtube.com/embed/lZAoFs75_cs',
      questions: [
        { question: 'What does S3 stand for?', options: ['Simple Storage Service', 'Secure Storage System', 'Standard Server Setup', 'None'], answer: 'Simple Storage Service' },
        { question: 'What does EC2 stand for?', options: ['Elastic Compute Cloud', 'Enterprise Core Computing', 'External Control Console', 'None'], answer: 'Elastic Compute Cloud' },
        { question: 'Are S3 buckets global or regional?', options: ['Regional', 'Global namespace', 'Local only', 'None'], answer: 'Global namespace' },
        { question: 'What is an AMI?', options: ['Amazon Machine Image', 'Advanced Micro Interface', 'Application Master Instance', 'None'], answer: 'Amazon Machine Image' },
        { question: 'Can an EC2 instance run without an OS?', options: ['Yes', 'No', 'Sometimes', 'Only on Linux'], answer: 'No' }
      ]
    },
    'Lambda': {
      videoUrl: 'https://www.youtube.com/embed/eOBq__h4OJ4',
      questions: [
        { question: 'What is AWS Lambda?', options: ['A serverless compute service', 'A database', 'A storage service', 'A Greek letter'], answer: 'A serverless compute service' },
        { question: 'Do you need to provision servers for Lambda?', options: ['Yes, always', 'No', 'Only for large workloads', 'None'], answer: 'No' },
        { question: 'How is Lambda billed?', options: ['Per month', 'Per compute time consumed', 'Per user', 'Flat fee'], answer: 'Per compute time consumed' },
        { question: 'What triggers a Lambda function?', options: ['Only manual clicks', 'Events', 'Nothing', 'Only HTTP requests'], answer: 'Events' },
        { question: 'Can Lambda run Python code?', options: ['Yes', 'No', 'Only on weekends', 'None'], answer: 'Yes' }
      ]
    },
    'Kubernetes': {
      videoUrl: 'https://www.youtube.com/embed/X48VuDVv0do',
      questions: [
        { question: 'What is Kubernetes primarily used for?', options: ['Container orchestration', 'Writing code', 'Designing UI', 'Database management'], answer: 'Container orchestration' },
        { question: 'What is the smallest deployable unit in Kubernetes?', options: ['Container', 'Pod', 'Node', 'Cluster'], answer: 'Pod' },
        { question: 'What does a ReplicaSet do?', options: ['Maintains a stable set of replica Pods', 'Deletes data', 'Updates images', 'None'], answer: 'Maintains a stable set of replica Pods' },
        { question: 'What is kubectl?', options: ['A programming language', 'A command-line tool for Kubernetes', 'A database', 'None'], answer: 'A command-line tool for Kubernetes' },
        { question: 'What is a Node in Kubernetes?', options: ['A worker machine', 'A JavaScript runtime', 'A network switch', 'None'], answer: 'A worker machine' }
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
    'CISSP': {
      videoUrl: 'https://www.youtube.com/embed/jBzwzrDvZ18',
      questions: [
        { question: 'What does CISSP stand for?', options: ['Certified Information Systems Security Professional', 'Computer Internet Security Systems Protocol', 'Common Information Security Standard Practice', 'Certified Internet Security Systems Programmer'], answer: 'Certified Information Systems Security Professional' },
        { question: 'Which domain covers physical security?', options: ['Domain 1', 'Domain 3', 'Domain 5', 'Domain 7'], answer: 'Domain 5' },
        { question: 'What is the CIA triad?', options: ['Confidentiality, Integrity, Availability', 'Control, Identity, Access', 'Cost, Impact, Assessment', 'None'], answer: 'Confidentiality, Integrity, Availability' },
        { question: 'What is principle of least privilege?', options: ['Users are given only the minimum permissions needed', 'Everyone is an admin', 'No one has access', 'None'], answer: 'Users are given only the minimum permissions needed' },
        { question: 'What is risk mitigation?', options: ['Reducing the impact or likelihood of a risk', 'Ignoring a risk', 'Transferring a risk to insurance', 'None'], answer: 'Reducing the impact or likelihood of a risk' }
      ]
    },
    'Principles': {
      videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
      questions: [
        { question: 'What is UI?', options: ['User Interaction', 'User Interface', 'Universal Integration', 'None'], answer: 'User Interface' },
        { question: 'What is UX?', options: ['User Exchange', 'User Experience', 'Universal Experience', 'None'], answer: 'User Experience' },
        { question: 'What is whitespace in design?', options: ['Empty space between elements', 'Only white colored areas', 'A type of font', 'None'], answer: 'Empty space between elements' },
        { question: 'What does hierarchy do in design?', options: ['Makes everything look the same', 'Guides the eye to what is important', 'Hides elements', 'None'], answer: 'Guides the eye to what is important' },
        { question: 'What is contrast used for?', options: ['Blending things together', 'Making elements stand out', 'Creating errors', 'None'], answer: 'Making elements stand out' }
      ]
    },
    'Figma': {
      videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
      questions: [
        { question: 'What is Figma primarily used for?', options: ['Video editing', 'UI/UX Design', '3D Modeling', 'Coding'], answer: 'UI/UX Design' },
        { question: 'Is Figma browser-based?', options: ['Yes', 'No', 'Only on Linux', 'None'], answer: 'Yes' },
        { question: 'What is an Auto Layout in Figma?', options: ['A way to automatically resize and align layers', 'A car simulation', 'A coding script', 'None'], answer: 'A way to automatically resize and align layers' },
        { question: 'What are Components in Figma?', options: ['Reusable design elements', 'Hardware parts', 'Plugins', 'None'], answer: 'Reusable design elements' },
        { question: 'Can multiple people edit a Figma file simultaneously?', options: ['Yes', 'No', 'Only admins', 'None'], answer: 'Yes' }
      ]
    },
    'User Research': {
      videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
      questions: [
        { question: 'Why conduct user research?', options: ['To guess what users want', 'To understand user needs and behaviors', 'To write code', 'None'], answer: 'To understand user needs and behaviors' },
        { question: 'What is qualitative research?', options: ['Numbers and metrics', 'Observations and interviews', 'Coding tests', 'None'], answer: 'Observations and interviews' },
        { question: 'What is a user persona?', options: ['A real person', 'A fictional representation of a target user type', 'A password', 'None'], answer: 'A fictional representation of a target user type' },
        { question: 'What is an interview script used for?', options: ['Acting in a play', 'Guiding a research session consistently', 'Hacking', 'None'], answer: 'Guiding a research session consistently' },
        { question: 'What is a survey?', options: ['A quantitative research method', 'A qualitative deep dive', 'A UI element', 'None'], answer: 'A quantitative research method' }
      ]
    },
    'Prototyping': {
      videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
      questions: [
        { question: 'What is a prototype?', options: ['The final product', 'A preliminary interactive model', 'A text document', 'None'], answer: 'A preliminary interactive model' },
        { question: 'What is a low-fidelity prototype?', options: ['A fully coded app', 'A basic sketch or wireframe', 'A high-res image', 'None'], answer: 'A basic sketch or wireframe' },
        { question: 'Why prototype?', options: ['To test ideas before building', 'To delay the project', 'To write less code', 'None'], answer: 'To test ideas before building' },
        { question: 'What is a hotspot in a prototype?', options: ['A warm area', 'A clickable area that triggers an action', 'A bug', 'None'], answer: 'A clickable area that triggers an action' },
        { question: 'Can you prototype in Figma?', options: ['Yes', 'No', 'Only with plugins', 'None'], answer: 'Yes' }
      ]
    },
    'Testing': {
      videoUrl: 'https://www.youtube.com/embed/bwj2s_5e12U',
      questions: [
        { question: 'What is usability testing?', options: ['Testing server load', 'Observing users interacting with a product', 'Writing unit tests', 'None'], answer: 'Observing users interacting with a product' },
        { question: 'What is A/B testing?', options: ['Testing alphabets', 'Comparing two versions to see which performs better', 'A grade', 'None'], answer: 'Comparing two versions to see which performs better' },
        { question: 'Who should participate in usability testing?', options: ['Only the designers', 'Representative users', 'Random people', 'The CEO'], answer: 'Representative users' },
        { question: 'What is a task in usability testing?', options: ['A chore', 'An action the user is asked to perform', 'A bug', 'None'], answer: 'An action the user is asked to perform' },
        { question: 'What is a think-aloud protocol?', options: ['Users verbalize their thoughts while testing', 'Yelling at the computer', 'A voice assistant', 'None'], answer: 'Users verbalize their thoughts while testing' }
      ]
    },
    'Design Systems': {
      videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
      questions: [
        { question: 'What is a design system?', options: ['A collection of reusable components and guidelines', 'A specific software', 'A color palette only', 'None'], answer: 'A collection of reusable components and guidelines' },
        { question: 'Why use a design system?', options: ['To ensure consistency across products', 'To make design slower', 'To confuse developers', 'None'], answer: 'To ensure consistency across products' },
        { question: 'What are design tokens?', options: ['Cryptocurrency', 'Variables for design values like colors and spacing', 'Badges', 'None'], answer: 'Variables for design values like colors and spacing' },
        { question: 'Who benefits from a design system?', options: ['Only designers', 'Only developers', 'Both designers and developers', 'None'], answer: 'Both designers and developers' },
        { question: 'Is Material Design a design system?', options: ['Yes', 'No', 'It is a font', 'None'], answer: 'Yes' }
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
    'Bitcoin Basics': {
      videoUrl: 'https://www.youtube.com/embed/bBC-nXj3Ng4',
      questions: [
        { question: 'Who created Bitcoin?', options: ['Elon Musk', 'Satoshi Nakamoto', 'Vitalik Buterin', 'Steve Jobs'], answer: 'Satoshi Nakamoto' },
        { question: 'What is the maximum supply of Bitcoin?', options: ['Infinite', '21 Million', '100 Million', '1 Billion'], answer: '21 Million' },
        { question: 'What consensus mechanism does Bitcoin use?', options: ['Proof of Stake', 'Proof of Work', 'Proof of History', 'None'], answer: 'Proof of Work' },
        { question: 'What is a block reward?', options: ['New bitcoins given to miners', 'A trophy', 'A penalty', 'None'], answer: 'New bitcoins given to miners' },
        { question: 'What is a public key?', options: ['A password', 'An address others can use to send funds to you', 'A physical key', 'None'], answer: 'An address others can use to send funds to you' }
      ]
    },
    'Solidity': {
      videoUrl: 'https://www.youtube.com/embed/ipwxYa-F1uY',
      questions: [
        { question: 'What is Solidity used for?', options: ['Web design', 'Writing Smart Contracts on Ethereum', 'Database management', 'Machine Learning'], answer: 'Writing Smart Contracts on Ethereum' },
        { question: 'Which programming language is Solidity most similar to?', options: ['JavaScript/C++', 'Python', 'Ruby', 'HTML'], answer: 'JavaScript/C++' },
        { question: 'What is a contract in Solidity?', options: ['A legal document', 'Similar to a class in OOP', 'A database table', 'None'], answer: 'Similar to a class in OOP' },
        { question: 'What does "payable" mean in Solidity?', options: ['A function that can receive Ether', 'A variable that costs money', 'An error', 'None'], answer: 'A function that can receive Ether' },
        { question: 'Which EVM network does Solidity compile to?', options: ['Bitcoin Virtual Machine', 'Ethereum Virtual Machine', 'Solana Virtual Machine', 'None'], answer: 'Ethereum Virtual Machine' }
      ]
    },
    'Ethereum': {
      videoUrl: 'https://www.youtube.com/embed/jBzwzrDvZ18',
      questions: [
        { question: 'Who is the co-founder of Ethereum?', options: ['Satoshi Nakamoto', 'Vitalik Buterin', 'Charles Hoskinson', 'None of the above'], answer: 'Vitalik Buterin' },
        { question: 'What is the native cryptocurrency of Ethereum?', options: ['Bitcoin', 'Ether (ETH)', 'Solana', 'Cardano'], answer: 'Ether (ETH)' },
        { question: 'What consensus mechanism does Ethereum 2.0 use?', options: ['Proof of Work', 'Proof of Stake', 'Proof of History', 'Proof of Authority'], answer: 'Proof of Stake' },
        { question: 'What is a smart contract?', options: ['A smart person', 'Self-executing code on the blockchain', 'A legal document', 'None'], answer: 'Self-executing code on the blockchain' },
        { question: 'What is gas in Ethereum?', options: ['Fuel for cars', 'A fee required to execute transactions', 'A token', 'None'], answer: 'A fee required to execute transactions' }
      ]
    },
    'Smart Contracts': {
      videoUrl: 'https://www.youtube.com/embed/jBzwzrDvZ18',
      questions: [
        { question: 'What is a defining feature of a smart contract?', options: ['It is self-executing', 'It requires a lawyer', 'It can be deleted easily', 'It only works offline'], answer: 'It is self-executing' },
        { question: 'Can a deployed smart contract code be changed?', options: ['Yes, anytime', 'No, it is immutable', 'Only by admins', 'None'], answer: 'No, it is immutable' },
        { question: 'What happens if a smart contract transaction fails?', options: ['State is reverted', 'Partial state is saved', 'Nothing happens to gas', 'None'], answer: 'State is reverted' },
        { question: 'What is a decentralized application (dApp)?', options: ['A web app on AWS', 'An application built on smart contracts', 'A mobile app', 'None'], answer: 'An application built on smart contracts' },
        { question: 'Why are smart contracts trustless?', options: ['They are unreliable', 'Code enforces the rules, so human trust isn’t needed', 'They lie', 'None'], answer: 'Code enforces the rules, so human trust isn’t needed' }
      ]
    },
    'Web3.js': {
      videoUrl: 'https://www.youtube.com/embed/jBzwzrDvZ18',
      questions: [
        { question: 'What is Web3.js?', options: ['A CSS framework', 'A JavaScript library to interact with Ethereum', 'A database', 'None'], answer: 'A JavaScript library to interact with Ethereum' },
        { question: 'What does Web3.js connect to?', options: ['An Ethereum node', 'A SQL database', 'A MongoDB instance', 'None'], answer: 'An Ethereum node' },
        { question: 'What is a common provider used with Web3.js in browsers?', options: ['Chrome', 'MetaMask', 'AWS', 'None'], answer: 'MetaMask' },
        { question: 'What format does Web3.js use for contract interfaces?', options: ['XML', 'ABI (Application Binary Interface)', 'CSV', 'YAML'], answer: 'ABI (Application Binary Interface)' },
        { question: 'What unit does Web3.js commonly use for Ether?', options: ['Dollars', 'Wei', 'Satoshis', 'Cents'], answer: 'Wei' }
      ]
    }
  };

  const fallbackUrls = {
    'PostgreSQL': 'https://www.youtube.com/embed/qw--VYLpxG4',
    'Deployment': 'https://www.youtube.com/embed/jBzwzrDvZ18',
    'Statistics': 'https://www.youtube.com/embed/xxpc-HPKN28',
    'Pandas/NumPy': 'https://www.youtube.com/embed/vmEHCJofslg',
    'Visualization': 'https://www.youtube.com/embed/a9UrKTVEeZA',
    'ML Models': 'https://www.youtube.com/embed/Gv9_4yMHFhI',
    'Math': 'https://www.youtube.com/embed/jBzwzrDvZ18',
    'Scikit-Learn': 'https://www.youtube.com/embed/0B5eIE_1vpU',
    'TensorFlow': 'https://www.youtube.com/embed/tPYj3fFJGjk',
    'Neural Nets': 'https://www.youtube.com/embed/aircAruvnKk',
    'LLMs': 'https://www.youtube.com/embed/zjkBMFhNj_g',
    'AWS Core': 'https://www.youtube.com/embed/3hLmDS179YE',
    'Security': 'https://www.youtube.com/embed/jBzwzrDvZ18',
    'S3/EC2': 'https://www.youtube.com/embed/lZAoFs75_cs',
    'Lambda': 'https://www.youtube.com/embed/eOBq__h4OJ4',
    'Kubernetes': 'https://www.youtube.com/embed/X48VuDVv0do',
    'Principles': 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
    'Figma': 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
    'User Research': 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
    'Prototyping': 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
    'Testing': 'https://www.youtube.com/embed/bwj2s_5e12U',
    'Design Systems': 'https://www.youtube.com/embed/c9Wg6Cb_YlU',
    'Bitcoin Basics': 'https://www.youtube.com/embed/bBC-nXj3Ng4',
    'Solidity': 'https://www.youtube.com/embed/ipwxYa-F1uY',
    'Ethereum': 'https://www.youtube.com/embed/jBzwzrDvZ18',
    'Smart Contracts': 'https://www.youtube.com/embed/jBzwzrDvZ18',
    'Web3.js': 'https://www.youtube.com/embed/jBzwzrDvZ18'
  };

  const moduleData = dataMap[step] || {
    videoUrl: fallbackUrls[step] || 'https://www.youtube.com/embed/jBzwzrDvZ18',
    questions: [
      { question: `What is the primary focus of ${step}?`, options: ['Fundamentals', 'Advanced Concepts', 'Deployment', 'None of the above'], answer: 'Fundamentals' },
      { question: `Which of these best describes a core concept in ${step}?`, options: ['Option A', 'Option B', 'Option C', 'Option D'], answer: 'Option A' },
      { question: 'What is a common challenge in this area?', options: ['Complexity', 'Simplicity', 'Cost', 'Time'], answer: 'Complexity' },
      { question: 'How often should you practice?', options: ['Daily', 'Weekly', 'Monthly', 'Never'], answer: 'Daily' },
      { question: 'What is the best way to learn?', options: ['Watching videos', 'Reading books', 'Building projects', 'Sleeping'], answer: 'Building projects' }
    ]
  };

  return {
    ...moduleData,
    videoUrl: moduleData.videoUrl || fallbackUrls[step] || 'https://www.youtube.com/embed/jBzwzrDvZ18',
    task: {
      question: `Write a short reflection on what you have learned about ${step} and how you plan to apply it. (Max 200 words)`
    }
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
