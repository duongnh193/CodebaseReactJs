/**
 * useOnClickOutside Hook
 * Detect clicks outside of a specified element
 */

import { useEffect, type RefObject } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

/**
 * Handle clicks outside of a ref element
 * @param ref - React ref to the element
 * @param handler - Callback when click outside occurs
 * @param enabled - Whether the hook is enabled (default: true)
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, enabled]);
}

export default useOnClickOutside;

