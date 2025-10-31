import { test, expect } from '@playwright/test';

test.describe('React Sample - Counter Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/react-sample/index.html');
  });

  test('should load the React sample page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/React Sample/);
  });

  test('should display the heading "React Sample"', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('React Sample');
  });

  test('should display counter with initial value of 0', async ({ page }) => {
    const counterButton = page.locator('button').filter({ hasText: /count is/ });
    await expect(counterButton).toBeVisible();
    await expect(counterButton).toContainText('count is 0');
  });

  test('should increment counter when button is clicked', async ({ page }) => {
    const counterButton = page.locator('button').filter({ hasText: /count is/ });

    // Initial state
    await expect(counterButton).toContainText('count is 0');

    // Click once
    await counterButton.click();
    await expect(counterButton).toContainText('count is 1');

    // Click again
    await counterButton.click();
    await expect(counterButton).toContainText('count is 2');
  });

  test('should increment counter multiple times correctly', async ({ page }) => {
    const counterButton = page.locator('button').filter({ hasText: /count is/ });

    // Click 5 times
    for (let i = 0; i < 5; i++) {
      await counterButton.click();
    }

    await expect(counterButton).toContainText('count is 5');
  });

  test('should display the "Edit src/App.tsx..." text', async ({ page }) => {
    const editText = page.getByText(/Edit src\/App\.tsx/);
    await expect(editText).toBeVisible();
  });

  test('should display Vite and React logos', async ({ page }) => {
    const logos = page.locator('img[alt*="logo"]');
    const count = await logos.count();
    expect(count).toBeGreaterThanOrEqual(2); // Should have at least Vite and React logos
  });

  test('should have clickable logos that link to documentation', async ({ page }) => {
    const logoLinks = page.locator('a').filter({ has: page.locator('img[alt*="logo"]') });
    const count = await logoLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should maintain counter state during rapid clicks', async ({ page }) => {
    const counterButton = page.locator('button').filter({ hasText: /count is/ });

    // Rapid clicks
    await counterButton.click({ clickCount: 1 });
    await counterButton.click({ clickCount: 1 });
    await counterButton.click({ clickCount: 1 });

    // Verify final state
    await expect(counterButton).toContainText('count is 3');
  });
});

test.describe('React Sample - UI Responsiveness', () => {
  test('should display correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/react-sample/index.html');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    const counterButton = page.locator('button').filter({ hasText: /count is/ });
    await expect(counterButton).toBeVisible();
  });

  test('should display correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/react-sample/index.html');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    const counterButton = page.locator('button').filter({ hasText: /count is/ });
    await expect(counterButton).toBeVisible();
  });

  test('should display correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/react-sample/index.html');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    const counterButton = page.locator('button').filter({ hasText: /count is/ });
    await expect(counterButton).toBeVisible();
  });
});
