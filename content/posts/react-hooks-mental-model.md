---
title: "React Hooks Mental Model"
date: "2025-12-31"
description: "A simple mental model for React hooks, effects, and state that makes them predictable."
slug: "react-hooks-mental-model"
image: "/images/react-hooks.png"
---

# React Hooks Mental Model

Hooks are simple once the mental model clicks: a component is just a function that runs on every render, and hooks are how React attaches memory to that function.

This guide explains the mental model I use to avoid common hook bugs.

## The core idea

Every render is a new run of your component function. Hooks let React remember values between renders.

That is why hooks must be called in the same order on every render. React uses call order to match hook state.

## useState in plain language

`useState` creates a value that survives across renders.

```tsx
const [count, setCount] = useState(0);
```

When you call `setCount`, React schedules a re render with the new value.

## useEffect is for side effects

Effects run after the render. They are for things like network requests, subscriptions, or interacting with the DOM.

```tsx
useEffect(() => {
  const id = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(id);
}, []);
```

## Dependency arrays are about data flow

The dependency array tells React when the effect should re run.

- `[]` means run once on mount
- `[userId]` means run when userId changes
- No array means run after every render

When in doubt, include dependencies and refactor if it runs too often.

## useMemo and useCallback

These hooks memoize values and functions. Use them when re calculation is expensive or when passing callbacks to child components.

```tsx
const total = useMemo(() => items.reduce((sum, i) => sum + i.price, 0), [items]);
```

## The rules of hooks

There are two rules and they explain most hook bugs:

1) Only call hooks at the top level
2) Only call hooks from React functions

If you call a hook inside a conditional or loop, the order changes and React reads the wrong state.

## A data fetching example

```tsx
function Profile({ id }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/users/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setUser(data);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <p>Loading...</p>;
  return <div>{user.name}</div>;
}
```

This pattern avoids setting state after unmount and keeps dependencies explicit.

## State updates based on previous state

When the new state depends on the old state, use the functional update form:

```tsx
setCount((c) => c + 1);
```

This avoids stale closures in event handlers and effects.

## useRef for stable values

`useRef` stores a mutable value that does not trigger re renders. It is useful for storing DOM nodes, timers, or previous values.

```tsx
const prevCount = useRef(0);
useEffect(() => {
  prevCount.current = count;
}, [count]);
```

## useLayoutEffect vs useEffect

`useEffect` runs after paint. `useLayoutEffect` runs before paint and can block rendering. Use `useLayoutEffect` only for measuring layout or synchronizing with DOM animations.

## Cleanup matters

If you set up subscriptions, timers, or listeners, always return a cleanup function. It prevents memory leaks and ghost updates after unmount.

## Quick FAQ

**Do I need useMemo everywhere?** No. Start without it and add memoization only when profiling shows a bottleneck.

**Why does my effect run twice in dev?** React Strict Mode intentionally double invokes effects to highlight side effects.

## useReducer vs useState

When updates are simple, `useState` is enough. When updates involve multiple fields or complex transitions, `useReducer` keeps logic organized and easier to test.

## Stale closures explained

If an effect uses a value from a previous render, it can become stale. The fix is usually to add the value to the dependency array or use a functional state update.

## Dependency linting

Use the React hooks lint rule to catch missing dependencies. It is annoying at first, but it prevents subtle bugs and makes effects easier to reason about.

## Naming custom hooks

Custom hooks should start with `use` and do one thing. If a hook grows too large, split it into smaller hooks.

## Avoiding infinite loops

If an effect updates state that it depends on, it can loop. The fix is to move derived calculations out of the effect or to guard with a condition.

For example, if you fetch data and then set state that changes the fetch URL, you can create a loop. Keep the fetch URL stable or move the state update to a different event.

If you remember only one rule: hooks must run in the same order every render. That rule prevents 90% of hook errors.
When in doubt, simplify the component and move logic into custom hooks.
Small, focused hooks are easier to test and reuse.
They also reduce the chance of hidden side effects.
Fewer side effects means fewer surprises.

## Debugging checklist

- Is a hook called inside a conditional?
- Are all effect dependencies listed?
- Is derived state being stored unnecessarily?
- Are you using useMemo or useCallback without a reason?

## Custom hooks

Custom hooks are just functions that call hooks. They let you reuse logic across components.

```tsx
function useWindowSize() {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
}
```

## Common hook mistakes

- Conditional hooks inside if blocks
- Missing dependencies in effects
- Storing derived state instead of computing it
- Using useEffect for every state change

## Related reading

- [React State Management Guide](/blog/react-state-management-guide)
- [React Performance Optimization](/blog/react-performance-optimization)
- [TypeScript UI Patterns](/blog/typescript-ui-patterns)

## Last updated

2026-01-22

## Sources

- https://react.dev/reference/react
- https://react.dev/learn/synchronizing-with-effects

## Author

I am Toseef, a frontend engineer who builds Angular, React, and Next.js apps for real products. I write practical guides based on work experience and common team pitfalls. If you want to collaborate, visit [About](/about) or [Contact](/contact).
