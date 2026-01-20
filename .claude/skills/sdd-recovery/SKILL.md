---
name: sdd-recovery
description: |
  Recover from SDD integrity failures: orphans, contradictions, broken links, inherited systems.
  Use when: fixing broken traceability, resolving conflicts, onboarding to undocumented codebase.
  Triggers: "fix orphan", "resolve contradiction", "broken link", "inherit system", "no documentation"
---

# SDD Recovery

> `doc/sdd-guidelines.md` §6: "Integrity will break. The question is not whether, but when and how to respond."

## Detection

Broken integrity manifests as:

| Signal | Meaning |
|--------|---------|
| Orphaned artifacts | No traceable origin |
| Broken links | Target doesn't exist or contradicts |
| Missing reasoning | "Why" has no answer |
| Contradictions | Parts conflict |
| Failing tests | Behavioral or structural tests fail |

## Recovery Principle

```
1. Isolate   — Identify scope of breakage
2. Trace     — Find what can still be verified
3. Reconstruct — Re-establish missing links/reasoning
4. Verify    — Confirm integrity restored
```

**Partial integrity > none.** Restore incrementally.

---

## 1. Orphan Handling

### Design Without `@derives`

```markdown
## Caching Layer

{No @derives link}
```

**Options:**

| Option | When | Action |
|--------|------|--------|
| A. Link exists | REQ clearly covers this | Add `@derives: REQ-NNN` |
| B. REQ missing | Feature needed but undocumented | Create REQ, then link |
| C. Remove | Shouldn't exist | Delete or mark obsolete |

**Decision flow:**

```
Design item without @derives
    │
    ├─ Can find matching REQ? ──Yes──► Add @derives
    │
    └─ No matching REQ
        │
        ├─ Should feature exist? ──Yes──► Create REQ first
        │
        └─ No ──► Remove design item
```

### REQ Without `@aligns-to`

```markdown
## REQ-007: Dark Mode

{No @aligns-to link}
```

**Options:**

| Option | When | Action |
|--------|------|--------|
| A. Anchor exists | Fits existing scope | Add `@aligns-to: ANCHOR` |
| B. Anchor missing | New scope area | Add anchor to Foundation, then link |
| C. Out of scope | Doesn't belong | Remove REQ or escalate |

### Test Without `@verifies`

```python
def test_something():
    # No @verifies
    ...
```

**Options:**

| Option | When | Action |
|--------|------|--------|
| A. Tests a REQ | Behavioral test for a requirement | Add `# @verifies: REQ-NNN` above function |
| B. Tests design | Unit test (already in `tests/unit/`) | No action needed — unit tests don't need @verifies |
| C. Behavioral but in wrong dir | In `tests/unit/` but tests REQ | Move to `tests/requirements/`, add @verifies |
| D. Obsolete | Tests nothing valid | Remove |

### Decision Without Context

```markdown
## DEC-003: Use Redis

{No rationale, no alternatives}
```

**Options:**

| Option | When | Action |
|--------|------|--------|
| A. Can reconstruct | Team remembers, docs exist | Fill in rationale |
| B. Cannot reconstruct | Lost to time | Mark `rationale: unknown (inherited)` |

```markdown
## DEC-003: Use Redis

`@rationale:` unknown (inherited) — Decision predates SDD adoption.
             Likely chosen for caching performance, but alternatives
             not documented.
```

---

## 2. Contradiction Recovery

### Detection

```
Foundation: "CONSTRAINT-OFFLINE: Must work offline"
     ↓
REQ-005: "Sync data to cloud in real-time"  ← CONFLICT
```

### Resolution Process

1. **Identify authority**
   ```
   Foundation > Requirements > Design
   Earlier decision > Later (unless @supersedes)
   ```

2. **Determine which is wrong**

   | If... | Then... |
   |-------|---------|
   | Lower-level wrong | Update lower-level |
   | Higher-level wrong | Escalate (needs authority) |
   | Unclear | Document as gap, escalate |

3. **Resolve**

   ```markdown
   ## REQ-005: Offline-First Sync
   
   `@aligns-to:` CONSTRAINT-OFFLINE
   
   Queue changes locally; sync when online.
   
   `@rationale:` DEC-007 — Revised from real-time sync to respect 
                 CONSTRAINT-OFFLINE. See DEC-007 for migration plan.
   ```

4. **Propagate** — Re-verify dependents

5. **Re-run tests** — Behavioral tests must still pass

### Horizontal Contradiction

```
REQ-001: "Use localStorage"
REQ-002: "Use IndexedDB"  ← CONFLICT
```

**Resolution:**
- Determine which is correct (or if both needed for different purposes)
- Update or remove conflicting REQ
- Document decision if non-obvious

---

## 3. Broken Link Recovery

### Target Renamed

```markdown
`@derives:` REQ-005  ← Was renamed to REQ-AUTH-005
```

**Fix:** Update reference

```markdown
`@derives:` REQ-AUTH-005
```

### Target Deleted

```markdown
`@derives:` REQ-003  ← REQ-003 no longer exists
```

**Options:**

| Situation | Action |
|-----------|--------|
| Deleted intentionally | Design item is orphaned → handle as orphan |
| Deleted by mistake | Restore REQ-003 |
| Merged into another | Update link to new target |

### Target Never Existed

```markdown
`@derives:` REQ-999  ← Typo or wrong ID
```

**Fix:** Find correct target or acknowledge as orphan

### Link Syntax Error

```markdown
`@derives` REQ-005      ← Missing colon
`@derives:` req-005     ← Wrong case
`@derives:` REQ 005     ← Space instead of hyphen
```

