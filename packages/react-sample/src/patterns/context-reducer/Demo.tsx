/**
 * Context + Reducer Demo - ThemeProvider
 * @derives REQ-REACT-001, REQ-REACT-002
 */
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
}

type ThemeAction =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'TOGGLE_THEME' };

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_THEME': {
      const resolvedTheme =
        action.payload === 'system' ? 'light' : action.payload;
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

interface ThemeContextType {
  state: ThemeState;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme: Theme;
}

function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: initialTheme,
    resolvedTheme: initialTheme === 'system' ? 'light' : initialTheme,
  });

  const setTheme = (theme: Theme) => dispatch({ type: 'SET_THEME', payload: theme });
  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' });

  return (
    <ThemeContext.Provider value={{ state, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Consumer component
function ThemedBox() {
  const { state, toggleTheme } = useTheme();

  return (
    <div
      data-testid="themed-box"
      data-theme={state.resolvedTheme}
      className={`themed-box themed-box--${state.resolvedTheme}`}
    >
      <p>
        <strong>Current theme:</strong> {state.theme}
      </p>
      <p>
        <strong>Resolved theme:</strong> {state.resolvedTheme}
      </p>
      <button onClick={toggleTheme} className="theme-toggle-button">
        Toggle Theme
      </button>
    </div>
  );
}

// Another consumer
function ThemeInfo() {
  const { state } = useTheme();

  return (
    <div className="theme-info">
      <p>This component also accesses theme via context.</p>
      <p>
        Theme: <code>{state.resolvedTheme}</code>
      </p>
    </div>
  );
}

interface DemoProps {
  theme: Theme;
}

export function Demo({ theme }: DemoProps) {
  return (
    <div className="context-reducer-demo">
      <ThemeProvider initialTheme={theme}>
        <div className="demo-content">
          <ThemedBox />
          <ThemeInfo />
        </div>
      </ThemeProvider>

      <p className="demo-description">
        Context + useReducer combines centralized state with predictable updates.
        The ThemeProvider shares state with all descendants without prop drilling.
      </p>
    </div>
  );
}
