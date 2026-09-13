import { SectionHeader } from "@/components/ui/SectionHeader";

const checkpoints = [
  {
    when: "Oct 2024 → now",
    title: "Founding ML Engineer",
    org: "HypeOn AI",
    body: "I own the LLM orchestration service: routing, intent and composition sub-agents streaming over SSE, plus NL-to-SQL over BigQuery that dry-runs every query before it costs anything. Claude Haiku is primary, Gemini is the fallback.",
    tags: "LangChain · FastAPI · BigQuery · Cloud Run · Claude · Gemini",
  },
  {
    when: "Jun → Sep 2024",
    title: "Backend Developer Intern",
    org: "Synclovis Systems",
    body: "I built REST services in Node, Express and MySQL for an event-management app. I also added LangChain and FAISS retrieval to an internal LLM health assistant, with guardrails that refuse out-of-scope questions.",
    tags: "Node · Express · MySQL · LangChain · FAISS",
  },
];

export function Checkpoints() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          label="Experience"
          title="Three roles since 2024."
          aside="where the numbers came from"
        />

        <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_16rem] lg:gap-20">
          <ol className="border-l border-line">
            {checkpoints.map((c) => (
              <li key={c.org} className="relative pb-12 pl-8 last:pb-0 sm:pl-10">
                <span
                  className="absolute -left-[5px] top-2 block h-[9px] w-[9px] rounded-full bg-accent"
                  aria-hidden="true"
                />
                <p className="tabular text-[13px] text-muted">{c.when}</p>
                <h3 className="h3 mt-2">{c.title}</h3>
                <p className="mt-1 text-[15px] text-muted">{c.org}</p>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted">{c.body}</p>
                <p className="mt-3 text-[13px] text-muted">{c.tags}</p>
              </li>
            ))}
          </ol>

          <aside>
            <div className="border-t border-line pt-5">
              <p className="label">Education</p>
              <p className="mt-3 text-[15px]">B.Tech · Computer Science · 2024</p>
              <p className="mt-1 text-[15px] leading-6 text-muted">
                K.S.R.M College of Engineering · 8.14 / 10
              </p>
            </div>
            <div className="mt-8 border-t border-line pt-5">
              <p className="label">Certifications</p>
              <ul className="mt-3 space-y-2 text-[15px] leading-6 text-muted">
                <li>Oracle OCI Data Science Professional · 2025</li>
                <li>Oracle OCI AI Foundations Associate · 2025</li>
                <li>Azure AI Fundamentals · AWS Cloud Foundations</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
