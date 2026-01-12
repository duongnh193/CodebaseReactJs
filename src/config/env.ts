/**
 * Environment Configuration
 * Centralized environment variables with type safety and validation
 */

interface EnvConfig {
  // API
  apiUrl: string;
  apiTimeout: number;

  // App
  appName: string;
  appVersion: string;

  // Feature Flags
  enableMockApi: boolean;
  enableDebugMode: boolean;

  // Auth
  authTokenKey: string;
  authRefreshTokenKey: string;

  // Sentry
  sentryDsn: string;
  sentryEnvironment: string;

  // Analytics
  gaTrackingId: string;

  // Environment
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
}

const getEnvVar = (key: string, defaultValue = ''): string => {
  return import.meta.env[key] ?? defaultValue;
};

const getEnvBool = (key: string, defaultValue = false): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) {
    return defaultValue;
  }
  return value === 'true' || value === '1';
};

const getEnvNumber = (key: string, defaultValue: number): number => {
  const value = import.meta.env[key];
  if (value === undefined) {
    return defaultValue;
  }
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

export const env: EnvConfig = {
  // API
  apiUrl: getEnvVar('VITE_API_URL', '/api'),
  apiTimeout: getEnvNumber('VITE_API_TIMEOUT', 30000),

  // App
  appName: getEnvVar('VITE_APP_NAME', 'React App'),
  appVersion: getEnvVar('VITE_APP_VERSION', '1.0.0'),

  // Feature Flags
  enableMockApi: getEnvBool('VITE_ENABLE_MOCK_API', false),
  enableDebugMode: getEnvBool('VITE_ENABLE_DEBUG_MODE', false),

  // Auth
  authTokenKey: getEnvVar('VITE_AUTH_TOKEN_KEY', 'auth_token'),
  authRefreshTokenKey: getEnvVar('VITE_AUTH_REFRESH_TOKEN_KEY', 'refresh_token'),

  // Sentry
  sentryDsn: getEnvVar('VITE_SENTRY_DSN', ''),
  sentryEnvironment: getEnvVar('VITE_SENTRY_ENVIRONMENT', 'development'),

  // Analytics
  gaTrackingId: getEnvVar('VITE_GA_TRACKING_ID', ''),

  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  isTest: import.meta.env.MODE === 'test',
};

// Validate required environment variables in production
if (env.isProduction) {
  const requiredVars = ['VITE_API_URL'];
  const missingVars = requiredVars.filter((key) => !import.meta.env[key]);

  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

export default env;

