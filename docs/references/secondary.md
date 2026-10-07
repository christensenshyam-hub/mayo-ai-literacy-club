# Secondary references: resource discovery, author-led reading, type with people and UI

Internal art-direction research for the Mayo AI Literacy Club redesign. Not published.

- **Observed on:** October 6, 2026.
- **Screenshots:** `.shots/refs/secondary/` (gitignored). They were taken with `tools/shoot.mjs` (`SHOOT_SCROLL=1`, `SHOOT_WAIT` 2500–4000) at 1440 and 390px. For clicks (menus, filters, overlays) I used a copy of `shoot.mjs` that runs one script before capture. Tall pages were cut into `-sNN` slices or `-strip` composites so the text could be read.
- **Rule used in this file:** OBSERVED means I saw it in a named screenshot. INFERRED means my interpretation, or something known only from HTML, CSS, DOM probes or page text. Where a value came from the DOM rather than from the picture, it is marked "(DOM)".
- **We take patterns, never assets.** Nothing here may be copied: no logos, illustrations, photos, exact layouts or wording. Every font these sites use is commercial or system-only (see "Fonts" under each site), so none of them can be used. The Mayo type stays Newsreader (OFL) with Public Sans or Source Sans 3 (both OFL), as `participation-redesign.md` §2 sets out.

## What did not render, or rendered only partly

1. **Geist case study, desktop, first try:** the full-page capture was only 900px tall. A smooth-scroll script locks `html`/`body` (`overflow: hidden`, class `has-scroll-smooth`), so `geist-anthropic-1440-fold.png` shows only the first screen.
   - I then took scrolled viewport frames (`geist-sheet-1440-00…05.png`) and a "flattened" full page. For that one I injected CSS that turns the scroll transform off (`geist-flat-1440*.png`).
   - The flattened layout may differ slightly from the live page.
   - One illustration tile came out blank in the flattened capture. The tiles look animated, and the illustration changed between loads.
2. **Geist case-study text** lives in an "Info" overlay. It appeared only after a script clicked `button.btn-open-overlay` (`geist-info-*-fold.png`). The client quote and credits further down the overlay were NOT captured; I know them only from the HTML.
3. **d.school Tools index: no filters rendered.** The task brief mentions filters. My DOM probe of the rendered page found only these visible controls: Search, Toggle Menu, Close Menu, Close search, the search input, and Previous/Next for the featured carousel.
   - The small topic tags ("Educators", "Equity", "Emerging Tech") are `<span>`s inside each card's link, so they are not filters.
   - There is an empty gap under "ALL TOOLS" (`dschool-tools-1440-s01.png`). Its purpose is unknown.
4. **d.school images:** the "Featured collections" cards render as solid blue blocks with no image (`dschool-tools-1440-s00.png`). On the phone, two images stayed blank: the featured-tool image (`dschool-tools-390-strip.png`, middle column) and the author headshot on the detail page (`dschool-detail-390-strip.png`, right column). The cause may be lazy loading or animation.
5. **TCI homepage:** at the moment it opens with a ten-year anniversary letter ("TCI Turns 10"), not the usual index. The usual index appeared only after "Continue" (`/#home`), in `tci-continue-*`.
   - The phone filter did not open on the first scripted click. A second attempt (setting `details.open`) worked: `tci-filter-phone-390-fold.png`.
6. **Hover and focus states** were not observed on any site.

---

## 1. Stanford d.school: Tools index

**URL:** https://dschool.stanford.edu/innovate/tools

**Screenshots:**
- `dschool-tools-1440-fold.png`
- `dschool-tools-1440-s00…s05.png`
- `dschool-tools-390-fold.png`
- `dschool-tools-390-strip.png`
- `dschool-phone-fold-vs-menu.png`. The phone first screen and the open menu, side by side.
- `dschool-menu-390-fold.png`

