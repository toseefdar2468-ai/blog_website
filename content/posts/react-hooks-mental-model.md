---
title: "React Hooks: A Practical Mental Model"
date: "2026-01-02"
description: "Build a clear mental model for React hooks, learn the rules, and use useState and useEffect with confidence."
slug: "react-hooks-mental-model"
image: "/images/react-hooks.png"
---

React Hooks: A Practical Mental Model

React hooks can feel confusing at first because they are simple on the surface but powerful in practice. The key is to build a clear mental model of how React renders and when hooks run. Once you understand that, hooks become predictable and easy to use.

In this guide you will learn:

- Why hooks exist and what problems they solve
- The rules of hooks and why they matter
- How useState really works
- How useEffect fits into the render cycle
- Common pitfalls and how to avoid them

Why Hooks Exist

Before hooks, React used class components for state and lifecycle. Hooks let you use state and lifecycle in function components. They also make logic reusable without complex patterns.

Hooks give you:

- Simple state management in functions
- Composable logic with custom hooks
- Clear separation of concerns
- Less boilerplate compared to classes

The Render Cycle in Plain Language

React renders a component by calling the function and reading the JSX it returns. When state changes, React calls the function again. Each render is a snapshot of state and props at that time.

This is the most important idea: hooks are tied to renders. They do not run whenever you want. They run when React renders.

The Rules of Hooks

The two rules are simple but strict:

1) Only call hooks at the top level of a component or custom hook
2) Only call hooks from React functions, not from regular JavaScript functions

Why? React relies on the order of hooks to match state between renders. If you call hooks conditionally, React can no longer match them correctly.

Understanding useState

useState creates a piece of state that belongs to a component instance. When you call the setter, React schedules a new render with the updated value.

Key points:

- The setter is async and triggers re render
- The new state value appears on the next render
- Each component instance has its own state

Example:

const [count, setCount] = useState(0);

setCount(count + 1); // schedules next render

If you need the latest value, use the functional form:

setCount(prev => prev + 1);

Understanding useEffect

useEffect lets you run side effects after React renders. It is not part of the render itself, which keeps rendering pure.

Common use cases:

- Fetching data after render
- Setting up subscriptions or timers
- Syncing with browser APIs

The dependency array controls when the effect runs:

- No array: run after every render
- Empty array: run once on mount
- With values: run when any dependency changes

A common mistake is missing dependencies. If the effect uses a value from props or state, include it in the array. Otherwise you may see stale values.

useMemo and useCallback

These hooks help with performance. They memoize values or functions so they are not re created on every render.

Use them when:

- A calculation is expensive
- A child component depends on referential equality
- You pass callbacks to memoized children

Do not use them everywhere. They add complexity and can make code harder to read.

Custom Hooks for Reuse

If you find yourself copying the same useState and useEffect logic, create a custom hook. It is just a function that uses other hooks.

Example ideas:

- useLocalStorage for persistence
- useFetch for data loading
- useDebounce for inputs

Custom hooks keep components focused and make logic easier to test.

Common Hook Pitfalls

- Calling hooks inside conditions or loops
- Forgetting dependencies in useEffect
- Overusing useMemo and useCallback
- Storing derived data in state instead of computing it

A Simple Hooks Checklist

- Are all hooks called at the top level?
- Does useEffect list all dependencies?
- Is derived data computed during render instead of stored?
- Are you using memoization only where it helps?

Effect Cleanup and Lifecycles

Effects often need cleanup to avoid memory leaks. If you subscribe to events, timers, or sockets, return a cleanup function.

Examples:

- Clear a timer in the cleanup
- Unsubscribe from an event emitter
- Abort a fetch request if the component unmounts

The cleanup runs before the next effect and on unmount. This keeps your component safe in long running sessions.

Using useRef for Mutable Values

useRef stores a mutable value that does not cause re renders. It is useful for DOM access or keeping data between renders without triggering a new render.

Common uses:

- Accessing an input element to focus it
- Storing a timeout id
- Keeping the latest value for a callback

Do not use refs to store render data that should update the UI. That belongs in state.

Async Work and Effects

Effects cannot be async directly, but you can define an async function inside and call it.

Pattern:

1) Start the request inside the effect
2) Handle loading and error state
3) Cancel or ignore stale responses

This keeps data flow predictable and prevents UI glitches from late responses.

Lint Rules and Tooling

The React hooks lint rule prevents missing dependencies and invalid hook usage. Keep it enabled and treat warnings as real bugs. It is one of the simplest ways to avoid subtle issues in production.

React Strict Mode Behavior

In development, React Strict Mode may run components and effects twice to help surface side effects. This does not happen in production, but it can confuse new developers. The fix is to make effects idempotent and avoid unsafe side effects in render.

Conclusion

Hooks are not magical once you understand the render cycle. They are predictable tools that make function components powerful. Follow the rules, treat each render as a snapshot, and use effects only for side effects. With this mindset, React hooks become a clean and flexible way to build components.
