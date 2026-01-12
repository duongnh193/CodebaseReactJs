/**
 * Main Layout
 * Default layout for authenticated pages
 */

import { Outlet } from 'react-router-dom';

/**
 * Header Component
 */
const Header = () => (
  <header className="main-header">
    <div className="main-header__container">
      <div className="main-header__logo">
        <a href="/">Logo</a>
      </div>
      <nav className="main-header__nav">
        <a href="/dashboard">Dashboard</a>
        <a href="/profile">Profile</a>
        <a href="/settings">Settings</a>
      </nav>
      <div className="main-header__actions">
        {/* Add user menu, notifications, etc. */}
      </div>
    </div>
  </header>
);

/**
 * Footer Component
 */
const Footer = () => (
  <footer className="main-footer">
    <div className="main-footer__container">
      <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
    </div>
  </footer>
);

/**
 * Main Layout Component
 */
export const MainLayout = () => {
  return (
    <>
      <div className="main-layout">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
      </div>
      <style>{`
        .main-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main-header {
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-primary);
          position: sticky;
          top: 0;
          z-index: var(--z-sticky);
        }

        .main-header__container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: var(--spacing-4);
        }

        .main-header__logo a {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary-600);
          text-decoration: none;
        }

        .main-header__nav {
          display: flex;
          gap: var(--spacing-6);
        }

        .main-header__nav a {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: var(--font-weight-medium);
          transition: color var(--transition-fast);
        }

        .main-header__nav a:hover {
          color: var(--color-primary-600);
        }

        .main-content {
          flex: 1;
          padding: var(--spacing-6);
          max-width: var(--container-xl);
          margin: 0 auto;
          width: 100%;
        }

        .main-footer {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-primary);
          padding: var(--spacing-6);
        }

        .main-footer__container {
          max-width: var(--container-xl);
          margin: 0 auto;
          text-align: center;
          color: var(--text-tertiary);
          font-size: var(--font-size-sm);
        }
      `}</style>
    </>
  );
};

export default MainLayout;

