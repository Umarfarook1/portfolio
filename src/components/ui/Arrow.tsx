import { cn } from "@/lib/utils";

// Custom editorial arrows: sharp square caps, long shafts. Not lucide defaults.

export function ArrowDiagonal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path d="M6 18 18 6" />
      <path d="M8.5 6H18v9.5" />
    </svg>
  );
}

export function ArrowEast({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path d="M3 12h17" />
      <path d="M13.5 5.5 20 12l-6.5 6.5" />
    </svg>
  );
}
