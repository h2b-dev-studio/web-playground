/**
 * Spec Compliance Check
 * Validates project structure against root specifications (REQ-001, REQ-003)
 *
 * Usage: pnpm check:spec
 */
import fs from 'node:fs';
import path from 'node:path';

// Discover packages dynamically
const PACKAGES = [
  'entry',
  ...fs
    .readdirSync('packages', { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => `packages/${d.name}`),
];

let errors = 0;

function check(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✓ ${message}`);
  } else {
    console.log(`  ✗ ${message}`);
    errors++;
  }
}

function readJson(filePath: string): Record<string, unknown> {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Try standard JSON first, fall back to stripping comments for tsconfig
  try {
    return JSON.parse(content);
  } catch {
    // Strip comments for tsconfig.json files
    const stripped = content
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        // Remove single-line comments at start of line
        if (trimmed.startsWith('//')) return '';
        // Remove inline block comments like /* Bundler mode */
        if (trimmed.startsWith('/*') && trimmed.endsWith('*/')) return '';
        return line;
      })
      .join('\n');
    return JSON.parse(stripped);
  }
}

console.log('Checking spec compliance...\n');

// REQ-001: Monorepo CLI
console.log('REQ-001: Monorepo CLI');
const rootPkg = readJson('package.json');
const scripts = rootPkg.scripts as Record<string, string>;
check(scripts?.build?.includes('pnpm -r'), 'Unified build command');
check(scripts?.dev?.includes('pnpm -r'), 'Unified dev command');
check(scripts?.test?.includes('pnpm -r'), 'Unified test command');
check(!!scripts?.clean, 'Unified clean command');

// REQ-003: TypeScript Strict Mode
console.log('\nREQ-003: TypeScript Strict Mode');
for (const pkg of PACKAGES) {
  const tsconfigPath = path.join(pkg, 'tsconfig.json');
  if (fs.existsSync(tsconfigPath)) {
    const tsconfig = readJson(tsconfigPath);
    const compilerOptions = tsconfig.compilerOptions as Record<string, unknown>;
    check(compilerOptions?.strict === true, `${pkg} has strict: true`);
  } else {
    check(false, `${pkg}/tsconfig.json exists`);
  }
}

// REQ-003: Required Scripts
console.log('\nREQ-003: Required Scripts');
for (const pkg of PACKAGES) {
  const pkgJsonPath = path.join(pkg, 'package.json');
  if (fs.existsSync(pkgJsonPath)) {
    const pkgJson = readJson(pkgJsonPath);
    const pkgScripts = pkgJson.scripts as Record<string, string>;
    const has = ['dev', 'build', 'clean'].every((s) => !!pkgScripts?.[s]);
    check(has, `${pkg} has dev/build/clean`);
  } else {
    check(false, `${pkg}/package.json exists`);
  }
}

// REQ-003: README Documentation
console.log('\nREQ-003: README Documentation');
for (const pkg of PACKAGES) {
  check(fs.existsSync(path.join(pkg, 'README.md')), `${pkg} has README.md`);
}

// Summary
console.log('');
if (errors === 0) {
  console.log('All compliance checks passed!');
} else {
  console.log(`${errors} check(s) failed`);
  process.exit(1);
}
