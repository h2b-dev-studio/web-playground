# React Sample Project Specification

## Overview

A sample React 18 application demonstrating modern React development with Rsbuild as the build tool. This project showcases the latest React features including hooks, strict mode, and the new root API.

## Purpose

- Demonstrate React 18 application setup with TypeScript
- Showcase Rsbuild (Rspack-based) as a fast alternative to Webpack
- Provide a minimal React starter template
- Test React development workflow in the monorepo

## Technology Stack

- **Framework**: React 18.3.1
- **Language**: TypeScript 5.5.4
- **Build Tool**: Rsbuild 1.1.0 (Rspack-based)
- **Build Plugin**: @rsbuild/plugin-react 1.0.0
- **DOM Rendering**: react-dom 18.3.1

## Project Structure

```
packages/react-sample/
├── index.html          # HTML template
├── package.json        # Package configuration
├── rsbuild.config.ts   # Rsbuild configuration
├── tsconfig.json       # TypeScript configuration
└── src/
    ├── App.tsx         # Main App component with counter
    ├── index.css       # Global styles
    └── main.tsx        # Application entry point
```

## Key Features

1. **React 18 Features**:
   - New root API (`ReactDOM.createRoot`)
   - Strict Mode enabled for development checks
   - Concurrent features support

2. **TypeScript Support**:
   - Full type checking for React components
   - Type-safe props and state
   - React type definitions (@types/react, @types/react-dom)

3. **Interactive Components**:
   - Counter component demonstrating useState hook
   - Hot Module Replacement (HMR) for fast development

4. **Modern Build System**:
   - Rsbuild (powered by Rspack) for fast builds
   - Optimized for React with dedicated plugin

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
- **React Fast Refresh**: Supported via Rsbuild plugin

### Running from Monorepo Root

```bash
# Development
pnpm dev:react

# Build
pnpm build:react

# Using filter
pnpm --filter react-sample dev
```

## Build Process

### Build Steps

1. **TypeScript Check**: Type checking via tsc
2. **Rsbuild Build**: Compiles and bundles React application
3. **Asset Optimization**: Minification, tree-shaking, code splitting
4. **Output**: Static files in `/dist/react-sample/`

### Build Configuration (rsbuild.config.ts)

```typescript
- Entry Point: ./src/main.tsx
- HTML Template: ./index.html
- Output Directory: ../../dist/react-sample
- Clean on Build: true
- Asset Prefix: ./ (relative paths)
```

### Build Output

- **Directory**: `/dist/react-sample/` (at repository root)
- **Format**: Static HTML, CSS, and JavaScript bundle
- **Optimization**: Production-optimized with minification

## Component Structure

### App.tsx

Main application component featuring:
- **State Management**: useState hook for counter
- **Event Handling**: Button click handler
- **JSX**: Modern React syntax
- **HMR Message**: Development hint about hot module replacement

### main.tsx

Application entry point that:
- Creates React root using new API
- Wraps app in React.StrictMode
- Mounts to #root element
- Imports global styles

## Configuration Files

### rsbuild.config.ts

Rsbuild configuration defining:
- React plugin integration
- Entry point mapping
- HTML template location
- Output directory (monorepo-aware)
- Asset path configuration

### tsconfig.json

TypeScript configuration for:
- React JSX support
- Modern ES target
- Strict type checking
- Module resolution for bundlers

## Dependencies

### Production Dependencies

- **react**: ^18.3.1 - Core React library
- **react-dom**: ^18.3.1 - React DOM renderer

### Development Dependencies

- **@rsbuild/core**: ^1.1.0 - Build tool core
- **@rsbuild/plugin-react**: ^1.0.0 - React-specific build plugin
- **@types/react**: ^18.3.3 - React type definitions
- **@types/react-dom**: ^18.3.0 - React DOM type definitions
- **typescript**: ^5.5.4 - TypeScript compiler

## Rsbuild Benefits

1. **Performance**: 10x faster than Webpack (Rspack-based)
2. **Zero Config**: Works out of the box with sensible defaults
3. **React Optimized**: Dedicated plugin for React Fast Refresh
4. **Modern**: Built for modern web development

## Integration Points

### Monorepo Integration

- Part of pnpm workspace
- Shared TypeScript configuration patterns
- Consistent build output location (`/dist/`)
- Accessible from entry landing page

### Browser Compatibility

- Modern browsers (ES2020+)
- No legacy browser support by default
- Can be configured via Rsbuild browserslist

## Testing

Currently no tests configured. Can be extended with:
- Jest or Vitest for unit tests
- React Testing Library for component tests
- Playwright for E2E tests (available at root level)

## Future Enhancements

Potential additions:
- React Router for navigation
- State management (Redux, Zustand, etc.)
- Component library integration
- API integration examples
- Unit and integration tests

## Notes

- Uses **React 18** with all modern features
- **Rsbuild** provides faster builds than traditional Webpack setup
- Configured for **monorepo** with centralized dist output
- **TypeScript** enforces type safety throughout
- Ready for extension with routing, state management, etc.
