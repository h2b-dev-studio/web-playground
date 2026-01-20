---
title: "Entry Design"
author: Claude
date: 2025-01-16
version: 1.3.0
status: verified
depends_on:
  - entry/spec/entry.requirements.md@1.2.0
changelog:
  - v1.3.0: Add explicit root::QUALITY-PERFORMANT alignment in Performance Strategy
  - v1.2.0: Update Performance Strategy to derive from QUALITY-PERFORMANT alignment
  - v1.1.0: Add dynamic package registry generation design (REQ-ENTRY-009)
---

# Entry Design

Design for the landing page module following TECH-VANILLA and TECH-STATIC anchors.

`@derives:` REQ-ENTRY-001, REQ-ENTRY-002, REQ-ENTRY-003, REQ-ENTRY-004, REQ-ENTRY-005, REQ-ENTRY-006, REQ-ENTRY-007, REQ-ENTRY-008, REQ-ENTRY-009

**Status:** verified

---

## Component Architecture

`@derives:` REQ-ENTRY-001, REQ-ENTRY-002, REQ-ENTRY-003, REQ-ENTRY-007, REQ-ENTRY-009

- REQ-ENTRY-001: Page structure hierarchy, semantic HTML elements
- REQ-ENTRY-002: CardGrid and ProjectCard structure, PackageCard interface
- REQ-ENTRY-003: Anchor-based navigation pattern, href attribute design
- REQ-ENTRY-007: Static HTML structure, no-JS compatibility approach
- REQ-ENTRY-009: Dynamic registry generation, metadata sourcing

### Component Hierarchy

Per TECH-VANILLA and TECH-STATIC anchors, "components" are semantic HTML structures rendered at build time, not runtime framework components.

```
index.html
├── <header>                          ← Page header (REQ-ENTRY-001)
│   ├── <h1>                          ← Title: "Web Playground"
│   └── <p class="subtitle">          ← Subtitle description
│
├── <main id="app">                   ← Main content region
│   └── <section class="projects">    ← Projects section (REQ-ENTRY-001)
│       ├── <h2>                      ← Section heading
│       └── <div class="grid">        ← Card grid container (REQ-ENTRY-002)
│           └── <a class="card">      ← Project card (repeated) (REQ-ENTRY-003)
│               ├── <h3>              ← Package name
│               └── <p>               ← Package description
│
└── <footer>                          ← Page footer (REQ-ENTRY-001)
    └── <p>                           ← Build info text
```

@rationale: Cards are `<a>` elements (not `<div>` with JS handlers) — enables REQ-ENTRY-007 no-JS navigation via native browser link behavior.

### Data Interface

Package card data follows the Package Card Contract from foundation:

```typescript
// src/types/index.ts
interface PackageCard {
  /** Display name (e.g., "React Sample") */
  name: string;
  /** Brief technology description */
  description: string;
  /** Relative path: {package-name}/index.html */
  href: string;
}

type PackageRegistry = readonly PackageCard[];

/** Optional package.json extension for custom display metadata */
interface PlaygroundMeta {
  title?: string;
  description?: string;
}
```

@rationale: Read-only array prevents accidental mutation; interface mirrors foundation contract exactly. PlaygroundMeta allows packages to customize their entry display without affecting their npm package identity.

### Build-Time Data Flow

`@derives:` REQ-ENTRY-009

```
┌─────────────────────┐
│ packages/           │  Workspace packages directory
│ ├── react-sample/   │
│ │   └── package.json│  Contains playgroundMeta or name/description
│ └── {other-pkg}/    │
└──────────┬──────────┘
           │ scan & read
           ▼
┌─────────────────────┐
│ generate-registry   │  Build-time script (Node.js)
│ - Scan packages/    │
│ - Read package.json │
│ - Extract metadata  │
└──────────┬──────────┘
           │ generate
           ▼
┌─────────────────────┐
│ src/generated/      │  Generated TypeScript file
│ registry.ts         │  export const packages: PackageRegistry = [...]
└──────────┬──────────┘
           │ build-time import
           ▼
┌─────────────────────┐
│ main.ts             │  Entry point (progressive enhancement)
│ - Render cards      │
│ - No runtime state  │
└──────────┬──────────┘
           │ Vite build
           ▼
┌─────────────────────┐
│ index.html          │  Static output with inline content
│ <a class="card">    │
└─────────────────────┘
```

### Registry Generation Script

`@derives:` REQ-ENTRY-009

**Location:** `scripts/generate-registry.ts`

**Algorithm:**
```
1. Read packages/ directory entries
2. For each directory:
   a. Check if package.json exists
   b. Read and parse package.json
   c. Extract metadata:
      - title: playgroundMeta.title || cleanName(name)
      - description: playgroundMeta.description || description || ""
      - href: `${directoryName}/index.html`
3. Sort packages alphabetically by title
4. Write TypeScript file to src/generated/registry.ts
```

