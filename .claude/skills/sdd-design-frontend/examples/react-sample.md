# react-sample Frontend Design Example

Complete example of sdd-design-frontend output for react-sample package.

> **Note:** This is a reference example, not a template.
> Your output structure may differ based on project needs and REQs.

## Input

**Assigned REQs:**
- REQ-REACT-001: Pattern Catalog
- REQ-REACT-002: Props Playground  
- REQ-REACT-003: Code Viewer
- REQ-REACT-004: Editable Examples

**Relevant Anchors:**
- TECH-NO-JSX-EDIT: No runtime JSX compilation
- TECH-LIGHTWEIGHT-DEPS: ~10KB total for syntax highlighting + editor

## Step 2: REQ Analysis

| REQ | User Action | Components | State |
|-----|-------------|------------|-------|
| 001 | Navigate patterns, see demos | PatternList, PatternCard, PatternDemo | selectedPattern |
| 002 | Change props, see updates | PropsPlayground, PropControl variants | propValues |
| 003 | View code, copy, collapse | CodeViewer, CopyButton | collapsed, copied |
| 004 | Edit hook code, see result | CodeEditor, Preview, ErrorBoundary | code, error |

## Step 3: Component Hierarchy

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

## Step 4: Props Interfaces

### PatternDemo

```tsx
interface PatternDemoProps {
  /**
   * @derives REQ-001 - "clicking pattern navigates to its demo"
   */
  patternId: string;
}
```

### PropsPlayground

```tsx
interface PropsPlaygroundProps {
  /**
   * @derives REQ-002 - "manipulate component props in real-time"
   */
  value: Record<string, unknown>;
  onChange: (props: Record<string, unknown>) => void;
  
  /**
   * @derives REQ-002 - Control mapping table
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

### CodeViewer

```tsx
interface CodeViewerProps {
  /**
   * @derives REQ-003 - "displays actual component source"
   */
  code: string;
  language: 'tsx' | 'ts';
  
  /**
   * @derives REQ-003 - "collapsible panel"
   */
  defaultCollapsed?: boolean;
}
```

### CodeEditor

```tsx
interface CodeEditorProps {
  /**
   * @derives REQ-004 - "inline code editing for JS logic"
   */
  value: string;
  onChange: (code: string) => void;
  
  /**
   * @derives REQ-004 - "reset to original code"
   */
  onReset: () => void;
}
```

## Step 5: State Management

| State | Location | REQ Implication |
|-------|----------|-----------------|
| selectedPattern | URL (router) | REQ-001 implies shareable demos → "bookmarkable" |
| propValues | PatternDemo (useState) | REQ-002 "real-time" but scoped to demo → lifted local |
| collapsed | CodeViewer (useState) | REQ-003 "collapsible" — no cross-component need → local |
| editedCode | CodeEditor (useState) | REQ-004 isolated to editor → local |
| codeError | local (ErrorBoundary catches) | REQ-004 "without crashing" — error boundary pattern |

## Step 6: Patterns Used

| Pattern | Where | @derives |
|---------|-------|----------|
| Controlled Components | PropsPlayground, CodeEditor | REQ-002, REQ-004 — real-time updates |
| Custom Hook | useEditableCode | REQ-004 — reusable code execution logic |
| Error Boundary | Around LivePreview | REQ-004 — "without crashing" |

## Step 7: Library Candidates

| Purpose | Candidates | Notes for Perf |
|---------|------------|----------------|
| Syntax highlighting | prism-react-renderer, highlight.js, shiki | prism-react-renderer smallest, tree-shakable |
| Code editing | react-simple-code-editor, CodeMirror, Monaco | react-simple-code-editor tiny, others heavy |

**Constraint:** TECH-LIGHTWEIGHT-DEPS requires ~10KB total.

## Step 8: File Structure

Following monorepo conventions:

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

## Decisions Log Entries

| ID | Decision | Rationale | Owner |
|----|----------|-----------|-------|
| DEC-001 | URL-based pattern selection | REQ-001 implies shareable demos; URL enables bookmarks | frontend |
| DEC-002 | Controlled PropsPlayground | REQ-002 "immediately updates" requires parent control | frontend |
| DEC-003 | Custom useEditableCode hook | REQ-004 code execution logic reusable across editable patterns | frontend |
| DEC-004 | ErrorBoundary wraps LivePreview | REQ-004 "without crashing" — isolates render errors | frontend |

## Step 11: Handoff

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
      component-architecture: verified
```

### Handoff Record

```yaml
# .sdd/handoffs/2025-01-15T10-00-frontend.yaml
from: sdd-design-frontend
to: sdd-design
timestamp: 2025-01-15T10:00:00Z

completed:
  - design.component-architecture: verified

in_progress: []

blocked: []

gaps: []

next_steps:
  - sdd-design-perf: Review library candidates (prism-react-renderer, react-simple-code-editor), confirm within 10KB budget
  - sdd-design-uiux: Review accessibility — can PropControl components support aria props?
  - sdd-design-security: Review error handling in useEditableCode for code execution safety
```

### Cross-Cutting Status

| Concern | Primary | Reviewer | Status |
|---------|---------|----------|--------|
| Error handling | frontend | security | `ready-for-review` |
| Code display | frontend | perf | `ready-for-review` |
| User input | frontend | security | `ready-for-review` |
| Accessibility | uiux | frontend | `pending` |

## Output: Component Architecture Section

```markdown
## Component Architecture

@derives: REQ-REACT-001, REQ-REACT-002, REQ-REACT-003, REQ-REACT-004

### Component Hierarchy

[tree from Step 3]

### Props Interfaces

[interfaces from Step 4]

### State Management

[table from Step 5]

### Patterns Used

[table from Step 6]

### Library Candidates

[table from Step 7]

**Note:** Final selection pending perf review against 10KB budget.

### File Structure

[tree from Step 8]

**Status:** verified
```
