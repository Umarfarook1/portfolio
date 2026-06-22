import { Reveal } from "@/components/ui/Reveal";
import { RegistrationMark } from "@/components/ui/RegistrationMark";

export function About() {
  return (
    <section id="about" className="relative border-y border-border/70 bg-card/30 py-24 sm:py-32">
      <RegistrationMark className="absolute left-5 top-6 hidden sm:block" />
      <RegistrationMark className="absolute right-5 top-6 hidden sm:block" />
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.42fr_1fr] lg:gap-16">
          <Reveal className="flex items-start gap-5">
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar.jpg"
                alt="Umarfarook Gurramkonda"
                width={120}
                height={120}
                className="h-28 w-28 rounded-2xl border border-border object-cover grayscale transition-all duration-500 hover:grayscale-0"
              />
              <span className="absolute -bottom-2 -right-2 flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-primary">
                <span className="signal-dot" aria-hidden="true" /> live
              </span>
            </div>
            <div>
              <p className="kicker">About</p>
              <p className="mt-3 font-mono text-[11px] leading-5 uppercase tracking-wider text-muted-foreground">
                Point of view
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-[family-name:var(--font-display)] text-2xl font-medium leading-[1.25] tracking-tight text-foreground sm:text-[2rem]">
              The interesting work in AI is not the model call. It is everything around it:
              deciding when a model <span className="serif plasma-text">earns a place</span> in the system,
              controlling what goes in and what comes out, and proving the result still holds once
              real traffic hits it.
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              I care most about the reliability layer: evaluation, cost discipline, and failure
              handling, because that is what separates a demo from something a team can depend on.
              I am looking for research and ML engineering work where that judgment matters as much
              as model choice.
            </p>
            <p className="serif mt-8 text-3xl text-foreground/90">Umarfarook</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
