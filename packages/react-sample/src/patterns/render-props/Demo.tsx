/**
 * Render Props Demo - Toggle
 * @derives REQ-REACT-001
 */
import React, { useState, ReactNode } from 'react';

interface ToggleProps {
  initialValue?: boolean;
  children: (props: { on: boolean; toggle: () => void }) => ReactNode;
}

function Toggle({ initialValue = false, children }: ToggleProps) {
  const [on, setOn] = useState(initialValue);
  const toggle = () => setOn((prev) => !prev);

  return <>{children({ on, toggle })}</>;
}

interface DemoProps {
  initialValue: boolean;
}

export function Demo({ initialValue }: DemoProps) {
  return (
    <div className="render-props-demo">
      <Toggle initialValue={initialValue}>
        {({ on, toggle }) => (
          <div className="toggle-demo">
            <span data-testid="toggle-state" className={`toggle-state ${on ? 'on' : 'off'}`}>
              {on ? 'ON' : 'OFF'}
            </span>
            <button
              data-testid="toggle-button"
              onClick={toggle}
              className="toggle-button"
            >
              Toggle
            </button>
          </div>
        )}
      </Toggle>
      <p className="demo-description">
        The Toggle component uses render props to share its state with children.
        The parent controls the UI while Toggle manages the state logic.
      </p>
    </div>
  );
}
