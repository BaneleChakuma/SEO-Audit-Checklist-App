---
name: react-router-docs
description: >-
  Teaches React Router using official reactrouter.com patterns with plain-language
  explanations before code. Use when setting up routes, navigation, nested layouts,
  URL params, protected routes, SPA hosting redirects, or when the user asks
  React Router questions.
---

# React Router Documentation Guide

Follow [reactrouter.com](https://reactrouter.com/home) as the authoritative source. This skill shapes *how* you explain and write routing for this project — not generic SPA tutorials.

## Teaching workflow

When helping with React Router (setup, routes, navigation, or bugs), use this order:

1. **Explain first** — In plain language, say which URL should show which screen and why, before any code.
2. **Show code** — Use **declarative mode** patterns from reactrouter.com (see below).
3. **Walk through it** — After the code, explain what the important lines do.
4. **Say why** — Prefer "we use X because Y" over "use X".
5. **Simplest first** — Recommend the simplest correct route config first, then mention tradeoffs.

Keep explanations accessible. Do not assume the user already knows nested routes, outlets, or programmatic navigation.

## Pick the right mode

React Router has three modes. **This app uses declarative mode** — a Vite + React SPA with `BrowserRouter`, `Routes`, and `Route`.

| Mode | When to use | This app? |
|------|-------------|-----------|
| **Declarative** | Client-rendered SPA; routes defined in JSX | **Yes** |
| Data | Loaders/actions, `createBrowserRouter` | No (unless user asks) |
| Framework | Full-stack React Router app with `@react-router/dev` | No |

Docs: [Picking a Mode](https://reactrouter.com/start/modes)

Do not suggest Framework or Data mode for routine page routing in this repo unless the user explicitly wants loaders or a full-stack setup.

## When to consult reactrouter.com

For route syntax, hook behavior, or uncertain APIs, fetch the relevant doc page rather than guessing. Start with the table in [reference.md](reference.md).

High-priority pages for this app:

| Topic | URL |
|-------|-----|
| Docs home | https://reactrouter.com/home |
| Declarative — installation | https://reactrouter.com/start/declarative/installation |
| Declarative — routing | https://reactrouter.com/start/declarative/routing |
| Declarative — navigating | https://reactrouter.com/start/declarative/navigating |
| Declarative — URL values | https://reactrouter.com/start/declarative/url-values |
| API reference | https://api.reactrouter.com/v8/ |

## Package and imports

**This project targets React Router v6** (`react-router-dom`). Official docs show v7+ imports from `react-router`; patterns are the same, package name differs.

| Version | Install | Typical import |
|---------|---------|----------------|
| v6 (this app) | `npm install react-router-dom` | `import { Link } from 'react-router-dom'` |
| v7+ | `npm install react-router` | `import { Link } from 'react-router'` |

When writing new code for this repo, use **`react-router-dom`** unless the user is upgrading. When consulting reactrouter.com examples, translate `react-router` → `react-router-dom` for v6.

## This project's routing layout

Match existing conventions in this repo:

| Location | Responsibility |
|----------|----------------|
| `src/pages/` | One page component per URL (Landing, Login, Checklist, Results, etc.) |
| `src/components/layout/` | Shared shell (`Navbar`, `Footer`) — often wraps an `<Outlet />` |
| `src/hooks/useAuth.js` | Auth state for protected routes |
| `src/App.jsx` (or `main.jsx`) | `BrowserRouter`, `Routes`, and `Route` definitions |

**Keep route config in one place** (usually `App.jsx`). Page components should not define global routes.

### Suggested routes for this app

| Path | Page | Notes |
|------|------|-------|
| `/` | `LandingPage` | Public entry |
| `/login` | `LoginPage` | Auth |
| `/register` | `RegisterPage` | Auth |
| `/checklist` | `ChecklistPage` | Main audit flow |
| `/results` | `ResultsPage` | Score summary |
| `/fix-tips` | `FixTipsPage` | Failed-item suggestions |
| `/export` | `ExportPage` | PDF export |

Adjust paths to match what the user already wired; do not rename URLs without asking.

## Setup (Vite + React — declarative mode)

Docs: [Declarative installation](https://reactrouter.com/start/declarative/installation)

### 1. Install

```bash
npm install react-router-dom
```

### 2. Wrap the app (`main.jsx`)

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

- `BrowserRouter` uses the HTML5 history API — clean URLs like `/checklist`, not `#/checklist`.
- Wrap **once** at the root; nested routers are rare in this app.

### 3. Define routes (`App.jsx`)

```jsx
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import ChecklistPage from './pages/ChecklistPage.jsx';
// ... other page imports

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/checklist" element={<ChecklistPage />} />
      {/* add remaining routes */}
    </Routes>
  );
};

export default App;
```

- `path` is the URL segment; `element` is the React component to render.
- Unmatched URLs render nothing unless you add a catch-all route (see below).

## Core patterns (declarative)

Docs: [Routing](https://reactrouter.com/start/declarative/routing)

### Layout route with Outlet

Use a parent route when several pages share `Navbar` and `Footer`:

```jsx
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

// In Routes:
<Route element={<AppLayout />}>
  <Route path="/" element={<LandingPage />} />
  <Route path="/checklist" element={<ChecklistPage />} />
</Route>
```

- `<Outlet />` is where child route components render.
- A layout route **without** `path` does not add a URL segment — good for shared chrome.

### Dynamic segments (`useParams`)

```jsx
<Route path="/sessions/:sessionId" element={<SessionPage />} />
```

```jsx
import { useParams } from 'react-router-dom';

const SessionPage = () => {
  const { sessionId } = useParams();
  // use sessionId to load Firestore data
};
```

### Index routes

`index` renders at the parent's URL inside its `<Outlet />`:

```jsx
<Route path="dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

### 404 / not found

```jsx
<Route path="*" element={<NotFoundPage />} />
```

Place the splat route **last** in `Routes`.

## Navigation

Docs: [Navigating](https://reactrouter.com/start/declarative/navigating)

### Link and NavLink

```jsx
import { Link, NavLink } from 'react-router-dom';

// Plain link — no active styling
<Link to="/checklist">Start audit</Link>

// Nav link — active state for current URL (good for Navbar)
<NavLink
  to="/checklist"
  className={({ isActive }) =>
    isActive ? 'text-green-600 font-semibold' : 'text-gray-600'
  }
>
  Checklist
</NavLink>
```

- Prefer `Link` / `NavLink` over `<a href>` for in-app navigation — avoids full page reloads.
- Use `end` on `NavLink` when the path should match exactly (e.g. `/` vs `/checklist`).

### useNavigate (programmatic)

Use after form success, logout, or auth redirects — not for ordinary menu links:

```jsx
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/checklist');
  };
};
```

### Navigate (declarative redirect)

```jsx
import { Navigate } from 'react-router-dom';

const ProtectedPage = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;

  return <ChecklistPage />;
};
```

- `replace` avoids stacking history entries (good after login/logout).

## Protected routes (with Firebase auth)

This app uses `useAuth` — routing should respect loading and signed-in state:

1. **While auth is loading** — show a spinner; do not redirect yet.
2. **If route requires auth and no user** — `<Navigate to="/login" replace />`.
3. **If user is on login but already signed in** — redirect to `/checklist` or `/`.

Wrap protected pages in a small guard component rather than duplicating logic in every page:

```jsx
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  return children;
};

