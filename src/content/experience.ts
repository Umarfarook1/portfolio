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
