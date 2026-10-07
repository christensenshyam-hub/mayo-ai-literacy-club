# Reference study: Obama Foundation programs and local stories, plus Manual's brand-system case study

Internal research note for the participation redesign (`/chapters`, `/join`, The Review). Studied 2026-10-06.

**The question:** how do many programs, regional cohorts, local communities and personal stories read as one organisation? What do program listings, program pages, people and stories look like? How does the system grow? We will apply the answers to chapters and student stories.

**What we borrow:** structure and component anatomy only. We do not borrow the look: no colours, type, logo, rising-sun motif, illustrations, exact layouts or copy. Nothing here overrides `docs/participation-redesign.md`. Where the reference conflicts with the spec, the spec wins, and the conflict is noted under "what NOT to take".

## How this was observed
- **Rendering:** `tools/shoot.mjs` with `SHOOT_SCROLL=1 SHOOT_WAIT=2500` at 1440 and 390 px (full page plus first screen). Manual's case study is longer than the 16,000 px cap, so it was also shot at `SHOOT_MAXH=32000` (`manual-long-1440.png`).
- **Viewport and interaction captures:** a small CDP helper in the same style (same Chrome, same user agents, kept in the session scratchpad, outside the repo). It made the real-viewport captures at scroll positions, the desktop Programs hover menu, the phone menu and its Programs drill-in, and the MBK sub-navigation opened. On obama.org I clicked **"Reject Optional"** on the cookie banner, the privacy-preserving choice. Those files are in `vp/`.
- **Reading aids:** tall pages were cut into slices:
  - `slices/<page>-1440-sNN.png`: 1200 px tall, full resolution;
  - `slices/<page>-390-mNN.png`: three 1500 px phone strips side by side;
  - `slices/<page>-1440-overview.png`: the whole page at 25%, in columns;
  - plus a few named crops.
- **Text and structure:** curl of the HTML (links, markup for menus, captions and bylines) and of the CSS bundles (fonts and colour tokens). Anything known only from text is listed under INFERRED.
- **Location:** all screenshots are in `.shots/refs/obama/` (gitignored). Paths below are relative to that folder.

### Rendering problems (stated plainly)
1. **Blank first-screen captures on obama.org.** Every `*-fold.png` from obama.org is pure white at both widths: programs, leaders, mbka, leaders-usa, mbk-model-communities, story-omaha, story-patino and stories-programs. The pixel range is 255–255.
   - **Likely cause:** the nav items carry opacity and transition-delay classes in the HTML, so the content appears to fade in after load (inferred).
   - **What I used instead:** the full-page captures (taken after a scroll-through) and the `vp/*-v00.png` viewport captures (taken after a 3 s wait and a scroll) show all the content. First-screen statements below come from `vp/`.
2. **Capture artefacts in the full-page shots.** In the full-page obama.org shots, the sticky header and a grey cookie-consent overlay are painted partway down the page. Examples: `slices/leaders-1440-s03.png`, `slices/story-omaha-1440-s00.png`. These come from how the page is captured, not from the layout.
3. **Missing images in some MBK "Latest news" cards.** In `slices/mbka-1440-s08.png`, the cards for Yonkers, Omaha, Newark and "Six reflections" show an empty area where an image would be. The same Omaha card has its photo at 390 (`slices/mbka-390-m02.png`). I treat this as lazy-loading, not design.
4. **Manual's element-system carousel: only slide 1 was observed.** It is a 1/5 slideshow. Slides 2–5 rendered as blank frames in two attempts, so they are not described.
5. **Nothing was blocked.** No page failed to load or showed an error. Cookie banners appeared on both sites but did not hide the content.

## Fonts (from CSS)
| Font | Where | Licence | Usable by us? |
|---|---|---|---|
| Gotham Condensed (Bold 700), self-hosted woff2 | obama.org headings, nav, buttons, card titles, link labels | Hoefler&Co (Typography.com) commercial font | **No** |
| Gotham (Medium 500) | obama.org small labels: card eyebrows, menu group labels, form legal text | Hoefler&Co commercial | **No** |
| Chronicle Text G1 (Book 400, Bold 700, italics) | obama.org body text, deks, card descriptions | Hoefler&Co commercial | **No** |
| Gotham Slab / Stencil / Inline Condensed | Shown only as specimens in Manual's case study | Bespoke for the Foundation (case-study text). Not public. | **No** |
| `ABCOracle-…` and `ABCOtto-…` (hashed families, self-hosted) | manual.studio's own site | The "ABC" prefix is Dinamo's naming for its commercial retail fonts (inferred) | **No** |

**What this means for us:** none of these is open. The *roles* map onto what the spec already fixes:
- Chronicle (serif for reading) → **Newsreader** (OFL);
- Gotham Medium (small sans labels) → **Public Sans or Source Sans 3** (both OFL).

Obama's condensed display voice has no equivalent in our system, on purpose: the spec puts major headings in Newsreader. Do not add a condensed face.

---

## Page 1. Programs index
**URL:** https://www.obama.org/programs/

