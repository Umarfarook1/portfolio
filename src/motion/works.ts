/**
 * The works route: the row list and the detail panel.
 *
 *   detail open   clip inset(0 0 100% 0) to inset(0), 0.62s, power3.out
 *   detail close  the mirror of that, 0.62s, power3.in
 *
 * It leaves the way it arrived, and it can be reopened mid-close because both
 * tweens read the live clip rather than a start state.
 *
 * The panel is filled from the row that opened it: every row carries its own
 * copy as data attributes, so the engine never holds project text of its own.
 */
import { gsap, list, reduced, type Cleanup } from "./env";
import { lockScroll } from "./scroll";
import { initLinkUnderline } from "./underline";

const OPEN = "inset(0% 0% 0% 0%)";
const SHUT = "inset(0% 0% 100% 0%)";
const DUR = 0.62;

type RowData = {
  title: string;
  overview: string;
  client: string;
  year: string;
  scope: string;
  preview: string;
  previewHref: string;
  also: string;
  alsoHref: string;
  cover: string;
};

function read(row: HTMLElement): RowData {
  return {
    title: row.getAttribute("data-detail-title") || "",
    overview: row.getAttribute("data-detail-overview") || "",
    client: row.getAttribute("data-detail-client") || "",
    year: row.getAttribute("data-detail-year") || "",
    scope: row.getAttribute("data-detail-scope") || "",
    preview: row.getAttribute("data-detail-preview") || "",
    previewHref: row.getAttribute("data-detail-preview-href") || "",
    also: row.getAttribute("data-detail-also") || "",
    alsoHref: row.getAttribute("data-detail-also-href") || "",
    cover: row.getAttribute("data-project-cover") || "",
  };
}

/** The drawn cover for the open project. The works sheet has no preview shell
 *  of its own, so the panel grows one on first open and drops it on cleanup.
 *  A row with no cover on disk simply has no figure. */
function coverFigure(panel: HTMLElement): HTMLImageElement | null {
  const existing = panel.querySelector<HTMLElement>("[data-detail-cover]");
  const fig = existing || document.createElement("figure");
  if (!existing) {
    const title = panel.querySelector(".detail__title");
    if (!title) return null;
    fig.className = "detail__cover";
    fig.setAttribute("data-detail-cover", "");
    fig.setAttribute("aria-hidden", "true");
    const img = document.createElement("img");
    img.alt = "";
    img.decoding = "async";
    fig.appendChild(img);
    title.insertAdjacentElement("afterend", fig);
  }
  return fig.querySelector("img");
}

/** One link in the detail panel: labelled and live when the row carries a
 *  href, plain type with aria-disabled when it does not, hidden when the row
 *  has nothing to put there at all. */
function setLink(el: HTMLAnchorElement | null, label: string, href: string, hideWhenEmpty: boolean): void {
  if (!el) return;
  if (!label && !href) {
    if (hideWhenEmpty) {
      el.hidden = true;
      return;
    }
    el.hidden = false;
    el.textContent = "Not public";
    el.removeAttribute("href");
    el.removeAttribute("target");
    el.setAttribute("aria-disabled", "true");
    return;
  }
  el.hidden = false;
  el.textContent = label || "Open";
  if (href) {
    el.href = href;
    el.rel = "noreferrer";
    el.target = "_blank";
    el.removeAttribute("aria-disabled");
  } else {
    el.removeAttribute("href");
    el.removeAttribute("target");
    el.setAttribute("aria-disabled", "true");
  }
}

function setText(panel: HTMLElement, sel: string, value: string): void {
  const el = panel.querySelector<HTMLElement>(sel);
  if (el) el.textContent = value;
}

