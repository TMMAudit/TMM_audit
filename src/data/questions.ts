export interface Question {
  id: number;
  section: 1 | 2;
  domain: string;
  domainKey: string;
  text: string;
  answers: { text: string; score: number }[];
}

export interface DomainInfo {
  key: string;
  name: string;
  section: 1 | 2;
  intro: string;
  maxScore: number;
  questionIds: number[];
}

// ─── SECTION 1 DOMAINS ───
export const s1Domains: DomainInfo[] = [
  {
    key: "data_capture", name: "Data Capture", section: 1, maxScore: 12, questionIds: [1,2,3,4],
    intro: "How your business collects, stores, and uses information to make decisions and track progress.",
  },
  {
    key: "decision_systems", name: "Decision Systems", section: 1, maxScore: 12, questionIds: [5,6,7,8],
    intro: "How your business makes consistent choices without requiring the founder's attention every time.",
  },
  {
    key: "execution_visibility", name: "Execution Visibility", section: 1, maxScore: 12, questionIds: [9,10,11,12],
    intro: "How clearly you can see whether work is being done, by whom, at what quality, and on time.",
  },
  {
    key: "ai_integration", name: "AI Integration", section: 1, maxScore: 12, questionIds: [13,14,15,16],
    intro: "How intentionally your business uses AI tools to multiply output, not just experiment with them.",
  },
  {
    key: "operational_accountability", name: "Operational Accountability", section: 1, maxScore: 12, questionIds: [17,18,19,20],
    intro: "Whether your business has the structure, roles, and rhythms to hold itself accountable without the founder carrying everything.",
  },
  {
    key: "founder_identity", name: "Founder Identity", section: 1, maxScore: 15, questionIds: [21,22,23,24,25],
    intro: "Whether the founder has a clear, owned, and operative sense of who they are and what they stand for, independent of what their business sells.",
  },
  {
    key: "self_awareness", name: "Self-Awareness", section: 1, maxScore: 9, questionIds: [26,27,28],
    intro: "The founder's ability to see their own patterns, limits, and blind spots, and to use that knowledge operationally rather than defensively.",
  },
  {
    key: "language_communication", name: "Language & Communication", section: 1, maxScore: 9, questionIds: [29,30,31],
    intro: "How precisely and intentionally the founder uses language to lead, sell, position, and build trust, with clients, team, and market.",
  },
  {
    key: "literacy_ai_learning", name: "Literacy & AI Learning", section: 1, maxScore: 15, questionIds: [32,33,34,35,36],
    intro: "How proactively the founder acquires, applies, and integrates new knowledge, including AI, as an operational practice, not a personal interest or occasional experiment.",
  },
];

// ─── SECTION 2 DOMAINS ───
export const s2Domains: DomainInfo[] = [
  {
    key: "tool_inventory", name: "Tool Inventory", section: 2, maxScore: 15, questionIds: [37,38,39,40,41],
    intro: "Before you can protect your business, you need to know exactly which AI tools your team is using, and what information is going into them.",
  },
  {
    key: "data_safety", name: "Data Safety", section: 2, maxScore: 18, questionIds: [42,43,44,45,46,47],
    intro: "AI tools learn from what you type into them. Understanding what information is being shared, and with whom, is one of the most important steps you can take.",
  },
  {
    key: "written_policy", name: "Written Policy", section: 2, maxScore: 18, questionIds: [48,49,50,51,52,53],
    intro: "Verbal agreements and good intentions are not enough. A written AI policy gives your team clear guidance, protects your business, and sets a standard everyone can follow.",
  },
  {
    key: "vendor_risk", name: "Vendor Risk", section: 2, maxScore: 15, questionIds: [54,55,56,57,58],
    intro: "Many of the software tools your business already pays for have recently added AI features. That means your data may now be flowing through AI systems you never knowingly agreed to.",
  },
  {
    key: "human_review", name: "Human Review", section: 2, maxScore: 15, questionIds: [59,60,61,62,63],
    intro: "AI tools can produce output that sounds confident but is wrong, biased, or inappropriate. A human review step is not optional, it is a basic standard of responsible use.",
  },
  {
    key: "right_versions", name: "Right Versions", section: 2, maxScore: 9, questionIds: [64,65,66],
    intro: "Free and personal versions of AI tools are built for individual, non-business use. Using them for work that involves sensitive client or company information creates real risk.",
  },
  {
    key: "incident_response", name: "Incident Response", section: 2, maxScore: 9, questionIds: [67,68,69],
    intro: "No system is perfect. The question is whether your business has a plan for when AI causes a problem, and whether you are improving your approach over time.",
  },
];

export const allDomains = [...s1Domains, ...s2Domains];

// Short answers for Section 2
const s2Short = (id: number, text: string): Question => ({
  id, section: 2, domain: "", domainKey: "", text,
  answers: [
    { text: "Not yet", score: 0 },
    { text: "Informal", score: 1 },
    { text: "Written down", score: 2 },
    { text: "Consistent", score: 3 },
  ],
});

