"use client";

import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionBranch } from "@/components/animations/SectionBranch";

const principles = [
    {
        title: "Tradeoffs over tools",
        body: "Pick by constraint, not hype. Postgres + pgvector beats a managed vector DB until it doesn't. Knowing when each breaks is the actual skill.",
    },
    {
        title: "Evals before scale",
        body: "If you cannot measure it, you cannot improve it. A bad eval beats no eval. A good eval beats opinions in standups.",
    },
    {
        title: "Data quality over model swapping",
        body: "A new model rarely fixes bad inputs. Time spent on retrieval quality, prompt structure, and labeled failures pays compounding interest.",
    },
    {
        title: "Infrastructure is the product",
        body: "Latency, cost, and reliability are features users feel. The model is one component of a system that has to stay up.",
    },
    {
        title: "Ship narrow, then expand",
        body: "One user, one workflow, working end-to-end. A tiny system that ships beats a grand system that demos.",
    },
    {
        title: "AI-pair-programming with judgment",
        body: "I use coding copilots and agentic IDEs aggressively. Then I reason through every architectural choice myself. Tools speed up typing; judgment doesn't delegate.",
    },
];

export function Principles() {
    return (
        <section
            className="relative container mx-auto px-6 py-28"
            id="principles"
        >
            <SectionBranch position="top-right" scale={0.95} seed={37} />

            <div className="relative z-[2] grid gap-12 lg:grid-cols-[1fr_2fr]">
                <FadeIn>
                    <div className="lg:sticky lg:top-24">
                        <p className="mb-2 font-[family-name:var(--font-display)] text-2xl italic text-stone-300">
                            how i think
                        </p>
                        <h2 className="font-[family-name:var(--font-display)] text-5xl font-bold leading-tight tracking-tight text-stone-100 sm:text-6xl lg:text-7xl">
                            Engineering principles
                        </h2>
                        <p className="mt-4 max-w-md text-stone-400">
                            Coding is the easy part. Building the right system
                            for a problem that keeps shifting is where the work
                            actually lives.
                        </p>
                    </div>
                </FadeIn>

                <Stagger className="space-y-2">
                    {principles.map((p, i) => (
                        <StaggerItem key={i}>
                            <div className="group relative border-l-2 border-stone-700 py-5 pl-8 transition-colors duration-700 hover:border-amber-300/50">
                                <div className="absolute left-0 top-7 h-2.5 w-2.5 -translate-x-[6px] rounded-full bg-stone-700 transition-colors duration-700 group-hover:bg-amber-300/80" />
                                <h3 className="mb-2 font-[family-name:var(--font-display)] text-2xl font-normal text-stone-100">
                                    {p.title}
                                </h3>
                                <p className="leading-relaxed text-stone-400">
                                    {p.body}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
