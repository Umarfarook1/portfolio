import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "bg-card border border-border/50 rounded-lg p-6 hover:border-border transition-colors duration-300",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
