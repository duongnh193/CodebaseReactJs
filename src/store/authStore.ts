/**
 * Authentication Store
 * Global state management for authentication using Zustand
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { authService } from '@/services/auth';
import { logger } from '@/utils/logger';

import type {
  AuthState,
  LoginCredentials,
  RegisterData,
  User,
} from '@/types/auth';

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  clearError: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Login action
        login: async (credentials: LoginCredentials) => {
          set({ isLoading: true, error: null });

          try {
            const response = await authService.login(credentials);
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            logger.info('Login successful', { userId: response.user.id });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Login failed';
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: message,
            });
            throw error;
          }
        },

        // Register action
        register: async (data: RegisterData) => {
          set({ isLoading: true, error: null });

          try {
            const response = await authService.register(data);
            set({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            logger.info('Registration successful', { userId: response.user.id });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Registration failed';
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: message,
            });
            throw error;
          }
        },

        // Logout action
        logout: async () => {
          set({ isLoading: true });

          try {
            await authService.logout();
          } finally {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
            logger.info('Logout successful');
          }
        },

        // Check authentication status
        checkAuth: async () => {
          // Skip if already checking
          if (get().isLoading) {
            return;
          }

          // Check if we have a token
          if (!authService.isAuthenticated()) {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
            return;
          }

          set({ isLoading: true });

          try {
            const user = await authService.getCurrentUser();
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            // Token might be expired, try to refresh
            try {
              await authService.refreshToken();
              const user = await authService.getCurrentUser();
              set({
                user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
            } catch (refreshError) {
              // Refresh failed, clear auth state
              set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
              });
            }
          }
        },

        // Update user data
        updateUser: (userData: Partial<User>) => {
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: { ...currentUser, ...userData },
            });
          }
        },

        // Clear error
        clearError: () => {
          set({ error: null });
        },

        // Set loading state
        setLoading: (isLoading: boolean) => {
          set({ isLoading });
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);

// Selectors
export const selectUser = (state: AuthStore) => state.user;
export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated;
export const selectIsLoading = (state: AuthStore) => state.isLoading;
export const selectError = (state: AuthStore) => state.error;

export default useAuthStore;