**Screenshots:**
- Full page: `programs-1440.png`, `programs-390.png`
- Slices: `slices/programs-1440-s00..s07.png`, `slices/programs-1440-overview.png`, `slices/programs-390-m00..m03.png`
- Viewport: `vp/programs-1440-v00..v02.png`, `vp/programs-390-v00..v03.png`
- Desktop Programs menu: `vp/programs-1440-hover.png`
- Phone menu: `vp/programs-390-click.png`; its Programs drill-in: `vp/programs-menu-390-click2.png`

### OBSERVED
**Desktop header** (`vp/programs-1440-v00.png`):
- the round logo;
- condensed text links: Visit, What's On, Programs, Stories, Support us. Programs, the current section, has a small dot under it;
- a search icon;
- a solid cobalt "Donate" block (sampled `#0064f0`) at the far right;
- a white bar with a soft shadow.

**Desktop Programs menu** (`vp/programs-1440-hover.png`): hovering opens a full-width off-white panel (sampled `#f3f3ee`) with four columns, each under a hairline:
- "Programs & Events at the Center": seven links;
- "Global Leadership Programs": four links;
- "Foundation Initiatives": two links;
- a feature card: photo, "Classroom Resources" title, three lines of sans text and an outlined "Learn more" button.

Group labels are small regular-weight sans. Item links are large condensed type. Programs turns blue while the menu is open.

**Phone header and menu:**
- **Header** (`vp/programs-390-v00.png`): logo, the blue Donate block and a hamburger. Donate stays in the header on phones.
- **Menu open** (`vp/programs-390-click.png`): a full-screen off-white panel. Donate turns black and the hamburger becomes an X. The five items are set very large in condensed type, stacked at the bottom of the screen, with search below them.
- **Programs drill-in** (`vp/programs-menu-390-click2.png`): a back arrow, a large "Programs" title, and three accordion rows (the same three groups) with carets and hairlines. The Classroom Resources feature follows, with a full-width outlined button.

**Page order** (`slices/programs-1440-overview.png`):
1. Giant all-caps condensed "PROGRAMS" H1.
2. A full-width photo (a coach with children on a court).
3. A one-paragraph serif intro.
4. Three program **groups**. Each opens with a **thick black rule** across the container, then a very large condensed group heading, a one- or two-line serif description, and sometimes a "Learn more →" link (`slices/programs-1440-s02.png`).

**Group list anatomy** (Center and Global groups; `slices/programs-1440-s02.png`):
- a two-column list;
- each item is a ~167 px square thumbnail, a condensed title, two to five serif lines, then a small sans "Learn More" with a ▸ caret;
- a full-width hairline separates the rows;
- one item, "Performances", has no link.

**Foundation Initiatives** (`slices/programs-1440-overview.png`, `slices/programs-390-m01.png`): two larger cards, each a tall photo, a big condensed title, a serif description and "See program →". A vertical hairline separates the two cards.

**Program stories:**
- one featured story: image left, headline and dek right;
- three story cards in columns divided by vertical hairlines (`slices/programs-1440-s05.png`). Each card: image, a small grey sans eyebrow with two parts ("Programs ▪ Stories", "Stories ▪ MBK Alliance"), a condensed headline, a serif dek and "Learn more →";
- a full-width outlined "More program stories" button.

**End of page:**
- an off-white sign-up panel ("Sign up for the latest on our Programs & Scholarships") with underline-only fields and an SMS consent paragraph (`slices/programs-1440-s06.png`);
- a cobalt footer: giant white "DONATE [illustration] TODAY", a serif line, a white Donate button, and four link columns (Visit, About Us, Get Involved, Stay Connected).

**Two link styles appear:** the small sans "Learn More ▸" in list rows, and the condensed "Learn more →" on cards and stories (`slices/programs-1440-s02.png` vs `-s05.png`).

**Phone** (`slices/programs-390-m00..m01.png`):
- single column;
- group headings break over three or four lines at very large size;
- each list item stacks the thumbnail above the title;
- the thick rule still opens every group;
- the Initiatives cards become full-width photos with title, dek and "See program →".

### INFERRED
- The index is a **taxonomy page**. Programs are grouped by *kind* (on-site, leadership cohorts, initiatives), not listed flat. The same three groups appear in the desktop menu and the phone drill-in, so the IA is defined once and reused.
- Item anatomy is fixed (image, title, short description, one link). A new program slots in without new design.
- The two-part eyebrow ("Programs ▪ Stories") is a provenance tag that lets one stories system serve every program.

### Takeaways for the Mayo AI Literacy Club
- **Take: a thick rule above every section heading, hairlines inside.** This one move gives obama.org most of its coherence. Our version:
  - a Forest rule about 4 px thick above each H2;
  - Rule (`#d4e0d8`) hairlines between list rows;
  - optionally Gold as the rule colour on Deep Forest bands.

  **Why it fits:** the spec asks for headings directly above their content and lists with hairline dividers, and allows Gold for rules. It also replaces the left-rail heading column the spec drops.
