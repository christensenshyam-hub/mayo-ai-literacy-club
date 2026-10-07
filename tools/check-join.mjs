// Interaction check for /join (spec §3), in the same headless-Chrome-over-CDP style as
// shoot.mjs and check-text.mjs. It drives the page the way a visitor would (real mouse
// clicks, real Tab and Escape keys, real typing) against the local preview, whose form
// posts are MOCKED by tools/serve.py: nothing reaches Netlify. It checks:
//   static    the one Netlify form (name, honeypot, form-name, every field in the HTML,
//             no duplicate names, no novalidate), required only on route/name/email,
//             the route labels, the eligibility sentence, the "Your first Thursday" facts,
//             the title and descriptions (the three routes, no reply time),
//             the ids the homepage links to, the founder-form handoff, the photo
//   no-JS     every group visible under its heading; only route, name and email required
//   routes    visible + enabled fields, required fields, the submit label and the line
//             under the submit ("We will email you", no reply time) per route
//   hashes    #form-mayo / #form-other-school / #form-supporter preselect and focus (on load,
//             from the route actions, and on hashchange); #join-a-chapter, #start-a-chapter,
//             #support and #leave land on their block; at 1280x900 and 1440x900,
//             #start-a-chapter lands with its founder-form button in view
//   invalid   aria-invalid, aria-describedby -> a visible message, an announced summary,
//             focus on the first problem; fixing a field clears its error
//   sending   button disabled, "Sending…", aria-busy, no double submit ("Test Slow")
//   success   only after res.ok; the confirmation replaces the form, is role=status and
//             takes focus; the posted fields are the route's fields only (dev inbox)
//   failure   "Test Failure" (500), "Test Offline" (dropped connection) and an emulated
//             offline browser: the message is announced, every input is kept, retry works
//   keyboard  Tab reaches every route action and every form control, in order, each with
//             a visible focus outline (at 1280 and 390)
//   menu      the phone menu opens, makes main and the footer inert, Escape closes it and
//             returns focus to Menu; Tab past Join wraps to "Skip to content" with the
//             menu closed, and Enter on it then reaches main
//   overflow  no sideways scroll at 360 and 390 in any state; inputs 16px+, targets 44px+
//
// usage: node tools/check-join.mjs [url]          (default http://127.0.0.1:8150/join)
// env:   CHECK_SHOTS=<dir>  also save a screenshot of each state there
// exits 1 if any check fails, 0 when all pass. Needs the preview (tools/serve.py) running.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const URL0 = process.argv[2] || 'http://127.0.0.1:8150/join';
const ORIGIN = new URL(URL0).origin;
const INBOX = path.join(path.dirname(fileURLToPath(import.meta.url)), '.dev-inbox.jsonl');
const SHOTS = process.env.CHECK_SHOTS || '';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9300 + Math.floor(Math.random() * 600);
const profile = mkdtempSync(path.join(os.tmpdir(), 'checkjoin-'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------- results ---------- */
const failures = [];
let passed = 0;
let group = '';
function section(name) { group = name; console.log(`\n# ${name}`); }
function check(label, ok, detail) {
  if (ok) { passed++; console.log(`  ok    ${label}`); }
  else {
    failures.push(`${group}: ${label}${detail !== undefined ? ' -> ' + JSON.stringify(detail) : ''}`);
    console.log(`  FAIL  ${label}${detail !== undefined ? '  ' + JSON.stringify(detail) : ''}`);
  }
}
const same = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());

/* ---------- Chrome over CDP ---------- */
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--disable-gpu', 'about:blank'],
{ stdio: 'ignore', detached: true });

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
    listeners.push({ method, once: true, fn: (p) => { clearTimeout(t); resolve(p); } });
  });
}
function on(method, fn) { listeners.push({ method, once: false, fn }); }

async function ev(expression) {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error('evaluate failed: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text) + '\n' + expression.slice(0, 200));
  return r.result.value;
}
async function waitFor(expression, timeoutMs = 5000) {
  const end = Date.now() + timeoutMs;
  while (Date.now() < end) {
    if (await ev(expression)) return true;
    await sleep(50);
  }
  return false;
}

let width = 1280;
async function viewport(w) {
  width = w;
  const mobile = w < 768;
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: mobile ? 844 : 900, deviceScaleFactor: 1, mobile });
}
async function load(url, { scripts = true } = {}) {
  await send('Emulation.setScriptExecutionDisabled', { value: !scripts });
  const loaded = once('Page.loadEventFired');
  await send('Page.navigate', { url });
  await loaded;
  await ev('document.fonts.ready.then(() => true)');
  await sleep(250);
  await ev(HELPERS);
}

