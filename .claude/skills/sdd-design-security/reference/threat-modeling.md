# REQ-Based Threat Modeling

How to derive threats from requirements.

## REQ → Threat Mapping

| REQ Feature | Potential Threats |
|-------------|-------------------|
| User input | Injection, overflow, format attacks |
| Display user content | XSS, content spoofing |
| Code execution | Arbitrary code, resource exhaustion |
| File handling | Path traversal, malicious upload |
| Authentication | Credential theft, session hijacking |

## Process

### 1. List Attack Surfaces

From each REQ, extract:
- What can user provide? (input)
- What is rendered from user data? (output)
- What code runs based on user action? (execution)

### 2. Apply STRIDE (Simplified)

For frontend, focus on:

| Category | Question | Common in Frontend |
|----------|----------|--------------------|
| **S**poofing | Can user pretend to be another? | Session handling |
| **T**ampering | Can user modify data? | Input validation |
| **R**epudiation | (Less relevant to frontend) | — |
| **I**nformation Disclosure | Can user access hidden data? | Error messages |
| **D**enial of Service | Can user crash/freeze the app? | Resource exhaustion |
| **E**levation of Privilege | Can user gain more access? | Authorization checks |

### 3. Rate Impact and Likelihood

| Impact | Definition |
|--------|------------|
| Critical | Data breach, full compromise |
| High | Significant data exposure, persistent XSS |
| Medium | Limited exposure, reflected XSS |
| Low | Minor information leak |

| Likelihood | Definition |
|------------|------------|
| High | No skill required, easily discoverable |
| Medium | Some knowledge needed |
| Low | Requires expertise, unlikely path |

## @derives Format

```markdown
### Threat Model

@derives: REQ-XXX, REQ-YYY

| Threat | Vector | Impact | Likelihood |
|--------|--------|--------|------------|
| XSS via props | User enters `<script>` in text prop | Medium | Medium |

- REQ-XXX: Props playground accepts user input → XSS risk
- REQ-YYY: Code editor allows arbitrary code → execution risk
```

## Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Generic threat list | Not actionable | Tie each to specific REQ |
| Missing REQ features | Incomplete coverage | Systematic REQ review |
| Over-engineering | Threats for non-REQ features | Only REQ-derived threats |
| No impact rating | Can't prioritize | Rate every threat |
