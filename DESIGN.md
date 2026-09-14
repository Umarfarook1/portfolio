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
- Adjectives: composed, editorial, exact, measured, direct.
- Visual word translations: composed to a fixed left rail and one grid per chapter; editorial to Roman
  chapter numbers, running heads and a colophon; exact to tabular figures and a sample size under every
  number; measured to one red used only where something was measured.
- Aesthetic essence (3 words): red, ink, evidence.
- Single-minded proposition: he measures what he ships, and here is the harness.
- References: admire khanhnguyen.design for the pinned horizontal story and its line reveals, drawably
  (MIT, Danilaa1/drawably) for the hand-drawn stroke renderer, and letterpress trade catalogues for the
  chapter chrome. Avoid the dark glassmorphic agency template and the three-icon feature row.
- Mode: light only. The red chapters are part of the book, not a theme. There is no toggle.
- Density: dense in the chapter chrome, airy in the reading column.
- Constraints: Next.js 16 App Router, React 19, Tailwind v4 kept for utilities, TypeScript, node 24.
  Dependencies limited to gsap, lenis and split-type. No CDN script tags. Deployed on Vercel.

## Aesthetic

- Direction: RED AND WHITE. The site is printed, not designed: a cover, seven numbered chapters, a
  colophon, and an index route for the work, set in red on white.
- Defining trait: the page is a spread. The rail is the spine (70px fixed from 768px up, a 56px bar
  below that), each chapter is one viewport-wide panel, and the story scrolls sideways on a pinned
  track while the page scrolls down. The rail always carries the inverse of the chapter behind it, so
  the spine flips white to red as the story moves.
