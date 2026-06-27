---
name: tailwind-docs
description: >-
  Teaches Tailwind CSS using official tailwindcss.com/docs patterns with
  plain-language explanations before code. Use when styling React components,
  setting up Tailwind with Vite, choosing utility classes, responsive or dark
  mode design, debugging missing styles, or when the user asks Tailwind questions.
---

# Tailwind CSS Documentation Guide

Follow [tailwindcss.com/docs](https://tailwindcss.com/docs) as the authoritative source. This skill shapes *how* you explain and write Tailwind for this project — not generic CSS tutorials.

## Teaching workflow

When helping with Tailwind (setup, styling, layout, or bugs), use this order:

1. **Explain first** — In plain language, say what visual result we want and why, before any code.
2. **Show code** — Use **utility classes in `className`**, not separate CSS files.
3. **Walk through it** — After the code, explain what the important classes do.
4. **Say why** — Prefer "we use X because Y" over "use X".
5. **Simplest first** — Recommend the simplest correct utility combination first, then mention tradeoffs.

Keep explanations accessible. Do not assume the user already knows flexbox, responsive breakpoints, or CSS specificity.

## When to consult tailwindcss.com/docs

For class names, variants, theme options, or uncertain behavior, fetch the relevant doc page rather than guessing. Start with the table in [reference.md](reference.md).

High-priority pages for this app:

| Topic | URL |
|-------|-----|
| Docs home | https://tailwindcss.com/docs |
| Install with Vite | https://tailwindcss.com/docs/installation/using-vite |
| Styling with utility classes | https://tailwindcss.com/docs/styling-with-utility-classes |
| Responsive design | https://tailwindcss.com/docs/responsive-design |
| Hover, focus, and states | https://tailwindcss.com/docs/hover-focus-and-other-states |
| Dark mode | https://tailwindcss.com/docs/dark-mode |
| Theme variables | https://tailwindcss.com/docs/theme |
| Detecting classes in source | https://tailwindcss.com/docs/detecting-classes-in-source-files |

## This project's styling rules

Match existing conventions in this repo and the user's project rules:

| Rule | Detail |
|------|--------|
| Styling location | Tailwind utility classes on JSX elements via `className` |
| No plain CSS files | Do not add `.css` component styles; use utilities (or `@theme` in the global CSS entry only) |
| React components | Functional components only; `const` + arrow functions |
| Reusable UI | Shared look-and-feel lives in `src/components/ui/` (e.g. `Button`, `Badge`) |
| Pages | Page layout and sections in `src/pages/` |
| Layout shell | Navbar and Footer in `src/components/layout/` |

**Prefer composing small components with Tailwind over one-off giant `className` strings** when the same pattern repeats three or more times.

## Setup (Vite + React — Tailwind v4)

This app uses **Vite** and **Tailwind CSS v4** with the official Vite plugin. Docs: [Installing Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite).

### 1. Install

```bash
npm install tailwindcss @tailwindcss/vite
```

### 2. Vite plugin (`vite.config.js`)

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

- `tailwindcss()` wires Tailwind into Vite so classes are scanned and compiled at build time.

### 3. Global CSS entry (e.g. `src/index.css`)

```css
@import "tailwindcss";
```

- Import this file once from `src/main.jsx` (or your app entry).
- Use this file only for **global** Tailwind setup (`@theme`, `@source`), not per-component styles.

### 4. Verify it works

```jsx
<h1 className="text-3xl font-bold text-slate-900">Hello</h1>
```

If styles do not appear, check: plugin in `vite.config`, `@import "tailwindcss"` present, dev server restarted, and class names spelled exactly as in the docs.

## Core mental model

Tailwind is **utility-first**: small, single-purpose classes map to CSS properties.

| Concept | Tailwind example | What it does |
|---------|------------------|--------------|
| Spacing | `p-4`, `mt-2`, `gap-6` | Padding, margin, gap |
| Layout | `flex`, `grid`, `items-center` | Flexbox and grid |
| Sizing | `w-full`, `max-w-2xl`, `h-10` | Width and height |
| Typography | `text-lg`, `font-semibold`, `text-slate-600` | Font size, weight, color |
| Surfaces | `bg-white`, `rounded-lg`, `shadow-md`, `border` | Background, radius, shadow, border |
| States | `hover:bg-blue-700`, `focus:ring-2` | Interactive feedback |

- **Mobile-first responsive**: unprefixed classes apply to all sizes; `md:` and `lg:` override from that breakpoint up. Docs: [responsive design](https://tailwindcss.com/docs/responsive-design).
- **Variants stack**: `className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"`.
- In React, always use **`className`**, not `class`.

## Patterns for this app

### Page section wrapper

```jsx
const LandingPage = () => {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        SEO Audit Checklist
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Score your site and get fix suggestions.
      </p>
    </main>
  );
};
```

- `mx-auto max-w-5xl` centers content and caps width on large screens.
- `px-4 sm:px-6 lg:px-8` increases horizontal padding as the viewport grows.
- `text-slate-900` / `text-slate-600` keeps a readable heading + body contrast.

### Reusable button (`src/components/ui/Button.jsx`)

```jsx
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

- `base` holds shared layout, focus ring, and disabled styles.
- `variants` maps prop values to color classes — one component, consistent UI.
- Extra `className` lets parents add spacing (`className="mt-4"`) without duplicating the button.

### Card / panel

```jsx
<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
  {/* card content */}
</div>
```

### Form field

```jsx
<label className="block text-sm font-medium text-slate-700">
  Email
  <input
    type="email"
    className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</label>
```

- `block w-full` makes the input fill the label width.
- `focus:ring-2` gives a visible keyboard focus state (accessibility).

### Loading and empty states

```jsx
{loading && (
  <div className="flex items-center justify-center py-12 text-slate-500">
  Loading…
  </div>
)}
```

Pair with the project's `LoadingSpinner` component when a spinner is needed.

## Score colours (SEO app)

Score feedback can use semantic colours. Align with `src/utils/getScoreColour.js` when it exists; otherwise use Tailwind semantic ranges:

| Score range | Suggested classes |
|-------------|-------------------|
| High (80–100) | `text-green-600`, `bg-green-50`, `border-green-200` |
| Medium (50–79) | `text-amber-600`, `bg-amber-50`, `border-amber-200` |
| Low (0–49) | `text-red-600`, `bg-red-50`, `border-red-200` |

Use colour for **supporting** status (badge, bar, icon) — keep body text in `text-slate-*` for readability.

## Custom theme (when needed)

Prefer default Tailwind tokens first. For brand colours used many times, extend the theme in global CSS:

```css
@import "tailwindcss";

@theme {
  --color-brand: #2563eb;
}
```

Then use `bg-brand`, `text-brand`, etc. Docs: [theme variables](https://tailwindcss.com/docs/theme).

## Conditional classes in React

For simple toggles, template literals are fine:

```jsx
const isComplete = true;

<div
  className={`rounded-lg border p-4 ${
    isComplete ? 'border-green-300 bg-green-50' : 'border-slate-200 bg-white'
  }`}
/>
```

For many variants, use a small map (like `Button` above) instead of long ternary chains.

Optional: `clsx` or `tailwind-merge` if the project already depends on them — do not add packages only for class merging unless the user asks.

## Explaining bugs

When the user reports a styling bug:

1. Ask what they **expected** vs what **actually** happened.
2. Ask them to **inspect the element** in DevTools and check whether the Tailwind class appears in the stylesheet.
3. Check common causes (see table below).
4. Walk through fixes step by step.
5. Explain **why** the bug happened.

### Common Tailwind issues

| Symptom | Likely cause |
|---------|----------------|
| No styles at all | Missing Vite plugin, missing `@import "tailwindcss"`, or CSS not imported in entry |
| One class missing | Typo, or class built dynamically so the scanner cannot see it |
| Wrong breakpoint | Mobile-first confusion — `md:text-lg` applies at **768px and up**, not below |
| Overridden style | Another class or global style wins; check order and specificity |
| Dark mode not working | `dark:` used without `dark` class on `<html>` or system preference strategy |
| Purged / missing in production | Dynamic class names like `` `text-${color}-500` `` — use full class strings instead |

Docs: [detecting classes in source files](https://tailwindcss.com/docs/detecting-classes-in-source-files).

**Never build class names by concatenating colour names** — Tailwind's scanner must see complete class strings in source:

```jsx
// Bad — scanner may miss these
const color = 'red';
<div className={`text-${color}-500`} />

// Good — full classes visible in source
const colorClass = score < 50 ? 'text-red-500' : 'text-green-500';
<div className={colorClass} />
```

## Code style defaults

Unless the project overrides these:

- Tailwind utilities in `className` — no component-level `.css` files
- Functional React components, `const` + arrow functions
- Responsive layouts: mobile-first (`base` then `sm:` / `md:` / `lg:`)
- Accessible focus styles on interactive elements (`focus:ring-2`, `focus:outline-none` with visible ring)
- Consistent spacing scale (`4`, `6`, `8`, `12`) across pages

## Response shape for teaching

```markdown
## What we're styling
[1–2 sentences: visual goal]

## Why these utilities
[Reason tied to Tailwind docs / layout / accessibility]

## Code
[Minimal JSX with className]

## How it works
- Class 1: ...
- Class 2: ...

## What to try next
[Optional single follow-up if natural]
```

## Extended reference

For the full doc map (layout, flexbox, typography, filters, animations, and upgrade notes), see [reference.md](reference.md).
