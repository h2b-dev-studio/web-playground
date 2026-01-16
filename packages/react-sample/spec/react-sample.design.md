---
title: "React Sample Design"
author: Claude
date: 2025-01-16
version: 1.0.0
status: verified
depends_on:
  - packages/react-sample/spec/react-sample.requirements.md@1.2.0
---

# React Sample Design

## Overview

Design for the react-sample Pattern Gallery with Props Playground. This package demonstrates idiomatic React 19 patterns through interactive demos with live code viewing and editing capabilities.

@derives: REQ-REACT-001, REQ-REACT-002, REQ-REACT-003, REQ-REACT-004, REQ-REACT-005

- REQ-REACT-001: Component hierarchy and pattern organization
- REQ-REACT-002: Props playground with real-time updates
- REQ-REACT-003: Code viewer with syntax highlighting
- REQ-REACT-004: Editable custom hook examples
- REQ-REACT-005: Responsive layout across viewports

**Status:** verified

## Component Architecture

@derives: REQ-REACT-001, REQ-REACT-002, REQ-REACT-003, REQ-REACT-004

- REQ-REACT-001: PatternList, PatternCard, PatternDemo components
- REQ-REACT-002: PropsPlayground with type-specific controls
- REQ-REACT-003: CodeViewer with collapsible panel
- REQ-REACT-004: CodeEditor with ErrorBoundary

### Component Hierarchy

```
App
├── Navigation
│   └── PatternList
│       └── PatternCard (×n)
└── PatternDemo
    ├── DemoArea
    │   ├── LivePreview
    │   └── ErrorBoundary
    ├── PropsPlayground
    │   └── PropControl
    │       ├── CheckboxControl
    │       ├── TextControl
    │       ├── NumberControl
    │       └── SelectControl
    └── CodePanel
        ├── CodeViewer
        │   └── CopyButton
        └── CodeEditor (editable patterns only)
```

### Props Interfaces

#### PatternDemo

```tsx
interface PatternDemoProps {
  /**
   * @derives REQ-REACT-001 - "clicking pattern navigates to its demo"
   */
  patternId: string;
}
```

#### PropsPlayground

```tsx
interface PropsPlaygroundProps {
  /**
   * @derives REQ-REACT-002 - "manipulate component props in real-time"
   */
  value: Record<string, unknown>;
  onChange: (props: Record<string, unknown>) => void;

  /**
   * @derives REQ-REACT-002 - Control mapping table
   */
  schema: PropSchema[];
}

interface PropSchema {
  name: string;
  type: 'boolean' | 'string' | 'number' | 'enum';
  options?: string[];  // For enum type
  default?: unknown;
}
```

#### CodeViewer

```tsx
interface CodeViewerProps {
  /**
   * @derives REQ-REACT-003 - "displays actual component source"
   */
  code: string;
  language: 'tsx' | 'ts';

  /**
   * @derives REQ-REACT-003 - "collapsible panel"
   */
  defaultCollapsed?: boolean;
}
```

#### CodeEditor

```tsx
interface CodeEditorProps {
  /**
   * @derives REQ-REACT-004 - "inline code editing for JS logic"
   */
  value: string;
  onChange: (code: string) => void;

  /**
   * @derives REQ-REACT-004 - "reset to original code"
   */
  onReset: () => void;
}
```

### State Management

| State | Location | REQ Implication |
|-------|----------|-----------------|
| selectedPattern | URL (router) | REQ-REACT-001 implies shareable demos |
| propValues | PatternDemo (useState) | REQ-REACT-002 "real-time" but scoped to demo |
| collapsed | CodeViewer (useState) | REQ-REACT-003 "collapsible" — local only |
| editedCode | CodeEditor (useState) | REQ-REACT-004 isolated to editor |
| codeError | ErrorBoundary | REQ-REACT-004 "without crashing" |

### Patterns Used

| Pattern | Where | @derives |
|---------|-------|----------|
| Controlled Components | PropsPlayground, CodeEditor | REQ-REACT-002, REQ-REACT-004 — real-time updates |
| Custom Hook | useEditableCode | REQ-REACT-004 — reusable code execution logic |
| Error Boundary | Around LivePreview | REQ-REACT-004 — "without crashing" |

### Library Candidates

| Purpose | Candidates | Notes for Perf |
|---------|------------|----------------|
| Syntax highlighting | prism-react-renderer, highlight.js, shiki | prism-react-renderer smallest, tree-shakable |
| Code editing | react-simple-code-editor, CodeMirror, Monaco | react-simple-code-editor tiny, others heavy |

**Note:** Final selection pending perf review against 10KB budget (TECH-LIGHTWEIGHT-DEPS).

### File Structure

