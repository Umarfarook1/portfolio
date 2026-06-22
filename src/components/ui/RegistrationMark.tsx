import { cn } from "@/lib/utils";

// Calibration / registration mark — the visual language of measurement,
// which is exactly what this portfolio is about (evals, traces, tolerances).
export function RegistrationMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4 text-primary/60", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 0v6.5M12 17.5V24M0 12h6.5M17.5 12H24" />
    </svg>
  );
}
