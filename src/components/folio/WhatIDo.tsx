import Link from "next/link";
import { disciplines } from "@/content/about";
import { services } from "@/content/services";
import { Plate } from "./Art";

// Chapter IV. The wide dark chapter. Four columns, each with a drawn plate that
// rises behind it on hover or focus.
export function WhatIDo() {
  return (
    <section
      className="panel panel--wide"
      data-services-section
      data-field="dark"
      data-header-bg="#f1ece4"
      data-header-text="#2f2b27"
      data-header-border="#cfc7bb"
      aria-labelledby="ch4-title"
    >
      <div className="panel__inner">
        <div className="chapter-head">
          <p className="chapter-head__no" data-reveal-line>
            Chapter IV
          </p>
          <p className="caps chapter-head__label" id="ch4-title">
            What I do
          </p>
        </div>

        <div className="services__cols">
          <p className="services__lead" data-reveal-line>
            {services.headline}
          </p>

          {disciplines.map((d) => (
            <article className="service" data-service-item tabIndex={0} key={d.no}>
              <span className="service__bg" data-service-bg-reveal aria-hidden="true">
                <span className="service__media" data-service-bg-media>
                  <Plate slug={d.slug} sizes="(max-width: 767px) 100vw, 26vw" />
                </span>
              </span>
              <p className="service__no num">{d.no}</p>
              <h2 className="service__title">{d.title}</h2>
              <p className="service__desc">{d.desc}</p>
            </article>
          ))}
        </div>

        <div className="chapter-foot">
          <p className="small chapter-foot__note" data-reveal-line>
            Hover a column to see the plate behind it.
          </p>
          <Link
            className="arrow-link to-link-underline"
            href="/services"
            data-to-link-underline
            data-route-link="services"
          >
            Prices and packages
            <span className="glyph" aria-hidden="true">
              {"→"}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
