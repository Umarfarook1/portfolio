"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type RGB = [number, number, number];

const PLASMA_STOPS: { t: number; c: RGB }[] = [
  { t: 0.0, c: hexToRgb("#0d0887") },
  { t: 0.2, c: hexToRgb("#5c01a6") },
  { t: 0.4, c: hexToRgb("#9c179e") },
  { t: 0.6, c: hexToRgb("#cc4778") },
  { t: 0.75, c: hexToRgb("#ed7953") },
  { t: 0.9, c: hexToRgb("#fdb42f") },
  { t: 1.0, c: hexToRgb("#f0f921") },
];

function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

// Piecewise-linear lerp across the plasma stops, t clamped to 0..1.
function plasma(t: number): RGB {
  const x = Math.min(1, Math.max(0, t));
  for (let i = 0; i < PLASMA_STOPS.length - 1; i++) {
    const a = PLASMA_STOPS[i];
    const b = PLASMA_STOPS[i + 1];
    if (x >= a.t && x <= b.t) {
      const f = (x - a.t) / (b.t - a.t || 1);
      return [
        a.c[0] + (b.c[0] - a.c[0]) * f,
        a.c[1] + (b.c[1] - a.c[1]) * f,
        a.c[2] + (b.c[2] - a.c[2]) * f,
      ];
    }
  }
  return PLASMA_STOPS[PLASMA_STOPS.length - 1].c;
}

const POINT_COUNT = 4200;
const CLUSTER_COUNT = 7;
const SPHERE_RADIUS = 2.6;
const CLUSTER_STD = 0.55;

// Box-Muller standard normal sample.
function randn(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function buildSprite(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.65)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function LatentPoints({ animate }: { animate: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  const sprite = useMemo(() => buildSprite(), []);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);

    // Centroids on a loose sphere using a golden-angle distribution.
    const centroids: RGB[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < CLUSTER_COUNT; i++) {
      const y = 1 - (i / (CLUSTER_COUNT - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const wobble = 0.85 + Math.random() * 0.3;
      centroids.push([
        Math.cos(theta) * r * SPHERE_RADIUS * wobble,
        y * SPHERE_RADIUS * wobble,
        Math.sin(theta) * r * SPHERE_RADIUS * wobble,
      ]);
    }

    for (let i = 0; i < POINT_COUNT; i++) {
      const cluster = i % CLUSTER_COUNT;
      const cen = centroids[cluster];
      const px = cen[0] + randn() * CLUSTER_STD + (Math.random() - 0.5) * 0.18;
      const py = cen[1] + randn() * CLUSTER_STD + (Math.random() - 0.5) * 0.18;
      const pz = cen[2] + randn() * CLUSTER_STD + (Math.random() - 0.5) * 0.18;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      // Color driven mostly by cluster index, nudged by radial distance.
      const radial = Math.min(1, Math.sqrt(px * px + py * py + pz * pz) / (SPHERE_RADIUS + 1.4));
      const t = (cluster / (CLUSTER_COUNT - 1)) * 0.82 + radial * 0.18;
      const [r, g, b] = plasma(t);
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }

    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (!animate || !groupRef.current) return;
    const g = groupRef.current;
    g.rotation.y += delta * 0.04;
    g.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.05;

    // Subtle pointer parallax eased toward the normalized cursor.
    const targetY = state.pointer.x * 0.35;
    const targetX = -state.pointer.y * 0.25;
    g.rotation.y += (g.rotation.y + targetY - g.rotation.y) * 0;
    g.rotation.z += (targetX - g.rotation.z) * 0.03;

    // Gentle breathing scale, kept tiny and free (no extra draw call).
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.015;
    g.scale.setScalar(s);
  });

  const staticRotation: [number, number, number] = animate ? [0, 0, 0] : [0.3, 0.5, 0];

  return (
    <group ref={groupRef} rotation={staticRotation}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={POINT_COUNT}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={POINT_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          map={sprite}
          alphaTest={0.01}
        />
      </points>
    </group>
  );
}

export default function LatentField({ animate = true }: { animate?: boolean }) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 7.2], fov: 55 }}
      frameloop="always"
    >
      <LatentPoints animate={animate} />
    </Canvas>
  );
}
