import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const WHITE_CTA = 'a[class*="!text-[#1D4ED8]"]';
const routes: Array<[string, number]> = [
  ['/platform', 1],
  ['/solutions', 1],
  ['/pricing', 1],
  ['/home-care-scheduling-software', 2],
  ['/emar-software', 2],
  ['/care-planning-software', 2],
  ['/birdie-alternative', 2],
];

function luminance(rgb: string): number {
  const values = rgb.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  if (!values || values.length !== 3) throw new Error('Expected rgb() colour, got ' + rgb);
  const [r, g, b] = values.map((value) => {
    const c = value / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(first: string, second: string): number {
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

for (const [route, expectedCount] of routes) {
  test('white CTA blue text contrast on ' + route, async ({ page }) => {
    await page.goto(route);
    const links = page.locator(WHITE_CTA);
    await expect(links).toHaveCount(expectedCount);
    for (let i = 0; i < expectedCount; i++) {
      const link = links.nth(i);
      const normal = await link.evaluate((node) => ({
        foreground: getComputedStyle(node).color,
        background: getComputedStyle(node).backgroundColor,
      }));
      expect(normal.foreground).toBe('rgb(29, 78, 216)');
      expect(normal.background).toBe('rgb(255, 255, 255)');
      expect(contrastRatio(normal.foreground, normal.background)).toBeGreaterThanOrEqual(4.5);
      await expect(link).toHaveAttribute('href', /^https?:\/\//);
      await link.hover();
      // Axe evaluates the translucent hover background against the parent gradient.
      const audit = await new AxeBuilder({ page })
        .include(WHITE_CTA)
        .withRules(['color-contrast'])
        .analyze();
      expect(audit.violations, JSON.stringify(audit.violations, null, 2)).toEqual([]);
    }
  });
}
