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
| `data-header-bg` `data-header-text` `data-header-border` | any `section` or `.sheet` | the rail takes these colours while this element is under its centre, crossfaded over 500ms. All three needed on the same element (border defaults to `#b54747`) |
| `data-pen-button="solid" \| "outline" \| "scribble"` | a button | the drawn button chrome |
| `data-pen-input` `data-pen-textarea` `data-pen-select` | the span wrapping the control | the drawn field chrome |
| `data-pen-check` `data-pen-radio` `data-pen-toggle` | the span wrapping the input | the drawn control |
| `data-pen-card` `data-pen-badge` `data-pen-rule` | any element | drawn card outline, badge outline, ruled line |
| `data-pen-circle` | an inline span | the loop round a numeral |
| `data-pen-underline` | an inline span | the underline under a word or a phrase. Drawn only once the block around it has finished revealing (the end of the loader on the cover, the end of that block's line reveal anywhere else), so it measures the type where it finally sits and the reveal mask has stopped clipping. It re-measures on resize |
| `data-tone="danger"` | next to `data-pen-input` | draws the field in the error ink |
| `data-reveal="<name>"` | any `data-reveal-line` block | which entrance the block gets, from the table below. Absent means `bottom`, the ported line reveal |

### data-reveal, the entrance variants

| value | motion |
|---|---|
| `bottom` | the ported line reveal, yPercent 102 to 0, 1.70s power3.out, 0.07s per line. The default |
| `left` | lines in from the left, xPercent -60 with a clip from the left, 1.20s power3.out, 0.06s |
| `right` | the mirror of `left` |
| `top` | lines drop from above, yPercent -102, the same timing as `bottom` |
| `fade` | opacity with a 12px blur clearing, 1.00s power2.out, 0.08s |
| `scale` | the block from 0.92, origin 50% 100%, with opacity, 0.90s power3.out |
| `count` | numerals count up to the printed value, 1.40s power2.out. The first numeric run inside each `.num`, `.metric__value` or `[data-count]` is the one that moves and its formatting is kept: 14/15 counts the 14, 2,680 keeps its comma, 0.782 keeps three decimals, +33 and ~4.1 keep the character in front |
| `flip` | the block from rotateX 60deg, origin top, with opacity, 1.00s power3.out |
| `clip-top` | a clip wipe from the top edge down, 0.90s power2.out |
| `draw` | strokes draw on. A block holding pen chrome draws each control over 0.60s, 0.05s apart; a block holding plain SVG draws its strokes over 1.20s power2.inOut |

The colophon heading reads `data-reveal` as well: `top` sends its words down
from above instead of up from below. Chapter I's three blocks and Chapter III's
row list each read their own. Under `prefers-reduced-motion` no variant runs;
every block is simply at its end state.

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
the pause pins.

When the wheel stops on the pinned track the engine settles on the nearest
chapter start: the panel starts are held as progress values (the pause holds one
viewport of scroll and is accounted for), the settle waits 120ms of a quiet
scroll position, and the move takes 0.25s to 0.7s on power2.inOut, scaled by how
far it has to go.

Two things differ from the first plan, both for a reason. The move is driven
through Lenis rather than through ScrollTrigger's own `snap`: ScrollTrigger
writes the scroll position behind Lenis's back and Lenis puts it straight back,
so nothing moved. And it settles on the nearest chapter rather than the next one
in the direction of travel, because a directional rule turns a 40px nudge into a
whole page turn, and the ask was the nearest chapter.

Under 768px the same job is done in CSS, `scroll-snap-type: y proximity` on the
document and `scroll-snap-align: start` on each panel. Reduced motion does not
snap, and the sheets never snap. Panels that need an id for `data-scroll-to` carry it on the
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

- `data-work-preview` on the preview box, with one
  `data-work-image="0" | "1" | ...` per project cover inside it
- `data-work-slideshow` on that same box turns it into a slideshow: with no row
  hovered the covers cycle every 2.8s with a 0.7s cross-fade (opacity plus a
  1.03 to 1 scale settle, power2.out). It runs only while the chapter is on
  screen. Hovering or focusing a row stops the cycle and shows that row's cover
  with the 0.45s scale-in; leaving resumes the cycle from that cover after 1.5s.
  Under reduced motion the frame shows the first cover and hover swaps at once.
  `data-work-placeholder` is optional now, and is only used when the box is not
  a slideshow
- `data-work-list` on the list, `data-work-line` on each hairline
- `data-work-item-index="0" | "1" | ...` on each row, matching the image index
- `data-work-item-text-wrap` on the title span (with a `data-line` inside it),
  `data-work-item-arrow` on the arrow, `data-work-hover-line` on the rule

### Chapter IV

`data-services-section` on the section, then per column `data-service-item`
(give it `tabindex="0"` so the keyboard gets the same plate), with
`data-service-bg-reveal` on the plate and `data-service-bg-media` inside it.

### Chapter V, the career map

`data-section="home-clients"` on the section, then:

| Attribute | On |
|---|---|
| `data-career-map` | the `div.career` holding the route and the stops |
| `data-map-path` | the inline `<svg>` laid over the whole map |
| `data-map-route` | the single `<path>` inside it, left edge to right edge |
| `data-map-stop="1..5"` | each `article.career__stop` |
| `data-x` `data-y` | that stop's percent position on the map, plain numbers. The markup may also set `--x` and `--y` inline; the engine writes the same two properties from these attributes |
| `data-map-marker` | the `span` on the stop the pen draws as a ring. The last stop also carries `data-pen-circle` and gets the pen loop |

Inside a stop the engine animates `.career__year`, `.career__title` and
`.career__line`, so those three class names are part of the contract.

The route draws with stroke-dashoffset over 1.6s power2.inOut once the chapter
is 60% on screen; each marker pops (scale 0 to 1, 0.5s back.out(1.6)) and its
card rises 12px with opacity (0.6s power3.out) as the route reaches it, timed
from `data-x` on desktop and from `data-y` under 768px. Hover and focus lift the
card 4px and thicken the marker stroke, both in CSS. Reduced motion draws the
route and every stop at once.

Until the engine has placed the stops the container has no `data-map-ready` and
the stylesheet stacks them as a plain list, so the chapter reads with no script.

The old clients list (`data-clients-list`, `data-client-row`,
`data-client-text-wrap`, `data-client-more`) still works when it is present.

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
  those names. `need` is the hidden input inside the custom dropdown below

### The custom dropdown

```html
<div class="select" data-select data-pen-select>
  <button type="button" class="select__toggle" data-select-toggle
          aria-haspopup="listbox" aria-expanded="false" id="need-toggle">
    <span data-select-label>Audit</span>
    <span class="select__chevron" aria-hidden="true"><!-- svg --></span>
  </button>
  <ul class="select__list" role="listbox" data-select-list
      aria-labelledby="need-label" tabindex="-1" hidden>
    <li role="option" data-value="audit" aria-selected="true">Audit</li>
  </ul>
  <input type="hidden" name="need" value="audit" data-select-value>
</div>
```

The engine binds every `[data-select]` on the route. Click, Space, Enter or
ArrowDown on the toggle opens the list with a clip wipe, `inset(0 0 100% 0)` to
`inset(0)` over 0.28s power3.out, and it closes along the mirror of that path.
Arrows move the active option, Home and End jump, a letter jumps, Enter or Space
selects, Escape and an outside click close and hand focus back to the toggle.
`[data-select-label]` takes the chosen text and `[data-select-value]` takes the
option's `data-value`, which is what the mailto reads. Because the markup
supplies its own `.select__chevron`, `data-pen-select` on a `[data-select]`
draws only the box, not the drawn chevron a native select gets. The list draws
its own pen card. Under reduced motion the list simply appears.
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

The cover's edition row can use `.hero__head`; `.hero__edition` is G's
original name and still works, and is the last place the word "edition" appears
anywhere in the output.

The contents menu lists Home, About, Work, Services and Contact, and its top
line reads "Contents, 2026. Seven chapters." If the home route ships a different
number of chapters, that line and the cover edition line both have to change:
they are the same claim. The rail carries the burger, the brand, the year and
the scroll rule, and no edition label.

## Two traps worth knowing

**A custom property must not be declared and read in the same rule** when the
value is written at runtime. The CSS optimiser folds the declared value into
every `var()` that reads it and then drops the declaration, so the inline value
from the engine never lands. Read it with a fallback instead:
`transform: translate(var(--ax, -50%), ...)` with no `--ax` in that rule. This
is why `.career__stop` reads `--ax` and `--x`/`--y` that way.

**Four components with units at both ends of a clip-path tween.** The browser
normalises `inset(0 0 100% 0)` down to three components, and a tween from a
three part value to a four part one has nothing to interpolate and never moves.
Every clip in the engine is written `inset(0% 0% 100% 0%)` to `inset(0% 0% 0% 0%)`.

## Reduced motion

Under `prefers-reduced-motion: reduce` every row of G's motion table collapses
to its end state: the loader settles the cover, the reveals are already at
yPercent 0, the boil freezes on one frame, Lenis never starts, the horizontal
track is neither pinned nor scrubbed at any width (the chapters read top to
bottom), and the route change and the contents field cross-fade over 200ms
instead of wiping.
