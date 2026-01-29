---
title: "Angular Dependency Injection (Services) Explained"
date: "2025-12-28"
description: "Understand how Angular dependency injection works, how services are provided, and how to avoid common pitfalls."
slug: "angular-services-dependency-injection-beginners"
image: "/images/angular-dependency-injection.svg"
---

# Angular Dependency Injection (Services) Explained

Dependency injection (DI) is how Angular keeps your components small and your logic reusable. Instead of creating services inside a component, Angular provides them for you. This pattern makes testing easier and keeps your UI clean.

This guide explains how DI works, how to provide services, and where new developers usually get stuck.

## The idea in one sentence

DI means your component declares what it needs, and Angular supplies it.

Instead of `new UserService()` inside the component, you ask for `UserService` in the constructor and Angular hands you the correct instance.

## A simple service and component

```ts
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UserService {
  getDisplayName() {
    return "Toseef";
  }
}
```

```ts
import { Component } from "@angular/core";
import { UserService } from "./user.service";

@Component({
  selector: "app-greeting",
  standalone: true,
  template: `<p>Hello {{ name }}</p>`,
})
export class GreetingComponent {
  name = this.userService.getDisplayName();
  constructor(private userService: UserService) {}
}
```

## providedIn: root vs component providers

`providedIn: "root"` creates a singleton shared across the app. This is perfect for shared state, caches, or API clients.

Component providers create a new instance per component tree. That is useful when you want isolated state per feature.

Example:

```ts
@Component({
  selector: "app-profile",
  standalone: true,
  providers: [ProfileService],
  template: `...`
})
export class ProfileComponent {}
```

## How Angular decides which instance to use

Angular uses a hierarchical injector. It checks the component first, then parent components, then the root injector. The first match wins.

This is powerful, but it can also surprise you if you declare the same service at different levels.

## Injection tokens for interfaces

TypeScript interfaces do not exist at runtime, so you cannot inject them directly. Use `InjectionToken` when you need to represent an interface or a configurable value.

```ts
import { InjectionToken } from "@angular/core";

export const API_URL = new InjectionToken<string>("API_URL");
```

Then provide it:

```ts
bootstrapApplication(AppComponent, {
  providers: [{ provide: API_URL, useValue: "https://api.example.com" }],
});
```

## Provider patterns you should know

Angular gives you multiple ways to provide a dependency:

- `useClass` to swap an implementation
- `useValue` for constants
- `useFactory` when you need logic at creation time

```ts
{ provide: Logger, useClass: ConsoleLogger }
{ provide: API_URL, useValue: "https://api.example.com" }
{ provide: AuthClient, useFactory: () => new AuthClient("token") }
```

These patterns are great for testing and environment specific configuration.

## Multi providers for extensibility

Sometimes you want multiple implementations of the same token. Angular supports `multi: true`.

```ts
export const LOG_HANDLERS = new InjectionToken<LogHandler[]>("LOG_HANDLERS");

{ provide: LOG_HANDLERS, useClass: ConsoleLogHandler, multi: true }
{ provide: LOG_HANDLERS, useClass: RemoteLogHandler, multi: true }
```

This is useful for plug in style systems.

## Real world example: caching API data

Imagine a blog app where a service caches posts. If the service is provided at root, every component sees the same cache. If it is provided on a route, each route gets its own cache. That choice can change memory use and UX.

I usually start with root, then move to a component provider when I need isolation.

## Testing becomes easier with DI

DI makes unit testing clean because you can swap the service with a mock.

```ts
TestBed.configureTestingModule({
  providers: [
    { provide: UserService, useValue: { getDisplayName: () => "Test" } }
  ]
});
```

Now the component uses a predictable fake service and your tests are reliable.

## Common DI anti patterns

- Injecting the same service into too many unrelated components
- Using services as global state containers for everything
- Creating a service per small UI component

A good service has a clear boundary and a clear purpose.

## A quick DI checklist

- Is the service doing one job?
- Is the provider scope correct (root vs component)?
- Are dependencies injected rather than created inside the service?
- Is the service easy to test with a mock?

If you can answer yes, your DI setup is healthy.

## Avoiding circular dependencies

If Service A injects Service B and Service B injects Service A, Angular will throw errors or behave unpredictably. Break the cycle by extracting a smaller shared service or by passing a callback instead of injecting back.

## A simple logging service example

```ts
@Injectable({ providedIn: "root" })
export class LogService {
  log(message: string) {
    console.log(`[app] ${message}`);
  }
}
```

This is a good example of a singleton: it is stateless and used across the app.

## Feature scoped providers

If a feature should not share state with the rest of the app, provide the service at the route or component level. This is common for wizard flows or isolated dashboards where you do not want state leaks between sections.

## Quick recap

DI keeps components small, services reusable, and testing easier. If you are unsure where to provide a service, start with `providedIn: "root"` and move it closer to the feature only when you need isolated state.

When in doubt, keep services focused and avoid stuffing multiple unrelated responsibilities into one class.
Clear boundaries today save you hours of debugging later.
Keep services small and focused.
It keeps your architecture clean.

## Common DI pitfalls

- Creating services with `new` inside components
- Putting too much global state in a singleton
- Using services as a dumping ground for unrelated logic
- Forgetting to clean up subscriptions inside services

## A clean service design checklist

- The service does one thing well
- Dependencies are injected, not constructed
- Methods return Observables or Promises instead of manual callbacks
- The service does not directly touch the DOM

## When to use a service vs a component

Use a service when:

- Data is shared across multiple components
- You need an API client
- Logic should be reused across features

Use a component when:

- The logic is purely about UI
- State is local and does not need sharing

## Related reading

- [Angular Components Explained for Beginners](/blog/angular-components-beginners-guide)
- [Angular Change Detection Explained](/blog/angular-change-detection-explained)
- [Angular Forms: Template vs Reactive](/blog/angular-forms-template-vs-reactive)

## Last updated

2026-01-22

## Sources

- https://angular.dev/guide/dependency-injection
- https://angular.dev/guide/providers

## Author

I am Toseef, a frontend engineer who builds Angular, React, and Next.js apps for real products. I write practical guides based on work experience and common team pitfalls. If you want to collaborate, visit [About](/about) or [Contact](/contact).
