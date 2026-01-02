"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { FadeIn } from "@/components/animations/FadeIn";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative flex min-h-[90vh] flex-col justify-center px-6 pt-20">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background" />

            <div className="mx-auto max-w-5xl">
                <Stagger className="space-y-6">
                    <StaggerItem>
                        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
                            <span className="block text-white">Machine Learning</span>
                            <span className="block text-white/40">& AI Engineer</span>
                        </h1>
                    </StaggerItem>

                    <StaggerItem>
                        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl font-mono">
                            Building and deploying production AI systems — spanning ML workflows,
                            cloud infrastructure, backend APIs, and full-stack delivery.
                        </p>
                    </StaggerItem>

                    <StaggerItem>
                        <div className="flex gap-4">
                            <Button asChild className="h-12 px-8 text-base">
                                <Link href="/#work">
                                    View Work <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                                className="h-12 px-8 text-base"
                            >
                                <Link href="/#contact">Contact Me</Link>
                            </Button>
                        </div>
                    </StaggerItem>

                    <StaggerItem>
                        <div className="pt-8 text-sm text-muted-foreground/60 flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Currently leading IT and AI systems at an early-stage startup.
                        </div>
                    </StaggerItem>
                </Stagger>
            </div>
        </section>
    );
}
