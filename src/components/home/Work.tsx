import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Two production systems open the list. They carry no repo because the code is
// the employer's; the row renders as plain type instead of a link, and no
// production number is claimed that cannot be checked. Years are first-commit
// dates from git, not release dates.
const projects: {
  title: string;
  type: string;
  metric: string;
  year: string;
  repo: string | null;
  // Optional second door: the fastest path to actually running the thing.
  also?: { label: string; href: string };
}[] = [
  {
    title: "Conversational Research Agent",
    type: "production · closed source",
    metric: "5 sub-agents · SSE streaming",
    year: "2025 → now",
    repo: null,
  },
  {
    title: "NL-to-SQL over BigQuery",
    type: "production · closed source",
    metric: "schema introspection · dry-run cost guardrails",
    year: "2025 → now",
    repo: null,
  },
  {
    title: "Cargo Concierge",
    type: "agentic product",
    metric: "14/15 on 6 fields · 33 pts from the rules block",
    year: "may 2026",
    repo: "https://github.com/Umarfarook1/Cargo-Concierge",
    also: { label: "demo", href: "https://cargo-concierge.vercel.app" },
  },
  {
    title: "mcp-bigquery-evals",
    type: "open-source infra · PyPI",
    metric: "100 MB cost cap · 7 MCP tools",
    year: "may 2026",
    repo: "https://github.com/Umarfarook1/mcp-bigquery-evals",
    also: { label: "pypi", href: "https://pypi.org/project/mcp-bigquery-evals/" },
  },
  {
    title: "TrustBench",
    type: "evaluation system",
    metric: "82 offline tests · 8 scored metrics",
    year: "jun 2026",
    repo: "https://github.com/Umarfarook1/trustbench",
  },
  {
    title: "RAG Document QA",
    type: "retrieval system · v0.0.1",
    metric: "126 offline tests · retriever eval not yet run",
    year: "may 2026",
    repo: "https://github.com/Umarfarook1/rag-document-qa",
  },
  {
    title: "Tiny-diffusion",
    type: "generative model · from scratch",
    metric: "111 offline tests · smoke FID 338.7, samples not yet digits",
    year: "jul 2026",
    repo: "https://github.com/Umarfarook1/Tiny-diffusion",
  },
  {
    title: "Nano-LLM-from-scratch",
    type: "language model · from scratch",
    metric: "257 offline tests · val 4.94 → 2.90 on CPU",
    year: "jul 2026",
    repo: "https://github.com/Umarfarook1/Nano-LLM-from-scratch",
  },
  {
    title: "License Plate Privacy Blurring",
    type: "computer vision",
    metric: "mAP@0.5 0.782 · recall 0.739",
    year: "jun 2026",
    repo: "https://github.com/Umarfarook1/street-view-plate-blurring",
    also: {
      label: "notebook",
      href: "https://nbviewer.org/github/Umarfarook1/street-view-plate-blurring/blob/main/notebook.ipynb",
    },
  },
  {
    title: "TEMPO",
    type: "browser game · playable",
    metric: "120 Hz fixed-step sim · zero sprite assets",
    year: "jul 2026",
    repo: "https://github.com/Umarfarook1/tempo",
    also: { label: "play", href: "https://tempo-vert-nine.vercel.app" },
  },
  {
    title: "IPL Franchise Analytics",
    type: "data analysis",
    metric: "ROC-AUC 0.547 · best of 7 models",
    year: "jun 2026",
    repo: "https://github.com/Umarfarook1/ipl-data-analysis",
    also: {
      label: "notebook",
      href: "https://nbviewer.org/github/Umarfarook1/ipl-data-analysis/blob/main/notebook.ipynb",
    },
  },
  {
    title: "Shorts Performance Prediction",
    type: "ML analysis · negative result",
    metric: "p = 0.955 · no signal, published anyway",
    year: "jun 2026",
    repo: "https://github.com/Umarfarook1/youtube-shorts-performance-prediction",
    also: {
      label: "notebook",
      href: "https://nbviewer.org/github/Umarfarook1/youtube-shorts-performance-prediction/blob/main/notebook.ipynb",
    },
  },
];

export function Work() {
  return (
    <section id="work" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          label="Work"
          title="Ten repos and two I cannot show you."
          aside="the linked ones open on GitHub"
        />

        <ol className="mt-4">
          {projects.map((p, i) => (
            <li
              key={p.title}
              className="grid grid-cols-[2rem_1fr] gap-x-4 border-b border-line py-6 sm:grid-cols-[2.5rem_1fr_auto]"
            >
              <span className="tabular pt-1 text-[13px] text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                {p.repo ? (
                  <Link href={p.repo} target="_blank" rel="noreferrer" className="title-link h3">
                    {p.title}
                  </Link>
                ) : (
                  <span className="h3">{p.title}</span>
                )}
                <p className="mt-1.5 text-[15px] leading-6 text-muted">
                  {p.type} · {p.metric}
                </p>
                {(p.repo || p.also) && (
                  <p className="mt-2 flex flex-wrap gap-x-5 text-[14px]">
                    {p.repo && (
                      <Link href={p.repo} target="_blank" rel="noreferrer" className="link">
                        repository ↗
                      </Link>
                    )}
                    {p.also && (
                      <Link href={p.also.href} target="_blank" rel="noreferrer" className="link">
                        {p.also.label} ↗
                      </Link>
                    )}
                  </p>
                )}
              </div>

              <span className="tabular col-start-2 mt-2 text-[13px] text-muted sm:col-start-3 sm:mt-1 sm:text-right">
                {p.year}
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-8">
          <Link
            href="https://github.com/Umarfarook1"
            target="_blank"
            rel="noreferrer"
            className="link text-[15px]"
          >
            every repo on github.com/Umarfarook1 ↗
          </Link>
        </p>
      </div>
    </section>
  );
}
