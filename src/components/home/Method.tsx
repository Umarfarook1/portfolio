import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Four stages, each linking the repo where it can be watched working. Every
// figure below is in that repo's README.
const stages = [
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

export function Method() {
  return (
    <section id="method" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          label="Method"
          title="Same four stages on every project."
          aside="proof links under every stage"
        />

        <ol className="mt-4">
          {stages.map((s) => (
            <li
              key={s.id}
              className="grid grid-cols-[2rem_1fr] gap-x-4 border-b border-line py-7 sm:grid-cols-[2.5rem_10rem_1fr] sm:gap-x-6"
            >
              <span className="tabular pt-1 text-[13px] text-muted">{s.id}</span>
              <h3 className="h3">{s.name}</h3>
              <div className="col-span-2 mt-3 max-w-2xl sm:col-span-1 sm:mt-0">
                <p className="text-[15px] leading-7 text-muted">{s.body}</p>
                <p className="mt-3 text-[14px]">
                  <span className="text-muted">proof · </span>
                  <Link href={s.href} target="_blank" rel="noreferrer" className="link">
                    {s.proof} ↗
                  </Link>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