**Output format:**
```typescript
// src/generated/registry.ts (auto-generated, do not edit)
import type { PackageRegistry } from '../types';

export const packages: PackageRegistry = [
  {
    name: "React Sample",
    description: "Modern React patterns with hooks and TypeScript",
    href: "react-sample/index.html"
  },
  // ... more packages
] as const;
```

**Build integration:**
- Script runs as prebuild step: `pnpm generate:registry && vite build`
- Generated file is gitignored (derived artifact)
- TypeScript compilation validates registry structure

### State Management

**No runtime state required.**

| REQ | State Implication | Location |
|-----|-------------------|----------|
| REQ-ENTRY-001 | Static structure | HTML (compile-time) |
| REQ-ENTRY-002 | Package list | Generated TypeScript (build-time) |
| REQ-ENTRY-003 | Navigation | Anchor href attributes (no state) |
| REQ-ENTRY-007 | No-JS requirement | Precludes runtime state |
| REQ-ENTRY-009 | Package registry | Generated from packages/ (build-time) |

@rationale: TECH-STATIC anchor requires core functionality without JavaScript. All "state" is build-time data baked into HTML. REQ-ENTRY-009 ensures the registry is generated, not hard-coded.

### Patterns Used

| Need | Pattern | REQ |
|------|---------|-----|
| Semantic structure | Landmark elements (`<header>`, `<main>`, `<footer>`) | REQ-ENTRY-001 |
| Accessible navigation | Card-as-anchor (entire card is clickable `<a>`) | REQ-ENTRY-003, REQ-ENTRY-007 |
| Data-driven rendering | Template literal HTML generation | REQ-ENTRY-002 |
| Progressive enhancement | JS enhances, HTML works standalone | REQ-ENTRY-007 |
| Dynamic registry | Build-time code generation from package.json | REQ-ENTRY-009 |

**Progressive Enhancement Strategy:**

```
Layer 1 (HTML-only):     Content visible, links work
Layer 2 (CSS):           Layout, styling, hover effects
Layer 3 (JS optional):   Future enhancements only
```

### Library Candidates

**No external libraries required.**

| Purpose | Candidates | Notes |
|---------|------------|-------|
| Build tool | Vite | Already specified in TECH-VANILLA |
| Templating | Template literals | Native JS, zero dependencies |
| Styling | Vanilla CSS | No preprocessor needed per QUALITY-MINIMAL |

@rationale: TECH-VANILLA explicitly prohibits framework dependencies. Native browser APIs sufficient for static landing page.

**Status:** verified

---

## UI/UX Design

`@derives:` REQ-ENTRY-001, REQ-ENTRY-002, REQ-ENTRY-004, REQ-ENTRY-005, REQ-ENTRY-006

### Layout Structure

`@derives:` REQ-ENTRY-001

```
┌─────────────────────────────────────────────────┐
│                 Gradient Body                   │
│  ┌───────────────────────────────────────────┐  │
│  │              HEADER                       │  │
│  │  ┌─────────────────────────────────────┐  │  │
│  │  │  "Web Playground" (h1, centered)    │  │  │
│  │  │  Subtitle (p, centered)             │  │  │
│  │  └─────────────────────────────────────┘  │  │
│  ├───────────────────────────────────────────┤  │
│  │              MAIN                         │  │
│  │  ┌─────────────────────────────────────┐  │  │
│  │  │  "Projects" (h2)                    │  │  │
│  │  │  ┌─────────┐ ┌─────────┐ ┌───────┐  │  │  │
│  │  │  │  Card   │ │  Card   │ │ Card  │  │  │  │
│  │  │  │  h3+p   │ │  h3+p   │ │ h3+p  │  │  │  │
│  │  │  └─────────┘ └─────────┘ └───────┘  │  │  │
│  │  └─────────────────────────────────────┘  │  │
│  ├───────────────────────────────────────────┤  │
│  │              FOOTER                       │  │
│  │  "Built with Vite + TypeScript"           │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Responsive Breakpoints

`@derives:` REQ-ENTRY-006

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Desktop | >=769px | Auto-fit grid (min 280px columns), 2rem padding |
| Mobile | <=768px | Single column grid, 1rem body padding, 1.5rem section padding |

### Interaction Patterns

`@derives:` REQ-ENTRY-005

| Action | Trigger | Feedback | Duration |
|--------|---------|----------|----------|
| Card hover | Mouse enter | Lift (translateY -4px), enhanced shadow, purple border | 300ms ease |
| Card focus | Tab navigation | Same visual as hover (via :focus-visible) | 300ms ease |
| Card click | Click/Enter | Navigate to href | Immediate |

### Visual Hierarchy

`@derives:` REQ-ENTRY-004

**Color System:**

| Element | Color | Purpose |
|---------|-------|---------|
| Brand gradient | `#667eea` -> `#764ba2` | Header, body background |
| Card title | `#667eea` | Links to brand, indicates interactivity |
| Body text | `#333` | High contrast for readability |
| Secondary text | `#666` | Card descriptions, footer |