async function key(name) {
  const codes = { Tab: 9, Escape: 27, Enter: 13 };
  const k = { key: name, code: name, windowsVirtualKeyCode: codes[name], nativeVirtualKeyCode: codes[name] };
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', ...k });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', ...k });
}
// Enter as a keyboard sends it (with the character, so links and buttons activate).
async function enter() {
  const k = { key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 };
  await send('Input.dispatchKeyEvent', { type: 'keyDown', text: '\r', unmodifiedText: '\r', ...k });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', ...k });
  await sleep(150);
}
// A real mouse click in the middle of the element (scrolled into view first).
async function click(selector) {
  const box = await ev(`(() => { const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return null; el.scrollIntoView({ block: 'center' }); const r = el.getBoundingClientRect();
    return { x: r.left + Math.min(r.width / 2, 24), y: r.top + r.height / 2 }; })()`);
  if (!box) throw new Error('no element for click: ' + selector);
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: box.x, y: box.y });
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: box.x, y: box.y, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: box.x, y: box.y, button: 'left', clickCount: 1 });
  await sleep(120);
}
// Real typing into a field (focus, clear, insert text: fires input events like a keyboard).
async function type(selector, text) {
  await ev(`(() => { const el = document.querySelector(${JSON.stringify(selector)}); el.focus(); el.select && el.select(); })()`);
  await send('Input.insertText', { text: '' });
  await ev(`(() => { const el = document.querySelector(${JSON.stringify(selector)}); el.value = ''; el.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  if (text) await send('Input.insertText', { text });
}
async function choose(selector, value) {
  await ev(`(() => { const el = document.querySelector(${JSON.stringify(selector)}); el.focus(); el.value = ${JSON.stringify(value)};
    el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); })()`);
}
async function shot(name) {
  if (!SHOTS) return;
  mkdirSync(SHOTS, { recursive: true });
  const h = await ev('Math.ceil(document.documentElement.scrollHeight)');
  const img = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: Math.min(h, 12000), scale: 1 } });
  writeFileSync(path.join(SHOTS, `${name}-${width}.png`), Buffer.from(img.data, 'base64'));
}
// The current viewport only (what a visitor sees after landing on a link).
async function viewShot(name) {
  if (!SHOTS) return;
  mkdirSync(SHOTS, { recursive: true });
  const img = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(path.join(SHOTS, `${name}-${width}-view.png`), Buffer.from(img.data, 'base64'));
}
function inboxLines() {
  return existsSync(INBOX) ? readFileSync(INBOX, 'utf8').split('\n').filter(Boolean) : [];
}

/* ---------- in-page helpers (window.__cj) ---------- */
const HELPERS = `window.__cj = (() => {
  const vis = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
  const form = () => document.getElementById('contact-form');
  const named = () => [...form().querySelectorAll('input, select, textarea')]
    .filter((c) => c.name && c.type !== 'hidden' && c.name !== 'bot-field');
  const uniq = (a) => [...new Set(a)];
  // What a reader gets: innerText skips hidden parts (an "(optional)" marker, another route's line).
  const text = (el) => (el ? (el.getClientRects().length ? el.innerText : el.textContent).replace(/\\s+/g, ' ').trim() : '');
  const describe = (el) => {
    if (!el || el === document.body) return { tag: 'body' };
    const r = el.getBoundingClientRect();
    return { tag: el.tagName.toLowerCase(), id: el.id || '', name: el.name || '', value: el.type === 'radio' ? el.value : '',
      text: text(el).slice(0, 48), inView: r.bottom > 0 && r.top < innerHeight };
  };
  // A visible focus indicator: a 2px+ outline on the element, or on its radio card.
  const ring = (el) => {
    const host = el.closest('.choice') || el;
    const cs = getComputedStyle(host);
    const ok = (s) => s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2 && s.outlineColor !== 'rgba(0, 0, 0, 0)';
    return ok(cs) || ok(getComputedStyle(el));
  };
  return {
    route: () => (form().querySelector('input[name=route]:checked') || {}).value || '',
    shown: () => uniq(named().filter((c) => vis(c) && !c.matches(':disabled')).map((c) => c.name)),
    required: () => uniq(named().filter((c) => vis(c) && !c.matches(':disabled') && c.required).map((c) => c.name)),
    label: (id) => text(document.querySelector('label[for=' + id + ']')),
    submit: () => text(document.getElementById('submit-btn')),
    active: () => describe(document.activeElement),
    ring: () => ring(document.activeElement),
    vis: (sel) => vis(document.querySelector(sel)),
    text: (sel) => text(document.querySelector(sel)),
    values: () => Object.fromEntries(named().filter((c) => c.type !== 'radio').map((c) => [c.name, c.value]).concat([['route', (form().querySelector('input[name=route]:checked') || {}).value || '']])),
    inView: (sel) => { const r = document.querySelector(sel).getBoundingClientRect(); return r.top >= -2 && r.top < innerHeight - 40; },
    overflow: () => {
      const vw = document.documentElement.clientWidth;
      const page = document.documentElement.scrollWidth - vw;
      const wide = [...document.body.querySelectorAll('*')].filter((el) => {
        if (!vis(el) || el.closest('.visually-hidden, .skip-link, [aria-hidden=true]')) return false;
        const cs = getComputedStyle(el);
        if (cs.position === 'absolute' && cs.clip !== 'auto') return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.right > vw + 0.5 || r.left < -0.5);
      }).slice(0, 5).map((el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').join('.') : ''));
      return { page, wide };
    },
    state: () => {
      const b = document.getElementById('submit-btn');
      return {
        route: (form().querySelector('input[name=route]:checked') || {}).value || '',
        submit: text(b), disabled: b.disabled, busy: b.getAttribute('aria-busy'), formBusy: form().getAttribute('aria-busy'),
        formHidden: form().hidden, summary: vis(document.getElementById('form-summary')),
        summaryItems: [...document.querySelectorAll('#form-summary-list li')].map(text),
        summaryInAlert: !!document.getElementById('form-summary').closest('[role=alert]'),
        failure: vis(document.getElementById('form-failure')), failureText: text(document.getElementById('form-failure')),
        failureInAlert: !!document.getElementById('form-failure').closest('[role=alert]'),
        done: vis(document.getElementById('form-done')), doneText: text(document.getElementById('form-done')),
        live: text(document.getElementById('form-live')),
      };
    },
    // Each invalid control: aria-invalid, and a visible message reached through aria-describedby.
    errors: () => named().filter((c) => c.getAttribute('aria-invalid') === 'true').map((c) => {
      const ids = (c.getAttribute('aria-describedby') || '').split(/\\s+/).filter(Boolean);
      const msgs = ids.map((id) => document.getElementById(id)).filter((n) => n && n.classList.contains('field__error') && vis(n)).map(text);
      return { name: c.name, msg: msgs.join(' ') };
    }),
  };
})(); true`;

/* ---------- expectations (spec §3) ---------- */
const ROUTES = {
  'mayo-student': { hash: 'form-mayo', radio: 'form-mayo', submit: 'Leave your name',
    shown: ['route', 'name', 'email', 'grade', 'experience', 'message'], required: ['route', 'name', 'email', 'grade'] },
  'other-school-student': { hash: 'form-other-school', radio: 'form-other-school', submit: 'Send my interest',
    shown: ['route', 'name', 'email', 'school', 'grade', 'message'], required: ['route', 'name', 'email', 'school'] },
  'supporter': { hash: 'form-supporter', radio: 'form-supporter', submit: 'Send your message',
    shown: ['route', 'name', 'email', 'role', 'organization', 'message'], required: ['route', 'name', 'email', 'role', 'message'] },
};
const ROUTE_ACTIONS = ['Leave your name', 'I’m at another school', 'Open the founder form (Google Forms)', 'Read how chapters work', 'Write to the club'];
const RUN = Date.now().toString(36);
// Words that would promise a reply time (content-needs #14): never on /join.
const REPLY_TIME = /\b(days?|hours?|weeks?|within|soon|shortly|business|promptly|asap)\b/i;

async function fill(route, values) {
  await click(`#${ROUTES[route].radio}`);
  for (const [name, v] of Object.entries(values)) {
    const tag = await ev(`document.querySelector('[name=${name}]').tagName`);
    if (tag === 'SELECT') await choose(`[name=${name}]`, v);
    else await type(`[name=${name}]`, v);
  }
}

try {
  ws = new WebSocket(await pageSocket());
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const p = pending.get(msg.id); pending.delete(msg.id);
      msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result);
    } else if (msg.method) {
      for (let i = listeners.length - 1; i >= 0; i--) {
        const l = listeners[i];
        if (l.method === msg.method) { l.fn(msg.params); if (l.once) listeners.splice(i, 1); }
      }
    }
  };
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  let posts = 0;
  on('Network.requestWillBeSent', (p) => { if (p.request.method === 'POST' && new URL(p.request.url).pathname === '/join') posts++; });

  /* ===== static HTML ===== */
  section('static HTML');
  const res = await fetch(URL0);
  check('page answers 200', res.status === 200, res.status);
  const html = await res.text();
  const formTag = (html.match(/<form\b[^>]*id="contact-form"[^>]*>/) || [''])[0];
  check('one form, name="contact", POST /join', (html.match(/<form\b/g) || []).length === 1 && /name="contact"/.test(formTag) && /method="POST"/.test(formTag) && /action="\/join"/.test(formTag), formTag);
  check('data-netlify and the honeypot', /data-netlify="true"/.test(formTag) && /netlify-honeypot="bot-field"/.test(formTag) && /name="bot-field"/.test(html));
  check('hidden form-name=contact', /<input type="hidden" name="form-name" value="contact"/.test(html));
  check('no novalidate in the static HTML', !/novalidate/i.test(formTag));
  const formHtml = html.slice(html.indexOf(formTag), html.indexOf('</form>'));
  const names = [...formHtml.matchAll(/<(?:input|select|textarea)\b[^>]*\bname="([^"]+)"/g)].map((m) => m[1]);
  for (const n of ['name', 'email', 'grade', 'experience', 'message', 'route', 'school', 'role', 'organization']) {
    check(`field "${n}" is in the static HTML`, names.includes(n));
  }
  const dupes = names.filter((n, i) => n !== 'route' && names.indexOf(n) !== i);
  check('no field name appears twice (route radios aside)', dupes.length === 0, dupes);
  check('route radios: mayo-student, other-school-student, supporter', same(
    [...formHtml.matchAll(/name="route" value="([^"]+)"/g)].map((m) => m[1]), Object.keys(ROUTES)));
  const reqNames = [...formHtml.matchAll(/<(?:input|select|textarea)\b[^>]*\bname="([^"]+)"[^>]*\brequired\b/g)].map((m) => m[1]);
  check('static required: only route, name, email', same([...new Set(reqNames)], ['route', 'name', 'email']), [...new Set(reqNames)]);
  check('autocomplete on name, email, organization', /name="name"[^>]*autocomplete="name"/.test(formHtml) && /name="email"[^>]*autocomplete="email"/.test(formHtml) && /name="organization"[^>]*autocomplete="organization"/.test(formHtml));
  check('email is type="email"', /name="email"[^>]*type="email"|type="email"[^>]*name="email"/.test(formHtml));
  const grades = [...(formHtml.match(/<select id="f-grade"[\s\S]*?<\/select>/) || [''])[0].matchAll(/value="([^"]*)"/g)].map((m) => m[1]).filter(Boolean);
  check('grade options 9-12, no "Not a student"', same(grades, ['9', '10', '11', '12']) && !/Not a student/.test(html), grades);
  const roles = [...(formHtml.match(/<select id="f-role"[\s\S]*?<\/select>/) || [''])[0].matchAll(/<option value="[^"]+">([^<]+)</g)].map((m) => m[1]);
  check('role options as specified', JSON.stringify(roles) === JSON.stringify(['Teacher or school staff', 'Interested in advising a chapter', 'Parent or guardian', 'Organization or sponsor', 'Something else']), roles);
  check('H1 is "Find your place in the movement."', /<h1[^>]*>.*Find your place.*in the movement\.<\/span><\/h1>/.test(html));
  for (const id of ['join-a-chapter', 'start-a-chapter', 'support', 'leave', 'form-mayo', 'form-other-school', 'form-supporter']) {
    check(`id="${id}" exists once`, (html.match(new RegExp(`id="${id}"`, 'g')) || []).length === 1);
  }
  check('the three routes come before the form', html.indexOf('id="join-a-chapter"') < html.indexOf('id="support"') && html.indexOf('id="support"') < html.indexOf(formTag));
  const founder = (html.match(/<a [^>]*href="https:\/\/forms\.gle\/jVNaM7yyTtLLCDwv8"[^>]*>[^<]*<\/a>/) || [''])[0];
  const noteId = (founder.match(/aria-describedby="([^"]+)"/) || [])[1];
  check('founder form: external, new tab, hint tied by aria-describedby', /target="_blank"/.test(founder) && /rel="noopener"/.test(founder) && !!noteId && new RegExp(`id="${noteId}"[^>]*>[\\s\\S]{0,120}new tab`).test(html), founder);
  check('"Read how chapters work" links to /chapters', /href="\/chapters">Read how chapters work/.test(html));
  check('photo: the November 20, 2025 meeting with srcset, sizes, width, height and a caption',
    /meeting-2025-11-20/.test(html) && /<img[^>]*srcset=[^>]*sizes=[^>]*width="\d+" height="\d+"/.test(html) && /November 20, 2025\./.test(html));
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  check('any AACA mention in the page carries the Mayo Clinic sentence', !/AACA/.test(main) || /neither it nor this club is affiliated with Mayo Clinic/.test(main));
  check('footer carries the non-affiliation disclaimer', /<footer class="ft">[\s\S]*neither it nor this club is affiliated with Mayo Clinic/.test(html));
  const emails = [...html.matchAll(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g)].map((m) => m[0]).filter((e) => e !== 'name@example.com');
  check('no email addresses published', emails.length === 0, emails);
  check('no external scripts', ![...html.matchAll(/<script[^>]*src="([^"]+)"/g)].some((m) => /^https?:/.test(m[1])));
  check('no "Any Mayo student" wording', !/Any Mayo (High School )?student/.test(html));
  const routeLabels = [...formHtml.matchAll(/name="route" value="([^"]+)"[^>]*>\s*<span class="choice__title">([^<]+)<\/span>/g)].map((m) => [m[1], m[2]]);
  check('route labels as specified', JSON.stringify(routeLabels) === JSON.stringify([
    ['mayo-student', 'A Mayo High School student'], ['other-school-student', 'A student at another school'],
    ['supporter', 'A teacher, advisor, parent or partner']]), routeLabels);
  check('eligibility stated: Thursday meetings are for Mayo students; no outside visitors',
    /Thursday meetings are for Mayo High School students\. Outside visitors, including students from other schools, can[’']t attend school meetings\./.test(html));
  const firstThu = (html.match(/<dl [^>]*aria-labelledby="first-thursday"[^>]*>([\s\S]*?)<\/dl>/) || ['', ''])[1];
  const rowsOf = (block) => Object.fromEntries([...block.matchAll(/<dt>([^<]+)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/g)]
    .map((m) => [m[1], m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()]));
  const thu = rowsOf(firstThu);
  check('"Your first Thursday": 8:20 AM, MHS Library Classroom, one topic around a table, no sign-up, no experience',
    /8:20 AM/.test(thu.When || '') && thu.Where === 'MHS Library Classroom' && thu.Format === 'One topic, talked through around a table'
      && thu['Sign-up'] === 'None for a first visit' && thu.Experience === 'None needed' && Object.keys(thu).length === 5, thu);
  const headPart = html.slice(0, html.indexOf('</head>'));
  const metaOf = (attr, key) => (headPart.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`)) || [])[1];
  const title = (headPart.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const descs = [metaOf('name', 'description'), metaOf('property', 'og:description'), metaOf('name', 'twitter:description')];
  check('title, og:title and twitter:title present and equal', !!title && metaOf('property', 'og:title') === title && metaOf('name', 'twitter:title') === title, title);
  check('description, og:description and twitter:description present', descs.every(Boolean), descs);
  check('each description names the three routes', descs.every((d) => d && /Thursday meeting/.test(d) && /start a chapter/.test(d) && /support/.test(d)), descs);
  check('no reply time in the title or descriptions', ![title, ...descs].some((d) => REPLY_TIME.test(d || '')), [title, ...descs]);

  /* ===== without JavaScript ===== */
  section('without JavaScript (390)');
  await viewport(390);
  await load(URL0, { scripts: false });
  check('every field shows', same(await ev('__cj.shown()'), ['route', 'name', 'email', 'school', 'grade', 'experience', 'role', 'organization', 'message']), await ev('__cj.shown()'));
  check('only route, name and email are required', same(await ev('__cj.required()'), ['route', 'name', 'email']), await ev('__cj.required()'));
  check('both group headings show', await ev(`[...document.querySelectorAll('.fieldgroup__head')].every((n) => n.getClientRects().length && n.getBoundingClientRect().width > 20)`));
  check('the browser validates (noValidate is false)', await ev('document.getElementById("contact-form").noValidate === false'));
  check('submit reads "Send"', (await ev('__cj.submit()')) === 'Send');
  await shot('nojs');

  /* ===== routes ===== */
  for (const w of [1280, 390]) {
    section(`routes (${w})`);
    await viewport(w);
    await load(URL0);
    check('no route chosen at first', (await ev('__cj.route()')) === '');
    check('before a route: name, email and message only', same(await ev('__cj.shown()'), ['route', 'name', 'email', 'message']), await ev('__cj.shown()'));
    check('before a route: submit reads "Send"', (await ev('__cj.submit()')) === 'Send');
    check('form.noValidate set by the script', await ev('document.getElementById("contact-form").noValidate === true'));
    for (const [route, x] of Object.entries(ROUTES)) {
      await click(`#${x.radio}`);
      check(`${route}: chosen by clicking its card`, (await ev('__cj.route()')) === route);
      check(`${route}: visible, enabled fields`, same(await ev('__cj.shown()'), x.shown), await ev('__cj.shown()'));
      check(`${route}: required fields`, same(await ev('__cj.required()'), x.required), await ev('__cj.required()'));
      check(`${route}: submit reads "${x.submit}"`, (await ev('__cj.submit()')) === x.submit, await ev('__cj.submit()'));
      const hiddenOn = await ev(`[...document.querySelectorAll('#contact-form [data-routes]')].filter((n) => n.hidden).every((n) =>
        [...n.querySelectorAll('input, select, textarea')].every((c) => c.matches(':disabled')))`);
      check(`${route}: hidden groups are disabled`, hiddenOn);
      const after = await ev('__cj.text("#form-after")');
      check(`${route}: the line under the submit starts "We will email you", no reply time`, /^We will email you/.test(after) && !REPLY_TIME.test(after), after);
      if (w === 390) await shot(`route-${route}`);
    }
    await click('#form-supporter');
    check('supporter: message label is "How would you like to help?"', (await ev('__cj.label("f-message")')) === 'How would you like to help?', await ev('__cj.label("f-message")'));
    await click('#form-other-school');
    check('other school: grade is marked optional', /\(optional\)/.test(await ev('__cj.label("f-grade")')), await ev('__cj.label("f-grade")'));
    check('other school: message is optional', /\(optional\)/.test(await ev('__cj.label("f-message")')));
    await click('#form-mayo');
    check('Mayo: grade is not marked optional', !/\(optional\)/.test(await ev('__cj.label("f-grade")')));
  }

  /* ===== hash preselects ===== */
  for (const w of [1280, 390]) {
    section(`hash preselects (${w})`);
    await viewport(w);
    for (const [route, x] of Object.entries(ROUTES)) {
      await load(`${URL0}#${x.hash}`);
      await sleep(200);
      const a = await ev('__cj.active()');
      check(`/join#${x.hash} on load: ${route} chosen`, (await ev('__cj.route()')) === route);
      check(`/join#${x.hash} on load: focus on its radio, in view`, a.id === x.radio && a.inView, a);
      check(`/join#${x.hash} on load: its fields show`, same(await ev('__cj.shown()'), x.shown));
      check(`/join#${x.hash} on load: "Leave your name" heading in view too`, await ev(`__cj.inView('#leave-heading')`), await ev(`document.getElementById('leave-heading').getBoundingClientRect().top`));
      await viewShot(`hash-${x.hash}`);
    }
    const actions = [['a[href="#form-mayo"].btn', 'mayo-student'], ['a.tlink[href="#form-other-school"]', 'other-school-student'], ['a[href="#form-supporter"].btn', 'supporter']];
    await load(URL0);
    for (const [sel, route] of actions) {
      await click(sel);
      await sleep(150);
      const a = await ev('__cj.active()');
      check(`route action ${sel}: ${route} chosen`, (await ev('__cj.route()')) === route);
      check(`route action ${sel}: focus on the radio, in view`, a.id === ROUTES[route].radio && a.inView, a);
      check(`route action ${sel}: address shows #${ROUTES[route].hash}`, (await ev('location.hash')) === '#' + ROUTES[route].hash);
      check(`route action ${sel}: "Leave your name" heading in view too`, await ev(`__cj.inView('#leave-heading')`), await ev(`document.getElementById('leave-heading').getBoundingClientRect().top`));
      await viewShot(`action-${route}`);
    }
    if (w === 1280) {
      // The homepage's "Requirements and the founder form" lands here: the action must be on screen.
      for (const dw of [1280, 1440]) {
        await viewport(dw);
        await load(`${URL0}#start-a-chapter`);
        await sleep(200);
        const r = await ev(`(() => { const b = document.querySelector('#start-a-chapter .btn').getBoundingClientRect();
          return { top: Math.round(b.top), bottom: Math.round(b.bottom), h: innerHeight }; })()`);
        check(`/join#start-a-chapter (${dw}x900): the founder-form button is in view`, r.top >= 0 && r.bottom <= r.h, r);
        await viewShot(`hash-start-a-chapter-button`);
      }
      await viewport(w);
      await load(URL0);
    }
    await ev(`location.hash = '#form-other-school'`);
    await sleep(200);
    check('hashchange to #form-other-school preselects it', (await ev('__cj.route()')) === 'other-school-student');
    for (const id of ['join-a-chapter', 'start-a-chapter', 'support', 'leave']) {
      await load(`${URL0}#${id}`);
      await sleep(200);
      check(`/join#${id} lands on its block`, await ev(`__cj.inView('#${id}')`), await ev(`document.getElementById('${id}').getBoundingClientRect().top`));
      await viewShot(`hash-${id}`);
    }
  }

  /* ===== invalid ===== */
  section('invalid (390)');
  await viewport(390);
  await load(URL0);
  await click('#submit-btn');
  await sleep(150);
  let st = await ev('__cj.state()');
  let errs = await ev('__cj.errors()');
  check('empty submit: summary shows, inside role="alert"', st.summary && st.summaryInAlert, st);
  check('empty submit: summary lists route, name, email', st.summaryItems.length === 3 && /Choose who you are/.test(st.summaryItems[0]), st.summaryItems);
  check('empty submit: summary title counts them', /Three answers need a look/.test(await ev('__cj.text("#form-summary")')));
  check('empty submit: focus on the first problem (the first radio)', (await ev('__cj.active()')).id === 'form-mayo', await ev('__cj.active()'));
  check('empty submit: route error shown, radios aria-invalid and described by it', await ev(`(() => {
    const e = document.getElementById('route-error'); const rs = [...document.querySelectorAll('input[name=route]')];
    return e.getClientRects().length > 0 && e.textContent.trim().length > 0 && document.getElementById('route-field').classList.contains('is-invalid')
      && rs.every((r) => r.getAttribute('aria-invalid') === 'true' && (r.getAttribute('aria-describedby') || '').includes('route-error')); })()`));
  errs = errs.filter((e) => e.name !== 'route');
  check('empty submit: name and email aria-invalid with visible messages', same(errs.map((e) => e.name), ['name', 'email']) && errs.every((e) => e.msg.length > 5), errs);
  check('nothing was posted', st.done === false && st.formHidden === false);
  await shot('invalid-empty');
  for (const ow of [360, 390]) {
    await viewport(ow);
    const o = await ev('__cj.overflow()');
    check(`no overflow with every error showing (${ow})`, o.page <= 0 && o.wide.length === 0, o);
  }
  await viewport(390);

  await fill('mayo-student', { name: 'Check Join', email: 'not-an-email' });
  await click('#submit-btn');
  await sleep(150);
  errs = await ev('__cj.errors()');
  check('Mayo, bad email + no grade: both flagged', same(errs.map((e) => e.name), ['email', 'grade']), errs);
  check('Mayo: the bad email gets the format message', /full email address/.test((errs.find((e) => e.name === 'email') || {}).msg || ''), errs);
  check('Mayo: focus on the email field', (await ev('__cj.active()')).id === 'f-email');
  check('route error cleared once a route is chosen', !(await ev(`__cj.vis('#route-error')`)));
  await type('#f-email', 'check@example.com');
  await sleep(80);
  check('fixing the email clears its error as you type', !(await ev('__cj.errors()')).some((e) => e.name === 'email'));
  check('the summary drops the fixed answer', (await ev('__cj.state()')).summaryItems.length === 1, (await ev('__cj.state()')).summaryItems);

  await click('#form-supporter');
  await click('#submit-btn');
  await sleep(150);
  errs = await ev('__cj.errors()');
  check('supporter: role and message required', same(errs.map((e) => e.name), ['role', 'message']), errs);
  check('supporter: focus on role', (await ev('__cj.active()')).id === 'f-role');
  check('supporter: grade never flagged or shown', !(await ev('__cj.shown()')).includes('grade'));
  await shot('invalid-supporter');
  await click('#form-other-school');
  await click('#submit-btn');
  await sleep(150);
  errs = await ev('__cj.errors()');
  check('other school: only school flagged (grade optional)', same(errs.map((e) => e.name), ['school']), errs);
  check('other school: focus on school', (await ev('__cj.active()')).id === 'f-school');

  /* ===== sending + success (Test Slow) ===== */
  section('sending and success (390)');
  await load(URL0);
  let before = inboxLines().length;
  await fill('mayo-student', { name: 'Test Slow', email: 'slow@example.com', grade: '10', experience: 'some', message: `check-join ${RUN}` });
  posts = 0;
  await click('#submit-btn');
  await sleep(250);
  st = await ev('__cj.state()');
  check('sending: button disabled', st.disabled === true, st);
  check('sending: label "Sending…"', st.submit === 'Sending…', st.submit);
  check('sending: aria-busy on the button and the form', st.busy === 'true' && st.formBusy === 'true', st);
  check('sending: announced politely', st.live === 'Sending…', st.live);
  check('sending: no confirmation yet', st.done === false);
  await shot('sending');
  await ev(`document.getElementById('contact-form').requestSubmit()`);
  await click('#submit-btn');
  check('success arrives after the slow reply', await waitFor(`__cj.state().done`, 9000));
  st = await ev('__cj.state()');
  check('no double submit: exactly one POST', posts === 1, posts);
  check('success: the form is replaced', st.formHidden === true && st.done === true, st);
  check('success: role="status" and focused', (await ev(`document.getElementById('form-done').getAttribute('role')`)) === 'status' && (await ev('__cj.active()')).id === 'form-done');
  check('success (Mayo): says "We will email you" and "come on Thursday"', /We will email you/.test(st.doneText) && /come on Thursday/.test(st.doneText), st.doneText);
  check('success (Mayo): no reply time promised', !REPLY_TIME.test(st.doneText), st.doneText);
  check('success (Mayo): other routes\' lines hidden', !/meets only at Mayo/.test(await ev(`[...document.querySelectorAll('#form-done p')].filter((p) => p.getClientRects().length).map((p) => p.textContent).join(' ')`)));
  let added = inboxLines().slice(before).map((l) => JSON.parse(l));
  let entry = added.find((e) => e.fields.message === `check-join ${RUN}`);
  check('posted once, with the Mayo fields only', added.length === 1 && !!entry && same(Object.keys(entry.fields), ['form-name', 'bot-field', 'route', 'name', 'email', 'grade', 'experience', 'message']), entry && Object.keys(entry.fields));
  check('posted route=mayo-student, form-name=contact', entry && entry.fields.route === 'mayo-student' && entry.fields['form-name'] === 'contact');
  await shot('success-mayo');
  for (const ow of [360, 390]) { await viewport(ow); const o = await ev('__cj.overflow()'); check(`no overflow on success (${ow})`, o.page <= 0 && o.wide.length === 0, o); }
  await viewport(390);

  for (const route of ['supporter', 'other-school-student']) {
    await load(URL0);
    before = inboxLines().length;
    const values = route === 'supporter'
      ? { name: `Check Join ${RUN}`, email: 'help@example.com', role: 'prospective-advisor', organization: 'Check Org', message: `check-join ${RUN} ${route}` }
      : { name: `Check Join ${RUN}`, email: 'away@example.com', school: 'Check High School, Somewhere', grade: '11', message: `check-join ${RUN} ${route}` };
    await fill(route, values);
    await click('#submit-btn');
    check(`${route}: success`, await waitFor(`__cj.state().done`, 5000));
    added = inboxLines().slice(before).map((l) => JSON.parse(l));
    entry = added.find((e) => e.fields.message === values.message);
    const want = route === 'supporter' ? ['form-name', 'bot-field', 'route', 'name', 'email', 'role', 'organization', 'message']
      : ['form-name', 'bot-field', 'route', 'name', 'email', 'school', 'grade', 'message'];
    check(`${route}: posted exactly its fields`, !!entry && same(Object.keys(entry.fields), want), entry && Object.keys(entry.fields));
    check(`${route}: confirmation focused`, (await ev('__cj.active()')).id === 'form-done');
    check(`${route}: no "come on Thursday" line`, !/come on Thursday/.test((await ev('__cj.state()')).doneText));
    await shot(`success-${route}`);
  }

  /* ===== failure ===== */
  section('failure (390)');
  const cases = [
    ['Test Failure', 'mayo-student', 'server', /Your details are still here, so try again/],
    ['Test Failure', 'supporter', 'server', /Your details are still here, so try again/],
    ['Test Offline', 'other-school-student', 'network', /connection dropped/],
  ];
  for (const [name, route, kind, re] of cases) {
    await load(URL0);
    const values = { name, email: 'fail@example.com', message: `check-join ${RUN} ${kind}` };
    if (route === 'mayo-student') Object.assign(values, { grade: '9' });
    if (route === 'supporter') Object.assign(values, { role: 'parent-or-guardian', organization: 'Check Org' });
    if (route === 'other-school-student') Object.assign(values, { school: 'Check High School, Somewhere' });
    await fill(route, values);
    const typed = await ev('__cj.values()');
    before = inboxLines().length;
    await click('#submit-btn');
    check(`${name} (${route}): failure shows`, await waitFor(`__cj.state().failure`, 5000));
    st = await ev('__cj.state()');
    check(`${name}: message inside role="alert"`, st.failureInAlert && re.test(st.failureText) && /@mayoailiteracy/.test(st.failureText), st.failureText);
    check(`${name}: "come on Thursday" only for Mayo students`, /come on Thursday/.test(st.failureText) === (route === 'mayo-student'), st.failureText);
    check(`${name}: no success shown, form still there`, !st.done && !st.formHidden);
    check(`${name}: every input kept`, JSON.stringify(await ev('__cj.values()')) === JSON.stringify(typed), { typed, now: await ev('__cj.values()') });
    check(`${name}: button back, with the route label`, !st.disabled && st.busy === null && st.submit === ROUTES[route].submit, st);
    check(`${name}: focus on "Try sending again"`, (await ev('__cj.active()')).id === 'retry-btn', await ev('__cj.active()'));
    check(`${name}: nothing reached the inbox`, inboxLines().length === before);
    await shot(`failure-${kind}-${route}`);
  }
  for (const ow of [360, 390]) { await viewport(ow); const o = await ev('__cj.overflow()'); check(`no overflow on failure (${ow})`, o.page <= 0 && o.wide.length === 0, o); }
  await viewport(390);

  // An offline browser: nothing is sent; then the retry works once back online.
  await load(URL0);
  await fill('supporter', { name: `Check Join ${RUN}`, email: 'offline@example.com', role: 'teacher-or-staff', message: `check-join ${RUN} offline` });
  await send('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  posts = 0;
  await click('#submit-btn');
  check('offline: failure shows', await waitFor(`__cj.state().failure`, 3000));
  st = await ev('__cj.state()');
  check('offline: says so, keeps the details', /offline/.test(st.failureText) && /still here/.test(st.failureText), st.failureText);
  check('offline: nothing sent', posts === 0, posts);
  await shot('failure-offline');
  await send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  before = inboxLines().length;
  await click('#retry-btn');
  check('retry after coming back online: success', await waitFor(`__cj.state().done`, 5000));
  check('retry: posted once', inboxLines().length === before + 1);

  /* ===== keyboard ===== */
  for (const w of [1280, 390]) {
    section(`keyboard (${w})`);
    await viewport(w);
    for (const route of Object.keys(ROUTES)) {
      await load(URL0);
      await ev(`(() => { const r = document.querySelector('input[name=route][value=${route}]'); r.checked = true; r.dispatchEvent(new Event('change', { bubbles: true })); })()`);
      const seen = [];
      const noRing = [];
      for (let i = 0; i < 90; i++) {
        await key('Tab');
        const a = await ev('__cj.active()');
        if (a.tag === 'body') break;
        const label = a.name ? (a.name === 'route' ? `route:${a.value}` : a.name) : (a.id || a.text.replace(/\s*→$/, ''));
        if (seen.length && seen[0] === label) break;
        seen.push(label);
        if (!(await ev('__cj.ring()'))) noRing.push(label);
      }
      const want = [...ROUTE_ACTIONS, `route:${route}`, ...ROUTES[route].shown.filter((n) => n !== 'route'), 'submit-btn'];
      const idx = want.map((x) => seen.indexOf(x));
      check(`${route}: Tab reaches every route action and form control`, idx.every((i) => i >= 0), want.filter((x, i) => idx[i] < 0));
      check(`${route}: in reading order`, idx.every((v, i) => i === 0 || v > idx[i - 1]), idx);
      const stray = ['school', 'grade', 'experience', 'role', 'organization'].filter((n) => !ROUTES[route].shown.includes(n) && seen.includes(n));
      check(`${route}: never stops on a hidden field`, stray.length === 0, stray);
      check(`${route}: every stop shows a 2px focus outline`, noRing.length === 0, noRing);
    }
  }

  /* ===== phone menu ===== */
  section('phone menu (390)');
  await viewport(390);
  await load(URL0);
  await click('.nav-toggle');
  check('Menu opens: aria-expanded="true"', (await ev(`document.querySelector('.nav-toggle').getAttribute('aria-expanded')`)) === 'true');
  check('main and the footer are inert while open', await ev(`document.getElementById('main').inert && document.querySelector('.ft').inert`));
  check('the menu shows Join', await ev(`__cj.vis('.site-nav__join a')`));
  await key('Escape');
  await sleep(100);
  check('Escape closes it', (await ev(`document.querySelector('.nav-toggle').getAttribute('aria-expanded')`)) === 'false');
  check('focus returns to Menu', await ev(`document.activeElement === document.querySelector('.nav-toggle')`));
  check('main is no longer inert', await ev(`!document.getElementById('main').inert`));
  // Keyboard only: open the menu, Tab past its last item (Join). Focus wraps through the
  // browser to the skip link, which must close the menu so "Skip to content" works.
  await load(URL0);
  await ev(`document.querySelector('.nav-toggle').focus()`);
  await enter();
  check('Menu opens from the keyboard', (await ev(`document.querySelector('.nav-toggle').getAttribute('aria-expanded')`)) === 'true');
  let onSkip = false;
  for (let i = 0; i < 14 && !onSkip; i++) {
    await key('Tab');
    onSkip = await ev(`!!document.activeElement && document.activeElement.classList.contains('skip-link')`);
  }
  const menuState = await ev(`({ open: document.querySelector('.nav-toggle').getAttribute('aria-expanded'), inert: document.getElementById('main').inert })`);
  check('Tab past Join reaches "Skip to content" with the menu closed', onSkip && menuState.open === 'false' && !menuState.inert, { onSkip, ...menuState });
  await enter();
  const skipped = await ev(`({ hash: location.hash, inert: document.getElementById('main').inert, open: document.querySelector('.nav-toggle').getAttribute('aria-expanded') })`);
  check('Enter on "Skip to content" goes to main', skipped.hash === '#main' && !skipped.inert && skipped.open === 'false', skipped);

  /* ===== phone fit ===== */
  for (const w of [360, 390]) {
    section(`phone fit (${w})`);
    await viewport(w);
    await load(URL0);
    for (const route of ['', ...Object.keys(ROUTES)]) {
      if (route) await click(`#${ROUTES[route].radio}`);
      const o = await ev('__cj.overflow()');
      check(`no sideways overflow (${route || 'no route'})`, o.page <= 0 && o.wide.length === 0, o);
    }
    const small = await ev(`[...document.querySelectorAll('#contact-form input:not([type=hidden]):not([type=radio]), #contact-form select, #contact-form textarea')]
      .filter((c) => c.getClientRects().length).filter((c) => parseFloat(getComputedStyle(c).fontSize) < 16).map((c) => c.name)`);
    check('every input is 16px or larger (no iOS zoom)', small.length === 0, small);
    await click('#form-supporter');
    const tiny = await ev(`[...document.querySelectorAll('main a, main button, #contact-form input:not([type=hidden]):not([type=radio]), #contact-form select, #contact-form textarea, .choice')]
      .filter((el) => el.getClientRects().length && !el.closest('.hidden-field, .status__title, .longform, .rows dd p:not(:has(.tlink))'))
      .filter((el) => !(el.tagName === 'A' && !el.matches('.btn, .tlink')))
      .filter((el) => el.getBoundingClientRect().height < 44).map((el) => (el.id || el.name || el.textContent.trim()).slice(0, 30))`);
    check('buttons, text links, fields and radio cards are 44px+ tall', tiny.length === 0, tiny);
  }
} catch (err) {
  failures.push('crashed: ' + (err && err.stack || err));
  console.error(err);
} finally {
  try { ws && ws.close(); } catch { /* ignore */ }
  try { process.kill(-chrome.pid, 'SIGKILL'); } catch { /* ignore */ }
  rmSync(profile, { recursive: true, force: true });
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}
