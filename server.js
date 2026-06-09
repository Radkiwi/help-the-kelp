const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function serveFile(res, filePath) {
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'text/plain';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 — Page not found</h1><p><a href="/">Return home</a></p>');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

http.createServer((req, res) => {
  // Strip query strings
  const urlPath = req.url.split('?')[0];

  // Resolve to file path
  let filePath = path.join(__dirname, urlPath);

  // If it's a directory, try index.html
  if (!path.extname(filePath)) {
    filePath = path.join(filePath, 'index.html');
  }

  // Prevent directory traversal
  const root = __dirname;
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  serveFile(res, resolved);
}).listen(PORT, () => {
  console.log(`Kelp Helpers running on port ${PORT}`);
});
