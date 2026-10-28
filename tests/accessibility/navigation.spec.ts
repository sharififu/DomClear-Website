import { expect, test } from '@playwright/test';

test('desktop submenu opens by keyboard, tab reaches links, Escape restores focus', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const nav = page.getByRole('navigation');
  const openButton = nav.getByRole('button', { name: 'Open Platform submenu' });
  await openButton.focus();
  await page.keyboard.press('Enter');

  const closeButton = nav.getByRole('button', { name: 'Close Platform submenu' });
  await expect(closeButton).toHaveAttribute('aria-expanded', 'true');

  const carePlanning = nav.getByRole('link', { name: 'Care Planning' });
  await expect(carePlanning).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(carePlanning).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(openButton).toBeFocused();
  await expect(carePlanning).toBeHidden();
});

test('desktop hover discovery remains available', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const nav = page.getByRole('navigation');
  const carePlanning = nav.getByRole('link', { name: 'Care Planning' });
  await nav.getByRole('link', { name: 'Platform', exact: true }).hover();
  await expect(carePlanning).toBeVisible();
  await nav.getByRole('link', { name: 'Pricing', exact: true }).hover();
  await expect(carePlanning).toBeHidden();
});

test('mobile navigation announces state and Escape restores toggle focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const nav = page.getByRole('navigation');
  const openButton = nav.getByRole('button', { name: 'Open navigation menu' });
  await expect(openButton).toHaveAttribute('aria-expanded', 'false');

  await openButton.focus();
  await page.keyboard.press('Enter');
  const closeButton = nav.getByRole('button', { name: 'Close navigation menu' });
  await expect(closeButton).toHaveAttribute('aria-expanded', 'true');
  const childLink = nav.getByRole('link', { name: 'Care Planning' });
  await expect(childLink).toBeVisible();

  await childLink.focus();
  await page.keyboard.press('Escape');
  await expect(openButton).toBeFocused();
  await expect(childLink).toBeHidden();
});

test('marketing contact and demo forms expose named fields without submission', async ({ page }) => {
  for (const path of ['/contact', '/book-demo']) {
    await page.goto(path);
    const form = page.locator('form').first();
    await expect(form.getByRole('textbox', { name: 'First name' })).toBeVisible();
    await expect(form.getByRole('textbox', { name: 'Last name' })).toBeVisible();
    await expect(form.getByRole('textbox', { name: 'Email address' })).toBeVisible();
  }
});

test('light-background entry routes show a white header with dark navigation text', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of ['/contact', '/login', '/signup', '/legal']) {
    await page.goto(route);
    const nav = page.getByRole('navigation');
    await expect(nav).toHaveClass(/bg-white/);
    const logoText = nav.getByText('DomiClear', { exact: true });
    await expect(logoText).toHaveCSS('color', 'rgb(15, 23, 42)');
  }
});
