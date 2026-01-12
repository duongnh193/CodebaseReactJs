/**
 * Protected Route Component
 * Guards routes that require authentication
 */

import { Navigate, useLocation } from 'react-router-dom';

import { LoadingOverlay } from '@/components/common';
import { ROUTES } from '@/config/constants';
import { useAuthStore } from '@/store';

import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
  redirectTo?: string;
}

/**
 * Protected Route - requires authentication
 */
export const ProtectedRoute = ({
  children,
  roles,
  redirectTo = ROUTES.LOGIN,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, isLoading, user } = useAuthStore();

  // Show loading while checking auth
  if (isLoading) {
    return <LoadingOverlay fullScreen message="Checking authentication..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to={redirectTo} />;
  }

  // Check role-based access
  if (roles && roles.length > 0 && user) {
    const hasRole = roles.includes(user.role);
    if (!hasRole) {
      return <Navigate replace to={ROUTES.UNAUTHORIZED} />;
    }
  }

  return <>{children}</>;
};

interface PublicOnlyRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Public Only Route - redirects authenticated users
 */
export const PublicOnlyRoute = ({
  children,
  redirectTo = ROUTES.DASHBOARD,
}: PublicOnlyRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  // Show loading while checking auth
  if (isLoading) {
    return <LoadingOverlay fullScreen message="Loading..." />;
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate replace to={redirectTo} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

