# Test Verification

> `doc/sdd-guidelines.md` §3.3: "Does this work as intended?"

Dynamic verification that artifacts work as intended.

## 1. Core Principle

> "Tests are executable specifications — externalized, verifiable criteria for correctness."

```
Before: "This code is correct" (in developer's head)
After:  "This test passes" (externalized, executable)
```

**Write behavioral tests BEFORE implementation** — prevents tests from being shaped by solution.

---

## 2. Two Test Types

| Type | Links To | Question | Level |
|------|----------|----------|-------|
| **Behavioral** | Requirements | What must it do? | E2E, Integration |
| **Structural** | Design | How does it work? | Unit |

### Why Both?

```
Behavioral alone: "Feature works" — but maybe implementation is fragile
Structural alone: "Code works" — but maybe it shouldn't exist

Complete = Behavioral + Structural
```

---

## 3. Abstraction Matching

Each artifact level requires different verification:

| Artifact | Answers | Test Type |
|----------|---------|-----------|
| Foundation | What is this? | Human judgment |
| Requirements | What must it do? | Behavioral (black-box) |
| Design | How will it do it? | Structural (white-box) |

### Why Matching Matters

| Mismatch | Problem |
|----------|---------|
| Structural test → REQ | Refactor breaks test (false negative) |
| Behavioral test → Design | Design change undetected (false positive) |

### Example: Right vs Wrong

**REQ-001:** "User can create a task"

```python
# ✅ Behavioral (tests WHAT)
def test_user_can_create_task():
    task = api.create_task(title="Buy milk")
    assert task in api.list_tasks()

# ❌ Structural (tests HOW — wrong level!)
def test_task_saved_to_localstorage():
    api.create_task(title="Buy milk")
    assert "Buy milk" in localStorage.get("tasks")
```

The structural test breaks if we switch from localStorage to IndexedDB, even though REQ-001 is still satisfied.

---

## 4. @verifies Syntax

### Canonical Location

**Place `@verifies` as a comment directly above the test function:**

```python
# @verifies: REQ-001
def test_user_can_create_task():
    """User can create a task with title."""
    ...
```

This is the canonical format. Placing in docstrings is acceptable but less tooling-friendly.

### In Test Files

```python
# @verifies: REQ-001
def test_user_can_create_task():
    """User can create a task with title."""
    ...

# @verifies: REQ-001, REQ-002
def test_user_can_create_and_complete_task():
    """Combined flow test."""
    ...
```

### Link Rules

| Rule | Example |
|------|---------|
| One REQ | `# @verifies: REQ-001` |
| Multiple REQs | `# @verifies: REQ-001, REQ-002` |
| With domain | `# @verifies: REQ-AUTH-001` |

### Finding @verifies

```bash
# List all @verifies in test files
grep -r "@verifies:" tests/requirements/

# Find REQs without tests
# Compare REQ list vs @verifies list
```

---

## 5. Test Organization

```
tests/
├── requirements/           # Behavioral tests
│   ├── test_req_001.py     # @verifies: REQ-001
│   ├── test_req_002.py     # @verifies: REQ-002
│   └── test_auth/          # Domain grouping OK
│       └── test_req_auth_001.py
├── unit/                   # Structural tests
│   └── {mirrors src/}
│       └── auth/
│           └── test_token_bucket.py
└── conftest.py
```

### Naming Convention

| Type | Pattern |
|------|---------|
| Requirements | `test_req_{id}.py` or `test_{feature}.py` |
| Unit | `test_{module}.py` mirroring src/ |

---

## 6. Requirements Test Template

```python
# tests/requirements/test_req_001.py
"""Behavioral tests for REQ-001: Create Task"""

import pytest
from app import TaskManager


class TestCreateTask:
    """REQ-001: User can create a task with title."""
    
    # @verifies: REQ-001
    def test_create_task_with_title(self, app):
        """User can create a task with title."""
        task = app.create_task(title="Buy milk")
        
        assert task is not None
        assert task.title == "Buy milk"
        assert task in app.list_tasks()
    
    # @verifies: REQ-001
    def test_create_task_with_description(self, app):
        """User can create a task with optional description."""
        task = app.create_task(
            title="Buy milk",
            description="From corner store"
        )
        
        assert task.description == "From corner store"
```

**Characteristics:**
- Black-box (no implementation knowledge)
- Uses public API only
- Stable across refactoring
- Tests behavior, not structure

---

## 7. Design Test Convention

```python
# tests/unit/storage/test_local_storage.py
"""
Unit tests for Design §Data Model: localStorage implementation

Implicitly verifies: Design §Data Model
"""

from app.storage import LocalStorageTaskStore, Task


class TestLocalStorageTaskStore:
    """Tests for localStorage implementation."""
    
    def test_task_persists_as_json(self, storage):
        """Tasks stored as JSON array."""
        storage.save(Task(id="1", title="Test"))
        
        raw = storage.get_raw()
        assert '"id":"1"' in raw
    
    def test_roundtrip(self, storage):
        """Task survives save/load cycle."""
        original = Task(id="1", title="Test")
        storage.save(original)
        loaded = storage.load("1")
        
        assert loaded.id == original.id
```

**Characteristics:**
- White-box (knows implementation)
- Tests specific design choice
- Changes when design changes
- No `@verifies` — follows directory convention

---

## 8. Coverage Check

### Requirements Coverage

Every REQ must have ≥1 behavioral test:

```yaml
requirements:
  REQ-001: passing
  REQ-002: passing  
  REQ-003: missing  # GAP
```

### How to Check

```bash
# List all REQs
grep -E "^## REQ-" spec/requirements.md | sed 's/## //' | cut -d: -f1

# List all @verifies
grep -r "@verifies:" tests/requirements/ | grep -oE "REQ-[A-Z]*-?[0-9]+"

# Compare
comm -23 <(reqs | sort | uniq) <(verifies | sort | uniq)
```

---

## 9. Test Status in State

```yaml
# .sdd/state.yaml
verification:
  tests:
    requirements:
      REQ-001: passing
      REQ-002: failing
      REQ-003: missing
    design:
      data_model: passing
      keyboard_shortcuts: missing

gaps:
  - id: GAP-002
    severity: major
    type: missing_test
    location: REQ-003
    description: "No behavioral test for keyboard navigation"
```

---

## 10. Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| Test without @verifies | Forgot link | Add `# @verifies: REQ-XXX` |
| REQ without test | Not written | Create in `tests/requirements/` |
| Structural test for REQ | Wrong level | Move to unit, create behavioral |
| Behavioral test for Design | Wrong level | Add @verifies or move to unit |
| Flaky test | Implementation leak | Refactor to pure behavioral |

---

## 11. Output Format

```yaml
testing:
  requirements:
    status: partial
    coverage: 2/3
    items:
      - req: REQ-001
        tests: [test_req_001.py::test_create_task]
        status: passing
      - req: REQ-002
        tests: [test_req_002.py::test_complete_task]
        status: passing
      - req: REQ-003
        tests: []
        status: missing  # GAP
  
  design:
    status: partial
    items:
      - section: "Data Model"
        tests: [test_local_storage.py]
        status: passing
      - section: "Keyboard Shortcuts"
        tests: []
        status: missing
```
