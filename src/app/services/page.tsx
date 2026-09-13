import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services · Umarfarook Gurramkonda",
  description:
    "Fixed-price software and AI development for early-stage teams: web, mobile and desktop builds, LLM reliability audits, eval harness sprints and feature builds. Launch pricing.",
  openGraph: {
    title: "Services · Umarfarook Gurramkonda",
    description:
      "Fixed-price software and AI development: web, mobile and desktop builds, LLM audits, eval sprints and feature builds.",
    type: "website",
    url: "/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services · Umarfarook Gurramkonda",
    description:
      "Fixed-price software and AI development: web, mobile and desktop builds, LLM audits, eval sprints and feature builds.",
  },
};

// Every word below comes from src/content/services.ts; nothing here is
// retyped by hand.
export default function ServicesPage() {
  const s = services;

  return (
    <>
      <section className="pb-16 pt-16 sm:pb-20 sm:pt-28">
        <div className="shell">
          <p className="label">{s.eyebrow}</p>
          <h1 className="h1 mt-4 max-w-3xl">{s.headline}</h1>
          <p className="lead mt-6 max-w-2xl">{s.lede}</p>
          <p className="mt-6 max-w-xl text-[15px] text-muted">{s.availability}</p>
        </div>
      </section>

      <section id="packages" aria-labelledby="packages-heading" className="py-16 sm:py-24">
        <div className="shell">
          <div className="border-b border-line pb-6">
            <h2 id="packages-heading" className="label">
              Packages
            </h2>
          </div>

          {s.groups.map((g, gi) => (
            <div key={g.label} className={gi === 0 ? "mt-10" : "mt-16"}>
              <h3 className="h3">{g.label}</h3>
              <p className="mt-2 max-w-2xl text-[15px] leading-6 text-muted">{g.intro}</p>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {g.packages.map((p) => (
                  <article key={p.code} className="card flex h-full flex-col p-6">
                    <p className="tabular text-[13px] text-muted">
                      {p.code} · {p.duration}
                    </p>
                    <h4 className="mt-3 text-[19px] font-semibold leading-tight tracking-tight">
                      {p.name}
                    </h4>
                    <p className="figure mt-4 text-[28px]">{p.price}</p>
                    <p className="mt-2 text-[14px] leading-5 text-muted">{p.note}</p>
                    <ul className="mt-5 flex-1 space-y-2.5 border-t border-line pt-5 text-[15px] leading-6 text-muted">
                      {p.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    <Link href={s.bookingUrl} className="btn btn-secondary mt-6 w-full">
                      {p.cta}
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ))}

          <p className="mt-10 max-w-2xl text-[15px] leading-6 text-muted">{s.pricingNote}</p>
          <p className="mt-3 text-[15px] leading-6">{s.after}</p>
          <p className="mt-2 text-[15px]">
            <Link href="/#evidence" className="link">
              {s.proofLink}
            </Link>
          </p>
        </div>
      </section>

      <section id="how" aria-labelledby="how-heading" className="py-16 sm:py-24">
        <div className="shell">
          <div className="border-b border-line pb-6">
            <h2 id="how-heading" className="label">
              How it works
            </h2>
          </div>

          <ol className="mt-10 grid gap-10 md:grid-cols-3">
            {s.steps.map((st) => (
              <li key={st.n}>
                <p className="tabular text-[13px] text-muted">Step {st.n}</p>
                <h3 className="h3 mt-2">{st.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-muted">{st.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="py-16 sm:py-24">
        <div className="shell">
          <div className="border-b border-line pb-6">
            <h2 id="faq-heading" className="label">
              Questions
            </h2>
          </div>

          <dl className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {s.faq.map((f) => (
              <div key={f.q}>
                <dt className="text-[17px] font-semibold tracking-tight">{f.q}</dt>
                <dd className="mt-2 text-[15px] leading-6 text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="start" aria-labelledby="start-heading" className="py-20 sm:py-32">
        <div className="shell">
          <p className="label">Start</p>
          <h2 id="start-heading" className="h2 mt-4">
            Book 15 minutes.
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <Link href={s.bookingUrl} className="btn btn-primary">
              Book 15 minutes
            </Link>
            <Link href={`mailto:${s.email}`} className="btn btn-secondary">
              Email {s.email}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
