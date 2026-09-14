# DESIGN.md - umarfarook-ai.vercel.app

Single source of truth for the portfolio's design system. If code drifts from this file, this file wins.
Every sentence on the site additionally has to sit inside `getwork/docs/honesty-ledger.md`; this file
governs only how it looks and how it moves.

## Context (from discovery)

- Artifact type: portfolio, plus a services route that sells fixed-price work.
- Positioning: technical, editorial. A printed folio that happens to run in a browser.
- Audience: founders and engineering leads at seed to Series A companies in the EU and US who might book
  a call; hiring managers who arrive from a resume or a repo.
- Primary action: book 15 minutes on Cal.com, or send the mail draft the commission form composes.
- Adjectives: composed, editorial, exact, measured, quiet.
- Visual word translations: composed to a fixed left rail and one grid per chapter; editorial to Roman
  chapter numbers, running heads and a colophon; exact to tabular figures and a sample size under every
  number; measured to one warm ink used only where something was measured.
- Aesthetic essence (3 words): folio, ink, evidence.
- Single-minded proposition: he measures what he ships, and here is the harness.
- References: admire khanhnguyen.design for the pinned horizontal story and its line reveals, drawably
  (MIT, Danilaa1/drawably) for the hand-drawn stroke renderer, and letterpress trade catalogues for the
  chapter chrome. Avoid the dark glassmorphic agency template and the three-icon feature row.
- Mode: light only. The dark chapters are part of the book, not a theme. There is no toggle.
- Density: dense in the chapter chrome, airy in the reading column.
- Constraints: Next.js 16 App Router, React 19, Tailwind v4 kept for utilities, TypeScript, node 24.
  Dependencies limited to gsap, lenis and split-type. No CDN script tags. Deployed on Vercel.

## Aesthetic

- Direction: FOLIO. The site is printed, not designed: a cover, seven numbered chapters, a colophon,
  and an index route for the work.
- Defining trait: the page is a spread. The rail is the spine (70px fixed from 768px up, a 56px bar
  below that), each chapter is one viewport-wide panel, and the story scrolls sideways on a pinned
  track while the page scrolls down.
