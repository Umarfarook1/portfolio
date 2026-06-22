"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface MarqueeProps {
  items: string[];
  baseVelocity?: number;
}

// Scroll-velocity marquee: idles slowly, accelerates and flips direction with scroll.
export function Marquee({ items, baseVelocity = -2.4 }: MarqueeProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });

  // Four copies => each copy is 25% of the track; wrap by 25% for a seamless loop.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) directionFactor.current = -1;
    else if (factor > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  const Row = () => (
    <span className="flex items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="mx-7 sm:mx-10">{item}</span>
          <span className="h-2 w-2 rounded-full bg-[var(--plasma-iris)] shadow-[0_0_14px_var(--plasma-magenta)]" aria-hidden="true" />
        </span>
      ))}
    </span>
  );

  return (
    <div
      className="relative flex overflow-hidden border-y border-border/70 bg-card/30 py-6 font-[family-name:var(--font-display)] text-2xl font-semibold uppercase tracking-tight text-foreground/85 sm:text-4xl"
      aria-hidden="true"
    >
      <motion.div className="marquee-track" style={{ x }}>
        <Row />
        <Row />
        <Row />
        <Row />
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