```
packages/react-sample/
├── src/
│   ├── components/
│   │   ├── Navigation/
│   │   │   ├── index.ts
│   │   │   ├── PatternList.tsx
│   │   │   └── PatternCard.tsx
│   │   ├── PatternDemo/
│   │   │   ├── index.ts
│   │   │   ├── PatternDemo.tsx
│   │   │   ├── DemoArea.tsx
│   │   │   ├── LivePreview.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── PropsPlayground/
│   │   │   ├── index.ts
│   │   │   ├── PropsPlayground.tsx
│   │   │   └── controls/
│   │   │       ├── CheckboxControl.tsx
│   │   │       ├── TextControl.tsx
│   │   │       ├── NumberControl.tsx
│   │   │       └── SelectControl.tsx
│   │   └── CodePanel/
│   │       ├── index.ts
│   │       ├── CodeViewer.tsx
│   │       ├── CodeEditor.tsx
│   │       └── CopyButton.tsx
│   ├── hooks/
│   │   └── useEditableCode.ts
│   ├── patterns/
│   │   └── {pattern-name}/
│   │       ├── Demo.tsx
│   │       ├── source.ts      # Raw source for CodeViewer
│   │       └── schema.ts      # Props schema for Playground
│   └── types/
│       └── props.ts
```

**Status:** verified

## UI/UX Design

@derives: REQ-REACT-001, REQ-REACT-002, REQ-REACT-003, REQ-REACT-005

- REQ-REACT-001: Navigation layout for pattern catalog
- REQ-REACT-002: Props playground controls and immediate feedback
- REQ-REACT-003: Code panel with copy and collapse interactions
- REQ-REACT-005: Responsive breakpoints and touch targets

### Layout Structure

