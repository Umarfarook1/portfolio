"use client";

import { Workflow, Search, Database, Mic, LineChart } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionBranch } from "@/components/animations/SectionBranch";

const lanes = [
    {
        title: "LLM Orchestration",
        body: "Multi-stage agent flows with routing, intent, retrieval, composition. Streaming responses, structured outputs, fallback chains across multiple LLM providers.",
        icon: Workflow,
    },
    {
        title: "Retrieval & RAG",
        body: "Hybrid retrieval (BM25 + vector + reranker), chunking strategies, metadata filtering, multimodal RAG. Tuning that survives real document corpora.",
        icon: Search,
    },
    {
        title: "Natural Language to SQL",
        body: "Schema discovery, synonym matching, cost-capped query generation over BigQuery and Postgres. With a real eval harness, not vibes.",
        icon: Database,
    },
    {
        title: "Voice & Realtime Agents",
        body: "Full-duplex voice agents on top of streaming speech models. Latency engineering, interruption handling, turn-taking that feels human.",
        icon: Mic,
    },
    {
        title: "Evals & Observability",
        body: "Eval harnesses, regression suites, cost dashboards. The unsexy work that separates a prototype from a system you can defend.",
        icon: LineChart,
    },
];

export function WhatIBuild() {
    return (
        <section
            className="relative container mx-auto px-6 py-28"
            id="what-i-build"
        >
            <SectionBranch position="top-left" scale={0.9} seed={5} />

            <FadeIn>
                <div className="relative z-[2] mb-16 max-w-2xl">
                    <p className="mb-2 font-[family-name:var(--font-display)] text-2xl italic text-stone-300/85">
                        what i actually do
                    </p>
                    <h2 className="font-[family-name:var(--font-display)] text-5xl font-bold leading-tight tracking-tight text-stone-100 sm:text-6xl">
                        Five lanes, one focus
                    </h2>
                </div>
            </FadeIn>

            <Stagger className="relative z-[2] grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {lanes.map((lane) => (
                    <StaggerItem key={lane.title} className="h-full">
                        <Card className="group h-full border-stone-700/40 bg-stone-950/50 shadow-md transition-colors duration-700 hover:border-stone-400/40">
                            <div className="mb-4 inline-flex rounded-xl border border-stone-700/40 bg-stone-900/60 p-2.5 text-stone-200 transition-colors duration-700 group-hover:text-amber-200">
                                <lane.icon className="h-5 w-5" />
                            </div>
                            <h3 className="mb-2 font-[family-name:var(--font-display)] text-2xl font-normal text-stone-100">
                                {lane.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-stone-400">
                                {lane.body}
                            </p>
                        </Card>
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
}
