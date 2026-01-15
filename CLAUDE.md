# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Web Playground is a monorepo containing curated web technology samples demonstrating best practices. It uses pnpm workspaces with strict TypeScript throughout.

## Commands

```bash
# Development
pnpm install                  # Install all dependencies
pnpm dev                      # Run all dev servers (port 5173)
pnpm dev:entry                # Entry landing page only
pnpm dev:react-sample         # React sample only

# Build
pnpm build                    # Build all packages to dist/
pnpm build:entry              # Build entry only
pnpm build:react-sample       # Build react-sample only

# Testing
pnpm test:e2e                 # Run Playwright E2E tests
pnpm test:e2e:ui              # Playwright UI mode
pnpm test:e2e:headed          # Watch browser during tests
npx playwright test entry.spec.ts              # Run single test file
npx playwright test -g "pattern name"          # Run tests matching pattern
npx playwright test --project=chromium         # Run on specific browser

# Spec Compliance
pnpm check:spec               # Validate structure against SDD requirements (runs in pre-commit)
```

## Architecture

```
web-playground/
├── entry/                    # Landing page (Vanilla TS + Vite) → builds to dist/
├── packages/
│   └── react-sample/         # React pattern gallery (React + Rsbuild) → builds to dist/react-sample/
├── spec/                     # Root-level SDD specifications
├── tests/                    # Shared E2E test utilities
├── scripts/                  # Build/validation scripts
└── .claude/skills/           # SDD framework skills for Claude
```

**Build outputs**: Entry builds to `dist/`, packages build to `dist/{package-name}/`. This enables relative linking from the entry page.

## Spec-Driven Development (SDD)

This project uses linked specifications to maintain architectural integrity:

- **Foundation** (`spec/foundation.md`) - Project identity and anchors
- **Requirements** (`spec/requirements.md`) - What must be built
- **Design** (`spec/design.md`) - How it's implemented

Each package can have its own spec documents in `packages/{name}/spec/`.

State is tracked in `.sdd/state.yaml`. Use SDD skills in `.claude/skills/` for document creation and verification.

## Package Requirements

Every package must have:
1. `package.json` with `dev`, `build`, `clean` scripts
2. `tsconfig.json` with `"strict": true`
3. `README.md` explaining purpose and patterns
4. Tests integrated via `pnpm test:e2e`

## Key Quality Anchors

From `spec/foundation.md`:
- **QUALITY-TYPESCRIPT**: Strict TypeScript mode everywhere
- **QUALITY-MINIMAL**: Minimal dependencies, no unnecessary abstractions
- **QUALITY-IDIOMATIC**: Each sample follows its technology's community conventions

## Testing

Playwright E2E tests are in `{package}/tests/*.spec.ts`. Tests run across Chromium, Firefox, and WebKit (desktop + mobile viewports).

PR checks run Chromium only for speed; full browser matrix runs on merge to main.
