/**
 * The chapter behaviours on the home story.
 *
 *   I    the grouped reveal plus the portrait wipe
 *   III  the work list: rows enter, preview scale, hover rule, siblings dim
 *   IV   the service plates, in and out
 *   V    the clients stagger
 *   VII  the colophon words
 *
 * Every hover animation starts from the value on screen: the tweens carry
 * overwrite "auto" and the plates kill and retarget rather than restart, so a
 * row left and re-entered mid-tween follows the pointer instead of snapping.
 */
import { gsap, ScrollTrigger, list, reduced, isDesktop, type Cleanup } from "./env";
import {
  WORD,
  LINE,
  lineReveal,
  imageRevealDone,
  imageRevealPlay,
  imageRevealPrime,
  initScrollLineReveals,
  mobileScale,
} from "./reveal";
import { horizontalContainer } from "./registry";
import SplitType from "split-type";

/* ---------------------------------------------------------------------- */
/* CHAPTER I                                                               */
/* ---------------------------------------------------------------------- */

export function initAboutChapter(scope: HTMLElement): Cleanup {
  const sec = scope.querySelector<HTMLElement>("[data-section='home-about']");
  if (!sec) return () => {};
  const trigger = sec.querySelector<HTMLElement>("[data-about-reveal-group-trigger]");
  const label = sec.querySelector<HTMLElement>("[data-about-reveal-label]");
  const intro = sec.querySelector<HTMLElement>("[data-about-reveal-intro]");
  const quote = sec.querySelector<HTMLElement>("[data-about-reveal-quote]");
  const blocks = [label, intro, quote].filter(Boolean) as HTMLElement[];
  const shell = sec.querySelector<HTMLElement>("[data-about-reveal-group-image-shell]");
  const overlay = shell ? shell.querySelector<HTMLElement>("[data-reveal-image-overlay]") : null;
  const wrapper = shell ? shell.querySelector<HTMLElement>("[data-reveal-image]") : null;
  if (!trigger || !blocks.length || !overlay || !wrapper) return () => {};

  /* this chapter drives its own group, so the generic pass must skip it */
  blocks.forEach((b) => {
    b.dataset.revealed = "1";
  });
  const figure = wrapper.closest<HTMLElement>("[data-reveal-image-shell]");
  if (figure) figure.dataset.revealed = "1";

  if (reduced()) {
    blocks.forEach((b) => {
      b.style.opacity = "1";
      b.dataset.revealed = "1";
    });
    imageRevealDone(overlay, wrapper);
    return () => {
      blocks.forEach((b) => delete b.dataset.revealed);
      if (figure) delete figure.dataset.revealed;
    };
  }

  imageRevealPrime(overlay, wrapper, {});
  const collector: SplitType[] = [];
  const tls: gsap.core.Timeline[] = [];
  let played = false;
  function play() {
    if (played) return;
    played = true;
    const tl = gsap.timeline();
    tls.push(tl);
    const step = 0.12;
    blocks.forEach((b, i) => {
      b.dataset.revealed = "1";
      tl.add(lineReveal([b], { splitCollector: collector }), i * step);
    });
    wrapper!.classList.remove("opacity-0");
    gsap.set(wrapper!, { opacity: 1 });
    tl.add(imageRevealPlay(overlay!, wrapper!, {}), blocks.length * step);
  }
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    const st = ScrollTrigger.create({
      trigger,
      containerAnimation: horizontalContainer(),
      start: "left 80%",
      once: true,
      onEnter: play,
    });
    return () => st.kill();
  });
  mm.add("(max-width: 767px)", () => {
    const st = ScrollTrigger.create({ trigger, start: "top 80%", once: true, onEnter: play });
    return () => st.kill();
  });
  return () => {
    mm.revert();
    tls.forEach((t) => t.kill());
    collector.forEach((c) => c.revert());
    blocks.forEach((b) => delete b.dataset.revealed);
    if (figure) delete figure.dataset.revealed;
  };
}

/* ---------------------------------------------------------------------- */
/* CHAPTER III                                                             */
/* ---------------------------------------------------------------------- */