**Fix:** Correct syntax

```markdown
`@derives:` REQ-005
```

---

## 4. Version Mismatch Recovery

```yaml
# design.md frontmatter
depends_on:
  - requirements.md@1.0.0  ← But requirements.md is now @2.0.0
```

### Process

1. **Check changelog** — What changed between versions?

2. **Assess impact:**

   | Bump | Action |
   |------|--------|
   | MAJOR | Re-verify completely, re-run all tests |
   | MINOR | Spot-check affected areas |
   | PATCH | Update version reference only |

3. **Re-verify** affected items

4. **Update `depends_on`** to current version

### Example

```yaml
# Before
depends_on:
  - requirements.md@1.0.0

# requirements.md changelog shows:
# v2.0.0: BREAKING - Removed REQ-003, REQ-004

# Action: Find design items @derives REQ-003, REQ-004
#         These are now orphaned → handle as orphans
#         Then update:

depends_on:
  - requirements.md@2.0.0
```

---

## 5. Inheriting Broken Systems

> `doc/sdd-philosophy.md` §7.3: "Pretending integrity exists is worse than admitting it does not."

### Principles

| Do | Don't |
|----|-------|
| Document actual state | Fabricate traceability |
| Mark unknowns explicitly | Guess at rationale |
| Build integrity forward | Backfill false history |
| Start with high-risk areas | Try to fix everything |

### Process

1. **Assess current state**

   ```yaml
   inherited_system:
     has_foundation: false
     has_requirements: partial  # Some exist
     has_design: false
     has_tests: true  # But no @verifies
     decisions_documented: false
   ```

2. **Create minimal Foundation**

   ```markdown
   # {System} Foundation
   
   ## Status
   
   Inherited system. Documentation reconstructed from code analysis.
   
   ## Identity (Inferred)
   
   {What the system appears to do, based on code/behavior}
   
   ## Identity Anchors
   
   - **SCOPE-INFERRED-1:** {observed scope}
   - **CONSTRAINT-INFERRED-1:** {observed constraint}
   
   > ⚠️ Anchors are inferred, not authoritative. Validate with stakeholders.
   ```

3. **Document known unknowns**

   ```markdown
   ## Unknown Areas
   
   - Authentication flow: Implementation exists, rationale unknown
   - Caching strategy: Redis used, alternatives not evaluated
   - Database schema: No documented design decisions
   ```

4. **Add `@verifies` to existing tests**

   ```python
   # @verifies: REQ-INFERRED-001
   # Note: REQ inferred from test behavior
   def test_user_login():
       ...
   ```

5. **Build forward** — New work follows full SDD

### Marking Inherited Items

Use warning markers and track in state file:

```markdown
## REQ-INFERRED-001: User Authentication

`@aligns-to:` SCOPE-INFERRED-1

Users can log in with email/password.

> ⚠️ **INHERITED:** Requirement reconstructed from code. Original intent unknown.
```

```markdown
## DEC-INHERITED-001: PostgreSQL Database

`@rationale:` unknown (inherited) — Database choice predates documentation.
              Assuming standard selection criteria applied.

> ⚠️ **INHERITED:** Decision predates SDD adoption.
```

Track inherited status in state file (not inline):

```yaml
# .sdd/state.yaml
items:
  REQ-INFERRED-001:
    status: draft
    inherited: true
    note: "Inferred from existing implementation"
```

---

## 6. Test Failure Recovery

> For test setup issues (missing @verifies, wrong directory), see [sdd-verify testing.md §10](../sdd-verify/reference/testing.md).
> This section covers test *execution* failures.

### Behavioral Test Fails

```
test_user_can_create_task FAILED
# @verifies: REQ-001
```

**This means:** REQ-001 is not satisfied.

| Cause | Action |
|-------|--------|
| Bug in implementation | Fix code |
| REQ changed, test outdated | Update test |
| REQ impossible as stated | Escalate — REQ needs revision |

### Structural Test Fails

```
test_token_bucket_refill FAILED
# Tests Design §Rate Limiting
```

**This means:** Design implementation broken, but REQ may still be met.

| Cause | Action |
|-------|--------|
| Bug in implementation | Fix code |
| Design changed, test outdated | Update test |
| Design approach flawed | Revise design |

**Check:** If structural test fails but behavioral test passes → design detail wrong but feature works. Still fix, but lower priority.

---

## 7. State After Recovery

```yaml
# .sdd/state.yaml
recovery:
  date: 2025-01-17
  type: inherited_system | integrity_repair
  
  resolved:
    - "Orphan Design §Caching linked to REQ-005"
    - "Contradiction REQ-003/REQ-005 resolved per DEC-008"
    
  remaining_gaps:
    - id: GAP-001
      type: unknown_rationale
      location: DEC-INHERITED-001
      description: "PostgreSQL selection rationale unknown"
      
  inherited_markers:
    - REQ-INFERRED-001
    - REQ-INFERRED-002
    - DEC-INHERITED-001
```

---

## Checklist

- [ ] All orphans resolved (linked, created parent, or removed)
- [ ] All contradictions resolved or escalated
- [ ] All broken links fixed
- [ ] Version mismatches updated
- [ ] Unknown rationale marked explicitly
- [ ] Inherited items clearly labeled
- [ ] State file updated with recovery status
- [ ] Tests re-run after recovery

## References

- `doc/sdd-guidelines.md` §6 Recovery
- `doc/sdd-philosophy.md` §7 Recovery
