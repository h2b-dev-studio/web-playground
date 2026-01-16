import { PropSchema } from '../../types/props';

export const liftingStateUpSchema: PropSchema[] = [
  {
    name: 'showSummary',
    type: 'boolean',
    default: true,
    label: 'Show Summary',
    description: 'Display the form summary panel',
  },
];
