# Reference study: Eames Institute website and Manual's case study

Internal art-direction research for the participation redesign. Not published (Netlify publishes `mayo-site/` only). Studied on 2026-10-06.

All screenshots are in `.shots/refs/eames/`, which is gitignored.

## How this was observed

- **`tools/shoot.mjs`** (SHOOT_SCROLL=1, SHOOT_WAIT 4000–5000, widths 1440 and 390) made the `<page>-<w>.png` full-page files and the `<page>-<w>-fold.png` first-screen files.
  - **Eames first screens are unusable.** Every Eames `*-fold.png` is a flat dark field: mean colour #1E1E19 with zero variance. This is the dark blank first screen the brief warned about.
  - **Eames full-page images have holes.** The page reveals content on scroll and lazy-loads its images, so the full-page captures leave blank white or dark blocks where images and some text should be. Use them for overall structure and length only.
- **`.shots/refs/eames/_probe.mjs`** made the `*-steps-<w>-vNN.png` files. It uses the same headless Chrome and user agents as `shoot.mjs`, but it scrolls one viewport at a time and captures each viewport after it settles, so reveals and lazy images are on screen. It also dumped links and computed styles (fonts, sizes, colours, grid) from the live DOM.
  - The `vNN` frames are the reliable visual record.
  - Frame `v00` is the true first screen.
- **The cookie notice.** Eames shows a cookie notice that says visiting the site means agreeing to cookies, and it offers only a close button. I did not click it.
  - In the later probe runs, CSS hides it. That gives no consent.
  - It is still visible in the `home-steps-*` and `menu-open-*` frames.
  - The Manual cookie dialog (Customize / Reject / Accept) was also left alone. It shows in `manual-1440.png` and `manual-390.png`.
- **curl and WebFetch were blocked.** On eamesinstitute.org, curl returned a "Vercel Security Checkpoint" page instead of the HTML or CSS. All Eames text and structure therefore came from the rendered DOM. The font stylesheet on Vercel blob storage did download, and it holds the licence notices quoted below.
- **Nothing failed to render in Chrome.** All seven Eames pages and the Manual page rendered. The only failures were the curl fetches and the Eames fold and full-page artefacts described above.

## Fonts on the Eames site (from the CSS and the computed styles)

| Face | Where it is used (computed) | Licence | Usable by us? |
|---|---|---|---|
| **News Gothic** (Adobe, served via Fontspring) | Bold display headlines: home H1 52px w700, story H1 92px w700, menu links, "Sign Up for Our Newsletter", "Related Stories" | Commercial: "Vendor: Adobe", Fontspring webfont EULA | **No** |
| **Century Schoolbook** (Monotype, via MyFonts), plus Century Schoolbook Std Monospaced (Bitstream) | Serif section headings at weight 400 (39, 56 and 77px) and the article body (22px/34.5px at 1440, 17px at 390) | Commercial: "subject to the End User License(s) entered into by the website owner" | **No** |
| **Graphik** (Commercial Type) | Workhorse UI sans: nav, buttons, captions, metadata, intro paragraphs (16–18px) | Commercial: "You may not … use it on another website" | **No** |
| **Topol** (Heavyweight Type) | Declared in the font CSS, but it did not load on any page I sampled | Commercial | **No** |

- **What the Manual case study says** (text): "Topol Bold references News Gothic, a typeface that the Eames used in film titles, such as Powers of Ten. Its counterpart Century Schoolbook provides contrast and is used in 'conversation' with Topol … Century Schoolbook Monospace references the archive labeling … Graphik serves as a contemporary 'workhorse' sans serif."
- **What the live site does instead** (INFERRED): it renders the display headlines in News Gothic, the original, not in Topol.
- **Free or OFL equivalents for us** (INFERRED, from type history rather than from this site):
  - Our spec already fixes **Newsreader** (OFL) as the serif. It plays the Century Schoolbook role: headings and reading text.
  - **Source Sans 3** (OFL), one of the two trial sans faces in the spec, was designed by Paul D. Hunt at Adobe after the American gothics of Morris Fuller Benton, News Gothic and Franklin Gothic. So it is the open-licensed cousin of the gothic that Eames uses for its loud headlines.
  - **Public Sans** (OFL) derives from Libre Franklin, so it is in the Franklin Gothic line.
  - Both trial candidates can therefore play the "gothic in conversation with a schoolbook serif" role. Source Sans 3 is the closer match in spirit.
  - We should not add News Cycle or another third face. The spec allows one sans.

## Eames palette (computed values, for reference only)

