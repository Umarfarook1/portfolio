"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { TokenStream } from "@/components/ui/TokenStream";
import { easeExpoOut } from "@/lib/motion";

// Bone band: the inverted-ramp world. The method reads as a lab notebook —
// four stages streaming in like a terminal log, each linking the repo where
// it can be watched working. Every figure below is in that repo's README.
const stages = [
  {
    id: "01",
    name: "orchestrate",
    body: "I route each request through intent, retrieval and composition stages, and stream progress while they run. One quote costs five to six model calls. p50 is 3.5 seconds.",
    proof: "Cargo Concierge",
    href: "https://github.com/Umarfarook1/Cargo-Concierge",
  },
  {
    id: "02",
    name: "ground",
    body: "I put the vector store behind a Protocol so the backend is a one-file swap, and I measure the rerank instead of assuming it. Below a confidence floor the answer comes back as “I don’t know” plus the closest passage. Citations are required or the answer is rejected.",
    proof: "RAG Document QA · v0.0.1",
    href: "https://github.com/Umarfarook1/rag-document-qa",
  },
  {
    id: "03",
    name: "constrain",
    body: "I dry-run every BigQuery call and refuse anything that would scan past 100 MB. Seven read-only tools, seven stable error codes an agent can switch on. There is no write path.",
    proof: "mcp-bigquery-evals",
    href: "https://github.com/Umarfarook1/mcp-bigquery-evals",
  },
  {
    id: "04",
    name: "measure",
    body: "I score every answer on eight metrics, five judged and three deterministic, then calibrate the judge against human labels with Cohen’s kappa. When a slice regresses I run McNemar’s test before I call it real. 82 tests run offline with no API key.",
    proof: "TrustBench",
    href: "https://github.com/Umarfarook1/trustbench",
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
          <p className="mono-label hidden text-bonelo/70 sm:block">proof links under every stage</p>
        </div>

        <TokenStream
          text="Same four stages on every project."
          wonkWord="stages"
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
                {/* navlink resolves to `lo`, which fails contrast on bone, so the
                    proof link carries boneink with the bone-band crimson on hover. */}
                <span className="mt-2 block text-boneink">
                  proof ·{" "}
                  <Link
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-boneink/30 underline-offset-4 transition-colors duration-150 hover:text-crimson"
                  >
                    {s.proof} ↗
                  </Link>
                </span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
