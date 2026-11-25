---
name: website-design-system
description: Zelux visual system (colours, type, spacing, components, layout rules and the "do not use" list). Use whenever building, restyling or reviewing any page, section or component on zelux.co.uk so it matches the site instead of looking like a generic template.
---

# Zelux design system

Source of truth is `src/styles/global.css` (`@theme` tokens + component classes). Never hardcode a hex that already exists as a token. If a new colour is genuinely needed, add a token and check contrast (see accessibility-quality-check).

## Palette: 60 / 30 / 10

| Role | Token | Hex | Use |
|---|---|---|---|
| 60% base | `canvas` | #F8FAFC | Page background |
| | `surface` / `surface-hover` | #EEF2F7 / #E5EAF2 | Panels, alt sections (`bg-surface`), cards on canvas use `bg-white` |
| | `hairline` / `hairline-strong` | #DDE3EB / #8792A3 | Dividers / form borders, outline buttons (3:1) |
| 30% supporting | `ink` / `ink-2` / `ink-3` | #0F172A / #475569 / #5B677A | Text: headings / body / labels |
| | `deep` (+ `deep-2`, `deep-line`, `deep-ink`, `deep-ink-2`) | #0F172A … | The dark bands (`.band-deep`) |
| 10% accent | `accent` / `accent-hover` / `accent-tint` | #2563EB / #1D4ED8 / #E3EBFD | Primary buttons, links, headline accent words, selected states ONLY |
| | `accent-on-deep` | #6EA0FF | Accent inside `.band-deep` |

Rules:
- The accent is scarce. One accent headline phrase per section (`<em class="text-accent">`), one primary button per view. Never use accent as a section background.
- Dark bands (`.band-deep`) max three on the homepage. Don't stack two dark bands back to back.
- Status colours: success #15803d (`live`), error #B3261E. Don't introduce others.

## Type

- One family: Geist Variable (headings + body), Geist Mono Variable for small uppercase labels (`.eyebrow`, metadata).
- Scale classes: `.h-hero` (hero only), `.h-statement` (dark-band statements, closing), `.h-section` (section titles), `.lead`, `.body`.
- Headings: weight 500, tight tracking (already in classes). Accent words are coloured, never italic (`h2 em { font-style: normal }`).
- Kaden dislikes oversized type: don't go above the current clamp maxima.

## Layout

- Container: `.container-z` (max 1160px, 20px/32px gutters).
- Section rhythm: `py-16 md:py-24`; tighter sections `py-12 md:py-16`. Separate sections with `border-t border-hairline` or a band change, not both.
- 12-column grid on `lg`. Prefer asymmetric splits (5/7, 4/8, 7/5) over three equal cards. Three equal cards appear once on the homepage (value section); don't add another.
- Radii: `rounded-[2px]` everywhere except pills/chips (`rounded-full`). No shadows except the small focus/dot ring already used.
- Index numbers (`01`, `02`) only for real sequences or lists people refer to by number. Not decoration.

## Components (reuse before inventing)

React Bits islands in `src/components/react-bits/` (`ScrollReveal`, `SpotlightCard`, `Magnet`: see motion-and-interaction), `.btn-primary` (+ `.btn-lg`), `.btn-ghost`, `.link-u`, `.panel`, `.field`, `.field-error`, `.chip` (Detector), `.svc-row/.svc-title/.svc-arrow`, `.step-num`, `.band-deep`, `LeadFlow`, `Detector`, `WorkShowcase`, `CaseCard`, `Faq`, `ClosingBand`, `SectionHead`.

All copy lives in `src/content/*.json`. Components read from there; don't hardcode copy in markup.

## Do not use

- Purple/cyan gradients, glows, glassmorphism, 3D blobs/orbs, neural-network meshes, robot imagery, stock photos of people at laptops.
- Drop shadows, rounded-2xl SaaS cards, emoji icons.
- Marquees / auto-scrolling text (removed at Kaden's request).
- Fake dashboards, fake logos, fake testimonials, invented stats.
- The word "AI" anywhere (copy, alt text, meta, schema, images).
- Em dashes in visible text.

## Before you finish

Run `npm run build && npm run check` and look at a screenshot at 390px and 1440px.
