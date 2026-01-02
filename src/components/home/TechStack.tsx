"use client";

import { Card } from "@/components/ui/Card";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";
import { FadeIn } from "@/components/animations/FadeIn";
import { Brain, Server, Cloud, Layout, Cpu, Database, Globe, Container } from "lucide-react";

const stack = [
    {
        category: "ML & AI",
        icon: Brain,
        description: "Building intelligent systems",
        items: ["PyTorch", "TensorFlow", "HuggingFace", "LangChain", "OpenAI API", "Scikit-Learn"],
        gradient: "from-violet-500/20 to-purple-500/20",
        textGradient: "text-violet-300",
    },
    {
        category: "Backend",
        icon: Server,
        description: "Scalable server-side solutions",
        items: ["Python", "FastAPI", "Go", "Node.js", "PostgreSQL", "Redis"],
        gradient: "from-emerald-500/20 to-teal-500/20",
        textGradient: "text-emerald-300",
    },
    {
        category: "Cloud & Ops",
        icon: Cloud,
        description: "Deployment and orchestration",
        items: ["GCP", "Kubernetes", "Docker", "Terraform", "CI/CD", "Prometheus"],
        gradient: "from-blue-500/20 to-cyan-500/20",
        textGradient: "text-blue-300",
    },
    {
        category: "Frontend",
        icon: Layout,
        description: "Responsive user interfaces",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
        gradient: "from-orange-500/20 to-amber-500/20",
        textGradient: "text-orange-300",
    },
];

export function TechStack() {
    return (
        <section className="container mx-auto px-6 py-24 border-t border-white/5 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <FadeIn>
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Toolkit</span>
                    </h2>
                    <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
                        A comprehensive suite of modern technologies I use to build scalable, intelligent, and performant applications.
                    </p>
                </div>
            </FadeIn>

            <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stack.map((group, index) => (
                    <StaggerItem key={index} className="h-full">
                        <Card className="h-full bg-white/5 border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden">
                            {/* Card Header */}
                            <div className={`p-6 pb-2`}>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 ${group.textGradient}`}>
                                        <group.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold font-mono tracking-wide text-white">
                                        {group.category}
                                    </h3>
                                </div>
                                <p className="text-sm text-muted-foreground ml-1">
                                    {group.description}
                                </p>
                            </div>

                            {/* Tech Items */}
                            <div className="p-6 pt-4">
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <span
                                            key={item}
                                            className="px-3 py-1.5 text-xs font-medium rounded-md bg-white/5 border border-white/5 text-muted-foreground hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-default"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Hover Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${group.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                        </Card>
                    </StaggerItem>
                ))}
            </Stagger>
        </section>
    );
}
