/**
 * Common Types
 */

/**
 * Generic ID type
 */
export type ID = string | number;

/**
 * Nullable type helper
 */
export type Nullable<T> = T | null;

/**
 * Optional type helper
 */
export type Optional<T> = T | undefined;

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Extract non-nullable type
 */
export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

/**
 * Async function type
 */
export type AsyncFunction<T = void> = () => Promise<T>;

/**
 * Callback function type
 */
export type Callback<T = void> = (value: T) => void;

/**
 * Error callback type
 */
export type ErrorCallback = (error: Error) => void;

/**
 * Generic response wrapper
 */
export interface Response<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Select option type
 */
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

/**
 * Key-value pair
 */
export interface KeyValue<K = string, V = string> {
  key: K;
  value: V;
}

/**
 * Sort direction
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Sort configuration
 */
export interface SortConfig {
  field: string;
  direction: SortDirection;
}

/**
 * Filter operator
 */
export type FilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'in';

/**
 * Filter configuration
 */
export interface FilterConfig {
  field: string;
  operator: FilterOperator;
  value: unknown;
}

/**
 * Base entity with common fields
 */
export interface BaseEntity {
  id: ID;
  createdAt: string;
  updatedAt: string;
}

/**
 * Timestamp entity
 */
export interface TimestampEntity {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

/**
 * Status type
 */
export type Status = 'active' | 'inactive' | 'pending' | 'archived';

/**
 * Theme type
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Language type
 */
export type Language = 'en' | 'vi';

