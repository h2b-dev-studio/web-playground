# Bundle Analysis for SDD

How to analyze bundles and make size-based decisions.

## Tools

| Tool | Use For |
|------|---------|
| `webpack-bundle-analyzer` | Visualize bundle composition |
| `source-map-explorer` | Trace size to source |
| `bundlephobia.com` | Check library size before adding |
| `npm ls` | Dependency tree |

## Analysis Process

### 1. Measure Current State

```bash
# Build with stats
npm run build -- --stats

# Analyze
npx webpack-bundle-analyzer dist/stats.json
```

### 2. Identify Large Dependencies

Look for:
- Libraries >50KB gzip
- Duplicate packages
- Unused exports (if not tree-shaking)

### 3. Compare Alternatives

| Library | Size (gzip) | Tree-shakable | Notes |
|---------|-------------|---------------|-------|
| moment | 72KB | No | Use date-fns |
| lodash | 71KB | Yes (per-fn) | Import specific functions |
| Monaco | 2.5MB | No | Use lighter editor |

## Budget Allocation

### By Project Type

| Type | Initial JS | Total |
|------|------------|-------|
| Landing page | <50KB | <100KB |
| Web app | <150KB | <500KB |
| Complex dashboard | <300KB | <1MB |

### By Category

| Category | Typical % |
|----------|-----------|
| Framework (React) | 40% |
| Libraries | 30% |
| App code | 30% |

## @derives Connection

Always justify budget from requirements:

```markdown
### Bundle Budget

@derives: TECH-LIGHTWEIGHT-DEPS

| Category | Budget | Rationale |
|----------|--------|-----------|
| Initial JS | 100KB | TECH-LIGHTWEIGHT-DEPS: "~10KB for highlighting + editor" leaves 90KB for React + app |
```

## Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| No budget | Creeping size | Set explicit limits |
| Budget without @derives | Arbitrary | Link to REQ/CONSTRAINT |
| Ignoring tree-shaking | Oversized | Check if library supports it |
| Dev dependencies in bundle | Bloat | Check import sources |
