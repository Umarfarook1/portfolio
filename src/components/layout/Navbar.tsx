"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/#work" },
    { name: "Thinking", href: "/#thinking" },
    { name: "Contact", href: "/#contact" },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/50 border-b border-white/5">
            <Link
                href="/"
                className="text-lg font-bold tracking-tight font-mono hover:text-white/80 transition-colors"
            >
                AI_ENGINEER
            </Link>
            <div className="hidden md:flex gap-8">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-white",
                            pathname === item.href ? "text-white" : "text-white/60"
                        )}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
