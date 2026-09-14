import { allReposLink, closedSourceNote, overviewOf, projects } from "@/content/projects";
import { site } from "@/content/site";
import { art } from "./Art";

/*
  The works route. Twelve rows, one detail panel.

  The panel is filled on the client from the row that opened it, so every row
  carries its own copy of the fields (src/motion/works.ts reads exactly these
  names): data-open-detail, data-detail-title, -overview, -client (the type),
  -year, -scope, -preview (the link label) and -preview-href.

  Two attributes wait for a hook: data-detail-also / -also-href is the optional
  second door, and data-project-cover is the drawn cover. The panel's second
  anchor stays hidden until something fills it, so nothing stale can show.
*/
export function WorksSheet() {
  return (
    <>
      <section
        className="sheet"
        data-field="paper-3"
        data-header-bg="#2f2b27"
        data-header-text="#f3efe8"
        data-header-border="#5a524d"
      >
        <div className="sheet__head">
          <h1 className="sheet__title" data-reveal-line>
            All work ({projects.length})
          </h1>
          <p className="caps" style={{ color: "var(--fg-muted)" }}>
            Folio {"·"} Edition, index
          </p>
        </div>

        <div className="worklist" data-worklist>
          {projects.map((p, i) => (
            <button
              type="button"
              className="workrow"
              data-open-detail={p.slug}
              data-detail-title={p.title}
              data-detail-overview={overviewOf(p)}
              data-detail-client={p.type}
              data-detail-year={p.year}
              data-detail-scope={p.metric}
              data-detail-preview={p.repo ? "repository" : undefined}
              data-detail-preview-href={p.repo ?? undefined}
              data-detail-also={p.also?.label}
              data-detail-also-href={p.also?.href}
              data-project-cover={art("covers", p.slug) ?? undefined}
              key={p.slug}
            >
              <span className="workrow__no num">{String(i + 1).padStart(2, "0")}.</span>
              <span>
                <span className="workrow__kicker">
                  {p.type} {"·"} {p.yearShort}
                </span>
                <span className="workrow__title">{p.title}</span>
              </span>
              <span className="workrow__glyph" aria-hidden="true">
                {"↗"}
              </span>
            </button>
          ))}
        </div>

        <p className="small" style={{ marginTop: "var(--s-5)" }}>
          {"✻"} {closedSourceNote}
        </p>
        <p className="small" style={{ marginTop: "var(--s-3)" }}>
          <a
            className="to-link-underline"
            data-to-link-underline
            href={site.github}
            target="_blank"
            rel="noreferrer"
          >
            {allReposLink} {"↗"}
          </a>
        </p>
      </section>

      <div
        className="detail"
        id="work-detail"
        hidden
        tabIndex={-1}
        role="region"
        aria-label="Project detail"
      >
        <button
          type="button"
          className="detail__back to-link-underline"
          data-to-link-underline
          data-close-detail
        >
          Back
        </button>
        <h2 className="detail__title" data-detail-title>
          Project
        </h2>
        <div className="detail__grid">
          <div>
            <h3 className="caps" style={{ color: "var(--muted)", marginBottom: "var(--s-3)" }}>
              Overview
            </h3>
            <p className="body" data-detail-overview>
              Overview
            </p>
          </div>
          <div>
            <h3 className="caps" style={{ color: "var(--muted)", marginBottom: "var(--s-3)" }}>
              Details
            </h3>
            <dl className="spec">
              <dt>Type</dt>
              <dd data-detail-client>Open source</dd>
              <dt>Year</dt>
              <dd className="num" data-detail-year>
                2026
              </dd>
              <dt>Scope</dt>
              <dd data-detail-scope>Author</dd>
              <dt>Links</dt>
              <dd>
                <a className="to-link-underline" data-to-link-underline data-detail-preview>
                  repository
                </a>{" "}
                <a className="to-link-underline" data-to-link-underline data-detail-also hidden>
                  demo
                </a>
              </dd>
            </dl>
          </div>
        </div>
        <div className="detail__next">
          <p className="caps" style={{ color: "var(--muted)" }}>
            Next projects
          </p>
          <div className="footer__socials" data-detail-next></div>
        </div>
      </div>
    </>
  );
}
