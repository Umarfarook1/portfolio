"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TokenStream } from "@/components/ui/TokenStream";
import { easeExpoOut } from "@/lib/motion";

// Bone band: the inverted-ramp world. The method reads as a lab notebook —
// four stages streaming in like a terminal log, each naming the repo where
// it can be watched working.
const stages = [
  {
    id: "01",
    name: "orchestrate",
    body: "Route intent, retrieve context, call tools, stream progress, fail over cleanly across providers.",
    proof: "Cargo-Concierge",
  },
  {
    id: "02",
    name: "ground",
    body: "Hybrid search, reranking, metadata filters, schema discovery, natural-language access to warehouses.",
    proof: "rag-document-qa",
  },
  {
    id: "03",
    name: "constrain",
    body: "Structured outputs, validation, policy gates, deterministic business logic, cost-aware execution.",
    proof: "mcp-bigquery-evals",
  },
  {
    id: "04",
    name: "measure",
    body: "Golden sets, regression slices, calibrated judges, latency and cost traces, failure attribution.",
    proof: "trustbench",
  },
];

export function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });

  return (
    <section id="method" className="on-bone relative py-28 sm:py-36">
      <div className="shell">
        <div className="flex items-baseline justify-between border-b border-boneink/15 pb-5">
          <p className="mono-label text-bonelo">03 / method</p>
          <p className="mono-label hidden text-bonelo/70 sm:block">the same four stages, every project</p>
        </div>

        <TokenStream
          text="Route, ground, constrain, measure."
          wonkWord="measure."
          className="display mt-10 max-w-4xl text-[clamp(2rem,4.5vw,3.6rem)] text-boneink"
        />

        <div ref={ref} className="mt-14 max-w-3xl font-mono text-[13px] leading-relaxed sm:text-sm">
          {stages.map((s, i) => (
            <motion.div
              key={s.id}
              className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-boneink/10 py-6 sm:grid-cols-[4rem_11rem_1fr]"
              initial={{ opacity: 0, x: -14 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.7, ease: easeExpoOut, delay: i * 0.14 }}
            >
              <span className="tabular text-bonelo/70">[{s.id}]</span>
              <span className="text-crimson">▸ {s.name}</span>
              <span className="col-span-2 mt-2 text-bonelo sm:col-span-1 sm:mt-0">
                {s.body}
                <span className="mt-2 block text-boneink">proof · {s.proof}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
