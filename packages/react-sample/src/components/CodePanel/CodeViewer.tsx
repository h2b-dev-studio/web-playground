/**
 * CodeViewer - Syntax highlighted code display
 * @derives REQ-REACT-003
 */
import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { CodeViewerProps } from '../../types/props';

export function CodeViewer({ code, language = 'tsx' }: CodeViewerProps) {
  return (
    <div data-testid="code-viewer" className="code-viewer">
      <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="line-number">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
