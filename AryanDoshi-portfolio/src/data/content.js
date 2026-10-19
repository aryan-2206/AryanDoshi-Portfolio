// ============================================================
// CONTENT DATA — single source of truth for the portfolio.
// Edit values here; the UI will update automatically.
// ============================================================

// ── Personal ─────────────────────────────────────────────
export const personal = {
  name: "Aryan Doshi",
  tagline: "Backend & AI Systems Developer",
  sub: "Computer Engineering @ VJTI '28",
  badge: "Incoming SDE Intern @ BNY",
  email: "aryandoshi22@gmail.com",
  location: "Mumbai, India",
  linkedin: "https://www.linkedin.com/in/aryandoshi2206",
  github: "https://www.github.com/aryan-2206",
  instagram: "https://www.instagram.com/aryandoshi_/",
  leetcode: "https://leetcode.com/aryandoshi_/",
  codechef: "https://www.codechef.com/users/aryandoshii",
  codeforces: "https://codeforces.com/profile/aryandoshi",
  resume: "/Resume.pdf",
};

// ── Hero stats strip ──────────────────────────────────────
export const heroStats = [
  { value: 900, suffix: "+", label: "DSA Problems" },
  { value: 1, suffix: "", label: "Published Paper" },
  { value: 5, suffix: "+", label: "Projects" },
  { value: 99.98, suffix: "%ile", label: "MHT-CET" },
];

// ── Typewriter roles ──────────────────────────────────────
export const roles = [
  "Backend Developer",
  "AI Systems Engineer",
  "RAG / LLM Builder",
  "Competitive Programmer",
];

// ── About ─────────────────────────────────────────────────
export const about = {
  bio: `I'm a Computer Engineering student at VJTI Mumbai, passionate about
building AI-powered backend services and RAG systems. I work primarily with
FastAPI, Python, Node.js, and React — designing REST APIs, knowledge-graph
pipelines, and LLM-powered agents using LangGraph, ChromaDB, and Neo4j.

Outside of work I grind competitive programming — 900+ problems solved across
LeetCode, Codeforces, and CodeChef. I believe clean architecture, reproducible
pipelines, and honest evaluation matter more than hype.`,
  currently: "AI backend intern @ Amaanitvam Foundation, building RAG services for an EdTech platform.",
  techPills: [
    "FastAPI", "Python", "React", "Node.js", "PostgreSQL",
    "RAG", "LLMs", "LangGraph", "ChromaDB", "Neo4j",
  ],
};

// ── Experience ────────────────────────────────────────────
export const experiences = [
  {
    role: "SDE Intern",
    org: "BNY",
    type: "Internship",
    period: "Incoming",
    logo: "bny",                // maps to src/assets/logos/bny.png
    color: "#00b4d8",
    bullets: [
      "Incoming Software Development Engineering Intern.",
    ],
    tags: [],
  },
  {
    role: "Full Stack Developer Intern",
    org: "Amaanitvam Foundation",
    type: "Internship",
    period: "Jul 2026 – Present",
    logo: "amaanitvam",
    color: "#c77dff",
    bullets: [
      "Built an AI-powered doubt-support microservice (FastAPI, PostgreSQL, ChromaDB, Google Gemini).",
      "Designed 15+ REST APIs; modular architecture cut backend integration effort by ~60%.",
      "Implemented a permission-aware RAG pipeline indexing 1,000+ lessons and library chunks with semantic search, conversation history, and RBAC.",
    ],
    tags: ["FastAPI", "PostgreSQL", "ChromaDB", "Gemini", "RAG", "RBAC"],
  },
  {
    role: "Deep Learning Mentee",
    org: "Project X VJTI",
    type: "Research",
    period: "Jul 2025 – Apr 2026",
    logo: "projectx",
    color: "#f77f00",
    bullets: [
      "Contributed to a voice-cloning research model (hyperparameter tuning, training pipelines, evaluation).",
      "Work led to a published paper at IJERT (June 2026).",
    ],
    tags: ["PyTorch", "Tacotron2", "WaveGlow", "Deep Learning"],
  },
  {
    role: "Open Source Contributor",
    org: "Hacktoberfest 2025",
    type: "Open Source",
    period: "Oct 2025",
    logo: "hacktoberfest",
    color: "#ff6b6b",
    bullets: [
      "Participated in Hacktoberfest 2025; made meaningful open-source contributions.",
    ],
    tags: ["Open Source", "Git", "GitHub"],
  },
];

