---
title: "SDD Examples"
---

# SDD Examples

Concrete examples for each artifact type.

## Minimal Foundation

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

## Requirement with Alignment

```markdown
## REQ-001: Create Task

User can create a task with title.

`@aligns-to:` SCOPE-LOCAL

**Status:** draft

**Verification:** Task appears in list after creation.
```

## Design with Traceability

```markdown
## Data Storage

Tasks stored as JSON in localStorage.

`@derives:` REQ-001
`@rationale:` localStorage over IndexedDB — simpler API, <1000 tasks expected

**Status:** draft
```

## Subsystem Foundation

```markdown
---
title: "Auth Module Foundation"
version: 1.0.0
status: draft
inherits:
  - spec/foundation.md@1.0.0
---

# Auth Module

## Identity

Handles user authentication within the parent system.

## Identity Anchors

Inherits all parent anchors. Additional:

- **SCOPE-AUTH-LOCAL:** No external auth providers
- **CONSTRAINT-AUTH-STATELESS:** No server-side sessions
```

## Subsystem Requirements

```markdown
---
title: "Auth Module Requirements"
version: 1.0.0
status: draft
depends_on:
  - packages/auth/spec/auth.foundation.md@1.0.0
---

# Auth Module Requirements

## REQ-AUTH-001: Login

User can log in with email and password.

`@aligns-to:` SCOPE-AUTH-LOCAL

**Status:** draft

**Verification:** Valid credentials → session created.
```

## Subsystem Design

```markdown
---
title: "Auth Module Design"
version: 1.0.0
status: draft
depends_on:
  - packages/auth/spec/auth.requirements.md@1.0.0
---

# Auth Module Design

## Token Storage

JWT stored in httpOnly cookie.

`@derives:` REQ-AUTH-001
`@rationale:` httpOnly cookie over localStorage — prevents XSS token theft

**Status:** draft
```
