# Zelux website

Marketing site for Zelux (zelux.co.uk): Kaden Ekuma Bokome's web + business systems studio. UK sole trader, Hampshire, not VAT registered. Contact kaden@zelux.co.uk.

Astro 7 (static) + Tailwind CSS 4 + TypeScript, with React islands (`@astrojs/react`) for React Bits components, GSAP + ScrollTrigger for scroll animation and Lenis for desktop smooth scrolling (see the motion-and-interaction skill). All copy lives in `src/content/*.json`. Tokens and component classes live in `src/styles/global.css`.

## Workflow

- **Push straight to `main`.** Kaden wants every change live: `main` auto-deploys to zelux.co.uk on Vercel. Before every push: `npm run build && npm run check` must pass (see the accessibility-quality-check skill). Also keep the session branch in sync if one is in use.
- After pushing, confirm the Vercel production deployment reaches READY.
- Show Kaden a screenshot of visual changes.

## Skills (use them)

| Task | Skill |
|---|---|
| Any layout, styling or component work | `website-design-system` |
| Any visible text, meta, alt text | `brand-voice` |
| New page or section, or "why isn't this converting" | `conversion-page-builder` |
| Animation, toggles, interactive pieces | `motion-and-interaction` |
| Before every push / audits | `accessibility-quality-check` |
| Portfolio and case studies | `case-study-builder` |

## Non-negotiables

- Never mention "AI" anywhere on the site (copy, meta, schema, alt text, images). `npm run check` enforces it.
- No em dashes in visible text. Plain UK English.
- No fabricated proof: no fake clients, logos, stats, testimonials or savings figures.
- KrapMaps is "co-founded with Harley Treagust", never a client. James Green Sports only after launch + Clause 8.4. Forge only with Dean's written approval.
- New commitments (prices, guarantees, response times) need Kaden's OK. Current ones are listed in the brand-voice skill.
- Keep pages compact. Kaden dislikes long scrolly pages, oversized type and marquees.
- Progressive enhancement: everything readable and usable without JS; respect reduced motion.

## Commands

```bash
npm install
npm run dev      # localhost:4321
npm run build    # dist/
npm run check    # after build; CHROME_PATH=... if Playwright's browser isn't installed
```

## Research behind the decisions

In the NEXUS Brain vault (`kadenbokome978-sketch/nexus-brain-mirror`), `NEXUS Brain/02 Domains/AI Consultancy/06 Documents/`: Zelux Website Build Brief, Website Quality Standard, AI Tells, Standing Out as a Web + Automation Studio.
