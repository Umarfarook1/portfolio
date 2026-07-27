# Portfolio

Personal portfolio of Umarfarook Gurramkonda, applied AI/ML engineer.

**Live:** [umarfarook-ai.vercel.app](https://umarfarook-ai.vercel.app)

## Stack

- Next.js 16 / React 19 / TypeScript
- Tailwind CSS 4
- react-three-fiber for the point-cloud portrait
- framer-motion for animations

## Design

[DESIGN.md](DESIGN.md) is the binding source of truth for the design system: the
inferno-ramp palette, the type scale, the motion rules, and a kill list of
patterns that must not come back. If the code and that file disagree, the file
wins.

The current theme is v3, "GRADIENT DESCENT". The centerpiece is
`src/components/three/PortraitField.tsx`, a shader point cloud that opens as
Gaussian noise, denoises into a self-portrait while a step counter runs, and
disperses back toward noise as the hero scrolls away. It is the page's one
`<Canvas>`, not a background.

## Sections

`01 / evidence` monumental metrics · `02 / work` project rows with generated
canvas previews · `03 / method` four stages, each linking its repo ·
`04 / checkpoints` work history · `05 / working set` tools ·
`06 / about` · `07 / contact`

Every number on the page comes from a public repo README or from the resume, and
each is checkable at its source. Nothing is rounded up for effect.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT
