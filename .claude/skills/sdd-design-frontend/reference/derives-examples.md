# @derives Judgment Examples

How to determine if a design element derives from a requirement.

## The Question

> "Does this design element exist **because of** this REQ?"

If you removed the REQ, would this element still be needed?
- **Yes** → NOT @derives (it serves other purposes)
- **No** → @derives (it exists for this REQ)

## Judgment Matrix

| Design Element | REQ Says | @derives? | Why |
|----------------|----------|-----------|-----|
| `PatternList` component | "Gallery displays all patterns with navigation" | ✅ Yes | Directly implements the feature |
| `PropControl` component | "UI controls to manipulate props" | ✅ Yes | Directly implements the feature |
| `ErrorBoundary` | "Syntax errors displayed without crashing" | ✅ Yes | Enables the acceptance criterion |
| `useToggle` hook | (general utility) | ❌ No | Could serve any feature |
| `Button` component | (shared UI) | ❌ No | Generic, not REQ-specific |

## Coverage Types

### 1. Direct Implementation

REQ describes a feature → Design element implements it.

```
REQ: "User can copy code to clipboard"
     ↓
Design: CopyButton component
        @derives: REQ-XXX (Direct implementation of copy feature)
```

### 2. Enabling Infrastructure  

REQ has acceptance criteria → Design element makes it possible.

```
REQ: "Changing control immediately updates demo"
     ↓
Design: Controlled component pattern for PropControl
        @derives: REQ-XXX (Enables real-time update criterion)
```

### 3. Constraint Satisfaction

REQ has constraints → Design respects them.

```
REQ: "Lightweight dependencies (~10KB total)"
     ↓
Design: Choose prism-react-renderer over Monaco
        @derives: REQ-XXX (Satisfies size constraint)
```

## Multi-REQ Coverage

One design element can derive from multiple REQs:

```markdown
### CodePanel Component

@derives: REQ-003, REQ-004

- REQ-003 (Code Viewer): Displays syntax-highlighted source
- REQ-004 (Editable Examples): Contains CodeEditor for editable hooks
```

## Partial Coverage

A section may only cover **part** of a REQ. Be explicit:

```markdown
@derives: REQ-002 (partial)

This section covers:
- Control component structure
- State management for prop values

NOT covered here (see UI/UX section):
- Control layout and spacing
- Mobile touch interactions
```

## Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Everything @derives REQ-001 | Too vague | Be specific about which part |
| No justification | Can't verify | Add inline explanation |
| Missing REQ | Gap in coverage | Check all assigned REQs |
| Utility @derives | Over-linking | Only link REQ-specific elements |

## Verification Template

For each @derives claim, answer:

```
REQ: {REQ-ID}
Design Element: {component/decision/pattern}
Relationship: {direct / enabling / constraint}
If REQ removed, element still needed? {yes = wrong, no = correct}
```
