/**
 * Settings Page
 */

import { useThemeStore, useAuthStore } from '@/store';
import { showToast } from '@/components/common';

import type { Theme } from '@/types/common';

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const { logout } = useAuthStore();

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    showToast.success(`Theme changed to ${newTheme}`);
  };

  const handleLogout = async () => {
    await logout();
    showToast.success('Logged out successfully');
  };

  return (
    <>
      <div className="settings-page">
        <h1 className="settings-page__title">Settings</h1>

        <div className="settings-section">
          <h2 className="settings-section__title">Appearance</h2>
          <div className="settings-section__content">
            <div className="setting-item">
              <div className="setting-item__info">
                <span className="setting-item__label">Theme</span>
                <span className="setting-item__description">
                  Choose your preferred color scheme
                </span>
              </div>
              <div className="theme-selector">
                <button
                  className={`theme-btn ${theme === 'light' ? 'theme-btn--active' : ''}`}
                  type="button"
                  onClick={() => handleThemeChange('light')}
                >
                  ☀️ Light
                </button>
                <button
                  className={`theme-btn ${theme === 'dark' ? 'theme-btn--active' : ''}`}
                  type="button"
                  onClick={() => handleThemeChange('dark')}
                >
                  🌙 Dark
                </button>
                <button
                  className={`theme-btn ${theme === 'system' ? 'theme-btn--active' : ''}`}
                  type="button"
                  onClick={() => handleThemeChange('system')}
                >
                  💻 System
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="settings-section__title">Account</h2>
          <div className="settings-section__content">
            <div className="setting-item">
              <div className="setting-item__info">
                <span className="setting-item__label">Change Password</span>
                <span className="setting-item__description">
                  Update your account password
                </span>
              </div>
              <button className="settings-btn" type="button">
                Change Password
              </button>
            </div>
            <div className="setting-item">
              <div className="setting-item__info">
                <span className="setting-item__label">Email Notifications</span>
                <span className="setting-item__description">
                  Manage your email preferences
                </span>
              </div>
              <button className="settings-btn" type="button">
                Configure
              </button>
            </div>
          </div>
        </div>

        <div className="settings-section settings-section--danger">
          <h2 className="settings-section__title">Danger Zone</h2>
          <div className="settings-section__content">
            <div className="setting-item">
              <div className="setting-item__info">
                <span className="setting-item__label">Sign Out</span>
                <span className="setting-item__description">
                  Sign out from your account
                </span>
              </div>
              <button
                className="settings-btn settings-btn--danger"
                type="button"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
            <div className="setting-item">
              <div className="setting-item__info">
                <span className="setting-item__label">Delete Account</span>
                <span className="setting-item__description">
                  Permanently delete your account and all data
                </span>
              </div>
              <button className="settings-btn settings-btn--danger" type="button">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .settings-page {
          max-width: 800px;
          margin: 0 auto;
          padding: var(--spacing-4) 0;
        }

        .settings-page__title {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--spacing-6);
        }

        .settings-section {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-6);
          margin-bottom: var(--spacing-6);
        }

        .settings-section--danger {
          border: 1px solid var(--color-error-200);
        }

        [data-theme='dark'] .settings-section--danger {
          border-color: var(--color-error-900);
        }

        .settings-section__title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--spacing-4);
          padding-bottom: var(--spacing-3);
          border-bottom: 1px solid var(--border-primary);
        }

        .settings-section--danger .settings-section__title {
          color: var(--color-error-600);
        }

        .settings-section__content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4);
        }

        .setting-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-4);
        }

        .setting-item__info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-1);
        }

        .setting-item__label {
          font-weight: var(--font-weight-medium);
        }

        .setting-item__description {
          font-size: var(--font-size-sm);
          color: var(--text-tertiary);
        }

        .theme-selector {
          display: flex;
          gap: var(--spacing-2);
        }

        .theme-btn {
          padding: var(--spacing-2) var(--spacing-4);
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          background-color: var(--bg-tertiary);
          transition: all var(--transition-fast);
        }

        .theme-btn:hover {
          background-color: var(--color-primary-100);
        }

        [data-theme='dark'] .theme-btn:hover {
          background-color: var(--color-primary-900);
        }

        .theme-btn--active {
          background-color: var(--color-primary-600);
          color: white;
        }

        .theme-btn--active:hover {
          background-color: var(--color-primary-700);
        }

        .settings-btn {
          padding: var(--spacing-2) var(--spacing-4);
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          background-color: var(--bg-tertiary);
          transition: all var(--transition-fast);
        }

        .settings-btn:hover {
          background-color: var(--color-primary-100);
        }

        [data-theme='dark'] .settings-btn:hover {
          background-color: var(--color-primary-900);
        }

        .settings-btn--danger {
          background-color: var(--color-error-50);
          color: var(--color-error-600);
        }

        .settings-btn--danger:hover {
          background-color: var(--color-error-100);
        }

        [data-theme='dark'] .settings-btn--danger {
          background-color: var(--color-error-900);
          color: var(--color-error-200);
        }

        [data-theme='dark'] .settings-btn--danger:hover {
          background-color: var(--color-error-800);
        }
      `}</style>
    </>
  );
};

export default SettingsPage;