export function initWorkChapter(scope: HTMLElement): Cleanup {
  const sec = scope.querySelector<HTMLElement>("[data-section='home-work']");
  if (!sec) return () => {};
  const listEl = sec.querySelector<HTMLElement>("[data-work-list]");
  const rows = list("[data-work-item-index]", sec);
  const texts = list("[data-work-item-text-wrap]", sec);
  const arrows = list("[data-work-item-arrow]", sec);
  const hoverLines = list("[data-work-hover-line]", sec);
  const hairs = list("[data-work-line]", sec);
  const images = list("[data-work-image]", sec);
  const placeholder = sec.querySelector<HTMLElement>("[data-work-placeholder]");
  const HIDDEN = 0;
  const DUR = 0.45;
  const EASE = "power3.out";
  let active: string | null = null;
  let z = 0;
  let run = 0;
  const offs: Cleanup[] = [];

  function park(img: HTMLElement) {
    gsap.killTweensOf(img);
    gsap.set(img, { autoAlpha: 0, scale: HIDDEN, zIndex: 0, clearProps: "willChange" });
  }
  gsap.set(images, { autoAlpha: 0, scale: HIDDEN, zIndex: 0 });
  gsap.set(hoverLines, { scaleX: 0 });

  function clearPreview(instant: boolean) {
    run += 1;
    active = null;
    z = 0;
    const shown = images.filter((i) => Number(gsap.getProperty(i, "autoAlpha")) === 1);
    if (placeholder) placeholder.style.setProperty("opacity", "1");
    if (instant || !shown.length) {
      images.forEach(park);
      return;
    }
    const token = run;
    shown.forEach((img) => {
      gsap.killTweensOf(img);
      gsap.to(img, {
        scale: HIDDEN,
        duration: DUR,
        ease: EASE,
        overwrite: "auto",
        onComplete: () => {
          if (token === run) park(img);
        },
      });
    });
  }
  function showPreview(key: string) {
    if (!isDesktop()) return;
    const img = images.filter((i) => i.getAttribute("data-work-image") === key)[0];
    if (!img) return;
    if (active === key && Number(gsap.getProperty(img, "scale")) >= 0.999) return;
    if (placeholder) placeholder.style.setProperty("opacity", "0");
    z += 1;
    const token = (run += 1);
    active = key;
    images.forEach((other) => {
      if (other !== img && Number(gsap.getProperty(other, "autoAlpha")) === 1) {
        gsap.killTweensOf(other);
        gsap.set(other, { scale: 1, autoAlpha: 1, zIndex: z });
        z += 1;
      }
    });
    gsap.killTweensOf(img);
    gsap.set(img, { autoAlpha: 1, scale: HIDDEN, zIndex: z, willChange: "transform" });
    gsap.to(img, {
      scale: 1,
      duration: DUR,
      ease: EASE,
      overwrite: "auto",
      onComplete: () => {
        if (token !== run) return;
        images.forEach((other) => {
          if (other === img) {
            gsap.set(other, { scale: 1, autoAlpha: 1, zIndex: 1, clearProps: "willChange" });
          } else {
            park(other);
          }
        });
        z = 1;
      },
    });
  }
  function dim(index: string) {
    if (!isDesktop()) return;
    const i = Number(index);
    texts.forEach((t, k) => t.style.setProperty("opacity", k === i ? "1" : "0.25"));
    arrows.forEach((a, k) => a.style.setProperty("opacity", k === i ? "1" : "0"));
    if (hoverLines.length) {
      gsap.to(hoverLines, { scaleX: 0, duration: 0.3, ease: EASE, overwrite: "auto" });
      const hl = hoverLines[i];
      if (hl) gsap.to(hl, { scaleX: 1, duration: 1, ease: EASE, overwrite: "auto" });
    }
  }
  function undim() {
    texts.forEach((t) => t.style.removeProperty("opacity"));
    arrows.forEach((a) => a.style.setProperty("opacity", "0"));
    if (hoverLines.length) gsap.to(hoverLines, { scaleX: 0, duration: 1, ease: EASE, overwrite: "auto" });
  }
  function enter(key: string) {
    showPreview(key);
    dim(key);
  }
  function leave() {
    clearPreview(false);
    undim();
  }

  clearPreview(true);
  undim();

  let px = 0;
  let py = 0;
  let seen = false;
  let current: string | null = null;
  let queued = false;

  function rowUnderPointer(): HTMLElement | null {
    if (!isDesktop()) return null;
    const focused = sec!.querySelector<HTMLElement>("[data-work-item-index]:focus-within");
    if (focused) return focused;
    if (seen) {
      for (let i = rows.length - 1; i >= 0; i--) {
        const r = rows[i].getBoundingClientRect();
        if (px >= r.left && px <= r.right && py >= r.top && py <= r.bottom) return rows[i];
      }
    }
    return sec!.querySelector<HTMLElement>("[data-work-item-index]:hover");
  }
  function evaluate() {
    if (!isDesktop()) return;
    const row = rowUnderPointer();
    const key = row ? row.getAttribute("data-work-item-index") : null;
    if (key === current) return;
    const prev = current;
    current = key;
    if (key) {
      enter(key);
    } else if (prev !== null) {
      if (listEl && listEl.matches(":hover")) return;
      leave();
    }
  }
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        queued = false;
        evaluate();
      });
    });
  }
  function onPointer(ev: PointerEvent) {
    if (ev.pointerType === "touch") return;
    px = ev.clientX;
    py = ev.clientY;
    seen = true;
  }
  document.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("pointerdown", onPointer, { passive: true });
  const onSecEnter = () => schedule();
  sec.addEventListener("pointerenter", onSecEnter);
  const onScrollEnd = () => {
    if (isDesktop()) schedule();
  };
  ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);
  offs.push(() => {
    document.removeEventListener("pointermove", onPointer);
    document.removeEventListener("pointerdown", onPointer);
    sec.removeEventListener("pointerenter", onSecEnter);
    ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
  });

  rows.forEach((row) => {
    const key = row.getAttribute("data-work-item-index") || "";
    const onEnter = () => {
      current = key;
      enter(key);
    };
    const onLeave = (ev: PointerEvent) => {
      const to = ev.relatedTarget;
      if (to instanceof Node && listEl && listEl.contains(to)) return;
      schedule();
    };
    const onFocusIn = () => {
      current = key;
      enter(key);
    };
    const onFocusOut = (ev: FocusEvent) => {
      const to = ev.relatedTarget;
      if (to instanceof Element) {
        const owner = to.closest("[data-work-item-index]");
        if (owner && sec!.contains(owner)) return;
      }
      schedule();
    };
    row.addEventListener("pointerenter", onEnter);
    row.addEventListener("pointerleave", onLeave);
    row.addEventListener("focusin", onFocusIn);
    row.addEventListener("focusout", onFocusOut);
    offs.push(() => {
      row.removeEventListener("pointerenter", onEnter);
      row.removeEventListener("pointerleave", onLeave);
      row.removeEventListener("focusin", onFocusIn);
      row.removeEventListener("focusout", onFocusOut);
    });
  });
  if (listEl) {
    const onListLeave = (ev: PointerEvent) => {
      const to = ev.relatedTarget;
      if (to instanceof Node && listEl.contains(to)) return;
      current = null;
      leave();
    };
    listEl.addEventListener("pointerleave", onListLeave);
    offs.push(() => listEl.removeEventListener("pointerleave", onListLeave));
  }

  /* enter: the rows line-reveal and the hairlines draw with them */
  const lines = list("[data-work-list] [data-line]", sec);
  function makeEnter(cfg: ScrollTrigger.StaticVars): ScrollTrigger | null {
    if (!listEl || !lines.length) return null;
    return ScrollTrigger.create(
      Object.assign({ trigger: listEl, once: true }, cfg, {
        onEnter: () => {
          const tl = gsap.timeline({ onComplete: schedule });
          tl.add(lineReveal([listEl], { duration: 1, staggerEach: 0.12 }));
          if (hairs.length) {
            tl.to(hairs, { scaleX: 1, duration: 1, ease: EASE, stagger: 0.12, overwrite: "auto" }, 0);
          }
        },
      })
    );
  }
  gsap.set(hairs, { scaleX: 0, transformOrigin: "0% 50%" });
  let mm: gsap.MatchMedia | null = null;
  if (reduced()) {
    gsap.set(hairs, { scaleX: 1 });
    lines.forEach((l) => gsap.set(l, { yPercent: 0, opacity: 1 }));
  } else {
    mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const a = makeEnter({ containerAnimation: horizontalContainer(), start: "left 50%" });
      const b = ScrollTrigger.create({
        trigger: sec!,
        containerAnimation: horizontalContainer(),
        start: "left 100%",
        end: "right 0%",
        onUpdate: schedule,
        onEnter: schedule,
        onEnterBack: schedule,
        onLeave: () => {
          current = null;
          leave();
        },
        onLeaveBack: () => {
          current = null;
          leave();
        },
      });
      return () => {
        if (a) a.kill();
        b.kill();
      };
    });
    mm.add("(max-width: 767px)", () => {
      const a = makeEnter({ start: "top 85%" });
      return () => {
        if (a) a.kill();
      };
    });
  }

  return () => {
    if (mm) mm.revert();
    offs.forEach((f) => f());
    gsap.killTweensOf(images.concat(hoverLines, hairs));
  };
}

