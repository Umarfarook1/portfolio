"use client";

import { useMemo } from "react";
import { FLOWER } from "./sakura";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface SectionBranchProps {
    position?: Position;
    /** Visual size scale (1 = default ~ 320px) */
    scale?: number;
    /** Seed for deterministic blossom layout (so multiple branches don't look identical) */
    seed?: number;
}

/**
 * A small decorative cherry-blossom branch you can place in any section's corner.
 * Use absolute positioning via wrapping in a relative parent.
 */
export function SectionBranch({
    position = "top-right",
    scale = 1,
    seed = 1,
}: SectionBranchProps) {
    const blossoms = useMemo(() => generateBlossoms(seed), [seed]);

    const w = 360 * scale;
    const h = 220 * scale;

    // Positioning + horizontal flip when the branch comes from the left
    const positionStyles: Record<Position, string> = {
        "top-right": "top-0 right-0",
        "top-left": "top-0 left-0 [transform:scaleX(-1)]",
        "bottom-right": "bottom-0 right-0 [transform:scaleY(-1)]",
        "bottom-left": "bottom-0 left-0 [transform:scale(-1,-1)]",
    };

    return (
        <div
            aria-hidden
            className={`pointer-events-none absolute z-0 select-none ${positionStyles[position]}`}
            style={{ width: w, height: h }}
        >
            <svg
                viewBox="0 0 360 220"
                preserveAspectRatio="xMaxYMin meet"
                className="h-full w-full"
            >
                <defs>
                    <linearGradient id={`sectionBark-${seed}`} x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#040303" />
                        <stop offset="100%" stopColor="#15120e" />
                    </linearGradient>
                </defs>

                {/* Main branch entering from upper-right and curving down-left */}
                <path
                    d="M370 -10 C 320 30 260 60 180 80 C 110 95 50 100 -10 95"
                    stroke={`url(#sectionBark-${seed})`}
                    strokeWidth="14"
                    fill="none"
                    strokeLinecap="round"
                />
                {/* Drooping sub-branches */}
                <path d="M250 65 C 240 110 230 150 220 190" stroke="#0e0c0a" strokeWidth="6" fill="none" strokeLinecap="round" />
                <path d="M170 80 C 165 120 160 160 155 200" stroke="#0e0c0a" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M90 92 C 85 125 80 160 75 195" stroke="#0e0c0a" strokeWidth="5" fill="none" strokeLinecap="round" />
                {/* Twigs */}
                <path d="M220 190 L 218 215" stroke="#0e0c0a" strokeWidth="3" strokeLinecap="round" />
                <path d="M155 200 L 152 220" stroke="#0e0c0a" strokeWidth="2.5" strokeLinecap="round" />

                {/* Blossoms */}
                {blossoms.map((b, i) => (
                    <g
                        key={i}
                        transform={`translate(${b.x.toFixed(1)} ${b.y.toFixed(1)}) rotate(${b.rotate.toFixed(1)}) scale(${b.scale.toFixed(2)})`}
                        opacity={b.opacity}
                    >
                        <path
                            d={FLOWER}
                            fill={b.fill}
                            stroke="rgba(150, 150, 165, 0.4)"
                            strokeWidth={0.5 / b.scale}
                        />
                        <circle cx="0" cy="0" r={0.9 / b.scale} fill="hsl(48, 60%, 55%)" />
                    </g>
                ))}
            </svg>
        </div>
    );
}

interface Blossom {
    x: number;
    y: number;
    rotate: number;
    scale: number;
    fill: string;
    opacity: number;
}

const FILLS = [
    "rgba(252, 250, 248, 0.95)",
    "rgba(248, 246, 244, 0.92)",
    "rgba(245, 243, 240, 0.9)",
    "rgba(240, 240, 245, 0.88)",
    "rgba(252, 248, 240, 0.92)",
];

function generateBlossoms(seed: number): Blossom[] {
    const rng = mulberry32(seed * 17 + 3);
    const out: Blossom[] = [];

    // Cluster points along the branch
    const points = [
        { x: 340, y: 5 }, { x: 290, y: 35 }, { x: 250, y: 65 },
        { x: 200, y: 75 }, { x: 170, y: 80 }, { x: 130, y: 88 },
        { x: 90, y: 92 }, { x: 50, y: 95 }, { x: 10, y: 95 },
        // Drooping
        { x: 230, y: 130 }, { x: 220, y: 170 }, { x: 218, y: 200 },
        { x: 165, y: 130 }, { x: 158, y: 170 }, { x: 155, y: 200 },
        { x: 85, y: 130 }, { x: 78, y: 165 }, { x: 75, y: 195 },
    ];

    for (const p of points) {
        const count = 2 + Math.floor(rng() * 3);
        for (let i = 0; i < count; i++) {
            const ox = (rng() - 0.5) * 30;
            const oy = (rng() - 0.5) * 30;
            out.push({
                x: p.x + ox,
                y: p.y + oy,
                rotate: rng() * 360,
                scale: 0.55 + rng() * 0.55,
                fill: FILLS[Math.floor(rng() * FILLS.length)],
                opacity: 0.85 + rng() * 0.15,
            });
        }
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
