export const renderPropsSource = `import React, { useState, ReactNode } from 'react';

// Toggle component with render props
interface ToggleProps {
  initialValue?: boolean;
  children: (props: { on: boolean; toggle: () => void }) => ReactNode;
}

export function Toggle({ initialValue = false, children }: ToggleProps) {
  const [on, setOn] = useState(initialValue);
  const toggle = () => setOn((prev) => !prev);

  return <>{children({ on, toggle })}</>;
}

// MouseTracker with render props
interface MousePosition {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  children: (position: MousePosition) => ReactNode;
}

export function MouseTracker({ children }: MouseTrackerProps) {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ height: '100%' }}>
      {children(position)}
    </div>
  );
}
`;
