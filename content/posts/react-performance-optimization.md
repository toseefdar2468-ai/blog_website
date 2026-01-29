---
title: "React Performance Optimization"
date: "2025-12-31"
description: "Practical techniques to improve React rendering performance without over-optimizing."
slug: "react-performance-optimization"
image: "/images/react-perfomance.png"
---

# React Performance Optimization

React apps feel slow for two main reasons: too many re renders or too much work inside each render. The fix is rarely a single magic hook. It is usually a small set of disciplined habits.

This guide covers the techniques I actually use, and the ones I avoid until I need them.

## Start with the simplest fix

Before you reach for memoization, check these:

- Are you rendering large lists without virtualization?
- Are you passing new objects on every render?
- Are you doing heavy work in render?

Simple fixes often deliver the biggest wins.

## Use React.memo for stable components

If a component renders the same output for the same props, memoization can prevent extra work.

```tsx
const UserRow = React.memo(function UserRow({ user }) {
  return <div>{user.name}</div>;
});
```

## Memoize expensive calculations

```tsx
const total = useMemo(() => items.reduce((sum, i) => sum + i.price, 0), [items]);
```

Use `useMemo` only when the calculation is expensive or the value is passed to memoized children.

## Avoid re creating callbacks

```tsx
const onSave = useCallback(() => save(items), [items]);
```

Stable callbacks prevent unnecessary child renders.

## Virtualize large lists

If you render hundreds of rows, use list virtualization (like react-window). It keeps the DOM small and fast.

## Profile before you optimize

Use React DevTools Profiler to record a user interaction. It shows which components rendered and how long each took. This keeps optimization focused on real bottlenecks.

## Colocate state to reduce renders

When state is stored too high, unrelated parts of the UI re render. Move state closer to where it is used.

Example: A search input should own its query state, not the entire dashboard.

## Avoid expensive work in render

If you map over 1,000 items or sort on every render, performance will suffer. Move expensive work into a memo or precompute it when data changes.

## Suspense and streaming

For data heavy pages, Suspense can keep the UI responsive by showing partial content while data loads.

## Splitting bundles

Lazy load heavy components so they do not block the initial render.

```tsx
const Chart = React.lazy(() => import("./Chart"));
```

Wrap lazy components in Suspense so users see a fallback while the code loads.

## Avoid recreating objects in props

If you pass `{}` or `[]` directly in JSX, React sees a new reference on every render. Move these objects outside the render or memoize them.

## useTransition for smoother updates

If a state update causes a heavy re render, use `startTransition` so React treats it as non urgent.

```tsx
const [isPending, startTransition] = useTransition();
```

This keeps input responsive while expensive work runs in the background.

## Keys and list rendering

Always use stable keys when rendering lists. Unstable keys force React to recreate DOM nodes, which is expensive and can break input state.

## Memoization tradeoffs

Memoization is not free. It adds memory overhead and makes code harder to read. Use it when it removes real work, not as a default habit.

## Re renders are not always bad

React is fast at re rendering small components. Focus on the slow parts: large lists, heavy charts, and complex layouts.

## Measure in production

Development mode is slower than production. If a component feels slow, test the production build or use monitoring tools to measure real user performance.

## Derived data and selectors

If you compute derived data from large arrays, memoize the result based on the input array. This avoids repeated work on every render.

## React.memo vs useMemo

`React.memo` prevents a component from re rendering when props are the same. `useMemo` memoizes a value inside a component. Use memo for component boundaries and useMemo for heavy computations.

## Optimize list row components

If you render long lists, memoize the row component and pass stable props. It reduces re renders when only a few items change.

## Context updates can be expensive

If you use context for data that changes often, every consumer re renders. Split contexts or memoize the context value to reduce unnecessary updates.
This is one of the most common hidden sources of re renders in large apps.

## DOM measurements

Measuring layout (like `getBoundingClientRect`) can be expensive if done too often. Batch measurements and avoid doing them in every render.

## A simple optimization workflow

1) Measure with the Profiler
2) Fix the biggest offender
3) Re measure
4) Stop when the UI feels fast

Over optimizing adds complexity. Stop when users are happy.

## Practical checklist

- Use React.memo for stable components
- Memoize expensive calculations
- Avoid recreating objects and functions in props
- Virtualize long lists
- Keep state as local as possible

## Small case study

On a dashboard with a list of 2,000 rows, virtualization reduced render time from several seconds to under 200ms. The fix was small, but the user experience difference was huge.

## Common mistakes

- Memoizing everything (adds overhead)
- Creating new objects in JSX props
- Storing derived state instead of computing it

## Related reading

- [React Hooks Mental Model](/blog/react-hooks-mental-model)
- [React State Management Guide](/blog/react-state-management-guide)
- [TypeScript UI Patterns](/blog/typescript-ui-patterns)

## Last updated

2026-01-22

## Sources

- https://react.dev/learn/render-and-commit
- https://react.dev/reference/react/useMemo

## Author

I am Toseef, a frontend engineer who builds Angular, React, and Next.js apps for real products. I write practical guides based on work experience and common team pitfalls. If you want to collaborate, visit [About](/about) or [Contact](/contact).
