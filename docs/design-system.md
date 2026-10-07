# Design system (October 6, 2026; final pass October 7)

Internal. Not published. The code is `mayo-site/styles.css?v=8` and `mayo-site/script.js?v=7`, loaded by every page, and nothing else is (no page stylesheet, no helper script). They were the homepage first pass (`next.css` and `next.js`, approved at a35e39d); the old `styles.css` is retired. The page builds' interim files (`styles-join.css`, `styles-chapters.css`, `styles-learn-review.css`, `learn-review.js`) were merged in on October 6 and deleted; their components are documented below, in the sections that follow the stylesheet's own order. The page shell (head, header, footer, script tag, `aria-current`) is in `shell.md`. What the second pass changed, and why, is in `design-direction.md` §7. The art direction is `design-direction.md`; on any conflict `participation-redesign.md` wins.

**Class conventions.** Components are BEM-ish: a block (`.story`), its parts (`.story__title`) and its variants (`.story--featured`). Layout helpers have no prefix (`.frame`, `.grid`, `.section`, `.band`, `.flow`), and so do type roles (`.lead`, `.h1`, `.standfirst`, `.reading`, `.label`, `.meta`, `.hint`, `.caption`). No page-specific classes: if a page needs something new, add a component (or a variant) here and in `styles.css`, in the same language. Headings and labels are Ink; Forest means "you can act on this" or structure.

## Fonts

- **Newsreader** (OFL): H1–H3, standfirsts, reading text, record values, and the second voice of the lead. Roman 400 and 600, italic 400 and 500, `font-optical-sizing: auto`.
- **Source Sans 3** (OFL, Adobe): the first voice of the lead (700, −0.02em), nav, buttons, labels, captions, bylines, status lines and form text (400, 600, 700).
- **Why Source Sans 3 over Public Sans** (trial renders in `.shots/specimen/lead-*`): at 1440 its bold clause sets in two lines where Public Sans needs three, and its narrower, darker set is the closest open cousin of the Eames gothic. Public Sans read wider and softer beside the Newsreader italic.
- **Departure from spec §2:** the sans is set large only in the lead, on home, `/join` and `/chapters`. Every other heading is Newsreader. Fallback if the founders object: the same split in Newsreader, 600 roman then italic 500.
- **Retired:** Josefin Sans and Space Mono, everywhere except inside the Pentagon long read's own article, which keeps its design (`shell.md`).
- **No layout shift on font swap:** `styles.css` declares metric-matched local fallbacks ("Source Sans 3 fallback" on Arial, "Newsreader fallback" on Georgia) with `size-adjust` set from measured width ratios per weight. With Google Fonts blocked, the first-screen layout moves by 6px at 390 and 15px at 1440.
- Google Fonts URL: `Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400;1,6..72,500` and `Source+Sans+3:wght@400;600;700`, `display=swap` (exact link in `shell.md`).

## Type scale (fluid between 390 and 1440 with `clamp()`)

