"use client";

import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";

const links = [
    {
        label: "Email",
        value: "umarfarook0yt@gmail.com",
        href: "mailto:umarfarook0yt@gmail.com",
        icon: Mail,
    },
    {
        label: "GitHub",
        value: "github.com/Umarfarook1",
        href: "https://github.com/Umarfarook1",
        icon: Github,
    },
    {
        label: "LinkedIn",
        value: "linkedin.com/in/umarfarook-gurramkonda",
        href: "https://linkedin.com/in/umarfarook-gurramkonda",
        icon: Linkedin,
    },
];

export function Contact() {
    return (
        <section
            className="container mx-auto px-6 py-32"
            id="contact"
        >
            <FadeIn>
                <div className="mx-auto max-w-3xl">
                    <p className="mb-2 font-[family-name:var(--font-display)] text-2xl italic text-stone-300">
                        say hello
                    </p>
                    <h2 className="font-[family-name:var(--font-display)] text-5xl font-normal leading-tight tracking-tight text-stone-100 sm:text-6xl">
                        Let&apos;s build something.
                    </h2>
                    <p className="mt-6 max-w-2xl text-lg text-stone-400">
                        I&apos;m open to roles in production AI, especially
                        teams shipping LLM systems, RAG, agents, or NL
                        interfaces over data. Remote or San Francisco. Quick
                        replies.
                    </p>

                    <div className="mt-12 grid gap-3">
                        {links.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                                className="group flex items-center justify-between gap-4 rounded-lg border border-stone-700 bg-stone-900/60 px-5 py-4 shadow-sm transition-all hover:border-stone-300/50 hover:shadow-md hover:translate-x-1"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="rounded-lg border border-stone-700 bg-stone-900/80 p-2 text-stone-300 transition-colors group-hover:bg-stone-800/60 group-hover:text-stone-100">
                                        <link.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="font-mono text-xs uppercase tracking-wider text-stone-500">
                                            {link.label}
                                        </div>
                                        <div className="text-base text-stone-100">
                                            {link.value}
                                        </div>
                                    </div>
                                </div>
                                <ArrowUpRight className="h-5 w-5 text-stone-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-stone-200" />
                            </Link>
                        ))}
                    </div>
                </div>
            </FadeIn>
        </section>
    );
}
