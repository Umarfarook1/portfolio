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
  afterImages,
  type Cleanup,
} from "./env";
import { setHorizontalTimeline } from "./registry";

type Refs = {
  story: HTMLElement;
  pin: HTMLElement;
  track: HTMLElement;
};

let refs: Refs | null = null;
let hST: ScrollTrigger | null = null;
let hRange = 0;

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
      } else {
        tl.fromTo(track!, { x: 0 }, { x: -total });
        hRange = total;
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
    /* the track is measured from laid-out type and laid-out images, so it is
       measured again once each of those has actually arrived */
    const stopFonts = afterFonts(() => {
      if (!alive) return;
      build();
      ScrollTrigger.refresh();
    });
    const stopImages = afterImages(track!, () => {
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
      stopImages();
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