// ── Projects ──────────────────────────────────────────────
// categories: "AI-ML" | "Full-Stack" | "Backend" | "Deep Learning"
export const projects = [
  {
    id: "alphaagent",
    title: "AlphaAgent",
    subtitle: "Equity Research AI Agent",
    period: "Mar – May 2026",
    categories: ["AI-ML", "Backend"],
    github: "https://github.com/DataHack4-0/Ctrl--Alt--De-Dragon",
    demo: null,
    description:
      "11-node LangGraph multi-agent platform performing automated equity research on Indian listed companies. Features adversarial bull/bear analyst debate with a JSONPath-based Evidence Auditor to prevent hallucination, and Hybrid RAG (ChromaDB + Neo4j BM25 + knowledge-graph traversal via RRF).",
    highlights: [
      "11-node LangGraph orchestration with specialized sub-agents",
      "Adversarial bull/bear debate + JSONPath Evidence Auditor",
      "Hybrid RAG: ChromaDB + Neo4j BM25 + knowledge-graph traversal (RRF fusion)",
      "~80% deterministic ingestion (PyMuPDF + regex + Groq Llama-3.3-70B)",
    ],
    skills: ["Python", "LangGraph", "ChromaDB", "Neo4j", "RAG", "LLMs", "Groq", "FastAPI"],
    bgColor: "#1a0533",
    accentColor: "#c77dff",
    image: "equitydesk",
    imageMobile: "equitymob",
    featured: true,
  },
  {
    id: "banquet",
    title: "Banquet IntelliManager",
    subtitle: "MERN Real-Time Operations Platform",
    period: "Mar – Apr 2026",
    categories: ["Full-Stack", "Backend"],
    github: "https://github.com/aryan-2206/Banquet_Management_System",
    demo: null,
    description:
      "MERN platform with 7 role-based dashboards, JWT RBAC across 2 layers (Express middleware + React ProtectedRoute). Socket.io real-time rooms for GRE-to-Kitchen headcount sync reduced check-in time from 2–5 min to under 30 sec, up to 20% less food waste, sub-100ms latency. Twilio WhatsApp automation for installment follow-ups.",
    highlights: [
      "7 role-based dashboards with dual-layer JWT RBAC",
      "Socket.io real-time sync: check-in 2–5 min → <30 sec",
      "Up to 20% food waste reduction, sub-100ms latency",
      "Twilio WhatsApp automation for installment follow-ups",
    ],
    skills: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT", "Twilio"],
    bgColor: "#0d1b2a",
    accentColor: "#00b4d8",
    image: "banquetdesk",
    imageMobile: "banquetmob",
    featured: false,
  },
  {
    id: "smartcv",
    title: "SmartCV",
    subtitle: "AI Resume Builder",
    period: "Dec 2025 – Feb 2026",
    categories: ["Full-Stack", "AI-ML"],
    github: null,
    demo: "https://smart-cv-an-ai-powered-resume-build.vercel.app/",
    description:
      "MERN-based AI resume builder with real-time preview and an ATS evaluation engine using keyword match, formatting analysis, and JD alignment. JWT auth, deployed on Vercel + Render.",
    highlights: [
      "ATS evaluation engine: keyword match, formatting, JD alignment",
      "Real-time preview with live score updates",
      "JWT authentication + protected routes",
      "Deployed on Vercel (frontend) + Render (backend)",
    ],
    skills: ["React", "Node.js", "Express", "MongoDB", "JWT", "NLP", "TF-IDF"],
    bgColor: "#0d2818",
    accentColor: "#00f5a0",
    image: "smartcv",
    imageMobile: "smartcv",
    featured: false,
  },
  {
    id: "fakemyvoice",
    title: "FakeMyVoice",
    subtitle: "Voice Cloning Deep Learning Pipeline",
    period: "Jul – Sep 2025",
    categories: ["Deep Learning", "AI-ML"],
    github: "https://github.com/nihira20/Fake_My_Voice",
    demo: null,
    description:
      "Tacotron2 + WaveGlow + GE2E speaker encoder pipeline achieving 92% speaker-verification accuracy. Trained on LJSpeech, VCTK, and VoxCeleb datasets. Clones voice from as little as 30 seconds of reference audio. Published at IJERT June 2026.",
    highlights: [
      "92% speaker-verification accuracy",
      "GE2E speaker encoder + Speaker-Conditioned Tacotron 2 + WaveGlow",
      "Trained on LJSpeech, VCTK, VoxCeleb",
      "Published paper at IJERT (June 2026)",
    ],
    skills: ["Python", "PyTorch", "Tacotron2", "WaveGlow", "GE2E", "Librosa"],
    bgColor: "#001a33",
    accentColor: "#3dd6f5",
    image: "fmv",
    imageMobile: "fmv",
    featured: true,
  },
  {
    id: "imagecaption",
    title: "Image Captioning",
    subtitle: "CNN-LSTM + Bahdanau Attention",
    period: "May – Jun 2025",
    categories: ["Deep Learning", "AI-ML"],
    github: "https://github.com/aryan-2206/Image_Caption_Generator",
    demo: null,
    description:
      "End-to-end captioning model combining CNN visual feature extraction with LSTM and Bahdanau Attention. Trained on MSCOCO 20k+ images. BLEU-1: 0.39, BLEU-4: 0.13.",
    highlights: [
      "CNN encoder + LSTM decoder + Bahdanau Attention",
      "Trained on MSCOCO 20,000+ images",
      "BLEU-1: 0.39 · BLEU-4: 0.13",
    ],
    skills: ["Python", "PyTorch", "CNN", "LSTM", "Attention", "MSCOCO"],
    bgColor: "#1a1200",
    accentColor: "#ffd60a",
    image: "imgcaption",
    imageMobile: "imgcaption",
    featured: false,
  },
];

