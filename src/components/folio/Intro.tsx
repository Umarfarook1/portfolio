import Image from "next/image";
import Link from "next/link";
import { aboutAside, aboutParagraph, philosophy } from "@/content/about";
import { site } from "@/content/site";

// Chapter I. The author, the paragraph, and the one real photograph on the site.
export function Intro() {
  return (
    <section
      className="panel"
      data-section="home-about"
      data-field="paper"
      data-header-bg="#2f2b27"
      data-header-text="#f3efe8"
      data-header-border="#5a524d"
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
            <p className="intro__para" data-about-reveal-intro data-reveal-line>
              {site.intro}
            </p>
            <p className="body" data-reveal-line>
              {aboutParagraph}
            </p>
            <blockquote className="quote" data-about-reveal-quote data-reveal-line>
              {philosophy}
            </blockquote>
          </div>

          <div className="intro__col" data-about-reveal-group-image-shell>
            <figure className="portrait" data-reveal-image-shell>
              <span className="portrait__overlay" data-reveal-image-overlay aria-hidden="true"></span>
              <span className="portrait__wrap opacity-0" data-reveal-image>
                <Image
                  className="portrait__art"
                  src="/avatar.jpg"
                  alt={site.name}
                  fill
                  sizes="(max-width: 767px) 100vw, 420px"
                  priority
                  style={{ objectFit: "cover" }}
                />
              </span>
              <figcaption className="portrait__caption mono">
                Fig. 1, the author
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="chapter-foot">
          <p className="small chapter-foot__note" data-reveal-line>
            {aboutAside}
          </p>
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
        </div>
      </div>
    </section>
  );
}
