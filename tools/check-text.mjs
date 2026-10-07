// Text-collision check, in the same headless-Chrome-over-CDP style as shoot.mjs.
// shoot.mjs only reports page scroll width, which can't see text printed over
// other text inside the page. This loads a page at each width and reports:
//   overlap   two text runs from different elements whose glyph boxes intersect
//   spill     an element's text running past its own box (e.g. a nowrap label
//             wider than its grid column)
//   dot-end   a "·" separator that ends a line, or sits on a line by itself
//   offpage   text outside the viewport's width
// usage: node tools/check-text.mjs <url> [widths]   (default 320,360,390,414,600,768,1024,1280,1440)
// exits 1 if anything is found, 0 if clean.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [, , url, widthArg = '320,360,390,414,600,768,1024,1280,1440'] = process.argv;
if (!url) { console.error('usage: node tools/check-text.mjs <url> [widths]'); process.exit(2); }
const widths = widthArg.split(',').map(Number).filter(Boolean);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9300 + Math.floor(Math.random() * 600);
const profile = mkdtempSync(path.join(os.tmpdir(), 'checktext-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--disable-gpu', 'about:blank'],
{ stdio: 'ignore', detached: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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

// Runs in the page. Returns a list of problems.
const PROBE = `(() => {
  const out = [];
  const name = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    if (el.classList.length) s += '.' + [...el.classList].join('.');
    return s;
  };
  const visible = (el) => {
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || n.hidden) return false;
      if (cs.clip && cs.clip !== 'auto' && cs.position === 'absolute') return false; // visually hidden
    }
    return true;
  };
  const runs = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const vw = document.documentElement.clientWidth;
  for (let t = walker.nextNode(); t; t = walker.nextNode()) {
    if (!t.textContent.trim()) continue;
    const el = t.parentElement;
    if (!el || !visible(el) || el.closest('script,style,noscript')) continue;
    const r = document.createRange();
    r.selectNodeContents(t);
    for (const b of r.getClientRects()) {
      if (b.width < 1 || b.height < 1) continue;
      // Compare glyph cores, not content boxes: tight leading (the lead is 1.02) makes
      // content boxes of neighbouring lines touch by design while the ink stays apart.
      const inset = b.height * 0.22;
      runs.push({ el, b: { l: b.left, r: b.right, t: b.top + inset + scrollY, btm: b.bottom - inset + scrollY }, text: t.textContent.trim().slice(0, 40) });
      if (b.right > vw + 1 || b.left < -1) out.push({ kind: 'offpage', el: name(el), text: t.textContent.trim().slice(0, 40) });
    }
    // spill: text wider than the box of the nearest block-level ancestor
    let box = el;
    while (box && getComputedStyle(box).display.startsWith('inline')) box = box.parentElement;
    if (box) {
      const bb = box.getBoundingClientRect();
      const cs = getComputedStyle(box);
      const right = bb.right - parseFloat(cs.paddingRight) + 1.5;
      for (const b of r.getClientRects()) {
        if (b.right > right && cs.overflowX === 'visible') {
          out.push({ kind: 'spill', el: name(box), by: Math.round(b.right - right), text: t.textContent.trim().slice(0, 40) });
          break;
        }
      }
    }
  }
  // overlap between the glyph cores of runs from different, unrelated elements
  for (let i = 0; i < runs.length; i++) {
    for (let j = i + 1; j < runs.length; j++) {
      const a = runs[i], c = runs[j];
      if (a.el === c.el || a.el.contains(c.el) || c.el.contains(a.el)) continue;
      const w = Math.min(a.b.r, c.b.r) - Math.max(a.b.l, c.b.l);
      const h = Math.min(a.b.btm, c.b.btm) - Math.max(a.b.t, c.b.t);
      if (w > 2 && h > 1) out.push({ kind: 'overlap', el: name(a.el) + ' x ' + name(c.el), text: a.text + ' | ' + c.text, w: Math.round(w), h: Math.round(h) });
    }
  }
  // separators: a "·" must never be the last glyph on its line, or alone on a line
  const w2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const chars = [];
  for (let t = w2.nextNode(); t; t = w2.nextNode()) {
    const el = t.parentElement;
    if (!el || !visible(el)) continue;
    const s = t.textContent;
    for (let k = 0; k < s.length; k++) if (s[k].trim()) chars.push({ t, k, ch: s[k], el });
  }
  const rectOf = (c) => { const r = document.createRange(); r.setStart(c.t, c.k); r.setEnd(c.t, c.k + 1); return r.getBoundingClientRect(); };
  for (let i = 0; i < chars.length; i++) {
    if (chars[i].ch !== '·') continue;
    const d = rectOf(chars[i]);
    if (!d.height) continue;
    const next = chars[i + 1] ? rectOf(chars[i + 1]) : null;
    const prev = chars[i - 1] ? rectOf(chars[i - 1]) : null;
    const endsLine = !next || next.top > d.top + d.height / 2;
    const alone = endsLine && (!prev || prev.top < d.top - d.height / 2);
    if (endsLine) out.push({ kind: alone ? 'dot-alone' : 'dot-end', el: name(chars[i].el.closest('p,dt,dd,li,div') || chars[i].el) });
  }
  return out;
})()`;

let ws; let nextId = 1; const pending = new Map(); const listeners = [];
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

let failed = false;
try {
  ws = new WebSocket(await pageSocket());
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const p = pending.get(msg.id); pending.delete(msg.id);
      msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result);
    } else if (msg.method) {
      for (let i = listeners.length - 1; i >= 0; i--) {
        if (listeners[i].method === msg.method) { listeners[i].fn(msg.params); listeners.splice(i, 1); }
      }
    }
  };
  await send('Page.enable');
  await send('Runtime.enable');
  for (const width of widths) {
    const mobile = width < 768;
    await send('Emulation.setDeviceMetricsOverride', { width, height: mobile ? 844 : 900, deviceScaleFactor: 1, mobile });
    const loaded = once('Page.loadEventFired');
    await send('Page.navigate', { url });
    await loaded;
    await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => true)', awaitPromise: true });
    await sleep(700);
    const { result } = await send('Runtime.evaluate', { expression: PROBE, returnByValue: true });
    const problems = result.value || [];
    if (problems.length) failed = true;
    console.log(`${width}: ${problems.length ? problems.length + ' problem(s)' : 'clean'}`);
    for (const p of problems.slice(0, 25)) console.log('   ', JSON.stringify(p));
  }
} finally {
  try { ws && ws.close(); } catch { /* ignore */ }
  try { process.kill(-chrome.pid, 'SIGKILL'); } catch { /* ignore */ }
  rmSync(profile, { recursive: true, force: true });
}
process.exit(failed ? 1 : 0);
