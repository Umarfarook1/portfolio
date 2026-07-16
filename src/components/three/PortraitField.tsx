"use client";

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// GRADIENT DESCENT centerpiece: the self-portrait as a diffusion inference.
// ~n0k points open as Gaussian noise and denoise into the face (uProgress),
// disperse back toward noise as the hero scrolls away (uScroll), and repel
// from the cursor (uMouse). Every point's color is sampled from the inferno
// colormap — the palette of every training log — by local luminance and
// convergence. One draw call; the entrance runs once per session.

const VERT = /* glsl */ `
attribute vec3 aStart;
attribute float aRand;
attribute float aLum;
uniform float uProgress;
uniform float uScroll;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseK;
uniform float uSize;
uniform float uScale;
varying float vT;
varying float vFade;

void main() {
  // Staggered per-point convergence: late points keep churning while early
  // ones have settled — the whole face never snaps.
  float p = clamp(uProgress * 1.35 - aRand * 0.35, 0.0, 1.0);
  p = 1.0 - pow(1.0 - p, 3.0);
  vec3 pos = mix(aStart, position, p);

  // Scroll disperses the converged face back toward noise, scrubbed 1:1.
  pos = mix(pos, aStart * 1.35, uScroll);

  // Idle drift: the cloud breathes but never rests still.
  pos.x += sin(uTime * 0.5 + aRand * 40.0) * 0.014;
  pos.y += cos(uTime * 0.45 + aRand * 55.0) * 0.014;

  // Cursor repulsion in plane space.
  vec2 d = pos.xy - uMouse;
  float dist = length(d);
  vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
  pos.xy += dir * exp(-dist * 2.6) * 0.42 * uMouseK;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  // Standard perspective point sizing: world size * (half canvas height in
  // physical px) / depth. uScale tracks the drawing buffer on resize.
  gl_PointSize = max(uSize * (0.75 + aRand * 0.5) * (uScale / -mv.z), 1.0);

  // Ramp coordinate: luminance carries heat, convergence ignites it, the
  // cursor adds local heat. A floor keeps shadow points visible plum-red
  // instead of vanishing into the void; highlights burn ember and solar.
  float heat = 0.16 + pow(aLum, 1.1) * 0.74;
  heat *= (0.3 + 0.7 * p);
  heat += exp(-dist * 3.0) * 0.28 * uMouseK;
  vT = clamp(heat, 0.0, 1.0);
  vFade = 0.55 + 0.45 * p;
}
`;

