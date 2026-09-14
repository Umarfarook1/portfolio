import Link from "next/link";
import { aboutAside, aboutParagraph } from "@/content/about";
import { site } from "@/content/site";

// Chapter I. Two columns: who he is and what the day is spent on, then the one
// sentence the whole site is built to prove, with the pen under the verb.
export function Intro() {
  return (
    <section
      className="panel"
      data-section="home-about"
      data-field="paper"
      data-header-bg="#9b1b1b"
      data-header-text="#ffffff"
      data-header-border="#b54747"
      aria-labelledby="ch1-title"
    >
      <div className="panel__inner">
        <div className="chapter-head" data-about-reveal-group-trigger>
          <p className="chapter-head__no" data-about-reveal-label data-reveal-line>
            Chapter I
          </p>
          <p className="caps chapter-head__label" id="ch1-title">
            Quick intro
          </p>
        </div>

        <div className="intro__grid">
          <div className="intro__col">
            <p
              className="intro__para"
              data-about-reveal-intro
              data-reveal-line
              data-reveal="left"
            >
              {site.intro}
            </p>
            <p className="body" data-reveal-line data-reveal="fade">
              {aboutParagraph}
            </p>
          </div>

          <div className="intro__col">
            <p
              className="philosophy"
              style={{ fontSize: "var(--d-chapter)" }}
              data-about-reveal-quote
              data-reveal-line
              data-reveal="scale"
            >
              I{" "}
              <span className="pen-underline" data-pen-underline>
                measure
              </span>{" "}
              what I ship.
            </p>
            <p>
              <Link
                className="arrow-link to-link-underline"
                href="/about"
                data-to-link-underline
                data-route-link="about"
              >
                More about me
                <span className="glyph" aria-hidden="true">
                  {"→"}
                </span>
              </Link>
            </p>
          </div>
        </div>

        <div className="chapter-foot">
          <p className="small chapter-foot__note" data-reveal-line data-reveal="fade">
            {aboutAside}
          </p>
        </div>
      </div>
    </section>
  );
}
