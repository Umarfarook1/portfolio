/**
 * Mounting the pen. The geometry lives in lib/sketch; this file is the set of
 * controls G draws with it, the registry that redraws them when the type
 * reflows, and the pen arrow that points into the Send button.
 *
 * Boil is 0.2 everywhere: at the drawably default of 0.3 the stroke wobbles,
 * at 0.2 it breathes.
 */
import {
  type Box,
  type Gen,
  type Layer,
  type PenOptions,
  INSET,
  createSvg,
  elementBox,
  blockAncestor,
  focusRect,
  lineBoxes,
  outlineRect,
  paint,
  randomSeed,
  roughArrow,
  roughCheckmark,
  roughCircle,
  roughEllipse,
  roughLine,
  scribbleFill,
} from "@/lib/sketch";
import { list, reduced, debounce, type Cleanup } from "./env";

const PEN_DEFAULTS = { roughness: 1, boil: 0.2, width: 1.7 };

export type PenHandle = {
  el: HTMLElement;
  draw: () => void;
  resketch: (seed?: number) => void;
  setState?: (state: string) => void;
};

export type PenButtonElement = HTMLElement & { __pen?: PenHandle };

type ChromeOptions = {
  stroke?: string;
  fill?: string;
  width?: number;
  roughness?: number;
  boil?: number;
  seed?: number;
  variant?: string;
};

let registry: PenHandle[] = [];
let arrows: { draw: () => void; remove: () => void }[] = [];
const mounted = new WeakSet<HTMLElement>();

export function redrawPens(): void {
  registry.forEach((s) => {
    try {
      s.draw();
    } catch {
      /* a control that cannot be measured stays plain */
    }
  });
  arrows.forEach((a) => {
    try {
      a.draw();
    } catch {
      /* no arrow */
    }
  });
}

function attachChrome(
  el: HTMLElement,
  layers: Layer[],
  opts: ChromeOptions,
  interactive: boolean,
  inline: boolean
): PenHandle {
  /* .drawably-host carries position:relative so the svg has something to sit
     in. An element that already positions itself keeps the box it was given:
     without this the sketched column rule in the studio table, the one pen
     host in G that is absolutely positioned, collapsed to zero height and
     never drew at all. */
  const own = getComputedStyle(el).position;
  el.classList.add("drawably-host");
  if (own === "absolute" || own === "fixed" || own === "sticky") el.style.position = own;
  if (opts.stroke) el.style.setProperty("--drawably-stroke", opts.stroke);
  if (opts.fill) el.style.setProperty("--drawably-fill", opts.fill);
  if (opts.width !== undefined) el.style.setProperty("--drawably-width", String(opts.width));
  const svg = createSvg();
  el.prepend(svg);
  const roughness = opts.roughness !== undefined ? opts.roughness : PEN_DEFAULTS.roughness;
  const boil = opts.boil !== undefined ? opts.boil : PEN_DEFAULTS.boil;
  let seed = opts.seed !== undefined ? opts.seed : randomSeed();
  function draw() {
    const boxes: Box[] = inline ? lineBoxes(el, svg) : elementBox(el);
    paint(svg, layers, boxes, { seed, roughness, boil });
  }
  draw();
  const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => draw()) : null;
  if (ro) {
    ro.observe(el);
    if (inline) {
      const block = blockAncestor(el);
      if (block) ro.observe(block);
    }
  }
  function resketch(s?: number) {
    seed = s === undefined ? randomSeed() : s;
    draw();
  }
  /* the hand redraws on pointerdown as well as pointerenter, so the mark
     answers the press rather than the release */
  const onPointer = () => resketch();
  if (interactive && !reduced()) {
    el.addEventListener("pointerenter", onPointer);
    el.addEventListener("pointerdown", onPointer);
  }
  const handle: PenHandle = { el, draw, resketch };
  registry.push(handle);
  return handle;
}

function penButton(el: HTMLElement, opts: ChromeOptions): PenHandle {
  const variant = opts.variant || "outline";
  const layers: Layer[] = [];
  if (variant === "solid") layers.push({ className: "drawably-blob", gen: outlineRect(8) });
  if (variant === "scribble") {
    layers.push({
      className: "drawably-scribble",
      gen: (w, h, o) => scribbleFill(INSET + 2, INSET + 2, w - 2 * INSET - 4, h - 2 * INSET - 4, o),
    });
  }
  layers.push({ className: "drawably-outline", gen: outlineRect(8) });
  layers.push({ className: "drawably-focus", gen: focusRect(10) });
  const s = attachChrome(el, layers, opts, true, false);
  s.setState = (state: string) => {
    if (state === "idle") {
      delete el.dataset.state;
    } else {
      el.dataset.state = state;
    }
  };
  return s;
}