// Usage:
<Route
  path="/export"
  element={
    <RequireAuth>
      <ExportPage />
    </RequireAuth>
  }
/>
```

Firebase auth logic stays in `src/firebase/` and `useAuth` — the guard only reads hook state.

## URL values (location and search)

Docs: [URL values](https://reactrouter.com/start/declarative/url-values)

| Hook | Use for |
|------|---------|
| `useLocation()` | Current pathname, hash, or `state` passed from `navigate` |
| `useSearchParams()` | Query string (`?category=technical`) |
| `useParams()` | Dynamic path segments (`:sessionId`) |

Example — return user to intended page after login:

```jsx
// When redirecting to login:
navigate('/login', { state: { from: '/export' } });

// After successful login:
const location = useLocation();
const from = location.state?.from ?? '/checklist';
navigate(from, { replace: true });
```

## SPA hosting (Netlify)

Client-side routes need a fallback to `index.html` or direct visits to `/checklist` return 404 from the server.

Add `public/_redirects` (or Netlify config):

```
/*    /index.html   200
```

Explain **why**: the server must serve the SPA shell for all paths; React Router then picks the right page.

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `<a href="/checklist">` for in-app links | Use `<Link to="/checklist">` |
| `onClick={() => navigate('/x')}` on every nav item | Use `NavLink` for menus |
| Routes defined inside page components | Centralize in `App.jsx` |
| Redirect before auth finishes loading | Wait for `loading === false` |
| Forgot `<Outlet />` in layout | Child routes never appear |
| `path="*"` not last | Catch-all swallows other routes |
| Full page refresh on navigation | Ensure `BrowserRouter` wraps the app |

## Explaining routing bugs

When the user reports a routing bug:

1. Ask what URL they expected vs what appeared (blank page, 404, wrong page).
2. Ask them to check the **browser address bar** and **DevTools console** for errors.
3. Verify `BrowserRouter`, `Routes`, and matching `path` / `element`.
4. For Netlify 404s on refresh, check `_redirects`.
5. Explain **why** (missing route, wrong import package, auth guard firing early, etc.).

## Code style defaults

Match this project and the `react-dev` skill:

- Functional components only; `const` + arrow functions
- Page components in `src/pages/`
- Tailwind via `className` on links and layouts (`tailwind-docs` skill)
- Handle **loading** and **error** states in guards and pages
- Comments on non-obvious route or redirect logic

## Response shape for teaching

Use this structure for concept explanations:

```markdown
## What we're doing
[Which URL maps to which screen, in plain language]

## Why this approach
[Declarative mode, Link vs navigate, layout route, etc.]

## Code
[Minimal route or navigation example]

## How it works
- Line/pattern 1: ...
- Line/pattern 2: ...

## What to try next
[Optional single follow-up if natural]
```

For quick fixes in an existing codebase, you may shorten — but still explain the change and why.

## Extended reference

For Data mode, Framework mode, upgrading v6→v7→v8, and the full reactrouter.com map, see [reference.md](reference.md).
