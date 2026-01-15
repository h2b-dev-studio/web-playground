/**
 * React Sample E2E Tests
 *
 * Tests for Pattern Gallery + Props Playground.
 *
 * @derives REQ-REACT-001, REQ-REACT-005
 * @aligns-to PATTERN-REACT, QUALITY-TESTED, AUDIENCE-DEVELOPER
 */
import { test, expect } from '@playwright/test';

test.describe('React Sample - Pattern Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/react-sample/index.html');
  });

  test('should load the React sample page', async ({ page }) => {
    await expect(page).toHaveTitle(/React/);
  });

  test('should display main heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });
});
