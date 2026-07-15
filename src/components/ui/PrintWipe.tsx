"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { dur, easeInOutQuint } from "@/lib/motion";

// Ink-band entrance: the inverted section "prints" over the page once,
// top-to-bottom, on the carriage-return curve. A printed page does not
// un-print — the observer fires once and never re-clips.
export function PrintWipe({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
      animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
      transition={{ duration: dur.cinematic, ease: easeInOutQuint }}
    >
      {children}
    </motion.div>
  );
}
