---
name: seo-standard
description: Zelux SEO standard (Kaden's standing rule for every NEXUS site). Use when adding or changing any page, title, meta description, schema, URL or internal link on zelux.co.uk or a client site, or when asked for an SEO audit.
---

# SEO standard

Every site NEXUS builds follows this. Based on AgriciDaniel/claude-seo and Illyism/seo-skills (read, not installed), filtered for a small local service business, and Google's own guidance where the two disagree.

## Order of work: fatal first, fluff never (seo-roast)

1. **Fatal**: anything that blocks crawling, indexing or rendering of a money page (robots.txt, noindex, broken canonical, JS-only content, 4xx/5xx). Fix before anything else.
2. **Revenue**: page indexes but can't rank or convert (title without the search phrase, no local intent, thin service page, weak internal links). Fix if under an hour.
3. **Compounding**: schema, AI visibility, authority, Google Business Profile, reviews. Roadmap.
4. **Fluff**: alt wording, a few characters of meta length. Last.

## Every page

- **Title**: 15–60 characters, the page's one search phrase first, place name for local pages, ends `| Zelux`. Unique.
- **Meta description**: 70–160 characters, written by hand, a complete sentence (never cut mid-sentence), says what you get. Not a repeat of the title.
- **One H1** that matches the page's intent; H2–H3 in order.
- Self-referencing **canonical**, Open Graph title/description/image/url.
- Images: alt naming the subject, width/height set, WebP, first image not lazy.
- Content readable without JS (the phone tabs only hide with CSS; everything is in the HTML).

`npm run check` enforces title and description length, one H1, canonical and valid JSON-LD.

## Site-wide

- robots.txt default-allow with the sitemap; never block CSS/JS. AI search crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Bingbot) stay allowed: blocking them removes the site from those answers.
- Sitemap lists every indexable page; 404 and thank-you pages excluded.
- One canonical host (www → apex 308); moved URLs get a 308 (e.g. /work → /portfolio).
- HTTPS, HSTS and security headers (vercel.json).

## Schema (JSON-LD, in Base.astro)

- Site-wide: `ProfessionalService` (areaServed Hampshire + UK, no street address: service-area business), `Person` (founder), `WebSite`.
- Services page: one `Service` per service. Automation pages: `Service` + `BreadcrumbList`.
- Pass extra nodes with the `schema` prop on `<Base>`.
- **Never** add `aggregateRating`/`Review` without real, permitted reviews. No HowTo. FAQ rich results are retired: keep FAQ content for people, don't rely on FAQPage.

## Local SEO (service-area business)

- Titles and H1s carry service + place where it reads naturally ("in Hampshire").
- One dedicated page per core service (done: /services sections + 10 automation pages).
- NAP consistent: name and email everywhere; no address shown (SAB). Add a phone only if Kaden wants one public.
- Google Business Profile is the biggest local lever: primary category "Website designer", service area Hampshire, link the GBP to the homepage. Reviews: ask every client, never gate.

## AI search (GEO)

Google: optimising for AI search is still SEO. So: clear one-paragraph answers near the top of service pages, plain "Zelux is…" definitions, real facts (48-hour quote, 7-day guarantee), question-style FAQ headings, brand mentions off-site (LinkedIn, YouTube, Reddit). No llms.txt or "AI chunking" tricks (Google says they don't help).

## Not used

Paid data tools (Ahrefs, DataForSEO, SE Ranking): only if Kaden agrees to the cost. Free stand-ins: Google Search Console, Bing Webmaster Tools, PageSpeed Insights.

## Installed tools (27 Nov 2026)

The free parts of both repos are now installed in this project, reviewed first:

- `.claude/seo-kit/`: scripts, schema templates and JSON-LD validator from AgriciDaniel/claude-seo v2.6.3 (MIT, see its README). First run on a machine: `.claude/seo-kit/scripts/claude-seo setup`.
- Skills in `.claude/skills/`: `seo`, `seo-audit`, `seo-technical`, `seo-local`, `seo-geo`, `seo-schema`, `seo-page`, `seo-sitemap`, `seo-images`, `seo-content`, `seo-plan`, `seo-agentic`, `seo-sxo`, `seo-drift`, `seo-ecommerce`, plus Illyism's `seo-title-optimization`, `seo-roast`, `blitz-seo`. Agents in `.claude/agents/seo-*.md`. Paid-data skills were left out.

The fetchers refuse localhost, so check the build from the project root after `npm run build`:

```bash
.claude/seo-kit/scripts/claude-seo run page_checks.py --file dist/services.html --base-url https://zelux.co.uk/services --json
.claude/seo-kit/.venv/bin/python .claude/seo-kit/hooks/validate-schema.py dist/services.html
```

Baseline (27 Nov 2026): services, portfolio and all 10 automation pages 0 findings out of 45 checks; JSON-LD valid on every page. Expected, not bugs: `noindex` on /404; `thin-content` on /book and /cookies; `first-image-lazy-loaded` on the homepage (the Forge screenshot sits below the first screen, so lazy is right); `title-too-short` on /privacy and /cookies (allowed by the 15-60 rule above). Once a change is live, the URL-based skills (`seo-audit https://zelux.co.uk`, `seo-local`, `seo-geo`, `seo-agentic`) can run against the real site.
