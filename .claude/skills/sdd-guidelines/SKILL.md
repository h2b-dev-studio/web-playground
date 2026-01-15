---
name: sdd-guidelines
description: |
  Spec-Driven Development framework for maintaining documentation integrity.
  Use when: creating specifications, verifying traceability, managing multi-agent work.
  Triggers: "sdd", "spec-driven", "foundation document", "requirements traceability"
---

# SDD Guidelines

Reference skill for SDD concepts and procedures. For full details: [reference/guidelines-v4.4.md](reference/guidelines-v4.4.md)

## Core Concept

**Integrity** = Every artifact can answer "Why do I exist?" and "Why this form?"

```
Foundation → Requirements → Design
   ↑            ↑             ↑
 Identity    Success       Implementation
             Criteria
```

## Quick Reference

### Artifacts (§1)

| Artifact | Purpose | Key Element |
|----------|---------|-------------|
| Foundation | What this is | Identity Anchors |
| Requirements | What it must satisfy | `@aligns-to` links |
| Design | How to build it | `@derives` links |

### Links (§2)

| Link | From → To | Required |
|------|-----------|----------|
| `@aligns-to` | REQ → Foundation anchor | Yes |
| `@derives` | Design → REQ | Yes |
| `@rationale` | Any → Decision | If non-obvious |
| `@assumes` | Any → Assumption | When applicable |

### Verification (§3)

| Type | Question | Method |
|------|----------|--------|
| Alignment | REQs serve Foundation? | Heuristics |
| Traceability | Design justified? | Link check |
| Consistency | No contradictions? | Mixed |

### Status (§4)

```
draft → verified → obsolete
  ↓        ↓
blocked ←←←┘ (on change)
```

## Instructions

| Task | Read | Key Actions |
|------|------|-------------|
| Start a project | §1.1 | Create Foundation with Identity Anchors |
| Add requirements | §1.2 | Write REQs, add `@aligns-to` for each |
| Write design | §1.3-1.4 | Add `@derives`, document decisions |
| Verify integrity | §3 | Run alignment → traceability checks |
| Track state | §4 | Status per item, handoffs, state file |
| Handle changes | §5 | Propagate: Foundation → REQs → Design |
| Fix broken state | §6 | Detect gaps, restore links |
| Scale to subsystems | §7 | Nested structure, inheritance rules |
| Track versions | §8 | MAJOR.MINOR.PATCH, changelogs |
| Customize for project | §9 | Prefixes, ID formats, severity levels |
| Coordinate agents | §10 | Ownership, locking, escalation |

## Examples

### Minimal Foundation

```markdown
---
title: "Project Foundation"
version: 1.0.0
status: draft
---

# Project Name

## Identity

One-sentence description of what this is.

## Identity Anchors

- **SCOPE-LOCAL:** Single user, local storage only
- **CONSTRAINT-KEYBOARD:** All actions via keyboard
```

### Requirement with Alignment

```markdown
## REQ-001: Create Task

User can create a task with title.

`@aligns-to:` SCOPE-LOCAL
```

### Design with Traceability

```markdown
## Data Storage

Tasks stored as JSON in localStorage.

`@derives:` REQ-001
`@rationale:` localStorage over IndexedDB — simpler API, <1000 tasks expected
```

## When NOT to Use SDD

- Prototype/spike (use README)
- Single-session work
- Trivial scope (<1 day)
- Learning/exploration

## Full Reference

| Document | Content |
|----------|---------|
| [guidelines-v4.4.md](reference/guidelines-v4.4.md) | Complete structural rules |
| [philosophy-v5.md](reference/philosophy-v5.md) | Why integrity matters |
