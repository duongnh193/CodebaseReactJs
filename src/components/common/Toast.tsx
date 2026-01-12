/**
 * Toast Notifications
 * Wrapper around react-hot-toast with custom styling
 */

import toast, { Toaster, type ToastOptions } from 'react-hot-toast';

import { TOAST_DURATION } from '@/config/constants';

/**
 * Toast configuration
 */
const defaultOptions: ToastOptions = {
  duration: TOAST_DURATION.DEFAULT,
  position: 'top-right',
};

/**
 * Toast Provider Component
 * Add this to your app root
 */
export const ToastProvider = () => (
  <Toaster
    position="top-right"
    gutter={8}
    containerStyle={{
      top: 20,
      right: 20,
    }}
    toastOptions={{
      duration: TOAST_DURATION.DEFAULT,
      style: {
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-3) var(--spacing-4)',
        fontSize: 'var(--font-size-sm)',
        boxShadow: 'var(--shadow-lg)',
      },
      success: {
        iconTheme: {
          primary: 'var(--color-success-500)',
          secondary: 'white',
        },
      },
      error: {
        iconTheme: {
          primary: 'var(--color-error-500)',
          secondary: 'white',
        },
      },
    }}
  />
);

/**
 * Toast utility functions
 */
export const showToast = {
  /**
   * Success toast
   */
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, { ...defaultOptions, ...options });
  },

  /**
   * Error toast
   */
  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      ...defaultOptions,
      duration: TOAST_DURATION.LONG,
      ...options,
    });
  },

  /**
   * Warning toast
   */
  warning: (message: string, options?: ToastOptions) => {
    return toast(message, {
      ...defaultOptions,
      icon: '⚠️',
      ...options,
    });
  },

  /**
   * Info toast
   */
  info: (message: string, options?: ToastOptions) => {
    return toast(message, {
      ...defaultOptions,
      icon: 'ℹ️',
      ...options,
    });
  },

  /**
   * Loading toast
   */
  loading: (message: string, options?: ToastOptions) => {
    return toast.loading(message, { ...defaultOptions, ...options });
  },

  /**
   * Promise toast - shows loading, success, and error states
   */
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: Error) => string);
    },
    options?: ToastOptions
  ) => {
    return toast.promise(promise, messages, { ...defaultOptions, ...options });
  },

  /**
   * Dismiss a specific toast
   */
  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  },

  /**
   * Dismiss all toasts
   */
  dismissAll: () => {
    toast.dismiss();
  },

  /**
   * Custom toast
   */
  custom: (message: string, options?: ToastOptions) => {
    return toast(message, { ...defaultOptions, ...options });
  },
};

export { toast };
export default showToast;

