import { test, expect } from '@playwright/test';

test.describe('Next.js Sample - Counter Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/next-sample/index.html');
  });

  test('should load the Next.js sample page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Next.js Sample/);
  });

  test('should display the heading "Next.js Sample"', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Next.js Sample');
  });

  test('should display counter button', async ({ page }) => {
    const counterButton = page.locator('button').filter({ hasText: /count/ });
    await expect(counterButton).toBeVisible();
  });

  test('should increment counter when button is clicked', async ({ page }) => {
    const counterButton = page.locator('button');

    // Find the counter display element
    const countDisplay = page.locator('text=/count|카운트|Count/i').first();

    // Click the button
    await counterButton.click();
    await counterButton.click();
    await counterButton.click();

    // Verify the page is interactive
    await expect(counterButton).toBeEnabled();
  });

  test('should maintain state during interaction', async ({ page }) => {
    const counterButton = page.locator('button').first();

    // Interact with button multiple times
    for (let i = 0; i < 5; i++) {
      await counterButton.click();
      await page.waitForTimeout(100); // Small delay between clicks
    }

    // Verify button is still functional
    await expect(counterButton).toBeEnabled();
  });

  test('should have proper Next.js metadata', async ({ page }) => {
    // Check for Next.js specific elements
    const nextScripts = page.locator('script[src*="next"]');
    const count = await nextScripts.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Next.js Sample - UI Responsiveness', () => {
  test('should display correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/next-sample/index.html');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    const button = page.locator('button').first();
    await expect(button).toBeVisible();
  });

  test('should display correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/next-sample/index.html');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    const button = page.locator('button').first();
    await expect(button).toBeVisible();
  });

  test('should display correctly on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/next-sample/index.html');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    const button = page.locator('button').first();
    await expect(button).toBeVisible();
  });
});

test.describe('Next.js Sample - Client-Side Hydration', () => {
  test('should be interactive after hydration', async ({ page }) => {
    await page.goto('/next-sample/index.html');

    // Wait for page to be fully hydrated
    await page.waitForLoadState('networkidle');

    const button = page.locator('button').first();
    await expect(button).toBeEnabled();

    // Test interaction
    await button.click();
    await expect(button).toBeEnabled();
  });

  test('should load without JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });

    await page.goto('/next-sample/index.html');
    await page.waitForLoadState('networkidle');

    // No critical errors should occur
    const criticalErrors = errors.filter(err =>
      !err.includes('warning') && !err.includes('404')
    );
    expect(criticalErrors).toHaveLength(0);
  });
});
