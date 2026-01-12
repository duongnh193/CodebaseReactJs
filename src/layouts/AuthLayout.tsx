/**
 * Auth Layout
 * Layout for authentication pages (login, register, etc.)
 */

import { Outlet, Link } from 'react-router-dom';

import { ROUTES } from '@/config/constants';

/**
 * Auth Layout Component
 */
export const AuthLayout = () => {
  return (
    <>
      <div className="auth-layout">
        <div className="auth-layout__container">
          <div className="auth-layout__header">
            <Link className="auth-layout__logo" to={ROUTES.HOME}>
              Logo
            </Link>
          </div>
          <div className="auth-layout__content">
            <Outlet />
          </div>
          <div className="auth-layout__footer">
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
      <style>{`
        .auth-layout {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--bg-primary) 100%);
          padding: var(--spacing-4);
        }

        [data-theme='dark'] .auth-layout {
          background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-primary) 100%);
        }

        .auth-layout__container {
          width: 100%;
          max-width: 420px;
        }

        .auth-layout__header {
          text-align: center;
          margin-bottom: var(--spacing-8);
        }

        .auth-layout__logo {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary-600);
          text-decoration: none;
        }

        .auth-layout__content {
          background-color: var(--bg-primary);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          padding: var(--spacing-8);
        }

        .auth-layout__footer {
          text-align: center;
          margin-top: var(--spacing-6);
          color: var(--text-tertiary);
          font-size: var(--font-size-sm);
        }
      `}</style>
    </>
  );
};

export default AuthLayout;

