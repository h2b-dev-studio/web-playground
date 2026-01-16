/**
 * Unit Tests for Registry Generation Script
 *
 * TDD: These tests define expected behavior for REQ-ENTRY-009
 * Run with: tsx --test scripts/generate-registry.test.ts
 */
import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

// Import the functions we'll implement
import {
  scanPackages,
  extractMetadata,
  generateRegistryContent,
  cleanPackageName,
} from './generate-registry.js';
import type { PackageCard, PackageJson } from '../entry/src/types/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEST_PACKAGES_DIR = path.join(__dirname, '__test_packages__');

describe('generate-registry', () => {
  beforeEach(() => {
    // Create test packages directory
    fs.mkdirSync(TEST_PACKAGES_DIR, { recursive: true });
  });

  afterEach(() => {
    // Clean up test directory
    fs.rmSync(TEST_PACKAGES_DIR, { recursive: true, force: true });
  });

  describe('cleanPackageName', () => {
    test('should convert kebab-case to Title Case', () => {
      assert.strictEqual(cleanPackageName('react-sample'), 'React Sample');
    });

    test('should handle single word', () => {
      assert.strictEqual(cleanPackageName('express'), 'Express');
    });

    test('should handle multiple hyphens', () => {
      assert.strictEqual(cleanPackageName('my-awesome-package'), 'My Awesome Package');
    });

    test('should handle scoped packages', () => {
      assert.strictEqual(cleanPackageName('@scope/package-name'), 'Package Name');
    });
  });

  describe('extractMetadata', () => {
    test('should extract metadata from playgroundMeta if present', () => {
      const packageJson: PackageJson = {
        name: 'react-sample',
        description: 'npm description',
        playgroundMeta: {
          title: 'React Sample App',
          description: 'Custom playground description',
        },
      };

      const result = extractMetadata(packageJson, 'react-sample');

      assert.deepStrictEqual(result, {
        name: 'React Sample App',
        description: 'Custom playground description',
        href: 'react-sample/index.html',
      });
    });

    test('should fall back to name/description if playgroundMeta missing', () => {
      const packageJson: PackageJson = {
        name: 'react-sample',
        description: 'npm description',
      };

      const result = extractMetadata(packageJson, 'react-sample');

      assert.deepStrictEqual(result, {
        name: 'React Sample',
        description: 'npm description',
        href: 'react-sample/index.html',
      });
    });

    test('should use empty string if description missing', () => {
      const packageJson: PackageJson = {
        name: 'my-package',
      };

      const result = extractMetadata(packageJson, 'my-package');

      assert.deepStrictEqual(result, {
        name: 'My Package',
        description: '',
        href: 'my-package/index.html',
      });
    });

    test('should use partial playgroundMeta with fallbacks', () => {
      const packageJson: PackageJson = {
        name: 'react-sample',
        description: 'npm description',
        playgroundMeta: {
          title: 'Custom Title Only',
        },
      };

      const result = extractMetadata(packageJson, 'react-sample');

      assert.deepStrictEqual(result, {
        name: 'Custom Title Only',
        description: 'npm description',
        href: 'react-sample/index.html',
      });
    });
  });

  describe('scanPackages', () => {
    test('should scan directory and return package metadata', () => {
      // Create a test package
      const pkgDir = path.join(TEST_PACKAGES_DIR, 'test-package');
      fs.mkdirSync(pkgDir);
      fs.writeFileSync(
        path.join(pkgDir, 'package.json'),
        JSON.stringify({
          name: 'test-package',
          description: 'A test package',
        })
      );

      const result = scanPackages(TEST_PACKAGES_DIR);

      assert.strictEqual(result.length, 1);
      assert.deepStrictEqual(result[0], {
        name: 'Test Package',
        description: 'A test package',
        href: 'test-package/index.html',
      });
    });

    test('should skip directories without package.json', () => {
      // Create a directory without package.json
      const dir = path.join(TEST_PACKAGES_DIR, 'not-a-package');
      fs.mkdirSync(dir);

      const result = scanPackages(TEST_PACKAGES_DIR);

      assert.strictEqual(result.length, 0);
    });

    test('should sort packages alphabetically by name', () => {
      // Create multiple packages
      const packages = [
        { dir: 'zebra-pkg', name: 'zebra-pkg', description: 'Z package' },
        { dir: 'alpha-pkg', name: 'alpha-pkg', description: 'A package' },
        { dir: 'mid-pkg', name: 'mid-pkg', description: 'M package' },
      ];

      for (const pkg of packages) {
        const pkgDir = path.join(TEST_PACKAGES_DIR, pkg.dir);
        fs.mkdirSync(pkgDir);
        fs.writeFileSync(
          path.join(pkgDir, 'package.json'),
          JSON.stringify({ name: pkg.name, description: pkg.description })
        );
      }

      const result = scanPackages(TEST_PACKAGES_DIR);

      assert.strictEqual(result.length, 3);
      assert.strictEqual(result[0].name, 'Alpha Pkg');
      assert.strictEqual(result[1].name, 'Mid Pkg');
      assert.strictEqual(result[2].name, 'Zebra Pkg');
    });

    test('should use playgroundMeta when available', () => {
      const pkgDir = path.join(TEST_PACKAGES_DIR, 'custom-pkg');
      fs.mkdirSync(pkgDir);
      fs.writeFileSync(
        path.join(pkgDir, 'package.json'),
        JSON.stringify({
          name: 'custom-pkg',
          description: 'npm description',
          playgroundMeta: {
            title: 'Custom Display Name',
            description: 'Custom playground description',
          },
        })
      );

      const result = scanPackages(TEST_PACKAGES_DIR);

      assert.strictEqual(result.length, 1);
      assert.strictEqual(result[0].name, 'Custom Display Name');
      assert.strictEqual(result[0].description, 'Custom playground description');
    });
  });

  describe('generateRegistryContent', () => {
    test('should generate valid TypeScript content', () => {
      const packages: PackageCard[] = [
        { name: 'React Sample', description: 'React app', href: 'react-sample/index.html' },
      ];

      const content = generateRegistryContent(packages);

      assert.ok(content.includes('// AUTO-GENERATED FILE - DO NOT EDIT'));
      assert.ok(content.includes("import type { PackageRegistry } from '../types/index.js'"));
      assert.ok(content.includes('export const packages: PackageRegistry = ['));
      assert.ok(content.includes('"name": "React Sample"'));
      assert.ok(content.includes('"description": "React app"'));
      assert.ok(content.includes('"href": "react-sample/index.html"'));
      assert.ok(content.includes('] as const;'));
    });

    test('should handle empty package list', () => {
      const packages: PackageCard[] = [];

      const content = generateRegistryContent(packages);

      assert.ok(content.includes('export const packages: PackageRegistry = ['));
      assert.ok(content.includes('] as const;'));
    });

    test('should escape special characters in descriptions', () => {
      const packages: PackageCard[] = [
        { name: 'Test', description: 'Contains "quotes" and \\backslashes', href: 'test/index.html' },
      ];

      const content = generateRegistryContent(packages);

      // Should be properly escaped for JSON
      assert.ok(content.includes('\\"quotes\\"'));
      assert.ok(content.includes('\\\\backslashes'));
    });
  });
});
