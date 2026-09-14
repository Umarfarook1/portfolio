/**
 * Lenis, and the scroll lock the contents dialog and the detail panel share.
 *
 * Lenis starts on fine pointers only, and never under prefers-reduced-motion.
 * It carries the wheel velocity straight through to the pinned track: there is
 * no snapping, no debounce and no timer anywhere on the input path.
 */
import Lenis from "lenis";
import { gsap, ScrollTrigger, reduced, fine, type Cleanup } from "./env";
import { getLenis, setLenis } from "./registry";

export function startLenis(): Cleanup {
  if (reduced() || !fine()) return () => {};
  const lenis = new Lenis();
  setLenis(lenis);
  /* exposed so the motion can be driven from the console while reviewing */
  (window as unknown as { lenis?: Lenis }).lenis = lenis;
  const onScroll = () => ScrollTrigger.update();
  lenis.on("scroll", onScroll);
  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(raf);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.off("scroll", onScroll);
    lenis.destroy();
    setLenis(null);
    delete (window as unknown as { lenis?: Lenis }).lenis;
  };
}

export function lockScroll(on: boolean): void {
  const v = on ? "hidden" : "";
  document.documentElement.style.overflow = v;
  document.body.style.overflow = v;
  if (on) {
    document.documentElement.style.overscrollBehavior = "none";
  } else {
    document.documentElement.style.removeProperty("overscroll-behavior");
  }
  const lenis = getLenis();
  if (lenis) {
    if (on) lenis.stop();
    else lenis.start();
  }
}

/** Jump to the top of a freshly mounted route. */
export function resetScroll(): void {
  window.scrollTo(0, 0);
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0, { immediate: true });
}
