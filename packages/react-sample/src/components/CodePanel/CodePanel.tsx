/**
 * CodePanel - Collapsible code display panel
 * @derives REQ-REACT-003, REQ-REACT-004
 */
import React, { useState } from 'react';
import { CodeViewer } from './CodeViewer';
import { CodeEditor } from './CodeEditor';
import { CopyButton } from './CopyButton';
import { EditableHook } from '../../types/props';

interface CodePanelProps {
  code: string;
  language?: 'tsx' | 'ts';
  defaultCollapsed?: boolean;
  editable?: boolean;
  editableHooks?: EditableHook[];
  onCodeChange?: (code: string) => void;
  codeError?: string | null;
}

export function CodePanel({
  code,
  language = 'tsx',
  defaultCollapsed = true,
  editable = false,
  editableHooks,
  onCodeChange,
  codeError,
}: CodePanelProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [activeHook, setActiveHook] = useState<string>(
    editableHooks?.[0]?.name || ''
  );
  const [editedCodes, setEditedCodes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    editableHooks?.forEach((hook) => {
      initial[hook.name] = hook.code;
    });
    return initial;
  });

  const currentHook = editableHooks?.find((h) => h.name === activeHook);
  const currentEditableCode = editedCodes[activeHook] || '';

  const handleCodeChange = (newCode: string) => {
    setEditedCodes((prev) => ({ ...prev, [activeHook]: newCode }));
    onCodeChange?.(newCode);
  };

  const handleReset = () => {
    if (currentHook) {
      setEditedCodes((prev) => ({ ...prev, [activeHook]: currentHook.code }));
      onCodeChange?.(currentHook.code);
    }
  };

  return (
    <div
      data-testid="code-panel"
      data-collapsed={collapsed}
      className={`code-panel ${collapsed ? 'code-panel--collapsed' : ''}`}
    >
      <div className="code-panel-header">
        <button
          data-testid="collapse-button"
          onClick={() => setCollapsed(!collapsed)}
          className="collapse-button"
          aria-expanded={!collapsed}
        >
          {collapsed ? '▶ Show Code' : '▼ Hide Code'}
        </button>
        {!collapsed && <CopyButton text={editable ? currentEditableCode : code} />}
      </div>

      {!collapsed && (
        <div className="code-panel-content">
          {editable && editableHooks && editableHooks.length > 0 ? (
            <>
              <div className="hook-tabs">
                {editableHooks.map((hook) => (
                  <button
                    key={hook.name}
                    data-testid={`hook-tab-${hook.name}`}
                    onClick={() => setActiveHook(hook.name)}
                    className={`hook-tab ${
                      activeHook === hook.name ? 'hook-tab--active' : ''
                    }`}
                  >
                    {hook.name}
                  </button>
                ))}
              </div>
              <CodeEditor
                value={currentEditableCode}
                onChange={handleCodeChange}
                onReset={handleReset}
                error={codeError}
              />
              <div className="view-source-section">
                <h4>Full Source</h4>
                <CodeViewer code={code} language={language} />
              </div>
            </>
          ) : (
            <CodeViewer code={code} language={language} />
          )}
        </div>
      )}
    </div>
  );
}
