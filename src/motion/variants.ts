/**
 * Entrance variants.
 *
 * Revision 1: every block used to rise from the bottom. A block now carries
 * `data-reveal` and gets the motion named there, so the story reads differently
 * chapter by chapter. The default, and the value when the attribute is absent,
 * is still G's line reveal.
 *
 *   bottom     the ported line reveal, yPercent 102 to 0, 1.70s power3.out
 *   left       lines in from the left, xPercent -60 with a clip, 1.20s
 *              power3.out, stagger 0.06
 *   right      the mirror of left
 *   top        lines drop from above, yPercent -102, bottom's timing
 *   fade       opacity with a 12px blur clearing, 1.00s power2.out, 0.08
 *   scale      the block from 0.92, origin 50% 100%, 0.90s power3.out
 *   count      numerals count up to the printed value, 1.40s power2.out
 *   flip       the block from rotateX 60deg, origin top, 1.00s power3.out
 *   clip-top   a clip wipe from the top edge down, 0.90s power2.out
 *   draw       strokes draw on: pen chrome 0.60s each at 0.05 apart, or plain
 *              SVG strokes over 1.20s power2.inOut
 *
 * Every variant collapses to its end state under prefers-reduced-motion, and
 * every one of them is undone by the cleanup the init returns.
 */
import type SplitType from "split-type";
import { gsap, list } from "./env";
import { lineReveal, splitLines, type LineOptions } from "./reveal";

export type RevealName =
  | "bottom"
  | "left"
  | "right"
  | "top"
  | "fade"
  | "scale"
  | "count"
  | "flip"
  | "clip-top"
  | "draw";

const NAMES: RevealName[] = [
  "bottom", "left", "right", "top", "fade", "scale", "count", "flip", "clip-top", "draw",
];

export function revealName(el: HTMLElement): RevealName {
  const raw = (el.getAttribute("data-reveal") || "").trim() as RevealName;
  return NAMES.indexOf(raw) >= 0 ? raw : "bottom";
}

export type VariantResult = {
  timeline: gsap.core.Timeline;
  /** puts back anything the variant wrote outside of GSAP's own props */
  undo: () => void;
};

/* ---------------------------------------------------------------------- */
/* count                                                                   */
/* ---------------------------------------------------------------------- */

/* The first numeric run in the text is the one that counts: "14/15" counts the
   14, "2,680" keeps its comma, "0.782" keeps three decimals, "+33" and "~4.1"
   keep the character in front. Everything around the number is left alone. */
const NUM_RE = /\d[\d,]*(?:\.\d+)?/;

type CountTarget = {
  el: HTMLElement;
  original: string;
  before: string;
  after: string;
  value: number;
  decimals: number;
  grouped: boolean;
};

function countTargets(block: HTMLElement): CountTarget[] {
  const hosts = list("[data-count], .num, .metric__value", block);
  const scope = hosts.length ? hosts : [block];
  const out: CountTarget[] = [];
  scope.forEach((el) => {
    /* only a leaf carries the numerals; a wrapper would lose its child markup */
    const leaf = el.children.length === 0 ? el : list("*", el).filter((n) => n.children.length === 0)[0];
    const host = leaf || el;
    const text = host.textContent || "";
    const m = NUM_RE.exec(text);
    if (!m) return;
    const raw = m[0];
    const grouped = raw.indexOf(",") >= 0;
    const decimals = (raw.split(".")[1] || "").length;
    const value = Number(raw.replace(/,/g, ""));
    if (!Number.isFinite(value)) return;
    out.push({
      el: host,
      original: text,
      before: text.slice(0, m.index),
      after: text.slice(m.index + raw.length),
      value,
      decimals,
      grouped,
    });
  });
  return out;
}

function formatCount(t: CountTarget, v: number): string {
  const n = t.decimals ? Number(v.toFixed(t.decimals)) : Math.round(v);
  const body = t.grouped
    ? n.toLocaleString("en-US", { minimumFractionDigits: t.decimals, maximumFractionDigits: t.decimals })
    : n.toFixed(t.decimals);
  return t.before + body + t.after;
}

/* ---------------------------------------------------------------------- */
/* draw                                                                    */
/* ---------------------------------------------------------------------- */

const DRAW_ATTR = "data-drawn";

function penHosts(block: HTMLElement): HTMLElement[] {
  const hosts = list(".drawably-host", block);
  if (block.classList.contains("drawably-host")) hosts.unshift(block);
  return hosts;
}

function svgStrokes(block: HTMLElement): SVGGeometryElement[] {
  return list<SVGGeometryElement>("path, line, polyline, polygon, circle, ellipse, rect", block).filter(
    (n) => !n.closest(".drawably-svg")
  );
}

