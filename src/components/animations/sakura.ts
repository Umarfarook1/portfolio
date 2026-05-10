/**
 * Sakura petal + flower SVG paths.
 * Centered on origin. Petal points UP (negative Y).
 */

/** Single cherry blossom petal with heart-shaped tip */
export const PETAL =
    "M0 -10 " +
    "C 4 -9 6 -5 5 -1 " +
    "C 4 1 1 1 0 -1 " +
    "C -1 1 -4 1 -5 -1 " +
    "C -6 -5 -4 -9 0 -10 " +
    "Z";

/** A whole 5-petal cherry blossom flower */
export function flowerPath(): string {
    // Build path with 5 rotated petals
    const parts: string[] = [];
    for (let i = 0; i < 5; i++) {
        const angle = (i * 72 * Math.PI) / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // Rotate the petal points
        const pts = [
            { x: 0, y: -10 },
            { x: 4, y: -9 },
            { x: 6, y: -5 },
            { x: 5, y: -1 },
            { x: 4, y: 1 },
            { x: 1, y: 1 },
            { x: 0, y: -1 },
            { x: -1, y: 1 },
            { x: -4, y: 1 },
            { x: -5, y: -1 },
            { x: -6, y: -5 },
            { x: -4, y: -9 },
        ].map(p => ({
            x: p.x * cos - p.y * sin,
            y: p.x * sin + p.y * cos,
        }));

        parts.push(`M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`);
        parts.push(
            `C ${pts[1].x.toFixed(1)} ${pts[1].y.toFixed(1)} ${pts[2].x.toFixed(1)} ${pts[2].y.toFixed(1)} ${pts[3].x.toFixed(1)} ${pts[3].y.toFixed(1)}`,
        );
        parts.push(
            `C ${pts[4].x.toFixed(1)} ${pts[4].y.toFixed(1)} ${pts[5].x.toFixed(1)} ${pts[5].y.toFixed(1)} ${pts[6].x.toFixed(1)} ${pts[6].y.toFixed(1)}`,
        );
        parts.push(
            `C ${pts[7].x.toFixed(1)} ${pts[7].y.toFixed(1)} ${pts[8].x.toFixed(1)} ${pts[8].y.toFixed(1)} ${pts[9].x.toFixed(1)} ${pts[9].y.toFixed(1)}`,
        );
        parts.push(
            `C ${pts[10].x.toFixed(1)} ${pts[10].y.toFixed(1)} ${pts[11].x.toFixed(1)} ${pts[11].y.toFixed(1)} ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`,
        );
        parts.push("Z");
    }
    return parts.join(" ");
}

export const FLOWER = flowerPath();
