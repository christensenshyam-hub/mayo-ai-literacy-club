# Participation redesign: build spec (October 2026)

Internal. Not published: Netlify publishes `mayo-site/` only. Branch: `redesign/participation`.

Order of priority: (1) `/join`, (2) the shared visual system, (3) `/chapters`, (4) the homepage's participation hierarchy. Everything else is kept consistent with the new system, with no new features.

## 0. Ground rules
- **Stack:** plain HTML, one `styles.css`, one `script.js`, vanilla JS. No framework, no build step, no new dependencies, no animation library. Netlify publishes `mayo-site/`.
- **Netlify settings:** `netlify.toml` sets the CSP: `img-src 'self' data:`; scripts from self plus inline; styles from self, inline and fonts.googleapis.com; fonts from fonts.gstatic.com; `connect-src 'self'`. `_redirects` holds the old URLs. Keep both working.
- **Load-bearing files:** `blog-content.json` and `events-data.json` are fetched hourly by the Mercurius backend. Keep their paths, keys and schema. The site renders from them through `script.js` (`window.mayoFetch`, `window.mayo.*`).
- **Name and affiliation:** keep the name "Mayo AI Literacy Club". The full non-affiliation disclaimer stays in every footer, and the Mayo Clinic sentence stays next to any AACA mention. Never imply endorsement by Mayo Clinic, the AACA, the school district or a sponsor. The AACA work was a poster presentation: never call it a talk.
- **Truthfulness:** no invented testimonials, member counts, chapter counts, partners, achievements, dates, quotes, response times or locations. A missing fact or asset goes into `docs/content-needs.md`, never onto the page as filler or a placeholder.
- **Personal details:** never publish personal email addresses or phone numbers.
- **Every action is real:** each button or link goes somewhere real or does what its label says.

## 1. Verified facts you may use (sources: the live site, the JSON files, the founder's chapter brief)
- **Mission (founder, October 2026):** help students understand AI, evaluate its output, and preserve their own judgment. The club's existing line is: "We teach students how to use AI without quietly handing it their thinking."
- **The club:** a student-run club at Mayo High School, Rochester, Minnesota. Started in 2025 by Shyam Christensen and Nathan Dozois.
- **Board:**
  - Shyam Christensen, co-founder and co-president;
  - Nathan Dozois, co-founder and co-president;
  - Adam Keegan, vice president;
  - Niko Lazaridis, secretary.

  Headshots are at `assets/board-*.jpg`.
- **Meetings** (from `events-data.json` `schedule`):
  - every Thursday, 8:20 AM, MHS Library Classroom;
  - open to all MHS (Mayo High School) students;
  - no sign-up for a first visit, no experience needed;
  - format: one topic a week, talked through around a table.

  Meeting length and the first-bell time are NOT confirmed.
- **Evidence you can show:**
  - The photo `assets/photos/meeting-2025-11-20-wide-*.jpg`: a real Thursday meeting on Thursday, November 20, 2025, about 17 students around a table in the MHS Library Classroom.
  - The photo `assets/photos/interest-meeting-2026-09-28-*.jpg`: the Mayo commons set up for the fall interest meeting on Monday, September 28, 2026, before most people arrived.
  - **The AACA poster:**
    - title "Teaching the Pause: A Student-Led Model for Critical AI Literacy";
    - presented by Shyam Christensen, Nathan Dozois, Adam Keegan and Niko Lazaridis;
    - 43rd Annual Meeting of the American Association of Clinical Anatomists (AACA), Mayo Clinic, Rochester, June 12–15, 2026;
    - attendees from 23 countries.

    Mayo Clinic sentence: "The meeting was hosted at Mayo Clinic. Mayo High School is a Rochester public high school; neither it nor this club is affiliated with Mayo Clinic."
  - A school-wide AI literacy debate at Mayo. Undated; don't add a date.
  - The Advanced Seminar "AI Dilemmas" on March 19, 2026, with a recap at `/blog-post?id=ai-dilemmas-march-19`.
  - Signed writing in `blog-content.json`: Nathan Dozois, "Who Gets to Tell the Robot No?" (March 19, 2026, at `/blog-anthropic-pentagon.html`); Michael Teng; Shyam Christensen (three pieces).
  - **Mercurius AI:** the club's free iPhone tutor (iOS 17+, App Store id 6773192313, trymercurius.com). Three modes (Socratic, Discussion, Debate), runs on Claude by Anthropic, and does not write essays or do homework. "Shyam Christensen and Adam Keegan lead the app" is UNCONFIRMED; keep it as it is now and don't strengthen it.
  - Dermatology Partners supports the club. Don't state a tier.
  - Instagram: @mayoailiteracy.
