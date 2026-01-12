/**
 * Application Router
 * Main router configuration with route guards
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ErrorBoundary } from '@/components/common';
import { ROUTES } from '@/config/constants';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';

import { ProtectedRoute, PublicOnlyRoute } from './ProtectedRoute';
import { publicRoutes, authRoutes, protectedRoutes } from './routes';

import type { RouteConfig } from './routes';

/**
 * Render route with appropriate wrapper
 */
const renderRoute = (route: RouteConfig) => {
  let element = route.element;

  // Wrap with PublicOnlyRoute if needed
  if (route.isPublicOnly) {
    element = <PublicOnlyRoute>{element}</PublicOnlyRoute>;
  }

  // Wrap with ProtectedRoute if needed
  if (route.isProtected) {
    element = <ProtectedRoute roles={route.roles}>{element}</ProtectedRoute>;
  }

  return <Route key={route.path} element={element} path={route.path} />;
};

/**
 * Application Router Component
 */
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {/* Auth routes with AuthLayout */}
          <Route element={<AuthLayout />}>
            {authRoutes.map(renderRoute)}
          </Route>

          {/* Main routes with MainLayout */}
          <Route element={<MainLayout />}>
            {publicRoutes.map(renderRoute)}
            {protectedRoutes.map(renderRoute)}
          </Route>

          {/* Catch-all redirect to 404 */}
          <Route element={<Navigate replace to={ROUTES.NOT_FOUND} />} path="*" />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRouter;

