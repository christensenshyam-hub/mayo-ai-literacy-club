# Content needs

Internal; not published. These facts and assets are missing or unconfirmed. The site works around each one and invents nothing. Each entry says where the answer would go.

## Carried over from the fall 2026 launch (COPY-REVIEW, October 2)
1. **Netlify form notifications.** Do submissions to the `contact` form reach an inbox a board member reads? The site says "we will email you". This shows on `/join` (its success message and the text near the submit) and in the `/join` meta.
2. **Permission for the November 20, 2025 meeting photo.** About 17 identifiable students appear in it. It is used on `/` and `/join`.
3. **Fall 2026 schedule.** Still Thursdays at 8:20 AM in the MHS Library Classroom? This lives in `events-data.json` `schedule`, plus the static fallbacks.
4. **Fall meeting topics and dates.** These go in `events-data.json` `upcoming`.
5. **The March 26, 2026 meeting.** Did it happen as planned? It is listed under past in `events-data.json`.
6. **The school-wide debate.** Date, format ("2v20") and turnout. It appears undated on `/`, `/about` and `/chapters`.
7. **Nathan Dozois's 2026–27 role.** Currently "Co-founder and co-president", from the June 2026 poster.
8. **The faculty advisor** at Mayo: name, and whether to publish it. A principal at another school may ask.
9. **The five AACA photos.** Permission and the photographer's credit. Commented markup is ready on `/`, `/about` and `/chapters` (`data-photo="aaca-board-2026"`).
10. **Dermatology Partners.** Are they still a supporter, and what tier, if any? *Second pass:* `assets/dermatology-partners.svg` also carries a second mark, "DOCS Dermatology", that nothing on the site explains. The homepage now says only "Dermatology Partners supports the club." in route 03, with no logo. Which mark, if any, do they want shown, and where?
11. **Mercurius credit.** Is "Shyam Christensen and Adam Keegan lead the app" how the founder wants it said?
12. **Pentagon article.** Source links for the timeline, and the drop cap and progress-bar fix. These need Nathan's OK.
13. **The Mercurius backend's club facts.** These are being synced in a separate task.

## New for the participation redesign
14. **What happens after the chapter founder form?** Who replies, how, and roughly when. `/chapters` and `/join` say only what is confirmed (interest is not approval) and promise no reply time.
15. **Existing chapters beyond Mayo.** None are confirmed, so there is no directory. List any approved chapter here before it appears on the site.
16. **Meeting length and the first-bell time** for "Your first Thursday" on `/join`. Unconfirmed, so not stated.
17. **Who answers supporter messages** (teachers, advisors, parents, partners) from the `contact` form. The same question as #1, but for adults.
18. **The Mercurius tutor's description of the join form.** It names the old fields. The form now has a `route` field and route-specific fields (`school`, `role`, `organization`), and the old field names are kept. Update the backend copy (the separate task) if it lists the fields.

## From the artifacts catalogue (October 6)
Source: `docs/artifacts.md`, where A1–A14 are the catalogued artifacts. Rendered candidates are in `.shots/artifacts/`, which is not deployed.

### Permission: students named or pictured
19. **The AACA poster as an image (A1).**
    - **What it shows:** headshots and names of Shyam Christensen, Nathan Dozois, Adam Keegan and Niko Lazaridis, plus QR codes to mayoailiteracy.com and trymercurius.com/beta.
    - **Question:** may the whole poster be shown on `/chapters` and `/about`?
    - **Also check:** whether the beta link still resolves.
20. **The Hot Seat Debate posters (A10).**
    - **What they show:** large photos and names of Shyam and Nathan, plus a screenshot from a Jubilee video showing third-party people. That screenshot is someone else's copyright.
    - **Current plan:** the posters stay off the site, and only the faceless "Event Rules" square is a candidate.
    - **Question:** is there a club-owned photo of the debate itself?
