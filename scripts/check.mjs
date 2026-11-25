// Site checks: run after `npm run build`. Usage: npm run check
// Serves dist/ locally, then for every page checks:
//   - axe WCAG 2.2 AA (phone and desktop width)
//   - no horizontal scroll at phone width
//   - with JavaScript off: no hidden content, FAQ answers readable, menu fallback shown
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
const PAGES = ['/', '/services', '/portfolio', '/book', '/privacy', '/cookies', '/404'];
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
    if (vp.width > 500) {
      const text = await page.evaluate(() => document.body.innerText + ' ' + document.title + ' ' + (document.querySelector('meta[name=description]')?.content || ''));
      if (/\bAI\b/.test(text)) fail(`${p} mentions "AI"`);
      if (text.includes('—')) fail(`${p} contains an em dash`);
    }
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
