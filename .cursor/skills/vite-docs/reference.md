# Vite documentation map

Use this when the task goes beyond dev scripts, basic config, and env vars for this app.

## Guide — introduction

| Topic | URL |
|-------|-----|
| Getting started | https://vitejs.dev/guide |
| Philosophy | https://vitejs.dev/guide/philosophy |
| Why Vite | https://vitejs.dev/guide/why |

## Guide — core usage

| Topic | URL |
|-------|-----|
| Features | https://vitejs.dev/guide/features |
| CLI | https://vitejs.dev/guide/cli |
| Using plugins | https://vitejs.dev/guide/using-plugins |
| Dependency pre-bundling | https://vitejs.dev/guide/dep-pre-bundling |
| Static asset handling | https://vitejs.dev/guide/assets |
| Building for production | https://vitejs.dev/guide/build |
| Deploying a static site | https://vitejs.dev/guide/static-deploy |
| Env variables and modes | https://vitejs.dev/guide/env-and-mode |
| Server-side rendering (SSR) | https://vitejs.dev/guide/ssr |
| Backend integration | https://vitejs.dev/guide/backend-integration |
| Troubleshooting | https://vitejs.dev/guide/troubleshooting |
| Performance | https://vitejs.dev/guide/performance |
| Migration from v7 | https://vitejs.dev/guide/migration |
| Breaking changes | https://vitejs.dev/changes |

## Config reference (selected)

| Topic | URL |
|-------|-----|
| Configuring Vite (overview) | https://vitejs.dev/config |
| Shared options | https://vitejs.dev/config/shared-options |
| Server options | https://vitejs.dev/config/server-options |
| Build options | https://vitejs.dev/config/build-options |
| Preview options | https://vitejs.dev/config/preview-options |
| Dep optimization options | https://vitejs.dev/config/dep-optimization-options |
| CSS options | https://vitejs.dev/config/shared-options#css |
| `define` | https://vitejs.dev/config/shared-options#define |
| `resolve.alias` | https://vitejs.dev/config/shared-options#resolve-alias |
| `base` | https://vitejs.dev/config/shared-options#base |

## API reference

| Topic | URL |
|-------|-----|
| Plugin API | https://vitejs.dev/guide/api-plugin |
| HMR API | https://vitejs.dev/guide/api-hmr |
| JavaScript API | https://vitejs.dev/guide/api-javascript |

## Official plugins (common)

| Plugin | Purpose | URL |
|--------|---------|-----|
| `@vitejs/plugin-react` | React + Fast Refresh | https://github.com/vitejs/vite-plugin-react |
| `@vitejs/plugin-react-swc` | React with SWC | https://github.com/vitejs/vite-plugin-react-swc |
| `@vitejs/plugin-legacy` | Legacy browser support | https://github.com/vitejs/vite/tree/main/packages/plugin-legacy |
| `@tailwindcss/vite` | Tailwind CSS v4 | https://tailwindcss.com/docs/installation/using-vite |

## Features — deep topics

### npm dependency pre-bundling

Bare imports like `import x from 'my-package'` fail in the browser without a bundler. Vite pre-bundles dependencies with Rolldown and serves them from `/node_modules/.vite/deps/`.

- Strong HTTP caching — use `vite --force` after linking local packages or odd dependency edits.
- Docs: https://vitejs.dev/guide/dep-pre-bundling

### TypeScript (if project adds TS)

- Vite transpiles `.ts` but does **not** type-check — use IDE + `tsc --noEmit` or `vite-plugin-checker`.
- Set `"isolatedModules": true` in `tsconfig.json`.
- Docs: https://vitejs.dev/guide/features#typescript

### CSS

- Import CSS from JS: `import './styles.css'` — HMR supported.
- CSS Modules: `import styles from './foo.module.css'`.
- PostCSS config at project root is auto-detected.
- Docs: https://vitejs.dev/guide/features#css

### JSON and `?` import suffixes

| Suffix | Effect |
|--------|--------|
| `?url` | Force URL import |
| `?raw` | Load as string |
| `?inline` | Inline as base64 (assets) |
| `?worker` | Import as web worker |

Docs: https://vitejs.dev/guide/assets

---

## Env files — loading order

Vite loads (later overrides earlier where keys conflict):

1. `.env`
2. `.env.local`
3. `.env.[mode]`
4. `.env.[mode].local`

| File | Committed? | When loaded |
|------|------------|-------------|
| `.env` | Often yes | All modes |
| `.env.local` | **No** (gitignore) | All modes; local overrides |
| `.env.production` | Optional | `vite build` |
| `.env.development` | Optional | `vite dev` |

