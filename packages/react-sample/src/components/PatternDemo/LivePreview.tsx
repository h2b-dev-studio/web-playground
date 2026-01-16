/**
 * LivePreview - Renders the pattern demo with error boundary
 * @derives REQ-REACT-001, REQ-REACT-004
 */
import React, { Suspense, useMemo } from 'react';
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

export function LivePreview({ pattern, props }: LivePreviewProps) {
  const DemoComponent = demoComponents[pattern.id];

  const content = useMemo(() => {
    if (!DemoComponent) {
      return <p>Demo not found for pattern: {pattern.id}</p>;
    }
    return <DemoComponent {...props} />;
  }, [DemoComponent, pattern.id, props]);

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
          {content}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
