"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// Table 01 odometer: values tick up ONCE on first scroll-into-view, quantized
// like a mechanical counter (stepped, linear time — the machine prints, it
// does not tween). tabular-nums guarantees zero layout shift.
// Parses "80%", "+33 pts", "~$0.002", "6", "100 MB" into prefix/number/suffix.
const NUM_RE = /^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/;
const DURATION_MS = 700;

export function Odometer({ value, underline = false }: { value: string; underline?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const m = value.match(NUM_RE);
    if (!m || reduce) {
      setDone(true);
      return;
    }
    const [, prefix, num, suffix] = m;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION_MS, 1);
      // Linear time, quantized value: the odometer clicks through discrete
      // digit states instead of gliding.
      const stepped = Math.round(target * p * 10 ** decimals) / 10 ** decimals;
      setDisplay(`${prefix}${stepped.toFixed(decimals)}${suffix}`);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      {display}
      {underline ? (
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left bg-accent transition-transform"
          style={{
            transform: done ? "scaleX(1)" : "scaleX(0)",
            transitionDuration: "var(--dur-slow)",
            transitionTimingFunction: "var(--ease-out-quint)",
            transitionDelay: "120ms",
          }}
        />
      ) : null}
    </span>
  );
}
