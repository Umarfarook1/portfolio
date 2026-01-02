"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/animations/FadeIn";

export function FlagshipWork() {
    return (
        <section className="container mx-auto px-6 py-24" id="work">
            <FadeIn>
                <h2 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl">
                    Flagship Work
                </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <Card className="relative p-8 md:p-12 hover:border-violet-500/50 transition-colors">

                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm text-violet-300">
                                    Case Study
                                </div>
                                <h3 className="text-3xl font-bold sm:text-4xl text-white">
                                    Production AI System in a Startup Environment
                                </h3>
                                <p className="text-lg text-muted-foreground">
                                    Architected and deployed a scalable AI platform handling real-time inference.
                                    Reduced latency by 40% and optimized cloud costs through serverless orchestration.
                                </p>
                                <Button asChild className="h-12 px-6">
                                    <Link href="/case-study">
                                        Read The Case Study <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>

                            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/20 border border-white/10 flex items-center justify-center group-hover:bg-muted/30 transition-colors">
                                <div className="text-center p-6">
                                    <div className="text-4xl font-mono text-white/20 font-bold mb-2">SYSTEM ARCH</div>
                                    <div className="text-sm text-muted-foreground">Diagram Placeholder</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </FadeIn>
        </section>
    );
}