export const questions: Question[] = [
  // ─── DOMAIN 1: DATA CAPTURE (Q1–Q4) ───
  {
    id: 1, section: 1, domain: "Data Capture", domainKey: "data_capture",
    text: "How do you currently track leads and sales activity?",
    answers: [
      { text: "No tracking, everything is in my head or scattered across texts and emails.", score: 0 },
      { text: "Informal notes or a basic spreadsheet, but it's not consistently updated.", score: 1 },
      { text: "A CRM or structured sheet that I update regularly, but not automated.", score: 2 },
      { text: "A fully integrated CRM that automatically captures, tracks, and reports activity.", score: 3 },
    ],
  },
  {
    id: 2, section: 1, domain: "Data Capture", domainKey: "data_capture",
    text: "How do you capture and store client information after a sale?",
    answers: [
      { text: "I rely on memory or dig through email threads when I need something.", score: 0 },
      { text: "I save it somewhere, but there's no consistent format or location.", score: 1 },
      { text: "I have a basic intake process, but it's manual and not always complete.", score: 2 },
      { text: "Every client has a structured profile captured automatically at onboarding.", score: 3 },
    ],
  },
  {
    id: 3, section: 1, domain: "Data Capture", domainKey: "data_capture",
    text: "How do you know which marketing or outreach efforts are actually working?",
    answers: [
      { text: "I don't track it, I go with gut instinct on what's working.", score: 0 },
      { text: "I occasionally look at basic numbers but don't connect them to revenue.", score: 1 },
      { text: "I track some metrics but don't have a consistent reporting process.", score: 2 },
      { text: "I have a clear attribution model and review performance data weekly.", score: 3 },
    ],
  },
  {
    id: 4, section: 1, domain: "Data Capture", domainKey: "data_capture",
    text: "How accessible is your business data when you need to make a decision?",
    answers: [
      { text: "I have to hunt for information across multiple places every time.", score: 0 },
      { text: "Most data exists but is scattered and takes effort to pull together.", score: 1 },
      { text: "Data is organized and findable, but not in a centralized dashboard.", score: 2 },
      { text: "Key data is in one place, up to date, and I can access it in under 2 minutes.", score: 3 },
    ],
  },

  // ─── DOMAIN 2: DECISION SYSTEMS (Q5–Q8) ───
  {
    id: 5, section: 1, domain: "Decision Systems", domainKey: "decision_systems",
    text: "How are routine business decisions made when you're unavailable?",
    answers: [
      { text: "Everything waits for me. Nothing moves without my input.", score: 0 },
      { text: "My team makes guesses, but there's no consistency in outcomes.", score: 1 },
      { text: "We have some informal norms, but they're not documented or enforced.", score: 2 },
      { text: "We have documented decision frameworks that the team follows independently.", score: 3 },
    ],
  },
  {
    id: 6, section: 1, domain: "Decision Systems", domainKey: "decision_systems",
    text: "How do you decide which tasks and projects to prioritize each week?",
    answers: [
      { text: "I react to whatever feels most urgent in the moment.", score: 0 },
      { text: "I have a rough idea of priorities but rarely stick to a structured process.", score: 1 },
      { text: "I have a weekly planning process, but it's not tied to measurable outcomes.", score: 2 },
      { text: "Priorities are set against clear goals with a defined scoring or ranking system.", score: 3 },
    ],
  },
  {
    id: 7, section: 1, domain: "Decision Systems", domainKey: "decision_systems",
    text: "How are pricing decisions made for new or custom work?",
    answers: [
      { text: "I make it up on the spot based on what I think feels right.", score: 0 },
      { text: "I have a ballpark range but negotiate inconsistently depending on the client.", score: 1 },
      { text: "I have a rate structure, but exceptions are common and undocumented.", score: 2 },
      { text: "Pricing follows a clear framework with defined tiers, exceptions policy, and approval process.", score: 3 },
    ],
  },
  {
    id: 8, section: 1, domain: "Decision Systems", domainKey: "decision_systems",
    text: "How do you evaluate whether a new opportunity is worth pursuing?",
    answers: [
      { text: "I say yes to most things and figure it out as I go.", score: 0 },
      { text: "I have an instinct for it, but I don't have defined criteria.", score: 1 },
      { text: "I consider a few factors informally, but the process isn't consistent.", score: 2 },
      { text: "Every opportunity is evaluated against a defined set of criteria before committing resources.", score: 3 },
    ],
  },

  // ─── DOMAIN 3: EXECUTION VISIBILITY (Q9–Q12) ───
  {
    id: 9, section: 1, domain: "Execution Visibility", domainKey: "execution_visibility",
    text: "How do you track team or contractor performance week to week?",
    answers: [
      { text: "No consistent tracking, I find out about problems when something breaks.", score: 0 },
      { text: "Informal check-ins or conversations, but nothing documented.", score: 1 },
      { text: "Basic metrics exist, but they're not reviewed on a structured cadence.", score: 2 },
      { text: "Structured reporting with defined KPIs reviewed in a regular performance rhythm.", score: 3 },
    ],
  },
  {
    id: 10, section: 1, domain: "Execution Visibility", domainKey: "execution_visibility",
    text: "How do you know if a project or deliverable is on track?",
    answers: [
      { text: "I don't, until it's late or the client complains.", score: 0 },
      { text: "I check in occasionally, but I'm often surprised by where things stand.", score: 1 },
      { text: "I have a project tool or checklist, but updates aren't always current.", score: 2 },
      { text: "Every active project has a visible status, owner, deadline, and escalation path.", score: 3 },
    ],
  },
  {
    id: 11, section: 1, domain: "Execution Visibility", domainKey: "execution_visibility",
    text: "How do clients know what stage their work is in?",
    answers: [
      { text: "They have to ask me. I update them reactively.", score: 0 },
      { text: "I send occasional updates, but there's no consistent format or schedule.", score: 1 },
      { text: "I have a basic communication cadence, but it's not tied to a project system.", score: 2 },
      { text: "Clients have a structured update rhythm or portal access to see progress in real time.", score: 3 },
    ],
  },
  {
    id: 12, section: 1, domain: "Execution Visibility", domainKey: "execution_visibility",
    text: "If a team member left tomorrow, how quickly could someone else take over their work?",
    answers: [
      { text: "It would be a crisis. Nothing is documented.", score: 0 },
      { text: "It would be hard. Some things are written down but not enough to hand off smoothly.", score: 1 },
      { text: "Most work could be transferred with effort. Key SOPs exist but aren't complete.", score: 2 },
      { text: "Full handoff is possible within 48 hours. All roles are documented with SOPs.", score: 3 },
    ],
  },

  // ─── DOMAIN 4: AI INTEGRATION (Q13–Q16) ───
  {
    id: 13, section: 1, domain: "AI Integration", domainKey: "ai_integration",
    text: "How are AI tools currently used in your business?",
    answers: [
      { text: "Not at all, or only occasionally for personal tasks.", score: 0 },
      { text: "I've played with a few tools but haven't made them part of regular operations.", score: 1 },
      { text: "AI is used in some workflows but inconsistently, depends on the day or person.", score: 2 },
      { text: "AI tools are embedded in defined workflows and used consistently by the whole team.", score: 3 },
    ],
  },
  {
    id: 14, section: 1, domain: "AI Integration", domainKey: "ai_integration",
    text: "How do you decide what to use AI for vs. what to handle manually?",
    answers: [
      { text: "I haven't thought about it systematically, I try things randomly.", score: 0 },
      { text: "I have a vague sense of where AI helps but no clear framework.", score: 1 },
      { text: "I've identified some use cases but haven't fully mapped the boundaries.", score: 2 },
      { text: "I have a clear framework for what gets automated, what gets AI-assisted, and what stays human.", score: 3 },
    ],
  },
  {
    id: 15, section: 1, domain: "AI Integration", domainKey: "ai_integration",
    text: "How do you protect your brand voice and quality when AI is involved in content or communication?",
    answers: [
      { text: "I don't, whatever AI generates gets published as-is.", score: 0 },
      { text: "I review AI output, but I don't have defined quality standards.", score: 1 },
      { text: "I have rough guidelines, but they're not documented or enforced consistently.", score: 2 },
      { text: "AI output is reviewed against a documented brand voice and quality checklist before publishing.", score: 3 },
    ],
  },
  {
    id: 16, section: 1, domain: "AI Integration", domainKey: "ai_integration",
    text: "How confident are you that your current AI usage is actually saving time and increasing output?",
    answers: [
      { text: "I have no idea, I can't measure it.", score: 0 },
      { text: "I think it's helping, but I haven't tracked the actual impact.", score: 1 },
      { text: "I can see some time savings but haven't quantified the ROI.", score: 2 },
      { text: "I track AI-driven time savings and output improvements and can show the data.", score: 3 },
    ],
  },

  // ─── DOMAIN 5: OPERATIONAL ACCOUNTABILITY (Q17–Q20) ───
  {
    id: 17, section: 1, domain: "Operational Accountability", domainKey: "operational_accountability",
    text: "How are goals set in your business?",
    answers: [
      { text: "We don't have formal goals. We just work and see what happens.", score: 0 },
      { text: "I have goals in my head, but they're not written down or shared with the team.", score: 1 },
      { text: "We have goals documented, but they're not tied to a consistent review process.", score: 2 },
      { text: "Goals are written, shared, broken into milestones, and reviewed on a defined cadence.", score: 3 },
    ],
  },
  {
    id: 18, section: 1, domain: "Operational Accountability", domainKey: "operational_accountability",
    text: "How are team members held accountable for their commitments?",
    answers: [
      { text: "Accountability is informal. Things slip and we deal with it when it matters.", score: 0 },
      { text: "I follow up personally, but there's no structured system for it.", score: 1 },
      { text: "We have some accountability mechanisms, but they're inconsistently applied.", score: 2 },
      { text: "Clear ownership, deadlines, and consequences are documented and enforced consistently.", score: 3 },
    ],
  },
  {
    id: 19, section: 1, domain: "Operational Accountability", domainKey: "operational_accountability",
    text: "How does your business handle recurring operational failures, missed deadlines, repeated errors?",
    answers: [
      { text: "We address problems in the moment and move on. The same issues tend to come back.", score: 0 },
      { text: "We talk about what went wrong, but rarely make lasting changes to the system.", score: 1 },
      { text: "We do some post-mortems, but the fixes don't always get implemented.", score: 2 },
      { text: "Every recurring failure triggers a root cause analysis and a documented system change.", score: 3 },
    ],
  },
  {
    id: 20, section: 1, domain: "Operational Accountability", domainKey: "operational_accountability",
    text: "How much of your business could run without your direct involvement for one week?",
    answers: [
      { text: "Almost nothing. If I'm out, the business effectively pauses.", score: 0 },
      { text: "A few things would keep going, but most would stall or decline in quality.", score: 1 },
      { text: "The core keeps running, but growth activities and edge cases still need me.", score: 2 },
      { text: "80%+ of operations run independently. My role is leadership, not management.", score: 3 },
    ],
  },

  // ─── DOMAIN 6A: FOUNDER IDENTITY (Q21–Q25) ───
  {
    id: 21, section: 1, domain: "Founder Identity", domainKey: "founder_identity",
    text: "If someone took your business away tomorrow, could you still tell them exactly who you are and what you stand for?",
    answers: [
      { text: "Honestly, no. My business is how I explain myself. Without it, I'm not sure what I'd say.", score: 0 },
      { text: "I have a sense of it, but I end up describing what I do before I describe what I believe.", score: 1 },
      { text: "I can articulate my values, but if I'm being honest, they don't always show up in how I lead or make decisions.", score: 2 },
      { text: "Yes. I have a clear conviction set that exists independent of my business, and it visibly drives how I build.", score: 3 },
    ],
  },
  {
    id: 22, section: 1, domain: "Founder Identity", domainKey: "founder_identity",
    text: "When the money or the opportunity pulled you in a direction you knew wasn't right, what did you do?",
    answers: [
      { text: "I followed it. I figured I'd deal with the misalignment later.", score: 0 },
      { text: "I felt it, but I talked myself out of it. I needed the win more than I needed the integrity.", score: 1 },
      { text: "I've made a few values-based calls, but I don't have a clear framework. It's still mostly case by case.", score: 2 },
      { text: "I have non-negotiables I've actually enforced. I've left money on the table because the fit was wrong.", score: 3 },
    ],
  },
  {
    id: 23, section: 1, domain: "Founder Identity", domainKey: "founder_identity",
    text: "Is your business something you're building toward a life you've defined, or are you building and hoping a life shows up?",
    answers: [
      { text: "Mostly hoping. I respond to what comes and figure out the direction later.", score: 0 },
      { text: "I have a life I'm working toward, but I haven't made a direct connection between that and the business I'm building.", score: 1 },
      { text: "I can see the connection when I stop to think about it, but I haven't made it formal or reviewed it consistently.", score: 2 },
      { text: "My business is a deliberate tool inside a documented life vision. I build against it intentionally.", score: 3 },
    ],
  },
  {
    id: 24, section: 1, domain: "Founder Identity", domainKey: "founder_identity",
    text: "How wide is the gap between who you present yourself to be and who you actually are right now?",
    answers: [
      { text: "I don't think there is one. What you see is what you get.", score: 0 },
      { text: "I sense it but I haven't looked at it directly. It's uncomfortable territory.", score: 1 },
      { text: "I've named specific places where my presentation is ahead of my reality, but I haven't closed the gap yet.", score: 2 },
      { text: "I track that gap on purpose. It's one of my primary growth instruments, not something I avoid.", score: 3 },
    ],
  },
  {
    id: 25, section: 1, domain: "Founder Identity", domainKey: "founder_identity",
    text: "Be honest: did you build this business from the inside out, or did you shape yourself around what you thought the market wanted?",
    answers: [
      { text: "I've shaped myself significantly around what clients or the market seemed to want. My original voice got buried somewhere in that process.", score: 0 },
      { text: "There's some alignment, but I've drifted more than I planned. I can feel where I've been performing instead of being.", score: 1 },
      { text: "It mostly reflects who I am, but there are still places where I'm playing a role rather than operating from my actual design.", score: 2 },
      { text: "This business is a clean expression of how I actually think, work, and see the world. I attract people who specifically want that.", score: 3 },
    ],
  },

  // ─── DOMAIN 6B: SELF-AWARENESS (Q26–Q28) ───
  {
    id: 26, section: 1, domain: "Self-Awareness", domainKey: "self_awareness",
    text: "When someone gives you real critical feedback, what actually happens inside you?",
    answers: [
      { text: "I get defensive. Even when I don't say it out loud, I'm already building my case against it.", score: 0 },
      { text: "I listen. But I also spend a lot of energy finding the reason it doesn't fully apply to me.", score: 1 },
      { text: "I can receive it without reacting, but I'll be honest, I don't always do anything with it.", score: 2 },
      { text: "I actively go looking for critical feedback. I know how to separate what's useful from what's not, and I integrate it without ego getting in the way.", score: 3 },
    ],
  },
  {
    id: 27, section: 1, domain: "Self-Awareness", domainKey: "self_awareness",
    text: "What patterns keep showing up in your results that you already know are coming from you?",
    answers: [
      { text: "I don't really analyze that. I focus on what's in front of me and keep moving.", score: 0 },
      { text: "I've noticed the patterns but I haven't dug into what's actually driving them underneath.", score: 1 },
      { text: "I've named them. I understand some of where they come from. But I'll be real, I haven't fully resolved them yet.", score: 2 },
      { text: "I've named the patterns, traced them to their roots, and built active strategies to interrupt them before they cost me again.", score: 3 },
    ],
  },
  {
    id: 28, section: 1, domain: "Self-Awareness", domainKey: "self_awareness",
    text: "When you're stressed, unclear, or overwhelmed, how much does that bleed into your decisions and your work?",
    answers: [
      { text: "A lot. My inner state runs my output and I usually don't catch it until the damage is already done.", score: 0 },
      { text: "I know it affects me, but I don't have anything consistent in place to manage it.", score: 1 },
      { text: "I have practices, but they tend to break down under pressure, which is exactly when I need them most.", score: 2 },
      { text: "I have specific practices I use before high-stakes moments, not just when I'm already in a hole. My state management is built in, not reactive.", score: 3 },
    ],
  },

  // ─── DOMAIN 6C: LANGUAGE & COMMUNICATION (Q29–Q31) ───
  {
    id: 29, section: 1, domain: "Language & Communication", domainKey: "language_communication",
    text: "Right now, in one sentence, say what you do and who you do it for. How does that land?",
    answers: [
      { text: "It takes me a few tries. I usually need a sentence or two before people actually get it.", score: 0 },
      { text: "I have a version, but I adjust it constantly depending on who I'm talking to. It's not locked in.", score: 1 },
      { text: "I have something consistent, but I'm not fully confident it hits the way it should with someone who doesn't know me.", score: 2 },
      { text: "I have one sentence. I've tested it. It consistently creates clarity or sparks interest without me having to explain it further.", score: 3 },
    ],
  },
  {
    id: 30, section: 1, domain: "Language & Communication", domainKey: "language_communication",
    text: "How intentional have you been about the exact words you use to describe what you do and what it's worth?",
    answers: [
      { text: "I use whatever feels natural in the moment. I've never sat down and deliberately built my language.", score: 0 },
      { text: "I have phrases I like, but I haven't stress-tested them against how clients actually respond or remember them.", score: 1 },
      { text: "I've refined it based on feedback, but it's not fully documented or consistent across everything I put out.", score: 2 },
      { text: "My language is documented, tested, and intentional. It shows up the same way whether I'm speaking, writing, or on a sales call.", score: 3 },
    ],
  },
  {
    id: 31, section: 1, domain: "Language & Communication", domainKey: "language_communication",
    text: "Does the language across your business, your website, your proposals, how you talk in a pitch, actually match what you deliver?",
    answers: [
      { text: "Honestly, no. My language undersells what I do or doesn't quite capture it. There's a real gap.", score: 0 },
      { text: "It's mostly close, but some of it is outdated or generic. It doesn't all reflect where I am now.", score: 1 },
      { text: "It's accurate, but it doesn't stand out. Someone could read it and think of three other people who say the same thing.", score: 2 },
      { text: "My language names the transformation, not just the service. It's differentiated, and it converts because it speaks to what people actually want to feel on the other side.", score: 3 },
    ],
  },

  // ─── DOMAIN 6D: LITERACY & AI LEARNING (Q32–Q36) ───
  {
    id: 32, section: 1, domain: "Literacy & AI Learning", domainKey: "literacy_ai_learning",
    text: "When you learn something that could change how you operate, what actually happens next?",
    answers: [
      { text: "Mostly nothing. I consume a lot of content and apply very little. It stays in my head or a notes app.", score: 0 },
      { text: "I apply things sometimes, when something really hits. But there's no system. It's totally random.", score: 1 },
      { text: "I have a general practice of turning learning into action, but I couldn't show you a clear trail of how it changed outcomes.", score: 2 },
      { text: "Every significant insight gets processed through a defined protocol. I test it, document it, and refine it. Learning is an operational loop, not a personal habit.", score: 3 },
    ],
  },
  {
    id: 33, section: 1, domain: "Literacy & AI Learning", domainKey: "literacy_ai_learning",
    text: "Are you using AI tools as a real part of how you think and build, or are you just playing with them when it's convenient?",
    answers: [
      { text: "Mostly just playing with them. I don't use AI with any real intention or consistency.", score: 0 },
      { text: "I use it when it's convenient, but it's not woven into how I actually work. It's still optional for me.", score: 1 },
      { text: "I use it consistently for specific things, but I haven't fully mapped where it could really compound what I'm doing.", score: 2 },
      { text: "AI is embedded in how I research, write, think through decisions, and build. I treat it as a thinking partner, not a shortcut tool.", score: 3 },
    ],
  },
  {
    id: 34, section: 1, domain: "Literacy & AI Learning", domainKey: "literacy_ai_learning",
    text: "How do you actually stay current on what's changing in your industry, your clients' world, and the AI landscape?",
    answers: [
      { text: "Whatever reaches me. Social media, conversations, the occasional article that shows up in my feed.", score: 0 },
      { text: "I have sources I follow, but it's passive. I read when I feel like it. There's no structure behind it.", score: 1 },
      { text: "I have a loose rhythm, but I'm not connecting what I'm learning to actual strategic decisions in the business.", score: 2 },
      { text: "I have a structured intelligence system, curated sources, a scheduled review cadence, and a process for turning what I see into decisions I act on.", score: 3 },
    ],
  },
  {
    id: 35, section: 1, domain: "Literacy & AI Learning", domainKey: "literacy_ai_learning",
    text: "Are you using AI to actually think deeper, or just to get tasks done faster?",
    answers: [
      { text: "Mainly tasks. Drafting, summarizing, looking things up. I haven't thought of it as a thinking tool.", score: 0 },
      { text: "I've tried using it for bigger thinking, but I don't do it consistently enough for it to matter.", score: 1 },
      { text: "I regularly use it to pressure-test ideas and explore angles I might have missed before committing to a direction.", score: 2 },
      { text: "AI is a documented part of how I think strategically. I have prompting practices I've built and refined for ideation, stress-testing decisions, and working through hard problems.", score: 3 },
    ],
  },
  {
    id: 36, section: 1, domain: "Literacy & AI Learning", domainKey: "literacy_ai_learning",
    text: "If you're being completely honest, what is your relationship to learning and growth right now?",
    answers: [
      { text: "It's reactive. I learn when something breaks or when I finally have time. It's not a practice, it's a response.", score: 0 },
      { text: "I value it. I do it. But it's personal. It doesn't have a direct line to how the business actually operates.", score: 1 },
      { text: "I have an intentional practice. I just haven't fully connected the loop from what I learn to what changes in the business.", score: 2 },
      { text: "Learning is infrastructure for me. I have a rhythm, a system for applying it, and I can point to outcomes it's produced. It's not a hobby, it's how I build.", score: 3 },
    ],
  },

  // ─── SECTION 2: AI SECURITY & GOVERNANCE ───

  // DOMAIN A: TOOL INVENTORY (Q37–Q41)
  { ...s2Short(37, "Have you made a complete list of every AI tool your team is using, including apps or tools that people started using on their own, without asking?"), domain: "Tool Inventory", domainKey: "tool_inventory" },
  { ...s2Short(38, "For each AI tool your team uses, do you know what kind of information is being typed into it, such as client names, financial data, or employee details?"), domain: "Tool Inventory", domainKey: "tool_inventory" },
  { ...s2Short(39, "Is that list of AI tools reviewed and updated on a regular schedule, at least every three months, with one specific person responsible for keeping it current?"), domain: "Tool Inventory", domainKey: "tool_inventory" },
  { ...s2Short(40, "Before anyone on your team starts using a new AI tool for work, are they required to get approval first?"), domain: "Tool Inventory", domainKey: "tool_inventory" },
  { ...s2Short(41, "Have you sorted your AI tools into clear groups, tools that are fully approved, tools that are okay under certain conditions, and tools that should not be used at all?"), domain: "Tool Inventory", domainKey: "tool_inventory" },

  // DOMAIN B: DATA SAFETY (Q42–Q47)
  { ...s2Short(42, "Have you checked the settings on the AI tools your team uses to find out whether the things you type into them are being used to improve or train the AI?"), domain: "Data Safety", domainKey: "data_safety" },
  { ...s2Short(43, "If an AI tool gives you the option to stop your information from being used to train it, have you turned that option off, and written down that you did it?"), domain: "Data Safety", domainKey: "data_safety" },
  { ...s2Short(44, "Have you identified the most sensitive type of information your business handles, such as client files, financial records, or employee data, and decided who is responsible for protecting it?"), domain: "Data Safety", domainKey: "data_safety" },
  { ...s2Short(45, "Do you have a clear, written rule that spells out what kinds of information are safe to put into an AI tool, and what kinds should never be entered?"), domain: "Data Safety", domainKey: "data_safety" },
  { ...s2Short(46, "Are there steps in place, either as written rules or software settings, that prevent sensitive information from going into an AI tool without someone specifically approving it first?"), domain: "Data Safety", domainKey: "data_safety" },
  { ...s2Short(47, "Has your business done a focused review of the specific risks involved in putting your most sensitive information into an AI tool, not just a general check, but one specific to AI?"), domain: "Data Safety", domainKey: "data_safety" },

  // DOMAIN C: WRITTEN POLICY (Q48–Q53)
  { ...s2Short(48, "Does your business have a written policy that tells your team how AI tools should, and should not, be used?"), domain: "Written Policy", domainKey: "written_policy" },
  { ...s2Short(49, "Does that written policy specifically cover four things: which tools are approved, what AI should never be used for, how to handle sensitive information, and who to contact if something goes wrong?"), domain: "Written Policy", domainKey: "written_policy" },
  { ...s2Short(50, "Has every member of your team read the AI policy and confirmed they will follow it, and do you have a record showing that they did?"), domain: "Written Policy", domainKey: "written_policy" },
  { ...s2Short(51, "Is your AI policy reviewed and updated at least once a year, or sooner if your tools, your industry rules, or your business situation change significantly?"), domain: "Written Policy", domainKey: "written_policy" },
  { ...s2Short(52, "Is there one specific person in your business who is clearly responsible for making sure AI is being used appropriately, not just assumed to be everyone's job?"), domain: "Written Policy", domainKey: "written_policy" },
  { ...s2Short(53, "Does leadership in your business actively model and enforce responsible AI use, not just on paper, but in everyday decisions and actions your team can see?"), domain: "Written Policy", domainKey: "written_policy" },

  // DOMAIN D: VENDOR RISK (Q54–Q58)
  { ...s2Short(54, "Have you gone back and read through your agreements with key software vendors, like your CRM, email provider, and accounting software, to understand how they handle your data if they use AI?"), domain: "Vendor Risk", domainKey: "vendor_risk" },
  { ...s2Short(55, "Do you know whether any of the software tools your business already pays for have quietly turned on AI features that may now be processing your business information?"), domain: "Vendor Risk", domainKey: "vendor_risk" },
  { ...s2Short(56, "When you bring on a new vendor or renew an existing contract, is there a required step to check how they handle your data, especially if they use AI?"), domain: "Vendor Risk", domainKey: "vendor_risk" },
  { ...s2Short(57, "Do your vendor agreements include specific language about how AI is used with your data, including whether your information could be used to train or improve their AI systems?"), domain: "Vendor Risk", domainKey: "vendor_risk" },
  { ...s2Short(58, "If a vendor starts using AI in a way that conflicts with your business rules, do you have a plan for how to respond, including when to raise the issue and what your options are?"), domain: "Vendor Risk", domainKey: "vendor_risk" },

  // DOMAIN E: HUMAN REVIEW (Q59–Q63)
  { ...s2Short(59, "Is there a written step in your business process that requires a real person to review anything AI helped create before it is sent to a client or used in an important decision, not just assumed that someone will?"), domain: "Human Review", domainKey: "human_review" },
  { ...s2Short(60, "Do you have clear guidelines for when AI output needs a human review, and when it can be used as-is, based on how sensitive or high-stakes the situation is?"), domain: "Human Review", domainKey: "human_review" },
  { ...s2Short(61, "Is there a way for your team to flag, record, and raise a concern about AI output that seems wrong, off-tone, or not appropriate, before it reaches a client or affects a key decision?"), domain: "Human Review", domainKey: "human_review" },
  { ...s2Short(62, "Is the human review of AI output written down somewhere, so that if you ever need to look back, you can see who reviewed what and when?"), domain: "Human Review", domainKey: "human_review" },
  { ...s2Short(63, "Has your team been trained not just that they need to review AI output, but specifically what to look for, such as factual errors, missing context, or inappropriate language?"), domain: "Human Review", domainKey: "human_review" },

  // DOMAIN F: RIGHT VERSIONS (Q64–Q66)
  { ...s2Short(64, "Have you checked whether anyone on your team is using a free or personal version of an AI tool for work that involves sensitive, confidential, or client-related information?"), domain: "Right Versions", domainKey: "right_versions" },
  { ...s2Short(65, "Does your business have a clear standard for when a paid or business-grade version of an AI tool is required, rather than leaving that decision up to each individual person?"), domain: "Right Versions", domainKey: "right_versions" },
  { ...s2Short(66, "When your business is considering a new AI tool, is there a required review process that includes how the tool handles data, not just whether the tool is useful or affordable?"), domain: "Right Versions", domainKey: "right_versions" },

  // DOMAIN G: INCIDENT RESPONSE (Q67–Q69)
  { ...s2Short(67, "Does your business have a written plan for how to respond if an AI tool exposes sensitive information, is misused by a team member, or causes a problem, including who is responsible and what steps to follow?"), domain: "Incident Response", domainKey: "incident_response" },
  { ...s2Short(68, "Is there any way for you to know if someone on your team is using an AI tool that has not been approved, or if sensitive information has accidentally been entered into an AI tool?"), domain: "Incident Response", domainKey: "incident_response" },
  { ...s2Short(69, "Do you regularly step back and look at how well your AI guidelines are working, reviewing what is going well, where the gaps still are, and what needs to change?"), domain: "Incident Response", domainKey: "incident_response" },
];

