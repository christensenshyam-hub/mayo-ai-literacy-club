// Link and asset check for the local preview, in the same headless-Chrome-
// over-CDP style as shoot.mjs. It crawls every page of the site as a browser
// renders it (so links built by page scripts from the JSON count too) and
// reports:
//   broken     an internal href whose page doesn't load (status >= 400; a path
//              that only Netlify's _redirects handles is followed through
//              mayo-site/_redirects)
//   anchor     an internal #fragment with no element of that id on the
//              rendered target page
//   asset      an image, srcset candidate, icon, stylesheet or script that
//              doesn't load, or that comes from another host
//   request    any request the page makes to another host besides Google
//              Fonts (CSP: self-host every image, no external scripts or
//              fetches), and any failed or >= 400 request
//   noopener   an external link without rel="noopener"
//   console    a console error or an uncaught exception
// usage: node tools/check-links.mjs [base]   (default http://127.0.0.1:8150)
// exits 1 if anything is found, 0 if clean.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, readFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = (process.argv[2] || 'http://127.0.0.1:8150').replace(/\/$/, '');
const ORIGIN = new URL(BASE).origin;
const SITE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'mayo-site');
const FONT_HOSTS = new Set(['fonts.googleapis.com', 'fonts.gstatic.com']);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9300 + Math.floor(Math.random() * 600);
const profile = mkdtempSync(path.join(os.tmpdir(), 'checklinks-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--disable-gpu', 'about:blank'],
{ stdio: 'ignore', detached: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Start pages: every page, plus every piece's reading page (from the JSON).
const posts = JSON.parse(readFileSync(path.join(SITE, 'blog-content.json'), 'utf8'));
const START = ['/', '/about', '/chapters', '/join', '/topics', '/events', '/blog', '/mercurius',
  '/blog-anthropic-pentagon.html', '/nope', '/blog-post', '/blog-post?id=no-such-piece']
  .concat(posts.map((p) => '/blog-post?id=' + encodeURIComponent(p.id)));
const EXPECT_404 = new Set(['/nope']);

// _redirects: "from to [status]" (comments and blank lines skipped).
const redirects = new Map();
try {
  for (const line of readFileSync(path.join(SITE, '_redirects'), 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const [from, to] = t.split(/\s+/);
    if (from && to) redirects.set(from, to);
  }
} catch { /* no _redirects */ }

async function pageSocket() {
  for (let i = 0; i < 100; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch { /* not up yet */ }
    await sleep(150);
  }
  throw new Error('Chrome did not start');
}

let ws;
let nextId = 1;
const pending = new Map();
const listeners = [];
const handlers = {};
function send(method, params = {}) {
  const id = nextId++;
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}
function once(method, timeoutMs = 15000) {
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve(null), timeoutMs);
    listeners.push({ method, fn: (p) => { clearTimeout(t); resolve(p); } });
  });
}

// Runs in the page after it has rendered: links, ids and assets.
const PROBE = `(() => {
  const abs = (u) => { try { return new URL(u, location.href).href; } catch (e) { return u; } };
  const cands = (s) => (s || '').split(',').map((c) => c.trim().split(/\\s+/)[0]).filter(Boolean).map(abs);
  const assets = [];
  document.querySelectorAll('img').forEach((i) => { if (i.getAttribute('src')) assets.push(abs(i.getAttribute('src'))); assets.push(...cands(i.getAttribute('srcset'))); });
  document.querySelectorAll('source').forEach((s) => assets.push(...cands(s.getAttribute('srcset'))));
  document.querySelectorAll('link[href]').forEach((l) => { if (/icon|stylesheet|manifest/.test(l.rel)) assets.push(abs(l.getAttribute('href'))); });
  document.querySelectorAll('script[src]').forEach((s) => assets.push(abs(s.getAttribute('src'))));
  document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach((m) => assets.push(m.content.replace('https://mayoailiteracy.com', location.origin)));
  const links = [...document.querySelectorAll('a[href], area[href]')].map((a) => ({
    href: a.getAttribute('href'), abs: abs(a.getAttribute('href')), rel: a.getAttribute('rel') || '',
    target: a.getAttribute('target') || '', text: (a.textContent || '').trim().slice(0, 50)
  }));
  const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
  const names = [...document.querySelectorAll('a[name]')].map((e) => e.getAttribute('name'));
  return JSON.stringify({ assets, links, ids: ids.concat(names), title: document.title });
})()`;

