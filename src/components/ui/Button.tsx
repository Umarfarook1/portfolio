import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

// Rectangular print buttons. On hover a 3px red proof bar slides in along the
// bottom edge (.btn-proof), like an editor underlining the action.
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const variants = {
      solid: "btn-proof border border-foreground bg-foreground text-background",
      outline: "btn-proof border border-foreground/35 text-foreground hover:border-foreground",
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
          "group inline-flex items-center justify-center gap-2.5 rounded-[2px] font-mono text-[11px] font-semibold uppercase tracking-[0.13em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
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
