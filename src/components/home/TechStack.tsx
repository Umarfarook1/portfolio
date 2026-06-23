import { Reveal } from "@/components/ui/Reveal";
import { RegistrationMark } from "@/components/ui/RegistrationMark";

const stack = [
  { label: "AI systems", items: ["PyTorch", "LangGraph", "LangChain", "Gemini", "OpenAI", "Hugging Face"] },
  { label: "Backend + data", items: ["Python", "FastAPI", "PostgreSQL", "BigQuery", "Redis", "Pydantic"] },
  { label: "Delivery", items: ["GCP", "AWS", "Docker", "GitHub Actions", "Prometheus", "Sentry"] },
  { label: "Interface", items: ["TypeScript", "Next.js", "React", "Tailwind CSS", "SSE"] },
];

export function TechStack() {
  return (
    <section id="stack" className="section-shell py-24 sm:py-28">
      <Reveal className="flex flex-col gap-5 border-b border-foreground/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="kicker text-foreground">Working set</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight sm:text-5xl">
            Tools selected by constraint.
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          A practical stack for shipping reliable AI products, from experiments to observable services.
        </p>
      </Reveal>

      <div className="relative mt-2 grid md:grid-cols-2 lg:grid-cols-4">
        <RegistrationMark className="absolute -top-1 right-0 hidden h-3.5 w-3.5 text-foreground/40 lg:block" />
        {stack.map((group, index) => (
          <Reveal
            key={group.label}
            delay={index * 0.06}
            className="border-b border-foreground/15 py-7 md:px-6 md:first:pl-0 lg:border-r lg:last:border-r-0"
          >
            <h3 className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground">
              <span className="h-2 w-2 bg-accent" aria-hidden="true" />
              {group.label}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-foreground/15 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
