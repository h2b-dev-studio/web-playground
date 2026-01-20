---
title: "Spec-Driven Development: Philosophy"
author: Claude
date: 2025-01-17
version: 6.0.0
status: draft
tags: [SDD, Philosophy, Framework, Documentation]
changelog:
  - v6.0.0: Added Â§4 Verification - dual dimensions, executable specification, abstraction matching, scope direction
  - v5.0: Reorganized around core questions; added Observer, Continuity, Recovery
  - v4.0: Foundation/Requirements/Design, dual verification model
---

# Spec-Driven Development: Philosophy

## Overview

```mermaid
flowchart TD
    subgraph "What"
        G[Goal: Integrity]
        D[Definition: Existence + Decision]
    end
    
    subgraph "How"
        C[Conditions: Externalize, Access, Verify]
        V[Verification: Traceability + Testing]
        O[Observer: Finite, Handoff]
        T[Continuity: Time, Sessions, Change]
        R[Recovery: Detect, Restore]
    end
    
    G --> D --> C --> V --> O --> T --> R
```

| Question | Section |
|----------|---------|
| What do we pursue? | 1. Integrity |
| What is it? | 2. Definition |
| What makes it possible? | 3. Conditions |
| How do we verify it? | 4. Verification |
| Who maintains it? | 5. Observer |
| How does it persist? | 6. Continuity |
| What if it breaks? | 7. Recovery |

---

## 1. Integrity

A system that can be trusted. A system where every part can justify its existence and no part contradicts another.

Why integrity matters:

| Without Integrity | With Integrity |
|-------------------|----------------|
| "Why does this exist?" has no answer | Every part traces to its origin |
| Changes break things unpredictably | Changes propagate systematically |
| Knowledge lives in people's heads | Knowledge is externalized and accessible |
| AI guesses from code alone | AI follows explicit reasoning chains |

Integrity is not documentation for its own sake. It is the foundation for trustworthy systems and effective collaborationâ€”human or AI.

---

## 2. Definition

Integrity has two dimensions:

### 2.1 Existence

Every artifact can answer: **"Why do I exist?"**

```
Design decision â†’ derives from â†’ Requirement â†’ aligns to â†’ Foundation
```

If an artifact cannot trace to its origin, it is unjustified. It may be correct, but we cannot know why.

### 2.2 Decision

Every non-obvious choice can answer: **"Why this form, not another?"**

Existence traceability alone is insufficient:

| Existence | Decision |
|-----------|----------|
| "This requirement exists because of the foundation" | "This requirement is worded this way because..." |
| "This design derives from REQ-005" | "We chose token bucket over sliding window because..." |

A system can have perfect existence links yet lose integrity if decision reasoning is lost.

### 2.3 Live Context

Integrity enables **live context**: the ability to answer "why" at any point in time, by any observer.

```
Live Context = Externalized Existence + Externalized Decisions
```

If reasoning exists only in someone's head (or a lost context window), there is no live context. The system may function, but its integrity cannot be verified.

---

## 3. Conditions

Integrity does not happen automatically. Three preconditions must be met.

### 3.1 Externalization

Everything relevant must be recorded outside the observer:

| Must Externalize | Why |
|------------------|-----|
| **Artifacts** | The "what" at each abstraction level |
| **Decisions** | The "why this choice" reasoning |
| **Assumptions** | The "given that" conditions |

**Principle:** If it is not externalized, it does not exist for integrity purposes.

