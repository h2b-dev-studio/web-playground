# TaskCLI Example

Complete example of generating SDD skills for a CLI tool project.

## Context

- **Project:** TaskCLI
- **Domain:** CLI tool
- **Multi-agent:** No

## Step 2 Output (Customization Record)

```yaml
project:
  name: "TaskCLI"
  domain: "CLI tool"

customizations:
  anchor_prefixes:
    - "SCOPE-: What the tool does and doesn't do"
    - "CONSTRAINT-: Technical or UX limitations"
    - "UX-: User experience principles"
  req_id_format: "REQ-{NNN}"
  multi_agent: false

examples:
  anchors:
    - "SCOPE-LOCAL: All data stored locally, no cloud sync"
    - "UX-FAST: Sub-100ms response for all commands"
  requirements:
    - "REQ-001: User can add a task with title"
  design:
    - "Tasks stored as JSON in ~/.taskcli/tasks.json"
```

## Generated sdd-foundation/SKILL.md

```markdown
---
name: sdd-foundation
description: |
  Generate or edit a Foundation document for TaskCLI.
  Use when: defining what the tool does, scoping features, establishing identity.
  Triggers: "sdd foundation", "define identity", "what is taskcli", "scope"
---

# TaskCLI Foundation

Create a Foundation document that defines TaskCLI's identity (Guidelines §1.1).

## Anchor Prefixes

| Prefix | Meaning | Example |
|--------|---------|---------|
| SCOPE- | What the tool does/doesn't do | SCOPE-LOCAL |
| CONSTRAINT- | Technical or UX limitations | CONSTRAINT-POSIX |
| UX- | User experience principles | UX-FAST |

## Instructions

1. **Create file:** `spec/taskcli.foundation.md`

2. **Write Identity section:**
   - What is TaskCLI in one sentence?
   - Who is it for?

3. **Define Scope:**
   - In Scope: features TaskCLI will have
   - Out of Scope: what it explicitly won't do

4. **List Identity Anchors:**
   - At least one SCOPE- anchor
   - All hard constraints as CONSTRAINT-
   - Key UX principles as UX-

5. **Add frontmatter:**
   ```yaml
   ---
   title: "TaskCLI Foundation"
   version: 1.0.0
   status: draft
   ---
   ```

## Examples

```markdown
---
title: "TaskCLI Foundation"
version: 1.0.0
status: draft
---

# TaskCLI

## Identity

A minimal command-line task tracker for developers who prefer terminal workflows.

## Scope

### In Scope
- Add, complete, delete tasks
- List and filter tasks
- Local file storage

### Out of Scope
- Cloud sync
- Team collaboration
- GUI

## Identity Anchors

- **SCOPE-LOCAL:** All data stored locally in ~/.taskcli/
- **SCOPE-SINGLE-USER:** No multi-user or sharing features
- **CONSTRAINT-POSIX:** Must work on macOS/Linux, Windows optional
- **UX-FAST:** All commands complete in <100ms
- **UX-MINIMAL:** No interactive prompts; all input via arguments
```

## Verification

After creating Foundation:

- [ ] Identity answers "what is this?"
- [ ] Scope separates in/out clearly
- [ ] Every anchor uses a prefix from the table
- [ ] Anchors are specific enough to align requirements against
- [ ] Frontmatter has title, version, status
```

## Notes

This example shows:

1. **Customization record** — filled from Step 1 questions
2. **Generated skill** — self-contained, project-specific
3. **Proper sections** — Anchor Prefixes, Instructions, Examples, Verification
4. **Domain terminology** — "CLI tool", "commands", "arguments"

The same pattern applies to sdd-requirements, sdd-design, sdd-verify, and sdd-workflow.
