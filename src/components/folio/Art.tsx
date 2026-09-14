import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/*
  The covers and plates are ink drawings generated for this site. They are
  written to public/art while the pages are being built, so the page has to
  render with or without them: art() asks the filesystem at render time, and
  the callers fall back to the drawn placeholder from option G.

  Server components only. Nothing here may be imported from a client component.
*/
export type ArtKind = "covers" | "plates";

export function art(kind: ArtKind, slug: string): string | null {
  const rel = `art/${kind}/${slug}.webp`;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", rel)) ? `/${rel}` : null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ covers */

// The four drawn thumbs from option G, one per related-work row. They stand in
// for a cover that has not been drawn yet, so the chapter never shows a hole.
export function ThumbPlaceholder({ variant }: { variant: number }) {
  if (variant === 1) {
    return (
      <svg className="thumb" viewBox="0 0 400 300" aria-hidden="true">
        <rect width="400" height="300" fill="#e6dfd4" />
        <rect x="28" y="34" width="120" height="6" fill="#2f2b27" />
        <g fill="#9e3f1c">
          <rect x="28" y="70" width="170" height="18" />
          <rect x="28" y="102" width="230" height="18" />
          <rect x="28" y="134" width="128" height="18" />
          <rect x="28" y="166" width="286" height="18" />
          <rect x="28" y="198" width="96" height="18" />
          <rect x="28" y="230" width="204" height="18" />
        </g>
        <line x1="300" y1="60" x2="300" y2="258" stroke="#2f2b27" strokeWidth="1" strokeDasharray="3 4" />
        <rect x="28" y="60" width="1" height="198" fill="#2f2b27" />
      </svg>
    );
  }

  if (variant === 2) {
    return (
      <svg className="thumb" viewBox="0 0 400 300" aria-hidden="true">
        <rect width="400" height="300" fill="#f1ece4" />
        <rect x="24" y="26" width="160" height="248" fill="#faf9f6" stroke="#a79d8f" strokeWidth="1" />
        <g fill="#675e51" opacity=".55">
          <rect x="38" y="46" width="110" height="4" />
          <rect x="38" y="58" width="130" height="4" />
          <rect x="38" y="70" width="96" height="4" />
          <rect x="38" y="90" width="126" height="4" />
          <rect x="38" y="102" width="86" height="4" />
          <rect x="38" y="122" width="120" height="4" />
          <rect x="38" y="134" width="70" height="4" />
        </g>
        <path d="M196 150h28" stroke="#9e3f1c" strokeWidth="2" />
        <path d="M216 143l10 7-10 7" fill="none" stroke="#9e3f1c" strokeWidth="2" />
        <rect x="236" y="26" width="140" height="248" fill="#262220" />
        <g fill="#d98b52">
          <rect x="250" y="46" width="54" height="5" />
          <rect x="250" y="88" width="44" height="5" />
          <rect x="250" y="130" width="62" height="5" />
          <rect x="250" y="172" width="38" height="5" />
          <rect x="250" y="214" width="56" height="5" />
        </g>
        <g fill="#f3efe8" opacity=".85">
          <rect x="250" y="58" width="100" height="5" />
          <rect x="250" y="100" width="84" height="5" />
          <rect x="250" y="142" width="96" height="5" />
          <rect x="250" y="184" width="72" height="5" />
          <rect x="250" y="226" width="88" height="5" />
        </g>
      </svg>
    );
  }

  if (variant === 3) {
    return (
      <svg className="thumb" viewBox="0 0 400 300" aria-hidden="true">
        <rect width="400" height="300" fill="#262220" />
        <g stroke="#5a524d" strokeWidth="1">
          <path d="M70 150h80M230 90h80M230 210h80" />
          <path d="M150 150c30 0 50 -60 80 -60M150 150c30 0 50 60 80 60" />
        </g>
        <rect x="26" y="128" width="44" height="44" fill="none" stroke="#d98b52" strokeWidth="1.5" />
        <rect x="150" y="128" width="80" height="44" fill="#332e2a" stroke="#d98b52" strokeWidth="1.5" />
        <rect x="310" y="68" width="64" height="44" fill="none" stroke="#a99f92" strokeWidth="1" />
        <rect x="310" y="188" width="64" height="44" fill="none" stroke="#a99f92" strokeWidth="1" />
        <g fill="#f3efe8" opacity=".7">
          <rect x="162" y="144" width="56" height="4" />
          <rect x="162" y="154" width="36" height="4" />
        </g>
        <circle cx="342" cy="90" r="3" fill="#2f6b44" />
        <circle cx="342" cy="210" r="3" fill="#9e3f1c" />
      </svg>
    );
  }

  return (
    <svg className="thumb" viewBox="0 0 400 300" aria-hidden="true">
      <rect width="400" height="300" fill="#262220" />
      <rect x="0" y="0" width="400" height="30" fill="#332e2a" />
      <circle cx="18" cy="15" r="4" fill="#9e3f1c" />
      <circle cx="34" cy="15" r="4" fill="#5c5449" />
      <rect x="24" y="56" width="150" height="7" fill="#d98b52" />
      <rect x="24" y="76" width="300" height="5" fill="#a99f92" opacity=".55" />
      <rect x="24" y="90" width="250" height="5" fill="#a99f92" opacity=".4" />
      <rect x="24" y="120" width="352" height="1" fill="#5a524d" />
      <rect x="24" y="134" width="80" height="5" fill="#a99f92" opacity=".7" />
      <rect x="130" y="134" width="80" height="5" fill="#a99f92" opacity=".7" />
      <rect x="240" y="134" width="60" height="5" fill="#a99f92" opacity=".7" />
      <rect x="24" y="158" width="352" height="1" fill="#3a3734" />
      <rect x="24" y="172" width="80" height="5" fill="#f3efe8" opacity=".8" />
      <rect x="130" y="172" width="46" height="5" fill="#f3efe8" opacity=".8" />
      <rect x="240" y="172" width="70" height="5" fill="#2f6b44" />
      <rect x="24" y="196" width="352" height="1" fill="#3a3734" />
      <rect x="24" y="210" width="96" height="5" fill="#f3efe8" opacity=".8" />
      <rect x="130" y="210" width="60" height="5" fill="#f3efe8" opacity=".8" />
      <rect x="240" y="210" width="70" height="5" fill="#9c2f28" />
      <rect x="24" y="244" width="120" height="22" fill="none" stroke="#d98b52" strokeWidth="1" />
    </svg>
  );
}

// A 4:3 project cover, drawn in ink for this site. The alt text stays empty on
// the home chapter because the row next to it already names the project.
export function Cover({
  slug,
  alt,
  sizes,
  variant = 0,
}: {
  slug: string;
  alt: string;
  sizes: string;
  variant?: number;
}) {
  const src = art("covers", slug);
  if (!src) return <ThumbPlaceholder variant={variant} />;
  return (
    <Image
      className="thumb"
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      style={{ objectFit: "cover" }}
    />
  );
}

/* ------------------------------------------------------------------ plates */

// The vertical plate behind a What-I-do column. With no file on disk the CSS
// gradient on .service__media stands in, so this renders nothing.
export function Plate({ slug, sizes }: { slug: string; sizes: string }) {
  const src = art("plates", slug);
  if (!src) return null;
  return <Image src={src} alt="" fill sizes={sizes} style={{ objectFit: "cover" }} />;
}
