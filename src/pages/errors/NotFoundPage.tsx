/**
 * 404 Not Found Page
 */

import { Link } from 'react-router-dom';

import { ROUTES } from '@/config/constants';

const NotFoundPage = () => {
  return (
    <>
      <div className="error-page">
        <div className="error-page__content">
          <h1 className="error-page__code">404</h1>
          <h2 className="error-page__title">Page Not Found</h2>
          <p className="error-page__message">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="error-page__actions">
            <Link className="btn btn--primary" to={ROUTES.HOME}>
              Go Home
            </Link>
            <button
              className="btn btn--secondary"
              type="button"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .error-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          text-align: center;
          padding: var(--spacing-8);
        }

        .error-page__content {
          max-width: 500px;
        }

        .error-page__code {
          font-size: 8rem;
          font-weight: var(--font-weight-bold);
          color: var(--color-primary-600);
          line-height: 1;
          margin-bottom: var(--spacing-4);
        }

        .error-page__title {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--spacing-4);
        }

        .error-page__message {
          color: var(--text-secondary);
          margin-bottom: var(--spacing-8);
        }

        .error-page__actions {
          display: flex;
          gap: var(--spacing-4);
          justify-content: center;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-3) var(--spacing-6);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          border-radius: var(--radius-lg);
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .btn--primary {
          background-color: var(--color-primary-600);
          color: white;
        }

        .btn--primary:hover {
          background-color: var(--color-primary-700);
        }

        .btn--secondary {
          background-color: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border-primary);
        }

        .btn--secondary:hover {
          background-color: var(--bg-tertiary);
        }
      `}</style>
    </>
  );
};

export default NotFoundPage;

