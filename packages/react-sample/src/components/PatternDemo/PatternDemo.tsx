/**
 * PatternDemo - Main demo component with live preview, props playground, and code panel
 * @derives REQ-REACT-001, REQ-REACT-002, REQ-REACT-003, REQ-REACT-004
 */
import React, { useState, useMemo, useCallback } from 'react';
import { Pattern } from '../../types/props';
import { LivePreview } from './LivePreview';
import { PropsPlayground } from '../PropsPlayground';
import { CodePanel } from '../CodePanel';
import { CodeEditor } from '../CodePanel/CodeEditor';

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
  const [activeHook, setActiveHook] = useState<string>(
    pattern.editableHooks?.[0]?.name || ''
  );
  const [editedCode, setEditedCode] = useState<string>('');

  // Get current hook being edited
  const currentHook = useMemo(() => {
    return pattern.editableHooks?.find((h) => h.name === activeHook);
  }, [pattern.editableHooks, activeHook]);

  // Reset state when pattern changes
  React.useEffect(() => {
    setProps(initialProps);
    setCodeError(null);
    if (pattern.editableHooks?.[0]) {
      setActiveHook(pattern.editableHooks[0].name);
      setEditedCode(pattern.editableHooks[0].code);
    }
  }, [initialProps, pattern.id, pattern.editableHooks]);

  // Update edited code when switching hooks
  React.useEffect(() => {
    if (currentHook) {
      setEditedCode(currentHook.code);
      setCodeError(null);
    }
  }, [currentHook]);

  const handleCodeChange = useCallback((code: string) => {
    setEditedCode(code);
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

  const handleReset = useCallback(() => {
    if (currentHook) {
      setEditedCode(currentHook.code);
      setCodeError(null);
    }
  }, [currentHook]);

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
          <LivePreview pattern={pattern} props={props} editedCode={editedCode} activeHook={activeHook} />

          {/* Show code editor for editable patterns */}
          {pattern.editable && pattern.editableHooks && (
            <div className="editable-section">
              {/* Hook tabs */}
              <div className="hook-tabs">
                {pattern.editableHooks.map((hook) => (
                  <button
                    key={hook.name}
                    data-testid={`hook-tab-${hook.name}`}
                    className={`hook-tab ${activeHook === hook.name ? 'hook-tab--active' : ''}`}
                    onClick={() => setActiveHook(hook.name)}
                  >
                    {hook.name}
                  </button>
                ))}
              </div>

              {/* Code editor */}
              <CodeEditor
                value={editedCode}
                onChange={handleCodeChange}
                onReset={handleReset}
              />
              {/* Error display is handled by the Demo component */}
            </div>
          )}
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
        editable={false}
        onCodeChange={() => {}}
        codeError={null}
      />
    </div>
  );
}
