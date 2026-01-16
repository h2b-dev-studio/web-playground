/**
 * Core type definitions for the Pattern Gallery
 * @derives REQ-REACT-001, REQ-REACT-002
 */

export type PropType = 'boolean' | 'string' | 'number' | 'enum';

export interface PropSchema {
  name: string;
  type: PropType;
  options?: string[];
  default?: unknown;
  label?: string;
  description?: string;
  min?: number;
  max?: number;
}

export interface Pattern {
  id: string;
  name: string;
  category: 'Composition' | 'State';
  description: string;
  schema: PropSchema[];
  source: string;
  editable?: boolean;
  editableHooks?: EditableHook[];
}

export interface EditableHook {
  name: string;
  code: string;
  description: string;
}

export interface PatternDemoProps {
  patternId: string;
}

export interface PropsPlaygroundProps {
  value: Record<string, unknown>;
  onChange: (props: Record<string, unknown>) => void;
  schema: PropSchema[];
}

export interface CodeViewerProps {
  code: string;
  language?: 'tsx' | 'ts';
  defaultCollapsed?: boolean;
}

export interface CodeEditorProps {
  value: string;
  onChange: (code: string) => void;
  onReset: () => void;
  error?: string | null;
}
