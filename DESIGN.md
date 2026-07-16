# DESIGN.md — umarfarook-ai.vercel.app

Single source of truth for the portfolio's design system. If code drifts from this file, this file wins.

## Discovery

- **Artifact**: personal portfolio / hiring site for an applied AI/ML engineer.
- **Audience**: hiring managers and senior engineers at AI companies; secondary: collaborators via GitHub/PyPI.
- **Primary action**: email. Secondary: open a case-study repo.
- **Positioning**: technical and rigorous, presented with the visual force of a top-tier motion/designer portfolio.
- **Brand adjectives**: cinematic, rigorous, alive, unmistakable.
- **Aesthetic essence (3 words)**: a beautiful training run.

## Committed aesthetic

**GRADIENT DESCENT.** The whole site is art-directed like the material every AI hiring manager stares at daily: inferno colormaps, loss curves, checkpoints, telemetry — elevated to cinematic editorial art on a warm plum-black ground. The R3F point-cloud self-portrait is the single hard idea: it opens as Gaussian noise and visibly denoises into his face while a step counter runs. Every hue on the page is a coordinate on one scientific colormap; motion behaves like optimization (attack, overshoot, settle). Nothing here is decoration: every effect is his literal day job rendered gorgeously, which no designer portfolio can copy.

Research basis (2026-07-16): 7-agent workflow (UX/UI portfolios, motion/editor portfolios, creative-dev implementation, taste critic, creative director) + firsthand Playwright teardowns of dennissnellenberg.com, p5aholic.me, robin-noguier.com, minhpham.design, lusion.co, obys.agency, vanholtz.co.

**Signature moves** (in order of memory):
1. The diffusion self-portrait: point-cloud face denoises from noise on load, disperses on scroll, repels from the cursor; colors sampled from the inferno ramp.
2. Inferno as the entire color system; section accents are ramp coordinates, never decorative gradients.
3. Token-stream typography: headlines reveal in word-cluster cadence like LLM output; counters tick in steps().
4. Metrics as imagery: monumental Fraunces digits that roll, overshoot and settle like SGD.
5. The run-command email CTA: `$ mail umarfarook0yt@gmail.com` with a blinking block caret, opening the hero and closing the page.

## Typography

- **Display**: Fraunces (variable; opsz maxed at display sizes, SOFT 0). WONK axis ON for exactly one word per headline — the personality channel. Never italic-serif-accent-word inside a sans headline.
- **Body**: Schibsted Grotesk (400/500), 17–19px/1.6.
- **Mono**: Fragment Mono (400). All page furniture: counters, telemetry, captions as figure plates, the run-command CTA. Tracked +0.04em, small sizes.
- Exactly two display scales (hero-monumental ~9vw, section-large ~4.5vw) + body + mono-caption. No in-between sizes.
- NEVER: Inter, Space Grotesk, Instrument Serif, Geist, Satoshi, Clash Display, gradient text.
- Gotcha: next/font variable classes go on `<html>`; Fraunces opsz must be set explicitly per size.

## Color (OKLCH) — the inferno ramp

Every color is a sample from one continuous data ramp ending in warm plum-black. No third palette, no decorative gradients (the ramp may only appear as data: point cloud, sparkline, heat cells).

