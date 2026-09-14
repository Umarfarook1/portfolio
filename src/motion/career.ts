/**
 * Chapter V: the career map.
 *
 *   route   stroke-dashoffset from the full length to 0, 1.60s power2.inOut,
 *           once the chapter is 60% on screen
 *   marker  scale 0 to 1, 0.50s back.out(1.6), timed to where the route has
 *           reached that stop
 *   card    year and title rise 12px with opacity, 0.60s power3.out
 *   hover   the card lifts 4px and the marker stroke thickens (both CSS)
 *
 * Reduced motion: the route and every stop are simply drawn.
 *
 * The stops are placed from the percent coordinates the markup carries
 * (data-x, data-y). Until they are placed the container has no data-map-ready,
 * and the stylesheet stacks them as a plain list, so the chapter reads with no
 * script at all.
 */
import { gsap, ScrollTrigger, isDesktop, reduced, list, debounce, type Cleanup } from "./env";
import { horizontalContainer } from "./registry";

const ROUTE_DURATION = 1.6;

export function initCareerMap(scope: HTMLElement): Cleanup {
  const map = scope.querySelector<HTMLElement>("[data-career-map]");
  if (!map) return () => {};
  const route = map.querySelector<SVGGeometryElement>("[data-map-route]");
  /* the map draws its own route, so the generic variant pass leaves the svg
     alone, and the svg is shown here rather than by that pass */
  const svg = map.querySelector<SVGElement>("[data-map-path]");
  if (svg) {
    svg.dataset.revealed = "1";
    gsap.set(svg, { opacity: 1 });
  }
  const stops = list("[data-map-stop]", map).sort(
    (a, b) => Number(a.getAttribute("data-map-stop")) - Number(b.getAttribute("data-map-stop"))
  );
  if (!stops.length) return () => {};

  /* place the stops along the route, and tell the stylesheet they are placed */
  function place() {
    stops.forEach((stop) => {
      const x = stop.getAttribute("data-x");
      const y = stop.getAttribute("data-y");
      if (x === null || y === null) return;
      stop.style.setProperty("--x", x + "%");
      stop.style.setProperty("--y", y + "%");
      /* a stop near an edge anchors to that edge rather than centring on its
         point, so the first and last cards stay inside the chapter */
      const nx = Number(x);
      const anchor = !Number.isFinite(nx) ? "-50%" : nx < 22 ? "0%" : nx > 72 ? "-100%" : "-50%";
      stop.style.setProperty("--ax", anchor);
    });
    map!.setAttribute("data-map-ready", "");
  }
  function unplace() {
    map!.removeAttribute("data-map-ready");
    stops.forEach((stop) => {
      stop.style.removeProperty("--x");
      stop.style.removeProperty("--y");
      stop.style.removeProperty("--ax");
    });
  }

  const mmPlace = gsap.matchMedia();
  mmPlace.add("(min-width: 768px)", () => {
    place();
    return () => unplace();
  });

  const markers = stops.map((s) => s.querySelector<HTMLElement>("[data-map-marker]"));
  const bodies = stops.map((s) =>
    list(".career__year, .career__title, .career__line", s)
  );

  function endState() {
    if (route) gsap.set(route, { clearProps: "strokeDasharray,strokeDashoffset" });
    markers.forEach((m) => {
      if (m) gsap.set(m, { clearProps: "transform,opacity" });
    });
    bodies.forEach((b) => gsap.set(b, { clearProps: "transform,opacity" }));
    stops.forEach((s) => gsap.set(s, { opacity: 1 }));
  }

  if (reduced()) {
    endState();
    return () => {
      mmPlace.revert();
    };
  }

  /* how far along the route this stop sits: the along-axis coordinate, which
     is x while the route runs left to right and y once it runs top to bottom */
  function fractions(): number[] {
    const horizontal = isDesktop();
    return stops.map((s, i) => {
      const raw = Number(s.getAttribute(horizontal ? "data-x" : "data-y"));
      if (Number.isFinite(raw)) return Math.min(1, Math.max(0, raw / 100));
      return stops.length > 1 ? i / (stops.length - 1) : 0;
    });
  }

  let length = 0;
  function prime() {
    if (!route) return;
    try {
      length = route.getTotalLength();
    } catch {
      length = 0;
    }
    if (length) gsap.set(route, { strokeDasharray: length, strokeDashoffset: length });
  }

  let tl: gsap.core.Timeline | null = null;
  let played = false;

  function reset() {
    prime();
    markers.forEach((m) => {
      if (m) gsap.set(m, { scale: 0, transformOrigin: "50% 50%", force3D: true });
    });
    bodies.forEach((b) => gsap.set(b, { y: 12, opacity: 0, force3D: true }));
  }

  function play() {
    if (played) return;
    played = true;
    const frac = fractions();
    tl = gsap.timeline({ onComplete: endState });
    if (route && length) {
      tl.to(route, { strokeDashoffset: 0, duration: ROUTE_DURATION, ease: "power2.inOut" }, 0);
    }
    stops.forEach((_, i) => {
      const at = ROUTE_DURATION * frac[i];
      const marker = markers[i];
      if (marker) {
        tl!.to(marker, { scale: 1, duration: 0.5, ease: "back.out(1.6)", force3D: true }, at);
      }
      if (bodies[i].length) {
        tl!.to(
          bodies[i],
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", force3D: true, stagger: 0.05 },
          at + 0.08
        );
      }
    });
  }

  reset();

  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    const st = ScrollTrigger.create({
      trigger: map,
      containerAnimation: horizontalContainer(),
      start: "left 60%",
      once: true,
      onEnter: play,
    });
    return () => st.kill();
  });
  mm.add("(max-width: 767px)", () => {
    const st = ScrollTrigger.create({ trigger: map, start: "top 60%", once: true, onEnter: play });
    return () => st.kill();
  });

  /* the route is measured geometry, so a resize remeasures it */
  const onResize = debounce(() => {
    if (played) return;
    reset();
  }, 180);
  window.addEventListener("resize", onResize, { passive: true });

  return () => {
    onResize.cancel();
    window.removeEventListener("resize", onResize);
    mm.revert();
    mmPlace.revert();
    if (tl) tl.kill();
    endState();
  };
}
