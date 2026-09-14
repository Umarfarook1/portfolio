import { Fragment } from "react";
import { services } from "@/content/services";
import { PenNote } from "./PenNote";

// Chapter VI. The three AI packages as cards, the three software builds as a
// price list. Every word and every figure comes from src/content/services.ts.
export function Studio() {
  const [ai, builds] = services.groups;

  return (
    <section
      className="panel"
      data-field="paper-2"
      data-header-bg="#2f2b27"
      data-header-text="#f3efe8"
      data-header-border="#5a524d"
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

        <div className="studio__grid">
          {ai.packages.map((p) => (
            <article className="package" key={p.code}>
              <span className="package__rule" data-pen-rule aria-hidden="true"></span>
              <h2 className="package__name">{p.name}</h2>
              <p className="package__span">{p.duration}</p>
              <p className="package__price num">{p.price}</p>
              <p className="package__note">{p.note}</p>
            </article>
          ))}
        </div>

        <div className="chapter-foot">
          <dl className="builds">
            {builds.packages.map((p) => (
              <Fragment key={p.code}>
                <dt>{p.name}</dt>
                <dd>{p.price}</dd>
              </Fragment>
            ))}
          </dl>
          <div>
            <PenNote variant="c" style={{ marginBottom: "var(--s-3)" }}>
              launch pricing
            </PenNote>
            <p className="small chapter-foot__note" data-reveal-line>
              {services.after}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
