"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { TokenStream } from "@/components/ui/TokenStream";
import { easeExpoOut } from "@/lib/motion";

const PortraitField = dynamic(() => import("@/components/three/PortraitField"), { ssr: false });

// The convergence curve the denoise actually follows (expo-out), plotted as
// the hero's loss sparkline. Real telemetry: it charts the animation itself.
const SPARK = (() => {
  const pts: string[] = [];
  for (let x = 0; x <= 120; x += 4) {
    const y = 33 - 27 * Math.exp((-4.2 * x) / 120);
    pts.push(`${x},${(36 - y).toFixed(2)}`);
  }
  return pts.join(" ");
})();

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef(0);
  const stepRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollRef.current = v;
  });

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* The diffusion self-portrait: full-bleed, one canvas, one draw call. */}
      <div className="absolute inset-0" aria-hidden="true">
        <PortraitField scrollRef={scrollRef} stepRef={stepRef} />
      </div>

      <div className="shell relative z-10 flex h-full flex-col justify-end pb-14 sm:pb-16">
        <motion.p
          className="mono-label text-lo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Umarfarook Gurramkonda · applied AI/ML · HypeOn AI, Bengaluru
        </motion.p>

        <TokenStream
          as="h1"
          text="I measure what I ship."
          wonkWord="measure"
          delay={0.9}
          className="display mt-5 max-w-[8.5em] text-[clamp(3.2rem,9.5vw,8.75rem)] text-hi"
        />

        <motion.p
          className="mt-6 max-w-xl text-[17px] leading-relaxed text-lo"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeExpoOut, delay: 1.5 }}
        >
          Multi-agent LLM systems, retrieval, and natural-language interfaces over data. Every
          system ships with an eval harness, a cost cap, and numbers you can rerun yourself.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeExpoOut, delay: 1.7 }}
        >
          <Link
            href="mailto:umarfarook0yt@gmail.com"
            className="runcmd caret inline-block rounded-[2px] px-5 py-3.5 text-sm"
          >
            $ mail umarfarook0yt@gmail.com
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/Umarfarook1"
              target="_blank"
              rel="noreferrer"
              className="navlink mono-label"
            >
              GitHub ↗
            </Link>
            <Link
              href="https://linkedin.com/in/umarfarook-gurramkonda"
              target="_blank"
              rel="noreferrer"
              className="navlink mono-label"
            >
              LinkedIn ↗
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Live telemetry: the counter counts the denoise itself. */}
      <div className="pointer-events-none absolute bottom-14 right-6 z-10 hidden text-right lg:block xl:right-10">
        <svg width="120" height="36" viewBox="0 0 120 36" fill="none" aria-hidden="true">
          <motion.polyline
            points={SPARK}
            stroke="var(--color-ember)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: easeExpoOut }}
          />
        </svg>
        <p className="mono-label mt-2 text-lo">
          <span ref={(el) => void (stepRef.current = el)}>step 0000/1000</span>
        </p>
        <p className="mono-label mt-1 text-lo/60">fig. 01 · self-portrait, denoised live</p>
      </div>
    </section>
  );
}
