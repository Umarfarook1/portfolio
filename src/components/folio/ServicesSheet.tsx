import Link from "next/link";
import { services } from "@/content/services";

/*
  The services route. Every word comes from src/content/services.ts, in the
  order that file sets. The pen marks one word in the headline, the same word
  the file already names as the one to mark.
*/
export function ServicesSheet() {
  const parts = services.headline.split(services.wonkWord);
  const before = parts[0] ?? services.headline;
  const after = parts.slice(1).join(services.wonkWord);

  return (
    <section
      className="sheet"
      data-field="paper-2"
      data-header-bg="#9b1b1b"
      data-header-text="#ffffff"
      data-header-border="#b54747"
    >
      <div className="sheet__head">
        <h1 className="sheet__title" data-reveal-line>
          {before}
          <span className="pen-underline" data-pen-underline>
            {services.wonkWord}
          </span>
          {after}
        </h1>
        <p className="caps" style={{ color: "var(--fg-muted)" }}>
          {services.eyebrow}
        </p>
      </div>

      <div className="about__grid sheet__section">
        <p className="lead" style={{ maxWidth: "52ch" }} data-reveal-line>
          {services.lede}
        </p>
        <p className="small">{services.availability}</p>
      </div>

      {services.groups.map((g) => (
        <div className="sheet__section" key={g.label}>
          <div className="sheet__legend">
            <h2 className="caps">{g.label}</h2>
            <p className="mono" style={{ color: "var(--fg-muted)" }}>
              {g.packages.length} packages
            </p>
          </div>
          <p className="body" style={{ marginBottom: "var(--s-6)" }}>
            {g.intro}
          </p>
          <div className="studio__grid">
            {g.packages.map((p) => (
              <article className="package" data-reveal="flip" key={p.code}>
                <span className="package__rule" data-pen-rule aria-hidden="true"></span>
                <h3 className="package__name">{p.name}</h3>
                <p className="package__span">
                  {p.code} {"·"} {p.duration}
                </p>
                <p className="package__price num">{p.price}</p>
                <p className="package__note">{p.note}</p>
                <ul style={{ display: "grid", gap: "var(--s-2)", marginTop: "var(--s-3)" }}>
                  {p.deliverables.map((d) => (
                    <li className="small" key={d}>
                      {d}
                    </li>
                  ))}
                </ul>
                <p style={{ marginTop: "var(--s-4)" }}>
                  <a
                    className="pen-btn"
                    data-pen-button="outline"
                    href={services.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {p.cta}
                  </a>
                </p>
              </article>
            ))}
          </div>
        </div>
      ))}

      <div className="sheet__section">
        <p className="body">{services.pricingNote}</p>
        <p className="body" style={{ marginTop: "var(--s-3)" }}>
          {services.after}
        </p>
        <p className="small" style={{ marginTop: "var(--s-3)" }}>
          <Link
            className="to-link-underline"
            data-to-link-underline
            href="/"
            data-route-link="home"
            data-scroll-to="evidence"
          >
            {services.proofLink}
          </Link>
        </p>
      </div>

      <div className="sheet__section">
        <div className="sheet__legend">
          <h2 className="caps">How it works</h2>
          <p className="mono" style={{ color: "var(--fg-muted)" }}>
            three steps
          </p>
        </div>
        <ol className="spec-grid">
          {services.steps.map((st) => (
            <li key={st.n}>
              <p className="mono" style={{ color: "var(--fg-muted)" }}>
                Step {st.n}
              </p>
              <h3 className="package__name" style={{ marginTop: "var(--s-2)" }}>
                {st.title}
              </h3>
              <p className="body" style={{ marginTop: "var(--s-2)" }}>
                {st.body}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="sheet__section">
        <div className="sheet__legend">
          <h2 className="caps">Questions</h2>
          <p className="mono" style={{ color: "var(--fg-muted)" }}>
            {services.faq.length} of them
          </p>
        </div>
        <dl className="spec-grid">
          {services.faq.map((f) => (
            <div key={f.q}>
              <dt className="package__name" style={{ fontSize: "var(--t-3)" }}>
                {f.q}
              </dt>
              <dd className="body" style={{ marginTop: "var(--s-2)" }}>
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="sheet__section">
        <div className="sheet__legend">
          <h2 className="caps">Start</h2>
          <p className="mono" style={{ color: "var(--fg-muted)" }}>
            fifteen minutes
          </p>
        </div>
        <div className="btn-row">
          <a
            className="pen-btn pen-btn--solid"
            data-pen-button="solid"
            href={services.bookingUrl}
            target="_blank"
            rel="noreferrer"
          >
            Book 15 minutes
          </a>
          <a className="pen-btn" data-pen-button="outline" href={`mailto:${services.email}`}>
            Email {services.email}
          </a>
        </div>
      </div>
    </section>
  );
}
