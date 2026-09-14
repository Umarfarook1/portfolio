import type { CSSProperties } from "react";
import Link from "next/link";
import { careerMap, careerRoute, experienceNote } from "@/content/experience";

/*
  Chapter V. The career map: one drawn route from the degree to now, with five
  stops on it. The route draws itself, each stop pops as the line reaches it,
  and under 768px the route runs top to bottom and the stops stack.
  The pen circles the last stop, the one the reader can act on.
*/
export function Experiences() {
  return (
    <section
      className="panel"
      data-section="home-clients"
      data-field="paper"
      data-header-bg="#9b1b1b"
      data-header-text="#ffffff"
      data-header-border="#b54747"
      aria-labelledby="ch5-title"
    >
      <div className="panel__inner">
        <div className="chapter-head" data-clients-label>
          <p className="chapter-head__no" data-reveal-line>
            Chapter V
          </p>
          <p className="caps chapter-head__label" id="ch5-title">
            Career map
          </p>
        </div>

        <div className="career" data-career-map>
          <svg
            className="career__map"
            data-map-path
            data-reveal="draw"
            viewBox="0 0 1000 400"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="career__route"
              data-map-route
              d={careerRoute}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {careerMap.map((s) => (
            <article
              className="career__stop"
              data-map-stop={String(s.stop)}
              data-x={String(s.x)}
              data-y={String(s.y)}
              style={{ "--x": `${s.x}%`, "--y": `${s.y}%` } as CSSProperties}
              key={s.stop}
            >
              <span
                className="career__marker"
                data-map-marker
                data-pen-circle={s.stop === careerMap.length ? "" : undefined}
                aria-hidden="true"
              ></span>
              <p className="mono career__year">{s.year}</p>
              <h3 className="career__title">{s.title}</h3>
              <p className="career__line">{s.line}</p>
            </article>
          ))}
        </div>

        <div className="chapter-foot">
          <p className="small chapter-foot__note" data-reveal-line data-reveal="fade">
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
