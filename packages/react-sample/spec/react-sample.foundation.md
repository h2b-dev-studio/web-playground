---
title: "React Sample Foundation"
author: Claude
date: 2025-01-14
version: 1.0.0
status: draft
inherits:
  - spec/foundation.md@1.0.0
changelog:
  - v1.0.0: Initial foundation for Pattern Gallery + Props Playground
---

# React Sample

## Identity

Interactive showcase demonstrating idiomatic React patterns with live demos, props manipulation, and code viewing.

## Purpose

Enable developers to:

1. Understand React design patterns through working examples
2. Experiment with component behavior via props manipulation
3. Study implementation details with syntax-highlighted source code
4. Learn by editing hook logic in select examples

## Identity Anchors

Inherits all anchors from parent Foundation. Additional subsystem-specific anchors:

### Scope

- **SCOPE-REACT-PATTERNS:** Focuses on React-specific patterns (Compound Components, Render Props, Custom Hooks, etc.), not general JavaScript patterns.
- **SCOPE-REACT-INTERACTIVE:** Every pattern demo is interactive, not static code snippets.

### Constraints

- **CONSTRAINT-REACT-NO-JSX-EDIT:** Editable examples limited to JS logic only. No runtime JSX compilation.
- **CONSTRAINT-REACT-LIGHTWEIGHT-DEPS:** Only lightweight libraries for code display (~10KB total max for syntax highlighting + editor).

## Scope Boundaries

### In Scope

- React design pattern demonstrations
- Props Playground for each pattern
- Syntax-highlighted code viewer
- Editable custom hook examples (JS logic only)
- Responsive layout

### Out of Scope

- Full JSX editing / live transpilation
- State management library integrations (Redux, Zustand, etc.)
- Server-side rendering patterns
- React Native patterns
- Performance optimization patterns (React.memo, useMemo deep dives)

## Patterns Overview

| Category | Patterns |
|----------|----------|
| Composition | Compound Components, Render Props, Composition vs Inheritance |
| State | Custom Hooks, Controlled vs Uncontrolled, Context + Reducer, Lifting State Up |

## Success Criteria

This package succeeds when a developer can:

1. Navigate to any pattern and see a working demo
2. Manipulate props and observe real-time changes
3. View the actual source code with syntax highlighting
4. Edit custom hook logic and see updated behavior
