# React Base Production Template

Production-ready React template với TypeScript, Vite, và best practices cho mọi dự án.

## 🚀 Features

- **⚡ Vite** - Build tool nhanh với HMR
- **📘 TypeScript** - Type safety với strict mode
- **🎨 CSS Variables** - Theme system với dark mode
- **🔐 Authentication** - Auth flow hoàn chỉnh với JWT
- **🌐 HTTP Client** - Axios với retry logic và error handling
- **📦 State Management** - Zustand cho global state
- **🛡️ Error Boundary** - Catch errors gracefully
- **🧭 React Router** - Routing với lazy loading
- **✨ ESLint + Prettier** - Code quality và formatting
- **🐶 Husky** - Git hooks với lint-staged
- **🐳 Docker** - Production-ready containerization
- **🔧 Nginx** - Optimized config cho SPA

## 📁 Cấu trúc thư mục

```
src/
├── components/          # Reusable components
│   └── common/          # Common UI components
├── config/              # Configuration files
│   ├── constants.ts     # App constants
│   ├── env.ts           # Environment variables
│   └── index.ts
├── hooks/               # Custom React hooks
│   ├── useAsync.ts
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   └── useOnClickOutside.ts
├── layouts/             # Page layouts
│   ├── AuthLayout.tsx
│   └── MainLayout.tsx
├── pages/               # Page components
│   ├── auth/            # Auth pages
│   ├── errors/          # Error pages
│   └── ...
├── routes/              # Routing configuration
│   ├── AppRouter.tsx
│   ├── ProtectedRoute.tsx
│   └── routes.tsx
├── services/            # API services
│   ├── auth/            # Auth service
│   └── http/            # HTTP client
├── store/               # Global state (Zustand)
│   ├── authStore.ts
│   └── themeStore.ts
├── styles/              # Global styles
│   ├── index.css
│   ├── reset.css
│   ├── utilities.css
│   └── variables.css
├── types/               # TypeScript types
│   ├── auth.ts
│   └── common.ts
├── utils/               # Utility functions
│   ├── helpers.ts
│   ├── logger.ts
│   └── storage.ts
├── App.tsx              # Root component
└── main.tsx             # Entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone hoặc copy template
cp -r base_reactjs my-new-project
cd my-new-project

# Install dependencies
npm install

# Setup husky
npm run prepare

# Start development server
npm start
```

### Environment Variables

Copy `.env.example` sang `.env` và cập nhật các giá trị:

```bash
cp .env.example .env
```

Các biến môi trường:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | API base URL | `/api` |
| `VITE_API_TIMEOUT` | API timeout (ms) | `30000` |
| `VITE_APP_NAME` | Application name | `React App` |
| `VITE_ENABLE_MOCK_API` | Enable mock API | `false` |
| `VITE_SENTRY_DSN` | Sentry DSN | - |

## 📜 Available Scripts

```bash
# Development
npm start          # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build

# Code Quality
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors
npm run format     # Format with Prettier
npm run type-check # TypeScript type check

# Testing
npm test           # Run tests
npm run test:coverage  # Run tests with coverage
npm run test:ui    # Run tests with UI

# Analysis
npm run analyze    # Analyze bundle size
```

## 🏗️ Build & Deploy

### Development

```bash
npm start
```

### Production Build

```bash
npm run build
```

### Docker

```bash
# Build image
docker build -t my-app .

# Run container
docker run -p 3000:80 my-app

# Or use docker-compose
docker-compose up -d
```

## 🎨 Theming

### CSS Variables

Theme được định nghĩa trong `src/styles/variables.css`:

```css
:root {
  --color-primary-500: #3b82f6;
  --bg-primary: #ffffff;
  --text-primary: #111827;
  /* ... */
}

[data-theme='dark'] {
  --bg-primary: #111827;
  --text-primary: #f9fafb;
  /* ... */
}
```

### Toggle Theme

```tsx
import { useThemeStore } from '@/store';

const { theme, setTheme, toggleTheme } = useThemeStore();

// Set specific theme
setTheme('dark');

// Toggle between light/dark
toggleTheme();
```

## 🔐 Authentication

### Login

```tsx
import { useAuthStore } from '@/store';

const { login, isLoading, error } = useAuthStore();

await login({ email, password });
```

### Protected Routes

```tsx
import { ProtectedRoute } from '@/routes';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute roles={['admin', 'user']}>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

## 🌐 HTTP Client

### Basic Usage

```tsx
import { http } from '@/services/http';

// GET request
const response = await http.get<User[]>('/users');

// POST request
const user = await http.post<User>('/users', { name: 'John' });

// With retry
const data = await http.getWithRetry<Data>('/data', {}, {
  maxRetries: 3,
  retryDelay: 1000,
});
```

## 🪝 Custom Hooks

### useAsync

```tsx
import { useAsync } from '@/hooks';

const { data, isLoading, error, execute } = useAsync(fetchUsers);

// Execute manually
await execute();
```

### useDebounce

```tsx
import { useDebounce } from '@/hooks';

const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 300);
```

### useLocalStorage

```tsx
import { useLocalStorage } from '@/hooks';

const [value, setValue, removeValue] = useLocalStorage('key', defaultValue);
```

### useMediaQuery

```tsx
import { useIsMobile, useIsDesktop } from '@/hooks';

const isMobile = useIsMobile();
const isDesktop = useIsDesktop();
```

## 📝 Coding Standards

### Commit Messages

Sử dụng [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(auth): add login functionality
fix(api): handle network errors
docs: update README
style: format code
refactor(utils): simplify helper functions
test: add unit tests for auth
chore: update dependencies
```

### Import Order

ESLint tự động sắp xếp imports:

```tsx
// 1. React
import React from 'react';

// 2. External libraries
import { useNavigate } from 'react-router-dom';

// 3. Internal modules (using aliases)
import { useAuthStore } from '@/store';
import { Button } from '@/components/common';

// 4. Types
import type { User } from '@/types';
```

## 📄 License

MIT License - feel free to use for any project.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

