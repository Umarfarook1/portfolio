import { evidenceMarginNote, evidenceNote, metrics } from "@/content/evidence";
import { PenNote } from "./PenNote";

// Chapter II. Seven figures, each with its sample size and the repo it came
// from. The pen circles one of them: the delta that came out of an ablation.
export function Evidence() {
  return (
    <section
      className="panel"
      id="evidence"
      data-field="paper-2"
      data-header-bg="#9b1b1b"
      data-header-text="#ffffff"
      data-header-border="#b54747"
      aria-labelledby="ch2-title"
    >
      <div className="panel__inner">
        <div className="chapter-head">
          <p className="chapter-head__no" data-reveal-line>
            Chapter II
          </p>
          <p className="caps chapter-head__label" id="ch2-title">
            The evidence
          </p>
        </div>

        <div className="evidence__grid">
          {metrics.map((m) => (
            <article className="metric" key={`${m.value}-${m.source}`}>
              <p className="metric__value" data-reveal="count">
                {m.pen ? (
                  <span className="pen-circle num" data-pen-circle>
                    {m.value}
                  </span>
                ) : (
                  <span className="num">{m.value}</span>
                )}
                {m.unit ? <span className="unit">{m.unit}</span> : null}
              </p>
              <p className="metric__source" data-reveal-line data-reveal="fade">
                {m.caption}
              </p>
              <p className="metric__project" data-reveal-line data-reveal="fade">
                {m.source}
              </p>
            </article>
          ))}
        </div>

        <div className="chapter-foot">
          <div className="evidence__note">
            <PenNote variant="a">{evidenceMarginNote}</PenNote>
          </div>
          <p className="small chapter-foot__note" data-reveal-line data-reveal="left">
            {evidenceNote}
          </p>
        </div>
      </div>
    </section>
  );
}
