export const controlledVsUncontrolledSource = `import React, { useState, useRef } from 'react';

// Controlled TextInput - state is managed by parent
interface ControlledInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ControlledInput({
  value,
  onChange,
  placeholder = '',
  disabled = false,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="controlled-input"
    />
  );
}

// Uncontrolled TextInput - state is managed by DOM
interface UncontrolledInputProps {
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  onSubmit?: (value: string) => void;
}

export function UncontrolledInput({
  defaultValue = '',
  placeholder = '',
  disabled = false,
  onSubmit,
}: UncontrolledInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (inputRef.current && onSubmit) {
      onSubmit(inputRef.current.value);
    }
  };

  return (
    <div className="uncontrolled-wrapper">
      <input
        ref={inputRef}
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        className="uncontrolled-input"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
`;
