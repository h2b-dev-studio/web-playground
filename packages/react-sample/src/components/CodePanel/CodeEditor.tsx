/**
 * CodeEditor - Editable code with syntax highlighting
 * @derives REQ-REACT-004
 */
import React from 'react';
import Editor from 'react-simple-code-editor';
import { Highlight, themes } from 'prism-react-renderer';
import { CodeEditorProps } from '../../types/props';

function highlightCode(code: string): React.ReactNode {
  return (
    <Highlight theme={themes.vsDark} code={code} language="typescript">
      {({ tokens, getLineProps, getTokenProps }) => (
        <>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </>
      )}
    </Highlight>
  );
}

export function CodeEditor({ value, onChange, onReset, error }: CodeEditorProps) {
  return (
    <div data-testid="code-editor" className="code-editor">
      <div className="editor-header">
        <span className="editor-title">Edit Hook Code</span>
        <button
          data-testid="reset-button"
          onClick={onReset}
          className="reset-button"
        >
          Reset
        </button>
      </div>
      <div className="editor-container">
        <Editor
          value={value}
          onValueChange={onChange}
          highlight={highlightCode}
          padding={16}
          textareaClassName="editor-textarea"
          preClassName="editor-pre"
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            minHeight: 150,
          }}
        />
      </div>
      {error && (
        <div data-testid="code-error" className="code-error">
          {error}
        </div>
      )}
    </div>
  );
}
