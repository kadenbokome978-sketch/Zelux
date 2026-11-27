// Site checks: run after `npm run build`. Usage: npm run check
// Serves dist/ locally, then for every page checks:
//   - axe WCAG 2.2 AA (phone and desktop width)
//   - no horizontal scroll at any width from 320px to 1920px
//   - with JavaScript off: no hidden content, FAQ answers readable, menu fallback shown
//   - phones: every homepage section fits one screen (iPhone 13 and SE sizes)
//   - search basics: title and description length, one H1, canonical, valid schema
//   - copy rules: no "AI", no em dashes in visible text
// Exits non-zero on any failure.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join } from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const DIST = new URL('../dist/', import.meta.url).pathname;
const PAGES = ['/', '/services', '/portfolio', '/book', '/privacy', '/cookies', '/404', '/automations/automated-invoicing-and-payments', '/automations/inventory-alerts'];
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };

const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path === '/') path = '/index';
  let file = join(DIST, path);
  if (!extname(file)) file += '.html';
  if (!existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
  res.end(await readFile(file));
}).listen(0);
const base = `http://localhost:${server.address().port}`;

const failures = [];
const fail = (msg) => { failures.push(msg); console.log(`  FAIL ${msg}`); };
// CHROME_PATH lets you point at an existing Chrome/Chromium instead of running `npx playwright install chromium`.
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});

for (const vp of [{ width: 390, height: 844 }, { width: 1280, height: 900 }]) {
  const page = await browser.newPage({ viewport: vp, reducedMotion: 'reduce' });
  for (const p of PAGES) {
    await page.goto(base + p);
    await page.addScriptTag({ content: axeSource });
    const { violations } = await page.evaluate(() => window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }));
    for (const v of violations) fail(`${p} @${vp.width}px axe ${v.id} (${v.nodes.length}): ${v.help}`);
    if (vp.width < 500 && await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) fail(`${p} scrolls sideways at ${vp.width}px`);
    // Content poking past the screen edge, even where the page clips it (it still looks cut off)
    if (vp.width < 500) {
      const off = await page.evaluate(() => {
        const W = innerWidth, out = [];
        for (const e of document.querySelectorAll('body *')) {
          const r = e.getBoundingClientRect();
          if (!r.width || r.right <= W + 1 || e.closest('[aria-hidden="true"]')) continue;
          let a = e.parentElement, clipped = false;
          while (a && a !== document.body) { if (['hidden', 'clip', 'auto', 'scroll'].includes(getComputedStyle(a).overflowX) && a.getBoundingClientRect().right <= W + 1) { clipped = true; break; } a = a.parentElement; }
          if (!clipped) out.push(`${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]}`);
        }
        return [...new Set(out)].slice(0, 3);
      });
      if (off.length) fail(`${p} content past the screen edge at ${vp.width}px: ${off.join(', ')}`);
    }
    if (vp.width > 500) {
      const text = await page.evaluate(() => document.body.innerText + ' ' + document.title + ' ' + (document.querySelector('meta[name=description]')?.content || ''));
      if (/\bAI\b/.test(text)) fail(`${p} mentions "AI"`);
      if (text.includes('—')) fail(`${p} contains an em dash`);
    }
  }
  await page.close();
}

// Every device size: nothing may scroll sideways, from a small phone to a wide desktop
for (const width of [320, 360, 414, 600, 768, 834, 1024, 1280, 1920]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  for (const p of PAGES) {
    await page.goto(base + p);
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) fail(`${p} scrolls sideways at ${width}px`);
  }
  await page.close();
}

// Phones: every homepage section fits one screen (between the header and the tab bar)
for (const vp of [{ width: 390, height: 664 }, { width: 375, height: 568 }]) {
  const page = await browser.newPage({ viewport: vp, reducedMotion: 'reduce' });
  await page.goto(base + '/');
  for (const tab of ['overview', 'automate', 'services', 'work', 'about']) {
    await page.evaluate((t) => document.querySelector(`.mt-tab[data-go="${t}"]`)?.click(), tab);
    await page.waitForTimeout(150);
    const over = await page.evaluate(() => {
      const avail = innerHeight - 64 - (document.querySelector('.mt-bar')?.offsetHeight || 0);
      return [...document.querySelectorAll('[data-fit]')].filter((e) => e.getClientRects().length)
        .map((e) => [e.dataset.fit, Math.round(e.getBoundingClientRect().height), avail]).filter(([, h, a]) => h > a);
    });
    for (const [name, h, a] of over) fail(`/ section "${name}" is ${h}px, taller than a ${vp.width}x${vp.height} phone screen (${a}px)`);
  }
  await page.close();
}

// Search basics on every page (SEO Skills Standard): title, description, one H1, canonical, valid schema
{
  const page = await browser.newPage();
  for (const p of PAGES.filter((x) => x !== '/404')) {
    await page.goto(base + p);
    const seo = await page.evaluate(() => {
      const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { JSON.parse(s.textContent || ''); return true; } catch { return false; } });
      return {
        title: document.title, desc: document.querySelector('meta[name=description]')?.getAttribute('content') || '',
        h1: document.querySelectorAll('h1').length, canonical: !!document.querySelector('link[rel=canonical]'), ld,
      };
    });
    if (seo.title.length < 15 || seo.title.length > 60) fail(`${p} title is ${seo.title.length} characters (keep 15 to 60): "${seo.title}"`);
    if (seo.desc.length < 70 || seo.desc.length > 160) fail(`${p} meta description is ${seo.desc.length} characters (keep 70 to 160)`);
    if (seo.h1 !== 1) fail(`${p} has ${seo.h1} H1 headings (needs exactly 1)`);
    if (!seo.canonical) fail(`${p} has no canonical link`);
    if (!seo.ld.length || seo.ld.includes(false)) fail(`${p} structured data missing or invalid JSON`);
  }
  await page.close();
}

const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
const nojs = await ctx.newPage();
for (const p of PAGES) {
  await nojs.goto(base + p);
  const hidden = await nojs.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter((e) => getComputedStyle(e).opacity === '0').length);
  if (hidden) fail(`${p} no-JS: ${hidden} blocks invisible`);
  if (!(await nojs.isVisible('#menu-fallback'))) fail(`${p} no-JS: menu fallback not shown`);
}
await nojs.goto(base + '/');
if (await nojs.evaluate(() => { const a = document.querySelector('.faq-panel p'); return a && a.getBoundingClientRect().height === 0; })) fail('/ no-JS: FAQ answers hidden');
await ctx.close();

await browser.close();
server.close();
console.log(failures.length ? `\n${failures.length} check(s) failed` : `\nAll checks passed (${PAGES.length} pages)`);
process.exit(failures.length ? 1 : 0);
