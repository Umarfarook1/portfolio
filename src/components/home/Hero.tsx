import { ArrowDownRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
import HeroCanvas from "@/components/three/HeroCanvas";

export function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden pb-20 pt-32 sm:pt-36">
      {/* 3D latent-space field, weighted to the right, behind a readability scrim */}
      <div className="absolute inset-0 -z-0" aria-hidden="true">
        <div className="absolute inset-0 sm:left-[26%]">
          <HeroCanvas />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent sm:via-background/35" />
      </div>

      {/* Corner calibration marks */}
      <RegistrationMark className="absolute left-5 top-28 hidden sm:block" />
      <RegistrationMark className="absolute right-5 top-28 hidden sm:block" />

      <div className="section-shell relative z-10 grid items-center gap-10 lg:min-h-[68vh] lg:grid-cols-[1.04fr_0.96fr]">
        <div className="fade-up">
          <div className="mb-7 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-primary">
              <span className="signal-dot" aria-hidden="true" />
              AI Engineer · HypeOn AI
            </span>
            <span>Bengaluru, India</span>
          </div>

          <p className="kicker">AI Systems Engineer</p>
          <h1 className="display mt-5 text-[clamp(3rem,8.4vw,7rem)]">
            Agents that are
            <br />
            <span className="serif plasma-text pr-2">measured,</span>
            <br />
            not just demoed.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            I build multi-agent systems, retrieval, and natural-language interfaces over data,
            then ship them with the evaluation harnesses, cost caps, and reproducible numbers
            that make them trustworthy in production.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button asChild variant="iris" size="lg">
                <Link href="#work">
                  View selected work <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="outline">
              <Link href="mailto:umarfarook0yt@gmail.com">
                Email me <Mail className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <div className="flex items-center gap-1 sm:ml-1">
              <Button asChild size="icon" variant="ghost">
                <Link href="https://github.com/Umarfarook1" target="_blank" rel="noreferrer" aria-label="GitHub profile">
                  <Github className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="icon" variant="ghost">
                <Link href="https://linkedin.com/in/umarfarook-gurramkonda" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Instrument caption that names what the 3D actually is */}
        <div className="fade-up relative hidden h-full lg:block [animation-delay:160ms]">
          <div className="absolute bottom-2 right-0 flex items-center gap-3 rounded-full border border-border/70 bg-background/50 px-4 py-2 backdrop-blur-sm">
            <RegistrationMark className="h-3.5 w-3.5" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              fig.01 — latent space · 4,200-pt embedding projection
            </span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="section-shell relative z-10 mt-12 flex items-center gap-3 lg:mt-0">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
        <span className="h-px w-12 origin-left animate-pulse bg-gradient-to-r from-primary to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}
