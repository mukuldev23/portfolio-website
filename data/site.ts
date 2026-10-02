// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to make the
//  site yours — every section and the terminal read from it.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Mukul Chavan",
  handle: "mukul",
  roles: ["Sr Software Engineer", "Full Stack JavaScript Developer", "GenAI Engineer"],
  tagline:
    "7+ years building complex web apps with Vue, React and Node.js — now shipping GenAI features with LLMs, RAG and MCP.",
  location: "Virar, Mumbai, India",
  status: "OPEN TO NEW OPPORTUNITIES",
  email: "mukulchavan23@gmail.com",
  resumeUrl: "/resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/mukuldev23", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/mukul-chavan", icon: "linkedin" },
  ] as const,
};

export const about = {
  paragraphs: [
    "I'm a Full Stack JavaScript developer with 7+ years of experience designing, developing and managing complex web applications — from Vue/Nuxt storefronts to Node.js microservices.",
    "Lately I've been deep in GenAI engineering: LLM orchestration, Retrieval-Augmented Generation, the Model Context Protocol and multi-agent systems that power real products, not just demos.",
    "I enjoy leading cross-functional teams, writing reusable production-grade code, and delivering high-quality work on tight deadlines. I speak English, Marathi and Hindi.",
  ],
  stats: [
    { value: "7+", label: "Years Experience" },
    { value: "3", label: "Companies" },
    { value: "3", label: "Certifications" },
  ],
};

export const skillGroups = [
  {
    title: "Core Development",
    items: [
      "JavaScript / TypeScript",
      "React.js",
      "Vue.js / Nuxt.js",
      "Angular",
      "Node.js",
      "MongoDB / MySQL",
      "Redis",
      "Microservices",
    ],
  },
  {
    title: "AI / GenAI Engineering",
    items: [
      "LLM Integration (Claude, OpenAI)",
      "Prompt Engineering",
      "RAG",
      "Model Context Protocol (MCP)",
      "Multi-Agent Orchestration",
    ],
  },
  {
    title: "Cloud & Tools",
    items: ["AWS", "Git", "CI/CD"],
  },
];

export const skills = skillGroups.flatMap((g) => g.items);

// "What I've Done" — one card per kind of project built.
// `context` is the small line under the title (where / what for).
export const workDone = [
  {
    title: "Angular Project",
    desc: "Built and maintained Angular applications with reusable components, services and API integrations in an Agile team.",
    tags: ["Angular", "TypeScript", "RxJS"],
  },
  {
    title: "Nuxt Project",
    desc: "Develop and maintain the dynamic website and web applications with Vue.js and Nuxt.js — production-grade, reusable and SEO-friendly.",
    tags: ["Nuxt.js", "Vue.js", "SSR"],
  },
  {
    title: "React Project",
    desc: "React 18 + Vite frontend with a 15-step conversational wizard, live streaming itinerary over SSE and an interactive MapLibre map.",
    tags: ["React", "Vite", "Zustand", "MapLibre"],
  },
  {
    title: "Node Application",
    desc: "Node.js/Express multi-agent backend with a plugin-style agent loader, unified streaming API and PostgreSQL/pgvector — one of 4 services owned end-to-end.",
    tags: ["Node.js", "Express", "PostgreSQL", "Microservices"],
  },
  {
    title: "LLM Application",
    desc: "Shopping and log-diagnostics assistants with Gemini function calling, RAG and prompt-injection/PII guardrails; a 5-agent Claude planner over 8 MCP servers.",
    tags: ["Claude API", "Gemini", "RAG", "MCP"],
  },
];

export type Project = {
  title: string;
  category: "GenAI" | "Work" | "Personal";
  desc: string;
  tech: string[];
  live?: string;
  code?: string;
  status?: string;
};

export const projects: Project[] = [
  {
    title: "AgentCore Platform",
    category: "GenAI",
    desc: "Multi-channel, multi-agent AI platform (Company Dev Day) powering a live e-commerce shopping assistant and an internal log-diagnostics assistant. Plugin-style agent loader, Gemini function calling, pgvector RAG, prompt-injection and PII guardrails, and an embeddable chat widget.",
    tech: ["Node.js", "Express", "Google Gemini", "PostgreSQL / pgvector", "Vue 3"],
  },
  {
    title: "Smart Trip Planner",
    category: "Personal",
    desc: "Global AI trip planner. A 5-agent Claude loop (extract → research → plan → enrich → critique) calls 8 MCP servers in parallel, grounds plans with vectorless BM25 RAG, flags budget/season/permit conflicts up front, and sequences each day by real road travel time on a MapLibre map — at ~₹620/month using free, open APIs.",
    tech: ["React", "Node.js", "Claude API", "MCP", "PostgreSQL", "Redis", "MapLibre"],
    status: "In Progress",
  },
  {
    title: "Webuy Web Platform",
    category: "Work",
    desc: "Developing and maintaining the dynamic website and web applications with reusable, production-grade components.",
    tech: ["Vue.js", "Nuxt.js", "JavaScript"],
  },
  {
    title: "Catalyst Design",
    category: "Work",
    desc: "Development, testing and deployment of LRN's Catalyst Design product, working closely with senior devs and QA teams.",
    tech: ["JavaScript", "Agile", "QA collaboration"],
  },
];

export const experience = [
  {
    role: "Sr Software Engineer",
    company: "Webuy Entertainment Pvt Ltd.",
    period: "2024 – Present",
    points: [
      "Develop and maintain the dynamic website and web applications using Vue.js and Nuxt.js.",
      "Write efficient production-level code and prototypes with an instinct for reusability.",
      "Take part in design, testing and delivery across the SDLC, plus project and sprint planning.",
      "Coordinate with project managers, tech leads, internet strategists and other teams.",
    ],
  },
  {
    role: "Software Developer Associate",
    company: "LRN Technologies & Content Solutions",
    period: "Dec 2021 – 2024",
    points: [
      "Worked across development, testing and deployment of the Catalyst Design product.",
      "Collaborated with senior developers and QA teams to deliver high-quality software.",
      "Debugged and fixed issues in the existing codebase to improve functionality.",
    ],
  },
  {
    role: "Sr Software Developer",
    company: "OSP Labs",
    period: "Jun 2017 – Nov 2021",
    points: [
      "Led brainstorming sessions that improved software design and functionality.",
      "Managed codebases and collaboration with Git.",
      "Evaluated and integrated third-party libraries, frameworks and APIs to speed up delivery.",
    ],
  },
];

export const education = {
  school: "Mumbai University (Viva College)",
  degree: "Bachelor of Science in Information Technology",
  period: "2012 – 2015",
};

export const certifications = [
  "JavaScript Security — Infosec",
  "AWS Cloud Technical Essentials — AWS",
  "Architecting Solutions on AWS",
];

// Add real client/colleague quotes here. The section stays hidden while empty.
export const testimonials: { quote: string; name: string; role: string }[] = [];

export const sections = [
  { id: "about", label: "About", file: "about_me.txt" },
  { id: "skills", label: "Skills", file: "toolbox/" },
  { id: "work", label: "What I've Done", file: "what_i_did.log" },
  { id: "projects", label: "Projects", file: "projects/" },
  { id: "experience", label: "Resume", file: "resume.pdf" },
  ...(testimonials.length ? [{ id: "testimonials", label: "Reviews", file: "reviews.log" }] : []),
  { id: "contact", label: "Contact", file: "mail.app" },
] as const;
