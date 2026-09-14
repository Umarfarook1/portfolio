"use client";

/**
 * The binding of the folio: the rail, the contents dialog, the dissolve mount,
 * Lenis, and the route transition.
 *
 * It mounts once for the life of the page and never unmounts on navigation, so
 * the rail keeps its colour crossfade across a route change and Lenis keeps its
 * velocity. The chapters inside it are mounted and cleaned up by FolioRoute.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  gsap,
  ScrollTrigger,
  initViewportVars,
  registerGsap,
  type Cleanup,
} from "@/motion/env";
import { initHeaderTheme, initScrollProgress, barsClosed } from "@/motion/rail";
import { initMenu, type MenuHandle } from "@/motion/menu";
import { dissolveClear, dissolveCover, destroyDissolve, isCovering } from "@/motion/dissolve";
import { resetScroll, startLenis } from "@/motion/scroll";
import { scrollToPanel } from "@/motion/horizontal";
import { initLinkUnderline } from "@/motion/underline";
import { initPenRedraw, mountPens, redrawPens } from "@/motion/pens";
import { resyncRail } from "@/motion/registry";

/** The colour the dissolve covers with on the way to each route: the ground
 *  the arriving page opens on, so the cover and the arrival agree. */
const ROUTE_COLOR: Record<string, string> = {
  "/": "#262220",
  "/about": "#faf9f6",
  "/work": "#e6dfd4",
  "/services": "#f1ece4",
};

