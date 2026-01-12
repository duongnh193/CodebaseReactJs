/**
 * Home Page
 */

import { Link } from 'react-router-dom';

import { ROUTES } from '@/config/constants';
import { useAuthStore } from '@/store';

const HomePage = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <div className="home-page">
        <section className="hero">
          <h1 className="hero__title">Welcome to React Base</h1>
          <p className="hero__subtitle">
            A production-ready React template with TypeScript, best practices, and modern tooling.
          </p>
          <div className="hero__actions">
            {isAuthenticated ? (
              <Link className="btn btn--primary" to={ROUTES.DASHBOARD}>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link className="btn btn--primary" to={ROUTES.LOGIN}>
                  Get Started
                </Link>
                <Link className="btn btn--secondary" to={ROUTES.REGISTER}>
                  Create Account
                </Link>
              </>
            )}
          </div>
        </section>

        <section className="features">
          <h2 className="features__title">Features</h2>
          <div className="features__grid">
            <div className="feature-card">
              <div className="feature-card__icon">⚡</div>
              <h3 className="feature-card__title">Fast Development</h3>
              <p className="feature-card__description">
                Vite-powered development with hot module replacement for instant feedback.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">🔒</div>
              <h3 className="feature-card__title">Type Safe</h3>
              <p className="feature-card__description">
                Full TypeScript support with strict type checking for reliable code.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">🎨</div>
              <h3 className="feature-card__title">Modern Styling</h3>
              <p className="feature-card__description">
                CSS variables-based theming with dark mode support out of the box.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">🔐</div>
              <h3 className="feature-card__title">Authentication</h3>
              <p className="feature-card__description">
                Complete auth flow with protected routes and token management.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">🌐</div>
              <h3 className="feature-card__title">HTTP Client</h3>
              <p className="feature-card__description">
                Axios-based HTTP client with retry logic and error handling.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-card__icon">📦</div>
              <h3 className="feature-card__title">State Management</h3>
              <p className="feature-card__description">
                Zustand for simple and scalable global state management.
              </p>
            </div>
          </div>
        </section>
      </div>
      <style>{`
        .home-page {
          padding: var(--spacing-8) 0;
        }

        .hero {
          text-align: center;
          padding: var(--spacing-16) 0;
        }

        .hero__title {
          font-size: var(--font-size-5xl);
          font-weight: var(--font-weight-bold);
          color: var(--text-primary);
          margin-bottom: var(--spacing-4);
        }

        .hero__subtitle {
          font-size: var(--font-size-xl);
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto var(--spacing-8);
        }

        .hero__actions {
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

        .features {
          padding: var(--spacing-16) 0;
        }

        .features__title {
          text-align: center;
          font-size: var(--font-size-3xl);
          margin-bottom: var(--spacing-10);
        }

        .features__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-6);
        }

        .feature-card {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-6);
          text-align: center;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .feature-card__icon {
          font-size: 2.5rem;
          margin-bottom: var(--spacing-4);
        }

        .feature-card__title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--spacing-2);
        }

        .feature-card__description {
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
        }
      `}</style>
    </>
  );
};

export default HomePage;

