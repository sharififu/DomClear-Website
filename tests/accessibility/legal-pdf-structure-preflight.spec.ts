import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

// These PDF object-dictionary markers are a preliminary structure sanity
// check ONLY, not a WCAG/PDF-UA or screen-reader accessibility conformance test.
for (const file of ['cookies.pdf', 'acceptable-use.pdf', 'service-level.pdf']) {
  test('legal PDF structural metadata preflight: ' + file, () => {
    const raw = readFileSync('public/legal/' + file).toString('latin1');
    expect(raw.startsWith('%PDF-')).toBe(true);
    expect(raw).toContain('/StructTreeRoot');
    expect(raw).toContain('/MarkInfo');
    expect(raw).toContain('/Marked true');
    expect(raw).toContain('/Lang');
    expect(raw).toContain('/ToUnicode');
    expect(raw).toContain('/Title');
  });
}
