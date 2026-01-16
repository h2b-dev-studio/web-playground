/**
 * Custom Hooks Demo - useToggle and useDebounce
 * @derives REQ-REACT-001, REQ-REACT-004
 */
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Default hook implementations
function useToggleDefault(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((prev) => !prev), []);
  return [value, toggle] as const;
}

function useDebounceDefault<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

interface DemoProps {
  delay: number;
  initialToggle: boolean;
  customUseToggle?: (initialValue: boolean) => readonly [boolean, () => void];
  customUseDebounce?: <T>(value: T, delay: number) => T;
}

export function Demo({
  delay,
  initialToggle,
  customUseToggle,
  customUseDebounce,
}: DemoProps) {
  // Use custom hooks if provided, otherwise use defaults
  const useToggle = customUseToggle || useToggleDefault;
  const useDebounce = customUseDebounce || useDebounceDefault;

  // useToggle demo
  const [isOn, toggle] = useToggle(initialToggle);

  // useDebounce demo
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, delay);
  const [searchCount, setSearchCount] = useState(0);

  useEffect(() => {
    if (debouncedValue) {
      setSearchCount((c) => c + 1);
    }
  }, [debouncedValue]);

  return (
    <div className="custom-hooks-demo">
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
