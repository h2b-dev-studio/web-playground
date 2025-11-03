# Entry Project Specification

## Overview

The Entry project serves as the landing page and navigation hub for the web-playground monorepo. It provides a unified entry point to access all sample projects in the repository.

## Purpose

- Provide a central landing page for all projects in the monorepo
- Display project cards with links to each sample application
- Demonstrate basic Vite + TypeScript setup without any framework

## Technology Stack

- **Runtime**: Vanilla TypeScript (no framework)
- **Build Tool**: Vite 5.4.0
- **Language**: TypeScript 5.5.4
- **Module System**: ES Modules (type: "module")

## Project Structure

```
entry/
├── index.html          # Main HTML file with project cards
├── package.json        # Package configuration
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite build configuration
└── src/
    ├── main.ts         # Entry point - adds interactivity to project cards
    └── style.css       # Styling for the landing page
```

## Key Features

1. **Landing Page**: Clean, simple landing page introducing the web-playground
2. **Project Navigation**: Grid layout with clickable cards for each project:
   - React Sample
   - Preact Sample
   - Next.js Sample
   - Express Sample
   - Nest.js Sample
3. **Interactive Cards**: Click event handlers on project cards with console logging
4. **Responsive Design**: Modern CSS with grid layout

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

- **URL**: http://localhost:5173 (default Vite port)
- **Hot Module Replacement**: Enabled
- **Port**: Configurable via Vite

## Build Process

### Build Steps

1. **TypeScript Compilation**: `tsc` compiles TypeScript to JavaScript
2. **Vite Build**: Bundles and optimizes assets
3. **Output**: Static files in `dist/` directory

### Build Output

- **Directory**: `/dist/` (at repository root)
- **Format**: Static HTML, CSS, and JavaScript files
- **Optimization**: Minification, tree-shaking, code splitting

### Build Configuration

Located in `vite.config.ts`:
- Output directory configuration
- Module resolution settings
- Build optimizations

## File Descriptions

### index.html

Main HTML file containing:
- Project header and description
- Grid of project cards linking to sample applications
- Script tag loading the TypeScript entry point

### src/main.ts

Entry point script that:
- Imports global styles
- Adds click event listeners to project cards
- Logs navigation events to console
- Confirms page load on DOMContentLoaded

### tsconfig.json

TypeScript configuration for:
- ES2020+ target
- DOM library support
- Strict type checking
- Module resolution

## Dependencies

### Production Dependencies

None - pure vanilla TypeScript project

### Development Dependencies

- **typescript**: ^5.5.4 - TypeScript compiler
- **vite**: ^5.4.0 - Build tool and dev server

## Integration Points

### Monorepo Integration

- Part of pnpm workspace defined in root `pnpm-workspace.yaml`
- Accessible via workspace commands: `pnpm --filter entry <script>`
- Included in root-level build script: `pnpm build:entry`

### Links to Other Projects

The entry page provides navigation to:
- `/react-sample/` - React application
- `/preact-sample/` - Preact application
- `/next-sample/` - Next.js application
- `/express-sample/` - Express server (documentation page)
- `/nest-sample/` - NestJS server (documentation page)

## Notes

- This is a **vanilla TypeScript** project - no frontend framework used
- Uses modern ES modules and Vite for fast development experience
- Serves as the homepage when deploying the entire monorepo
- Minimal dependencies for maximum simplicity
