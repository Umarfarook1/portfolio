import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
import { ArrowEast, ArrowDiagonal } from "@/components/ui/Arrow";
import HeroCanvas from "@/components/three/HeroCanvas";
import { Highlight } from "@/components/ui/Highlight";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-12 pt-24 sm:pt-28">
      <RegistrationMark className="absolute left-5 top-24 hidden text-foreground/40 sm:block" />
      <RegistrationMark className="absolute right-5 top-24 hidden text-foreground/40 sm:block" />

      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="fade-up">
          <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="flex items-center gap-2 rounded-full border border-foreground/20 px-3 py-1.5 text-foreground">
              <span className="pulse-dot" aria-hidden="true" />
              Open to roles
            </span>
            <span>AI Engineer · HypeOn AI · Bengaluru</span>
          </div>

          <p className="kicker text-foreground">AI Systems Engineer</p>
          <h1 className="display mt-4 text-[clamp(2.2rem,4.7vw,4.2rem)]">
            Agents that are{" "}
            <Highlight>measured</Highlight>,
            <br />
            not just demoed.
          </h1>

          <p className="mt-6 max-w-lg text-[15px] leading-6 text-muted-foreground sm:text-base">
            I build multi-agent systems, retrieval, and natural-language interfaces over data,
            then ship them with the evaluation harnesses, cost caps, and reproducible numbers
            that make them trustworthy in production.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button asChild variant="solid" size="lg">
                <Link href="#work">
                  <span>View selected work</span>
                  <ArrowEast className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild variant="outline" size="lg">
              <Link href="mailto:umarfarook0yt@gmail.com">
                <span>Email me</span>
                <ArrowDiagonal className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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

        {/* Framed 3D figure: the latent-space embedding plate */}
        <div className="fade-up [animation-delay:140ms]">
          <figure className="plate relative mx-auto aspect-[4/5] w-full max-w-[390px]">
            <figcaption className="flex items-center justify-between border-b border-foreground/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>fig.01 / latent self</span>
              <RegistrationMark className="h-3.5 w-3.5 text-foreground/50" />
            </figcaption>
            <div className="relative h-[calc(100%-2.75rem)]">
              <HeroCanvas />
              <span className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                point-cloud portrait · live
              </span>
            </div>
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