function syncedControl(
  el: HTMLElement,
  type: string,
  layers: Layer[],
  opts: ChromeOptions
): PenHandle | null {
  const input = el.querySelector<HTMLInputElement>('input[type="' + type + '"]');
  if (!input) return null;
  function sync() {
    if (input!.checked) {
      el.dataset.checked = "";
    } else {
      delete el.dataset.checked;
    }
  }
  sync();
  const target: Document | HTMLInputElement = type === "radio" ? document : input;
  target.addEventListener("change", sync);
  return attachChrome(el, layers, opts, true, false);
}

function penCheckbox(el: HTMLElement, opts: ChromeOptions) {
  return syncedControl(
    el,
    "checkbox",
    [
      { className: "drawably-outline", gen: outlineRect(5) },
      {
        className: "drawably-check",
        pathLength: true,
        gen: (w, h, o) => roughCheckmark(w * 0.24, h * 0.2, w * 0.52, h * 0.5, o),
      },
      { className: "drawably-focus", gen: focusRect(7) },
    ],
    opts
  );
}

function penRadio(el: HTMLElement, opts: ChromeOptions) {
  return syncedControl(
    el,
    "radio",
    [
      {
        className: "drawably-outline",
        gen: (w, h, o) => roughCircle(w / 2, h / 2, Math.min(w, h) / 2 - INSET, o),
      },
      {
        className: "drawably-dot",
        gen: (w, h, o) => roughCircle(w / 2, h / 2, Math.min(w, h) * 0.18, o),
      },
      {
        className: "drawably-focus",
        gen: (w, h, o) => roughCircle(w / 2, h / 2, Math.min(w, h) / 2 + 1, o),
      },
    ],
    opts
  );
}

function penToggle(el: HTMLElement, opts: ChromeOptions) {
  return syncedControl(
    el,
    "checkbox",
    [
      { className: "drawably-outline", gen: (w, h, o) => outlineRect((h - 2 * INSET) / 2)(w, h, o) },
      {
        className: "drawably-blob drawably-knob",
        gen: (w, h, o) => roughCircle(h / 2, h / 2, h / 2 - INSET - 3, o),
      },
      { className: "drawably-focus", gen: focusRect(12) },
    ],
    opts
  );
}

function penField(el: HTMLElement, extra: Layer[], opts: ChromeOptions) {
  const layers: Layer[] = [{ className: "drawably-outline", gen: outlineRect(6) }]
    .concat(extra || [])
    .concat([{ className: "drawably-focus", gen: focusRect(8) }]);
  return attachChrome(el, layers, opts, false, false);
}

const CHEVRON_W = 12;
const CHEVRON_H = 6;
const CHEVRON_RIGHT = 14;
const CHEVRON_ROUGHNESS = 0.4;

function penSelect(el: HTMLElement, opts: ChromeOptions) {
  return penField(
    el,
    [
      {
        className: "drawably-outline",
        gen: (w, h, o) => {
          const x = w - CHEVRON_RIGHT - CHEVRON_W;
          const y = h / 2 - CHEVRON_H / 2;
          const so: PenOptions = Object.assign({}, o, { roughness: o.roughness * CHEVRON_ROUGHNESS });
          return (
            roughLine(x, y, x + CHEVRON_W / 2, y + CHEVRON_H, so) +
            roughLine(x + CHEVRON_W / 2, y + CHEVRON_H, x + CHEVRON_W, y, so)
          );
        },
      },
    ],
    opts
  );
}

function penCard(el: HTMLElement, opts: ChromeOptions) {
  return attachChrome(el, [{ className: "drawably-outline", gen: outlineRect(10) }], opts, false, false);
}

function penBadge(el: HTMLElement, opts: ChromeOptions) {
  return attachChrome(el, [{ className: "drawably-outline", gen: outlineRect(2) }], opts, false, false);
}

