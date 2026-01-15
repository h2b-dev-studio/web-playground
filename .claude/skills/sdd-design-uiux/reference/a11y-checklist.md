# Accessibility Verification for SDD

How to derive accessibility requirements from REQs and verify coverage.

## REQ → A11y Mapping

| REQ Feature | A11y Requirement |
|-------------|------------------|
| Interactive control | Keyboard accessible + focus visible |
| Form input | Label + error announcement |
| Dynamic content | ARIA live region |
| Navigation | Landmark roles + skip links |
| Status change | Screen reader announcement |
| Color-coded info | Non-color alternative |

## Verification Per REQ

For each REQ with user interaction:

```markdown
### REQ-XXX: {title}

| Element | Keyboard | Focus | ARIA | Contrast |
|---------|----------|-------|------|----------|
| {control} | Tab/Enter | Ring | label | ✓ |
```

## @derives Format

```markdown
### Accessibility

@derives: REQ-XXX, REQ-YYY

| Feature | Keyboard | Screen Reader | Visual |
|---------|----------|---------------|--------|
| Props Playground controls | Tab between, Space to toggle | Labels announce type and value | Focus ring on active |

- REQ-XXX: All controls keyboard accessible
- REQ-YYY: Screen reader can navigate pattern list
```

## Minimum Checklist

For each interactive element from REQs:

- [ ] **Keyboard:** Can reach and activate with keyboard only?
- [ ] **Focus:** Is focus visible when element is focused?
- [ ] **Label:** Does screen reader announce purpose?
- [ ] **State:** Does screen reader announce state changes?
- [ ] **Contrast:** Is text contrast ≥4.5:1?

## Cross-Cutting with Frontend

After uiux defines a11y requirements, frontend must:
- Verify components can accept a11y props
- Implement ARIA attributes
- Handle focus management

**Handoff note:**
```yaml
next_steps:
  - sdd-design-frontend: Verify components support aria-label, aria-expanded, role props
```

## Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Generic "WCAG compliant" | Not verifiable | List specific elements |
| A11y for non-REQ features | Scope creep | Only REQ-derived features |
| No @derives | Can't trace | Link to specific REQ |
| Missing keyboard spec | Incomplete | Define tab order and shortcuts |
