---
title: "Web Playground Design"
version: 1.0.0
status: draft
depends_on:
  - requirements.md@1.1.0
---

# Web Playground Design

Root-level design for shared infrastructure and cross-cutting concerns.

---

## Monorepo Workspace

pnpm workspace with two package globs: `entry` for the landing page, `packages/*` for samples.

`@derives:` REQ-001
`@rationale:` Entry at root level for cleaner build output paths; samples grouped in packages/ for organization.

**Status:** draft

---

## CLI Command Strategy

Unified commands use `pnpm -r run <cmd>` to execute across all packages. Targeted commands use `pnpm --filter <package> run <cmd>`.

`@derives:` REQ-001
`@rationale:` DEC-001

**Status:** draft

---

## Build Output Structure

All packages output to a unified `dist/` directory at repository root:
- Entry: `dist/` (root)
- Samples: `dist/{package-name}/`

`@derives:` REQ-001, REQ-002
`@rationale:` DEC-002

**Status:** draft

---

## Entry Page Implementation

Static HTML page built with Vite. Links to samples via relative paths (`{sample-name}/index.html`).

`@derives:` REQ-002
`@rationale:` Static HTML over SPA framework:
             - Simplest possible implementation (QUALITY-MINIMAL)
             - No JavaScript required to view links
             - Demonstrates vanilla TypeScript patterns

**Status:** draft

---

## Package Structure Convention

Each package contains:
- `package.json` with `dev`, `build`, `test`, `clean` scripts
- `tsconfig.json` with `"strict": true`
- `README.md` describing purpose and patterns
- Source code in `src/`

`@derives:` REQ-003
`@rationale:` Consistent structure enables unified commands and sets clear expectations for contributors.

**Status:** draft

---

## TypeScript Configuration

Each package manages its own `tsconfig.json` with strict mode. No shared base config.

`@derives:` REQ-003
`@rationale:` Package independence over DRY:
             - Each technology may need different compiler options
             - Aligns with SCOPE-INDEPENDENT anchor
             - Avoids coupling between samples

`@assumes:` ASM-001 (Package tsconfig divergence remains manageable)

**Status:** draft

---

## Test Infrastructure

Each package implements its own test setup using technology-appropriate tools.

`@derives:` REQ-003
`@rationale:` Technology-specific testing over unified framework:
             - React: Vitest + React Testing Library
             - Next.js: Jest (Next.js default)
             - Express/Nest: Jest or Vitest
             - Aligns with QUALITY-IDIOMATIC anchor

`@assumes:` ASM-002 (All test frameworks support `pnpm test` script convention)

**Status:** draft

---

## E2E Testing

Playwright for cross-sample integration tests. Configuration at repository root.

`@derives:` REQ-003
`@rationale:` Playwright over Cypress:
             - Better TypeScript support
             - Multi-browser by default
             - Lighter weight for CI

**Status:** draft

---

## Decisions

### DEC-001: pnpm Filter Commands

**Context:** REQ-001 specifies `{command}:{package}` format (e.g., `build:react`).

**Decision:** Implement as npm scripts that delegate to `pnpm --filter`.

**Rationale:** Script aliases over direct pnpm commands:
- Explicit mapping in package.json
- Discoverable via `npm run`
- Consistent interface regardless of underlying package manager

**Trade-off:** Manual maintenance when adding packages.

---

### DEC-002: Unified dist/ Output

**Context:** Samples need to be accessible from entry page via relative links.

**Decision:** All packages build to `dist/` at repository root.

**Rationale:** Single output directory enables:
- Simple static file serving from `dist/`
- Relative path linking without port configuration
- Single deployment artifact

**Trade-off:** Build tools require explicit output path configuration.

---

## Assumptions

### ASM-001: Package TypeScript Divergence

**Assumption:** Package-specific tsconfig variations remain manageable without a shared base.

**Risk:** Medium — If packages drift significantly, maintenance burden increases.

**Mitigation:** Review tsconfigs during package addition; extract shared base if patterns emerge.

---

### ASM-002: Test Script Convention

**Assumption:** All testing frameworks used by packages support running via `pnpm test` script.

**Risk:** Low — This is a universal convention.

**Mitigation:** Document script requirements in contribution guidelines.

---

## Traceability Matrix

| Design Item | Requirements |
|-------------|--------------|
| Monorepo Workspace | REQ-001 |
| CLI Command Strategy | REQ-001 |
| Build Output Structure | REQ-001, REQ-002 |
| Entry Page Implementation | REQ-002 |
| Package Structure Convention | REQ-003 |
| TypeScript Configuration | REQ-003 |
| Test Infrastructure | REQ-003 |
| E2E Testing | REQ-003 |
