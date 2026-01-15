# Library Evaluation for SDD

How to evaluate library candidates from frontend and make final selections.

## Evaluation Process

### 1. Get Candidates from Frontend

Frontend provides:

| Purpose | Candidates | Notes for Perf |
|---------|------------|----------------|
| Syntax highlighting | prism-react-renderer, shiki | prism tree-shakable |

### 2. Measure Each Candidate

For each candidate:

```bash
# Check bundlephobia
https://bundlephobia.com/package/{package-name}

# Or measure locally
npm install {package}
npx size-limit
```

Record:
- Minified size
- Gzipped size
- Tree-shakable?
- Side effects?

### 3. Compare Against Budget

| Candidate | Gzip | Tree-shake | Fits Budget? |
|-----------|------|------------|--------------|
| lib-a | 5KB | Yes | ✓ |
| lib-b | 25KB | No | ✗ |

### 4. Make Selection

**Selection priority:**
1. Must fit budget (hard requirement)
2. Tree-shakable preferred
3. Smaller wins if equivalent
4. No security issues (check with security)

## @derives Format

```markdown
### Library Selection

@derives: CONSTRAINT-LIGHTWEIGHT

| Purpose | Selected | Size | Rejected | Reason |
|---------|----------|------|----------|--------|
| Syntax highlighting | prism-react-renderer | 6KB | shiki (45KB), highlight.js (15KB) | Smallest, tree-shakable |

- CONSTRAINT-LIGHTWEIGHT requires ~10KB total for deps
- prism-react-renderer (6KB) + react-simple-code-editor (3KB) = 9KB ✓
```

## Size Estimation Table

Common library sizes (gzip):

| Library | Size | Use Case |
|---------|------|----------|
| prism-react-renderer | ~6KB | Syntax highlighting |
| highlight.js | ~15KB | Syntax highlighting (heavier) |
| shiki | ~45KB | Syntax highlighting (heaviest) |
| Monaco Editor | ~500KB+ | Full IDE |
| react-simple-code-editor | ~3KB | Basic code editing |
| CodeMirror 6 | ~100KB+ | Advanced code editing |

## Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| No measurement | Guessing sizes | Always verify with bundlephobia |
| Ignoring tree-shaking | Actual size larger | Check if tree-shakable |
| Budget after selection | May not fit | Budget first, then select |
| One option only | No comparison | Frontend should provide 2-3 options |