- **Grounds:**
  - white #FFFFFF (most pages);
  - warm near-black #1E1E19 (Stories pages, the footer, and the intro curtain);
  - pale blue #E2F1F3 and #DCF2F2 (membership block, tour panel);
  - cream #F8E8C7 (newsletter block on every page);
  - light grey #EEEEEE (tour panel);
  - mustard #D6B454 ("Stay Curious" block).
- **Accents:** orange-red #FF4619 (the brand "e", the menu panel, the announcement bar on Stories pages) and pink #F47B9C (the second clause of the home H1).
- **Rules:** 2px solid black, at full content width.
- **Metadata labels:** black at 40% opacity, which is about #999 on white. That is roughly **2.8:1 and fails WCAG AA** at 16px.
- **Grid** (computed on `main` at 1440):
  - 12 columns of 68px across a 1344px measure. That leaves about 48px gutters and a 48px side margin.
  - Named lines: `heading` = columns 1–7, `aside` = 8–12, `rail` = 1–4, `body` = 5–12.

---

## Page 1: Homepage
**URL:** https://www.eamesinstitute.org/
**Screenshots:** `home-steps-1440-v00…v06.png`, `home-steps-390-v00…v06.png`, `menu-open-1440-v00.png`, `menu-open-390-v00.png`. Also `home-1440.png` and `home-390.png` (structure only, with image holes) and `home-1440-fold.png` and `home-390-fold.png` (blank dark).

### OBSERVED
- **First screen at 1440** (`home-steps-1440-v00`):
  - A thin dark announcement bar: "Membership and gifts make our work possible. Join Us →", with a close ×.
  - A white header: the orange-red "e" logo with a two-line "Eames / Institute" wordmark on the left, and three outline icons on the right (ticket, search, menu). There are no visible text nav links on desktop.
- **Split hero:**
  - The left half holds a very bold, tight gothic H1 in black. It continues mid-sentence in pink: "…Curiosity—dramatically expands the Eames Archives".
  - The right column holds a short sans paragraph (about 18px, generous leading) and one small black button ("Learn More": white text, about 6px radius, 39px tall).
  - Below them, a near-full-width photograph with slightly rounded corners shows visitors among paper lanterns, Eames furniture and a wall of graphics, with people talking. It reaches the bottom of the first screen.
- **Mission statement** (`v01`): after the photo, a full-width 2px black rule. Beneath it, a large regular-weight serif statement sits in the right two-thirds, with nothing on its left.
  - A small cut-out photo of an artifact (a wire chair) sits low in the left margin.
  - Its grey caption reads "DKR-2 Upholstered Wire Chair →" (`v02`).
- **Membership block** (`v02`): a full-bleed split. On the left, a photo of a guide pointing out shelves of chair parts to a group. On the right, a pale-blue panel with a large serif headline ("Help Us Build What's Next—Become a Member"), a sans paragraph and a black button.
- **Feature row** (`v03–v04`):
  - Left: a large photo of a summer-picnic poster held up outdoors, then a very large serif title ("The Art of the Company Picnic") and a sans summary.
  - Right column, stacked: two smaller items, each an image, then a small sans kicker ("Introducing", "Our Impact"), a mid-size serif title and a sans paragraph.
- **Collection teaser** (`v04–v05`): a 2px rule, then a row of five cut-out artifacts on white that fade in (the first is still faint in `v04`). Below them sit a centred large serif "The Collection", a centred sans paragraph and a black button.
- **Newsletter block:** a full-width cream band with a bold gothic "Sign Up for Our Newsletter" on the left and a white email field with an arrow button on the right.
- **Footer:** near-black. A large heart mark on the left, whose colour differed between captures: gold in `home-1440.png`, red-orange in `home-steps-1440-v05`, pink in `home-steps-390-v05`.
  - Two link columns on the right: primary links in white, secondary links (Curious 100, Museum, Ranch, Careers) in muted grey, and external links with ↗.
  - A back-to-top icon.
  - Fine print: "© 2026 Eames Institute · Privacy · Terms · Sitemap", plus a licence line, "'Eames' used by permission…".
- **Header on scroll:** the header did not appear in any mid-page frame. Its computed position is `sticky`, and in `home-1440.png` it is drawn detached in the middle of the page.
- **Menu at 1440** (`menu-open-1440-v00`):
  - A right-hand panel, about half the width, in solid orange-red, with the page behind it dimmed.
  - Five primary links in very large bold gothic (About, Collection, Visit the Archives, Stories, Join & Support).
  - A separate lower group of smaller sans links (Curious 100, Museum, Ranch, two publisher links with ↗).
  - A thin × at the top right.
