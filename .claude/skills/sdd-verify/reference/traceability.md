# Traceability Verification

> `doc/sdd-guidelines.md` §3.2: "Why does this exist?"

Static verification that links exist and are valid.

## 1. Alignment Check (Foundation ↔ Requirements)

### Heuristics

| Check | Pass | Fail |
|-------|------|------|
| Coverage | Every anchor has ≥1 REQ | Anchor unaddressed → GAP |
| Scope | REQ within Foundation scope | Outside scope → Escalate |
| Non-contradiction | Consistent with constraints | Violates → Escalate |
| Terminology | Uses Foundation's terms | Conflicting terms → Fix |

### Commands (Examples)

```bash
# Extract anchors from foundation
grep -E "^\*\*[A-Z]+-" spec/foundation.md | sed 's/\*\*//g' | cut -d: -f1 > /tmp/anchors.txt

# Extract @aligns-to targets from requirements  
grep -oE "@aligns-to:\s*[A-Z]+-[A-Z0-9-]+" spec/requirements.md | cut -d: -f2 | tr -d ' ' > /tmp/aligns.txt

# Find unaddressed anchors
comm -23 <(sort /tmp/anchors.txt) <(sort /tmp/aligns.txt)
```

### Coverage Matrix

Build and verify:

```markdown
| Anchor | Requirements |
|--------|--------------|
| SCOPE-MOBILE | REQ-001, REQ-003 |
| CONSTRAINT-OFFLINE | REQ-002 |
| TONE-HUMOR | ⚠️ None |
```

---

## 2. Derivation Check (Requirements ↔ Design)

### Mechanical Checks

| Check | Method |
|-------|--------|
| `@derives` exists | Parse each design section |
| `@derives` target valid | Lookup REQ-ID in requirements |
| `@rationale` present | Check non-obvious choices |

### Depth Criteria

| Depth | Meaning | When |
|-------|---------|------|
| Addresses | Design relates to REQ | Draft phase |
| Satisfies | Design fully covers REQ | Verified phase |
| Testable | Acceptance criteria defined | Pre-implementation |

### Commands

```bash
# Extract @derives from design
grep -E "@derives:" spec/design.md

# Find design sections without @derives
# (manual inspection or custom parser)
```

---

## 3. Consistency Check

| Check | Vertical | Horizontal |
|-------|----------|------------|
| Non-contradictory | No conflict with source | No conflict with siblings |
| Terminology | Uses source's terms | Consistent with siblings |

### Vertical Example

```
Foundation: "CONSTRAINT-OFFLINE: Must work offline"
     ↓
Requirement: "REQ-002: Sync to cloud server"  ← CONFLICT
```

### Horizontal Example

```
REQ-001: "Use localStorage for data"
REQ-002: "Use IndexedDB for data"  ← CONFLICT
```

---

## 4. Link Syntax Reference

### In Requirements

```markdown
## REQ-005: Rate Limiting

API must enforce per-key rate limits.

`@aligns-to:` CONSTRAINT-FAIR-USE
```

### In Design

```markdown
## Token Bucket Algorithm

Rate limiting uses token bucket.

`@derives:` REQ-005
`@rationale:` O(1) memory vs O(n) for sliding window
`@assumes:` ASM-002
```

### Reference Formats

| Target | Format |
|--------|--------|
| Same doc | `#section-anchor` or `ID` |
| Other doc | `./path/to/doc.md#anchor` |
| Anchor | `SCOPE-MOBILE` |
| REQ | `REQ-005`, `REQ-AUTH-001` |
| Decision | `DEC-003` |
| Assumption | `ASM-002` |

---

## 5. Common Failures

| Failure | Cause | Resolution |
|---------|-------|------------|
| Orphan design | No `@derives` | Find REQ or remove |
| Orphan REQ | No `@aligns-to` | Find anchor or question scope |
| Broken link | Target renamed/deleted | Update or escalate |
| Circular reference | A → B → A | Restructure hierarchy |

---

## 6. Output Format

```yaml
traceability:
  alignment:
    status: passed | failed
    coverage:
      - anchor: SCOPE-MOBILE
        reqs: [REQ-001, REQ-003]
      - anchor: TONE-HUMOR
        reqs: []  # GAP
    issues: []
  
  derivation:
    status: passed | failed
    items:
      - section: "Data Model"
        derives: [REQ-001, REQ-002]
        rationale: present
      - section: "Caching"
        derives: []  # GAP
        rationale: missing
    issues:
      - "Design §Caching has no @derives"
```
