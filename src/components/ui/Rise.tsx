"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { easeExpoOut } from "@/lib/motion";

// Body-copy entrance: one masked rise on the expo-out attack, fired once.
export function Rise({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -70px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: easeExpoOut, delay }}
    >
      {children}
    </motion.div>
  );
}
