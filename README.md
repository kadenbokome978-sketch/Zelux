# Zelux — zelux.co.uk

Production site for Zelux, websites and business systems by Kaden Ekuma Bokome.
Built from the NEXUS Brain brief `Zelux Website Build Brief.md` (25 Nov 2026).

**Stack:** Astro 7 (static) · Tailwind CSS 4 (Vite plugin) · TypeScript · self-hosted fonts (Instrument Serif, Inter, JetBrains Mono). Ships almost no JavaScript: just the mobile menu, FAQ, scroll reveals, and the Cal.com + form script on `/book`.

## Edit copy (works from an iPad on github.com)

All words live in `src/content/`:

| File | What's in it |
|---|---|
| `site.json` | Hero, pillars, steps, about, pricing, closing band, email, Cal link |
| `services.json` | The 3 services: summary, best-if, included / not included, timeline |
| `work.json` | Case cards. Set `isPlaceholder: false` and fill fields once a client approves |
| `faqs.json` | FAQ questions and answers |

Edit, commit to `main`, and Vercel rebuilds in about 20 seconds.

**Pricing:** `site.json → pricing.mode` is `"fixed-quote"`. Change it to `"guide"` to show "Websites from £900".

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Name | Example | Notes |
|---|---|---|
| `PUBLIC_WEB3FORMS_KEY` | `xxxxxxxx-xxxx-...` | Free at web3forms.com, bound to kaden@zelux.co.uk. Restrict the domain to zelux.co.uk. Until it's set, the form tells people to email instead. |
| `PUBLIC_CAL_LINK` | `kaden/20min` | Your Cal.com username/event slug. Falls back to `site.json → calLink`. |

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
npm run check    # after build: accessibility (WCAG 2.2 AA), no-JS, mobile overflow, copy rules
                 # first time: npx playwright install chromium (or set CHROME_PATH)
```

## Deploy

1. Push this folder to a private repo `kadenbokome978-sketch/zelux-website`.
2. Vercel → Add New → Project → import the repo (framework auto-detects Astro). Add the env vars. Deploy.
3. Vercel → Domains: add `zelux.co.uk` and `www.zelux.co.uk` (`vercel.json` already redirects www → apex).
4. Cloudflare DNS: add the `A @` and `CNAME www` records Vercel shows, **grey cloud (DNS only)**. Add `TXT _dmarc  v=DMARC1; p=none; rua=mailto:kaden@zelux.co.uk`.
   **Do not touch the Zoho MX, SPF, verification or DKIM records.**
5. Test: padlock on zelux.co.uk, www redirects, a test booking, a test form submission, and a two-way email from kaden@zelux.co.uk.

## Before you swap placeholders for real work

- James Green Sports: only after launch and once Clause 8.4 applies (and he hasn't opted out in writing).
- Forge: only with Dean's written approval.
- KrapMaps stays labelled as co-founded work, never as a client project.
- Portrait: replace the "K." monogram block in `src/pages/index.astro` (About section) with a monochrome photo.
