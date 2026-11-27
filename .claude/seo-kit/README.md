# SEO kit (vendored)

Scripts, schema templates and the JSON-LD validator hook from [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) v2.6.3, commit `5d7d85ef32ade08dd4265cb678af8357ca6e6098`, MIT licence (see LICENSE). Reviewed 27 Nov 2026 before copying.

The matching free skills live in `.claude/skills/seo*` and agents in `.claude/agents/seo-*.md`, with `${CLAUDE_PLUGIN_ROOT}` rewritten to `.claude/seo-kit` so they load as project skills (the upstream plugin name is reserved and will not install). Not included: the paid-data skills and extensions (DataForSEO, Google APIs, Bing, Moz, Maps, PostHog, Shopify, Firecrawl and others).

Also vendored, from [Illyism/seo-skills](https://github.com/Illyism/seo-skills) commit `543ec5d` (MIT): `seo-title-optimization`, `seo-roast`, `blitz-seo`.

First run on a machine: `.claude/seo-kit/scripts/claude-seo setup` (creates a git-ignored `.venv` here). Then run tools from the project root with `.claude/seo-kit/scripts/claude-seo run <script.py> ...`.

To update: re-clone upstream, review the diff, copy the same folders back and re-apply the path rewrite.
