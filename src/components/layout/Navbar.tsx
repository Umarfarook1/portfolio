"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { Clock } from "@/components/ui/Clock";

const navItems = [
  { name: "evidence", href: "#evidence", id: "evidence" },
  { name: "work", href: "#work", id: "work" },
  { name: "method", href: "#method", id: "method" },
  { name: "checkpoints", href: "#experience", id: "experience" },
];

// Minimal mono chrome over the void; the right edge carries a thin ember
// progress rule — the page as a run, scrubbed 1:1.
export function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const ids = [...navItems.map((i) => i.id), "about", "stack", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));

    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
          scrolled ? "border-line bg-void/90" : "border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Primary" className="shell flex h-14 items-center justify-between gap-4">
          <Link href="#main" className="mono-label text-hi" aria-label="Back to top">
            umarfarook.g
          </Link>

          <ul className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="navlink mono-label" data-active={active === item.id}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <Clock className="mono-label hidden text-lo sm:inline" />
            <Link href="#contact" className="mono-label text-solar transition-opacity hover:opacity-80">
              contact ↗
            </Link>
          </div>
        </nav>
      </header>

      {/* Run progress: a hairline that heats as the page completes. */}
      <div className="pointer-events-none fixed bottom-0 right-0 top-0 z-50 hidden w-px bg-line/50 lg:block" aria-hidden="true">
        <motion.div
          className="h-full w-full origin-top"
          style={{ scaleY: scrollYProgress, background: "var(--color-ember)" }}
        />
      </div>
    </>
  );
}
