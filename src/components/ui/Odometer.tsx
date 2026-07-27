"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

// Metric digits roll up, overshoot, and settle like SGD converging — the one
// visible overshoot in the system, reserved for stats. Parses values like
// "80%", "+33 pts", "~$0.002", "0.782" and animates the numeric part.
export function Odometer({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const [done, setDone] = useState(false);

  const match = value.match(/-?\d+(?:\.\d+)?/);
  const target = match ? parseFloat(match[0]) : null;
  const decimals = match?.[0].includes(".") ? match[0].split(".")[1].length : 0;
  const prefix = match ? value.slice(0, match.index) : value;
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : "";

  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!inView || target === null) return;
    const controls = animate(mv, target, {
      type: "spring",
      stiffness: 170,
      damping: 14,
      mass: 1,
      onComplete: () => setDone(true),
    });
    return controls.stop;
  }, [inView, target, mv]);

  if (target === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={`tabular ${className ?? ""}`}>
      {/* The literal figure ships in the DOM so text extractors, ATS parsers
          and screen readers read the claim, never the animation's zero. */}
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {prefix}
        {/* Snap to the exact figure once settled so the claim is precise. */}
        {done ? <span>{match![0]}</span> : <motion.span>{text}</motion.span>}
        {suffix}
      </span>
    </span>
  );
}