/* ---------------------------------------------------------------------- */
/* the dispatcher                                                          */
/* ---------------------------------------------------------------------- */

export function playVariant(
  block: HTMLElement,
  name: RevealName,
  opts: LineOptions & { splitCollector?: SplitType[] }
): VariantResult {
  const noop = () => {};

  if (name === "bottom") {
    return { timeline: lineReveal([block], opts), undo: noop };
  }

  if (name === "top") {
    return { timeline: lineReveal([block], Object.assign({}, opts, { yPercent: -102 })), undo: noop };
  }

  if (name === "left" || name === "right") {
    const from = name === "left" ? -60 : 60;
    const clip = name === "left" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
    const lines = splitLines([block], opts.splitCollector);
    const tl = gsap.timeline();
    tl.set(block, { opacity: 1 }, 0);
    if (lines.length) {
      tl.set(lines, { willChange: "transform", force3D: true }, 0);
      tl.fromTo(
        lines,
        { xPercent: from, opacity: 0, clipPath: clip, force3D: true },
        {
          xPercent: 0,
          opacity: 1,
          clipPath: "inset(0 0 0 0)",
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.06,
          force3D: true,
          clearProps: "willChange,clipPath",
        },
        0
      );
    }
    return { timeline: tl, undo: noop };
  }

  if (name === "fade") {
    const lines = splitLines([block], opts.splitCollector);
    const targets = lines.length ? lines : [block];
    const tl = gsap.timeline();
    tl.set(block, { opacity: 1 }, 0);
    tl.fromTo(
      targets,
      { opacity: 0, filter: "blur(12px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        stagger: lines.length ? 0.08 : 0,
        clearProps: "filter",
      },
      0
    );
    return { timeline: tl, undo: noop };
  }

  if (name === "scale") {
    const tl = gsap.timeline();
    tl.fromTo(
      block,
      { opacity: 0, scale: 0.92, transformOrigin: "50% 100%", force3D: true },
      {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        force3D: true,
        clearProps: "transform,transformOrigin",
      },
      0
    );
    return { timeline: tl, undo: noop };
  }

  if (name === "flip") {
    const tl = gsap.timeline();
    tl.fromTo(
      block,
      { opacity: 0, rotationX: 60, transformOrigin: "50% 0%", transformPerspective: 800 },
      {
        opacity: 1,
        rotationX: 0,
        duration: 1,
        ease: "power3.out",
        clearProps: "transform,transformOrigin,transformPerspective",
      },
      0
    );
    return { timeline: tl, undo: noop };
  }

  if (name === "clip-top") {
    const tl = gsap.timeline();
    tl.fromTo(
      block,
      { opacity: 1, clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power2.out", clearProps: "clipPath" },
      0
    );
    return { timeline: tl, undo: noop };
  }

  if (name === "count") {
    const targets = countTargets(block);
    const tl = gsap.timeline();
    tl.set(block, { opacity: 1 }, 0);
    targets.forEach((t) => {
      const state = { v: 0 };
      t.el.textContent = formatCount(t, 0);
      tl.to(
        state,
        {
          v: t.value,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            t.el.textContent = formatCount(t, state.v);
          },
          onComplete: () => {
            t.el.textContent = t.original;
          },
        },
        0
      );
    });
    return {
      timeline: tl,
      undo: () => targets.forEach((t) => { t.el.textContent = t.original; }),
    };
  }

  /* draw */
  const hosts = penHosts(block);
  const tl = gsap.timeline();
  tl.set(block, { opacity: 1 }, 0);
  if (hosts.length) {
    /* the pen chrome is already drawn; this animates the stroke on, one
       control after the next, 0.60s each at 0.05 apart */
    hosts.forEach((host, i) => {
      tl.call(() => host.setAttribute(DRAW_ATTR, "in"), undefined, i * 0.05);
    });
    tl.to({}, { duration: 0.6 + hosts.length * 0.05 }, 0);
    return {
      timeline: tl,
      undo: () => hosts.forEach((h) => h.removeAttribute(DRAW_ATTR)),
    };
  }
  const strokes = svgStrokes(block);
  const lengths = strokes.map((n) => {
    try {
      return n.getTotalLength();
    } catch {
      return 0;
    }
  });
  strokes.forEach((n, i) => {
    const len = lengths[i];
    if (!len) return;
    tl.fromTo(
      n,
      { strokeDasharray: len, strokeDashoffset: len },
      {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.inOut",
        clearProps: "strokeDasharray,strokeDashoffset",
      },
      0
    );
  });
  return {
    timeline: tl,
    undo: () => strokes.forEach((n) => {
      n.style.removeProperty("stroke-dasharray");
      n.style.removeProperty("stroke-dashoffset");
    }),
  };
}
