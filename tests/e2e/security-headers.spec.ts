import { test, expect } from '@playwright/test';

test.describe('Security Headers', () => {
  let headers: Record<string, string>;

  test.beforeAll(async ({ request }) => {
    const response = await request.get('/');
    const allHeaders = response.headers();
    headers = Object.fromEntries(
      Object.entries(allHeaders).map(([k, v]) => [k.toLowerCase(), v])
    );
  });

  test('X-Frame-Options is set', () => {
    expect(headers['x-frame-options']).toBeTruthy();
  });

  test('X-Content-Type-Options is set', () => {
    expect(headers['x-content-type-options']).toBe('nosniff');
  });

  test('Referrer-Policy is set', () => {
    expect(headers['referrer-policy']).toBeTruthy();
  });
});
