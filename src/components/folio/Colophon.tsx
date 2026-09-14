import { site } from "@/content/site";

// The last panel. Near black, two display words, the address as the one
// permanently underlined link on the site, and the printing credits.
export function Colophon() {
  return (
    <section
      className="panel"
      data-section="home-footer"
      data-field="black"
      data-header-bg="#f1ece4"
      data-header-text="#2f2b27"
      data-header-border="#cfc7bb"
      aria-label="Contact"
    >
      <div className="footer__inner">
        <div className="footer__top">
          <p className="caps" style={{ color: "var(--fg-muted)" }}>
            Contact
          </p>
          <div className="footer__socials">
            <a
              className="from-link-underline"
              data-from-link-underline
              href={site.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="from-link-underline"
              data-from-link-underline
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="from-link-underline"
              data-from-link-underline
              href={site.bookingUrl}
              target="_blank"
              rel="noreferrer"
            >
              Cal.com
            </a>
            <a
              className="from-link-underline"
              data-from-link-underline
              href={site.resume}
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
          </div>
        </div>

        <div className="footer__mid">
          <h2 className="footer__heading opacity-0" data-char-line-heading aria-hidden="true">
            <span data-name-line-text>Next</span>
            <span data-name-line-text>Chapter</span>
          </h2>
          <div className="footer__contact" data-reveal-line>
            <a
              className="footer__email from-link-underline"
              data-from-link-underline
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
            <span className="mono" style={{ color: "var(--fg-muted)" }}>
              {site.availability}
            </span>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="mono">{site.copyright}</p>
          <p className="mono" style={{ color: "var(--fg-muted)" }}>
            {site.colophon}
          </p>
          <p className="caps" style={{ color: "var(--fg-muted)" }}>
            {site.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
