import { Reveal } from "@/components/ui/Reveal";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
import { Proof } from "@/components/ui/Proof";

export function About() {
  return (
    <section id="about" className="ink-band relative py-24 sm:py-32">
      <RegistrationMark className="absolute left-5 top-6 hidden text-background/40 sm:block" />
      <RegistrationMark className="absolute right-5 top-6 hidden text-background/40 sm:block" />
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.4fr_1fr] lg:gap-16">
          <Reveal className="flex items-start gap-5">
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar.jpg"
                alt="Umarfarook Gurramkonda"
                width={112}
                height={112}
                className="h-28 w-28 rounded-[6px] border border-background/25 object-cover grayscale contrast-110"
              />
            </div>
            <div>
              <p className="kicker text-background">
                <span className="folio">04</span> About
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-background/60">Point of view</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="display text-2xl leading-[1.16] text-background sm:text-[2.1rem]">
              Most of my time goes to the layer around the model: deciding when one{" "}
              <Proof>earns its place</Proof>, shaping what goes in and out, and checking the result
              still holds under real traffic.
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-background/70 sm:text-base">
              Evaluation, cost discipline, failure handling: the unglamorous work that makes a
              system dependable. I want research and ML engineering roles where that judgment
              counts as much as model choice.
            </p>
            <p className="mt-8 display text-2xl text-background">Umarfarook.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