- **Take: one fixed list-item anatomy.** Number or thumbnail, heading, two or three lines, one action. Use it for the three `/join` routes (spec §3), the Learn topics, and later any chapter entries. Because every item has the same anatomy, the list can grow from 1 item to 30 without a redesign.
- **Take (later): group by kind or place, never a flat wall.** If approved chapters ever exist (content-needs #15), group them, for example by state, under a rule-plus-heading. **Until then, build no directory.** Spec §3 and §4: "right now the club meets at Mayo High School", with no list and no map.
- **Take: on phones the primary action stays in the header beside the menu button** (Donate never leaves). For us that is "Join", matching the spec's "Join the visually distinct primary item".
- **Take: a large-target phone menu.** Our six items fit in one accessible list; no drill-in is needed.
- **NOT:**
  - **The mega menu with a feature card.** Six nav items do not need one.
  - **Two competing link styles.** Pick one text-link style ("Read how chapters work →") and use it everywhere.
  - **The repeated email-and-SMS sign-up panel and the giant DONATE footer.** We have one Netlify form on `/join`, and no donations.
  - **Saturated cobalt, all-caps condensed display type, and illustration in the footer.**

---

## Page 2. Program page A: Leaders Program (a cohort program with regions)
**URL:** https://www.obama.org/programs/leaders/

**Screenshots:**
- Full page: `leaders-1440.png`, `leaders-390.png`
- Slices: `slices/leaders-1440-s00..s08.png`, `slices/leaders-1440-overview.png`, `slices/leaders-390-m00..m03.png`

### OBSERVED
Reading order, top to bottom (`slices/leaders-1440-overview.png`):

1. **H1 and intro.** "Leaders Program" in large condensed type, then a thick rule (`slices/leaders-1440-s00.png`). Under the rule is a two-part intro:
   - **left:** a one-sentence serif description of who it is for (age range and sectors);
   - **right:** behind a vertical hairline, a small sans label "How To Become A Leader", a serif paragraph on when applications open, the regions and age limits, and "How to Apply →".
   - So eligibility and the action sit at the very top, in their own column.
2. **Cohort graphic** (`slices/leaders-1440-s00..s01.png`). A wide blue-framed collage alternates three kinds of tile:
   - square headshots on pastel tiles;
   - text tiles: a nations-and-territories count, "Meet the 2026–2027 Obama Leaders", a changemakers count;
   - pattern tiles: arcs, rays and dots.
3. **Two photo columns** (`slices/leaders-1440-s01..s02.png`): "What We Do/The Mission" and "How Leaders Works". Each is a photo, a condensed heading, a serif paragraph and a link (the first has "Explore Values-Based Leadership →").
4. **"Explore Leaders By Region"** (`slices/leaders-1440-s02.png`): a 2×2 list (Africa, Asia-Pacific, Europe, United States). Each entry is a square thumbnail, the region name, a three-to-five-line serif description and "Meet The Leaders ▸". Hairlines separate the rows.
5. **"Support Our Leaders Program"** (`slices/leaders-1440-s03.png`): a light-blue block with a photo left, a heading, serif text and "Become a Member →".
6. **Pull quote** (`slices/leaders-1440-s03..s04.png`, `slices/leaders-390-m01.png`): a full-width quote in very large condensed type with an opening quote mark. It is attributed only to "– 2025–2026 Leader".
7. **"The Impact Of Our Leaders Program"** (`slices/leaders-1440-s04.png`): three giant percentages in blue, dark green and yellow. Each has a three-line condensed caption in grey that begins "of Leaders agree…".
8. **"Stories of Our Leaders"** (`slices/leaders-1440-s04..s05.png`): a header row with "More Stories From Our Leaders →" right-aligned. Below are three large portraits, each with the person's name as the heading, a one-sentence serif summary of their work and "Learn more →".
9. **"Could you be the next Leader?"**: an off-white sign-up panel (`slices/leaders-1440-s05..s06.png`).
10. **"Obama Leadership Network"**: a yellow block with a photo, a serif line and "Meet the alumni →" (`slices/leaders-1440-s06.png`).
11. The cobalt footer.

**Phone** (`slices/leaders-390-m00..m01.png`): everything stacks. The intro's right column (How To Become A Leader) drops below the description, between hairlines. Portraits go full width.

### INFERRED
- The page answers a newcomer's questions in order: what is it and who is it for; how to get in; what happens in it; where it happens (regions); what changes; who has done it; how to stay in touch; what comes after (alumni).
- The regional sub-pages are reached by the same list anatomy as the programs index, so moving from program to region feels like one system.

### Takeaways for the Mayo AI Literacy Club
- **Take: the intro split.** Purpose on the left; on the right a small label, the real requirements in one paragraph, and the one action. On `/chapters` this is the spec's permitted early action ("Ready? Open the founder form") beside the purpose statement, with the full application block later (spec §4). On phones it drops below the purpose, which suits our reading order.
- **Take: the section order as a checklist for `/chapters`.** Purpose → how it works (requirements; support: lessons as written, video support from Shyam and Adam through the founding year, the Central Board vote) → people → what happens next → the application. It is the spec's §4 order with the people placed where trust is needed.
- **Take: "Stories of our…" as name-led cards**, where the person's name is the headline and one sentence says what they did. Use it for signed pieces in The Review (Nathan Dozois, Shyam Christensen; Michael Teng only once content-needs #24 is answered).
- **NOT:**
  - **Impact percentages.** Our numbers are unconfirmed (content-needs #27). Publish nothing until one set is chosen and what it counts is known. Even then, use plain tabular figures, not giant colour numerals.
  - **Anonymous pull quotes ("– 2025–2026 Leader").** We have no testimonials, and an unattributed quote can't be checked. Our spec forbids invented testimonials.
  - **The collage graphic, the pastel tiles, and the member upsell block.**

---

## Page 3. Program page B: My Brother's Keeper Alliance (an initiative with a local network)
**URL:** https://www.obama.org/programs/my-brothers-keeper-alliance/

**Screenshots:**
- Full page: `mbka-1440.png`, `mbka-390.png`
- Slices: `slices/mbka-1440-s00..s11.png`, `slices/mbka-1440-overview.png`, `slices/mbka-390-m00..m03.png`
- Sub-navigation opened: `vp/mbka-subnav-1440-click2.png`. On this capture the cookie banner was not dismissed; it covers the lower left.

### OBSERVED
**Header area** (`slices/mbk-model-communities-1440-s00.png` shows the same header on the sub-page; `vp/mbka-subnav-1440-click2.png`):
- the H1 spans the full width;
- below it, a **left-column local navigation** (About, Our Impact, Get Involved, Resources). Each is a condensed label with a caret over a hairline;
- opening "Our Impact" reveals smaller sans links: "Model Communities" and "News";
- a large portrait photo fills the right columns.

**Section layout** (`slices/mbka-1440-s01.png`, `-s03.png`):
- "Mission & History" sits in a condensed heading under the photo, with small serif text;
- each later section opens with the thick rule;
- the **heading sits in a left column and the text in a narrower column to its right**, at about 620 px measure, in larger serif ("Our History", "Our approach").

**Content blocks:**
- **"Our approach"** (`slices/mbka-1440-s03.png`, `slices/mbka-390-m00.png`) ends in a two-column set of stakeholder roles (Local leaders, Nonprofits, Corporations, Philanthropy, Residents). Each is a hairline, a condensed term and two to four serif lines.
- **Video and coloured blocks** (`slices/mbka-1440-overview.png`): a video poster with a white square play button and a condensed caption below; a light-blue donation widget; an orange framework card ("A Path to Success").
- **"How we do it"** (`slices/mbka-1440-s07.png`): a video, then two colour cards (cobalt and light blue). Each has a photo, a two-line condensed heading and "Learn more →", with a vertical hairline between them.
- **"Latest news"** (`slices/mbka-1440-s07..s08.png`):
  - "All My Brother's Keeper Alliance →" right-aligned;
  - a three-column grid with vertical hairlines;
  - each card: eyebrow "MBK Alliance ▪ Stories / Youth / Health & Wellbeing", condensed headline, serif dek, "Learn more →";
  - four of the headlines are city names in the pattern "MBK [City], the journey to impact".
- **End:** an off-white sign-up panel ("Sign up for updates about the My Brother's Keeper Alliance") and the cobalt footer.

**Phone** (`slices/mbka-390-m00.png`):
- the title breaks over three lines;
- the local nav becomes a stacked accordion directly under the title, before the photo;
- headings move above their text.

### INFERRED
- A large initiative becomes a **site within the site**: same header, footer, rules, type and card anatomy, plus its own local navigation. The parent brand stays constant and only the depth changes.
- The local network (Model Communities) is reached from the program's own nav and from its news cards. Each local community is a story with the same title pattern, so the network reads as a set.

### Takeaways for the Mayo AI Literacy Club
- **Take: a repeatable title pattern for local entries**, "[Place], [the same phrase]". When there are chapters, each chapter's story or page can share one pattern, for example "[School], [city]", so the set reads as a network. Until then it applies only to Mayo, with verified facts.
- **Take: the "roles" set** (term plus two to four lines, under hairlines) for the spec's "Support" audiences on `/join`: teachers, prospective faculty advisors, parents, partners. One level of indentation only, as the spec requires.
- **Take: news cards whose eyebrow names the program**, so a card still says where it came from when it appears elsewhere.
- **NOT:**
  - **The left-rail heading layout.** This is exactly what spec §2 removes ("Drop the left-rail heading column"). Our headings go above the content.
  - **A local sub-navigation.** We have too few pages for one.
  - **Donation widgets, video-first sections and saturated colour cards.**

---

## Page 4. Sub-program page: Leaders United States (a regional cohort)
**URL:** https://www.obama.org/programs/leaders/usa/

**Screenshots:**
- Full page: `leaders-usa-1440.png`, `leaders-usa-390.png`
- Slices: `slices/leaders-usa-1440-s00..s08.png`, `slices/leaders-usa-1440-overview.png`, `slices/leaders-usa-390-m00..m03.png`

### OBSERVED
**Intro** (`slices/leaders-usa-1440-s00.png`): the H1, a thick rule, then a **three-part intro** divided by vertical hairlines:
- **description:** one sentence;
- **"Meet the 2026–2027 Cohort":** a one-line invitation with "Learn More →";
- **"How To Become A Leader":** a serif note that the current application is closed and to check back for the next one, with "How to Apply →".

A large photo follows.

**"Meet the 2026–2027 United States Leaders"** (`slices/leaders-usa-1440-s01.png`):
- six people across, with vertical hairlines;
- each portrait is the same size and crop: a black-and-white cut-out on a pastel square;
- a small blue topic tag sits over the portrait's lower left (Agriculture, Youth, Peacebuilding, Democracy, Human Rights, Policy);
- below it, the name in condensed type and "City, State" in serif;
- then a full-width outlined "See all 2026–2027 USA Leaders" button.
- On phone it becomes a 2-up grid (`slices/leaders-usa-390-m00.png`).

**"About"** (`slices/leaders-usa-1440-s02.png`): a left-rail heading, then three features under hairlines (Weekly Group Learning Sessions, A Community Of Support, Individualized Leadership Coaching). Each has a condensed title and a serif paragraph.

**Further down** (`slices/leaders-usa-1440-overview.png`):
- "FAQs" with a link;
- "Stories Of Our USA Leaders": three story cards;
- a sign-up panel;
- **"Former United States Leaders"** (`slices/leaders-usa-1440-s05.png`): three tall pastel cards labelled only 2025, 2024 and 2023, each with "Learn more →" and no image;
- **"More Leaders Programs by Region"**: three colour cards (Africa, Asia-Pacific, Europe), each with a photo, title, two lines and a link.

**Phone** (`slices/leaders-usa-390-m00.png`): the three-part intro stacks, and the two links become full-width rows between hairlines with the arrow at the right.

### INFERRED
- This is the program template **one level down**: the same intro split, plus "who is in it this year", "what it involves", "past years" and "siblings". The page states its own status (the application is closed) instead of hiding the action.
- The year-card archive lets the program grow over time without growing the page.

### Takeaways for the Mayo AI Literacy Club
- **Take: honest status next to the action.** Leaders USA says the application is closed, beside the How to Apply link. Our equivalent sits next to the founder-form link: putting your name in is interest; a chapter exists only once a founder and an advisor are in place and the school has approved it. No reply time is promised. This is the spec's "what happens next" (§3, §4).
- **Take: a uniform people grid** for the board on `/about`. The four verified officers have headshots at `assets/board-*.jpg`. Every portrait gets the same crop and size, the name and one plain line (role), with hairlines between. Later it can hold Central Board chapter presidents (name, school, city), but only verified people.
- **Take: an archive by school year.** Year-only cards ("2025–26", "2026–27") suit the Events record and The Review archive. The club runs by school year, and a year card needs no photo.
- **Take: sibling links at the end of a local page** ("More … by Region"). This applies to chapter pages only once there are siblings. Until then, end with a link back to `/chapters`.
- **NOT:**
  - **Black-and-white cut-out portraits on pastel tiles, and topic tags laid over faces.** These need heavy image processing and colours outside our palette. Keep real photos with their own captions.
  - **Imitating a cohort size we don't have.**

---

## Page 5. Local network page: MBK Model Communities
**URL:** https://www.obama.org/programs/my-brothers-keeper-alliance/our-network/model-communities/

**Screenshots:**
- Full page: `mbk-model-communities-1440.png`, `mbk-model-communities-390.png`
- Slices: `slices/mbk-model-communities-1440-s00..s13.png`, `slices/mbk-model-communities-1440-overview.png`, `slices/mbk-model-communities-390-m00..m03.png`

### OBSERVED
- **Header:** the same MBK header and local nav as the parent page, with a different portrait (`slices/mbk-model-communities-1440-s00.png`).
- **Intro:** "Model Communities" heading and a short summary. Below a thick rule, long serif text explains how the four communities were chosen and names them (`slices/mbk-model-communities-1440-s01.png`).
- **Pull quote:** a very large condensed quote from President Obama, with a dash attribution and a hairline below (`slices/mbk-model-communities-1440-s03.png`). Unlike Page 2, this one names its speaker.
- **One section per community, all the same** (`slices/mbk-model-communities-1440-s03..s04.png`, `-overview.png`):
  - thick rule;
  - the community name as a left-rail heading ("MBK Newark");
  - one serif paragraph stating the measured result and the local lead organisation;
  - a full-width video poster titled with the city name, a play button, and a condensed caption naming the community and its state;
  - a quote from a local official, in serif.

  The section repeats for each community.

### INFERRED
- For a network page, the unit is one block per local member with the same parts in the same order: name, verified result, who runs it locally, media, a local voice. The local member's own organisation is named, so credit goes to the local group, not only to the parent.

### Takeaways for the Mayo AI Literacy Club
- **Take: a fixed chapter block for later**, with the same parts in the same order:
  - chapter (school, city);
  - founded (term);
  - student founder and faculty advisor, named only with permission;
  - what it has run (verified events);
  - one real photo with a caption.

  Design it now. Ship it only for verified chapters (content-needs #15). Mayo's own block would use only the facts in spec §1.
- **Take: credit the local people by name.** It matches our mission, which is students' own judgment.
- **NOT:**
  - **Outcome claims we can't source.** MBK states population-level results. We state only what happened.
  - **A heavy video-poster treatment.**
  - **The left-rail community headings.** Put headings above the content, as the spec requires.

---

## Page 6. Local story: "MBK Omaha, the journey to impact"
**URL:** https://www.obama.org/stories/my-brothers-keeper-alliance/model-communities/omaha/

**Screenshots:**
- Full page: `story-omaha-1440.png`, `story-omaha-390.png`
- Slices: `slices/story-omaha-1440-s00..s08.png`, `slices/story-omaha-1440-overview.png`, `slices/story-omaha-390-m00..m03.png`
- Viewport (banner dismissed): `vp/story-omaha-1440-v00..v01.png`, `vp/story-omaha-390-v00..v01.png`

### OBSERVED
**Hero** (`vp/story-omaha-1440-v00.png`): a full-width band in pale lime (sampled `#d3ffb8`).
- **Left:** a thick black rule, a large condensed headline over two lines, a long serif dek naming the local partner organisation and the result, and at the bottom a row of condensed tags: "MBK Alliance · Youth · Health & Wellbeing".
- **Right:** a large photo (people seated in a council-chamber-style room).
- **No byline or date is visible.**

**Phone hero** (`vp/story-omaha-390-v00.png`): the band holds the headline, dek and tags; the photo falls below the first screen.

**Body:**
- one narrow serif column (about 620 px) aligned to the same column the program pages use for text (`slices/story-omaha-1440-s01.png`, `-s05.png`);
- condensed subheads ("Sustaining success" and others).

**Data figure** (`slices/story-omaha-1440-s01.png`): a pair of cream cards split by a vertical hairline.
- **Left:** a simple diagram linking three outcomes, ending in a large percentage.
- **Right:** an explanatory paragraph ending in a "*Source:" line.

**Parent link** (`slices/story-omaha-1440-overview.png`, `slices/story-omaha-390-m01.png`): an inline promo card back to the parent program (orange and yellow, an illustration, "My Brother's Keeper Alliance", "Learn more →"). It sits beside the body on desktop and inline on phone.

**Photos:** two side by side with a hairline between (`slices/story-omaha-1440-overview.png`).

**Ending:** a light-blue donation block, then **"Learn about the other model communities"** with three sibling story cards (Newark, Tulsa, Yonkers), then the cobalt footer (`slices/story-omaha-1440-s07.png`).

### INFERRED
- A local story is wired into the system three ways:
  1. tags at the top name the program and themes;
  2. a card in the body links up to the parent program;
  3. the sibling row at the end links sideways to the other locals.

  The coloured hero band gives each story its own identity inside a fixed template.

### Takeaways for the Mayo AI Literacy Club
- **Take: the three-way wiring for student stories** in The Review:
  1. **Up:** an eyebrow naming the source and the kind ("Mayo High School · Seminar recap", "The Review · Essay").
  2. **Up again:** a plain text link back to where it belongs (`/chapters`, `/events`).
  3. **Sideways:** "More from The Review" at the end.

  This keeps every story attached to the organisation as chapters begin to publish.
- **Take: one figure with a source line.** If a story uses a number, it carries its source in the figure. That suits a club that teaches people to evaluate output.
- **Take: a hero band, adapted to our palette.** A Parchment or Rule-tint (`#d4e0d8`) band behind the headline and dek, with a Forest rule above the headline. Use the same tint on every story, not a new colour per story.
- **NOT:**
  - **Leaving out the byline and date.** Our spec values signed writing, and dates in words.
  - **Rotating pastel hero colours.**
  - **Illustrated promo cards and donation blocks.**

---

## Page 7. Person story: an Obama Leader profile (José Patiño)
**URL:** https://www.obama.org/stories/jose-patino/

**Screenshots:**
- Full page: `story-patino-1440.png`, `story-patino-390.png`
- Slices: `slices/story-patino-1440-s00..s13.png`, `slices/story-patino-1440-overview.png`, `slices/story-patino-390-m00..m03.png`
- Crop under a photo: `slices/story-patino-1440-photo-caption.png`
- Viewport: `vp/story-patino-1440-v00..v01.png`

### OBSERVED
**Hero** (`vp/story-patino-1440-v00.png`):
- the same template as Page 6, in pale yellow (sampled `#ffeb9c`);
- a thick rule, then a headline in very large condensed type over six lines at 1440, with a two-line serif dek;
- tags "Programs · Stories · Defending Democracy" lower down (`slices/story-patino-1440-overview.png`);
- a photo on the right.

**Body** (`slices/story-patino-1440-s01..s04.png`):
- a narrow serif column with long direct quotes from the subject;
- condensed subheads (for example "Growing up, working hard");
- photos at container width (`slices/story-patino-1440-s04.png`) and smaller inline photos (`slices/story-patino-1440-overview.png`).

**Photo captions and byline:**
- No caption is visible under the family photo (`slices/story-patino-1440-photo-caption.png`).
- No byline or date is visible in the hero or the body.

**Ending** (`slices/story-patino-1440-overview.png`): a sign-up panel with an illustration, a donation block, then "Explore more stories:" with three cards.

### INFERRED
- The HTML has no `<time>`, no `<figcaption>` and no byline. The only author is the `author` meta tag ("Obama Foundation"). So the missing dates, captions and bylines are by design, not my capture.
- This profile is linked from the Leaders page's "Stories of Our Leaders" (Page 2) and from the stories listing (Page 8), so one story serves several pages.

### Takeaways for the Mayo AI Literacy Club
- **Take: one story, many entry points.** A signed Review piece can appear as a card on the homepage, on `/join` (as evidence beside the decision), and in The Review, with a single canonical page. This is how a few real pieces can carry the site without filler.
- **Take: name-led headlines and a narrow, quiet reading column** with sans subheads, matching the spec's prose measure (about 66ch) and Newsreader body.
- **NOT:**
  - **Uncaptioned photos.** Our spec requires captions with the date in words and a factual line, and accurate captions are part of what the club teaches.
  - **A missing byline and date.**
  - **The six-line display headline.** Spec headings max out at about 20ch and balanced wrapping. Don't use it.

---

## Page 8. Stories listing filtered to programs
**URL:** https://www.obama.org/stories/programs/

**Screenshots:**
- Full page: `stories-programs-1440.png`, `stories-programs-390.png`
- Slices: `slices/stories-programs-1440-s00..s09.png`, `slices/stories-programs-1440-overview.png`, `slices/stories-programs-390-m00..m03.png`
- Pagination crop: `slices/stories-programs-1440-pagination.png`
- Viewport: `vp/stories-programs-1440-v00..v01.png`

### OBSERVED
- **Header:** the H1 "Programs stories", a thick rule, then three columns divided by full-height vertical hairlines (`vp/stories-programs-1440-v00.png`).
- **Cards stagger:** image heights differ (portrait or landscape), so the columns fall out of step, masonry-like (`slices/stories-programs-1440-overview.png`).
- **Card anatomy, the same for every card:** image; a grey sans eyebrow with a category pair ("Stories ▪ Defending Democracy", "Stories ▪ Leaders", "Stories ▪ Girls Opportunity Alliance"); a condensed headline; a two-to-three-line serif dek; "Learn more →" (`vp/stories-programs-1440-v01.png`).
- **The listing mixes kinds of story:** person profiles, convenings, video pieces (eyebrow "Watch ▪ Girls Opportunity Alliance") and news (`slices/stories-programs-1440-overview.png`).
- **Pagination** (`slices/stories-programs-1440-pagination.png`): "← 1 2 3 4 5 →" in condensed numerals between full-width hairlines. The current page is blue and underlined.
- **End:** a sign-up panel and the cobalt footer.

### INFERRED
- One stories collection with category facets (program, theme, format). The "programs" view is a filter, not a separate system. That is why story cards look the same on the index, the program pages and here.

### Takeaways for the Mayo AI Literacy Club
- **Take: one card, every context.** The Review list (`/blog`), the homepage "latest writing" and any chapter page can all use the same card:
  - an eyebrow with two facts: kind and source;
  - headline;
  - byline and date in words;
  - one-line dek;
  - one link.

  This is the strongest pattern here for scaling to many chapters' student stories.
- **Take: a text-only card that still holds its own.** Many student pieces won't have permissioned photos (content-needs #2, #24). Design the card so it reads complete without an image, as the year cards on Page 4 do.
- **Take (only when needed): numbered pagination between hairlines**, in tabular figures. With the current handful of posts, no pagination.
- **NOT:**
  - **The masonry stagger.** Use an even grid or a single-column list with hairlines, which suits our editorial tone and phones.
  - **Video-format eyebrows.** We have no video.

---

## Page 9. Manual: Obama Foundation brand case study
**URL:** https://manual.studio/work/obama-foundation

**Screenshots:**
- First screen: `manual-1440-fold.png`, `manual-390-fold.png` (these rendered correctly)
- Full page: `manual-1440.png`, `manual-390.png` (both cut off at 16,000 px)
- Whole page: `manual-long-1440.png` (32,000 px)
- Slices: `slices/manual-1440-s00..s13.png`, `slices/manual-1440-overview.png`, `slices/manual-long-1440-t00..t13.png`, `slices/manual-long-1440-tail-overview.png`, `slices/manual-390-m00..m03.png`
- Named crops: `slices/manual-long-1440-elements.png` (element system, slide 1/5), `slices/manual-long-1440-educate.png` (program poster set), `slices/manual-long-1440-signage.png`

### OBSERVED
**First screen** (`manual-1440-fold.png`):
- a "Manual" wordmark and a round menu button;
- a large serif headline on off-white;
- the hero: a crowd photograph masked into the shape of the rising-sun logo, on pale grey-blue;
- a cookie banner (Customize, Reject, Accept) at the lower left.

**Intro** (`slices/manual-390-m00.png`): the title "Obama Foundation", a "Credits +" pill, and labelled text blocks (Introduction, Challenge) that fade into "Read more".

**Image sequence** (`slices/manual-1440-overview.png`, `slices/manual-long-1440-tail-overview.png`):
- an architectural rendering of the Presidential Center;
- on a dark band, photographs held in **coloured frames** (a blue rectangle, a yellow circle, an orange rectangle, a purple rectangle, a lime rectangle) (`slices/manual-1440-s02.png`);
- logo refinement frames;
- stationery;
- glyph specimens for condensed slab, stencil and inline variants;
- a quote poster in mixed condensed type;
- street hoardings and signage, including a welcome sign in many languages;
- a set of pattern cards (dot arcs, a stepped sunrise, rays, concentric arcs);
- "Bring Change Home" posters with portraits;
- program poster sets (`slices/manual-long-1440-educate.png`);
- social-story mock-ups for programs;
- a lobby screen;
- a postcard.

**Element-system slide 1/5** (`slices/manual-long-1440-elements.png`), on a white card:
- a caption saying the shared elements underpin every program and each program adds its own palette and motifs (paraphrased);
- a strip of about 15 colour swatches;
- the Gotham and Chronicle names;
- a rule stack: one thick line over three thin ones;
- four photo treatments: a single-colour frame, concentric frames, a stepped colour block, and a radiating-line sunrise.

Slides 2–5 were not observed (see Rendering problems).

### INFERRED (from the case-study text; not seen as pages)
- The brief was to unify a broad organisation (leadership, community, digital, events, the Center) without flattening each program's character, while keeping the existing logo and Gotham.
- The system pairs Gotham with Gotham Condensed and adds three bespoke condensed variants, so that programs can sound different within one family.
- An online brand portal was built so a small internal team could apply the system consistently. The website was designed and built by a separate studio (Work & Co), on top of this system.
- The radial patterns are meant to express small actions rippling outward.

### Takeaways for the Mayo AI Literacy Club
- **Take the principle, not the parts.** A fixed core (type, rules, grid, card anatomy, link style, footer) plus **one small variable per member** makes many members look like one organisation. For our chapters, the variable should be *content*: school name, city, the term founded, a real photo with a caption. It should not be a new colour or motif:
  - our palette is deliberately restrained (Forest, Deep Forest, Parchment, Gold);
  - we have no per-chapter assets;
  - the seal is our one mark.
- **Take the rule stack** (one heavy line, then hairlines) as a codified element. It matches Page 1 and is cheap to implement in CSS.
- **Take the idea of a written core**, at our scale: Manual's portal is what kept the parts consistent. The spec already plans `docs/design-system.md`. Write it so a chapter founder could make a flyer that matches: tokens, type roles, the rule stack, the card anatomy, caption rules, and the non-affiliation line.
- **NOT:**
  - **Masking photos into a logo shape**, or anything that recreates their rising-sun mark (arcs, rays, sunrise patterns).
  - **Coloured photo frames.**
  - **A multi-colour program palette.**
  - **Custom type variants.**
  - **Poster and merch graphics.** These would read as borrowed branding and break the spec's "avoid" list.

---

## Cross-page synthesis: how one organisation holds many programs
1. **Fixed frame.** The same header, footer, rule stack, type roles and link arrows appear on every page studied (Pages 1–8).
2. **Fixed units.** One list-item anatomy (Pages 1, 2, 4) and one story-card anatomy (Pages 1, 3, 6, 7, 8) appear everywhere, whatever the program.
3. **Provenance on every card.** Two-part eyebrows (program or kind ▪ theme) and tags in story heroes say where each piece belongs.
4. **Templates repeat at each level.** The same intro split and section order serve the program (Page 2) and the regional cohort (Page 4). The same per-member block repeats down the network page (Page 5).
5. **Wiring.** Up (tags, parent promo card), down (region lists, "meet the…" grids) and sideways ("other model communities", "more by region"). This wiring ties things together more than any colour does.
6. **The variable layer** is colour and motif per program (Manual, Page 9; pastel heroes, Pages 6–7). **This is the part we should not copy.** Our variable is content.

## Screenshots that best illustrate each takeaway
- **Thick rule above headings, hairlines inside:** `slices/programs-1440-s02.png`, `slices/leaders-1440-s02.png`, `slices/manual-long-1440-elements.png`
- **One list-item anatomy, grouped:** `slices/programs-1440-s02.png`, `slices/programs-390-m00.png`
- **Primary action stays in the phone header; large-target phone menu:** `vp/programs-390-v00.png`, `vp/programs-390-click.png`
- **Intro split (purpose plus requirements and action):** `slices/leaders-1440-s00.png`, `slices/leaders-usa-1440-s00.png`, `slices/leaders-usa-390-m00.png`
- **Honest status next to the action:** `slices/leaders-usa-1440-s00.png`
- **Uniform people grid:** `slices/leaders-usa-1440-s01.png`, `slices/leaders-1440-s05.png`
- **Archive by year without images:** `slices/leaders-usa-1440-s05.png`
- **Fixed per-member block for local entries:** `slices/mbk-model-communities-1440-s03.png`, `slices/mbk-model-communities-1440-s04.png`
- **Story wiring (tags up, parent card, siblings sideways):** `vp/story-omaha-1440-v00.png`, `slices/story-omaha-390-m01.png`, `slices/story-omaha-1440-overview.png`
- **Figure with a source line:** `slices/story-omaha-1440-s01.png`
- **One story card in every context:** `vp/stories-programs-1440-v01.png`, `slices/programs-1440-s05.png`, `slices/mbka-1440-s08.png`
- **Fixed core plus a small variable (the principle):** `slices/manual-long-1440-elements.png`
- **What NOT to take:**
  - left-rail headings: `slices/mbka-1440-s01.png`;
  - uncaptioned photos and no byline: `slices/story-patino-1440-photo-caption.png`, `vp/story-patino-1440-v00.png`;
  - anonymous quote and impact numerals: `slices/leaders-1440-s04.png`, `slices/leaders-390-m01.png`;
  - donation footer and sign-up panels: `slices/programs-1440-s06.png`;
  - logo-masked hero and coloured frames: `manual-1440-fold.png`, `slices/manual-1440-s02.png`.
