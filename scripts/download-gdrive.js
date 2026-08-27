const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, '..', 'assets', 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

function fetchUrl(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let nextUrl = res.headers.location;
        if (nextUrl.startsWith('/')) {
          const u = new URL(url);
          nextUrl = u.origin + nextUrl;
        }
        const cookies = res.headers['set-cookie'] ? res.headers['set-cookie'].map(c => c.split(';')[0]).join('; ') : '';
        const mergedHeaders = { ...headers };
        if (cookies) mergedHeaders['Cookie'] = cookies;
        return resolve(fetchUrl(nextUrl, mergedHeaders));
      }

      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(data)
        });
      });
    }).on('error', reject);
  });
}

async function downloadGDriveFile(fileId, filename) {
  const dest = path.join(videosDir, filename);
  console.log(`Downloading ${fileId} -> ${filename}...`);
  
  const initUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=0`;
  const res = await fetchUrl(initUrl);
  
  const contentType = res.headers['content-type'] || '';
  console.log(`Initial status: ${res.statusCode}, Content-Type: ${contentType}, Size: ${res.body.length}`);
  
  if (contentType.includes('video') || contentType.includes('octet-stream') || res.body.length > 500000) {
    fs.writeFileSync(dest, res.body);
    console.log(`Saved ${filename} (${(res.body.length / 1024 / 1024).toFixed(2)} MB)`);
    return true;
  }
  
  // Check if it's HTML with confirm token
  const html = res.body.toString('utf8');
  const confirmMatch = html.match(/confirm=([0-9A-Za-z_-]+)/) || html.match(/name="confirm" value="([^"]+)"/);
  
  if (confirmMatch) {
    const token = confirmMatch[1];
    const confirmUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=${token}&authuser=0`;
    console.log(`Using confirm token: ${token}`);
    const res2 = await fetchUrl(confirmUrl);
    fs.writeFileSync(dest, res2.body);
    console.log(`Saved ${filename} (${(res2.body.length / 1024 / 1024).toFixed(2)} MB)`);
    return true;
  }
  
  console.log(`Failed to parse download for ${fileId}`);
  return false;
}

async function main() {
  const files = [
    { id: '1p0-xTLKWKlgtxJWc_JDTmd-nbUM4jDB2', name: 'short1.mp4' },
    { id: '1Qeexul9kynsDU3lGVzT8pofR2dMygN9V', name: 'short2.mp4' },
    { id: '1Z_6pYZVcKCv964hIgqbKbLUS45u7zizS', name: 'short3.mp4' },
    { id: '1UdvgTlAtLIvxGPQ3IZAI1DTqswE6Eklp', name: 'short4.mp4' },
    { id: '1olgHcQnHMMgcPtR73jMRS0l6JEUXj51R', name: 'long1.mp4' }
  ];

  for (const f of files) {
    try {
      await downloadGDriveFile(f.id, f.name);
    } catch (e) {
      console.error(`Error downloading ${f.name}:`, e.message);
    }
  }
  console.log('Finished downloading videos to assets/videos!');
}

main();
