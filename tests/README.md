# End-to-End Tests

This directory contains Playwright end-to-end tests for the Web Playground project.

## Test Coverage

The test suite covers all applications in the monorepo:

### Frontend Tests
- **Entry Page** (`entry.spec.ts`) - Landing page navigation and UI
  - Page loading and rendering
  - Project cards display and links
  - Responsive design (mobile/tablet/desktop)
  - Header and footer content

- **React Sample** (`react-sample.spec.ts`) - React counter component
  - Component rendering
  - Counter functionality
  - State management
  - Responsive UI

- **Preact Sample** (`preact-sample.spec.ts`) - Preact counter component
  - Component rendering
  - Counter functionality
  - State persistence
  - Performance checks

- **Next.js Sample** (`next-sample.spec.ts`) - Next.js counter page
  - Server-side rendering
  - Client-side hydration
  - Interactive features
  - Error handling

### API Tests
- **Express API** (`express-api.spec.ts`)
  - Root endpoint and endpoint listing
  - Health check endpoint
  - Hello endpoint with personalization
  - Error handling
  - Performance testing

- **NestJS API** (`nest-api.spec.ts`)
  - Root endpoint and endpoint listing
  - Health check endpoint
  - Hello endpoint with service integration
  - Error handling
  - Performance and concurrency testing

## Prerequisites

1. Install Playwright browsers (if not already installed):
   ```bash
   npx playwright install
   ```

2. Make sure all dev servers can start:
   ```bash
   npm run dev:entry    # Port 5173
   npm run dev:express  # Port 3001
   npm run dev:nest     # Port 3002
   ```

## Running Tests

### Run all tests
```bash
npm run test:e2e
```

### Run tests in UI mode (interactive)
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### Run tests in debug mode
```bash
npm run test:e2e:debug
```

### Run specific test file
```bash
npx playwright test entry.spec.ts
npx playwright test react-sample.spec.ts
npx playwright test express-api.spec.ts
```

### Run specific test by name
```bash
npx playwright test -g "should display the header"
```

### Run tests for specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Viewing Test Reports

After running tests, view the HTML report:
```bash
npm run test:e2e:report
```

## Recording New Tests

Use Playwright Codegen to record new test interactions:
```bash
npm run test:e2e:codegen
```

## Test Configuration

Configuration is in `playwright.config.ts`:
- Test directory: `./tests`
- Base URL: `http://localhost:5173`
- Browsers: Chromium, Firefox, WebKit
- Mobile: Pixel 5, iPhone 12
- Automatic server startup
- Screenshots on failure
- Videos on failure
- Trace on retry

## Writing New Tests

1. Create a new `.spec.ts` file in the `tests/` directory
2. Import test utilities:
   ```typescript
   import { test, expect } from '@playwright/test';
   ```
3. Write test suites using `test.describe()` and `test()`
4. Use `beforeEach()` for common setup
5. Follow existing patterns for consistency

## Continuous Integration

### GitHub Actions Workflows

Two workflows are configured for automated testing:

#### 1. Playwright Tests (`playwright.yml`)
**Triggers:** Push to main/master, Pull Requests
**Features:**
- Runs on all browsers (Chromium, Firefox, WebKit)
- Sharded execution (2 parallel jobs) for faster results
- Uploads test reports and artifacts
- Merges reports from all shards
- Full test coverage across all browsers

#### 2. PR Checks (`pr-checks.yml`)
**Triggers:** Pull Requests only
**Features:**
- Fast feedback (Chromium only)
- Runs on every PR commit
- Uploads reports only on failure
- Optimized for quick validation

### CI Configuration

The tests are configured to run in CI environments with:
- `forbidOnly` - Prevents `.only` tests from running
- `retries: 2` - Retries failed tests twice
- `workers: 1` - Runs tests serially in CI
- Automatic server startup for entry, Express, and NestJS
- Artifact retention (30 days for full runs, 7 days for PRs)

## Troubleshooting

### Tests failing locally
1. Ensure all dev servers are running
2. Check that ports 5173, 3001, and 3002 are available
3. Clear browser cache: `npx playwright clean`

### Browsers not installed
```bash
npx playwright install
```

### Update Playwright
```bash
npm install -D @playwright/test@latest
npx playwright install
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Test Generator](https://playwright.dev/docs/codegen)
