---
title: "Angular Signals and Standalone Components in Practice"
date: "2026-01-10"
description: "Learn how signals and standalone components simplify Angular state and reduce module overhead."
slug: "angular-signals-standalone-components"
image: "/images/angular-signals.png"
---

# Angular Signals and Standalone Components in Practice

Angular continues to simplify app architecture. Signals provide a lightweight way to model state, while standalone components reduce the need for large NgModules. Together they make Angular apps easier to reason about and easier to scale.

This guide explains signals in plain language and shows how I combine them with standalone components in real projects.

## Signals in plain language

A signal is a value that can change over time. You read it like a function call and update it with dedicated methods.

```ts
const count = signal(0);
count.set(count() + 1);
```

The key benefit is that Angular knows which templates depend on the signal and updates only those parts of the UI.

## Signals in templates

Signals can be read directly in templates. This keeps templates clean and avoids manual subscription logic.

Good patterns:

- Read a signal as a function in the template
- Keep formatting logic in computed signals
- Avoid heavy work inside the template

## Computed signals for derived state

Computed signals let you derive data from other signals:

```ts
const total = computed(() => items().length);
```

This keeps derived values consistent without manual syncing. If `items` changes, `total` updates automatically.

## A small signal based component

```ts
import { Component, signal, computed } from "@angular/core";

@Component({
  selector: "app-counter",
  standalone: true,
  template: `
    <button (click)="inc()">Count {{ count() }}</button>
    <p>Double: {{ double() }}</p>
  `,
})
export class CounterComponent {
  count = signal(0);
  double = computed(() => this.count() * 2);
  inc() {
    this.count.update((c) => c + 1);
  }
}
```

This shows the basic pattern: `signal` for state, `computed` for derived values, and a simple update method.

## Effects for side effects

Effects run when the signals they read change. They are useful for logging, saving to storage, or triggering non UI behavior.

Keep effects small and focused. If an effect starts to look like data transformation, it probably belongs in a computed signal instead.

## Signals and RxJS together

You do not need to replace RxJS to use signals. RxJS still shines for streams like user input, websockets, or complex async flows.

A practical approach:

- Use signals for local UI state
- Use RxJS for streams and async pipelines
- Bridge between them at clear boundaries

This keeps each tool in its strength area.

## When signals shine

Signals are a great fit for local UI state, derived values, and simple interactions. They are less ideal for complex async pipelines, where RxJS still provides better tools.

## A simple signal store pattern

For small features, you can keep state in a plain class with signals:

```ts
class CartStore {
  items = signal<string[]>([]);
  total = computed(() => this.items().length);

  add(item: string) {
    this.items.update((list) => [...list, item]);
  }
}
```

This gives you store-like structure without extra libraries.

## Interop with RxJS (toSignal)

If you already have an Observable, you can convert it to a signal and keep your templates clean.

```ts
const user = toSignal(user$);
```

That lets you keep stream logic in RxJS while using signals in the UI.

## Testing components that use signals

Signals make testing straightforward because there is no subscription setup. You can update a signal and assert the DOM output in your test.

## Best practices

- Keep signals close to the component that uses them
- Use computed signals for derived data
- Keep effects small and focused
- Avoid mixing multiple reactive styles in one file

## Signals vs subjects (quick comparison)

Signals are great for local state and templates. Subjects are better for event streams and complex async workflows. If you find yourself piping multiple operators, that is a sign to keep RxJS in the loop.

## Practical migration steps

If you have a large codebase:

1) Start with new components using signals
2) Convert simple local state from RxJS to signals
3) Keep complex streams in RxJS until you have time to refactor

This avoids big rewrites while still gaining the benefits of signals.

## Common signal pitfalls

- Updating a signal inside a computed (avoid side effects)
- Mixing mutable objects without creating new references
- Using effects for derived values instead of computed signals

Signals reduce unnecessary re renders because Angular knows exactly which templates read which signals. This makes UI updates more targeted compared to broad change detection cycles.

Prefer `update` for derived updates and `set` for direct replacements. It keeps intent clear and avoids accidental mutations.
This habit also makes code reviews easier because state changes read like small, explicit operations.
It also reduces surprises when multiple developers touch the same feature.
Signals also make intent clearer in templates.
That clarity reduces bugs.

## Standalone components overview

Standalone components reduce boilerplate by removing NgModule wrappers. You declare imports directly on the component.

```ts
@Component({
  selector: "app-card",
  standalone: true,
  imports: [CommonModule],
  template: `<div class="card"><ng-content></ng-content></div>`,
})
export class CardComponent {}
```

This makes dependencies obvious and improves tree shaking.

## Routing with standalone components

Routes can load components directly without a module layer.

```ts
export const routes: Routes = [
  { path: "", loadComponent: () => import("./home.page").then(m => m.HomePage) },
];
```

This is simpler and keeps feature boundaries clear.

## Migration tips

If you are migrating a large app:

1) Convert new features to standalone first
2) Migrate shared components next
3) Move routing to `loadComponent` over time

This gradual approach avoids massive rewrites.

## Common mistakes

- Mixing signals and RxJS without clear boundaries
- Putting complex logic inside effects
- Forgetting to import required dependencies in standalone components

## Related reading

- [Angular Change Detection Explained](/blog/angular-change-detection-explained)
- [Angular Components Explained for Beginners](/blog/angular-components-beginners-guide)
- [Angular Routing and Navigation](/blog/angular-routing-navigation-beginners)

## Last updated

2026-01-22

## Sources

- https://angular.dev/guide/signals
- https://angular.dev/guide/standalone-components

## Author

I am Toseef, a frontend engineer who builds Angular, React, and Next.js apps for real products. I write practical guides based on work experience and common team pitfalls. If you want to collaborate, visit [About](/about) or [Contact](/contact).
