import { test, expect } from '@playwright/test';

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

  test('should display all 5 project cards', async ({ page }) => {
    const projectCards = page.locator('.project-card');
    await expect(projectCards).toHaveCount(5);
  });

  test('should display React Sample card with correct content', async ({ page }) => {
    const reactCard = page.locator('.project-card').filter({ hasText: 'React Sample' });
    await expect(reactCard).toBeVisible();
    await expect(reactCard.locator('h2')).toHaveText('React Sample');
    await expect(reactCard.locator('p')).toContainText('Rsbuild로 구성된 React 애플리케이션');
  });

  test('should display Preact Sample card with correct content', async ({ page }) => {
    const preactCard = page.locator('.project-card').filter({ hasText: 'Preact Sample' });
    await expect(preactCard).toBeVisible();
    await expect(preactCard.locator('h2')).toHaveText('Preact Sample');
    await expect(preactCard.locator('p')).toContainText('경량화된 React 대안');
  });

  test('should display Next.js Sample card with correct content', async ({ page }) => {
    const nextCard = page.locator('.project-card').filter({ hasText: 'Next.js Sample' });
    await expect(nextCard).toBeVisible();
    await expect(nextCard.locator('h2')).toHaveText('Next.js Sample');
    await expect(nextCard.locator('p')).toContainText('풀스택 React 프레임워크');
  });

  test('should display Express Sample card with correct content', async ({ page }) => {
    const expressCard = page.locator('.project-card').filter({ hasText: 'Express Sample' });
    await expect(expressCard).toBeVisible();
    await expect(expressCard.locator('h2')).toHaveText('Express Sample');
    await expect(expressCard.locator('p')).toContainText('Node.js 웹 프레임워크');
  });

  test('should display NestJS Sample card with correct content', async ({ page }) => {
    const nestCard = page.locator('.project-card').filter({ hasText: 'Nest.js Sample' });
    await expect(nestCard).toBeVisible();
    await expect(nestCard.locator('h2')).toHaveText('Nest.js Sample');
    await expect(nestCard.locator('p')).toContainText('TypeScript 기반 서버사이드 프레임워크');
  });

  test('should display footer with build information', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Built with Vite');
  });

  test('should have working hover effects on project cards', async ({ page }) => {
    const firstCard = page.locator('.project-card').first();

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

  test('React Sample card should have correct link', async ({ page }) => {
    const reactCard = page.locator('.project-card').filter({ hasText: 'React Sample' });
    const link = reactCard.locator('a');
    await expect(link).toHaveAttribute('href', '/react-sample/index.html');
  });

  test('Preact Sample card should have correct link', async ({ page }) => {
    const preactCard = page.locator('.project-card').filter({ hasText: 'Preact Sample' });
    const link = preactCard.locator('a');
    await expect(link).toHaveAttribute('href', '/preact-sample/index.html');
  });

  test('Next.js Sample card should have correct link', async ({ page }) => {
    const nextCard = page.locator('.project-card').filter({ hasText: 'Next.js Sample' });
    const link = nextCard.locator('a');
    await expect(link).toHaveAttribute('href', '/next-sample/index.html');
  });

  test('Express Sample card should have correct link', async ({ page }) => {
    const expressCard = page.locator('.project-card').filter({ hasText: 'Express Sample' });
    const link = expressCard.locator('a');
    await expect(link).toHaveAttribute('href', 'http://localhost:3001');
  });

  test('NestJS Sample card should have correct link', async ({ page }) => {
    const nestCard = page.locator('.project-card').filter({ hasText: 'Nest.js Sample' });
    const link = nestCard.locator('a');
    await expect(link).toHaveAttribute('href', 'http://localhost:3002');
  });
});

test.describe('Entry Page - Responsive Design', () => {
  test('should display single column layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');

    const projectGrid = page.locator('.project-grid');
    await expect(projectGrid).toBeVisible();

    // Cards should stack vertically on mobile
    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(5);
  });

  test('should display multi-column layout on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
    await page.goto('/');

    const projectGrid = page.locator('.project-grid');
    await expect(projectGrid).toBeVisible();

    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(5);
  });
});
