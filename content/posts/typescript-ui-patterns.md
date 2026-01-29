---
title: "TypeScript UI Patterns"
date: "2026-01-10"
description: "Practical TypeScript patterns for building safer, cleaner UI components."
slug: "typescript-ui-patterns"
image: "/images/typescript-patterns.png"
---

# TypeScript UI Patterns

TypeScript is not just about avoiding type errors. It is a design tool that helps you build clearer, safer UI components. When types encode your intent, components become easier to use and harder to misuse.

This guide covers patterns I rely on in production UI work.

## 1) Discriminated unions for variants

When a component has multiple modes, a discriminated union keeps props consistent.

```ts
type ButtonProps =
  | { variant: "primary"; href?: never }
  | { variant: "link"; href: string };
```

Now TypeScript enforces that link buttons always have an href.

## 2) Optional props with defaults

When a prop is optional, set a default value inside the component.

```ts
type CardProps = { size?: "sm" | "md" | "lg" };

function Card({ size = "md" }: CardProps) {
  return <div className={`card ${size}`}></div>;
}
```

This avoids undefined checks throughout the component.

## 3) Generic list components

Generics let you build reusable list components without losing type safety.

```ts
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};
```

## 4) Polymorphic components

Polymorphic components accept an `as` prop to render different elements while preserving types.

```ts
type TextProps<E extends React.ElementType> = {
  as?: E;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<E>;
```

## 5) Extracting shared prop types

If multiple components share props, define a base type to avoid duplication.

```ts
type BaseInputProps = {
  id: string;
  label: string;
  error?: string;
};
```

## 6) Narrowing with type guards

When data can be multiple shapes, use type guards to narrow safely.

```ts
function isUser(x: any): x is { id: string; name: string } {
  return x && typeof x.id === "string";
}
```

## 7) Safer event types

Use explicit event types for handlers:

```ts
function onChange(e: React.ChangeEvent<HTMLInputElement>) {
  setValue(e.target.value);
}
```

## 8) Exhaustive checks for safety

When using unions, add a `never` check to make sure all cases are handled.

```ts
type Status = "idle" | "loading" | "error";

function renderStatus(s: Status) {
  switch (s) {
    case "idle":
      return "Idle";
    case "loading":
      return "Loading";
    case "error":
      return "Error";
    default: {
      const _exhaustive: never = s;
      return _exhaustive;
    }
  }
}
```

## 9) Readonly props for stability

If a prop should not be mutated, mark it as readonly. This protects you from accidental changes in complex components.

```ts
type Config = Readonly<{
  id: string;
  enabled: boolean;
}>;
```

## 10) API response types

Define response types once and reuse them across the app:

```ts
type User = { id: string; name: string };
type UsersResponse = { data: User[] };
```

This keeps your UI strongly typed from fetch to render.

## 11) Async state pattern

Model async UI states with a union instead of a handful of booleans.

```ts
type LoadState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };
```

This forces you to handle every state explicitly.

## 12) Utility types you should know

- `Partial<T>` for optional props
- `Pick<T, K>` for selecting fields
- `Omit<T, K>` for removing fields

These make it easy to build clean prop types without duplication.

## 13) Conditional props

Conditional props let you enforce rules like \"if `href` exists, render an anchor\".

```ts
type LinkProps =
  | { href: string; onClick?: never }
  | { href?: never; onClick: () => void };
```

## 14) Generics in UI components

Generics make components reusable without losing type safety.

```ts
type SelectProps<T> = {
  items: T[];
  getLabel: (item: T) => string;
};
```

This pattern avoids `any` while staying flexible.

## 15) The satisfies operator

The `satisfies` operator lets you validate an object shape without widening types.

```ts
const routes = [
  { label: "Home", href: "/" },
] satisfies { label: string; href: string }[];
```

This keeps types precise and avoids accidental errors.

## 16) ComponentProps for consistency

Use `React.ComponentProps` to reuse prop types and keep wrappers consistent.

```ts
type ButtonProps = React.ComponentProps<"button">;
```

## 17) Template literal types

Template literal types let you encode patterns, like design token keys.

```ts
type ColorToken = `color-${"primary" | "secondary"}`;
```

## 18) as const for literal inference

Use `as const` to keep literal types when defining config objects.

```ts
const sizes = ["sm", "md", "lg"] as const;
type Size = typeof sizes[number];
```

## 19) Union types vs enums

Union types are often simpler and tree shake better than enums. Prefer unions unless you need enum reverse mapping.

## 20) HTML element props reuse

If you wrap native elements, reuse their prop types so you do not lose attributes:

```ts
type InputProps = React.ComponentPropsWithoutRef<"input"> & { label: string };
```

This keeps your wrapper flexible and type safe.

## 21) Narrowing with the in operator

When data has multiple shapes, you can narrow it like this:

```ts
if ("href" in props) {
  // props is now the link variant
}
```

This keeps runtime checks simple and type safe.

## 22) Readonly arrays

When data should not be mutated, use `readonly` arrays to prevent accidental changes.

```ts
const tags: readonly string[] = ["frontend", "ui"];
```

## 23) Strict mode wins

Enable `strict` in TypeScript so missing types and unsafe code are caught early. It can feel noisy at first, but it saves time on bugs later.
Most teams find it improves confidence in refactors.

## Common mistakes

- Using `any` when a union would work
- Returning `null` instead of a proper empty state type
- Ignoring strict mode errors and losing safety

## Related reading

- [React Hooks Mental Model](/blog/react-hooks-mental-model)
- [React State Management Guide](/blog/react-state-management-guide)
- [React Performance Optimization](/blog/react-performance-optimization)

## Last updated

2026-01-22

## Sources

- https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
- https://react-typescript-cheatsheet.netlify.app/

## Author

I am Toseef, a frontend engineer who builds Angular, React, and Next.js apps for real products. I write practical guides based on work experience and common team pitfalls. If you want to collaborate, visit [About](/about) or [Contact](/contact).
