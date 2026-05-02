"use client";

/**
 * Mountains as silhouettes against the moonlit sky.
 * Two layers (distant haze + main range), continuous mountain mass with
 * varied peak heights, subtle moonlight ridge highlights instead of geometric snow caps.
 */
export function Mountains() {
    return (
        <div
            aria-hidden
            className="pointer-events-none fixed inset-x-0 bottom-0 z-[-1] h-[55vh] select-none"
        >
            <svg
                viewBox="0 0 1600 600"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
            >
                <defs>
                    <linearGradient id="distGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#322d27" stopOpacity="0.55" />
                        <stop offset="60%" stopColor="#1a1815" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#0a0907" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="mainGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1c1916" />
                        <stop offset="35%" stopColor="#0e0c0a" />
                        <stop offset="100%" stopColor="#020201" />
                    </linearGradient>
                </defs>

                {/* DISTANT HAZE: low subtle range, fades into sky */}
                <path
                    d={buildRidge(DISTANT_RIDGE, 600)}
                    fill="url(#distGrad)"
                />

                {/* MAIN RANGE: tall, dramatic silhouette with continuous mass */}
                <path d={buildRidge(MAIN_RIDGE, 600)} fill="url(#mainGrad)" />

                {/* Moonlight ridge highlights — thin lines on the tops of front peaks */}
                {MAIN_RIDGE.map((p, i) => {
                    if (i === 0) return null;
                    const prev = MAIN_RIDGE[i - 1];
                    // Only highlight when ridge is rising into a peak (left slope of peak)
                    if (p.y > prev.y - 5) return null;
                    const peakX = p.x;
                    const peakY = p.y;
                    return (
                        <path
                            key={`hl-${i}`}
                            d={`M${peakX - 50} ${peakY + 35} Q${peakX - 20} ${peakY + 5} ${peakX} ${peakY + 1}`}
                            stroke="rgba(220, 215, 200, 0.28)"
                            strokeWidth="1.2"
                            fill="none"
                        />
                    );
                })}

                {/* Forest base — dark band hugging the bottom (suggests treeline) */}
                <rect x="0" y="540" width="1600" height="60" fill="#000000" opacity="0.5" />
            </svg>
        </div>
    );
}

interface RidgePoint {
    x: number;
    y: number;
}

/**
 * Build a smooth bezier ridge from a list of points.
 * Closes path along the bottom of the canvas to form a filled silhouette.
 */
function buildRidge(points: RidgePoint[], baseY: number): string {
    if (points.length === 0) return "";

    const segs: string[] = [];
    segs.push(`M-50 ${baseY}`);
    segs.push(`L-50 ${points[0].y}`);
    segs.push(`L${points[0].x} ${points[0].y}`);

    for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        const dx = b.x - a.x;
        // Catmull-rom-ish smoothing via cubic bezier
        const c1x = a.x + dx * 0.4;
        const c1y = a.y;
        const c2x = b.x - dx * 0.4;
        const c2y = b.y;
        segs.push(`C${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`);
    }

    const last = points[points.length - 1];
    segs.push(`L1650 ${last.y}`);
    segs.push(`L1650 ${baseY}`);
    segs.push("Z");

    return segs.join(" ");
}

/**
 * DISTANT RIDGE: subtle, low rolling silhouette of far-away mountains,
 * mostly hugging the horizon. Hazy, fades into sky.
 */
const DISTANT_RIDGE: RidgePoint[] = [
    { x: 0, y: 320 },
    { x: 80, y: 290 },
    { x: 170, y: 310 },
    { x: 260, y: 270 },
    { x: 340, y: 295 },
    { x: 430, y: 250 },
    { x: 530, y: 285 },
    { x: 630, y: 245 },
    { x: 720, y: 280 },
    { x: 820, y: 235 },
    { x: 920, y: 270 },
    { x: 1020, y: 240 },
    { x: 1120, y: 285 },
    { x: 1220, y: 250 },
    { x: 1310, y: 275 },
    { x: 1410, y: 245 },
    { x: 1510, y: 275 },
    { x: 1600, y: 290 },
];

/**
 * MAIN RIDGE: dominant mountain mass.
 * Heights vary dramatically - some massive peaks, some shoulders, some valleys.
 * Read like a real mountain range silhouette: continuous, jagged, no gaps.
 */
const MAIN_RIDGE: RidgePoint[] = [
    { x: 0, y: 460 },
    { x: 70, y: 420 },     // foothill
    { x: 150, y: 380 },    // rising
    { x: 230, y: 280 },    // ridge
    { x: 300, y: 320 },    // saddle
    { x: 380, y: 200 },    // BIG PEAK 1
    { x: 460, y: 290 },    // saddle dropping
    { x: 540, y: 330 },    // valley
    { x: 620, y: 260 },    // shoulder rising
    { x: 700, y: 180 },    // PEAK 2 (massive)
    { x: 780, y: 240 },    // descending shoulder
    { x: 860, y: 320 },    // valley
    { x: 940, y: 290 },    // small peak
    { x: 1010, y: 340 },   // saddle
    { x: 1090, y: 230 },   // PEAK 3
    { x: 1180, y: 300 },   // shoulder
    { x: 1260, y: 360 },   // valley
    { x: 1340, y: 280 },   // ridge
    { x: 1430, y: 350 },   // saddle
    { x: 1510, y: 310 },   // small peak
    { x: 1600, y: 380 },   // descend
];
