"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Two-tier reduced motion: framer strips transforms but keeps opacity
// crossfades when the OS asks for reduced motion.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