// ── Publication ───────────────────────────────────────────
export const publication = {
  title:
    "FakeMyVoice: A Hybrid Multi-Stage Deep Learning Pipeline for Low-Resource Speaker-Conditioned Voice Cloning with Adversarial Robustness and Ethical Safeguards",
  journal: "IJERT",
  date: "June 22, 2026",
  authors: ["Aryan Doshi", "Nihira Neralwar", "Dhiraj Shirse"],
  link: "https://www.ijert.org/fakemyvoice-a-hybrid-multi-stage-deep-learning-pipeline-for-low-resource-speaker-conditioned-voice-cloning-with-adversarial-robustness-and-ethical-safeguards-ijertv15is060623",
  summary:
    "We built a voice-cloning pipeline that can mimic a speaker from as little as 30 seconds of reference audio. The system combines a GE2E speaker encoder (which captures speaker identity into a fixed-length embedding), a Speaker-Conditioned Tacotron 2 (which generates mel-spectrograms), and WaveGlow (a flow-based neural vocoder). We evaluated the result using MOS scores, speaker similarity, and Word Error Rate — and added adversarial robustness and ethical safeguards to prevent misuse.",
  metrics: ["92% speaker verification accuracy", "MOS evaluated", "Adversarial robustness layer"],
};

// ── Skills (grouped) ──────────────────────────────────────
export const skillGroups = [
  {
    group: "Languages",
    color: "#c77dff",
    skills: ["Python", "JavaScript", "C++"],
  },
  {
    group: "Backend",
    color: "#00b4d8",
    skills: ["FastAPI", "Node.js", "Express", "REST APIs", "JWT / RBAC"],
  },
  {
    group: "Frontend",
    color: "#00f5a0",
    skills: ["React"],
  },
  {
    group: "Databases",
    color: "#f77f00",
    skills: ["PostgreSQL", "MongoDB", "ChromaDB", "Neo4j"],
  },
  {
    group: "AI / ML",
    color: "#ff6b6b",
    skills: ["RAG", "LLMs", "LangGraph", "PyTorch", "Google Gemini"],
  },
  {
    group: "Tools",
    color: "#ffd60a",
    skills: ["Git", "Socket.io", "Twilio", "Vercel", "Render"],
  },
];

