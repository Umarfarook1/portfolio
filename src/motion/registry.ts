/**
 * The small amount of state the shell and the route have to share.
 *
 * G was one IIFE, so the horizontal timeline, the Lenis instance and the rail
 * were plain closure variables. Here the shell (rail, contents, Lenis) and the
 * route (chapters) mount separately, so that state lives in this module. It is
 * module scope, which means one instance per page load, which is exactly the
 * lifetime G gave it.
 */
import type { gsap } from "gsap";
import type Lenis from "lenis";

type Timeline = gsap.core.Timeline;

let horizontalTL: Timeline | null = null;
let lenis: Lenis | null = null;
let railResync: (() => void) | null = null;
let loaderPlayed = false;

/** One timeline object for the life of the page: every containerAnimation
 *  trigger in the chapters holds a reference to it, so a rebuild has to refill
 *  this timeline rather than hand out a new one. */
export function setHorizontalTimeline(tl: Timeline | null): void {
  horizontalTL = tl;
}

export function horizontalContainer(): Timeline | undefined {
  return horizontalTL || undefined;
}

export function setLenis(instance: Lenis | null): void {
  lenis = instance;
}

export function getLenis(): Lenis | null {
  return lenis;
}

/** The rail reads the chapter under its centre, so it has to re-read the
 *  document whenever a route swaps the chapters out. */
export function setRailResync(fn: (() => void) | null): void {
  railResync = fn;
}

export function resyncRail(): void {
  if (railResync) railResync();
}

/** The loader runs once per full page load. A client-side return to the home
 *  route settles the cover to its end state instead of replaying the strip. */
export function hasLoaderPlayed(): boolean {
  return loaderPlayed;
}

export function markLoaderPlayed(): void {
  loaderPlayed = true;
}