function penRule(el: HTMLElement, opts: ChromeOptions) {
  const gen: Gen = (w, h, o) => (w > h ? roughLine(0, h / 2, w, h / 2, o) : roughLine(w / 2, 0, w / 2, h, o));
  return attachChrome(el, [{ className: "drawably-outline", gen }], opts, false, false);
}

const UNDERLINE_GAP = 3;

export function penUnderline(el: HTMLElement, opts: ChromeOptions) {
  return attachChrome(
    el,
    [
      {
        className: "drawably-outline",
        gen: (w, h, o) => roughLine(0, h + UNDERLINE_GAP, w, h + UNDERLINE_GAP, o),
      },
    ],
    Object.assign({ width: 2 }, opts),
    true,
    true
  );
}

function penCircleMark(el: HTMLElement, opts: ChromeOptions) {
  return attachChrome(
    el,
    [
      {
        className: "drawably-outline",
        gen: (w, h, o) => roughEllipse(w / 2, h / 2, (w / 2) * 1.16 + 7, (h / 2) * 1.02 + 5, o),
      },
    ],
    Object.assign({ width: 1.8 }, opts),
    true,
    true
  );
}

function penMarker(el: HTMLElement, opts: ChromeOptions) {
  return attachChrome(
    el,
    [
      {
        className: "drawably-outline",
        gen: (w, h, o) => roughCircle(w / 2, h / 2, Math.min(w, h) / 2 - INSET, o),
      },
    ],
    Object.assign({ width: 1.8 }, opts),
    false,
    false
  );
}

/** A local arrow: the anchors and the host move together inside the horizontal
 *  track, so document coordinates would drift. */
export function penArrow(
  host: HTMLElement,
  fromEl: HTMLElement,
  toEl: HTMLElement,
  opts: ChromeOptions
) {
  const svg = createSvg();
  svg.classList.add("drawably-arrow");
  svg.style.position = "absolute";
  svg.style.pointerEvents = "none";
  if (opts.stroke) svg.style.setProperty("--drawably-stroke", opts.stroke);
  svg.style.setProperty("--drawably-width", String(opts.width || 1.8));
  host.appendChild(svg);
  const seed = opts.seed !== undefined ? opts.seed : randomSeed();
  const roughness = opts.roughness !== undefined ? opts.roughness : 1;
  const boil = opts.boil !== undefined ? opts.boil : PEN_DEFAULTS.boil;
  const GAP = 8;
  function draw() {
    const hb = host.getBoundingClientRect();
    const a = fromEl.getBoundingClientRect();
    const b = toEl.getBoundingClientRect();
    if (!a.width || !b.width || !hb.width) {
      svg.textContent = "";
      return;
    }
    const left = Math.min(a.left, b.left);
    const top = Math.min(a.top, b.top);
    const w = Math.max(a.right, b.right) - left;
    const h = Math.max(a.bottom, b.bottom) - top;
    svg.style.left = left - hb.left + "px";
    svg.style.top = top - hb.top + "px";
    svg.style.width = w + "px";
    svg.style.height = h + "px";
    const ax = a.left - left + a.width / 2;
    const ay = a.top - top + a.height / 2;
    const bx = b.left - left + b.width / 2;
    const by = b.top - top + b.height / 2;
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    function exit(r: DOMRect) {
      return Math.min(r.width / 2 / Math.abs(ux) || 1e6, r.height / 2 / Math.abs(uy) || 1e6);
    }
    const t0 = Math.min(exit(a) + GAP, len / 2);
    const t1 = Math.min(exit(b) + GAP, len / 2);
    paint(
      svg,
      [
        {
          className: "drawably-outline",
          gen: (_w, _h, o) => roughArrow(ax + ux * t0, ay + uy * t0, bx - ux * t1, by - uy * t1, o),
        },
      ],
      [{ x: 0, y: 0, w, h }],
      { seed, roughness, boil }
    );
  }
  draw();
  const handle = { draw, remove: () => svg.remove() };
  arrows.push(handle);
  return handle;
}

