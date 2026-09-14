import { site } from "@/content/site";

/*
  Chapter 0. The loader runs here: the year strip counts 2020 to 2026, the paper
  floods the charcoal field, and the name takes the stage the years leave. The
  pen marks one phrase in the lead, the part that is measured.
*/
export function Cover() {
  return (
    <section
      className="panel hero"
      data-section="loading"
      data-start-year={site.startYear}
      data-end-year={site.endYear}
      data-header-bg="#262220"
      data-header-text="#f3efe8"
      data-header-border="#5a524d"
      aria-label={`${site.name}, cover`}
    >
      <div className="hero__base" data-loading-base-overlay></div>
      <div className="hero__inner">
        <div className="hero__edition">
          <p className="mono" data-reveal-line>
            {site.edition}
          </p>
          <p className="mono" data-reveal-line>
            {site.chapterCount}
          </p>
        </div>

        <div className="hero__stage">
          <div className="year-row" data-year-row>
            <div className="year-window" aria-hidden="true">
              <div className="year-strip" data-year-strip>
                <span className="year-strip-cell" data-year-start-text>
                  {site.years[0]}
                </span>
                {site.years.slice(1).map((year) => (
                  <span className="year-strip-cell" key={year}>
                    {year}
                  </span>
                ))}
              </div>
            </div>
            <p className="year-label" data-loading-journey-line data-reveal-line>
              A journey through years of shipping
            </p>
          </div>

          <div className="hero__name-row opacity-0" data-name-row aria-hidden="true">
            <h1 className="hero__name" data-hero-name data-name-heading>
              <span data-name-line-text>{site.firstName}</span>
              <span data-name-line-text>{site.lastName}</span>
            </h1>
            <p className="hero__lead" data-loading-tagline data-reveal-line>
              <span data-line>I build multi-agent LLM systems and</span>
              <span data-line>natural-language interfaces over data,</span>
              <span data-line>plus the web, mobile and desktop apps</span>
              <span data-line>around them. I ship each one behind an</span>
              <span data-line>
                <span className="pen-underline" data-pen-underline>
                  eval harness
                </span>{" "}
                and a hard cost cap,
              </span>
              <span data-line>and the repos are public.</span>
            </p>
          </div>
        </div>

        <div className="hero__meta">
          <p data-reveal-line>
            {site.location} <span className="num" data-clock>{"--:--"}</span>
          </p>
          <p data-reveal-line>{site.availability}</p>
          <p data-reveal-line>{site.hours}</p>
          <p className="hero__scroll" data-reveal-line>
            Scroll
            <span className="glyph" aria-hidden="true">
              {"→"}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
