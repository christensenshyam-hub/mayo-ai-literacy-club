// Screenshot pages with headless Chrome over the DevTools protocol, at real
// viewport widths (a --window-size flag can't go below ~500px, so phones are
// emulated instead). Also reports horizontal overflow at each width.
//
// usage: node tools/shoot.mjs <url> <out-prefix> [widths]
//   widths: comma list, default 1440,390 (e.g. 360,390,768,1280,1440)
// writes <out-prefix>-<width>.png (full page) and <out-prefix>-<width>-fold.png
// prints one line per width: "<width> <full-height>px overflow=<px>"
// env: SHOOT_WAIT=<ms> extra settle time (default 600); SHOOT_SCROLL=1 scrolls
// through the page first so lazy-loaded images render (useful on external sites);
// SHOOT_MAXH=<px> caps the full-page height (default 16000).
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [, , url, prefix, widthArg = '1440,390'] = process.argv;
if (!url || !prefix) {
  console.error('usage: node tools/shoot.mjs <url> <out-prefix> [widths]');
  process.exit(2);
}
const widths = widthArg.split(',').map(Number).filter(Boolean);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9300 + Math.floor(Math.random() * 600);
const profile = mkdtempSync(path.join(os.tmpdir(), 'shoot-'));
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

let ws;
let nextId = 1;
const pending = new Map();
const listeners = [];
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
  const DESKTOP_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36';
  const MOBILE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1';
  const WAIT = Number(process.env.SHOOT_WAIT || 600);
  const MAXH = Number(process.env.SHOOT_MAXH || 16000);
  mkdirSync(path.dirname(path.resolve(prefix)), { recursive: true });
  for (const width of widths) {
    const mobile = width < 768;
    const foldH = mobile ? 844 : 900;
    await send('Emulation.setDeviceMetricsOverride', { width, height: foldH, deviceScaleFactor: 1, mobile });
    await send('Emulation.setUserAgentOverride', { userAgent: mobile ? MOBILE_UA : DESKTOP_UA });
    await send('Emulation.setTouchEmulationEnabled', mobile ? { enabled: true, maxTouchPoints: 5 } : { enabled: false });
    const loaded = once('Page.loadEventFired');
    await send('Page.navigate', { url });
    await loaded;
    await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => true)', awaitPromise: true });
    await sleep(WAIT);
    if (process.env.SHOOT_SCROLL) {
      await send('Runtime.evaluate', { awaitPromise: true, expression: `(async () => {
        const step = innerHeight * 0.8;
        for (let y = 0; y < document.documentElement.scrollHeight && y < ${MAXH}; y += step) { scrollTo(0, y); await new Promise(r => setTimeout(r, 250)); }
        scrollTo(0, 0); await new Promise(r => setTimeout(r, 400));
      })()` });
    }
    const { result } = await send('Runtime.evaluate', {
      expression: 'JSON.stringify({h: Math.ceil(document.documentElement.scrollHeight), over: document.documentElement.scrollWidth - document.documentElement.clientWidth})',
      returnByValue: true,
    });
    const parsed = JSON.parse(result.value);
    const h = Math.min(parsed.h, MAXH);
    const over = parsed.over;
    const fold = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width, height: foldH, scale: 1 } });
    writeFileSync(`${prefix}-${width}-fold.png`, Buffer.from(fold.data, 'base64'));
    const full = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: h, scale: 1 } });
    writeFileSync(`${prefix}-${width}.png`, Buffer.from(full.data, 'base64'));
    console.log(`${width} ${h}px overflow=${over}`);
  }
} finally {
  try { ws && ws.close(); } catch { /* ignore */ }
  try { process.kill(-chrome.pid, 'SIGKILL'); } catch { /* ignore */ }
  rmSync(profile, { recursive: true, force: true });
}
