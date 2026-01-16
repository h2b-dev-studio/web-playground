/**
 * Lifting State Up Demo - FormWithValidation
 * @derives REQ-REACT-001, REQ-REACT-002
 */
import React, { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  return errors;
}

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  type?: string;
}

function FormInput({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
}: FormInputProps) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={error ? 'input-error' : ''}
      />
      {error && (
        <span data-testid="error-message" className="error-text">
          {error}
        </span>
      )}
    </div>
  );
}

interface FormSummaryProps {
  data: FormData;
  isValid: boolean;
}

function FormSummary({ data, isValid }: FormSummaryProps) {
  return (
    <div className="form-summary">
      <h4>Form Summary</h4>
      <p>
        <strong>Name:</strong> {data.name || '(empty)'}
      </p>
      <p>
        <strong>Email:</strong> {data.email || '(empty)'}
      </p>
      <p>
        <strong>Status:</strong> {isValid ? '✓ Valid' : '✗ Invalid'}
      </p>
    </div>
  );
}

interface DemoProps {
  showSummary: boolean;
}

export function Demo({ showSummary }: DemoProps) {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setSubmitted(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const isValid = Object.keys(validateForm(formData)).length === 0;

  return (
    <div className="lifting-state-demo">
      <form onSubmit={handleSubmit} className="validation-form">
        <FormInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        {showSummary && <FormSummary data={formData} isValid={isValid} />}

        <button type="submit" className="submit-button">
          Submit
        </button>

        {submitted && (
          <p className="success-message">Form submitted successfully!</p>
        )}
      </form>

      <p className="demo-description">
        Lifting state up allows sibling components to share data. The parent form
        holds the state, enabling the Summary component to display current values
        and validation status in real-time.
      </p>
    </div>
  );
}