| token      | value                    | role                                                        |
|------------|--------------------------|-------------------------------------------------------------|
| void       | oklch(0.14 0.025 300)    | page background (plum-black, never neutral #111)             |
| panel      | oklch(0.18 0.03 310)     | raised surfaces; separated by hairlines, never shadows       |
| line       | oklch(0.30 0.025 320)    | 1px hairlines, table borders, axes                           |
| crimson    | oklch(0.55 0.24 20)      | ramp mid: hovers, active nav, selection, accents on bone     |
| ember      | oklch(0.75 0.18 55)      | ramp hot: underlines, sparklines, in-progress, node ignition |
| solar      | oklch(0.90 0.15 95)      | PRIMARY ACCENT (ramp peak): email CTA, key digits, focus     |
| hi         | oklch(0.94 0.012 90)     | headlines/body on dark (warm off-white, never pure white)    |
| lo         | oklch(0.65 0.03 60)      | secondary text, captions, mono labels                        |
| bone       | oklch(0.96 0.01 95)      | inverted light bands (method, about)                         |
| boneink    | oklch(0.22 0.02 300)     | text on bone (same plum family as void)                      |

Rules: solar is scarce (CTA, key digits, focus). Crimson carries accents on bone; ember carries them on void. Hairlines not shadows. Elevation = lightness only.

## Motion — "convergence"

Everything moves like optimization: an attack, an overshoot, a settle.

- Micro-interactions 150–250ms. Text entrances 0.8s. Headline clusters ~1.0s total. Hero denoise 2.2s hard cap (once per session via sessionStorage; real HTML text painted immediately for LCP).
- Easings: entrances expo-out `cubic-bezier(0.16,1,0.3,1)`; wipes expo-in-out `cubic-bezier(0.87,0,0.13,1)`; stat settles spring `{stiffness:170, damping:14, mass:1}` (ONE visible overshoot — the SGD settle, reserved for stats/checkpoints); cursor-follow spring `{stiffness:300, damping:30, mass:0.5}`; anything numeric ticks in `steps()`; scroll-scrubbed scenes are linear and interruptible.
- Choreography: headlines token-stream in word clusters (40ms stagger, masked rise); the cloud disperses back toward noise as the hero scrolls away (scrubbed 1:1); project rows spawn a spring-lagged cursor preview playing a generative canvas loop per project; stack items scramble-resolve on hover; checkpoints ignite through the ramp when in view.
- Native scroll ONLY (no Lenis/scroll-hijack). Once-only reveals via useInView with PIXEL margins (framer whileInView % margins are dead — project gotcha).
- Reduced motion: transforms die, 200ms opacity fades survive; canvas renders the converged portrait statically.

## Space, radius, elevation

- Sections py-28/40; asymmetric composition, never centered-everything.
- Radius: 2px on small chrome, 8px on the preview panel. No pills, no rounded-2xl.
- Elevation: none. Hairlines (`line`) and lightness steps only.

## Kill list (verified 2026 clichés — do not reintroduce)

Purple/indigo gradients; preloader percentage counters (the denoise IS the entrance); Inter/Space Grotesk/Instrument Serif/Geist/Satoshi/Clash Display; infinite marquees; magnetic buttons; blob or dot custom cursors; cursor spotlight; Lenis smooth-scroll hijack; scroll-skewed images; glassmorphism; bento grids; icon-card feature grids; uniform stat-banner rows; grain PNG overlays (texture must be computed, i.e. the point cloud itself); GitHub contribution walls; skill bars; orbiting logo clouds; neural-net node diagrams as decoration; typewriter hero; matrix-rain/hacker green; tilted 3D dashboard mockups; horizontal-scroll galleries; fake logos/screenshots/metrics; em dashes in UI copy; "X, not Y" antithesis headlines; multiple `<Canvas>` mounts.

## Craft rules

- One `<Canvas>` (hero). dpr [1,1.5], ~30k points desktop / ~10k mobile, single Points draw call, additive blending on void.
- Buttons: rectangular, hairline border, mono uppercase; primary = solar text run-command with caret; `:active` scale(0.98).
- Hover effects gated behind `@media (hover:hover) and (pointer:fine)`.
- Tables/metrics: tabular-nums. Numbers ragged, asymmetric scales, never a uniform stat row.
- Accessibility: AA contrast (hi on void ≈ 13:1, boneink on bone ≈ 14:1, solar reserved for ≥18px or non-text on void), visible solar focus rings, 24px+ targets, semantic landmarks, reduced-motion respected.
- Every number and artifact shown must be real; the hero step counter counts the denoise itself (honest telemetry).

## Copy voice

First person, concrete, plain claims backed by numbers. Section titles are lab-notebook labels (Evidence, Work, Method, Checkpoints, Working set). Banned: em dashes in UI copy, antithesis headlines, rhetorical CTAs, "landscape/journey/seamless".

## Slop audit

- 2026-07-16 v3: rebuilt from "Offprint" (restrained Swiss print) to GRADIENT DESCENT after user verdict: needs designer-portfolio eye candy. Kill list re-verified against 2026 cliché morgue by taste-critic agent.

## Changelog

- 2026-07-16 v3 "GRADIENT DESCENT" — ground-up dark cinematic rebuild per this file.
- 2026-07-16 v2 "Offprint" — superseded.