// ─── SCORING ───

export const S1_MAX = 108;
export const S2_MAX = 99;
export const COMPOSITE_MAX = 207;

export function calcSectionRaw(responses: Record<number, number>, section: 1 | 2): number {
  return questions
    .filter(q => q.section === section)
    .reduce((sum, q) => sum + (responses[q.id] ?? 0), 0);
}

export function calcDomainScores(responses: Record<number, number>, domains: DomainInfo[]): { domain: DomainInfo; raw: number; pct: number }[] {
  return domains.map(d => {
    const raw = d.questionIds.reduce((sum, id) => sum + (responses[id] ?? 0), 0);
    return { domain: d, raw, pct: Math.round((raw / d.maxScore) * 100) };
  });
}

export function getS1Tier(pct: number): string {
  if (pct < 40) return "Latent Founder";
  if (pct < 65) return "Identity Emerging";
  if (pct < 85) return "Identity in Progress";
  if (pct < 95) return "Operationally Aware";
  return "Founder as Infrastructure";
}

export function getS2Tier(pct: number): string {
  if (pct < 40) return "Start Here";
  if (pct < 65) return "Early Stage";
  if (pct < 85) return "In Progress";
  return "Well Governed";
}

export function getCompositeTier(pct: number): string {
  if (pct < 40) return "Not Ready";
  if (pct < 65) return "Foundation Building";
  if (pct < 85) return "Operationally Capable";
  return "AI-Ready Operator";
}

