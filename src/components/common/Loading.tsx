/**
 * Loading Components
 * Various loading indicators for different use cases
 */

import { clsx } from 'clsx';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Spinner Loading Indicator
 */
export const Spinner = ({ size = 'md', className }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'spinner--sm',
    md: 'spinner--md',
    lg: 'spinner--lg',
  };

  return (
    <>
      <div className={clsx('spinner', sizeClasses[size], className)} role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <style>{`
        .spinner {
          display: inline-block;
          border: 3px solid var(--border-primary);
          border-top-color: var(--color-primary-600);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .spinner--sm {
          width: 16px;
          height: 16px;
          border-width: 2px;
        }

        .spinner--md {
          width: 24px;
          height: 24px;
        }

        .spinner--lg {
          width: 40px;
          height: 40px;
          border-width: 4px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

interface LoadingOverlayProps {
  message?: string;
  fullScreen?: boolean;
}

/**
 * Full page or section loading overlay
 */
export const LoadingOverlay = ({ message = 'Loading...', fullScreen = false }: LoadingOverlayProps) => (
  <>
    <div className={clsx('loading-overlay', fullScreen && 'loading-overlay--fullscreen')}>
      <div className="loading-overlay__content">
        <Spinner size="lg" />
        {message && <p className="loading-overlay__message">{message}</p>}
      </div>
    </div>
    <style>{`
      .loading-overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-8);
        min-height: 200px;
      }

      .loading-overlay--fullscreen {
        position: fixed;
        inset: 0;
        background-color: var(--bg-primary);
        z-index: var(--z-modal);
        min-height: 100vh;
      }

      .loading-overlay__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-4);
      }

      .loading-overlay__message {
        font-size: var(--font-size-base);
        color: var(--text-secondary);
      }
    `}</style>
  </>
);

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

/**
 * Skeleton loading placeholder
 */
export const Skeleton = ({
  width = '100%',
  height = '1rem',
  borderRadius = 'var(--radius-md)',
  className,
}: SkeletonProps) => (
  <>
    <div
      className={clsx('skeleton', className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius,
      }}
    />
    <style>{`
      .skeleton {
        background: linear-gradient(
          90deg,
          var(--bg-tertiary) 25%,
          var(--bg-secondary) 50%,
          var(--bg-tertiary) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
      }

      @keyframes shimmer {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `}</style>
  </>
);

/**
 * Card skeleton for content placeholders
 */
export const CardSkeleton = () => (
  <div className="card-skeleton">
    <Skeleton height={200} borderRadius="var(--radius-lg) var(--radius-lg) 0 0" />
    <div className="card-skeleton__content">
      <Skeleton height="1.5rem" width="60%" />
      <Skeleton height="1rem" />
      <Skeleton height="1rem" width="80%" />
    </div>
    <style>{`
      .card-skeleton {
        background-color: var(--bg-secondary);
        border-radius: var(--radius-lg);
        overflow: hidden;
      }

      .card-skeleton__content {
        padding: var(--spacing-4);
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2);
      }
    `}</style>
  </div>
);

export default Spinner;

