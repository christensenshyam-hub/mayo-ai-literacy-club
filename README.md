# Mayo AI Literacy Club — club site

The source of [mayoailiteracy.com](https://mayoailiteracy.com): plain HTML, one stylesheet, one script, vanilla JS. No framework, no build step, no dependencies. Netlify publishes `mayo-site/` as it is.

**Branch `redesign/participation` (October 2026)** carries the site-wide redesign: the Eames-led art direction approved at `a35e39d`, rolled out to every page, with the rebuilt `/join` and `/chapters`. **Ship gate:** nothing on this branch deploys before the rebuilt `/join` ships with it, because the homepage, `/chapters` and the shared header link to anchors only the new `/join` has (`docs/content-needs.md` #42). Open founder questions are in `docs/content-needs.md`; the pages work around each one and never fill it in.

## Structure

```
mayo-site/                  # Netlify's publish directory: everything here is public
├── index.html              # Home: the lead, the meeting, three ways to take part, a student story,
│                           #   one annotated work sample, the record, Mercurius, latest writing
├── about.html              # The story so far, the board, what we think, three ways to use AI
├── chapters.html           # Start a chapter: purpose → what it takes → what we provide →
│                           #   what happens next → where to apply → where we stand
├── join.html               # Three routes, the photo, and the one Netlify form (inline script)
├── topics.html             # "Learn": six topics, a dilemma from a meeting, the resource library,
│                           #   Mercurius AI (the tutor we built)
├── events.html             # When and where we meet; coming up and earlier (from events-data.json)
├── blog.html               # "The AI Literacy Review": every piece, newest first (from blog-content.json)
├── blog-post.html          # One piece, chosen by ?id= (renders blog-content.json; inline script)
├── blog-anthropic-pentagon.html  # Nathan Dozois's long read: its own page. Only the shell is ours;
│                           #   never edit its <article>, masthead, images or inline CSS
├── mercurius.html          # Mercurius AI, the club's iPhone tutor
├── 404.html                # Not found (noindex)
├── styles.css              # THE stylesheet (/styles.css?v=8), tokens first, numbered sections
├── script.js               # THE script (/script.js?v=7): menu, dates, JSON fetch, Story builder
├── blog-content.json       # ★ The Review's pieces. The Mercurius backend reads it too
├── events-data.json        # ★ The schedule and events. The Mercurius backend reads it too
├── _redirects              # Old URLs → new homes (/board, /groups, /resources, /instagram)
├── sitemap.xml, robots.txt, favicon.ico, logo.png, icons/
├── sw.js                   # Self-unregistering: removes the old chat widget's service worker
└── assets/
    ├── seal-circle-192.png, seal-circle-320.png   # the seal: header 40px, footer 96px, nowhere else
    ├── board-{shyam,nathan,adam,niko}.jpg         # board headshots
    ├── photos/             # EXIF-free JPGs (the fallbacks)
    ├── work/               # WebP versions and cuts (the hero band, the interest meeting)
    ├── artifacts/          # club artifacts shown as documents (cleared in docs/artifacts.md §4)
    └── app-store-badge.svg, mercurius-logo-dark.*, og-image.jpg, dermatology-partners.svg (unused: #10)
tools/                      # local preview and checks (not published)
docs/                       # internal docs (not published)
netlify.toml                # publish dir, security headers and the CSP
```

Every page shares one shell (head tail, header, footer, script tag), with `index.html` as the reference: `docs/shell.md`. A page that needs something new adds it to `styles.css` or `script.js` (or an inline page script); no page loads a second stylesheet or script file.

## Components

All in `styles.css`, documented with markup in `docs/design-system.md`. The type is Newsreader (headings, reading text) and Source Sans 3 (nav, buttons, labels, captions, forms); the palette is Parchment, Ink, Forest, Deep Forest, Gold and Light Gold, with every text pair at WCAG 2.2 AA or better.

| Component | Class | Where |
|---|---|---|
| Section | `section.frame > .section` (4px Forest rule, H2, content) | every page |
| Page title | `.pagehead` (eyebrow, H1, standfirst, actions, aside) | inner pages |
| The lead (two voices) | `h1.lead` > `.lead__sans` + `.lead__serif` | home, `/join`, `/chapters` only |
| Record rows | `dl.rows` (`--stack`, `--across`, `--across-tablet`) | logistics, requirements, citations |
| Definition rows | `.defs` | `/chapters`, `/about` |
| Chapter | `.chapters > .chapter` (number, H3, who it's for, facts, rows, status, actions) | the routes on home, `/join`, `/chapters` |
| Story | `.story` (eyebrow, linked title, byline, standfirst, link); `mayo.story()` / `mayo.reviewStory()` | home, The Review, post pages |
| Resource | `.resource` (an artifact with annotated notes); `.resource--compact` in `.reslist` | home, Learn |
| Topic | `.topic-list > .topic` | Learn |
| Figure | `figure.photo` (+ `--landscape`, `--band`) with a dated `.caption` | photos |
| Steps, notes, people, tables, citation, app | `.steps`, `.note`, `.people`, `.table`, `.citation`, `.app` | see design-system.md |
| Form | `.form`, `.choices`, `.fieldgroup`, `.field`, `.status` | `/join` |
| Long-form | `.longform` (66ch at the reading size), `.post-notes`, `.pager` | post pages, About, Mercurius |

Buttons are `.btn` (solid Forest, one per screen area) and `.btn--secondary` (outlined); text links are `.tlink` with an `aria-hidden` arrow. No gradients, shadows, rounded cards, icons beside headings or scroll animation.

## Preview

```bash
python3 tools/serve.py          # http://127.0.0.1:8150 (or: python3 tools/serve.py 8160)
```

`tools/serve.py` serves `mayo-site/` the way Netlify does for our purposes: clean URLs (`/join` serves `join.html`), and `404.html` with status 404 for unknown paths. **Form posts are mocked**: nothing reaches Netlify or the club's inbox. Each submission is appended to `tools/.dev-inbox.jsonl` (gitignored). To see the other states, submit with these exact names:

| Name | Result |
|---|---|
| `Test Failure` | 500: the page keeps every input and shows the failure message |
| `Test Slow` | a 4-second delay, then 200: the "Sending…" state |
| `Test Offline` | a dropped connection: the network failure message |

A post without `form-name` gets 400, like a form Netlify doesn't know. Never test against the live site.

## Checks

Run them from the repo root with the preview running. The browser checks drive headless Chrome over the DevTools protocol (`/Applications/Google Chrome.app`) and exit 1 on any finding.

```bash
node tools/check-join.mjs                     # /join: 282 checks (below)
node tools/check-text.mjs http://127.0.0.1:8150/chapters 360,390,768,1280,1440
SHOOT_WAIT=800 node tools/shoot.mjs http://127.0.0.1:8150/join .shots/join 360,390,768,1280,1440
python3 tools/check-shell.py                  # every page's shell, versions, no Hold facts in comments
node tools/check-links.mjs                    # every internal link, #anchor and asset; no third-party requests
```

- **`check-join.mjs [url]`** clicks, types and tabs through `/join`: the static form Netlify needs, the route labels, the eligibility sentence, the "Your first Thursday" facts, the title and descriptions (no reply-time promise anywhere), the no-JS layout, every route's fields and submit label, the hash preselects (and the founder-form button on screen when `/join#start-a-chapter` loads at 1280 and 1440), validation, sending, success (only on `res.ok`, with the exact fields posted per route, read from the dev inbox), failure and offline with a retry, Tab order with a visible focus ring, the phone menu (including Tab past Join to "Skip to content"), and fit at 360 and 390. `CHECK_SHOTS=<dir>` saves a screenshot of each state.
- **`check-text.mjs <url> [widths]`** finds text printed over other text, text spilling out of its box, a "·" ending a line, and text off the page (default widths 320–1440). The Pentagon page reports one known problem inside its untouched article (content-needs #47).
- **`shoot.mjs <url> <prefix> [widths]`** writes `<prefix>-<w>.png` (full page) and `<prefix>-<w>-fold.png` (first screen: 844px tall on phones, 900 on desktop) and prints the page height and any sideways overflow. `SHOOT_SCROLL=1` scrolls first so lazy images render; `SHOOT_WAIT=<ms>` adds settle time. It reports `fold=blank` if a first screen still comes out one flat colour. Keep screenshots under `.shots/` (gitignored).
- **`check-shell.py`** compares every page's head tail, header, footer and script tag with `index.html`, checks `aria-current`, the metadata pattern and the cache-busters, and fails if any published comment (`<!-- -->`, `/* */`, `//`) names Hold material. Netlify serves the HTML, CSS and JS as written, so anyone can read the comments: cite `docs/content-needs.md` numbers instead.
- **`check-links.mjs [base]`** renders every page (including the post pages built from the JSON) and checks every internal href, `#fragment`, image, `srcset` candidate and script; any request to a host other than Google Fonts; `rel="noopener"` on external links; console errors.

**Cache-busters:** after any change to `styles.css` or `script.js`, bump `?v=` on **every** page in the same change (`check-shell.py` fails if two pages differ).

## The two JSON files

`blog-content.json` and `events-data.json` are load-bearing: the Mercurius backend (Railway) fetches both hourly, at exactly these paths, and gives them to the tutor as live context. **Never rename, move or redirect them, and keep their keys.** The site renders from the same files through `script.js` (`mayo.fetch`), and every page has static HTML as the fallback, so a page still reads correctly if the JSON doesn't load.

### Publish a piece in The AI Literacy Review

1. Add an object to `blog-content.json`:

   ```json
   {
     "id": "short-kebab-id",
     "title": "The title as the writer wrote it",
     "date": "March 19, 2026",
     "author": "Full Name",
     "category": "Meeting Recap",
     "summary": "One or two sentences. The first sentence is the card's standfirst.",
     "content": "Paragraphs separated by a blank line.\n\n## A heading\n\nText with **bold** and *italic*.\n\n> A pull quote\n> — Its source"
   }
   ```

   `date` is "Month D, YYYY" (an ISO `YYYY-MM-DD` also works). Order on the site is by date, newest first; pieces with the same date keep their order in the file. `category` becomes the Story's eyebrow in sentence case ("Meeting recap"); "recap" or "announcement" in it sets the link text ("Read the recap", "Read the announcement", otherwise "Read the essay").
2. The piece is then live at `/blog-post?id=<id>`, on The Review and in the backend (within about an hour). Then, by hand:
   - **`blog.html`:** update the static list (the no-JS fallback) to match the JSON: it is written from the same data, and the page shouldn't move when the script rebuilds it.
   - **`blog-post.html`:** add the piece to `POST_TOPICS` if it belongs to a Learn topic (it then gets a "Topic" row in its notes). The writers may want a say (content-needs #63).
   - **`sitemap.xml`:** add `https://mayoailiteracy.com/blog-post?id=<id>`.
   - **The homepage's Story band is curated, not automatic:** it changes only by editing `index.html`.
   - A piece with its own page (like the Pentagon long read) goes in `CUSTOM_URLS` in `script.js`, and every link to it goes there instead.
3. Sign and date every piece; quote only published words; a new member's name needs their consent first (content-needs #24).

### Change the schedule or add an event

`events-data.json` has three parts:

```json
{
  "schedule": { "day": "Every Thursday", "time": "8:20 AM", "location": "MHS Library Classroom", "openTo": "All MHS Students" },
  "upcoming": [ { "date": "2026-10-15", "title": "Title", "description": "One or two lines.", "time": "8:20 AM", "location": "MHS Library Classroom" } ],
  "past":     [ { "date": "2026-03-19", "title": "Title", "description": "…", "recapUrl": "https://mayoailiteracy.com/blog-post.html?id=…" } ]
}
```

- `schedule` fills every `[data-schedule]` on the site (the hero's "This Thursday", `/join`'s "Your first Thursday", the footer, `/about`, `/events`). Change the static text in the pages too, so the no-JS fallback agrees.
- An `upcoming` entry dated today or later shows on `/events` under "Coming up", and as a "Next:" line on the homepage and `/join`. Once its date passes it moves to "Earlier on the calendar" by itself; move it into `past` when convenient. `time` and `location` are optional.
- `past` entries show only the date, the title and a "Read the recap" link when `recapUrl` is set (the descriptions were written as previews). Live-domain URLs are rewritten to the visitor's host.
- Add only meetings that happened as listed. Several dates are open questions (content-needs #3–#5, #26, #41, #45).

## The participation form (`/join`)

One Netlify form, so existing notifications keep working: `name="contact"`, `data-netlify="true"`, `netlify-honeypot="bot-field"`, the hidden `form-name=contact`. Every field is in the static HTML, so Netlify registers it at deploy. No field name appears twice.

| Route (`route`, radio, required) | Shows | Required | Submit label |
|---|---|---|---|
| `mayo-student`: "A Mayo High School student" | name, email, grade (9–12), experience, message ("Anything you'd like us to know") | name, email, grade | Leave your name |
| `other-school-student`: "A student at another school" | name, email, school ("School name and city"), grade (optional), message | name, email, school | Send my interest |
| `supporter`: "A teacher, advisor, parent or partner" | name, email, role (Teacher or school staff · Interested in advising a chapter · Parent or guardian · Organization or sponsor · Something else), organization (optional), message ("How would you like to help?") | name, email, role, message | Send your message |

- **With JS:** only the chosen route's fields show; the others are hidden **and disabled**, so they are neither posted nor validated. The post goes by `fetch` (urlencoded, to `/join`). States: invalid (inline errors with `aria-invalid`, a summary in `role="alert"`, focus on the first problem), sending ("Sending…", no double submit), success (only after `res.ok`; the form is replaced by a focused `role="status"` confirmation: "We will email you", plus "or just come on Thursday" for Mayo students), failure (every input kept, a retry, Instagram @mayoailiteracy as the fallback).
- **Without JS:** every group shows under its heading, only route, name and email are required, the browser validates, and Netlify shows its own confirmation page.
- **Links into it:** `/join#join-a-chapter`, `#start-a-chapter` and `#support` land on the three routes; `#form-mayo`, `#form-other-school` and `#form-supporter` preselect a route and focus the form; `#leave` is the form. The homepage, `/chapters`, `/about` and `/events` use these.
- **Chapter founders** don't use this form: they go to the founder form on Google Forms (https://forms.gle/jVNaM7yyTtLLCDwv8), always labelled "Open the founder form (Google Forms)" with the note "Opens in a new tab and takes about three minutes."
- After the first deploy, check that Netlify lists the four new fields (`route`, `school`, `role`, `organization`) and that a notification shows them (content-needs #65).

## Rules for any change

- **Name:** "Mayo AI Literacy Club". The AACA work is a **poster** ("Teaching the Pause"), never a talk. The Mayo Clinic sentence ("The meeting was hosted at Mayo Clinic. Mayo High School is a Rochester public high school; neither it nor this club is affiliated with Mayo Clinic.") goes next to every AACA mention, and the non-affiliation disclaimer stays in every footer.
- **Truth:** no invented chapters, testimonials, counts, partners, dates, quotes or reply times. Anything missing goes in `docs/content-needs.md`, never on the page as a placeholder. Facts marked **Hold** in `docs/participation-redesign.md` stay off the site, including in HTML, CSS and JS comments.
- **Privacy:** no personal email addresses or phone numbers; no clock times from photos.
- **Images:** real club photos only, as EXIF-free web versions in `mayo-site/assets/` (strip metadata with Pillow; check that `Image.open(f).getexif()` is empty), with `srcset`/`sizes` and `width`/`height`, lazy below the fold, and a caption with the date in words. The November 20, 2025 photo is served on inner pages only as the band cut above the laptop (WebP and JPG), while content-needs #23 is open.
- **CSP** (`netlify.toml`): images, scripts and fetches come from this site only (plus Google Fonts for type). Self-host everything; no external scripts or embeds.
- **Every action is real:** each button says what happens and goes somewhere that does it. Focus is always visible; targets are at least 44px.

## Deploy

Netlify site with **publish directory `mayo-site`**, no build command, auto-deploys on push to `main`. Only after the ship gate (#42) is cleared and the founders have reviewed the branch:

1. **Forms:** form detection on (Site configuration → Forms) with a notification email a board member reads (content-needs #1, #17, #65). The form is `contact`.
2. **After the deploy:** `curl -s https://mayoailiteracy.com/blog-content.json | head` and `curl -s https://mayoailiteracy.com/events-data.json | head` (the backend depends on both), and check `/join`'s anchors from the homepage.

## Docs (`docs/`, not published)

| File | What it is |
|---|---|
| `participation-redesign.md` | The build spec: ground rules (§0), verified facts (§1, plus the artifact facts marked Usable or Hold), the visual system (§2), `/join` (§3), `/chapters` (§4), the homepage (§5). It wins on any conflict. |
| `design-direction.md` | The approved art direction: what we borrow from the references, what we avoid, how it stays ours, the Story, Chapter and Resource components, and the second pass. |
| `design-system.md` | Tokens, type scale, contrast ratios, grid and spacing, every component with markup, the script API and the checks. |
| `shell.md` | The shared head, header, footer and script tag; the cache-busters; the Pentagon page's shell. |
| `content-needs.md` | Every missing or unconfirmed fact and asset, numbered, with where its answer would go. The founders' list. |
| `artifacts.md` | The club's real artifacts (poster, decks, lesson pack, photos) and which are cleared for the site. |
| `references/` | Notes on the reference sites (Eames Institute, Hack Club, Obama Foundation, d.school, The Creative Independent, Geist). |
