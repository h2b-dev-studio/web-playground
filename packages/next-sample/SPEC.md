# Next.js Sample Project Specification

## Overview

A sample Next.js 14 application demonstrating the modern App Router architecture with static site generation. This project showcases Next.js's latest features including the App Router, Server Components, and static export capabilities.

## Purpose

- Demonstrate Next.js 14 with App Router setup
- Showcase static site generation (SSG) for deployment
- Provide Next.js starter template with TypeScript
- Compare Next.js framework approach to other React solutions in monorepo

## Technology Stack

- **Framework**: Next.js 14.2.5
- **React Version**: React 18.3.1
- **Language**: TypeScript 5.5.4
- **Rendering**: Static Site Generation (output: 'export')
- **Architecture**: App Router (not Pages Router)

## Project Structure

```
packages/next-sample/
├── next.config.js      # Next.js configuration (static export)
├── next-env.d.ts       # Next.js TypeScript declarations
├── package.json        # Package configuration
├── tsconfig.json       # TypeScript configuration
└── src/
    └── app/            # App Router directory
        ├── globals.css     # Global styles
        ├── layout.tsx      # Root layout component
        ├── page.tsx        # Home page (client component)
        └── page.module.css # Page-specific CSS module
```

## Key Features

1. **Next.js 14 App Router**:
   - File-system based routing
   - Server Components by default
   - Layouts and nested routing
   - Modern routing architecture

2. **Static Site Generation**:
   - `output: 'export'` in next.config.js
   - Pre-renders all pages at build time
   - No Node.js server required
   - Deployable to any static hosting

3. **Client Component Features**:
   - `'use client'` directive for interactivity
   - React hooks (useState)
   - Counter component demonstration
   - CSS Modules for scoped styling

4. **TypeScript Support**:
   - Full type safety with Next.js
   - Metadata types for SEO
   - React type definitions
   - Next.js type declarations

## App Router Concepts

### Layout (layout.tsx)

Root layout that:
- Wraps all pages in the application
- Defines HTML structure (`<html>`, `<body>`)
- Sets metadata (title, description)
- Provides consistent UI across routes

### Page (page.tsx)

Home page component that:
- Uses `'use client'` for client-side interactivity
- Implements counter with useState
- Uses CSS Modules for styling
- Exports default function as page

## Development

### Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher

### Available Commands

```bash
# Development server
pnpm dev

# Build for production (static export)
pnpm build

# Start production server (if not using static export)
pnpm start

# Clean build artifacts
pnpm clean
```

### Development Server

- **Default Port**: 3000
- **Fast Refresh**: Enabled
- **Server Components**: Supported
- **Hot Module Replacement**: Built-in

### Running from Monorepo Root

```bash
# Development
pnpm dev:next

# Build
pnpm build:next

# Using filter
pnpm --filter next-sample dev
```

## Build Process

### Build Steps

1. **Next.js Build**: Compiles and optimizes application
2. **Static Export**: Generates static HTML/CSS/JS files
3. **Output Move**: Moves `out/` to `/dist/next-sample/`
4. **Clean**: Removes intermediate build files

### Build Configuration (next.config.js)

```javascript
{
  output: 'export'  // Enable static HTML export
}
```

### Build Output

- **Intermediate**: `.next/` directory (build cache)
- **Static Export**: `out/` directory
- **Final Location**: `/dist/next-sample/` (at repository root)
- **Format**: Static HTML, CSS, and JavaScript files

### Build Script

```bash
next build && rm -rf ../../dist/next-sample && mv out ../../dist/next-sample
```

Steps:
1. Build with Next.js
2. Remove old dist directory
3. Move exported files to monorepo dist

## Configuration Files

### next.config.js

Next.js configuration:
- **output: 'export'**: Enables static site generation
- No dynamic server features (API routes, ISR, etc.)
- Optimized for static hosting

### tsconfig.json

TypeScript configuration for Next.js:
- Next.js-specific paths and plugins
- JSX support with React
- Strict type checking
- Module resolution for bundlers
- Incremental compilation

## Dependencies

### Production Dependencies

- **next**: ^14.2.5 - Next.js framework
- **react**: ^18.3.1 - Core React library
- **react-dom**: ^18.3.1 - React DOM renderer

### Development Dependencies

- **@types/node**: ^20.14.12 - Node.js type definitions
- **@types/react**: ^18.3.3 - React type definitions
- **@types/react-dom**: ^18.3.0 - React DOM type definitions
- **typescript**: ^5.5.4 - TypeScript compiler

## Next.js App Router Benefits

1. **Performance**: Automatic code splitting and optimization
2. **SEO**: Built-in metadata API for SEO tags
3. **Developer Experience**: Fast Refresh, TypeScript, ESLint
4. **Flexibility**: Server and Client Components
5. **Static Export**: Deploy anywhere without server

## Static vs Server Mode

This project uses **static export** mode:

### Advantages
- No Node.js server required
- Deploy to CDN/static hosting
- Predictable performance
- Lower hosting costs

### Limitations
- No API routes
- No dynamic server rendering (ISR, SSR)
- No dynamic routes without predefining paths
- No Image Optimization API

## Integration Points

### Monorepo Integration

- Part of pnpm workspace
- Consistent TypeScript configuration
- Centralized build output (`/dist/`)
- Accessible from entry landing page
- Demonstrates framework approach vs library approach

### Browser Compatibility

- Modern browsers (ES2020+)
- Automatic polyfills via Next.js
- Optimized bundle splitting

## Styling

### CSS Modules

- **Scoped styles**: Automatic class name hashing
- **Type-safe**: CSS modules with TypeScript
- **Performance**: Only loads styles for current route

### Global Styles

- **globals.css**: Application-wide styles
- **Imported in layout**: Applies to all pages

## Metadata and SEO

Configured in `layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'Next.js Sample',
  description: 'A sample Next.js application',
}
```

Can be extended with:
- Open Graph tags
- Twitter cards
- Custom meta tags
- Favicon configuration

## Testing

Currently no tests configured. Can be extended with:
- Jest with Next.js test setup
- React Testing Library
- Playwright for E2E tests (available at root level)
- Cypress for E2E testing

## Future Enhancements

Potential additions:
- Multiple pages/routes (file-based routing)
- Server Components examples
- Data fetching with async components
- API routes (if switching to server mode)
- Image optimization examples
- Internationalization (i18n)
- Middleware examples
- Error boundaries

## Deployment

### Static Hosting Options

The built output in `/dist/next-sample/` can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static file hosting

### Deployment Steps

1. Run `pnpm build` or `pnpm build:next`
2. Deploy contents of `/dist/next-sample/`
3. Configure hosting for SPA routing (if needed)

## App Router vs Pages Router

This project uses the **App Router** (modern):
- Files in `src/app/` directory
- Server Components by default
- Nested layouts
- Improved performance

**Not** using Pages Router (legacy):
- Would be in `pages/` directory
- All components are client components
- Older Next.js architecture

## Notes

- Uses **Next.js 14** with modern App Router
- Configured for **static export** (no server required)
- **CSS Modules** for component-scoped styling
- **TypeScript** with full Next.js type support
- Perfect for learning Next.js static site generation
- Demonstrates framework approach to React development
- Can be switched to server mode by removing `output: 'export'`
- Includes metadata API for SEO optimization
