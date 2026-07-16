import Link from "next/link";
import { Clock } from "@/components/ui/Clock";

// Closing telemetry: live local time, real links, the build's own facts.
export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="mono-label text-lo">© {new Date().getFullYear()} Umarfarook Gurramkonda</p>
          <Clock className="mono-label text-lo/60" />
          <p className="mono-label text-lo/60">open to research + ML roles</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="https://github.com/Umarfarook1" target="_blank" rel="noreferrer" className="navlink mono-label">
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/umarfarook-gurramkonda"
            target="_blank"
            rel="noreferrer"
            className="navlink mono-label"
          >
            LinkedIn
          </Link>
          <Link href="mailto:umarfarook0yt@gmail.com" className="navlink mono-label">
            Email
          </Link>
          <p className="mono-label text-lo/40">Fraunces · Schibsted · Fragment Mono</p>
        </div>
      </div>
    </footer>
  );
}
