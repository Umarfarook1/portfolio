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

// Ink band that scrolls, accelerating and flipping direction with page scroll velocity.
export function Marquee({ items, baseVelocity = -2.4 }: MarqueeProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });

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
          <span className="mx-7 sm:mx-9">{item}</span>
          <span className="text-accent" aria-hidden="true">
            ✳
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      className="ink-band relative flex overflow-hidden py-5 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase tracking-tight sm:py-7 sm:text-5xl"
      aria-hidden="true"
    >
      <motion.div className="marquee-track" style={{ x }}>
        <Row />
        <Row />
        <Row />
        <Row />
      </motion.div>
    </div>
  );
}
