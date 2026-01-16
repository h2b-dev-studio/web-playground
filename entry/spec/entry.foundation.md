---
title: "Entry Foundation"
author: Claude
date: 2025-01-16
version: 1.1.0
status: verified
inherits:
  - spec/foundation.md@1.1.0
changelog:
  - v1.1.0: Add dynamic package registry requirement (build-time generation)
  - v1.0.0: Initial foundation for Entry landing page
---

# Entry

## Identity

Central navigation hub for Web Playground, providing visual discovery and access to all sample packages through a modern, responsive landing page.

## Purpose

Enable developers to:

1. Discover available samples at a glance
2. Navigate directly to any sample with a single click
3. Understand each sample's technology stack from card descriptions
4. Experience consistent visual design that represents the playground's quality

## Inherits

- root::SCOPE-SHOWCASE
- root::SCOPE-MONOREPO
- root::QUALITY-TYPESCRIPT
- root::QUALITY-MINIMAL
- root::QUALITY-IDIOMATIC
- root::AUDIENCE-DEVELOPER

## Identity Anchors

Entry-specific anchors extending inherited root anchors:

### Technology

- **TECH-VANILLA:** Pure TypeScript with Vite. No framework dependencies. Demonstrates minimal viable web app.
- **TECH-STATIC:** Static HTML with progressive enhancement. Works without JavaScript for core navigation.

### Presentation

- **PRES-MODERN:** Modern visual design with gradient backgrounds, card-based layout, and smooth transitions.
- **PRES-RESPONSIVE:** Fully responsive layout adapting to mobile, tablet, and desktop viewports.

### Navigation

- **NAV-CATALOG:** Displays all available packages as navigable cards with title and description.
- **NAV-DIRECT:** Each card links directly to the sample's entry point (relative path or localhost port).

### Registry

- **REG-DYNAMIC:** Package registry is generated at build time, not hard-coded. Enables automatic discovery of new packages.
- **REG-METADATA:** Package metadata sourced from each package's `package.json` (name, description, playgroundMeta).

## Scope Boundaries

### In Scope

- Landing page with header, project grid, and footer
- Project cards linking to all sample packages
- Responsive layout for all viewport sizes
- Visual hover effects for interactivity feedback
- Gradient background theming
- Build-time package registry generation from workspace packages

### Out of Scope

- Authentication or user sessions
- Runtime dynamic package discovery (registry is build-time only)
- Search or filtering functionality
- State persistence
- Analytics or tracking

## Package Registry Protocol

Entry displays packages following a consistent registration contract. The registry is generated at build time by scanning workspace packages.

### Registry Generation

`@aligns-to:` REG-DYNAMIC, REG-METADATA

A build-time script scans `packages/` directory and generates the registry:
1. Discovers all directories in `packages/` that contain `package.json`
2. Reads metadata from each package's `package.json`
3. Generates typed registry file consumed by entry build

### Package Card Contract

Each package provides metadata via `package.json`:

| Field | Source | Description |
|-------|--------|-------------|
| `name` | `package.json#playgroundMeta.title` or `package.json#name` | Display name (e.g., "React Sample") |
| `description` | `package.json#playgroundMeta.description` or `package.json#description` | Brief technology description |
| `href` | Derived from directory name | Relative path `{package-name}/index.html` |

### playgroundMeta Extension

Packages may define optional `playgroundMeta` in `package.json` for custom display:

```json
{
  "name": "@web-playground/react-sample",
  "playgroundMeta": {
    "title": "React Sample",
    "description": "Modern React patterns with hooks and TypeScript"
  }
}
```

If `playgroundMeta` is absent, falls back to `name` (cleaned) and `description`.

### Link Convention

All packages link via relative paths per root design spec (DEC-002: Unified dist/ Output):
- Pattern: `{package-name}/index.html`
- Derived from package directory name in `packages/`
- Enables unified `dist/` static serving

## Success Criteria

This module succeeds when a developer can:

1. Load the entry page and immediately see all available samples
2. Click any sample card and navigate to that sample
3. Use the page on any device (mobile, tablet, desktop)
4. Understand each sample's purpose from the card description
