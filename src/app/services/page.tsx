import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { Rise } from "@/components/ui/Rise";
import { TokenStream } from "@/components/ui/TokenStream";

export const metadata: Metadata = {
  title: "Services · Umarfarook Gurramkonda",
  description:
    "Fixed-price LLM reliability audits, eval harness sprints and feature builds for early-stage teams. Agents, RAG, NL-to-SQL, measured.",
  openGraph: {
    title: "Services · Umarfarook Gurramkonda",
    description:
      "Fixed-price LLM reliability audits, eval harness sprints and feature builds for early-stage teams.",
    type: "website",
    url: "/services",
  },
};

// Sibling of Method and Contact: same shell, same mono section captions, same
// display scale (section-large, ~4.5vw; this page is not the hero, so it
// never touches the hero-monumental scale). Every word below comes from
// src/content/services.ts; nothing here is retyped by hand.
export default function ServicesPage() {
  const s = services;

  return (
    <>
      <section className="relative pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="shell">
          <p className="mono-label text-lo">{s.eyebrow}</p>
          <TokenStream
            as="h1"
            text={s.headline}
            wonkWord={s.wonkWord}
            className="display mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.6rem)] text-hi"
          />
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-lo">{s.lede}</p>
          <p className="mono-label mt-6 max-w-xl text-ember">{s.availability}</p>
        </div>
      </section>

      <section id="packages" aria-labelledby="packages-heading" className="relative py-16 sm:py-20">
        <div className="shell">
          <div className="border-b border-line pb-5">
            <h2 id="packages-heading" className="mono-label text-lo">
              01 / packages
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {s.packages.map((p, i) => (
              <Rise key={p.code} delay={i * 0.06}>
                <article className="flex h-full flex-col rounded-[2px] border border-line bg-panel p-6">
                  <p className="mono-label text-lo">
                    {p.code} · {p.duration}
                  </p>
                  <h3 className="display mt-3 text-2xl text-hi">{p.name}</h3>
                  <p className="display mt-2 text-3xl text-hi">{p.price}</p>
                  <p className="mt-1 text-sm text-lo">{p.note}</p>
                  <ul className="mt-5 flex-1 space-y-2 text-[15px] leading-relaxed text-lo">
                    {p.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <Link
                    href={s.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="runcmd caret mt-6 inline-block rounded-[2px] px-4 py-3 text-center text-sm"
                  >
                    {p.cta}
                  </Link>
                </article>
              </Rise>
            ))}
          </div>
          <p className="mt-6 text-[15px] text-lo">{s.after}</p>
        </div>
      </section>

      <section id="how" aria-labelledby="how-heading" className="relative py-16 sm:py-20">
        <div className="shell">
          <div className="border-b border-line pb-5">
            <h2 id="how-heading" className="mono-label text-lo">
              02 / how it works
            </h2>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {s.steps.map((st, i) => (
              <Rise key={st.n} delay={i * 0.06}>
                <p className="mono-label text-lo">step {st.n}</p>
                <h3 className="mt-2 text-xl text-hi">{st.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-lo">{st.body}</p>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-heading" className="relative py-16 sm:py-20">
        <div className="shell">
          <div className="border-b border-line pb-5">
            <h2 id="faq-heading" className="mono-label text-lo">
              03 / questions
            </h2>
          </div>

          <dl className="mt-10 grid gap-8 md:grid-cols-2">
            {s.faq.map((f, i) => (
              <Rise key={f.q} delay={i * 0.05}>
                <dt className="text-lg text-hi">{f.q}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-lo">{f.a}</dd>
              </Rise>
            ))}
          </dl>
        </div>
      </section>

      <section id="start" aria-labelledby="start-heading" className="relative py-24 sm:py-32">
        <div className="shell">
          <h2 id="start-heading" className="mono-label text-lo">
            04 / start
          </h2>
          <Rise delay={0.1} className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link
              href={s.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="runcmd caret inline-block rounded-[2px] px-5 py-3.5 text-sm"
            >
              book 20 minutes
            </Link>
            <Link href={`mailto:${s.email}`} className="text-sm text-lo underline-offset-4 hover:underline">
              or email {s.email}
            </Link>
          </Rise>
        </div>
      </section>
    </>
  );
}
