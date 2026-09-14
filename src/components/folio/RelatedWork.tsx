import Link from "next/link";
import { closedSourceNote, related } from "@/content/projects";
import { Cover } from "./Art";

// Chapter III. Four projects, each with a drawn cover that scales up under the
// row you point at. The two closed-source systems are named in the footnote
// instead, because they have nothing to link to.
export function RelatedWork() {
  return (
    <section
      className="panel"
      data-section="home-work"
      data-field="paper"
      data-header-bg="#9b1b1b"
      data-header-text="#ffffff"
      data-header-border="#b54747"
      aria-labelledby="ch3-title"
    >
      <div className="panel__inner">
        <div className="chapter-head" data-work-label>
          <p className="chapter-head__no" data-reveal-line>
            Chapter III
          </p>
          <p className="caps chapter-head__label" id="ch3-title">
            Related work
          </p>
        </div>

        <div className="work__grid">
          <div className="work__preview" data-work-preview data-work-slideshow aria-hidden="true">
            {related.map((p, i) => (
              <span className="work__image" data-work-image={String(i)} key={p.slug}>
                <Cover
                  slug={p.slug}
                  alt=""
                  variant={i}
                  sizes="(max-width: 767px) 100vw, 32vw"
                />
              </span>
            ))}
          </div>

          <div className="work__list" data-work-list>
            <span className="work__hair" data-work-line></span>
            {related.map((p, i) => (
              <div className="work__row" data-work-item-index={String(i)} key={p.slug}>
                <Link className="work__link" href="/work" data-route-link="works">
                  <span className="work__text" data-work-item-text-wrap data-reveal="right">
                    <span data-line>{p.title}</span>
                  </span>
                  <span className="work__meta">
                    {p.yearShort} {"·"} {p.category}
                  </span>
                  <span className="work__arrow" data-work-item-arrow aria-hidden="true">
                    {"↗"}
                  </span>
                </Link>
                <span className="work__hoverline" data-work-hover-line></span>
                <span className="work__hair" data-work-line></span>
              </div>
            ))}
          </div>
        </div>

        <div className="chapter-foot">
          <p className="small chapter-foot__note" data-reveal-line data-reveal="fade">
            {"✻"} {closedSourceNote}
          </p>
          <Link
            className="arrow-link to-link-underline"
            href="/work"
            data-to-link-underline
            data-route-link="works"
          >
            View all work
            <span className="glyph" aria-hidden="true">
              {"→"}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
