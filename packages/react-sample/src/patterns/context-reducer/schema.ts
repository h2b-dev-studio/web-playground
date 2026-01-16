import { PropSchema } from '../../types/props';

export const contextReducerSchema: PropSchema[] = [
  {
    name: 'theme',
    type: 'enum',
    options: ['light', 'dark', 'system'],
    default: 'light',
    label: 'Initial Theme',
    description: 'The initial theme for the ThemeProvider',
  },
];
