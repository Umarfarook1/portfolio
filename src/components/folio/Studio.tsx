import { services } from "@/content/services";
import { PenNote } from "./PenNote";

/*
  Chapter VI. All six packages as equal cards, three to a row, under the group
  label they belong to. The software builds are cards now, not a foot list, so
  a visitor who came for a web, mobile or desktop build sees the price without
  leaving the story.
*/
export function Studio() {
  return (
    <section
      className="panel"
      data-field="paper-2"
      data-header-bg="#9b1b1b"
      data-header-text="#ffffff"
      data-header-border="#b54747"
      aria-labelledby="ch6-title"
    >
      <div className="panel__inner">
        <div className="chapter-head">
          <p className="chapter-head__no" data-reveal-line>
            Chapter VI
          </p>
          <p className="caps chapter-head__label" id="ch6-title">
            The studio
          </p>
        </div>

        <div
          className="studio__groups"
          style={{
            display: "grid",
            gap: "clamp(18px,2.6vw,40px)",
            alignContent: "center",
            minHeight: 0,
          }}
        >
          {services.groups.map((g) => (
            <div className="studio__group" key={g.label}>
              <p
                className="caps studio__group-label"
                style={{ color: "var(--fg-muted)", marginBottom: "var(--s-3)" }}
              >
                {g.label}
              </p>
              <div className="studio__grid">
                {g.packages.map((p) => (
                  <article className="package" data-reveal="flip" key={p.code}>
                    <span className="package__rule" data-pen-rule aria-hidden="true"></span>
                    <h2 className="package__name">{p.name}</h2>
                    <p className="package__span">
                      {p.code} {"·"} {p.duration}
                    </p>
                    <p className="package__price num">{p.price}</p>
                    <p className="package__note">{p.note}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="chapter-foot">
          <PenNote variant="c">launch pricing</PenNote>
          <p className="small chapter-foot__note" data-reveal-line data-reveal="fade">
            {services.after}
          </p>
        </div>
      </div>
    </section>
  );
}
