import { Reveal } from "@/components/ui/Reveal";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
import { Odometer } from "@/components/ui/Odometer";

const metrics = [
  { value: "80%", label: "strict 7-field extraction", source: "Cargo Concierge" },
  { value: "+33 pts", label: "from the instruction block", source: "Cargo ablation" },
  { value: "~$0.002", label: "cost per agent quote", source: "Cargo Concierge" },
  { value: "6", label: "trust dimensions", source: "TrustBench" },
  { value: "100 MB", label: "query cost cap", source: "mcp-bigquery-evals" },
];

// Table 01: a manila divider sheet bound into the document. Values tick up
// once like a mechanical counter — measurement as motion.
export function SelectedResults() {
  return (
    <section className="relative py-6">
      <div className="section-shell">
        <Reveal className="plate relative overflow-hidden border-t-2 border-foreground/20 border-t-foreground bg-manila">
          <RegistrationMark className="absolute right-3 top-3 h-3.5 w-3.5 text-foreground/40" />

          <div className="border-b border-foreground/12 px-6 py-4">
            <p className="kicker text-foreground">
              Table 01 · Selected results
            </p>
          </div>

          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`px-6 py-7 ${i !== 0 ? "border-t border-foreground/10 md:border-t-0 md:border-l" : ""} ${
                  i % 2 === 1 ? "border-l border-foreground/10" : ""
                } md:border-l lg:first:border-l-0`}
              >
                <dt className="display text-3xl text-foreground sm:text-4xl">
                  <Odometer value={m.value} underline={i === 0} />
                </dt>
                <dd className="mt-2.5 text-xs leading-5 text-muted-foreground">{m.label}</dd>
                <dd className="mt-2 font-mono text-[9px] uppercase tracking-wider text-accent">{m.source}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
