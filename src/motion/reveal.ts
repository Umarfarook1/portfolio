/**
 * The workhorse reveals, ported from G with their values intact.
 *
 *   line reveal   yPercent 102 to 0, 1.7s, power3.out, 0.07s per line,
 *                 0.2s between blocks, x0.86 on mobile, once, left 80%
 *   word reveal   yPercent 102 to 0, 1.7s, power3.out, 0.2s stagger
 *   char reveal   yPercent 102 to 0, 1.7s, power4.inOut, 0.07s stagger
 *   image reveal  overlay clip inset(0 100% 0 0) to inset(0), 0.7s power2.out;
 *                 image the same 0.2s later, plus xPercent -10 to 0
 */
import SplitType from "split-type";
import { gsap, ScrollTrigger, list, reduced, type Cleanup } from "./env";
import { horizontalContainer } from "./registry";
import { mountPenMarks } from "./pens";

export const LINE = {
  yPercent: 102,
  staggerEach: 0.07,
  duration: 1.7,
  ease: "power3.out",
  gapBetweenBlocks: 0.2,
};
export const WORD = {
  yPercent: 102,
  duration: 1.7,
  stagger: 0.2,
  ease: "power3.out",
  transformOrigin: "50% 100%",
};
export const CHAR = { yPercent: 102, duration: 1.7, stagger: 0.07, ease: "power4.inOut" };

export function mobileScale(): number {
  return window.innerWidth < 768 ? 0.86 : 1;
}

export type LineOptions = {
  scale?: number;
  yPercent?: number;
  staggerEach?: number;
  duration?: number;
  ease?: string;
  gapBetweenBlocks?: number;
  parallelBlocks?: boolean;
  revertOnComplete?: boolean;
  splitCollector?: SplitType[];
};

type ResolvedLineOptions = Required<Omit<LineOptions, "splitCollector">> & {
  splitCollector?: SplitType[];
};

function lineOpts(o?: LineOptions): ResolvedLineOptions {
  const opts = o || {};
  const s = typeof opts.scale === "number" ? opts.scale : mobileScale();
  return {
    scale: s,
    yPercent: typeof opts.yPercent === "number" ? opts.yPercent : LINE.yPercent,
    staggerEach: (typeof opts.staggerEach === "number" ? opts.staggerEach : LINE.staggerEach) * s,
    duration: (typeof opts.duration === "number" ? opts.duration : LINE.duration) * s,
    ease: opts.ease || LINE.ease,
    gapBetweenBlocks:
      (typeof opts.gapBetweenBlocks === "number" ? opts.gapBetweenBlocks : LINE.gapBetweenBlocks) * s,
    parallelBlocks: opts.parallelBlocks === true,
    revertOnComplete: opts.revertOnComplete !== false,
    splitCollector: opts.splitCollector,
  };
}

/** The mask a line rides inside. Declared in CSS so pre-split markup works,
 *  created here for anything split at runtime. */
function maskLines(lines: HTMLElement[]): void {
  lines.forEach((l) => {
    const parent = l.parentElement;
    if (!parent || parent.classList.contains("line-mask")) return;
    const span = document.createElement("span");
    span.className = "line-mask";
    parent.insertBefore(span, l);
    span.appendChild(l);
  });
}

type Group = { lines: HTMLElement[]; split: SplitType | null };

function splitBlocks(blocks: HTMLElement[], collector?: SplitType[]): Group[] {
  return blocks.map((b) => {
    const pre = list("[data-line]", b).filter((n) => n.getClientRects().length > 0);
    if (pre.length) {
      maskLines(pre);
      return { lines: pre, split: null };
    }
    const sp = new SplitType(b, { types: "lines" });
    if (collector) collector.push(sp);
    const lines = ((sp.lines || []) as HTMLElement[]).filter(Boolean);
    maskLines(lines);
    return { lines, split: sp };
  });
}

export function lineReveal(blocks: HTMLElement[], opts?: LineOptions): gsap.core.Timeline {
  const o = lineOpts(opts);
  const tl = gsap.timeline();
  const groups = splitBlocks(blocks, o.splitCollector);
  tl.set(blocks, { opacity: 1 }, 0);
  let at: number | string = 0;
  groups.forEach((g) => {
    if (!g.lines.length) return;
    const inner = gsap.timeline({
      onComplete: () => {
        gsap.set(g.lines, { clearProps: "willChange" });
        if (o.revertOnComplete && g.split) g.split.revert();
      },
    });
    inner.set(g.lines, { willChange: "transform", force3D: true }, 0);
    inner.fromTo(
      g.lines,
      { yPercent: o.yPercent, opacity: 1, force3D: true },
      {
        yPercent: 0,
        opacity: 1,
        duration: o.duration,
        ease: o.ease,
        stagger: o.staggerEach,
        force3D: true,
        immediateRender: true,
      },
      0
    );
    tl.add(inner, o.parallelBlocks ? 0 : at);
    if (!o.parallelBlocks) at = "+=" + o.gapBetweenBlocks;
  });
  return tl;
}

