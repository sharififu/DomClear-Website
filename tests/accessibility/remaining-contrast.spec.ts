import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Regression gate for all seven previously confirmed axe color-contrast nodes.
// This checks only the initial page state and the affected labels/links.
const cases = [
  { route: '/about', selectors: ['p.text-\\[\\#0F766E\\]'], min: 2 },
  { route: '/credentials', selectors: ['p.text-\\[\\#0F766E\\]', 'p.text-\\[\\#475569\\]'], min: 3 },
  { route: '/company-information', selectors: ['a span.text-\\[\\#1D4ED8\\]'], min: 2 },
];

for (const entry of cases) {
  test('remaining light-surface text contrast on ' + entry.route, async ({ page }) => {
    await page.goto(entry.route);
    let checked = 0;
    for (const css of entry.selectors) checked += await page.locator(css).count();
    expect(checked).toBeGreaterThanOrEqual(entry.min);

    const audit = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
    expect(audit.violations, JSON.stringify(audit.violations, null, 2)).toEqual([]);
  });
}

test('Company Information contact link destinations are unchanged', async ({ page }) => {
  await page.goto('/company-information');
  await expect(page.getByRole('link', { name: /info@domi-clear.com/i })).toHaveAttribute('href', 'mailto:info@domi-clear.com');
  await expect(page.getByRole('link', { name: /www.domi-clear.com/i })).toHaveAttribute('href', /www\.domi-clear\.com/);
});
