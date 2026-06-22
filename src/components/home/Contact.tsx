import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { RegistrationMark } from "@/components/ui/RegistrationMark";

const links = [
  { label: "GitHub", value: "github.com/Umarfarook1", href: "https://github.com/Umarfarook1", icon: Github },
  { label: "LinkedIn", value: "umarfarook-gurramkonda", href: "https://linkedin.com/in/umarfarook-gurramkonda", icon: Linkedin },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border/70 py-28 sm:py-36">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 0%, rgba(124,92,255,0.22), transparent 70%), radial-gradient(40% 50% at 80% 100%, rgba(255,77,141,0.12), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <RegistrationMark className="absolute left-5 top-8 hidden sm:block" />
      <RegistrationMark className="absolute right-5 top-8 hidden sm:block" />

      <div className="section-shell relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <p className="kicker justify-center">Open channel</p>
          <h2 className="display mt-6 text-[clamp(2.6rem,7vw,6rem)]">
            Building an AI system
            <br />
            that <span className="serif plasma-text">has to work?</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            I am open to research and ML engineering roles where evaluation, reliability, and product
            judgment matter as much as model choice. The fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10">
          <Magnetic strength={0.4}>
            <Link
              href="mailto:umarfarook0yt@gmail.com"
              className="group inline-flex items-center gap-3 rounded-full bg-[linear-gradient(100deg,var(--plasma-iris),var(--plasma-magenta))] px-9 py-5 font-mono text-sm font-semibold uppercase tracking-wider text-white shadow-[0_24px_70px_-16px_rgba(124,92,255,0.85)] transition-transform duration-300 hover:-translate-y-1"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              umarfarook0yt@gmail.com
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
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
              className="group inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              <link.icon className="h-4 w-4" aria-hidden="true" />
              {link.value}
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" aria-hidden="true" />
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
