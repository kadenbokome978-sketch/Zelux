---
name: motion-and-interaction
description: Rules for adding animation and interactivity to zelux.co.uk without hurting accessibility, performance or no-JS users. Use whenever adding or changing hover effects, reveals, animated diagrams, toggles, quizzes or any client-side script.
---

# Motion and interaction

Motion must explain something, guide attention or give feedback. If it does none of those, don't add it. One signature interaction per page (homepage: the Detector, supported by the LeadFlow toggle).

## Tools in the stack (Kaden added these on 25 Nov 2026)

- **GSAP 3 + ScrollTrigger** (`gsap`): scroll-linked and timeline animation. Register plugins once; import from `gsap` / `gsap/ScrollTrigger`.
- **Lenis** (`lenis`): smooth *wheel* scrolling on desktop. Set up once in `src/scripts/motion.ts` and driven by `gsap.ticker`. Touch stays native (syncTouch off) so iPhone/iPad scroll normally. Off under reduced motion. Exposed as `window.lenis`; call `window.lenis?.stop()/start()` around anything that locks scrolling (the mobile menu does).
- **React Bits** (copied into `src/components/react-bits/`, React islands via `@astrojs/react`): currently `ScrollReveal` (statement band), `SpotlightCard` (value cards), `Magnet` (main CTAs). Copy new ones from the TS + Tailwind variant, keep the attribution header, and adapt them to the design system (2px radius, no shadows, site type classes).
- `src/scripts/motion.ts` is lazy-loaded after `load`/idle from `Base.astro`. Keep it that way so motion never delays first paint.

### React Bits rules
- Hydrate with `client:visible` (or `client:idle` for small, above-the-fold pieces). Never `client:load` for decoration.
- Pass plain text via props (e.g. `ScrollReveal text="..."`): Astro slot content arrives as HTML, not a string.
- Don't put `data-reveal` on a React island root: the reveal script changes its class before hydration. Wrap it in a plain div and put `data-reveal` there.
- Only use components that match the design system. No cursor trails, splash/blob cursors, glitch/neon/metallic effects, 3D galleries or gradient backgrounds.

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
- Scroll-jacking (pinning that hijacks scroll distance), parallax on body content. Lenis wheel smoothing is the only scroll change allowed.
- Animating layout properties (width, height, top, margin). Animate `transform` and `opacity` only (grid-rows trick for the FAQ is the one exception).
- Cursor followers, custom cursors, flashing (>3 per second).
- Other animation libraries (Framer Motion, Lottie, anime.js). Use CSS first, GSAP when you need scroll-linking or sequencing.

## Accessibility and resilience (every interaction)

- `prefers-reduced-motion: reduce` → show the end state, no movement.
- No JS → content still readable and useful. Use `html:not(.js)` / `.js` gates, `<noscript>` fallbacks, and never hide content behind JS by default.
- Real `<button>`s with `aria-pressed` / `aria-expanded`; results in `aria-live="polite"`; focus never lost or trapped; Escape closes overlays.
- Styles for elements created in JS must be `:global(...)` in Astro components (scoped styles won't reach them).

## Performance budget

- Added JS per interaction: aim under 5 KB gzipped on top of the shared GSAP/React runtime. No third-party CDN scripts.
- Above-the-fold content must never start hidden (the reveal script only hides below-the-fold blocks). An earlier version delayed LCP from 1.4s to 2.3s this way.
- Total blocking time stays ~0ms in Lighthouse; CLS stays 0. Reserve space (min-height) for anything that fills in later.
