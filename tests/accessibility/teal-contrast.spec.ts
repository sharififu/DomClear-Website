import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const TEAL = 'rgb(15, 118, 110)'; // #0F766E
const TEAL_HOVER = 'rgb(17, 94, 89)'; // #115E59
const selector = '[class*="bg-[#0F766E]"]';

function luminance(rgb: string): number {
  const values = rgb.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  if (!values || values.length !== 3) {
    throw new Error('Unexpected computed colour: ' + rgb);
  }
  const [r, g, b] = values.map((v) => {
    const channel = v / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground: string, background: string): number {
  const fg = luminance(foreground);
  const bg = luminance(background);
  return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
}

async function checkTealElements(page: import('@playwright/test').Page, countMinimum: number) {
  const elements = page.locator(selector);
  const count = await elements.count();
  expect(count).toBeGreaterThanOrEqual(countMinimum);
  for (let i = 0; i < count; i++) {
    const element = elements.nth(i);
    const colours = await element.evaluate((node) => ({
      foreground: getComputedStyle(node).color,
      background: getComputedStyle(node).backgroundColor,
    }));
    expect(colours.background).toBe(TEAL);
    expect(contrastRatio(colours.foreground, colours.background)).toBeGreaterThanOrEqual(4.5);
  }
  const audit = await new AxeBuilder({ page }).include(selector).withRules(['color-contrast']).analyze();
  expect(audit.violations, JSON.stringify(audit.violations, null, 2)).toEqual([]);
}

for (const [route, minCount] of [
  ['/', 1],
  ['/about', 2],
  ['/pricing', 5],
  ['/signup', 5],
] as const) {
  test('teal accent text contrast on ' + route, async ({ page }) => {
    await page.goto(route);
    await checkTealElements(page, minCount);
  });
}

test('hovered accent CTA stays readable and keeps trial destination', async ({ page }) => {
  await page.goto('/');
  const trial = page.locator('a' + selector).first();
  await expect(trial).toHaveAttribute('href', /.+/);
  await trial.hover();
  await expect(trial).toHaveCSS('background-color', TEAL_HOVER);
  const colours = await trial.evaluate((node) => ({
    foreground: getComputedStyle(node).color,
    background: getComputedStyle(node).backgroundColor,
  }));
  expect(contrastRatio(colours.foreground, colours.background)).toBeGreaterThanOrEqual(4.5);
});
