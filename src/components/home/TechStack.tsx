"use client";

import { Brain, Server, Cloud, Database, Wrench, Code2, Cpu } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionBranch } from "@/components/animations/SectionBranch";

const stack = [
    {
        category: "LLMs & GenAI",
        icon: Brain,
        items: [
            "Gemini",
            "OpenAI",
            "LangChain",
            "LangGraph",
            "Pydantic",
            "sentence-transformers",
            "FAISS",
        ],
        accent: "text-stone-200 bg-stone-800/60",
    },
    {
        category: "ML Systems",
        icon: Cpu,
        items: [
            "PyTorch",
            "Triton",
            "CUDA",
            "FlashAttention",
            "TRL",
            "diffusers",
            "Hugging Face",
        ],
        accent: "text-violet-300 bg-violet-950/40",
    },
    {
        category: "Backend",
        icon: Server,
        items: ["Python", "FastAPI", "SQLAlchemy", "Alembic", "Celery", "REST", "SSE"],
        accent: "text-emerald-300 bg-emerald-950/40",
    },
    {
        category: "Data",
        icon: Database,
        items: ["BigQuery", "PostgreSQL", "pgvector", "Redis", "Pandas", "NumPy"],
        accent: "text-amber-300 bg-amber-950/40",
    },
    {
        category: "Cloud & Infra",
        icon: Cloud,
        items: [
            "GCP",
            "Cloud Run",
            "Cloud SQL",
            "GCS",
            "Memorystore",
            "AWS (S3, EC2)",
            "Oracle Cloud",
        ],
        accent: "text-sky-300 bg-sky-950/40",
    },
    {
        category: "DevOps & Observability",
        icon: Wrench,
        items: ["Docker", "GitHub Actions", "Prometheus", "Sentry", "Git"],
        accent: "text-yellow-300 bg-yellow-950/40",
    },
    {
        category: "Frontend",
        icon: Code2,
        items: ["TypeScript", "Next.js", "React", "Tailwind", "Framer Motion"],
        accent: "text-rose-300 bg-rose-950/40",
    },
];

export function TechStack() {
    return (
        <section
            className="relative container mx-auto px-6 py-28"
            id="stack"
        >
            <SectionBranch position="bottom-left" scale={0.85} seed={51} />

            <FadeIn>
                <div className="relative z-[2] mb-16 max-w-2xl">
                    <p className="mb-2 font-[family-name:var(--font-display)] text-2xl italic text-stone-300/85">
                        the toolkit
                    </p>
                    <h2 className="font-[family-name:var(--font-display)] text-5xl font-bold leading-tight tracking-tight text-stone-100 sm:text-6xl">
                        What I work with
                    </h2>
                    <p className="mt-4 text-stone-400">
                        Tools I use day to day. Not a list of every framework
                        I&apos;ve heard of.
                    </p>
                </div>
            </FadeIn>

            <Stagger className="relative z-[2] grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {stack.map((group) => (
                    <StaggerItem key={group.category} className="h-full">
                        <Card className="group h-full border-stone-700/40 bg-stone-950/50 shadow-md backdrop-blur-sm transition-all duration-700 hover:border-stone-400/40 hover:bg-stone-950/65 hover:shadow-xl hover:shadow-stone-950/50">
                            <div className="mb-4 flex items-center gap-3">
                                <div
                                    className={`rounded-xl border border-stone-700/40 p-2 transition-colors duration-700 ${group.accent}`}
                                >
                                    <group.icon className="h-5 w-5" />
                                </div>
                                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-stone-100">
                                    {group.category}
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {group.items.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded border border-stone-700 bg-stone-900/80 px-2 py-1 font-mono text-[11px] text-stone-300 transition-colors duration-500 hover:border-amber-300/40 hover:bg-amber-950/30 hover:text-amber-100"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </Card>
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
}
