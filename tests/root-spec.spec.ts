/**
 * Root Specification Tests
 *
 * These tests verify compliance with the root-level specifications:
 * - spec/foundation.md - Project identity and scope
 * - spec/requirements.md - Success criteria
 * - spec/design.md - Implementation strategy
 *
 * @derives REQ-001, REQ-002, REQ-003
 */
import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const ROOT_DIR = path.resolve(__dirname, '..');
const PACKAGES_DIR = path.join(ROOT_DIR, 'packages');

/**
 * Sample packages as defined in foundation.md
 */
const SAMPLE_PACKAGES = [
  'react-sample',
  'preact-sample',
  'next-sample',
  'express-sample',
  'nest-sample',
];

/**
 * Read and parse JSON file (handles JSON with comments like tsconfig)
 */
function readJson(filePath: string): Record<string, unknown> {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Try parsing as regular JSON first (for files without comments like package.json)
  try {
    return JSON.parse(content);
  } catch {
    // If that fails, strip comments (for tsconfig.json files)
    const stripped = content
      .split('\n')
      .map((line) => {
        // Remove single-line comments only if they appear before any string content
        // Look for // that's not inside a string value
        const trimmed = line.trim();
        if (trimmed.startsWith('//')) {
          return '';
        }
        // For /* */ block comments at line start
        if (trimmed.startsWith('/*')) {
          // Simple case: single-line block comment
          if (trimmed.includes('*/')) {
            return trimmed.substring(trimmed.indexOf('*/') + 2);
          }
          return '';
        }
        return line;
      })
      .join('\n');
    return JSON.parse(stripped);
  }
}

/**
 * Check if a file exists
 */
function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

// =============================================================================
// REQ-001: Monorepo CLI
// =============================================================================

test.describe('REQ-001: Monorepo CLI', () => {
  test.describe('Unified Commands', () => {
    let rootPackageJson: Record<string, unknown>;
    let scripts: Record<string, string>;

    test.beforeAll(() => {
      rootPackageJson = readJson(path.join(ROOT_DIR, 'package.json'));
      scripts = rootPackageJson.scripts as Record<string, string>;
    });

    test('pnpm build - builds all packages', () => {
      expect(scripts.build).toBeDefined();
      expect(scripts.build).toContain('pnpm -r run build');
    });

    test('pnpm dev - runs all dev servers', () => {
      expect(scripts.dev).toBeDefined();
      expect(scripts.dev).toContain('pnpm -r run dev');
    });

    test('pnpm test - runs all tests', () => {
      expect(scripts.test).toBeDefined();
      expect(scripts.test).toContain('pnpm -r run test');
    });

    test('pnpm clean - removes all build artifacts', () => {
      expect(scripts.clean).toBeDefined();
      expect(scripts.clean).toContain('pnpm -r run clean');
    });
  });

  test.describe('Targeted Commands', () => {
    let rootPackageJson: Record<string, unknown>;
    let scripts: Record<string, string>;

    test.beforeAll(() => {
      rootPackageJson = readJson(path.join(ROOT_DIR, 'package.json'));
      scripts = rootPackageJson.scripts as Record<string, string>;
    });

    test('build:react - builds only react-sample', () => {
      expect(scripts['build:react']).toBeDefined();
      expect(scripts['build:react']).toContain('--filter react-sample');
    });

    test('build:preact - builds only preact-sample', () => {
      expect(scripts['build:preact']).toBeDefined();
      expect(scripts['build:preact']).toContain('--filter preact-sample');
    });

    test('build:next - builds only next-sample', () => {
      expect(scripts['build:next']).toBeDefined();
      expect(scripts['build:next']).toContain('--filter next-sample');
    });

    test('build:express - builds only express-sample', () => {
      expect(scripts['build:express']).toBeDefined();
      expect(scripts['build:express']).toContain('--filter express-sample');
    });

    test('build:nest - builds only nest-sample', () => {
      expect(scripts['build:nest']).toBeDefined();
      expect(scripts['build:nest']).toContain('--filter nest-sample');
    });

    test('dev:react - runs only react-sample dev server', () => {
      expect(scripts['dev:react']).toBeDefined();
      expect(scripts['dev:react']).toContain('--filter react-sample');
    });

    test('dev:preact - runs only preact-sample dev server', () => {
      expect(scripts['dev:preact']).toBeDefined();
      expect(scripts['dev:preact']).toContain('--filter preact-sample');
    });

    test('dev:next - runs only next-sample dev server', () => {
      expect(scripts['dev:next']).toBeDefined();
      expect(scripts['dev:next']).toContain('--filter next-sample');
    });

    test('dev:express - runs only express-sample dev server', () => {
      expect(scripts['dev:express']).toBeDefined();
      expect(scripts['dev:express']).toContain('--filter express-sample');
    });

    test('dev:nest - runs only nest-sample dev server', () => {
      expect(scripts['dev:nest']).toBeDefined();
      expect(scripts['dev:nest']).toContain('--filter nest-sample');
    });
  });

  test.describe('Workspace Configuration', () => {
    test('pnpm-workspace.yaml includes entry package', () => {
      const workspaceConfig = fs.readFileSync(
        path.join(ROOT_DIR, 'pnpm-workspace.yaml'),
        'utf-8'
      );
      expect(workspaceConfig).toContain('entry');
    });

    test('pnpm-workspace.yaml includes packages/* glob', () => {
      const workspaceConfig = fs.readFileSync(
        path.join(ROOT_DIR, 'pnpm-workspace.yaml'),
        'utf-8'
      );
      expect(workspaceConfig).toContain("packages/*");
    });
  });
});

