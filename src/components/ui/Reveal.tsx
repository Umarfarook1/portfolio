"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { dur, easeOutQuint } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

// Scroll-triggered entrance: ink settles (fade + rise, travel capped at 16px),
// fires once — a printed page does not un-print. Under reduced motion,
// MotionConfig strips the transform and keeps the opacity crossfade.
export function Reveal({ children, className, delay = 0, y = 16 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: Math.min(y, 16) }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: dur.cinematic * 0.83, ease: easeOutQuint, delay: Math.min(delay, 0.3) }}
    >
      {children}
    </motion.div>
  );
}
