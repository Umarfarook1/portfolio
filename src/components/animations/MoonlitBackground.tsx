"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Moonlit night sky.
 * Deep midnight gradient, full moon with halo, distant stars,
 * mist bands, water reflection at the bottom, painterly grain.
 */
export function MoonlitBackground() {
    const stars = useMemo(() => generateStars(), []);

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden"
        >
            {/* Base warm near-black gradient */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_#16120e_0%,_#0d0b08_45%,_#070504_100%)]" />

            {/* Soft warm wash from the moon area (upper-center) */}
            <div className="absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_50%_15%,_var(--tw-gradient-stops))] from-amber-100/8 via-stone-700/5 to-transparent" />

            {/* Stars */}
            {stars.map((s, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: s.size,
                        height: s.size,
                        opacity: s.baseOpacity,
                    }}
                    animate={{ opacity: [s.baseOpacity * 0.4, s.baseOpacity, s.baseOpacity * 0.4] }}
                    transition={{
                        duration: s.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: s.delay,
                    }}
                />
            ))}

            {/* Mist bands - horizontal translucent strips */}
            <div className="absolute inset-x-0 top-[35%] h-32 bg-gradient-to-b from-transparent via-stone-300/8 to-transparent blur-2xl" />
            <div className="absolute inset-x-0 top-[55%] h-40 bg-gradient-to-b from-transparent via-stone-400/8 to-transparent blur-2xl" />

            {/* Deep band at the bottom */}
            <div className="absolute inset-x-0 bottom-0 h-[35vh] bg-gradient-to-t from-[#040302] via-[#0a0806]/60 to-transparent" />
            {/* Subtle water shimmer */}
            <motion.div
                className="absolute inset-x-0 bottom-0 h-[28vh] opacity-40"
                style={{
                    background: "repeating-linear-gradient(0deg, transparent 0, transparent 12px, rgba(220,230,255,0.04) 12px, rgba(220,230,255,0.04) 13px)",
                }}
                animate={{ backgroundPositionY: ["0px", "8px"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            {/* Top fade so navbar reads */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/70 to-transparent" />

            {/* Painterly grain */}
            <div
                className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
                }}
            />
        </div>
    );
}

interface Star {
    x: number;
    y: number;
    size: number;
    baseOpacity: number;
    duration: number;
    delay: number;
}

function generateStars(): Star[] {
    const rng = mulberry32(13);
    const out: Star[] = [];
    // Stars only in upper portion (above horizon)
    for (let i = 0; i < 60; i++) {
        out.push({
            x: rng() * 100,
            y: rng() * 55,
            size: 1 + Math.floor(rng() * 2.4),
            baseOpacity: 0.4 + rng() * 0.5,
            duration: 3 + rng() * 4,
            delay: rng() * 4,
        });
    }
    return out;
}

function mulberry32(seed: number) {
    let s = seed;
    return function () {
        s |= 0;
        s = (s + 0x6d2b79f5) | 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
