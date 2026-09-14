"use client";

/**
 * The client wrapper a page puts round its static markup.
 *
 *   <FolioRoute route="home">{ ...G's chapters... }</FolioRoute>
 *
 * On mount it looks for G's data attributes inside itself and runs the inits
 * that match. On unmount it kills every ScrollTrigger, tween, SplitType
 * instance, listener and animation frame it made, so a client-side navigation
 * away and back rebuilds the story rather than leaking it. Pages never import
 * gsap.
 *
 * README-engine.md next to this file is the list of attributes each init needs.
 */

import { useEffect, useLayoutEffect, useRef } from "react";
import { ScrollTrigger, registerGsap, gsap, type Cleanup } from "@/motion/env";
import { initHorizontal } from "@/motion/horizontal";
import { claimHeroLines, initClock, runLoader } from "@/motion/loader";
import { initAboutChapter, initClients, initFooter, initServices, initWorkChapter } from "@/motion/chapters";
import { initCareerMap } from "@/motion/career";
import { initSelects } from "@/motion/select";
import { initScrollImageReveals, initScrollLineReveals } from "@/motion/reveal";
import { initLinkUnderline } from "@/motion/underline";
import { initForm } from "@/motion/form";
import { initWorksRoute } from "@/motion/works";
import { mountDeferredPens, mountPens, redrawPens, unmountPens } from "@/motion/pens";
import { resyncRail } from "@/motion/registry";
import { barsClosed } from "@/motion/rail";

export type FolioRouteName = "home" | "works" | "about" | "services";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function FolioRoute({
  route,
  children,
}: {
  route: FolioRouteName;
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;
    const offs: Cleanup[] = [];
    const rail = document.querySelector<HTMLElement>("[data-intro-header]");
    const toggle = document.querySelector<HTMLButtonElement>("#menu-toggle");

    function revealRail() {
      if (rail) gsap.set(rail, { opacity: 1 });
      if (toggle) toggle.disabled = false;
      barsClosed();
    }

    if (route === "home") {
      const hero = root.querySelector<HTMLElement>("[data-section='loading']");
      /* claimed before the generic pass, so the cover's own lines are never
         handed a second trigger on top of the loader timeline */
      if (hero) claimHeroLines(hero);
      offs.push(initClock(root));
      /* the track has to exist before any chapter asks for its
         containerAnimation, so it is built first */
      offs.push(initHorizontal(root));
      offs.push(initAboutChapter(root));
      offs.push(initWorkChapter(root));
      offs.push(initServices(root));
      offs.push(initClients(root));
      offs.push(initCareerMap(root));
      offs.push(initFooter(root));
      offs.push(initSelects(root));
      offs.push(initForm(root));
      offs.push(initScrollLineReveals(root, {}));
      offs.push(initScrollImageReveals(root, {}));
      offs.push(initLinkUnderline(root));
      mountPens(root);
      if (hero) {
        offs.push(
          runLoader(hero, {
            rail,
            toggle,
            onDone: () => {
              /* the pen marks land after the paper has landed, so they measure
                 the type where it finally sits */
              mountDeferredPens(root);
              ScrollTrigger.refresh();
              resyncRail();
            },
          })
        );
      } else {
        revealRail();
      }
    } else {
      offs.push(initScrollLineReveals(root, {}));
      offs.push(initScrollImageReveals(root, {}));
      offs.push(initLinkUnderline(root));
      offs.push(initSelects(root));
      offs.push(initForm(root));
      if (route === "works") offs.push(initWorksRoute(root));
      mountPens(root);
      mountDeferredPens(root);
    }

    redrawPens();
    resyncRail();
    ScrollTrigger.refresh();

    return () => {
      offs.reverse().forEach((f) => f());
      unmountPens(root);
      ScrollTrigger.refresh();
    };
  }, [route]);

  return (
    <div className="route" data-route={route} data-active="true" ref={rootRef}>
      {children}
    </div>
  );
}

export default FolioRoute;
