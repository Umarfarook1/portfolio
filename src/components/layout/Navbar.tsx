"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Work", href: "#work", id: "work" },
  { name: "Method", href: "#method", id: "method" },
  { name: "About", href: "#about", id: "about" },
  { name: "Experience", href: "#experience", id: "experience" },
];

// Masthead: a flat paper bar with a hairline rule, like the running head of a
// printed document. Active section gets a red underline, not a filled pill.
export function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ids = [...navItems.map((i) => i.id), "stack", "contact"];
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

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-background transition-[border-color] duration-[240ms]",
        scrolled ? "border-foreground/20" : "border-transparent",
      )}
    >
      <nav aria-label="Primary" className="section-shell flex h-16 items-center justify-between gap-4">
        <Link
          href="#main"
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground"
          aria-label="Back to top"
        >
          Umarfarook G.
          <span className="ml-2 text-accent" aria-hidden="true">
            §
          </span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={cn(
                  "inline-flex h-10 items-center border-b-2 pt-0.5 font-mono text-[11px] uppercase tracking-wider transition-colors duration-[120ms]",
                  active === item.id
                    ? "border-accent text-foreground"
                    : "border-transparent text-foreground/55 hover:text-foreground",
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#contact"
          className="btn-proof stamp inline-flex h-10 items-center gap-2 rounded-[2px] border border-foreground bg-foreground px-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-background"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