**Status:** verified

---

## Security Considerations

`@derives:` REQ-ENTRY-003, REQ-ENTRY-007

### Attack Surface Analysis

| REQ | User Input | Dynamic Content | Code Execution |
|-----|------------|-----------------|----------------|
| REQ-ENTRY-003 | None | None (static links) | None |
| REQ-ENTRY-007 | None | None (static HTML) | None |

**Assessment:** Minimal attack surface. All content is build-time static.

### Link Security

`@derives:` REQ-ENTRY-003

| Link Type | Pattern | Security Treatment |
|-----------|---------|-------------------|
| Same-origin relative | `{package-name}/index.html` | No special attributes needed |
| External (if any) | `http://localhost:{port}` | `rel="noopener noreferrer"` |

### CSP Compatibility

`@derives:` REQ-ENTRY-007

| CSP Directive | Recommended Value |
|---------------|-------------------|
| `default-src` | `'self'` |
| `script-src` | `'self'` |
| `style-src` | `'self'` |
| `frame-ancestors` | `'none'` |

**Status:** verified

---

## Performance Strategy

`@derives:` REQ-ENTRY-007, REQ-ENTRY-008
`@aligns-to:` root::QUALITY-PERFORMANT (via REQ-ENTRY-007, REQ-ENTRY-008)

### Bundle Budget

| Category | Budget | Rationale |
|----------|--------|-----------|
| Initial JS | <1KB gzip | CSS import only; navigation is native anchor behavior |
| CSS | <2KB gzip | Single stylesheet, no framework CSS |
| HTML | <2KB gzip | Static markup, no hydration payload |
| **Total** | **<5KB gzip** | Landing page should load instantly |

### Library Selection

| Purpose | Selection | Size (gzip) |
|---------|-----------|-------------|
| Build tool | Vite | 0KB (dev only) |
| TypeScript | tsc | 0KB (dev only) |
| Runtime libs | None | 0KB |

### Performance Metrics

| Metric | Target |
|--------|--------|
| LCP | <1.0s |
| FID | <50ms |
| CLS | 0 |
| Lighthouse | >95 |

**Status:** verified

---

## Decisions Log

| ID | Decision | Rationale | Owner |
|----|----------|-----------|-------|
| DEC-FE-001 | Cards as anchor elements | REQ-ENTRY-007 no-JS navigation | frontend |
| DEC-FE-002 | Semantic HTML landmarks | REQ-ENTRY-001 accessibility/SEO | frontend |
| DEC-FE-003 | Build-time data flow, no runtime state | REQ-ENTRY-007 + TECH-STATIC | frontend |
| DEC-FE-004 | Generated registry over hard-coded | REQ-ENTRY-009, automatic package discovery | frontend |
| DEC-FE-005 | playgroundMeta in package.json | REQ-ENTRY-009, allows custom display without npm identity change | frontend |
| DEC-UX-001 | Two-tier responsive (768px) | REQ-ENTRY-006, QUALITY-MINIMAL | uiux |
| DEC-UX-002 | Hover lift effect 300ms | REQ-ENTRY-005 | uiux |
| DEC-SEC-001 | Static content model | REQ-ENTRY-007 eliminates injection | security |
| DEC-PERF-001 | Near-zero JS budget | REQ-ENTRY-007 | perf |
| DEC-PERF-002 | System font stack | QUALITY-MINIMAL, no web fonts | perf |

---

## Cross-Cutting Concerns

| Concern | Primary | Reviewer | Status |
|---------|---------|----------|--------|
| Accessibility | uiux | frontend | approved |
| Link security | frontend | security | approved |
| Loading performance | perf | uiux | approved |

---

## Traceability Matrix

| REQ | Component | UI/UX | Security | Perf |
|-----|-----------|-------|----------|------|
| REQ-ENTRY-001 | ✓ | ✓ | | |
| REQ-ENTRY-002 | ✓ | ✓ | | |
| REQ-ENTRY-003 | ✓ | | ✓ | |
| REQ-ENTRY-004 | | ✓ | | |
| REQ-ENTRY-005 | | ✓ | | |
| REQ-ENTRY-006 | | ✓ | | |
| REQ-ENTRY-007 | ✓ | | ✓ | ✓ |
| REQ-ENTRY-008 | | | | ✓ |
| REQ-ENTRY-009 | ✓ | | | |
