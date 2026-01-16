export const contextReducerSource = `import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Theme types
type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
}

type ThemeAction =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'TOGGLE_THEME' };

// Theme reducer
function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_THEME': {
      const resolvedTheme =
        action.payload === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : action.payload;
      return { theme: action.payload, resolvedTheme };
    }
    case 'TOGGLE_THEME': {
      const newTheme = state.resolvedTheme === 'light' ? 'dark' : 'light';
      return { theme: newTheme, resolvedTheme: newTheme };
    }
    default:
      return state;
  }
}

// Theme context
interface ThemeContextType {
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

// Theme provider
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export function ThemeProvider({
  children,
  initialTheme = 'light',
}: ThemeProviderProps) {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: initialTheme,
    resolvedTheme: initialTheme === 'system' ? 'light' : initialTheme,
  });

  const setTheme = (theme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <ThemeContext.Provider value={{ state, dispatch, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
`;
