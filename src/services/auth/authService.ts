/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { env } from '@/config/env';
import { API_ENDPOINTS } from '@/config/constants';
import { http } from '@/services/http';
import { storage } from '@/utils/storage';
import { logger } from '@/utils/logger';

import type {
  AuthResponse,
  AuthTokens,
  ChangePasswordData,
  LoginCredentials,
  RegisterData,
  ResetPasswordData,
  User,
} from '@/types/auth';

/**
 * Store authentication tokens
 */
const storeTokens = (tokens: AuthTokens): void => {
  storage.local.setString(env.authTokenKey, tokens.accessToken);
  storage.local.setString(env.authRefreshTokenKey, tokens.refreshToken);
};

/**
 * Clear authentication tokens
 */
const clearTokens = (): void => {
  storage.local.remove(env.authTokenKey);
  storage.local.remove(env.authRefreshTokenKey);
};

/**
 * Store user data
 */
const storeUser = (user: User): void => {
  storage.local.set('user', user);
};

/**
 * Clear user data
 */
const clearUser = (): void => {
  storage.local.remove('user');
};

/**
 * Authentication Service
 */
export const authService = {
  /**
   * Login with credentials
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await http.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);

      // Store tokens and user
      storeTokens(response.data.tokens);
      storeUser(response.data.user);

      logger.info('User logged in successfully', { userId: response.data.user.id });

      return response.data;
    } catch (error) {
      logger.error('Login failed', error);
      throw error;
    }
  },

  /**
   * Register new user
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await http.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);

      // Store tokens and user
      storeTokens(response.data.tokens);
      storeUser(response.data.user);

      logger.info('User registered successfully', { userId: response.data.user.id });

      return response.data;
    } catch (error) {
      logger.error('Registration failed', error);
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      // Call logout endpoint to invalidate token on server
      await http.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Log but don't throw - we want to clear local state regardless
      logger.warn('Logout API call failed', error);
    } finally {
      // Always clear local state
      clearTokens();
      clearUser();
      logger.info('User logged out');
    }
  },

  /**
   * Refresh authentication tokens
   */
  refreshToken: async (): Promise<AuthTokens> => {
    const refreshToken = storage.local.getString(env.authRefreshTokenKey);

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await http.post<AuthTokens>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
        refreshToken,
      });

      storeTokens(response.data);
      logger.debug('Token refreshed successfully');

      return response.data;
    } catch (error) {
      logger.error('Token refresh failed', error);
      clearTokens();
      clearUser();
      throw error;
    }
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await http.get<User>(API_ENDPOINTS.AUTH.ME);
      storeUser(response.data);
      return response.data;
    } catch (error) {
      logger.error('Failed to get current user', error);
      throw error;
    }
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email: string): Promise<void> => {
    try {
      await http.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
      logger.info('Password reset email sent', { email });
    } catch (error) {
      logger.error('Forgot password request failed', error);
      throw error;
    }
  },

  /**
   * Reset password with token
   */
  resetPassword: async (data: ResetPasswordData): Promise<void> => {
    try {
      await http.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
      logger.info('Password reset successfully');
    } catch (error) {
      logger.error('Password reset failed', error);
      throw error;
    }
  },

  /**
   * Change password (authenticated user)
   */
  changePassword: async (data: ChangePasswordData): Promise<void> => {
    try {
      await http.put(API_ENDPOINTS.USERS.UPDATE_PASSWORD, data);
      logger.info('Password changed successfully');
    } catch (error) {
      logger.error('Password change failed', error);
      throw error;
    }
  },

  /**
   * Verify email with token
   */
  verifyEmail: async (token: string): Promise<void> => {
    try {
      await http.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
      logger.info('Email verified successfully');
    } catch (error) {
      logger.error('Email verification failed', error);
      throw error;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!storage.local.getString(env.authTokenKey);
  },

  /**
   * Get stored user
   */
  getStoredUser: (): User | null => {
    return storage.local.get<User>('user');
  },

  /**
   * Get access token
   */
  getAccessToken: (): string | null => {
    return storage.local.getString(env.authTokenKey);
  },
};

export default authService;

