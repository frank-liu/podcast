const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

const STORAGE_DIR = process.env.STORAGE_DIR || path.resolve(process.cwd(), 'tmp', 'audio');
const PORT = process.env.PORT || 8080;

function send404(res) {
  res.statusCode = 404;
  res.end('Not found');
}

const server = http.createServer((req, res) => {
  try {
    const safePath = path.normalize(decodeURIComponent(req.url.split('?')[0]));
    let filePath = path.join(STORAGE_DIR, safePath);
    // prevent directory traversal
    if (!filePath.startsWith(STORAGE_DIR)) return send404(res);

    fs.stat(filePath, (err, stat) => {
      if (err || !stat.isFile()) return send404(res);
      const type = mime.getType(filePath) || 'application/octet-stream';
      res.setHeader('Content-Type', type);
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
      stream.on('error', () => send404(res));
    });
  } catch (err) {
    send404(res);
  }
});

server.listen(PORT, () => {
  console.log(`Dev static server serving ${STORAGE_DIR} on http://localhost:${PORT}`);
});
