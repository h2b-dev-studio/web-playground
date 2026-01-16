/**
 * Composition vs Inheritance Demo - Card variants
 * @derives REQ-REACT-001
 */
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  className?: string;
}

function CardRoot({ children, variant = 'default', className = '' }: CardProps) {
  return (
    <div className={`card card--${variant} ${className}`}>
      {children}
    </div>
  );
}

interface CardSubProps {
  children: ReactNode;
}

function CardHeader({ children }: CardSubProps) {
  return <div className="card-header">{children}</div>;
}

function CardBody({ children }: CardSubProps) {
  return <div className="card-body">{children}</div>;
}

function CardFooter({ children }: CardSubProps) {
  return <div className="card-footer">{children}</div>;
}

const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

interface DemoProps {
  variant: 'default' | 'elevated' | 'outlined';
  alertType: 'info' | 'warning' | 'error';
}

export function Demo({ variant, alertType }: DemoProps) {
  return (
    <div className="composition-demo">
      <div className="demo-section">
        <h4>Base Card with {variant} variant</h4>
        <Card variant={variant}>
          <Card.Header>
            <strong>Card Title</strong>
          </Card.Header>
          <Card.Body>
            <p>This card uses composition to build its structure.</p>
            <p>Each part (Header, Body, Footer) is a separate component.</p>
          </Card.Body>
          <Card.Footer>
            <button className="btn">Action</button>
          </Card.Footer>
        </Card>
      </div>

      <div className="demo-section">
        <h4>Alert Card ({alertType})</h4>
        <Card variant="outlined" className={`alert-card alert-card--${alertType}`}>
          <Card.Header>
            <strong>
              {alertType === 'info' && 'ℹ️ Information'}
              {alertType === 'warning' && '⚠️ Warning'}
              {alertType === 'error' && '❌ Error'}
            </strong>
          </Card.Header>
          <Card.Body>
            <p>
              {alertType === 'info' && 'This is an informational message.'}
              {alertType === 'warning' && 'This is a warning message.'}
              {alertType === 'error' && 'This is an error message.'}
            </p>
          </Card.Body>
        </Card>
      </div>

      <p className="demo-description">
        Composition allows creating specialized components without inheritance.
        The AlertCard reuses Card components rather than extending a class.
      </p>
    </div>
  );
}
