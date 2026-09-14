/**
 * The rail: the chapter theme under its centre, the one-pixel scroll rule and
 * the two burger bars.
 *
 *   rail recolour  background, colour and border, 500ms ease-out, per chapter
 *   scroll rule    scaleY 0 to 1, one frame, rAF throttled
 *   burger bars    width 32 to 0 and x 0 to 32, 0.70s, power2.inOut
 */
import { gsap, list, reduced, type Cleanup } from "./env";
import { setRailResync } from "./registry";

const THEME_SEL = "[data-header-bg][data-header-text]";

export type RailTheme = { bg: string; text: string; border: string };

/* the contents field, so the rail reads as one surface with it while open */
export const MENU_THEME: RailTheme = { bg: "#7f1515", text: "#ffffff", border: "#b54747" };

function readTheme(el: Element | null): RailTheme | null {
  if (!el || el.getAttribute("aria-hidden") === "true") return null;
  const bg = el.getAttribute("data-header-bg");
  const text = el.getAttribute("data-header-text");
  if (!bg || !text) return null;
  return { bg, text, border: el.getAttribute("data-header-border") || "#b54747" };
}

export function applyTheme(el: HTMLElement, t: RailTheme): void {
  el.style.setProperty("--header-bg", t.bg);
  el.style.setProperty("--header-text", t.text);
  el.style.setProperty("--header-border", t.border);
  list<SVGRectElement>("svg rect", el).forEach((r) => r.setAttribute("fill", t.text));
}

function contains(el: Element, x: number, y: number): boolean {
  const r = el.getBoundingClientRect();
  return x >= r.left && x < r.right && y >= r.top && y < r.bottom;
}

function themeUnder(sections: HTMLElement[], ref: HTMLElement): HTMLElement | null {
  const r = ref.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  let i: number;
  let s: HTMLElement;
  for (i = 0; i < sections.length; i++) {
    s = sections[i];
    if (s.getAttribute("aria-hidden") === "true") continue;
    if (!s.offsetParent && s.offsetWidth === 0) continue;
    if (contains(s, cx, cy)) return s;
  }
  let best: HTMLElement | null = null;
  let bestOverlap = 0;
  for (i = 0; i < sections.length; i++) {
    s = sections[i];
    if (!s.offsetParent && s.offsetWidth === 0) continue;
    const b = s.getBoundingClientRect();
    if (cy < b.top || cy >= b.bottom) continue;
    const o = Math.min(b.right, r.right) - Math.max(b.left, r.left);
    if (o > bestOverlap) {
      bestOverlap = o;
      best = s;
    }
  }
  return best;
}

export type HeaderThemeHandle = {
  tick: () => void;
  cleanup: Cleanup;
};

export function initHeaderTheme(rail: HTMLElement): HeaderThemeHandle {
  let sections = list(THEME_SEL);
  if (!reduced()) rail.classList.add("rail--themed");
  let lastEl: HTMLElement | null = null;
  let lastKey = "";
  let frame = 0;

  function apply(el: HTMLElement | null) {
    if (!el) return;
    const t = readTheme(el);
    if (!t) return;
    const key = t.bg + "|" + t.text + "|" + t.border;
    if (el === lastEl && key === lastKey) return;
    lastEl = el;
    lastKey = key;
    applyTheme(rail, t);
  }
  function run() {
    apply(themeUnder(sections, rail));
  }
  function tick() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      run();
    });
  }
  /* a route swap replaces every chapter, so the list of themed sections has to
     be read again rather than held from the first mount */
  function resync() {
    sections = list(THEME_SEL);
    lastEl = null;
    lastKey = "";
    tick();
  }
  run();
  setRailResync(resync);
  window.addEventListener("scroll", tick, { passive: true });
  window.addEventListener("resize", tick, { passive: true });
  return {
    tick,
    cleanup: () => {
      setRailResync(null);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
      rail.classList.remove("rail--themed");
    },
  };
}

export function initScrollProgress(): Cleanup {
  const bar = document.querySelector<HTMLElement>("[data-header-scroll-progress]");
  if (!bar) return () => {};
  const mq = window.matchMedia("(min-width: 768px)");
  let frame = 0;
  function ratio() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return 0;
    return Math.min(1, Math.max(0, window.scrollY / max));
  }
  function run() {
    const p = ratio();
    bar!.style.transform = mq.matches ? "scaleY(" + p + ")" : "scaleX(" + p + ")";
  }
  function tick() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      run();
    });
  }
  run();
  window.addEventListener("scroll", tick, { passive: true });
  window.addEventListener("resize", tick, { passive: true });
  return () => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener("scroll", tick);
    window.removeEventListener("resize", tick);
  };
}

/* ---------------------------------------------------------------------- */
/* the burger                                                              */
/* ---------------------------------------------------------------------- */

const BAR_DUR = 0.7;

function bars() {
  return {
    lower: document.querySelector<SVGRectElement>("[data-menu-icon-bar='lower']"),
    upper: document.querySelector<SVGRectElement>("[data-menu-icon-bar='upper']"),
  };
}

export function barsClosed(): void {
  const b = bars();
  if (!b.lower || !b.upper) return;
  b.lower.setAttribute("width", "32");
  b.upper.setAttribute("x", "0");
  b.upper.setAttribute("width", "32");
}

export function barsHidden(): void {
  const b = bars();
  if (!b.lower || !b.upper) return;
  b.lower.setAttribute("width", "0");
  b.upper.setAttribute("x", "32");
  b.upper.setAttribute("width", "0");
}

export function barsIntro(done?: () => void): void {
  const b = bars();
  if (!b.lower || !b.upper) {
    if (done) done();
    return;
  }
  if (reduced()) {
    barsClosed();
    if (done) done();
    return;
  }
  b.lower.setAttribute("width", "16");
  b.upper.setAttribute("x", "16");
  b.upper.setAttribute("width", "16");
  gsap
    .timeline({ defaults: { ease: "power2.out" }, onComplete: done })
    .fromTo(b.lower, { attr: { width: 16 } }, { attr: { width: 32 }, duration: 2 }, 0)
    .fromTo(b.upper, { attr: { x: 16, width: 16 } }, { attr: { x: 0, width: 32 }, duration: 2 }, 0);
}

/* Both bar tweens animate from the live attribute value and overwrite each
   other, so a burger tapped twice in a row follows the finger instead of
   snapping back to a start state. */
export function barsToOpen(): void {
  const b = bars();
  if (!b.lower || !b.upper) return;
  if (reduced()) {
    barsHidden();
    return;
  }
  gsap.killTweensOf([b.lower, b.upper]);
  gsap
    .timeline({ defaults: { ease: "power2.inOut" } })
    .to(b.lower, { attr: { width: 0 }, duration: BAR_DUR, overwrite: "auto" }, 0)
    .to(b.upper, { attr: { x: 32, width: 0 }, duration: BAR_DUR, overwrite: "auto" }, 0);
}

export function barsToClosed(): void {
  const b = bars();
  if (!b.lower || !b.upper) return;
  if (reduced()) {
    barsClosed();
    return;
  }
  gsap.killTweensOf([b.lower, b.upper]);
  gsap
    .timeline({ defaults: { ease: "power2.inOut" } })
    .to(b.lower, { attr: { width: 32 }, duration: BAR_DUR, overwrite: "auto" }, 0)
    .to(b.upper, { attr: { x: 0, width: 32 }, duration: BAR_DUR, overwrite: "auto" }, 0);
}
