/**
 * Controlled vs Uncontrolled Demo - TextInput
 * @derives REQ-REACT-001, REQ-REACT-002
 */
import React, { useState, useRef } from 'react';

interface DemoProps {
  placeholder: string;
  disabled: boolean;
}

export function Demo({ placeholder, disabled }: DemoProps) {
  // Controlled input state
  const [controlledValue, setControlledValue] = useState('');
  const [submittedControlled, setSubmittedControlled] = useState('');

  // Uncontrolled input ref
  const uncontrolledRef = useRef<HTMLInputElement>(null);
  const [submittedUncontrolled, setSubmittedUncontrolled] = useState('');

  const handleControlledSubmit = () => {
    setSubmittedControlled(controlledValue);
  };

  const handleUncontrolledSubmit = () => {
    if (uncontrolledRef.current) {
      setSubmittedUncontrolled(uncontrolledRef.current.value);
    }
  };

  return (
    <div className="controlled-demo">
      <div className="demo-section">
        <h4>Controlled Input</h4>
        <p className="section-description">
          React controls the input value. Every change triggers a re-render.
        </p>
        <div className="input-group">
          <input
            type="text"
            value={controlledValue}
            onChange={(e) => setControlledValue(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="text-input"
          />
          <button onClick={handleControlledSubmit} disabled={disabled}>
            Submit
          </button>
        </div>
        <div className="value-display">
          <p>
            <strong>Current value:</strong> {controlledValue || '(empty)'}
          </p>
          <p>
            <strong>Submitted:</strong> {submittedControlled || '(none)'}
          </p>
        </div>
      </div>

      <div className="demo-section">
        <h4>Uncontrolled Input</h4>
        <p className="section-description">
          DOM controls the input value. React reads via ref on demand.
        </p>
        <div className="input-group">
          <input
            ref={uncontrolledRef}
            type="text"
            defaultValue=""
            placeholder={placeholder}
            disabled={disabled}
            className="text-input"
          />
          <button onClick={handleUncontrolledSubmit} disabled={disabled}>
            Submit
          </button>
        </div>
        <div className="value-display">
          <p>
            <strong>Submitted:</strong> {submittedUncontrolled || '(none)'}
          </p>
          <p className="note">
            (Value only accessible via ref, not tracked in React state)
          </p>
        </div>
      </div>

      <p className="demo-description">
        Controlled components give React full control over form data, enabling
        validation and conditional logic. Uncontrolled components are simpler
        but offer less control.
      </p>
    </div>
  );
}
