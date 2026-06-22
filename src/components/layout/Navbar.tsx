"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Work", href: "#work", id: "work" },
  { name: "Capabilities", href: "#capabilities", id: "capabilities" },
  { name: "About", href: "#about", id: "about" },
  { name: "Experience", href: "#experience", id: "experience" },
];

export function Navbar() {
  const [active, setActive] = useState<string>("");
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
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-4">
      <nav
        aria-label="Primary"
        className={cn(
          "flex h-14 w-full max-w-[1240px] items-center justify-between gap-4 rounded-full border px-3 pl-4 backdrop-blur-xl transition-colors duration-500",
          scrolled
            ? "border-border/70 bg-background/75 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.85)]"
            : "border-border/40 bg-background/35",
        )}
      >
        <Link href="#main" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[linear-gradient(135deg,var(--plasma-iris),var(--plasma-magenta))] font-[family-name:var(--font-display)] text-[13px] font-bold text-white shadow-[0_0_22px_-4px_var(--plasma-iris)]">
            UF
          </span>
          <span className="hidden font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/90 sm:inline">
            Umarfarook G.
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={cn(
                  "inline-flex h-9 items-center rounded-full px-3.5 font-mono text-[11px] uppercase tracking-wider transition-colors",
                  active === item.id
                    ? "bg-primary/15 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground lg:flex">
            <span className="pulse-dot" aria-hidden="true" />
            Open to roles
          </span>
          <Link
            href="#contact"
            className="inline-flex h-9 items-center rounded-full bg-accent px-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
