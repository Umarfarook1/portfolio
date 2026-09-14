/**
 * The contents: a real dialog over a clip-wiped field.
 *
 *   open        clip inset(0 100% 0 0) to inset(0), 0.88s, power3.out
 *   items       yPercent 102 to 0, 1.00s, power2.out, 0.07s, 0.14s lead,
 *               0.15s between items
 *   active rule scaleX 0 to 1, 0.70s, power2.out, 0.50s after its item
 *   close       clip back to inset(0 100% 0 0), 0.58s, power3.in, reversed
 *               stagger
 *   burger      width and x, 0.70s, power2.inOut
 *
 * It closes the side it opened from. A close asked for while the open is still
 * running reverses the open timeline from where it is rather than starting a
 * second timeline over the top: the field never jumps.
 */
import SplitType from "split-type";
import { gsap, list, reduced, type Cleanup } from "./env";
import { lineHide, lineReveal } from "./reveal";
import { applyTheme, barsClosed, barsToClosed, barsToOpen, MENU_THEME, type RailTheme } from "./rail";
import { lockScroll } from "./scroll";

const MENU = {
  yPercent: 102,
  staggerEach: 0.07,
  duration: 1,
  ease: "power2.out",
  gapBetweenBlocks: 0.15,
  socialBlockStagger: 0.1,
};
const ACTIVE_LINE = {
  startOffset: 0.5,
  duration: 0.7,
  ease: "power2.out",
  closeDuration: 0.28,
  closeEase: "power2.in",
};
const FADE = 0.2;
const CLOSE_CLIP = 0.58;

export type MenuHandle = {
  open: () => void;
  close: (then?: () => void) => void;
  markNav: (href: string) => void;
  isOpen: () => boolean;
  cleanup: Cleanup;
};

