/**
 * NumberControl - Number prop control
 * @derives REQ-REACT-002
 */
import React from 'react';
import { PropSchema } from '../../../types/props';

interface NumberControlProps {
  schema: PropSchema;
  value: number;
  onChange: (value: number) => void;
}

export function NumberControl({ schema, value, onChange }: NumberControlProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseFloat(e.target.value);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  return (
    <div
      data-testid={`prop-control-${schema.name}`}
      className="prop-control prop-control--number"
    >
      <label className="control-label">
        <span className="label-text">{schema.label || schema.name}</span>
        <input
          type="number"
          value={value}
          onChange={handleChange}
          min={schema.min}
          max={schema.max}
          className="number-input"
        />
      </label>
      {schema.description && (
        <p className="control-description">{schema.description}</p>
      )}
    </div>
  );
}
