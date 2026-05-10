import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-lg border border-stone-700/60 bg-stone-900/60 p-6 shadow-md backdrop-blur-md backdrop-saturate-150 transition-all duration-500 ease-out hover:border-stone-600/80 hover:shadow-xl hover:shadow-stone-950/40",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
