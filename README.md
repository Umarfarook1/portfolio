# Portfolio

Personal portfolio of Umarfarook Gurramkonda, applied AI/ML engineer.

**Live:** [umarfarook-ai.vercel.app](https://umarfarook-ai.vercel.app)

## Stack

- Next.js 16 / React 19 / TypeScript
- Tailwind CSS 4
- Instrument Sans via next/font

No animation or 3D libraries. The site is static markup and CSS.

## Design

[DESIGN.md](DESIGN.md) is the binding source of truth for the design system: the
palette, the type scale, the spacing rules and a kill list of patterns that must
not come back. If the code and that file disagree, the file wins.

The current theme is v4, "QUIET SANS": one off-white ground, one ink, one blue,
one sans family, no motion.

## Pages

- `/` — evidence (seven rerunnable numbers), work (project rows), method (four
  stages with proof links), experience, stack, about, contact.
- `/services` — packages, prices, how it works, questions. All copy lives in
  `src/content/services.ts`.

Every number on the page traces to a file committed in the public repo the row
names, and each is checkable at its source. Where a project has not produced a
number yet, the page says so instead of borrowing one.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT
