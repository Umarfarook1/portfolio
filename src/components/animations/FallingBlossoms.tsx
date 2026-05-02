"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PETAL, FLOWER } from "./sakura";

const COUNT = 18;

const FILLS = [
    "rgba(252, 250, 248, 0.92)",
    "rgba(248, 246, 244, 0.9)",
    "rgba(245, 243, 240, 0.88)",
    "rgba(252, 248, 240, 0.9)",
    "rgba(240, 240, 245, 0.85)",
];

interface Petal {
    id: number;
    startX: number;
    drift: number;
    size: number;
    duration: number;
    delay: number;
    rotateStart: number;
    rotateEnd: number;
    fill: string;
    opacity: number;
    isFlower: boolean;
}

export function FallingBlossoms() {
    const [petals, setPetals] = useState<Petal[]>([]);
    const [windowH, setWindowH] = useState(1200);

    useEffect(() => {
        setWindowH(window.innerHeight + 100);

        const generated: Petal[] = Array.from({ length: COUNT }).map((_, i) => ({
            id: i,
            startX: Math.random() * 100,
            drift: (Math.random() - 0.5) * 50,
            size: 0.8 + Math.random() * 0.8,
            duration: 18 + Math.random() * 14, // slower than maple
            delay: Math.random() * 22,
            rotateStart: Math.random() * 360,
            rotateEnd: Math.random() * 540 + 180,
            fill: FILLS[i % FILLS.length],
            opacity: 0.6 + Math.random() * 0.35,
            isFlower: i % 5 === 0, // every 5th is a whole flower
        }));
        setPetals(generated);
    }, []);

    if (petals.length === 0) return null;

    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
            {petals.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute -top-12"
                    style={{ left: `${p.startX}%`, opacity: p.opacity }}
                    initial={{ y: -50, x: 0, rotate: p.rotateStart }}
                    animate={{
                        y: windowH,
                        x: [0, p.drift * 4, p.drift * -4, p.drift * 4, 0],
                        rotate: p.rotateEnd,
                    }}
                    transition={{
                        y: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" },
                        x: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" },
                        rotate: { duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" },
                    }}
                >
                    {p.isFlower ? (
                        <svg width={20 * p.size} height={20 * p.size} viewBox="-12 -12 24 24">
                            <path d={FLOWER} fill={p.fill} stroke="rgba(160, 160, 175, 0.5)" strokeWidth="0.4" />
                            <circle cx="0" cy="0" r="1" fill="hsl(48, 60%, 60%)" />
                        </svg>
                    ) : (
                        <svg width={12 * p.size} height={14 * p.size} viewBox="-8 -12 16 14">
                            <path d={PETAL} fill={p.fill} stroke="rgba(160, 160, 175, 0.5)" strokeWidth="0.3" />
                        </svg>
                    )}
                </motion.div>
            ))}
        </div>
    );
}
