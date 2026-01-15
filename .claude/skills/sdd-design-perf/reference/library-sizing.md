# Library Sizes Reference

Common frontend library sizes for comparison.

> **Note:** Sizes are approximate and change with versions. Always verify with bundlephobia.com.

## Frameworks

| Library | Gzip Size | Notes |
|---------|-----------|-------|
| react + react-dom | ~45KB | Core |
| preact | ~4KB | React-compatible alternative |
| vue | ~34KB | With compiler |
| svelte | ~2KB | Runtime only |

## Syntax Highlighting

| Library | Gzip Size | Notes |
|---------|-----------|-------|
| prism-react-renderer | ~6KB | Minimal, tree-shakable |
| highlight.js (core) | ~30KB | + languages |
| shiki | ~1MB | WASM, full themes |
| Monaco (editor) | ~2.5MB | Full IDE |

## Code Editors

| Library | Gzip Size | Notes |
|---------|-----------|-------|
| react-simple-code-editor | ~2KB | Minimal |
| CodeMirror 6 | ~150KB | Full features |
| Monaco | ~2.5MB | VS Code engine |

## Utilities

| Library | Gzip Size | Notes |
|---------|-----------|-------|
| lodash (full) | ~71KB | Use specific imports |
| lodash-es (tree-shake) | ~6KB | Only imported functions |
| date-fns | ~14KB | Tree-shakable |
| moment | ~72KB | Not tree-shakable |

## State Management

| Library | Gzip Size | Notes |
|---------|-----------|-------|
| zustand | ~1KB | Minimal |
| jotai | ~3KB | Atomic |
| redux + react-redux | ~15KB | Full solution |
| mobx + mobx-react | ~50KB | Observable |

## UI Components

| Library | Gzip Size | Notes |
|---------|-----------|-------|
| radix-ui (per component) | ~2-5KB | Headless |
| shadcn/ui | ~0KB | Copy-paste, no runtime |
| MUI (full) | ~300KB | Use tree-shaking |
| Ant Design (full) | ~400KB | Heavy |

## Selection Guidelines

### For Size-Constrained Projects

| Need | Recommendation |
|------|----------------|
| Syntax highlighting | prism-react-renderer |
| Code editing | react-simple-code-editor |
| Date handling | date-fns or native Intl |
| State | useState or zustand |
| UI | Headless (radix) + custom styling |

### Size vs Features Trade-off

```
Minimal ←────────────────────────────→ Full-featured
  2KB                                    2.5MB
  
react-simple-code-editor → CodeMirror → Monaco
```

**Decision framework:**
1. What features does REQ actually require?
2. What's the smallest library providing those features?
3. Does it fit the budget?
