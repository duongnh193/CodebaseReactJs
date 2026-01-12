/**
 * Forgot Password Page
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { showToast, Spinner } from '@/components/common';
import { ROUTES } from '@/config/constants';
import { authService } from '@/services/auth';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.forgotPassword(email);
      setIsSubmitted(true);
      showToast.success('Password reset email sent!');
    } catch (error) {
      showToast.error('Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <div className="forgot-password-page">
          <div className="success-icon">✉️</div>
          <h1 className="forgot-password-page__title">Check Your Email</h1>
          <p className="forgot-password-page__message">
            We&apos;ve sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="forgot-password-page__hint">
            Didn&apos;t receive the email? Check your spam folder or{' '}
            <button
              className="resend-btn"
              type="button"
              onClick={() => setIsSubmitted(false)}
            >
              try again
            </button>
          </p>
          <Link className="back-link" to={ROUTES.LOGIN}>
            ← Back to Sign In
          </Link>
        </div>
        <style>{`
          .forgot-password-page {
            text-align: center;
          }

          .success-icon {
            font-size: 4rem;
            margin-bottom: var(--spacing-4);
          }

          .forgot-password-page__title {
            font-size: var(--font-size-2xl);
            font-weight: var(--font-weight-bold);
            margin-bottom: var(--spacing-4);
          }

          .forgot-password-page__message {
            color: var(--text-secondary);
            margin-bottom: var(--spacing-4);
          }

          .forgot-password-page__hint {
            font-size: var(--font-size-sm);
            color: var(--text-tertiary);
            margin-bottom: var(--spacing-6);
          }

          .resend-btn {
            color: var(--color-primary-600);
            text-decoration: underline;
            font-weight: var(--font-weight-medium);
          }

          .back-link {
            color: var(--color-primary-600);
            text-decoration: none;
            font-weight: var(--font-weight-medium);
          }

          .back-link:hover {
            text-decoration: underline;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="forgot-password-page">
        <h1 className="forgot-password-page__title">Forgot Password?</h1>
        <p className="forgot-password-page__subtitle">
          Enter your email and we&apos;ll send you a reset link
        </p>

        <form className="forgot-password-form" onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="submit-btn" disabled={isLoading} type="submit">
            {isLoading ? <Spinner size="sm" /> : 'Send Reset Link'}
          </button>
        </form>

        <p className="forgot-password-page__footer">
          Remember your password?{' '}
          <Link to={ROUTES.LOGIN}>Sign in</Link>
        </p>
      </div>
      <style>{`
        .forgot-password-page__title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          text-align: center;
          margin-bottom: var(--spacing-2);
        }

        .forgot-password-page__subtitle {
          text-align: center;
          color: var(--text-secondary);
          margin-bottom: var(--spacing-6);
        }

        .forgot-password-form {
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

        .forgot-password-page__footer {
          text-align: center;
          margin-top: var(--spacing-6);
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
        }

        .forgot-password-page__footer a {
          color: var(--color-primary-600);
          text-decoration: none;
          font-weight: var(--font-weight-medium);
        }

        .forgot-password-page__footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default ForgotPasswordPage;

