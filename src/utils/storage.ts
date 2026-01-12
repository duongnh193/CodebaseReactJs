/**
 * Storage Utility
 * Type-safe localStorage and sessionStorage wrapper with JSON support
 */

import { logger } from './logger';

type StorageType = 'local' | 'session';

const getStorage = (type: StorageType): Storage => {
  return type === 'local' ? localStorage : sessionStorage;
};

/**
 * Get an item from storage
 */
export const getItem = <T>(key: string, type: StorageType = 'local'): T | null => {
  try {
    const storage = getStorage(type);
    const item = storage.getItem(key);

    if (item === null) {
      return null;
    }

    return JSON.parse(item) as T;
  } catch (error) {
    logger.error(`Error reading from ${type}Storage:`, error);
    return null;
  }
};

/**
 * Set an item in storage
 */
export const setItem = <T>(key: string, value: T, type: StorageType = 'local'): boolean => {
  try {
    const storage = getStorage(type);
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    logger.error(`Error writing to ${type}Storage:`, error);
    return false;
  }
};

/**
 * Remove an item from storage
 */
export const removeItem = (key: string, type: StorageType = 'local'): boolean => {
  try {
    const storage = getStorage(type);
    storage.removeItem(key);
    return true;
  } catch (error) {
    logger.error(`Error removing from ${type}Storage:`, error);
    return false;
  }
};

/**
 * Clear all items from storage
 */
export const clear = (type: StorageType = 'local'): boolean => {
  try {
    const storage = getStorage(type);
    storage.clear();
    return true;
  } catch (error) {
    logger.error(`Error clearing ${type}Storage:`, error);
    return false;
  }
};

/**
 * Check if a key exists in storage
 */
export const hasItem = (key: string, type: StorageType = 'local'): boolean => {
  try {
    const storage = getStorage(type);
    return storage.getItem(key) !== null;
  } catch (error) {
    logger.error(`Error checking ${type}Storage:`, error);
    return false;
  }
};

/**
 * Get all keys from storage
 */
export const getKeys = (type: StorageType = 'local'): string[] => {
  try {
    const storage = getStorage(type);
    return Object.keys(storage);
  } catch (error) {
    logger.error(`Error getting keys from ${type}Storage:`, error);
    return [];
  }
};

/**
 * Get raw string value (without JSON parsing)
 */
export const getString = (key: string, type: StorageType = 'local'): string | null => {
  try {
    const storage = getStorage(type);
    return storage.getItem(key);
  } catch (error) {
    logger.error(`Error reading string from ${type}Storage:`, error);
    return null;
  }
};

/**
 * Set raw string value (without JSON stringification)
 */
export const setString = (key: string, value: string, type: StorageType = 'local'): boolean => {
  try {
    const storage = getStorage(type);
    storage.setItem(key, value);
    return true;
  } catch (error) {
    logger.error(`Error writing string to ${type}Storage:`, error);
    return false;
  }
};

/**
 * Storage object for convenient access
 */
export const storage = {
  // Local Storage
  local: {
    get: <T>(key: string) => getItem<T>(key, 'local'),
    set: <T>(key: string, value: T) => setItem(key, value, 'local'),
    remove: (key: string) => removeItem(key, 'local'),
    clear: () => clear('local'),
    has: (key: string) => hasItem(key, 'local'),
    keys: () => getKeys('local'),
    getString: (key: string) => getString(key, 'local'),
    setString: (key: string, value: string) => setString(key, value, 'local'),
  },

  // Session Storage
  session: {
    get: <T>(key: string) => getItem<T>(key, 'session'),
    set: <T>(key: string, value: T) => setItem(key, value, 'session'),
    remove: (key: string) => removeItem(key, 'session'),
    clear: () => clear('session'),
    has: (key: string) => hasItem(key, 'session'),
    keys: () => getKeys('session'),
    getString: (key: string) => getString(key, 'session'),
    setString: (key: string, value: string) => setString(key, value, 'session'),
  },
};

export default storage;

