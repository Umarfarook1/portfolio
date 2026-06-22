import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "iris" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const variants = {
      primary:
        "bg-accent text-accent-foreground shadow-[0_10px_34px_-10px_rgba(255,180,84,0.6)] hover:-translate-y-0.5 hover:brightness-[1.04] active:translate-y-0",
      iris:
        "bg-[linear-gradient(100deg,var(--plasma-iris),var(--plasma-magenta))] text-white shadow-[0_10px_40px_-12px_rgba(124,92,255,0.8)] hover:-translate-y-0.5 active:translate-y-0",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline:
        "border border-border/80 bg-foreground/[0.02] text-foreground hover:border-primary/60 hover:bg-primary/5",
      ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
    };
    const sizes = {
      default: "h-11 px-5",
      sm: "h-9 px-4",
      lg: "h-[3.25rem] px-7 text-[13px]",
      icon: "h-11 w-11",
    };
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
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