export function getLowestDomain(domainScores: { domain: DomainInfo; pct: number }[]): DomainInfo {
  let lowest = domainScores[0];
  for (const ds of domainScores) {
    if (ds.pct < lowest.pct) lowest = ds;
  }
  return lowest.domain;
}

export function getPriorityGaps(domainScores: { domain: DomainInfo; pct: number }[]): DomainInfo[] {
  return domainScores.filter(ds => ds.pct < 50).map(ds => ds.domain);
}

// ─── TIER COPY ───

export const s1TierCopy: Record<string, string> = {
  "Latent Founder": "The business is running on instinct. There's real potential here, but right now it's buried under reactive decision-making, unclear identity, and tools that aren't producing leverage. The work starts before the systems. It starts with you.",
  "Identity Emerging": "Something real is here but it isn't fully operative yet. You have clarity in pockets, it just doesn't show up consistently. The fastest wins are in language. When you can say what you do and why it matters in a single sentence that lands, everything downstream gets easier.",
  "Identity in Progress": "You're building and it's working in places. The gap isn't capability, it's consistency and integration. You show up well in some rooms and fall apart in others. Structured development at this stage compounds fast. You're close to a step-change.",
  "Operationally Aware": "Strong self-awareness. Language is sharp. AI is intentional. The audit's job here isn't excavation, it's refinement and acceleration. You know what's wrong. You need the right system and the right accountability to lock it in.",
  "Founder as Infrastructure": "This is rare. Your clarity, communication, and learning velocity multiply everything you build. The question now is whether your systems, your team, and your AI stack can keep up with you.",
};

