---
name: vite-docs
description: >-
  Teaches Vite using official vitejs.dev patterns with plain-language
  explanations before code. Use when setting up or configuring Vite, running
  dev/build/preview, env variables, plugins, static assets, production builds,
  Netlify deploys, or when the user asks Vite questions or hits dev-server errors.
---

# Vite Documentation Guide

Follow [vitejs.dev](https://vitejs.dev/guide) as the authoritative source. This skill shapes *how* you explain and configure Vite for this project — not generic bundler tutorials.

## Teaching workflow

When helping with Vite (setup, config, env vars, build, deploy, or bugs), use this order:

1. **Explain first** — In plain language, say what Vite is doing (dev server vs production build) and why, before any code.
2. **Show code** — Use idiomatic patterns from vitejs.dev (see below).
3. **Walk through it** — After the code, explain what the important lines do.
4. **Say why** — Prefer "we do X because Y" over "do X".
5. **Simplest first** — Recommend the simplest correct fix first, then mention tradeoffs.

Keep explanations accessible. Do not assume the user already knows ESM, bundlers, or `import.meta`.

## What Vite is (in one paragraph)

Vite is a **build tool** with two jobs:

1. **Dev server** (`npm run dev`) — Serves your app with fast Hot Module Replacement (HMR). It treats your source as native ES modules and only transforms what the browser requests.
2. **Production build** (`npm run build`) — Bundles and optimizes static assets for deployment. Preview locally with `npm run preview`.

Docs: [Getting Started](https://vitejs.dev/guide)

## When to consult vitejs.dev

For config options, env behavior, plugin APIs, or uncertain errors, fetch the relevant page rather than guessing. Start with the table in [reference.md](reference.md).

High-priority pages for this app:

| Topic | URL |
|-------|-----|
| Getting started | https://vitejs.dev/guide |
| Features (HMR, imports, assets) | https://vitejs.dev/guide/features |
| CLI | https://vitejs.dev/guide/cli |
| Env variables and modes | https://vitejs.dev/guide/env-and-mode |
| Building for production | https://vitejs.dev/guide/build |
| Deploying a static site | https://vitejs.dev/guide/static-deploy |
| Using plugins | https://vitejs.dev/guide/using-plugins |
| Troubleshooting | https://vitejs.dev/guide/troubleshooting |
| Config reference | https://vitejs.dev/config |

## This project's Vite layout

| Piece | Location / detail |
|-------|-------------------|
| Entry HTML | `index.html` at **project root** (not inside `public/`) |
| App source | `src/` — pages, components, hooks, Firebase helpers |
| Dev command | `npm run dev` → typically `http://localhost:5173` |
| Build command | `npm run build` → output in `dist/` |
| Preview command | `npm run preview` — test production build locally |
| Env secrets | `.env.local` with `VITE_*` keys (Firebase config); never commit |
| Hosting | Netlify — static deploy from `dist/` |
| React plugin | `@vitejs/plugin-react` (Fast Refresh / HMR for React) |
| Tailwind plugin | `@tailwindcss/vite` in `vite.config.js` (see `tailwind-docs` skill) |

**Keep Vite config in `vite.config.js` at the project root.** Do not put build-tool logic inside React components.

## Core concepts (vitejs.dev)

### `index.html` is the entry point

Unlike Create React App, Vite puts `index.html` at the **root**. Vite treats it as source code and follows `<script type="module" src="...">` into your JS graph.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SEO Audit Checklist</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- The script path starts with `/` — resolved from project root.
- `main.jsx` mounts React into `#root`.

### Default npm scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

| Script | What it does |
|--------|----------------|
| `dev` | Starts dev server with HMR |
| `build` | Creates optimized `dist/` folder |
| `preview` | Serves `dist/` locally over HTTP (not `file://`) |

CLI options: `npm run dev -- --port 3000 --open`. Full list: `npx vite --help`.

### Standard `vite.config.js` for this stack

Use `defineConfig` for IDE hints. Register framework and Tailwind plugins here — not in components.

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
```

- **`react()`** — Enables JSX/ React Fast Refresh during dev.
- **`tailwindcss()`** — Processes Tailwind v4 through Vite (see `tailwind-docs` skill).

For dev-only vs build-only options, export a function:

```js
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return { /* dev */ };
  }
  return { /* build */ };
});
```

Note: In Vite's API, `command === 'serve'` during dev and `'build'` during production builds.

Docs: [Configuring Vite](https://vitejs.dev/config)

### Environment variables (`import.meta.env`)

Vite exposes env vars on **`import.meta.env`**, not `process.env` in client code.

| Constant | Meaning |
|----------|---------|
| `import.meta.env.MODE` | Current mode (`development`, `production`, or custom) |
| `import.meta.env.DEV` | `true` in dev |
| `import.meta.env.PROD` | `true` in production build |
| `import.meta.env.BASE_URL` | Base public path (from `base` config) |

**Only variables prefixed with `VITE_` are exposed to browser code.** This prevents leaking server secrets.

This app uses Firebase keys from `.env.local`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

```js
// src/firebase/config.js — read config from Vite env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ...
};
```

Rules:

- Restart the dev server after changing `.env*` files.
- Never put secrets in client code — `VITE_*` values are bundled into the JS that ships to browsers.
- Use `.env.local` for local secrets; it is gitignored in this repo.
- Env values are always **strings** — convert numbers/booleans if needed.

Docs: [Env Variables and Modes](https://vitejs.dev/guide/env-and-mode)

### Imports and path aliases

Vite supports bare imports from `node_modules` out of the box:

```js
import { useState } from 'react';
```

For cleaner paths, add an alias in config (optional):

```js
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

