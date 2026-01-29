---
title: "Angular Change Detection Explained Simply"
date: "2026-01-01"
description: "Learn how Angular change detection works, what triggers it, and how to use OnPush and other tips for better performance."
slug: "angular-change-detection-explained"
image: "/images/angular-change-detection.png"
---

# Angular Change Detection Explained Simply

Change detection is the system that keeps your UI and data in sync. It is also the source of most performance questions in Angular. If you learn the mental model and a few practical tools, you can debug slow screens with confidence.

This guide explains what triggers a check, how Default and OnPush differ, and how I decide which strategy to use in real projects.

## The simple mental model

Picture your component tree as a set of boxes. Whenever something happens (a click, a timer, an HTTP response), Angular walks the tree and asks each component: "Do you need to update the DOM?"

That walk is the change detection cycle. The default strategy checks everything. OnPush checks only when inputs change by reference or when the component itself triggers a change.

## What actually triggers change detection

These are the common triggers:

- User events like click or input
- Async tasks like Promises, setTimeout, or HttpClient
- Async pipe emissions in templates
- Manual triggers through ChangeDetectorRef

Zone.js patches many async APIs so Angular knows when work finishes. That is why clicks and HTTP responses automatically update the view.

## Default vs OnPush in plain English

Default strategy means: "Every time something happens, check everything."

OnPush means: "Only check this component when its inputs change, an event happens inside it, or I explicitly mark it."

Default is safe and simple. OnPush is faster and more predictable, but it requires good data hygiene.

## A small OnPush example

```ts
import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-score",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="score">
      <strong>{{ label }}</strong>
      <span>{{ value }}</span>
    </div>
  `,
})
export class ScoreComponent {
  @Input() label = "Score";
  @Input() value = 0;
}
```

If you mutate an object in place, OnPush will not see a new reference. Use immutable updates instead.

```ts
// bad: same reference
player.stats.score += 1;

// good: new reference
player = { ...player, stats: { ...player.stats, score: player.stats.score + 1 } };
```

## The data flow that keeps OnPush happy

I use three rules to keep OnPush predictable:

1) Inputs are immutable
2) Derived values are computed in the component class
3) Streams are handled with async pipe

That alone removes most "why did this not update" bugs.

## Using ChangeDetectorRef correctly

Sometimes you need a manual nudge, usually when working with non Angular libraries.

```ts
import { ChangeDetectorRef } from "@angular/core";

constructor(private cdr: ChangeDetectorRef) {}

updateFromLibrary(result: string) {
  this.value = result;
  this.cdr.markForCheck();
}
```

Use `markForCheck` to schedule a refresh in the next cycle. Reserve `detectChanges` for rare cases where you must update immediately.

## Performance bottlenecks you can actually fix

If a screen is slow, I check these first:

- Big lists without trackBy
- Multiple expensive pipes in templates
- Large components with lots of bindings
- Frequent async updates from timers or websockets

### trackBy in lists

```html
<li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>
```

```ts
trackById(_: number, item: { id: string }) {
  return item.id;
}
```

This keeps the DOM stable and avoids full re renders.

### Avoid heavy logic in templates

If a template uses complex expressions, move them into the class. That reduces repeated work during each cycle.

## A real world scenario: filtering a list

Imagine a dashboard where the user types into a search input that filters a list of 500 items. With Default change detection, each keystroke triggers a full tree walk.

A better approach:

- Put the list in its own component
- Use OnPush on the list component
- Compute the filtered list in the parent and pass it as an input
- Use trackBy to stabilize DOM nodes

This isolates the cost to the part of the UI that changes and keeps the rest of the page stable.

## Debugging checklist I actually use

1) Is the slow component OnPush?
2) Are inputs immutable and stable?
3) Are large lists using trackBy?
4) Is there a pipe or function running on every change?
5) Are there timers or intervals that trigger too often?

If you can answer those, you can solve most real performance issues.

## Async pipe vs manual subscription

The async pipe is not just convenience. It subscribes, updates the view, and unsubscribes automatically. That means fewer memory leaks and fewer places to call `markForCheck`.

```html
<div *ngIf="user$ | async as user">
  {{ user.name }}
</div>
```

If you manually subscribe, you are responsible for cleanup and for triggering change detection when needed.

## Profiling a slow component

When a screen feels sluggish, I do this:

1) Open Angular DevTools and profile a user action
2) Look for components that re render too often
3) Check templates for heavy pipes or functions
4) Break large components into smaller ones with OnPush

You do not need perfect metrics, just a clear signal of what is hot.

## Signals and change detection

If you are using Angular signals, updates are more granular because signals track usage at a finer level than the default zone based approach. You still benefit from OnPush patterns, but the mental model becomes closer to \"update only what is read\".

## Quick FAQ

**Does OnPush always make things faster?** Not always. It makes updates more predictable, which usually helps performance, but it also requires clean data flow.

**Do I need Zone.js forever?** For most apps, yes. Advanced setups can remove it, but only after you understand the change detection model well.

## Common mistakes and how to avoid them

- Using OnPush but mutating arrays or objects
- Calling functions in templates that recompute every cycle
- Using setInterval without throttling or unsubscribing
- Triggering manual detection everywhere instead of fixing data flow

## Related reading

- [Angular Components Explained for Beginners](/blog/angular-components-beginners-guide)
- [Angular Signals and Standalone Components](/blog/angular-signals-standalone-components)
- [Angular Dependency Injection](/blog/angular-services-dependency-injection-beginners)

## Last updated

2026-01-22

## Sources

- https://angular.dev/guide/change-detection
- https://angular.dev/guide/zone

## Author

I am Toseef, a frontend engineer who builds Angular, React, and Next.js apps for real products. I write practical guides based on work experience and common team pitfalls. If you want to collaborate, visit [About](/about) or [Contact](/contact).
