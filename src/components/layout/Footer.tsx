import Link from "next/link";
import { ArrowDiagonal } from "@/components/ui/Arrow";
import { Calibration } from "@/components/ui/Calibration";

// Colophon: the closing page of the document, with the printer's
// color-control bar exhibiting the three inks honestly.
export function Footer() {
  return (
    <footer className="border-t border-foreground/15 bg-background">
      <div className="section-shell py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="display text-2xl text-foreground">Umarfarook Gurramkonda</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Applied AI / ML Engineer · Bengaluru, India
            </p>
            <Calibration className="mt-5" />
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <Link href="https://github.com/Umarfarook1" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
              GitHub
            </Link>
            <Link href="https://linkedin.com/in/umarfarook-gurramkonda" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">
              LinkedIn
            </Link>
            <Link href="mailto:umarfarook0yt@gmail.com" className="transition-colors hover:text-foreground">
              Email
            </Link>
            <Link href="#main" className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              Top
              <ArrowDiagonal className="h-3 w-3 transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-foreground/12 pt-6 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Umarfarook Gurramkonda</p>
          <p>Set in Archivo, Source Serif and Plex Mono · Next.js · Three.js</p>
        </div>
      </div>
    </footer>
  );
}
