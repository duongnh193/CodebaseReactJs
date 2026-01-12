/**
 * HTTP Service Types
 */

import type { AxiosError } from 'axios';

/**
 * Standard API Response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

/**
 * Standard API Error response
 */
export interface ApiError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
  timestamp?: string;
  path?: string;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

/**
 * Pagination params
 */
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

/**
 * Retry configuration
 */
export interface RetryConfig {
  maxRetries?: number;
  retryDelay?: number;
  retryMultiplier?: number;
  maxRetryDelay?: number;
  retryCondition?: (error: AxiosError) => boolean;
}

/**
 * Request options
 */
export interface RequestOptions {
  showLoader?: boolean;
  showErrorToast?: boolean;
  retry?: boolean | RetryConfig;
}

