"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowEast } from "@/components/ui/Arrow";

const navItems = [
  { name: "Work", href: "#work", id: "work" },
  { name: "Capabilities", href: "#capabilities", id: "capabilities" },
  { name: "About", href: "#about", id: "about" },
  { name: "Experience", href: "#experience", id: "experience" },
];

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
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-4">
      <nav
        aria-label="Primary"
        className={cn(
          "flex h-14 w-full max-w-[1280px] items-center justify-between gap-4 rounded-full border px-2.5 pl-3 transition-colors duration-500",
          scrolled
            ? "border-foreground/15 bg-background/85 shadow-[0_14px_40px_-22px_rgba(24,22,15,0.5)] backdrop-blur-xl"
            : "border-transparent bg-background/40 backdrop-blur-md",
        )}
      >
        <Link href="#main" className="flex items-center gap-2.5" aria-label="Back to top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar.jpg"
            alt="Umarfarook Gurramkonda"
            className="h-9 w-9 rounded-full border border-foreground/20 object-cover"
          />
          <span className="hidden font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground sm:inline">
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
                    ? "bg-foreground text-background"
                    : "text-foreground/55 hover:text-foreground",
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#contact"
          className="group inline-flex h-10 items-center gap-2 rounded-full bg-accent px-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent-foreground transition-transform duration-300 hover:-translate-y-0.5"
        >
          Contact
          <ArrowEast className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </nav>
    </header>
  );
}
