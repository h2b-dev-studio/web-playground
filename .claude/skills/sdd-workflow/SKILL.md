---
name: sdd-workflow
description: |
  Manage SDD state, handoffs, and versioning for web-playground.
  Use when: tracking progress, handing off between sessions, propagating changes.
  Triggers: "sdd workflow", "sdd status", "propagate changes", "handoff"
---

# Web Playground SDD Workflow

Track state and enable session continuity for SDD work.

## State File

Location: `.sdd/state.yaml`

```yaml
version: 1
updated: 2025-01-15T10:00:00Z
current_phase: requirements  # foundation | requirements | design

documents:
  foundation: { status: verified, version: 1.0.0 }
  requirements: { status: partial, version: 1.1.0 }
  design: { status: draft, version: 0.1.0 }

packages:
  react-sample: { foundation: verified, requirements: draft }

gaps: []
```

## Status Values

| Status | Meaning |
|--------|---------|
| `draft` | Created, not verified |
| `verified` | Passed verification |
| `blocked` | Waiting on user input |
| `partial` | Some items verified, some draft |

## Instructions

### 1. Initialize

```bash
mkdir -p .sdd
```

Create minimal `.sdd/state.yaml` with `current_phase: foundation`.

### 2. Track Progress

Update state after completing work:
```yaml
documents:
  foundation: { status: verified, version: 1.0.0 }
```

### 3. Propagate Changes

```
Foundation change -> Re-verify Requirements (@aligns-to links)
Requirements change -> Re-verify Design (@derives links)
```

### 4. Session Handoff

At session end, write `.sdd/handoff.md`:

```markdown
# SDD Handoff - 2025-01-15

## Completed
- Foundation verified with SCOPE-MONOREPO, QUALITY-TYPESCRIPT anchors

## In Progress
- REQ-002: 50% complete, needs verification criteria

## Blocked
- (none)

## Next Steps
1. Complete REQ-002 verification criteria
2. Run alignment check
3. Begin design phase
```

## Versioning

| Change | Bump |
|--------|------|
| Anchor/REQ deleted or modified meaning | MAJOR |
| New anchor/REQ, clarification | MINOR |
| Typo, formatting | PATCH |

## Multi-Level

Package specs in `packages/{pkg}/spec/`. Reference root with `root::` prefix:
- `root::SCOPE-MONOREPO`
- `root::REQ-001`

## Verification

- [ ] State file reflects actual document status
- [ ] Handoff enables next session to continue without questions
- [ ] Version bumps follow semantic rules

## Reference

For full details: `.claude/skills/sdd-guidelines/reference/guidelines-v4.4.md` sections 4, 5, 8
