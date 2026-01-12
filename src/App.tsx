/**
 * Application Entry Point
 */

import { useEffect } from 'react';

import { ToastProvider } from '@/components/common';
import { AppRouter } from '@/routes';
import { useAuthStore, useThemeStore } from '@/store';

import '@/styles/index.css';

function App() {
  const { checkAuth } = useAuthStore();
  const { theme } = useThemeStore();

  // Check authentication status on mount
  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  // Apply theme on mount
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  return (
    <>
      <ToastProvider />
      <AppRouter />
    </>
  );
}

export default App;