// ── Competitive Programming ───────────────────────────────
export const cp = {
  total: "900+",
  platforms: [
    {
      name: "LeetCode",
      handle: "aryandoshi_",
      badge: "Knight (Top 4.85%)",
      rating: "1895",
      problems: "704",
      link: "https://leetcode.com/aryandoshi_/",
      color: "#ffa116",
      icon: "leetcode",
    },
    {
      name: "Codeforces",
      handle: "aryandoshi",
      badge: "Pupil",
      rating: "1204",
      problems: null,
      link: "https://codeforces.com/profile/aryandoshi",
      color: "#1f8ef1",
      icon: "codeforces",
    },
    {
      name: "CodeChef",
      handle: "aryandoshii",
      badge: "2 Star",
      rating: "1582",
      problems: null,
      link: "https://www.codechef.com/users/aryandoshii",
      color: "#5b4638",
      icon: "codechef",
    },
  ],
};

// ── Education ─────────────────────────────────────────────
export const educations = [
  {
    desc: "Schooling",
    title: "Gokuldham High School & Junior College",
    period: "2012 – 2022",
    grade: "94.75% (SSC / ICSE)",
    courses: ["Physics", "Chemistry", "Mathematics", "Computer Science", "Social Studies"],
  },
  {
    desc: "Higher Secondary Education",
    title: "Prakash College of Commerce and Science",
    period: "2022 – 2024",
    grade: "87.83% (HSC)",
    courses: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
  },
  {
    desc: "Undergraduate Education",
    title: "Veermata Jijabai Technological Institute",
    period: "B.Tech Computer Engineering · 2024 – 2028",
    grade: "8.53 CGPA",
    courses: ["Data Structures & Algorithms", "DBMS", "OS", "AI", "Linear Algebra", "Discrete Math"],
  },
];

export const academicStats = [
  { label: "VJTI CGPA", value: "8.53" },
  { label: "MHT-CET", value: "99.98 %ile" },
  { label: "MHT-CET Score", value: "181 / 200" },
  { label: "State Rank", value: "62" },
  { label: "JEE Mains", value: "96.51 %ile" },
  { label: "HSC", value: "87.83 %" },
  { label: "SSC", value: "94.75 %" },
];

// ── Certifications ────────────────────────────────────────
export const certifications = [
  {
    title: "Getting Started with Deep Learning",
    issuer: "NVIDIA",
    date: "July 9, 2026",
    credentialId: "PG5f--a3Rn2YbnTbnlJI5w",
    verifyLink: "https://learn.nvidia.com/certificates?id=PG5f--a3Rn2YbnTbnlJI5w",
    logo: "nvidia",
    color: "#76b900",
    image: "nvidia_cert",
  },
  {
    title: "Adobe Hackathon Participant",
    issuer: "Adobe",
    date: "October 2025",
    credentialId: "Adobe Hackathon 2025",
    verifyLink: "https://unstop.com/hackathons/crp-adobe-university-hackathon-2026-adobe-1715333",
    logo: "adobe",
    color: "#ff0000",
    image: "adobe_hackathon",
  },
  {
    title: "Hacktoberfest 2025 Supercontributor",
    issuer: "DigitalOcean",
    date: "October 2025",
    credentialId: "Hacktoberfest 2025",
    verifyLink: "https://hacktoberfest.com/",
    logo: "hacktoberfest",
    color: "#00d9ff",
    image: "hacktoberfest_supercontributor",
  },
];

