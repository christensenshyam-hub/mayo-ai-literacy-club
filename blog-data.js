// =====================================================
//  MAYO AI LITERACY CLUB — BLOG POSTS
//  To add a new post: copy the template below, fill it
//  in, add it to the top of the BLOG_POSTS array, then
//  push to GitHub. That's it — it goes live in ~30 sec.
// =====================================================

// TEMPLATE — copy this block and fill it in:
// {
//   id: 'unique-post-slug',          // URL-safe, no spaces (e.g. 'march-recap')
//   title: 'Your Post Title',
//   date: 'March 19, 2026',
//   author: 'Shyam Christensen',
//   category: 'Meeting Recap',       // e.g. Meeting Recap, AI News, Opinion, Resources
//   summary: 'One or two sentences shown on the blog listing page.',
//   content: `
//     Write your full post here. Separate paragraphs with a blank line.
//
//     You can use **bold text** or *italic text* if you want.
//     You can also add a ## Subheading like this.
//
//     That's it!
//   `
// },

const BLOG_POSTS = [

  {
    id: 'anthropic-pentagon-fallout',
    title: 'Who Gets to Tell the Robot No?',
    date: 'March 19, 2026',
    author: 'Nathan Dozois',
    category: 'AI Policy',
    customUrl: 'blog-anthropic-pentagon.html',
    summary: 'Anthropic built the most trusted AI in classified government networks — and then refused to let the Pentagon use it however it wanted. The fallout is reshaping the future of AI, warfare, and American democracy.',
    content: `
      Imagine you sell a contractor a very powerful set of power tools. The contractor is great — does good work, handles dangerous equipment responsibly. Then one day, a new site manager shows up and says: we need to rewire those tools so the safety guards come off. You say no. They say: give us the tools as-is, or we'll ban your whole business from every job site in the country.

      That is, roughly, what just happened between Anthropic and the United States government. And the implications go way beyond one tech company's contract dispute.

      ## The Setup: Claude Goes to War

      Anthropic is the San Francisco-based company that makes Claude — the AI assistant you may have used to write an email, summarize a document, or answer a tricky question. But Claude wasn't just answering questions for regular people. Anthropic signed a contract with the US Department of Defense in July 2025 worth up to $200 million to help "prototype frontier AI capabilities that advance U.S. national security."

      Anthropic was the first frontier AI company to put its models on classified networks and the first to provide customized models for national security customers. In practice, that meant Claude was doing intelligence analysis, cybersecurity work, military simulations, and planning assistance deep inside the US government's most sensitive systems.

      There was a catch, though — and Anthropic made it clear from day one. The company had two hard limits baked into its contract: Claude could not be used for mass domestic surveillance of Americans, and it could not be embedded in fully autonomous weapons systems. No human in the loop? No deal.

      **What is an autonomous weapon?** An autonomous weapon is one that can identify, select, and engage a target with no human approval required. Think of a drone that decides on its own when and what to shoot — no soldier pressing a button. Anthropic's position: today's AI is not reliable enough for that responsibility.

      ## The Incident That Changed Everything

      Things started to unravel in January 2026. Tensions intensified after The Wall Street Journal and Axios reported on the use of Anthropic products in the operation to capture Venezuelan President Nicolás Maduro. Exactly how Claude was used in the operation hasn't been confirmed publicly — but the reports were enough to rattle both sides.

      Anthropic asked whether their software was used for the raid to capture Maduro, which caused real concerns across the Department of War indicating that they might not approve if it was, according to an official who spoke to Axios.

      This was the moment the relationship began its rapid unraveling. The Pentagon's new leadership, under Defense Secretary Pete Hegseth, had a different vision for what "responsible AI" should mean in a military context. A memorandum issued by Hegseth stated that military AI should encompass "any lawful use" of AI models by the US military — no exceptions, no company-imposed red lines.

      ## The 5:01 PM Deadline

      On February 24, US Defense Secretary Pete Hegseth gave Anthropic CEO Dario Amodei a deadline: relent by 5:01 p.m. on Friday, February 27, and allow unrestricted use of the company's AI models "for all legal purposes."

      Anthropic refused.

      Amodei said in a statement on February 26 that he "cannot in good conscience accede to the Pentagon's request" for unrestricted access to the company's AI systems, citing two specific reasons: current AI models aren't reliable enough for fully autonomous weapons, and using Claude for mass domestic surveillance of Americans crosses a line he wouldn't cross for any customer — including the US government.

      *"Some uses are simply outside the bounds of what today's technology can safely and reliably do." — Dario Amodei, Anthropic CEO, February 26, 2026*

      The response from Secretary Hegseth was swift: "Effective immediately, no contractor, supplier, or partner that does business with the United States military may conduct any commercial activity with Anthropic." He gave Anthropic six months to transition the government off its systems and declared the company a "supply chain risk" — a designation previously only applied to foreign companies and designed to prevent adversaries from sabotaging U.S. military systems.

      ## Could Claude "Blow Up an Elementary School"?

      Here's where the debate gets both important and deeply uncomfortable — and where a lot of people's fears about AI come into sharp focus.

      The scenario sounds outlandish: could an AI like Claude, deployed in an autonomous military system, cause civilian casualties — a school, a hospital, a crowded marketplace — without any human ever making that call?

      This isn't paranoia. It's exactly the scenario AI safety researchers have been warning about for years, and it's the precise reason Anthropic drew its red lines. Anthropic argued that current frontier AI models are not reliable enough to be used in fully autonomous weapons, and that "allowing current models to be used in this way would endanger America's warfighters and civilians."

      **The core safety problem:** AI models — even very good ones — can be confidently wrong. They hallucinate facts, misread context, and fail in unpredictable ways. A human soldier can reconsider. A fully autonomous AI weapon, once deployed with a target objective, cannot have a change of heart. The question Anthropic forced into the open: should we be deploying systems this imperfect in situations where mistakes kill people?

      The Pentagon's position is essentially: *that's our call to make, not yours.* Anthropic's position is: *not with our technology, it isn't.* Both positions have a logic to them. That's what makes this so hard.

      ## The Lawsuit, the Supporters, and the Precedent

      On March 9, Anthropic sued the federal government in a California court, arguing the administration's actions had caused it irreparable harm and requesting an injunction of the supply chain risk designation.

      Then something remarkable happened. Support flooded in from places you wouldn't expect.

      Microsoft's legal filing said that the supply chain risk designation "may bring severe economic effects that are not in the public interest" and argued the government's actions force contractors to comply with "vague and ill-defined directions that have never before been publicly wielded against a US company."

      More than 30 employees from OpenAI and Google DeepMind, including Google chief scientist Jeff Dean, filed an amicus brief warning that a Pentagon blacklist of Anthropic threatens to damage the entire American AI industry. These are employees at direct competitor companies, going to court to defend a rival — because they recognized the precedent being set.

      US Defense Secretary Hegseth's conduct against Anthropic "threatens the rule-of-law principles that have long strengthened our military," according to a brief supported by Michael Hayden, the former director of the CIA, who also alleged the actions were retaliation against a private company that displeased the administration.

      ## 80-Year-Olds Deciding the Future of AI

      Now for the uncomfortable punchline lurking behind all of this: the people who are supposed to referee this fight are, largely, not equipped to do it.

      When tech CEOs testify before Congress, the hearings often become unintentional comedy — senators asking Facebook's Mark Zuckerberg how the company makes money, or asking if an iPhone works on Android. The gap between what legislators understand and what they're being asked to regulate is enormous.

      The average age of a US Senator is over 65. Many of the members on the committees overseeing AI and defense policy are in their 70s and 80s. These are the people who will pass — or fail to pass — laws that govern whether an AI can autonomously launch a missile, surveil an American citizen's phone, or decide who gets flagged as a threat.

      Recent congressional testimony revealed the Department of Defense is accelerating internal AI development specifically to reduce dependence on safety-focused commercial vendors — a move that removes even the private-sector checks that companies like Anthropic were trying to maintain. If the government builds its own AI with no external usage restrictions and no public accountability, the guardrails disappear entirely.

      **What's at stake legislatively:** Congress has repeatedly struggled to pass meaningful AI legislation. While the EU passed its comprehensive AI Act, the US has largely relied on voluntary company commitments. The Anthropic-Pentagon dispute may finally force a real debate — but only if lawmakers can get up to speed fast enough to ask the right questions.

      ## So Who's Actually Responsible?

      Here's the question AI literacy requires you to sit with: when an AI makes a catastrophic error in a military context, who answers for it?

      Is it the company that built the model? If courts side with the government, AI companies pursuing defense work may have no legal right to impose usage restrictions — which would also mean no legal ability to enforce accountability for misuse.

      Is it the government officials who deployed it? The commanders who approved the mission? The Pentagon has no uniform policy on AI accountability in wartime. International law on autonomous weapons is essentially nonexistent.

      Is it the AI itself? No. Legally and practically: no. An AI cannot be court-martialed.

      What Anthropic's stand revealed is that there is currently no clear answer — and that the absence of an answer is itself a crisis. A private company was the only entity in this entire chain saying *wait, let's define some limits first*. And the government's response was to ban them.

      *"Something is so necessary that you need to invoke the Defense Production Act, and so harmful that you put a designation on it reserved for foreign adversaries. I don't know how those two things can both be true." — Mark Dalton, Retired Navy Rear Admiral, R Street Institute*

      ## The Race to the Bottom — Or the Top?

      After Anthropic was banned, OpenAI announced it had done a deal with the Defense Department to provide its technology for classified networks, hours after the president's ban of Anthropic. OpenAI's deal included similar red lines against domestic surveillance and autonomous weapons — but Anthropic's CEO Dario Amodei publicly called it "safety theater," accusing OpenAI of offering guardrails that don't actually hold.

      Meanwhile, Google recently updated its ethical guidelines, dropping its pledge not to use AI for weapons development and surveillance. OpenAI likewise modified its mission statement, removing "safety" as a core value, and Elon Musk's xAI agreed to the Pentagon's "any lawful use" standard.

      The competitive pressure is real. There's enormous money in defense contracts. If one company holds the line on safety and loses a $200 million contract, while another company drops the safety language and wins it, the market incentive becomes clear: safety is a liability.

      Unless the law steps in. Unless Congress — yes, those 80-year-olds — figures out how to write rules that apply to every contractor equally, so that no company faces the choice between ethics and survival.

      ## What You Should Actually Take Away From This

      You don't have to be a tech expert to understand what's at stake here. The Anthropic-Pentagon fallout is really about three very old, very human questions in a new technological costume:

      **Who has the power?** Governments want unrestricted control over tools they pay for. Tech companies want to set the rules for tools they build. Neither is obviously wrong.

      **Who bears the risk?** When AI fails in a military context — and it will fail, because every technology eventually does — the people who suffer won't be the CEOs or the senators. It will be soldiers, civilians, and communities with no seat at the table.

      **Who decides what's too dangerous?** For most of human history, that answer has been: societies, through laws, international agreements, and democratic deliberation. Right now, it is effectively: whichever company gets the contract.

      Anthropic drew a line in the sand and lost the contract for it. Whether that was heroic, naive, or something in between depends on what you think is coming next — and how fast it's coming.

      The one thing that seems clear: this won't be the last time someone has to answer these questions. The next time, there might not be a company willing to say no.

      ## Timeline

      **July 2025** — Anthropic signs $200M DOD contract with usage restrictions built in.

      **January 2026** — Claude reportedly used in the US military's capture of Venezuelan President Maduro.

      **February 20, 2026** — Pentagon begins formally pushing to remove Anthropic's usage restrictions.

      **February 24, 2026** — Hegseth gives Anthropic a 48-hour ultimatum: drop the red lines or face consequences.

      **February 26, 2026** — Amodei publicly refuses. Anthropic will not grant unrestricted access.

      **February 27, 2026** — Trump orders all government agencies to stop using Anthropic. Pentagon designates Anthropic a "supply chain risk." OpenAI announces a new Pentagon deal within hours.

      **March 9, 2026** — Anthropic sues the US government. Microsoft, Google/OpenAI employees, and retired military officials file supporting briefs.

      **March 2026 (ongoing)** — Legal battle continues. Precedent for all AI-government contracts hangs in the balance.
    `
  },

  {
    id: 'student-concerns-ai',
    title: 'Concerns from a Student in the Era of AI',
    date: 'March 19, 2026',
    author: 'Michael Teng',
    category: 'Hear from the Members',
    summary: 'AI is one of the strongest tools ever developed — but it must remain a tool. A student\'s perspective on where the line must be drawn.',
    content: `
      AI is one of the strongest tools ever developed, and it must remain a tool, not an entity that holds power above human value. Although artificial intelligence can be used to enhance and enrich human lives, there must be boundaries set on how it is used. Just because something is possible does not mean it should be done. However, artificial intelligence should never be used in areas of fundamental human rights, such as privacy, freedom, and individuality.

      One of my biggest concerns with artificial intelligence is how it will be used to monitor and predict human behavior. For example, artificial intelligence will be able to monitor patterns and could try and predict a crime, before it even happens. Although this may seem like a great idea, there are many ethical issues with this. This could intrude on privacy, rights, and individualism. Human rights are the baseline of our world. We may not think about them all the time, but these rights hold together our reality and the way society functions. AI innovation should not affect this.

      However, the problem is not AI itself, it is about how we use it. Ultimately, if we use it in the right way, it can help us in many ways, such as in healthcare and safety. On the other hand, if we don't set limits and make rules for its use, it can easily lead to the end of societal order as we know it. We need to make progress without compromising what makes us human. We need to use AI to assist us, not control us.
    `
  },

  {
    id: 'vibe-coding-opinion',
    title: 'Vibe Coding Is Real — and That Should Scare You a Little',
    date: 'March 18, 2026',
    author: 'Shyam Christensen',
    category: 'Opinion',
    summary: 'AI vibe coding lets anyone build software by describing what they want in plain English. That\'s incredible. It\'s also a little dangerous — and not for the reasons most people think.',
    content: `
      Earlier this year, Andrej Karpathy — one of the founding members of OpenAI — posted something that caught everyone's attention. He described a new way of working with AI that he called "vibe coding": you describe what you want, the AI writes the code, and you just… go with it. You don't read every line. You don't fully understand what's happening under the hood. You iterate on vibes.

      His post was partly tongue-in-cheek. But it named something real. And it's worth thinking carefully about what it actually means.

      ## What Vibe Coding Actually Is

      Vibe coding isn't a specific tool — it's a posture. It's the difference between using AI as a calculator (you know what you're asking, you verify the answer) and using AI as a contractor (you describe the outcome, you trust it to figure out the details).

      In practice, it looks like this: you open a chat window, describe an app you want to build, and the AI produces hundreds of lines of code. You run it. Something works. Something else breaks. You describe the bug in plain English. The AI patches it. Repeat.

      The result can be genuinely impressive — functional software built in hours by someone with no formal programming background. That's not nothing. That's actually kind of remarkable.

      ## Why It's Exciting

      The barrier to building software just collapsed. Not lowered — collapsed.

      A student with a good idea and no CS background can now prototype it. A small nonprofit can build internal tools without a developer. A researcher can automate repetitive analysis without learning Python from scratch. These are real benefits that affect real people.

      And honestly, even experienced developers vibe code sometimes. The economics make sense: if AI can generate a solid first draft of boilerplate code in ten seconds, why spend thirty minutes writing it yourself?

      ## Why It Should Make You Think

      Here's where I want to push back — not on vibe coding itself, but on the **posture** it encourages.

      When you don't understand the code you're shipping, you lose the ability to evaluate it. You can't tell if it's secure. You can't tell if it's efficient. You can't tell if it's doing something subtly wrong in an edge case that will matter later. You're flying blind with a very confident co-pilot.

      This isn't hypothetical. AI-generated code has introduced real security vulnerabilities into real products because the developer trusted the output without understanding it. The code *looked* right. It *ran* fine. It was still wrong.

      There's also a deeper issue: **vibe coding optimizes for the demo, not the system.** It's great at producing something that works in the expected case. It's much worse at building something robust, maintainable, and well-architected. If you're building something that needs to last — or that other people depend on — that gap matters enormously.

      ## The Skill That Actually Matters

      I'm not saying don't use AI to code. I use it constantly. I used it to help build this website.

      But there's a difference between using AI as a tool you understand and using it as a magic box you don't question. The first makes you faster. The second makes you fragile.

      The skill that matters isn't knowing every syntax rule. It's knowing enough to evaluate what the AI gives you — to ask the right questions, catch the mistakes, and understand when something is wrong even if you can't immediately fix it yourself.

      That's AI literacy applied to software. And it's exactly the kind of thinking we try to build in this club — not just for coding, but for everything AI touches.

      ## The Bottom Line

      Vibe coding is real, it's here, and it's not going away. It's going to keep getting more powerful. More people are going to build more things with less understanding of what they're building.

      That creates opportunity. It also creates risk. The people who thrive in that environment won't be the ones who vibe the hardest — they'll be the ones who know when to stop vibing and actually look at what's going on.

      Be that person.
    `
  },

  {
    id: 'ai-dilemmas-march-19',
    title: 'Advanced Seminar Recap: AI Dilemmas',
    date: 'March 19, 2026',
    author: 'Shyam Christensen',
    category: 'Meeting Recap',
    summary: 'This week we dove deep into some of the hardest questions in AI today — from autonomous decision-making to alignment. Here\'s what we covered.',
    content: `
      This Thursday's meeting was one of the most energetic we've had. The topic: AI Dilemmas — the hard, uncomfortable questions that don't have clean answers.

      ## What We Discussed

      We opened with the classic trolley problem applied to autonomous vehicles. If a self-driving car has to choose between hitting one person or five, who decides the algorithm? And who's liable when it acts?

      From there, we moved into **AI alignment** — the challenge of making sure powerful AI systems actually do what humans want them to do. This is harder than it sounds. An AI optimizing for the wrong metric can cause serious harm even with no malicious intent.

      ## The Big Takeaway

      The most interesting moment came when we asked: should AI systems be allowed to refuse instructions? The room was split. Some argued that a truly aligned AI should always defer to humans. Others argued that an AI that can't say no is dangerous by design.

      No consensus — which is kind of the point. These are questions our generation will have to answer.

      ## What's Next

      We'll be continuing this thread next week with a look at real-world case studies — AI in hiring, AI in healthcare, and AI in the justice system. Come ready to take a side.
    `
  },

  {
    id: 'welcome-to-the-club',
    title: 'Welcome to the Mayo AI Literacy Club',
    date: 'March 1, 2026',
    author: 'Shyam Christensen',
    category: 'Announcement',
    summary: 'We\'re officially up and running. Here\'s what the club is about, who we are, and what you can expect from our Thursday meetings.',
    content: `
      The Mayo AI Literacy Club is officially live.

      ## Why We Started This

      Nathan Dozois and I started this club because we noticed a gap. AI is everywhere — in our phones, in our feeds, in hiring decisions, in healthcare — but almost no one our age has a clear picture of how it actually works, where it fails, or what it means for the future.

      We wanted to change that. Not by turning everyone into an engineer, but by giving every student at Mayo the tools to think critically about AI — to understand it, question it, and use it well.

      ## What We Do

      Every Thursday at 8:20 AM in the MHS Library Classroom, we meet to explore a new topic. Some weeks it's technical — how does a neural network actually learn? Some weeks it's ethical — should AI be used in college admissions? Some weeks it's practical — how do you write a prompt that gets you what you actually want?

      No experience required. Just curiosity.

      ## Come Find Out

      If any of this sounds interesting, just show up on a Thursday. No sign-up, no commitment — just come see if it's your thing.

      We think it will be.
    `
  }

];
