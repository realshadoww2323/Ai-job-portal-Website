const https = require('https');

const topics = [
  'Network Security full course',
  'Penetration Testing full course',
  'Security Operations Center SOC full course',
  'CISSP certification training',
  'Cybersecurity Compliance',
  'Game Development tutorial',
  'AR VR Development tutorial'
];

async function searchYoutube(query) {
  return new Promise((resolve, reject) => {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    https.get(searchUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/watch\?v=([a-zA-Z0-9_-]{11})/);
        if (match && match[1]) {
          resolve(match[1]);
        } else {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  for (let topic of topics) {
    const id = await searchYoutube(topic);
    console.log(`Topic: ${topic} -> ID: ${id}`);
  }
}

run();
