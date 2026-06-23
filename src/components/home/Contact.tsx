import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
import { Highlight } from "@/components/ui/Highlight";
import { ArrowEast, ArrowDiagonal } from "@/components/ui/Arrow";

const links = [
  { label: "GitHub", value: "github.com/Umarfarook1", href: "https://github.com/Umarfarook1" },
  { label: "LinkedIn", value: "umarfarook-gurramkonda", href: "https://linkedin.com/in/umarfarook-gurramkonda" },
];

export function Contact() {
  return (
    <section id="contact" className="ink-band relative overflow-hidden py-28 sm:py-36">
      <RegistrationMark className="absolute left-5 top-8 hidden text-background/40 sm:block" />
      <RegistrationMark className="absolute right-5 top-8 hidden text-background/40 sm:block" />

      <div className="section-shell flex flex-col items-center text-center">
        <Reveal>
          <p className="kicker justify-center text-background">Open channel</p>
          <h2 className="display mt-6 text-[clamp(2.6rem,8vw,6.4rem)] text-background">
            An AI system that
            <br />
            <Highlight>has to work?</Highlight>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-background/70 sm:text-base">
            I am open to research and ML engineering roles where evaluation, reliability, and product
            judgment matter as much as model choice. The fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <Magnetic strength={0.4}>
            <Link
              href="mailto:umarfarook0yt@gmail.com"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-5 font-mono text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-transform duration-300 hover:-translate-y-1 sm:px-10"
            >
              umarfarook0yt@gmail.com
              <ArrowEast className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-background/65 transition-colors hover:text-background"
            >
              {link.value}
              <ArrowDiagonal className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
