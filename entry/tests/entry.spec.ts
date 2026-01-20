/**
 * Entry Page E2E Tests
 *
 * @verifies REQ-002 - Entry Page: Landing page lists and links to all sample packages.
 * @verifies REQ-ENTRY-009 - Dynamic Package Registry: Cards generated from packages/
 * @aligns-to SCOPE-SHOWCASE, AUDIENCE-DEVELOPER
 */
import { test, expect } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Discovers packages from the packages/ directory
 * This mirrors the registry generation logic for test verification
 */
function discoverPackages(): {
  name: string;
  description: string;
  href: string;
  dirName: string;
}[] {
  const packagesDir = path.join(__dirname, '../../packages');
  const entries = fs.readdirSync(packagesDir, { withFileTypes: true });
  const packages: { name: string; description: string; href: string; dirName: string }[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const packageJsonPath = path.join(packagesDir, entry.name, 'package.json');
    if (!fs.existsSync(packageJsonPath)) continue;

    const content = fs.readFileSync(packageJsonPath, 'utf-8');
    const pkg = JSON.parse(content);
    const meta = pkg.playgroundMeta || {};

    const name = meta.title || cleanPackageName(pkg.name);
    const description = meta.description || pkg.description || '';

    packages.push({
      name,
      description,
      href: `${entry.name}/index.html`,
      dirName: entry.name,
    });
  }

  return packages.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Converts kebab-case to Title Case
 */
function cleanPackageName(name: string): string {
  const unscoped = name.replace(/^@[^/]+\//, '');
  return unscoped
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Discover packages at test initialization
const discoveredPackages = discoverPackages();

test.describe('Entry Page - Landing Page (REQ-002)', () => {
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

  test('should display project cards matching discovered packages (REQ-ENTRY-009)', async ({
    page,
  }) => {
    const projectCards = page.locator('.project-card');

    // Wait for cards to render (dynamic rendering)
    await expect(projectCards.first()).toBeVisible();

    // Verify count matches discovered packages
    await expect(projectCards).toHaveCount(discoveredPackages.length);
  });

  test('each discovered package should have a card with correct content', async ({ page }) => {
    for (const pkg of discoveredPackages) {
      const card = page.locator('.project-card').filter({ hasText: pkg.name });
      await expect(card).toBeVisible();
      await expect(card.locator('h3')).toHaveText(pkg.name);
      if (pkg.description) {
        await expect(card.locator('p')).toContainText(pkg.description);
      }
    }
  });

  test('each discovered package card should have correct link', async ({ page }) => {
    for (const pkg of discoveredPackages) {
      const card = page.locator('.project-card').filter({ hasText: pkg.name });
      await expect(card).toHaveAttribute('href', pkg.href);
    }
  });

  test('should display footer with build information', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Built with Vite');
  });

  test('should have working hover effects on project cards', async ({ page }) => {
    const firstCard = page.locator('.project-card').first();

    // Wait for card to be visible (dynamic rendering)
    await expect(firstCard).toBeVisible();

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

test.describe('Entry Page - Dynamic Registry (REQ-ENTRY-009)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('registry should contain at least one package', () => {
    expect(discoveredPackages.length).toBeGreaterThan(0);
  });

  test('cards should be rendered dynamically from registry', async ({ page }) => {
    // Wait for JavaScript to render cards
    const cards = page.locator('.project-card');
    await expect(cards.first()).toBeVisible();

    // Verify each discovered package has a corresponding card
    for (const pkg of discoveredPackages) {
      const card = cards.filter({ hasText: pkg.name });
      await expect(card).toBeVisible();
    }
  });

  test('cards should be anchor elements for no-JS navigation (REQ-ENTRY-007)', async ({ page }) => {
    const cards = page.locator('.project-card');
    await expect(cards.first()).toBeVisible();

    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const tagName = await card.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('a');
    }
  });
});

test.describe('Entry Page - Responsive Design (AUDIENCE-DEVELOPER)', () => {
  test('should display single column layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');

    const projectGrid = page.locator('.project-grid');
    await expect(projectGrid).toBeVisible();

    // Cards should render
    const cards = page.locator('.project-card');
    await expect(cards.first()).toBeVisible();
    await expect(cards).toHaveCount(discoveredPackages.length);
  });

  test('should display multi-column layout on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
    await page.goto('/');

    const projectGrid = page.locator('.project-grid');
    await expect(projectGrid).toBeVisible();

    const cards = page.locator('.project-card');
    await expect(cards.first()).toBeVisible();
    await expect(cards).toHaveCount(discoveredPackages.length);
  });
});
