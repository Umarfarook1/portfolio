"use client";

import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowLeft, Check, Server, Workflow, Zap } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function CaseStudy() {
    return (
        <main className="min-h-screen pt-24 pb-16 px-6">
            <article className="mx-auto max-w-4xl space-y-16">
                {/* Header */}
                <FadeIn className="space-y-6">
                    <Button variant="ghost" asChild className="-ml-4 text-muted-foreground hover:text-white">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Link>
                    </Button>
                    <div className="space-y-2">
                        <div className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm text-violet-300">
                            Production System
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            Scalable Real-Time Inference Platform
                        </h1>
                        <p className="text-xl text-muted-foreground font-mono">
                            From localized Python scripts to a global serverless architecture processing 50k+ daily requests.
                        </p>
                    </div>
                </FadeIn>

                {/* Problem Statement */}
                <FadeIn delay={0.2} className="grid md:grid-cols-[1fr_200px] gap-8 border-l-2 border-white/5 pl-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">The Problem</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            The initial prototype was a monolithic Flask app on a single VM.
                            As user traffic spiked, reliability dropped below 95%, and latency varied wildly (200ms to 5s).
                            We needed a system that could auto-scale, handle model updates without downtime, and keep costs largely proportional to usage.
                        </p>
                    </div>
                    <div className="text-sm font-mono text-muted-foreground space-y-2">
                        <div className="text-white font-bold">Constraints</div>
                        <div>• Latency &lt; 300ms</div>
                        <div>• 99.9% Uptime</div>
                        <div>• Zero downtime deploys</div>
                    </div>
                </FadeIn>

                {/* System Architecture */}
                <FadeIn delay={0.3}>
                    <h2 className="text-2xl font-bold mb-8">Architecture Decisions</h2>
                    <Card className="p-8 bg-slate-900/50 border-slate-800">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-violet-400 font-mono font-bold">
                                    <Workflow className="h-5 w-5" /> Orchestration
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Moved to <strong>Kubernetes (GKE)</strong> for container orchestration.
                                    Split the monolith into:
                                    <br />- API Gateway (Go)
                                    <br />- Inference Workers (Python/Torch)
                                    <br />- Queue Consumers (Node)
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-blue-400 font-mono font-bold">
                                    <Zap className="h-5 w-5" /> Performance
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Implemented <strong>Redis</strong> for caching frequent prediction results (30% hit rate).
                                    Used <strong>ONNX Runtime</strong> for model optimization, reducing inference time by 2x compared to vanilla PyTorch.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold">
                                    <Server className="h-5 w-5" /> Infrastructure
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    <strong>Terraform</strong> for reproducible infra.
                                    <strong>Prometheus + Grafana</strong> for SLI/SLO tracking.
                                    <strong>GitHub Actions</strong> for CI/CD pipelines.
                                </p>
                            </div>
                        </div>
                    </Card>
                </FadeIn>

                {/* Results */}
                <FadeIn delay={0.4}>
                    <h2 className="text-2xl font-bold mb-8 text-green-400">Production Results</h2>
                    <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StaggerItem>
                            <Card className="p-6 text-center border-green-500/20 bg-green-500/5">
                                <div className="text-3xl font-bold text-white mb-1">99.95%</div>
                                <div className="text-xs text-green-400 font-mono uppercase">Uptime</div>
                            </Card>
                        </StaggerItem>
                        <StaggerItem>
                            <Card className="p-6 text-center border-green-500/20 bg-green-500/5">
                                <div className="text-3xl font-bold text-white mb-1">140ms</div>
                                <div className="text-xs text-green-400 font-mono uppercase">Avg Latency</div>
                            </Card>
                        </StaggerItem>
                        <StaggerItem>
                            <Card className="p-6 text-center border-green-500/20 bg-green-500/5">
                                <div className="text-3xl font-bold text-white mb-1">-40%</div>
                                <div className="text-xs text-green-400 font-mono uppercase">Compute Cost</div>
                            </Card>
                        </StaggerItem>
                        <StaggerItem>
                            <Card className="p-6 text-center border-green-500/20 bg-green-500/5">
                                <div className="text-3xl font-bold text-white mb-1">Automatic</div>
                                <div className="text-xs text-green-400 font-mono uppercase">Scalability</div>
                            </Card>
                        </StaggerItem>
                    </Stagger>
                </FadeIn>

                {/* Tradeoffs */}
                <FadeIn delay={0.5}>
                    <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 p-6">
                        <h3 className="text-lg font-bold text-orange-200 mb-2">Tradeoffs & Lessons</h3>
                        <ul className="space-y-2 text-sm text-orange-200/80">
                            <li className="flex gap-2">
                                <Check className="h-4 w-4 mt-0.5" />
                                <span>
                                    <b>Kubernetes Complexity:</b> While GKE solved scaling, it added operational overhead. For a smaller team, I might now choose Cloud Run for simpler management.
                                </span>
                            </li>
                            <li className="flex gap-2">
                                <Check className="h-4 w-4 mt-0.5" />
                                <span>
                                    <b>Cold Starts:</b> Serverless functions initially had high cold start times. We mitigated this with provisioned concurrency for critical paths.
                                </span>
                            </li>
                        </ul>
                    </div>
                </FadeIn>

            </article>
        </main>
    );
}
