const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const PUBLIC_DIR = __dirname;
const FRAMES_DIR = path.join(__dirname, 'Chef_finishing_gourmet_dish_with__20260921193130_gwr_video_mvp_frames');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  // CORS & caching headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Accept-Ranges', 'bytes');

  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') {
    reqPath = '/index.html';
  }

  // Handle route to frames
  let filePath;
  if (reqPath.startsWith('/frames/')) {
    const filename = path.basename(reqPath);
    filePath = path.join(FRAMES_DIR, filename);
  } else {
    filePath = path.join(PUBLIC_DIR, reqPath);
  }

  // Ensure within allowed directory
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found: ' + reqPath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Cache frames aggressively for seamless scroll scrubbing
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp') {
      res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
    } else {
      res.setHeader('Cache-Control', 'no-cache');
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
