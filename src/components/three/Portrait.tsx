"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Buffers {
  live: Float32Array;
  target: Float32Array;
  colors: Float32Array;
  count: number;
  key: string;
}

function buildSprite(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.5, "rgba(255,255,255,0.65)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// Read the image, drop the flat background, and turn the remaining pixels into a
// depth-displaced point cloud that starts scattered and assembles into the figure.
function usePortrait(src: string, sampleW: number, depth: number): Buffers | null {
  const [buf, setBuf] = useState<Buffers | null>(null);

  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const w = sampleW;
      const h = Math.max(1, Math.round((w * img.height) / img.width));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;

      // Background colour = mean of the four corners.
      const corner = (x: number, y: number) => {
        const i = (y * w + x) * 4;
        return [data[i], data[i + 1], data[i + 2]] as const;
      };
      const cs = [corner(0, 0), corner(w - 1, 0), corner(0, h - 1), corner(w - 1, h - 1)];
      const bg = [0, 0, 0];
      for (const c of cs) {
        bg[0] += c[0];
        bg[1] += c[1];
        bg[2] += c[2];
      }
      bg[0] /= 4;
      bg[1] /= 4;
      bg[2] /= 4;

      const aspect = h / w;
      const planeW = 5;
      const planeH = planeW * aspect;
      const pos: number[] = [];
      const col: number[] = [];

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 128) continue;
          const dBg = Math.hypot(r - bg[0], g - bg[1], b - bg[2]);
          if (dBg < 62) continue; // drop the flat background
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          pos.push(
            (x / (w - 1) - 0.5) * planeW,
            -(y / (h - 1) - 0.5) * planeH,
            (0.5 - lum) * depth,
          );
          // Two-drum stipple: ink shades with every ~12th dot printed in the
          // press-blue drawing ink, like a cyanotype plate showing through.
          if (pos.length % 36 === 0) {
            col.push(0.05, 0.38, 0.65);
          } else {
            // Gamma curve keeps midtones dark enough to read on paper.
            const shade = 0.08 + Math.pow(lum, 1.4) * 0.5;
            col.push(shade, shade * 0.98, shade * 0.95);
          }
        }
      }

      const count = pos.length / 3;
      const target = new Float32Array(pos);
      const colors = new Float32Array(col);
      const live = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const radius = 2.4 + Math.random() * 2.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        live[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        live[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        live[i * 3 + 2] = radius * Math.cos(phi);
      }

      if (alive) setBuf({ live, target, colors, count, key: `${w}x${h}-${count}` });
    };
    return () => {
      alive = false;
    };
  }, [src, sampleW, depth]);

  return buf;
}

function PortraitPoints({
  src,
  sampleW,
  depth,
  pointSize,
  animate,
}: {
  src: string;
  sampleW: number;
  depth: number;
  pointSize: number;
  animate: boolean;
}) {
  const buf = usePortrait(src, sampleW, depth);
  const groupRef = useRef<THREE.Group>(null);
  const geomRef = useRef<THREE.BufferGeometry>(null);
  const sprite = useMemo(() => buildSprite(), []);
  const elapsed = useRef(0);
  const settled = useRef(false);

  useFrame((state, delta) => {
    if (!buf) return;

    // Assemble: ease live positions toward the target, then stop writing.
    if (!settled.current) {
      if (!animate) {
        buf.live.set(buf.target);
        settled.current = true;
      } else {
        elapsed.current += delta;
        const k = 1 - Math.exp(-delta * 2.6);
        const live = buf.live;
        const tgt = buf.target;
        for (let i = 0; i < live.length; i++) live[i] += (tgt[i] - live[i]) * k;
        if (elapsed.current > 3.2) {
          buf.live.set(buf.target);
          settled.current = true;
        }
      }
      const attr = geomRef.current?.attributes.position as THREE.BufferAttribute | undefined;
      if (attr) attr.needsUpdate = true;
    }

    const g = groupRef.current;
    if (g) {
      const sway = animate ? Math.sin(state.clock.elapsedTime * 0.35) * 0.16 : 0;
      const targetY = sway + state.pointer.x * 0.32;
      const targetX = -state.pointer.y * 0.18;
      g.rotation.y += (targetY - g.rotation.y) * 0.05;
      g.rotation.x += (targetX - g.rotation.x) * 0.05;
    }
  });

  if (!buf) return null;

  return (
    <group ref={groupRef}>
      <points key={buf.key}>
        <bufferGeometry ref={geomRef}>
          <bufferAttribute attach="attributes-position" args={[buf.live, 3]} count={buf.count} />
          <bufferAttribute attach="attributes-color" args={[buf.colors, 3]} count={buf.count} />
        </bufferGeometry>
        <pointsMaterial
          size={pointSize}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.96}
          depthWrite={false}
          map={sprite}
          alphaTest={0.02}
        />
      </points>
    </group>
  );
}

export default function Portrait({
  src = "/avatar.jpg",
  sampleW = 120,
  depth = 0.7,
  pointSize = 0.034,
  animate = true,
}: {
  src?: string;
  sampleW?: number;
  depth?: number;
  pointSize?: number;
  animate?: boolean;
}) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      frameloop="always"
    >
      <PortraitPoints src={src} sampleW={sampleW} depth={depth} pointSize={pointSize} animate={animate} />
    </Canvas>
  );
}
