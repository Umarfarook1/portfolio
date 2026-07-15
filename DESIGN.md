# DESIGN.md — umarfarook-ai.vercel.app

Single source of truth for the portfolio's design system. If code drifts from this file, this file wins.

## Discovery

- **Artifact**: personal portfolio / hiring site for an applied AI/ML engineer.
- **Audience**: hiring managers and senior engineers at AI companies; secondary: collaborators finding him via GitHub/PyPI.
- **Primary action**: email. Secondary: open a case study repo.
- **Positioning**: technical and rigorous, with visible personal craft. His differentiator is evidence — evals, cost caps, reproducible numbers.
- **Brand adjectives**: rigorous, candid, crafted, quietly confident.
- **Aesthetic essence (3 words)**: engineer's printed offprint.

## Committed aesthetic

**The offprint.** The whole site is set like a printed technical document about the engineer: numbered figures, one results table, hairline rules, mono annotations, red proof-marks. Swiss International Style palette (paper, ink, one vermilion red) — deliberately outside all three current AI-slop clusters (warm cream + acid, near-black + neon, broadsheet hairlines-as-decoration). The document conceit *is* the argument: a portfolio about evidence, formatted like the evidence artifact.

**Signature move**: the living point-cloud self-portrait as `fig. 01`, printed inside a plated frame — a photograph reduced to data, which is the job description.

## Typography

- **Display**: Archivo (variable, wdth axis ~125 expanded, weight 700–900, tracking −0.03em). Swiss poster grotesque; never italic.
- **Body**: Source Serif 4 (400/600). Print-quality text serif — humane, readable, and not the italic-display-serif hero cluster.
- **Annotation/mono**: IBM Plex Mono (400/600). Captions, folios, kickers, metrics labels, tags.
- Scale: 1.25 (major third), base 1rem body. Hero display clamps ~3.2–6.4rem.
- NEVER: Inter, Roboto, system-ui as a rendered face; italic serif heroes; gradient text.

## Color (OKLCH) — two-drum risograph

Vermilion is the STAMP drum (approval, proof, action). Press Blue is the DRAWING drum (figures, diagrams, captions — the blueprint register). Budget: 90% paper / 8% ink / 1.5% vermilion / 0.5% blue.

| token       | value                     | role                                                |
|-------------|---------------------------|-----------------------------------------------------|
| paper       | oklch(0.972 0.004 95)     | background                                          |
| paper-2     | oklch(0.955 0.005 95)     | card/plate fill                                     |
| manila      | oklch(0.945 0.022 85)     | ONE bound-in insert per page (Table 01)             |
| ink         | oklch(0.235 0.008 85)     | foreground, solid buttons                           |
| ink-60      | oklch(0.46 0.008 85)      | muted text                                          |
| rule        | oklch(0.87 0.006 90)      | hairlines/borders                                   |
| red         | oklch(0.54 0.19 29)       | STAMP ink: proof-marks, folios, underlines, buttons |
| red tints   | red at /6 /12 /15 /25     | hover washes, selected states, tag chips            |
| red-on-ink  | oklch(0.64 0.19 30)       | vermilion inside inverted ink bands only            |
| blue        | oklch(0.48 0.14 250)      | DRAWING ink: annotations, figure captions (AA text) |
| blue-plate  | oklch(0.554 0.141 245.5)  | large strokes only: plate rules, portrait alt dots  |

Hard rules: blue NEVER appears in buttons, folios, underlines, or proof marks; one blue role per viewport; blue always covers less area than red; red+blue overlaps use mix-blend multiply (overprint). No third hue, no gradients, ever. Ink bands (About, Contact) swap to the dark-ground variants via CSS cascade on `.ink-band`.

## Motion — "red draws, ink settles"

Durations: fast 140ms (presses, hover returns, exits) · base 240ms (hover movement) · slow 480ms (proof/rule draws, scroll-triggered only) · cinematic 720ms (once-per-visit: wipes, count-ups). Color ticks: 120ms flat.
Easings: PRESS `cubic-bezier(0.25,1,0.5,1)` for interactions · REVEAL `cubic-bezier(0.22,1,0.36,1)` for entrances/draws · CARRIAGE RETURN `cubic-bezier(0.83,0,0.17,1)` for on-screen morphs · STEPPED (`steps()`/quantized) for anything mechanical (odometer count-ups, calibration fills).
Springs: springPress {stiffness 420, damping 41} for taps; springPlate {visualDuration .5, bounce .15} is the ONLY bounce, reserved for the fig. 01 plate.

Principles: only red elements move directionally (left-to-right draws); ink only fades/settles (≤16px travel); reveals fire once (a printed page does not un-print); masthead is color-only 120ms; compositor-only properties (transform/opacity/clip-path); zero bounce house rule; stagger 60ms capped at 6 children; two-tier reduced motion (transforms die, 200ms opacity crossfades survive, via MotionConfig reducedMotion="user").

Signature motions: plate reveal (clip-path ink-roll, plates only) · Table 01 odometer tick + proof underline · ink-band print wipe · registration marks sliding into register · case-file hover as sequenced typesetting (<200ms) · colophon calibration strip stepped fill · stamp press :active scale(0.98).

## Space, radius, elevation

- Base unit 4px; sections py-24/32; groups tight (2–4 units).
- Radius: 2px on chips/buttons, 6px on plates. No pills, no rounded-2xl.
- Elevation: none. Flat print. Hierarchy from rules, weight, and scale. Paper grain overlay at 4% multiply stays.

## Kill list (was slop — do not reintroduce)

Custom blend-mode cursor; scroll progress bar; magnetic buttons; skill marquee; radial spotlight card hover; acid highlighter wipe; glass pill navbar with avatar; pulse-dot "open to" pill; lucide icon tiles above headings; "X, not Y" antithesis headings; rhetorical-question CTAs; cream/bone background; Inter.

## Craft rules

- Buttons: rectangular, 1px ink border, mono uppercase 11px; solid = ink fill, hover shows red underline bar sliding in; full state matrix incl. focus-visible 2px ink outline offset 3px.
- Motion: entrances only (fade/rise ≤ 16px, 500–600ms, ease-out), portrait assembly, and hover color/underline transitions ≤ 250ms. Nothing loops except the portrait sway. prefers-reduced-motion collapses all of it.
- Sections carry folio numbers (01–07) and mono captions like a printed document; registration marks stay (they now belong to the concept).
- Tables/metrics: tabular-nums, right-aligned numerals where columnar.
- Accessibility: WCAG AA contrast (ink on paper ≈ 12:1; red used at ≥4.5:1 only for ≥18px or non-text), visible focus, 24px+ targets, semantic landmarks, reduced-motion respected.

## Copy voice

First person, concrete, plain claims backed by numbers. One idea per sentence. Banned: "not just X", "X over Y" headline antithesis (max once per page, currently zero), rhetorical questions, "landscape/journey/seamless", em dashes in UI copy (house rule). Section titles are plain document labels (Selected results, Method, Experience), not slogans.

## Slop audit

- 2026-07-16: rebuilt from "Atelier bone+acid" (cream cluster, Inter, cursor/marquee/magnetic template kit) to offprint system. Checklist pass recorded in commit message.

## Changelog

- 2026-07-16 v2 "Offprint" — full redesign per this file.
