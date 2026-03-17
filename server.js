const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const OUT = path.join(__dirname, 'out');

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.txt':  'text/plain',
  '.xml':  'application/xml',
};

function resolve(url) {
  const clean = url.split('?')[0];
  const candidates = [
    path.join(OUT, clean),
    path.join(OUT, clean, 'index.html'),
    path.join(OUT, clean + '.html'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

http.createServer((req, res) => {
  const file = resolve(req.url) || path.join(OUT, '404.html');
  const exists = fs.existsSync(file);
  const ext = path.extname(file).toLowerCase();
  const type = mime[ext] || 'application/octet-stream';
  const status = exists ? (file.endsWith('404.html') && !resolve(req.url) ? 404 : 200) : 404;

  if (!exists) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  res.writeHead(status, {
    'Content-Type': type,
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
  });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => {
  console.log(`> Ready on port ${PORT}`);
});
