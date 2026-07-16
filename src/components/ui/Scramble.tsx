"use client";

import { useCallback, useRef, useState } from "react";

const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789/_";

// Hover scramble: characters churn then resolve left-to-right, like a hash
// settling into a word. Gated to fine pointers by the caller.
export function Scramble({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const raf = useRef<number | null>(null);

  const run = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const start = performance.now();
    const duration = 360;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const settled = Math.floor(t * text.length);
      let out = text.slice(0, settled);
      for (let i = settled; i < text.length; i++) {
        out += text[i] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text]);

  return (
    <span className={className} onMouseEnter={run} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
