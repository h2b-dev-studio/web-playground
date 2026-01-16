/**
 * React Patterns Gallery - Main Application
 * @derives REQ-REACT-001, REQ-REACT-002, REQ-REACT-003, REQ-REACT-004, REQ-REACT-005
 */
import React, { useState, useEffect, useCallback } from 'react';
import { PatternList } from './components/Navigation';
import { PatternDemo } from './components/PatternDemo';
import { patterns, getPatternById } from './patterns/registry';

function App() {
  // Get pattern ID from URL hash
  const getPatternIdFromHash = () => {
    const hash = window.location.hash.slice(1);
    return hash || null;
  };

  const [activePatternId, setActivePatternId] = useState<string | null>(
    getPatternIdFromHash
  );

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setActivePatternId(getPatternIdFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigate to pattern
  const handlePatternSelect = useCallback((patternId: string) => {
    window.location.hash = patternId;
    setActivePatternId(patternId);
  }, []);

  const activePattern = activePatternId ? getPatternById(activePatternId) : null;

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Patterns</h1>
        <p className="app-subtitle">
          Interactive showcase of idiomatic React patterns
        </p>
      </header>

      <main className="app-main">
        <aside className="app-sidebar">
          <PatternList
            patterns={patterns}
            activePatternId={activePatternId}
            onPatternSelect={handlePatternSelect}
          />
        </aside>

        <section className="app-content">
          {activePattern ? (
            <PatternDemo pattern={activePattern} />
          ) : (
            <div className="welcome-message">
              <h2>Welcome to React Patterns</h2>
              <p>
                Select a pattern from the sidebar to see it in action.
                Each pattern includes:
              </p>
              <ul>
                <li>Live interactive demo</li>
                <li>Props playground for experimentation</li>
                <li>Source code with syntax highlighting</li>
              </ul>
              <p>
                <strong>Tip:</strong> Some patterns have editable code!
                Look for the "Editable" badge.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
