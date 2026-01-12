/**
 * HTTP Client
 * Axios-based HTTP client with interceptors, retry logic, and error handling
 */

import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import { env } from '@/config/env';
import { HTTP_STATUS, RETRY_CONFIG } from '@/config/constants';
import { logger } from '@/utils/logger';
import { storage } from '@/utils/storage';

import type { ApiError, ApiResponse, RetryConfig } from './types';

// Extend AxiosRequestConfig to include retry metadata
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

/**
 * Create and configure the HTTP client
 */
const createHttpClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: env.apiUrl,
    timeout: env.apiTimeout,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  // Request Interceptor
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add auth token if available
      const token = storage.local.getString(env.authTokenKey);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log request in development
      logger.debug(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });

      return config;
    },
    (error: AxiosError) => {
      logger.error('[HTTP] Request error:', error);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      logger.debug(`[HTTP] Response ${response.status}`, {
        url: response.config.url,
        data: response.data,
      });
      return response;
    },
    async (error: AxiosError<ApiError>) => {
      const originalRequest = error.config as ExtendedAxiosRequestConfig | undefined;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      // Handle 401 Unauthorized - Token refresh
      if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = storage.local.getString(env.authRefreshTokenKey);
          if (refreshToken) {
            // Attempt to refresh token
            const response = await axios.post<{ accessToken: string }>(
              `${env.apiUrl}/auth/refresh`,
              { refreshToken }
            );

            const { accessToken } = response.data;
            storage.local.setString(env.authTokenKey, accessToken);

            // Retry original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            return client(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed - clear tokens and redirect to login
          storage.local.remove(env.authTokenKey);
          storage.local.remove(env.authRefreshTokenKey);
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      // Log error
      logger.error('[HTTP] Response error:', {
        status: error.response?.status,
        message: error.message,
        url: originalRequest.url,
        data: error.response?.data,
      });

      return Promise.reject(error);
    }
  );

  return client;
};

const httpClient = createHttpClient();

/**
 * Retry logic for failed requests
 */
const withRetry = async <T>(
  fn: () => Promise<AxiosResponse<T>>,
  config: RetryConfig = {}
): Promise<AxiosResponse<T>> => {
  const {
    maxRetries = RETRY_CONFIG.MAX_RETRIES,
    retryDelay = RETRY_CONFIG.RETRY_DELAY,
    retryMultiplier = RETRY_CONFIG.RETRY_MULTIPLIER,
    maxRetryDelay = RETRY_CONFIG.MAX_RETRY_DELAY,
    retryCondition = (error: AxiosError) => {
      // Retry on network errors or 5xx server errors
      return (
        !error.response ||
        (error.response.status >= 500 && error.response.status < 600) ||
        error.response.status === HTTP_STATUS.TOO_MANY_REQUESTS
      );
    },
  } = config;

  let lastError: AxiosError | undefined;
  let currentDelay = retryDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as AxiosError;

      if (attempt === maxRetries || !retryCondition(lastError)) {
        throw lastError;
      }

      logger.warn(`[HTTP] Retry attempt ${attempt + 1}/${maxRetries}`, {
        error: lastError.message,
        delay: currentDelay,
      });

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay = Math.min(currentDelay * retryMultiplier, maxRetryDelay);
    }
  }

  throw lastError;
};

/**
 * HTTP methods with type safety
 */
export const http = {
  /**
   * GET request
   */
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await httpClient.get<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  },

  /**
   * POST request
   */
  post: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await httpClient.post<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  },

  /**
   * PUT request
   */
  put: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await httpClient.put<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  },

  /**
   * PATCH request
   */
  patch: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await httpClient.patch<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  },

  /**
   * DELETE request
   */
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await httpClient.delete<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  },

  /**
   * GET with retry
   */
  getWithRetry: async <T>(
    url: string,
    config?: AxiosRequestConfig,
    retryConfig?: RetryConfig
  ): Promise<ApiResponse<T>> => {
    const response = await withRetry(() => httpClient.get<T>(url, config), retryConfig);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  },

  /**
   * POST with retry
   */
  postWithRetry: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
    retryConfig?: RetryConfig
  ): Promise<ApiResponse<T>> => {
    const response = await withRetry(() => httpClient.post<T>(url, data, config), retryConfig);
    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  },
};

export { httpClient };
export default http;

