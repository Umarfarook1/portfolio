import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowDiagonal } from "./Arrow";

interface CircleArrowProps {
  href: string;
  label: string;
  className?: string;
  external?: boolean;
}

// Circular control with a diagonal arrow that swaps out top-right / in bottom-left on hover.
export function CircleArrow({ href, label, className, external }: CircleArrowProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "group relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border border-foreground bg-foreground text-background transition-colors duration-300",
        className,
      )}
    >
      <span className="relative block h-4 w-4">
        <ArrowDiagonal className="absolute inset-0 h-4 w-4 transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-6 group-hover:translate-x-6" />
        <ArrowDiagonal className="absolute inset-0 h-4 w-4 -translate-x-6 translate-y-6 transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </Link>
  );
}
