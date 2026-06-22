import Link from "next/link";
import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-background/80">
      <div className="section-shell py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground">
              Umarfarook Gurramkonda
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              AI Systems Engineer · Bengaluru, India
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <Link href="https://github.com/Umarfarook1" target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">
              GitHub
            </Link>
            <Link href="https://linkedin.com/in/umarfarook-gurramkonda" target="_blank" rel="noreferrer" className="transition-colors hover:text-primary">
              LinkedIn
            </Link>
            <Link href="mailto:umarfarook0yt@gmail.com" className="transition-colors hover:text-primary">
              Email
            </Link>
            <Link href="#main" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
              Top <ArrowUp className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Umarfarook Gurramkonda</p>
          <p>Designed and built in Next.js · Three.js</p>
        </div>
      </div>
    </footer>
  );
}
