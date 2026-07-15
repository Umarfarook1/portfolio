"use client";

import { useEffect, useRef, useState } from "react";

// Printer's color-control bar for the colophon: stepped tint chips at
// 10/25/50/75/100% of each ink — the honest, period-correct way to exhibit
// the palette. Fills left-to-right, stepped, once.
const INKS = [
  "var(--color-foreground)",
  "var(--color-accent)",
  "var(--color-blue-plate)",
];
const STOPS = [0.1, 0.25, 0.5, 0.75, 1];

export function Calibration({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <div className="flex items-center gap-3">
        {INKS.map((ink, row) => (
          <div key={ink} className={`calib ${on ? "in" : ""}`}>
            {STOPS.map((stop, i) => (
              <span
                key={stop}
                style={{
                  background: ink,
                  animationDelay: `${(row * STOPS.length + i) * 40}ms`,
                  ["--calib-o" as string]: stop,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