Shell env vars set **before** running Vite win over `.env` files.

**Config vs app:** `.env*` files are **not** in `process.env` while `vite.config.*` runs unless you call `loadEnv(mode, process.cwd(), '')`. App code uses `import.meta.env.VITE_*`.

Docs: https://vitejs.dev/guide/env-and-mode

## Modes and `NODE_ENV`

| Command | Default mode | Typical `import.meta.env.PROD` |
|---------|--------------|--------------------------------|
| `vite` / `vite dev` | `development` | `false` |
| `vite build` | `production` | `true` |
| `vite build --mode staging` | `staging` | `true` (still a production build) |

`NODE_ENV` and **mode** are different concepts. See env guide for the full matrix.

## Production build

Default output: `dist/`.

```bash
npm run build
npm run preview   # serve dist/ at localhost (default 4173)
```

Useful config:

```js
export default defineConfig({
  base: '/',           // asset paths; set to '/repo-name/' for GitHub Pages subpaths
  build: {
    outDir: 'dist',
    sourcemap: true,   // debug production bundles
  },
});
```

- Do not open built files with `file://` — use `vite preview`.
- Docs: https://vitejs.dev/guide/build

## Deploying this app (Netlify)

Typical static SPA setup:

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | 20.19+ or 22.12+ (Vite requirement) |

Env vars for Firebase: set `VITE_*` keys in Netlify UI (Site settings → Environment variables), then rebuild.

SPA routing: add redirect rule so client routes work on refresh — see `react-router-docs` skill (`public/_redirects` or `netlify.toml`).

Docs: https://vitejs.dev/guide/static-deploy

## Server options (dev)

Common `vite.config.js` tweaks:

```js
export default defineConfig({
  server: {
    port: 5173,
    open: true,
    host: true,              // listen on LAN; use 127.0.0.1 in some Dev Containers
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
```

Docs: https://vitejs.dev/config/server-options

## Troubleshooting index

| Section | URL anchor |
|---------|------------|
| ESM-only config package | https://vitejs.dev/guide/troubleshooting#this-package-is-esm-only |
| Requests stalled (Linux limits) | https://vitejs.dev/guide/troubleshooting#requests-are-stalled-forever |
| ENOSPC file watchers | https://vitejs.dev/guide/troubleshooting#vite-crashes-with-enospc-error |
| HMR not working | https://vitejs.dev/guide/troubleshooting#vite-detects-a-file-change-but-the-hmr-is-not-working |
| CORS on built files | https://vitejs.dev/guide/troubleshooting#built-file-does-not-work-because-of-cors-error |
| Case sensitivity | https://vitejs.dev/guide/troubleshooting#no-such-file-or-directory-error-due-to-case-sensitivity |
| Dynamic import fetch failed | https://vitejs.dev/guide/troubleshooting#failed-to-fetch-dynamically-imported-module-error |
| Stale linked deps | https://vitejs.dev/guide/troubleshooting#outdated-pre-bundled-deps-when-linking-to-a-local-package |
| Node module in browser | https://vitejs.dev/guide/troubleshooting#module-externalized-for-browser-compatibility |
| Windows `&` in path | https://vitejs.dev/guide/troubleshooting#error-cannot-find-module-c-foo-bar-baz-vite-bin-vite-js |

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `process.env.VITE_*` in React code | Use `import.meta.env.VITE_*` |
| Secret in `VITE_` variable | Move to server/backend; never bundle secrets |
| Edited `.env` without restart | Stop and rerun `npm run dev` |
| Put `index.html` only in `public/` | Keep root `index.html` as app entry |
| Import from `public/` | Use `/path-from-root` in HTML or CSS |
| CRA-style `%PUBLIC_URL%` | Not needed — Vite rebases URLs automatically |
| Wrong `base` on subpath deploy | Set `base: '/subpath/'` in config |

## This app stack

| Layer | Choice |
|-------|--------|
| Build tool | Vite |
| UI | React 18 (`react-dev` skill) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` (`tailwind-docs` skill) |
| Routing | React Router v6 (`react-router-docs` skill) |
| Backend | Firebase (`firebase-docs` skill) |
| Env | `.env.local` with `VITE_FIREBASE_*` |
| Hosting | Netlify |

## Community

| Resource | URL |
|----------|-----|
| Awesome Vite | https://github.com/vitejs/awesome-vite |
| Discord (Vite Land) | https://chat.vite.dev |
| GitHub Discussions | https://github.com/vitejs/vite/discussions |
| create-vite templates | https://github.com/vitejs/vite/tree/main/packages/create-vite |
