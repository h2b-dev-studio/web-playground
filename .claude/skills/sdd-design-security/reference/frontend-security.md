# Frontend Security Patterns for SDD

Common security controls for frontend applications.

## Input Validation

### By Input Type

| Input Type | Validation | Example |
|------------|------------|---------|
| String | Length limit, character whitelist | `maxLength: 100, pattern: /^[a-zA-Z0-9]+$/` |
| Number | Range, integer check | `min: 0, max: 100, integer: true` |
| Enum | Whitelist | `oneOf: ['small', 'medium', 'large']` |
| Boolean | Type check | `typeof value === 'boolean'` |

### Validation Location

| Location | When to Use |
|----------|-------------|
| Component props | Type safety, development errors |
| Event handlers | User input sanitization |
| Before render | Prevent XSS |

## XSS Prevention

### By Content Type

| Content | Safe Method | Unsafe |
|---------|-------------|--------|
| Text in element | `textContent`, React JSX | `innerHTML` |
| Attribute value | Quoted attribute | Unquoted, `javascript:` |
| URL | URL validation | User-controlled protocol |
| CSS | Sanitized values | `expression()`, user CSS |

### React-Specific

| Pattern | Safe | Unsafe |
|---------|------|--------|
| Rendering | `{variable}` | `dangerouslySetInnerHTML` |
| Links | Validate protocol | `href={userInput}` |
| Styles | Object syntax | String interpolation |

## Code Execution Controls

### Approaches (safest to riskiest)

| Approach | Safety | Functionality | Use When |
|----------|--------|---------------|----------|
| No eval | Safest | Limited | Possible to avoid |
| Restricted scope | Medium | Good | Need user code |
| Full sandbox (iframe) | Safe if isolated | Full | Untrusted code |
| eval() | Unsafe | Full | Never in browser |

### Restricted Scope Pattern

```javascript
// Create restricted context
const safeGlobals = {
  console: { log: console.log },
  Math,
  // NO: window, document, fetch, eval
};

const fn = new Function(...Object.keys(safeGlobals), userCode);
fn(...Object.values(safeGlobals));
```

### Timeout Pattern

```javascript
const worker = new Worker(blob);
const timeout = setTimeout(() => worker.terminate(), 5000);
worker.onmessage = () => clearTimeout(timeout);
```

## Error Handling Security

| Do | Don't |
|----|-------|
| Generic user messages | Expose stack traces |
| Log details server-side | Show internal paths |
| Sanitize before display | Render error objects |

## @derives Connection

Always connect controls to threats:

```markdown
### Input Validation

@derives: REQ-002

| Input | Validation | Threat Mitigated |
|-------|------------|------------------|
| Text prop | Length ≤100, escaped | XSS, overflow |

Mitigates: XSS via props (Threat Model §1)
```
