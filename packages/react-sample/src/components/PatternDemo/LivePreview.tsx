/**
 * LivePreview - Renders the pattern demo with error boundary
 * @derives REQ-REACT-001, REQ-REACT-004
 */
import React, { Suspense } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { Pattern } from '../../types/props';

// Import all demo components
import { Demo as CompoundComponentsDemo } from '../../patterns/compound-components/Demo';
import { Demo as RenderPropsDemo } from '../../patterns/render-props/Demo';
import { Demo as CompositionVsInheritanceDemo } from '../../patterns/composition-vs-inheritance/Demo';
import { Demo as CustomHooksDemo } from '../../patterns/custom-hooks/Demo';
import { Demo as ControlledVsUncontrolledDemo } from '../../patterns/controlled-vs-uncontrolled/Demo';
import { Demo as ContextReducerDemo } from '../../patterns/context-reducer/Demo';
import { Demo as LiftingStateUpDemo } from '../../patterns/lifting-state-up/Demo';

interface LivePreviewProps {
  pattern: Pattern;
  props: Record<string, unknown>;
  editedCode?: string;
  activeHook?: string;
}

const demoComponents: Record<string, React.ComponentType<Record<string, unknown>>> = {
  'compound-components': CompoundComponentsDemo as React.ComponentType<Record<string, unknown>>,
  'render-props': RenderPropsDemo as React.ComponentType<Record<string, unknown>>,
  'composition-vs-inheritance': CompositionVsInheritanceDemo as React.ComponentType<Record<string, unknown>>,
  'custom-hooks': CustomHooksDemo as React.ComponentType<Record<string, unknown>>,
  'controlled-vs-uncontrolled': ControlledVsUncontrolledDemo as React.ComponentType<Record<string, unknown>>,
  'context-reducer': ContextReducerDemo as React.ComponentType<Record<string, unknown>>,
  'lifting-state-up': LiftingStateUpDemo as React.ComponentType<Record<string, unknown>>,
};

export function LivePreview({ pattern, props, editedCode, activeHook }: LivePreviewProps) {
  const DemoComponent = demoComponents[pattern.id];

  if (!DemoComponent) {
    return (
      <div data-testid="live-preview" className="live-preview">
        <p>Demo not found for pattern: {pattern.id}</p>
      </div>
    );
  }

  // Create a unique key for custom-hooks to force remount when code changes
  // This ensures React hooks are re-initialized with new values
  const demoKey = pattern.id === 'custom-hooks' && editedCode
    ? `${pattern.id}-${editedCode.length}-${editedCode.slice(0, 50)}`
    : pattern.id;

  return (
    <div data-testid="live-preview" className="live-preview">
      <ErrorBoundary
        fallback={
          <div className="preview-error">
            <p>Error rendering demo. Please check the console.</p>
          </div>
        }
      >
        <Suspense fallback={<div className="preview-loading">Loading...</div>}>
          <DemoComponent
            key={demoKey}
            {...props}
            editedCode={editedCode}
            activeHook={activeHook}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
