/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */

import { Component, type ErrorInfo, type ReactNode } from 'react';

import { logger } from '@/utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Default fallback UI for errors
 */
const DefaultFallback = ({ error, onReset }: { error: Error | null; onReset: () => void }) => (
  <div className="error-boundary">
    <div className="error-boundary__content">
      <div className="error-boundary__icon">⚠️</div>
      <h2 className="error-boundary__title">Oops! Something went wrong</h2>
      <p className="error-boundary__message">
        {error?.message || 'An unexpected error occurred'}
      </p>
      <div className="error-boundary__actions">
        <button className="error-boundary__button" type="button" onClick={onReset}>
          Try Again
        </button>
        <button
          className="error-boundary__button error-boundary__button--secondary"
          type="button"
          onClick={() => (window.location.href = '/')}
        >
          Go Home
        </button>
      </div>
    </div>
    <style>{`
      .error-boundary {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 400px;
        padding: var(--spacing-8);
        background-color: var(--bg-secondary);
        border-radius: var(--radius-lg);
        margin: var(--spacing-4);
      }

      .error-boundary__content {
        text-align: center;
        max-width: 400px;
      }

      .error-boundary__icon {
        font-size: 4rem;
        margin-bottom: var(--spacing-4);
      }

      .error-boundary__title {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        color: var(--text-primary);
        margin-bottom: var(--spacing-2);
      }

      .error-boundary__message {
        font-size: var(--font-size-base);
        color: var(--text-secondary);
        margin-bottom: var(--spacing-6);
      }

      .error-boundary__actions {
        display: flex;
        gap: var(--spacing-3);
        justify-content: center;
      }

      .error-boundary__button {
        padding: var(--spacing-3) var(--spacing-6);
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-medium);
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all var(--transition-fast);
        background-color: var(--color-primary-600);
        color: white;
        border: none;
      }

      .error-boundary__button:hover {
        background-color: var(--color-primary-700);
      }

      .error-boundary__button--secondary {
        background-color: transparent;
        color: var(--text-primary);
        border: 1px solid var(--border-primary);
      }

      .error-boundary__button--secondary:hover {
        background-color: var(--bg-tertiary);
      }
    `}</style>
  </div>
);

/**
 * Error Boundary Class Component
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error
    logger.error('ErrorBoundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // In production, you might want to send to error tracking service
    // if (env.isProduction && env.sentryDsn) {
    //   Sentry.captureException(error, { extra: errorInfo });
    // }
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Render custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Render default fallback
      return <DefaultFallback error={this.state.error} onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

