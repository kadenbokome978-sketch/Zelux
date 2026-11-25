---
name: motion-and-interaction
description: Rules for adding animation and interactivity to zelux.co.uk without hurting accessibility, performance or no-JS users. Use whenever adding or changing hover effects, reveals, animated diagrams, toggles, quizzes or any client-side script.
---

# Motion and interaction

Motion must explain something, guide attention or give feedback. If it does none of those, don't add it. One signature interaction per page (homepage: the Detector, supported by the LeadFlow toggle).

## Allowed

- One-shot reveals via `data-reveal` (+ `style="--d:80ms"` stagger). Handled by `src/scripts/reveal.ts`; gated on `.js` and `prefers-reduced-motion: no-preference`.
- Hover/focus feedback: colour, underline grow (`.link-u`, `.btn-ghost`), small translate (≤6px), arrow nudge.
- Step-through diagrams (LeadFlow pattern): advance with `setInterval` only while visible (IntersectionObserver), stop when off screen.
- State transitions on toggles, chips, accordions.

## Timing

- UI feedback 150–300ms, `var(--ease-out-soft)`.
- Reveals ~700ms. Storytelling steps 850–1400ms per step.
- Nothing loops faster than once per ~5s; anything that moves for more than 5s needs a pause control (WCAG 2.2.2) or must stop on its own.

## Not allowed

- Marquees / auto-scrolling text (Kaden dislikes them).
- Scroll-jacking, smooth-scroll libraries, parallax on body content.
- Animating layout properties (width, height, top, margin). Animate `transform` and `opacity` only (grid-rows trick for the FAQ is the one exception).
- Cursor followers, custom cursors, flashing (>3 per second).
- Animation libraries (GSAP, Framer, Lottie). Write it in CSS + a few lines of TS.

## Accessibility and resilience (every interaction)

- `prefers-reduced-motion: reduce` → show the end state, no movement.
- No JS → content still readable and useful. Use `html:not(.js)` / `.js` gates, `<noscript>` fallbacks, and never hide content behind JS by default.
- Real `<button>`s with `aria-pressed` / `aria-expanded`; results in `aria-live="polite"`; focus never lost or trapped; Escape closes overlays.
- Styles for elements created in JS must be `:global(...)` in Astro components (scoped styles won't reach them).

## Performance budget

- Added JS per interaction: aim under 5 KB, hard limit 20 KB. No third-party scripts for interactions.
- Total blocking time stays ~0ms in Lighthouse; CLS stays 0. Reserve space (min-height) for anything that fills in later.