const problems = [];
const report = (kind, where, what) => problems.push(`${kind.padEnd(9)} ${where}: ${what}`);

function key(u) { const x = new URL(u); return x.pathname + x.search; }

async function visit(rel) {
  const url = BASE + rel;
  const reqs = new Map();
  const errors = [];
  handlers['Network.requestWillBeSent'] = (p) => reqs.set(p.requestId, { url: p.request.url, type: p.type });
  handlers['Network.responseReceived'] = (p) => { const r = reqs.get(p.requestId); if (r) r.status = p.response.status; };
  handlers['Network.loadingFailed'] = (p) => { const r = reqs.get(p.requestId); if (r && !p.canceled) r.failed = p.errorText; };
  handlers['Runtime.exceptionThrown'] = (p) => errors.push(p.exceptionDetails.exception?.description || p.exceptionDetails.text);
  handlers['Runtime.consoleAPICalled'] = (p) => { if (p.type === 'error') errors.push(p.args.map((a) => a.value ?? a.description).join(' ')); };
  handlers['Log.entryAdded'] = (p) => { if (p.entry.level === 'error' && !(EXPECT_404.has(rel) && /404/.test(p.entry.text))) errors.push(p.entry.text + ' ' + (p.entry.url || '')); };
  const loaded = once('Page.loadEventFired');
  await send('Page.navigate', { url });
  await loaded;
  await send('Runtime.evaluate', { awaitPromise: true, expression: `(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
    scrollTo(0, 0); await new Promise(r => setTimeout(r, 800));
  })()` });
  const { result } = await send('Runtime.evaluate', { expression: PROBE, returnByValue: true });
  const data = JSON.parse(result.value);
  for (const r of reqs.values()) {
    const u = new URL(r.url);
    if (u.protocol === 'data:') continue;
    if (u.origin !== ORIGIN && !FONT_HOSTS.has(u.hostname)) report('request', rel, `${r.type} from another host: ${r.url}`);
    const isDoc = key(r.url) === rel && r.type === 'Document';
    if (r.failed) report('request', rel, `${r.type} failed (${r.failed}): ${r.url}`);
    else if (r.status >= 400 && !(isDoc && EXPECT_404.has(rel))) report('request', rel, `${r.type} ${r.status}: ${r.url}`);
  }
  for (const e of errors) report('console', rel, e);
  return data;
}

async function status(u) {
  const p = new URL(u).pathname;
  const res = await fetch(u, { redirect: 'manual' });
  if (res.status < 400) return res.status;
  if (redirects.has(p)) {
    const to = redirects.get(p);
    const target = to.startsWith('http') ? to : BASE + to;
    const r2 = await fetch(target.split('#')[0], { redirect: 'manual' });
    return r2.status < 400 ? `${r2.status} via _redirects -> ${to}` : r2.status;
  }
  return res.status;
}

