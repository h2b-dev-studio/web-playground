import { PropSchema } from '../../types/props';

export const customHooksSchema: PropSchema[] = [
  {
    name: 'delay',
    type: 'number',
    default: 300,
    label: 'Debounce Delay (ms)',
    description: 'Delay in milliseconds for the useDebounce hook',
    min: 0,
    max: 2000,
  },
  {
    name: 'initialToggle',
    type: 'boolean',
    default: false,
    label: 'Initial Toggle',
    description: 'Initial state for the useToggle hook',
  },
];