21. **Shyam Christensen's "Publicist Speech" (A6, slide 11).** The Jeopardy deck quotes his 2026 speech, apparently a student-government speech, as the "Human" answer. Is it OK to show that slide, or quote it, on the site? It ties the club to another office he holds.
22. **The anonymous human text message (A6, slide 13).** Who wrote it, and do they agree to it being shown, even unattributed? Until then, crops and annotated samples use slides 3–10 only.
23. **The November 20, 2025 photo: the laptop screen (A13).**
    - **What's on screen:** a member's ChatGPT window, including the chat-history sidebar, and the menu-bar clock. The clock time is never published.
    - **Question 1:** is the screen OK to show at its current size, or should crops avoid it? *Second pass:* from 1024px the homepage serves a band cut from the file above the laptop, so the screen isn't in it. Below 1024 the 2:1 file still shows the laptop, at most 1200w. `assets/photos/meeting-2025-11-20-wide-1800.jpg` is still deployed at a public URL, although no page references it now; on zoom its sidebar chat titles and menu-bar clock are partly legible. Should it be removed or re-cut?
    - **Question 2:** was that meeting's topic AI and jobs / universal basic income? The screen shows a ChatGPT answer headed "UBI Protects Human Dignity". If so, a caption could say what the table was evaluating.
    - This adds to #2, which already covers the students' faces.
24. **Michael Teng (A11).** His "Concerns from a Student in the Era of AI" is the only signed piece by a member outside the board. Featuring it on the homepage or `/join` as the member voice is a new use of his name. Does he, and if needed a parent, agree?
25. **"AI on Trial: But It Wasn't My Voice!" (A9).**
    - **Questions:** who wrote it (the PDF says only "AI Literacy Club"), and has it been run at Mayo? If so, when?
    - **Exit tickets:** if any were collected, may anonymised answers be quoted?
    - **District review:** Article VI §2 of the constitution requires District or school review of "Any material used with students in a District building". Has the pack had it?
    - **Where it would go:** `/chapters` support, and later a download.

### Facts the artifacts raise
26. **Which meetings actually ran, and on what dates.** The decks evidence three meetings `events-data.json` doesn't list:
    - the Socratic Seminar, Thursday, February 26, 2026 (A7);
    - Human vs. AI Jeopardy, "Year 2", Thursday, September 3, 2026 (A6);
    - the "Final AI Lit of 2026" in early June 2026, date unknown (A8).

    If September 3 ran, the September 28 entry's description, "The first meeting of the 2026–27 year", is wrong. This would go in `events-data.json` `past`, on `/events` and in the homepage record.
27. **Which first-year numbers are right?**
    - **The AACA poster (June 2026):** "27 weekly sessions", "30 students in sustained programming", "20 guided lessons across 5 curriculum units".
    - **The Year One Report (July 2026):** "31 total meetings", "54 unique students", "17.5" hours.
    - **What we need:** one set to publish, and what each number counts. Nothing is published until then.
    - **Where it would go:** `/about`, `/chapters` ("Where we stand") and the homepage record.
28. **Was the Year One Report delivered** to the Office of the Superintendent (it says "Prepared for")? If so, the site could say the club reported its first year to the district (`/about`, `/chapters`).
29. **Is the Governance Constitution in force?** The September 6 copy has a blank "ADOPTED BY" block on p. 5. Has it been signed by the President, the Vice President, the founding Chapter President and the founding Chapter's faculty advisor? And which version governs (an August 6 file also exists)? Every constitution fact in `participation-redesign.md` is on hold until this is answered.
30. **Chapter scope.** The constitution says chapters operate "within Rochester Public Schools" (Art. I §1). The brief and the site open the program "to high schools across the country". Will the constitution be amended, or is there a separate national version? This decides what `/chapters` may say about governance.
31. **Founding a chapter and how often it meets.**
    - **Cadence:** the brief says chapters meet monthly; the constitution says "ordinarily weekly" (Art. V §1).
    - **Founding conditions:** the constitution also requires a Central Board resolution and "at least five (5) prospective members" (Art. II §2). It also says first-year chapter presidents are appointed by the Board with the advisor's concurrence (Art. IV §4).
    - **Question:** which of these apply to the national program?
    - **Where it would go:** `/chapters` (requirements and what happens next) and `/join` ("Start a chapter").
32. **Mercurius and the constitution.** Article VI §4 says the Organization "does not act as a representative, reseller, or promoter of any commercial product or vendor, including products created by its own members". The site promotes Mercurius AI on Learn, the homepage, `/mercurius` and the footer.
    - **This is the founder's call, not a design call.**
    - **Options:**
      - keep the current treatment and amend or interpret the clause;
      - add a disclosure line;
      - reduce the promotion.
    - Related: the poster lists Adam Keegan as "Co-Founder & COO, Mercurius AI". This bears on #11.