export const s2TierCopy: Record<string, string> = {
  "Start Here": "Immediate attention needed. Your AI usage right now is creating risk you can't see. The tools are running faster than the guardrails. Start with the basics: know what tools are being used, know what's going into them, and put one written rule in place. That's the foundation everything else builds on.",
  "Early Stage": "Core rules and practices still need to be built. There's awareness here but not enough structure behind it. Prioritize getting your AI policy written and one person named as responsible. Those two moves change the entire posture of your business around AI.",
  "In Progress": "Good start. The structure exists in places, but follow-through is inconsistent. The gaps aren't in what you know, they're in what you do consistently. Focus on the domains where you scored lowest and build the documentation that makes good intentions into repeatable practice.",
  "Well Governed": "Strong foundation. You have the structure, the documentation, and the oversight in place. Keep it current. AI tools and regulations are changing fast, the businesses that stay ahead are the ones that review and update their governance regularly, not just when something breaks.",
};

export const compositeTierCopy: Record<string, string> = {
  "Not Ready": "The foundation hasn't been built yet, on either side. Before AI can multiply anything in your business, the operator and the operation both need structure. This isn't a technology problem. It's an infrastructure problem. The right next step is starting at the beginning, with clarity about who you are and what rules your business runs on.",
  "Foundation Building": "You're building and there's real progress here. The gaps in Founder Intelligence and AI Security are connected, when your identity and language get clearer, the decisions about AI governance get easier too. A structured 45-day engagement works on both simultaneously. You don't need to fix everything. You need to fix the right things in the right order.",
  "Operationally Capable": "Solid foundation on both sides. You're ready to use AI intentionally and with guardrails in place. The next move is integration, getting the tools, the workflows, and the governance working together as one system rather than separate efforts.",
  "AI-Ready Operator": "You're ready. The identity is clear, the language works, the learning is operational, and the AI governance is documented and enforced. This is the profile of a founder who can use AI as a multiplier rather than a risk. The work now is optimization and staying ahead of what changes.",
};

