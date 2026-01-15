---
title: "React Sample Requirements"
author: Claude
date: 2025-01-14
version: 1.2.0
status: draft
depends_on:
  - packages/react-sample/spec/react-sample.foundation.md@1.1.0
changelog:
  - v1.2.0: Add root:: prefix to inherited anchors, add missing anchor coverage
  - v1.1.0: Update anchor references to follow SDD package conventions
  - v1.0.0: Initial requirements for Pattern Gallery + Props Playground
---

# React Sample Requirements

Requirements for `react-sample` package.

---

## REQ-REACT-001: Pattern Catalog

Gallery displays all implemented patterns with navigation.

**Patterns:**

| Category | Pattern | Example Component |
|----------|---------|-------------------|
| Composition | Compound Components | Tabs, Accordion |
| Composition | Render Props | Toggle, MouseTracker |
| Composition | Composition vs Inheritance | Card variants |
| State | Custom Hooks | useToggle, useDebounce, useFetch |
| State | Controlled vs Uncontrolled | TextInput |
| State | Context + Reducer | ThemeProvider |
| State | Lifting State Up | FormWithValidation |

`@aligns-to:` root::SCOPE-SHOWCASE, root::SCOPE-WEB-TECH, PATTERN-REACT, root::QUALITY-IDIOMATIC, root::AUDIENCE-INTERMEDIATE

**Status:** draft

**Verification:**
- Navigation lists all 7 patterns
- Each pattern has at least one working example
- Clicking pattern navigates to its demo

---

## REQ-REACT-002: Props Playground

Each demo includes UI controls to manipulate component props in real-time.

**Control mapping:**

| Prop Type | Control |
|-----------|---------|
| `boolean` | Checkbox |
| `string` | Text input |
| `number` | Number input with optional slider |
| `enum` / union | Select dropdown |
| `ReactNode` | Predefined options dropdown |

`@aligns-to:` root::SCOPE-SHOWCASE, DEMO-INTERACTIVE, root::AUDIENCE-DEVELOPER

**Status:** draft

**Verification:**
- Each demo has at least one manipulable prop
- Changing control immediately updates demo
- Controls reflect current prop values

---

## REQ-REACT-003: Code Viewer

Source code displayed alongside each demo with syntax highlighting.

**Requirements:**
- Syntax highlighting for TypeScript/TSX
- Copy-to-clipboard functionality
- Collapsible panel
- Displays actual component source (not duplicated snippets)

`@aligns-to:` root::QUALITY-MINIMAL, root::QUALITY-DOCUMENTED, root::QUALITY-TYPESCRIPT, root::AUDIENCE-DEVELOPER, TECH-LIGHTWEIGHT-DEPS

**Status:** draft

**Verification:**
- Code renders with syntax highlighting
- Copy button copies code to clipboard
- Displayed code matches actual implementation file

---

## REQ-REACT-004: Editable Examples

Select custom hook examples allow inline code editing for JS logic.

**Scope:**
- Hook logic only (no JSX editing)
- Real-time execution of edited code
- Syntax error display
- Reset to original code

**Editable hooks:**
- `useToggle`
- `useDebounce`

`@aligns-to:` DEMO-INTERACTIVE, root::AUDIENCE-DEVELOPER, root::AUDIENCE-INTERMEDIATE, TECH-NO-JSX-EDIT

**Status:** draft

**Verification:**
- Editing hook logic updates behavior in real-time
- Syntax errors displayed inline without crashing
- Reset button restores original code

---

## REQ-REACT-005: Responsive Layout

Gallery works on desktop, tablet, and mobile viewports.

**Breakpoints:**

| Viewport | Width | Layout |
|----------|-------|--------|
| Desktop | ≥1024px | Side-by-side: demo + code |
| Tablet | 768–1023px | Stacked, code collapsed by default |
| Mobile | <768px | Full-width, code hidden by default |

`@aligns-to:` root::AUDIENCE-DEVELOPER

**Status:** draft

**Verification:**
- No horizontal scroll on any viewport
- All controls accessible via touch on mobile
- Demo visible without scrolling on initial load

---

## Coverage Matrix

| Anchor | Requirements |
|--------|--------------|
| root::SCOPE-SHOWCASE | REQ-REACT-001, REQ-REACT-002 |
| root::SCOPE-WEB-TECH | REQ-REACT-001 |
| root::QUALITY-TYPESCRIPT | REQ-REACT-003 |
| root::QUALITY-MINIMAL | REQ-REACT-003 |
| root::QUALITY-IDIOMATIC | REQ-REACT-001 |
| root::QUALITY-DOCUMENTED | REQ-REACT-003 |
| root::QUALITY-TESTED | *(inherited from REQ-003)* |
| root::AUDIENCE-DEVELOPER | REQ-REACT-002, REQ-REACT-003, REQ-REACT-004, REQ-REACT-005 |
| root::AUDIENCE-INTERMEDIATE | REQ-REACT-001, REQ-REACT-004 |
| PATTERN-REACT | REQ-REACT-001 |
| DEMO-INTERACTIVE | REQ-REACT-002, REQ-REACT-004 |
| TECH-NO-JSX-EDIT | REQ-REACT-004 |
| TECH-LIGHTWEIGHT-DEPS | REQ-REACT-003 |
