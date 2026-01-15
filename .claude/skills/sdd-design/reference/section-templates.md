# Section Templates

Detailed structure for each design section. Specialists reference these when writing.

## Component Architecture (frontend)

```markdown
## Component Architecture

@derives: {REQ-IDs}

### Component Hierarchy

```
{Root}
├── {Component}
│   ├── {Child}
│   └── {Child}
└── {Component}
```

### Component Responsibilities

| Component | Responsibility | Props | State |
|-----------|----------------|-------|-------|
| | | | |

### State Management

**Strategy:** {local state / context / external store}

| State | Location | Consumers |
|-------|----------|-----------|
| | | |

### Data Flow

```
{Source} → {Transform} → {Component} → {Render}
```

### File Structure

```
src/
├── components/
│   ├── {Feature}/
│   │   ├── index.ts
│   │   ├── {Component}.tsx
│   │   └── {Component}.test.tsx
```

### Dependencies

| Library | Purpose | Size | Alternative Considered |
|---------|---------|------|------------------------|
| | | | |

**Status:** draft
```

## UI/UX Design (uiux)

```markdown
## UI/UX Design

@derives: {REQ-IDs}

### Layout Structure

```
┌─────────────────────────────────┐
│           Header                │
├─────────────┬───────────────────┤
│   Sidebar   │    Main Content   │
│             │                   │
└─────────────┴───────────────────┘
```

### Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Desktop | ≥1024px | |
| Tablet | 768-1023px | |
| Mobile | <768px | |

### Interaction Patterns

| Action | Trigger | Feedback | Duration |
|--------|---------|----------|----------|
| | | | |

### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Keyboard navigation | |
| Screen reader | |
| Color contrast | |
| Focus indicators | |

### Visual Hierarchy

1. **Primary:** {what draws attention first}
2. **Secondary:** {supporting content}
3. **Tertiary:** {supplementary info}

**Status:** draft
```

## Security Considerations (security)

```markdown
## Security Considerations

@derives: {REQ-IDs}

### Threat Model

| Threat | Vector | Impact | Mitigation |
|--------|--------|--------|------------|
| | | | |

### Input Validation

| Input Source | Validation | Sanitization |
|--------------|------------|--------------|
| | | |

### Code Execution (if applicable)

**Approach:** {sandbox / no eval / restricted scope}

| Risk | Control |
|------|---------|
| Arbitrary code | |
| Infinite loops | |
| Memory exhaustion | |

### XSS Prevention

| Content Type | Strategy |
|--------------|----------|
| User text | |
| Code display | |
| Dynamic HTML | |

### Dependency Security

| Dependency | Known Issues | Mitigation |
|------------|--------------|------------|
| | | |

**Status:** draft
```

## Performance Strategy (perf)

```markdown
## Performance Strategy

@derives: {REQ-IDs}

### Bundle Budget

| Category | Budget | Actual |
|----------|--------|--------|
| Initial JS | | |
| Lazy chunks | | |
| CSS | | |
| Total | | |

### Code Splitting

| Chunk | Contents | Load Trigger |
|-------|----------|--------------|
| main | | immediate |
| | | |

### Lazy Loading

| Resource | Strategy | Threshold |
|----------|----------|-----------|
| | | |

### Render Optimization

| Optimization | Where | Technique |
|--------------|-------|-----------|
| | | |

### Caching Strategy

| Resource | Cache | TTL |
|----------|-------|-----|
| | | |

### Performance Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP | | |
| FID | | |
| CLS | | |

**Status:** draft
```

## Decisions Log Entry Format

Per sdd-guidelines §1.4:

```markdown
| ID | Decision | Rationale | Owner |
|----|----------|-----------|-------|
| DEC-001 | Use {X} for {purpose} | {why — connect to REQ} | {specialist} |
```

**ID format:** `DEC-{NNN}` sequential across all specialists
