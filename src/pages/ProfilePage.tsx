/**
 * Profile Page
 */

import { useAuthStore } from '@/store';

const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <>
      <div className="profile-page">
        <h1 className="profile-page__title">Profile</h1>

        <div className="profile-card">
          <div className="profile-card__avatar">
            {user?.avatar ? (
              <img alt={user.username} src={user.avatar} />
            ) : (
              <div className="profile-card__avatar-placeholder">
                {user?.firstName?.[0] || user?.username?.[0] || 'U'}
              </div>
            )}
          </div>

          <div className="profile-card__info">
            <h2 className="profile-card__name">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.username}
            </h2>
            <p className="profile-card__email">{user?.email}</p>
            <span className="profile-card__role">{user?.role}</span>
          </div>
        </div>

        <div className="profile-details">
          <h3 className="profile-details__title">Account Information</h3>
          <div className="profile-details__grid">
            <div className="detail-item">
              <span className="detail-item__label">Username</span>
              <span className="detail-item__value">{user?.username || '-'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">Email</span>
              <span className="detail-item__value">{user?.email || '-'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">First Name</span>
              <span className="detail-item__value">{user?.firstName || '-'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">Last Name</span>
              <span className="detail-item__value">{user?.lastName || '-'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">Role</span>
              <span className="detail-item__value">{user?.role || '-'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-item__label">Email Verified</span>
              <span className="detail-item__value">
                {user?.isEmailVerified ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .profile-page {
          max-width: 800px;
          margin: 0 auto;
          padding: var(--spacing-4) 0;
        }

        .profile-page__title {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--spacing-6);
        }

        .profile-card {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-6);
          display: flex;
          align-items: center;
          gap: var(--spacing-6);
          margin-bottom: var(--spacing-6);
        }

        .profile-card__avatar {
          width: 100px;
          height: 100px;
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .profile-card__avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-card__avatar-placeholder {
          width: 100%;
          height: 100%;
          background-color: var(--color-primary-500);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
        }

        .profile-card__name {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--spacing-1);
        }

        .profile-card__email {
          color: var(--text-secondary);
          margin-bottom: var(--spacing-2);
        }

        .profile-card__role {
          display: inline-block;
          padding: var(--spacing-1) var(--spacing-3);
          background-color: var(--color-primary-100);
          color: var(--color-primary-700);
          border-radius: var(--radius-full);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          text-transform: capitalize;
        }

        [data-theme='dark'] .profile-card__role {
          background-color: var(--color-primary-900);
          color: var(--color-primary-200);
        }

        .profile-details {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-xl);
          padding: var(--spacing-6);
        }

        .profile-details__title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--spacing-4);
          padding-bottom: var(--spacing-3);
          border-bottom: 1px solid var(--border-primary);
        }

        .profile-details__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-4);
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-1);
        }

        .detail-item__label {
          font-size: var(--font-size-sm);
          color: var(--text-tertiary);
        }

        .detail-item__value {
          font-weight: var(--font-weight-medium);
        }
      `}</style>
    </>
  );
};

export default ProfilePage;

