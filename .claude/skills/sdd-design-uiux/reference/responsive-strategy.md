# REQ-Based Responsive Strategy

How to derive responsive decisions from requirements.

## REQ → Breakpoint Mapping

| REQ Says | Breakpoint Implication |
|----------|------------------------|
| "works on mobile" | Must define mobile breakpoint |
| "desktop and tablet" | At least 2 breakpoints |
| "mobile-first" | Start with mobile, enhance up |
| "side-by-side" | Needs width for 2 columns |
| "stacked on small screens" | Collapse point defined |

## Decision Framework

### 1. Extract Viewport REQs

From requirements, find:
- Explicit viewport mentions
- Layout descriptions implying screen size
- "responsive" or "adaptive" keywords

### 2. Determine Strategy

| REQ Pattern | Strategy |
|-------------|----------|
| "same content, different layout" | Responsive (CSS-based) |
| "different features per device" | Adaptive (JS-based) |
| "mobile shows subset" | Progressive disclosure |

### 3. Define Breakpoints

**Only add breakpoints that REQs require:**

| If REQ mentions | Add breakpoint |
|-----------------|----------------|
| Mobile | <768px |
| Tablet | 768-1023px |
| Desktop | ≥1024px |
| Large desktop | ≥1440px (only if REQ specifies) |

**Don't add breakpoints "just in case"** — each must trace to a REQ.

## @derives Format

```markdown
### Responsive Breakpoints

@derives: REQ-XXX

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Desktop | ≥1024px | Side-by-side panels |
| Mobile | <768px | Stacked, code hidden |

- REQ-XXX says "side-by-side on desktop" → Desktop breakpoint
- REQ-XXX says "code hidden by default on mobile" → Mobile behavior
```

## Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| 5+ breakpoints | Over-engineering | Only REQ-required breakpoints |
| No @derives | Can't verify | Link each breakpoint to REQ |
| "Standard breakpoints" | Not REQ-driven | Justify from requirements |
| Missing collapse behavior | Incomplete spec | Define what changes at each |
