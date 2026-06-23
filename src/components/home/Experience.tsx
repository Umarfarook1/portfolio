import { Reveal } from "@/components/ui/Reveal";
import { Highlight } from "@/components/ui/Highlight";

const roles = [
  {
    when: "2024 → Now",
    title: "ML Engineer",
    org: "HypeOn AI",
    body: "Building production AI for D2C trend intelligence: multi-stage orchestration, RAG, NL-to-SQL over BigQuery with cost guardrails, and observable deployments on GCP.",
    tags: ["LangChain", "FastAPI", "BigQuery", "Cloud Run", "Gemini"],
  },
  {
    when: "2024 → 2025",
    title: "Freelance ML / AI Engineer",
    org: "Independent",
    body: "Delivered an AI-assisted inventory system spanning invoice extraction, demand forecasting, real-time stock alerts, and an operational dashboard for a retail client.",
    tags: ["Python", "Scikit-learn", "OpenAI", "SQL"],
  },
  {
    when: "2024",
    title: "Software Engineering Intern",
    org: "Synclovis Systems",
    body: "Built FastAPI and Flask services for an LLM healthcare assistant indexing 500+ clinical documents, with a LangChain and FAISS retrieval pipeline, AWS deployment, and guardrails to reduce hallucinations on out-of-scope queries.",
    tags: ["FastAPI", "LangChain", "FAISS", "AWS"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="section-shell py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <p className="kicker text-foreground">Experience</p>
          <h2 className="section-title mt-4">
            Model behavior to <Highlight>production</Highlight> behavior.
          </h2>
          <div className="mt-8 border-l-2 border-accent py-1 pl-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Education</p>
            <p className="mt-2 text-sm font-semibold text-foreground">B.Tech · Computer Science · 2024</p>
            <p className="mt-1 text-xs text-muted-foreground">K.S.R.M College of Engineering (JNTU Anantapur) · 8.14 / 10</p>
          </div>
          <div className="mt-6 border-l-2 border-foreground/15 py-1 pl-5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Certifications</p>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>Oracle OCI Data Science Professional · 2025</li>
              <li>Oracle OCI AI Foundations Associate · 2025</li>
              <li>Azure AI Fundamentals · AWS Cloud Foundations</li>
            </ul>
          </div>
        </Reveal>

        <ol className="border-t border-foreground/15">
          {roles.map((role, index) => (
            <Reveal key={`${role.org}-${role.title}`} delay={index * 0.06}>
              <li className="group grid grid-cols-[3rem_1fr] items-start gap-x-6 gap-y-3 border-b border-foreground/15 py-7 transition-colors hover:bg-card sm:grid-cols-[5rem_1fr_8rem]">
                <span className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-foreground/15 transition-colors group-hover:text-foreground sm:text-5xl">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-foreground">{role.title}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-foreground/55">{role.org}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">{role.body}</p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                    {role.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] text-foreground/55">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <time className="col-start-2 font-mono text-[10px] uppercase tracking-wider text-foreground sm:col-start-3 sm:text-right">
                  {role.when}
                </time>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