- **Chapters program** (from the founder's brief; open this fall to high schools across the country):
  - **Needs:** one student founder (ideally a sophomore or junior) and one faculty advisor, who attends meetings and signs off on room requests.
  - **Commitments:** the chapter meets monthly and runs one AI literacy event each semester. Starting one costs nothing.
  - **Support:** curriculum and lesson materials the chapter can run as written. Direct support over video from Shyam Christensen and Adam Keegan through the founding year.
  - **Governance:** a seat on the Central Board, where every chapter president holds a vote in how the network is run.
  - **Approval:** "Nothing commits a school until a founder and an advisor are both in place and the school's own approval process has been followed."
  - **Application:** the founder interest form, https://forms.gle/jVNaM7yyTtLLCDwv8 (Google Forms, about three minutes). Keep this handoff working.
  - **Not confirmed:** what happens after the form (who replies, how, how fast), and whether any other chapter exists yet. So: no directory, no "chapters at …" list, no response-time promise.

## 2. Visual system
- **Palette:** keep the brand tokens: Parchment #faf8f4 page, Forest #1B4D32, Deep Forest #122e1e, Gold #C9922A (rules and accents only, never body text on parchment), Light Gold #E8B84B on dark, Ink #1a1714, Muted #6b7a6e, Rule #d4e0d8. Every text and UI colour pair meets WCAG 2.2 AA; compute and note the ratios.
- **Type:**
  - **Headings:** major editorial headings in Newsreader, using its optical-size axis (it is already loaded), weight 500–600, with tight but comfortable leading.
  - **Utility sans:** one straightforward sans serif for navigation, buttons, labels, form text and small utility text. TRIAL two Google Fonts candidates, Public Sans and Source Sans 3, on `/join` and the home hero at 390 and 1440px. Pick one and record why in `docs/design-system.md`.
  - **Retire:** Space Mono (labels move to the sans) and Josefin Sans (headings move to Newsreader).
  - **Body text:** stays Newsreader.
  - **Layout of text:** use `text-wrap: balance` on headings and `pretty` on paragraphs. Headings max about 20ch, prose about 66ch. Set a scale (for example 14, 16, 18, 21, 26, 34, 44, 56px at desktop) and use it consistently. Numbers in labels and dates use tabular figures.
- **Grid and spacing:**
  - Keep a 12-column grid on wide screens with consistent gutters.
  - Section headings now sit directly ABOVE their content. Drop the left-rail heading column that pushed content to columns 5–12. Three-level indentation (heading, term, description) must not occur.
  - Use one spacing scale (4, 8, 12, 16, 24, 32, 48, 64, 96px). Related things get small gaps (8–24); distinct sections get large ones (64–96). A heading is never further from its own content than from the previous section, and an explanation stays next to its action.
- **Components:** keep them simple and finished:
  - **Buttons:** primary is solid Forest with Parchment text; secondary is outlined; plain text links have an underline offset. Every button label states what happens. Minimum target 44×44px.
  - **Lists** with hairline dividers.
  - **Form fields** with visible labels above, hints, inline errors and a status area.
  - **Figures** with captions (date in words plus a factual line).
  - **Avoid:** gradients, glows, particles, glass, heavy rounded containers (radius 0–4px), drop shadows, icon-beside-every-heading, scroll animations.
  - Honour `prefers-reduced-motion`. Focus is always visible: a 2px Forest or Light Gold outline with offset.
- **Navigation** (desktop and phone): About · Chapters · Learn · Events · The Review · **Join**, with Join the visually distinct primary item.
  - Keep the URLs: Learn is `/topics`, retitled "Learn". It holds the topics, the resource library and a clear "Mercurius AI, the tutor we built" section linking to `/mercurius`. The Review is `/blog`, titled "The AI Literacy Review".
  - `/mercurius` stays a page, reachable from Learn, the homepage and the footer.
  - On phones the Menu button opens an accessible list (`aria-expanded`, Escape closes it, focus is managed).
- **Images:** real photos only, with `srcset`/`sizes` and explicit `width`/`height`. Lazy-load below the fold. Crop with `object-position` so faces and the table stay in frame. Captions stay accurate. No clock times from metadata.

## 3. /join (priority)
- **H1:** "Find your place in the movement."
- **Intro (2–3 short sentences, concrete):** learn alongside other students, help start a chapter at your school, or support the work as a teacher, parent or partner.
- **Three participation routes, BEFORE the form,** as an editorial list or three columns with dividers rather than heavy cards. Each route has a number, a heading, two or three lines and real actions:
  1. **Join a chapter** (`id="join-a-chapter"`):
     - **Mayo students:** come on Thursday, with the meeting details from `events-data.json` (static fallback in the HTML).
     - **Eligibility, explicitly:** Thursday meetings are for Mayo High School students. Outside visitors, including students from other schools, can't attend school meetings.
     - **Students at another school** who want to hear about a chapter near them without founding one get a route to the same form with "A student at another school" preselected.
     - **Verified chapter information only:** right now the club meets at Mayo High School. No directory or map.
     - **Actions:** "Leave your name" (preselects Mayo student and moves focus to the form) and "I'm at another school" (preselects other school).
  2. **Start a chapter** (`id="start-a-chapter"`):
     - Summarise the real requirements and support in one tight list.
     - State the difference: putting your name in is interest; a chapter exists only once a founder and an advisor are in place and the school's approval process has been followed.
     - **Actions:** "Open the founder form (Google Forms)", the external link, with the new-tab behaviour stated in the label or an accessible hint; and "Read how chapters work" (`/chapters`).
     - Don't promise a reply time.
  3. **Support the movement** (`id="support"`):
     - For teachers, prospective faculty advisors, parents and partners or sponsors.
     - **Action:** "Write to the club", which preselects the supporter route.
- **Evidence beside the decision:** one real photo, the November 20, 2025 meeting (or a crop of it), with its caption, placed with the routes. Add a short "Your first Thursday" note with confirmed facts only: 8:20 AM, MHS Library Classroom, one topic talked through around a table, no sign-up, no experience needed.
- **The form** stays ONE Netlify form so existing notifications keep working. Keep `name="contact"`, `data-netlify="true"`, `netlify-honeypot="bot-field"`, the hidden `form-name=contact` and the existing field names `name`, `email`, `grade`, `experience`, `message`.
  - **New fields** must be in the static HTML so Netlify registers them at deploy: `route` (radio, required), `school`, `role`, `organization`.
    - **`route` values and labels:** `mayo-student` ("A Mayo High School student"), `other-school-student` ("A student at another school"), `supporter` ("A teacher, advisor, parent or partner").
    - **Mayo student fields:** name, email (autocomplete email), grade (9–12, required), experience (optional), message (optional: "Anything you'd like us to know").
    - **Other-school student fields:** name, email, school (required, "School name and city"), grade (optional), message (optional).
    - **Supporter fields:** name, email, `role` (select, required: "Teacher or school staff", "Interested in advising a chapter", "Parent or guardian", "Organization or sponsor", "Something else"), organization (optional, `autocomplete="organization"`), message (required, "How would you like to help?"). Supporters never see grade or experience.
    - Drop the old "Not a student" grade option.
  - **With JS:** only the chosen route's field group shows, and hidden groups are `disabled` (not submitted or validated). The submit label matches the route: "Leave your name", "Send my interest", "Send your message".
  - **Without JS:** everything works natively. All groups are visible under clear sub-headings, with required only on route, name and email, and Netlify's own confirmation page shows.
  - **Hash preselects:** `/join#join-a-chapter`, `#start-a-chapter` and `#support` scroll to their route; `/join#form-mayo`, `#form-other-school` and `#form-supporter` preselect a route and focus the form. Keep `#leave` working as an alias of the form.
  - **States, distinct and announced:**
    - **Idle.**
    - **Invalid:** inline messages tied with `aria-describedby`, `aria-invalid`, focus moves to the first invalid field, and a short summary in a `role="alert"` region.
    - **Sending:** button disabled, label "Sending…", `aria-busy`, no double submits.
    - **Success:** ONLY after `res.ok`. Replace the form with a confirmation that says what happens next, using only confirmed facts. The current promise "we will email you" may stay. Mayo students get "or just come on Thursday". Focus the confirmation (`role="status"`).
    - **Failure:** server or network. Keep every input, give a useful message ("That didn't send. Your details are still here, so try again. If it keeps failing, message us on Instagram @mayoailiteracy." plus "come on Thursday" for Mayo students), and offer a retry.
  - Submit with `fetch` POST, urlencoded, to `/join`, as today. Keep it light on JS.
  - **Phone:** single column, 16px+ inputs (no iOS zoom), 44px targets, labels above fields.
- **Explain what happens afterwards** next to the submit, briefly and truthfully.
- **Meta:** update the title, description and OG text for the new page purpose.

## 4. /chapters
- **Reading order:** purpose → requirements → support (including governance, explained plainly) → what happens next → application.
  - **Purpose:** why chapters, and what a chapter does at its school.
  - **Requirements:** founder, advisor, monthly meeting, one event per semester, cost (none).
  - **Support:**
    - lessons you can run as written;
    - video support from Shyam and Adam through the founding year;
    - **governance:** the Central Board; each chapter president holds a vote in how the network is run. Say what that means in one or two plain sentences, with no invented powers.
  - **What happens next:** interest vs approved chapter; the three conditions; no reply-time promise.
  - **Application:** "Open the founder form (Google Forms)", plus a link to `/join#support` for advisors and teachers.
- One early action near the top is fine ("Ready? Open the founder form"), but the main application block comes after the explanation.
- The AACA citation and record ("Where we stand") become compact supporting material below, or a short credibility paragraph. They must not bury the practical founding information.
- Remove the deep indentation: headings sit above content; definition-style rows go no deeper than one level.

## 5. Homepage
- Keep the authentic Mayo origin: the meeting photo, "This Thursday", and the "We teach students…" line or the mission.
- Make participation and chapter expansion visible EARLY, within the first two screens on a phone. A compact "Three ways to take part" strip links to the three `/join` routes, and a line says the program is opening to other high schools (linking to `/chapters`).
- Keep the verified credibility: the AACA poster citation, the record, signed latest writing, Mercurius, the supporter.
- One clear primary next action per screen area. Keep the existing useful content and links.

## 6. Everything else
Make About, Learn (`/topics`), Events, The Review (`/blog`), `blog-post`, `/mercurius`, `/404` and the Pentagon page's shell consistent with the new type, spacing, header and footer. No content rewrites beyond what consistency needs. On the Pentagon page, never touch the `<article>` or its images. Footer pages list: About, Chapters, Learn, Events, The Review, Mercurius AI, Join.

## 7. How to work and test
- **Preview:** `python3 tools/serve.py 8150` (already running at http://127.0.0.1:8150). It serves clean URLs and MOCKS form posts: nothing reaches Netlify. Submissions append to `tools/.dev-inbox.jsonl`.
  - Name "Test Failure" gives a 500.
  - "Test Slow" gives a 4-second delay.
  - "Test Offline" gives a dropped connection.
  - A post missing form-name gives a 400.

  Never submit to the live site.
- **Screenshots:** `node tools/shoot.mjs <url> <out-prefix> 360,390,768,1280,1440` writes the full page and the first screen per width and prints horizontal overflow. Put shots under `.shots/` (gitignored). Read the PNGs and critique them honestly.
- **Interaction checks:** write `tools/check-join.mjs`, a CDP script in the same style as `shoot.mjs`, that exercises every route, the hash preselects, validation, sending, success, failure and offline states, input preservation, keyboard tab order and visible focus, and the phone menu. It exits non-zero on failure.
- **Cache-busters:** bump `/styles.css?v=` and `/script.js?v=` when you change them; every page must match.
- **Write as you go:** `docs/design-system.md` (tokens, type scale, spacing, components, contrast ratios, font choice) and `docs/content-needs.md` (every missing fact or asset, with where it would go).

## Additional verified facts (artifacts)

Added October 6, 2026, from the founder's own documents. The full catalogue, the conflicts between documents and the rendered images are in `docs/artifacts.md`.

**How to read this section:**

- Each fact is what the named document says, quoted verbatim where it is in quotation marks, with a page or slide reference.
- **Usable** means it may go on the site as written, with its source.
- **Hold** means it is verified as written, but it conflicts with another source or depends on a founder decision. It stays off the site until the matching `docs/content-needs.md` item is answered.

### Year One Impact Report (PDF, 2 pp., "July 2026", "Prepared for the Office of the Superintendent")
- **Founding month. Usable.** "Founded in October 2025" (p. 1). This refines "Started in 2025".
- **Year-one totals. Hold (#27).** "During our first year, we held 31 total meetings, engaged 54 unique students" (p. 1). Metrics table: "31 Meetings · 54 Students · 17.5 Hours" (p. 1). These conflict with the AACA poster's "27 weekly sessions across the school year" and "30 students in sustained programming".
- **District ambition. Usable as the club's stated aim, not as an achievement.** The club is "now seeking to expand our impact throughout the greater Rochester Public Schools community" (p. 1). It wants to "share the student perspective as AI policies develop, and support classroom AI literacy efforts" (p. 2). Don't say the report was delivered to the district (#28).
- **Program areas. Usable** for Learn and for `/chapters` "what you'd teach" (p. 2):
  - AI Fundamentals: "How modern AI systems work · Prompt engineering · Effective AI use · AI Trends & Future Developments";
  - Critical Thinking: "Bias & Fairness · Hallucination & Deepfake detection · Source Evaluation";
  - Responsible Use: "Ethics & Alignment · Academic integrity · AI in Society".
- **Mission wording. Usable.** "to provide every student with access to a foundational AI education. Beyond AI education, it is our mission to strengthen and protect critical thinking in an age of instant answers." (p. 1). "It's about developing the judgment to know when to use it, when to trust it, when to question it, and when to think independently." (p. 2).

### AACA poster ("Teaching the Pause", June 12–15, 2026), facts beyond the citation already used
- **Curriculum units. Usable.** "20 guided lessons across 5 curriculum units" (panel 03). The units are "How AI Actually Works · Bias & Fairness · AI in Society · Prompt Engineering · Ethics & Alignment" (panel 02). The unit names are usable now; the count "20 guided lessons" is Hold with the other metrics (#27).
- **The debate is the club's flagship event. Usable** as wording, undated: "plus the flagship "2v20" AI-Literacy Debate" (panel 03).
- **Board roles on the poster. Usable as already on the site.** Shyam Christensen and Nathan Dozois are each "Co-Founder & Co-President", Adam Keegan is "Vice President", Niko Lazaridis is "Secretary" (footer). The poster also lists Adam Keegan as "Co-Founder & COO, Mercurius AI". This bears on content-needs #11; don't strengthen the site's Mercurius credit until answered.

### The 2 vs. 20 Hot Seat Debate (Instagram posters and carousels, April 2026)
- **Format. Usable** as a description of how the debate was designed:
  - "2 AI Literacy founders VS. 20 AI skeptics";
  - "a Jubilee-style 2 vs. 20 debate on different AI topics";
  - "There will be 3 sections to this debate, each headlined by a claim that will be curated by our team based on form submissions.";
  - "Speakers will continue to argue until they are voted out by a majority of their peers, in which case the time will pause and a new person will step forward.";
  - "*All statistical claims will be fact checked live by our team." ("Event Rules" square).
- **Announced date. Hold (#6, #33).** "TUESDAY, APRIL 28TH · 6:30 PM · Mayo Auditorium" (carousel slides 1–2 and the revised poster). An earlier poster said "WEDNESDAY APRIL 29". The debate stays undated on the site until confirmed.

### Meetings evidenced by the decks
- **Thursday, February 26, 2026: "AI Literacy: Socratic Seminar". Hold until confirmed held (#26).** Seven questions, for example "Is banning AI in schools more harmful than teaching students to use it strategically?" (slide 4) and "Is it more dangerous for AI to be inaccurate — or persuasive?" (slide 6).
- **Thursday, September 3, 2026: "AI Literacy: Year 2", "Human vs. AI Jeopardy". Hold (#26).** Teams decide "HUMAN or AI" and "bet your confidence: 1, 2, or 3 points" (slide 3). If it ran, the Sept 28 interest meeting was not "The first meeting of the 2026–27 year", as `events-data.json` says.
- **Last meeting of 2025–26 (undated, early June 2026): "Final AI Lit of 2026". Usable as an activity, undated.** "The Nuclear False Positive" dilemma, with the lesson "High confidence is not the same as certainty." (slides 4 and 6).

### Chapter brief, lines not yet on the site
- **Cost, stated plainly. Usable** on `/chapters` requirements: "There is no budget attached: nothing is purchased, and nothing is billed to the school."
- **Who should found a chapter. Usable** on `/join` "Start a chapter" or on `/chapters`: "Not the strongest coder. The one who organizes things and finishes them, usually already running something else."
- **Instagram reach. Hold (#37).** "we run an Instagram account followed by 250 students". The count is time-sensitive.

### Chapter materials that exist
- **A complete, run-as-written lesson exists. Usable** once #25 is answered: "AI on Trial: But It Wasn't My Voice!" (PDF author "AI Literacy Club", 16 pp.). It has:
  - an 11-page Student Pack: case file, six role cards, nameplates and exit tickets;
  - a 5-page Facilitator Guide: "20 minutes | 6 groups | One shared character per group" (p. 12), with the minute-by-minute clock on p. 13.

  It's what "curriculum and lesson materials the chapter can run as written" means in practice.

### Governance Constitution ("MAYO AI LITERACY CONSTITUTION", 5 pp., file dated September 6, 2026; signature block blank)
All of this is **Hold (#29)** until the founder confirms that this document is adopted and applies to chapters outside Rochester Public Schools (#30).

The one exception: the first two bullets under "Central Board and chapter votes" repeat what the brief already says, and stay usable in the brief's words.

**Central Board and chapter votes:**
- **Composition:** "The Central Board consists of the Chapter Presidents and the central officers named in Article III." (Art. II §3, p. 2).
- **Chapter Presidents vote:** "Chapter Presidents sit on the Central Board as voting members; the Chapters are governed with the Board rather than by it." (Art. II §3, p. 2). "Each Chapter President holds one (1) vote on the Central Board." (Art. III §3, p. 2).
- **What the Board does and does not do:** It "coordinates across Chapters, maintains shared curriculum and standards, and holds the Organization's external relationships. It does not direct the internal programming of any Chapter." (Art. II §3, p. 2).
- **Central elections:** "Central officers are elected by the Central Board by simple majority in a spring meeting. The Board consists of the Chapter Presidents and the sitting central officers, each holding one (1) vote; the President votes only to break a tie." (Art. IV §3, p. 3).
- **Meetings and quorum:**
  - "The Central Board shall meet at least every other week during the school year. Minutes shall be recorded and preserved for every Board meeting." (Art. V §1, p. 3);
  - "A majority of seated Central Board members constitutes a quorum. No vote may be taken absent a quorum." (Art. V §2, p. 3).
- **Larger decisions need two-thirds:**
  - removal of an officer needs "a two-thirds (2/3) vote of the Central Board and the concurrence of the relevant faculty advisor", after written notice and a chance to respond (Art. V §4, p. 4);
  - amendments need "a two-thirds (2/3) vote of the Central Board", with the text circulated "at least one (1) week before the vote" (Art. VII §1, p. 4);
  - Articles I, II, III, IV, VI and VII also need "the written concurrence of the Founding President" (Art. VII §3(b), p. 5).

**How a chapter starts and runs:**
- **Establishment:** "A Chapter is established by resolution of the Central Board upon identifying a faculty advisor and at least five (5) prospective members at the host school." (Art. II §2, pp. 1–2).
- **First-year president:** "For its first year only, that Chapter's President is appointed by the Central Board with the concurrence of the Chapter's faculty advisor. Beginning the following spring, the Chapter elects its own officers" (Art. IV §4, p. 3).
- **Chapter independence:** "Each Chapter conducts its own programming, recruits its own members, elects its own officers, and maintains a relationship with a faculty advisor at its school." (Art. II §2, p. 1).
- **Chapter President's duties:** "directs all programming within their school, presides over Chapter meetings and elections, maintains the relationship with their Chapter's faculty advisor, and reports membership counts and activities to the Central Board each term." (Art. III §3, p. 2).
- **Membership:** "open to any student enrolled at a school hosting a Chapter, without dues or prerequisite". A member in good standing "has attended at least three (3) Chapter meetings in the current semester; only members in good standing may vote in Chapter elections or hold office." (Art. I §3, p. 1).
- **Chapter elections:** "by the members in good standing of that Chapter, by simple majority, in a spring election announced at least two (2) weeks in advance." (Art. IV §2, p. 3). "All offices, including the Presidency, are held for one (1) school year and turn over in the spring." (Art. IV §1, p. 3).
- **Cadence:** "Chapters shall meet regularly during the school year, ordinarily weekly." (Art. V §1, p. 3). This conflicts with the brief's "meets monthly" (#31).

**The faculty advisor's role:** Advisors "are consulted on matters of school and District policy, are notified of officer transitions and vacancies, and must concur in any removal" (Art. II §4, p. 2). The brief's version, "attends meetings and signs off on room requests", stays the public wording.

**Safeguards a principal or advisor would want to read:**
- **District policy governs:** "Nothing in this constitution supersedes District policy, and where the two conflict, District policy governs." (Art. VI §1, p. 4).
- **Materials review:** "Any material used with students in a District building shall be reviewed in advance by District or school staff designated for that purpose, without exception." (Art. VI §2, p. 4).
- **Student data:** "The Organization does not collect, store, or process data about individual students, and does not require student accounts, rosters, or access to District systems for its programming. Attendance is recorded only in aggregate." (Art. VI §3, p. 4).
- **Political neutrality:** "The Organization does not endorse candidates for public office or take positions in partisan campaigns." (Art. VI §5, p. 4).
- **Independence:** "does not act as a representative, reseller, or promoter of any commercial product or vendor, including products created by its own members." (Art. VI §4, p. 4). This conflicts with the site's Mercurius promotion. It is a founder decision (#32).
- **Continuity:**
  - "Founder credit is permanent." (Art. III §8, p. 3);
  - on dissolution, the "curriculum and materials shall be offered to Rochester Public Schools for continued use" (Art. VII §3, p. 5).

**Officers the site doesn't list yet:** The constitution also defines a Curriculum Director and a Communications Director (Art. III §§4–5, p. 2). The Secretary (Art. III §6) is on the site already, as Niko Lazaridis. Don't name anyone for the two director roles unless confirmed.
