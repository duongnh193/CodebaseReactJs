/**
 * useLocalStorage Hook
 * Persist state to localStorage with type safety
 */

import { useState, useEffect, useCallback } from 'react';

import { storage } from '@/utils/storage';

/**
 * Use localStorage to persist state
 * @param key - Storage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns [value, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Get initial value from storage or use default
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = storage.local.get<T>(key);
    return item !== null ? item : initialValue;
  });

  // Update storage when value changes
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : value;
        storage.local.set(key, newValue);
        return newValue;
      });
    },
    [key]
  );

  // Remove from storage
  const removeValue = useCallback(() => {
    storage.local.remove(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  // Sync with other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue) as T);
        } catch {
          // Ignore parse errors
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;