// =============================================================================
// REQ-002: Entry Page
// =============================================================================

test.describe('REQ-002: Entry Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('landing page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Web Playground/);
  });

  test('displays all sample package links', async ({ page }) => {
    // React Sample
    const reactLink = page.locator('a[href*="react-sample"]');
    await expect(reactLink).toBeVisible();

    // Preact Sample
    const preactLink = page.locator('a[href*="preact-sample"]');
    await expect(preactLink).toBeVisible();

    // Next.js Sample
    const nextLink = page.locator('a[href*="next-sample"]');
    await expect(nextLink).toBeVisible();

    // Express Sample (external link)
    const expressLink = page.locator('a[href*="3001"]');
    await expect(expressLink).toBeVisible();

    // NestJS Sample (external link)
    const nestLink = page.locator('a[href*="3002"]');
    await expect(nestLink).toBeVisible();
  });

  test('sample count matches foundation.md package list', async ({ page }) => {
    const projectCards = page.locator('.project-card');
    await expect(projectCards).toHaveCount(SAMPLE_PACKAGES.length);
  });
});

// =============================================================================
// REQ-003: Package Standards
// =============================================================================

test.describe('REQ-003: Package Standards', () => {
  test.describe('TypeScript Configuration', () => {
    for (const pkg of SAMPLE_PACKAGES) {
      test(`${pkg} has tsconfig.json with strict mode`, () => {
        const tsconfigPath = path.join(PACKAGES_DIR, pkg, 'tsconfig.json');
        expect(fileExists(tsconfigPath)).toBe(true);

        const tsconfig = readJson(tsconfigPath);
        const compilerOptions = tsconfig.compilerOptions as Record<string, unknown>;
        expect(compilerOptions.strict).toBe(true);
      });
    }

    test('entry package has tsconfig.json with strict mode', () => {
      const tsconfigPath = path.join(ROOT_DIR, 'entry', 'tsconfig.json');
      expect(fileExists(tsconfigPath)).toBe(true);

      const tsconfig = readJson(tsconfigPath);
      const compilerOptions = tsconfig.compilerOptions as Record<string, unknown>;
      expect(compilerOptions.strict).toBe(true);
    });
  });

  test.describe('Package Scripts', () => {
    for (const pkg of SAMPLE_PACKAGES) {
      test(`${pkg} has required scripts (dev, build, clean)`, () => {
        const packageJsonPath = path.join(PACKAGES_DIR, pkg, 'package.json');
        expect(fileExists(packageJsonPath)).toBe(true);

        const packageJson = readJson(packageJsonPath);
        const scripts = packageJson.scripts as Record<string, string>;

        expect(scripts.dev).toBeDefined();
        expect(scripts.build).toBeDefined();
        expect(scripts.clean).toBeDefined();
      });
    }

    test('entry package has required scripts (dev, build, clean)', () => {
      const packageJsonPath = path.join(ROOT_DIR, 'entry', 'package.json');
      expect(fileExists(packageJsonPath)).toBe(true);

      const packageJson = readJson(packageJsonPath);
      const scripts = packageJson.scripts as Record<string, string>;

      expect(scripts.dev).toBeDefined();
      expect(scripts.build).toBeDefined();
      expect(scripts.clean).toBeDefined();
    });
  });

  test.describe('Package Structure', () => {
    for (const pkg of SAMPLE_PACKAGES) {
      test(`${pkg} directory exists`, () => {
        const pkgPath = path.join(PACKAGES_DIR, pkg);
        expect(fileExists(pkgPath)).toBe(true);
      });

      test(`${pkg} has package.json`, () => {
        const packageJsonPath = path.join(PACKAGES_DIR, pkg, 'package.json');
        expect(fileExists(packageJsonPath)).toBe(true);
      });
    }
  });
});

