"use client";

import { useMemo } from "react";
import { FLOWER } from "./sakura";

/**
 * Single cherry blossom branch drapes from the upper-right corner.
 * MUST be placed inside a `relative` parent (typically the hero section).
 * Gnarled dark branches with dense WHITE blossom clusters.
 */
export function SakuraTree() {
    return <TopRightBranch />;
}

/* ============================================================
 * TOP-RIGHT BRANCH — main, larger, sweeps in from upper-right
 * ============================================================ */
function TopRightBranch() {
    const blossoms = useMemo(() => generateBlossomsRight(), []);

    return (
        <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-8 z-[1] h-[88vh] w-[80vw] max-w-[1100px] origin-top-right select-none"
        >
            <style>{`
        @keyframes sakura-sway-r {
          0%, 100% { transform: rotate(-0.3deg); }
          50% { transform: rotate(0.3deg); }
        }
        .sakura-sway-r { animation: sakura-sway-r 12s ease-in-out infinite; transform-origin: 1100px 0px; transform-box: fill-box; }
      `}</style>

            <svg
                viewBox="0 0 1100 800"
                preserveAspectRatio="xMaxYMin meet"
                className="absolute inset-0 h-full w-full"
            >
                <defs>
                    <linearGradient id="barkR" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#040611" />
                        <stop offset="60%" stopColor="#0a0d18" />
                        <stop offset="100%" stopColor="#11142a" />
                    </linearGradient>
                </defs>

                <g className="sakura-sway-r">
                    {/* === MAJOR BRANCHES — gnarled, prominent dark silhouettes === */}

                    {/* Main thick branch sweeping in from corner */}
                    <path
                        d="M1110 -25 C 1050 30 970 75 870 120 C 750 170 620 195 470 192"
                        stroke="url(#barkR)"
                        strokeWidth="38"
                        fill="none"
                        strokeLinecap="round"
                    />
                    {/* Trunk continuing down right side */}
                    <path
                        d="M1110 -25 C 1100 90 1080 200 1060 310 C 1040 410 1020 490 1000 560"
                        stroke="url(#barkR)"
                        strokeWidth="36"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {/* Major drooping sub-branches */}
                    <path d="M870 120 C 830 220 770 320 700 400" stroke="url(#barkR)" strokeWidth="16" fill="none" strokeLinecap="round" />
                    <path d="M700 400 C 690 470 680 540 670 600" stroke="url(#barkR)" strokeWidth="9" fill="none" strokeLinecap="round" />
                    <path d="M770 320 C 750 380 730 440 720 500" stroke="url(#barkR)" strokeWidth="8" fill="none" strokeLinecap="round" />

                    <path d="M620 195 C 580 280 540 370 510 440" stroke="url(#barkR)" strokeWidth="13" fill="none" strokeLinecap="round" />
                    <path d="M540 370 C 510 420 480 480 460 540" stroke="url(#barkR)" strokeWidth="7" fill="none" strokeLinecap="round" />
                    <path d="M510 440 C 490 500 470 550 450 600" stroke="url(#barkR)" strokeWidth="6" fill="none" strokeLinecap="round" />

                    <path d="M470 192 C 420 240 370 290 320 340" stroke="url(#barkR)" strokeWidth="11" fill="none" strokeLinecap="round" />
                    <path d="M370 290 C 330 320 290 360 250 400" stroke="url(#barkR)" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M320 340 C 280 380 240 420 200 460" stroke="url(#barkR)" strokeWidth="5" fill="none" strokeLinecap="round" />

                    {/* Trunk-side branches */}
                    <path d="M1080 200 C 1010 200 940 220 880 250" stroke="url(#barkR)" strokeWidth="13" fill="none" strokeLinecap="round" />
                    <path d="M940 220 C 900 290 870 360 850 420" stroke="url(#barkR)" strokeWidth="7" fill="none" strokeLinecap="round" />
                    <path d="M1060 310 C 990 320 920 340 870 360" stroke="url(#barkR)" strokeWidth="11" fill="none" strokeLinecap="round" />
                    <path d="M920 340 C 890 410 870 480 860 540" stroke="url(#barkR)" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M1020 490 C 960 510 900 530 840 540" stroke="url(#barkR)" strokeWidth="9" fill="none" strokeLinecap="round" />
                    <path d="M1000 560 C 920 580 840 600 760 600" stroke="url(#barkR)" strokeWidth="7" fill="none" strokeLinecap="round" />

                    {/* Twigs (final detail) */}
                    <path d="M250 400 L 220 410" stroke="#080a14" strokeWidth="3" strokeLinecap="round" />
                    <path d="M450 600 L 440 640" stroke="#080a14" strokeWidth="3" strokeLinecap="round" />
                    <path d="M670 600 L 670 650" stroke="#080a14" strokeWidth="3" strokeLinecap="round" />
                    <path d="M850 540 L 870 580" stroke="#080a14" strokeWidth="3" strokeLinecap="round" />

                    {/* === DENSE INDIVIDUAL BLOSSOMS === */}
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
                                strokeWidth={0.4 / b.scale}
                            />
                            <circle cx="0" cy="0" r={0.9 / b.scale} fill="hsl(48, 60%, 55%)" />
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    );
}

/* ============================================================
 * TOP-LEFT BRANCH — smaller, drapes from upper-left
 * ============================================================ */
function TopLeftBranch() {
    const blossoms = useMemo(() => generateBlossomsLeft(), []);

    return (
        <div
            aria-hidden
            className="pointer-events-none absolute -left-8 -top-4 z-[1] h-[60vh] w-[45vw] max-w-[600px] origin-top-left select-none"
        >
            <style>{`
        @keyframes sakura-sway-l {
          0%, 100% { transform: rotate(0.4deg); }
          50% { transform: rotate(-0.4deg); }
        }
        .sakura-sway-l { animation: sakura-sway-l 14s ease-in-out infinite; transform-origin: 0px 0px; transform-box: fill-box; }
      `}</style>

            <svg
                viewBox="0 0 600 500"
                preserveAspectRatio="xMinYMin meet"
                className="absolute inset-0 h-full w-full"
            >
                <defs>
                    <linearGradient id="barkL" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#040611" />
                        <stop offset="60%" stopColor="#0a0d18" />
                        <stop offset="100%" stopColor="#11142a" />
                    </linearGradient>
                </defs>

                <g className="sakura-sway-l">
                    {/* === BRANCHES === */}
                    <path d="M-25 -10 C 30 30 80 70 160 110 C 250 150 340 175 430 175" stroke="url(#barkL)" strokeWidth="30" fill="none" strokeLinecap="round" />
                    <path d="M160 110 C 180 180 200 250 215 320" stroke="url(#barkL)" strokeWidth="11" fill="none" strokeLinecap="round" />
                    <path d="M215 320 C 225 380 235 430 235 470" stroke="url(#barkL)" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M280 130 C 290 200 300 270 310 330" stroke="url(#barkL)" strokeWidth="10" fill="none" strokeLinecap="round" />
                    <path d="M310 330 C 320 380 330 430 330 470" stroke="url(#barkL)" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M380 160 C 400 230 415 290 420 350" stroke="url(#barkL)" strokeWidth="9" fill="none" strokeLinecap="round" />
                    <path d="M80 70 C 60 130 50 200 50 260" stroke="url(#barkL)" strokeWidth="10" fill="none" strokeLinecap="round" />
                    <path d="M50 260 C 40 320 30 380 20 430" stroke="url(#barkL)" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M50 200 L 0 220" stroke="url(#barkL)" strokeWidth="6" fill="none" strokeLinecap="round" />
                    {/* twigs */}
                    <path d="M235 470 L 240 495" stroke="#080a14" strokeWidth="3" strokeLinecap="round" />
                    <path d="M330 470 L 335 495" stroke="#080a14" strokeWidth="3" strokeLinecap="round" />
                    <path d="M420 350 L 430 380" stroke="#080a14" strokeWidth="3" strokeLinecap="round" />

                    {/* dense blossoms */}
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
                                strokeWidth={0.4 / b.scale}
                            />
                            <circle cx="0" cy="0" r={0.9 / b.scale} fill="hsl(48, 60%, 55%)" />
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    );
}

/* ============================================================
 * Fallen petals along the bottom edge
 * ============================================================ */
function FallenPetalsBaseline() {
    const petals = useMemo(() => generateFallenPetals(), []);
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed bottom-0 left-0 right-0 z-[-1] h-[80px] select-none"
        >
            <svg viewBox="0 0 1600 80" preserveAspectRatio="none" className="h-full w-full">
                {petals.map((p, i) => (
                    <g
                        key={i}
                        transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.rotate.toFixed(1)}) scale(${p.scale.toFixed(2)})`}
                        opacity={p.opacity}
                    >
                        <path
                            d={FLOWER}
                            fill={p.fill}
                            stroke="rgba(150, 150, 165, 0.4)"
                            strokeWidth={0.3 / p.scale}
                        />
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

const BLOSSOM_FILLS = [
    "rgba(252, 250, 248, 0.95)",
    "rgba(248, 246, 244, 0.92)",
    "rgba(245, 243, 240, 0.9)",
    "rgba(240, 240, 245, 0.88)",
    "rgba(235, 232, 235, 0.85)",
    "rgba(252, 248, 240, 0.92)",
];

/**
 * Generate dense individual blossoms along the right branch.
 * Strategy: scatter many small blossoms in a wide band along each branch
 * segment, creating organic clustering through density alone (no abstract washes).
 */
function generateBlossomsRight(): Blossom[] {
    const rng = mulberry32(31);
    const out: Blossom[] = [];

    // Each "segment" = a path of points along which blossoms cluster.
    // Density per segment = number of blossoms scattered along it.
    const segments: { points: { x: number; y: number }[]; density: number; spread: number }[] = [
        // Main horizontal sweep
        {
            points: [
                { x: 1090, y: 0 }, { x: 1020, y: 50 }, { x: 950, y: 90 },
                { x: 870, y: 130 }, { x: 770, y: 170 }, { x: 660, y: 195 },
                { x: 540, y: 200 }, { x: 470, y: 195 },
            ],
            density: 70,
            spread: 60,
        },
        // Trunk
        {
            points: [
                { x: 1100, y: 0 }, { x: 1090, y: 100 }, { x: 1080, y: 200 },
                { x: 1070, y: 300 }, { x: 1050, y: 410 }, { x: 1020, y: 500 },
                { x: 1000, y: 580 },
            ],
            density: 55,
            spread: 80,
        },
        // Major drooping branch 1 (longest)
        {
            points: [
                { x: 870, y: 130 }, { x: 830, y: 230 }, { x: 770, y: 330 },
                { x: 700, y: 410 }, { x: 670, y: 500 }, { x: 660, y: 600 },
            ],
            density: 50,
            spread: 70,
        },
        // Branch 2
        {
            points: [
                { x: 620, y: 200 }, { x: 580, y: 290 }, { x: 540, y: 380 },
                { x: 510, y: 460 }, { x: 470, y: 540 }, { x: 440, y: 600 },
            ],
            density: 45,
            spread: 65,
        },
        // Branch 3 (left-reaching)
        {
            points: [
                { x: 470, y: 200 }, { x: 420, y: 250 }, { x: 370, y: 300 },
                { x: 320, y: 350 }, { x: 270, y: 400 }, { x: 220, y: 450 },
            ],
            density: 50,
            spread: 70,
        },
        // Trunk-side branches
        {
            points: [
                { x: 1080, y: 200 }, { x: 1010, y: 220 }, { x: 940, y: 240 },
                { x: 880, y: 260 },
            ],
            density: 35,
            spread: 60,
        },
        {
            points: [
                { x: 940, y: 240 }, { x: 910, y: 320 }, { x: 880, y: 400 },
                { x: 860, y: 470 },
            ],
            density: 35,
            spread: 60,
        },
        {
            points: [
                { x: 1060, y: 310 }, { x: 990, y: 340 }, { x: 920, y: 360 },
                { x: 870, y: 380 },
            ],
            density: 30,
            spread: 60,
        },
        {
            points: [
                { x: 1020, y: 490 }, { x: 950, y: 510 }, { x: 880, y: 530 },
                { x: 820, y: 545 },
            ],
            density: 30,
            spread: 55,
        },
        // Hanging clumps in negative space
        { points: [{ x: 950, y: 240 }], density: 25, spread: 50 },
        { points: [{ x: 800, y: 280 }], density: 22, spread: 50 },
        { points: [{ x: 600, y: 350 }], density: 22, spread: 55 },
        { points: [{ x: 380, y: 330 }], density: 20, spread: 50 },
        { points: [{ x: 250, y: 460 }], density: 18, spread: 45 },
    ];

    for (const seg of segments) {
        for (let i = 0; i < seg.density; i++) {
            // pick random point along segment polyline
            const idx = Math.floor(rng() * seg.points.length);
            const p = seg.points[idx];
            const ox = (rng() - 0.5) * seg.spread;
            const oy = (rng() - 0.5) * seg.spread;
            out.push({
                x: p.x + ox,
                y: p.y + oy,
                rotate: rng() * 360,
                scale: 0.55 + rng() * 0.65,
                fill: BLOSSOM_FILLS[Math.floor(rng() * BLOSSOM_FILLS.length)],
                opacity: 0.85 + rng() * 0.15,
            });
        }
    }

    return out;
}

function generateBlossomsLeft(): Blossom[] {
    const rng = mulberry32(91);
    const out: Blossom[] = [];

    const segments: { points: { x: number; y: number }[]; density: number; spread: number }[] = [
        {
            points: [
                { x: -10, y: 0 }, { x: 50, y: 40 }, { x: 110, y: 80 },
                { x: 180, y: 110 }, { x: 260, y: 140 }, { x: 340, y: 165 },
                { x: 420, y: 175 },
            ],
            density: 55,
            spread: 50,
        },
        {
            points: [
                { x: 160, y: 110 }, { x: 180, y: 200 }, { x: 200, y: 280 },
                { x: 215, y: 360 }, { x: 230, y: 440 },
            ],
            density: 35,
            spread: 50,
        },
        {
            points: [
                { x: 280, y: 130 }, { x: 295, y: 230 }, { x: 305, y: 320 },
                { x: 320, y: 410 }, { x: 330, y: 470 },
            ],
            density: 35,
            spread: 50,
        },
        {
            points: [
                { x: 380, y: 160 }, { x: 400, y: 250 }, { x: 415, y: 340 },
            ],
            density: 28,
            spread: 50,
        },
        {
            points: [
                { x: 80, y: 70 }, { x: 60, y: 160 }, { x: 50, y: 240 },
                { x: 30, y: 350 }, { x: 20, y: 430 },
            ],
            density: 35,
            spread: 50,
        },
        // Hanging clumps
        { points: [{ x: 130, y: 250 }], density: 18, spread: 40 },
        { points: [{ x: 250, y: 300 }], density: 18, spread: 40 },
        { points: [{ x: 360, y: 300 }], density: 15, spread: 40 },
    ];

    for (const seg of segments) {
        for (let i = 0; i < seg.density; i++) {
            const idx = Math.floor(rng() * seg.points.length);
            const p = seg.points[idx];
            const ox = (rng() - 0.5) * seg.spread;
            const oy = (rng() - 0.5) * seg.spread;
            out.push({
                x: p.x + ox,
                y: p.y + oy,
                rotate: rng() * 360,
                scale: 0.5 + rng() * 0.6,
                fill: BLOSSOM_FILLS[Math.floor(rng() * BLOSSOM_FILLS.length)],
                opacity: 0.85 + rng() * 0.15,
            });
        }
    }

    return out;
}

function generateFallenPetals(): Blossom[] {
    const rng = mulberry32(67);
    const out: Blossom[] = [];
    for (let i = 0; i < 30; i++) {
        out.push({
            x: rng() * 1600,
            y: 20 + rng() * 50,
            rotate: rng() * 360,
            scale: 0.55 + rng() * 0.45,
            fill: BLOSSOM_FILLS[Math.floor(rng() * BLOSSOM_FILLS.length)],
            opacity: 0.5 + rng() * 0.3,
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
