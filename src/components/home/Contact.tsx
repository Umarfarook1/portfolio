import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { RegistrationMark } from "@/components/ui/RegistrationMark";
import { Proof } from "@/components/ui/Proof";
import { PrintWipe } from "@/components/ui/PrintWipe";
import { ArrowEast, ArrowDiagonal } from "@/components/ui/Arrow";

const links = [
  { label: "GitHub", value: "github.com/Umarfarook1", href: "https://github.com/Umarfarook1" },
  { label: "LinkedIn", value: "umarfarook-gurramkonda", href: "https://linkedin.com/in/umarfarook-gurramkonda" },
];

export function Contact() {
  return (
    <section id="contact">
      <PrintWipe className="ink-band relative overflow-hidden py-28 sm:py-36">
        <RegistrationMark className="absolute left-5 top-8 hidden text-background/40 sm:block" />
        <RegistrationMark className="absolute right-5 top-8 hidden text-background/40 sm:block" />

        <div className="section-shell flex flex-col items-center text-center">
          <Reveal delay={0.12}>
            <p className="kicker justify-center text-background">
              <span className="folio">07</span> Contact
            </p>
            <h2 className="display mt-6 text-[clamp(2.6rem,7.5vw,6rem)] text-background">
              <Proof>Write</Proof> to me.
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-background/70 sm:text-base">
              I read my own inbox and reply fast. If you are hiring for research or ML engineering
              where evaluation and reliability count, start here.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-10">
            <Link
              href="mailto:umarfarook0yt@gmail.com"
              className="btn-proof stamp group inline-flex items-center gap-3 rounded-[2px] border border-background bg-background px-8 py-5 font-mono text-sm font-semibold uppercase tracking-wider text-foreground sm:px-10"
            >
              umarfarook0yt@gmail.com
              <ArrowEast className="h-5 w-5 transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={0.3} className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-background/65 transition-colors duration-[120ms] hover:text-background"
              >
                {link.value}
                <ArrowDiagonal className="h-3.5 w-3.5 transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </Reveal>
        </div>
      </PrintWipe>
    </section>
  );
}
