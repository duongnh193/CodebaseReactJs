/**
 * Dashboard Page
 */

import { useAuthStore } from '@/store';

const DashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1 className="dashboard-header__title">Dashboard</h1>
          <p className="dashboard-header__subtitle">
            Welcome back, {user?.firstName || user?.username || 'User'}!
          </p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-card__icon">📊</div>
            <div className="stat-card__content">
              <span className="stat-card__value">0</span>
              <span className="stat-card__label">Total Items</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon">✅</div>
            <div className="stat-card__content">
              <span className="stat-card__value">0</span>
              <span className="stat-card__label">Completed</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon">⏳</div>
            <div className="stat-card__content">
              <span className="stat-card__value">0</span>
              <span className="stat-card__label">Pending</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon">📈</div>
            <div className="stat-card__content">
              <span className="stat-card__value">0%</span>
              <span className="stat-card__label">Progress</span>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="content-card">
            <h2 className="content-card__title">Recent Activity</h2>
            <div className="content-card__body">
              <p className="empty-state">No recent activity</p>
            </div>
          </div>
          <div className="content-card">
            <h2 className="content-card__title">Quick Actions</h2>
            <div className="content-card__body">
              <button className="action-btn" type="button">Create New</button>
              <button className="action-btn" type="button">View Reports</button>
              <button className="action-btn" type="button">Settings</button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .dashboard-page {
          padding: var(--spacing-4) 0;
        }

        .dashboard-header {
          margin-bottom: var(--spacing-8);
        }

        .dashboard-header__title {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--spacing-2);
        }

        .dashboard-header__subtitle {
          color: var(--text-secondary);
          font-size: var(--font-size-lg);
        }

        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-4);
          margin-bottom: var(--spacing-8);
        }

        .stat-card {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-5);
          display: flex;
          align-items: center;
          gap: var(--spacing-4);
        }

        .stat-card__icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-tertiary);
          border-radius: var(--radius-lg);
        }

        .stat-card__content {
          display: flex;
          flex-direction: column;
        }

        .stat-card__value {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
        }

        .stat-card__label {
          color: var(--text-tertiary);
          font-size: var(--font-size-sm);
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-6);
        }

        .content-card {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-6);
        }

        .content-card__title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--spacing-4);
          padding-bottom: var(--spacing-3);
          border-bottom: 1px solid var(--border-primary);
        }

        .content-card__body {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-3);
        }

        .empty-state {
          color: var(--text-tertiary);
          text-align: center;
          padding: var(--spacing-8);
        }

        .action-btn {
          padding: var(--spacing-3) var(--spacing-4);
          background-color: var(--bg-tertiary);
          border-radius: var(--radius-md);
          font-weight: var(--font-weight-medium);
          transition: background-color var(--transition-fast);
        }

        .action-btn:hover {
          background-color: var(--color-primary-100);
        }

        [data-theme='dark'] .action-btn:hover {
          background-color: var(--color-primary-900);
        }
      `}</style>
    </>
  );
};

export default DashboardPage;

