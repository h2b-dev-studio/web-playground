/**
 * CheckboxControl - Boolean prop control
 * @derives REQ-REACT-002
 */
import React from 'react';
import { PropSchema } from '../../../types/props';

interface CheckboxControlProps {
  schema: PropSchema;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function CheckboxControl({ schema, value, onChange }: CheckboxControlProps) {
  return (
    <div
      data-testid={`prop-control-${schema.name}`}
      className="prop-control prop-control--checkbox"
    >
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="checkbox-input"
        />
        <span className="checkbox-text">{schema.label || schema.name}</span>
      </label>
      {schema.description && (
        <p className="control-description">{schema.description}</p>
      )}
    </div>
  );
}
