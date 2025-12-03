// @ts-check
import { test, expect } from '@playwright/test';

// These tests assume your Laravel app is running locally.
// If you use a different URL/port, update `baseURL` in `playwright.config.js`
// or replace the paths below with full URLs.

test.describe('MainLayout', () => {
  test('renders navigation and timer on the index page', async ({ page }) => {
    // Go to the main page which uses MainLayout as its layout
    await page.goto('/');

    // Navigation links from MainLayout
    await expect(
      page.getByRole('link', { name: 'Main Page' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Show Page' })
    ).toBeVisible();

    // Timer text from MainLayout
    const timerText = page.getByText('The page with timer', { exact: false });
    await expect(timerText).toBeVisible();

    // Verify that the timer increases over time
    const firstText = await timerText.textContent();
    await page.waitForTimeout(1500);
    const secondText = await timerText.textContent();

    expect(firstText).not.toBe(secondText);
  });

  test('keeps layout when navigating to Show page', async ({ page }) => {
    await page.goto('/');

    // Click the link to the Show page that comes from the Index page
    await page.getByRole('link', { name: 'Show Page' }).click();

    // URL should be /hello
    await expect(page).toHaveURL(/\/hello$/);

    // Layout navigation should still be present on the Show page
    await expect(
      page.getByRole('link', { name: 'Main Page' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Show Page' })
    ).toBeVisible();

    // Layout timer should still be visible
    await expect(
      page.getByText('The page with timer', { exact: false })
    ).toBeVisible();
  });
});




