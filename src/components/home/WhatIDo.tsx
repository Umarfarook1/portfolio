"use client";

import { Brain, Cloud, Database, Layers, Terminal } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { FadeIn } from "@/components/animations/FadeIn";

const services = [
    {
        title: "ML / AI Systems",
        description: "Designing and deploying production-ready machine learning pipelines and inference services.",
        icon: Brain,
    },
    {
        title: "Backend & APIs",
        description: "Building scalable REST and gRPC sub-systems to power AI applications.",
        icon: Terminal,
    },
    {
        title: "Cloud Infrastructure",
        description: "Managing GCP/AWS resources, Kubernetes clusters, and serverless deployments.",
        icon: Cloud,
    },
    {
        title: "Full-Stack Delivery",
        description: "Connecting complex backend logic to intuitive, responsive frontend interfaces.",
        icon: Layers,
    },
    {
        title: "Startup Leadership",
        description: "Technical decision making, cost optimization, and rapid iteration cycles.",
        icon: Database,
    },
];

export function WhatIDo() {
    return (
        <section className="container mx-auto px-6 py-24" id="what-i-do">
            <FadeIn>
                <h2 className="mb-16 text-3xl font-bold tracking-tight sm:text-4xl text-center">
                    What I Actually Do
                </h2>
            </FadeIn>

            <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => (
                    <StaggerItem key={index} className="h-full">
                        <Card className="h-full group hover:-translate-y-1 transition-transform cursor-default">
                            <service.icon className="h-10 w-10 mb-4 text-primary/80 group-hover:text-primary transition-colors" />
                            <h3 className="text-xl font-bold mb-2 font-mono">{service.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </Card>
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
}
