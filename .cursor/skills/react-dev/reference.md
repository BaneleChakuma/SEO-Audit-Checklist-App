# React documentation map

Use this when the task goes beyond components, props, state, and lists.

## Learn — core concepts

| Topic | URL |
|-------|-----|
| Learn home | https://react.dev/learn |
| Your first component | https://react.dev/learn/your-first-component |
| Importing and exporting | https://react.dev/learn/importing-and-exporting-components |
| Writing markup with JSX | https://react.dev/learn/writing-markup-with-jsx |
| JavaScript in JSX | https://react.dev/learn/javascript-in-jsx-with-curly-braces |
| Passing props | https://react.dev/learn/passing-props-to-a-component |
| Conditional rendering | https://react.dev/learn/conditional-rendering |
| Rendering lists | https://react.dev/learn/rendering-lists |
| Responding to events | https://react.dev/learn/responding-to-events |
| State: a component's memory | https://react.dev/learn/state-a-components-memory |
| Render and commit | https://react.dev/learn/render-and-commit |
| State as a snapshot | https://react.dev/learn/state-as-a-snapshot |
| Queueing state updates | https://react.dev/learn/queueing-a-series-of-state-updates |
| Updating objects in state | https://react.dev/learn/updating-objects-in-state |
| Updating arrays in state | https://react.dev/learn/updating-arrays-in-state |

## Learn — intermediate

| Topic | URL |
|-------|-----|
| Managing state (overview) | https://react.dev/learn/managing-state |
| Reacting to input with state | https://react.dev/learn/reacting-to-input-with-state |
| Choosing the state structure | https://react.dev/learn/choosing-the-state-structure |
| Sharing state between components | https://react.dev/learn/sharing-state-between-components |
| Preserving and resetting state | https://react.dev/learn/preserving-and-resetting-state |
| Extracting state logic into a reducer | https://react.dev/learn/extracting-state-logic-into-a-reducer |
| Passing data deeply with context | https://react.dev/learn/passing-data-deeply-with-context |
| Scaling up with reducer and context | https://react.dev/learn/scaling-up-with-reducer-and-context |

## Learn — escape hatches

| Topic | URL |
|-------|-----|
| Escape hatches (overview) | https://react.dev/learn/escape-hatches |
| Referencing values with refs | https://react.dev/learn/referencing-values-with-refs |
| Manipulating the DOM with refs | https://react.dev/learn/manipulating-the-dom-with-refs |
| Synchronizing with Effects | https://react.dev/learn/synchronizing-with-effects |
| You Might Not Need an Effect | https://react.dev/learn/you-might-not-need-an-effect |
| Lifecycle of reactive Effects | https://react.dev/learn/lifecycle-of-reactive-effects |
| Separating Events from Effects | https://react.dev/learn/separating-events-from-effects |
| Removing Effect dependencies | https://react.dev/learn/removing-effect-dependencies |
| Reusing logic with custom Hooks | https://react.dev/learn/reusing-logic-with-custom-hooks |

## Reference — rules and APIs

| Topic | URL |
|-------|-----|
| Rules of React | https://react.dev/reference/rules |
| React APIs | https://react.dev/reference/react |
| useState | https://react.dev/reference/react/useState |
| useEffect | https://react.dev/reference/react/useEffect |
| useRef | https://react.dev/reference/react/useRef |
| useContext | https://react.dev/reference/react/useContext |
| useReducer | https://react.dev/reference/react/useReducer |
| useMemo | https://react.dev/reference/react/useMemo |
| useCallback | https://react.dev/reference/react/useCallback |
| memo | https://react.dev/reference/react/memo |
| StrictMode | https://react.dev/reference/react/StrictMode |

## Reference — DOM components

| Topic | URL |
|-------|-----|
| Common components (input, form, etc.) | https://react.dev/reference/react-dom/components |
| input | https://react.dev/reference/react-dom/components/input |
| form | https://react.dev/reference/react-dom/components/form |
| button | https://react.dev/reference/react-dom/components/button |

## Other resources

| Resource | URL |
|----------|-----|
| React blog | https://react.dev/blog |
| React Compiler | https://react.dev/learn/react-compiler |

---

## Adding interactivity

**State updates are async batches** — Reading state right after `setState` may show the old value. For the next render's value, use the updater form: `setCount(c => c + 1)`.

**State is a snapshot** — Each render has its own props and state. Event handlers "see" the state from the render they were created in.

**Choosing state structure**

| Principle | Example |
|-----------|---------|
| Group related state | `{ x: 0, y: 0 }` instead of separate `x` and `y` when always updated together |
| Avoid contradictions | Don't store `isSending` and `isSent` both true |
| Avoid redundancy | Derive `fullName` from `firstName` + `lastName` |
| Avoid duplication | Lift shared data to common parent |
| Avoid deep nesting | Consider Context or composition for widely shared data |

Docs: https://react.dev/learn/adding-interactivity

## useEffect

Use when you need to **synchronize with something outside React** (network, DOM API, subscription).

```js
useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();
  return () => {
    connection.disconnect();
  };
}, [roomId]);
```

Rules:

- Don't use Effects for transforming data for render — compute during render instead.
- Don't chain Effects to update state from other state — compute or use one event handler.
- Include all reactive values used inside the effect in the **dependency array**.

Docs: https://react.dev/learn/synchronizing-with-effects

## useRef

- `useRef(initial)` returns `{ current: initial }`.
- Changing `ref.current` does **not** trigger a re-render.
- Use for DOM nodes, timer IDs, or any mutable value that shouldn't cause re-renders.

Docs: https://react.dev/reference/react/useRef

## Context

When many components need the same data:

1. `createContext(defaultValue)`
2. Wrap tree with `<MyContext.Provider value={value}>`
3. Read with `useContext(MyContext)`

Prefer composition and lifting state first. Context is for truly global or widely shared data (theme, locale, auth user).

Docs: https://react.dev/learn/passing-data-deeply-with-context

## useReducer

For complex state logic with many event types:

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

Docs: https://react.dev/learn/extracting-state-logic-into-a-reducer

## Forms (controlled components)

Bind input `value` to state and update on `onChange`:

```js
const [text, setText] = useState('');

return (
  <input
    value={text}
    onChange={(e) => setText(e.target.value)}
  />
);
```

Docs: https://react.dev/reference/react-dom/components/input

## Performance (when needed)

- `useMemo` — cache expensive calculation between renders.
- `useCallback` — cache function identity for child memoization.
- `memo` — skip re-render if props unchanged.

**Don't optimize prematurely.** Fix correctness first; profile before adding memoization.

Docs: https://react.dev/learn/render-and-commit

## Strict Mode

In development, React may render components twice to surface impure render logic. Side effects belong in Effects, not render.

Docs: https://react.dev/reference/react/StrictMode

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `onClick={handleClick()}` | `onClick={handleClick}` |
| Mutating state: `state.push(item)` | `setItems([...items, item])` |
| Missing `key` in lists | Stable unique `key` per item |
| Hooks inside `if` | Move to child component or top level |
| Fetching in render | `useEffect` or event handler |
| Stale closure in effects | Correct dependency array or functional updates |

## This app stack

| Layer | Choice |
|-------|--------|
| React | 18 with Vite |
| Routing | React Router v6 |
| Styling | Tailwind CSS (`tailwind-docs` skill) |
| Backend | Firebase (`firebase-docs` skill) |
