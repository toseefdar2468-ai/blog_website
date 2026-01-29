---
title: "Core Web Vitals Playbook"
date: "2026-01-07"
description: "A practical playbook for improving LCP, INP, and CLS with clear actions and checks."
slug: "core-web-vitals-playbook"
image: "/images/core-web-vital.png"
---

# Core Web Vitals Playbook

Core Web Vitals are not magic scores. They are a proxy for how your site feels. This playbook shows how I triage problems, pick the highest impact fixes, and verify improvements.

If you have ever asked, "Why is my site slow even though the code looks fine?" this guide is for you.

## The three metrics that matter

- LCP (Largest Contentful Paint): how fast the main content appears
- INP (Interaction to Next Paint): how quickly the page responds to input
- CLS (Cumulative Layout Shift): how stable the layout feels

These are user experience metrics, not just technical vanity numbers.

## Field data vs lab data

There are two ways to measure performance:

- Field data (real user data) tells you what people actually experience
- Lab data (Lighthouse) helps you debug in a controlled environment

I start with field data to understand the real problem, then use lab tools to reproduce and fix it.

## How I measure and validate

1) Check the PageSpeed Insights report for the URL
2) Compare against Search Console Core Web Vitals
3) Use Chrome DevTools Performance to locate bottlenecks
4) Re test after each change

Small wins compound quickly when you measure consistently.

## The order I fix things

1) Make the hero content load fast (LCP)
2) Make interactions responsive (INP)
3) Stop layout jumps (CLS)

You get the most visible win by fixing LCP first.

## LCP: make the main content appear fast

Common LCP blockers:

- Large hero images
- Render blocking CSS
- Slow server response time
- Heavy client side JS

### LCP checklist

- Compress hero images (WebP or AVIF)
- Serve properly sized images, not the original 4k asset
- Preload the hero font or use a system font
- Avoid client side rendering for above the fold content

Example of preloading a hero font:

```html
<link rel="preload" href="/fonts/brand.woff2" as="font" type="font/woff2" crossorigin />
```

### Image strategy that works

- Use modern formats (AVIF or WebP)
- Serve the right size for the screen
- Avoid CSS background images for critical content

If the hero image is the LCP element, treat it like a first class asset.

## INP: make the page respond quickly

INP focuses on responsiveness. If clicking a button feels sluggish, you likely have main thread work that is too heavy.

### INP checklist

- Debounce expensive input handlers
- Split heavy computations
- Avoid rendering large lists on every keystroke
- Use requestIdleCallback for non critical work

A tiny debounce example:

```ts
function debounce(fn: () => void, ms = 200) {
  let t: ReturnType<typeof setTimeout> | undefined;
  return () => {
    if (t) clearTimeout(t);
    t = setTimeout(fn, ms);
  };
}
```

### Reduce main thread work

If INP is bad, something is blocking the main thread. Fixes that help:

- Split large bundles
- Move analytics and widgets to load later
- Avoid expensive loops on every input

Performance is often about doing less, not doing faster.

## CLS: stop layout jumps

Layout shifts hurt trust. Users hate it when buttons move while they tap.

### CLS checklist

- Set width and height on images
- Reserve space for ads and embeds
- Avoid inserting banners above existing content

Example:

```html
<img src="/hero.jpg" width="1200" height="640" alt="" />
```

### Ads and embeds

If you run ads or embeds, always reserve space. A small placeholder box prevents the entire page from shifting when the ad loads.

## A simple performance budget

Budgets keep teams aligned. Here is a baseline:

```txt
Page size: <= 250 KB (compressed)
Main thread blocking: <= 150 ms before first input
Largest image: <= 200 KB
```

Budgets turn "performance" into a visible target during reviews.

## Real world triage example

If a blog feels slow:

1) Check the hero image size
2) Measure server response time
3) Remove unused scripts
4) Defer non critical widgets

Often you can reduce LCP by half with one or two targeted changes.

## Monitoring over time

After fixes, keep an eye on regressions:

- Track performance in CI for key pages
- Use alerts if LCP or INP spikes
- Re test after big design changes

Performance is not a one time task; it is an ongoing habit.

## Server response time matters

If Time to First Byte is slow, LCP will be slow no matter how optimized the front end is. Check your hosting, enable caching, and avoid slow database queries for public pages.

## CDN and caching basics

Serving static assets from a CDN reduces latency. Use long cache headers for images, fonts, and static JS bundles. For HTML, use caching only when content is static or revalidated.

These changes are boring, but they often deliver the biggest wins.

## Third party scripts

Analytics, chat widgets, and ads can hurt INP and LCP. Load them after the main content and avoid blocking the initial render.

## Fonts and layout shifts

Custom fonts can cause layout shift if they load late. Use `font-display: swap` and preload critical fonts to reduce CLS and improve LCP.

## INP vs FID

INP replaces FID as the primary responsiveness metric. If you previously optimized for FID, focus now on reducing long tasks and heavy event handlers across the page, not just on the first input.

If lab scores are good but field data is poor, check real user devices and network conditions. Many issues appear only on low end phones.
Test on a slow network profile to catch worst case behavior.
Real users often browse on unstable networks, so this matters.
Aim for consistent results, not just peak scores.
Consistency builds user trust.
Trust keeps visitors returning.
Fast sites feel reliable.

## Related reading

- [Next.js SEO and Metadata in the App Router](/blog/nextjs-seo-metadata-app-router)
- [Next.js Data Fetching Strategies](/blog/nextjs-data-fetching-strategies)
- [CSS Architecture for Scalable Frontend](/blog/css-architecture-scalable-frontend)

## Last updated

2026-01-22

## Sources

- https://web.dev/vitals/
- https://developer.chrome.com/docs/web-platform/metrics/

## Author

I am Toseef, a frontend engineer who builds Angular, React, and Next.js apps for real products. I write practical guides based on work experience and common team pitfalls. If you want to collaborate, visit [About](/about) or [Contact](/contact).
