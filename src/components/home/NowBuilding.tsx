import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { CircleArrow } from "@/components/ui/CircleArrow";
import { ArrowDiagonal } from "@/components/ui/Arrow";
import { Highlight } from "@/components/ui/Highlight";
import { ProjectCard, type Project } from "./ProjectCard";

const projects: (Project & { span: string })[] = [
  {
    title: "Cargo Concierge",
    type: "Agentic product",
    description:
      "A freight-forwarder copilot that turns an unstructured quote email into ranked airline options and a ready-to-send response, streaming every pipeline stage.",
    evidence: ["80% strict 7-field extraction", "~12s end-to-end", "~$0.002 per quote"],
    stack: ["Next.js", "Mastra", "Gemini", "Postgres"],
    repo: "https://github.com/Umarfarook1/Cargo-Concierge",
    live: "https://cargo-concierge.vercel.app",
    liveLabel: "Live demo",
    featured: true,
    span: "lg:col-span-2",
  },
  {
    title: "mcp-bigquery-evals",
    type: "Open-source infrastructure",
    description:
      "A read-only BigQuery MCP server with mandatory dry-run cost caps, stable agent-facing errors, and a result-equivalence NL-to-SQL evaluation harness.",
    evidence: ["7 MCP tools", "100 MB default cost cap", "PyPI release + CI"],
    stack: ["Python", "FastMCP", "BigQuery", "Pydantic"],
    repo: "https://github.com/Umarfarook1/mcp-bigquery-evals",
    live: "https://pypi.org/project/mcp-bigquery-evals/",
    liveLabel: "PyPI",
    featured: true,
    span: "lg:col-span-1",
  },
  {
    title: "TrustBench",
    type: "Evaluation system",
    description:
      "A production-readiness harness for AI support agents: versioned golden sets, calibrated LLM judges, deterministic policy checks, and regression diagnosis by ticket category.",
    evidence: ["6 trust dimensions", "Cohen's kappa judge calibration", "McNemar regression tests"],
    stack: ["Python", "Gemini", "Statistical tests", "Next.js"],
    repo: "https://github.com/Umarfarook1/trustbench",
    span: "lg:col-span-1",
  },
  {
    title: "RAG Document QA",
    type: "Retrieval system",
    description:
      "Citation-grounded document Q&A built around retriever evaluation, confidence gates, optional measured reranking, and provider-neutral protocols.",
    evidence: ["Recall@K + MRR harness", "Confidence-gated answers", "Pluggable vector store"],
    stack: ["Python", "Embeddings", "Reranking", "FastAPI"],
    repo: "https://github.com/Umarfarook1/rag-document-qa",
    span: "lg:col-span-1",
  },
  {
    title: "IPL 2008-2024: A Franchise Analytics Case Study",
    type: "Data analysis",
    description:
      "Analysis of 1,095 IPL matches (2008-2024): leakage-free features, PCA team clustering, and honest match-outcome modeling that names the data ceiling instead of hiding it.",
    evidence: ["1,095 matches across 17 seasons", "Field first wins 53.86% vs 45.38%", "XGBoost AUC 0.547 vs 0.500 baseline"],
    stack: ["Python", "pandas", "scikit-learn", "XGBoost"],
    repo: "https://github.com/Umarfarook1/ipl-data-analysis",
    span: "lg:col-span-1",
  },
  {
    title: "YouTube Shorts Performance Prediction",
    type: "ML analysis",
    description:
      "A rigorous negative result: no pre-publish feature predicts Shorts engagement above chance, and the one 95% model is a leakage trap.",
    evidence: ["Best honest macro-F1 0.334 vs 0.333", "Permutation test p = 0.955, no signal", "Caught leakage trap inflating to 95%"],
    stack: ["Python", "scikit-learn", "XGBoost", "SciPy"],
    repo: "https://github.com/Umarfarook1/youtube-shorts-performance-prediction",
    span: "lg:col-span-1",
  },
  {
    title: "License Plate Detection and Privacy Blurring",
    type: "Computer vision",
    description:
      "YOLOv8n plate detector (mAP@0.5 0.78) that auto-redacts number plates with a box-scaled Gaussian blur, leaving the scene sharp.",
    evidence: ["YOLOv8n mAP@0.5 0.782", "Precision 0.834, recall 0.739", "~4.1 ms inference, 3.0M params"],
    stack: ["Python", "YOLOv8", "PyTorch", "OpenCV"],
    repo: "https://github.com/Umarfarook1/street-view-plate-blurring",
    span: "lg:col-span-1",
  },
];

export function NowBuilding() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="kicker text-foreground">Selected work</p>
            <h2 className="section-title mt-4">
              Evidence over <Highlight>demos</Highlight>.
            </h2>
          </div>
          <div className="flex items-end gap-5">
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Systems chosen for what they prove: measured quality, explicit tradeoffs, failure
              handling, and detail enough to inspect the engineering, not just the interface.
            </p>
            <CircleArrow href="https://github.com/Umarfarook1" label="View all repositories on GitHub" external className="hidden sm:grid" />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} className={`h-full ${project.span}`} delay={index * 0.05}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}

          <Reveal className="h-full lg:col-span-1" delay={0.2}>
            <Link
              href="https://github.com/Umarfarook1"
              target="_blank"
              rel="noreferrer"
              className="lift group flex h-full min-h-[220px] flex-col justify-between rounded-2xl border border-foreground bg-accent p-8"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-foreground">More on GitHub</p>
              <div>
                <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-accent-foreground">
                  Browse every repo
                </p>
                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-accent-foreground">
                  github.com/Umarfarook1
                  <ArrowDiagonal className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