### OBSERVED
- **Header:** a centred wordmark, a pill-shaped "SEARCH" field at top right, and a four-dot menu button. On the phone, search becomes a round icon at the left (`dschool-tools-1440-fold.png`, `dschool-phone-fold-vs-menu.png`).
- **Hero:** a full-width teal band with letter-spaced, underlined breadcrumbs (HOME | INNOVATE | TOOLS, then a red dot). Below them is one serif paragraph that opens with the bold page name, "Tools •", and runs straight into the intro. That paragraph mixes bold and italic words for emphasis (`dschool-tools-1440-fold.png`).
- **Section labels:** small, bold, wide-tracked caps ("FEATURED COLLECTIONS", "ALL TOOLS"). Each is followed by a large serif sentence that mixes italic and bold.
- **Featured collections:** four tall saturated-blue cards with a vertical "READ MORE" label. The title sits bottom left, with a white circular arrow button at bottom right. No images rendered (`dschool-tools-1440-s00.png`).
- **Featured tool:** a tilted photo (a hand holding a phone) beside a title, a one-line italic-accented description, a "Read More" pill with a red arrow, and Previous/Next text links above a hairline (`dschool-tools-1440-s00/s01.png`).
- **"All tools":** a 4-column grid of equal, tall, flat teal cards with small rounded corners, at 1440.
  - Each card has a vertical "• TOOL" label, a bold sans title, and a serif description cut off with an ellipsis.
  - Some cards have a tiny white tag chip at the bottom left ("Emerging Tech", "Educators", "Systems Design", "Equity", "Futures", "Professionals", "Social Impact").
  - The cards carry no images, and most of each card is empty teal (`dschool-tools-1440-s01…s05.png`).
- **The page ends** with one more blue "From the d.school archive" card, then a near-black footer. The footer has a torn-paper top edge, five link columns, a newsletter block with a red rule, and a large red exclamation graphic (`dschool-tools-1440-s05.png`).
- **Phone:**
  - **Cards:** one column, each card nearly a screen tall.
  - **Length:** the page ran past the 16,000px capture cap (`dschool-tools-390-strip.png`).
  - **Menu:** it opens as a stack of four coloured panels (About, Study, Innovate, Connect). Each panel has a circular arrow, a bold-plus-italic serif blurb and underlined sub-links. A "Close Menu ⊗" pill sits at the top right, and the page shows dimmed behind (`dschool-phone-fold-vs-menu.png`).

### INFERRED
- The index does no faceted filtering on this day (DOM probe; see the list at the top). Discovery depends on browsing, on curated "collections" and on site search.
- Cards are colour-coded by type: `data-theme="teal"` and `data-layout="tool"` in the card HTML.
- Card height looks fixed to fit the longest text, which is why most cards are mostly empty.
- The vertical labels and the very small tag chips probably hurt legibility. The chips look roughly 9px at 1440, a visual estimate.
- **Fonts (CSS):**
  - **GT America:** a variable font, self-hosted. It is by Grilli Type and commercial.
  - **Signifier:** self-hosted. It is by Klim Type Foundry and commercial.
  - **"The Future":** bold, self-hosted (`/fonts/the-future-bold.woff2`). Its foundry can't be verified from the CSS, and it is not on Google Fonts, so I treat it as commercial.
  - Some UI uses `system-ui`.
  - None of these can be used by Mayo.

### Takeaways for the Mayo AI Literacy Club (Learn, `/topics`)
- **Take: say what kind of thing each resource is, in a short label above the title.**
  - The d.school marks each card "TOOL" or "STORY" and adds one topic chip. Learn already has a `.label` ("Free course", "Interactive", "Video · 19 min · 3Blue1Brown").
  - Keep that, but set it horizontally in the utility sans (Public Sans or Source Sans 3) at 14px or larger, with tabular figures for durations.
  - Why: a student scanning a list decides by type and time before reading a title.
- **Take: curated "start here" groups above the full list.** d.school's "Featured collections" pick a few entry points before the long grid. Learn's existing groups ("Getting started", "Ethics and critical thinking", …) already do this job, so give "Getting started" the first and clearest position.
- **Take: one sentence that frames the page, set in the editorial serif, with the page name leading.** The d.school hero runs "Tools • Design takes practice…" as one paragraph. In Newsreader at 21–26px this suits Learn's intro, and it fits our "headings ≤ 20ch, prose ≈ 66ch" rule.
- **Do NOT take:**
  - tall, mostly empty colour cards (they waste phone height: the d.school page ran past 16,000px);
  - saturated full-bleed colour bands;
  - vertical rotated labels;
  - tiny tag chips;
  - tilted photos;
  - the torn-paper footer edge;
  - circular arrow buttons.

  The Mayo spec asks for hairline-divided lists, a 0–4px radius and no decorative effects. A Learn resource list should stay a list.
- **Note on filters:** this page shows that a resource library can work without filters when the groups are good. Learn's "no new features" rule (§6) suggests we don't add filtering now. See TCI below if we do.

## 2. Stanford d.school: a collection page

**URL:** https://dschool.stanford.edu/innovate/tools/get-started-with-design

**Screenshots:**
- `dschool-collection-1440-s00.png`
- `dschool-collection-1440-s01.png`
- `dschool-collection-390-fold.png`, which is also the right-hand panel of `phone-folds-tci-home-interview-dschool-collection.png`

