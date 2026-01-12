/**
 * Register Page
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { showToast, Spinner } from '@/components/common';
import { ROUTES } from '@/config/constants';
import { useAuthStore } from '@/store';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const [validationError, setValidationError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) {
      clearError();
    }
    if (validationError) {
      setValidationError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 8) {
      setValidationError('Password must be at least 8 characters');
      return;
    }

    try {
      await register({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      showToast.success('Account created successfully!');
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      showToast.error('Registration failed');
    }
  };

  const displayError = validationError || error;

  return (
    <>
      <div className="register-page">
        <h1 className="register-page__title">Create Account</h1>
        <p className="register-page__subtitle">Sign up to get started</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">
                First Name
              </label>
              <input
                autoComplete="given-name"
                className="form-input"
                id="firstName"
                name="firstName"
                placeholder="John"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                autoComplete="family-name"
                className="form-input"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              autoComplete="username"
              className="form-input"
              id="username"
              name="username"
              placeholder="johndoe"
              required
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              autoComplete="email"
              className="form-input"
              id="email"
              name="email"
              placeholder="john@example.com"
              required
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              autoComplete="new-password"
              className="form-input"
              id="password"
              name="password"
              placeholder="Min. 8 characters"
              required
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              autoComplete="new-password"
              className="form-input"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {displayError && <div className="form-error">{displayError}</div>}

          <button className="submit-btn" disabled={isLoading} type="submit">
            {isLoading ? <Spinner size="sm" /> : 'Create Account'}
          </button>
        </form>

        <p className="register-page__footer">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN}>Sign in</Link>
        </p>
      </div>
      <style>{`
        .register-page__title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          text-align: center;
          margin-bottom: var(--spacing-2);
        }

        .register-page__subtitle {
          text-align: center;
          color: var(--text-secondary);
          margin-bottom: var(--spacing-6);
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-4);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2);
        }

        .form-label {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }

        .form-input {
          padding: var(--spacing-3);
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-md);
          font-size: var(--font-size-base);
          background-color: var(--bg-primary);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--color-primary-500);
          box-shadow: 0 0 0 3px var(--color-primary-100);
        }

        [data-theme='dark'] .form-input:focus {
          box-shadow: 0 0 0 3px var(--color-primary-900);
        }

        .form-error {
          padding: var(--spacing-3);
          background-color: var(--color-error-50);
          color: var(--color-error-600);
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
        }

        [data-theme='dark'] .form-error {
          background-color: var(--color-error-900);
          color: var(--color-error-200);
        }

        .submit-btn {
          padding: var(--spacing-3);
          background-color: var(--color-primary-600);
          color: white;
          border-radius: var(--radius-md);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          transition: background-color var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-2);
        }

        .submit-btn:hover:not(:disabled) {
          background-color: var(--color-primary-700);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .register-page__footer {
          text-align: center;
          margin-top: var(--spacing-6);
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
        }

        .register-page__footer a {
          color: var(--color-primary-600);
          text-decoration: none;
          font-weight: var(--font-weight-medium);
        }

        .register-page__footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default RegisterPage;

