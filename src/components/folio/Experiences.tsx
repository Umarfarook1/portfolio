import Link from "next/link";
import { experienceNote, experiences } from "@/content/experience";

// Chapter V. Where the numbers came from: two roles, one degree, two published
// packages. The last row points at the about sheet rather than claiming more.
export function Experiences() {
  return (
    <section
      className="panel"
      data-section="home-clients"
      data-field="paper"
      data-header-bg="#2f2b27"
      data-header-text="#f3efe8"
      data-header-border="#5a524d"
      aria-labelledby="ch5-title"
    >
      <div className="panel__inner">
        <div className="chapter-head" data-clients-label>
          <p className="chapter-head__no" data-reveal-line>
            Chapter V
          </p>
          <p className="caps chapter-head__label" id="ch5-title">
            Selected experiences
          </p>
        </div>

        <div className="clients__list" data-clients-list>
          {experiences.map((e, i) => {
            const last = i === experiences.length - 1;
            return (
              <div
                className={last ? "client client--more" : "client"}
                data-client-row
                data-client-more={last ? "" : undefined}
                key={e.name}
              >
                <span className="client__name" data-client-text-wrap>
                  <span data-line>{e.name}</span>
                </span>
                <span className="client__role">{e.role}</span>
              </div>
            );
          })}
        </div>

        <div className="chapter-foot">
          <p className="small chapter-foot__note" data-reveal-line>
            {experienceNote}
          </p>
          <Link
            className="arrow-link to-link-underline"
            href="/about"
            data-to-link-underline
            data-route-link="about"
          >
            Career journey
            <span className="glyph" aria-hidden="true">
              {"→"}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
