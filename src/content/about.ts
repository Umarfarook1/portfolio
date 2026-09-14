// The about copy, moved from src/components/home/About.tsx, Stack.tsx and
// Method.tsx. One ledger fix on the way in (2026-09-14): the Interface group
// listed "Next.js" and "React" as two items, and the ledger allows React only
// as "Next.js (React)". The two became one item.
export const aboutParagraph =
  "I decide when a model earns its place, then check the output still holds under real traffic. Most of the work is evaluation and cost discipline. Neither is fun. I want applied ML and LLM engineering roles at early-stage companies, where that judgment counts as much as model choice.";

export const aboutAside = "Most of my time goes to the layer around the model.";

export const philosophy = "I measure what I ship.";

// Every item here appears in a shipped repo or in the resume. Nothing aspirational.
export const stackGroups = [
  {
    label: "Models + agents",
    items: ["Claude", "Gemini", "OpenAI", "LangChain", "sentence-transformers", "Hugging Face"],
  },
  {
    label: "Backend + data",
    items: ["Python", "FastAPI", "PostgreSQL", "BigQuery", "FAISS", "Redis", "Pydantic"],
  },
  { label: "Delivery", items: ["GCP", "AWS", "Docker", "GitHub Actions", "Alembic", "Prometheus"] },
  { label: "Interface", items: ["TypeScript", "Next.js (React)", "Tailwind CSS", "SSE"] },
];

export const stackAside = "Everything here is in something I shipped.";

// Four stages, each linking the repo where it can be watched working. Every
// figure below is in that repo's README.
export const methodStages = [
  {
    id: "01",
    name: "Orchestrate",
    body: "I route each request through extraction, rate lookup, ranking and drafting, and stream progress while they run. One quote fans out to six model calls: extraction, up to three rationales, a recommendation and the draft email. Extraction averages 2,680 ms in the 15-item ablation. The end-to-end quote is not timed.",
    proof: "Cargo Concierge",
    href: "https://github.com/Umarfarook1/Cargo-Concierge",
  },
  {
    id: "02",
    name: "Ground",
    body: "I put the vector store behind a Protocol so the backend is a one-file swap, and the retrieval metrics (Recall@K, MRR, nDCG@10) are a component with a CLI rather than a script run once. The harness has not been pointed at a benchmark yet. Below a confidence floor the answer comes back as “I don’t know” plus the closest passage. Citations are required or the answer is rejected.",
    proof: "RAG Document QA · v0.0.1",
    href: "https://github.com/Umarfarook1/rag-document-qa",
  },
  {
    id: "03",
    name: "Constrain",
    body: "I dry-run every BigQuery call and refuse anything that would scan past 100 MB. Seven read-only tools, seven stable error codes an agent can switch on. There is no write path.",
    proof: "mcp-bigquery-evals",
    href: "https://github.com/Umarfarook1/mcp-bigquery-evals",
  },
  {
    id: "04",
    name: "Measure",
    body: "I score every answer on eight metrics, five judged and three deterministic. When a slice regresses I run McNemar’s exact test before I call it real. The Cohen’s kappa function for judge-versus-human calibration is written and tested, but I have not labelled a set to run it against. 82 tests run offline with no API key.",
    proof: "TrustBench",
    href: "https://github.com/Umarfarook1/trustbench",
  },
];

export const methodAside = "Same four stages on every project.";

// Chapter IV, what I do. Four columns, one plate each. The wording sits inside
// src/content/services.ts and the ledger's "services offered" block; no mobile
// or desktop framework is named because the owner has not named one.
export const disciplines = [
  {
    no: "01",
    slug: "llm-features",
    title: "LLM features",
    desc: "Agents, RAG and NL-to-SQL, scoped in writing and shipped with their evals.",
  },
  {
    no: "02",
    slug: "eval-harnesses",
    title: "Eval harnesses",
    desc: "Golden sets, deterministic checks and a temperature-0 judge, gated in CI.",
  },
  {
    no: "03",
    slug: "software-builds",
    title: "Web, mobile and desktop",
    desc: "Next.js (React) and FastAPI web apps, plus mobile and desktop apps from one codebase.",
  },
  {
    no: "04",
    slug: "audits",
    title: "Audits",
    desc: "Five days, fifty real cases, a failure taxonomy and a ranked fix list.",
  },
];
