import { PropSchema } from '../../types/props';

export const compositionVsInheritanceSchema: PropSchema[] = [
  {
    name: 'variant',
    type: 'enum',
    options: ['default', 'elevated', 'outlined'],
    default: 'default',
    label: 'Card Variant',
    description: 'Visual style of the card',
  },
  {
    name: 'alertType',
    type: 'enum',
    options: ['info', 'warning', 'error'],
    default: 'info',
    label: 'Alert Type',
    description: 'Type of alert card',
  },
];
