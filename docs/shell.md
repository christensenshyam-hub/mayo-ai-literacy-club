# The page shell (October 6, 2026)

Internal. Not published. Every page in `mayo-site/` carries the same shell: the same `<head>` tail, header, footer and script tag. Only the page's own metadata, `aria-current`, the `<main>` and any page script change. `index.html` is the reference: it is the approved first pass (a35e39d), and `python3 tools/check-shell.py` compares every other page with it.

Components and their markup are in `design-system.md`. The art direction is `design-direction.md`.

## Files and versions

| File | Loaded as | Bump when |
|---|---|---|
| `mayo-site/styles.css` | `/styles.css?v=8` | any change to it |
| `mayo-site/script.js` | `/script.js?v=7` | any change to it |

- Bump the number on **every** page in the same change; `tools/check-shell.py` fails if two pages disagree with `index.html`.
- `next.css` and `next.js` are gone: `next.css` became `styles.css`, and `next.js` (the menu's `inert` and focus-out) is merged into `script.js`. The old `styles.css` (Josefin Sans, Space Mono, the left rail) is retired. Nothing may load `next.*`.
- *Integration (October 6):* the page builds' interim files are merged too. `styles-join.css`, `styles-chapters.css` and `styles-learn-review.css` are in `styles.css` (each component in its own section), and `learn-review.js` is in `script.js` (`mayo.reviewStory`, `readLabel`, `writers`, `andList`). The files are deleted. **No page loads a second stylesheet or script file:** a page that needs something new adds it to `styles.css` / `script.js` (or an inline page script) and bumps both versions everywhere. `tools/check-shell.py` fails on any extra `<link rel="stylesheet">` or `<script src>`.

## Page skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
  …head (below)…
</head>
<body>
  …skip link and header (below)…

  <main id="main">
    …the page: a page title, then sections (design-system.md)…
  </main>

  …footer (below)…

  <script src="/script.js?v=7" defer onerror="document.documentElement.classList.remove('js')"></script>
  …the page's own inline <script>, if it has one (it waits for DOMContentLoaded)…
</body>
</html>
```

- `<main id="main">` holds no wrapper of its own. Each block inside it brings its own `.frame` (`<header class="frame pagehead">`, `<section class="frame">`), except a full-bleed `.band`, which holds a `.frame`.
- `script.js` and `#main` / `.ft` are what the menu needs: it makes `main` and the footer `inert` while the phone menu is open.

## `<head>`

Page metadata first, then the fixed tail. The metadata pattern:

```html
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#122e1e" />
  <title>{Page name} — Mayo AI Literacy Club</title>
  <meta name="description" content="{one or two plain sentences: what the page is for}" />
  <link rel="canonical" href="https://mayoailiteracy.com/{clean path}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Mayo AI Literacy Club" />
  <meta property="og:title" content="{Page name} — Mayo AI Literacy Club" />
  <meta property="og:description" content="{as the description, or a shorter version}" />
  <meta property="og:url" content="https://mayoailiteracy.com/{clean path}" />
  <meta property="og:image" content="https://mayoailiteracy.com/assets/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="The Mayo AI Literacy Club seal beside the club's name" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{Page name} — Mayo AI Literacy Club" />
  <meta name="twitter:description" content="{as og:description}" />
  <meta name="twitter:image" content="https://mayoailiteracy.com/assets/og-image.jpg" />
```

- **Title:** "{Page name} — Mayo AI Literacy Club" (an em dash with spaces). The homepage is just "Mayo AI Literacy Club". Page names match the nav: About, Start a chapter (`/chapters`), Learn (`/topics`), Events, The AI Literacy Review (`/blog`), Mercurius AI, Join.
- **Canonical and og:url** use the clean URL (`/about`, not `/about.html`). Exceptions: `blog-post.html` has neither (its script adds the post's own canonical), and `404.html` has `<meta name="robots" content="noindex" />` and no canonical. `blog-anthropic-pentagon.html` keeps its `.html` URL.
- **Descriptions** state only verified facts, with no response-time promise.

The fixed tail, exactly:

```html
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/icons/favicon-32.png" type="image/png" sizes="32x32" />
  <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400;1,6..72,500&family=Source+Sans+3:wght@400;600;700&display=swap" />
  <link rel="stylesheet" href="/styles.css?v=8" />
  <script>document.documentElement.className += ' js';</script>
</head>
```

- The inline `js` class lets CSS tell a JS page from a no-JS page (the phone menu shows inline without JS). The `onerror` on the `script.js` tag takes the class off again if the file fails to load.
- **CSP** (`netlify.toml`): styles from self, inline and fonts.googleapis.com; fonts from fonts.gstatic.com; scripts from self and inline; images from self and `data:`; `connect-src 'self'`. So: self-host every image, no external scripts, no fetches to other hosts, no other font services.

## Header

Exactly this, with `aria-current="page"` added as in the table below:

```html
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header">
    <div class="frame hd">
      <a class="hd__brand" href="/">
        <img class="hd__seal" src="/assets/seal-circle-192.png" alt="" width="40" height="40" />
        <span class="hd__name"><span>Mayo AI</span> <span>Literacy Club</span></span>
      </a>
      <a class="btn hd__join" href="/join">Join</a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="site-nav" id="site-nav" aria-label="Main">
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/chapters">Chapters</a></li>
          <li><a href="/topics">Learn</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/blog">The Review</a></li>
          <li class="site-nav__join"><a href="/join">Join</a></li>
        </ul>
      </nav>
    </div>
  </header>
```

**`aria-current="page"`** goes on the link (or links) for the page you are on, in the header and in the footer's Pages list:

| Page | Header | Footer |
|---|---|---|
| `index.html` | `.hd__brand` | none |
| `about.html` | About | About |
| `chapters.html` | Chapters | Chapters |
| `topics.html` (Learn) | Learn | Learn |
| `events.html` | Events | Events |
| `blog.html`, `blog-post.html`, `blog-anthropic-pentagon.html` | The Review | The Review |
| `mercurius.html` | none (it isn't in the main nav) | Mercurius AI |
| `join.html` | both Join links: `.hd__join` and `.site-nav__join a` | Join |
| `404.html` | none | none |

How it behaves (all in `styles.css` §6 and `script.js`):
- **From 1000px:** the seal (40px, never masked or redrawn), the name in Newsreader 600, and the nav; Join is outlined in Forest. `.hd__join` and Menu are hidden. The current page gets a 2px Forest underline.
- **Below 1000px:** the seal and name, a solid Join (`.hd__join`) and Menu, a plain underlined text control with a 44px target. Menu opens the list as a Deep Forest panel with a 4px Gold rule and a Light Gold Join. While it is open, `main` and `.ft` are `inert`, Escape closes it and returns focus to Menu, following a link closes it, and focus landing anywhere outside the header closes it (a `focusin` listener: Tab past Join wraps through the browser to "Skip to content", which then works; *final pass, October 7*). No second seal in the panel.
- **Below 360px** (or under user text-spacing, WCAG 1.4.12) each half of the name may wrap, so Menu never runs off the screen; at 360 and up nothing changes.
- **Without JS:** Menu is hidden and the list shows inline under the name.
- `script.js` fills in `aria-current` only if a page forgot it; don't rely on that.

## Footer

Exactly this (add `aria-current="page"` per the table above):

```html
  <footer class="ft">
    <div class="frame">
      <div class="grid ft__grid">
        <div class="ft__about">
          <img class="ft__seal" src="/assets/seal-circle-192.png" alt="" width="96" height="96" loading="lazy" decoding="async" />
          <p class="ft__name">Mayo AI Literacy Club</p>
          <p>A student-run club at Mayo High School, Rochester, Minnesota.</p>
        </div>
        <div class="ft__meets">
          <h2 class="ft__label">Meets</h2>
          <p><span data-schedule="weekdays">Thursdays</span>, <span class="tnum" data-schedule="time">8:20 AM</span><br /><span data-schedule="location">MHS Library Classroom</span><br />For Mayo High School students</p>
        </div>
        <nav class="ft__nav" aria-label="Footer">
          <h2 class="ft__label">Pages</h2>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/chapters">Chapters</a></li>
            <li><a href="/topics">Learn</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/blog">The Review</a></li>
            <li><a href="/mercurius">Mercurius AI</a></li>
            <li><a href="/join">Join</a></li>
          </ul>
        </nav>
        <div class="ft__else">
          <h2 class="ft__label">Elsewhere</h2>
          <ul>
            <li><span class="ft__k">Instagram</span> <a href="https://www.instagram.com/mayoailiteracy" rel="noopener">@mayoailiteracy</a></li>
            <li><span class="ft__k">Mercurius AI</span> <a href="https://trymercurius.com" rel="noopener">trymercurius.com</a></li>
          </ul>
        </div>
      </div>
      <div class="ft__legal">
        <p>Mayo AI Literacy Club is a student organization. Nothing on this site implies endorsement by any district, school, or organization named. Mayo High School is a Rochester public high school; neither it nor this club is affiliated with Mayo Clinic, where the <abbr title="American Association of Clinical Anatomists">AACA</abbr> meeting was hosted.</p>
        <p>© <span id="year">2026</span> Mayo AI Literacy Club</p>
      </div>
    </div>
  </footer>
```

- The full non-affiliation disclaimer is in every footer. **Inside a page,** any mention of the AACA meeting also carries the Mayo Clinic sentence beside it: "The meeting was hosted at Mayo Clinic. Mayo High School is a Rochester public high school; neither it nor this club is affiliated with Mayo Clinic." (as `.meta`, or as `.citation__note` under the citation).
- The `data-schedule` spans are filled from `events-data.json` `schedule` by `script.js`; the text in the HTML is the fallback. `#year` is set to the current year.

## Scripts

```html
  <script src="/script.js?v=7" defer onerror="document.documentElement.classList.remove('js')"></script>
```

- One shared file. A page's own script is inline, after this tag, and starts with `document.addEventListener('DOMContentLoaded', …)` so `window.mayo` exists (the shared file is `defer`).
- `script.js` exposes `window.mayoFetch` and `window.mayo` (the list is in the file's header comment and in `design-system.md`). Use `mayo.el` to build DOM: text is always set as text, never as HTML.
- No external scripts, ever (CSP).

## The Pentagon long read (`blog-anthropic-pentagon.html`)

Only its shell is ours. Its `<article>`, masthead, images, inline `<style>` and its own inline script are never edited.
- It has the standard head tail plus, between the shell's fonts link and `styles.css`, its own fonts link (Josefin Sans, Space Mono and Newsreader 300/700, which its CSS needs). The two are commented in the file.
- `<body class="pentagon">` turns on `styles.css` §20: the article's CSS sets `html { font-size: 18px }` and styles every bare `h1`/`h2`, so §20 restates the shell's type tokens in px and undoes the base rules the article never had. With it, the header and footer measure exactly as on `/blog`, and the article renders pixel for pixel as it did at HEAD (checked at 390, 768 and 1440).
- Its old dark sign-off band (`.site-footer`, with a second seal) stays in the file and is hidden.

## Checks

- `python3 tools/check-shell.py`: every page against `index.html` (head tail, header, footer, script tag, versions), `aria-current` in the header and the footer per the table above, the head metadata pattern (title suffix, og/twitter titles and image, canonical = og:url on the clean URL, the blog-post and 404 exceptions), and no extra stylesheet or script file. Exits 1 on any difference.
- `node tools/check-links.mjs`: renders every page in headless Chrome (each post page too, so script-built links count) and checks every internal href (through `_redirects` where only Netlify handles a path), every `#fragment` against the rendered target, every image, srcset candidate, icon, stylesheet and script, every request (nothing from another host but Google Fonts; nothing failing), `rel="noopener"` on every external link, and console errors. Exits 1 on any finding.
- `node tools/check-text.mjs <url>`: text over text, spill, a dot ending a line, text off the page, at 320–1440.
- `SHOOT_WAIT=800 node tools/shoot.mjs <url> <prefix> 360,390,768,1280,1440` (add `SHOOT_SCROLL=1` for lazy images): full pages, first screens and overflow. Shots go in `.shots/`.
