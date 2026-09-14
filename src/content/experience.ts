// Roles, education and certifications, moved from the old
// src/components/home/Checkpoints.tsx. The Oct 2024 to now entry is one entry:
// Hypeon AI was in stealth until Sep 2025, and the ledger forbids splitting it.
export const experiences = [
  { name: "Hypeon AI", role: "Founding ML Engineer, Oct 2024 to now" },
  { name: "Synclovis Systems", role: "Backend Developer Intern, Jun to Sep 2024" },
  {
    name: "K.S.R.M College of Engineering",
    role: "B.Tech Computer Science, 2020 to 2024",
  },
  { name: "TrustBench", role: "Author, open source" },
  { name: "mcp-bigquery-evals", role: "Author, on PyPI" },
  { name: "And more", role: "Certifications and stack on the about page" },
];

/*
  Chapter V, the career map. Five stops on one route, left edge to right edge.
  x and y are percentages of the map frame and sit on the drawn route; the
  engine positions each stop from them and stacks them under 768px.
  Every line is the ledger's: dates from the tenure table, the degree line from
  the education entry, the open-source row from the traceable block.
*/
export const careerMap = [
  {
    stop: 1,
    x: 4,
    y: 72,
    year: "2020",
    title: "K.S.R.M College of Engineering",
    line: "B.Tech Computer Science, 2020 to 2024, CGPA 8.14",
  },
  {
    stop: 2,
    x: 27,
    y: 24,
    year: "Jun 2024",
    title: "Synclovis Systems",
    line: "Backend Developer Intern, REST services in Node.js, Express and MySQL; LangChain and FAISS retrieval for an internal assistant",
  },
  {
    stop: 3,
    x: 50,
    y: 50,
    year: "Oct 2024",
    title: "Hypeon AI",
    line: "Founding ML Engineer, LLM orchestration, NL-to-SQL over BigQuery, live since Sep 2025",
  },
  {
    stop: 4,
    x: 73,
    y: 74,
    year: "2026",
    title: "Open source",
    line: "TrustBench, mcp-bigquery-evals on PyPI, Cargo Concierge live",
  },
  {
    stop: 5,
    x: 96,
    y: 30,
    year: "now",
    title: "Available",
    line: "15-day notice, remote or contract, US, EU or AU hours",
  },
];

// One winding route, two gentle bends, drawn in a 1000 by 400 frame. The five
// stops above sit on it.
export const careerRoute =
  "M0,288 C140,288 170,96 270,96 C400,96 400,200 500,200 C600,200 620,296 730,296 C860,296 880,120 1000,120";

export const experienceNote =
  "2+ years of production LLM systems, with the cost guardrail written into the code.";

export const roles = [
  {
    when: "Oct 2024 to now",
    title: "Founding ML Engineer",
    org: "Hypeon AI",
    body: "I own the LLM orchestration service: routing, intent and composition sub-agents streaming over SSE, plus NL-to-SQL over BigQuery that dry-runs every query before it costs anything. Claude Haiku is primary, Gemini is the fallback.",
    tags: "LangChain · FastAPI · BigQuery · Cloud Run · Claude · Gemini",
  },
  {
    when: "Jun to Sep 2024",
    title: "Backend Developer Intern",
    org: "Synclovis Systems",
    body: "I built REST services in Node, Express and MySQL for an event-management app. I also added LangChain and FAISS retrieval to an internal LLM health assistant, with guardrails that refuse out-of-scope questions.",
    tags: "Node · Express · MySQL · LangChain · FAISS",
  },
];

export const education = {
  when: "2020 to 2024",
  title: "B.Tech · Computer Science · 2024",
  org: "K.S.R.M College of Engineering",
  note: "K.S.R.M College of Engineering · 8.14 / 10",
};

export const certifications = [
  "Oracle OCI Data Science Professional · 2025",
  "Oracle OCI AI Foundations Associate · 2025",
  "Azure AI Fundamentals · AWS Cloud Foundations",
];
