/**
 * SelectControl - Enum/union prop control
 * @derives REQ-REACT-002
 */
import React from 'react';
import { PropSchema } from '../../../types/props';

interface SelectControlProps {
  schema: PropSchema;
  value: string;
  onChange: (value: string) => void;
}

export function SelectControl({ schema, value, onChange }: SelectControlProps) {
  return (
    <div
      data-testid={`prop-control-${schema.name}`}
      className="prop-control prop-control--select"
    >
      <label className="control-label">
        <span className="label-text">{schema.label || schema.name}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="select-input"
        >
          {schema.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {schema.description && (
        <p className="control-description">{schema.description}</p>
      )}
    </div>
  );
}