Then: `import Button from '@/components/ui/Button'`.

### Static assets

| Import style | Behavior |
|--------------|----------|
| `import logo from './logo.png'` | Returns resolved URL; hashed in production |
| `import logoUrl from './logo.png?url'` | URL only, no inline threshold |
| Files in `public/` | Copied as-is to `dist/` root; reference as `/filename.ext` |

Do not import files from `public/` — reference them with absolute paths from root.

Docs: [Static Asset Handling](https://vitejs.dev/guide/assets)

### HMR (Hot Module Replacement)

When you save a file during `npm run dev`, Vite updates the browser **without a full page reload** when possible. React Fast Refresh preserves component state for many edits.

If you see a **full reload** instead:

- The changed file may be outside HMR (e.g. `index.html`, env files).
- There may be a circular dependency — run `vite --debug hmr` to trace it.
- Import paths may have **wrong casing** (`./Foo.js` vs `./foo.js`) — common on Windows, breaks on Linux CI.

Restart dev server after `.env` changes.

### Production build and deploy

1. `npm run build` → outputs to `dist/`.
2. Deploy `dist/` to Netlify (or run `npm run preview` locally first).
3. For client-side routing (React Router), add a SPA redirect so unknown paths serve `index.html` — see `react-router-docs` skill.

Do **not** open `dist/index.html` via `file://` — scripts fail with CORS errors. Use `npm run preview` instead.

Docs: [Building for Production](https://vitejs.dev/guide/build), [Deploying a Static Site](https://vitejs.dev/guide/static-deploy)

## Cross-skill boundaries

| Topic | Use this skill | Also use |
|-------|----------------|----------|
| `vite.config.js`, dev server, build | **vite-docs** | — |
| React components, hooks, JSX | react-dev | vite-docs for entry/HMR |
| Tailwind in Vite | tailwind-docs | vite-docs for plugin slot |
| Routes, `BrowserRouter`, Netlify redirects | react-router-docs | vite-docs for static deploy |
| Firebase Auth/Firestore | firebase-docs | vite-docs for `VITE_*` env |

## Explaining bugs

When the user reports a Vite or dev-server issue:

1. Ask what they **expected** vs what **actually** happened.
2. Ask them to check the **terminal** (Vite errors) and **browser DevTools console**.
3. Check common causes first: missing `.env.local`, forgot to restart after env change, wrong import casing, port already in use.
4. Walk through fixes step by step.
5. Explain **why** it happened (env not loaded, ESM-only config, stale dependency cache, etc.).

## Common fixes (quick reference)

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `import.meta.env.VITE_*` is `undefined` | Missing `.env.local`, wrong prefix, or server not restarted | Add `VITE_` prefix; restart `npm run dev` |
| Port 5173 in use | Another Vite/process on same port | `npm run dev -- --port 3000` |
| White screen, no errors | Browser extension blocking Vite client | Try incognito / disable ad-blockers |
| HMR not updating | Wrong file casing in import | Match exact filename case |
| `Cannot find module` on Linux CI | Case-insensitive path on Windows | Fix import casing |
| Stale dependency behavior | Cached pre-bundle | `npm run dev -- --force` |
| Config `require()` ESM error | ESM-only package in CJS config | Use `vite.config.mjs` or `"type": "module"` |
| Build works locally, 404 on refresh | SPA needs server redirect | Netlify `_redirects` or equivalent |
| `&` in Windows project path | npm cmd-shim bug | Move project or use pnpm/yarn |

Full list: [Troubleshooting](https://vitejs.dev/guide/troubleshooting)

## Code style defaults for this project

When editing Vite-related files:

- Use **`defineConfig`** from `'vite'`.
- Keep config **ESM** (`import` / `export default`).
- Use **`import.meta.env.VITE_*`** in client code — not `process.env`.
- Prefer official plugins (`@vitejs/plugin-react`, `@tailwindcss/vite`) over custom webpack-style setup.
- Do not add secrets to committed `.env` files.

## Response shape for teaching

Use this structure for concept explanations:

```markdown
## What we're doing
[1–2 sentences — dev server vs build, or what config change fixes]

## Why this approach
[Reason tied to vitejs.dev principle]

## Code
[Minimal config or env example]

## How it works
- Line/pattern 1: ...
- Line/pattern 2: ...

## What to try next
[Optional single follow-up if natural]
```

For quick fixes in an existing codebase, you may shorten — but still explain the change and why.

## Extended reference

For CLI flags, plugin API, dependency pre-bundling, SSR, backend integration, performance profiling, and the full vitejs.dev map, see [reference.md](reference.md).
