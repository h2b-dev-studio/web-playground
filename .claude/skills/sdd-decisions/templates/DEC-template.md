---
id: DEC-{NNN}
title: "{Decision Title}"
date: {YYYY-MM-DD}
status: active  # DEC status: active | superseded (separate from item status)
supersedes: null
related_items:
  - "{REQ-NNN or Design section}"
---

# {Decision Title}

## Context

{What situation led to this decision? What problem needed solving?}

## Decision

{What was decided? State it clearly in 1-2 sentences.}

## Alternatives Considered

### Option A: {Name}

{Brief description}

**Pros:**
- {advantage}

**Cons:**
- {disadvantage}

### Option B: {Name} ← Selected

{Brief description}

**Pros:**
- {advantage}

**Cons:**
- {disadvantage}

### Option C: {Name}

{Brief description}

**Pros:**
- {advantage}

**Cons:**
- {disadvantage}

## Rationale

{Why was Option B selected? What factors were decisive?}

## Impacts

| Area | Impact |
|------|--------|
| {Component/REQ} | {How it's affected} |
| {Performance} | {Expected effect} |
| {Maintainability} | {Expected effect} |

## Assumptions

{List any assumptions this decision depends on. Reference ASM-NNN if formal.}

- {assumption 1}
- {assumption 2}

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| {risk} | Low/Medium/High | {mitigation strategy} |

## Review Triggers

{When should this decision be revisited?}

- If {condition}, reconsider
- After {milestone}, evaluate effectiveness
