"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeExpoOut, tokenStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Headlines reveal in word clusters at LLM-token cadence: each word rises out
// of a mask, 40ms apart. Fires once; pixel margins only (whileInView % margins
// are dead in this project).
export function TokenStream({
  text,
  wonkWord,
  as: Tag = "h2",
  className,
  delay = 0,
}: {
  text: string;
  // The one word per headline allowed the Fraunces WONK alternates.
  wonkWord?: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -90px 0px" });
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span ref={ref} className="sr-only">
        {text}
      </span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
              <motion.span
                className={cn("inline-block will-change-transform", word === wonkWord && "wonk")}
                initial={{ y: "110%" }}
                animate={inView ? { y: "0%" } : undefined}
                transition={{ duration: 0.8, ease: easeExpoOut, delay: delay + i * tokenStagger }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
