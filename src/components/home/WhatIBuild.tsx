import { Reveal } from "@/components/ui/Reveal";

const stages = [
  {
    title: "Orchestrate",
    subtitle: "Agents and workflows",
    body: "Route intent, retrieve context, call tools, stream progress, and fail over cleanly across model providers.",
    proof: "Cargo Concierge",
  },
  {
    title: "Ground",
    subtitle: "Retrieval and data",
    body: "Hybrid search, reranking, metadata filters, schema discovery, and natural-language access to warehouses.",
    proof: "RAG Document QA",
  },
  {
    title: "Constrain",
    subtitle: "Typed boundaries",
    body: "Structured outputs, validation, policy gates, deterministic business logic, and cost-aware execution.",
    proof: "mcp-bigquery-evals",
  },
  {
    title: "Measure",
    subtitle: "Evals and operations",
    body: "Golden sets, regression slices, calibrated judges, latency and cost traces, and failure attribution.",
    proof: "TrustBench",
  },
];

export function WhatIBuild() {
  return (
    <section id="method" className="section-shell py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="kicker text-foreground">
            <span className="folio">03</span> Method
          </p>
          <h2 className="section-title mt-4">Route, ground, constrain, measure.</h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">
            The same four stages run through every project here, whatever the model underneath.
            Each stage names the repo where you can see it working.
          </p>
        </Reveal>

        <div className="border-t border-foreground/15">
          {stages.map((stage, index) => (
            <Reveal key={stage.title} delay={index * 0.05}>
              <article className="group grid gap-5 border-b border-foreground/15 py-7 transition-colors hover:bg-card sm:grid-cols-[64px_1fr_1.15fr] sm:items-start">
                <span className="folio pt-1.5 text-sm">§{index + 1}</span>
                <div>
                  <h3 className="display text-2xl text-foreground">{stage.title}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-foreground/55">{stage.subtitle}</p>
                </div>
                <div>
                  <p className="text-sm leading-6 text-muted-foreground">{stage.body}</p>
                  <p className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-foreground/55">
                    <span className="h-2 w-2 bg-accent" aria-hidden="true" />
                    Proof · {stage.proof}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
