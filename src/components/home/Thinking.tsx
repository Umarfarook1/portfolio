"use client";

import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { FadeIn } from "@/components/animations/FadeIn";

const principles = [
    {
        title: "Tradeoffs over Tools",
        description: (
            <>
                I choose technology based on constraints, not hype. Sometimes a simple
                Postgres query beats a complex vector database.
            </>
        ),
    },
    {
        title: "The 80/20 Rule in AI",
        description: (
            <>
                80% of the value comes from 20% of the complexity. I focus on getting a
                reliable baseline into production fast, then iterating.
            </>
        ),
    },
    {
        title: "Data Quality > Model Architecture",
        description: (
            <>
                A slightly better model on bad data is useless. I prioritize data pipelines,
                cleaning, and observable ground truth.
            </>
        ),
    },
    {
        title: "Infrastructure IS the Product",
        description: (
            <>
                If the inference service is down, the model doesn&apos;t exist. Reliability
                and latency are features, not afterthoughts.
            </>
        ),
    },
];

export function Thinking() {
    return (
        <section className="container mx-auto px-6 py-24 border-t border-white/5" id="thinking">
            <div className="grid lg:grid-cols-2 gap-12">
                <FadeIn>
                    <div className="sticky top-24">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                            Engineering Thinking
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-md">
                            Coding is the easy part. Building the right system for the right, often shifting, problem is where the real work happens.
                        </p>
                    </div>
                </FadeIn>

                <Stagger className="space-y-8">
                    {principles.map((principle, index) => (
                        <StaggerItem key={index}>
                            <div className="relative pl-8 border-l border-white/10 hover:border-violet-500/50 transition-colors">
                                <h3 className="text-xl font-bold mb-2 text-white">{principle.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {principle.description}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
