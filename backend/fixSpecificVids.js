const fs = require('fs');

const mockDbPath = './src/utils/mockDb.js';
const seedCoursesPath = './seedCourses.js';

const replacements = {
  'Network Security': 'zIWGjkr0ENE',
  'Pen Testing': 'B7tTQ272OHE',
  'Advanced Pentesting': 'B7tTQ272OHE',
  'Security Ops': '_emYMF9uxMc',
  'Incident Response': '_emYMF9uxMc',
  'CISSP': '_nyZhYnCNLA',
  'Compliance': 'zIWGjkr0ENE',
  'Game Development': 'zJSY8tbf_ys',
  'AR/VR': 'zJSY8tbf_ys',
  'Cybersecurity': 'zIWGjkr0ENE'
};

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  for (const [moduleName, newId] of Object.entries(replacements)) {
    // For moduleData
    const regexModule = new RegExp(`('${moduleName}':\\s*{\\s*videoUrl:\\s*'https://www\\.youtube\\.com/embed/)[a-zA-Z0-9_-]{11}(')`, 'g');
    content = content.replace(regexModule, `$1${newId}$2`);
    
    // For videoUrls dict
    const regexDict = new RegExp(`('${moduleName}':\\s*'https://www\\.youtube\\.com/embed/)[a-zA-Z0-9_-]{11}(')`, 'g');
    content = content.replace(regexDict, `$1${newId}$2`);
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
}

fixFile(mockDbPath);
fixFile(seedCoursesPath);
