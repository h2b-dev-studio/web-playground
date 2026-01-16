/**
 * PropsPlayground - Interactive props manipulation panel
 * @derives REQ-REACT-002
 */
import React from 'react';
import { PropsPlaygroundProps } from '../../types/props';
import { CheckboxControl } from './controls/CheckboxControl';
import { TextControl } from './controls/TextControl';
import { NumberControl } from './controls/NumberControl';
import { SelectControl } from './controls/SelectControl';

export function PropsPlayground({ value, onChange, schema }: PropsPlaygroundProps) {
  const handlePropChange = (propName: string, propValue: unknown) => {
    onChange({ ...value, [propName]: propValue });
  };

  return (
    <div data-testid="props-playground" className="props-playground">
      <h3 className="playground-title">Props</h3>
      <div className="props-controls">
        {schema.map((propSchema) => {
          const propValue = value[propSchema.name] ?? propSchema.default;

          switch (propSchema.type) {
            case 'boolean':
              return (
                <CheckboxControl
                  key={propSchema.name}
                  schema={propSchema}
                  value={propValue as boolean}
                  onChange={(v) => handlePropChange(propSchema.name, v)}
                />
              );
            case 'string':
              return (
                <TextControl
                  key={propSchema.name}
                  schema={propSchema}
                  value={propValue as string}
                  onChange={(v) => handlePropChange(propSchema.name, v)}
                />
              );
            case 'number':
              return (
                <NumberControl
                  key={propSchema.name}
                  schema={propSchema}
                  value={propValue as number}
                  onChange={(v) => handlePropChange(propSchema.name, v)}
                />
              );
            case 'enum':
              return (
                <SelectControl
                  key={propSchema.name}
                  schema={propSchema}
                  value={propValue as string}
                  onChange={(v) => handlePropChange(propSchema.name, v)}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