- Signature move: **the pen only marks what was measured.** One red (#c8102e) draws an underline, a
  circle, a rule or a control edge, and it is spent only where something was measured or decided: the
  ablation delta, the verb in "I measure what I ship", the word "measure" in the services headline,
  the phrase "eval harness" on the cover, the last stop on the career map. Nothing decorative gets it.

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

Strategy: red and white. One pure white field, three tints of it, three reds that run from the
chapter ground to the colophon, and one saturated red that is the pen. The site reads as printed
matter in two inks, which is the opposite of the cool indigo product site and of the beige folio it
replaced.

Distribution: 60 white, 30 red ground, 10 pen.

| role | hex | OKLCH | note |
|---|---|---|---|
| paper | #ffffff | oklch(1.000 0.000 90) | the page field, pure white |
| paper-2 | #fbf3f2 | oklch(0.970 0.009 26.0) | raised stock, evidence and studio |
| paper-3 | #f6e9e8 | oklch(0.944 0.014 22.8) | deep stock, the pause and the index |
| char | #9b1b1b | oklch(0.448 0.163 27.0) | the red chapters: cover base, chapter IV, the pause rect |
| char-2 | #7f1515 | oklch(0.388 0.141 26.8) | the contents dialog field |
| black | #5c0f0f | oklch(0.311 0.109 26.4) | the colophon field |
| ink | #1a1212 | oklch(0.192 0.013 18.4) | body text on white |
| ink-2 | #4a2c2c | oklch(0.331 0.045 19.7) | secondary text |
| muted | #7d5a5a | oklch(0.504 0.046 18.8) | meta and sources |
| rule | #e8d4d4 | oklch(0.886 0.022 17.6) | decorative hairline |
| rule-2 | #cfb0b0 | oklch(0.784 0.036 17.9) | table and instrument separators |
| rule-dark | #b54747 | oklch(0.546 0.144 23.1) | hairline on a red ground |
| pen | #c8102e | oklch(0.530 0.207 22.3) | THE PEN, one red, rationed |
| pen-light | #ffb3b3 | oklch(0.839 0.089 19.1) | the pen lifted for the red chapters |
| paper-ink | #ffffff | oklch(1.000 0.000 90) | text on a red ground |
| red-ink-2 | #f3d9d9 | oklch(0.907 0.029 17.7) | secondary and meta text on a red ground |
| paper-muted | #e9d6d5 | oklch(0.891 0.021 21.2) | the collage screen fills |
| ok | #2f6b44 | oklch(0.477 0.089 153.0) | success, never the only signal |
| err | #8a1c1c | oklch(0.416 0.146 26.3) | error, always with a glyph and words |

Measured contrast (sRGB, 2026-09-14):

| pair | ratio |
|---|---|
| ink on white | 18.4:1 |
| ink-2 on white | 12.4:1 |
| muted on white | 6.0:1 |
| pen on white | 5.9:1 |
| white on pen (the solid button) | 5.9:1 |
| ok on white | 6.4:1 |
| err on white | 9.3:1 |
| ink on paper-2 | 16.9:1 |
| muted on paper-2 | 5.5:1 |
| ink on paper-3 | 15.6:1 |
| muted on paper-3 | 5.1:1 |
| white on char (the red chapters) | 8.2:1 |
| red-ink-2 on char | 6.1:1 |
| pen-light on char | 4.8:1 |
| white on char-2 (the contents) | 10.4:1 |
| white on black (the colophon) | 13.7:1 |
| red-ink-2 on black | 10.3:1 |
| pen-light on black | 8.1:1 |
| char on white (the rail, red on white) | 8.2:1 |

On a saturated red ground two near white tints read as one, so the second and third text levels share
red-ink-2 and take their hierarchy from size and weight instead. Hairlines are decorative and sit
below 3:1 on purpose (rule 1.4:1, rule-2 2.0:1, rule-dark on red 1.5:1). No hairline is the only thing
carrying meaning.

Per surface, one attribute swaps the working colours: `[data-field="paper-2"]`, `paper-3`, `dark` and
`black` redefine `--field`, `--fg`, `--fg-2`, `--fg-muted`, `--hairline`, `--hairline-2` and
`--accent`. A chapter declares its rail theme with `data-header-bg`, `data-header-text` and
`data-header-border`, and the rail crossfades to it over 500ms. Three themes only: a white chapter
carries `#9b1b1b / #ffffff / #b54747`, a red chapter carries `#ffffff / #9b1b1b / #e8d4d4`, and the
colophon carries `#ffffff / #5c0f0f / #e8d4d4`.

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
- Chapter V is a map, not a list: one drawn route across the panel with five stops placed on it by
  percent coordinates, and it stacks top to bottom under 768px.
- Chapter VI is six equal cards in two labelled rows of three, so the software build prices sit beside
  the AI packages instead of hiding in a foot list.
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
- Select: no native `<select>` anywhere. The commission form uses a drawn listbox: a toggle button with
  `aria-haspopup="listbox"` and `aria-expanded`, a `role="listbox"` of options, and a hidden input that
  carries the value. Arrow keys, Home, End, type-ahead, Enter, Space and Escape all work, and focus
  returns to the toggle on close.
- Rows over cards: work, timeline and method entries are hairline-separated rows. The only cards are
  the studio packages (six of them, in two labelled rows) and the career stops, and they are drawn
  rules, not boxes.
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
| Cover slideshow | chapter III on screen, no row hovered | opacity 0, scale 1.03 | opacity 1, scale 1, a cover every 2.8s | 0.70s | power2.out | 0 |
| Slideshow resume | 1.5s after the pointer or focus leaves a row | the cover that was held | the cycle | 0.70s | power2.out | 0 |
| Career route draw | chapter V 60% on screen | stroke-dashoffset 100% | stroke-dashoffset 0 | 1.60s | power2.inOut | 0 |
| Career stop marker | the route reaches the stop | scale 0 | scale 1 | 0.50s | back.out(1.6) | to the route progress |
| Career stop text | with its marker | y 12px, opacity 0 | y 0, opacity 1 | 0.60s | power3.out | to the route progress |
| Career stop lift | stop hover or focus | translateY 0, marker stroke 1x | translateY -4px, thicker marker stroke | 0.12s | cubic-bezier(0.2,0,0,1) | 0 |
| Select open | toggle click, Space, Enter or ArrowDown | inset(0 0 100% 0) | inset(0 0 0 0) | 0.28s | power3.out | 0 |
| Chapter snap | scrolling stops on the pinned track | where the scroll stopped | the nearest chapter start | 0.25s to 0.70s | power2.inOut | 0.12s delay, directional |

Entrance variants. Every text block can name its entrance with `data-reveal`, so the story does not
rise from the bottom nine times in a row. The trigger stays the same: once, when 80% of the block is
on screen inside the track.

| value | motion |
|---|---|
| `bottom` | the line reveal above, and the default when the attribute is absent |
| `left` | lines slide in from the left, xPercent -60 with a clip from the left, 1.2s power3.out, stagger 0.06 |
| `right` | the mirror of left |
| `top` | lines drop from above, yPercent -102, the timing of bottom |
| `fade` | opacity 0 to 1 with a 12px blur clearing, 1.0s power2.out, stagger 0.08 |
| `scale` | the block scales 0.92 to 1 with opacity, origin 50% 100%, 0.9s power3.out |
| `count` | numerals count from 0 to the printed value over 1.4s power2.out, tabular figures held, unit and formatting kept |
| `flip` | the block rotates in from rotateX 60deg, origin top, with opacity, 1.0s power3.out |
| `clip-top` | a clip-path wipe from the top edge down, 0.9s power2.out |
| `draw` | SVG strokes draw with stroke-dashoffset, 1.2s power2.inOut |

Assignment: the cover keeps the loader choreography, with the lead `fade` and the meta `top`; chapter I
intro `left`, about paragraph `fade`, statement `scale`; chapter II figures `count` with captions
`fade` and the footnote `left`; the pause is unchanged; chapter III rows `right` and footnote `fade`;
chapter IV columns `clip-top` and statement `left`; chapter V `draw`; chapter VI cards `flip` with a
0.08s stagger and notes `fade`; chapter VII form `draw`; the colophon words `top`. Sheets: /work rows
`left`, /about blocks `fade`, /services cards `flip`. Images keep the wipe.

Reduced motion: under `prefers-reduced-motion: reduce` every row above collapses to its end state, the
boil freezes on one frame, Lenis is never started, and the horizontal chapters become a plain vertical
read. The slideshow holds the first cover and hover swaps it instantly, the career route and its stops
are already drawn, the listbox appears without a clip, and nothing snaps. Nothing is hidden in the
first place: the entrance styles are gated on a `.has-motion` class that an inline script adds only
when the libraries can run, so a browser with no scripting gets a legible page.

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
- No photograph appears on the site. `public/avatar.jpg` (400 x 400, a real photo of the owner) stays
  in the repo for a social card, and nothing on a page renders it.
- Every image goes through `next/image` with `fill` and a `sizes` attribute, inside the reveal shell so
  the overlay wipes it in. `art()` asks the filesystem at render time; a missing file falls back to the
  drawn placeholder thumb, so the build never breaks while art is still being drawn.
- Covers are white paper with ink lines and a red accent; plates are a deep red ground with white
  lines, so a plate behind a red column reads as a second printing of the same ink.
- Text over image: no text sits over an image anywhere. The service plates sit behind a column whose
  text stays on the red field, and the plate is only ever a backdrop at 22% striping.
- The one drawn illustration that is not art on disk is the career route, an SVG path stroked in
  rule-2 that the chapter draws as the reader arrives.

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
  headings in order, a skip link to the content, `aria-labelledby` on every chapter.
- Reduced motion: see the motion section. Live regions: the form status is `role="status"` with
  `aria-live="polite"`.
- Images: covers and plates are decorative and take an empty alt, drawn SVG is `aria-hidden`.
- The listbox is a real listbox: `aria-haspopup`, `aria-expanded`, `role="listbox"` and
  `role="option"` with `aria-selected`, labelled by the field label, operable from the keyboard, and
  the value rides in a hidden input so the form works the same way it did with a native select.

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

  --paper:#ffffff; --paper-2:#fbf3f2; --paper-3:#f6e9e8;
  --char:#9b1b1b; --char-2:#7f1515; --black:#5c0f0f;
  --ink:#1a1212; --ink-2:#4a2c2c; --muted:#7d5a5a;
  --rule:#e8d4d4; --rule-2:#cfb0b0; --rule-dark:#b54747;
  --pen:#c8102e; --pen-light:#ffb3b3;
  --paper-ink:#ffffff; --paper-muted:#e9d6d5; --red-ink-2:#f3d9d9;
  --ok:#2f6b44; --err:#8a1c1c;

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

Adapter: plain CSS in `src/app/globals.css`. Tailwind v4 stays imported for utilities, but these custom
properties are the design system, and the font families resolve to the `next/font` variables set on
`<html>`. Components never inline a hex: a drawn SVG takes `currentColor` or `var(--token)`, and the
only hex a component carries is the three-value rail theme on a panel.

## Kill list

Dark mode toggle; a second accent; shadows and glassmorphism; rounded corners beyond the 2px focus
ring; product screenshots, device mockups, logo walls and stock photography; icon-tile feature rows;
counters that animate a number that was never measured; a cursor follower; framer-motion and three.js;
Inter, Geist and system-ui as a primary face; em dashes and exclamation marks in copy; naming a mobile
or desktop framework; the word React on its own; the words Folio and Edition as visible copy; a native
select; every block entering from the bottom.

## Slop audit

- Date: 2026-09-14, revision 1. Result: pass, 6 tells fixed during the port and 3 in the revision.
- Fixed: the dummy persona and its city, agency and hobbies (replaced with the owner's real content, no
  placeholder survives); a headline that promised what the page did not show ("Where numbers find their
  proof"); a "Some repos are private, ask for access" line that hedged instead of naming the two closed
  systems; a fabricated eval-runs table; a sub-agent count the ledger retires (the stages are named
  instead); a skills line that listed React on its own.
- Revision 1 fixed: a magazine mannerism the owner did not ask for (the words Folio and Edition on the
  rail, the cover, the contents and three sheet heads, all removed); a portrait with a caption that
  performed candour instead of showing work (gone, the chapter now carries the one sentence the site
  exists to prove); nine chapters that all entered from the bottom, which read as one template rather
  than a book (ten named entrance variants, one per chapter).
- Craft layer: hover states all have focus twins, the form validates on blur and keeps what was typed,
  the boil freezes and the track unstacks under reduced motion, the index rows are buttons that open a
  real region rather than links that go nowhere, the listbox is operable from the keyboard, and the
  slideshow yields to the pointer instead of fighting it.
- Accessibility gate: passed on contrast, focus, keyboard, targets, headings, reduced motion and colour
  independence. The figures are in the palette table.

## Changelog

- 2026-09-14 revision 1 "RED AND WHITE" - the palette moves from paper and rust to red on white, with
  the rail carrying the inverse of its chapter. The words Folio and Edition leave the site. Chapter I
  drops the portrait for a statement in Fraunces with the pen under the verb. Chapter III swaps the
  empty placeholder box for a slideshow of the covers that yields to hover. Chapter V becomes a drawn
  career map with five stops. Chapter VI shows all six packages as cards, so the web, mobile and
  desktop prices are in the story. The native select becomes a drawn listbox. The track snaps to the
  nearest chapter when scrolling stops, and ten named entrance variants replace the single rise from
  the bottom.
- 2026-09-14 v5 "FOLIO" - the printed folio: Fraunces, Schibsted Grotesk, Spline Sans Mono and Caveat;
  three paper stocks and one warm ink; a pinned horizontal story of seven chapters with a loader, a
  contents dialog, route dissolves and the drawn control kit. Replaces v4. The pen only marks what was
  measured.
- 2026-09-13 v4 "QUIET SANS" - light, static, Instrument Sans, pills and hairlines. Superseded.
- 2026-07-16 v3 "GRADIENT DESCENT" - dark cinematic, point-cloud portrait, framer-motion. Superseded.
- 2026-07-16 v2 "Offprint" - superseded.
