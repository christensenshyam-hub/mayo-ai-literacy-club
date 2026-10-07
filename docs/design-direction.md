# Design direction: first and second pass (October 6, 2026)

Internal. Not published (Netlify publishes `mayo-site/` only). This is the art direction for the participation redesign. Section 7 records what the second pass changed after the critique and review; where it conflicts with sections 4–6, section 7 wins. `participation-redesign.md` wins on any conflict, and the one deliberate departure is marked **Departure**. Screenshots are in `.shots/refs/`, `.shots/artifacts/`, `.shots/current/` and `.shots/specimen/` (all gitignored). Missing facts go in `content-needs.md`, never on the page. *Rollout note (October 6):* `next.css` and `next.js`, named below, are now the site-wide `styles.css` and `script.js`; the current component reference is `design-system.md`, and the page shell is `shell.md`.

## 1. What we observed, and what we inferred

**Eames Institute, plus Manual's case study** (`references/eames.md`)
- **Observed** in the one-viewport step frames:
  - a split lead: a tight bold gothic H1 whose second clause changes colour, a short paragraph, one small button, then a near-full-width photo of people using the place (`home-steps-1440-v00`);
  - a 2px full-width rule before a large serif mission line (`v01`);
  - labelled fact lists (`object-682-steps-1440-v01`);
  - captions written as records: credit, year, accession number;
  - a loud gothic headline over a calm serif standfirst and body (`story-picnic-steps-1440-v00`).

  All four of its faces are commercial.