### OBSERVED
- **Hero:** the same structure as the index, in a lighter blue. The breadcrumb is one level deeper (… | TOOLS | GET STARTED WITH DESIGN), and the intro paragraph again starts with the bold collection name.
- **Body:**
  - a "FEATURED TOOLS" label, then a large serif heading ("Start here!");
  - a short two-line explanation;
  - four teal tool cards;
  - an "EXPLORE MORE" label with a serif sentence ("Stories, events & books for the *design-curious*") above a row of mixed cards, some dark and some with images (`dschool-collection-1440-s00.png`).
- **Phone:** the breadcrumb wraps onto two lines, and the intro is about 24px serif on light blue (`dschool-collection-390-fold.png`).

### INFERRED
- Collections are the main discovery tool: a hand-picked set with a one-paragraph reason for its existence, then related reading.

### Takeaways for the Mayo AI Literacy Club
- **Take: "Start here" with a reason.** A short, plain sentence on why these resources come first suits Learn's "Getting started" group. Our verified copy already explains each resource in one sentence.
- **Take: a breadcrumb only where a page sits two or more levels deep.** Learn is one level deep, so the breadcrumb pattern belongs, if anywhere, on `blog-post` ("The AI Literacy Review › title").

## 3. Stanford d.school: a tool detail page

**URL:** https://dschool.stanford.edu/tools/an-other-point-of-view

This page was chosen because it is an AI activity.

**Screenshots:**
- `dschool-detail-1440-fold.png`
- `dschool-detail-1440-s00…s02.png`
- `dschool-detail-390-strip.png`

### OBSERVED
- **Hero (teal):**
  - the breadcrumb;
  - the bold title with "•", followed by a one-line serif question;
  - a hooked arrow pointing to a one-line summary in sans;
  - one tag chip ("Emerging Tech");
  - a large photo on the right (a hand holding a phone, warm and blurred).

  Faint vertical grid lines are visible across the teal (`dschool-detail-1440-s00.png`). A torn edge separates the hero from the body.
- **Body, three columns at 1440:**
  - **Left:** a narrow "Share This" rail of underlined links.
  - **Centre:** a column with a large bold serif lede, short sans paragraphs, and italic serif subheads ("How does it work?", "The activity").
  - **Right:** a "What you'll need" box ("Materials: …", "Time: 12 minutes"), then an "Author" block with a small square headshot, the name in bold serif and the role ("Lecturer") between hairlines (`dschool-detail-1440-s00.png`).
- **Activity steps:** bold "Step 1. Take a photo." lines, each followed by plain text and short bulleted reflection questions. A bold callout reads "This isn't about the AI giving you the 'right' answer." (`dschool-detail-1440-s01.png`).
- **End matter, in order:**
  - "A note from the creator…" in italic;
  - a licence line in caps ("CREATIVE COMMONS ATTRIBUTION-NONCOMMERCIAL-SHAREALIKE 4.0");
  - a hairline, then "RELATED RESOURCES" with two underlined links and arrows;
  - "RELATED ARTICLES" as three cream cards (`dschool-detail-1440-s01/s02.png`).
- **Phone:**
  - **Order:** hero text, then the photo, then "What you'll need", then Share, then the lede and body. "Author" moves to the end, after Related Resources.
  - **Missing:** the author headshot did not render.
  - **Text:** the body sits in a single column at about 14px (`dschool-detail-390-strip.png`).

### INFERRED
- The page is built for someone who will run the activity: the time and materials come first, then the steps, then the reflection questions.
- "Related resources" chains tools together, which is good for browsing in depth.
- Showing the licence plainly signals that the work may be reused.
- The phone puts the practical box above the article, which is the right order for a facilitator.

### Takeaways for the Mayo AI Literacy Club
- **Take: a "what you'll need" box in plain words, for resources a student or a chapter would actually run.**
  - Our chapter program promises "curriculum and lesson materials the chapter can run as written" (`participation-redesign.md` §1).
  - If or when those lessons become pages, each one should open with time, materials and group size. Use confirmed values only, and log anything missing in `content-needs.md`.
  - For now this is a pattern to keep in reserve; Learn gets no new features (§6).
- **Take: "Related resources" as two or three underlined text links with an arrow, after a hairline.** It is cheap, needs no JS, matches our "lists with hairline dividers" rule, and keeps a student moving between resources.
- **Take: reflection questions written as a short bulleted list after an activity.** This fits our mission ("evaluate its output, and preserve their own judgment") and the Thursday "one topic talked through around a table" format. The bold line "this isn't about the AI giving you the right answer" is exactly our stance. Don't copy their wording.
- **Do NOT take:**
  - the share rail (no clear use for a student club);
  - the decorative grid lines and torn edges;
  - the hooked-arrow ornament;
  - small 14px body text in sans. Our body text stays Newsreader at reading size.

