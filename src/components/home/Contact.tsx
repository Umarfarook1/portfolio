"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Contact() {
    return (
        <section className="container mx-auto px-6 py-32 text-center" id="contact">
            <FadeIn>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                    Ready to Build?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                    I&apos;m always open to discussing new opportunities, especially roles involving
                    Production AI systems, early-stage startups, and technical leadership.
                </p>

                <div className="flex justify-center gap-6">
                    <Button variant="outline" size="lg" asChild className="h-14 w-14 rounded-full p-0">
                        <Link href="https://github.com" target="_blank" aria-label="GitHub">
                            <Github className="h-6 w-6" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="h-14 w-14 rounded-full p-0">
                        <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                            <Linkedin className="h-6 w-6" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild className="h-14 w-14 rounded-full p-0">
                        <Link href="mailto:hello@example.com" aria-label="Email">
                            <Mail className="h-6 w-6" />
                        </Link>
                    </Button>
                </div>
            </FadeIn>
        </section>
    );
}
