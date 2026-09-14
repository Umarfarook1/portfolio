import { services } from "@/content/services";
import { site } from "@/content/site";
import { PenNote } from "./PenNote";

/*
  Chapter VII. Every control is a real input with a drawn edge. Send builds a
  mail draft from the fields and opens it, so nothing is posted anywhere and
  nothing is stored. The engine module owns that behaviour; this file owns the
  markup and the addresses it needs.
*/
export function Commission() {
  return (
    <section
      className="panel"
      id="commission"
      data-field="paper"
      data-header-bg="#9b1b1b"
      data-header-text="#ffffff"
      data-header-border="#b54747"
      aria-labelledby="ch7-title"
    >
      <div className="panel__inner">
        <div className="chapter-head">
          <p className="chapter-head__no" data-reveal-line>
            Chapter VII
          </p>
          <p className="caps chapter-head__label" id="ch7-title">
            The commission
          </p>
        </div>

        <div className="commission__grid">
          <div className="commission__aside">
            <p className="lead" data-reveal-line>
              {services.steps[0].body}
            </p>
            <div className="commission__note-slot">
              <PenNote variant="b" anchor="send">
                I reply inside a day, most days
              </PenNote>
            </div>
            <p className="small">
              Send opens your email app with this filled in. Nothing is stored.
            </p>
          </div>

          <form
            className="form"
            id="commission-form"
            data-mailto={site.email}
            data-reveal="draw"
            noValidate
          >
            <div className="form__row">
              <div className="field">
                <label htmlFor="f-name">Your name</label>
                <span className="pen-input" data-pen-input>
                  <input id="f-name" name="name" type="text" autoComplete="name" required />
                </span>
              </div>
              <div className="field">
                <label htmlFor="f-email">Email</label>
                <span className="pen-input" data-pen-input>
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@company.com"
                    aria-describedby="f-email-hint"
                  />
                </span>
                <p className="field__hint" id="f-email-hint">
                  I read my own inbox. I reply inside a day, most days.
                </p>
              </div>
            </div>

            <div className="field">
              <label id="need-label" htmlFor="need-toggle">
                What do you need
              </label>
              <div className="select" data-select data-pen-select>
                <button
                  type="button"
                  className="select__toggle"
                  data-select-toggle
                  aria-haspopup="listbox"
                  aria-expanded="false"
                  id="need-toggle"
                >
                  <span data-select-label>Audit</span>
                  <span className="select__chevron" aria-hidden="true">
                    <svg viewBox="0 0 16 10" width="14" height="9" focusable="false">
                      <path
                        d="M1 1l7 7 7-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <ul
                  className="select__list"
                  role="listbox"
                  data-select-list
                  aria-labelledby="need-label"
                  tabIndex={-1}
                  hidden
                >
                  <li role="option" data-value="audit" aria-selected="true">
                    Audit
                  </li>
                  <li role="option" data-value="sprint" aria-selected="false">
                    Sprint
                  </li>
                  <li role="option" data-value="feature" aria-selected="false">
                    Feature build
                  </li>
                  <li role="option" data-value="software" aria-selected="false">
                    Software build
                  </li>
                </ul>
                <input type="hidden" name="need" defaultValue="audit" data-select-value />
              </div>
            </div>

            <div className="field">
              <label htmlFor="f-brief">Tell me about it</label>
              <span className="pen-textarea" data-pen-textarea>
                <textarea
                  id="f-brief"
                  name="brief"
                  rows={4}
                  placeholder="The model has to read a quote email and return six fields."
                ></textarea>
              </span>
            </div>

            <div className="choice-row">
              <label className="choice">
                <span className="pen-check" data-pen-check>
                  <input type="checkbox" id="f-harness" name="harness" defaultChecked />
                </span>
                <span>Send me the harness</span>
              </label>
              <label className="choice">
                <span className="pen-toggle" data-pen-toggle>
                  <input type="checkbox" id="f-reply" name="reply" defaultChecked />
                </span>
                <span>Reply by email</span>
              </label>
            </div>

            <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
              <legend className="caps" style={{ padding: 0, color: "var(--ink-2)" }}>
                Hours
              </legend>
              <div className="choice-row">
                <label className="choice">
                  <span className="pen-radio" data-pen-radio>
                    <input type="radio" name="hours" value="eu" defaultChecked />
                  </span>
                  <span>EU</span>
                </label>
                <label className="choice">
                  <span className="pen-radio" data-pen-radio>
                    <input type="radio" name="hours" value="us" />
                  </span>
                  <span>US</span>
                </label>
              </div>
            </fieldset>

            <div className="form__actions">
              <button
                type="submit"
                className="pen-btn pen-btn--solid"
                id="send-btn"
                data-pen-button="solid"
              >
                Send
              </button>
              <a
                className="pen-btn"
                id="book-btn"
                data-pen-button="outline"
                href={site.bookingUrl}
                target="_blank"
                rel="noreferrer"
              >
                Book 15 min
              </a>
              <span className="pen-kbd" data-pen-card aria-hidden="true">
                Enter
              </span>
            </div>
            <p className="form__status" id="form-status" role="status" aria-live="polite"></p>
          </form>
        </div>

        <div className="chapter-foot">
          <p className="small chapter-foot__note" data-reveal-line>
            Every control on this form is drawn by the sketch renderer at boil 0.2. The inputs
            underneath are real.
          </p>
          <a
            className="arrow-link to-link-underline"
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            data-to-link-underline
          >
            Resume
            <span className="glyph" aria-hidden="true">
              {"↗"}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
