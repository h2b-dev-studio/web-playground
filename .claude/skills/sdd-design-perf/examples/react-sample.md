# react-sample Performance Design Example

Complete example of sdd-design-perf output for react-sample package.

> **Note:** This is a reference example, not a template.
> Your output structure may differ based on project needs and REQs.

> **Decision IDs:** Continue from other sections (DEC-001~010 used by frontend/uiux/security).

## Input

**Assigned REQs:**
- REQ-REACT-003: Code Viewer (syntax highlighting)
- REQ-REACT-004: Editable Examples (code editor)

**Cross-Cutting Review:**
- Loading states (from uiux)
- Code display libraries (from frontend)

**Relevant Anchors:**
- TECH-LIGHTWEIGHT-DEPS: ~10KB total for syntax highlighting + editor

## Step 2: Performance Requirements

| REQ | Performance Implication |
|-----|------------------------|
| 003 | Syntax highlighting library must be lightweight |
| 004 | Code editor library must be lightweight |
| 002 | "Immediately updates" — render optimization needed |

**Constraint:** TECH-LIGHTWEIGHT-DEPS caps highlighting + editor at ~10KB total.

## Step 3: Bundle Budget

@derives: TECH-LIGHTWEIGHT-DEPS

| Category | Budget | Rationale |
|----------|--------|-----------|
| React + React-DOM | ~45KB | Framework baseline |
| Syntax highlighting | ~6KB | TECH-LIGHTWEIGHT-DEPS |
| Code editor | ~2KB | TECH-LIGHTWEIGHT-DEPS |
| App code | ~47KB | Remainder |
| **Total Initial** | **~100KB** | Reasonable for demo app |

## Step 4: Library Selection

@derives: TECH-LIGHTWEIGHT-DEPS

Frontend candidates from their section:

| Purpose | Candidates | Size (gzip) | Selection | Rationale |
|---------|------------|-------------|-----------|-----------|
| Syntax highlighting | prism-react-renderer, highlight.js, shiki | 6KB, 30KB, 1MB | **prism-react-renderer** | Fits budget, tree-shakable |
| Code editing | react-simple-code-editor, CodeMirror, Monaco | 2KB, 150KB, 2.5MB | **react-simple-code-editor** | Fits budget, minimal |

**Total for highlighting + editor:** 8KB ✓ (within 10KB budget)

## Step 5: Code Splitting

| Chunk | Contents | Load Trigger | Est. Size |
|-------|----------|--------------|-----------|
| main | React, Navigation, PatternList | Immediate | ~50KB |
| pattern-demo | PatternDemo, PropsPlayground | Route to pattern | ~30KB |
| code-panel | CodeViewer, CodeEditor, prism | Expand code panel | ~15KB |

**Rationale:**
- Code panel is "collapsed by default" (REQ-003) → lazy load
- Demo is core feature → include in main route chunk

## Step 6: Lazy Loading

@derives: REQ-REACT-003

| Resource | Strategy | Trigger | @derives |
|----------|----------|---------|----------|
| CodeViewer | React.lazy | Code panel expand | REQ-003 "collapsible" |
| CodeEditor | React.lazy | Edit button click | REQ-004 "edit hook code" |
| Syntax theme | Dynamic import | First code view | REQ-003 |

```jsx
const CodePanel = React.lazy(() => import('./CodePanel'));
```

## Step 7: Render Optimization

@derives: REQ-REACT-002

| Optimization | Where | Technique | @derives |
|--------------|-------|-----------|----------|
| Memoize demo | LivePreview | `React.memo` | REQ-002 "immediately updates" — prevent full re-render |
| Memoize controls | PropControl | `React.memo` | REQ-002 — only re-render changed control |
| Debounce code | CodeEditor | 100ms debounce | REQ-004 — avoid parse on every keystroke |

## Step 8: Caching Strategy

| Resource | Cache | TTL |
|----------|-------|-----|
| JS bundles | Immutable (content hash) | ∞ |
| Pattern data | Runtime cache | Session |

## Step 9: Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP | <1.5s | Lighthouse |
| FID | <100ms | Lighthouse |
| CLS | <0.1 | Lighthouse |
| Initial bundle | <100KB | Build output |
| Full (lazy loaded) | <150KB | Build output |

## Cross-Cutting Review: Loading States

**Reviewed:** uiux's loading states for REQ-003

| Check | Status | Notes |
|-------|--------|-------|
| Skeleton vs spinner | ✅ | Skeleton for code area — good |
| Lazy load alignment | ✅ | Loading state shows during chunk load |
| Duration | ⚠️ | Consider: show skeleton only if >200ms |

**Verdict:** `approved` with minor suggestion.

## Cross-Cutting Review: Code Display

**Reviewed:** frontend's CodeViewer

| Check | Status | Notes |
|-------|--------|-------|
| Library selected | ✅ | prism-react-renderer — fits budget |
| Tree-shaking | ✅ | Only used languages imported |

**Verdict:** `approved`

## Decisions Log Entries

| ID | Decision | Rationale | Owner |
|----|----------|-----------|-------|
| DEC-011 | prism-react-renderer for highlighting | 6KB gzip, fits TECH-LIGHTWEIGHT-DEPS budget | perf |
| DEC-012 | react-simple-code-editor for editing | 2KB gzip, combined with prism stays under 10KB | perf |
| DEC-013 | Lazy load CodePanel | REQ-003 "collapsed by default" — no need to load immediately | perf |
| DEC-014 | React.memo on LivePreview | REQ-002 "immediately updates" — prevent cascade re-renders | perf |

## Step 12: Handoff

### Section Status

```markdown
**Status:** verified
```

### State File Update

```yaml
# .sdd/state.yaml (excerpt)
documents:
  design:
    sections:
      perf: verified
```

### Handoff Record

```yaml
# .sdd/handoffs/2025-01-15T13-00-perf.yaml
from: sdd-design-perf
to: sdd-design
timestamp: 2025-01-15T13:00:00Z

completed:
  - design.perf: verified

in_progress: []

blocked: []

gaps: []

next_steps:
  - sdd-design-frontend: Use prism-react-renderer (DEC-011) and react-simple-code-editor (DEC-012)
  - sdd-design-frontend: Implement React.lazy for CodePanel (DEC-013)
  - sdd-design-frontend: Add React.memo to LivePreview (DEC-014)
```

### Cross-Cutting Status

| Concern | Primary | Reviewer | Status |
|---------|---------|----------|--------|
| Loading states | uiux | perf | `approved` |
| Code display | frontend | perf | `approved` |

## Output: Performance Strategy Section

```markdown
## Performance Strategy

@derives: REQ-REACT-002, REQ-REACT-003, REQ-REACT-004, TECH-LIGHTWEIGHT-DEPS

### Bundle Budget

[table from Step 3]

### Library Selection

[table from Step 4]

### Code Splitting

[table from Step 5]

### Lazy Loading

[table from Step 6]

### Render Optimization

[table from Step 7]

### Caching Strategy

[table from Step 8]

### Performance Metrics

[table from Step 9]

**Status:** verified
```