export function initMenu(
  dialog: HTMLDialogElement,
  toggle: HTMLButtonElement,
  rail: HTMLElement | null,
  mainEl: HTMLElement | null
): MenuHandle {
  const menuField = dialog.querySelector<HTMLElement>("[data-menu-reveal]");
  let menuClosing = false;
  let menuTL: gsap.core.Timeline | null = null;
  let savedTheme: RailTheme | null = null;
  const menuSplits: SplitType[] = [];
  const offs: Cleanup[] = [];

  function menuItems() {
    return list("[data-nav-item]", dialog);
  }
  function menuLines() {
    return list("[data-reveal-line]", dialog);
  }
  function activeLine(): HTMLElement | null {
    const item = dialog.querySelector<HTMLElement>('[data-nav-item][data-nav-active="true"]');
    return item ? item.querySelector<HTMLElement>("[data-nav-active-line]") : null;
  }
  function activeIndex(): number {
    const items = menuItems();
    for (let i = 0; i < items.length; i++) if (items[i].dataset.navActive === "true") return i;
    return -1;
  }
  function markNav(href: string) {
    menuItems().forEach((a) => {
      const own = a.getAttribute("href") || "";
      if (own === href && !a.hasAttribute("data-scroll-to")) {
        a.setAttribute("aria-current", "page");
        a.dataset.navActive = "true";
      } else {
        a.removeAttribute("aria-current");
        delete a.dataset.navActive;
      }
    });
  }
  function menuResetLines() {
    if (!menuField) return;
    gsap.set(menuField, { clearProps: "clipPath,opacity" });
    menuSplits.forEach((s) => s.revert());
    menuSplits.length = 0;
    gsap.set(menuLines(), { opacity: 0, clearProps: "transform" });
    const inner = list(".line", dialog);
    gsap.killTweensOf(inner);
    gsap.set(inner, { clearProps: "willChange,transform,opacity" });
    const lines = list("[data-nav-active-line]", dialog);
    gsap.killTweensOf(lines);
    gsap.set(lines, { scaleX: 0, transformOrigin: "0% 50%", clearProps: "willChange" });
  }

  function menuOpenMotion(after?: () => void) {
    if (!menuField) {
      if (after) after();
      return;
    }
    if (reduced()) {
      /* reduced motion still gets an entrance, just a gentler one */
      menuField.style.clipPath = "none";
      menuLines().forEach((l) => {
        l.style.opacity = "1";
      });
      const al0 = activeLine();
      if (al0) {
        al0.style.transformOrigin = "0% 50%";
        al0.style.transform = "scaleX(1)";
      }
      gsap.fromTo(menuField, { opacity: 0 }, { opacity: 1, duration: FADE, ease: "none", overwrite: "auto" });
      if (after) after();
      return;
    }
    const itemBlocks = menuItems().map((it) => list("[data-reveal-line]", it));
    const closeBtn = dialog.querySelector<HTMLElement>("[data-menu-close]");
    const socials = list("[data-social-link][data-reveal-line]", dialog);
    /* whatever else carries a reveal line, the edition line at the top and the
       location line at the foot, rides in with the Close button: G listed only
       the items, the button and the socials, and left those two hidden */
    const claimed = new Set<HTMLElement>(socials);
    itemBlocks.forEach((b) => b.forEach((el) => claimed.add(el)));
    if (closeBtn) claimed.add(closeBtn);
    const rest = menuLines().filter((el) => !claimed.has(el));
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        menuTL = null;
        if (after) after();
      },
    });
    menuTL = tl;
    tl.to(menuField, { clipPath: "inset(0 0% 0 0)", duration: 0.88 }, 0);
    itemBlocks.forEach((blocks, i) => {
      if (!blocks.length) return;
      tl.add(
        lineReveal(
          blocks,
          Object.assign({}, MENU, { parallelBlocks: true, revertOnComplete: false, splitCollector: menuSplits })
        ),
        0.14 + i * MENU.gapBetweenBlocks
      );
    });
    if (closeBtn) {
      tl.add(
        lineReveal([closeBtn], Object.assign({}, MENU, { revertOnComplete: false, splitCollector: menuSplits })),
        0.12
      );
    }
    rest.forEach((el, i) => {
      tl.add(
        lineReveal([el], Object.assign({}, MENU, { revertOnComplete: false, splitCollector: menuSplits })),
        0.12 + i * MENU.socialBlockStagger
      );
    });
    socials.forEach((s, i) => {
      tl.add(
        lineReveal([s], Object.assign({}, MENU, { revertOnComplete: false, splitCollector: menuSplits })),
        0.22 + i * MENU.socialBlockStagger
      );
    });
    const al = activeLine();
    const ai = activeIndex();
    if (al && ai >= 0) {
      gsap.set(al, { scaleX: 0, transformOrigin: "0% 50%", willChange: "transform", force3D: true });
      tl.to(
        al,
        {
          scaleX: 1,
          duration: ACTIVE_LINE.duration,
          ease: ACTIVE_LINE.ease,
          force3D: true,
          onComplete: () => gsap.set(al, { clearProps: "willChange" }),
        },
        0.14 + ai * MENU.gapBetweenBlocks + ACTIVE_LINE.startOffset
      );
    }
  }

  function menuCloseMotion(done: () => void, instant: boolean, restore?: () => void) {
    if (instant) {
      if (menuTL) {
        menuTL.kill();
        menuTL = null;
      }
      barsClosed();
      if (restore) restore();
      done();
      return;
    }
    barsToClosed();
    if (!menuField || reduced()) {
      if (menuTL) {
        menuTL.kill();
        menuTL = null;
      }
      if (menuField && reduced()) {
        gsap.to(menuField, {
          opacity: 0,
          duration: FADE,
          ease: "none",
          overwrite: "auto",
          onComplete: () => {
            if (restore) restore();
            done();
          },
        });
        return;
      }
      if (restore) restore();
      done();
      return;
    }
    /* interrupted mid-open: reverse the open timeline from where it is, sped
       up so the remaining travel takes about one close, rather than cutting to
       a fresh hide timeline and jumping */
    if (menuTL && menuTL.isActive()) {
      const tl = menuTL;
      const travelled = tl.time();
      tl.timeScale(Math.max(1, travelled / CLOSE_CLIP));
      tl.eventCallback("onComplete", null);
      tl.eventCallback("onReverseComplete", () => {
        tl.timeScale(1);
        menuTL = null;
        if (restore) restore();
        done();
      });
      tl.reverse();
      return;
    }
    if (menuTL) {
      menuTL.kill();
      menuTL = null;
    }
    const al = activeLine();
    const tl = gsap.timeline({ defaults: { ease: "power3.in" }, onComplete: done });
    if (al) {
      tl.to(al, { scaleX: 0, duration: ACTIVE_LINE.closeDuration, ease: ACTIVE_LINE.closeEase, force3D: true }, 0);
    }
    tl.add(lineHide(menuLines(), Object.assign({}, MENU, { parallelBlocks: true, splitCollector: menuSplits })), 0);
    tl.to(menuField, { clipPath: "inset(0 100% 0 0)", duration: CLOSE_CLIP }, 0.08);
    tl.call(
      () => {
        if (restore) restore();
      },
      undefined,
      0.66
    );
  }

  function onMenuKey(ev: KeyboardEvent) {
    if (ev.key !== "Escape" || !dialog.open || menuClosing) return;
    ev.preventDefault();
    close();
  }

  function restoreRailTheme() {
    if (!rail || !savedTheme) return;
    if (savedTheme.bg) applyTheme(rail, savedTheme);
    savedTheme = null;
  }

  function open() {
    if (dialog.open) return;
    if (rail) {
      savedTheme = {
        bg: rail.style.getPropertyValue("--header-bg"),
        text: rail.style.getPropertyValue("--header-text"),
        border: rail.style.getPropertyValue("--header-border"),
      };
      applyTheme(rail, MENU_THEME);
    }
    if (!reduced() && menuField) gsap.set(menuField, { clipPath: "inset(0 100% 0 0)" });
    dialog.show();
    lockScroll(true);
    toggle.setAttribute("aria-expanded", "true");
    document.addEventListener("keydown", onMenuKey, true);
    if (mainEl) mainEl.inert = true;
    barsToOpen();
    menuOpenMotion(() => {
      const c = dialog.querySelector<HTMLElement>("[data-menu-close]");
      if (c) c.focus();
    });
    if (reduced()) {
      const c2 = dialog.querySelector<HTMLElement>("[data-menu-close]");
      if (c2) c2.focus();
    }
  }

  function close(then?: () => void) {
    if (!dialog.open || menuClosing) return;
    menuClosing = true;
    function finish() {
      dialog.close();
      restoreRailTheme();
      menuResetLines();
      menuClosing = false;
      if (then) then();
    }
    if (then) {
      /* a link was followed: hand the field to the dissolve rather than
         playing two exits over each other */
      menuCloseMotion(finish, true, restoreRailTheme);
      return;
    }
    menuCloseMotion(finish, false, restoreRailTheme);
  }

  const onToggle = () => {
    if (dialog.open) close();
    else open();
  };
  toggle.addEventListener("click", onToggle);
  offs.push(() => toggle.removeEventListener("click", onToggle));

  list("[data-menu-close]", dialog).forEach((b) => {
    const fn = () => close();
    b.addEventListener("click", fn);
    offs.push(() => b.removeEventListener("click", fn));
  });

  const onClose = () => {
    document.removeEventListener("keydown", onMenuKey, true);
    if (mainEl) mainEl.inert = false;
    lockScroll(false);
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  };
  dialog.addEventListener("close", onClose);
  offs.push(() => dialog.removeEventListener("close", onClose));

  return {
    open,
    close,
    markNav,
    isOpen: () => dialog.open,
    cleanup: () => {
      document.removeEventListener("keydown", onMenuKey, true);
      if (menuTL) menuTL.kill();
      menuSplits.forEach((s) => s.revert());
      offs.forEach((f) => f());
      if (dialog.open) dialog.close();
      if (mainEl) mainEl.inert = false;
    },
  };
}
