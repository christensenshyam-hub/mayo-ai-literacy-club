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
