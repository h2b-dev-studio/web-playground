# Props Interface Design for SDD

Props interfaces are **contracts** that derive from requirements. Design them to satisfy REQs.

## REQ → Props Mapping

### Step 1: Extract Props from REQ

| REQ Says | Props Implication |
|----------|-------------------|
| "user can X" | Action callback: `onX` |
| "displays Y" | Data prop: `y: Type` |
| "configurable Z" | Option prop: `z?: Type` |
| "default to W" | Default value: `w = default` |
| "real-time update" | Controlled: `value` + `onChange` |

### Step 2: Determine Control Mode

| REQ Characteristic | Pattern | Props |
|--------------------|---------|-------|
| Parent must know current value | Controlled | `value`, `onChange` |
| Internal state OK | Uncontrolled | `defaultValue` |
| Both needed | Hybrid | All three |

**Hybrid example:**
```tsx
interface InputProps {
  // Uncontrolled
  defaultValue?: string;
  
  // Controlled  
  value?: string;
  onChange?: (value: string) => void;
}
```

## Props Documentation Template

```tsx
interface {Component}Props {
  /**
   * @derives REQ-XXX - {brief reason}
   */
  {prop}: {type};
}
```

**Example:**
```tsx
interface PropsPlaygroundProps {
  /**
   * @derives REQ-002 - "manipulate component props in real-time"
   */
  value: Record<string, unknown>;
  
  /**
   * @derives REQ-002 - "changing control immediately updates demo"
   */
  onChange: (props: Record<string, unknown>) => void;
  
  /**
   * @derives REQ-002 - Control mapping (boolean→checkbox, etc.)
   */
  schema: PropSchema[];
}
```

## Verification

For each prop, verify:

- [ ] Maps to specific REQ or is standard extension (className, children)
- [ ] Type matches REQ's domain language
- [ ] Required/optional matches REQ's "must" vs "can"
- [ ] Controlled/uncontrolled matches REQ's update behavior

## Anti-Patterns

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| Props not in any REQ | Scope creep | Remove or trace to REQ |
| `any` type | Loses REQ constraints | Type from REQ's domain |
| Too many required | Inflexible | Check if REQ requires all |
| Missing callback | Can't satisfy "real-time" REQ | Add onChange |
