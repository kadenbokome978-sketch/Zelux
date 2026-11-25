---
name: conversion-page-builder
description: Structure and checklist for Zelux pages that need to turn visitors into enquiries (homepage sections, service pages, landing pages, offer pages). Use when creating a new page or section, or reviewing why a page isn't converting.
---

# Conversion page builder

Every page has one job: get the right visitor to book the free 20-minute call (`/book`) or send an enquiry. Use brand-voice for words and website-design-system for layout.

## Required sections (in this order, skip only with a reason)

1. **Promise:** one specific sentence about the outcome, in the buyer's words. Primary CTA right under it.
2. **Problem:** the expensive, repetitive thing they deal with now (e.g. the LeadFlow "Before" view).
3. **Demonstration:** show it working: Detector, LeadFlow, a real screenshot, a before/after. Not a paragraph.
4. **What you get:** services or scope in business language, with what's included and what isn't.
5. **Proof:** real work only (WorkShowcase / CaseCard), honest placeholders if there's none yet.
6. **Risk reversal:** 7-day guarantee, fixed price, no VAT, you own everything, no lock-in.
7. **Process:** the four steps with timings (Day 1 call, quote in 48 hours, live within 7 days, handover).
8. **Objections:** FAQ in plain answers.
9. **Next step:** ClosingBand with the CTA.

## Rules

- One primary CTA style per screen (`btn-primary`). Secondary actions are `btn-ghost` links.
- Above the fold on a 390px phone: the promise, the CTA and at least one speed/risk point must be visible.
- Every claim is specific (time, step, tool, price) or it goes.
- Map each selling point to save time / save money / make money. If it fits none, cut it.
- CTA labels say what happens: "Book a free 20-min call", "Book a free teardown". Not "Get started", "Learn more", "Submit".
- Pages stay compact: Kaden doesn't want long scrolly pages. Each new section must replace or earn its space.
- Deep links: use `/book?need=...#enquiry` to prefill the enquiry message where the page knows what the visitor wants.

## Page templates

- **Service page:** promise, who it's for (`bestFor`), included / not included, timeline, related automations, FAQ, CTA.
- **Landing page (one offer):** promise + guarantee in hero, demonstration, 3 points (time/money/work), process, FAQ (5 max), CTA. No main nav distractions beyond logo + CTA.
- **Case study:** see case-study-builder.

## Review checklist

- [ ] Promise is specific and in plain UK English
- [ ] CTA visible without scrolling on mobile
- [ ] Something is shown working, not just described
- [ ] Guarantee / risk reversal present where a price or timeline is discussed
- [ ] No unverifiable claims, no "AI", no em dashes
- [ ] Section count didn't grow without removing something
