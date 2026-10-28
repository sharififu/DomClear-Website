import { expect, test } from '@playwright/test';

// File integrity only: these checks DO NOT establish tagged-PDF semantics,
// assistive-technology reading order or WCAG/UAAG/PDF accessibility.
const legalPdfs = [
  { label: 'Cookie Policy', name: 'cookies.pdf' },
  { label: 'Acceptable Use Policy', name: 'acceptable-use.pdf' },
  { label: 'Service Level Statement', name: 'service-level.pdf' },
];

for (const item of legalPdfs) {
  test('legal PDF asset serves real PDF bytes: ' + item.name, async ({ page, request }) => {
    await page.goto('/legal/index.html');
    const pdfLink = page.locator('a.link-pdf[href="' + item.name + '"]');
    await expect(pdfLink).toHaveCount(1);
    await expect(pdfLink).toHaveAttribute('download', '');

    const url = await pdfLink.evaluate((a) => (a as HTMLAnchorElement).href);
    expect(new URL(url).pathname).toBe('/legal/' + item.name);

    const response = await request.get(url);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']?.toLowerCase()).toContain('application/pdf');

    const bytes = await response.body();
    expect(bytes.byteLength).toBeGreaterThan(100);
    expect(bytes.subarray(0, 5).toString('ascii')).toBe('%PDF-');
  });
}
