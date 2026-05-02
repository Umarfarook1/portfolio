import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-lg border border-stone-700/60 bg-stone-900/60 p-6 shadow-md transition-colors duration-300 hover:border-stone-600/80",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
