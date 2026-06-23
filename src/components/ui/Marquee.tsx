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

// Editorial marquee on paper: alternating solid and outlined display words,
// separated by an acid diamond. Accelerates and flips with scroll velocity.
export function Marquee({ items, baseVelocity = -2.2 }: MarqueeProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const directionFactor = useRef(1);
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) directionFactor.current = -1;
    else if (factor > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  const Row = () => (
    <span className="flex items-center">
      {items.map((item, i) => (
        <span key={item} className="flex items-center">
          <span className={i % 2 === 1 ? "mx-6 text-outline sm:mx-10" : "mx-6 text-foreground sm:mx-10"}>{item}</span>
          <span className="inline-block h-3 w-3 rotate-45 bg-accent sm:h-4 sm:w-4" aria-hidden="true" />
        </span>
      ))}
    </span>
  );

  return (
    <div
      className="relative flex overflow-hidden border-y border-foreground/15 bg-background py-7 font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-none tracking-tight sm:py-10 sm:text-7xl"
      aria-hidden="true"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <motion.div className="marquee-track" style={{ x }}>
        <Row />
        <Row />
        <Row />
        <Row />
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent sm:w-40" />
    </div>
  );
}