/* ---------------------------------------------------------------------- */
/* CHAPTER IV                                                              */
/* ---------------------------------------------------------------------- */

const SERVICE_HIDDEN = "inset(100% 0% 0% 0%)";
const SERVICE_SHOWN = "inset(0% 0% 0% 0%)";
const SERVICE_CLEAR = "inset(0% 0% 100% 0%)";

export function initServices(scope: HTMLElement): Cleanup {
  const sec = scope.querySelector<HTMLElement>("[data-services-section]");
  if (!sec) return () => {};
  const offReveals = initScrollLineReveals(sec, { horizontalStart: "left 60%" });
  const items = list("[data-service-item]", sec);
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    const offs: Cleanup[] = [];
    items.forEach((item) => {
      const plate = item.querySelector<HTMLElement>("[data-service-bg-reveal]");
      const media = item.querySelector<HTMLElement>("[data-service-bg-media]");
      if (!plate || !media) return;
      gsap.set(plate, { clipPath: SERVICE_HIDDEN, force3D: true });
      gsap.set(media, { yPercent: 6, force3D: true });
      function rest() {
        gsap.set(plate!, { clipPath: SERVICE_HIDDEN, clearProps: "willChange" });
        gsap.set(media!, { yPercent: 6, clearProps: "willChange" });
      }
      /* kill and retarget, never restart: both tweens pick up the live clip
         and the live yPercent, so a column re-entered mid-leave turns round */
      function show() {
        gsap.killTweensOf([plate!, media!]);
        if (reduced()) {
          gsap.set(plate!, { clipPath: SERVICE_SHOWN });
          gsap.set(media!, { yPercent: -3 });
          return;
        }
        gsap.set([plate!, media!], { willChange: "transform,clip-path" });
        gsap
          .timeline()
          .to(plate!, { clipPath: SERVICE_SHOWN, duration: 0.8, ease: "power3.out", overwrite: "auto" }, 0)
          .to(media!, { yPercent: -3, duration: 0.8, ease: "power3.out", overwrite: "auto" }, 0);
      }
      function hide() {
        gsap.killTweensOf([plate!, media!]);
        if (reduced()) {
          rest();
          return;
        }
        gsap
          .timeline({ onComplete: rest })
          .to(plate!, { clipPath: SERVICE_CLEAR, duration: 0.8, ease: "power3.out", overwrite: "auto" }, 0)
          .to(media!, { yPercent: -9, duration: 0.8, ease: "power3.out", overwrite: "auto" }, 0);
      }
      function out(ev: FocusEvent) {
        const to = ev.relatedTarget;
        if (to instanceof Node && item.contains(to)) return;
        hide();
      }
      item.addEventListener("pointerenter", show);
      item.addEventListener("pointerleave", hide);
      item.addEventListener("focusin", show);
      item.addEventListener("focusout", out);
      offs.push(() => {
        item.removeEventListener("pointerenter", show);
        item.removeEventListener("pointerleave", hide);
        item.removeEventListener("focusin", show);
        item.removeEventListener("focusout", out);
        gsap.killTweensOf([plate!, media!]);
        rest();
      });
    });
    return () => offs.forEach((f) => f());
  });
  mm.add("(max-width: 767px)", () => {
    const sts: ScrollTrigger[] = [];
    const anims: gsap.core.Timeline[] = [];
    items.forEach((item) => {
      const plate = item.querySelector<HTMLElement>("[data-service-bg-reveal]");
      const media = item.querySelector<HTMLElement>("[data-service-bg-media]");
      if (!plate || !media) return;
      gsap.set(plate, { clipPath: SERVICE_SHOWN, autoAlpha: 0, force3D: true });
      gsap.set(media, { yPercent: 0, force3D: true });
      if (reduced()) {
        gsap.set(plate, { autoAlpha: 1 });
        return;
      }
      const t = gsap
        .timeline({ paused: true })
        .to(plate, { autoAlpha: 1, duration: 0.8, ease: "power3.out" }, 0)
        .to(media, { yPercent: -4, duration: 0.8, ease: "power3.out" }, 0);
      anims.push(t);
      sts.push(
        ScrollTrigger.create({
          trigger: item,
          start: "bottom bottom",
          end: "top top",
          toggleActions: "play reverse play reverse",
          animation: t,
        })
      );
    });
    return () => {
      sts.forEach((s) => s.kill());
      anims.forEach((a) => a.kill());
    };
  });
  return () => {
    mm.revert();
    offReveals();
  };
}

