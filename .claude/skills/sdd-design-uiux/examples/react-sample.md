# react-sample UI/UX Design Example

Complete example of sdd-design-uiux output for react-sample package.

> **Note:** This is a reference example, not a template.
> Your output structure may differ based on project needs and REQs.

> **Decision IDs:** Continue from other sections (DEC-001~004 used by frontend).

## Input

**Assigned REQs:**
- REQ-REACT-002: Props Playground
- REQ-REACT-003: Code Viewer
- REQ-REACT-005: Responsive Layout

**Relevant Anchors:**
- DEMO-INTERACTIVE: Every pattern demo is interactive
- AUDIENCE-DEVELOPER: Target users are developers

## Step 2: REQ Analysis

| REQ | User Goal | UX Elements Needed |
|-----|-----------|-------------------|
| 002 | Manipulate props in real-time | Control panel, immediate feedback, keyboard nav |
| 003 | View and copy code | Code panel, collapse/expand, copy button |
| 005 | Use on any device | Responsive layout, touch targets, adaptive visibility |

## Step 3: Layout Structure

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
- Props Playground adjacent for immediate feedback (REQ-002)
- Code collapsed by default, doesn't compete with demo (REQ-003)

## Step 4: Responsive Breakpoints

@derives: REQ-REACT-005

| Breakpoint | Width | Layout Changes | REQ Basis |
|------------|-------|----------------|-----------|
| Desktop | ≥1024px | Side-by-side: demo + playground, code below | "Side-by-side" |
| Tablet | 768-1023px | Stacked: demo, then playground, code collapsed | "Stacked, code collapsed by default" |
| Mobile | <768px | Full-width, code hidden by default | "Full-width, code hidden by default" |

**Decisions:**
- DEC-005: Hide code panel on mobile by default — @rationale: REQ-005 says "hidden by default", preserves demo focus

## Step 5: Interaction Patterns

@derives: REQ-REACT-002, REQ-REACT-003

| Action | Trigger | Feedback | Duration | @derives |
|--------|---------|----------|----------|----------|
| Change prop | Control input | Demo updates immediately | <16ms | REQ-002 "immediately updates" |
| Toggle boolean | Checkbox click | Check state + demo update | Instant | REQ-002 control mapping |
| Copy code | Button click | "Copied!" toast, icon change | 2s toast | REQ-003 "copy-to-clipboard" |
| Collapse code | Button click | Panel slides up | 200ms | REQ-003 "collapsible panel" |
| Expand code | Button click | Panel slides down | 200ms | REQ-003 "collapsible panel" |

## Step 6: Accessibility

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

## Step 7: Visual Hierarchy

1. **Primary:** Live Demo — what user came to see
2. **Secondary:** Props Playground — active experimentation
3. **Tertiary:** Code Panel — reference, collapsed by default

## Step 8: Loading States

@derives: REQ-REACT-003 (code loading)

| Operation | Skeleton/Spinner | Placement |
|-----------|------------------|-----------|
| Initial pattern load | Skeleton for demo area | Demo region |
| Code syntax highlighting | Inline spinner | Code panel header |

## Decisions Log Entries

| ID | Decision | Rationale | Owner |
|----|----------|-----------|-------|
| DEC-005 | Hide code on mobile by default | REQ-005 "hidden by default" — maximize demo visibility | uiux |
| DEC-006 | 200ms collapse animation | Balance responsiveness with smooth UX — fast enough for "immediate" feel | uiux |
| DEC-007 | Toast for copy confirmation | Non-blocking feedback, developer-familiar pattern | uiux |

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
      uiux: verified
```

### Handoff Record

```yaml
# .sdd/handoffs/2025-01-15T11-00-uiux.yaml
from: sdd-design-uiux
to: sdd-design
timestamp: 2025-01-15T11:00:00Z

completed:
  - design.uiux: verified

in_progress: []

blocked: []

gaps: []

next_steps:
  - sdd-design-frontend: Review accessibility — verify PropControl components accept aria-label, aria-describedby
  - sdd-design-frontend: Review error handling — loading state error displays
  - sdd-design-perf: Review loading states — skeleton vs spinner performance impact
```

### Cross-Cutting Status

| Concern | Primary | Reviewer | Status |
|---------|---------|----------|--------|
| Accessibility | uiux | frontend | `ready-for-review` |
| Loading states | uiux | perf | `ready-for-review` |
| Error handling | frontend | uiux | `pending` |

## Output: UI/UX Design Section

```markdown
## UI/UX Design

@derives: REQ-REACT-002, REQ-REACT-003, REQ-REACT-005

### Layout Structure

[diagram from Step 3]

### Responsive Breakpoints

[table from Step 4]

### Interaction Patterns

[table from Step 5]

### Accessibility

[table from Step 6]

### Visual Hierarchy

[list from Step 7]

### Loading States

[table from Step 8]

**Status:** verified
```