| Role | Face and weight | Phone → desktop | Line height | Token, class |
|---|---|---|---|---|
| Lead (one per page; home, `/join`, `/chapters` only) | Source Sans 3 700, then Newsreader italic 500 | 40 → 64 | 1.02 | `--fs-lead`, `.lead` |
| H1 (every other page title) | Newsreader 600 | 36 → 56 | 1.05 | `--fs-h1`, `.h1` |
| Story band question (the band's H2) | Newsreader 600 | 30 → 44 | 1.1 | `--fs-feature`, `.question` |
| H2 | Newsreader 600 | 26 → 34 | 1.15 | `--fs-h2` |
| H3, component title, standfirst | Newsreader 600 / 400 | 21 → 26 | 1.2 / 1.35 | `--fs-h3`, `.standfirst` |
| Reading body | Newsreader 400 | 18 → 21 | 1.6 | `--fs-read`, `.reading`, `.longform` |
| Body in lists, rows and asides | Newsreader 400 | 18 | 1.5–1.55 | `--fs-body` |
| Nav, buttons, text-link actions, status, field labels | Source Sans 3 600 / 400 | 16 | 1.25–1.5 | `--fs-ui` |
| Form input | Source Sans 3 400 | 18 | 1.4 | `--fs-input` |
| Caption, meta, hint, byline | Source Sans 3 400 | 14 → 16 | 1.45 | `--fs-cap`, `.caption`, `.meta`, `.hint` |
| Label, eyebrow (sentence case) | Source Sans 3 600 | 14 | 1.3 | `--fs-label`, `.label` |
| The name in the header / the open menu's links | Newsreader 600 / Source Sans 3 600 | 17 → 19 / 21 | 1.1 / 1.25 | `--fs-brand`, `--fs-menu` |

Rules: headings `text-wrap: balance`; the lead 22ch, H1 20ch, H2 24ch, the Story question 28ch; paragraphs `pretty`, at most 66ch; labels, dates, times and numbers `lining-nums tabular-nums`. Featured and companion Story titles are the same H3 size. Headings and labels are Ink, not Forest. Labels are sentence case, never all caps (`mayo.sentenceCase()` turns the JSON's title-case categories into sentence case, keeping words in capitals such as "AI").

## Colour roles and contrast (WCAG 2.2, computed)

| Pair | Ratio | Use |
|---|---|---|
| Ink #1a1714 on Parchment #faf8f4 | 16.83:1 | body text, lead sans clause |
| Forest #1B4D32 on Parchment | 9.19:1 | links (and the underline under linked story and resource titles), button, rules, numbers, focus ring, the lead's serif clause. Not headings or labels |
| Ink on Parchment, as headings and labels | 16.83:1 | H1–H3, eyebrows, labels |
| Parchment on Forest | 9.19:1 | primary button |
| Muted text #5e6b60 on Parchment | 5.28:1 | captions, meta, hints, row labels |
| Ink on Tint #edf4ef | 15.97:1 | Story band text; a chosen radio card; a confirmation |
| Forest on Tint | 8.72:1 | Story band headings and links; the chosen card's 2px edge |
| Muted text on Tint | 5.01:1 | Story band bylines; hint on a chosen card |
| Error #a3241a on Parchment | 7.01:1 | field errors, in words, always with the field |
| Error on Field #fffdf9 | 7.32:1 | the error summary's first line |
| Ink on Field | 17.57:1 | typed text |
| Muted text on Field | 5.52:1 | placeholder-free hints inside a choice |
| Field line #5e6b60 on Field / on Parchment | 5.52:1 / 5.28:1 | text-field and choice borders (past the 3:1 non-text rule) |
| Parchment on Muted text #5e6b60 | 5.28:1 | a disabled button |
| Forest on Field | 9.60:1 | focus ring on fields |
| Parchment on Deep Forest #122e1e | 13.79:1 | footer, phone menu |
| Light Gold #E8B84B on Deep Forest | 7.94:1 | footer labels, focus ring on dark |
| Deep Forest on Light Gold | 7.94:1 | the phone menu's Join button |
| #dfe7e1 on Deep Forest | 11.60:1 | footer fine print |
| Gold #C9922A on Deep Forest | 5.32:1 | 4px rule on top of the footer and phone menu |
| Gold on Parchment | 2.60:1 | never text, state or required edge (the seal only) |
| Rule #d4e0d8 on Parchment | 1.28:1 | hairlines, decorative only |
| Rule on Tint #c9d8ce on Tint | 1.32:1 | hairlines inside the Story band, decorative only |

The brand's Muted #6b7a6e (4.27:1) is never used for text. Tokens added for the rollout: `--error` (#a3241a, from `design-direction.md` §5), `--field` (#fffdf9, the field ground) and `--field-line` (= Muted text). The error colour is functional and never decorative; it always comes with words.

## Grid and spacing

- Content at most 1280px; side margin `clamp(16px, 5.5vw, 80px)`.
- 4 columns / 16px gutter below 768; 8 / 24px from 768; 12 / 24px from 1024. Below 1024 every named span is one column in reading order.
- Named spans in a `.grid`: `.span-lead` (1–7), `.span-wide` (1–8), `.span-aside` (9–12), `.span-full`. Outside a grid, `.w-lead` and `.w-wide` cap a block at the same widths from 1024 (full width below). Thirds (the Chapter row) use a 3-column grid with 1px hairlines centred in the gutters. The Story pair puts its hairline in the middle of the empty column 8 (`--col`).
- Spacing scale 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 (`--s1`…`--s9`). Sections are 64px apart on phones and 96px from 1024 (`--section-gap`).
- A section opens: 4px Forest rule, 16px, (eyebrow,) H2, 24px, content (`.section`, `.section__head`). `.flow` stacks blocks 24px apart where a section holds several; a `.label` directly over a list (`.rows`, `.defs`, `.hairlist`, `.story-list`, `.people`) sits 8px above it. A row of jump links under a section heading (`.section__head .links`) sits 8px under it.
- `.grid--gap` adds a 32px row gap to a `.grid` whose blocks stack below 1024 (a closing `.links` row then takes no margin of its own). (`.grid--dense` is gone: `/chapters`' "What you'd teach" moved under its photo, across the thirds, so nothing needed it.)
- **Deep links** land 24px below the window's top (`main [id] { scroll-margin-top: 24px }`). Put a section's id on the `section.frame` or on its `div.section`: both land with the 4px rule 24px down, because the section's margin collapses through the frame. `/join`'s radios keep their own, larger margin (Forms).
- Radius 0 on buttons and bands, 2px on photos and fields. No shadows, gradients or animation.

## Page structure

Every page is the shell (`shell.md`) around `<main id="main">`, which holds, in order:

1. **A page title**: the homepage hero, or `.pagehead` on every other page.
2. **Sections**, each `<section class="frame" aria-labelledby="…"><div class="section">…</div></section>`, or a full-bleed `.band`.

```html
<section class="frame" aria-labelledby="x-heading">
  <div class="section">
    <div class="section__head">
      <p class="label">Eyebrow (optional)</p>
      <h2 id="x-heading">Section heading</h2>
      <p class="reading">Optional intro, at the reading size.</p>   <!-- or .hint / .meta for a small note -->
    </div>
    …content: one component, or several inside <div class="flow">…
  </div>
</section>
```

The Tint band (only behind a featured Story):

```html
<section class="band" aria-labelledby="y-heading">
  <div class="frame"><div class="section">…</div></div>
</section>
```

## Components

### Page title (`.pagehead`), inner pages

Eyebrow → H1 → standfirst → actions (and a note) in columns 1–7; an optional aside in 9–12, top-aligned (a record, the app badge); an optional photo under it. 24px top padding on phones, 64px from 1024.

```html
<header class="frame pagehead">
  <div class="grid">
    <div class="pagehead__main span-lead">
      <p class="label pagehead__eyebrow">Learn</p>                     <!-- optional -->
      <h1 class="h1" id="title">Six topics we come back to on Thursdays.</h1>
      <p class="standfirst">One or two plain sentences.</p>
      <p class="pagehead__byline">…</p>                                  <!-- post pages only -->
      <p class="pagehead__acts"><a class="btn" href="…">Do the thing</a> <a class="tlink" href="…">Read more<span class="arrow" aria-hidden="true"> →</span></a></p>
      <p class="hint pagehead__note" id="acts-note">What the button leads to, or how long it takes.</p>
    </div>
    <div class="pagehead__aside span-aside">…a dl.rows.rows--stack, an .app…</div>   <!-- optional -->
    <figure class="photo photo--landscape pagehead__photo span-lead">…</figure>      <!-- optional -->
  </div>
</header>
```

- On `/join` and `/chapters` the H1 is the lead instead: `<h1 class="lead" id="title"><span class="lead__sans">Find your place</span> <span class="lead__serif">in the movement.</span></h1>`. No other inner page uses the lead.
- An external action's new-tab behaviour is said in the label or tied to it with `aria-describedby` (the note).
- A hidden first child of the aside (`p.hero__next[hidden]`, `/join`) takes no room: the block after it starts at the aside's top.
- `.pagehead__photo` is either a `span-lead` figure or, for the November 20, 2025 photo, the Band figure across the frame (`span-full`, `/about`).

### Hero (home only: `.hero`)

As approved: the lead in 1–7, `.hero__aside` (intro, the one button, a text link) in 9–12, the meeting as `dl.rows.rows--across.hero__meets`, then `figure.photo.hero__photo` (18:5 band from 1024, 2:1 on tablets, 5:3 full-bleed on phones). `p.hero__next[data-render="next-meeting"][hidden]` is the "Next: …" line that `script.js` shows only for a dated upcoming meeting; `/join` reuses it in its aside.

### Buttons and text links

```html
<a class="btn" href="/join">Choose how to take part</a>                   <!-- solid Forest, 48px, one per screen area -->
<a class="btn btn--secondary" href="…">Secondary action</a>               <!-- outlined -->
<a class="tlink" href="/chapters">How chapters work<span class="arrow" aria-hidden="true"> →</span></a>
<p class="links"><a class="tlink" …>…</a> <a class="tlink" …>…</a></p>   <!-- a row of text links; .links--stack stacks them -->
```

- Labels say what happens. Text links are sans 600, underlined, padded to a 44px target; the arrow is `aria-hidden`. `.btn[disabled]` and `.btn[aria-disabled="true"]` turn Muted (Parchment text, 5.28:1); `.btn[aria-busy="true"]` shows the progress cursor.

### Header and footer

See `shell.md` (`.site-header`, `.hd`, `.hd__brand`, `.hd__seal`, `.hd__name`, `.hd__join`, `.nav-toggle`, `.site-nav`, `.site-nav__join`; `.ft`, `.ft__grid`, `.ft__about`, `.ft__seal`, `.ft__name`, `.ft__meets`, `.ft__nav`, `.ft__else`, `.ft__k`, `.ft__label`, `.ft__legal`).

### Figure and caption (`.photo`, `.caption`)

```html
<figure class="photo photo--landscape">
  <picture>
    <source type="image/webp" srcset="/assets/work/x-800.webp 800w, /assets/work/x-1200.webp 1200w, /assets/work/x-1600.webp 1600w" sizes="…" />
    <img src="/assets/photos/x-1200.jpg" width="1200" height="900" loading="lazy" decoding="async" alt="What is in the picture, plainly." />
  </picture>
  <figcaption class="caption"><strong><time datetime="2026-09-28">Monday, September 28, 2026.</time></strong> What it shows.</figcaption>
</figure>
```

- 2:1 by default; `.photo--landscape` is 3:2. Images are EXIF-free web versions in `mayo-site/assets/`, with `srcset`/`sizes` and `width`/`height`; lazy-load below the fold, never above it. Caption = the date in words (Ink 600) + what it shows (+ "Photo: name" once known). No clock times, no inferred topics.
- `sizes` for the named spans: `span-lead` at 1440 is 737px, `span-wide` 845px, full 1280px.

**Band (`.photo--band`).** The November 20, 2025 meeting on an inner page (`/about` under the title, `/chapters` in "What a chapter is for", `/join` after the routes): one treatment on every page, with one caption ("A weekly meeting in the MHS Library Classroom."). The WebP `<source>` is the hero's band file, cut above the laptop (`assets/work/meeting-2025-11-20-band-{800,1200,1800}.webp`, 18:5), with no `media`; the `<img>` fallback is the same cut as JPG (`assets/photos/meeting-2025-11-20-band-{800,1200}.jpg`, added October 7). So no file a band serves holds the laptop's screen, in any browser (content-needs #23). 18:5 from 1024; a 3:1 crop of it below 1024 (`object-position: 50% 15%`), edge to edge on phones, with the caption in the margin. 3:1 keeps every face and the table; the earlier 5:2 phone crop cut the head off the student at the right edge, and the beanie student at the far left is only half in frame below 1024. Exact `sizes` (it asks for the band's rendered width, which is wider than the box where the crop cuts the sides: 3.6 / 3 = 1.2 times the box below 1024, so 120vw on phones):

```html
<figure class="photo photo--band">                     <!-- + pagehead__photo span-full on /about; span-full in a grid on /chapters -->
  <picture>
    <source type="image/webp" width="1800" height="500"
      srcset="/assets/work/meeting-2025-11-20-band-800.webp 800w, /assets/work/meeting-2025-11-20-band-1200.webp 1200w, /assets/work/meeting-2025-11-20-band-1800.webp 1800w"
      sizes="(min-width: 1440px) 1280px, (min-width: 1024px) calc(100vw - 2 * clamp(16px, 5.5vw, 80px)), (min-width: 768px) calc(1.2 * (100vw - 2 * clamp(16px, 5.5vw, 80px))), 120vw" />
    <img src="/assets/photos/meeting-2025-11-20-band-1200.jpg" srcset="…-band-800.jpg 800w, …-band-1200.jpg 1200w"
      sizes="(the same sizes as the source)"
      width="1200" height="333" loading="lazy" decoding="async" alt="…" />   <!-- not lazy above the fold (/about) -->
  </picture>
  <figcaption class="caption"><strong><time datetime="2025-11-20">Thursday, November 20, 2025.</time></strong> A weekly meeting in the MHS Library Classroom.</figcaption>
</figure>
```

- A figure straight after the Chapter row (`.chapters + .photo`) sits 48px below it (64px from 1024).

### Record rows (`dl.rows`)

Label / value between hairlines, tabular figures. The label is a field name in the sans (Muted 600).

```html
<dl class="rows">
  <div><dt>When</dt><dd><span data-schedule="this-day">This Thursday</span>, <span class="tnum" data-schedule="time">8:20 AM</span></dd></div>
  <div><dt>Where</dt><dd data-schedule="location">MHS Library Classroom</dd></div>
</dl>
```

- `.rows--stack`: label above value at every width. Use it for any label longer than a word, and in narrow columns (asides).
- `.rows--across`: one row of cells on the thirds from 768 (label above value), a label / value list below (the hero's When / Where / Who). With `.rows--stack` it is stacked below 768 instead (`/chapters`' "What you'd teach": the three program areas across the thirds under the photo, each topic its own line).
- A value in parts: `<dd><p>Fact.</p><p class="meta">Its note (e.g. the Mayo Clinic sentence).</p></dd>`. A list of short items is the same, one `<p>` per item, 8px apart, never a middot run that wraps (`/chapters`, "What you'd teach").
- `.record__rows` (`/about`, "The story so far": rows whose values are paragraphs): label beside value from 768, label above value on phones, so the story keeps the full measure.
- Put `.w-wide` on rows in a full-width section, so the value column doesn't run past about 80 characters.
- `.rows--across-tablet`: a short stacked record in a `span-aside` (stacked from 1024) that runs across the thirds from 768 to 1023, where the aside is full width (`/chapters`' title aside).
- A source line straight after rows (`dl.rows + p.meta`) sits 12px under them.

### Definition rows (`.defs`)

A named thing and what it is ("A founder" / "One student, ideally a sophomore or junior."). The term is content, so it is in the serif (600), not a sans field label. Stacked below 768; term in a third, description in two thirds from 768.

```html
<dl class="defs w-wide">
  <div><dt>A founder</dt><dd>One student, ideally a sophomore or junior.</dd></div>
</dl>

<!-- when each term should be a heading in the outline -->
<ul class="defs w-wide">
  <li><h3 class="defs__term">Thursday meetings</h3><p>A different topic each week. <a href="/events">Meeting schedule</a></p></li>
</ul>
```

### Lists

- `.hairlist`: a `ul`/`ol` between hairlines, no bullets; inside an item a label (date or kind), an H3, then text, 8px apart (`/events`).
- `.dots`: a middot list. Each part is kept whole, and each dot is text inside the part it introduces, so a dot never ends a line: `<span class="dots"><span>Video</span> <span>· 19 min</span> <span>· 3Blue1Brown</span></span>`. Build it with `mayo.dots([...])`.
- `.questions`: the homepage's six labelled questions in thirds.
- `.steps`: a numbered list between hairlines (`/chapters`, "What happens next": the brief's three conditions, not a complete process). The number is generated from the `<ol>` in the Chapter number's style (sans 700, Forest, tabular, 01–03) on the title's baseline; the title is an H3 and one line sits under it. A closing line (`p.steps__after`) sits 24px below.

```html
<ol class="steps w-wide">
  <li><h3 class="steps__title">A student founder</h3><p class="steps__text">It starts with the founder form, on Google Forms.</p></li>
</ol>
<p class="reading steps__after"><strong>Nothing commits a school</strong> until …</p>
```

- `.note`: a short aside beside a section's main content: a label, a line or two at the body size (40ch), at most one text link (`p.note__act`). No box and no rule; the column sets it apart (`/chapters`, "Asking a teacher to advise").

### Chapter (`.chapters` > `.chapter`)

A chapter, or a way to take part. Number (or place line) → H3 → who it's for → facts → optional rows → status → at most two actions. Thirds with vertical hairlines from 1024; stacked between hairlines below. Never cards. Each entry has an `id`.

```html
<ol class="chapters">
  <li class="chapter" id="start-a-chapter">
    <p class="chapter__num" aria-hidden="true">02</p>                     <!-- or <p class="label chapter__place">School · City, State</p> -->
    <h3 class="chapter__title">Start a chapter</h3>
    <p class="chapter__for">For a student founder and a faculty advisor at another high school</p>
    <p class="chapter__facts">Two or three lines of verified facts.</p>
    <dl class="rows">…</dl>                                                 <!-- optional; narrow label column inside a chapter -->
    <p class="chapter__status"><strong>Interest, not approval.</strong> Putting your name in is interest. …</p>
    <ul class="chapter__acts">
      <li><a class="btn" href="https://forms.gle/…" target="_blank" rel="noopener" aria-describedby="x-note">Open the founder form (Google Forms)</a>
          <p class="hint chapter__note" id="x-note">Opens in a new tab and takes about three minutes.</p></li>
      <li><a class="tlink" href="/chapters">Read how chapters work<span class="arrow" aria-hidden="true"> →</span></a></li>
    </ul>
  </li>
</ol>
```

- No invented chapters, no directory, no map, no counts. Today the only chapter is Mayo High School, Rochester, Minnesota, founded in October 2025. A new chapter appears only once `content-needs.md` #15 lists it as approved.
- **Parts added for `/join` and `/chapters`:**
  - `p.label.chapter__label` names a chapter's record rows ("Your first Thursday", "What it takes, and what you get"): 24px above, 8px to its `dl.rows`, which takes `aria-labelledby` pointing at it. `.rows` for short values; `.rows.rows--stack` for sentence-long values, so a third never squeezes a sentence beside an 88px label column. Keep the routes in a row about equal: `/join`'s "Start a chapter" uses the short wording of `/chapters`' title record (Needs, Commits, Cost, Support; *final pass*), so its founder-form button is on screen when `/join#start-a-chapter` loads at 1280×900 and 1440×900 (`check-join.mjs` checks it).
  - `p.hint.chapter__note` sits under an action, in the same `li`, tied to it with `aria-describedby`: what an external link does or what a text link is for. **The founder form reads the same on every page:** the label "Open the founder form (Google Forms)" (spec §3 and §4, which win over design-direction §7's shorter label) and the note "Opens in a new tab and takes about three minutes.", plus a page's own sentence where it needs one (the status on `/chapters`' title, the Instagram fallback in its application block). 8px under a button, right under a text link (its 10px padding is the gap); at most 60ch, as the page title's note.
  - A button in `.chapter__acts` gets 12px more room above it, and the action after a button sits 4px clear of it; text links stack on their own padding (the homepage row).
  - A second `p.chapter__facts` sits 8px under the first.
  - On `/join` the route actions are `btn btn--secondary` (three equal choices), so the form's submit stays the one solid button there. On `/chapters` "Ready to start one?" has one solid button, on the founder route, and its routes carry no numbers (the page's numbers are the steps).

### Story (`.story`)

A student story or byline piece. Eyebrow (kind · source) → linked title (Ink, 1px Forest underline always shown) → byline row (By name · verified role · date) → standfirst (published summary, or a verbatim excerpt in quotes, opening quote hung) → optional real figure → one text link. Complete without an image.

```html
<article class="story">                                    <!-- + story--featured on the Tint band; story--companion beside it -->
  <p class="label story__eyebrow"><span class="dots"><span>Meeting recap</span> <span>· The AI Literacy Review</span></span></p>
  <h3 class="story__title"><a href="/blog-post?id=ai-dilemmas-march-19">Advanced Seminar Recap: AI Dilemmas</a></h3>
  <p class="story__byline"><span class="dots"><span>By <span class="who">Shyam Christensen</span></span> <span>· Co-founder</span> <span>· <time datetime="2026-03-19">March 19, 2026</time></span></span></p>
  <p class="story__stand">The published summary.</p>
  <!-- or a verbatim excerpt: <blockquote class="story__stand is-quote" cite="…"><p>“…”</p></blockquote> -->
  <p class="story__more"><a class="tlink" href="…">Read the recap<span class="arrow" aria-hidden="true"> →</span></a></p>
</article>
```

- **The pair** (home): `.grid.stories` holding `.story--featured.span-lead` and `.story--companion.span-aside`, under the band's `.question` H2, closed by `p.stories__close`.
- **Story list** (`/blog`, "More writing"): `<ol class="story-list w-wide"><li><article class="story">…</article></li>…</ol>`, between hairlines. On `/blog` each title is an H2 (each post is a main item); elsewhere an H3. Both are set at the H3 size.
- **From the JSON:** `mayo.story(post, { heading: 'h2'|'h3', summary: 'full'|'first'|'none', more: 'Read the recap', featured: true })` builds exactly this markup from a `blog-content.json` post. Its byline has no role, because the JSON doesn't verify one; hand-written Stories may add a verified role.
- Quote only published words, verbatim. One canonical page per piece. Featuring a new member needs consent first (#24).

### Resource (`.resource`)

A learning resource or work sample, with annotation. Label line (format · time or size · source) → title → the artifact whole, with a 1px Rule border, and its caption → the artifact's text as HTML (`.resource__text`; visible below 1280, visually hidden from 1280) → 2–4 numbered notes in the club's own words, quoted (aside on desktop) → "What you'll need" (confirmed values only; omitted when none are confirmed) → source line.

```html
<article class="resource" id="nuclear-false-positive" aria-labelledby="nfp-title">
  <p class="label resource__label"><span class="dots"><span>Branching dilemma</span> <span>· Slides 4–7</span> <span>· “Final AI Lit of 2026” deck</span></span></p>
  <h3 class="resource__title" id="nfp-title">The Nuclear False Positive</h3>
  <figure class="resource__doc"><picture>…</picture><figcaption class="caption">…</figcaption></figure>
  <div class="resource__text"><p class="label">The slide, as text</p><blockquote cite="#…">…</blockquote></div>
  <div class="resource__aside">
    <p class="label resource__notes-label">Each choice, and the lesson the deck gives it</p>
    <ol class="resource__notes"><li><p><strong>Choice.</strong> “The deck's own line.” <span class="meta">Slide 5</span></p></li>…</ol>
  </div>
  <p class="resource__need">…</p>                                        <!-- only with confirmed values -->
  <p class="meta resource__source">Source: …</p>
</article>
```

- Club-made material only, cleared in `artifacts.md` §4, with third-party images removed first (#36). Never say a lesson has been run or reviewed until confirmed (#25).
- **Compact Resource** (Learn's library: something outside the club we point to). No artifact, no notes. In a `.reslist` (between hairlines; 2 across from 768, 3 from 1024):

```html
<h3 class="subhead">Getting started</h3>
<ul class="reslist">
  <li class="resource resource--compact" id="res-elements">
    <p class="label resource__label"><span class="dots"><span>Video</span> <span>· 19 min</span> <span>· 3Blue1Brown</span></span></p>
    <h4 class="resource__title"><a href="https://…" rel="noopener">But what is a neural network?</a></h4>
    <p class="resource__desc">One or two lines on what it is.</p>
  </li>
</ul>
```

### Long-form reading (`.longform`)

A post body or a page's own essay: Newsreader at the reading size, 66ch, 24px between blocks; H2 48px above and H3 32px above, 12px under either; lists with Muted markers; a quotation with a 2px Forest edge; a pull quote; figures 32px clear.

```html
<div class="longform">
  <p>Paragraph.</p>
  <h2>Heading</h2>
  <ul><li>Item</li></ul>
  <blockquote><p>A quotation in the run of the text.</p></blockquote>
  <figure class="pullquote"><blockquote><p>The piece's own words, lifted out.</p></blockquote><figcaption class="meta">Name, date</figcaption></figure>
  <figure class="photo">…<figcaption class="caption">…</figcaption></figure>
</div>
```

- **Post pages** (`/blog-post`): `.pagehead` (eyebrow = kind · The AI Literacy Review, H1, then `p.pagehead__byline` = By name · date · N min read, 12px under the H1, then the standfirst = summary, 24px under the byline), then `<div class="frame"><div class="longform post-body">…</div></div>`, then the notes and newer / older ("Post page", below). While the JSON loads, `.post-root[aria-busy]` holds at least a full window (`100svh`), so the footer starts below the first screen and nothing moves when the piece arrives (layout shift 0 with the JSON delayed 1.5 s; it was 0.14 at 390 with `70vh`). `.post-fallback` is the no-JS state.
- A `.meta` note straight after a paragraph in `.longform` (the Mayo Clinic sentence after the AACA citation on `/mercurius`) sits 12px under it, as `.citation__note`.
- `.prose` is only a 66ch measure (the homepage's Mercurius section); `.reading` is one paragraph at the reading size.

### Forms (`.form`), choices and status messages

Labels above fields, hints under labels, errors in words under the hint, one status area beside the submit. Fields are 48px tall with 18px text (no iOS zoom), 2px radius, Field ground, Muted border; focus is a 2px Forest ring.

```html
<form class="form" id="contact-form" name="contact" method="POST" action="/join" data-netlify="true" netlify-honeypot="bot-field">   <!-- the script sets form.noValidate = true; without JS the browser validates -->
  <input type="hidden" name="form-name" value="contact" />
  <p class="hidden-field" aria-hidden="true"><label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off" /></label></p>

  <div class="status status--error" id="form-summary" role="alert" tabindex="-1" hidden>
    <p><strong>Two answers need a look.</strong></p>
    <ul><li><a href="#f-name">Enter your name</a></li></ul>
  </div>

  <fieldset class="choices">                                          <!-- + choices--across: three side by side from 768 (short titles only) -->
    <legend class="field__label">I am</legend>
    <span class="field__error" id="route-error" hidden>Choose one.</span>
    <div class="choices__list">
      <label class="choice"><input type="radio" name="route" value="mayo-student" required /><span class="choice__title">A Mayo High School student</span><span class="choice__hint">Optional one-line hint</span></label>
      …
    </div>
  </fieldset>

  <fieldset class="fieldgroup" id="group-mayo">                       <!-- one per route; with JS the others get hidden AND disabled -->
    <legend class="fieldgroup__head">A Mayo High School student</legend>
    <div class="field">
      <label class="field__label" for="f-name">Name</label>
      <input id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="f-name-error" />
      <!-- with an error: aria-invalid="true" on the input, and the message shown -->
    </div>
    <div class="field field--short">                                   <!-- short answers (grade) don't stretch -->
      <label class="field__label" for="f-grade">Grade</label>
      <select id="f-grade" name="grade" required>…</select>
    </div>
    <div class="field">
      <label class="field__label" for="f-message">Message <span class="field__opt">(optional)</span></label>
      <span class="field__hint" id="f-message-hint">Anything you'd like us to know.</span>
      <span class="field__error" id="f-message-error" hidden>…</span>
      <textarea id="f-message" name="message" rows="4" aria-describedby="f-message-hint f-message-error"></textarea>
    </div>
  </fieldset>

  <div class="form__actions">
    <button class="btn" type="submit" id="submit-btn">Leave your name</button>   <!-- sending: disabled, "Sending…", aria-busy="true" -->
  </div>
  <p class="hint form__after">What happens afterwards, briefly and truthfully.</p>
  <div class="status status--error" id="form-failure" role="alert" hidden><p><strong>That didn't send.</strong> Your details are still here, so try again. …</p></div>
</form>

<div class="status" id="form-done" role="status" tabindex="-1" hidden>          <!-- replaces the form on success, takes focus -->
  <h3 class="status__title">Got it.</h3>
  <p>What happens next, from confirmed facts only.</p>
</div>
```

- Order inside a field: label → hint → error → control. Tie hint and error to the control with `aria-describedby`; set `aria-invalid="true"` on an invalid control (2px Error edge; the padding shrinks so nothing moves). A radio group that must be answered gets `.is-invalid` on its `fieldset.choices`.
- A chosen `.choice` (`:has(input:checked)`) gets a 2px Forest edge on Tint; keyboard focus shows a 2px Forest ring around the card (the radio's own ring where `:has` isn't supported).
- `.status` is Tint with a 4px Forest edge; `.status--error` is the Field ground with a 4px Error edge and its first line's `strong` in Error. The words carry the meaning. `role="alert"` for problems, `role="status"` for confirmations.
- Without JS every group shows under its `.fieldgroup__head`, and the form posts natively.

### Tables (`.table`)

Only for a real comparison (About's three groups). Sans labels in the header row over a 1px Forest line, hairlines between rows, row headers in the serif. Below 768 each row is a block and each cell shows its column name from `data-label`.

```html
<table class="table w-wide">
  <caption class="visually-hidden">What the table compares</caption>
  <thead><tr><th scope="col">Group</th><th scope="col">How they use it</th>…</tr></thead>
  <tbody>
    <tr><th scope="row"><span class="label">Group 1</span>The Copy-Paster</th><td data-label="How they use it">…</td>…</tr>
  </tbody>
</table>
```

### People (`.people` > `.person`)

The board: a real headshot (72px, 2px radius), the name as an H3, the verified role as a label, one line on what they do. Stacked between hairlines; two across from 768.

```html
<ul class="people">
  <li class="person">
    <img class="person__photo" src="/assets/board-shyam.jpg" alt="" width="72" height="72" loading="lazy" decoding="async" />
    <h3 class="person__name">Shyam Christensen</h3>
    <p class="label person__role">Co-founder and co-president</p>
    <p class="person__note">One line on what they do.</p>
  </li>
</ul>
```

- `.people--stack`: one person per row inside a narrow aside from 1024 (`/chapters`, "Who supports new chapters"); below 1024 the usual two across from 768.

### Citation (`.citation`) and app (`.app`)

- `.citation`: the AACA poster as a record: `p.reading` → `p.citation__deck.reading` (italic) → `dl.rows` → `p.citation__note.meta` with the Mayo Clinic sentence. Columns 1–8 from 1024. The AACA work is a **poster**, never a talk.
- `.citation--compact`: the poster as supporting material (`/chapters`, "Where we stand"): label (kind · date) → `h3.citation__title` → one paragraph → `p.citation__note.meta` with the Mayo Clinic sentence. No rows, and no grid of its own: it sits in a span.
- `.app`: `img.app__icon` (56px) beside the text, with `.badge-row` > `a.badge` (the App Store badge, 44px tall) and a text link. Emphasis waits for the founders (#32).

### Utilities

`.visually-hidden`, `.nowrap`, `.tnum` (tabular figures), `.subhead` (an H3 between groups inside a section) and `.subhead__note` (one line under it on why the group is there), `.flow`, `.grid--gap`, `.w-lead`, `.w-wide`, `.links` / `.links--stack`, `.hidden-field` (the honeypot).

## Script API (`script.js`, `window.mayo`)

`mayo.fetch` (= `window.mayoFetch`), `parseDate`, `formatDate(date, 'long'|'medium')`, `isoDate`, `timeEl`, `postUrl` (with `CUSTOM_URLS`: the Pentagon post → `/blog-anthropic-pentagon.html`), `byDate` (newest first, ties keep JSON order), `firstSentence`, `sentenceCase`, `upcoming` and `past` (from `events-data.json`), `localUrl`, `el` (DOM builder; text is always text), `dots` (and its old name `seps`), `story`, `reviewStory(post, opts)` (the Story with its byline first; `opts` as `story`, plus `lead: true` and `titleId`), `readLabel(post)`, `writers(posts)` (each author once, in order), `andList(names)` ("A, B and C"), `renderLatestWriting(root, posts)` (a featured Story and a story list) and `renderSchedule(data)`.

Auto-render hooks: `[data-schedule="time|location|day|weekday|weekdays|this-day|openTo"]` (filled from `schedule`), `[data-render="next-meeting"]` (shown only for a future `upcoming` entry), `[data-render="latest-writing"]`. Static text in the HTML is always the fallback. The phone menu (open/close, Escape, `inert` on `main` and `.ft`, closing when focus lands anywhere outside the header, including the skip link) is in the same file.

## Images

- Real club photos only, re-encoded from the EXIF-free JPGs with Pillow (no EXIF, no metadata chunks):
  - hero, from 1024: `assets/work/meeting-2025-11-20-band-{800,1200,1800}.webp` (18:5, rows 145–645 of the 1800px file);
  - hero, below 1024: `assets/work/meeting-2025-11-20-wide-{800,1200}.webp` (2:1; no 1800 variant while #23 is open);
  - record and `/about`: `assets/work/interest-meeting-2026-09-28-{800,1200,1600}.webp` (4:3, shown at 3:2);
  - the JPGs in `assets/photos/` are the fallbacks;
  - the board's headshots: `assets/board-{shyam,nathan,adam,niko}.jpg`.
- Artifacts: `assets/artifacts/final-ai-lit-2026-nuclear-false-positive-s04-{800,1200,1800}.webp` and `-1200.jpg`.
- Artifacts are shown whole, as documents, with their text as HTML and only once cleared in `artifacts.md` §4.
- The seal appears only in the header (40px) and the footer (96px): never in a page body, never redrawn, masked or repeated.

## Checks

- `python3 tools/check-shell.py`: every page's shell against `index.html`, the cache-busters, and no Hold material in any published comment (`<!-- -->` in the pages, `/* */` and `//` in `styles.css`, `script.js` and inline scripts: Netlify serves them, so View Source shows them; comments cite content-needs numbers instead). Exits 1 on any difference.
- `node tools/check-text.mjs <url>`: text over text, text spilling out of its box, a dot ending a line, text off the page, at 320–1440. Exits 1 on any finding. (The Pentagon page reports two, both inside its untouched article: `content-needs.md` #47.)
- `SHOOT_WAIT=800 node tools/shoot.mjs <url> <prefix> 360,390,768,1280,1440` (add `SHOOT_SCROLL=1` so lazy images render): full pages, first screens, page overflow. It waits for two animation frames before the first screen and retries a blank (one flat colour) first screen for up to 3 s, then reports `fold=blank` (the 1.3 MB Pentagon page came out blank at 800 ms before this).
- `node tools/check-links.mjs`: every internal href and `#fragment` (on the rendered target), every asset, no request to another host but Google Fonts, `rel="noopener"` on external links, no console errors. Exits 1 on any finding.
- `node tools/check-join.mjs`: `/join`'s form, routes, hash links and states (below).

## Learn and The Review components (October 6; merged into `styles.css` §3, §4, §12–§14 and §18)

Built for Learn (`topics.html`), The AI Literacy Review (`blog.html`) and the post page (`blog-post.html`). They were built in `styles-learn-review.css` and `learn-review.js` while the pages were rebuilt in parallel; both are now merged (Topic in `styles.css` §18, the library's `.subhead__note` in §3, the target highlight in §13, byline-first and the lead piece in §12, the post page and pager in §14; the helpers in `script.js`) and the files are gone. Nothing in them adds a colour, face or size: every value is a `styles.css` token.

### Topic (`.topic-list` > `.topic`), Learn

One of the six topics: name (H3) → the club's question, in the serif italic (the student's own thinking) → what it covers → "Start with": two to four plain links, each with its kind (the club's writing or activity first, then the library). Stacked between hairlines; from 768 the name takes a third, the rest two thirds (as `.defs`). The kind is a field name, set like a `.rows` label: above the title on phones, beside it from 768. A topic with nothing to start with has no list (never filler: content-needs #58).

```html
<ul class="topic-list w-wide">
  <li class="topic" id="ethics">
    <h3 class="topic__name">AI ethics</h3>
    <p class="topic__q">Who is responsible when an autonomous system causes harm?</p>
    <p class="topic__about">Bias, fairness and privacy, and who answers for what an AI system decides.</p>
    <ul class="topic__start" aria-label="Start with: AI ethics">
      <li><span class="topic__kind">Meeting recap</span><span><a href="/blog-post?id=…">Title</a> <span class="meta">By Name, in The Review</span></span></li>
      <li><span class="topic__kind">Case studies</span><span><a href="#res-princeton">Title</a> <span class="meta">In Resources, below</span></span></li>
    </ul>
  </li>
</ul>
```

**Discovery on Learn is plain links and works without JS** (d.school: a library works without filters when its groups are good): the "On this page" index in the title's aside (`nav.pagehead__aside` > `p.label` + `p.links.links--stack`), each topic's "Start with" links, and a row of group links (`p.links`) under the Resources heading. Library groups have ids (`#lib-getting-started` …), and `.subhead__note` (a `.hint`) gives "Getting started" its one-line reason. A resource reached from a topic (`.reslist > li:target`) sits on Tint, edge to edge in its gutter, and every jump target keeps 24px clear of the window top (the site-wide deep-link rule, Page structure). No filters were added: fourteen resources in five named groups don't need them, and a filter would be a new feature (spec §6).

### Story, byline first (`.story--byline-first`), The Review

The Creative Independent's author-first order on our Story: the byline row comes **before** the eyebrow and title, in the reading order too. Below 1024 it is one line above the eyebrow; from 1024 the article is a 12-column grid with the byline in columns 1–4 and the story in 5–12, so a list reads down a column of names and dates. The markup is `mayo.story()` unchanged, with `.story__byline` moved to the top: `mayo.reviewStory(post, opts)` does it.

```html
<ol class="story-list" id="blog-list">                      <!-- full section width, not .w-wide -->
  <li>
    <article class="story story--byline-first">
      <p class="story__byline"><span class="dots"><span>By <span class="who">Michael Teng</span></span> <span>· <time datetime="2026-03-19">March 19, 2026</time></span></span></p>
      <p class="label story__eyebrow"><span class="dots"><span>Hear from the members</span></span></p>   <!-- the kind only: the page is the source -->
      <h2 class="story__title"><a href="/blog-post?id=student-concerns-ai">Concerns from a Student in the Era of AI</a></h2>
      <p class="story__stand">First sentence of the published summary.</p>
    </article>
  </li>
</ol>
```

- **The lead piece** (`.story--lead`, with `story--featured`): the newest piece, alone on the Tint band (`section.band > .frame > .section`), title at the feature size (30 → 44, design-direction §5 "Featured Story title", since it has no companion to match), the full summary at the reading size, and one link ("Read the essay", "Read the recap" or "Read the announcement": `mayo.readLabel`). The band is `aria-labelledby` the title's id.
- **The eyebrow keeps the kind only** on The Review (and in the post page's not-found list): the page is The AI Literacy Review, so " · The AI Literacy Review" would repeat it on every card (design-direction §7's rule for the homepage band). `mayo.reviewStory` drops the source part; a piece with no kind keeps it. *Final pass.*
- **Byline first is a departure** from design-direction §5 ("the same card on the homepage, `/join` and The Review"). It is on the founders' list (content-needs #69); if they choose the §5 order, `blog.html`'s script calls `mayo.story` instead of `mayo.reviewStory` and the static fallback moves each byline under its title.
- **No reading times in the list:** the Pentagon piece's JSON text is shorter than its page (content-needs #61). No roles and no headshots in bylines (#62).
- **The title's aside** is a `dl.rows.rows--stack` with "Writers" (`[data-review="writers"]`, rebuilt from the JSON with `mayo.writers` and `mayo.andList`) and a link to Learn.
- The static list in `blog.html` is the no-JS fallback, written from the same JSON so the page doesn't move when the script rebuilds it (checked: identical layout at 1440 with JS off and with `learn-review.js` blocked).

### Post page (`/blog-post?id=`)

The reading anatomy, in order: kicker (`.pagehead__eyebrow`: kind · The AI Literacy Review) → H1 (a dash in the title is kept with the word before it, so no line starts with one) → byline row (`.pagehead__byline`: By name · date · N min read, computed from the text shown) → standfirst (the published summary) → the body (`.longform.post-body`, Newsreader, 66ch) → **notes** → **keep reading**.

```html
<div class="frame">
  <aside class="post-notes" aria-labelledby="notes-label">   <!-- 66ch at the reading size: its hairlines end where the body's lines do -->
    <h2 class="label post-notes__label" id="notes-label">About this piece</h2>
    <dl class="rows">
      <div><dt>Writer</dt><dd>Shyam Christensen</dd></div>
      <div><dt>Published</dt><dd><time datetime="2026-03-18">March 18, 2026</time>, in <a href="/blog">The AI Literacy Review</a></dd></div>
      <div><dt>Topic</dt><dd><a href="/topics#critical-thinking">Critical thinking</a>, on Learn</dd></div>   <!-- POST_TOPICS; no row when unmapped -->
    </dl>
  </aside>
</div>

<!-- in a section headed "Keep reading" -->
<ul class="pager w-wide">
  <li class="pager__prev"><p class="label pager__dir">Newer piece</p><p class="pager__title"><a href="…">Title</a></p><p class="meta">By <span class="who">Name</span> · date</p></li>
  <li class="pager__next">…"Older piece"…</li>                 <!-- two across from 768; the older piece always in the right column -->
</ul>
```

- Content stays data: every string is a text node (`mayo.el`); the content format is unchanged (paragraphs, `##`/`###`, `**bold**`, `*italic*`, `>` pull quotes).
- **States:** the piece; **not found** (`?id=` unknown: "We couldn't find that piece.", then "Everything in The AI Literacy Review", newest first, as byline-first Stories, `noindex`); **no id** ("Choose a piece to read.", the same list); **load error** ("This piece didn't load.", with a link back to The Review); **no JS** (the static fallback: "This page needs JavaScript to show a piece.", with links to The Review and the Pentagon page, which works without it). A piece with its own page (`CUSTOM_URLS`) redirects there.
- No "More writing" list under a piece any more: previous / next replace it (TCI: never pad a related list).

## /join components (October 6; merged into `styles.css` §7, §9, §11 and §15)

Built for the rebuilt `/join` (spec §3) in `styles-join.css`, now merged and deleted. The Band figure, the Chapter parts and the hidden "Next" line are documented above with their components; the page's own script is inline, after `script.js`.

### Form layout and the enhanced form

- **Layout:** `div.grid.form-layout` > `div.form-layout__main.span-lead` (the form, then the confirmation) + `div.form-layout__aside.span-aside` (a `dl.rows.rows--stack` of side notes: "Starting a chapter?", "Rather not use a form?"). Beside the form from 1024; 48px after it below.
- **Announced regions:** the error summary and the failure message each sit inside an always-rendered `div.form__alert[role="alert"]`; the script hides the inner `.status--error`, refills it, then shows it a beat later, so a second failed attempt is announced again. `.form__alert--end` gives the failure box its 24px above. The "Sending…" line goes to a visually hidden `aria-live="polite"` paragraph.
- **No field name twice.** One Netlify form can't safely post two values for one name, so shared fields are written once: `name`, `email` and `message` serve every route, and `grade` both student routes. Route-specific blocks carry `data-routes="mayo-student other-school-student"` (a `fieldset.fieldgroup`, or a single `.field` inside one).
- **Without JS:** every block shows under its `.fieldgroup__head` ("If you're a student", "If you're a teacher, advisor, parent or partner", "For everyone"); only route, name and email are `required`; a `[data-nojs]` hint ("Only if you're at another school.") guides the shared student group.
- **With JS** (`form.is-enhanced`, set by the page script before first paint): `[data-nojs]` elements are removed; group headings are visually hidden but stay as the groups' accessible names, and groups close up to the 24px field rhythm; a block whose route isn't chosen is `hidden` and its controls `disabled` (the fieldset itself, or each control), so it is neither sent nor checked. The script swaps the message label and hint per route, shows "(optional)" on grade for students elsewhere, sets `required` per route, and sets the submit label (Send, Leave your name, Send my interest, Send your message).
- **Hash targets:** `#form-mayo`, `#form-other-school` and `#form-supporter` are the radios' ids. CSS gives radios a 13rem `scroll-margin-top` (no-JS; it outranks the site-wide 24px deep-link rule); the script replaces it per radio with its distance below the section's top, so the browser's own jump and the route actions land with the section heading and every choice in view.
- **States, and the checks that hold them:** `tools/check-join.mjs` (below).

### Checks for `/join`

- `node tools/check-join.mjs [url]` (default `http://127.0.0.1:8150/join`; set `CHECK_SHOTS=<dir>` to save a screenshot of each state and of each hash landing). It drives the preview with real clicks, typing and keys, and checks the static form, the route labels, the eligibility sentence, the "Your first Thursday" facts, the title and the three descriptions (they name the three routes and promise no reply time), the no-JS layout, every route's fields, labels and line under the submit ("We will email you", no reply time), the hash preselects (and, at 1280×900 and 1440×900, that `/join#start-a-chapter` lands with its founder-form button on screen), validation, sending ("Test Slow", one POST only), success (only on `res.ok`; the posted keys per route, from `tools/.dev-inbox.jsonl`), failure ("Test Failure", "Test Offline", an emulated offline browser, then a retry), Tab order with visible focus at 1280 and 390, the phone menu (including Tab past Join to "Skip to content", which must close it, and Enter on it), and fit at 360 and 390. Exits 1 on any failure (282 checks, October 7).
