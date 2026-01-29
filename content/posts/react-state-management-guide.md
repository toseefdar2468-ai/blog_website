---
title: "React State Management Guide"
date: "2025-12-31"
description: "A practical guide to React state management, from useState to context and external stores."
slug: "react-state-management-guide"
image: "/images/react-state-management.png"
---

# React State Management Guide

State management is not a library problem. It is a clarity problem. The simpler the state model, the easier the app is to maintain.

This guide shows how I decide when to keep state local, when to lift it, and when to use a store.

## Start with local state

```tsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Clicked {count} times
    </button>
  );
}
```

Local state is the simplest and most reliable option.

## Lift state when siblings need it

```tsx
function Dashboard() {
  const [filters, setFilters] = useState({ status: "all" });
  return (
    <>
      <FilterPanel filters={filters} onChange={setFilters} />
      <Results filters={filters} />
    </>
  );
}
```

This keeps the shared state in the closest common parent.

## Context for app wide settings

```tsx
const ThemeContext = createContext({ theme: "dark" });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

Context is great for UI settings, authentication status, or feature flags.

## Persisting state

If a state should survive refreshes (like theme or language), store it in local storage and hydrate on load. Keep the persisted state small and stable.

## Form state is its own category

Forms often need validation, dirty tracking, and error states. Treat form state separately from app state and avoid mixing it with global stores.

## Anti patterns to avoid

- Storing derived values that can be computed
- Using a global store for simple local UI state
- Mutating objects instead of replacing them

## A simple store shape example

Even if you use a store, keep the shape small and clear:

```ts
type Store = {
  user: User | null;
  notifications: Notification[];
  ui: { theme: "light" | "dark" };
};
```

This keeps responsibilities separated and prevents unrelated state from getting tangled.

## Normalizing complex data

If you store lists of objects, normalize them into a map by id. This makes updates faster and prevents duplicate data.

## Debugging state issues

When state feels wrong, log the state transitions and check where updates happen. Many bugs come from accidental mutations or from multiple sources trying to update the same state.

## Splitting state by domain

Keep unrelated state in separate slices. For example, authentication state should not live next to UI preferences. This makes updates predictable and reduces the chance of accidental coupling.

## State transition logging

When debugging, log actions and state snapshots. Even a simple console log of the previous and next state can reveal where things go wrong.

## Keep state updates explicit

When multiple components can update the same state, centralize the update logic. It reduces bugs and makes it easier to trace changes in the UI.

Colocating state with the component that owns it is still the simplest and most reliable strategy.
If you can keep state local, you reduce the mental overhead for everyone on the team.
Prefer explicit actions and avoid hidden side effects in state updates.
Clear state flow makes bugs easier to track and fix.

## When a store makes sense

Use a store when:

- Many distant components need the same state
- State changes are frequent or complex
- You need devtools or time travel debugging

## Modeling state the simple way

I try to model state based on user intent, not component structure. For example, instead of storing five separate booleans for a modal, store a single `activeModal` string.

```tsx
const [activeModal, setActiveModal] = useState<null | "login" | "invite">(null);
```

This avoids conflicting states and makes the UI easier to reason about.

## Client state vs server state

Not all state is the same. Local UI state (like toggles) belongs in React state. Server state (data from APIs) should be treated differently because it can be cached and refetched.

For server state, a data fetching library can simplify caching and retries. For UI state, simple React state is often enough.

## Reducer pattern for complex updates

When state changes are more than a couple of lines, I switch to `useReducer` because it makes updates explicit.

```tsx
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, items: [...state.items, action.item] };
    case "remove":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    default:
      return state;
  }
}
```

## Avoid derived state bugs

Derived state is values that can be computed from other state. If you store it separately, it can get out of sync. Prefer computing derived values on render or in a memo.

```tsx
const completed = items.filter((i) => i.done).length;
```

## Context performance tips

Context re renders every consumer when the value changes. If the value changes often, split it into smaller contexts or memoize the value.

```tsx
const value = useMemo(() => ({ theme, setTheme }), [theme]);
```

## Practical checklist

- Keep state as local as possible
- Lift state only when multiple children need it
- Use a reducer for complex updates
- Choose a store only when you need it

## Common mistakes

- Putting everything in a global store too early
- Using context for high frequency updates
- Mutating objects in state instead of creating new copies

## Related reading

- [React Hooks Mental Model](/blog/react-hooks-mental-model)
- [React Performance Optimization](/blog/react-performance-optimization)
- [TypeScript UI Patterns](/blog/typescript-ui-patterns)

## Last updated

2026-01-22

## Sources

- https://react.dev/learn/state-a-components-memory
- https://react.dev/learn/sharing-state-between-components

## Author

I am Toseef, a frontend engineer who builds Angular, React, and Next.js apps for real products. I write practical guides based on work experience and common team pitfalls. If you want to collaborate, visit [About](/about) or [Contact](/contact).
