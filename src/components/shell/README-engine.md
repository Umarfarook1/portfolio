# The engine contract

`FolioRoute` runs the motion. It finds what to animate by querying the markup
inside it for the data attributes below, spelled exactly as they are here
(these are option G's own attributes, so markup copied from
`design-options/option-g.html` already matches). A missing attribute is not an
error: the init that needs it simply does not run, and the markup stays static
and legible.

```tsx
<FolioRoute route="home" | "works" | "about" | "services">{markup}</FolioRoute>
```

Pages never import gsap. `FolioRoute` returns a cleanup that kills every
ScrollTrigger, tween, SplitType instance, listener and animation frame it made.

---

## Everywhere (all four routes)

| Attribute | On | What it does |
|---|---|---|
| `data-reveal-line` | any text block | line reveal, yPercent 102 to 0, 1.7s power3.out, 0.07s per line, once, `left 80%` inside the track and `top 80%` on a sheet |
| `data-line` | a child span of the block above | one pre-split line. Present: the engine masks these and skips split-type. Absent: split-type splits the block at runtime |
| `data-reveal-image-shell` | a figure | the image wipe group |
| `data-reveal-image-overlay` | a span inside the shell | the overlay that wipes, `inset(0 100% 0 0)` to `inset(0)`, 0.7s power2.out |
| `data-reveal-image` | a span inside the shell | the image wrap, same wipe 0.2s later plus xPercent -10 to 0. Ship it with `class="opacity-0"` |
| `data-to-link-underline` | a link | underline fills from the left on hover or focus |
| `data-from-link-underline` | a link | underline starts filled and clears to the right on hover or focus |
| `data-route-link` | a `<Link>` or `<a>` with an internal `href` | the shell covers with the dissolve, then pushes. Add `data-scroll-to="<panel id>"` to land on a chapter |
| `data-header-bg` `data-header-text` `data-header-border` | any `section` or `.sheet` | the rail takes these colours while this element is under its centre, crossfaded over 500ms. All three needed on the same element (border defaults to `#5a524d`) |
| `data-pen-button="solid" \| "outline" \| "scribble"` | a button | the drawn button chrome |
| `data-pen-input` `data-pen-textarea` `data-pen-select` | the span wrapping the control | the drawn field chrome |
| `data-pen-check` `data-pen-radio` `data-pen-toggle` | the span wrapping the input | the drawn control |
| `data-pen-card` `data-pen-badge` `data-pen-rule` | any element | drawn card outline, badge outline, ruled line |
| `data-pen-circle` | an inline span | the loop round a numeral |
| `data-pen-underline` | an inline span | the underline under a word or a phrase. Drawn only once the block around it has finished revealing (the end of the loader on the cover, the end of that block's line reveal anywhere else), so it measures the type where it finally sits and the reveal mask has stopped clipping. It re-measures on resize |
| `data-tone="danger"` | next to `data-pen-input` | draws the field in the error ink |

Everything the pen draws sits inside a `.drawably-host`. The three boil frames
are cycled by CSS (`--drawably-frame`, 1200ms step-end, 450ms while a button is
`data-state="loading"`), frozen under `prefers-reduced-motion`.

---

## route="home"

### The track

| Attribute | On |
|---|---|
| `data-horizontal-story` | the outer `.story` (give it `id="story"`) |
| `data-horizontal-pin` | the `.pin` inside it |
| `data-horizontal-track` | the `.track` inside that, holding the panels |

Every chapter is a `.panel` child of the track. At 768px and up the track is
pinned and scrubbed; at 767px and below it is a plain vertical read and only
the pause pins. Panels that need an id for `data-scroll-to` carry it on the
`<section>` (for example `id="commission"`).

### Chapter 0, the cover

| Attribute | On |
|---|---|
| `data-section="loading"` | the hero `<section class="panel hero">` |
| `data-start-year` `data-end-year` | the same section. The strip counts from one to the other |
| `data-loading-base-overlay` | `.hero__base`, the paper that draws then floods |
| `data-year-row` | the row that holds the strip and its label |
| `data-year-strip` | the strip; one `.year-strip-cell` per year, first to last |
| `data-year-start-text` | the first cell, whose characters count in |
| `data-loading-journey-line` | the label beside the strip. Also carries `data-reveal-line` |
| `data-name-row` | the row the name and lead share with the year row. Ship it with `class="opacity-0"` and `aria-hidden="true"` |
| `data-hero-name` `data-name-heading` | the `<h1>` |
| `data-name-line-text` | one span per name word |
| `data-loading-tagline` | the lead paragraph. Also carries `data-reveal-line` |
| `data-clock` | the span the live time is written into. `data-clock-zone` sets the zone, default `Asia/Kolkata` |

`data-lit="true"` is set on the hero by the engine at the frame the paper
lands; the stylesheet swaps the palette on it. Do not set it in the markup.

The loader runs once per full page load. A client-side return to `/` settles
the cover to its end state instead of replaying the strip.

### Chapter I

`data-section="home-about"` on the section, then
`data-about-reveal-group-trigger` (the chapter head),
`data-about-reveal-label`, `data-about-reveal-intro`,
`data-about-reveal-quote`, and `data-about-reveal-group-image-shell` round the
portrait figure. The three blocks reveal 0.12s apart and the portrait wipes
after them.

### The pause

`data-more-work-section` on the section, `data-more-work-rect` on the collage,
`data-more-work-more` and `data-more-work-work` on the two words.

### Chapter III

`data-section="home-work"` on the section, then:

- `data-work-preview` on the preview box, `data-work-placeholder` on the empty
  state inside it, and one `data-work-image="0" | "1" | ...` per project thumb
- `data-work-list` on the list, `data-work-line` on each hairline
- `data-work-item-index="0" | "1" | ...` on each row, matching the image index
- `data-work-item-text-wrap` on the title span (with a `data-line` inside it),
  `data-work-item-arrow` on the arrow, `data-work-hover-line` on the rule

### Chapter IV

`data-services-section` on the section, then per column `data-service-item`
(give it `tabindex="0"` so the keyboard gets the same plate), with
`data-service-bg-reveal` on the plate and `data-service-bg-media` inside it.

### Chapter V

`data-section="home-clients"` on the section, `data-clients-list` on the list,
`data-client-row` on each row, `data-client-text-wrap` on each name (with a
`data-line` inside it), `data-client-more` on the last, quieter row.

### Chapter VII, the form

`id="commission-form"` on the `<form>` (keep `novalidate`), with:

- `data-mailto="umarfarook0yt@gmail.com"` on the form: Send composes a mailto
  from the fields and opens it. Nothing is posted anywhere
- `id="send-btn"` (or `data-send-button`) on the submit button, with
  `data-pen-button="scribble"`
- `id="book-btn"` (or `data-book-button`) on the secondary button
- `id="form-status"` on the status paragraph, with `role="status"` and
  `aria-live="polite"`
- `id="f-email"` and `name="email"` on the email input. It validates inline on
  blur and clears itself as soon as the address is valid; nothing typed is ever
  discarded
- `name="name"`, `name="need"`, `name="brief"`, `name="hours"`,
  `name="harness"` on the other controls, because the mailto body is built from
  those names
- `data-note-anchor="send"` on the margin note: the pen arrow is drawn from it
  into the Send button. It needs `#commission .commission__grid` as the host

### The colophon

`data-section="home-footer"` on the section, `data-char-line-heading` on the
big heading (ship it with `class="opacity-0"` and `aria-hidden="true"`), with
one `data-name-line-text` span per word, and one `data-reveal-line` block for
the contact lines.

---

## route="works"

| Attribute | On |
|---|---|
| `data-worklist` | the list wrapper |
| `.workrow` + `data-open-detail="<key>"` | each row button. The key is any unique string |
| `id="work-detail"` | the panel, `hidden`, `tabindex="-1"` |
| `data-close-detail` | the Back button inside the panel |
| `data-detail-title` `data-detail-overview` `data-detail-client` `data-detail-year` `data-detail-scope` | the nodes in the panel the text is written into |
| `data-detail-preview` | the link in the panel the preview label and href are written into |
| `data-detail-also` | an optional second link in the panel, hidden until a row fills it |
| `data-detail-next` | the empty container the two next-project buttons are appended to |

**The row carries its own copy.** The engine holds no project text. Each
`.workrow` carries the same attribute names as the panel, with values:

```html
<button type="button" class="workrow"
  data-open-detail="trustbench"
  data-detail-title="TrustBench"
  data-detail-overview="..."
  data-detail-client="Open source"
  data-detail-year="2026"
  data-detail-scope="..."
  data-detail-preview="repository"
  data-detail-preview-href="https://github.com/..."
  data-detail-also="demo"
  data-detail-also-href="https://..."
  data-project-cover="/art/covers/trustbench.webp">
```

Leave `data-detail-preview-href` off for a closed-source row: the link renders
as plain type with `aria-disabled` and no href, labelled `Not public` when
`data-detail-preview` is empty too. `data-detail-also` and
`data-detail-also-href` are the optional second door; with neither, the second
anchor stays hidden.

`data-project-cover` is the drawn 4:3 cover. When a row carries one, opening
its detail grows a `figure.detail__cover` under the title and fills it; a row
with no cover on disk shows no figure at all. The sheet itself stays static
markup: the engine adds the figure on first open and removes it on cleanup.

The panel opens `inset(0 0 100% 0)` to `inset(0)` over 0.62s power3.out and
closes along the mirror of that path, 0.62s power3.in. Escape closes it.

---

## route="about" and route="services"

Nothing beyond the everywhere list. Both are vertical `.sheet` pages, so the
reveals use the `top 80%` start rather than `left 80%`.

---

## Owned by the shell, not by a page

The rail (burger, edition mark, brand, year, scroll rule), the contents
`<dialog id="fullscreen-menu">`, `<div id="dissolve-mount">`, the skip link and
`<main id="main">` are all rendered by `FolioShell` from `layout.tsx`. Pages
must not render a header, a nav or a `<main>`.

The contents menu lists Home, About, Work, Services and Contact, and its top
line reads "Folio, Edition 2026. Seven chapters." If the home route ships a
different number of chapters, that line and the cover edition line both have to
change; they are the same claim.

## Reduced motion

Under `prefers-reduced-motion: reduce` every row of G's motion table collapses
to its end state: the loader settles the cover, the reveals are already at
yPercent 0, the boil freezes on one frame, Lenis never starts, the horizontal
track is neither pinned nor scrubbed at any width (the chapters read top to
bottom), and the route change and the contents field cross-fade over 200ms
instead of wiping.
