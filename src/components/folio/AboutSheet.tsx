import {
  aboutParagraph,
  methodAside,
  methodStages,
  philosophy,
  stackAside,
  stackGroups,
} from "@/content/about";
import { certifications, education, roles } from "@/content/experience";
import { site } from "@/content/site";

// The about route. The paragraph, the two roles with what each one actually
// was, the degree, the certifications, the stack and the four method stages
// with a repo under every one of them.
export function AboutSheet() {
  return (
    <section
      className="sheet"
      data-field="paper"
      data-header-bg="#2f2b27"
      data-header-text="#f3efe8"
      data-header-border="#5a524d"
    >
      <div className="sheet__head">
        <h1 className="sheet__title" data-reveal-line>
          About me
        </h1>
        <p className="caps" style={{ color: "var(--fg-muted)" }}>
          Folio {"·"} Edition, the author
        </p>
      </div>

      <div className="about__grid sheet__section">
        <p className="lead" style={{ maxWidth: "44ch" }} data-reveal-line>
          {site.intro}
        </p>
        <p className="philosophy" data-reveal-line>
          {philosophy}
        </p>
      </div>

      <div className="sheet__section">
        <div className="sheet__legend">
          <h2 className="caps">The day job</h2>
          <p className="mono" style={{ color: "var(--fg-muted)" }}>
            what I spend the day on
          </p>
        </div>
        <p className="body" data-reveal-line>
          {aboutParagraph}
        </p>
      </div>

      <div className="sheet__section">
        <div className="sheet__legend">
          <h2 className="caps">Career journey</h2>
          <p className="mono" style={{ color: "var(--fg-muted)" }}>
            2020 to now
          </p>
        </div>
        <ul className="timeline">
          {roles.map((r) => (
            <li key={r.org}>
              <span className="timeline__years">{r.when}</span>
              <span className="timeline__role">{r.title}</span>
              <span className="timeline__org">{r.org}</span>
              <p className="body" style={{ gridColumn: "1 / -1", marginTop: "var(--s-3)" }}>
                {r.body}
              </p>
              <p className="mono" style={{ gridColumn: "1 / -1", color: "var(--fg-muted)" }}>
                {r.tags}
              </p>
            </li>
          ))}
          <li>
            <span className="timeline__years">{education.when}</span>
            <span className="timeline__role">{education.title}</span>
            <span className="timeline__org">{education.org}</span>
            <p className="mono" style={{ gridColumn: "1 / -1", color: "var(--fg-muted)" }}>
              {education.note}
            </p>
          </li>
        </ul>
      </div>

      <div className="sheet__section">
        <div className="sheet__legend">
          <h2 className="caps">Certifications</h2>
          <p className="mono" style={{ color: "var(--fg-muted)" }}>
            Oracle, Azure and AWS
          </p>
        </div>
        <ul>
          {certifications.map((c) => (
            <li className="body" key={c}>
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="sheet__section">
        <div className="sheet__legend">
          <h2 className="caps">Stack</h2>
          <p className="mono" style={{ color: "var(--fg-muted)" }}>
            {stackAside}
          </p>
        </div>
        <div className="spec-grid">
          {stackGroups.map((g) => (
            <div key={g.label}>
              <h3 className="caps" style={{ color: "var(--fg-muted)", marginBottom: "var(--s-3)" }}>
                {g.label}
              </h3>
              <ul>
                {g.items.map((item) => (
                  <li className="body" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="sheet__section">
        <div className="sheet__legend">
          <h2 className="caps">Method</h2>
          <p className="mono" style={{ color: "var(--fg-muted)" }}>
            {methodAside}
          </p>
        </div>
        <ol className="timeline">
          {methodStages.map((s) => (
            <li key={s.id}>
              <span className="timeline__years num">{s.id}</span>
              <span className="timeline__role">{s.name}</span>
              <span className="timeline__org">
                <a
                  className="to-link-underline"
                  data-to-link-underline
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.proof} {"↗"}
                </a>
              </span>
              <p className="body" style={{ gridColumn: "1 / -1", marginTop: "var(--s-3)" }}>
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="sheet__section">
        <div className="sheet__legend">
          <h2 className="caps">Open for work</h2>
          <p className="mono" style={{ color: "var(--fg-muted)" }}>
            {site.location}
          </p>
        </div>
        <p>
          <a
            className="footer__email from-link-underline"
            data-from-link-underline
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
        </p>
        <p className="small" style={{ marginTop: "var(--s-4)" }}>
          {site.availability}. {site.hours}.
        </p>
        <p className="small" style={{ marginTop: "var(--s-3)" }}>
          <a
            className="to-link-underline"
            data-to-link-underline
            href={site.resume}
            target="_blank"
            rel="noreferrer"
          >
            Resume {"↗"}
          </a>
        </p>
      </div>
    </section>
  );
}
