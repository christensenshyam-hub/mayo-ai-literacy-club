# Reference study: Hack Club, "start a club" information architecture

Internal research note for the participation redesign (`/chapters`, `/join`). Studied 2026-10-06.
Scope: how Hack Club explains what a club is, who can start one, the requirements, the support, the steps, what happens after applying, and the next actions. **We borrow the IA only.** We do not borrow the visual style, the voice, or any benefit we do not offer. The Mayo AI Literacy Club offers lesson materials, video support from two founders through the founding year, and a Central Board vote. It offers no money, hardware, events or swag.

## How this was observed
- **Rendering:** `tools/shoot.mjs` with `SHOOT_SCROLL=1 SHOOT_WAIT=2500`, at 1440 and 390 px, through headless Chrome with a normal browser user agent. Interactions (opening the modals, expanding answers, opening the phone menu) used a small CDP helper in the same style, kept outside the repo. Tall pages were cut into slices (`slice-*.png`; desktop slices are scaled to 2/3).
- **Text and structure:** curl of the HTML, plus Hack Club's Markdown endpoint (`/clubs.md`, `Accept: text/markdown`), the CSS bundles and `/brand`. Anything known only from text is listed under INFERRED.
- **Location:** all screenshots are in `.shots/refs/hackclub/` (gitignored).
- **Not entered:** I did not enter an email on the application site, so the application questions themselves were **not observed**.

## Fonts (from CSS)
| Font | Where | Licence | Usable by us? |
|---|---|---|---|
| Phantom Sans | UI and body sans on hackclub.com and school-toolbox | Hack Club's brand font. Their `/brand` page says the webfont CSS is for Hack Club HQ sites only. | **No** |
| Zarathustra | Display serif used for the big headings | Licence not stated. Treat as proprietary. | **No** |
| Geologica, Cormorant | Declared as alternate families in the CSS. Probably for other locales (inferred); I did not see them used on the English pages. | OFL, on Google Fonts | Not needed. Our spec already fixes Newsreader plus Public Sans or Source Sans 3. |
| apply.hackclub.com | Font not identified: the page is client-rendered and has no static CSS link to curl. | n/a | n/a |

---

## Page 1. Clubs landing page
**URL:** https://hackclub.com/clubs
**Screenshots:**
- Full page: `clubs-1440.png`, `clubs-390.png`
- Slices: `slice-clubs-1440-00..05.png`, `slice-clubs-390-00..05.png`
- First screen: `clubs-1440-fold.png` and `clubs-390-fold.png` (these rendered blank, see below); `clubs-hero-wait-1440-view.png` (taken after a 6 s wait)
- Phone menu: `clubs-menu-390-view.png`

### OBSERVED
- **First-screen captures:** after a 2.5 s wait, the first-screen captures are a uniform dark blank at both widths (`clubs-1440-fold.png`, `clubs-390-fold.png`). After 6 s the hero is there (`clubs-hero-wait-1440-view.png`). The full-page captures, taken after a scroll-through, show all content.
- **Desktop header** (`clubs-hero-wait-1440-view.png`):
  - pennant logo on the left;
  - text links About (with a chevron), Programs, Clubs (bold, the current page), HCB, Hackathons, Resources (with a chevron) and Donate;
  - a round theme toggle;
  - a cream pill button on the far right that joins the community chat.
- **Hero** (`slice-clubs-1440-00.png`, `clubs-hero-wait-1440-view.png`):
  - near-black background with a faint square grid;
  - a small spaced-caps eyebrow, then a very large centred serif headline over three lines, with the middle line in yellow;
  - tilted white-bordered student photos and stickers scattered around the headline, with different photos on different loads;
  - a centred three-to-four-line description;
  - an action row: a red filled "Start a club →" button, an outlined "Sign in" pill and a "Learn more ↓" text link;
  - a tiny underlined sign-in line for existing members below that.
- **Ticker:** a red band of repeated slogans in caps runs below the hero (`slice-clubs-1440-00.png`).
- **"Club perks" section** (`slice-clubs-1440-01.png`):
  - a spaced-caps eyebrow, a large serif heading over three lines and a one-line right-aligned subhead;
  - three saturated cards (yellow, purple, blue), each with an icon, a serif title, one or two lines and a red pill button;
  - a bold "Explore all club perks →" link below.
