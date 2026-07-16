"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rise } from "@/components/ui/Rise";
import { TokenStream } from "@/components/ui/TokenStream";
import { springSettle } from "@/lib/motion";

// Experience as checkpoints on a training run: a vertical hairline axis with
// nodes that ignite through the ramp as they enter the viewport.
const checkpoints = [
  {
    when: "2024 → now",
    title: "ML Engineer",
    org: "HypeOn AI",
    body: "Production AI for D2C trend intelligence: multi-stage orchestration, RAG, NL-to-SQL over BigQuery with cost guardrails, observable deployments on GCP.",
    tags: "LangChain · FastAPI · BigQuery · Cloud Run · Gemini",
  },
  {
    when: "2024 → 2025",
    title: "Freelance ML / AI Engineer",
    org: "Independent",
    body: "AI-assisted inventory system for a retail client: invoice extraction, demand forecasting, real-time stock alerts, operational dashboard.",
    tags: "Python · scikit-learn · OpenAI · SQL",
  },
  {
    when: "2024",
    title: "Software Engineering Intern",
    org: "Synclovis Systems",
    body: "FastAPI and Flask services for an LLM healthcare assistant over 500+ clinical documents, LangChain + FAISS retrieval, AWS deployment, guardrails that cut hallucinations on out-of-scope queries.",
    tags: "FastAPI · LangChain · FAISS · AWS",
  },
];

function Node({ index }: { index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -140px 0px" });
  return (
    <span ref={ref} className="absolute -left-[5px] top-9 block h-[11px] w-[11px]">
      <motion.span
        className="block h-full w-full rounded-full"
        style={{ background: "var(--color-ember)" }}
        initial={{ scale: 0.3, opacity: 0.25 }}
        animate={inView ? { scale: 1, opacity: 1 } : undefined}
        transition={{ ...springSettle, delay: index * 0.05 }}
      />
    </span>
  );
}

export function Checkpoints() {
  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="shell">
        <div className="flex items-baseline justify-between border-b border-line pb-5">
          <p className="mono-label text-lo">04 / checkpoints</p>
          <p className="mono-label hidden text-lo/60 sm:block">where the numbers came from</p>
        </div>

        <TokenStream
          text="Checkpoints on the run."
          wonkWord="run."
          className="display mt-10 max-w-3xl text-[clamp(2rem,4.5vw,3.6rem)] text-hi"
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_18rem]">
          <ol className="relative border-l border-line">
            {checkpoints.map((c, i) => (
              <li key={c.org} className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
                <Node index={i} />
                <Rise delay={i * 0.06}>
                  <p className="mono-label tabular text-ember">{c.when}</p>
                  <h3 className="display mt-3 text-3xl text-hi sm:text-4xl">{c.title}</h3>
                  <p className="mono-label mt-2 text-lo">{c.org}</p>
                  <p className="mt-4 max-w-xl text-[15px] leading-7 text-lo">{c.body}</p>
                  <p className="mono-label mt-4 text-lo/60">{c.tags}</p>
                </Rise>
              </li>
            ))}
          </ol>

          <Rise delay={0.15} className="lg:pt-2">
            <div className="border-t border-line pt-6">
              <p className="mono-label text-lo/60">education</p>
              <p className="mt-3 text-sm text-hi">B.Tech · Computer Science · 2024</p>
              <p className="mt-1 text-sm leading-6 text-lo">
                K.S.R.M College of Engineering · 8.14 / 10
              </p>
            </div>
            <div className="mt-8 border-t border-line pt-6">
              <p className="mono-label text-lo/60">certifications</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-lo">
                <li>Oracle OCI Data Science Professional · 2025</li>
                <li>Oracle OCI AI Foundations Associate · 2025</li>
                <li>Azure AI Fundamentals · AWS Cloud Foundations</li>
              </ul>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}
