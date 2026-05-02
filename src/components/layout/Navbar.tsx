"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Building", href: "#now-building" },
    { name: "Experience", href: "#experience" },
    { name: "Stack", href: "#stack" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [hasShrunk, setHasShrunk] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            // Hysteresis: shrink at 80, expand back at 40 (avoids jitter)
            const y = window.scrollY;
            setHasShrunk((prev) => {
                if (!prev && y > 80) return true;
                if (prev && y < 40) return false;
                return prev;
            });
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
            <nav
                className={cn(
                    "flex items-center rounded-full border border-stone-700/50 bg-stone-950/55 backdrop-blur-md transition-all duration-700 ease-out",
                    // Same height/font, only horizontal spacing changes
                    hasShrunk
                        ? "gap-2 px-3 py-2"
                        : "gap-10 px-10 py-2"
                )}
                style={{
                    boxShadow:
                        "0 12px 40px -12px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.05)",
                }}
            >
                <Link
                    href="/"
                    className="flex items-center font-[family-name:var(--font-display)] text-lg italic tracking-tight text-stone-100 transition-colors hover:text-white"
                >
                    umarfarook
                    <span className="ml-0.5 not-italic text-amber-300/90 animate-pulse">
                        _
                    </span>
                </Link>

                <div
                    className={cn(
                        "hidden items-center md:flex transition-all duration-700 ease-out",
                        hasShrunk ? "gap-0" : "gap-2"
                    )}
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group relative rounded-full font-sans text-sm font-medium text-stone-300 transition-all duration-700 ease-out hover:text-white",
                                hasShrunk ? "px-2 py-1" : "px-4 py-1"
                            )}
                        >
                            <span className="relative z-[1]">{item.name}</span>
                            <span className="absolute inset-0 -z-0 scale-90 rounded-full bg-stone-800/0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:bg-stone-800/60 group-hover:opacity-100" />
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}
