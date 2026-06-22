"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Legal here because this file is itself a client component.
const LatentField = dynamic(() => import("./LatentField"), {
  ssr: false,
  loading: () => <PlasmaGlow />,
});

// Shared subtle placeholder so there is no layout shift while the chunk loads.
function PlasmaGlow() {
  return (
    <div
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(60% 60% at 50% 45%, rgba(124,58,237,0.28) 0%, rgba(204,71,120,0.16) 40%, rgba(13,8,135,0.04) 70%, transparent 100%)",
      }}
    />
  );
}

// Static, WebGL-free evocation of the plasma cloud for reduced-motion users.
function StaticFallback() {
  return (
    <div
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(55% 55% at 50% 45%, rgba(92,1,166,0.55) 0%, rgba(156,23,158,0.4) 30%, rgba(204,71,120,0.28) 55%, rgba(237,121,83,0.12) 75%, transparent 100%)",
      }}
    />
  );
}

export default function HeroCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="h-full w-full" aria-hidden="true">
      {reducedMotion ? (
        <StaticFallback />
      ) : inView ? (
        <LatentField animate={true} />
      ) : (
        <PlasmaGlow />
      )}
    </div>
  );
}
