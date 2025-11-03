# Preact Sample Project Specification

## Overview

A sample Preact 10 application demonstrating lightweight React-alternative development with Rsbuild as the build tool. This project showcases Preact's 3KB alternative to React with the same modern API.

## Purpose

- Demonstrate Preact 10 application setup with TypeScript
- Showcase lightweight alternative to React (3KB vs 45KB)
- Provide Preact starter template with modern hooks
- Compare Preact development workflow to React in monorepo

## Technology Stack

- **Framework**: Preact 10.23.1
- **Language**: TypeScript 5.5.4
- **Build Tool**: Rsbuild 1.1.0 (Rspack-based)
- **Build Plugin**: @rsbuild/plugin-preact 1.0.0

## Project Structure

```
packages/preact-sample/
├── index.html          # HTML template
├── package.json        # Package configuration
├── rsbuild.config.ts   # Rsbuild configuration
├── tsconfig.json       # TypeScript configuration
└── src/
    ├── app.tsx         # Main App component with counter
    ├── index.css       # Global styles
    └── main.tsx        # Application entry point
```

## Key Features

1. **Preact 10 Features**:
   - Hooks API compatible with React (`preact/hooks`)
   - Fast 3KB alternative to React
   - Same developer experience as React
   - Virtual DOM with optimized diffing

2. **TypeScript Support**:
   - Full type checking for Preact components
   - Type-safe props and state
   - JSX type definitions

3. **Interactive Components**:
   - Counter component demonstrating useState hook
   - Hot Module Replacement (HMR) for fast development
   - Same API as React hooks

4. **Modern Build System**:
   - Rsbuild (powered by Rspack) for fast builds
   - Optimized for Preact with dedicated plugin
   - Preact-specific optimizations

## Preact vs React

### Advantages of Preact

- **Size**: 3KB vs React's 45KB (gzipped)
- **Performance**: Faster rendering and updates
- **Compatibility**: Can use most React libraries via `preact/compat`
- **API**: Nearly identical to React (hooks, components, etc.)

### Key Differences

- Imports from `preact` instead of `react`
- Hooks from `preact/hooks` instead of `react`
- Smaller API surface (focused on essentials)
- `className` and event handling work the same

## Development

### Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher

### Available Commands

```bash
# Development server with HMR
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Clean build artifacts
pnpm clean
```

### Development Server

- **Default Port**: 3000
- **Hot Module Replacement**: Enabled
- **Preact Fast Refresh**: Supported via Rsbuild plugin

### Running from Monorepo Root

```bash
# Development
pnpm dev:preact

# Build
pnpm build:preact

# Using filter
pnpm --filter preact-sample dev
```

## Build Process

### Build Steps

1. **TypeScript Check**: Type checking via tsc
2. **Rsbuild Build**: Compiles and bundles Preact application
3. **Asset Optimization**: Minification, tree-shaking, code splitting
4. **Output**: Static files in `/dist/preact-sample/`

### Build Configuration (rsbuild.config.ts)

```typescript
- Entry Point: ./src/main.tsx
- HTML Template: ./index.html
- Output Directory: ../../dist/preact-sample
- Clean on Build: true
- Asset Prefix: ./ (relative paths)
```

### Build Output

- **Directory**: `/dist/preact-sample/` (at repository root)
- **Format**: Static HTML, CSS, and JavaScript bundle
- **Optimization**: Production-optimized with minification
- **Bundle Size**: Significantly smaller than React equivalent

## Component Structure

### app.tsx

Main application component featuring:
- **State Management**: useState hook from `preact/hooks`
- **Event Handling**: Button click handler
- **JSX**: Preact JSX syntax (identical to React)
- **HMR Message**: Development hint about hot module replacement

### main.tsx

Application entry point that:
- Renders Preact app to DOM
- Mounts to #app element
- Imports global styles
- Uses Preact's render function

## Configuration Files

### rsbuild.config.ts

Rsbuild configuration defining:
- Preact plugin integration
- Entry point mapping
- HTML template location
- Output directory (monorepo-aware)
- Asset path configuration

### tsconfig.json

TypeScript configuration for:
- Preact JSX support (`"jsxImportSource": "preact"`)
- Modern ES target
- Strict type checking
- Module resolution for bundlers
- Preact-specific compiler options

## Dependencies

### Production Dependencies

- **preact**: ^10.23.1 - Core Preact library (3KB)

### Development Dependencies

- **@rsbuild/core**: ^1.1.0 - Build tool core
- **@rsbuild/plugin-preact**: ^1.0.0 - Preact-specific build plugin
- **typescript**: ^5.5.4 - TypeScript compiler

## Rsbuild Benefits

1. **Performance**: 10x faster than Webpack (Rspack-based)
2. **Zero Config**: Works out of the box with sensible defaults
3. **Preact Optimized**: Dedicated plugin for Preact Fast Refresh
4. **Modern**: Built for modern web development

## Integration Points

### Monorepo Integration

- Part of pnpm workspace
- Shared TypeScript configuration patterns
- Consistent build output location (`/dist/`)
- Accessible from entry landing page
- Comparable to react-sample for feature comparison

### Browser Compatibility

- Modern browsers (ES2020+)
- Smaller bundle size = faster load times
- Better performance on low-end devices

## Testing

Currently no tests configured. Can be extended with:
- Vitest for unit tests (recommended for Preact)
- Preact Testing Library for component tests
- Playwright for E2E tests (available at root level)

## Future Enhancements

Potential additions:
- Preact Router for navigation
- State management (Zustand works great with Preact)
- preact/compat layer for React library compatibility
- API integration examples
- Unit and integration tests
- Signal-based state management (preact/signals)

## Performance Considerations

### Bundle Size Comparison

- **Preact**: ~3KB gzipped
- **React**: ~45KB gzipped (react + react-dom)
- **Savings**: ~93% smaller

### Use Cases Where Preact Shines

1. **Performance-critical applications**: Mobile, low-bandwidth
2. **Bundle size constraints**: Progressive web apps
3. **Embedded widgets**: Third-party integrations
4. **Quick prototypes**: Fast iteration with minimal overhead

## Migration from React

Preact is designed to be a drop-in replacement:

```typescript
// React
import { useState } from 'react'

// Preact
import { useState } from 'preact/hooks'
```

For full React compatibility:
```bash
pnpm add preact-compat
```

## Notes

- Uses **Preact 10** with React-compatible hooks API
- **93% smaller** than React while maintaining similar features
- **Rsbuild** provides fast builds optimized for Preact
- Configured for **monorepo** with centralized dist output
- **TypeScript** enforces type safety throughout
- Perfect for learning the difference between Preact and React
- Ideal starting point for performance-focused applications
