/**
 * PatternCard - Individual pattern card in the navigation
 * @derives REQ-REACT-001
 */
import React from 'react';
import { Pattern } from '../../types/props';

interface PatternCardProps {
  pattern: Pattern;
  isActive: boolean;
  onClick: () => void;
}

export function PatternCard({ pattern, isActive, onClick }: PatternCardProps) {
  return (
    <button
      data-testid="pattern-card"
      data-testid-full={`pattern-card-${pattern.id}`}
      className={`pattern-card ${isActive ? 'pattern-card--active' : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <span data-testid="pattern-name" className="pattern-name">
        {pattern.name}
      </span>
      {pattern.editable && (
        <span className="pattern-badge pattern-badge--editable">Editable</span>
      )}
    </button>
  );
}