/* ---------------------------------------------------------------------- */
/* CHAPTER V                                                               */
/* ---------------------------------------------------------------------- */

export function initClients(scope: HTMLElement): Cleanup {
  const sec = scope.querySelector<HTMLElement>("[data-section='home-clients']");
  if (!sec) return () => {};
  const listEl = sec.querySelector<HTMLElement>("[data-clients-list]");
  const rows = list("[data-client-row]", sec);
  const wraps = list("[data-client-text-wrap]", sec);
  const moreRow = sec.querySelector<HTMLElement>("[data-client-more]");
  const moreWrap = moreRow ? moreRow.querySelector<HTMLElement>("[data-client-text-wrap]") : null;
  if (!listEl) return () => {};
  const offs: Cleanup[] = [];

  function dim(i: number) {
    if (!isDesktop() || !listEl!.hasAttribute("data-clients-list-interactive")) return;
    wraps.forEach((w, k) => {
      if (w === moreWrap) return;
      w.style.setProperty("opacity", k === i ? "1" : "0.25");
    });
  }
  function undim() {
    if (!isDesktop()) return;
    wraps.forEach((w) => {
      if (w !== moreWrap) w.style.removeProperty("opacity");
    });
  }
  rows.forEach((row, i) => {
    const onEnter = () => dim(i);
    const onFocusIn = () => dim(i);
    const onLeave = (ev: PointerEvent) => {
      const to = ev.relatedTarget;
      if (to instanceof Node && listEl!.contains(to)) return;
      undim();
    };
    const onFocusOut = (ev: FocusEvent) => {
      const to = ev.relatedTarget;
      if (to instanceof Element && to.closest("[data-client-row]")) return;
      undim();
    };
    row.addEventListener("pointerenter", onEnter);
    row.addEventListener("focusin", onFocusIn);
    row.addEventListener("pointerleave", onLeave);
    row.addEventListener("focusout", onFocusOut);
    offs.push(() => {
      row.removeEventListener("pointerenter", onEnter);
      row.removeEventListener("focusin", onFocusIn);
      row.removeEventListener("pointerleave", onLeave);
      row.removeEventListener("focusout", onFocusOut);
    });
  });
  const onListLeave = (ev: PointerEvent) => {
    const to = ev.relatedTarget;
    if (to instanceof Node && listEl.contains(to)) return;
    undim();
  };
  listEl.addEventListener("pointerleave", onListLeave);
  offs.push(() => listEl.removeEventListener("pointerleave", onListLeave));

  const lines = list("[data-clients-list] [data-line]", sec);
  if (reduced()) {
    gsap.set(lines, { yPercent: 0, opacity: 1 });
    listEl.setAttribute("data-clients-list-interactive", "");
    return () => offs.forEach((f) => f());
  }
  function make(cfg: ScrollTrigger.StaticVars): ScrollTrigger | null {
    if (!lines.length) return null;
    return ScrollTrigger.create(
      Object.assign({ trigger: listEl!, once: true }, cfg, {
        onEnter: () => {
          const tl = gsap.timeline({
            onComplete: () => listEl!.setAttribute("data-clients-list-interactive", ""),
          });
          tl.add(lineReveal([listEl!], { staggerEach: 0.15 }));
        },
      })
    );
  }
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    const a = make({ containerAnimation: horizontalContainer(), start: "left 75%" });
    return () => {
      if (a) a.kill();
    };
  });
  mm.add("(max-width: 767px)", () => {
    const a = make({ start: "top 85%" });
    return () => {
      if (a) a.kill();
    };
  });
  return () => {
    mm.revert();
    offs.forEach((f) => f());
    listEl.removeAttribute("data-clients-list-interactive");
  };
}

