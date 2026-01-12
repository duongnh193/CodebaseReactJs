/**
 * Test Utilities
 * Custom render functions and test helpers
 */

import { render, type RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import type { ReactElement, ReactNode } from 'react';

/**
 * Custom render with providers
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
}

const AllProviders = ({ children }: { children: ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const { route = '/', ...renderOptions } = options || {};

  // Set initial route
  window.history.pushState({}, 'Test page', route);

  return render(ui, {
    wrapper: AllProviders,
    ...renderOptions,
  });
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