---

## 4. The Creative Independent: homepage, anniversary state

**URL:** https://thecreativeindependent.com/

**Screenshots:**
- `tci-home-1440-fold.png`
- `tci-home-1440-s00…s06.png`
- `tci-home-390-fold.png`, which is also the left-hand panel of `phone-folds-tci-home-interview-dschool-collection.png`

### OBSERVED
- **Opening:** a pixel-art spiral logo at top left, with four underlined monospace links beneath it ("Word by word", "An index", "On spiraling around", "Library for 10 years"). At top right are "Explore", "People" and an envelope icon.
- **Collage:** faded greyscale photos scattered behind an outlined serif "TCI Turns 10" headline, with a coloured "10".
- **Letter:** a centred "Dear reader," letter in a large serif runs below. A black "Continue" button is pinned at the bottom right (`tci-home-1440-fold.png`, `tci-home-1440-s00.png`).
- **Word index:** a scrolling ribbon of outlined serif words with one word in solid black, then a huge outlined "unstructured" in quotes. A count line follows ("Mentioned 10 times by 8 people.") with prev/next/spiral buttons.
- **Quotes around a photo:** a greyscale photo of a person at a synth setup, surrounded by short quotes. Each quote sits on a solid colour highlight and carries a tiny avatar, a role and an underlined name (`tci-home-1440-s01.png`).
- **Word counts:** a dotted-leader list of words and counts ("world……6,528"), in a serif for the words and a monospace for the numbers (`tci-home-1440-s01/s02.png`).
- **Spiral archive:** a black section, "On spiraling around", with a pixel spiral of coloured squares labelled by year, a "Everything (2,311)" select, and "Watch the website grow / Hide years / Pause quotes" controls. A dated monospace essay follows on black (`tci-home-1440-s02/s03.png`).
- **Downloadable zines:** a grid of PDF covers on a hairline "shelf". Each cover has a highlighted title, a type and author line ("Interview, Justin Vernon"), an underlined "Download as PDF" and a file size (`tci-home-1440-s05.png`).
- **Letter ending:** the letter is signed "Real Snail" with a small spiral. Below it are credits in small serif: producer, design and development, and image credits with licences (`tci-home-1440-s05/s06.png`).

### INFERRED
- This is a one-off celebratory page, not the standing homepage. Its devices (a collage, outlined type, a data ribbon) belong to the moment.
- **Fonts:** a DOM probe of the letter's body found Georgia 26/39px in a column about 800px wide (DOM). Georgia is a system font: it can't be self-hosted and is not open-licensed.

