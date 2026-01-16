---
title: "Entry Foundation"
author: Claude
date: 2025-01-16
version: 1.0.0
status: verified
inherits:
  - spec/foundation.md@1.1.0
changelog:
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

## Scope Boundaries

### In Scope

- Landing page with header, project grid, and footer
- Project cards linking to all sample packages
- Responsive layout for all viewport sizes
- Visual hover effects for interactivity feedback
- Gradient background theming

### Out of Scope

- Authentication or user sessions
- Dynamic package discovery (package list is static)
- Search or filtering functionality
- State persistence
- Analytics or tracking

## Package Registry Protocol

Entry displays packages following a consistent registration contract. Each package provides metadata for discovery.

### Package Card Contract

Each registered package provides:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name (e.g., "React Sample") |
| `description` | string | Brief technology description |
| `href` | string | Relative path `{package-name}/index.html` |

### Link Convention

All packages link via relative paths per root design spec (DEC-002: Unified dist/ Output):
- Pattern: `{package-name}/index.html`
- Enables unified `dist/` static serving

## Success Criteria

This module succeeds when a developer can:

1. Load the entry page and immediately see all available samples
2. Click any sample card and navigate to that sample
3. Use the page on any device (mobile, tablet, desktop)
4. Understand each sample's purpose from the card description
