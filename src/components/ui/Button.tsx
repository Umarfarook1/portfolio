import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "accent" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

// Custom sweep-fill buttons: an accent or ink panel rises from the bottom on hover.
// Wrap label text in a <span> at the call site so it sits above the sweep (.btn-sweep > *).
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const variants = {
      solid:
        "btn-sweep border border-foreground bg-foreground text-background [--sweep:hsl(var(--accent))] hover:text-foreground",
      accent:
        "btn-sweep border border-foreground bg-accent text-accent-foreground [--sweep:hsl(var(--foreground))] hover:text-background",
      outline:
        "btn-sweep border border-foreground/30 text-foreground [--sweep:hsl(var(--foreground))] hover:border-foreground hover:text-background",
      ghost: "text-foreground/65 hover:text-foreground",
    };
    const sizes = {
      default: "h-11 px-5",
      sm: "h-9 px-4",
      lg: "h-[3.4rem] px-7 text-[12px]",
      icon: "h-11 w-11",
    };
    return (
      <Comp
        ref={ref}
        className={cn(
          "group inline-flex items-center justify-center gap-2.5 rounded-full font-mono text-[11px] font-semibold uppercase tracking-[0.13em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
