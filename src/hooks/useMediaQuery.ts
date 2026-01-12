/**
 * useMediaQuery Hook
 * React hook for responsive design with media queries
 */

import { useState, useEffect } from 'react';

import { BREAKPOINTS } from '@/config/constants';

/**
 * Check if a media query matches
 * @param query - Media query string
 * @returns Whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoint hooks
 */
export const useIsMobile = () => useMediaQuery(`(max-width: ${BREAKPOINTS.SM - 1}px)`);
export const useIsTablet = () =>
  useMediaQuery(`(min-width: ${BREAKPOINTS.SM}px) and (max-width: ${BREAKPOINTS.LG - 1}px)`);
export const useIsDesktop = () => useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`);
export const useIsLargeDesktop = () => useMediaQuery(`(min-width: ${BREAKPOINTS.XL}px)`);

/**
 * Check if device prefers dark mode
 */
export const usePrefersDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)');

/**
 * Check if device prefers reduced motion
 */
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

export default useMediaQuery;