const NAV = [
  { no: "01", label: "Home", href: "/" },
  { no: "02", label: "About", href: "/about" },
  { no: "03", label: "Work", href: "/work" },
  { no: "04", label: "Services", href: "/services" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Umarfarook1" },
  { label: "LinkedIn", href: "https://linkedin.com/in/umarfarook-gurramkonda" },
  { label: "Cal.com", href: "https://cal.com/umarfarook-gurramkonda/15min" },
];

export function FolioShell({ children }: { children: React.ReactNode }) {
  const railRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const menuRef = useRef<MenuHandle | null>(null);
  const pathRef = useRef<string>("");
  const coveringRef = useRef(false);
  const pathname = usePathname();
  const router = useRouter();

  /* Declared before the two effects below so the route they read is already
     the route that is on screen. Effects run in declaration order. */
  useEffect(() => {
    pathRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    registerGsap();
    const rail = railRef.current;
    const toggle = toggleRef.current;
    const dialog = dialogRef.current;
    const main = mainRef.current;
    const offs: Cleanup[] = [];

    offs.push(initViewportVars());
    offs.push(startLenis());
    offs.push(initScrollProgress());
    offs.push(initPenRedraw());

    if (rail) {
      const theme = initHeaderTheme(rail);
      offs.push(theme.cleanup);
      /* the cover fades the rail in as part of the loader; every other route
         has no loader, so the rail is simply there */
      if (pathRef.current !== "/") {
        gsap.set(rail, { opacity: 1 });
        if (toggle) toggle.disabled = false;
        barsClosed();
      }
    }

    if (dialog && toggle) {
      const menu = initMenu(dialog, toggle, rail, main);
      menuRef.current = menu;
      menu.markNav(pathRef.current);
      offs.push(menu.cleanup);
      offs.push(initLinkUnderline(dialog));
      mountPens(dialog);
    }

    /* Route links are intercepted in the capture phase, before Next's Link
       handler runs, so the dissolve covers first and the push happens after. */
    function onClick(ev: MouseEvent) {
      if (ev.defaultPrevented || ev.button !== 0) return;
      if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
      const t = ev.target;
      if (!(t instanceof Element)) return;
      const a = t.closest<HTMLElement>("[data-route-link]");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("/")) return;
      ev.preventDefault();
      const target = a.getAttribute("data-scroll-to");
      /* only a dialog that is actually open owes the contents an exit; a link
         in a closed one still navigates rather than being swallowed */
      const fromMenu = Boolean(a.closest("dialog[open]"));
      navigate(href, target, fromMenu);
    }

    function navigate(href: string, target: string | null, fromMenu: boolean) {
      const menu = menuRef.current;
      if (href === pathRef.current) {
        if (fromMenu && menu) {
          menu.close(() => {
            if (target) scrollToPanel(target);
          });
        } else if (target) {
          scrollToPanel(target);
        }
        return;
      }
      coveringRef.current = true;
      dissolveCover(ROUTE_COLOR[href] || "#262220", () => {
        if (fromMenu && menu) {
          menu.close(() => router.push(href + (target ? "#" + target : "")));
        } else {
          router.push(href + (target ? "#" + target : ""));
        }
      });
    }

    document.addEventListener("click", onClick, true);
    offs.push(() => document.removeEventListener("click", onClick, true));
    offs.push(destroyDissolve());

    return () => {
      offs.reverse().forEach((f) => f());
      menuRef.current = null;
    };
  }, [router]);

  /* A route has arrived: re-read the chapter themes under the rail, mark the
     contents, put the new page at the top and clear the cover. */
  useEffect(() => {
    const menu = menuRef.current;
    if (menu) menu.markNav(pathname);
    resyncRail();
    redrawPens();
    if (coveringRef.current || isCovering()) {
      coveringRef.current = false;
      resetScroll();
      dissolveClear();
    }
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      const hash = window.location.hash.slice(1);
      if (hash) scrollToPanel(hash);
    }, 90);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <>
      <div id="dissolve-mount" aria-hidden="true" />

      <header className="rail" data-intro-header ref={railRef}>
        <button
          type="button"
          id="menu-toggle"
          className="rail__burger"
          aria-expanded="false"
          aria-controls="fullscreen-menu"
          aria-label="Open the contents"
          disabled
          ref={toggleRef}
        >
          <svg viewBox="0 0 32 12" aria-hidden="true" focusable="false">
            <rect data-menu-icon-bar="upper" x="0" y="0" width="32" height="1.6" />
            <rect data-menu-icon-bar="lower" x="0" y="9" width="32" height="1.6" />
          </svg>
        </button>
        <div className="rail__mid">
          <span className="rail__vert rail__vert--edition" aria-hidden="true">
            Folio &middot; Edition
          </span>
          <span className="rail__vert rail__vert--brand">Umarfarook Gurramkonda</span>
        </div>
        <span className="rail__foot" aria-hidden="true">
          &copy; 2026
        </span>
        <div className="rail__progress-track" aria-hidden="true">
          <span className="rail__progress" data-header-scroll-progress />
        </div>
      </header>

      <dialog id="fullscreen-menu" aria-label="Contents" ref={dialogRef}>
        <div className="menu__field" data-menu-reveal>
          <div className="menu__top">
            <p className="mono menu__edition" data-reveal-line>
              Folio, Edition 2026. Seven chapters.
            </p>
            <button type="button" className="menu__close" data-menu-close data-reveal-line>
              Close
            </button>
          </div>
          <nav className="menu__nav" aria-label="Chapters">
            {NAV.map((item) => (
              <Link key={item.href} className="menu__item" href={item.href} data-nav-item data-route-link>
                <span className="menu__num">{item.no}</span>
                <span data-reveal-line>{item.label}</span>
                <span className="menu__line" data-nav-active-line />
              </Link>
            ))}
            <Link className="menu__item" href="/" data-nav-item data-route-link data-scroll-to="commission">
              <span className="menu__num">05</span>
              <span data-reveal-line>Contact</span>
              <span className="menu__line" data-nav-active-line />
            </Link>
          </nav>
          <div className="menu__foot">
            <p className="mono menu__edition" data-reveal-line>
              Bengaluru, India (UTC+5:30)
            </p>
            <div className="menu__socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  className="to-link-underline"
                  data-social-link
                  data-reveal-line
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </dialog>

      <main id="main" ref={mainRef}>
        {children}
      </main>
    </>
  );
}

export default FolioShell;
