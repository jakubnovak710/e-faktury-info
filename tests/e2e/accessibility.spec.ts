import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('html has lang attribute', async ({ page }) => {
    await page.goto('/');
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBeTruthy();
    expect(lang!.length).toBeGreaterThanOrEqual(2);
  });

  test('has viewport meta tag', async ({ page }) => {
    await page.goto('/');
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width/);
  });

  test('heading hierarchy starts with h1', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('h1');
    const h1Count = await h1.count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt, `Image ${i} is missing alt attribute`).not.toBeNull();
    }
  });

  test('interactive elements are keyboard focusable', async ({ page }) => {
    await page.goto('/');

    // Tab through the page and verify focus is visible
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    const count = await focusedElement.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
