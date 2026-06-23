import { Braces, Database, Gauge, Route } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const capabilities = [
  {
    title: "Orchestrate",
    subtitle: "Agents and workflows",
    body: "Route intent, retrieve context, call tools, stream progress, and fail over cleanly across model providers.",
    proof: "Cargo Concierge",
    icon: Route,
  },
  {
    title: "Ground",
    subtitle: "Retrieval and data",
    body: "Hybrid search, reranking, metadata filters, schema discovery, and natural-language access to warehouses.",
    proof: "RAG Document QA",
    icon: Database,
  },
  {
    title: "Constrain",
    subtitle: "Typed boundaries",
    body: "Structured outputs, validation, policy gates, deterministic business logic, and cost-aware execution.",
    proof: "mcp-bigquery-evals",
    icon: Braces,
  },
  {
    title: "Measure",
    subtitle: "Evals and operations",
    body: "Golden sets, regression slices, calibrated judges, latency and cost traces, and failure attribution.",
    proof: "TrustBench",
    icon: Gauge,
  },
];

export function WhatIBuild() {
  return (
    <section id="capabilities" className="section-shell py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="kicker text-foreground">How I build</p>
          <h2 className="section-title mt-4">
            The whole loop, not <span className="highlight">one model call</span>.
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">
            The valuable work sits around the model: deciding when it earns a place, controlling
            its inputs and outputs, and proving the result stays useful after launch.
          </p>
        </Reveal>

        <div className="border-t border-foreground/15">
          {capabilities.map((capability, index) => (
            <Reveal key={capability.title} delay={index * 0.05}>
              <article className="group grid gap-5 border-b border-foreground/15 py-7 transition-colors hover:bg-card sm:grid-cols-[64px_1fr_1.15fr] sm:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/20 text-foreground transition-colors group-hover:border-foreground group-hover:bg-accent">
                  <capability.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                    Stage 0{index + 1}
                  </span>
                  <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold tracking-tight text-foreground">
                    {capability.title}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-foreground/55">{capability.subtitle}</p>
                </div>
                <div>
                  <p className="text-sm leading-6 text-muted-foreground">{capability.body}</p>
                  <p className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-foreground/55">
                    <span className="h-2 w-2 bg-accent" aria-hidden="true" />
                    Proof · {capability.proof}
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
