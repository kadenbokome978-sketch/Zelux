---
name: brand-voice
description: How Zelux copy should sound, with banned words, claims rules and the facts that can be stated. Use whenever writing or editing any visible text on zelux.co.uk (headlines, service copy, FAQs, CTAs, meta descriptions, alt text) or outreach copy for Zelux.
---

# Zelux brand voice

**Who's talking:** Kaden Bokome, an independent web and systems builder in Hampshire, UK. First person ("I") in personal sections and FAQs, "Zelux" for the business.

**Who's listening:** UK small business owners, mostly trades, coaches and local service businesses. They're busy, sceptical of agencies, and care about time, money and getting work in.

## Positioning lines in use

- Hero: "Your website should win you work. Your admin should run itself."
- Tagline: "We design the front door. We automate the back office."
- Statement: "You speak to the person who builds it."

## Tone

- Plain UK English (organise, colour, enquiry, £). Short sentences. Concrete nouns.
- Direct and a bit dry. Confident, never salesy.
- Say how something works, not how great it is: "Unpaid after 7 days, a polite reminder follows" beats "Get paid faster".
- Vary rhythm. Not every item needs two sentences, not every list needs three points.

## Interface copy (from Anthropic's frontend-design skill)

- Buttons say exactly what happens ("Book a free 20-min call", "Send enquiry"), never "Submit" or "Learn more". Keep an action's name the same through the flow.
- Errors state the cause and the fix, in the site's voice, without apologising. Empty states invite the next action (the Detector's empty panel does this).
- No headings restated by an eyebrow or an intro. Every word earns its place.
- Name things by what the visitor recognises ("replying to enquiries"), not how the system is built ("webhook", "CRM sync").

## Hard rules

- Never write "AI", "artificial intelligence", "machine learning", "agent", "LLM" or "GPT" in public copy, meta or schema. Say "automation", "connected system", "drafted for you to approve".
- No em dashes (—). Use full stops, commas or colons. En dashes are fine in ranges (1–3).
- No fabricated proof: no invented clients, logos, stats, testimonials or savings figures. Example timings must be labelled illustrative.
- KrapMaps is always "co-founded with Harley Treagust", never a Zelux client.
- James Green Sports: not named until launch (~Dec 2026) and contract Clause 8.4 applies, unless he opts out in writing.
- Forge (forgeweldinguk.com): Dean approved it in writing (confirmed by Kaden, 25 Nov 2026). Shown by name with real screenshots. Describe only what the live site shows; no invented results.

## Banned words and phrases

seamless, elevate, unlock, robust, cutting-edge, game-changing, innovative, leverage, empower, streamline, supercharge, effortless, next level, transform, solutions, journey, world-class, tailored, bespoke solutions, "in today's fast-paced…", "that convert", "slips through the cracks", "peace of mind", "win you more business", "happier customers", smart (as an adjective for software), "it's important to note".

## Facts you can state (keep in sync with src/content/site.json)

- Fixed written quote within 48 hours of a 20-minute call. The call is free.
- **7-day guarantee:** sites up to 5 pages go live within 7 days, or £100 off the final invoice. The clock starts once the quote is accepted and copy, photos and logins are in, and pauses while a design waits on client feedback. Bigger sites and shops get a fixed date in the quote.
- Not VAT registered: the quoted price is the total price.
- Fixed price, staged payments, no day rates.
- Client owns domain, code and accounts. Care plans are rolling monthly, 30 days' notice.
- Reply to enquiries usually within one working day.
- Contact: kaden@zelux.co.uk. Location: Hampshire, UK (no street address).

Anything not on this list is a new commitment. Ask Kaden before publishing it.

## Self-check before publishing copy

1. Could only Zelux have written this? If a competitor could paste it onto their site, rewrite it.
2. Is there a concrete detail (number, step, tool, time) in every claim?
3. Run the banned-word grep: `grep -rniE "seamless|elevate|unlock|robust|cutting.edge|innovative|leverage|empower|streamline|smart |supercharge|effortless|transform|solutions|journey" src/content`.
4. `npm run check` fails on "AI" and em dashes.

## Persuasion (from the Persuasive Copywriting Standard, NEXUS Brain, 27 Nov 2026)

Kaden's standing rule for all NEXUS writing. Copy removes doubt, makes the next step easy and gives a reason to act now, **with real proof only**.

**On every page, check for:**
1. **Problem first**: name the costly frustration before the service ("admin eating your evenings", "the first business to reply gets the job").
2. **Outcome, not tool**: "every enquiry gets a reply within minutes", not "CRM integration".
3. **Loss framing, gently**: inaction as a continuing cost ("another week of leads going cold"), never fear or hype.
4. **A tiny first step** next to the big ask: try it, pick a job, see it with your business, then the free 20-minute call.
5. **One primary action per screen**; secondary links quieter.
6. **Risk reversal beside the CTA**: fixed price in writing, no obligation, £100-off guarantee, you approve before anything goes live, every account in your name.
7. **Objections answered before they're asked**: who I work with, cost, tools, timing, ownership, VAT, after launch (FAQ covers these).
8. **Concrete over vague**: "the copy-paste steps between your form and your inbox", not "efficiency".
9. **Customer words**: use phrases clients actually say (calls, emails, reviews). Save them in the brain as they come in.
10. **"Because"**: give the reason ("a fixed price, because it's scoped on the call first").

**Proof that exists today (use only these):** Forge (live client, Dean approved), KrapMaps (co-founded with Harley Treagust), fixed quote within 48 hours, live in 7 days or £100 off (sites up to 5 pages), no VAT, staged payments, rolling care with 30 days' notice, direct with Kaden. No client counts, results figures, testimonials, review stars, capacity limits or countdowns until they're real and Kaden approves them.

**Never:** fake scarcity or timers, invented stats or testimonials, "10x" claims, generic agency words (streamline, seamless, leverage, solutions, unlock, elevate, cutting-edge, empower), more than one competing CTA at the point of decision, long forms before value.
