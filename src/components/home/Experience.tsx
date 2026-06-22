import { Reveal } from "@/components/ui/Reveal";

const roles = [
  {
    when: "2025 → Now",
    title: "AI Engineer",
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
    title: "Backend Developer Intern",
    org: "Synclovis Systems",
    body: "Built REST services for event management and contributed retrieval and guardrail work to an internal healthcare assistant grounded in clinical documents.",
    tags: ["Node.js", "Express", "MySQL", "FAISS"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="section-shell py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <Reveal>
          <p className="kicker">Experience</p>
          <h2 className="section-title">
            From model behavior to <span className="serif plasma-text">production behavior.</span>
          </h2>
          <div className="mt-8 rounded-xl border-l-2 border-primary/40 bg-card/40 py-4 pl-5 pr-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Education</p>
            <p className="mt-2 text-sm font-medium text-foreground">B.Tech · Computer Science</p>
            <p className="mt-1 text-xs text-muted-foreground">K.S.R.M College of Engineering · 8.14 / 10</p>
          </div>
        </Reveal>

        <ol className="border-t border-border/70">
          {roles.map((role, index) => (
            <Reveal key={`${role.org}-${role.title}`} delay={index * 0.06}>
              <li className="group grid grid-cols-[3rem_1fr] items-start gap-x-6 gap-y-3 border-b border-border/70 py-7 transition-colors hover:bg-card/40 sm:grid-cols-[4.5rem_1fr_8rem]">
                <span className="font-[family-name:var(--font-display)] text-3xl font-semibold text-foreground/20 transition-colors group-hover:text-primary sm:text-4xl">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{role.title}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{role.org}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">{role.body}</p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                    {role.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] text-foreground/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <time className="col-start-2 font-mono text-[10px] uppercase tracking-wider text-primary sm:col-start-3 sm:text-right">
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
