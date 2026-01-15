---
name: sdd-design
description: |
  Create Design documents with decisions and assumptions for web-playground.
  Use when: defining implementation, documenting architecture choices.
  Triggers: "create design", "write design", "sdd design"
---

# Web Playground Design

Create Design documents that define implementation with traceable decisions.

## Prerequisites

**Requirements must be verified before writing design.**

Check `.sdd/state.yaml`:
```yaml
documents:
  requirements:
    status: verified  # or partial with target REQs verified
```

## ID Formats

| Type | Root | Package |
|------|------|---------|
| Decision | `DEC-{NNN}` | `DEC-{PKG}-{NNN}` |
| Assumption | `ASM-{NNN}` | `ASM-{PKG}-{NNN}` |

## Instructions

### 1. Choose Level

- **Root:** `spec/design.md` (monorepo structure, shared tooling)
- **Package:** `packages/{pkg}/spec/design.md` (sample implementation)

### 2. Write Frontmatter

```yaml
---
title: "{Package} Design"
version: 1.0.0
status: draft
depends_on:
  - requirements.md@1.0.0
---
```

### 3. Write Design Items

Each design item must have `@derives` linking to requirements:

```markdown
## Component Structure

React components organized by feature, not type.

`@derives:` REQ-REACT-001, REQ-REACT-002
`@rationale:` Feature folders scale better than type folders (components/, hooks/, etc.)
             as each feature remains self-contained.

**Status:** draft
```

### 4. Document Decisions (DEC-NNN)

Create formal decision records for significant choices:

| Significance | Format |
|--------------|--------|
| High (architecture) | Separate file: `spec/decisions/DEC-NNN.md` |
| Medium (component) | Inline `@rationale` block |
| Low (minor) | Inline `@rationale` comment |

**When rationale is required:**
- Alternatives existed
- Trade-off involved
- Future risk from assumption
- Reviewer would ask "why?"

### 5. Document Assumptions (ASM-NNN)

Track high-risk assumptions:

```markdown
`@assumes:` ASM-REACT-001 (React 18 concurrent features stable)
```

Formal ASM record when:
- Invalidation would require significant rework
- Depends on external factor
- Multiple items share assumption

### 6. Update State

```yaml
documents:
  design: { status: draft, version: 1.0.0 }
```

## Example: Package Design

```markdown
---
title: "React Sample Design"
version: 1.0.0
status: draft
depends_on:
  - requirements.md@1.0.0
---

# React Sample Design

## Build Tooling

Rsbuild for development and production builds.

`@derives:` REQ-REACT-001, root::REQ-003
`@rationale:` DEC-REACT-001

**Status:** draft

---

## State Management

Todo items stored in React Context with useReducer.

`@derives:` REQ-REACT-001, REQ-REACT-002
`@rationale:` Context + useReducer over external state library:
             - Demonstrates React-native patterns (PATTERN-HOOKS)
             - No additional dependencies (QUALITY-MINIMAL)
             - Sufficient for todo app scale

**Status:** draft

---

## Data Persistence

Todos persisted to localStorage on state change.

`@derives:` REQ-REACT-001
`@assumes:` ASM-REACT-001 (localStorage sufficient for demo data)

**Status:** draft

```

## Verification

After writing design:

- [ ] Frontmatter has depends_on pointing to verified requirements
- [ ] Every design item has `@derives` with valid REQ ID(s)
- [ ] Non-obvious choices have `@rationale`
- [ ] High-risk assumptions documented as ASM-NNN
- [ ] Significant decisions documented as DEC-NNN
- [ ] Cross-level refs use `root::` prefix

## State Update

After design verified:
```yaml
documents:
  design: { status: verified, version: 1.0.0 }
```

## Next Phase

When design is verified, ready for implementation:
- All design items have traceability to requirements
- Decisions documented for future reference

## Reference

For full details: `.claude/skills/sdd-guidelines/reference/guidelines-v4.4.md` sections 1.3, 1.4, 2, 3.3
