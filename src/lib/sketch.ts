/**
 * The pen.
 *
 * Sketch renderer ported from drawably (MIT, github.com/Danilaa1/drawably):
 * mulberry32, sampleLine, ellipsePoints, jitter, toPath, doubleStroke,
 * roughLine, roughEllipse, roughRoundedRect, roughArrow, roughCheckmark,
 * scribbleFill, variants, and the stepped boil custom property.
 *
 * The boil is not animated here. paint() emits three seeded variants of every
 * stroke, tags them .drawably-boil with data-i 0, 1 and 2, and the stylesheet
 * cycles the registered @property counter --drawably-frame at 1200ms step-end
 * (450ms while a button is loading). That keeps the boil off the main thread
 * and frozen under prefers-reduced-motion with one CSS rule.
 */

export const SVG_NS = "http://www.w3.org/2000/svg";
const INSET = 3;

export type Point = [number, number];

export type PenOptions = {
  seed: number;
  roughness: number;
  boil: number;
  boilSeed?: number;
};

export type Gen = (w: number, h: number, o: PenOptions) => string;

export type Layer = {
  className: string;
  gen: Gen;
  pathLength?: boolean;
};

export type Box = { x: number; y: number; w: number; h: number };

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 0x100000000);
}

export function sampleLine(x1: number, y1: number, x2: number, y2: number, step?: number): Point[] {
  const s = step || 8;
  const n = Math.max(2, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / s));
  const pts: Point[] = [];
  for (let i = 0; i <= n; i++) pts.push([x1 + ((x2 - x1) * i) / n, y1 + ((y2 - y1) * i) / n]);
  return pts;
}

export function ellipsePoints(
  cx: number, cy: number, rx: number, ry: number, a0: number, a1: number, n: number
): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i <= n; i++) {
    const a = a0 + ((a1 - a0) * i) / n;
    pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
  }
  return pts;
}

function arcPoints(cx: number, cy: number, r: number, a0: number, a1: number, n?: number): Point[] {
  return ellipsePoints(cx, cy, r, r, a0, a1, n || 4);
}

function roundedRectPoints(x: number, y: number, w: number, h: number, radius: number): Point[] {
  const r = Math.min(radius, w / 2, h / 2);
  return ([] as Point[]).concat(
    sampleLine(x + r, y, x + w - r, y),
    arcPoints(x + w - r, y + r, r, -Math.PI / 2, 0),
    sampleLine(x + w, y + r, x + w, y + h - r),
    arcPoints(x + w - r, y + h - r, r, 0, Math.PI / 2),
    sampleLine(x + w - r, y + h, x + r, y + h),
    arcPoints(x + r, y + h - r, r, Math.PI / 2, Math.PI),
    sampleLine(x, y + h - r, x, y + r),
    arcPoints(x + r, y + r, r, Math.PI, Math.PI * 1.5)
  );
}

export function jitter(points: Point[], rand: () => number, amp: number): Point[] {
  return points.map((pt) => [pt[0] + (rand() * 2 - 1) * amp, pt[1] + (rand() * 2 - 1) * amp] as Point);
}

export function toPath(points: Point[], close: boolean): string {
  if (!points.length) return "";
  let d = "M" + points[0][0].toFixed(2) + " " + points[0][1].toFixed(2);
  for (let i = 1; i < points.length - 1; i++) {
    const cx = points[i][0];
    const cy = points[i][1];
    const mx = (cx + points[i + 1][0]) / 2;
    const my = (cy + points[i + 1][1]) / 2;
    d += "Q" + cx.toFixed(2) + " " + cy.toFixed(2) + " " + mx.toFixed(2) + " " + my.toFixed(2);
  }
  const lastPt = points[points.length - 1];
  d += "L" + lastPt[0].toFixed(2) + " " + lastPt[1].toFixed(2);
  return close ? d + "Z" : d;
}

function boilPass(points: Point[], o: PenOptions): Point[] {
  if (!o.boil || o.boilSeed === undefined) return points;
  return jitter(points, mulberry32(o.boilSeed), o.boil);
}

function doubleStroke(points: Point[], o: PenOptions, close: boolean): string {
  const rand = mulberry32(o.seed);
  const amp = 1.5 * o.roughness;
  return (
    toPath(boilPass(jitter(points, rand, amp), o), close) +
    toPath(boilPass(jitter(points, rand, amp * 1.4), o), close)
  );
}

export function roughLine(x1: number, y1: number, x2: number, y2: number, o: PenOptions): string {
  return doubleStroke(sampleLine(x1, y1, x2, y2), o, false);
}

export function roughEllipse(cx: number, cy: number, rx: number, ry: number, o: PenOptions): string {
  const hh = Math.pow((rx - ry) / (rx + ry), 2);
  const per = Math.PI * (rx + ry) * (1 + (3 * hh) / (10 + Math.sqrt(4 - 3 * hh)));
  const n = Math.max(8, Math.ceil(per / 8));
  return doubleStroke(ellipsePoints(cx, cy, rx, ry, 0, Math.PI * 2, n).slice(0, -1), o, true);
}

export function roughCircle(cx: number, cy: number, r: number, o: PenOptions): string {
  return roughEllipse(cx, cy, r, r, o);
}

export function roughRoundedRect(
  x: number, y: number, w: number, h: number, r: number, o: PenOptions
): string {
  return doubleStroke(roundedRectPoints(x, y, w, h, r), o, true);
}

