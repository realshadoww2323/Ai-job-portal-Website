const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace localhost:5000/api with /api
  content = content.replace(/http:\/\/localhost:5000\/api/g, '/api');
  
  // Replace localhost:8000 with process.env.NEXT_PUBLIC_AI_API_URL
  content = content.replace(/['"`]http:\/\/localhost:8000([^'"`]*)['"`]/g, '`${process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8000"}$1`');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
