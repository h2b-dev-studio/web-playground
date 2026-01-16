/**
 * PatternDemo - Main demo component with live preview, props playground, and code panel
 * @derives REQ-REACT-001, REQ-REACT-002, REQ-REACT-003, REQ-REACT-004
 */
import React, { useState, useMemo, useCallback } from 'react';
import { Pattern } from '../../types/props';
import { LivePreview } from './LivePreview';
import { PropsPlayground } from '../PropsPlayground';
import { CodePanel } from '../CodePanel';

interface PatternDemoProps {
  pattern: Pattern;
}

export function PatternDemo({ pattern }: PatternDemoProps) {
  // Initialize props from schema defaults
  const initialProps = useMemo(() => {
    const props: Record<string, unknown> = {};
    pattern.schema.forEach((prop) => {
      props[prop.name] = prop.default;
    });
    return props;
  }, [pattern.schema]);

  const [props, setProps] = useState<Record<string, unknown>>(initialProps);
  const [codeError, setCodeError] = useState<string | null>(null);

  // Reset props when pattern changes
  React.useEffect(() => {
    setProps(initialProps);
    setCodeError(null);
  }, [initialProps, pattern.id]);

  const handleCodeChange = useCallback((code: string) => {
    // Validate the code by trying to parse it
    try {
      // Basic syntax check
      new Function(code);
      setCodeError(null);
    } catch (err) {
      if (err instanceof Error) {
        setCodeError(`SyntaxError: ${err.message}`);
      }
    }
  }, []);

  return (
    <div data-testid="pattern-demo" className="pattern-demo">
      <header className="demo-header">
        <h2 data-testid="demo-title" className="demo-title">
          {pattern.name}
        </h2>
        <p className="demo-description">{pattern.description}</p>
        <span className="demo-category">{pattern.category}</span>
      </header>

      <div className="demo-content">
        <div data-testid="demo-area" className="demo-area">
          <LivePreview pattern={pattern} props={props} />
        </div>

        <PropsPlayground
          value={props}
          onChange={setProps}
          schema={pattern.schema}
        />
      </div>

      <CodePanel
        code={pattern.source}
        language="tsx"
        defaultCollapsed={true}
        editable={pattern.editable}
        editableHooks={pattern.editableHooks}
        onCodeChange={handleCodeChange}
        codeError={codeError}
      />
    </div>
  );
}
