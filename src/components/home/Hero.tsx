"use client";

import { ArrowRight, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { SakuraTree } from "@/components/animations/SakuraTree";

export function Hero() {
    return (
        <section className="relative flex min-h-[100vh] flex-col justify-center overflow-hidden px-6 pt-24">
            <SakuraTree />

            <div className="relative z-[3] mx-auto w-full max-w-5xl">
                <Stagger className="space-y-10">
                    <StaggerItem>
                        <div className="inline-flex items-center gap-2 rounded-full border border-stone-400/30 bg-stone-950/60 px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-stone-100 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                            AI Engineer at HypeOn AI &middot; Building in public
                        </div>
                    </StaggerItem>

                    <StaggerItem>
                        <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.05] tracking-tight text-stone-100 sm:text-6xl lg:text-[5.5rem]">
                            <span className="block">Umarfarook</span>
                            <span className="mt-1 block italic font-normal text-stone-200/95">
                                Gurramkonda
                            </span>
                        </h1>
                    </StaggerItem>

                    <StaggerItem>
                        <p className="max-w-2xl font-mono text-base text-stone-400 sm:text-lg lg:text-xl">
                            I build production LLM systems. Multi-stage agents,
                            retrieval pipelines, natural-language-to-SQL over
                            warehouses, and the eval harnesses that keep them
                            honest.
                        </p>
                    </StaggerItem>

                    <StaggerItem>
                        <div className="flex flex-wrap items-center gap-3">
                            <Button
                                asChild
                                className="h-12 bg-stone-100 px-7 text-base font-semibold text-stone-900 shadow-lg shadow-stone-950/40 hover:bg-white"
                            >
                                <Link href="#now-building">
                                    What I&apos;m building
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                                className="h-12 border-stone-600 bg-stone-900/40 px-7 text-base text-stone-100 hover:border-stone-300/60 hover:bg-stone-900/60"
                            >
                                <Link href="#contact">Get in touch</Link>
                            </Button>
                            <div className="ml-2 flex gap-1">
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="h-12 w-12 p-0 text-stone-300 hover:bg-stone-800/60 hover:text-white"
                                >
                                    <Link
                                        href="https://github.com/Umarfarook1"
                                        target="_blank"
                                        aria-label="GitHub"
                                    >
                                        <Github className="h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="h-12 w-12 p-0 text-stone-300 hover:bg-stone-800/60 hover:text-white"
                                >
                                    <Link
                                        href="https://linkedin.com/in/umarfarook-gurramkonda"
                                        target="_blank"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin className="h-5 w-5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </StaggerItem>

                    <StaggerItem>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-8 font-mono text-xs uppercase tracking-widest text-stone-500">
                            <span>Bangalore, India</span>
                            <span className="text-stone-700">/</span>
                            <span>Remote &amp; SF</span>
                            <span className="text-stone-700">/</span>
                            <span>Shipping 5 OSS projects</span>
                        </div>
                    </StaggerItem>
                </Stagger>
            </div>
        </section>
    );
}
