/**
 * PatternList - List of patterns organized by category
 * @derives REQ-REACT-001
 */
import React from 'react';
import { Pattern } from '../../types/props';
import { PatternCard } from './PatternCard';

interface PatternListProps {
  patterns: Pattern[];
  activePatternId: string | null;
  onPatternSelect: (patternId: string) => void;
}

export function PatternList({
  patterns,
  activePatternId,
  onPatternSelect,
}: PatternListProps) {
  const compositionPatterns = patterns.filter((p) => p.category === 'Composition');
  const statePatterns = patterns.filter((p) => p.category === 'State');

  return (
    <nav className="pattern-list" aria-label="Pattern categories">
      <div data-testid="category-composition" className="pattern-category">
        <h3 className="category-title">Composition</h3>
        <div className="category-patterns">
          {compositionPatterns.map((pattern) => (
            <div
              key={pattern.id}
              data-testid={`pattern-card-${pattern.id}`}
            >
              <PatternCard
                pattern={pattern}
                isActive={activePatternId === pattern.id}
                onClick={() => onPatternSelect(pattern.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div data-testid="category-state" className="pattern-category">
        <h3 className="category-title">State</h3>
        <div className="category-patterns">
          {statePatterns.map((pattern) => (
            <div
              key={pattern.id}
              data-testid={`pattern-card-${pattern.id}`}
            >
              <PatternCard
                pattern={pattern}
                isActive={activePatternId === pattern.id}
                onClick={() => onPatternSelect(pattern.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
