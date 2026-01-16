import { PropSchema } from '../../types/props';

export const renderPropsSchema: PropSchema[] = [
  {
    name: 'initialValue',
    type: 'boolean',
    default: false,
    label: 'Initial Toggle State',
    description: 'Starting state for the toggle',
  },
];