- **Phone at 390** (`home-steps-390-v00…v06`):
  - The announcement bar wraps to two lines, and the header keeps the logo and three icons.
  - The H1 wraps to seven lines (bold gothic, about 36px).
  - The photo comes next, then the intro paragraph and "Learn More". The button falls on the second screen.
  - The mission statement stays large (about 36px serif) and fills a whole screen.
  - The membership block stacks with the text first and the photo below.
  - "Curious 100" and "Impact" sit side by side in two narrow columns of about 170px, with hyphenated breaks ("experimenta-tion").
  - The collection teaser shows three small artifacts in a row.
  - The newsletter and footer stack.
- **Phone menu** (`menu-open-390-v00`): a full-screen orange-red panel. The "e" mark (logo only) sits at the top left and an × at the top right. Below them come the five big bold links and then the smaller secondary group.

### INFERRED
- **Hidden header:** it hides as you scroll down and returns as you scroll up.
- **Scroll-driven page:** the reveals depend on JavaScript and scrolling. The dark first screen is an intro curtain, so with no JS, or in a crawler or screenshot, the page starts blank. The homepage's real job is that first split: one headline, one short paragraph, one action, and one photo of people using the place.
- **Two voices:** the serif carries the institution's calm voice (mission, section titles), and the bold gothic carries announcements and calls (hero, newsletter, menu).
- **The heart** probably picks a random colour on each load, as a playful brand touch.

### Takeaways for the Mayo AI Literacy Club
- **Take the split hero:**
  - an H1 in `heading` columns 1–7;
  - a two- or three-sentence intro plus ONE primary button in `aside` columns 8–12;
  - then the November 20, 2025 meeting photo almost full width, with 0–4px corners, not Eames' 6px.

  This is exactly our homepage and `/join` shape, and Eames proves that one photo of real people doing the activity carries a mission better than any graphic.
  - **On phones, keep the action before the photo.** Eames lets its button fall to screen two (`home-steps-390-v01`). Our spec needs participation within the first two screens, so the order on phones is headline, intro, button, then photo.
- **Take the mission statement as a typographic event.** After a full-width rule, set "We teach students how to use AI without quietly handing it their thinking." very large in Newsreader 500, on its own, with nothing else in the section.
  - It is the calmest and most "institutional" moment on the page, and it costs nothing.
  - Unlike Eames, start it at column 1, not indented to column 5, to respect the no-left-rail rule.
- **Take the phone menu structure:**
  - a full-screen panel in a brand colour: Deep Forest #122e1e with Parchment text;
  - primary links large (Newsreader 500 or the chosen sans at about 34px);
  - Join as a distinct Light Gold #E8B84B or Parchment button;
  - secondary links (Mercurius AI, Instagram ↗) smaller below.

  Add what Eames lacks, which our spec demands: `aria-expanded`, Escape to close, and focus management.
- **Take the footer anatomy:**
  - a dark ground (Deep Forest);
  - the seal on the left;
  - primary links bright and secondary links muted (still AA);
  - ↗ on external links (Instagram, Google Forms, App Store);
  - and the legal line in the fine print. Our non-affiliation disclaimer belongs exactly where Eames puts its "used by permission" licence line.
- **What NOT to take:**
  - the hamburger-only desktop nav (our six items fit and must be visible, with Join distinct);
  - the dark intro curtain and the scroll reveals (the spec forbids scroll animations, and they make the page blank without JS);
  - the hide-on-scroll header;
  - the pink or orange accents, the "e" and the heart (proprietary brand);
  - 39px buttons (our minimum target is 44px);
  - two narrow text columns on a 390px phone;
  - and the cookie notice that treats a visit as consent.

---

## Page 2: Stories index
**URL:** https://www.eamesinstitute.org/stories/
**Screenshots:** `stories-steps-1440-v00…v11.png`, `stories-steps-390-v00…v05.png`, `stories-1440.png` (structure).

### OBSERVED
- **A dark section:**
  - The whole page sits on near-black #1E1E19.
  - The announcement bar turns orange-red.
  - The logo and icons turn white.
- **Masthead:** a huge bold gothic "Stories" on the left, and a short serif paragraph on the right ("Curiosity is our most powerful tool…").
- **Featured story:**
  - A wide photo with rounded corners (the picnic poster outdoors).
  - Below it, a small sans kicker "Featured", a large serif title on the left, and a serif summary on the right.
  - A thin light rule ends the block.
- **Story grid:** three columns of cards, repeated down the page. Each card has:
  - a tall photo (portraits of designers in their studios, archival black-and-white photos, collage illustrations);
  - a medium-weight sans title;
  - a 3–4 line serif summary in small type.
