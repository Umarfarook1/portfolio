# DESIGN.md — umarfarook-ai.vercel.app

Single source of truth for the portfolio's design system. If code drifts from this file, this file wins.

## Discovery

- **Artifact**: personal portfolio and services page for an applied AI / software engineer.
- **Audience**: founders and engineering leads at seed to Series A companies in the EU and US who might book a call; secondary: hiring managers and collaborators via GitHub.
- **Primary action**: book 15 minutes (Cal.com) or email. Secondary: open a repo.
- **Positioning**: technical and exact, presented with restraint. The owner asked for "clean and visually good, better fonts, no animations, like Apple" (2026-09-13).
- **Brand adjectives**: clean, precise, calm, credible.
- **Aesthetic essence (3 words)**: quiet, exact, trustworthy.

Research basis (2026-09-13): apple.com product pages and the HIG typography guidance, plus rauno.me, paco.me and brianlovin.com. All four converge on one narrow column, a near-monochrome palette, weight-driven hierarchy, work listed as plain rows, sparse navigation and a one-line footer.

## Committed aesthetic

**QUIET SANS.** One off-white ground, one near-black ink, one blue. One sans family in three weights. Hairlines instead of shadows, pills for buttons, 12px radius for cards, nothing moves. The numbers are the imagery: large, tabular, tight. Every sentence on the page stays inside the getwork honesty ledger; this file governs only how it looks.

**Signature move**: the evidence figures. Seven rerunnable numbers set in 64px tabular semibold with the source under each, on a page that otherwise has no pictures.

## Typography

- **Family**: Instrument Sans (Google, variable) for everything, loaded through next/font/google as `--font-instrument`. Chosen because it reads as a crisp SF-like grotesque without being Inter or Geist, and it ships tabular figures.
- **Weights**: 400 body, 500 labels and buttons, 600 headings and figures. Nothing heavier.
- **Scale (px)**: 12 label · 13 meta · 15 small · 17 body · 20 lead · 22 h3 · 36 h2 (clamp to 28 on phones) · 64 h1 (clamp to 40 on phones) · 64 hero figures.
- **Tracking**: h1 -0.03em, h2 -0.02em, h3 -0.01em, body 0, uppercase labels +0.06em.
- **Leading**: h1 1.05, h2 1.1, h3 1.25, body 1.6, figures 1.
- **Numerals**: `tabular-nums` on every figure, year, price and code.
- Utilities: `.h1 .h2 .h3 .lead .label .figure .tabular` in `globals.css`. No mono face on the site.

## Color (OKLCH)

| token        | value                  | role                                              |
|--------------|------------------------|---------------------------------------------------|
| bg           | oklch(0.985 0.002 250) | page ground, slightly cool off-white              |
| surface      | oklch(1 0 0)           | cards and secondary buttons                       |
| fg           | oklch(0.21 0.01 260)   | headings, body, primary text                      |
| muted        | oklch(0.5 0.012 260)   | secondary text, captions, labels (AA on bg)       |
| line         | oklch(0.9 0.005 260)   | every hairline                                    |
| accent       | oklch(0.5 0.17 257)    | the one blue: primary buttons, links, focus ring  |
| accent-hover | oklch(0.43 0.17 257)   | primary button hover                              |
| accent-fg    | oklch(1 0 0)           | text on accent                                    |
| tint         | oklch(0.95 0.025 257)  | text selection only                               |

Rules: no gradients, no shadows, no second accent. Light only; there is no dark mode and none is planned.

## Motion

None. The only transitions are 150ms colour and border-colour changes on hover, and they collapse to 0 under `prefers-reduced-motion`. No scroll reveals, no counters, no canvases, no cursor followers, no scroll progress. framer-motion and three.js are not installed.

## Space, radius, elevation

- Shell `min(960px, 100% - 3rem)`; prose blocks cap at `max-w-2xl`; 24px side gutter at phone width.
- Sections `py-24` (`sm:py-32`). Section header: label, aside, h2, hairline. Within groups 8 to 16px, between groups 24 to 40px.
- Radius: 999px pills for buttons, 12px cards, 6px focus ring. Nothing else is rounded.
- Elevation: none. Hairlines only. The nav is the one translucent surface (80% ground + 24px blur) so content scrolls under it.

## Components

- **Buttons**: `.btn` 44px tall, 15/500, pill. `.btn-primary` solid accent, `.btn-secondary` white with hairline. `.btn-sm` 36px for the nav. Ranked by importance: one primary per view.
- **Links**: `.link` accent, underline on hover at 4px offset. `.title-link` ink at rest, accent on hover (project titles). `.navlink` muted to ink.
- **Cards**: `.card` white, hairline, 12px, no shadow (services packages only).
- **Rows**: project, method and experience entries are hairline-separated rows in a numbered column grid, never cards.
- **Forms**: the site has none (email and Cal.com are the conversion points). If one is added it follows the button idiom: 44px inputs, 10px radius, hairline border, accent focus ring, label above the field, no placeholder-as-label.

## Accessibility

- Contrast: fg on bg 14:1, muted on bg 5:1, accent on white 5.5:1, white on accent 5.5:1.
- 2px accent focus ring at 3px offset on every focusable element; 44px targets on buttons, 36px in the nav.
- Semantic landmarks, skip link, one h1 per page, headings in order.

## Kill list

Animations of any kind; Fraunces, Inter, Geist, system-ui as the primary face; dark ground; gradients; shadows; glassmorphism beyond the nav bar; mono labels; icon-tile feature cards; stat banners with equal boxes; fake screenshots, logos or metrics; em dashes in UI copy.

## Changelog

- 2026-09-13 v4 "QUIET SANS" — light, static, Instrument Sans, pills and hairlines. Replaces v3.
- 2026-07-16 v3 "GRADIENT DESCENT" — dark cinematic, point-cloud portrait, framer-motion. Superseded.
- 2026-07-16 v2 "Offprint" — superseded.
