"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { dur, easeOutQuint } from "@/lib/motion";

// The site's ONE signature reveal: ink rolls down the plate. The frame never
// moves; only the plate contents clip in top-to-bottom, then drift 4-8px of
// micro-parallax against the fixed frame. Plates only — nowhere else.
export function PlateReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 0.6, ease: easeOutQuint }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.div style={{ y }} transition={{ duration: dur.base }} className="h-full w-full">
        {children}
      </motion.div>
    </motion.div>
  );
}