export function lineHide(blocks: HTMLElement[], opts?: LineOptions): gsap.core.Timeline {
  const o = lineOpts(opts);
  const tl = gsap.timeline();
  let at: number | string = 0;
  blocks.forEach((b) => {
    const lines = list("[data-line], .line", b).filter((n) => n.getClientRects().length > 0);
    if (!lines.length) {
      tl.to(b, { opacity: 0, duration: o.duration, ease: o.ease }, o.parallelBlocks ? 0 : at);
      if (!o.parallelBlocks) at = "+=" + o.gapBetweenBlocks;
      return;
    }
    const inner = gsap.timeline({
      onComplete: () => {
        gsap.set(lines, { clearProps: "willChange,transform" });
        gsap.set(b, { opacity: 0 });
      },
    });
    inner.set(lines, { willChange: "transform", force3D: true }, 0);
    inner.fromTo(
      lines,
      { yPercent: 0, opacity: 1, force3D: true },
      {
        yPercent: o.yPercent,
        opacity: 1,
        duration: o.duration,
        ease: o.ease,
        stagger: { each: o.staggerEach, from: "end" },
        force3D: true,
        immediateRender: false,
      },
      0
    );
    tl.add(inner, o.parallelBlocks ? 0 : at);
    if (!o.parallelBlocks) at = "+=" + o.gapBetweenBlocks;
  });
  return tl;
}

export type ScrollRevealOptions = LineOptions & {
  containerAnimation?: gsap.core.Timeline;
  horizontalStart?: string;
  start?: string;
};

export function initScrollLineReveals(scope: HTMLElement, opts?: ScrollRevealOptions): Cleanup {
  const o = opts || {};
  const els = list("[data-reveal-line]", scope).filter((e) => !e.dataset.revealed);
  if (scope.matches && scope.matches("[data-reveal-line]") && !scope.dataset.revealed) els.unshift(scope);
  if (!els.length) return () => {};
  if (reduced()) {
    els.forEach((e) => {
      e.style.opacity = "1";
      e.dataset.revealed = "1";
    });
    return () => {
      els.forEach((e) => {
        e.style.removeProperty("opacity");
        delete e.dataset.revealed;
      });
    };
  }
  const collector: SplitType[] = [];
  const tls: gsap.core.Timeline[] = [];
  function make(el: HTMLElement, cfg: ScrollTrigger.StaticVars, store: ScrollTrigger[]) {
    let fired = false;
    store.push(
      ScrollTrigger.create(
        Object.assign({}, cfg, {
          trigger: el,
          once: true,
          onEnter: () => {
            if (fired) return;
            fired = true;
            el.dataset.revealed = "1";
            const tl = lineReveal([el], Object.assign({ splitCollector: collector }, o));
            /* a pen mark inside this block is drawn once the block has landed */
            tl.eventCallback("onComplete", () => mountPenMarks(el));
            tls.push(tl);
          },
        })
      )
    );
  }
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    const store: ScrollTrigger[] = [];
    const ca = o.containerAnimation || horizontalContainer();
    els.forEach((el) => {
      /* a "left 80%" start is only meaningful inside a scrubbed container;
         the vertical routes get the vertical start instead */
      if (ca) make(el, { containerAnimation: ca, start: o.horizontalStart || "left 80%" }, store);
      else make(el, { start: o.start || "top 80%" }, store);
    });
    return () => store.forEach((s) => s.kill());
  });
  mm.add("(max-width: 767px)", () => {
    const store: ScrollTrigger[] = [];
    els.forEach((el) => make(el, { start: o.start || "top 80%" }, store));
    return () => store.forEach((s) => s.kill());
  });
  return () => {
    mm.revert();
    tls.forEach((t) => t.kill());
    collector.forEach((c) => c.revert());
    els.forEach((e) => {
      delete e.dataset.revealed;
      gsap.set(e, { clearProps: "opacity,transform,visibility" });
    });
  };
}

/* ---------------------------------------------------------------------- */
/* image reveal                                                            */
/* ---------------------------------------------------------------------- */

function clipRight(el: HTMLElement, pct: number): void {
  el.style.clipPath = "inset(0 " + pct + "% 0 0)";
}

