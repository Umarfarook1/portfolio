/**
 * Shared environment for every motion module: the media queries G branches on,
 * the GSAP registration, the viewport custom properties and the small helpers
 * the ported code leans on.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap(): void {
  if (registered) return;
  registered = true;
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export type Cleanup = () => void;

export function reduced(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isDesktop(): boolean {
  return window.matchMedia("(min-width: 768px)").matches;
}

export function fine(): boolean {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function list<T extends Element = HTMLElement>(sel: string, ctx?: ParentNode): T[] {
  return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)) as T[];
}

export type Debounced = (() => void) & { cancel: () => void };

export function debounce(fn: () => void, ms: number): Debounced {
  let t: ReturnType<typeof setTimeout> | undefined;
  const wrapped = function () {
    if (t) clearTimeout(t);
    t = setTimeout(fn, ms);
  } as Debounced;
  wrapped.cancel = function () {
    if (t) clearTimeout(t);
  };
  return wrapped;
}

/* The panels are sized from clientWidth, not 100vw, so a vertical scrollbar
   can never push the track into a horizontal scrollbar. */
export function setViewportVars(): void {
  const root = document.documentElement;
  root.style.setProperty("--vw", root.clientWidth + "px");
  root.style.setProperty("--vh", window.innerHeight + "px");
}

export function initViewportVars(): Cleanup {
  setViewportVars();
  window.addEventListener("resize", setViewportVars, { passive: true });
  return () => window.removeEventListener("resize", setViewportVars);
}

/** Runs fn once the web fonts have settled, and again is harmless. */
export function afterFonts(fn: () => void): Cleanup {
  let alive = true;
  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
  if (fonts && fonts.ready) {
    fonts.ready.then(() => {
      if (alive) fn();
    });
  }
  return () => {
    alive = false;
  };
}

/** Every image inside the scope, so the pinned track can be measured after the
 *  last one has laid out rather than before. */
export function afterImages(scope: ParentNode, fn: () => void): Cleanup {
  let alive = true;
  const imgs = list<HTMLImageElement>("img", scope).filter((i) => !i.complete);
  if (!imgs.length) return () => { alive = false; };
  let left = imgs.length;
  const done = () => {
    left -= 1;
    if (left <= 0 && alive) fn();
  };
  imgs.forEach((i) => {
    i.addEventListener("load", done, { once: true });
    i.addEventListener("error", done, { once: true });
  });
  return () => {
    alive = false;
    imgs.forEach((i) => {
      i.removeEventListener("load", done);
      i.removeEventListener("error", done);
    });
  };
}
