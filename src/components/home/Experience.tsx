"use client";

import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionBranch } from "@/components/animations/SectionBranch";

interface Role {
    when: string;
    title: string;
    org: string;
    body: string;
    tags: string[];
}

const roles: Role[] = [
    {
        when: "Oct 2025 to Present",
        title: "AI Engineer",
        org: "HypeOn AI",
        body: "Building production LLM systems for D2C trend prediction. Multi-stage orchestration with routing/retrieval/composition, NL-to-SQL over BigQuery with cost guardrails, RAG pipelines with sentence-transformers, deployment on GCP Cloud Run with full observability.",
        tags: ["LangChain", "FastAPI", "BigQuery", "Cloud Run", "Gemini"],
    },
    {
        when: "Oct 2024 to Sep 2025",
        title: "Freelance ML / AI Engineer",
        org: "Independent",
        body: "Built an AI-powered inventory system for a retail client. LLM-based invoice extraction, demand forecasting with scikit-learn, real-time stock alerts, and a visualization dashboard for surfaced insights.",
        tags: ["Python", "Pandas", "Scikit-learn", "OpenAI", "SQL"],
    },
    {
        when: "Jun to Sep 2024",
        title: "Backend Developer Intern",
        org: "Synclovis Systems",
        body: "Built REST backend for an event-management web app. Also contributed to an internal LLM-based healthcare assistant, integrating RAG retrieval over clinical documents and adding guardrails.",
        tags: ["Node.js", "Express", "MySQL", "LangChain", "FAISS"],
    },
    {
        when: "2020 to 2024",
        title: "B.Tech, Computer Science",
        org: "K.S.R.M College of Engineering, JNTU Anantapur",
        body: "Graduated with CGPA 8.14 / 10.",
        tags: [],
    },
];

export function Experience() {
    return (
        <section
            className="relative container mx-auto px-6 py-28"
            id="experience"
        >
            <SectionBranch position="top-left" scale={0.85} seed={23} />

            <FadeIn>
                <div className="relative z-[2] mb-16 max-w-2xl">
                    <p className="mb-2 font-[family-name:var(--font-display)] text-2xl italic text-stone-300">
                        the track record
                    </p>
                    <h2 className="font-[family-name:var(--font-display)] text-5xl font-bold leading-tight tracking-tight text-stone-100 sm:text-6xl lg:text-7xl">
                        Where I&apos;ve been
                    </h2>
                </div>
            </FadeIn>

            <Stagger className="relative z-[2] space-y-2">
                {roles.map((role, i) => (
                    <StaggerItem key={i}>
                        <div className="group grid gap-4 border-l-2 border-stone-700 py-6 pl-8 transition-colors duration-700 hover:border-amber-300/50 md:grid-cols-[180px_1fr] md:gap-8">
                            <div className="font-mono text-xs uppercase tracking-wider text-stone-500">
                                {role.when}
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-stone-100">
                                        {role.title}
                                    </h3>
                                    <div className="font-mono text-sm text-stone-300">
                                        {role.org}
                                    </div>
                                </div>
                                <p className="text-sm leading-relaxed text-stone-400">
                                    {role.body}
                                </p>
                                {role.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {role.tags.map((t) => (
                                            <span
                                                key={t}
                                                className="rounded border border-stone-700 bg-stone-900/60 px-2 py-0.5 font-mono text-[11px] text-stone-400"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
}