const ARROW_HEAD = 12;
const ARROW_HEAD_ANGLE = Math.PI / 6;

export function roughArrow(x1: number, y1: number, x2: number, y2: number, o: PenOptions): string {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const rand = mulberry32(o.seed);
  const amp = 1.2 * o.roughness;
  function wing(da: number): Point {
    return [x2 - ARROW_HEAD * Math.cos(a + da), y2 - ARROW_HEAD * Math.sin(a + da)];
  }
  function head(px: number, py: number): string {
    return toPath(boilPass(jitter(sampleLine(x2, y2, px, py, 4), rand, amp), o), false);
  }
  const lw = wing(ARROW_HEAD_ANGLE);
  const rw = wing(-ARROW_HEAD_ANGLE);
  return roughLine(x1, y1, x2, y2, o) + head(lw[0], lw[1]) + head(rw[0], rw[1]);
}

export function roughCheckmark(x: number, y: number, w: number, h: number, o: PenOptions): string {
  const rand = mulberry32(o.seed);
  const pts = sampleLine(x, y + h * 0.6, x + w * 0.35, y + h, 4).concat(
    sampleLine(x + w * 0.35, y + h, x + w, y, 4)
  );
  return toPath(boilPass(jitter(pts, rand, 1.2 * o.roughness), o), false);
}

export function scribbleFill(x: number, y: number, w: number, h: number, o: PenOptions): string {
  const rand = mulberry32(o.seed);
  const gap = 6;
  const pts: Point[] = [];
  let flip = false;
  for (let t = gap; t < w + h; t += gap) {
    const a: Point = [x + Math.max(0, t - h), y + Math.min(t, h)];
    const b: Point = [x + Math.min(t, w), y + Math.max(0, t - w)];
    if (flip) {
      pts.push(b, a);
    } else {
      pts.push(a, b);
    }
    flip = !flip;
  }
  if (pts.length < 2) return "";
  return toPath(boilPass(jitter(pts, rand, 1.2 * o.roughness), o), false);
}

function variants(gen: (o: PenOptions) => string, o: PenOptions, n: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    out.push(gen(Object.assign({}, o, { boilSeed: o.seed + (i + 1) * 7919 })));
  }
  return out;
}

export function createSvg(): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, "svg") as SVGSVGElement;
  svg.setAttribute("class", "drawably-svg");
  svg.setAttribute("aria-hidden", "true");
  return svg;
}

/** Paints one set of layers over one set of boxes. Three variants per stroke
 *  when the boil is on, so the CSS frame counter has something to cycle. */
export function paint(svg: SVGSVGElement, layers: Layer[], boxes: Box[], o: PenOptions): void {
  const w = Math.max.apply(null, boxes.map((b) => b.x + b.w));
  const h = Math.max.apply(null, boxes.map((b) => b.y + b.h));
  if (!(w > 0) || !(h > 0)) return;
  svg.setAttribute("viewBox", "0 0 " + w + " " + h);
  svg.textContent = "";
  layers.forEach((layer) => {
    boxes.forEach((box, k) => {
      const ds = variants(
        (lo) => layer.gen(box.w, box.h, lo),
        Object.assign({}, o, { seed: o.seed + k }),
        o.boil ? 3 : 1
      );
      ds.forEach((d, i) => {
        if (!d) return;
        const p = document.createElementNS(SVG_NS, "path");
        p.setAttribute("d", d);
        p.setAttribute("class", ds.length > 1 ? "drawably-boil " + layer.className : layer.className);
        p.dataset.i = String(i);
        if (layer.pathLength) p.setAttribute("pathLength", "1");
        if (box.x || box.y) p.setAttribute("transform", "translate(" + box.x + " " + box.y + ")");
        svg.appendChild(p);
      });
    });
  });
}

export function elementBox(el: HTMLElement): Box[] {
  return [{ x: 0, y: 0, w: el.offsetWidth || 120, h: el.offsetHeight || 36 }];
}

/** An inline mark (an underline, a circle) can wrap across lines, so it is
 *  measured per client rect rather than as one block. */
export function lineBoxes(el: HTMLElement, svg: SVGSVGElement): Box[] {
  const rects = Array.prototype.slice.call(el.getClientRects()) as DOMRect[];
  if (rects.length < 2) {
    svg.style.cssText = "";
    return elementBox(el);
  }
  const first = rects[0];
  const left = Math.min.apply(null, rects.map((r) => r.left));
  const top = Math.min.apply(null, rects.map((r) => r.top));
  const right = Math.max.apply(null, rects.map((r) => r.right));
  const bottom = Math.max.apply(null, rects.map((r) => r.bottom));
  svg.style.cssText =
    "left:" + (left - first.left) + "px;top:" + (top - first.top) +
    "px;width:" + (right - left) + "px;height:" + (bottom - top) + "px";
  return rects.map((r) => ({ x: r.left - left, y: r.top - top, w: r.width, h: r.height }));
}

export function blockAncestor(el: HTMLElement): HTMLElement | null {
  let p = el.parentElement;
  while (p && getComputedStyle(p).display === "inline") p = p.parentElement;
  return p;
}

export function outlineRect(r: number): Gen {
  return (w, h, o) => roughRoundedRect(INSET, INSET, w - 2 * INSET, h - 2 * INSET, r, o);
}

export function focusRect(r: number): Gen {
  return (w, h, o) => roughRoundedRect(-1, -1, w + 2, h + 2, r, o);
}

export { INSET };