### Takeaways for the Mayo AI Literacy Club
- **Take: credit people and image sources openly, in small type at the end.** TCI lists who produced, designed and photographed, and which licence each image has. For us: photo captions with dates (§2 "Figures"), and a "Photo:" credit once the photographer for the AACA photos is known (`content-needs.md` #9).
- **Take: a download line written as plain facts.** Its form is "Download as PDF · 3.2 MB", and it suits the AACA poster or lesson materials if we ever offer files. Stating the size respects students on school networks.
- **Do NOT take:** the collage, the outlined display type, the word ribbon, the spiral data art, or colour-highlighted pull quotes on a homepage. They are signature TCI devices, motion-heavy, and outside our "no scroll animations, no decoration" rules.

## 5. The Creative Independent: the regular index, with filter

**URL:** https://thecreativeindependent.com/#home

This is the page that "Continue" leads to.

**Screenshots:**
- `tci-continue-1440-fold.png`
- `tci-continue-1440-overview.png`
- `tci-continue-390-fold.png`
- `tci-filter-1440-fold.png`
- `tci-filter-phone-390-fold.png`

### OBSERVED
- **Header:** the spiral logo with "The Creative Independent" in monospace beneath it, plus a small bird photo cut-out with a yellow "New here?" label at top right.
- **Content-type tabs:** a row of boxed, dotted-border monospace buttons: Everything (solid border, the current one), Interviews, Essays, Guides, Focuses, Approaches, Tips, Wisdom, Zines, Random, "…", and a pill-shaped "Search" (`tci-continue-1440-fold.png`).
- **Filter:** a pill "▸ Filter" control. When opened it shows three plain-text columns with underlined headings: Themes (Adversity, Beginnings, Business, … Time management), Disciplines (Writing, Music, Art, Technology, …) and Languages (French, German, …) (`tci-filter-1440-fold.png`).
- **Grid:** square, flat colour blocks, five per row at 1440, each a different solid colour.
  - Each block has a monospace title in the form "Role Name on topic" at top left and the date at bottom left.
  - Essays carry a black "Essay:" tag and notes a "Note:" tag.
  - There are no images in the blocks (`tci-continue-1440-fold.png`).
  - The grid runs to the 16,000px capture cap (`tci-continue-1440-overview.png`).
- **Phone:**
  - **Tabs:** they wrap into four rows of boxed buttons. There is no hamburger menu.
  - **Filter:** it opens into a single column of plain links under "Themes" (`tci-continue-390-fold.png`, `tci-filter-phone-390-fold.png`).
  - **Grid:** one block per row.

### INFERRED
- The filter is a native `<details>/<summary>` disclosure (DOM: the clicked element was a `SUMMARY`), so it works without JavaScript.
- Type tabs plus facet links are a two-level discovery model: first what kind of thing, then what about.
- The theme names are human ("Creative anxiety", "First attempts") rather than taxonomic.
- **Fonts:** body and UI are Courier / "Courier New" / monospace, a system stack (DOM: computed `font-family`). TCI loads no webfonts. `system-ui` appears in one stylesheet rule.

### Takeaways for the Mayo AI Literacy Club
- **Take, if Learn ever gets filtering: copy the mechanism, not the look.**
  - A `<details>` labelled "Filter" containing plain lists of links works with no JS, fits our vanilla stack, and is accessible by default.
  - Two short facet lists would be enough for us: the topic (our six topics) and the format (course, interactive, video, article, tool).
  - Name facets the way students talk ("How AI works", "AI in health"), as TCI does with "Creative anxiety".
- **Take: the current tab marked by a stronger border, not by colour alone.** A solid border against dotted ones is legible in greyscale. Our version: the current nav item gets a 2px Forest underline plus `aria-current="page"`.
- **Take: a type tag in front of a title** ("Essay:", "Note:"). For the Review, the JSON already has a `category` ("Opinion", "AI Policy", "Meeting Recap", "Hear from the Members", "Announcement"). Show it as a small sans label above the title.
- **Do NOT take:**
  - the random-colour block grid (it has no meaning, and it would fight our restrained palette);
  - the all-monospace typography (we are retiring Space Mono);
  - dotted borders;
  - ten-plus content types;
  - the bird or spiral mascots.

  Our Review has five posts. A dated list with hairlines is the right size for it.

## 6. The Creative Independent: an essay page (author-led reading)

**URL:** https://thecreativeindependent.com/essays/containing-multitudes/

**Screenshots:**
- `tci-essay-1440-fold.png`
- `tci-essay-1440-s00…s04.png`
- `tci-essay-390-strip.png`

### OBSERVED
- **Theme:** the whole page is set on black for essays: white boxes inside a black page. The "Essays" tab is outlined as current (`tci-essay-1440-fold.png`).
- **Newsletter strip:** a hand-drawn cloud-and-envelope doodle and a "Subscribe" pill, above the article.
- **"Prelude":** a full-width bar with a ▾ toggle. Inside are the author's square headshot, the name (underlined, bold) and the role ("musician, writer") on the left, and a biographical paragraph in the main column with links underlined (`tci-essay-1440-s00.png`).
- **"Conversation":** a second collapsible bar holding the title as a large monospace H1 ("Containing multitudes"), then a deck in a smaller large size: one sentence naming the author and what the essay is about.
- **Left sidebar, beside the body:**
  - a black "Part of:" box listing two series, "Staying on track" and "Having a day job";
  - "By René Kladzyk" (underlined);
  - the date "September 29, 2026";
  - a row of share icons;
  - "Download as a PDF" (`tci-essay-1440-s00.png`).
- **Body:** monospace, in a single centred column, with generous space between paragraphs and large monospace subheads ("One can feed the other.") (`tci-essay-1440-s01.png`).
- **End of page, in order:**
  - "Related to Containing multitudes:" with three full-width coloured bars, each a related piece with a ■ bullet;
  - three boxes, "Previous" and "Next" (each with the neighbouring author's headshot and name) and "Random" (spiral icon);
  - the footer line ("…is ad-free and published by Kickstarter, PBC…") and boxed social icons (`tci-essay-1440-s03/s04.png`).
- **Phone:** the Prelude (headshot, name, role, bio) comes first. The Conversation title and deck follow, then the "Part of" box, "By", date, share and PDF stacked above the body. The text runs in one column with about 16px gutters (`tci-essay-390-strip.png`).

### INFERRED
- The author is introduced before the argument: the Prelude is a dedicated author block, not a byline footnote. This frames the essay as one person's view.
- "Part of" series let readers continue by theme.
- Previous/Next with faces make the archive feel like a community of people rather than a feed.
- **Measures (DOM):** body is Courier 16px with a 24px line height in a 640px column at 1440, about 66 characters per line.

### Takeaways for the Mayo AI Literacy Club (The AI Literacy Review, `/blog`, `blog-post`)
- **Take: an author block before or beside the text, with name, role, date and (where we have one) a real headshot.**
  - Board members' headshots exist (`assets/board-*.jpg`), with verified roles in §1 ("co-founder and co-president" and so on).
  - Michael Teng has no headshot and no confirmed role, so his byline is name-only, and nothing is invented. Log it in `content-needs.md` if we want one.
  - Why it fits: student writing is the evidence that the club thinks for itself. Putting the student's name and role first says "a student wrote this", which is the point of the Review.
- **Take: "By [Name]" and a date set apart in a small utility block, with the category above the title.** Our JSON has `author`, `date` and `category`. At desktop, a narrow left column next to a ~66ch Newsreader column works. On the phone it stacks above the text, as TCI's does.
- **Take: a 66ch measure and clear paragraph spacing.** TCI's 640px column comes out at about 66 characters, and our spec already says prose ≈ 66ch. Use Newsreader at about 19–21px with a 1.5–1.6 line height for the Review.
- **Take: Previous/Next at the end, with the neighbouring author's name.** Five posts make a short chain, so plain "Previous: title — author" and "Next: …" links between hairlines are enough. Add a "Related" list only when there are real thematic neighbours. Never pad it.
- **Do NOT take:**
  - collapsible "Prelude/Conversation" bars (they hide content behind clicks);
  - white-on-black essay pages;
  - all-monospace body text;
  - share-icon rows and the newsletter doodle;
  - "Random".

  Also, don't reproduce TCI's wording ("Prelude", "Conversation") as labels.

## 7. The Creative Independent: an interview page

**URL:** https://thecreativeindependent.com/people/nicole-jonasson-and-ida-lissner-on-why-technology-doesnt-have-to-be-hard/

**Screenshots:**
- `tci-interview-1440-fold.png`
- `tci-interview-1440-s00…s05.png`
- `tci-interview-390-fold.png`, which is also the middle panel of `phone-folds-tci-home-interview-dschool-collection.png`

### OBSERVED
- **Colour:** the same structure as the essay, on a light page, with a magenta accent. The section bars are magenta, and the large H1 and deck are magenta on light grey (`tci-interview-1440-fold.png`).
- **Sidebar:** linked theme tags ("Design, Art, Technology, Culture, Inspiration, Collaboration"), a magenta "Part of:" box, "From a conversation with [interviewer]", the date, and a "☐ Highlights on" checkbox (`tci-interview-1440-s00.png`).
- **Body:** questions in bold monospace, answers in regular monospace. Selected sentences are highlighted in magenta text on a pale grey band (`tci-interview-1440-s00/s01.png`).
- **End of page:** a "Some Things" section (the interviewees recommend…), a "Related to…" list in blue bars, then Previous/Next/Random with headshots (`tci-interview-1440-s05.png`).
- **Phone:** the magenta Prelude bar comes first, with a group photo, the names, roles and bio (`tci-interview-390-fold.png`).

### INFERRED
- The "Highlights on" checkbox lets a reader switch the highlighted key sentences on or off. Readers who skim and readers who read closely both get what they need.
- The magenta-on-grey highlight text looked lighter than the body text. Its contrast should be checked before anyone borrows the idea.
- The theme tags on the article link back to the index facets, which ties detail pages to discovery.

### Takeaways for the Mayo AI Literacy Club
- **Take: topic links on each Review post that point back to Learn's topics.** For example, "AI ethics" → `/topics#…`. This joins our writing and our learning pages, as TCI's tags join articles to facets. Use only the six existing topics.
- **Take, maybe later: Q&A typography for meeting recaps.** Bold question, plain answer, with no avatars. It suits "Advanced Seminar Recap" posts if a recap is written as questions the room discussed.
- **Do NOT take:**
  - the coloured highlight toggle (a JS feature, and colour-coded text is hard to keep at AA on parchment);
  - magenta or any per-article accent colours;
  - the "Some Things" recommendations block (it would invite filler).

---

## 8. Geist: Anthropic case study

**URL:** https://geist.co/work/anthropic

It is a case study of earlier identity and website work. It is not the current Anthropic website, and nothing here describes that site.

**Screenshots:**
- `geist-anthropic-1440-fold.png` (the failed full-page capture)
- `geist-sheet-1440-00…05.png` (scroll frames)
- `geist-flat-1440-overview.png`
- `geist-flat-1440-ui.png`
- `geist-flat-1440-cards.png`
- `geist-flat-1440-lecture.png`
- `geist-info-1440-fold.png`
- `geist-info-390-fold.png`
- `geist-anthropic-390-fold.png`
- `geist-anthropic-390-strip0.png`
- `geist-anthropic-390-strip1.png`

### OBSERVED
- **Frame:** a black page with "GEIST" at top left, "Studio" and "Work" in the middle and a moon icon at the right. The first tile is a near-black panel with the client wordmark in large white caps (`geist-anthropic-1440-fold.png`).
- **The case study is a stack of image tiles on black with even gutters,** alternating full-width and half-width (`geist-flat-1440-overview.png`):
  - **Line drawings:** an illustration tile on off-white (black line hands and stones, with clay-coloured circles and nodes), paired with a candid photo of a person in natural light;
  - **Laptop mock-up:** a laptop on a tan leather sofa showing web pages;
  - **Colour system:** a tile of colour swatch columns, with named and numbered swatches (dark slate, grey "cloud", "ivory", a clay "book cloth"/kraft/manila) and narrow black/white/blue "focus"/red "error" chips;
  - **Type specimen:** a dark tile, "Hello" in a grotesque sans and "World" in a serif. Each is labelled with the family and foundry, and the weights are shown as rows (`geist-sheet-1440-03.png`);
  - **Whiteboard photo:** two people at a whiteboard;
  - **Desktop mock-up:** a desktop monitor on a wooden desk with plants, showing a "Meet Claude" landing page;
  - **Workspace photos:** more candid office photos, and a phone on a wooden table;
  - **UI components:** a tile showing a black "Request Access" button with a cursor, a circular up-arrow button, a dark tile of small line icons (search, grid, filter, close) and a gridded icon construction (`geist-flat-1440-ui.png`);
  - **Article cards:** a tile of rounded cards, each with an illustration on a clay, grey or cream ground over a white text panel. The panel holds a category ("Product", "Company"), a title, then "date • N min read" (`geist-flat-1440-cards.png`);
  - **Event poster:** a clay-coloured poster headed "Fall Lectures Series". It has a large sans title, and the speakers, date/time and location in three small serif columns along the bottom (`geist-flat-1440-lecture.png`);
  - **Print and merchandise:** business cards, a tote bag, framed posters and a brand-guidelines overview;
  - **More Work:** a "More Work" strip of other projects at the end.
- **"Info" overlay:** a black full-screen layer.
  - It has the client name, a large light sans headline and a single text column at roughly 16–18px. At 1440 a right column lists "Services" and "People" in grey (`geist-info-1440-fold.png`).
  - On the phone the text is one column, with a round close (×) button at bottom right (`geist-info-390-fold.png`).
  - On the phone a round white "Info" button floats over the images (`geist-anthropic-390-strip0.png`).
- **Phone:** the same tiles stack one per row with a ~25px gutter, and the black footer gives the contact details (`geist-anthropic-390-strip0/1.png`).

### INFERRED
- **How it works:** the case study shows the result rather than explaining it. The images carry the story, and the text is pushed into an overlay most visitors may never open.
- **Pattern:** the recurring rhythm is a human photo next to a functional artefact (a UI component, a type specimen, swatches, a card). It argues "real people, careful tools".
- **Photography (seen):** candid, people at work, mostly not looking at the camera, natural window light, shallow depth of field, warm neutral surroundings.
- **From the case-study text (HTML, not seen in full):**
  - a named SF-based photographer was brought in to show "the company and its culture";
  - the identity pairs Styrene (Commercial Type) with Tiempos (Klim);
  - a UI component system "puts function first".
- **Fonts:**
  - **Geist's own site:** FK Grotesk, self-hosted. It is by Florian Karsten and commercial.
  - **The client fonts named in the specimen:** Styrene A & B (Commercial Type) and Tiempos Headline & Text (Klim). Both are commercial.
  - None can be used.

### Takeaways for the Mayo AI Literacy Club (type + human photography + functional UI)
- **Take: one serif and one sans, each with a clear job.**
  - Geist's specimen shows a serif with editorial warmth and a precise sans for UI, labelled by role and weight. That is exactly our split: Newsreader 500–600 for headings and body; Public Sans or Source Sans 3 for nav, buttons, labels and form text.
  - Record the roles and weights in `docs/design-system.md` as a small specimen table.
- **Take: real people, candid, in natural light, beside the functional thing they relate to.**
  - Our only verified photos are the November 20, 2025 meeting (students around a table) and the September 28, 2026 commons set-up.
  - Place the meeting photo directly beside its action: the `/join` routes, or "This Thursday". Give it a factual dated caption, so the photo is proof and the UI is the next step.
  - Crop with `object-position` to keep faces and the table (§2 Images).
- **Take: an event block as title plus a row of facts.**
  - The lecture poster sets a big title, then "who / when / where" in three small columns. This suits "This Thursday" (Thursday · 8:20 AM · MHS Library Classroom) and the AACA poster citation (presenters · June 12–15, 2026 · Mayo Clinic, Rochester), with the Mayo Clinic sentence kept next to it.
  - Use tabular figures for times and dates.
- **Take: card metadata in the form "category · date · N min read", for the Review list.** We have category and date in JSON. The reading time can be computed from `content` word count at render time; it is a fact, not an invention.
- **Take: a restrained palette shown as named tokens with hex values.** Geist presents its colours as a documented system. Do the same for Parchment, Forest, Deep Forest, Gold, Light Gold, Ink, Muted and Rule in `design-system.md`, with contrast ratios.
- **Do NOT take:**
  - the illustration language (hands, nodes, stones): it belongs to a real company's identity, and our spec allows real photos only;
  - the Anthropic wordmark or any imitation of it;
  - the clay/ivory palette;
  - rounded 16–24px tiles and pill buttons (our radius is 0–4px);
  - the black frame;
  - device mock-ups;
  - smooth-scroll hijacking: it broke a normal full-page capture, and it fights `prefers-reduced-motion`;
  - hiding the explanatory text behind an "Info" button. Our explanations stay next to their actions.

---

## Cross-cutting summary for the brief

1. **Learn (`/topics`).** Keep grouped, hairline-divided resource lists. Each item gets a sans label line (format · duration · source, tabular figures), a Newsreader title link and one factual sentence.
   - Lead with a "Getting started" group that has a one-line reason.
   - Add "Related" text links (with an arrow) after a hairline where the relation is real.
   - Filtering is not needed now. If it is ever added, use a no-JS `<details>` "Filter" with two facet lists (topic, format).
2. **The AI Literacy Review (`/blog`, `blog-post`).**
   - Put the author first: name, verified role, real headshot only where one exists, date, and a category label above the title.
   - Use a ~66ch Newsreader column.
   - End with Previous/Next naming the neighbouring author.
   - Add topic links back to Learn.
   - Show a computed reading time on list items.
3. **Type, people, UI.**
   - Two typefaces with documented roles.
   - Candid, dated, real photos placed beside the action they support.
   - Facts set as compact rows (who / when / where).
   - No decorative illustration, mock-ups, rounded tiles, colour-coded text or scroll effects.

## Screenshots that best illustrate each takeaway

| Takeaway | Best screenshots |
|---|---|
| A type label above each resource title; tiny chips are a warning | `dschool-tools-1440-s01.png`, `dschool-tools-1440-s02.png` |
| Curated "start here" groups with a reason | `dschool-tools-1440-s00.png`, `dschool-collection-1440-s00.png` |
| Framing sentence led by the page name | `dschool-tools-1440-fold.png`, `dschool-collection-390-fold.png` |
| What you'll need, steps, reflection questions, related resources | `dschool-detail-1440-s00.png`, `dschool-detail-1440-s01.png`, `dschool-detail-390-strip.png` |
| Phone menu as a stacked accessible list (reference only, not the style) | `dschool-phone-fold-vs-menu.png` |
| Why tall empty cards fail on phones | `dschool-tools-390-strip.png` |
| Credits and licences in small end type; download line with size | `tci-home-1440-s05.png`, `tci-home-1440-s06.png` |
| Type tabs with the current tab marked; no-JS `<details>` filter with human facet names | `tci-continue-1440-fold.png`, `tci-filter-1440-fold.png`, `tci-filter-phone-390-fold.png` |
| Why a random-colour grid doesn't suit us | `tci-continue-1440-overview.png` |
| Author block first; By, date and series beside a ~66ch column | `tci-essay-1440-s00.png`, `tci-essay-390-strip.png` |
| Previous/Next with authors; related list | `tci-essay-1440-s03.png`, `tci-interview-1440-s05.png` |
| Topic tags linking back to discovery; Q&A typography | `tci-interview-1440-s00.png`, `tci-interview-1440-s01.png` |
| Serif + sans with defined roles | `geist-sheet-1440-03.png` |
| Candid human photos beside functional artefacts | `geist-flat-1440-overview.png`, `geist-sheet-1440-01.png`, `geist-anthropic-390-strip0.png` |
| Event facts as a row (who / when / where) | `geist-flat-1440-lecture.png` |
| Card metadata: category · date · reading time | `geist-flat-1440-cards.png` |
| Documented palette tokens | `geist-sheet-1440-02.png` |
| Hidden explanatory text and scroll-jacking to avoid | `geist-anthropic-1440-fold.png`, `geist-info-1440-fold.png` |