// Domain intro lookup
export function getDomainForQuestion(questionIndex: number): DomainInfo | null {
  const q = questions[questionIndex];
  if (!q) return null;
  return allDomains.find(d => d.key === q.domainKey) ?? null;
}

export function isDomainStart(questionIndex: number): boolean {
  const q = questions[questionIndex];
  if (!q) return false;
  const domain = allDomains.find(d => d.key === q.domainKey);
  if (!domain) return false;
  return domain.questionIds[0] === q.id;
}

export function isSectionStart(questionIndex: number): boolean {
  return questionIndex === 0 || questionIndex === 36;
}

export const INDUSTRIES = [
  "Consulting",
  "Coaching",
  "Creative Services",
  "Professional Services",
  "Technology",
  "Retail",
  "Health & Wellness",
  "Real Estate",
  "Other",
];

// ─── ONE THING STATEMENTS (keyed by domain key) ───
export const oneThingStatements: Record<string, string> = {
  // Section 1 domains
  data_capture:
    "Your highest-leverage move is getting visibility into what's actually happening in your pipeline. Until your leads, sales activity, and client data are captured in one structured place, every decision you make is based on incomplete information. Fix the capture layer first, everything else you build sits on top of it.",
  decision_systems:
    "Your business is bottlenecked at every decision point because there's no framework for how choices get made without you. The one thing to fix is building a documented decision process for your three most common recurring decisions. Once those run without you, capacity opens up everywhere.",
  execution_visibility:
    "You can't manage what you can't see. Right now, work is happening but you have no reliable way to know if it's on track, on time, or on standard. The one thing to fix is creating a single, visible tracking layer for active work, with owners, deadlines, and status updates that don't require you to chase anyone.",
  ai_integration:
    "AI is either absent or unstructured in your operations. The one thing to fix is identifying the three highest-volume, lowest-complexity tasks in your business and building a repeatable AI workflow for each one. Start where the wins are obvious and the risk is low.",
  operational_accountability:
    "Your business has no consistent way to hold itself accountable. Goals exist loosely, but no one is tracking progress or enforcing follow-through. The one thing to fix is implementing a weekly accountability rhythm with clear ownership, measurable commitments, and documented follow-up.",
  founder_identity:
    "Your business is built on top of a blurry foundation. Until you can articulate who you are and what you stand for, independent of what you sell, every brand decision, hiring choice, and partnership will lack coherence. The one thing to fix is defining your conviction set, the non-negotiable beliefs that drive how you build.",
  self_awareness:
    "You're making operational decisions from patterns you haven't examined. The one thing to fix is building a structured self-awareness practice, a regular review of what triggered your biggest decisions, what you avoided, and what you repeated. Leaders who see their own patterns clearly make better calls under pressure.",
  language_communication:
    "Your language isn't landing the way it needs to. The gap between what you mean and what people hear is costing you trust, sales, and clarity. The one thing to fix is pressure-testing your core positioning statement until it's sharp enough that someone who hears it once can repeat it back.",
  literacy_ai_learning:
    "You're not learning fast enough or applying what you learn deliberately enough. The one thing to fix is building a structured learning rhythm, dedicated time each week for acquiring, testing, and integrating new knowledge, especially around AI, into your actual operations.",

  // Section 2 domains
  tool_inventory:
    "You don't know what AI tools are active in your business right now, and that means you can't protect what you can't see. The one thing to fix is completing a full inventory of every AI tool being used, by whom, for what purpose, and what data is going into it. That list is the foundation of everything else in AI governance.",
  data_safety:
    "Sensitive business and client information is flowing into AI tools without safeguards. The one thing to fix is defining what categories of data are never allowed into AI tools and communicating that boundary clearly to everyone on your team. One clear rule prevents the most damaging mistakes.",
  written_policy:
    "Your AI usage has no written rules. Good intentions aren't enough when tools are moving this fast. The one thing to fix is writing a simple, enforceable AI policy that covers what's allowed, what's not, and who is responsible. It doesn't have to be perfect, it has to exist.",
  vendor_risk:
    "The software tools your business already uses have added AI features you may not have agreed to. The one thing to fix is auditing your existing vendor stack for AI-enabled features and reviewing their data handling terms. You may be sharing client data with AI systems without knowing it.",
  human_review:
    "AI output is going out without a human checking it. The one thing to fix is requiring a human review step on every piece of AI-generated content that touches a client, a contract, or your brand. One bad output can undo years of trust.",
  right_versions:
    "Your team is using free or personal versions of AI tools for business work. The one thing to fix is upgrading to business-tier versions that include proper data protections, or stopping usage until you can. Free tools are built for individuals, not businesses handling sensitive information.",
  incident_response:
    "You have no plan for when AI causes a problem, and it will. The one thing to fix is creating a simple incident response protocol: who gets notified, what gets documented, and how the process improves. The businesses that survive AI mistakes are the ones that planned for them.",
};