- **Membership interstitial:** after a few rows, a membership block appears on the dark ground. It has a bold gothic headline and a white button with dark text.
- **Pagination** is centred: "← Previous · Next →".
- **Phone** (`stories-steps-390-*`):
  - single column;
  - the "Stories" title stays huge;
  - the featured title is serif, about 36px;
  - each card has a full-width tall image, then a sans title and a serif summary;
  - the gaps between cards are generous.

### INFERRED
- **A "room" for journalism:** switching the whole section to a dark ground separates the magazine from the institution pages without changing the type system.
- **Hierarchy through two faces:** sans titles over serif summaries make the cards scannable while keeping a reading voice.
- **Photography carries the identity:** most images are people photographed in their own work spaces.

### Takeaways for the Mayo AI Literacy Club
- **For The AI Literacy Review (`/blog`):**
  - lead with ONE featured signed piece (title in Newsreader, summary, byline, date);
  - then the rest as a list.
  - With about five pieces, use our spec's hairline-divided list rather than a 3-up photo grid. Eames' grid only works because it has dozens of stories with commissioned photographs.
- **Take the pairing of sans title and kicker with a serif summary,** with authorship and date in the sans. Signed writing is one of our credibility assets, so the byline must be visible in the list, not only on the article.
- **Consider a Deep Forest masthead band for The Review only,** as Eames does for Stories, so The Review reads as the club's publication. Keep the reading pages on Parchment (see Page 3).
- **What NOT to take:**
  - photo-led cards when we have no real photograph for each piece (no stock or AI imagery: the truthfulness rule);
  - the membership interstitial inside the list;
  - and an entirely dark section for an archive of long reads.

---

## Page 3: Story / article page
**URL:** https://www.eamesinstitute.org/stories/summer-picnic-poster-designs/
**Screenshots:** `story-picnic-steps-1440-v00…v10.png`, `story-picnic-steps-390-v00…v11.png`, `story-picnic-1440.png` (structure).