try {
  ws = new WebSocket(await pageSocket());
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const p = pending.get(msg.id); pending.delete(msg.id);
      msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result);
    } else if (msg.method) {
      if (handlers[msg.method]) handlers[msg.method](msg.params);
      for (let i = listeners.length - 1; i >= 0; i--) {
        if (listeners[i].method === msg.method) { listeners[i].fn(msg.params); listeners.splice(i, 1); }
      }
    }
  };
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  await send('Log.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

  const seen = new Map();          // page key -> probe data
  const queue = [...START];
  const linkUses = [];             // { from, abs, href }
  const assetUses = new Map();     // asset url -> first page using it
  while (queue.length) {
    const rel = queue.shift();
    if (seen.has(rel)) continue;
    const data = await visit(rel);
    seen.set(rel, data);
    for (const a of data.assets) if (!assetUses.has(a)) assetUses.set(a, rel);
    for (const l of data.links) {
      linkUses.push({ from: rel, ...l });
      let u;
      try { u = new URL(l.abs); } catch { report('broken', rel, `unparseable href ${l.href}`); continue; }
      if (u.protocol === 'mailto:' || u.protocol === 'tel:') continue;
      if (u.origin !== ORIGIN) {
        if (!/\bnoopener\b/.test(l.rel)) report('noopener', rel, `${l.href} ("${l.text}") has rel="${l.rel}"`);
        if (u.protocol === 'http:') report('noopener', rel, `${l.href} is http, not https`);
        continue;
      }
      // Follow internal pages (HTML only) so their #ids can be checked.
      const k = u.pathname + u.search;
      if (!/\.(png|jpe?g|webp|svg|ico|pdf|json|xml|txt|css|js)$/i.test(u.pathname) && !seen.has(k) && !queue.includes(k)) {
        const st = await status(BASE + k);
        if (typeof st === 'number' && st < 400) queue.push(k);
      }
    }
  }

  // Internal links: status and fragment.
  const statusCache = new Map();
  for (const l of linkUses) {
    const u = new URL(l.abs);
    if (u.origin !== ORIGIN) continue;
    const k = u.pathname + u.search;
    if (l.href.startsWith('#')) {             // same page: check the rendered page itself
      const frag = decodeURIComponent(l.href.slice(1));
      if (frag && !seen.get(l.from).ids.includes(frag)) report('anchor', l.from, `${l.href}: no element with id "${frag}"`);
      continue;
    }
    if (!statusCache.has(k)) statusCache.set(k, await status(BASE + k));
    const st = statusCache.get(k);
    if (typeof st === 'number' && st >= 400) { report('broken', l.from, `${l.href} -> ${st}`); continue; }
    if (u.hash && u.hash.length > 1) {
      let target = seen.get(k);
      let frag = decodeURIComponent(u.hash.slice(1));
      if (typeof st === 'string') {           // followed through _redirects
        const to = redirects.get(u.pathname);
        const tu = new URL(to, BASE);
        target = seen.get(tu.pathname + tu.search);
      }
      if (!target) { report('anchor', l.from, `${l.href}: target page not crawled`); continue; }
      if (!target.ids.includes(frag)) report('anchor', l.from, `${l.href}: no element with id "${frag}"`);
    }
  }
  // _redirects targets with fragments.
  for (const [from, to] of redirects) {
    if (to.startsWith('http')) continue;
    const tu = new URL(to, BASE);
    const k = tu.pathname + tu.search;
    if (!seen.has(k)) { const st = await status(BASE + k); if (typeof st === 'number' && st >= 400) report('broken', '_redirects', `${from} -> ${to} -> ${st}`); continue; }
    if (tu.hash.length > 1 && !seen.get(k).ids.includes(tu.hash.slice(1))) report('anchor', '_redirects', `${from} -> ${to}: no such id`);
  }

  // Assets: self-hosted and loading.
  for (const [a, from] of assetUses) {
    const u = new URL(a);
    if (u.protocol === 'data:') continue;
    if (u.origin !== ORIGIN) {
      if (!(FONT_HOSTS.has(u.hostname) && /\/css2\?/.test(a))) report('asset', from, `from another host: ${a}`);
      continue;
    }
    const res = await fetch(a);
    if (!res.ok) report('asset', from, `${res.status}: ${u.pathname}`);
  }

  const internal = linkUses.filter((l) => { try { return new URL(l.abs).origin === ORIGIN; } catch { return false; } });
  const external = linkUses.filter((l) => { try { const u = new URL(l.abs); return u.origin !== ORIGIN && /^https?:$/.test(u.protocol); } catch { return false; } });
  console.log(`pages rendered: ${seen.size}; internal links: ${internal.length} (${new Set(internal.map((l) => l.abs)).size} distinct); ` +
    `external links: ${external.length} (${new Set(external.map((l) => l.abs)).size} distinct); assets: ${assetUses.size}`);
  console.log('pages: ' + [...seen.keys()].join(' '));
  for (const p of problems) console.log(p);
  console.log(problems.length ? `${problems.length} problem(s)` : 'clean');
  process.exitCode = problems.length ? 1 : 0;
} finally {
  try { ws && ws.close(); } catch { /* ignore */ }
  try { process.kill(-chrome.pid, 'SIGKILL'); } catch { /* ignore */ }
  rmSync(profile, { recursive: true, force: true });
}
