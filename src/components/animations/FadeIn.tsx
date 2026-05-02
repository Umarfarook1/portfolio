"use client";

import { motion, useInView, type Variant } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({
    children,
    className,
    delay = 0,
    duration = 0.5,
    direction = "up",
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px", amount: 0.05 });

    const getHiddenVariant = (): Variant => {
        switch (direction) {
            case "up":
                return { opacity: 0, y: 20 };
            case "down":
                return { opacity: 0, y: -20 };
            case "left":
                return { opacity: 0, x: 20 };
            case "right":
                return { opacity: 0, x: -20 };
            case "none":
                return { opacity: 0 };
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: getHiddenVariant(),
                visible: {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    transition: {
                        duration,
                        delay,
                        ease: "easeOut",
                    },
                },
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
