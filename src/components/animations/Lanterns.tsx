"use client";

import { motion } from "framer-motion";

/**
 * Subtle warm lantern glows distributed across the viewport.
 * Provides the only intentional warm color in the moonlit palette,
 * matching the small lantern accents in the reference image.
 */
export function Lanterns() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
        >
            {/* Bottom-left lantern glow */}
            <Lantern x="6%" y="78%" size="lg" delay={0} />
            {/* Bottom-right lantern glow */}
            <Lantern x="46%" y="86%" size="md" delay={1.4} />
            {/* Mid-right lantern (lower) */}
            <Lantern x="14%" y="92%" size="sm" delay={2.2} />
        </div>
    );
}

function Lantern({
    x,
    y,
    size,
    delay,
}: {
    x: string;
    y: string;
    size: "sm" | "md" | "lg";
    delay: number;
}) {
    const sizes = {
        sm: { core: 4, halo: 80 },
        md: { core: 6, halo: 120 },
        lg: { core: 8, halo: 160 },
    };
    const s = sizes[size];

    return (
        <div className="absolute" style={{ left: x, top: y }}>
            {/* Outer warm halo */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: s.halo,
                    height: s.halo,
                    background:
                        "radial-gradient(circle, rgba(255, 178, 90, 0.25) 0%, rgba(255, 178, 90, 0.10) 30%, transparent 70%)",
                    transform: "translate(-50%, -50%)",
                }}
                animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay,
                    ease: "easeInOut",
                }}
            />
            {/* Lantern core (warm point) */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: s.core,
                    height: s.core,
                    background: "radial-gradient(circle, #ffe4a8 0%, #ff9b3d 65%, #b15f0a 100%)",
                    boxShadow: "0 0 16px 4px rgba(255, 178, 90, 0.65)",
                    transform: "translate(-50%, -50%)",
                }}
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
