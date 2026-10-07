# Design system: second pass (October 6, 2026)

Internal. Not published. The code is `mayo-site/next.css?v=2` and `next.js?v=2` (loaded by `index.html` only, for now). What the second pass changed, and why, is in `design-direction.md` §7. The art direction is `design-direction.md`; on any conflict `participation-redesign.md` wins. Other pages keep `styles.css` until they move over.

## Fonts

- **Newsreader** (OFL): H1–H3, standfirsts, reading text, record values, and the second voice of the lead. Roman 400 and 600, italic 400 and 500, `font-optical-sizing: auto`.
- **Source Sans 3** (OFL, Adobe): the first voice of the lead (700, −0.02em), nav, buttons, labels, captions, bylines, status lines and form text (400, 600, 700).
- **Why Source Sans 3 over Public Sans** (trial renders in `.shots/specimen/lead-*`): at 1440 its bold clause sets in two lines where Public Sans needs three, and its narrower, darker set is the closest open cousin of the Eames gothic. Public Sans read wider and softer beside the Newsreader italic.
- **Departure from spec §2:** the sans is set large only in the lead, on home, `/join` and `/chapters`. Every other heading is Newsreader. Fallback if the founders object: the same split in Newsreader, 600 roman then italic 500.
- **Retired:** Josefin Sans and Space Mono (home only so far).
- **No layout shift on font swap:** `next.css` declares metric-matched local fallbacks ("Source Sans 3 fallback" on Arial, "Newsreader fallback" on Georgia) with `size-adjust` set from measured width ratios per weight. With Google Fonts blocked, the first-screen layout moves by 6px at 390 and 15px at 1440.
- Google Fonts URL: `Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400;1,6..72,500` and `Source+Sans+3:wght@400;600;700`, `display=swap`.

## Type scale (fluid between 390 and 1440 with `clamp()`)

