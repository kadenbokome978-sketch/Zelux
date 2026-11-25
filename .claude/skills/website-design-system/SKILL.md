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
| | `surface` / `surface-hover` | #EEF2F7 / #E5EAF2 | Panels, alt sections (`bg-surface`) |
| | `paper` / `on-accent` | #FCFDFF / #F8FAFC | Cards and fields on canvas (`bg-paper`); text on accent (`text-on-accent`). Never pure `#fff`/`#000`: neutrals are tinted toward the navy hue |
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

- Display: **Funnel Display Variable** (`--font-serif` / `.font-serif`) for headings only: `.h-hero`, `.h-statement`, `.h-section`, `.svc-title`, `.step-num`. Used with restraint; it carries the personality.
- Body: Geist Variable. Labels/metadata: Geist Mono Variable (`.eyebrow`).
- Both latin files are preloaded in `Base.astro`. If you change a face, update the preload.
- Scale classes: `.h-hero` (hero only), `.h-statement` (dark-band statements, closing), `.h-section` (section titles), `.lead`, `.body`.
- Headings: weight 500, tight tracking (already in classes). Accent words are coloured, never italic (`h2 em { font-style: normal }`).
- Kaden dislikes oversized type: don't go above the current clamp maxima. The hero must sit on 3 lines max at 1440px.
- Steps in the type scale differ by at least 1.25×; body line length 60–75ch desktop, 35–60ch mobile.

## Layout

- Container: `.container-z` (max 1160px, 20px/32px gutters).
- Section rhythm is deliberately uneven (identical padding everywhere reads as a template): statement band `py-16 md:py-28`, detector `py-14 md:py-20`, standard `py-16 md:py-24`. Separate sections with `border-t border-hairline` or a band change, not both.
- 12-column grid on `lg`. Prefer asymmetric splits (5/7, 4/8, 7/5) over three equal cards. Three equal cards appear once on the homepage (value section); don't add another.
- Radii: `rounded-[2px]` everywhere except pills/chips (`rounded-full`). No shadows except the small focus/dot ring already used.
- Index numbers (`01`, `02`) only for real sequences (steps, lead flow, blueprint steps) or lists people refer to by number (the ten automations). Services are not a sequence: no numbers.
- Eyebrow labels only when they add information the heading doesn't (location, "Try it", "How it works" above a clever heading). Never an eyebrow that restates the heading ("Work" above "Real projects").
- Cards only when they're the best affordance. Never nested cards, never more than one identical card grid per page.
- Spend boldness in one place per page (homepage: the Detector). Keep everything around it quiet.

## Components (reuse before inventing)

React Bits islands in `src/components/react-bits/` (`ScrollReveal`, `SpotlightCard`, `Magnet`: see motion-and-interaction), `.btn-primary` (+ `.btn-lg`), `.btn-ghost`, `.link-u`, `.panel`, `.field`, `.field-error`, `.chip` (Detector), `.svc-row/.svc-title/.svc-arrow`, `.step-num`, `.band-deep`, `LeadFlow`, `Detector`, `WorkShowcase`, `ConceptPhone` (HTML/CSS phone mockups of made-up example sites; each has its own palette and must stay captioned "Concept … not a client"), `CaseCard`, `Faq`, `ClosingBand`, `SectionHead`.

All copy lives in `src/content/*.json`. Components read from there; don't hardcode copy in markup.

## Do not use

- Side-stripe accent borders (`border-left` > 1px as decoration), gradient text, glassmorphism on scrolling content, the big-number hero-metric template, modals as a first resort.
- AI-default looks (from Anthropic's frontend-design skill): warm cream + serif + terracotta; near-black + one acid/vermilion accent; broadsheet hairline newspaper columns. Note: navy + blue for a tech studio is itself a category reflex. Kaden chose it, so keep it, but make the type, layout and Detector do the distinguishing.

- Purple/cyan gradients, glows, glassmorphism, 3D blobs/orbs, neural-network meshes, robot imagery, stock photos of people at laptops.
- Drop shadows, rounded-2xl SaaS cards, emoji icons.
- Marquees / auto-scrolling text (removed at Kaden's request).
- Fake dashboards, fake logos, fake testimonials, invented stats.
- The word "AI" anywhere (copy, alt text, meta, schema, images).
- Em dashes in visible text.

## Before you finish

Run `npm run build && npm run check` and look at a screenshot at 390px and 1440px.