### OBSERVED
- **Dark page** (#1E1E19) with an orange-red announcement bar.
- **Head of the article** (`v00`):
  - a small sans "Stories" link;
  - a massive white bold gothic H1 on two lines (computed 92px/92px, weight 700);
  - "By Shonquis Moreno" in medium-weight sans in the left column;
  - a large serif standfirst in the right three-fifths (computed 39px, tight leading).
- **Lead image:** a wide photograph of the 2026 poster held in a garden, with a small caption beneath: "Artist: Chloe Looker, 2026."
- **Body:**
  - serif, white on dark;
  - computed 22px/34.5px, 766px wide, starting at column 5;
  - inline links underlined with a drawn line about 2px thick.
- **Image rows:** the posters run in rows of three. Each poster image has a small sans caption with credit, year and accession number, e.g. "Design: Stephen Frykholm for Herman Miller, 1970. Artifact# 2020.6.1."
- **Later posters** sit in a horizontal row that runs off the right edge. On phone it is a swipe row with a peeking next item.
- **Ending:**
  - an italic serif note ("The Herman Miller posters are on display in our new Welcome Center…");
  - a ❤ glyph closing the last paragraph;
  - an italic serif sign-off in muted grey.
- **"Related Stories":** a bold gothic heading and three cards (photo, serif title, small serif summary).
- **Phone** (`story-picnic-steps-390-*`):
  - H1 about 44px, standfirst about 28px, body 17px serif with comfortable leading, 15px side margins;
  - the posters drop to two columns with captions under each;
  - the later posters become a swipe row.

### INFERRED
- **The type does the work:** a loud gothic headline, a calm serif standfirst, and a plain serif body at a good measure (about 70 characters at 1440).
- **Captions treat the artifacts as records,** not decoration: who made it, when, and the archive number. This is what makes an editorial page feel like the voice of an institution.
- **Dark-ground reading** works here because the images are bright posters. For long text-only pieces, it is harder on the eyes than a light ground.

### Takeaways for the Mayo AI Literacy Club
- **Article anatomy for `blog-post`:**
  - section link (sans);
  - H1 (Newsreader 600);
  - byline and date (sans, tabular figures);
  - standfirst (Newsreader at about 26px);
  - body in Newsreader at about 19–21px and at most 66ch;
  - figures with sans captions.

  This maps one to one onto our spec's type roles, with no new fonts.
- **Captions as factual records.** Copy the *structure*, not the words: date in words, then what it is, then where. For example: "Thursday, November 20, 2025. A weekly meeting in the MHS Library Classroom." Set them in the utility sans, at 14–16px, in `--muted-text` #5e6b60 (5.28:1).
- **Italics for titles of works.** Eames italicises exhibition titles ("More from *The Ever-Evolving Eames Aluminum Group*", Page 4). Use Newsreader italic for "*Teaching the Pause: A Student-Led Model for Critical AI Literacy*" and for article titles cited in running text.
- **What NOT to take:**
  - the dark article ground (keep Parchment for reading, and never touch the Pentagon `<article>`);
  - the 92px gothic H1 (we have no gothic display face, and the spec puts headings in Newsreader);
  - horizontal scrollers;
  - the ❤ flourish.

---

## Page 4: Collection object page
**URL:** https://www.eamesinstitute.org/collection/eames-aluminum-group/682-lounge-chair/
**Screenshots:** `object-682-steps-1440-v00…v05.png`, `object-682-steps-390-v00…v06.png`, `object-682-1440.png` (structure).

### OBSERVED
- **White page, with a sans breadcrumb:** "Collection / The Ever-Evolving Eames Aluminum Group".
- **Two columns:**
  - Left: a large product photo of the chair on a pale grey ground with rounded corners.
  - Right: a medium-weight sans title ("682 Lounge Chair with Arms") and a long sans description of about 18px in about 490px.
- **Metadata list** (`v01`, right half): stacked pairs, each a small grey label above a black value, with no dividers:
  - Artifact: 2019.1.26;
  - Materials;
  - Artists / Designers;
  - Manufacturer;
  - Dimensions (imperial over metric);
  - Weight;
  - Design Date;
  - Date.

  The labels compute to black at 40% opacity.
- **Gallery:** a two-up grid of further views of the chair on grey.
- **Floating control:** a dark box in the bottom-right corner (grid icon, ←, →), which stays on screen while scrolling.
- **"More from *The Ever-Evolving Eames Aluminum Group*"** follows a 2px rule. It has a serif heading with the exhibition title in italic, a sans paragraph and a black "See the Exhibition" button, then three related objects with sans names.
- **Phone:** everything stacks in this order:
  - image, then title;
  - description;
  - the metadata list, single column;
  - the gallery, two-up and then full width;
  - the floating prev/next box, which stays in the bottom right.

### INFERRED
- **The metadata list is the visual expression of rigour:** plain labelled facts, with dimensions in two systems. Values carry the weight; labels recede.
- **The floating prev/next box** lets a visitor browse the collection object by object.

### Takeaways for the Mayo AI Literacy Club
- **Use the labelled-facts pattern for our evidence and logistics,** with our spec's hairline dividers and labels in AA-passing `--muted-text`, never in 40% black:
  - **The AACA poster as a record:** Title (in italic) / Presented by / Meeting / Host / Dates / Attendance, with the Mayo Clinic non-affiliation sentence directly beneath. It reads as documentation, not boasting, which suits an organisation whose mission is judgment and evaluation.
  - **"Your first Thursday" on `/join`:** When (Thursday, 8:20 AM) / Where (MHS Library Classroom) / Who (Mayo High School students) / Sign-up (none for a first visit) / Experience (none needed).
  - **Chapter requirements on `/chapters`:** Founder / Faculty advisor / Meetings / Events / Cost.
- **Use tabular figures for dates and times in these lists,** as the spec requires.
- **What NOT to take:**
  - the low-contrast labels;
  - the floating prev/next box;
  - and product-shot galleries (we have no objects to photograph this way).

---

## Page 5: Collection index
**URL:** https://www.eamesinstitute.org/collection/
**Screenshots:** `collection-steps-1440-v00…v09.png`, `collection-steps-390-v00…v05.png`, `collection-1440.png` (structure).

### OBSERVED
- **Header row:** a large serif H1 "The Eames Collection" on the left and a short sans intro on the right.
- **Filters:** a row of light-grey filter chips (Type, Materials, Color, Manufacturer, Time), each with a small up/down chevron.
- **Object field:** a long, loose, staggered grid of cut-out objects on pure white, mixing furniture, toys, letters, postcards and posters. Each object has a small grey sans caption ending in "→" (e.g. "Kettler Car / Kettcar →"). There are no frames or borders.
- **"About the Eames Collection":** a serif heading under a rule, with the prose offset to the right column. Inline links are underlined.
- **"All Exhibitions":** a three-column grid of cards (photo, serif title, sans paragraph).
- **Phone:** a two-column staggered field of cut-outs with captions. The chips wrap to two rows.

### INFERRED
- **An archive as play:** seeing many real objects side by side, without boxes, says "curiosity" more strongly than any copy.

### Takeaways for the Mayo AI Literacy Club
- **The underlying idea transfers; the layout does not.** The idea is that real artifacts, shown plainly and captioned, are the argument.
  - Our real artifacts are the meeting photographs, the AACA poster (pending permission, content-needs #9), and the club's own lesson materials, if photographed.
  - Each should appear once, large and captioned, rather than in a field.
- **For Learn (`/topics`):** the resource library can borrow the caption-plus-arrow link style ("Topic name →") in a hairline list.
- **What NOT to take:**
  - the masonry of cut-outs (we have no such assets, and inventing or generating them breaks the truthfulness rule);
  - the filter chips (no new features).

---

## Page 6: About
**URL:** https://www.eamesinstitute.org/about/
**Screenshots:** `about-steps-1440-v00…v09.png`, `about-steps-390-v00…v07.png`, `about-1440.png` (structure).

### OBSERVED
- **Masthead:**
  - a large serif H1 on two lines ("Rooted in Legacy, Powered by Curiosity");
  - a 2px rule;
  - an in-page sub-nav in small sans (About · Membership · Trustees · Team · Contact);
  - then a wide photo of visitors looking at a wall of framed works (it has a pause control, so it is likely a video).
- **Sections:** each section opens with a full-width rule, a serif heading at column 1, and prose in the `body` column, starting at about column 5 with an empty column on the left.
- **Margin specimens:** small cut-out artifacts with grey captions and "→" sit in the empty left margin beside the prose. The examples are "Plywood Body Litter Prototype →" and "EC176 Loose Cushion Armchair (Casters) →".
- **Board of Trustees:** greyscale studio portraits in a row. Each has a name (sans medium), a role in grey, and an italic book credit.
- **Meet the Team:**
  - colour environmental portraits, each person in a workplace;
  - name and role;
  - an "Ask me about:" line with personal interests;
  - a "View All" outlined button.
- **Other blocks:**
  - a cream newsletter block with radius;
  - "The Eames Ecosystem" and "Contact" prose sections (emails as underlined links);
  - a mustard "Stay Curious" block of four story teasers.
- **Phone:** the H1 is serif, about 50px. The sub-nav becomes a two-column list under the rule. The prose runs full width at about 17px sans. The margin specimens move to a small image after a paragraph, still captioned.

### INFERRED
- **Rules mark the rhythm:** a full-width rule plus heading marks each new topic, so long pages stay navigable.
- **Proof through specificity:** the in-page sub-nav and the names-with-roles make an institution feel accountable.
- **Specimens tie pages to the collection:** the margin specimens connect institutional pages back to the collection.

### Takeaways for the Mayo AI Literacy Club
- **Take the rule-then-heading rhythm for each section** (a 2px line in Forest or Ink, with the Newsreader heading directly beneath).
  - **Then put the content directly under the heading, starting at column 1.** Eames' empty column 1–4 rail with body text in 5–12 is exactly the left-rail indentation our spec drops.
- **Board on `/about`:**
  - our four real headshots in one consistent treatment (Eames keeps each group consistent: trustees greyscale, team in colour);
  - name in sans, role beneath in `--muted-text`.
  - No "ask me about" lines unless the board writes them (no invented personal detail).
- **On long pages, an in-page sub-nav under the H1 suits `/chapters`** (Purpose · Requirements · Support · What happens next · Apply). It also gives the founder form an early link without breaking the spec's reading order.
- **What NOT to take:**
  - the left-margin specimens and the empty rail;
  - the video hero;
  - several different coloured blocks on one page (cream, mustard, blue).

---

## Page 7: Visit the Archives
**URL:** https://www.eamesinstitute.org/visit/
**Screenshots:** `visit-steps-1440-v00…v09.png`, `visit-steps-390-v00…v07.png`, `visit-1440.png` (structure).

### OBSERVED
- **Masthead:** a serif H1 on three lines on the left. On the right, a sans intro and a black "Book Tickets" button. Under a rule, a sub-nav (About · Tours & Experiences · Directions · FAQ … Contact Us on the far right). Then a wide photo of the Archives room (plywood elephant, flat files, pictures).
- **"Explore an Unrivaled Collection of Everything Eames":** a serif heading, then prose that opens with a short Charles Eames quote. A margin specimen ("Portrait of Ray →") sits beside it.
- **"Tours & Experiences":** the serif section heading stays pinned in the left column while three tour cards scroll past on the right. Each card has:
  - a photo;
  - a tinted panel with radius (pale blue, cream, light grey);
  - a serif title;
  - a sans paragraph;
  - "Book Tickets →" or an email link.
- **Practical blocks:** small medium-weight sans headings with plain sans text:
  - "Public Tour Schedule": a two-column day / time list ("Thursdays  2:00 pm & 4:00 pm");
  - "Public Tour Pricing": a label / price list;
  - age rules stated plainly;
  - Accessibility;
  - Cancellations and Refunds;
  - Research Inquiries.
- **"Tour Highlights":** a pale-blue band with a centred serif heading, a paragraph and a button, then a row of photos and white cards (Welcome Center, Life Gallery, Work Gallery).
- **Directions:** a greyscale map with the "e" pin, an address and transit notes. **FAQ:** a hairline-divided accordion with "+" toggles.
- **Phone:**
  - H1, intro, then "Book Tickets", all in the first screen, before the photo;
  - the sub-nav becomes a vertical list;
  - the tour cards stack;
  - the schedule and pricing lists keep their two columns.

### INFERRED
- **The most practical page,** and the closest analogue to our `/join`. Every decision a visitor needs (when, how much, who can come, accessibility, what if plans change) is stated in short, plain blocks next to the action.
- **The phone layout puts the action before the imagery,** unlike the homepage.

### Takeaways for the Mayo AI Literacy Club
- **Model `/join` on this page's logic:**
  - the H1 and a short intro with an action in the first phone screen;
  - then the three routes (our "tour cards") each with a number, heading, two or three lines and real buttons;
  - then the plain practical blocks.

  Use our spec's dividers instead of tinted rounded panels.
- **State eligibility as plainly as Eames states age limits:** "Thursday meetings are for Mayo High School students. Outside visitors, including students from other schools, can't attend school meetings." Same tone: factual, not apologetic.
- **"Your first Thursday" = Eames' tour schedule block:** a short sans subhead, a two-column when/where list with tabular figures, then two short sentences. Keep it next to the "Leave your name" action.
- **A hairline accordion is acceptable later for a chapters FAQ,** but only with confirmed answers. Content-needs #14–#17 are still open, so not now.
- **What NOT to take:**
  - the sticky left-column heading (a variant of the left rail);
  - the map (no address to show; school location details are not ours to publish);
  - pricing (starting a chapter costs nothing: say so in words);
  - the tinted rounded tour panels.

---

## Page 8: Manual case study (the studio behind the identity)
**URL:** https://manual.studio/work/eames-institute
**Screenshots:** `manual-1440.png` (rendered fully; captured to 30,000px of 32,068px), `manual-390.png`, `manual-1440-fold.png`, `manual-390-fold.png`.

### OBSERVED
- **Masthead:**
  - a white header with a "Manual" wordmark;
  - the line "A home for curious problem-solvers.";
  - a full-bleed photo of stacked Eames chairs, toy elephants and a stool on shelves.
- **Intro block** (crop of `manual-1440.png` at about y 1600–2150):
  - "Eames Institute" in a large serif on the left, with a "CREDITS +" pill;
  - on the right, grey labels ("Introduction", "Challenge") over bold sans paragraphs that fade out, then "READ MORE".
- **Showcase:** a long run of full-bleed coloured fields (black, warm grey, orange, olive, cream, blue), each framing a photograph of the identity in use. Small pill labels with "+" ("The Eameses' Legacy", "The curious e", "Typography", "Web Design", "Launch Kit") sit on the images. Image counters ("1/6", "2/9") appear.
- **Physical pieces shown:**
  - flat-file drawers with paper labels;
  - a "PLAY / WORK" circle poster in a drawer;
  - a black poster of concentric rings of serif text ("Develop a curiosity. Look at things as though for the first time…");
  - a poster headed "Welcome to the Eames Institute of Infinite Curiosity" (bold gothic) continuing "for a day of serious play." (serif), with a programme of times in small sans in an orange field;
  - stationery and business cards in red, orange, olive and blue;
  - a phone with a pink screen and the "e";
  - a website mock with a bold gothic headline whose second half is blue ("—where the lessons of Ray and Charles come to life.");
  - a launch-kit box, seed packet, prints and a tote bag photographed outdoors.
- **Phone:** single column, with carousels showing dot pagination, and the same pill labels.

### OBSERVED as text (curl; the text sits in collapsed panels, so it was not all visible in the screenshots)
- **Challenge:** "not to create a brand that simply looked 'Eamesian' or traded on nostalgia"; the brand had to hold "an archive, a cultural institution, a publishing platform, a public-facing educational resource."
- **Insight:** build the identity "not around the Eameses' most iconic objects, but around the mindset that shaped them."
- **Solution:**
  - the work grounded in immersion in the real archive;
  - "typography inspired by Eames ephemera and film titles";
  - a palette "drawn from their graphic materials";
  - a stated tone of "scholarly but never stiff, playful but never naive".
- **Components and credits:**
  - the "curious e" monogram "designed to shift its gaze";
  - the type quote in the font section above;
  - the website was built by Instrument;
  - the photography and illustrations are credited to named people.

### INFERRED
- **Our brief has the same problem as Eames:** to be an archive, an educational resource, a publisher and an invitation all at once. It also has the same answer: build around a *way of thinking* and find the visual language in the organisation's own real materials.
- **The two-voice sentence** (bold sans clause plus serif clause) is the signature move. It appears on the poster, the website mock and the live homepage H1 (where the second clause changes colour instead).

### Takeaways for the Mayo AI Literacy Club
- **Build around the mindset, not the subject.** For us that means the pause, judgment, and questioning AI output, not robots, circuits, chat bubbles or glowing brains. Our seal, the table photo and the poster title "*Teaching the Pause*" are our "archive clues".
- **Find the type in our own artifacts:** the founders' poster, handouts, and library labels in the MHS Library Classroom. One idea that fits the spec is that the "record" lists (AACA citation, first-Thursday facts) can feel like catalogue cards. That means a sans label, a serif value and tabular figures. It needs no extra font (the spec retires Space Mono).
- **Borrow the poster's two-voice line as a pattern for a few key lines only,** within our two fonts. For example, a sans label line "This Thursday" over a Newsreader sentence, or a Newsreader 600 clause continuing in Newsreader italic 400.
  - Keep the second clause in Ink or Forest. Never Gold on Parchment: it fails contrast and our spec forbids it.
- **Tone check for all copy and design:** "scholarly but never stiff, playful but never naive". It fits a student-run club whose subject is judgment.
- **What NOT to take:**
  - the multi-colour field palette;
  - commissioned illustration;
  - the animated monogram;
  - the merchandise;
  - fading "read more" text;
  - pill labels over photos;
  - carousels.

  None fits a plain-HTML school-club site with no budget and real-photos-only rules.

---

## Summary of takeaways, and the screenshots that show each one best

1. **Split hero (headline in 1–7, intro and one action in 8–12, then a real photo of people):** `home-steps-1440-v00.png`. On phones the action must come before the photo, as Visit does: `visit-steps-390-v00.png`. Eames' homepage does not do this: `home-steps-390-v00.png`, `home-steps-390-v01.png`.
2. **Mission line as a large serif statement after a full-width rule:** `home-steps-1440-v01.png`; on phone, `home-steps-390-v01.png`.
3. **Two voices (sans for labels and actions, serif for statements and reading), and the two-clause headline:** `story-picnic-steps-1440-v00.png`, `home-steps-1440-v00.png`, and the poster at y≈12,500–13,500 in `manual-1440.png`.
4. **Labelled facts as records (AACA citation, first Thursday, chapter requirements):** `object-682-steps-1440-v01.png`; on phone, `object-682-steps-390-v01.png`.
5. **Plain practical blocks next to the action, and eligibility stated plainly (for `/join`):** `visit-steps-1440-v06.png` to `v07.png`; on phone, `visit-steps-390-v06.png` to `v07.png`.
6. **Captions as factual records (credit, date, number):** `story-picnic-steps-1440-v01.png` to `v03.png`, `story-picnic-steps-390-v01.png` and `v03.png`.
7. **Article anatomy (section link, H1, byline, standfirst, 66–70ch body, figures, related):** `story-picnic-steps-1440-v00.png` to `v02.png` and `v09.png`, `story-picnic-steps-390-v00.png` to `v02.png`.
8. **Review index with a featured piece first, then the rest:** `stories-steps-1440-v00.png` to `v02.png`, `stories-steps-390-v00.png`.
9. **Rule-then-heading section rhythm (without the left rail):** `about-steps-1440-v01.png` and `v08.png`; for the rail NOT to copy, `about-steps-1440-v02.png`.
10. **Phone menu as a full-screen brand panel with big primary and small secondary links:** `menu-open-390-v00.png`, `menu-open-1440-v00.png`.
11. **Footer anatomy with the legal line in the fine print:** `home-steps-1440-v05.png`, `story-picnic-steps-1440-v10.png`.
12. **Real artifacts shown plainly and captioned (the idea, not the masonry):** `collection-steps-1440-v00.png`; on phone, `collection-steps-390-v00.png`.
13. **Build from the mindset and the organisation's own materials:** the intro text crop (y≈1600–2150) and the showcase in `manual-1440.png`; on phone, `manual-390.png`.
14. **Things to avoid, as evidence:**
    - the intro curtain / blank first screen: `home-1440-fold.png`;
    - scroll-reveal holes: `home-1440.png`;
    - hamburger-only desktop nav: `home-steps-1440-v00.png`;
    - 2.8:1 metadata labels: `object-682-steps-1440-v01.png`;
    - cramped two-column text on phone: `home-steps-390-v04.png`.
