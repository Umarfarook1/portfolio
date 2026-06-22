import { Reveal } from "@/components/ui/Reveal";
import { RegistrationMark } from "@/components/ui/RegistrationMark";

const metrics = [
  { value: "80%", label: "strict 7-field extraction", source: "Cargo Concierge" },
  { value: "~$0.002", label: "cost per agent quote", source: "Cargo Concierge" },
  { value: "7", label: "eval trust dimensions", source: "TrustBench" },
  { value: "5,703", label: "FinDER eval triplets", source: "RAG Document QA" },
  { value: "100 MB", label: "query cost cap", source: "mcp-bigquery-evals" },
];

export function SelectedResults() {
  return (
    <section className="relative py-6">
      <div className="section-shell">
        <Reveal className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm">
          <RegistrationMark className="absolute left-3 top-3 h-3.5 w-3.5" />
          <RegistrationMark className="absolute right-3 top-3 h-3.5 w-3.5" />

          <div className="border-b border-border/60 px-6 py-4">
            <p className="kicker">Selected results · measured</p>
          </div>

          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`group border-border/60 px-6 py-7 ${i !== 0 ? "border-t md:border-t-0 md:border-l" : ""} ${
                  i % 2 === 1 ? "border-l md:border-l" : ""
                } lg:border-l lg:first:border-l-0`}
              >
                <dt className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-4xl">
                  {m.value}
                </dt>
                <dd className="mt-2 text-xs leading-5 text-muted-foreground">{m.label}</dd>
                <dd className="mt-2 font-mono text-[9px] uppercase tracking-wider text-primary/70">{m.source}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
