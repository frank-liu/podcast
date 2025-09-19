const fs = require('fs');
const path = require('path');

/**
 * Simple local storage adapter that writes buffers/strings to STORAGE_DIR
 * Exports: writeFile({ dir, filename, data }) => { filePath, url }
 */
async function ensureDir(dir) {
  return fs.promises.mkdir(dir, { recursive: true });
}

async function writeFile({ dir, filename, data }) {
  const storageDir = dir || process.env.STORAGE_DIR || path.resolve(process.cwd(), 'tmp', 'audio');
  await ensureDir(storageDir);
  const filePath = path.join(storageDir, filename);

  if (Buffer.isBuffer(data)) {
    await fs.promises.writeFile(filePath, data);
  } else if (typeof data === 'string') {
    await fs.promises.writeFile(filePath, data, 'utf8');
  } else if (data && data.stream && typeof data.pipe === 'function') {
    // accept readable stream
    await new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);
      data.pipe(writeStream);
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
  } else {
    throw new Error('Unsupported data type for writeFile');
  }

  // Return file:// path and file system path; for dev you can serve via HTTP server
  const fileUrl = `file://${filePath}`;
  return { filePath, url: fileUrl };
}

module.exports = { writeFile };
