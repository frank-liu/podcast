// T002 - Spike: Audio concat & duration enforcement (runnable)
const { concatBuffers, estimateDurationSeconds } = require('../../src/lib/audio/concat');

describe('T002 - Audio concat & duration enforcement', () => {
  test('concatenates buffers and estimated duration remains <= 600s', () => {
    const a = Buffer.from('aaaaa');
    const b = Buffer.from('bbbbbbbb');
    const c = Buffer.from('cc');

    const out = concatBuffers([a, b, c]);
    expect(out.length).toBe(a.length + b.length + c.length);

    const duration = estimateDurationSeconds(out, 1e6); // 1,000,000 bytes/sec -> tiny duration
    expect(duration).toBeLessThanOrEqual(600);
  });
});