- **Programs carousel:** a wavy divider leads into a blue section with a two-line heading and a paragraph. Below it is a row of colourful program cards. The row is cut off at the right edge on desktop (`slice-clubs-1440-02.png`) and shows one card with the next peeking in on phone (`slice-clubs-390-02.png`).
- **"Learn more about:" section** (`slice-clubs-1440-02.png`, `-03.png`): a 2×2 grid of dark, photo-backed cards with rounded corners:
  - starting a new club;
  - converting an existing club;
  - the Teacher Zone;
  - School toolbox.

  Each card has a serif title, one line, and "Learn more →" bottom right.
- **Community section** (`slice-clubs-1440-03.png`):
  - full-bleed collage of video-call faces;
  - large serif heading with a red last word;
  - a paragraph and a red "Join the community" button;
  - four dark pill badges with live-looking counts (online now, channels, daily messages, members). The member count differed between my desktop and phone captures (`slice-clubs-1440-03.png` vs `slice-clubs-390-03.png`).
- **Closing call to action** (`slice-clubs-1440-04.png`): a centred eyebrow, a two-line serif heading with an accent-coloured last word, and one red "Start a Hack Club →" button. Line-drawn mascots sit bottom right.
- **Footer** (`slice-clubs-1440-04.png`, `-05.png`):
  - logo, tagline, toll-free number and four social icons;
  - two link columns;
  - a legal line naming the registered nonprofit and EIN;
  - a "System mode" toggle.
- **Phone** (`slice-clubs-390-00..05.png`):
  - logo plus a hamburger;
  - the hero stacks, with no scattered photos or stickers visible;
  - "Start a club" and "Sign in" sit side by side, with "Learn more ↓" centred below;
  - the perk cards stack full width, the "Learn more about" cards stack in one column, and the count pills stack below the community button;
  - footer links in two columns.
- **Phone menu** (`clubs-menu-390-view.png`):
  - a full-screen dark overlay with an X;
  - top-level items in larger white text; About and Resources show their sub-pages indented beneath in smaller grey text;
  - "Clubs" is bold;
  - the "Join the community" pill is the last item and is cut off at the bottom of an 844 px viewport.

### INFERRED
- **Sell first, explain second.** The page leads with benefits (perks, prizes, community size). The practical "what it takes" information is hidden behind modal buttons in the fourth section.
- **"Start a club" skips the explanation.** It goes straight to `https://apply.hackclub.com` (from the href), so a visitor can start applying before reading any requirements.
- "Learn more ↓" is an in-page jump to `#learn-more` (from the href).
- The blank first screen is an intro or entrance animation that a headless capture catches before it finishes.
- The site is Next.js with locale subdomains (`fr.`, `de.`, `es.`, `ru.`, `az.`, from the links), and it offers a Markdown version of every page for agents.
- **Two separate audiences:** student founders (this page and the modals) and adults (Teacher Zone, School toolbox). There is also a `/parents` page, reachable from the phone menu.

### Takeaways for the Mayo AI Literacy Club
- **Do take:**
  - **Bookend a single action.** One early start action in the hero and the same action again as a closing block. This matches our spec: one early "Ready? Open the founder form" near the top, and the main application block after the explanation.
  - **One card per audience or situation** in a "learn more" index: new founder, existing club, teacher or advisor, school resources. On `/chapters`, the equivalent is a short "If you're a teacher who might advise" pointer to `/join#support`, next to the founder route.
- **Do NOT take:**
  - **The order.** Benefits come first and the requirements are behind a modal. For Mayo, the requirements, support and approval facts *are* the content (purpose → requirements → support → what happens next → application). They must be readable inline without a click.
  - **Live community counts, perk cards, programs, prizes, the shop, "backed by" lists, the ticker, scattered photos and stickers, the dark grid, saturated cards and the exclamation-heavy voice.** We have no verified counts and offer none of those benefits, and the brand is restrained.
  - **A menu where the primary "Join" item can fall below the fold.** Keep our Join item visible within the first phone viewport.

---

## Page 2. "Starting a Hack Club" modal (on /clubs)
**URL:** https://hackclub.com/clubs, opened from the "Starting a new club" card
**Screenshots:**
- Desktop: `clubs-modal-new-1440-view.png` (collapsed), `clubs-modal-new-open-1440-view.png` (all answers open), `clubs-modal-steps-1440-view.png` (support and steps answers open)
- Phone: `clubs-modal-new-390-view.png`, `clubs-modal-steps-390-view.png`

### OBSERVED
- **Panel:** a dark, rounded panel over the dimmed page, with a large serif title and a round cream close button (X) top right.
- **Questions:** ten one-line questions in small bold sans, separated by hairline rules, each with a chevron.
- **Answers:**
  - open beneath their question in regular weight, with the chevron flipped (`clubs-modal-new-open-1440-view.png`);
  - the "steps" answer is a three-item numbered list (`clubs-modal-steps-1440-view.png`).
