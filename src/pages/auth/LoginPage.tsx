/**
 * Login Page
 */

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { showToast, Spinner } from '@/components/common';
import { ROUTES } from '@/config/constants';
import { useAuthStore } from '@/store';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || ROUTES.DASHBOARD;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(formData);
      showToast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      showToast.error('Invalid credentials');
    }
  };

  return (
    <>
      <div className="login-page">
        <h1 className="login-page__title">Welcome Back</h1>
        <p className="login-page__subtitle">Sign in to your account</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              autoComplete="email"
              className="form-input"
              id="email"
              name="email"
              placeholder="Enter your email"
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
              autoComplete="current-password"
              className="form-input"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label className="checkbox-label">
              <input
                checked={formData.rememberMe}
                name="rememberMe"
                type="checkbox"
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
            <Link className="forgot-link" to={ROUTES.FORGOT_PASSWORD}>
              Forgot password?
            </Link>
          </div>

          {error && <div className="form-error">{error}</div>}

          <button className="submit-btn" disabled={isLoading} type="submit">
            {isLoading ? <Spinner size="sm" /> : 'Sign In'}
          </button>
        </form>

        <p className="login-page__footer">
          Don&apos;t have an account?{' '}
          <Link to={ROUTES.REGISTER}>Create one</Link>
        </p>
      </div>
      <style>{`
        .login-page__title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          text-align: center;
          margin-bottom: var(--spacing-2);
        }

        .login-page__subtitle {
          text-align: center;
          color: var(--text-secondary);
          margin-bottom: var(--spacing-6);
        }

        .login-form {
          display: flex;
          flex-direction: column;
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

        .form-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
          font-size: var(--font-size-sm);
          cursor: pointer;
        }

        .checkbox-label input {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .forgot-link {
          font-size: var(--font-size-sm);
          color: var(--color-primary-600);
          text-decoration: none;
        }

        .forgot-link:hover {
          text-decoration: underline;
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

        .login-page__footer {
          text-align: center;
          margin-top: var(--spacing-6);
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
        }

        .login-page__footer a {
          color: var(--color-primary-600);
          text-decoration: none;
          font-weight: var(--font-weight-medium);
        }

        .login-page__footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default LoginPage;

