/**
 * Pattern Registry - Central registry for all React patterns
 * @derives REQ-REACT-001
 */
import { Pattern } from '../types/props';

// Pattern sources
import { compoundComponentsSource } from './compound-components/source';
import { renderPropsSource } from './render-props/source';
import { compositionVsInheritanceSource } from './composition-vs-inheritance/source';
import { customHooksSource, useToggleSource, useDebounceSource } from './custom-hooks/source';
import { controlledVsUncontrolledSource } from './controlled-vs-uncontrolled/source';
import { contextReducerSource } from './context-reducer/source';
import { liftingStateUpSource } from './lifting-state-up/source';

// Pattern schemas
import { compoundComponentsSchema } from './compound-components/schema';
import { renderPropsSchema } from './render-props/schema';
import { compositionVsInheritanceSchema } from './composition-vs-inheritance/schema';
import { customHooksSchema } from './custom-hooks/schema';
import { controlledVsUncontrolledSchema } from './controlled-vs-uncontrolled/schema';
import { contextReducerSchema } from './context-reducer/schema';
import { liftingStateUpSchema } from './lifting-state-up/schema';

export const patterns: Pattern[] = [
  {
    id: 'compound-components',
    name: 'Compound Components',
    category: 'Composition',
    description: 'Components that work together to form a cohesive unit (Tabs, Accordion)',
    schema: compoundComponentsSchema,
    source: compoundComponentsSource,
  },
  {
    id: 'render-props',
    name: 'Render Props',
    category: 'Composition',
    description: 'Sharing code between components using a prop whose value is a function',
    schema: renderPropsSchema,
    source: renderPropsSource,
  },
  {
    id: 'composition-vs-inheritance',
    name: 'Composition vs Inheritance',
    category: 'Composition',
    description: 'Favoring composition over inheritance for component reuse',
    schema: compositionVsInheritanceSchema,
    source: compositionVsInheritanceSource,
  },
  {
    id: 'custom-hooks',
    name: 'Custom Hooks',
    category: 'State',
    description: 'Reusable stateful logic extracted into custom hooks',
    schema: customHooksSchema,
    source: customHooksSource,
    editable: true,
    editableHooks: [
      {
        name: 'useToggle',
        code: useToggleSource,
        description: 'A hook for managing boolean toggle state',
      },
      {
        name: 'useDebounce',
        code: useDebounceSource,
        description: 'A hook for debouncing rapidly changing values',
      },
    ],
  },
  {
    id: 'controlled-vs-uncontrolled',
    name: 'Controlled vs Uncontrolled',
    category: 'State',
    description: 'Understanding controlled and uncontrolled components',
    schema: controlledVsUncontrolledSchema,
    source: controlledVsUncontrolledSource,
  },
  {
    id: 'context-reducer',
    name: 'Context + Reducer',
    category: 'State',
    description: 'Combining Context and useReducer for complex state management',
    schema: contextReducerSchema,
    source: contextReducerSource,
  },
  {
    id: 'lifting-state-up',
    name: 'Lifting State Up',
    category: 'State',
    description: 'Sharing state between components by lifting it to a common ancestor',
    schema: liftingStateUpSchema,
    source: liftingStateUpSource,
  },
];

export function getPatternById(id: string): Pattern | undefined {
  return patterns.find((p) => p.id === id);
}

export function getPatternsByCategory(category: Pattern['category']): Pattern[] {
  return patterns.filter((p) => p.category === category);
}
