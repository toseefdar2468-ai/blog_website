---
title: "Frontend Accessibility Checklist"
date: "2025-12-30"
description: "A practical checklist to make your UI usable with keyboard, screen readers, and assistive tech."
slug: "frontend-accessibility-checklist"
image: "/images/accessibility.png"
---

# Frontend Accessibility Checklist

Accessibility is not a nice to have. It is the difference between a usable product and a broken one for many users. The good news is that most accessibility wins come from a small set of habits.

This checklist focuses on practical steps you can apply to any frontend project.

## 1) Use semantic HTML first

Start with real HTML elements before reaching for ARIA. Semantics give assistive technologies the information they need.

- Use `<button>` for buttons, not `<div>`
- Use `<nav>` for navigation
- Use `<main>` for main content
- Use headings in order (`h1` then `h2`)

## 2) Keyboard navigation

Every interactive element should be reachable with the keyboard.

- Tab should move through links and controls
- Enter and Space should activate buttons
- Focus should be visible and clear

If you hide the focus outline, replace it with an accessible alternative.

## 3) Labels and form controls

Every input needs a label. Placeholders are not labels.

```html
<label for="email">Email</label>
<input id="email" type="email" />
```

If a label is visually hidden, keep it accessible with a utility like `sr-only`.

## 4) Color contrast

Low contrast text is unreadable for many users. Use a contrast checker and aim for WCAG AA at minimum.

- Body text should be high contrast
- Links should be distinguishable from plain text
- Icons should have enough contrast too

## 5) ARIA only when needed

ARIA is powerful, but misuse can make things worse. Use it only when native HTML cannot express the behavior.

Common cases:

- `aria-label` on icon buttons
- `aria-expanded` on collapsible panels
- `aria-live` for dynamic status updates

## 6) Focus management for modals

When a modal opens, focus should move inside it. When it closes, focus should return to the trigger.

This prevents keyboard users from getting lost.

## 7) Images and media

- Decorative images should have empty alt (`alt=""`)
- Meaningful images need descriptive alt text
- Videos should have captions or transcripts

## 8) Error messages and validation

When validation fails, explain clearly what went wrong and how to fix it.

- Use inline error messages near fields
- Include a summary at the top for long forms
- Use `aria-live` for dynamic errors

## 9) Skip links

A skip link lets keyboard users jump to the main content quickly.

```html
<a href="#main" class="skip-link">Skip to content</a>
```

## 11) Avoid keyboard traps

Users should always be able to navigate out of a component with the keyboard. If you build custom dropdowns or modals, test that Tab and Escape behave correctly.

## 12) Headings and landmarks

Headings should describe sections and follow a logical order. Use one `h1` per page, then `h2` for major sections, and avoid skipping levels.

Landmarks like `<header>`, `<nav>`, `<main>`, and `<footer>` help screen readers understand structure.

## 13) Tables and data grids

Use `<table>` for tabular data. Add `scope="col"` on header cells so screen readers can associate headers with data.

## 14) Animation and motion

Provide a reduced motion option for users who prefer it.

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

## 15) Link text and buttons

Links should describe the destination. Avoid generic \"Click here\". Buttons should describe the action, not the UI element.

Good examples:

- "Download report"
- "Save profile"
- "View invoice"

## 16) Focus order

The focus order should match the visual order. Avoid using `tabindex` values greater than 0 because they often create confusing navigation.

## 17) Live regions for status updates

When content changes after an action, announce it with `aria-live` so screen reader users receive feedback.

```html
<p aria-live="polite">Saved successfully</p>
```

## 18) Modal focus traps

When a modal opens, focus should stay within it until it closes. This prevents keyboard users from tabbing into the content behind the dialog.

## 19) Page language

Set the document language (`<html lang="en">`) so screen readers use the right pronunciation rules.

## 20) Icon buttons

Icon only buttons must include an `aria-label` so their purpose is clear to screen reader users.

## 21) Focus styles you can see

Do not remove focus outlines without replacing them. A clear focus ring helps keyboard users navigate confidently.

If you customize focus styles, test them on dark and light backgrounds to ensure they remain visible.
Also test with zoom at 200% to make sure layout still works.
High contrast mode testing can reveal issues with icons and borders.
If something is only visible by color, add another cue like text or an icon.
This helps color blind users and improves clarity for everyone.
Clarity benefits all users, not just those with disabilities.

## 10) Testing tools

You do not need expensive tools to start:

- Lighthouse (Chrome DevTools)
- Axe browser extension
- Keyboard only testing

Manual testing is still the most valuable.

## Quick checklist

- All interactive elements are keyboard accessible
- Focus styles are visible
- Form inputs have labels
- Color contrast meets WCAG AA
- Images have correct alt text
- Headings are in logical order

## A practical testing workflow

1) Run Lighthouse for a baseline
2) Use Axe to catch common issues
3) Navigate the page using only the keyboard
4) Test with a screen reader for key flows

This process takes less than 30 minutes and catches most issues early.

## Related reading

- [CSS Grid Layout Recipes](/blog/css-grid-layout-recipes)
- [Core Web Vitals Playbook](/blog/core-web-vitals-playbook)
- [CSS Architecture for Scalable Frontend](/blog/css-architecture-scalable-frontend)

## Last updated

2026-01-22

## Sources

- https://www.w3.org/WAI/standards-guidelines/wcag/
- https://www.w3.org/WAI/ARIA/apg/

## Author

I am Toseef, a frontend engineer who builds Angular, React, and Next.js apps for real products. I write practical guides based on work experience and common team pitfalls. If you want to collaborate, visit [About](/about) or [Contact](/contact).
