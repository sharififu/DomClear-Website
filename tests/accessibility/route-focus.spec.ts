import { expect, test } from '@playwright/test';

test('keyboard SPA route navigation and history focus the new main content', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const nav = page.getByRole('navigation');
  const pricing = nav.getByRole('link', { name: 'Pricing', exact: true });
  await pricing.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/pricing$/);
  await expect(page.locator('main#main-content')).toBeFocused();
  await expect(page).toHaveTitle(/Pricing/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('main#main-content')).toBeFocused();
  await expect(page).toHaveTitle(/Home Care Management App/);

  await page.goForward();
  await expect(page).toHaveURL(/\/pricing$/);
  await expect(page.locator('main#main-content')).toBeFocused();
});

test('skip link focuses the destination instead of remaining in the navigation', async ({ page }) => {
  await page.goto('/pricing');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);
  await expect(page.locator('main#main-content')).toBeFocused();
});

test('same-page hash links focus the relevant section', async ({ page }) => {
  await page.goto('/platform');
  const link = page.locator('a[href="/platform#care-planning"]').last();
  await link.click();
  await expect(page).toHaveURL(/\/platform#care-planning$/);
  await expect(page.locator('#care-planning')).toBeFocused();
});

test('external trial link retains new-tab destination without changing the current route', async ({ page }) => {
  await page.goto('/');
  const trial = page.getByRole('link', { name: /Start free trial/i }).first();
  await expect(trial).toHaveAttribute('target', '_blank');
  const firstUrl = page.url();
  const popupPromise = page.waitForEvent('popup', { timeout: 8_000 });
  await trial.click();
  const popup = await popupPromise;
  expect(page.url()).toBe(firstUrl);
  await popup.close();
});
