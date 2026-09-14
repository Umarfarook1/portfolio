/**
 * The pinned horizontal story, plus THE WORK pause inside it.
 *
 *   track       pin, scrub, ease none, x 0 to -(scrollWidth minus viewport)
 *   pause rect  scale 0 to cover across one viewport of scroll
 *   pause words x plus or minus 1.1% vw out to plus or minus half the cover
 *
 * Under 768px the same chapters are a plain vertical read and only the pause
 * pins, so the collage still covers the screen on a phone.
 */
import {
  gsap,
  ScrollTrigger,
  debounce,
  reduced,
  isDesktop,
  afterFonts,
  type Cleanup,
} from "./env";
import { getLenis, setHorizontalTimeline } from "./registry";

type Refs = {
  story: HTMLElement;
  pin: HTMLElement;
  track: HTMLElement;
};

let refs: Refs | null = null;
let hST: ScrollTrigger | null = null;
let hRange = 0;
let snapPoints: number[] = [];

/* ---------------------------------------------------------------------- */
/* settle on the nearest chapter                                           */
/* ---------------------------------------------------------------------- */

const SNAP_DELAY = 120;
const SNAP_MIN = 0.25;
const SNAP_MAX = 0.7;

/* power2.inOut, as a plain function so Lenis can be handed it */
function power2InOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

let snapTimer = 0;
let snapping = false;

function clearSnap() {
  if (snapTimer) {
    window.clearTimeout(snapTimer);
    snapTimer = 0;
  }
}

/** The scroll position of every chapter start, inside the pinned range. */
function snapScrolls(): number[] {
  if (!hST) return [];
  const span = hST.end - hST.start;
  return snapPoints.map((p) => hST!.start + p * span);
}

/** When the wheel stops inside the pinned track, ease to the nearest chapter
 *  start. ScrollTrigger's own `snap` writes the scroll position behind Lenis's
 *  back and Lenis puts it straight back, so the settle is driven through Lenis
 *  itself when Lenis is running, and through a plain tween when it is not.
 *  Nearest rather than directional: the ask was the nearest chapter, and a
 *  directional rule turns a 40px nudge into a whole page turn. */
function settle() {
  if (snapping || reduced() || !hST) return;
  const points = snapScrolls();
  if (points.length < 2) return;
  const y = window.scrollY;
  if (y < hST.start - 1 || y > hST.end + 1) return;
  let best = points[0];
  let bestGap = Math.abs(points[0] - y);
  points.forEach((p) => {
    const gap = Math.abs(p - y);
    if (gap < bestGap) {
      bestGap = gap;
      best = p;
    }
  });
  if (bestGap < 2) return;
  const step = Math.max(1, (hST.end - hST.start) / Math.max(1, points.length - 1));
  const duration = Math.min(SNAP_MAX, Math.max(SNAP_MIN, (bestGap / step) * SNAP_MAX));
  snapping = true;
  /* the latch clears on its own as well as on completion: a settle that is
     overtaken by the next gesture may never report back, and a stuck latch
     would silently switch the whole behaviour off */
  let guard = window.setTimeout(() => {
    guard = 0;
    snapping = false;
  }, duration * 1000 + 200);
  const done = () => {
    if (guard) window.clearTimeout(guard);
    guard = 0;
    snapping = false;
  };
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(best, { duration, easing: power2InOut, onComplete: done });
    return;
  }
  const state = { y };
  gsap.to(state, {
    y: best,
    duration,
    ease: "power2.inOut",
    onUpdate: () => window.scrollTo(0, state.y),
    onComplete: done,
  });
}

/* "scrolling stopped" is measured on the scroll position itself rather than on
   ScrollTrigger's scrollEnd: Lenis moves the window scroll, so a quiet window
   is the honest signal, and it fires whether or not Lenis is running. */
function onScrollTick() {
  clearSnap();
  snapTimer = window.setTimeout(() => {
    snapTimer = 0;
    settle();
  }, SNAP_DELAY);
}

/** Where every chapter starts, as a progress value on the pinned timeline.
 *  A panel before the pause maps straight onto its offsetLeft; one after it
 *  carries the viewport of scroll the pause holds. */