/* ---------------------------------------------------------------------- */
/* THE COLOPHON                                                            */
/* ---------------------------------------------------------------------- */

export function initFooter(scope: HTMLElement): Cleanup {
  const sec = scope.querySelector<HTMLElement>("[data-section='home-footer']");
  if (!sec) return () => {};
  const heading = sec.querySelector<HTMLElement>("[data-char-line-heading]");
  const contact = sec.querySelector<HTMLElement>("[data-reveal-line]");
  if (!heading || !contact) return () => {};
  contact.dataset.revealed = "1";
  if (reduced()) {
    heading.classList.remove("opacity-0");
    gsap.set(heading, { opacity: 1 });
    heading.removeAttribute("aria-hidden");
    contact.style.opacity = "1";
    contact.dataset.revealed = "1";
    return () => {
      delete contact.dataset.revealed;
    };
  }
  const scale = mobileScale();
  const splits: SplitType[] = [];
  const words: HTMLElement[] = [];
  list("[data-name-line-text]", heading).forEach((t) => {
    const sp = new SplitType(t, { types: "words" });
    splits.push(sp);
    ((sp.words || []) as HTMLElement[]).forEach((w) => {
      if (w.textContent && w.textContent !== "\n" && w.textContent !== "") words.push(w);
    });
  });
  const contactLines: SplitType[] = [];
  const tls: gsap.core.Timeline[] = [];
  function play() {
    heading!.dataset.revealed = "1";
    contact!.dataset.revealed = "1";
    const tl = gsap.timeline({
      onComplete: () => {
        heading!.removeAttribute("aria-hidden");
        if (words.length) gsap.set(words, { clearProps: "willChange" });
      },
    });
    tls.push(tl);
    heading!.classList.remove("opacity-0");
    tl.set(heading!, { opacity: 1 }, 0);
    if (words.length) {
      tl.set(words, { willChange: "transform", force3D: true }, 0);
      tl.fromTo(
        words,
        { yPercent: WORD.yPercent, opacity: 1, transformOrigin: WORD.transformOrigin },
        {
          yPercent: 0,
          opacity: 1,
          transformOrigin: WORD.transformOrigin,
          duration: WORD.duration * scale,
          ease: WORD.ease,
          stagger: WORD.stagger * scale,
          force3D: true,
        },
        0
      );
    }
    const lead = 0.8 + (WORD.stagger - LINE.staggerEach) * scale * Math.max(0, words.length - 1);
    tl.add(
      lineReveal([contact!], { scale, duration: 1, splitCollector: contactLines, revertOnComplete: false }),
      Math.max(0, lead)
    );
  }
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    const st = ScrollTrigger.create({
      trigger: heading,
      containerAnimation: horizontalContainer(),
      start: "left 60%",
      once: true,
      onEnter: play,
    });
    return () => st.kill();
  });
  mm.add("(max-width: 767px)", () => {
    const st = ScrollTrigger.create({ trigger: heading, start: "top 70%", once: true, onEnter: play });
    return () => st.kill();
  });
  return () => {
    mm.revert();
    tls.forEach((t) => t.kill());
    splits.forEach((s) => s.revert());
    contactLines.forEach((s) => s.revert());
    delete contact.dataset.revealed;
    delete heading.dataset.revealed;
  };
}
