import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-card/70 p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-colors hover:border-primary/35",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
