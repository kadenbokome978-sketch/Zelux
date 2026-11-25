---
name: case-study-builder
description: Turn Zelux project notes into an honest case study (work.json entry, /work card and optional full write-up) with permission checks and before/after workflow. Use when adding or updating portfolio work, or when asked to write up a project.
---

# Case study builder

Proof is the thing the site is shortest on, so every real project should become a case study. But only with permission, and only with real numbers.

## Permission gate (check first, every time)

| Project | Rule |
|---|---|
| KrapMaps | Always "co-founded with Harley Treagust". Never a Zelux client. OK to show. |
| James Green Sports | Only after launch (~Dec 2026) and once contract Clause 8.4 applies, unless he opts out in writing. Until then: the "Sports coaching platform" placeholder. |
| Forge (forgeweldinguk.com) | Approved in writing by Dean (confirmed 25 Nov 2026). Live on the homepage and /work with real screenshots. No results claimed until Dean shares real numbers. |
| Anyone else | Ask Kaden whether written permission exists. If not, anonymise ("a Hampshire roofing firm") and say so. |

## Structure

1. **Client context:** who they are, in one line.
2. **The friction:** what was costing them time or work, in their words if possible.
3. **Constraints:** budget, deadline, tools they already had, what couldn't change.
4. **What was built:** the site and the automations, concretely (pages, booking, which tools connected).
5. **Before / after workflow:** reuse the LeadFlow pattern: 4–5 steps each side.
6. **Result:** measured numbers only (enquiries per month, response time, hours saved, launch time vs the 7-day guarantee). Source each number (analytics, CRM, client's own count). If there's no number yet, say "Results to follow" rather than estimating.
7. **Evidence:** real screenshots (1600×1000 WebP in `public/work/`), optional client quote **with written permission**.
8. **What I'd do differently:** one honest line. It builds trust.

## Where it goes

- `src/content/work.json`: set `title`, `sector`, `status`, `friction`, `built`, `outcome`, `isPlaceholder: false`, `href`, `image: "/work/<slug>-desktop.webp"` and `imageMobile`. Live work appears in the homepage ProjectCarousel and as a full brand-tinted section on /portfolio (add its colours to the tint map in both).
- Full write-ups (when there are 2+ real projects): a page per project at `/work/<slug>` using conversion-page-builder's case study template.

## Concept builds

Until there's permitted client work, `ConceptPhone` shows fictional example sites (plumber, groomer, bakery). Rules: obviously made-up names, captioned "Concept: … · not a client", no ratings, review counts, testimonials or results, and replace them with real screenshots as soon as real work can be shown.

## Rules

- No invented metrics, logos or quotes. No "up to" numbers.
- Screenshots must be of the real live site, cropped, no client personal data visible.
- Follow brand-voice (no "AI", no em dashes).
- Run accessibility-quality-check before pushing.