// =============================================================================
// Design Compliance
// =============================================================================

test.describe('Design Compliance', () => {
  test.describe('Build Output Structure (DEC-002)', () => {
    test('dist directory structure follows design spec', () => {
      // This test verifies the design decision DEC-002:
      // All packages output to unified dist/ at repository root
      // Note: This test runs after build, so dist/ may or may not exist
      // We're testing the configuration, not the build artifacts

      const rootPackageJson = readJson(path.join(ROOT_DIR, 'package.json'));
      const scripts = rootPackageJson.scripts as Record<string, string>;

      // Clean command should clean dist at root level
      expect(scripts.clean).toContain('rm -rf dist');
    });
  });

  test.describe('CLI Command Strategy (DEC-001)', () => {
    test('targeted commands use pnpm --filter', () => {
      const rootPackageJson = readJson(path.join(ROOT_DIR, 'package.json'));
      const scripts = rootPackageJson.scripts as Record<string, string>;

      // All targeted commands should use --filter pattern
      const targetedCommands = Object.entries(scripts).filter(
        ([key]) => key.includes(':') && !key.startsWith('test:')
      );

      for (const [name, command] of targetedCommands) {
        expect(command, `Command ${name} should use --filter`).toContain('--filter');
      }
    });
  });
});

// =============================================================================
// Foundation Alignment
// =============================================================================

test.describe('Foundation Alignment', () => {
  test('SCOPE-MONOREPO: all samples in pnpm workspace', () => {
    const workspaceConfig = fs.readFileSync(
      path.join(ROOT_DIR, 'pnpm-workspace.yaml'),
      'utf-8'
    );

    expect(workspaceConfig).toContain('packages/*');

    // Verify all sample packages exist
    for (const pkg of SAMPLE_PACKAGES) {
      const pkgPath = path.join(PACKAGES_DIR, pkg);
      expect(fileExists(pkgPath), `Package ${pkg} should exist`).toBe(true);
    }
  });

  test('QUALITY-TYPESCRIPT: all packages use TypeScript strict mode', () => {
    const allPackages = ['entry', ...SAMPLE_PACKAGES.map((p) => `packages/${p}`)];

    for (const pkg of allPackages) {
      const tsconfigPath = path.join(ROOT_DIR, pkg, 'tsconfig.json');
      expect(fileExists(tsconfigPath), `${pkg}/tsconfig.json should exist`).toBe(true);

      const tsconfig = readJson(tsconfigPath);
      const compilerOptions = tsconfig.compilerOptions as Record<string, unknown>;
      expect(compilerOptions.strict, `${pkg} should have strict: true`).toBe(true);
    }
  });
});
