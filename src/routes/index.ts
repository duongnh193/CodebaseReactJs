/**
 * Routes Module Entry Point
 */

export { AppRouter, default } from './AppRouter';
export { ProtectedRoute, PublicOnlyRoute } from './ProtectedRoute';
export {
  routes,
  publicRoutes,
  authRoutes,
  protectedRoutes,
  type RouteConfig,
} from './routes';