/** Mounts every pen control found under a root, once. */
export function mountPens(scope: ParentNode): void {
  function each(sel: string, fn: (el: HTMLElement) => void) {
    list(sel, scope).forEach((el) => {
      if (mounted.has(el)) return;
      mounted.add(el);
      try {
        fn(el);
      } catch {
        /* a control that cannot be measured stays plain */
      }
    });
  }
  each("[data-pen-button]", (el) => {
    const s = penButton(el, { variant: el.getAttribute("data-pen-button") || "outline" });
    (el as PenButtonElement).__pen = s;
  });
  each("[data-pen-check]", (el) => {
    penCheckbox(el, {});
  });
  each("[data-pen-radio]", (el) => {
    penRadio(el, {});
  });
  each("[data-pen-toggle]", (el) => {
    penToggle(el, {});
  });
  each("[data-pen-input]", (el) => {
    penField(el, [], el.getAttribute("data-tone") === "danger" ? { stroke: "var(--err)" } : {});
  });
  each("[data-pen-textarea]", (el) => {
    penField(el, [], {});
  });
  each("[data-pen-select]", (el) => {
    /* a custom dropdown draws its own chevron in the markup, so the pen only
       draws the box round it; a native select still gets G's drawn chevron */
    if (el.hasAttribute("data-select")) penField(el, [], {});
    else penSelect(el, {});
  });
  each("[data-pen-card]", (el) => {
    penCard(el, {});
  });
  each("[data-pen-badge]", (el) => {
    penBadge(el, {});
  });
  each("[data-pen-rule]", (el) => {
    penRule(el, {});
  });
  each("[data-pen-circle]", (el) => {
    penCircleMark(el, {});
  });
  /* a career map stop: a small drawn ring on the route. The last stop also
     carries data-pen-circle, and its loop is drawn by the line above. */
  each("[data-map-marker]:not([data-pen-circle])", (el) => {
    penMarker(el, {});
  });
}

/** The pen marks that have to wait for the type to stop moving.
 *
 *  An underline sits three pixels under the baseline, which is outside the
 *  line mask a reveal rides in. So the mark is drawn only once its block has
 *  finished revealing: the mask has no more work to do by then and can stop
 *  clipping. On the cover that moment is the end of the loader; in a chapter
 *  or on a sheet it is the end of that block's line reveal. Safe to call more
 *  than once: a mark is mounted at most once. */
export function mountPenMarks(scope: ParentNode): void {
  const marks: HTMLElement[] = list("[data-pen-underline]", scope);
  if (scope instanceof HTMLElement && scope.matches("[data-pen-underline]")) marks.unshift(scope);
  marks.forEach((u) => {
    if (mounted.has(u)) return;
    mounted.add(u);
    const mask = u.closest<HTMLElement>(".line-mask");
    if (mask) {
      mask.style.overflow = "visible";
      mask.style.contain = "none";
    }
    try {
      penUnderline(u, {});
    } catch {
      /* unmeasurable, stays plain */
    }
  });
}

export function mountDeferredPens(scope: ParentNode): void {
  mountPenMarks(scope);
  const note = scope.querySelector<HTMLElement>('[data-note-anchor="send"]');
  const sendBtn = scope.querySelector<HTMLElement>("#send-btn, [data-send-button]");
  const host = scope.querySelector<HTMLElement>("#commission .commission__grid");
  if (note && sendBtn && host && !mounted.has(note)) {
    mounted.add(note);
    try {
      penArrow(host, note, sendBtn, {});
    } catch {
      /* no arrow */
    }
  }
  redrawPens();
}

/** A drawn card outline on one element, mounted once. The dropdown list asks
 *  for this so its markup can stay exactly as the contract spells it. */
export function mountPenCard(el: HTMLElement): void {
  if (mounted.has(el)) return;
  mounted.add(el);
  try {
    penCard(el, {});
  } catch {
    /* unmeasurable, stays plain */
  }
}

export function initPenRedraw(): Cleanup {
  const onResize = debounce(() => redrawPens(), 180);
  window.addEventListener("resize", onResize, { passive: true });
  return () => {
    onResize.cancel();
    window.removeEventListener("resize", onResize);
  };
}

/** Drops every pen drawn inside a scope that is about to leave the document. */
export function unmountPens(scope: ParentNode): void {
  registry = registry.filter((h) => {
    if (!(scope as Element).contains || !(scope as Element).contains(h.el)) return true;
    mounted.delete(h.el);
    h.el.querySelectorAll(".drawably-svg").forEach((s) => s.remove());
    h.el.classList.remove("drawably-host");
    return false;
  });
  arrows = arrows.filter((a) => {
    a.remove();
    return false;
  });
}
