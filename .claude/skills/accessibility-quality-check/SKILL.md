---
name: accessibility-quality-check
description: Zelux definition of done. Accessibility (WCAG 2.2 AA), responsive, performance, SEO and copy-rule checks to run before every push to main (main auto-deploys to zelux.co.uk). Use before deploying, after any visual change, or when asked to audit the site.
---

# Quality check (definition of done)

Pushing to `main` publishes to zelux.co.uk within a minute, so this runs before every push.

## 1. Automated (must pass)

```bash
npm run build
npm run check          # CHROME_PATH=/path/to/chromium if Playwright's browser isn't installed
```

`npm run check` covers: axe WCAG 2.2 AA at 390px and 1280px on every page, sideways scroll at 390px, no-JS rendering (no hidden reveal blocks, menu fallback, FAQ readable), no "AI", no em dashes. CI runs the same on every push (`.github/workflows/quality.yml`) plus Lighthouse.

## 2. Lighthouse (mobile)

Run on `/`, `/services`, `/book` against `npm run preview` or the deployed URL. Targets: Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO 100. LCP < 1.5s, CLS < 0.05, TBT < 100ms. (Book page Best Practices can dip only from the Cal.com embed being blocked in sandboxes.)

## 3. Manual checks for anything new

- **Contrast:** body text ≥ 4.5:1, large text and UI borders/focus ≥ 3:1. Compute it, don't eyeball it, for any new colour pair (on canvas, surface, white, and deep).
- **Keyboard:** Tab through the new part. Visible focus on everything, logical order, Escape closes things, nothing traps focus.
- **Screen reader semantics:** real headings in order (one h1), labelled controls, `aria-pressed`/`aria-expanded` kept in sync, live regions for dynamic results.
- **Responsive:** screenshot at 360, 768, 1024, 1440. No overflow, tap targets ≥ 44px, text doesn't collide.
- **Reduced motion and no JS:** emulate both; the section must still make sense.
- **Console:** no errors (except blocked third-party embeds in sandboxes).

## 4. SEO

Unique `<title>` and meta description per page (via `Base.astro` props), one h1, descriptive link text, images with `alt` and width/height, canonical correct, new pages appear in the sitemap. Share image is `public/og-image.png` (1200×630).

## 5. Report

List what ran and the results. If something failed or was skipped, say so plainly. Don't push with a failing check.
