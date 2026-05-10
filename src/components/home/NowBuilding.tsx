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
        title: "mcp-bigquery-evals",
        pitch: "An MCP server for BigQuery exploration with cost guardrails and a built-in NL-to-SQL eval harness. Live on PyPI; works with any MCP-compatible client.",
        why: "Calling card. Sits at the intersection of MCP, evals, and NL-to-SQL: three of the hottest 2026 AI engineering topics.",
        stack: ["Python", "FastMCP", "BigQuery", "Pydantic"],
        eta: "Live",
        status: "live",
        repo: "https://github.com/Umarfarook1/mcp-bigquery-evals",
    },
    {
        index: "02",
        title: "Nano-LLM-from-scratch",
        pitch: "GPT-2 124M reproduction in clean PyTorch. Modern parts: RoPE, RMSNorm, SwiGLU, KV-cache. Cost receipts in dollars and H100 hours, not vibes.",
        why: "Closes the from-scratch DL gap. Frontier-lab interviewers want to see you can build, not just call.",
        stack: ["PyTorch", "FineWeb", "FSDP", "WandB"],
        eta: "Building (3 to 6 weeks)",
        status: "building",
        repo: "https://github.com/Umarfarook1/Nano-LLM-from-scratch",
    },
    {
        index: "03",
        title: "Triton-attention-kernels",
        pitch: "Hand-written Triton kernels for the transformer hot path: fused attention, RMSNorm, SwiGLU, RoPE, benchmarked against torch SDPA on H100 and A100.",
        why: "Closes the ML-systems / GPU-performance gap. The single skill frontier-lab RE candidates are most often hired for.",
        stack: ["Triton", "CUDA", "PyTorch", "KernelBench"],
        eta: "Building (2 to 3 weeks)",
        status: "building",
        repo: "https://github.com/Umarfarook1/Triton-attention-kernels",
    },
    {
        index: "04",
        title: "Tiny-diffusion",
        pitch: "DDPM + classifier-free guidance + DDIM, built from the forward process up. Math derived in the README. Trained on CIFAR-10 and CelebA.",
        why: "Closes the generative + CV gap with one well-scoped project. Diffusion is the most consequential generative paradigm of the decade.",
        stack: ["PyTorch", "UNet", "clean-fid", "CIFAR-10"],
        eta: "Building (~2 weeks)",
        status: "building",
        repo: "https://github.com/Umarfarook1/Tiny-diffusion",
    },
    {
        index: "05",
        title: "DPO-on-my-LLM",
        pitch: "Post-training stack on a small open LLM. SFT on demonstrations, DPO on preferences, LLM-judge eval with win-rate and Wilson confidence intervals.",
        why: "Closes the RLHF gap. Reuses my evals strength. Pairs naturally with Nano-LLM-from-scratch.",
        stack: ["PyTorch", "TRL", "LoRA", "UltraFeedback"],
        eta: "Building (~3 weeks)",
        status: "building",
        repo: "https://github.com/Umarfarook1/DPO-on-my-LLM",
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
                        Five projects across the lanes I care about. The first
                        ships now (`mcp-bigquery-evals`); the next four are a
                        from-scratch ML stack: GPT-2 reproduction, Triton kernels,
                        diffusion, and DPO post-training. Each ships with evals,
                        a public repo, and a writeup.
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
        <Card className="group bg-stone-950/55 hover:border-stone-400/50 hover:bg-stone-950/70">
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
