/**
 * Chapter 0: the loader.
 *
 *   year label chars   yPercent 102 to 0, 1.70s, power4.inOut, 0.07s
 *   year strip count   y 0 to -(cells minus one), 2.85s, power4.inOut
 *   base overlay draw  scaleX 0 to 1, 2.85s, power4.inOut, with the strip
 *   base overlay flood height 8px to the panel height, 1.10s, power2.inOut
 *   field swap         one frame, discrete, at the frame the paper lands
 *   year row handoff   y 0 to -(own height), 1.78s, power4.inOut, 0.42s early
 *   year row clear     autoAlpha 1 to 0, 1.07s, power2.in, with the handoff
 *   journey line clear yPercent 0 to 102, 1.70s, power3.out, 0.07s from end
 *   hero name words    yPercent 102 to 0, 1.70s, power3.out, 0.20s
 *   hero lead lines    same, 0.40s after the last name word
 *   hero meta lines    same at 0.07s, 0.30s after the lead
 *   rail fade in       opacity 0 to 1, 2.50s, power3.out, 0.5s delay
 */
import SplitType from "split-type";
import { gsap, list, reduced, type Cleanup } from "./env";
import { CHAR, WORD, lineReveal, lineHide, mobileScale } from "./reveal";
import { playVariant, revealName } from "./variants";
import { hasLoaderPlayed, markLoaderPlayed } from "./registry";
import { barsClosed, barsIntro } from "./rail";

const LOAD = {
  stripDuration: 2.85,
  stripEase: "power4.inOut",
  heroSlide: 1.78,
  heroSlideEase: "power4.inOut",
  headerFade: { duration: 2.5, delay: 0.5, ease: "power3.out" },
  stripSlideOverlap: 0.42,
  nameAfterFlood: 1.1,
  taglineAfterLastNameWord: 0.4,
  metaAfterTagline: 0.3,
  floodDuration: 1.1,
  floodEase: "power2.inOut",
};

function cellHeight(strip: HTMLElement): number {
  const c = strip.querySelector(".year-strip-cell");
  return c ? c.getBoundingClientRect().height : 0;
}

/** The number of steps the strip counts: one per cell after the first, or the
 *  span the cover declares through data-start-year and data-end-year. */
function stripSteps(hero: HTMLElement, strip: HTMLElement): number {
  const cells = list(".year-strip-cell", strip);
  if (cells.length > 1) return cells.length - 1;
  const from = Number(hero.getAttribute("data-start-year"));
  const to = Number(hero.getAttribute("data-end-year"));
  if (Number.isFinite(from) && Number.isFinite(to) && to > from) return to - from;
  return 1;
}

/** The end state, written once and explicitly, rather than left to wherever
 *  the tweens stopped. Used on completion, on the reduced-motion path, and on
 *  a client-side return to the home route. */
export function heroEndState(hero: HTMLElement): void {
  const strip = hero.querySelector<HTMLElement>("[data-year-strip]");
  const yearRow = hero.querySelector<HTMLElement>("[data-year-row]");
  const nameRow = hero.querySelector<HTMLElement>("[data-name-row]");
  const base = hero.querySelector<HTMLElement>("[data-loading-base-overlay]");
  const journey = hero.querySelector<HTMLElement>("[data-loading-journey-line]");
  if (strip) {
    const ch = cellHeight(strip) || 1;
    gsap.set(strip, { y: -stripSteps(hero, strip) * ch, force3D: true });
  }
  /* the year row shares its grid cell with the name, so lifting it by its own
     height is not enough to clear it: it has to go invisible too */
  if (yearRow) {
    const h = yearRow.getBoundingClientRect().height;
    gsap.set(yearRow, { y: -h, autoAlpha: 0, force3D: true });
  }
  if (nameRow) {
    nameRow.classList.remove("opacity-0");
    gsap.set(nameRow, { opacity: 1, clearProps: "visibility" });
    nameRow.removeAttribute("aria-hidden");
  }
  /* 100% of the panel, not 100vh: on phones the panel grows past the viewport,
     and a 100vh overlay would leave a charcoal band at the top */
  if (base) gsap.set(base, { scaleX: 1, height: "100%", transformOrigin: "0% 100%", force3D: true });
  /* every reveal block lands at its end state whatever the timeline did, so
     the phone path (scale 0.86) cannot finish part-way */
  list("[data-reveal-line]", hero).forEach((el) => {
    if (el === journey) return;
    gsap.set(el, { opacity: 1, clearProps: "visibility" });
    const inner = list("[data-line], .line", el);
    if (inner.length) gsap.set(inner, { yPercent: 0, opacity: 1, clearProps: "willChange,visibility" });
  });
  if (journey) gsap.set(journey, { opacity: 0 });
  hero.setAttribute("data-lit", "true");
}

type LoaderHandles = {
  rail: HTMLElement | null;
  toggle: HTMLButtonElement | null;
  onDone: () => void;
};

