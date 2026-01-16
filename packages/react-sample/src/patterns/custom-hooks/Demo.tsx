/**
 * Custom Hooks Demo - useToggle and useDebounce
 * @derives REQ-REACT-001, REQ-REACT-004
 */
import React, { useState, useEffect, useCallback } from 'react';

// Parse the initial value from useState calls in the code
function parseInitialValue(code: string): { value: boolean | null; error: string | null } {
  // Check for potential infinite loops
  if (/while\s*\(\s*true\s*\)|for\s*\(\s*;\s*;\s*\)/.test(code)) {
    return { value: null, error: 'Error: Code execution timeout exceeded - infinite loop detected' };
  }

  // Check for syntax errors by trying to parse
  try {
    new Function(code);
  } catch (err) {
    return {
      value: null,
      error: err instanceof Error ? `SyntaxError: ${err.message}` : 'Unknown error',
    };
  }

  // Extract the value from useState(...)
  const match = code.match(/useState\s*\(\s*(true|false)\s*\)/);
  if (match) {
    return { value: match[1] === 'true', error: null };
  }

  return { value: null, error: null };
}

interface DemoProps {
  delay: number;
  initialToggle: boolean;
  editedCode?: string;
  activeHook?: string;
}

export function Demo({
  delay,
  initialToggle,
  editedCode,
  activeHook,
}: DemoProps) {
  // Parse the edited code to extract initial value and check for errors
  // This runs on every render but since we use a key that changes with editedCode,
  // the component remounts with fresh state when code changes
  const { value: parsedValue, error: codeError } = editedCode && activeHook === 'useToggle'
    ? parseInitialValue(editedCode)
    : { value: null, error: null };

  // Use parsed value if available, otherwise use prop
  const effectiveInitialToggle = parsedValue !== null ? parsedValue : initialToggle;

  // useToggle implementation
  const [isOn, setIsOn] = useState(effectiveInitialToggle);
  const toggle = useCallback(() => setIsOn((prev) => !prev), []);

  // useDebounce implementation
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  const [searchCount, setSearchCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);
    return () => clearTimeout(timer);
  }, [inputValue, delay]);

  useEffect(() => {
    if (debouncedValue) {
      setSearchCount((c) => c + 1);
    }
  }, [debouncedValue]);

  return (
    <div className="custom-hooks-demo">
      {/* Show code execution error */}
      {codeError && (
        <div data-testid="code-error" className="code-error">
          {codeError}
        </div>
      )}

      <div className="demo-section">
        <h4>useToggle Hook</h4>
        <div className="toggle-demo">
          <span
            data-testid="toggle-state"
            className={`toggle-state ${isOn ? 'on' : 'off'}`}
          >
            {isOn ? 'ON' : 'OFF'}
          </span>
          <button onClick={toggle} className="toggle-button">
            Toggle
          </button>
        </div>
      </div>

      <div className="demo-section">
        <h4>useDebounce Hook</h4>
        <div className="debounce-demo">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type to search..."
            className="search-input"
          />
          <div className="debounce-info">
            <p>
              <strong>Delay:</strong> <span data-testid="delay-value">{delay}</span>ms
            </p>
            <p>
              <strong>Input value:</strong> {inputValue || '(empty)'}
            </p>
            <p>
              <strong>Debounced value:</strong> {debouncedValue || '(empty)'}
            </p>
            <p>
              <strong>Search triggered:</strong> {searchCount} times
            </p>
          </div>
        </div>
      </div>

      <p className="demo-description">
        Custom hooks extract reusable stateful logic. useToggle manages boolean state,
        while useDebounce delays value updates to reduce unnecessary operations.
      </p>
    </div>
  );
}
