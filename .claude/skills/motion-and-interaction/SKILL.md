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

### GSAP rules
- Wrap motion setup in `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)` and return a cleanup, so switching reduced motion on reverts it live (motion.ts does this).
- `ScrollTrigger.refresh()` after `document.fonts.ready` and after anything that changes layout; never on every resize.
- Use `stagger` rather than many tweens with manual delays; `gsap.quickTo()` for anything that follows the pointer; `autoAlpha` when something should become non-interactive at 0.
- `will-change` only on elements that actually animate.

### React Bits rules
- Hydrate with `client:visible` (or `client:idle` for small, above-the-fold pieces). Never `client:load` for decoration.
- Pass plain text via props (e.g. `ScrollReveal text="..."`): Astro slot content arrives as HTML, not a string.
- Don't put `data-reveal` on a React island root: the reveal script changes its class before hydration. Wrap it in a plain div and put `data-reveal` there.
- Only use components that match the design system. No cursor trails, splash/blob cursors, glitch/neon/metallic effects, 3D galleries or gradient backgrounds.

## Allowed

- Carousels: native scroll-snap first (works with no JS); JS only adds buttons, counter, arrow keys, mouse drag and the active state (see ProjectCarousel). Never auto-advance. Don't dim inactive slides with opacity (fails contrast); scale them slightly instead.

- Entry transitions for things toggled by `hidden`/`display`: CSS `@starting-style` (see the mobile menu in Navbar.astro), no JS.
- Hover transforms only inside `@media (hover: hover) and (pointer: fine)` (Tailwind v4 `hover:` utilities already do this; custom CSS must do it by hand) so touch screens don't get sticky hover.

- One-shot reveals via `data-reveal` (+ `style="--d:80ms"` stagger). Handled by `src/scripts/reveal.ts`; gated on `.js` and `prefers-reduced-motion: no-preference`.
- Hover/focus feedback: colour, underline grow (`.link-u`, `.btn-ghost`), small translate (≤6px), arrow nudge.
- Step-through demos (LeadFlow pattern): play through once when first seen (IntersectionObserver), then rest on the result; steps are clickable and a "Play again" button replays. No endless loops.
- State transitions on toggles, chips, accordions.

## Timing (tokens in global.css: use them, no one-off durations)

- `--dur-fast` 160ms: colour/opacity feedback. `--dur-ui` 220ms: transforms, underlines, toggles. `--dur-slow` 600ms: scroll reveals. One easing: `var(--ease-out-soft)` (expo-style ease-out). No bounce, no elastic.
- Springs (Magnet) critically damped: `{ stiffness: 170, damping: 26 }`, so no overshoot.
- Exit faster than enter (~60–70%): e.g. FAQ opens at 320ms, closes at `--dur-ui`.
- Stagger list items 30–50ms apart (`--d` in 50ms steps; menu items 40ms).
- Faded text never sits below 0.2 opacity (ScrollReveal `baseOpacity` ≥ 0.22).
- Frequency principle: things people use constantly (nav links, the menu toggle) get little or no motion; rare moments can have more.
- Never scale from 0; press feedback is `scale(0.97–0.98)` on `:active`.
- Storytelling steps 850–1400ms per step.
- Nothing loops faster than once per ~5s; anything that moves for more than 5s needs a pause control (WCAG 2.2.2) or must stop on its own.

## Not allowed

- Marquees / auto-scrolling text (Kaden dislikes them).
- Scroll-jacking (pinning that hijacks scroll distance), parallax on body content. Lenis wheel smoothing is the only scroll change allowed.
- Animating layout properties (width, height, top, margin). Animate `transform` and `opacity` only (grid-rows trick for the FAQ is the one exception).
- Cursor followers, custom cursors, flashing (>3 per second).
- Other animation libraries (Framer Motion, Lottie, anime.js). Use CSS first, GSAP when you need scroll-linking or sequencing.

## Accessibility and resilience (every interaction)

- `prefers-reduced-motion: reduce` → show the end state, no movement. global.css collapses every transition and animation to 0.01ms under reduced motion, opacity included.
- No JS → content still readable and useful. Use `html:not(.js)` / `.js` gates, `<noscript>` fallbacks, and never hide content behind JS by default.
- Real `<button>`s with `aria-pressed` / `aria-expanded`; results in `aria-live="polite"`; focus never lost or trapped; Escape closes overlays.
- Styles for elements created in JS must be `:global(...)` in Astro components (scoped styles won't reach them).

## Performance budget

- Added JS per interaction: aim under 5 KB gzipped on top of the shared GSAP/React runtime. No third-party CDN scripts.
- Above-the-fold content must never start hidden (the reveal script only hides below-the-fold blocks). An earlier version delayed LCP from 1.4s to 2.3s this way.
- Total blocking time stays ~0ms in Lighthouse; CLS stays 0. Reserve space (min-height) for anything that fills in later.

## "See it with your business" (homepage)

`src/scripts/personalise.ts` holds eight trade templates (made-up default names, colours, copy). The hero `TryIt` box saves `{ name, trade }` to sessionStorage and fires `zelux:preview`; HeroPhone, BuildWeek and ClosingBand listen with `onPreview()` and re-dress themselves ([data-p] text + `--p-*` colour vars), and /book prefills the note. It's templating on the visitor's device: never describe it as generated, never send the input anywhere. Hidden without JS; the rebuild sweep is skipped with reduced motion. To add a trade, add an entry to `trades` (check the hero phone still fits).
