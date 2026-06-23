"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const LatentField = dynamic(() => import("./LatentField"), {
  ssr: false,
  loading: () => <Fallback />,
});

// Faint static scatter for loading / reduced motion. No layout shift, no WebGL.
function Fallback() {
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundColor: "hsl(44 42% 96%)",
        backgroundImage:
          "radial-gradient(circle at 38% 42%, rgba(58,54,196,0.22), transparent 26%), radial-gradient(circle at 64% 56%, rgba(215,38,96,0.18), transparent 24%), radial-gradient(circle at 52% 30%, rgba(14,143,143,0.16), transparent 22%)",
      }}
    />
  );
}

// Responsive density: fewer, larger points on small screens.
function dimsFor(width: number) {
  if (width < 640) return { count: 1900, size: 0.085 };
  if (width < 1024) return { count: 3000, size: 0.072 };
  return { count: 4400, size: 0.06 };
}

export default function HeroCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const [dims, setDims] = useState({ count: 3000, size: 0.072 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let raf = 0;
    const apply = () => setDims(dimsFor(window.innerWidth));
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
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
        <Fallback />
      ) : inView ? (
        <LatentField count={dims.count} pointSize={dims.size} animate />
      ) : (
        <Fallback />
      )}
    </div>
  );
}
