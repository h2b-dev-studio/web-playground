---
id: ASM-{NNN}
title: "{Assumption Title}"
date: {YYYY-MM-DD}
status: active  # ASM status: active | validated | invalidated (separate from item status)
confidence: high | medium | low  # ASM-specific field
dependent_items:
  - "{REQ-NNN, Design section, or DEC-NNN}"
---

# {Assumption Title}

## Assumption

{State what we assume to be true. Be specific and unambiguous.}

## Basis

{Why do we believe this is true?}

- {Evidence or reasoning 1}
- {Evidence or reasoning 2}

## Confidence Level

**{High / Medium / Low}**

| Level | Definition |
|-------|------------|
| High | Strong evidence, unlikely to change |
| Medium | Reasonable belief, some uncertainty |
| Low | Best guess, significant uncertainty |

Justification: {Why this confidence level?}

## Risk if Wrong

{What happens if this assumption proves false?}

| Impact Area | Consequence |
|-------------|-------------|
| {Area 1} | {What would need to change} |
| {Area 2} | {What would need to change} |

**Estimated rework:** {Minimal / Moderate / Significant / Major}

## Invalidation Triggers

{What conditions would prove this assumption false?}

- [ ] {Trigger 1} — Check by {date/milestone}
- [ ] {Trigger 2} — Check by {date/milestone}
- [ ] {Trigger 3} — Monitor continuously

## Dependent Items

{What artifacts rely on this assumption?}

| Item | How it depends |
|------|----------------|
| {REQ-NNN} | {relationship} |
| {Design §Section} | {relationship} |
| {DEC-NNN} | {relationship} |

## Validation Plan

{How and when will we verify this assumption?}

| Method | Timeline | Owner |
|--------|----------|-------|
| {method} | {when} | {who} |

## Contingency

{If invalidated, what's the fallback plan?}

---

## Status History

| Date | Status | Notes |
|------|--------|-------|
| {YYYY-MM-DD} | active | Initial creation |
