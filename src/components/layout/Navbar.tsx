"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Root-relative so these still resolve from a route other than "/" (e.g.
// /services): Next.js Link navigates home first, then scrolls to the hash.
const navItems = [
  { name: "Evidence", href: "/#evidence" },
  { name: "Work", href: "/#work" },
  { name: "Method", href: "/#method" },
  { name: "Experience", href: "/#experience" },
  { name: "Services", href: "/services" },
];

// Translucent bar over the ground, one hairline, no scroll logic.
export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150">
      <nav aria-label="Primary" className="shell flex h-14 items-center justify-between gap-6">
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-fg" aria-label="Home">
          Umarfarook Gurramkonda
        </Link>

        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.href} className={item.href === "/services" ? "" : "hidden md:block"}>
              <Link
                href={item.href}
                className="navlink"
                data-active={item.href === "/services" ? pathname === "/services" : undefined}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="mailto:umarfarook0yt@gmail.com" className="btn btn-primary btn-sm">
              Email me
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
