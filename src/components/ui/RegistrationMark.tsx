"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function Cross({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 0v6.5M12 17.5V24M0 12h6.5M17.5 12H24" />
    </svg>
  );
}

// Registration mark — the visual language of measurement. With `animate`, a
// vermilion plate layer starts 2px out of register and slides into perfect
// alignment on first view: press-sheet grammar for "the job is correct".
export function RegistrationMark({ className, animate = false }: { className?: string; animate?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  if (!animate) {
    return <Cross className={cn("text-foreground/60", className)} />;
  }

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      <Cross className="h-full w-full text-foreground/60" />
      <Cross
        className="absolute inset-0 h-full w-full text-accent mix-blend-multiply transition-transform"
        // Out of register until seen; slides home on the reveal curve.
        style={{
          transform: on ? "translate(0px, 0px)" : "translate(2px, -1.5px)",
          transitionDuration: "var(--dur-slow)",
          transitionTimingFunction: "var(--ease-out-quint)",
          transitionDelay: "120ms",
        }}
      />
    </span>
  );
}
