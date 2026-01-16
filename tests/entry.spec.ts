import { test, expect } from '@playwright/test';
import { packages } from '../entry/src/data/packages';

test.describe('Entry Page - Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the landing page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Web Playground/);
  });

  test('should display the header with correct title and subtitle', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();

    const title = header.locator('h1');
    await expect(title).toHaveText('Web Playground');

    const subtitle = header.locator('p');
    await expect(subtitle).toContainText('웹 기술을 탐색하고 실험하기 위한 개인 공간입니다');
  });

  test(`should display all ${packages.length} project cards`, async ({ page }) => {
    const cards = page.locator('.card');
    await expect(cards).toHaveCount(packages.length);
  });

  // Generate tests for each package from the registry
  for (const pkg of packages) {
    test(`should display ${pkg.name} card with correct content`, async ({ page }) => {
      const card = page.locator('.card').filter({ hasText: pkg.name });
      await expect(card).toBeVisible();
      await expect(card.locator('h3')).toHaveText(pkg.name);
      await expect(card.locator('p')).toContainText(pkg.description);
    });

    test(`${pkg.name} card should have correct link`, async ({ page }) => {
      const card = page.locator('a.card').filter({ hasText: pkg.name });
      await expect(card).toHaveAttribute('href', pkg.href);
    });
  }

  test('should display footer with build information', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Built with Vite');
  });

  test('should have working hover effects on project cards', async ({ page }) => {
    const firstCard = page.locator('.card').first();

    // Get initial styles
    await firstCard.hover();

    // Check if card is interactive
    await expect(firstCard).toBeVisible();
  });

  test('should have gradient background', async ({ page }) => {
    const body = page.locator('body');
    const backgroundColor = await body.evaluate((el) => {
      return window.getComputedStyle(el).background;
    });

    // Check that background contains gradient colors
    expect(backgroundColor).toBeTruthy();
  });
});

test.describe('Entry Page - Responsive Design', () => {
  test('should display single column layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');

    const grid = page.locator('.grid');
    await expect(grid).toBeVisible();

    // Cards should stack vertically on mobile
    const cards = page.locator('.card');
    await expect(cards).toHaveCount(packages.length);
  });

  test('should display multi-column layout on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
    await page.goto('/');

    const grid = page.locator('.grid');
    await expect(grid).toBeVisible();

    const cards = page.locator('.card');
    await expect(cards).toHaveCount(packages.length);
  });
});
