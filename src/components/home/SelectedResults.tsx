import { Reveal } from "@/components/ui/Reveal";
import { RegistrationMark } from "@/components/ui/RegistrationMark";

const metrics = [
  { value: "80%", label: "strict 7-field extraction", source: "Cargo Concierge" },
  { value: "+33 pts", label: "from the instruction block", source: "Cargo ablation" },
  { value: "~$0.002", label: "cost per agent quote", source: "Cargo Concierge" },
  { value: "6", label: "trust dimensions", source: "TrustBench" },
  { value: "100 MB", label: "query cost cap", source: "mcp-bigquery-evals" },
];

export function SelectedResults() {
  return (
    <section className="relative py-6">
      <div className="section-shell">
        <Reveal className="relative overflow-hidden rounded-2xl border border-foreground/15 bg-card">
          <RegistrationMark className="absolute left-3 top-3 h-3.5 w-3.5 text-foreground/40" />
          <RegistrationMark className="absolute right-3 top-3 h-3.5 w-3.5 text-foreground/40" />

          <div className="border-b border-foreground/12 px-6 py-4">
            <p className="kicker text-foreground">Selected results · measured</p>
          </div>

          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`group px-6 py-7 ${i !== 0 ? "border-t border-foreground/10 md:border-t-0 md:border-l" : ""} ${
                  i % 2 === 1 ? "border-l border-foreground/10" : ""
                } md:border-l lg:first:border-l-0`}
              >
                <dt className="relative inline-block font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  {m.value}
                  <span className="absolute -bottom-1 left-0 h-2 w-0 bg-accent transition-all duration-500 group-hover:w-full" aria-hidden="true" />
                </dt>
                <dd className="mt-2.5 text-xs leading-5 text-muted-foreground">{m.label}</dd>
                <dd className="mt-2 font-mono text-[9px] uppercase tracking-wider text-foreground/50">{m.source}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
