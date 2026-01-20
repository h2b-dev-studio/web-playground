---
name: sdd-decisions
description: |
  Create and manage Decision (DEC-NNN) and Assumption (ASM-NNN) records.
  Use when: documenting non-obvious choices, tracking risky assumptions, explaining rationale.
  Triggers: "document decision", "create DEC", "track assumption", "@rationale", "why did we choose"
---

# SDD Decisions & Assumptions

> `docs/sdd-guidelines.md` §1.4: "A system can have perfect existence links yet lose integrity if decision reasoning is lost."

## When to Document

### Decisions (DEC-NNN)

| Non-obvious (document) | Obvious (skip) |
|------------------------|----------------|
| Alternatives exist | No realistic alternative |
| Trade-off involved | Direct REQ → Design mapping |
| Future risk from assumption | Industry standard practice |
| Reviewer would ask "why?" | Self-evident |

### Assumptions (ASM-NNN)

| High-risk (formal ASM-NNN) | Low-risk (inline `@assumes`) |
|----------------------------|------------------------------|
| Invalidation = rework | Invalidation = minor fix |
| External dependency | Internal detail |
| Multiple items share it | Single item affected |
| Uncertain confidence | High confidence |

## Format by Significance

| Level | Decision | Assumption |
|-------|----------|------------|
| High | Separate `DEC-NNN.md` | Separate `ASM-NNN.md` |
| Medium | Inline `@rationale` block | Inline `@assumes` + brief |
| Low | Inline `@rationale` comment | Inline `@assumes` only |

## Instructions

### Creating a Decision Record

1. **Assess significance** — Does it warrant a file or inline?

2. **For High significance:**
   ```bash
   # Templates are in this skill's templates/ directory
   # Copy to your project's spec/decisions/
   mkdir -p spec/decisions
   # Then create from template structure (see templates/DEC-template.md)
   ```

3. **Fill required fields:**
   - Choice (what was decided)
   - Alternatives (what was rejected)
   - Rationale (why this choice)
   - Impacts (what this affects)

4. **Link from artifact:**
   ```markdown
   `@rationale:` DEC-003
   ```

### Creating an Assumption Record

1. **Assess risk** — Formal record or inline?

2. **For High-risk:**
   ```bash
   # Copy template structure to your project
   mkdir -p spec/assumptions
   # Then create from template structure (see templates/ASM-template.md)
   ```

3. **Fill required fields:**
   - Assumption (what we assume true)
   - Basis (why we believe it)
   - Risk (what if wrong)
   - Invalidation triggers (conditions that would falsify)

4. **Link from artifact:**
   ```markdown
   `@assumes:` ASM-002
   ```

## Quick Reference

### Inline Rationale (Medium/Low)

```markdown
## Token Bucket Algorithm

`@derives:` REQ-005
`@rationale:` Chose token bucket over sliding window — O(1) memory per key 
              vs O(n) for sliding window. Critical for 10K+ concurrent keys.
```

### Inline Assumption (Low-risk)

```markdown
## API Gateway

`@derives:` REQ-003
`@assumes:` Single-region deployment (if multi-region, need distributed rate limiting)
```

### Reference to Formal Record

```markdown
## Authentication Flow

`@derives:` REQ-AUTH-001
`@rationale:` DEC-002 (OAuth2 vs custom auth)
`@assumes:` ASM-001 (IdP availability)
```

## Directory Structure

```
spec/
├── decisions/
│   ├── DEC-001.md    # Architecture decisions
│   ├── DEC-002.md
│   └── ...
└── assumptions/
    ├── ASM-001.md    # High-risk assumptions
    └── ...
```

## ID Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Decision | `DEC-{NNN}` | DEC-001 |
| Domain-specific | `DEC-{DOMAIN}-{NNN}` | DEC-AUTH-001 |
| Assumption | `ASM-{NNN}` | ASM-001 |
| Domain-specific | `ASM-{DOMAIN}-{NNN}` | ASM-PERF-001 |

## Superseding Decisions

When a decision is replaced:

```markdown
---
id: DEC-005
supersedes: DEC-002
---

# Use JWT instead of Session Tokens

## Context

DEC-002 chose session tokens. New requirements (REQ-015: stateless API) 
invalidate that decision.

...
```

Update old decision:

```markdown
---
id: DEC-002
status: superseded
superseded_by: DEC-005
---
```

## Assumption Invalidation

When assumption proves false:

1. Update ASM record:
   ```yaml
   status: invalidated
   invalidated_at: 2025-01-17
   invalidated_by: "Production showed 3 regions needed"
   ```

2. Find all `@assumes: ASM-NNN` references

3. Re-verify each dependent artifact

4. Create new assumption or decision if needed

## Verification Checklist

- [ ] Non-obvious choices have `@rationale`
- [ ] High-risk assumptions have ASM-NNN records
- [ ] All DEC/ASM records have required fields
- [ ] Superseded decisions marked with `superseded_by`
- [ ] Invalidated assumptions tracked

## Templates

- [templates/DEC-template.md](templates/DEC-template.md)
- [templates/ASM-template.md](templates/ASM-template.md)

## References

- `docs/sdd-guidelines.md` §1.4 Supporting Records
- `docs/sdd-philosophy.md` §2.2 Decision
