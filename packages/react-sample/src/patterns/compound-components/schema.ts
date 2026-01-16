import { PropSchema } from '../../types/props';

export const compoundComponentsSchema: PropSchema[] = [
  {
    name: 'defaultTab',
    type: 'enum',
    options: ['1', '2', '3'],
    default: '1',
    label: 'Default Tab',
    description: 'The initially active tab',
  },
];
