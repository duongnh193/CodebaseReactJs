/**
 * Logger Utility
 * Centralized logging with environment-aware output
 */

import { env } from '@/config/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
}

const LOG_COLORS = {
  debug: '#9CA3AF',
  info: '#3B82F6',
  warn: '#F59E0B',
  error: '#EF4444',
} as const;

const formatTimestamp = (): string => {
  return new Date().toISOString();
};

const formatLogEntry = (level: LogLevel, message: string, data?: unknown): LogEntry => {
  return {
    level,
    message,
    timestamp: formatTimestamp(),
    data,
  };
};

const shouldLog = (level: LogLevel): boolean => {
  // Always log errors
  if (level === 'error') {
    return true;
  }

  // In production, only log warnings and errors
  if (env.isProduction) {
    return level === 'warn';
  }

  // In development/test, log everything
  return true;
};

const logToConsole = (entry: LogEntry): void => {
  if (!shouldLog(entry.level)) {
    return;
  }

  const color = LOG_COLORS[entry.level];
  const prefix = `%c[${entry.level.toUpperCase()}]`;
  const style = `color: ${color}; font-weight: bold;`;

  switch (entry.level) {
    case 'debug':
      if (entry.data !== undefined) {
        console.debug(prefix, style, entry.message, entry.data);
      } else {
        console.debug(prefix, style, entry.message);
      }
      break;
    case 'info':
      if (entry.data !== undefined) {
        console.info(prefix, style, entry.message, entry.data);
      } else {
        console.info(prefix, style, entry.message);
      }
      break;
    case 'warn':
      if (entry.data !== undefined) {
        console.warn(prefix, style, entry.message, entry.data);
      } else {
        console.warn(prefix, style, entry.message);
      }
      break;
    case 'error':
      if (entry.data !== undefined) {
        console.error(prefix, style, entry.message, entry.data);
      } else {
        console.error(prefix, style, entry.message);
      }
      break;
  }
};

/**
 * Logger instance with methods for each log level
 */
export const logger = {
  /**
   * Debug level logging - only in development
   */
  debug: (message: string, data?: unknown): void => {
    const entry = formatLogEntry('debug', message, data);
    logToConsole(entry);
  },

  /**
   * Info level logging - general information
   */
  info: (message: string, data?: unknown): void => {
    const entry = formatLogEntry('info', message, data);
    logToConsole(entry);
  },

  /**
   * Warning level logging - potential issues
   */
  warn: (message: string, data?: unknown): void => {
    const entry = formatLogEntry('warn', message, data);
    logToConsole(entry);
  },

  /**
   * Error level logging - errors and exceptions
   */
  error: (message: string, error?: unknown): void => {
    const entry = formatLogEntry('error', message, error);
    logToConsole(entry);

    // In production, you might want to send errors to a service like Sentry
    // if (env.isProduction && env.sentryDsn) {
    //   Sentry.captureException(error);
    // }
  },

  /**
   * Group related logs together
   */
  group: (label: string, fn: () => void): void => {
    if (!env.isProduction) {
      console.group(label);
      fn();
      console.groupEnd();
    }
  },

  /**
   * Log a table of data
   */
  table: (data: unknown): void => {
    if (!env.isProduction) {
      console.table(data);
    }
  },

  /**
   * Measure execution time
   */
  time: (label: string): void => {
    if (!env.isProduction) {
      console.time(label);
    }
  },

  timeEnd: (label: string): void => {
    if (!env.isProduction) {
      console.timeEnd(label);
    }
  },
};

export default logger;

