---
title: "React State Management: From Local State to Global Stores"
date: "2026-01-03"
description: "Learn how to manage state in React, when to lift state, and when to use Context, reducers, or external stores."
slug: "react-state-management-guide"
image: "/images/react-state-management.png"
---

React State Management: From Local State to Global Stores

State management is one of the most important decisions in a React app. Good state design keeps your UI predictable and easy to debug. Poor state design leads to tangled components and bugs that are hard to trace.

In this guide you will learn:

- The difference between local and global state
- When to lift state up
- How Context and useReducer work together
- When to consider external libraries
- A practical decision checklist

Start With Local State

Most state should be local to the component that owns it. If only one component needs the data, keep it there. This keeps your app simple and avoids unnecessary re renders.

Examples of local state:

- Input values for a single form
- Toggle state for a modal
- UI tabs or filters inside a component

When to Lift State Up

If two sibling components need the same data, move the state to their nearest common parent. This is called lifting state up.

For example:

- A search box and results list should share the same query
- A cart icon and cart drawer should share the same cart items

Lifting state keeps a single source of truth and avoids out of sync UI.

Derived State vs Stored State

A common mistake is storing values that can be calculated. If a value can be derived from other state, calculate it during render instead of storing it.

Example:

- Store a list of items
- Derive the count with `items.length`

This reduces bugs and makes state updates simpler.

Using Context for Shared State

Context lets you pass data through the component tree without drilling props at every level. It is great for app wide data like theme, auth user, or language.

Good use cases:

- Theme settings
- Authenticated user profile
- Feature flags

Be careful: Context updates re render all consumers. Keep context values small and stable.

Using useReducer for Complex Logic

useReducer is useful when state transitions are more complex than simple setState calls. It gives you a reducer function and actions, similar to Redux but built in.

Benefits:

- Clear state transitions
- Easier to test logic
- Works well with Context for global state

A typical pattern is to combine Context and useReducer to build a small global store without external libraries.

When to Use External Libraries

Libraries like Redux, Zustand, or Jotai can be helpful when your app is large or your state is deeply shared.

Consider an external store when:

- Many unrelated components need the same data
- State updates are frequent and complex
- You need dev tools and time travel debugging
- Multiple teams work on the same app

If your app is small or medium, you may not need any external store at all.

Avoid the "Global Store for Everything" Trap

Global stores are powerful but easy to abuse. If every piece of state goes into a global store, you lose local clarity and introduce unnecessary coupling.

A better approach:

- Keep UI state local
- Share only the data that is truly global
- Keep derived data out of the store when possible

Practical Example Strategy

A simple strategy for many apps:

1) Start with local state in components
2) Lift state up when two siblings need it
3) Use Context for cross app needs like auth or theme
4) Use useReducer when updates become complex
5) Add an external store only if you hit real limits

Common Mistakes

- Storing derived values in state
- Using Context for rapidly changing data
- Adding Redux too early without a clear need
- Passing giant objects through context without memoization

A State Management Checklist

- Is the state used by one component or many?
- Can it be derived instead of stored?
- Will updates be frequent or complex?
- Do you need dev tools or persistence?

State Shape and Normalization

How you shape state affects how easy it is to update. Flat structures are usually easier to reason about than deeply nested trees. When you store large lists, keep them normalized so updates are small and predictable.

Practical tips:

- Store items by id in a dictionary and keep a separate list of ids
- Avoid deeply nested objects when updates touch only one field
- Keep UI state separate from server data to avoid mixing concerns

This approach reduces the chance of accidental mutations and makes updates simpler to test.

Persisting State Safely

Some state should survive page reloads. Common examples are theme selection, auth tokens, or draft forms. When you persist state, treat it as part of your data flow and make it explicit.

Good patterns:

- Save small preferences in localStorage
- Use sessionStorage for temporary data like a wizard flow
- Rehydrate state in a single place at app start

Avoid persisting sensitive data in the browser unless you have a clear reason and proper security measures.

Testing State Logic

State logic is easiest to test when it lives outside the component. Reducers and small utility functions are perfect units for tests.

Simple test ideas:

- Given a state and action, the reducer returns the expected new state
- Derived selectors return correct values for sample data
- Context providers supply default values correctly

Testing these pieces keeps your UI clean and your state transitions predictable.

State Co location

Keep state as close as possible to the component that uses it. Moving state up too early makes components harder to reuse and increases re renders. If only one component needs a value, keep it local until a real sharing need appears.

Conclusion

React gives you many ways to manage state. The best choice depends on your app size, team, and complexity. Start simple, keep state local, and scale up only when necessary. A clear state strategy makes your UI easier to build and much easier to maintain.