- **Inferred:** the serif is the institution's voice and the gothic is for calls. Manual built the identity from the archive's own materials and mindset, not from icons.
- **Rendering:**
  - every `*-fold.png` is a flat dark field (#1E1E19);
  - the full-page captures have holes where scroll reveals and lazy images didn't fire;
  - curl was blocked by a Vercel checkpoint.

  Only the `vNN` step frames are reliable.

**Hack Club clubs** (`references/hackclub.md`)
- **Observed:**
  - a landing page that sells benefits first;
  - the founding requirements sit in a modal. Its ten questions run in the order a founder asks them and end in a three-step list with a time estimate: apply, get school approval, hold a first meeting (`clubs-modal-steps-1440-view`);
  - one "learn more" entry per audience;
  - a teacher form with placeholder-only fields, which get cut off on phones.
- **Inferred:** putting school approval after applying is the same line between interest and approval that our spec draws. Putting perks before requirements is the wrong order for us.
- **Rendering:**
  - the `clubs-*-fold` and `teachers-*-fold` captures are blank dark frames, because the intro animation hadn't finished at 2.5 s;
  - `apply-390.png` is distorted;
  - the application questions are behind an email sign-in and were not observed.

**Obama Foundation, plus Manual's brand case study** (`references/obama.md`)
- **Observed:**
  - a thick rule above every group heading, with hairlines between rows (`slices/programs-1440-s02`);
  - one list-item anatomy, and one story card with a two-part provenance eyebrow, used everywhere (`vp/stories-programs-1440-v01`);
  - an intro split that puts eligibility, the action and an honest "closed" status at the top (`slices/leaders-usa-1440-s00`);
  - stories with tags but no byline, date or captions;
  - an anonymous pull quote and giant impact percentages.
- **Inferred:** the coherence comes from a fixed frame (rules, type roles, card anatomy, links up and sideways). Colour is the only thing that varies from program to program.
- **Rendering:**
  - every obama.org first-screen capture is pure white (a fade-in);
  - the full-page shots paint the sticky header and the cookie overlay partway down the page;
  - some lazy images are missing;
  - Manual's element carousel slides 2–5 were blank.

**Secondary references: d.school, The Creative Independent, Geist** (`references/secondary.md`)
- **Observed:**
  - d.school puts a type label above each resource title, and an activity page opens with a "What you'll need" box (`dschool-detail-1440-s00`);
  - The Creative Independent puts the author first: By, date and series sit beside a column of about 66 characters (`tci-essay-1440-s00`);
  - Geist shows a serif and a grotesque specimen labelled by role, candid photos beside real UI, and an event block set as a title with a who / when / where row (`geist-flat-1440-lecture`).
- **Inferred:** a library works without filters when its groups are good. Putting the author first says "a person wrote this".
- **Rendering:**
  - Geist's desktop full page stopped at 900px because of a scroll lock. It was flattened with injected CSS, so it may differ from the live page;
  - its Info overlay was only partly seen;
  - d.school's featured images rendered blank, and its filters don't exist;
  - TCI's homepage was in an anniversary state;
  - no hover or focus state was observed on any site.

**Our own site and artifacts**
- **Rendering:** home, `/join` and `/chapters` all rendered at 1440 and 390, with no overflow (`.shots/current/`).
- **Observed on the current site:**
  - Josefin Sans display headings, Space Mono labels in caps, and left-rail headings that push content to columns 5–12;
  - on a phone, "Start a chapter" starts about 5,600px down a homepage 7,032px long;
  - `/join` is still a single form.
- **The artifacts keep their own palettes:** a violet AACA poster, a slate-and-yellow Jeopardy slide, a gold-and-green debate square and a grey lesson pack. So we show them as records and never restyle them.

## 2. Three principles we borrow

1. **One lead, two voices, one real photograph.**
   - **Source:** the Eames homepage split (`home-steps-1440-v00`), and Manual's poster, where a bold gothic clause runs on into a serif clause.
   - **For us:**
     - the homepage lead sets "We teach students how to use AI" in the sans, and "without quietly handing it their thinking." in Newsreader italic;
     - beside it go one short paragraph and one button;
     - then comes the November 20, 2025 meeting photo, almost full width.

     The sans voice is using the tool; the serif voice is the student's own thinking.
   - **On phones,** the button comes before the photo. The Eames Visit page does this (`visit-steps-390-v00`), but its homepage doesn't.
2. **Records, not boasts.**
   - **Source:** Eames' labelled metadata and accession-number captions, Geist's who / when / where row, and Obama's figure with a source line.
   - **For us:**
     - logistics, requirements and citations become labelled rows with tabular figures: "Your first Thursday", the chapter requirements, the AACA citation;
     - every caption gives the date in words and says what the thing is;
     - every number carries its source, or stays off the page.

     A club that teaches people to check AI output should be checkable itself.
3. **A fixed frame and fixed units, where content is the variable.**
   - **Source:**
     - Obama's rule stack, its single list-item and story-card anatomies, and its provenance eyebrows;
     - Leaders USA's honest status next to the action;
     - Hack Club's founder questions, answered in the order a founder asks them.
   - **For us:**
     - a 4px Forest rule opens every section, and hairlines divide rows;
     - three components (Story, Chapter, Resource) carry everything.

     A new chapter or story slots in without a new colour or layout. Only the school, the city, the byline and the real photo change.

## 3. Three things we deliberately avoid

1. **Content that waits for motion or a click.**
   - **What:** intro curtains, scroll reveals, smooth-scroll locks, modals, Info overlays and collapsed preludes.
   - **Evidence from our own captures:** they blanked the Eames, Hack Club and Obama first screens, broke Geist's full-page capture, and put Hack Club's requirements behind a modal.
   - **Our rule:** requirements, status and help sit in the page beside their action, and work without JavaScript. The spec bans scroll animation anyway.
2. **Borrowed loudness.**
   - **What:** a colour per program, saturated cards, stickers, tilted photos, illustration systems, mascots, animated monograms and coloured photo frames.
   - **Why:** this is where each reference's personality lives, and on our site it would read as someone else's brand. We have one seal and four colours, and no budget to keep an illustration system going.
3. **Proof nobody can check.**
   - **What:**
     - live member counts and giant impact percentages;
     - anonymous pull quotes, and crowd photos that imply scale;
     - "backed by" rows;
     - uncaptioned photos and stories with no byline;
     - low-contrast metadata (Eames' labels are 2.8:1).
   - **Why:**
     - our first-year numbers conflict (#27);
     - we have no testimonials;
     - no second chapter is confirmed;
     - a fact you can't read isn't a record.

## 4. How it stays recognisably the Mayo AI Literacy Club

- **Palette:**
  - Forest, Deep Forest, Parchment and Gold only;
  - plus Light Gold on dark grounds and the existing pale tint;
  - no colour from any reference.
- **Seal:**
  - it is the one mark: 40px in the header (`seal-circle-192.png`, which is already round) and 96px in the footer. The open phone menu shows no second seal: the header's stays in view above the panel (second pass);
  - it is never redrawn, recoloured, cropped, animated, masked or repeated as a pattern;
  - no new monogram.
- **Name and lines:**
  - "Mayo AI Literacy Club" in full in the header;
  - the club's own line as the homepage lead;
  - the non-affiliation disclaimer in every footer;
  - the Mayo Clinic sentence beside every AACA mention.
- **Voice:**
  - plain and specific, with dates in words;
  - status stated honestly ("putting your name in is interest");
  - no exclamation marks and no hype;
  - tone check, from Manual's Eames brief: "scholarly but never stiff, playful but never naive".
- **Evidence:** only the club's own material:
  - its photos (the November 20, 2025 meeting; the September 28, 2026 commons set-up);
  - its decks, poster and lesson pack;
  - students' signed writing.

  No stock and no AI imagery: a site about checking AI output can't decorate itself with it.

## 5. The system for the first pass

### Type

**Fonts**
- **Newsreader** (OFL, already loaded) is the editorial serif. It sets H1–H3, standfirsts, all reading text, and the second voice of the lead. Use roman 400 and 600, italic 400 and 500, with `font-optical-sizing: auto`.
- **Source Sans 3** (OFL, Adobe, in the News Gothic and Franklin Gothic line) is the strong sans. It sets the first voice of the lead (700), plus nav, buttons, labels, captions and form text (400, 600, 700).
  - **Why it beat Public Sans** in the lead trial (`.shots/specimen/lead-*`): at 1440 its bold clause sets in two lines where Public Sans needs three, and its narrower, darker set is the closest open cousin of the Eames gothic.
  - Record the choice and the reasons in `design-system.md`.
- **Retire** Josefin Sans and Space Mono.
- **Departure from spec §2:** the sans goes large only in the lead, on three pages (home, `/join`, `/chapters`). Every other heading stays in Newsreader. If the founders object, the fallback is the same split in Newsreader: 600 roman, then italic 500.

**Scale** (desktop steps 14 · 16 · 18 · 21 · 26 · 34 · 44 · 56 · 64; fluid with `clamp()` between 390 and 1440)

| Role | Face and weight | Phone → desktop (px) | Line height |
|---|---|---|---|
| Lead (one per page) | Source Sans 3 700 at −0.02em, then Newsreader italic 500 | 40 → 64 | 1.02 |
| H1 | Newsreader 600 | 36 → 56 | 1.05 |
| Featured Story title | Newsreader 600 | 30 → 44 | 1.1 |
| H2 | Newsreader 600 | 26 → 34 | 1.15 |
| H3, component title, standfirst | Newsreader 600 / 400 | 21 → 26 | 1.2 / 1.35 |
| Reading body | Newsreader 400 | 18 → 21 | 1.6 |
| Body in lists and asides | Newsreader 400 | 18 | 1.55 |
| Nav, buttons, field labels | Source Sans 3 600 | 16 | 1.25 |
| Caption, meta, hint | Source Sans 3 400 | 14 → 16 | 1.45 |
| Label, eyebrow (sentence case) | Source Sans 3 600 | 14 | 1.3 |
| Form input | Source Sans 3 400 | 18 | 1.4 |

**Type rules**
- Headings use `text-wrap: balance` and run to about 20ch (the lead to 22ch). Second pass: H2 is capped at 24ch, because "What happens on Thursdays" broke into two lines at 20ch at 1440; the Story band's question is capped at 28ch.
- Paragraphs use `pretty` and run to at most 66ch.
- Labels, dates, times and numbers use `lining-nums tabular-nums`.

### Colour roles

| Token | Role | Contrast |
|---|---|---|
| Parchment #faf8f4 | Page ground; text on Forest and Deep Forest | n/a |
| Ink #1a1714 | Body text, headings (H1–H3) and labels or eyebrows; the sans clause of the lead | 16.8:1 on Parchment |
| Forest #1B4D32 | What you can act on, and structure: links (including the underline under linked story titles), the primary button, section rules, numbers (01–03, note numbers), the focus ring and current-page underline on light grounds, the serif clause of the lead. Not headings or labels (second pass). | 9.2:1 with Parchment, either way round |
| Deep Forest #122e1e | Footer and phone menu only | Parchment 13.8:1, Light Gold 7.9:1 |
| Gold #C9922A | The seal; rules on Deep Forest | 5.3:1 on Deep Forest. On Parchment it is only 2.6:1, so there it is never text, a state or a required edge. |
| Light Gold #E8B84B | Dark grounds only: labels, the focus ring, and the menu's Join button (with Deep Forest text) | 7.9:1 |
| Muted text #5e6b60 | Captions, meta, hints, field borders | 5.3:1 on Parchment, 5.5:1 on the field ground |
| Rule #d4e0d8 | 1px hairlines between rows (decorative only) | 1.3:1 |
| Tint #edf4ef (the existing `--green-pale`) | The one band colour, behind the featured Story | Ink 16.0:1, Forest 8.7:1, Muted text 5.0:1 |
| Error #a3241a | Form errors only, always with words | 7.0:1 |

The brand's own Muted #6b7a6e (4.27:1) is never used for text.

### Grid and spacing

**Grid**
- Content is at most 1280px wide.
- The side margin is `clamp(16px, 5.5vw, 80px)`: 21px at 390 and 80px at 1440.
- Columns:

  | Width | Columns | Gutter |
  |---|---|---|
  | Below 768px | 4 | 16px |
  | 768–1023px | 8 | 24px |
  | 1024px and up | 12 | 24px |

- Named spans (below 1024px, everything is one column in reading order):
  - **full:** columns 1–12;
  - **lead:** columns 1–7;
  - **aside:** columns 9–12;
  - **prose:** starts at column 1, capped at 66ch;
  - **thirds:** 1–4, 5–8 and 9–12, with 1px vertical hairlines in the gaps.
- **No left rail:** every heading starts at column 1, directly above its content, with one level of indentation at most.

**Spacing**
- The scale is 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.
- **A section opens:**
  1. the 4px Forest rule;
  2. 16px;
  3. the H2;
  4. 24px;
  5. the content.
- **Gaps:**
  - 64px (phone) or 96px (desktop) between sections;
  - 24px on each side of a hairline;
  - 8–12px inside a component;
  - an action sits at most 24px below its explanation.

**Shapes and targets**
- Radius: 0 on buttons and bands, 2px on fields and photos.
- Targets are at least 44×44px; buttons are 48px tall.
- No shadows.

### Images and captions

**Photographs**
- Real Mayo photos only, with `srcset`/`sizes` and `width`/`height`. Lazy-load anything below the fold.
- Crop with `object-position` to keep faces and the table in frame. A crop may also be cut into the file (the homepage band), which is the only way to keep something out of the served image (second pass, #23).
- No overlays, text, filters, duotones or frames.

**Artifacts** (posters, slides, lesson pages)
- Show each one whole, as a document: never crop it into a shape, recolour it or tilt it.
- Give it a 1px Rule border and no shadow.
- Always pair it with its words as real HTML.
- Only items marked clear in `artifacts.md` §4.

**Captions**
- **Placement:** under the image, at most 66ch, in caption type.
- **Order:**
  1. the date in words, in Ink 600;
  2. what it shows, said plainly;
  3. a source line or a "Photo:" credit, once known.
- **Never** clock times, and never an inferred topic. For example, the UBI text on the laptop in the November 20 photo stays out of the caption until #23 is answered.
- **Examples:**
  - "**Thursday, November 20, 2025.** A weekly meeting in the MHS Library Classroom."
  - "**Slide 4, 'Final AI Lit of 2026'.** From the club's deck for the last meeting of 2025–26."

### Components

**Story** (a student story or byline piece)
- **Anatomy, in order:**
  1. an eyebrow with two facts, kind · source ("Meeting recap · Mayo High School");
  2. the title, in Newsreader 600, linked;
  3. a byline row in the sans: "By [name]", a verified role if any, and the date in words;
  4. a standfirst: the published summary, or a verbatim excerpt in quotation marks;
  5. an optional real figure, with its caption;
  6. one text link ("Read the recap →").
- **Rules:**
  - Always a byline and a date.
  - Quote only published words, verbatim.
  - One canonical page; the same card on the homepage, `/join` and The Review.
  - It must read as complete without an image (most will have none).
  - The featured Story sits on the Tint band; the others sit on Parchment between hairlines.
  - No colour per story, and no headshot unless a real one exists.
  - Featuring a new member needs consent first (Michael Teng: #24).

**Chapter** (a chapter, or a way to take part)
- **Anatomy, in order:**
  1. a number (01–03, in the sans, 700, tabular, Forest), or for a real chapter a place line ("School · City, State");
  2. the heading (H3);
  3. a label line saying who it's for;
  4. two or three lines of verified facts;
  5. optional record rows (label / value, between hairlines);
  6. a status line wherever interest isn't approval;
  7. at most two actions: one button and one text link.
- **Action labels** say what happens. External links say "(Google Forms, opens in a new tab)".
- **Each entry** has an `id`, so it can be deep-linked.
- **Rules:**
  - The same anatomy for every route and every future chapter.
  - Thirds with vertical hairlines on desktop; stacked between hairlines on phones. Never cards, panels or shadows.
  - No invented chapters, no directory, no map and no counts. Today the only chapter is Mayo High School, Rochester, Minnesota, founded in October 2025.
  - A new chapter appears only once content-needs #15 lists it as approved. It then gets founder and advisor names only with their permission, and one real, captioned photo.

**Resource** (a learning resource or work sample, with annotation)
- **Anatomy, in order:**
  1. a label line: format · time or size · source, with tabular figures;
  2. the title (H3);
  3. the artifact, as a document, or a text excerpt;
  4. two to four numbered notes: what to notice, what gives it away, and the lesson line quoted verbatim. They sit in the aside on desktop and after the artifact on phones;
  5. "What you'll need", with confirmed values only (for example "20 minutes | 6 groups", from the AI on Trial pack, A9);
  6. a source line, plus a plain download line ("PDF · 16 pages · [size]") when a file is offered.
- **Rules:**
  - Club-made material only, with third-party images removed first (#36).
  - The notes are the club's own words, and are marked as such.
  - Never say a lesson has been run, or reviewed by the district, until that is confirmed (#25).
  - The slide or page text is always available as HTML.

## 6. First-pass plan

**Build order:**
1. the tokens and the three components;
2. the homepage hero;
3. the Story section;
4. the joining choices.

Check each step at 390 and 1440 with `tools/shoot.mjs`.

**Homepage hero** (`index.html`)
- **Header:**
  - the seal (`assets/seal-circle-192.png` at 40px; the first pass masked `club-logo-128.png`) and "Mayo AI Literacy Club" in Newsreader 600;
  - nav: About · Chapters · Learn · Events · The Review · Join, with Join outlined in Forest (second pass; solid in the first);
  - on phones, Join stays next to Menu.
- **Lead, columns 1–7:** "We teach students how to use AI" in the sans, then "without quietly handing it their thinking." in Newsreader italic, in Forest.
- **Aside, columns 9–12:**
  - the meeting, from the `events-data.json` schedule with a static fallback. Second pass: no longer a dotted label in the aside but a When / Where / Who record under the lead and aside (section 7);
  - the intro: "A student-run club at Mayo High School in Rochester, Minnesota. This fall, students at other high schools can start chapters of their own.";
  - the button "Choose how to take part" → `/join`;
  - the link "How chapters work →" → `/chapters`.
- **Photo, full width at 2:1** (second pass: 18:5 band from 1024, 2:1 on tablets, 5:3 on phones; see section 7):
  - `assets/photos/meeting-2025-11-20-wide-{800,1200,1800}.jpg`;
  - captioned "Thursday, November 20, 2025. A weekly meeting in the MHS Library Classroom."
- **Then a compact "Three ways to take part" row:**
  - three Chapter entries, each with one line and one link: `/join#join-a-chapter`, `#start-a-chapter`, `#support`;
  - route 01 also carries "At another school? Tell us where →" → `/join#form-other-school`.
- **Phone check:** at 390 its rule must start within two screens (above 1,688px). The trial puts the photo at about 720px, so the rule should land near 1,000px.

**One student-story section** (homepage, after the "take part" row; text only, on the Tint band)
- **Eyebrow:** "Advanced Seminar · Thursday, March 19, 2026".
- **H2:** the recap's own question, "Should AI systems be allowed to refuse instructions?"
- **Featured Story:**
  - "Advanced Seminar Recap: AI Dilemmas", by Shyam Christensen, March 19, 2026 (meeting recap);
  - verbatim excerpt: "The room was split. Some argued that a truly aligned AI should always defer to humans. Others argued that an AI that can't say no is dangerous by design.";
  - link "Read the recap →" → `/blog-post?id=ai-dilemmas-march-19`.
- **Companion Story:**
  - "Who Gets to Tell the Robot No?", by Nathan Dozois, March 19, 2026 (AI policy), with its published summary;
  - link → `/blog-anthropic-pentagon.html`.
- **Close:** "All writing in The AI Literacy Review →" → `/blog`.
- **Why these:**
  - both are published, signed and dated, with no open permission question;
  - a room split on one question, next to a member's essay on the same question, shows what the club is for;
  - no photo of that meeting exists, so none is used.
- **Later upgrades:**
  - the 2 vs. 20 Hot Seat Debate (A10, with the Event Rules square) replaces this section once #6, #20 and #33 are answered;
  - Michael Teng's piece joins only after #24.

**Joining choices** (`/join`, mirrored by the homepage row)
- **Lead:** "Find your place" in the sans, then "in the movement." in Newsreader italic.
- **Aside:** "Learn alongside other students, help start a chapter at your school, or support the work as a teacher, parent or partner."
- **Three Chapter entries in thirds, before the form:**
  - **01 Join a chapter** (`#join-a-chapter`)
    - **For Mayo High School students.** Record rows, kept next to the action:
      - When: Thursday, 8:20 AM;
      - Where: MHS Library Classroom;
      - Format: one topic, talked through around a table;
      - Sign-up: none for a first visit;
      - Experience: none needed.

      No meeting length (#16, #38).
    - **Eligibility, stated plainly:** "Thursday meetings are for Mayo High School students. Outside visitors, including students from other schools, can't attend school meetings."
    - **Route for students elsewhere who don't want to found a chapter:** "Right now the club meets at Mayo High School. To hear about a chapter near you without starting one, tell us your school."
    - **Actions:** "Leave your name" → `#form-mayo`; "I'm at another school" → `#form-other-school`.
  - **02 Start a chapter** (`#start-a-chapter`)
    - **Record rows:**
      - Needs: one student founder, ideally a sophomore or junior, and one faculty advisor who attends meetings and signs off on room requests.
      - Commits: meets monthly, and runs one AI literacy event each semester.
      - Cost: "There is no budget attached: nothing is purchased, and nothing is billed to the school."
      - We provide: lessons you can run as written, video support from Shyam Christensen and Adam Keegan through the founding year, and a vote on the Central Board.
    - **Who:** "Not the strongest coder. The one who organizes things and finishes them, usually already running something else."
    - **Status:** "Putting your name in is interest. A chapter exists only once a founder and an advisor are in place and the school's own approval process has been followed."
    - **Actions:**
      - "Open the founder form (Google Forms, opens in a new tab)" → https://forms.gle/jVNaM7yyTtLLCDwv8, with "about three minutes";
      - "Read how chapters work →" → `/chapters`.
    - **No reply time is promised.**
  - **03 Support the movement** (`#support`)
    - For teachers, prospective faculty advisors, parents, and partners or sponsors.
    - Action: "Write to the club" → `#form-supporter`.
- **Evidence:**
  - straight after the routes and before the form, a wide 3:1 crop of the November 20, 2025 photo, centred on the table;
  - the same caption as on the homepage.
- **Then** the single Netlify form, as in spec §3.

**Not in this pass:**
- the `/chapters` Resources: AI on Trial pp. 1 and 13 (after #25) and the AACA poster (after #19);
- the first Learn Resource: "The Nuclear False Positive", slide 4 of the final 2025–26 deck. It is clear now, as long as slide 8 is left out.

## 7. Second pass (October 6, 2026): what changed, and why

Source: the critique and the review of the first pass. Screens are in `.shots/preview/` (`home-{360,390,768,1280,1440}.png`, the sheets `desktop.png` and `mobile.png`). Missing facts are in `content-needs.md` #41–#46.

**Ship gate (unchanged, now written into the page).** The homepage links to `/join#join-a-chapter`, `#start-a-chapter`, `#form-other-school` and `#form-supporter`. None of these exists until the rebuilt `/join` (spec §3) ships, and the old `/join` has no school or route field. So `index.html`, `next.css` and `next.js` must not deploy before `/join`, and ideally not before `/chapters` and the shared header either, so the nav labels Learn and The Review match their pages. Rejected: pointing the links at `/join#leave` in the meantime. The labels would still promise what that page can't do ("Tell us where" lands on a form with no school field), and the change would have to be undone. The gate is the honest fix.

**Hero**
- The lead runs to 22ch, as section 5 always said (the first pass set 15ch). At 1280 and 1440 it sets in three lines, and the serif clause runs on from "use AI" unbroken.
- The aside is the intro, the one button and "How chapters work →". The meeting moved out of a dotted label into a record across the thirds, under the lead and the aside: **When** "This Thursday, 8:20 AM" · **Where** "MHS Library Classroom" · **Who** "Mayo High School students. No sign-up, and no experience needed." It is filled from `events-data.json` with a static fallback. This is the Geist who / when / where row (section 1), not the Eames paragraph-and-button. It also says who the meeting is for on the first screen. On phones it is an ordinary label / value list after the button.
- Kept "This Thursday", as spec §5 asks. The critique suggested "Thursdays" until #3 is confirmed; the spec wins (see content-needs #45).
- `[data-render="next-meeting"]` is back in the aside, hidden. It appears only when `events-data.json` `upcoming` has an entry dated today or later.
- **Photo (departure from "2:1").** From 1024px the photo is an 18:5 band cut into the file: rows 145–645 of the 1800px source (`assets/work/meeting-2025-11-20-band-{800,1200,1800}.webp`). It keeps every face and the table, cuts the ceiling, and stops above the laptop's top edge (about row 655), so the served file holds none of the screen (#23). At 1440 the whole band, faces included, sits above a 900px fold. Tablets show the 2:1 file whole; phones crop it to 5:3 at 38% 50%. Below 1024 the largest file is 1200w, because there the laptop is still in frame. The JPG fallback is cropped in CSS to the same rows (`object-position: 50% 36%`). The alt text no longer mentions the laptop.

**Header**
- The seal is `seal-circle-192.png` at 40px with no `border-radius`: no masking. The 96px seal in the phone menu is gone, so one seal is in view with the menu open.
- The name is set in Newsreader 600, as in the footer.
- From 1000px, Join is outlined in Forest, not solid, so the hero's button is the one solid call on the first screen. On phones, Join stays solid and Menu is a plain underlined text control with a 44px target.
- While the phone menu is open, `main` and the footer are `inert` (`next.js`). Focus-out still closes it as a fallback.

**Colour roles.** H1–H3, eyebrows and labels are Ink. Forest marks what you can act on and the structure: links, the button, rules, numbers and the lead's serif clause. Linked story titles are Ink with a 1px Forest underline, always shown, not only on hover.

**Separators.** A middot list puts each dot inside the part it introduces: `<span>A</span> <span>· B</span>`, with every part kept whole. A line can then break only before a dot, so a dot never ends a line or sits alone. A wrapped line may begin with a dot, which is the accepted cost.

**Three ways to take part: the compact row (now as section 6 specified).** Each route has its number, H3, a who-it's-for line, the status line where it matters, and its link into `/join`. Route 01 keeps the eligibility sentence, which the spec requires on the homepage, and both links ("Your first Thursday", "At another school? Tell us where"). Route 02 keeps "Interest, not approval." and links "Requirements and the founder form →" to `/join#start-a-chapter`. Route 03 links "Write to the club →" to `/join#form-supporter`, the preselect, so the label does what it says. The When / Where / Format rows and the requirement rows now live only on `/join` and `/chapters`, so the homepage can't drift from them. The founder form's external link moved off the homepage. When it is set on `/join`, label it "Open the founder form", with the hint "Google Forms, opens in a new tab · about three minutes" inside the same list item and tied by `aria-describedby`. At 390 the section's rule is at about 1,180px and the Story band at about 2,140px; in the first pass these were 938px and 2,720px.

**Supporter and Mercurius.** "Dermatology Partners supports the club." is a sentence in route 03, with no logo: the SVG carries a second, unexplained mark ("DOCS Dermatology", #10), and a logo row reads as the "backed by" strip section 3 avoids. Mercurius has its own section with no supporter beside it, so the sponsor no longer reads as backing a member's app. The violet icon, the App Store badge and their weight wait for the founders on #32.

**Story band.** The recap's question is the band's heading, set at the feature size (44 → 30px, 28ch, two lines at 1440). Both pieces sit under it at H3 size, as two answers to one question. The section eyebrow is "Advanced Seminar · Mayo High School", and the date appears only in the bylines. Rejected in part: the critique asked to drop the featured card's eyebrow. Every Story keeps its eyebrow (section 5 anatomy), so its source changed instead to "Meeting recap · The AI Literacy Review", which no longer repeats the section eyebrow. The recap is in `blog-content.json`, so it is in The Review. The section is curated and static; a comment in `index.html` says it does not follow `blog-content.json`.

**First Resource on the homepage ("What happens on Thursdays").**
- **Which artifact.** "The Nuclear False Positive", slide 4 of "Final AI Lit of 2026" (A8), cleared in `artifacts.md` §4. Rejected for now: the Jeopardy college-essay slide (A6, slide 9). It is the stronger sample, but the spec's artifact facts mark the September 3 deck **Hold (#26)**, and §4 clears it only "once #26 confirms the date". It replaces or joins this one when #26 is answered.
- **Anatomy, as in the specimen:** label line, H3, the slide whole with a 1px Rule border, caption, notes in the aside, then the source line. Added: the slide's text as HTML, verbatim from the PDF (PDFKit), under the caption. It is visible below 1280px, where the slide's own type is small, and visually hidden (still in the page) from 1280. Added in the same spirit: the notes are each choice paired with the deck's own lesson line from slides 5–7, quoted, so every note is the club's words. The specimen's draft notes were the builder's words and are not published. No "What you'll need", because no time or group size is confirmed (#43). Files: `assets/artifacts/final-ai-lit-2026-nuclear-false-positive-s04-{800,1200,1800}.webp`, plus a 1200 JPG.

**Record ("At Mayo High School").** The Seminar row is gone, because the Story band covers that meeting. The September 28 row says only what is verified: "Fall interest meeting: September 28, 2026, in the Mayo commons." It does not say "the first meeting of the 2026–27 year" (#26, #41). The Debate row keeps its wording, undated, until #6. The September 28, 2026 photo (A14, no identifiable people, already on `/about`) sits beside the rows at 3:2. Rows stack the label above the value, so a long label can never run over its value. Source order is rows, photo, links, so on phones the photo follows its row.

**Tooling.** `tools/check-text.mjs` (CDP, same style as `shoot.mjs`) reports text printed over other text, text spilling out of its box, a dot ending a line, and text off the page, at 320–1440. Run it with `shoot.mjs` on every pass. Page scroll width alone can't catch overlap.