// ── Beyond Code ───────────────────────────────────────────
export const volunteering = [
  {
    role: "Department Coordinator",
    org: "Technovanza VJTI",
    period: "Oct 2024 – Oct 2025",
    description:
      "Organized and ran a hands-on Arduino robotics workshop as part of VJTI's annual technical fest. Coordinated participants, managed logistics, and facilitated the workshop end-to-end.",
    image: "technovanza", // maps to src/assets/technovanza.png
    tags: ["Leadership", "Robotics", "Arduino", "Workshop"],
    color: "#c77dff",
  },
  {
    role: "Student Volunteer",
    org: "Agastya International Foundation × J.P. Morgan",
    period: "Dec 2025",
    description:
      "Volunteered in an educational outreach initiative organized with J.P. Morgan, supporting Agastya Foundation's mission to bring hands-on science education to underserved communities.",
    image: "agastya", // maps to src/assets/agastya.png
    tags: ["Volunteering", "Education", "Social Impact"],
    color: "#00b4d8",
  },
];

// ── Blog ──────────────────────────────────────────────────
export const blogPosts = [
  {
    id: "alphaagent-rag",
    title: "How I Built a Hallucination-Resistant RAG System for Equity Research",
    date: "Oct 2026",
    readTime: "8 min read",
    tags: ["RAG", "LangGraph", "LLMs", "AI Agents"],
    excerpt:
      "Most RAG systems trust whatever the retriever pulls. I wanted something that would argue with itself. Here's how I built an adversarial multi-agent pipeline with a JSONPath Evidence Auditor that caught hallucinations before they reached the output.",
    content: `When I started building AlphaAgent, my equity research AI agent, the hardest problem wasn't retrieval — it was trust.

You can retrieve documents perfectly and still produce a completely wrong investment thesis if your LLM decides to fill in the gaps with plausible-sounding nonsense. I've seen it happen dozens of times. The model would say "as per the Q3 earnings report" and cite a number that was nowhere in the retrieved chunks.

So I built something I call the Evidence Auditor.

**The Architecture**

AlphaAgent runs 11 specialized nodes in a LangGraph graph. Two of them — the Bull Analyst and the Bear Analyst — are adversarial by design. The Bull finds every reason the stock looks good. The Bear tears it apart. They each produce structured JSON outputs with explicit citations: \`{"claim": "Revenue grew 18% YoY", "source_chunk_id": "RELIANCE_Q3_2025_p14", "jsonpath": "$.financials.revenue_growth"}\`.

The Evidence Auditor is a third node that runs after both analysts finish. It takes every claim, goes back to the raw retrieved chunks, runs the JSONPath expression, and checks whether the cited value actually exists and matches. If it doesn't — the claim is flagged and the analyst has to either drop it or rewrite it with evidence.

**Why JSONPath?**

Structured financial documents (PDFs converted to JSON with PyMuPDF + regex) have predictable schemas. JSONPath lets me write deterministic extraction rules instead of asking the LLM to "find the revenue number." That's the ~80% deterministic ingestion I mention in my project description. The remaining 20% goes through Groq Llama-3.3-70B for unstructured sections.

**What broke along the way**

The hardest part was the Hybrid RAG — combining ChromaDB semantic search with Neo4j BM25 keyword search and knowledge-graph traversal, then fusing the results with Reciprocal Rank Fusion. Each retriever has different latency and confidence characteristics. Getting the RRF weights right took a lot of trial-and-error.

**The lesson**

If you want reliable AI agents on factual domains, don't just prompt the model to be accurate. Build structural verification into the pipeline. Make the system argue with itself and prove every claim before it leaves the graph.`,
  },
  {
    id: "voice-cloning-30s",
    title: "Cloning a Voice from 30 Seconds of Audio",
    date: "Sep 2025",
    readTime: "6 min read",
    tags: ["Deep Learning", "Voice Cloning", "PyTorch", "Tacotron2"],
    excerpt:
      "FakeMyVoice was my first serious deep learning research project. I cloned voices from as little as 30 seconds of reference audio — here's how the GE2E encoder, Tacotron 2, and WaveGlow all fit together, and what surprised me most along the way.",
    content: `The first time I heard the model output — a synthesized voice that actually sounded like the reference speaker — I genuinely didn't know whether to be excited or slightly creeped out. Both, probably.

FakeMyVoice is a three-stage pipeline:

1. **GE2E Speaker Encoder** — Takes the reference audio and produces a fixed-length speaker embedding. This is the "identity" of the voice.
2. **Speaker-Conditioned Tacotron 2** — Takes the text + speaker embedding and generates a mel-spectrogram (basically a visual representation of audio frequencies over time).
3. **WaveGlow** — A flow-based neural vocoder that converts the mel-spectrogram back into actual audio waveform.

**The low-resource challenge**

The interesting constraint was "low-resource": we wanted the system to work from just 30 seconds of reference audio, not hours of recordings. Most early voice cloning systems needed hundreds of utterances from the target speaker.

The GE2E (Generalized End-to-End) loss function is what makes this possible. Instead of training the speaker encoder to recognize individual speakers, GE2E trains it to embed speakers such that utterances from the same speaker cluster tightly and utterances from different speakers are pushed apart. This generalization means the encoder gets good at capturing speaker characteristics from just a few utterances.

**Training**

We trained on LJSpeech (single speaker, high quality), VCTK (multi-speaker, British English), and VoxCeleb (real-world recordings, diverse). The multi-dataset training is crucial for generalization.

The hardest part was hyperparameter tuning on Tacotron 2 — attention alignment is notoriously fragile during early training. We had runs where the attention would just collapse and the model would produce garbage. The fix was careful learning rate scheduling and starting with teacher forcing at high ratios.

**Results**

92% speaker verification accuracy — meaning when we ran a separate speaker verification model, it agreed with the reference speaker 92% of the time. MOS scores were decent for a student research project. The system works well on clean reference audio; background noise degrades it significantly.

This work eventually became a published paper at IJERT (June 2026). My co-authors Nihira Neralwar and Dhiraj Shirse did a huge amount of the legwork on the ethical safeguards section.`,
  },
  {
    id: "realtime-rbac-dashboards",
    title: "Building Real-Time Role-Based Dashboards with Socket.io",
    date: "Apr 2026",
    readTime: "7 min read",
    tags: ["Socket.io", "MERN", "RBAC", "Real-Time"],
    excerpt:
      "For Banquet IntelliManager, I needed 7 different dashboards talking to each other in real time — with strict role-based access control. Here's the architecture that cut check-in time from 5 minutes to under 30 seconds.",
    content: `The problem: A banquet hall has salespeople, finance managers, kitchen staff, guest relations executives (GREs), and an admin — all working simultaneously, all needing different data, and some of them needing to react to each other's actions within seconds.

Before our system, when a guest checked in at the front desk, the kitchen would find out 2-5 minutes later via a phone call. Food was wasted because headcounts were wrong. Installment follow-ups were done manually with spreadsheets.

**The RBAC Architecture**

I implemented RBAC at two layers:
1. **Express Middleware** — Every API route checks the JWT, extracts the role, and compares against a permissions map. Role-based rate limiting also happens here.
2. **React ProtectedRoute** — On the frontend, routes are wrapped in a component that reads the decoded JWT from context and redirects unauthorized users before any data is even fetched.

The two-layer approach matters because frontend-only RBAC is security theater — anyone with the API URL and a valid JWT of a different role could still access data. Both layers need to enforce access.

**The Real-Time Sync**

When a GRE scans a guest's QR code, here's what happens:
1. A POST request hits the Express server, updates the headcount in MongoDB, and emits a Socket.io event to a room named \`event_{eventId}\`.
2. All users in that room — including the kitchen dashboard — receive the event and update their displayed headcount instantly.
3. Sub-100ms latency in practice (tested on a local network).

Socket.io rooms are key here. I didn't broadcast to all connected clients — I used named rooms scoped to each event, so kitchen staff for Event A don't see updates from Event B.

**Twilio WhatsApp Automation**

Finance managers set up installment schedules in the dashboard. A background job (node-cron) runs daily, checks upcoming due dates, and sends WhatsApp reminders via the Twilio API. The message templates include the guest's name, amount due, and a payment link.

This reduced manual follow-up calls from multiple hours per week to near-zero.

**What I'd do differently**

The Socket.io implementation works, but for a production system I'd consider Redis pub/sub to handle horizontal scaling across multiple Node.js instances. Single-instance Socket.io breaks when you add load balancers.`,
  },
];
