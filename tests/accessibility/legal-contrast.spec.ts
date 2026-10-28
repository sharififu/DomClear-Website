import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Scope the acceptance gate to this batch's known root causes; the whole-site
// discovery scan remains separate until its other findings are remediated.
const legalDocuments = [
  'index',
  'terms',
  'privacy',
  'cookies',
  'acceptable-use',
  'service-level',
];

function luminance(color: string): number {
  const channels = color.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  if (!channels || channels.length !== 3) throw new Error('Expected computed rgb(): ' + color);
  const [r, g, b] = channels.map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(first: string, second: string): number {
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

for (const doc of legalDocuments) {
  test('legal HTML links have sufficient contrast: ' + doc, async ({ page }) => {
    await page.goto('/legal/' + doc + '.html');
    const links = page.locator('body a[href]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i += 1) {
      const link = links.nth(i);
      const computed = await link.evaluate((element) => ({
        foreground: getComputedStyle(element).color,
        background: getComputedStyle(document.body).backgroundColor,
        decoration: getComputedStyle(element).textDecorationLine,
      }));
      // Legal documents explicitly use a white document canvas.
      const background = computed.background === 'rgba(0, 0, 0, 0)' ? 'rgb(255, 255, 255)' : computed.background;
      expect(contrastRatio(computed.foreground, background)).toBeGreaterThanOrEqual(4.5);
      expect(computed.decoration).toContain('underline');
    }

    const audit = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
    expect(audit.violations, JSON.stringify(audit.violations, null, 2)).toEqual([]);
  });
}

test('legal print buttons preserve readable hover state and keyboard focus', async ({ page }) => {
  await page.goto('/legal/privacy.html');
  const print = page.getByRole('button', { name: /Print/ });
  await print.hover();
  const colours = await print.evaluate((element) => ({
    foreground: getComputedStyle(element).color,
    background: getComputedStyle(element).backgroundColor,
  }));
  expect(contrastRatio(colours.foreground, colours.background)).toBeGreaterThanOrEqual(4.5);
  await print.focus();
  await expect(print).toHaveCSS('outline-style', 'solid');
});

test('Contact privacy link is persistently underlined, including before hover', async ({ page }) => {
  await page.goto('/contact');
  const link = page.getByRole('link', { name: 'Privacy Policy' });
  await expect(link).toHaveCSS('text-decoration-line', 'underline');
  await link.focus();
  await expect(link).toHaveCSS('outline-style', 'solid');
  const audit = await new AxeBuilder({ page }).withRules(['link-in-text-block']).analyze();
  expect(audit.violations, JSON.stringify(audit.violations, null, 2)).toEqual([]);
});

test('embedded legal pages retain accessible link contrast', async ({ page }) => {
  await page.goto('/legal/privacy');
  await expect(page.locator('iframe[title]')).toBeVisible();
  const audit = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
  expect(audit.violations, JSON.stringify(audit.violations, null, 2)).toEqual([]);
});
