/**
 * Theme Store
 * Global state management for theme using Zustand
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { Theme } from '@/types/common';

interface ThemeState {
  theme: Theme;
  isDark: boolean;
}

interface ThemeStore extends ThemeState {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Get system theme preference
 */
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Calculate if dark mode should be active
 */
const calculateIsDark = (theme: Theme): boolean => {
  if (theme === 'system') {
    return getSystemTheme() === 'dark';
  }
  return theme === 'dark';
};

/**
 * Apply theme to document
 */
const applyTheme = (isDark: boolean): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  if (isDark) {
    root.setAttribute('data-theme', 'dark');
    root.classList.add('dark');
  } else {
    root.setAttribute('data-theme', 'light');
    root.classList.remove('dark');
  }
};

export const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        theme: 'system',
        isDark: calculateIsDark('system'),

        // Set theme
        setTheme: (theme: Theme) => {
          const isDark = calculateIsDark(theme);
          applyTheme(isDark);
          set({ theme, isDark });
        },

        // Toggle between light and dark
        toggleTheme: () => {
          const currentTheme = get().theme;
          const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
          const isDark = calculateIsDark(newTheme);
          applyTheme(isDark);
          set({ theme: newTheme, isDark });
        },
      }),
      {
        name: 'theme-storage',
        onRehydrateStorage: () => (state) => {
          // Apply theme after hydration
          if (state) {
            const isDark = calculateIsDark(state.theme);
            applyTheme(isDark);
          }
        },
      }
    ),
    { name: 'ThemeStore' }
  )
);

// Listen for system theme changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const state = useThemeStore.getState();
    if (state.theme === 'system') {
      const isDark = e.matches;
      applyTheme(isDark);
      useThemeStore.setState({ isDark });
    }
  });
}

// Selectors
export const selectTheme = (state: ThemeStore) => state.theme;
export const selectIsDark = (state: ThemeStore) => state.isDark;

export default useThemeStore;