33. **The 2 vs. 20 Hot Seat Debate (adds to #6).**
    - **Announced as:** "TUESDAY, APRIL 28TH · 6:30 PM · Mayo Auditorium". An earlier poster said Wednesday, April 29.
    - **Question 1:** did it take place on April 28, 2026? Roughly how many people took part and watched?
    - **Question 2:** did the "3 sections" and "voted out by a majority of their peers" rules run as planned?
    - **Question 3:** the "Streaming" slide promises highlights on "our YouTube account". Does that account exist, and under what name?
    - **Where it would go:** `/about`, the homepage record and `/chapters` ("Where we stand").
34. **The interest-meeting venue and time.** The poster says "Mayo High School Cafeteria" and "7:00-8:00", with no AM or PM. The site says "the Mayo commons". Which name do students use? And should the time appear on `/events`?
35. **The "Final AI Lit of 2026" deck needs a fix before it's shared (A8).**
    - **The problem:** slide 8's "Election Oracle" is about an AI forecast, but its options and the outcomes on slides 9–11 refer to a "video".
    - **The fix:** align them, or share only the "Nuclear False Positive" (slides 4–7).
    - **Also:** what was this meeting's date?
36. **Third-party images in lesson decks.** These can't go out as chapter resources or on the site until replaced or removed:
    - the NVIDIA spec graphic (2/26 deck, slide 2);
    - the B.F. Skinner portrait (2/26, slide 3);
    - AI-generated illustrations (2/26, slide 6; 9/3, slide 12);
    - the Jubilee still (the Hot Seat posters).
37. **Instagram reach.** The chapter brief says "we run an Instagram account followed by 250 students". Is that current, and may the site use the number? It would go in "Where we stand" on `/chapters`. Today the site says only "@mayoailiteracy".
38. **Meeting length (adds to #16).** The Year One Report's 17.5 hours over 31 meetings averages about 34 minutes a meeting. That is a hint, not a confirmed length. Confirm the length and the first bell before "Your first Thursday" on `/join` states either.

## From the homepage first pass (October 6)
39. **Photo credit for the November 20, 2025 meeting photo.** Who took it? The caption rule is date, what it shows, then "Photo: [name]" once known. Today the homepage caption stops at "A weekly meeting in the MHS Library Classroom." This adds to #2 (permission) and #23 (the laptop screen).
40. **Bylines: verified roles.** The homepage Story section gives both authors the role "Co-founder", which is permanent and verified. If the founders prefer "Co-president" (Shyam Christensen) or a 2026–27 role for Nathan Dozois (#7), it goes in the byline row on `/` and later on The Review.
41. **The interest meeting's description.** *Second pass:* the homepage record now says only "Fall interest meeting: September 28, 2026, in the Mayo commons." `events-data.json` `past` still describes it as "The first meeting of the 2026–27 year", which `/events` shows and the Mercurius backend reads. If the September 3 Jeopardy meeting ran (#26), that line is wrong. Changing the JSON is the founders' call.

## From the homepage second pass (October 6)
42. **Ship gate: the rebuilt `/join`.** The homepage now links to `/join#join-a-chapter`, `#start-a-chapter`, `#form-other-school` and `#form-supporter`. The live `/join` has none of these ids, and no school or route field. It is not a fact to confirm, but a blocker: the homepage (`index.html`, `next.css`, `next.js`) must not deploy before `/join` (spec §3) ships.
43. **"The Nuclear False Positive" on the homepage (A8, slide 4).**
    - **Time and group size:** what goes in its "What you'll need" line, e.g. how long it ran and in how many groups? `artifacts.md` calls it a "15-minute activity", but that is an inference, so nothing is shown.
    - **Credit:** the deck has no byline. The page credits "the club's meeting deck". Is that how the founders want it credited?
    - **New use:** the founders should confirm they're happy for this slide to be the homepage's example of a meeting. Slides 8–11 stay off until #35 is fixed.
44. **Jeopardy slide 9 (A6) as the homepage work sample.** It is the stronger sample (an AI-written "personal" college essay), but the spec marks the September 3 deck Hold. It waits on #26: did that meeting run on Thursday, September 3, 2026? Once it is confirmed, it replaces or joins the Nuclear False Positive in "What happens on Thursdays".
45. **"This Thursday" during breaks.** The hero says "This Thursday, 8:20 AM" every week, built from `events-data.json` `schedule`, as spec §5 asks. It can't know about school breaks or cancelled weeks, and the fall schedule is unconfirmed (#3). Should breaks be listed somewhere (for example a `noMeeting` list in the JSON, which needs the backend's OK because it reads that file), or should the hero say "Thursdays" instead?
46. **The A14 photo's credit.** The September 28, 2026 commons photo is now on the homepage too. The caption ends at what it shows; add "Photo: [name]" once known (same rule as #39).
