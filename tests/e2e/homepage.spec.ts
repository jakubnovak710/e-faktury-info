import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('page loads successfully', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('has a page title', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('navigation renders', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav');
    await expect(nav.first()).toBeVisible();
  });

  test('theme toggle works', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const initialClass = await html.getAttribute('class');

    const themeToggle = page.getByRole('button', { name: /theme|dark|light|mode/i });
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      const newClass = await html.getAttribute('class');
      expect(newClass).not.toBe(initialClass);
    }
  });
});
