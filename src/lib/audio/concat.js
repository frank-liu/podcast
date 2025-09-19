/**
 * Minimal concat for test purposes.
 * In production use ffmpeg or audio libraries. For unit tests we accept Buffers and
 * concatenate them, and provide a very rough duration estimate function.
 */
function concatBuffers(buffers) {
  const totalLength = buffers.reduce((s, b) => s + b.length, 0);
  const out = Buffer.allocUnsafe(totalLength);
  let offset = 0;
  for (const b of buffers) {
    out.set(b, offset);
    offset += b.length;
  }
  return out;
}

/**
 * Very rough duration estimator for tests: assume X bytes per second.
 * This is NOT audio-accurate; replace with real duration using ffprobe in prod.
 */
function estimateDurationSeconds(buffer, bytesPerSecond = 16000) {
  return Math.ceil(buffer.length / bytesPerSecond);
}

module.exports = { concatBuffers, estimateDurationSeconds };