| Role | Face and weight | Phone → desktop | Line height | Token |
|---|---|---|---|---|
| Lead (one per page) | Source Sans 3 700, then Newsreader italic 500 | 40 → 64 | 1.02 | `--fs-lead`, `.lead` |
| H1 | Newsreader 600 | 36 → 56 | 1.05 | `--fs-h1`, `.h1` |
| Story band question (the band's H2) | Newsreader 600 | 30 → 44 | 1.1 | `--fs-feature`, `.question` |
| H2 | Newsreader 600 | 26 → 34 | 1.15 | `--fs-h2` |
| H3, component title, standfirst | Newsreader 600 / 400 | 21 → 26 | 1.2 / 1.35 | `--fs-h3`, `.standfirst` |
| Reading body | Newsreader 400 | 18 → 21 | 1.6 | `--fs-read`, `.reading` |
| Body in lists, rows and asides | Newsreader 400 | 18 | 1.5–1.55 | `--fs-body` |
| Nav, buttons, text-link actions, status | Source Sans 3 600 / 400 | 16 | 1.25–1.5 | `--fs-ui` |
| Caption, meta, hint, byline | Source Sans 3 400 | 14 → 16 | 1.45 | `--fs-cap`, `.caption`, `.meta` |
| Label, eyebrow (sentence case) | Source Sans 3 600 | 14 | 1.3 | `--fs-label`, `.label` |

Rules: headings `text-wrap: balance`; the lead 22ch, H2 24ch, the Story question 28ch; paragraphs `pretty`, at most 66ch; labels, dates, times and numbers `lining-nums tabular-nums`. Featured and companion Story titles are the same H3 size. Headings and labels are Ink, not Forest.

## Colour roles and contrast (WCAG 2.2, computed)

| Pair | Ratio | Use |
|---|---|---|
| Ink #1a1714 on Parchment #faf8f4 | 16.83:1 | body text, lead sans clause |
| Forest #1B4D32 on Parchment | 9.19:1 | links (and the underline under linked story titles), button, rules, numbers, focus ring, the lead's serif clause. Not headings or labels (second pass) |
| Ink on Parchment, as headings and labels | 16.83:1 | H1–H3, eyebrows, labels (second pass) |
| Parchment on Forest | 9.19:1 | primary button |
| Muted text #5e6b60 on Parchment | 5.28:1 | captions, meta, hints, row labels |
| Ink on Tint #edf4ef | 15.97:1 | Story band text |
| Forest on Tint | 8.72:1 | Story band headings, links, focus |
| Muted text on Tint | 5.01:1 | Story band bylines |
| Parchment on Deep Forest #122e1e | 13.79:1 | footer, phone menu |
| Light Gold #E8B84B on Deep Forest | 7.94:1 | footer labels, focus ring on dark |
| Deep Forest on Light Gold | 7.94:1 | the phone menu's Join button |
| #dfe7e1 on Deep Forest | 11.60:1 | footer fine print |
| Gold #C9922A on Deep Forest | 5.32:1 | 4px rule on top of the footer and phone menu |
| Gold on Parchment | 2.60:1 | never text, state or required edge (the seal only) |
| Rule #d4e0d8 on Parchment | 1.28:1 | hairlines, decorative only |
| Rule on Tint #c9d8ce on Tint | 1.32:1 | hairlines inside the Story band, decorative only |

The brand's Muted #6b7a6e (4.27:1) is never used for text. `--rule-on-tint` (#c9d8ce) is the one value added: the Rule hairline one step darker so it shows on Tint. It is decorative and carries no meaning.

## Grid and spacing

- Content at most 1280px; side margin `clamp(16px, 5.5vw, 80px)`.
- 4 columns / 16px gutter below 768; 8 / 24px from 768; 12 / 24px from 1024. Below 1024 every named span is one column in reading order.
- Named spans: `.span-lead` (1–7), `.span-wide` (1–8), `.span-aside` (9–12), `.span-full`. Thirds (the Chapter row) use a 3-column grid with 1px hairlines centred in the gutters. The Story pair puts its hairline in the middle of the empty column 8 (`--col`).
- Spacing scale 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 (`--s1`…`--s9`). Sections are 64px apart on phones and 96px from 1024.
- A section opens: 4px Forest rule, 16px, (eyebrow,) H2, 24px, content (`.section`, `.section__head`).
- Radius 0 on buttons and bands, 2px on photos. No shadows, gradients or animation.

## Components

- **Buttons** (`.btn`): 48px tall, solid Forest; `.btn--secondary` outlined. **Text-link actions** (`.tlink`): sans 600, underlined, padded to a 44px target; arrows are `aria-hidden`.
- **Header** (`.site-header`, `.hd`): the seal (`seal-circle-192.png`, already round, never masked) at 40px and the name in full in Newsreader 600; nav About · Chapters · Learn · Events · The Review · Join (outlined Forest, 44px) from 1000px. Below 1000px: brand, solid Join, and Menu as a plain underlined text control (44px target). The menu opens as a Deep Forest panel with a Gold rule and a Light Gold Join; no second seal. `script.js` owns open/close and Escape. `next.js` sets `inert` on `main` and the footer while it is open, and closes it when focus leaves it. Without JS the list shows inline. Nav and footer links are at least 44×44px.
- **Figure** (`.photo`, `.caption`): 2:1 by default; `.photo--landscape` is 3:2. The homepage hero is a deliberate departure: 18:5 from 1024 (a band cut into the file, rows 145–645, so the laptop screen is not in the served image), 2:1 on tablets, 5:3 full-bleed on phones. Hero rules use `.photo.hero__photo img` so they outrank the generic `.photo img`. Caption = date in words (Ink 600) + what it shows. No clock times.
- **Record rows** (`dl.rows`): label / value between hairlines, tabular figures. `.rows--stack` puts the label above the value at every width; use it for any label longer than a word, and in narrow columns. `.rows--across` lays the rows out as one row of cells on the thirds from 768 (label above value), and as a label / value list below. The hero's When / Where / Who uses it.
- **Middot lists** (`.dots`): each part is kept whole, and each dot is text inside the part it introduces (`<span>A</span> <span>· B</span>`), so a dot never ends a line.
- **Chapter** (`.chapters` > `.chapter`): number (or place line) → H3 → who it's for → facts → optional rows → status (`.chapter__status`, bold lead-in) → at most two actions. Thirds with vertical hairlines from 1024; stacked between hairlines below. Each entry has an `id`. The homepage uses the compact form: no rows, one link per route (route 01 has two).
- **Story** (`.story`, `.story--featured`, `.story--companion`): eyebrow (kind · source) → linked title (Ink, 1px Forest underline always shown) → byline row (By name · verified role · date) → standfirst (published summary, or a verbatim excerpt in quotes, opening quote hung) → optional figure → one text link. Featured sits on the Tint band (`.band`) under the band's question (`.question`), at the same title size as its companion.
- **Resource** (`.resource`): label line → title → the artifact whole, with a 1px Rule border, and its caption → the artifact's text as HTML (`.resource__text`; visible below 1280, visually hidden from 1280) → 2–4 numbered notes in the club's own words, quoted (aside on desktop, aligned with the artifact) → "What you'll need" (confirmed values only; omitted when none are confirmed) → source line. First used on the homepage: "The Nuclear False Positive" (A8, slide 4).
- **Footer** (`.ft`): Deep Forest with a 4px Gold rule, the 96px seal, Meets / Pages / Elsewhere, and the full non-affiliation disclaimer.

## Images

- Real club photos only, re-encoded from the EXIF-free JPGs with Pillow (no EXIF, no metadata chunks):
  - hero, from 1024: `assets/work/meeting-2025-11-20-band-{800,1200,1800}.webp` (18:5, rows 145–645 of the 1800px file);
  - hero, below 1024: `assets/work/meeting-2025-11-20-wide-{800,1200}.webp` (2:1; no 1800 variant while #23 is open). The first pass's `-wide-1800.webp` was removed from the site folder;
  - record: `assets/work/interest-meeting-2026-09-28-{800,1200,1600}.webp` (4:3, shown at 3:2);
  - the JPGs in `assets/photos/` are the fallbacks.
- Artifacts: `assets/artifacts/final-ai-lit-2026-nuclear-false-positive-s04-{800,1200,1800}.webp` and `-1200.jpg`, from `.shots/artifacts/08-…png`.
- Artifacts are shown whole, as documents, with their text as HTML and only once cleared in `artifacts.md` §4.

## Checks

- `node tools/shoot.mjs <url> <prefix> 360,390,768,1280,1440` (add `SHOOT_SCROLL=1` so lazy images render): full pages, first screens, page overflow.
- `node tools/check-text.mjs <url>`: text over text, text spilling out of its box, a dot ending a line, text off the page, at 320–1440. Exits 1 on any finding.
