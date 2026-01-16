import { PropSchema } from '../../types/props';

export const controlledVsUncontrolledSchema: PropSchema[] = [
  {
    name: 'placeholder',
    type: 'string',
    default: 'Enter text...',
    label: 'Placeholder',
    description: 'Placeholder text for the inputs',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: false,
    label: 'Disabled',
    description: 'Whether the inputs are disabled',
  },
];
