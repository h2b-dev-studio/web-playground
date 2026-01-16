/**
 * TextControl - String prop control
 * @derives REQ-REACT-002
 */
import React from 'react';
import { PropSchema } from '../../../types/props';

interface TextControlProps {
  schema: PropSchema;
  value: string;
  onChange: (value: string) => void;
}

export function TextControl({ schema, value, onChange }: TextControlProps) {
  return (
    <div
      data-testid={`prop-control-${schema.name}`}
      className="prop-control prop-control--text"
    >
      <label className="control-label">
        <span className="label-text">{schema.label || schema.name}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={1000}
          className="text-input"
        />
      </label>
      {schema.description && (
        <p className="control-description">{schema.description}</p>
      )}
    </div>
  );
}
