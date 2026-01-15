# react-sample Security Design Example

Complete example of sdd-design-security output for react-sample package.

> **Note:** This is a reference example, not a template.
> Your output structure may differ based on project needs and REQs.

> **Decision IDs:** Continue from other sections (DEC-001~007 used by frontend/uiux).

## Input

**Assigned REQs:**
- REQ-REACT-004: Editable Examples (code execution)

**Cross-Cutting Review:**
- REQ-REACT-002: Props Playground (user input) — review frontend's error handling

**Relevant Anchors:**
- TECH-NO-JSX-EDIT: No runtime JSX compilation (limits execution scope)

## Step 2: Attack Surface

| REQ | User Input | Dynamic Content | Code Execution |
|-----|------------|-----------------|----------------|
| 002 | Prop values (string, number, boolean) | Props rendered to demo | None |
| 004 | JavaScript code | Code displayed | Yes — hook logic |

## Step 3: Threat Model

@derives: REQ-REACT-002, REQ-REACT-004

| Threat | Vector | Impact | Likelihood | @derives |
|--------|--------|--------|------------|----------|
| XSS via props | Script in string prop | Medium | Medium | REQ-002 |
| Arbitrary code execution | Malicious hook code | High | High | REQ-004 |
| Infinite loop | `while(true)` in user code | Medium | High | REQ-004 |
| Memory exhaustion | Array allocation in loop | Medium | Medium | REQ-004 |
| DOM manipulation | `document.*` in user code | Medium | Medium | REQ-004 |

## Step 4: Input Validation

@derives: REQ-REACT-002

| Input Source | Validation | Sanitization | @derives |
|--------------|------------|--------------|----------|
| String props | `maxLength: 1000` | React auto-escapes | REQ-002 |
| Number props | `typeof === 'number'`, range | N/A | REQ-002 |
| Boolean props | `typeof === 'boolean'` | N/A | REQ-002 |
| Enum props | Whitelist check | N/A | REQ-002 |

**Note:** React's JSX auto-escapes string interpolation. No `dangerouslySetInnerHTML` used.

## Step 5: Code Execution Controls

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

**Rationale:** TECH-NO-JSX-EDIT anchor means user edits hook logic only, not JSX. This naturally limits scope — user can't inject HTML/components.

## Step 6: XSS Prevention

@derives: REQ-REACT-002, REQ-REACT-003

| Content Type | Strategy | @derives |
|--------------|----------|----------|
| Prop values in demo | React auto-escape | REQ-002 |
| Code in CodeViewer | Syntax highlighter escapes | REQ-003 |
| Error messages | `textContent` only | REQ-004 |

**No `dangerouslySetInnerHTML`** anywhere in codebase.

## Step 7: Dependency Security

| Dependency | Known Vulnerabilities | Mitigation |
|------------|----------------------|------------|
| prism-react-renderer | None (as of review date) | Monitor npm audit |
| react-simple-code-editor | None (as of review date) | Monitor npm audit |

**Action:** Add `npm audit` to CI pipeline.

## Cross-Cutting Review: Frontend Error Handling

**Reviewed:** frontend's ErrorBoundary for REQ-004

| Check | Status | Notes |
|-------|--------|-------|
| Stack traces hidden from user | ✅ | Shows "Syntax error" only |
| Internal paths not exposed | ✅ | No file paths in UI |
| Error details logged | ⚠️ | Recommend: Add structured logging |

**Verdict:** `approved` with minor recommendation.

## Decisions Log Entries

| ID | Decision | Rationale | Owner |
|----|----------|-----------|-------|
| DEC-008 | Restricted scope for code execution | REQ-004 + TECH-NO-JSX-EDIT means only hook logic; restrict to React hooks + console | security |
| DEC-009 | 5 second timeout | Mitigates infinite loop (Threat Model) — 5s balances safety vs UX | security |
| DEC-010 | No DOM/network globals | Mitigates DOM manipulation + data exfil threats | security |

## Step 10: Handoff

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
      security: verified
```

### Handoff Record

```yaml
# .sdd/handoffs/2025-01-15T12-00-security.yaml
from: sdd-design-security
to: sdd-design
timestamp: 2025-01-15T12:00:00Z

completed:
  - design.security: verified

in_progress: []

blocked: []

gaps: []

next_steps:
  - sdd-design-frontend: Implement restricted scope per DEC-008
  - sdd-design-frontend: Add timeout wrapper per DEC-009
  - sdd-design-perf: (none — no security-perf overlap)
```

### Cross-Cutting Status

| Concern | Primary | Reviewer | Status |
|---------|---------|----------|--------|
| Error handling | frontend | security | `approved` |
| User input | frontend | security | `approved` |

## Output: Security Considerations Section

```markdown
## Security Considerations

@derives: REQ-REACT-002, REQ-REACT-004

### Threat Model

[table from Step 3]

### Input Validation

[table from Step 4]

### Code Execution Controls

[table and scope from Step 5]

### XSS Prevention

[table from Step 6]

### Dependency Security

[table from Step 7]

**Status:** verified
```