function heroInstant(hero: HTMLElement, h: LoaderHandles): void {
  list("[data-reveal-line]", hero).forEach((e) => {
    e.style.opacity = "1";
    e.dataset.revealed = "1";
  });
  const journey = hero.querySelector<HTMLElement>("[data-loading-journey-line]");
  if (journey) journey.style.opacity = "0";
  heroEndState(hero);
  if (h.rail) gsap.set(h.rail, { opacity: 1 });
  if (h.toggle) h.toggle.disabled = false;
  barsClosed();
  h.onDone();
}

/** The live clock in the cover meta row. Reads its zone from data-clock-zone. */
export function initClock(scope: ParentNode): Cleanup {
  const el = scope.querySelector<HTMLElement>("[data-clock]");
  if (!el) return () => {};
  const zone = el.getAttribute("data-clock-zone") || "Asia/Kolkata";
  let fmt: Intl.DateTimeFormat;
  try {
    fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: zone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  }
  const run = () => {
    el.textContent = fmt.format(new Date());
  };
  run();
  const id = window.setInterval(run, 30000);
  return () => window.clearInterval(id);
}

/** The hero lines belong to the loader, not to the generic scroll pass, so
 *  they are claimed before that pass runs rather than inside runLoader. */
export function claimHeroLines(hero: HTMLElement): void {
  list("[data-reveal-line], [data-reveal]", hero).forEach((e) => {
    e.dataset.revealed = "1";
  });
}