export function initWorksRoute(scope: HTMLElement): Cleanup {
  const wrap = scope.querySelector<HTMLElement>("[data-worklist]");
  const panel = scope.querySelector<HTMLElement>("#work-detail");
  if (!wrap || !panel) return () => {};
  const rows = list(".workrow", wrap);
  const byKey = new Map<string, HTMLElement>();
  const order: string[] = [];
  rows.forEach((row) => {
    const key = row.getAttribute("data-open-detail");
    if (!key) return;
    byKey.set(key, row);
    order.push(key);
  });
  let lastTrigger: HTMLElement | null = null;
  let tween: gsap.core.Tween | null = null;
  const offs: Cleanup[] = [];

  function fill(key: string) {
    const row = byKey.get(key);
    if (!row) return;
    const d = read(row);
    setText(panel!, "[data-detail-title]", d.title);
    setText(panel!, "[data-detail-overview]", d.overview);
    setText(panel!, "[data-detail-client]", d.client);
    setText(panel!, "[data-detail-year]", d.year);
    setText(panel!, "[data-detail-scope]", d.scope);
    setLink(panel!.querySelector<HTMLAnchorElement>("[data-detail-preview]"), d.preview, d.previewHref, false);
    setLink(panel!.querySelector<HTMLAnchorElement>("[data-detail-also]"), d.also, d.alsoHref, true);
    const img = coverFigure(panel!);
    if (img) {
      const fig = img.parentElement as HTMLElement;
      if (d.cover) {
        if (img.getAttribute("src") !== d.cover) img.setAttribute("src", d.cover);
        fig.hidden = false;
      } else {
        img.removeAttribute("src");
        fig.hidden = true;
      }
    }
    const next = panel!.querySelector<HTMLElement>("[data-detail-next]");
    if (!next) return;
    next.textContent = "";
    const i = order.indexOf(key);
    [order[(i + 1) % order.length], order[(i + 2) % order.length]].forEach((k) => {
      const other = byKey.get(k);
      if (!other || k === key) return;
      const a = document.createElement("button");
      a.type = "button";
      a.className = "to-link-underline";
      a.setAttribute("data-to-link-underline", "");
      a.style.cssText =
        "appearance:none;background:none;border:0;cursor:pointer;font-size:var(--t-1);font-weight:600;text-transform:uppercase;letter-spacing:var(--tr-caps);min-height:44px;";
      a.textContent = other.getAttribute("data-detail-title") || "";
      a.addEventListener("click", () => {
        fill(k);
        panel!.focus();
      });
      next.appendChild(a);
    });
    initLinkUnderline(next);
  }

  function openDetail(key: string | null, trigger: HTMLElement | null) {
    if (!key) return;
    lastTrigger = trigger;
    fill(key);
    panel!.hidden = false;
    lockScroll(true);
    panel!.scrollTop = 0;
    if (tween) tween.kill();
    if (!reduced()) {
      gsap.set(panel!, { clipPath: SHUT, willChange: "clip-path" });
      tween = gsap.to(panel!, {
        clipPath: OPEN,
        duration: DUR,
        ease: "power3.out",
        overwrite: "auto",
        onComplete: () => {
          gsap.set(panel!, { clearProps: "clipPath,willChange" });
          tween = null;
        },
      });
    }
    panel!.focus();
    document.addEventListener("keydown", onDetailKey, true);
  }

  function finishClose() {
    panel!.hidden = true;
    gsap.set(panel!, { clearProps: "clipPath,willChange" });
    lockScroll(false);
    document.removeEventListener("keydown", onDetailKey, true);
    if (lastTrigger) lastTrigger.focus();
  }

  function closeDetail() {
    if (panel!.hidden) return;
    if (tween) tween.kill();
    if (reduced()) {
      finishClose();
      return;
    }
    /* it leaves the way it came: the mirrored clip on the mirrored curve,
       starting from whatever the panel looks like right now */
    gsap.set(panel!, { willChange: "clip-path" });
    tween = gsap.to(panel!, {
      clipPath: SHUT,
      duration: DUR,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        tween = null;
        finishClose();
      },
    });
  }

  function onDetailKey(ev: KeyboardEvent) {
    if (ev.key !== "Escape") return;
    ev.preventDefault();
    closeDetail();
  }

  rows.forEach((row) => {
    const onEnter = () => wrap!.setAttribute("data-hovering", "true");
    const onFocusIn = () => wrap!.setAttribute("data-hovering", "true");
    const onClick = () => openDetail(row.getAttribute("data-open-detail"), row);
    row.addEventListener("pointerenter", onEnter);
    row.addEventListener("focusin", onFocusIn);
    row.addEventListener("click", onClick);
    offs.push(() => {
      row.removeEventListener("pointerenter", onEnter);
      row.removeEventListener("focusin", onFocusIn);
      row.removeEventListener("click", onClick);
    });
  });
  const onWrapLeave = () => wrap.removeAttribute("data-hovering");
  const onWrapFocusOut = (ev: FocusEvent) => {
    const to = ev.relatedTarget;
    if (to instanceof Element && wrap.contains(to)) return;
    wrap.removeAttribute("data-hovering");
  };
  wrap.addEventListener("pointerleave", onWrapLeave);
  wrap.addEventListener("focusout", onWrapFocusOut);
  offs.push(() => {
    wrap.removeEventListener("pointerleave", onWrapLeave);
    wrap.removeEventListener("focusout", onWrapFocusOut);
  });

  const back = panel.querySelector<HTMLElement>("[data-close-detail]");
  if (back) {
    back.addEventListener("click", closeDetail);
    offs.push(() => back.removeEventListener("click", closeDetail));
  }

  return () => {
    if (tween) tween.kill();
    const fig = panel.querySelector("[data-detail-cover]");
    if (fig) fig.remove();
    document.removeEventListener("keydown", onDetailKey, true);
    if (!panel.hidden) {
      panel.hidden = true;
      lockScroll(false);
    }
    offs.forEach((f) => f());
  };
}
