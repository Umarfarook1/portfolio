/**
 * The link underline state machine, ported from khanhnguyen.design.
 *
 *   fill   scaleX 0 to 1 from the left, 0.40s cubic-bezier(.21,0,.32,1)
 *   clear  scaleX 1 to 0 to the right, same curve
 *
 * This is the one deliberate exception to interruptibility on the page: an
 * interrupted fill always finishes before it clears, so the rule never stops
 * half drawn. Everything else on the page animates from its live value.
 */
import { list, reduced, fine, type Cleanup } from "./env";

const FILL_ANIM = "underline-fill-forward";
const CLEAR_ANIM = "underline-clear-forward";

type Kind = "from" | "to";

function bindUnderline(el: HTMLElement, kind: Kind): Cleanup {
  const noMotion = reduced();
  const startFilled = kind === "from";
  let current = startFilled;
  let target = startFilled;
  let running = false;

  function force(v: boolean) {
    el.dataset.underlineFilled = String(v);
    el.dataset.underlinePhase = "idle";
    current = v;
    target = v;
    running = false;
  }
  force(startFilled);

  function settle() {
    if (noMotion) {
      const on = el.matches(":hover") || el.matches(":focus-within");
      force(kind === "from" ? !on : on);
      return;
    }
    if (running || current === target) {
      el.dataset.underlineFilled = String(current);
      if (!running) el.dataset.underlinePhase = "idle";
      return;
    }
    running = true;
    el.dataset.underlinePhase = target ? "fill" : "clear";
  }
  function onState() {
    if (!fine()) {
      target = startFilled;
      settle();
      return;
    }
    const on = el.matches(":hover") || el.matches(":focus-within");
    target = kind === "from" ? (on ? false : startFilled) : on;
    settle();
  }
  function onEnd(ev: AnimationEvent) {
    if (ev.target !== el || ev.pseudoElement !== "::after") return;
    if (ev.animationName !== FILL_ANIM && ev.animationName !== CLEAR_ANIM) return;
    current = ev.animationName === FILL_ANIM;
    running = false;
    el.dataset.underlineFilled = String(current);
    el.dataset.underlinePhase = "idle";
    if (current !== target) settle();
  }
  el.addEventListener("pointerenter", onState);
  el.addEventListener("pointerleave", onState);
  el.addEventListener("focusin", onState);
  el.addEventListener("focusout", onState);
  el.addEventListener("animationend", onEnd);
  return () => {
    el.removeEventListener("pointerenter", onState);
    el.removeEventListener("pointerleave", onState);
    el.removeEventListener("focusin", onState);
    el.removeEventListener("focusout", onState);
    el.removeEventListener("animationend", onEnd);
    delete el.dataset.underlineFilled;
    delete el.dataset.underlinePhase;
  };
}

const bound = new WeakSet<HTMLElement>();

export function initLinkUnderline(scope: ParentNode): Cleanup {
  const offs: Cleanup[] = [];
  list("[data-to-link-underline]", scope).forEach((el) => {
    if (bound.has(el)) return;
    bound.add(el);
    offs.push(bindUnderline(el, "to"));
  });
  list("[data-from-link-underline]", scope).forEach((el) => {
    if (bound.has(el)) return;
    bound.add(el);
    offs.push(bindUnderline(el, "from"));
  });
  return () => offs.forEach((f) => f());
}

/** Lets a node that was rebound after being detached bind again. */
export function releaseUnderline(el: HTMLElement): void {
  bound.delete(el);
}