export function runLoader(hero: HTMLElement, h: LoaderHandles): Cleanup {
  claimHeroLines(hero);

  /* the loader runs once per full page load; a client-side return settles */
  if (hasLoaderPlayed() || reduced()) {
    heroInstant(hero, h);
    markLoaderPlayed();
    return () => {};
  }
  markLoaderPlayed();

  const strip = hero.querySelector<HTMLElement>("[data-year-strip]");
  const yearRow = hero.querySelector<HTMLElement>("[data-year-row]");
  const nameRow = hero.querySelector<HTMLElement>("[data-name-row]");
  const nameHeading = hero.querySelector<HTMLElement>("[data-name-heading]");
  const journey = hero.querySelector<HTMLElement>("[data-loading-journey-line]");
  const tagline = hero.querySelector<HTMLElement>("[data-loading-tagline]");
  const base = hero.querySelector<HTMLElement>("[data-loading-base-overlay]");
  const startText = list("[data-year-start-text]", hero);
  const meta = list("[data-reveal-line]", hero).filter((e) => e !== tagline && e !== journey);
  if (!strip || !yearRow || !nameRow || !nameHeading) {
    heroInstant(hero, h);
    return () => {};
  }

  const splits: SplitType[] = [];
  const scale = mobileScale();
  const steps = stripSteps(hero, strip);

  gsap.set(nameRow, { opacity: 0 });
  gsap.set(meta, { opacity: 0 });
  if (tagline) gsap.set(tagline, { opacity: 0 });
  if (journey) gsap.set(journey, { opacity: 0, y: 0, force3D: true });
  gsap.set(yearRow, { opacity: 0, y: 0, force3D: true });
  if (base) gsap.set(base, { scaleX: 0, height: 8, transformOrigin: "0% 100%", force3D: true });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.addLabel("stripGo", 0);
  tl.set(yearRow, { opacity: 1 }, "stripGo");

  /* the starting year counts in by characters */
  const charTL = gsap.timeline();
  const chars: HTMLElement[] = [];
  startText.forEach((t) => {
    const sp = new SplitType(t, { types: "chars" });
    splits.push(sp);
    ((sp.chars || []) as HTMLElement[]).forEach((c) => {
      if (c.textContent && c.textContent !== "\n" && c.textContent !== "") chars.push(c);
    });
  });
  if (chars.length) {
    charTL.fromTo(
      chars,
      { yPercent: CHAR.yPercent, opacity: 1 },
      {
        yPercent: 0,
        opacity: 1,
        duration: CHAR.duration * scale,
        ease: CHAR.ease,
        stagger: CHAR.stagger * scale,
        force3D: true,
      }
    );
  }
  const C = charTL.duration();
  tl.add(charTL, "stripGo");

  /* the strip counts from the start year to the end year */
  const ch = cellHeight(strip) || 1;
  gsap.set(strip, { y: 0, force3D: true });
  const stripTL = gsap.timeline();
  stripTL.to(strip, {
    y: () => -steps * (cellHeight(strip) || ch),
    duration: LOAD.stripDuration * scale,
    ease: LOAD.stripEase,
    force3D: true,
  });
  const M = stripTL.duration();
  tl.add(stripTL, "stripGo+=" + C);
  if (base) tl.to(base, { scaleX: 1, duration: M, ease: LOAD.stripEase, force3D: true }, "stripGo+=" + C);

  const overlap = LOAD.stripSlideOverlap * scale;
  tl.addLabel("handoff", "stripGo+=" + Math.max(0.06, C + M - overlap));
  if (journey) tl.add(lineReveal([journey], { scale, splitCollector: splits, revertOnComplete: false }), "stripGo");
  if (h.rail) {
    tl.to(
      h.rail,
      {
        opacity: 1,
        duration: LOAD.headerFade.duration * scale,
        delay: LOAD.headerFade.delay * scale,
        ease: LOAD.headerFade.ease,
      },
      0
    );
  }

  /* the handoff: the year row leaves, the journey line clears */
  const slide = LOAD.heroSlide * scale;
  tl.to(
    yearRow,
    {
      y: () => -(yearRow.getBoundingClientRect().height || 1),
      duration: slide,
      ease: LOAD.heroSlideEase,
      force3D: true,
    },
    "handoff"
  );
  /* it shares a grid cell with the name, so it has to be gone, not just
     lifted, and gone before the name prints rather than at the same moment */
  tl.to(yearRow, { autoAlpha: 0, duration: slide * 0.6, ease: "power2.in" }, "handoff");
  if (journey) tl.add(lineHide([journey], { scale, splitCollector: splits }), "handoff");

  /* the paper floods, and the field turns from charcoal to paper */
  const floodAt = "stripGo+=" + (C + M);
  if (base) {
    tl.to(
      base,
      {
        height: () => hero.offsetHeight,
        duration: LOAD.floodDuration * scale,
        ease: LOAD.floodEase,
        force3D: true,
      },
      floodAt
    );
    /* the swap is a discrete state change at the frame the paper lands, not a
       colour transition: a transition that loses its ticks (a backgrounded
       tab, a dropped frame budget) strands the hero half lit */
    tl.call(
      () => {
        hero.setAttribute("data-lit", "true");
      },
      undefined,
      "stripGo+=" + (C + M + LOAD.floodDuration * scale)
    );
  }

  /* the name prints on the landed paper */
  const nameAt = "stripGo+=" + (C + M + LOAD.nameAfterFlood * scale);
  const words: HTMLElement[] = [];
  list("[data-name-line-text]", nameHeading).forEach((t) => {
    const sp = new SplitType(t, { types: "words" });
    splits.push(sp);
    ((sp.words || []) as HTMLElement[]).forEach((w) => {
      if (w.textContent && w.textContent !== "\n" && w.textContent !== "") words.push(w);
    });
  });
  tl.set(nameRow, { opacity: 1 }, nameAt);
  const wordTL = gsap.timeline({
    onComplete: () => {
      nameRow.removeAttribute("aria-hidden");
      gsap.set(words, { clearProps: "transform,transformOrigin" });
    },
  });
  if (words.length) {
    wordTL.fromTo(
      words,
      { yPercent: WORD.yPercent, opacity: 1, transformOrigin: WORD.transformOrigin },
      {
        yPercent: 0,
        opacity: 1,
        transformOrigin: WORD.transformOrigin,
        duration: WORD.duration * scale,
        ease: WORD.ease,
        stagger: WORD.stagger * scale,
      }
    );
    tl.add(wordTL, nameAt);
  } else {
    nameRow.removeAttribute("aria-hidden");
  }

  const lastWordAt =
    C + M + LOAD.nameAfterFlood * scale + WORD.stagger * scale * Math.max(0, words.length - 1);
  const taglineAt = "stripGo+=" + (lastWordAt + LOAD.taglineAfterLastNameWord * scale);
  /* the lead and the meta row name their own entrance the way any other block
     does; with no name they are G's line reveal, as they were */
  if (tagline) {
    const name = revealName(tagline);
    tl.add(
      name === "bottom"
        ? lineReveal([tagline], { scale, staggerEach: 0.2, splitCollector: splits, revertOnComplete: false })
        : playVariant(tagline, name, { scale, splitCollector: splits, revertOnComplete: false }).timeline,
      taglineAt
    );
  }
  if (meta.length) {
    const metaAt =
      "stripGo+=" + (lastWordAt + LOAD.taglineAfterLastNameWord * scale + LOAD.metaAfterTagline * scale);
    const plain = meta.filter((e) => revealName(e) === "bottom");
    const named = meta.filter((e) => revealName(e) !== "bottom");
    if (plain.length) {
      tl.add(
        lineReveal(plain, { scale, parallelBlocks: true, splitCollector: splits, revertOnComplete: false }),
        metaAt
      );
    }
    named.forEach((e) => {
      tl.add(
        playVariant(e, revealName(e), { scale, splitCollector: splits, revertOnComplete: false }).timeline,
        metaAt
      );
    });
  }

  tl.eventCallback("onComplete", () => {
    /* settle, the way the reference loader does: the end state is written once,
       explicitly, rather than left to wherever the tweens stopped */
    heroEndState(hero);
    list("[data-reveal-line]", hero).forEach((e) => {
      e.dataset.revealed = "1";
    });
    h.onDone();
  });

  barsIntro(() => {
    if (h.toggle) h.toggle.disabled = false;
  });

  return () => {
    tl.kill();
    splits.forEach((s) => s.revert());
  };
}
