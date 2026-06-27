---
name: react-dev
description: >-
  Teaches React using official react.dev patterns with plain-language
  explanations before code. Use when building or reviewing React components,
  hooks, JSX, props, state, effects, events, lists, or when the user asks
  React questions or needs help understanding React concepts.
---

# React.dev Teaching Guide

Follow [react.dev](https://react.dev) as the authoritative source. This skill shapes *how* you explain and write React — not generic JavaScript tutorials.

## Teaching workflow

When helping with React (code, bugs, or concepts), use this order:

1. **Explain first** — In plain language, say what we are building or fixing and why, before any code.
2. **Show code** — Use idiomatic React from react.dev (see patterns below).
3. **Walk through it** — After the code, explain what the important lines do.
4. **Say why** — Prefer "we do X because Y" over "do X".
5. **Simplest first** — If multiple approaches exist, recommend the simplest one first, then mention tradeoffs.

Keep explanations accessible. Do not assume the user already knows hooks, JSX, or rendering.

## When to consult react.dev

For API details, edge cases, or uncertain behavior, fetch the relevant page from react.dev rather than guessing. Start with the table in [reference.md](reference.md).

High-priority pages for this app:

| Topic | URL |
|-------|-----|
| Quick start / JSX basics | https://react.dev/learn |
| Rules of React | https://react.dev/reference/rules |
| Managing state | https://react.dev/learn/managing-state |
| Adding interactivity | https://react.dev/learn/adding-interactivity |
| Escape hatches (refs, effects) | https://react.dev/learn/escape-hatches |
| API reference | https://react.dev/reference/react |

## This project's React layout

Match existing conventions in this repo:

| Location | Responsibility |
|----------|----------------|
| `src/pages/` | Route-level pages (Landing, Checklist, Results, etc.) |
| `src/components/` | Reusable UI and feature components |
| `src/components/ui/` | Shared primitives (Button, Badge, LoadingSpinner) |
| `src/components/layout/` | Shell pieces (Navbar, Footer) |
| `src/hooks/` | Custom hooks (`useAuth`, `useChecklist`, `useScore`) |
| `src/firebase/` | Firebase helpers — not called directly from pages as inline SDK code |
| `src/utils/` | Pure helpers (score calculation, PDF export) |
| `src/data/` | Static data (checklist items) |

**Keep components small and focused.** Pages compose components; hooks hold reusable stateful logic.

## Core patterns (react.dev)

### Components

- Components are **JavaScript functions that return JSX** (markup).
- Component names **start with a capital letter** (`MyButton`, not `mybutton`).
- Nest components like HTML tags: `<MyButton />`.
- Use components in JSX only — **never call them as regular functions**.

```js
const MyButton = () => {
  return <button>Click me</button>;
};

const MyApp = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <MyButton />
    </div>
  );
};
```

### JSX rules

- One parent wrapper per return (`<div>...</div>` or `<>...</>`).
- Close all tags (`<br />`, `<img />`).
- Use `className` instead of `class`.
- Use `{expression}` inside JSX to embed JavaScript values.

### Props

- Props are **read-only inputs** passed from parent to child.
- Pass props with JSX attributes: `<Child count={count} onClick={handleClick} />`.
- Destructure in the parameter list: `const MyButton = ({ count, onClick }) => { ... }`.
- **Never mutate props.**

### State with useState

- State lets a component "remember" values between renders.
- Call `useState` at the **top level** of the component — not inside conditions, loops, or nested functions.
- `const [value, setValue] = useState(initialValue)` — use the setter to update; do not assign to `value` directly.
- Each component instance gets **its own** state.

```js
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return <button onClick={handleClick}>Clicked {count} times</button>;
};
```

### Lifting state up

When two components need the same data:

1. Move shared state to their **closest common parent**.
2. Pass state and updaters down as **props**.
3. Children call the parent's handler instead of owning duplicate state.

### Events

- Define handler functions inside the component.
- Pass the function reference: `onClick={handleClick}` — **no parentheses**.
- React calls the handler when the event fires.

### Conditional rendering

Use normal JavaScript — no special React syntax:

- `if / else` before `return`
- Ternary inside JSX: `{isLoggedIn ? <Dashboard /> : <Login />}`
- Short-circuit: `{showError && <ErrorMessage />}`

### Lists

- Use `.map()` to render lists.
- Every list item needs a stable **`key`** from your data (e.g. `id`), not array index when items can reorder.

```js
const listItems = items.map((item) => (
  <li key={item.id}>{item.title}</li>
));
```

## Rules of React (must follow)

From [Rules of React](https://react.dev/reference/rules):

**Purity**

- Components must return the same output for the same props/state/context.
- **No side effects during render** (no fetching, timers, or DOM writes in the component body).
- Do not mutate props, state, or values already passed to JSX.

**Hooks**

- Only call Hooks at the **top level** of React function components or custom Hooks.
- Only call Hooks from React functions — not from regular JS helpers.
- Never pass Hooks around as values.

**Calling**

- React calls your components — you declare what to render; React handles when and how.

## State design (react.dev)

When adding or refactoring state:

- **Describe UI as state** — Don't imperatively toggle DOM; change state and let React re-render.
- **Avoid redundant state** — Don't store values you can compute from other state (e.g. `fullName` from `firstName` + `lastName`).
- **Avoid duplication** — Same data in two places causes sync bugs; lift or derive instead.
- **Group related state** — If several values always change together, consider one object or `useReducer`.

## Explaining bugs

When the user reports a React bug:

1. Ask what they **expected** vs what **actually** happened.
2. Ask them to check the **browser DevTools console** for red errors.
3. Walk through fixes step by step.
4. Explain **why** the bug happened (stale state, missing key, mutating state, hooks order, effect deps, etc.).

## Code style defaults

Unless the project has its own rules that override these:

- Functional components (not class components)
- `const` + arrow functions for components and handlers
- `async/await` for async work (not `.then()` chains)
- Handle **loading** and **error** states in UI
- Small, focused components — one main job each
- Tailwind utility classes via `className` for styling (see `tailwind-docs` skill)

## Response shape for teaching

Use this structure for concept explanations:

```markdown
## What we're doing
[1–2 sentences in plain language]

## Why this approach
[Reason tied to react.dev principle]

## Code
[Minimal, working example]

## How it works
- Line/pattern 1: ...
- Line/pattern 2: ...

## What to try next
[Optional single follow-up if natural]
```

For quick fixes in an existing codebase, you may shorten — but still explain the change and why.

## Extended reference

For deeper topics (effects, refs, context, forms, performance, common mistakes, and the full react.dev map), see [reference.md](reference.md).