- Signature move: **the pen only marks what was measured.** One warm ink (#9e3f1c) draws an underline,
  a circle, a rule or a control edge, and it is spent only on a figure that came out of a run: the
  ablation delta, the word "measure" in the services headline, the phrase "eval harness" on the cover.
  Nothing decorative gets the ink.

## Typography

Four families, four roles that never overlap.

- Display: Fraunces (Google, OFL), variable, axes opsz 9 to 144, wght 300 to 900, with SOFT 0 and
  WONK 0 pinned in `font-variation-settings` so the register stays institutional. Chapter numbers, the
  hero name, the pause words, the sheet titles, the menu items, the colophon heading.
- Text and UI: Schibsted Grotesk (Google, OFL), variable 400 to 900, tabular numerals on. Body copy,
  labels, buttons, the metric figures, the work and client rows.
- Data: Spline Sans Mono (Google, OFL), 300 to 700. Sources, meta lines, the rail, table headers,
  years, the colophon credits.
- Hand: Caveat (Google, OFL), 400 to 700. Three margin notes on the whole site and nothing else:
  "the ablation, not the hunch" beside the evidence, "I reply inside a day, most days" beside the form,
  "launch pricing" beside the studio prices.

Text scale, ratio 1.333, base 16px, six steps:

| step | size | line-height | use |
|---|---|---|---|
| t-6 | 50.5px | 1.06 | reserved for sheet display type |
| t-5 | 37.9px | 1.10 | large numerals |
| t-4 | 28.4px | 1.16 | package prices, card figures |
| t-3 | 21.3px | 1.30 | question titles |
| t-2 | 16px | 1.58 | body |
| t-1 | 12px | 1.50 | meta, captions, labels, buttons |

Display sizes sit outside the scale as fluid clamps: hero 67 to 220px, pause 54 to 168px, chapter 38
to 70px, menu 42 to 99px, metric 34 to 50px, work row 32 to 71px.

Tracking: display -0.028em, hero name -0.042em, metric and work rows -0.03em, body 0, caps labels
+0.115em, mono +0.055em. Measure: body caps at 64ch, the lead at 34 to 44ch, the intro paragraph at
24ch. Numerals are tabular everywhere a figure appears.

## Color

Strategy: paper first. Three stocks of off-white carry the chapters, three darks carry the cover, the
wide chapter and the colophon, and exactly one chromatic ink is rationed across the whole site. The
palette is warm and neutral, which is the opposite of the default cool indigo product site.

Distribution: 60 paper, 30 ink, 10 pen.

| role | hex | OKLCH | note |
|---|---|---|---|
| paper | #faf9f6 | oklch(0.982 0.004 91.4) | the page field |
| paper-2 | #f1ece4 | oklch(0.945 0.012 79.8) | raised stock, evidence and studio |
| paper-3 | #e6dfd4 | oklch(0.906 0.017 79.3) | deep stock, the pause and the index |
| char | #262220 | oklch(0.256 0.007 48.4) | charcoal, the cover and chapter IV |
| char-2 | #2e2b28 | oklch(0.291 0.007 67.6) | the contents field |
| black | #1a1917 | oklch(0.214 0.004 84.6) | the colophon |
| ink | #2f2b27 | oklch(0.292 0.009 67.5) | body text on paper |
| ink-2 | #4a4339 | oklch(0.387 0.019 76.8) | secondary text |
| muted | #675e51 | oklch(0.487 0.023 77.1) | meta and sources |
| rule | #cfc7bb | oklch(0.833 0.019 78.2) | decorative hairline |
| rule-2 | #a79d8f | oklch(0.701 0.023 76.5) | table and instrument separators |
| rule-dark | #5a524d | oklch(0.445 0.013 54.2) | hairline on charcoal |
| pen | #9e3f1c | oklch(0.492 0.135 39.3) | THE PEN, one warm ink, rationed |
| pen-light | #d98b52 | oklch(0.706 0.120 55.5) | the same ink lifted for charcoal |
| paper-ink | #f3efe8 | oklch(0.953 0.010 81.8) | text on charcoal |
| paper-muted | #a99f92 | oklch(0.707 0.022 74.6) | meta on charcoal |
| ok | #2f6b44 | oklch(0.477 0.089 153.0) | success, never the only signal |
| err | #9c2f28 | oklch(0.470 0.146 27.8) | error, always with a glyph and words |

Measured contrast (sRGB, 2026-09-14):

| pair | ratio |
|---|---|
| ink on paper | 13.3:1 |
| ink-2 on paper | 9.3:1 |
| muted on paper | 6.1:1 |
| pen on paper | 6.3:1 |
| paper on pen (the solid button) | 6.3:1 |
| ok on paper | 6.0:1 |
| err on paper | 7.0:1 |
| ink on paper-2 | 11.9:1 |
| muted on paper-2 | 5.4:1 |
| ink on paper-3 | 10.6:1 |
| muted on paper-3 | 4.8:1 |
| paper-ink on char | 13.8:1 |
| paper-muted on char | 6.1:1 |
| pen-light on char | 5.8:1 |
| paper-ink on black | 15.3:1 |
| paper-muted on black | 6.7:1 |
| pen-light on black | 6.5:1 |
| paper-ink on char-2 (the contents) | 12.3:1 |

Hairlines are decorative and sit below 3:1 on purpose (rule 1.6:1, rule-2 2.5:1). No hairline is the
only thing carrying meaning.

Per surface, one attribute swaps the working colours: `[data-field="paper-2"]`, `paper-3`, `dark` and
`black` redefine `--field`, `--fg`, `--fg-2`, `--fg-muted`, `--hairline`, `--hairline-2` and
`--accent`. A chapter declares its rail theme with `data-header-bg`, `data-header-text` and
`data-header-border`, and the rail crossfades to it over 500ms.

## Spacing, radius, shadow

- Spacing base 4px: s-1 4, s-2 8, s-3 12, s-4 16, s-5 24, s-6 32, s-7 48, s-8 64, s-9 96, s-10 128.
  s-1 for optical nudges, s-2 label to control, s-3 inside a group, s-4 between groups, s-5 chapter
  chrome, s-6 column gutter, s-7 block break, s-8 section break, s-9 sheet foot.
- Radius: two values only. r-0 0px on everything the press prints, r-1 2px on the focus ring.
- Shadow: none, anywhere. Depth comes from the three paper stocks and from hairlines. Cards are drawn,
  not floated: the sketch renderer strokes their edge.

## Layout and composition

- Grid: editorial, one grid per chapter. Panels are `--vw` wide, chapter IV is 1.64 times that.
  `panel__inner` is a three-row grid: chapter head, content, chapter foot, with a hairline above and
  below the content.
- Gutters: 40px, 28px between 768 and 1080, 20px below 768. The left padding always adds the rail.
- Spacing rhythm: tight within a group (s-2 to s-3), loud between groups (s-5 to s-7).
- Signature layout move: the year strip and the name row share one grid cell, so the loader's handoff
  is a swap in place with no gap left behind at any width.
- Scanning: Z across a chapter, F down a sheet.
- Responsive: desktop-first, two breakpoints. Under 768 the rail becomes a 56px top bar, the track
  stops being horizontal and every panel becomes a full-height vertical section. Between 768 and 1080
  the gutter tightens and the work grid rebalances.

## Components and states

- Buttons: ranked by importance, never coloured by meaning. `.pen-btn--solid` is primary (scribbled
  fill, paper text), `.pen-btn` outline is secondary, a `.to-link-underline` text button is tertiary.
  States: hover lifts 1px on a fine pointer, active presses 1px and scales 0.98 and thickens the drawn
  edge, loading sets `aria-busy` and speeds the boil to 450ms, error and success recolour the ink and
  say so in words, disabled drops to 45% and takes `not-allowed`.
- Inputs: real elements with a drawn edge. Label above, 16px text so iOS does not zoom, hint under the
  field. Validation happens on blur while the field is being filled, never only on submit, and it never
  clears what was typed. The error line pairs the colour with a glyph and a sentence.
- Tables: text left, numbers right, tabular figures, mono headers in caps, hairline separators, wrapped
  in `.table-scroll` so a narrow screen scrolls the table and not the page.
- Overlays: the contents is a real `<dialog>`. Escape closes it, the rest of the document goes inert,
  focus lands on Close and returns to the burger. The work detail is a fixed region that clips open
  and closed, locks the scroll behind it and returns focus to the row that opened it.
- Rows over cards: work, clients, timeline and method entries are hairline-separated rows. The only
  cards are the studio packages, and they are drawn rules, not boxes.
- Empty and loading: the cover runs the loader once per session; every other route paints its end state
  immediately. A cover image that has not been drawn yet falls back to the drawn placeholder thumb, so
  no route ever shows a hole.
- Focus ring: 2px solid `--accent` at 3px offset, 2px radius, on every focusable element.

## Motion

Durations and easings are G's, reproduced value for value. GSAP with ScrollTrigger, Lenis for the
smooth scroll, split-type for the line masks. Every init lives in a `useEffect` and returns a cleanup
that kills its ScrollTriggers, tweens and listeners.

| Name | Trigger | From | To | Duration | Ease | Stagger |
|---|---|---|---|---|---|---|
| Year label chars | load | yPercent 102 | yPercent 0 | 1.70s | power4.inOut | 0.07s |
| Year strip count | after the chars | y 0 | y -(7 cells) | 2.85s | power4.inOut | 0 |
| Base overlay draw | with the strip | scaleX 0 | scaleX 1 | 2.85s | power4.inOut | 0 |
| Base overlay flood | strip end | height 8px | height 100% of the panel | 1.10s | power2.inOut | 0 |
| Field swap, charcoal to ink | the frame the paper lands | light palette on charcoal | ink palette on paper | 1 frame | none, discrete | 0 |
| Year row handoff | 0.42s before strip end | y 0 | y -(own height) | 1.78s | power4.inOut | 0 |
| Year row clear | with the handoff | opacity 1 | opacity 0, visibility hidden | 1.07s | power2.in | 0 |
| Journey line clear | handoff | yPercent 0 | yPercent 102 | 1.70s | power3.out | 0.07s, from end |
| Hero name words | the frame the paper lands | yPercent 102, origin 50% 100% | yPercent 0 | 1.70s | power3.out | 0.20s |
| Hero lead lines | 0.40s after the last name word | yPercent 102 | yPercent 0 | 1.70s | power3.out | 0.20s |
| Hero meta lines | 0.30s after the lead | yPercent 102 | yPercent 0 | 1.70s | power3.out | 0.07s |
| Rail fade in | load, 0.5s delay | opacity 0 | opacity 1 | 2.50s | power3.out | 0 |
| Line reveal (workhorse) | scroll, left 80%, once | yPercent 102 | yPercent 0 | 1.70s | power3.out | 0.07s, 0.20s per block |
| Image overlay wipe | scroll, left 80%, once | inset(0 100% 0 0) | inset(0 0 0 0) | 0.70s | power2.out | 0 |
| Image wipe and slide | 0.20s after the overlay | inset(0 100% 0 0), xPercent -10 | inset(0), xPercent 0 | 0.70s | power2.out | 0 |
| Horizontal track | scroll, pinned, scrubbed | x 0 | x -(track minus viewport) | scrub | none | 0 |
| Work pause rect | one viewport of scroll | scale 0 | scale cover | scrub | none | 0 |
| Work pause words | same scroll | x plus or minus 1.1% vw | x plus or minus half the cover | scrub | none | 0 |
| Work rows enter | scroll, left 50%, once | yPercent 102, hairline scaleX 0 | yPercent 0, scaleX 1 | 1.00s | power3.out | 0.12s |
| Work preview | row hover or focus | scale 0 | scale 1 | 0.45s | power3.out | 0 |
| Work hover rule | row hover or focus | scaleX 0, origin left | scaleX 1 | 1.00s | power3.out | 0 |
| Work siblings dim | row hover or focus | opacity 1 | opacity 0.25 | 0.30s | power3.out | 0 |
| Service plate in | column hover or focus | inset(100% 0 0 0), yPercent 6 | inset(0), yPercent -3 | 0.80s | power3.out | 0 |
| Service plate out | column leave or blur | inset(0), yPercent -3 | inset(0 0 100% 0), yPercent -9 | 0.80s | power3.out | 0 |
| Clients reveal | scroll, left 75%, once | yPercent 102 | yPercent 0 | 1.70s | power3.out | 0.15s |
| Footer words | scroll, left 60%, once | yPercent 102, origin 50% 100% | yPercent 0 | 1.70s | power3.out | 0.20s |
| Underline fill | hover or focus-within | scaleX 0, origin left | scaleX 1 | 0.40s | cubic-bezier(.21,0,.32,1) | 0 |
| Underline clear | leave, after the fill lands | scaleX 1, origin right | scaleX 0 | 0.40s | cubic-bezier(.21,0,.32,1) | 0 |
| Contents open | burger click | inset(0 100% 0 0) | inset(0 0 0 0) | 0.88s | power3.out | 0 |
| Contents items | 0.14s into the open | yPercent 102 | yPercent 0 | 1.00s | power2.out | 0.07s, 0.15s per item |
| Contents active rule | 0.50s after its item | scaleX 0, origin left | scaleX 1 | 0.70s | power2.out | 0 |
| Contents close | Close, Escape, or a link | inset(0 0 0 0) | inset(0 100% 0 0) | 0.58s | power3.in | 0.07s, from end |
| Burger bars | open or close | width 32, x 0 | width 0, x 32 | 0.70s | power2.inOut | 0 |
| Rail recolour | chapter under the rail centre | previous chapter theme | next chapter theme | 0.50s | ease-out | 0 |
| Scroll rule | scroll, rAF throttled | scaleY 0 | scaleY 1 | frame | none | 0 |
| Route dissolve, cover | nav or route link | uProgress 1.5 | uProgress -0.75 | 0.85s | power1.in | 0 |
| Route dissolve, clear | the new route is mounted | uProgress -0.75 | uProgress 1.5 | 0.70s | power1.out | 0 |
| Detail panel open | work row click | inset(0 0 100% 0) | inset(0 0 0 0) | 0.62s | power3.out | 0 |
| Sketch boil | always, three variants | frame 0 | frame 2 | 1.20s loop | step-end | 0 |
| Sketch boil, loading | button state loading | frame 0 | frame 2 | 0.45s loop | step-end | 0 |
| Press feedback | pointer down on any button | translateY 0, scale 1 | translateY 1px, scale 0.98 | 0.12s | cubic-bezier(0.2,0,0,1) | 0 |
| Hover lift | hover, fine pointer only | translateY 0 | translateY -1px | 0.12s | cubic-bezier(0.2,0,0,1) | 0 |
| Checkbox draw | checked | stroke-dashoffset 1 | stroke-dashoffset 0 | 0.24s | cubic-bezier(0.2,0,0,1) | 0 |
| Radio dot | checked | scale 0.5 | scale 1 | 0.16s | cubic-bezier(0.2,0,0,1) | 0 |
| Toggle knob | checked | translateX 0 | translateX 20px | 0.16s | cubic-bezier(0.2,0,0,1) | 0 |

Reduced motion: under `prefers-reduced-motion: reduce` every row above collapses to its end state, the
boil freezes on one frame, Lenis is never started, and the horizontal chapters become a plain vertical
read. Nothing is hidden in the first place: the entrance styles are gated on a `.has-motion` class that
an inline script adds only when the libraries can run, so a browser with no scripting gets a legible
page.

## Iconography

There is no icon set. The four marks on the site are typographic or drawn: the arrow glyphs (right
arrow for an internal jump, north-east arrow for an external one), the six-pointed asterisk that opens
a footnote, the two-bar burger drawn as two SVG rects that animate their width, and the sketch
renderer's strokes. Stroke width 1.7 for controls, 1.5 for underlines and circles, round caps and
joins.

## Imagery and illustration

- Mode: illustration. Project covers (4:3) and chapter plates (vertical) are ink drawings on paper,
  generated for this site and stored at `public/art/covers/<slug>.webp` and
  `public/art/plates/<slug>.webp`.
- Never a product screenshot, never a mockup in a laptop shell, never a stock photograph, never a logo
  wall. The work is proved by numbers and repos, not by pictures of screens.
- The one photograph is the portrait, `public/avatar.jpg`, 400 x 400, a real photo of the owner,
  captioned "Fig. 1, the author, unretouched".
- Every image goes through `next/image` with `fill` and a `sizes` attribute, inside the reveal shell so
  the overlay wipes it in. `art()` asks the filesystem at render time; a missing file falls back to the
  drawn placeholder thumb, so the build never breaks while art is still being drawn.
- Text over image: no text sits over an image anywhere. The service plates sit behind a column whose
  text stays on the charcoal field, and the plate is only ever a backdrop at 22% striping.

## Accessibility

- Contrast: every text pair above 4.5:1, most above 6:1; the figures are in the palette table and were
  measured on 2026-09-14. Colour never carries meaning alone: success and error pair with a glyph and a
  sentence.
- Focus: 2px accent ring at 3px offset on every focusable element, and every hover state has a matching
  focus state (work rows, service columns, index rows).
- Keyboard: the whole site is operable. The contents dialog traps focus and returns it, the detail
  panel returns focus to its row, Escape closes both, Enter submits the form from any single-line
  control.
- Targets: 44px on buttons and menu items, and the small caps links take vertical padding so they clear
  24px with the rule moved down to match.
- Landmarks and headings: one h1 per route (the hero name on home, the sheet title elsewhere), section
  headings in order, a skip link to the folio, `aria-labelledby` on every chapter.
- Reduced motion: see the motion section. Live regions: the form status is `role="status"` with
  `aria-live="polite"`.
- Images: the portrait has a real alt, covers and plates are decorative and take an empty alt, drawn
  SVG is `aria-hidden`.

## Tokens (source of truth)

```css
:root{
  --f-display:"Fraunces",Georgia,"Times New Roman",serif;
  --f-text:"Schibsted Grotesk","Helvetica Neue",Helvetica,Arial,sans-serif;
  --f-mono:"Spline Sans Mono",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
  --f-hand:"Caveat","Segoe Script","Bradley Hand",cursive;

  --t-1:0.75rem; --t-2:1rem; --t-3:1.333rem; --t-4:1.777rem; --t-5:2.369rem; --t-6:3.157rem;
  --d-hero:clamp(4.2rem,13.2vw,13.75rem);
  --d-pause:clamp(3.4rem,10.4vw,10.5rem);
  --d-chapter:clamp(2.4rem,5.2vw,4.4rem);
  --d-menu:clamp(2.6rem,7.4vw,6.2rem);
  --d-metric:clamp(2.1rem,3.5vw,3.1rem);
  --d-work:clamp(2rem,4.6vw,4.45rem);

  --lh-tight:1.02; --lh-snug:1.18; --lh-body:1.58;
  --tr-tight:-0.028em; --tr-caps:0.115em; --tr-caps-2:0.055em;

  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-5:24px;
  --s-6:32px; --s-7:48px; --s-8:64px; --s-9:96px; --s-10:128px;
  --r-0:0px; --r-1:2px;

  --paper:#faf9f6; --paper-2:#f1ece4; --paper-3:#e6dfd4;
  --char:#262220; --char-2:#2e2b28; --black:#1a1917;
  --ink:#2f2b27; --ink-2:#4a4339; --muted:#675e51;
  --rule:#cfc7bb; --rule-2:#a79d8f; --rule-dark:#5a524d;
  --pen:#9e3f1c; --pen-light:#d98b52;
  --paper-ink:#f3efe8; --paper-muted:#a99f92;
  --ok:#2f6b44; --err:#9c2f28;

  --field:var(--paper); --fg:var(--ink); --fg-2:var(--ink-2); --fg-muted:var(--muted);
  --hairline:var(--rule); --hairline-2:var(--rule-2); --accent:var(--pen);

  --rail:70px; --gutter:40px; --vw:100vw; --vh:100dvh;

  --e-out:cubic-bezier(0.23,1,0.32,1);
  --e-inout:cubic-bezier(0.77,0,0.175,1);
  --e-underline:cubic-bezier(.21,0,.32,1);
  --e-press:cubic-bezier(0.2,0,0,1);
  --d-press:120ms; --d-hover:180ms; --d-theme:500ms;
}
```

Adapter: plain CSS in `src/app/globals.css`. Tailwind v4 stays imported for utilities, but the Folio
custom properties are the design system, and the font families resolve to the `next/font` variables set
on `<html>`.

## Kill list

Dark mode toggle; a second accent; shadows and glassmorphism; rounded corners beyond the 2px focus
ring; product screenshots, device mockups, logo walls and stock photography; icon-tile feature rows;
counters that animate a number that was never measured; a cursor follower; framer-motion and three.js;
Inter, Geist and system-ui as a primary face; em dashes and exclamation marks in copy; naming a mobile
or desktop framework; the word React on its own.

## Slop audit

- Date: 2026-09-14. Result: pass, 6 tells fixed during the port.
- Fixed: the dummy persona and its city, agency and hobbies (replaced with the owner's real content, no
  placeholder survives); a headline that promised what the page did not show ("Where numbers find their
  proof"); a "Some repos are private, ask for access" line that hedged instead of naming the two closed
  systems; a fabricated eval-runs table; a sub-agent count the ledger retires (the stages are named
  instead); a skills line that listed React on its own.
- Craft layer: hover states all have focus twins, the form validates on blur and keeps what was typed,
  the boil freezes and the track unstacks under reduced motion, the index rows are buttons that open a
  real region rather than links that go nowhere.
- Accessibility gate: passed on contrast, focus, keyboard, targets, headings, reduced motion and colour
  independence. The figures are in the palette table.

## Changelog

- 2026-09-14 v5 "FOLIO" - the printed folio: Fraunces, Schibsted Grotesk, Spline Sans Mono and Caveat;
  three paper stocks and one warm ink; a pinned horizontal story of seven chapters with a loader, a
  contents dialog, route dissolves and the drawn control kit. Replaces v4. The pen only marks what was
  measured.
- 2026-09-13 v4 "QUIET SANS" - light, static, Instrument Sans, pills and hairlines. Superseded.
- 2026-07-16 v3 "GRADIENT DESCENT" - dark cinematic, point-cloud portrait, framer-motion. Superseded.
- 2026-07-16 v2 "Offprint" - superseded.