function panelProgress(before: number, pauseLen: number, range: number): number[] {
  if (!refs || range <= 0) return [];
  const panels = Array.prototype.slice.call(
    refs.track.children
  ) as HTMLElement[];
  const seen: number[] = [];
  panels.forEach((panel) => {
    if (!panel.classList || !panel.classList.contains("panel")) return;
    const left = panel.offsetLeft;
    const at = left <= before ? left : left + pauseLen;
    const p = Math.min(1, Math.max(0, at / range));
    if (seen.every((v) => Math.abs(v - p) > 0.0005)) seen.push(p);
  });
  if (seen.length && seen[seen.length - 1] < 1) seen.push(1);
  return seen.sort((a, b) => a - b);
}

export function initHorizontal(scope: HTMLElement): Cleanup {
  const story = scope.querySelector<HTMLElement>("[data-horizontal-story]");
  const pin = story ? story.querySelector<HTMLElement>("[data-horizontal-pin]") : null;
  const track = story ? story.querySelector<HTMLElement>("[data-horizontal-track]") : null;
  if (!story || !pin || !track) return () => {};
  /* under reduced motion the chapters are a plain vertical read at every
     width: nothing is pinned, nothing is scrubbed, and the stylesheet stacks
     the track. G kept the desktop pin here; the folio does not. */
  if (reduced()) return () => {};
  refs = { story, pin, track };

  /* one timeline object for the life of the route: every containerAnimation
     trigger in the chapters holds a reference to it, so a rebuild has to refill
     this timeline rather than hand out a new one */
  const tl = gsap.timeline({ defaults: { ease: "none" } });
  setHorizontalTimeline(tl);

  const root = document.documentElement;
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const mw = track.querySelector<HTMLElement>("[data-more-work-section]");
    const rect = mw ? mw.querySelector<HTMLElement>("[data-more-work-rect]") : null;
    const more = mw ? mw.querySelector<HTMLElement>("[data-more-work-more]") : null;
    const work = mw ? mw.querySelector<HTMLElement>("[data-more-work-work]") : null;
    let alive = true;

    function clearAll() {
      gsap.set([track, rect, more, work].filter(Boolean) as HTMLElement[], { clearProps: "transform" });
    }
    function build() {
      const keep = hST ? hST.progress : null;
      if (hST) {
        hST.kill(true, true);
        hST = null;
      }
      tl.clear();
      clearAll();
      const vw = pin!.clientWidth || root.clientWidth;
      const vh = pin!.clientHeight || window.innerHeight;
      const total = Math.max(0, track!.scrollWidth - vw);
      if (mw && rect && more && work && !reduced()) {
        const pauseX = -mw.offsetLeft + (vw - mw.offsetWidth) / 2;
        const before = Math.max(0, -pauseX);
        const after = Math.max(0, total - before);
        const pauseLen = vh;
        const rw = rect.offsetWidth || 220;
        const rh = rect.offsetHeight || 124;
        /* the collage centres inside the rail-padded box, so the cover has to
           reach past the rail on the left as well as both edges */
        const railPx = parseFloat(getComputedStyle(root).getPropertyValue("--rail")) || 0;
        const cover = Math.max((vw + railPx * 2 + 16) / rw, (vh + 16) / rh);
        const textOffset = (rw / 2) * cover;
        const lead = vw * 0.011;
        gsap.set(rect, { scale: 0, transformOrigin: "center center", force3D: true });
        gsap.set(more, { x: lead, force3D: true });
        gsap.set(work, { x: -lead, force3D: true });
        tl.fromTo(track!, { x: 0 }, { x: pauseX, duration: before });
        tl.addLabel("pause");
        tl.fromTo(rect, { scale: 0 }, { scale: cover, force3D: true, duration: pauseLen }, "pause");
        tl.fromTo(more, { x: lead }, { x: -textOffset, force3D: true, duration: pauseLen }, "pause");
        tl.fromTo(work, { x: -lead }, { x: textOffset, force3D: true, duration: pauseLen }, "pause");
        tl.fromTo(track!, { x: pauseX }, { x: -total, duration: after });
        hRange = total + pauseLen;
        snapPoints = panelProgress(before, pauseLen, hRange);
      } else {
        tl.fromTo(track!, { x: 0 }, { x: -total });
        hRange = total;
        snapPoints = panelProgress(Infinity, 0, hRange);
      }
      hST = ScrollTrigger.create({
        trigger: pin!,
        animation: tl,
        start: "top top",
        end: "+=" + Math.max(1, hRange),
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        preventOverlaps: true,
        refreshPriority: 1,
      });
      if (typeof keep === "number" && hST) {
        const target = hST.start + (hST.end - hST.start) * Math.min(1, Math.max(0, keep));
        hST.scroll(target);
        hST.update();
      }
    }
    build();
    window.addEventListener("scroll", onScrollTick, { passive: true });
    /* the track is measured from laid-out type, so it is measured again once
       the fonts have arrived. Not on image load: every cover sits in a frame
       with a fixed aspect ratio, so a cover arriving cannot change the track
       width, and rebuilding the pin part way through a read throws the reader
       back to the top. */
    const stopFonts = afterFonts(() => {
      if (!alive) return;
      build();
      ScrollTrigger.refresh();
    });
    const onResize = debounce(() => {
      if (!alive) return;
      build();
      ScrollTrigger.refresh();
    }, 150);
    window.addEventListener("resize", onResize);
    return () => {
      alive = false;
      stopFonts();
      clearSnap();
      snapping = false;
      window.removeEventListener("scroll", onScrollTick);
      onResize.cancel();
      window.removeEventListener("resize", onResize);
      if (hST) {
        hST.kill(true, true);
        hST = null;
      }
      tl.clear();
      clearAll();
    };
  });

  mm.add("(max-width: 767px)", () => {
    const mw = track.querySelector<HTMLElement>("[data-more-work-section]");
    const rect = mw ? mw.querySelector<HTMLElement>("[data-more-work-rect]") : null;
    const more = mw ? mw.querySelector<HTMLElement>("[data-more-work-more]") : null;
    const work = mw ? mw.querySelector<HTMLElement>("[data-more-work-work]") : null;
    if (!mw || !rect || reduced()) return;
    let st: ScrollTrigger | null = null;
    let anim: gsap.core.Timeline | null = null;
    let alive = true;
    function reset() {
      gsap.set([rect, more, work].filter(Boolean) as HTMLElement[], { clearProps: "transform" });
    }
    function build() {
      if (st) {
        st.kill(true, true);
        st = null;
      }
      if (anim) {
        anim.kill();
        anim = null;
      }
      reset();
      const h = mw!.offsetHeight || window.innerHeight;
      const rw = rect!.offsetWidth || 150;
      const rh = rect!.offsetHeight || 84;
      const cover = Math.max((mw!.offsetWidth + 8) / rw, (h + 8) / rh);
      const shift = (rh / 2) * cover;
      gsap.set(rect!, { scale: 0, transformOrigin: "center center", force3D: true });
      const t = gsap.timeline({ defaults: { ease: "none" } });
      t.fromTo(rect!, { scale: 0 }, { scale: cover, force3D: true, duration: h }, 0);
      if (more) t.fromTo(more, { y: 0 }, { y: -shift, force3D: true, duration: h }, 0);
      if (work) t.fromTo(work, { y: 0 }, { y: shift, force3D: true, duration: h }, 0);
      anim = t;
      st = ScrollTrigger.create({
        trigger: mw!,
        animation: t,
        start: "top top",
        end: "+=" + h,
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        preventOverlaps: true,
      });
    }
    build();
    const onResize = debounce(() => {
      if (alive) {
        build();
        ScrollTrigger.refresh();
      }
    }, 150);
    window.addEventListener("resize", onResize);
    return () => {
      alive = false;
      onResize.cancel();
      window.removeEventListener("resize", onResize);
      if (st) {
        st.kill(true, true);
        st = null;
      }
      if (anim) {
        anim.kill();
        anim = null;
      }
      reset();
    };
  });

  return () => {
    mm.revert();
    tl.kill();
    setHorizontalTimeline(null);
    hST = null;
    hRange = 0;
    snapPoints = [];
    refs = null;
  };
}

/** Scroll the story to a chapter: through the pinned track on desktop, a plain
 *  vertical scroll under 768px. */
export function scrollToPanel(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  if (isDesktop() && hST && hRange > 0 && refs) {
    const frac = Math.min(
      1,
      Math.max(0, el.offsetLeft / Math.max(1, refs.track.scrollWidth - refs.pin.clientWidth))
    );
    const y = hST.start + (hST.end - hST.start) * frac;
    window.scrollTo(0, y);
  } else {
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 64);
  }
}