const FRAG = /* glsl */ `
precision mediump float;
uniform float uDim;
varying float vT;
varying float vFade;

// Inferno colormap, polynomial fit (Matt Zucker, CC0).
vec3 inferno(float t) {
  const vec3 c0 = vec3(0.0002189403691192265, 0.001651004631001012, -0.01948089843709184);
  const vec3 c1 = vec3(0.1065134194856116, 0.5639564367884091, 3.932712388889277);
  const vec3 c2 = vec3(11.60249308247187, -3.972853965665698, -15.9423941062914);
  const vec3 c3 = vec3(-41.70399613139459, 17.43639888205313, 44.35414519872813);
  const vec3 c4 = vec3(77.162935699427, -33.40235894210092, -81.80730925738993);
  const vec3 c5 = vec3(-71.31942824499214, 32.62606426397723, 73.20951985803202);
  const vec3 c6 = vec3(25.13112622477341, -12.24266895238567, -23.07032500287172);
  return c0 + t * (c1 + t * (c2 + t * (c3 + t * (c4 + t * (c5 + t * c6)))));
}

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float r = length(uv);
  float alpha = smoothstep(0.5, 0.1, r) * vFade * uDim;
  if (alpha < 0.01) discard;
  vec3 col = inferno(vT * 0.92 + 0.04) * 1.3;
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

interface CloudData {
  target: Float32Array;
  start: Float32Array;
  rand: Float32Array;
  lum: Float32Array;
  count: number;
  key: string;
}

function useCloud(src: string, sampleW: number): CloudData | null {
  const [data, setData] = useState<CloudData | null>(null);

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
      const px = ctx.getImageData(0, 0, w, h).data;

      // Background = mean of the four corners; drop pixels close to it.
      const corner = (x: number, y: number) => {
        const i = (y * w + x) * 4;
        return [px[i], px[i + 1], px[i + 2]] as const;
      };
      const cs = [corner(0, 0), corner(w - 1, 0), corner(0, h - 1), corner(w - 1, h - 1)];
      const bg = [0, 0, 0];
      for (const c of cs) {
        bg[0] += c[0] / 4;
        bg[1] += c[1] / 4;
        bg[2] += c[2] / 4;
      }

      const aspect = h / w;
      const planeW = 5.4;
      const planeH = planeW * aspect;
      const target: number[] = [];
      const lum: number[] = [];

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          if (px[i + 3] < 128) continue;
          const r = px[i];
          const g = px[i + 1];
          const b = px[i + 2];
          if (Math.hypot(r - bg[0], g - bg[1], b - bg[2]) < 62) continue;
          const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          target.push(
            (x / (w - 1) - 0.5) * planeW,
            -(y / (h - 1) - 0.5) * planeH,
            (0.5 - l) * 0.85,
          );
          lum.push(l);
        }
      }

      const count = target.length / 3;
      const start = new Float32Array(count * 3);
      const rand = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        // Gaussian-ish shell: the noise the face denoises out of.
        const radius = 2.6 + Math.random() * 2.6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        start[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        start[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        start[i * 3 + 2] = radius * Math.cos(phi) * 0.6;
        rand[i] = Math.random();
      }

      if (alive) {
        setData({
          target: new Float32Array(target),
          start,
          rand,
          lum: new Float32Array(lum),
          count,
          key: `${w}x${h}-${count}`,
        });
      }
    };
    return () => {
      alive = false;
    };
  }, [src, sampleW]);

  return data;
}

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function CloudPoints({
  src,
  sampleW,
  size,
  offsetX,
  dim,
  scrollRef,
  stepRef,
  animateIn,
  interactive,
  still,
}: {
  src: string;
  sampleW: number;
  size: number;
  offsetX: number;
  dim: number;
  scrollRef: MutableRefObject<number>;
  stepRef?: MutableRefObject<HTMLElement | null>;
  animateIn: boolean;
  interactive: boolean;
  still: boolean;
}) {
  const data = useCloud(src, sampleW);
  const groupRef = useRef<THREE.Group>(null);
  const startTime = useRef<number | null>(null);
  const lastStep = useRef(-1);
  const viewport = useThree((s) => s.viewport);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: animateIn ? 0 : 1 },
      uScroll: { value: 0 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(99, 99) },
      uMouseK: { value: 0 },
      uSize: { value: size },
      uScale: { value: 450 },
      uDim: { value: dim },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state, delta) => {
    if (!data) return;
    const u = uniforms;
    u.uScale.value = state.gl.domElement.height / 2;

    // Denoise: 2.2s expo-out, once per session. The counter beside the
    // headline counts THIS — honest telemetry, quantized to steps(14).
    if (animateIn) {
      if (startTime.current === null) startTime.current = state.clock.elapsedTime;
      const t = Math.min((state.clock.elapsedTime - startTime.current) / 2.2, 1);
      u.uProgress.value = easeOutExpo(t);
      if (stepRef?.current) {
        const step = Math.min(Math.floor(t * 14) / 14, 1);
        if (step !== lastStep.current) {
          lastStep.current = step;
          const n = Math.round(step * 1000);
          stepRef.current.textContent = `step ${String(n).padStart(4, "0")}/1000${n >= 1000 ? " · converged" : ""}`;
        }
      }
      if (t >= 1) {
        try {
          sessionStorage.setItem("gd-denoise", "1");
        } catch {}
      }
    } else if (stepRef?.current && lastStep.current < 0) {
      lastStep.current = 1;
      stepRef.current.textContent = "step 1000/1000 · converged";
    }

    if (!still) {
      u.uTime.value += delta;
      u.uScroll.value += (scrollRef.current - u.uScroll.value) * Math.min(1, delta * 8);

      if (interactive) {
        const px = (state.pointer.x * viewport.width) / 2 - offsetX;
        const py = (state.pointer.y * viewport.height) / 2;
        u.uMouse.value.x += (px - u.uMouse.value.x) * Math.min(1, delta * 7);
        u.uMouse.value.y += (py - u.uMouse.value.y) * Math.min(1, delta * 7);
        u.uMouseK.value += (1 - u.uMouseK.value) * Math.min(1, delta * 2);
      }

      const g = groupRef.current;
      if (g) {
        const ty = state.pointer.x * 0.1;
        const tx = -state.pointer.y * 0.06;
        g.rotation.y += (ty - g.rotation.y) * Math.min(1, delta * 4);
        g.rotation.x += (tx - g.rotation.x) * Math.min(1, delta * 4);
      }
    }
  });

  // Build the Points imperatively: our uniforms object must literally BE the
  // material's (prop-diffing can detach it), so useFrame mutations apply.
  const cloud = useMemo(() => {
    if (!data) return null;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(data.target, 3));
    geometry.setAttribute("aStart", new THREE.BufferAttribute(data.start, 3));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(data.rand, 1));
    geometry.setAttribute("aLum", new THREE.BufferAttribute(data.lum, 1));
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return new THREE.Points(geometry, material);
  }, [data, uniforms]);

  useEffect(() => {
    return () => {
      if (cloud) {
        cloud.geometry.dispose();
        (cloud.material as THREE.Material).dispose();
      }
    };
  }, [cloud]);

  if (!cloud) return null;

  return (
    <group ref={groupRef} position={[offsetX, 0, 0]}>
      <primitive object={cloud} />
    </group>
  );
}

export default function PortraitField({
  scrollRef,
  stepRef,
}: {
  scrollRef: MutableRefObject<number>;
  stepRef?: MutableRefObject<HTMLElement | null>;
}) {
  const [env, setEnv] = useState<{
    sampleW: number;
    size: number;
    offsetX: number;
    dim: number;
    animateIn: boolean;
    interactive: boolean;
    still: boolean;
  } | null>(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("gd-denoise") === "1";
    } catch {}
    setEnv({
      sampleW: mobile ? 110 : 165,
      // World-space point size, tuned to the sample spacing (5.4 / sampleW).
      size: mobile ? 0.062 : 0.048,
      offsetX: mobile ? 0 : 1.35,
      // Centered behind the copy on mobile: pull the glow back for legibility.
      dim: mobile ? 0.66 : 1,
      animateIn: !reduced && !seen,
      interactive: fine && !reduced,
      still: reduced,
    });
  }, []);

  if (!env) return null;

  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      frameloop={env.still ? "demand" : "always"}
    >
      <CloudPoints
        src="/avatar.jpg"
        sampleW={env.sampleW}
        size={env.size}
        offsetX={env.offsetX}
        dim={env.dim}
        scrollRef={scrollRef}
        stepRef={stepRef}
        animateIn={env.animateIn}
        interactive={env.interactive}
        still={env.still}
      />
    </Canvas>
  );
}
