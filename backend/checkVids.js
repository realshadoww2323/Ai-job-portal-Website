const fs = require('fs');
const https = require('https');

const mockDbPath = './src/utils/mockDb.js';
const seedCoursesPath = './seedCourses.js';

let content = fs.readFileSync(mockDbPath, 'utf8');
const regex = /https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/g;

const matches = [...content.matchAll(regex)];
const ids = [...new Set(matches.map(m => m[1]))];

console.log(`Found ${ids.length} unique video IDs. Checking availability...`);

const checkVideo = (id) => {
  return new Promise((resolve) => {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
    https.get(url, (res) => {
      resolve({ id, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ id, status: 'error' });
    });
  });
};

async function run() {
  const broken = [];
  for (const id of ids) {
    const res = await checkVideo(id);
    console.log(`${id}: ${res.status}`);
    if (res.status !== 200) {
      broken.push(id);
    }
  }
  
  console.log('Broken videos:', broken);
  
  if (broken.length > 0) {
    console.log('Replacing broken videos with a working placeholder...');
    const placeholder = 'jBzwzrDvZ18'; // known working fallback
    
    let updatedMock = content;
    let updatedSeed = fs.readFileSync(seedCoursesPath, 'utf8');
    
    broken.forEach(id => {
      const brokenUrl = `https://www.youtube.com/embed/${id}`;
      const placeholderUrl = `https://www.youtube.com/embed/${placeholder}`;
      updatedMock = updatedMock.split(brokenUrl).join(placeholderUrl);
      updatedSeed = updatedSeed.split(brokenUrl).join(placeholderUrl);
    });
    
    fs.writeFileSync(mockDbPath, updatedMock);
    fs.writeFileSync(seedCoursesPath, updatedSeed);
    console.log('Replaced successfully.');
  }
}

run();
