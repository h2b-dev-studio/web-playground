# Web Playground

A curated collection of web technology samples demonstrating best practices across modern stacks. Each sample evolves independently as a playground for exploring that technology's patterns and capabilities.

## Purpose

Enable developers to:

1. Learn idiomatic patterns for various web technologies
2. Experiment with technology-specific features
3. Evaluate build tools, project structure, and DX
4. Use as starting points for new projects

## Monorepo Structure

This repository uses pnpm workspaces. **All code is written in TypeScript with strict mode.**

```
web-playground/
├── entry/                    # Landing page (Vanilla TS + Vite)
├── packages/
│   └── react-sample/         # React pattern gallery (React 18 + Rsbuild)
├── spec/                     # SDD specifications
└── tests/                    # Shared E2E test utilities
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm 10.x or higher

### Installation

```bash
pnpm install
```

### Development

Run all dev servers (default port 5173):

```bash
pnpm dev
```

Run individual packages:

```bash
pnpm dev:entry          # Landing page
pnpm dev:react-sample   # React sample
```

### Build

```bash
pnpm build              # Build all packages
pnpm build:entry        # Build entry only
pnpm build:react-sample # Build react-sample only
```

Build outputs:
- Entry → `dist/`
- React Sample → `dist/react-sample/`

### Testing

E2E tests use Playwright:

```bash
pnpm test:e2e           # Run all tests
pnpm test:e2e:ui        # Playwright UI mode
pnpm test:e2e:headed    # Watch browser during tests
```

Run individual test files:

```bash
npx playwright test entry.spec.ts
npx playwright test -g "pattern name"
```

### Spec Compliance

Validate project structure against SDD requirements:

```bash
pnpm check:spec
```

## Packages

| Package | Framework | Build Tool | Description |
|---------|-----------|------------|-------------|
| entry | Vanilla TS | Vite | Landing page linking all samples |
| react-sample | React 18 | Rsbuild | Interactive pattern gallery with props playground |

## Spec-Driven Development

This project uses linked specifications for architectural integrity:

- `spec/foundation.md` - Project identity and anchors
- `spec/requirements.md` - What must be built
- `spec/design.md` - How it's implemented

Package-specific specs live in `packages/{name}/spec/`.

## License

MIT