export function imageRevealDone(overlay: HTMLElement, wrapper: HTMLElement): void {
  gsap.set(overlay, { opacity: 0, visibility: "hidden" });
  clipRight(overlay, 100);
  wrapper.classList.remove("opacity-0");
  gsap.set(wrapper, { opacity: 1, xPercent: 0, clearProps: "clipPath,transform" });
  wrapper.style.removeProperty("clip-path");
}

export type ImageRevealOptions = {
  duration?: number;
  imageDelay?: number;
  xPercent?: number;
  ease?: string;
};

export function imageRevealPrime(
  overlay: HTMLElement, wrapper: HTMLElement, o?: ImageRevealOptions
): void {
  gsap.set(overlay, { opacity: 1, visibility: "visible" });
  clipRight(overlay, 100);
  clipRight(wrapper, 100);
  gsap.set(wrapper, { xPercent: (o && o.xPercent) || -10, force3D: true });
}

export function imageRevealPlay(
  overlay: HTMLElement, wrapper: HTMLElement, opts?: ImageRevealOptions
): gsap.core.Timeline {
  const o = opts || {};
  const dur = o.duration || 0.7;
  const delay = o.imageDelay || 0.2;
  const xp = o.xPercent === undefined ? -10 : o.xPercent;
  const ease = o.ease || "power2.out";
  const tl = gsap.timeline({ onComplete: () => imageRevealDone(overlay, wrapper) });
  const ov = { right: 100 };
  clipRight(overlay, 100);
  tl.to(ov, { right: 0, duration: dur, ease, onUpdate: () => clipRight(overlay, ov.right) }, 0);
  const im = { right: 100 };
  clipRight(wrapper, 100);
  gsap.set(wrapper, { xPercent: xp, force3D: true });
  tl.to(im, { right: 0, duration: dur, ease, onUpdate: () => clipRight(wrapper, im.right) }, delay);
  tl.to(wrapper, { xPercent: 0, duration: dur, ease, force3D: true }, delay);
  return tl;
}

export function initScrollImageReveals(
  scope: HTMLElement,
  opts?: ImageRevealOptions & { containerAnimation?: gsap.core.Timeline; horizontalStart?: string; start?: string }
): Cleanup {
  const o = opts || {};
  const shells = list("[data-reveal-image-shell]", scope)
    .filter((s) => !s.dataset.revealed)
    .map((s) => ({
      shell: s,
      overlay: s.querySelector<HTMLElement>("[data-reveal-image-overlay]"),
      wrapper: s.querySelector<HTMLElement>("[data-reveal-image]"),
    }))
    .filter((x): x is { shell: HTMLElement; overlay: HTMLElement; wrapper: HTMLElement } =>
      Boolean(x.overlay && x.wrapper)
    );
  if (!shells.length) return () => {};
  if (reduced()) {
    shells.forEach((x) => {
      x.shell.dataset.revealed = "1";
      imageRevealDone(x.overlay, x.wrapper);
    });
    return () => shells.forEach((x) => delete x.shell.dataset.revealed);
  }
  const tls: gsap.core.Timeline[] = [];
  function make(
    x: { shell: HTMLElement; overlay: HTMLElement; wrapper: HTMLElement },
    cfg: ScrollTrigger.StaticVars,
    store: ScrollTrigger[]
  ) {
    imageRevealPrime(x.overlay, x.wrapper, o);
    let fired = false;
    store.push(
      ScrollTrigger.create(
        Object.assign({}, cfg, {
          trigger: x.wrapper,
          once: true,
          onEnter: () => {
            if (fired) return;
            fired = true;
            x.shell.dataset.revealed = "1";
            x.wrapper.classList.remove("opacity-0");
            gsap.set(x.wrapper, { opacity: 1 });
            tls.push(imageRevealPlay(x.overlay, x.wrapper, o));
          },
        })
      )
    );
  }
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    const store: ScrollTrigger[] = [];
    const ca = o.containerAnimation || horizontalContainer();
    shells.forEach((x) => {
      if (ca) make(x, { containerAnimation: ca, start: o.horizontalStart || "left 80%" }, store);
      else make(x, { start: o.start || "top 80%" }, store);
    });
    return () => store.forEach((s) => s.kill());
  });
  mm.add("(max-width: 767px)", () => {
    const store: ScrollTrigger[] = [];
    shells.forEach((x) => make(x, { start: o.start || "top 80%" }, store));
    return () => store.forEach((s) => s.kill());
  });
  return () => {
    mm.revert();
    tls.forEach((t) => t.kill());
    shells.forEach((x) => delete x.shell.dataset.revealed);
  };
}
