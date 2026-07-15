import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
import { ArrowEast, ArrowDiagonal } from "@/components/ui/Arrow";
import { PlateReveal } from "@/components/ui/PlateReveal";
import HeroCanvas from "@/components/three/HeroCanvas";
import { Proof } from "@/components/ui/Proof";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-12 pt-28 sm:pt-32">
      <RegistrationMark animate className="absolute left-5 top-24 hidden h-4 w-4 sm:block" />
      <RegistrationMark animate className="absolute right-5 top-24 hidden h-4 w-4 sm:block" />

      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="fade-up">
          <p className="kicker text-foreground">Applied AI / ML Engineer · HypeOn AI, Bengaluru</p>

          <h1 className="display mt-5 text-[clamp(2.5rem,5.4vw,4.9rem)]">
            I <Proof>measure</Proof>
            <br />
            what I ship.
          </h1>

          <p className="mt-6 max-w-lg text-[15px] leading-7 text-muted-foreground sm:text-base">
            Multi-agent LLM systems, retrieval, and natural-language interfaces over data. Each one
            ships with an eval harness, a cost cap, and numbers you can rerun yourself.
          </p>

          <p className="status-mark mt-7 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground">
            Open to research and ML engineering roles
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button asChild variant="solid" size="lg">
              <Link href="#work">
                <span>Selected work</span>
                <ArrowEast className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="mailto:umarfarook0yt@gmail.com">
                <span>Email me</span>
                <ArrowDiagonal className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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

        {/* fig. 01: the photograph reduced to data, which is the job description.
            The frame is fixed; the plate contents reveal like ink rolling off
            the press, then drift a few px of parallax. */}
        <div className="fade-up [animation-delay:140ms]">
          <figure className="plate relative mx-auto aspect-[4/5] w-full max-w-[390px]">
            <figcaption className="flex items-center justify-between border-b border-foreground/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>
                <span className="text-accent">fig. 01</span> · latent self
              </span>
              <RegistrationMark className="h-3.5 w-3.5 text-foreground/50" />
            </figcaption>
            <PlateReveal className="relative h-[calc(100%-2.75rem)]">
              <HeroCanvas />
              <span className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.16em] text-blue">
                point-cloud portrait · live
              </span>
            </PlateReveal>
          </figure>
        </div>
      </div>

      <div className="section-shell mt-8 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
        <span className="h-px w-12 bg-foreground/30" aria-hidden="true" />
      </div>
    </section>
  );
}
