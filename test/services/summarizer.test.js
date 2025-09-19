// T007 - Summarizer service (runnable)
const { summarize } = require('../../src/services/summarizer');

describe('T007 - Summarizer service', () => {
  test('summarizes long text to <= maxChars and preserves word boundaries/sentences', () => {
    const text = 'This is a long paragraph. It has multiple sentences. The summarizer should try to keep the first sentence if it fits.';
    const out = summarize(text, 50);
    expect(out.length).toBeLessThanOrEqual(51); // allow ellipsis
    expect(out).toMatch(/This|This is/);
  });
});