```
┌─────────────────────────────────────────────┐
│  Navigation (Pattern List)                  │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────┐  ┌──────────────────┐  │
│  │                 │  │  Props Playground │  │
│  │   Live Demo     │  │  ┌─────────────┐ │  │
│  │                 │  │  │ Control     │ │  │
│  │                 │  │  │ Control     │ │  │
│  │                 │  │  │ Control     │ │  │
│  └─────────────────┘  │  └─────────────┘ │  │
│                       └──────────────────┘  │
├─────────────────────────────────────────────┤
│  Code Panel (collapsible)                   │
│  ┌─────────────────────────────────────┐    │
│  │ [Copy] [Collapse]                   │    │
│  │ code...                             │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

**Rationale:**
- Demo prominent (DEMO-INTERACTIVE anchor)
- Props Playground adjacent for immediate feedback (REQ-REACT-002)
- Code collapsed by default, doesn't compete with demo (REQ-REACT-003)

### Responsive Breakpoints

@derives: REQ-REACT-005

| Breakpoint | Width | Layout Changes | REQ Basis |
|------------|-------|----------------|-----------|
| Desktop | ≥1024px | Side-by-side: demo + playground, code below | "Side-by-side" |
| Tablet | 768-1023px | Stacked: demo, then playground, code collapsed | "Stacked, code collapsed by default" |
| Mobile | <768px | Full-width, code hidden by default | "Full-width, code hidden by default" |

### Interaction Patterns

@derives: REQ-REACT-002, REQ-REACT-003

| Action | Trigger | Feedback | Duration | @derives |
|--------|---------|----------|----------|----------|
| Change prop | Control input | Demo updates immediately | <16ms | REQ-REACT-002 "immediately updates" |
| Toggle boolean | Checkbox click | Check state + demo update | Instant | REQ-REACT-002 control mapping |
| Copy code | Button click | "Copied!" toast, icon change | 2s toast | REQ-REACT-003 "copy-to-clipboard" |
| Collapse code | Button click | Panel slides up | 200ms | REQ-REACT-003 "collapsible panel" |
| Expand code | Button click | Panel slides down | 200ms | REQ-REACT-003 "collapsible panel" |

### Accessibility

@derives: REQ-REACT-002, REQ-REACT-003, REQ-REACT-005

| Feature | Keyboard | Screen Reader | Visual |
|---------|----------|---------------|--------|
| Props controls | Tab between, Space/Enter to toggle | Label announces prop name + type | Focus ring |
| Code viewer | Tab to buttons | "Copy code" / "Collapse panel" labels | Focus ring on buttons |
| Code copy | Enter to activate | "Code copied to clipboard" announcement | Icon change + toast |
| Pattern navigation | Arrow keys in list | Pattern name announced | Focus highlight |
| Mobile touch | N/A | Same as desktop | 44px minimum touch targets |

**WCAG Checklist:**
- [x] All controls keyboard accessible (Tab order: nav → demo → playground → code)
- [x] Focus visible (ring style)
- [x] Announcements for state changes (copy success, collapse state)
- [x] Touch targets ≥44px on mobile

### Visual Hierarchy

1. **Primary:** Live Demo — what user came to see
2. **Secondary:** Props Playground — active experimentation
3. **Tertiary:** Code Panel — reference, collapsed by default

### Loading States

@derives: REQ-REACT-003

| Operation | Skeleton/Spinner | Placement |
|-----------|------------------|-----------|
| Initial pattern load | Skeleton for demo area | Demo region |
| Code syntax highlighting | Inline spinner | Code panel header |

**Status:** verified

## Security Considerations

@derives: REQ-REACT-004

- REQ-REACT-004: Code execution controls for editable examples

### Threat Model

@derives: REQ-REACT-002, REQ-REACT-004

| Threat | Vector | Impact | Likelihood | @derives |
|--------|--------|--------|------------|----------|
| XSS via props | Script in string prop | Medium | Medium | REQ-REACT-002 |
| Arbitrary code execution | Malicious hook code | High | High | REQ-REACT-004 |
| Infinite loop | `while(true)` in user code | Medium | High | REQ-REACT-004 |
| Memory exhaustion | Array allocation in loop | Medium | Medium | REQ-REACT-004 |
| DOM manipulation | `document.*` in user code | Medium | Medium | REQ-REACT-004 |

### Input Validation

@derives: REQ-REACT-002

| Input Source | Validation | Sanitization | @derives |
|--------------|------------|--------------|----------|
| String props | `maxLength: 1000` | React auto-escapes | REQ-REACT-002 |
| Number props | `typeof === 'number'`, range | N/A | REQ-REACT-002 |
| Boolean props | `typeof === 'boolean'` | N/A | REQ-REACT-002 |
| Enum props | Whitelist check | N/A | REQ-REACT-002 |

**Note:** React's JSX auto-escapes string interpolation. No `dangerouslySetInnerHTML` used.

### Code Execution Controls

@derives: REQ-REACT-004

| Risk | Control | Implementation |
|------|---------|----------------|
| Arbitrary code | Restricted globals | Only `useState`, `useEffect`, `console.log` exposed |
| Infinite loops | Timeout | 5 second execution limit |
| Memory exhaustion | (Accept risk) | Not practical to enforce in browser |
| DOM access | No `document`, `window` | Omit from execution scope |
| Network access | No `fetch`, `XMLHttpRequest` | Omit from execution scope |

**Decision:** Use `new Function()` with restricted scope, not `eval()`.

```javascript
// Allowed globals for user code
const safeScope = {
  useState: React.useState,
  useEffect: React.useEffect,
  useCallback: React.useCallback,
  useMemo: React.useMemo,
  console: { log: console.log, warn: console.warn },
};
```

@rationale: TECH-NO-JSX-EDIT anchor means user edits hook logic only, not JSX. This naturally limits scope — user can't inject HTML/components.

### XSS Prevention

@derives: REQ-REACT-002, REQ-REACT-003

| Content Type | Strategy | @derives |
|--------------|----------|----------|
| Prop values in demo | React auto-escape | REQ-REACT-002 |
| Code in CodeViewer | Syntax highlighter escapes | REQ-REACT-003 |
| Error messages | `textContent` only | REQ-REACT-004 |

**No `dangerouslySetInnerHTML`** anywhere in codebase.

### Dependency Security

| Dependency | Known Vulnerabilities | Mitigation |
|------------|----------------------|------------|
| prism-react-renderer | None (as of review date) | Monitor npm audit |
| react-simple-code-editor | None (as of review date) | Monitor npm audit |

**Action:** Add `npm audit` to CI pipeline.

**Status:** verified

## Performance Strategy

@derives: REQ-REACT-002, REQ-REACT-003, REQ-REACT-004, TECH-LIGHTWEIGHT-DEPS

- REQ-REACT-002: Render optimization for real-time updates
- REQ-REACT-003: Lightweight syntax highlighting
- REQ-REACT-004: Lightweight code editor
- TECH-LIGHTWEIGHT-DEPS: 10KB total budget for highlighting + editor

### Bundle Budget

@derives: TECH-LIGHTWEIGHT-DEPS

| Category | Budget | Rationale |
|----------|--------|-----------|
| React + React-DOM | ~45KB | Framework baseline |
| Syntax highlighting | ~6KB | TECH-LIGHTWEIGHT-DEPS |
| Code editor | ~2KB | TECH-LIGHTWEIGHT-DEPS |
| App code | ~47KB | Remainder |
| **Total Initial** | **~100KB** | Reasonable for demo app |

### Library Selection

@derives: TECH-LIGHTWEIGHT-DEPS

| Purpose | Candidates | Size (gzip) | Selection | Rationale |
|---------|------------|-------------|-----------|-----------|
| Syntax highlighting | prism-react-renderer, highlight.js, shiki | 6KB, 30KB, 1MB | **prism-react-renderer** | Fits budget, tree-shakable |
| Code editing | react-simple-code-editor, CodeMirror, Monaco | 2KB, 150KB, 2.5MB | **react-simple-code-editor** | Fits budget, minimal |

**Total for highlighting + editor:** 8KB (within 10KB budget)

### Code Splitting

| Chunk | Contents | Load Trigger | Est. Size |
|-------|----------|--------------|-----------|
| main | React, Navigation, PatternList | Immediate | ~50KB |
| pattern-demo | PatternDemo, PropsPlayground | Route to pattern | ~30KB |
| code-panel | CodeViewer, CodeEditor, prism | Expand code panel | ~15KB |

**Rationale:**
- Code panel is "collapsed by default" (REQ-REACT-003) → lazy load
- Demo is core feature → include in main route chunk

### Lazy Loading

@derives: REQ-REACT-003, REQ-REACT-004

| Resource | Strategy | Trigger | @derives |
|----------|----------|---------|----------|
| CodeViewer | React.lazy | Code panel expand | REQ-REACT-003 "collapsible" |
| CodeEditor | React.lazy | Edit button click | REQ-REACT-004 "edit hook code" |
| Syntax theme | Dynamic import | First code view | REQ-REACT-003 |

```jsx
const CodePanel = React.lazy(() => import('./CodePanel'));
```

### Render Optimization

@derives: REQ-REACT-002

| Optimization | Where | Technique | @derives |
|--------------|-------|-----------|----------|
| Memoize demo | LivePreview | `React.memo` | REQ-REACT-002 "immediately updates" |
| Memoize controls | PropControl | `React.memo` | REQ-REACT-002 — only re-render changed control |
| Debounce code | CodeEditor | 100ms debounce | REQ-REACT-004 — avoid parse on every keystroke |

### Caching Strategy

| Resource | Cache | TTL |
|----------|-------|-----|
| JS bundles | Immutable (content hash) | Forever |
| Pattern data | Runtime cache | Session |

### Performance Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP | <1.5s | Lighthouse |
| FID | <100ms | Lighthouse |
| CLS | <0.1 | Lighthouse |
| Initial bundle | <100KB | Build output |
| Full (lazy loaded) | <150KB | Build output |

**Status:** verified

## Decisions Log

| ID | Decision | Rationale | Owner |
|----|----------|-----------|-------|
| DEC-001 | URL-based pattern selection | REQ-REACT-001 implies shareable demos; URL enables bookmarks | frontend |
| DEC-002 | Controlled PropsPlayground | REQ-REACT-002 "immediately updates" requires parent control | frontend |
| DEC-003 | Custom useEditableCode hook | REQ-REACT-004 code execution logic reusable across editable patterns | frontend |
| DEC-004 | ErrorBoundary wraps LivePreview | REQ-REACT-004 "without crashing" — isolates render errors | frontend |
| DEC-005 | Hide code on mobile by default | REQ-REACT-005 "hidden by default" — maximize demo visibility | uiux |
| DEC-006 | 200ms collapse animation | Balance responsiveness with smooth UX — fast enough for "immediate" feel | uiux |
| DEC-007 | Toast for copy confirmation | Non-blocking feedback, developer-familiar pattern | uiux |
| DEC-008 | Restricted scope for code execution | REQ-REACT-004 + TECH-NO-JSX-EDIT means only hook logic; restrict to React hooks + console | security |
| DEC-009 | 5 second timeout | Mitigates infinite loop threat — 5s balances safety vs UX | security |
| DEC-010 | No DOM/network globals | Mitigates DOM manipulation + data exfil threats | security |
| DEC-011 | prism-react-renderer for highlighting | 6KB gzip, fits TECH-LIGHTWEIGHT-DEPS budget | perf |
| DEC-012 | react-simple-code-editor for editing | 2KB gzip, combined with prism stays under 10KB | perf |
| DEC-013 | Lazy load CodePanel | REQ-REACT-003 "collapsed by default" — no need to load immediately | perf |
| DEC-014 | React.memo on LivePreview | REQ-REACT-002 "immediately updates" — prevent cascade re-renders | perf |

## Cross-Cutting Concerns

> **Note:** Extension to sdd-guidelines for specialist coordination.

| Concern | Primary | Reviewer | Status |
|---------|---------|----------|--------|
| Accessibility | uiux | frontend | approved |
| Error handling | frontend | security | approved |
| Loading states | uiux | perf | approved |
| Code display | frontend | perf | approved |
| User input | frontend | security | approved |
