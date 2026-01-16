export const compositionVsInheritanceSource = `import React, { ReactNode } from 'react';

// Base Card component using composition
interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  className?: string;
}

export function Card({ children, variant = 'default', className = '' }: CardProps) {
  return (
    <div className={\`card card--\${variant} \${className}\`}>
      {children}
    </div>
  );
}

// Card subcomponents for composition
interface CardHeaderProps {
  children: ReactNode;
}

Card.Header = function CardHeader({ children }: CardHeaderProps) {
  return <div className="card-header">{children}</div>;
};

interface CardBodyProps {
  children: ReactNode;
}

Card.Body = function CardBody({ children }: CardBodyProps) {
  return <div className="card-body">{children}</div>;
};

interface CardFooterProps {
  children: ReactNode;
}

Card.Footer = function CardFooter({ children }: CardFooterProps) {
  return <div className="card-footer">{children}</div>;
};

// Specialized cards through composition (not inheritance)
interface AlertCardProps {
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'error';
}

export function AlertCard({ title, message, type = 'info' }: AlertCardProps) {
  return (
    <Card variant="outlined" className={\`alert-card alert-card--\${type}\`}>
      <Card.Header>
        <strong>{title}</strong>
      </Card.Header>
      <Card.Body>
        <p>{message}</p>
      </Card.Body>
    </Card>
  );
}
`;
