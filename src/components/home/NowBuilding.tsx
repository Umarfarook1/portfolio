"use client";

import { Github, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionBranch } from "@/components/animations/SectionBranch";

type Status = "shipping" | "building" | "live";

interface Project {
    index: string;
    title: string;
    pitch: string;
    why: string;
    stack: string[];
    eta: string;
    status: Status;
    repo?: string;
    live?: string;
    blog?: string;
}

const projects: Project[] = [
    {
        index: "01",
        title: "BigQuery NL2SQL MCP Server",
        pitch: "Query BigQuery in natural language from any MCP-compatible client. Schema discovery, cost caps, query explanation, safety guardrails.",
        why: "MCP is an underserved lane. NL2SQL over warehouses is something I ship at work. First project.",
        stack: ["Python", "FastMCP", "BigQuery", "Pydantic"],
        eta: "Shipping in 2 weeks",
        status: "shipping",
    },
    {
        index: "02",
        title: "NL2SQL Eval Framework + Public Leaderboard",
        pitch: "Open benchmark of major LLMs (GPT, Gemini, Llama, and others) on real BigQuery-style schemas. Live leaderboard updated as new models drop.",
        why: "Evals are the most underserved skill in production AI. A live leaderboard is also a content engine.",
        stack: ["Python", "DuckDB", "Next.js", "Vercel", "Spider"],
        eta: "Shipping in 4-5 weeks",
        status: "shipping",
    },
    {
        index: "03",
        title: "Voice Mock Interview Coach",
        pitch: "Real-time full-duplex voice agent that runs mock AI engineer interviews and gives feedback. Latency-tuned for conversational feel.",
        why: "Voice is visually impressive and rare. Solves a real pain (mine, and every job seeker's).",
        stack: ["OpenAI Realtime", "WebRTC", "Next.js", "FastAPI"],
        eta: "Shipping in 7-8 weeks",
        status: "shipping",
    },
    {
        index: "04",
        title: "Personal AI Research Assistant",
        pitch: "Ingest arxiv, blogs, PDFs into a personal RAG. Weekly digest, semantic search across your library, local-first option via Ollama.",
        why: "I need it. Tools you actually use end up well-built.",
        stack: ["Python", "Postgres", "pgvector", "Ollama", "FastAPI"],
        eta: "Shipping in 10-11 weeks",
        status: "shipping",
    },
    {
        index: "05",
        title: "prod-llm-starter",
        pitch: "Opinionated production template for LLM apps. FastAPI + LangGraph + Pydantic + Postgres/pgvector + eval harness + cost dashboard + auth + GHA. The thing every AI engineer wishes existed on day one.",
        why: "Flagship. Utility repos compound. Forces deep understanding of every choice.",
        stack: ["FastAPI", "LangGraph", "pgvector", "Prometheus", "Docker", "GHA"],
        eta: "Shipping in 12-13 weeks",
        status: "shipping",
    },
];

const statusStyles: Record<Status, { label: string; cls: string }> = {
    shipping: {
        label: "Shipping Soon",
        cls: "border-amber-400/40 bg-amber-950/40 text-amber-200",
    },
    building: {
        label: "Building",
        cls: "border-stone-300/40 bg-stone-800/60 text-stone-100",
    },
    live: {
        label: "Live",
        cls: "border-emerald-400/40 bg-emerald-950/40 text-emerald-200",
    },
};

export function NowBuilding() {
    return (
        <section
            className="relative container mx-auto px-6 py-28"
            id="now-building"
        >
            <SectionBranch position="top-right" scale={1} seed={11} />

            <FadeIn>
                <div className="relative z-[2] mb-16 max-w-2xl">
                    <p className="mb-2 font-[family-name:var(--font-display)] text-2xl italic text-stone-300/85">
                        now shipping
                    </p>
                    <h2 className="font-[family-name:var(--font-display)] text-5xl font-bold leading-tight tracking-tight text-stone-100 sm:text-6xl">
                        Building in public
                    </h2>
                    <p className="mt-4 text-stone-400">
                        Five OSS projects across the lanes I care about. Each
                        ships with evals, a public URL, and a write-up on the
                        tradeoffs. Live status below.
                    </p>
                </div>
            </FadeIn>

            <Stagger className="relative z-[2] grid gap-5">
                {projects.map((p) => (
                    <StaggerItem key={p.index}>
                        <ProjectCard project={p} />
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
}

function ProjectCard({ project: p }: { project: Project }) {
    const status = statusStyles[p.status];

    return (
        <Card className="group border-stone-700/40 bg-stone-950/50 shadow-md transition-colors duration-700 hover:border-stone-400/40">
            <div className="grid gap-6 md:grid-cols-[80px_1fr_auto] md:items-start">
                <div className="font-[family-name:var(--font-display)] text-5xl italic text-stone-300/30 transition-colors duration-700 group-hover:text-stone-300/70 md:text-6xl">
                    {p.index}
                </div>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-stone-100 sm:text-3xl">
                            {p.title}
                        </h3>
                        <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${status.cls}`}
                        >
                            {status.label}
                        </span>
                    </div>

                    <p className="text-stone-300">{p.pitch}</p>

                    <p className="border-l-2 border-stone-300/30 pl-4 text-sm italic text-stone-400">
                        {p.why}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                            <span
                                key={s}
                                className="rounded border border-stone-700 bg-stone-900/80 px-2 py-0.5 font-mono text-[11px] text-stone-300"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-start gap-3 md:items-end">
                    <div className="font-mono text-xs text-stone-500">
                        {p.eta}
                    </div>
                    <div className="flex gap-2">
                        {p.repo && <ProjectLink href={p.repo} icon={Github} label="Repo" />}
                        {p.live && <ProjectLink href={p.live} icon={ExternalLink} label="Live" />}
                        {p.blog && <ProjectLink href={p.blog} icon={FileText} label="Blog" />}
                    </div>
                </div>
            </div>
        </Card>
    );
}

function ProjectLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
    return (
        <Link
            href={href}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-md border border-stone-700 bg-stone-900/80 px-2.5 py-1 font-mono text-[11px] text-stone-300 transition-colors duration-500 hover:border-amber-300/40 hover:bg-amber-950/30 hover:text-amber-100"
        >
            <Icon className="h-3 w-3" />
            {label}
        </Link>
    );
}
