"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Moon fixed in viewport. As the user scrolls, the moon descends
 * from the top of the sky toward the mountain peaks.
 * Z-index sits below the mountains so it appears framed by them at full scroll.
 */
export function ParallaxMoon() {
    const { scrollY } = useScroll();
    const [windowH, setWindowH] = useState(900);

    useEffect(() => {
        setWindowH(window.innerHeight);
        const onResize = () => setWindowH(window.innerHeight);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Over the first 1.4x viewport heights of scroll, the moon moves from
    // its starting position (~6% of vh) down to ~52% of vh (just above the
    // mountain peaks). After that it stays parked.
    const start = windowH * 0.06;
    const end = windowH * 0.52;
    const moonY = useTransform(scrollY, [0, windowH * 1.4], [start, end], {
        clamp: true,
    });

    // Slight horizontal drift right as it descends (subtle arc)
    const moonX = useTransform(scrollY, [0, windowH * 1.4], [0, 30], {
        clamp: true,
    });

    // Halo shrinks slightly as moon descends (atmospheric perspective)
    const haloScale = useTransform(scrollY, [0, windowH * 1.4], [1, 0.85], {
        clamp: true,
    });

    return (
        <motion.div
            aria-hidden
            className="pointer-events-none fixed left-[42%] top-0 z-[-2] will-change-transform"
            style={{ y: moonY, x: moonX }}
        >
            {/* Outer halo */}
            <motion.div
                className="absolute -inset-44 rounded-full bg-[radial-gradient(circle,_rgba(230,240,255,0.22),_transparent_60%)]"
                style={{ scale: haloScale }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Closer glow */}
            <motion.div
                className="absolute -inset-16 rounded-full bg-[radial-gradient(circle,_rgba(245,250,255,0.5),_transparent_70%)]"
                style={{ scale: haloScale }}
            />
            {/* Moon body */}
            <div className="relative h-36 w-36 rounded-full bg-[radial-gradient(circle_at_38%_38%,_#ffffff_0%,_#f0f0e8_40%,_#cfcfc4_85%,_#b3b3a8_100%)] shadow-[0_0_80px_rgba(245,250,255,0.6)]">
                <div className="absolute left-[28%] top-[36%] h-3 w-3 rounded-full bg-[#b8b8af]/55" />
                <div className="absolute left-[55%] top-[28%] h-2 w-2 rounded-full bg-[#b8b8af]/50" />
                <div className="absolute left-[42%] top-[60%] h-4 w-4 rounded-full bg-[#b8b8af]/55" />
                <div className="absolute left-[68%] top-[55%] h-2.5 w-2.5 rounded-full bg-[#b8b8af]/50" />
            </div>
        </motion.div>
    );
}