What stays internal (in someone's head, in a lost session) cannot be traced, verified, or maintained.

### 3.2 Accessibility

Externalized information must be:

- **Discoverable** â€” can be found when needed
- **Readable** â€” can be understood by the observer
- **Current** â€” reflects actual state, not historical snapshots

Externalization without accessibility is documentation theater.

### 3.3 Verifiability

Integrity claims must be checkable:

- Links can be followed and validated
- Consistency can be tested
- Gaps can be detected

If you cannot verify integrity, you cannot trust it.

---

## 4. Verification

Verifiability (Â§3.3) establishes that integrity must be checkable. This section defines how verification works.

### 4.1 Dual Dimensions

Integrity verification requires two complementary approaches:

| Dimension | Question | Method | Nature |
|-----------|----------|--------|--------|
| **Traceability** | Why does this exist? | Link verification | Static |
| **Testing** | Does this work as intended? | Execution verification | Dynamic |

Both are necessary:

```
Traceability alone: "Links exist" â€” but maybe code doesn't work
Testing alone:      "Code works" â€” but maybe it shouldn't exist

Integrity = Traceability + Testing
```

### 4.2 Executable Specification

Â§3.1 states: "If it is not externalized, it does not exist for integrity purposes."

This applies to verification criteria:

```
Before: "This code is correct" (in developer's head)
After:  "This test passes" (externalized, executable)
```

Tests are executable specifications â€” externalized, verifiable criteria for correctness.

Writing verification criteria before implementation prevents the test from being shaped by the solution.

### 4.3 Abstraction Matching

Each artifact answers a different question. Verification must match the abstraction level:

| Artifact | Answers | Verification Type |
|----------|---------|-------------------|
| Foundation | What is this? | Human judgment |
| Requirements | What must it do? | Behavioral (black-box) |
| Design | How will it do it? | Structural (white-box) |
| Implementation | (Realizes Design) | (Structural tests) |

Implementation is not a separate artifact. Code requires no independent traceability.

**Why matching matters:**

Requirements define WHAT â€” verification must confirm behavior exists, independent of implementation.

Design defines HOW â€” verification must confirm the specific structure works.

Cross-level mismatch creates problems:

| Mismatch | Problem |
|----------|---------|
| Structural test â†’ Requirements | Implementation change breaks test (false negative) |
| Behavioral test â†’ Design | Design change goes undetected (false positive) |

### 4.4 Scope Direction

Verification scope follows the dependency chain:

```
Foundation â†’ Requirements â†’ Design â†’ Implementation
   (Why)        (What)       (How)     (Code)

        â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â†’
              downstream depends on upstream
```

| Change Location | Verification Required |
|-----------------|----------------------|
| Upstream (Foundation, Requirements) | Reverify all downstream |
| Downstream (Design, Implementation) | Upstream unaffected if behavioral tests pass |

This is why changing HOW without changing WHAT preserves integrity â€” if behavioral verification still passes, requirements are still met.

For how artifact changes trigger re-verification, see Â§6.3 Change Propagation.

---

## 5. Observer

### 5.1 No Omniscient Observer

Traditional documentation assumes an omniscient observer who:
- Remembers all decisions ever made
- Sees the entire system at once
- Maintains consistency automatically

This observer does not exist.

In reality:
- Humans forget
- AI sessions are stateless
- Teams have partial views
- Time erodes memory

**Integrity must be maintainable by finite, forgetful, partial observers.**

### 5.2 Observer Requirements

Any observer (human or AI) must be able to:

| Capability | Enabled By |
|------------|------------|
| Recover prior reasoning | Externalized decisions |
| Verify current state | Explicit traceability links |
| Continue incomplete work | State persistence |
| Hand off to another observer | Handoff protocols |

If the system requires omniscience, it will fail.

### 5.3 Handoff

When one observer transfers work to another:

- Current state must be explicit
- Completed vs. incomplete must be clear
- Open questions must be visible
- Assumptions must be stated

Handoff applies to:
- Person â†’ Person
- Session â†’ Session (same AI)
- Agent â†’ Agent (multi-agent)
- Past self â†’ Future self

The mechanism varies. The requirement is constant.

---

## 6. Continuity

### 6.1 Across Time

Integrity at time T does not guarantee integrity at time T+1.

Threats to temporal integrity:

| Threat | Example |
|--------|---------|
| **Drift** | Small changes accumulate into inconsistency |
| **Decay** | Reasoning is forgotten, only artifacts remain |
| **Divergence** | Parallel changes create contradictions |

Integrity must be actively maintained, not assumed.

### 6.2 Across Sessions and Agents

Each session or agent has limited context. Integrity persists when:

- State is externalized before session ends
- Next session can recover full context
- No implicit dependencies on session memory

**The test:** Can a new observer, with no prior involvement, verify and continue the work using only externalized information?

### 6.3 Change Propagation

When something changes, integrity requires systematic propagation:

```
Change in Origin â†’ Re-verify Dependents â†’ Update or Remove
```

Propagation rules:

| Change Type | Action |
|-------------|--------|
| Addition | May require new dependents |
| Modification | Dependents must be re-verified |
| Deletion | Dependents become orphaned; must be re-justified or removed |

Change propagation is not a separate practice. It emerges from maintaining integrity over time.

For verification scope during change, see Â§4.4 Scope Direction.

---

## 7. Recovery

Integrity will break. Systems are inherited incomplete. Changes introduce inconsistencies. Sessions end abruptly. The question is not whether, but when and how to respond.

### 7.1 Detection

Broken integrity manifests as:

| Signal | Meaning |
|--------|---------|
| Orphaned artifacts | No traceable origin |
| Broken links | Origin no longer exists or contradicts |
| Missing reasoning | "Why" has no answer |
| Contradictions | Parts conflict with each other |
| Failing verification | Behavioral or structural tests fail |

Detection requires active verification, not passive assumption.

### 7.2 Restoration

When integrity breaks:

1. **Isolate** â€” Identify the scope of breakage
2. **Trace** â€” Find what can still be verified
3. **Reconstruct** â€” Re-establish missing links or reasoning
4. **Verify** â€” Confirm integrity is restored (both traceability and testing)

Partial integrity is better than none. Restore incrementally.

### 7.3 Inheriting Broken Systems

When you inherit a system without integrity:

- Do not assume integrity exists
- Do not invent false traceability
- Start verification from what is observable
- Build integrity forward, not backward

Pretending integrity exists is worse than admitting it does not.
