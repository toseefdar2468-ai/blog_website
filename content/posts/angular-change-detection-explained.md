---
title: "Angular Change Detection Explained Simply"
date: "2026-01-01"
description: "Learn how Angular change detection works, what triggers it, and how to use OnPush and other tips for better performance."
slug: "angular-change-detection-explained"
image: "/images/angular-change-detection.png"
---

Angular Change Detection Explained Simply

Angular apps feel fast when the UI updates at the right time and only when needed. Change detection is the system that keeps the template in sync with your data. It decides when Angular should check components and update the DOM.

In this guide you will learn:

- What change detection is
- What triggers it
- The difference between Default and OnPush
- How immutability helps performance
- Practical tips to avoid slow renders

What Is Change Detection?

Change detection is the process of comparing the current data model with what is shown in the template, then updating the DOM if something changed. It runs after events like clicks, timers, HTTP responses, or any async task that Angular knows about.

Think of it as Angular asking: "Has anything changed since the last check?" If the answer is yes, it updates the view.

How Angular Knows When to Run

Angular uses Zone.js to patch async events. When a user clicks a button or a promise resolves, Angular starts a change detection cycle.

Common triggers include:

- Clicks and input events
- HTTP responses from HttpClient
- setTimeout and setInterval
- Promises and async pipes

Default Change Detection Strategy

By default, Angular checks every component in the tree whenever a change detection cycle runs. This is safe and simple, but it can become expensive in large apps.

The default strategy works well for:

- Small to medium apps
- Simple component trees
- Apps that do not have heavy UI updates

OnPush Strategy

OnPush tells Angular to skip checking a component unless one of these happens:

- An @Input reference changes
- An event happens inside the component
- An observable used with the async pipe emits
- You manually mark it for check

OnPush makes performance more predictable. It also encourages better state management and immutability.

Immutability and Why It Matters

OnPush works best when you treat data as immutable. Instead of mutating arrays or objects, create new references.

Example:

- Bad: `items.push(newItem)`
- Good: `items = [...items, newItem]`

When you replace the array, Angular sees a new reference and updates the view.

Async Pipe to Reduce Manual Work

The async pipe handles subscriptions and automatically triggers change detection when new data arrives. It also cleans up subscriptions when the component is destroyed.

Benefits:

- Less memory leak risk
- Cleaner templates
- Automatic updates

trackBy for Large Lists

Rendering lists can be slow if Angular cannot track which items changed. Use `trackBy` with `*ngFor` to avoid re-rendering the entire list.

Example:

*ngFor="let item of items; trackBy: trackById"

trackById(index, item) {
  return item.id;
}

Change Detection and Performance Tips

1) Use OnPush for components with stable inputs
2) Avoid mutating large objects directly
3) Use async pipe for observable data
4) Split heavy components into smaller ones
5) Add trackBy to long lists

When Manual Change Detection Is Needed

Sometimes Angular does not know about a change, for example if you integrate a non Angular library. In those cases, you can use `ChangeDetectorRef` to trigger a manual check.

Use it carefully:

- `markForCheck()` to schedule a check
- `detectChanges()` to run immediately

Overusing manual checks can make the app harder to reason about.

Common Beginner Mistakes

- Assuming OnPush automatically makes everything faster
- Mutating data and expecting OnPush to update
- Forgetting trackBy on large lists
- Using detectChanges everywhere instead of fixing data flow

A Simple Mental Model

Think of change detection as a safety net. Default checks are frequent and safe. OnPush checks are fewer and more intentional. When you design your data flow well, OnPush gives you a faster app and simpler debugging.

Debugging Change Detection

If a template does not update, the first step is to check how the data changes. OnPush components only update when the input reference changes or an event occurs inside the component.

Debug steps:

- Confirm the input reference actually changed
- Check if the change happens outside Angular zone
- Verify that the async pipe is used for observables

These checks solve most issues without manual calls to `detectChanges()`.

Async Pipe Patterns

The async pipe is the simplest way to keep the view up to date with observable data. It subscribes, updates the view, and unsubscribes automatically.

Good patterns:

- Use `async` in the template for streams
- Combine streams with `combineLatest` in the component
- Avoid manual subscriptions when a template can handle it

This reduces boilerplate and makes updates consistent.

Performance Audits for Large Apps

When performance slows, find the components that render most often or handle large lists. A few targeted changes often help more than broad refactors.

Practical actions:

- Add `trackBy` to any large list
- Split heavy components into smaller ones
- Move expensive computations outside templates

Focus on the biggest wins first.

Pure Pipes and Template Work

Angular pipes can be pure or impure. Pure pipes run only when their input changes, which is good for performance. Impure pipes run on every change detection cycle and can slow things down.

Guidelines:

- Keep pipes pure by default
- Avoid heavy work inside templates
- Move expensive logic into the component or service

This keeps templates fast and predictable.

Change Detection Outside Angular

Some third party libraries run outside Angular's zone. If UI updates do not appear, you can run the update inside Angular or trigger a check manually.

Options:

- Wrap the update in `ngZone.run(...)`
- Call `markForCheck()` in an OnPush component

Use these options sparingly and prefer clean data flow whenever possible.

Conclusion

Change detection is at the heart of Angular. When you understand how it works, you can build faster and more predictable UI. Start with the default strategy, then move to OnPush where it makes sense. Pair it with immutability, async pipes, and trackBy to keep your app responsive as it grows.
