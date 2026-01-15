---
name: sdd-workflow
description: |
  Manage SDD state, handoffs, and versioning for web-playground.
  Use when: tracking progress, handing off between agents/sessions, propagating changes.
  Triggers: "sdd workflow", "sdd status", "propagate changes", "handoff"
---

# Web Playground SDD Workflow

Orchestrates state tracking, handoffs, and change propagation across multi-agent sessions.

## State File Format

Location: `.sdd/state.yaml`

```yaml
version: 1
updated: 2025-01-15T10:00:00Z
current_phase: requirements  # foundation | requirements | design | verification

documents:
  foundation:
    path: spec/foundation.md
    version: 1.0.0
    status: verified
  requirements:
    path: spec/requirements.md
    version: 1.1.0
    status: partial
    items:
      REQ-001: { status: verified, owner: unassigned }
      REQ-002: { status: draft, owner: agent-a, locked: true }
  design:
    path: spec/design.md
    version: 0.1.0
    status: draft

# Package-level specs
packages:
  react-sample:
    foundation: { status: draft, owner: agent-b }
    requirements: { status: pending }

gaps: []
escalations: []
```

## Status Definitions

| Status | Meaning | Entry | Exit |
|--------|---------|-------|------|
| `draft` | Created, not verified | Item created | Verification passed |
| `verified` | Passed verification | Verification passed | Change or dependency change |
| `blocked` | Waiting on input | Escalation | Input received -> draft |
| `obsolete` | No longer valid | Superseded | (terminal) |

## Instructions

### 1. Initialize State

```bash
mkdir -p .sdd
```

Create `.sdd/state.yaml` with current_phase and empty document sections.

### 2. Update Status

After completing an item:
1. Set item `status: verified`
2. Update `updated` timestamp
3. If all items in phase verified, advance `current_phase`

### 3. Lock Before Modify

```yaml
items:
  REQ-001:
    status: draft
    owner: agent-impl
    locked: true
    locked_at: 2025-01-15T10:00:00Z
```

Unlock after write completes.

### 4. Change Propagation

```
Foundation change -> Re-check Requirements (alignment)
Requirements change -> Re-check Design (traceability)
```

Find dependents via `@aligns-to` and `@derives` links, re-verify each.

## Handoff Format

Location: `.sdd/handoff.md` (overwrite each handoff)

```markdown
# SDD Handoff

**From:** agent-foundation
**To:** agent-requirements (or orchestrator)
**Timestamp:** 2025-01-15T10:00:00Z

## Items Transferred

- spec/foundation.md (verified)

## Items Retained

- (none)

## Completed

- Foundation: SCOPE-MONOREPO, QUALITY-TYPESCRIPT, AUDIENCE-DEVELOPER anchors defined

## In Progress

- (none)

## Blocked

- (none, or list with blockers)

## Escalations

- (none, or ESC-NNN references)

## Next Steps

1. Create root requirements with @aligns-to links
2. Verify alignment coverage matrix
```

## Versioning

| Change Type | Version Bump |
|-------------|--------------|
| Anchor deleted/modified | MAJOR |
| REQ deleted | MAJOR |
| New anchor/REQ, REQ modified | MINOR |
| Typo fix, formatting | PATCH |

Update `depends_on` in dependent documents after verification.

## Multi-Level Coordination

Root state tracks package states:

```yaml
packages:
  react-sample:
    foundation: { status: verified }
    requirements: { status: draft, items: { REQ-REACT-001: draft } }
```

Cross-level references use `root::` prefix: `root::SCOPE-MONOREPO`, `root::REQ-001`.

## Phase Transitions

| Trigger | Action |
|---------|--------|
| Foundation verified | Unlock requirements phase |
| All REQs verified | Unlock design phase |
| Design verified | Ready for implementation |

## Verification

- [ ] State file has `version`, `updated`, `current_phase`
- [ ] All items have `status` field
- [ ] Multi-agent items have `owner` field
- [ ] Locked items have `locked_at` timestamp
- [ ] Handoff has all required sections
- [ ] Version bumps follow MAJOR/MINOR/PATCH rules

## Reference

For full details: `.claude/skills/sdd-guidelines/reference/guidelines-v4.4.md` sections 4, 5, 8, 10
