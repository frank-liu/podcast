/**
 * Minimal summarizer for tests and PoC.
 * Behavior: given text and maxChars, returns a summary up to maxChars, trying to keep whole words.
 */
function summarize(text, maxChars = 200) {
  if (!text) return '';
  const trimmed = text.trim();
  if (trimmed.length <= maxChars) return trimmed;

  // try to cut at sentence boundary ('.', '!' or '?') before maxChars
  const snippet = trimmed.slice(0, maxChars + 1);
  const lastSentenceIdx = Math.max(snippet.lastIndexOf('.'), snippet.lastIndexOf('!'), snippet.lastIndexOf('?'));
  if (lastSentenceIdx > 0 && lastSentenceIdx >= Math.floor(maxChars * 0.5)) {
    return snippet.slice(0, lastSentenceIdx + 1).trim();
  }

  // otherwise cut at last space
  const lastSpace = snippet.lastIndexOf(' ');
  if (lastSpace > 0) return snippet.slice(0, lastSpace).trim() + '…';

  return snippet.slice(0, maxChars).trim() + '…';
}

module.exports = { summarize };
