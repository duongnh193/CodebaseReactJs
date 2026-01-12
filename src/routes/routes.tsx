/**
 * Route Definitions
 * Centralized route configuration with lazy loading
 */

import { lazy, Suspense, type ComponentType } from 'react';

import { LoadingOverlay } from '@/components/common';
import { ROUTES } from '@/config/constants';

/**
 * Lazy load wrapper with loading fallback
 */
const lazyLoad = <T extends ComponentType<object>>(
  importFn: () => Promise<{ default: T }>
) => {
  const LazyComponent = lazy(importFn);

  return (props: object) => (
    <Suspense fallback={<LoadingOverlay />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Lazy loaded pages
const HomePage = lazyLoad(() => import('@/pages/HomePage'));
const LoginPage = lazyLoad(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazyLoad(() => import('@/pages/auth/RegisterPage'));
const ForgotPasswordPage = lazyLoad(() => import('@/pages/auth/ForgotPasswordPage'));
const DashboardPage = lazyLoad(() => import('@/pages/DashboardPage'));
const ProfilePage = lazyLoad(() => import('@/pages/ProfilePage'));
const SettingsPage = lazyLoad(() => import('@/pages/SettingsPage'));
const NotFoundPage = lazyLoad(() => import('@/pages/errors/NotFoundPage'));
const UnauthorizedPage = lazyLoad(() => import('@/pages/errors/UnauthorizedPage'));
const ServerErrorPage = lazyLoad(() => import('@/pages/errors/ServerErrorPage'));

/**
 * Route configuration type
 */
export interface RouteConfig {
  path: string;
  element: JSX.Element;
  isProtected?: boolean;
  isPublicOnly?: boolean; // Only for non-authenticated users (login, register)
  roles?: string[];
  children?: RouteConfig[];
}

/**
 * Public routes (accessible to everyone)
 */
export const publicRoutes: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
  {
    path: ROUTES.UNAUTHORIZED,
    element: <UnauthorizedPage />,
  },
  {
    path: ROUTES.SERVER_ERROR,
    element: <ServerErrorPage />,
  },
];

/**
 * Auth routes (only for non-authenticated users)
 */
export const authRoutes: RouteConfig[] = [
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
    isPublicOnly: true,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
    isPublicOnly: true,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
    isPublicOnly: true,
  },
];

/**
 * Protected routes (require authentication)
 */
export const protectedRoutes: RouteConfig[] = [
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardPage />,
    isProtected: true,
  },
  {
    path: ROUTES.PROFILE,
    element: <ProfilePage />,
    isProtected: true,
  },
  {
    path: ROUTES.SETTINGS,
    element: <SettingsPage />,
    isProtected: true,
  },
];

/**
 * All routes combined
 */
export const routes: RouteConfig[] = [...publicRoutes, ...authRoutes, ...protectedRoutes];

export default routes;