- **Action:** a red pill "Apply to Hack Club →" button after the last question.
- **Decoration:** tilted photos and stickers float outside the panel on desktop.
- **Phone:**
  - the panel is nearly full width and questions wrap to two lines;
  - the close button overlaps the end of the title (`clubs-modal-new-390-view.png`);
  - with answers open, the panel scrolls internally and the apply button stays reachable at the end (`clubs-modal-steps-390-view.png`).

### INFERRED (structure from the DOM text, paraphrased)
- **Questions, in order:**
  1. what the network is;
  2. whether you need to be experienced;
  3. who can join, and the age range;
  4. whether meetings must be in person;
  5. whether you need a teacher (not required by them, but recommended because schools often need an adult for approval and room booking);
  6. whether a school can have several clubs;
  7. what a club can do;
  8. what support is provided;
  9. whether you can add co-leaders;
  10. the steps.
- **The steps:** apply (with a time estimate of about ten minutes), get school approval, then run a first meeting.
- The panel is a `<dialog>` and each Q&A is a native `<details>`/`<summary>`. It works as a disclosure without custom JS.
- **Nothing after "apply" is explained:** who reviews, how long it takes, or what approval from them means.

### Takeaways for the Mayo AI Literacy Club
- **Do take:**
  - **Answer the founder's questions in the order a founder asks them,** from "what is this" to "am I qualified" to "who can join" to "do I need a teacher" to "what support" to "what are the steps". Map that onto our spec order. Requirements cover the founder, the advisor, a monthly meeting, one event per semester and no cost. Support covers the lessons, video support through the founding year and the Central Board vote. Then what happens next, then the form.
  - **A three-step numbered list with a time estimate.** Ours, using verified facts only:
    1. open the founder form (about three minutes);
    2. have a faculty advisor in place;
    3. follow your school's own approval process.

    Then state plainly that interest is not a chapter until all three are done. Hack Club puts "get school approval" *after* applying. That is the same interest-versus-approval distinction our spec requires.
  - **"Do I need a teacher?" answered as a reason, not a rule.** Ours *is* a rule: one faculty advisor who attends meetings and signs off on room requests. Say why in one line, which is that schools need an adult for rooms and approval. That reason is also verified in our brief.
  - **Native `<details>` for any secondary FAQ** (it works without JS, which our spec requires). Use it only for genuinely secondary questions. The core requirements stay as a visible list.
- **Do NOT take:**
  - **Core requirements inside a modal.**
  - **"Funding, hardware, stickers, coins" support answers.** Our support answer is lessons, video support from Shyam Christensen and Adam Keegan through the founding year, and the Central Board vote. Nothing else.
  - **A rounded floating panel with stickers,** and a close button that collides with the title on phones.
