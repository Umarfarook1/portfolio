"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type RGB = [number, number, number];

// Categorical scatter palette that reads as a printed embedding figure on paper.
const CATEGORY = ["#1c1b22", "#3a36c4", "#d72660", "#0e8f8f", "#e8732b", "#7a3ff2", "#a86a00"];

function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const COLORS = CATEGORY.map(hexToRgb);

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
  g.addColorStop(0.45, "rgba(255,255,255,0.7)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

const SPHERE_RADIUS = 2.6;
const CLUSTER_STD = 0.55;

function LatentPoints({
  count,
  pointSize,
  animate,
}: {
  count: number;
  pointSize: number;
  animate: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const sprite = useMemo(() => buildSprite(), []);
  const clusterCount = COLORS.length;

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const centroids: RGB[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < clusterCount; i++) {
      const y = 1 - (i / (clusterCount - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const wobble = 0.85 + Math.random() * 0.3;
      centroids.push([
        Math.cos(theta) * r * SPHERE_RADIUS * wobble,
        y * SPHERE_RADIUS * wobble,
        Math.sin(theta) * r * SPHERE_RADIUS * wobble,
      ]);
    }

    for (let i = 0; i < count; i++) {
      const cluster = i % clusterCount;
      const cen = centroids[cluster];
      const px = cen[0] + randn() * CLUSTER_STD + (Math.random() - 0.5) * 0.16;
      const py = cen[1] + randn() * CLUSTER_STD + (Math.random() - 0.5) * 0.16;
      const pz = cen[2] + randn() * CLUSTER_STD + (Math.random() - 0.5) * 0.16;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      // Slight per-point value variation so clusters read with depth.
      const shade = 0.78 + Math.random() * 0.22;
      const c = COLORS[cluster];
      colors[i * 3] = c[0] * shade;
      colors[i * 3 + 1] = c[1] * shade;
      colors[i * 3 + 2] = c[2] * shade;
    }

    return { positions, colors };
  }, [count, clusterCount]);

  useFrame((state, delta) => {
    if (!animate || !groupRef.current) return;
    const g = groupRef.current;
    g.rotation.y += delta * 0.045;
    g.rotation.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.06;
    const targetZ = state.pointer.x * 0.18;
    g.rotation.z += (targetZ - g.rotation.z) * 0.03;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.012;
    g.scale.setScalar(s);
  });

  const staticRotation: [number, number, number] = animate ? [0, 0, 0] : [0.3, 0.5, 0];

  return (
    <group ref={groupRef} rotation={staticRotation}>
      <points key={count}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
        </bufferGeometry>
        <pointsMaterial
          size={pointSize}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.92}
          depthWrite={false}
          map={sprite}
          alphaTest={0.02}
        />
      </points>
    </group>
  );
}

export default function LatentField({
  count = 4200,
  pointSize = 0.06,
  animate = true,
}: {
  count?: number;
  pointSize?: number;
  animate?: boolean;
}) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 7.2], fov: 50 }}
      frameloop="always"
    >
      <LatentPoints count={count} pointSize={pointSize} animate={animate} />
    </Canvas>
  );
}
