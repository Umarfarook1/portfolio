"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Portrait = dynamic(() => import("./Portrait"), {
  ssr: false,
  loading: () => <Loading />,
});

function Loading() {
  return (
    <div
      className="h-full w-full"
      style={{
        backgroundColor: "oklch(0.955 0.005 95)",
        backgroundImage:
          "radial-gradient(circle at 50% 45%, rgba(30,29,26,0.1), transparent 60%)",
      }}
    />
  );
}

// Responsive sampling: fewer, slightly larger points on small screens.
function dimsFor(width: number) {
  if (width < 640) return { sampleW: 78, size: 0.058 };
  if (width < 1024) return { sampleW: 100, size: 0.046 };
  return { sampleW: 126, size: 0.038 };
}

export default function HeroCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const [dims, setDims] = useState({ sampleW: 100, size: 0.04 });

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
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/avatar.jpg" alt="" className="h-full w-full object-contain p-6" />
      ) : inView ? (
        <Portrait sampleW={dims.sampleW} pointSize={dims.size} animate />
      ) : (
        <Loading />
      )}
    </div>
  );
}