- **Questions this pattern raises that we cannot answer yet** (candidates for `docs/content-needs.md`; not added there, to avoid clashing with parallel edits):
  - Does a chapter founder need prior AI knowledge?
  - Who can join a chapter (only that school's students?), and is there a grade or age range?
  - Must chapter meetings be in person?
  - Can a school have more than one chapter?
  - Can a chapter have co-founders or co-presidents?

  Until these are confirmed, `/chapters` must not answer them.

---

## Page 3. "Converting an existing club" modal (on /clubs)
**URL:** https://hackclub.com/clubs, opened from the "Converting an existing club" card
**Screenshots:** `clubs-modal-convert-1440-view.png`, `clubs-modal-convert-open-1440-view.png`

### OBSERVED
The same panel pattern as Page 2: a serif title, five accordion questions with hairline dividers, and the same red apply button. It is shorter, so the panel ends well above the fold at 1440.

### INFERRED (paraphrased from the DOM)
- **The five questions** cover:
  - whether anything changes (you keep your name, members and schedule);
  - whether you must use their programs (no);
  - the ongoing requirement, put as a minimal "that's it" rule (activity at least every six months, meetings mainly in person);
  - what happens if a club lapses (it is marked dormant, and there is a way to reconnect);
  - the benefits.
- **The value:** it names the **ongoing commitment** separately from the founding requirements, and it says what happens if you fall short.

### Takeaways for the Mayo AI Literacy Club
- **Do take:** state the ongoing commitment as briefly and plainly as Hack Club states theirs. Ours is verified: the chapter meets monthly and runs one AI literacy event each semester, and starting costs nothing. Keep it a two-line list, not a paragraph.
- **Do NOT take (yet):**
  - **A "convert your existing club" route.** Whether an existing AI or ethics club can become a chapter is unconfirmed.
  - **A lapse or dormancy policy.** We have none.

  Both are candidates for `content-needs.md`: can an existing club become a chapter, and what happens if a chapter stops meeting? Do not put either on the site until confirmed.

---

## Page 4. Application entry
**URL:** https://apply.hackclub.com
**Screenshots:** `apply-1440.png` (identical to `apply-1440-fold.png`), `apply-390-view.png`. `apply-390.png` is a distorted full-page capture: a blank top half and content clipped at the right. It is a capture artefact of a viewport-height layout, so do not judge the page by it.

### OBSERVED
- **Desktop:** a split screen.
  - **Left half** (warm off-white): a centred small app icon, then a bold dark-maroon two-line heading about logging in to start your club. Below that are a muted paragraph that names a support email, a labelled "Email" field with an envelope icon, and a full-width red rounded "Login or Resume Application" button.
  - **Right half:** a full-bleed photo of a large crowd of students.
  - **Top right:** a language selector.
- **Phone** (`apply-390-view.png`): the same two-column split, shrunk. The form column is about 240 px wide with very small text, and the photo fills the right third.

### INFERRED
- The application is behind an email sign-in that lets you resume a saved application. I did not sign in, so the questions, their number and what happens after submission were **not observed**.
- The phone view looks like a non-responsive desktop layout scaled down. A real phone may differ.

### Takeaways for the Mayo AI Literacy Club
- **Do take:**
  - **Say where to get help at the point of action.** Next to "Open the founder form (Google Forms)", add one line on what to do if the form won't open or send. Use only verified channels (Instagram @mayoailiteracy, or the `/join` supporter route), never a personal email.
  - **Say how long the form takes.** Ours is verified: about three minutes.
- **Do NOT take:**
  - **A sign-in wall before the application.** Our founder form is a plain Google Forms link and must stay a direct handoff, with the new-tab behaviour stated.
  - **A crowd photo.** We have no comparable photo, and must not imply a size we don't have.
  - **A split layout that doesn't reflow on phones.**

---

## Page 5. The Teacher Zone
**URL:** https://hackclub.com/teachers (the "The Teacher Zone" card)
**Screenshots:**
- Full page: `teachers-1440.png`, `teachers-390.png`
- Slices: `slice-teachers-1440-00..04.png`, `slice-teachers-390-00..05.png`
- `teachers-1440-fold.png` and `teachers-390-fold.png` rendered blank, as on /clubs.

### OBSERVED
- **Hero** (`slice-teachers-1440-00.png`):
  - soft coloured glows on the dark background;
  - a red pill eyebrow, and a two-line centred serif headline with the second line in red;
  - a grey paragraph;
  - an interest form in a rounded dark card: first and last name side by side, email, school or organisation (optional), state and country (optional, side by side), and a cream full-width "Express my interest" button.
  - The fields are rounded and use placeholder text only, with no visible labels.
- **"The basics" panel** (`slice-teachers-1440-01.png`): a serif paragraph with key phrases set on coloured highlight chips.
- **"What's a club?" block:** a sticker illustration on the left and two short paragraphs on the right defining the term and describing a typical weekly meeting.
- **Video:** a thumbnail with a caption below.
- **Engagement grid** (`slice-teachers-1440-02.png`): a 3×2 grid of image-backed cards on how teens take part.
- **"The payoff"** (`slice-teachers-1440-03.png`): an eyebrow, a serif question heading and a highlighted paragraph.
- **Closing** (`slice-teachers-1440-03.png`, `-04.png`): a centred heading asking whether you want to support clubs at your school, and the same interest form repeated.
- **Phone** (`slice-teachers-390-00.png`):
  - the form card is full width;
  - the half-width optional placeholders are truncated ("state (optione", "country (optic").

### INFERRED
- **An adult-facing page in its own order:**
  1. what this is and why adults should say yes;
  2. a one-paragraph definition;
  3. what a meeting looks like;
  4. what students get;
  5. a low-commitment "keep me updated" action.
- **No link to the student application** (from the extracted links). Teachers and founders are kept on separate tracks.
- Its claims rely on scale, sponsor names and prize money.

### Takeaways for the Mayo AI Literacy Club
- **Do take:**
  - **Define the unit in two sentences before anything else:** what a chapter is and what one meeting looks like. Ours is verified: one topic a week, talked through around a table, at Mayo. The chapter rhythm is monthly plus one event a semester.
  - **A low-commitment adult action** separate from the founder application. That is our `/join#support` route with the role "Interested in advising a chapter", already in the spec.
- **Do NOT take:**
  - **Placeholder-only fields.** Our spec requires visible labels above fields and 16 px+ inputs. Truncated placeholders show why.
  - **The form duplicated top and bottom,** coloured highlight chips, sponsor and "backed by" claims, and prize and travel benefits.

---

## Page 6. School toolbox
**URL:** https://school-toolbox.hackclub.com (the "School toolbox" card)
**Screenshots:** `school-toolbox-1440.png`, `school-toolbox-1440-fold.png`, `school-toolbox-390.png`, `school-toolbox-390-fold.png`

### OBSERVED
- **Header:** a black band with a large bold sans title "School Toolbox", a one-line subtitle for administrators and teachers, and a GitHub icon top right.
- **Body:** a light grey page with sections under bold sans headings, each with a small coloured square icon:
  - a welcome text block;
  - "General";
  - "Finding an Advisor";
  - "Getting Unblocked";
  - a collapsed "Archived Letters" disclosure.

  Each section has a one-sentence intro and two white cards with a document icon, a title, one or two lines and a corner expand arrow.
- **Closing:** a centred contribute-on-GitHub link.
- **Phone:** everything stacks to one column, with section headings centred.

### INFERRED
- The toolbox is about **obstacles a founder meets at school**: a sceptical adult, finding an advisor, and IT blocking tools.
- The cards probably open letters or guides (not opened). Students can pass them to adults.
- The font is Phantom Sans (from the CSS).

### Takeaways for the Mayo AI Literacy Club
- **Do take:** **name the founder's hardest step and help with it.** For us that is finding a faculty advisor. On `/chapters`, a short "Asking a teacher to advise" note could list what the advisor actually does, from the verified brief: attends meetings and signs off on room requests. A student can show that to a teacher. A ready-to-send advisor letter would be a content need, so don't write one into the page without the founders' approval.
- **Do NOT take:**
  - **The icon-beside-every-heading pattern** (our spec forbids it) and the card grid.
  - **Workaround and "get unblocked" content.** It isn't relevant to us.
  - **Press-coverage proof pages.** We have no verified coverage beyond the AACA poster.

---

## Not studied
- **Benefit pages:** `toolbox.hackclub.com` (all club perks), the start grant, the shop and the programs. They describe benefits we do not offer, so they are out of scope.
- `/parents` and `/map` (the map is a club directory; our spec forbids a directory until chapters are confirmed).
- **The community guide** at readme.hackclub.com. It is not linked from /clubs.

## Rendering failures and caveats
- `clubs-1440-fold.png`, `clubs-390-fold.png`, `teachers-1440-fold.png` and `teachers-390-fold.png` are **blank dark frames** (the intro animation was not finished at 2.5 s). The full-page captures and `clubs-hero-wait-1440-view.png` are the usable views.
- `apply-390.png` is a **distorted full-page capture**; use `apply-390-view.png` instead.
- The application form behind the sign-in on apply.hackclub.com was **not observed**.

## Best screenshots per takeaway
| Takeaway | Screenshots |
|---|---|
| Founder questions in asking order; native disclosure FAQ | `clubs-modal-new-open-1440-view.png`, `clubs-modal-new-390-view.png` |
| Three numbered steps with a time estimate; approval after applying | `clubs-modal-steps-1440-view.png`, `clubs-modal-steps-390-view.png` |
| Ongoing commitment stated minimally (separate from founding) | `clubs-modal-convert-open-1440-view.png` |
| Bookended single action (hero plus closing block) | `clubs-hero-wait-1440-view.png`, `slice-clubs-1440-04.png` |
| One entry per audience or situation ("learn more" index) | `slice-clubs-1440-02.png`, `slice-clubs-1440-03.png`, `slice-clubs-390-02.png` |
| What NOT to do: requirements buried below perks | `slice-clubs-1440-01.png`, `slice-clubs-1440-02.png` |
| Help line and time estimate at the point of action; no sign-in wall | `apply-1440.png`, `apply-390-view.png` |
| Define the unit plus a low-commitment adult action; avoid placeholder-only fields | `slice-teachers-1440-00.png`, `slice-teachers-1440-01.png`, `slice-teachers-390-00.png` |
| Help with the hardest step (finding an advisor) | `school-toolbox-1440.png`, `school-toolbox-390.png` |
| Phone menu: keep Join visible above the fold | `clubs-menu-390-view.png` |
