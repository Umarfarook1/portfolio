// The twelve projects, moved from the old src/components/home/Work.tsx.
// Two production systems open the list. They carry no repo because the code is
// the employer's; the row renders as plain type instead of a link, and no
// production number is claimed that cannot be checked. Years are first-commit
// dates from git, not release dates.
//
// Two ledger fixes were applied while moving the rows (2026-09-14):
//   - "5 sub-agents" became the named stages, because the honesty ledger retires
//     any count of sub-agents and asks for the stages instead.
//   - the arrow glyphs in the year and metric strings became the word "to".
export type Project = {
  slug: string;
  title: string;
  type: string;
  metric: string;
  year: string;
  yearShort: string;
  // The label used on the home chapter, where the row has no room for the
  // long type string.
  category?: string;
  repo: string | null;
  // Optional second door: the fastest path to actually running the thing.
  also?: { label: string; href: string };
  // Closed-source rows carry the description the owner can defend in a call,
  // taken from the ledger and from the old Checkpoints component.
  overview?: string;
};

export const projects: Project[] = [
  {
    slug: "conversational-research-agent",
    title: "Conversational Research Agent",
    type: "production · closed source",
    metric: "routing, retrieval, analysis and composition · SSE streaming",
    year: "2025 to now",
    yearShort: "2025",
    repo: null,
    overview:
      "I own the LLM orchestration service: routing, intent and composition sub-agents streaming over SSE, plus NL-to-SQL over BigQuery that dry-runs every query before it costs anything. Claude Haiku is primary, Gemini is the fallback.",
  },
  {
    slug: "nl-to-sql-bigquery",
    title: "NL-to-SQL over BigQuery",
    type: "production · closed source",
    metric: "schema introspection · dry-run cost guardrails",
    year: "2025 to now",
    yearShort: "2025",
    repo: null,
    overview:
      "NL-to-SQL over BigQuery with schema introspection, synonym matching and dry-run cost guardrails (Claude Haiku primary, Gemini fallback).",
  },
  {
    slug: "cargo-concierge",
    title: "Cargo Concierge",
    type: "agentic product",
    category: "Agentic product",
    metric: "14/15 on 6 fields · 33 pts from the rules block",
    year: "may 2026",
    yearShort: "2026",
    repo: "https://github.com/Umarfarook1/Cargo-Concierge",
    also: { label: "demo", href: "https://cargo-concierge.vercel.app" },
  },
  {
    slug: "mcp-bigquery-evals",
    title: "mcp-bigquery-evals",
    type: "open-source infra · PyPI",
    category: "Developer tools",
    metric: "100 MB cost cap · 7 MCP tools",
    year: "may 2026",
    yearShort: "2026",
    repo: "https://github.com/Umarfarook1/mcp-bigquery-evals",
    also: { label: "pypi", href: "https://pypi.org/project/mcp-bigquery-evals/" },
  },
  {
    slug: "trustbench",
    title: "TrustBench",
    type: "evaluation system",
    category: "Evaluation system",
    metric: "82 offline tests · 8 scored metrics",
    year: "jun 2026",
    yearShort: "2026",
    repo: "https://github.com/Umarfarook1/trustbench",
  },
  {
    slug: "rag-document-qa",
    title: "RAG Document QA",
    type: "retrieval system · v0.0.1",
    metric: "126 offline tests · retriever eval not yet run",
    year: "may 2026",
    yearShort: "2026",
    repo: "https://github.com/Umarfarook1/rag-document-qa",
  },
  {
    slug: "tiny-diffusion",
    title: "Tiny-diffusion",
    type: "generative model · from scratch",
    metric: "111 offline tests · smoke FID 338.7, samples not yet digits",
    year: "jul 2026",
    yearShort: "2026",
    repo: "https://github.com/Umarfarook1/Tiny-diffusion",
  },
  {
    slug: "nano-llm",
    title: "Nano-LLM-from-scratch",
    type: "language model · from scratch",
    metric: "257 offline tests · val 4.94 to 2.90 on CPU",
    year: "jul 2026",
    yearShort: "2026",
    repo: "https://github.com/Umarfarook1/Nano-LLM-from-scratch",
  },
  {
    slug: "plate-blurring",
    title: "License Plate Privacy Blurring",
    type: "computer vision",
    category: "Computer vision",
    metric: "mAP@0.5 0.782 · recall 0.739",
    year: "jun 2026",
    yearShort: "2026",
    repo: "https://github.com/Umarfarook1/street-view-plate-blurring",
    also: {
      label: "notebook",
      href: "https://nbviewer.org/github/Umarfarook1/street-view-plate-blurring/blob/main/notebook.ipynb",
    },
  },
  {
    slug: "tempo",
    title: "TEMPO",
    type: "browser game · playable",
    metric: "120 Hz fixed-step sim · zero sprite assets",
    year: "jul 2026",
    yearShort: "2026",
    repo: "https://github.com/Umarfarook1/tempo",
    also: { label: "play", href: "https://tempo-vert-nine.vercel.app" },
  },
  {
    slug: "ipl-analytics",
    title: "IPL Franchise Analytics",
    type: "data analysis",
    metric: "ROC-AUC 0.547 · best of 7 models",
    year: "jun 2026",
    yearShort: "2026",
    repo: "https://github.com/Umarfarook1/ipl-data-analysis",
    also: {
      label: "notebook",
      href: "https://nbviewer.org/github/Umarfarook1/ipl-data-analysis/blob/main/notebook.ipynb",
    },
  },
  {
    slug: "shorts-prediction",
    title: "Shorts Performance Prediction",
    type: "ML analysis · negative result",
    metric: "p = 0.955 · no signal, published anyway",
    year: "jun 2026",
    yearShort: "2026",
    repo: "https://github.com/Umarfarook1/youtube-shorts-performance-prediction",
    also: {
      label: "notebook",
      href: "https://nbviewer.org/github/Umarfarook1/youtube-shorts-performance-prediction/blob/main/notebook.ipynb",
    },
  },
];

// The four that appear in Chapter III, in the order the chapter lists them.
export const relatedSlugs = [
  "cargo-concierge",
  "mcp-bigquery-evals",
  "trustbench",
  "plate-blurring",
] as const;

export const related = relatedSlugs.map(
  (slug) => projects.find((p) => p.slug === slug) as Project,
);

export const closedSourceNote =
  "Two production systems at Hypeon AI are closed source, ask me about them.";

export const allReposLink = "every repo on github.com/Umarfarook1";

// The description shown in the work detail panel.
export function overviewOf(p: Project): string {
  return p.overview ?? `${p.type} · ${p.metric}`;
}
