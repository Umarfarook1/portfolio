"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Rise } from "@/components/ui/Rise";
import { TokenStream } from "@/components/ui/TokenStream";
import { springFollow } from "@/lib/motion";

type Mode = "tokens" | "table" | "heatmap" | "cite" | "scatter" | "flatline" | "boxes";

const projects: {
  title: string;
  type: string;
  metric: string;
  year: string;
  repo: string;
  mode: Mode;
}[] = [
  {
    title: "Cargo Concierge",
    type: "agentic product",
    metric: "80% strict extraction · ~$0.002/quote",
    year: "2025",
    repo: "https://github.com/Umarfarook1/Cargo-Concierge",
    mode: "tokens",
  },
  {
    title: "mcp-bigquery-evals",
    type: "open-source infra · PyPI",
    metric: "100 MB cost cap · 7 MCP tools",
    year: "2025",
    repo: "https://github.com/Umarfarook1/mcp-bigquery-evals",
    mode: "table",
  },
  {
    title: "TrustBench",
    type: "evaluation system",
    metric: "6 trust dimensions · calibrated judges",
    year: "2025",
    repo: "https://github.com/Umarfarook1/trustbench",
    mode: "heatmap",
  },
  {
    title: "RAG Document QA",
    type: "retrieval system",
    metric: "Recall@K + MRR harness",
    year: "2025",
    repo: "https://github.com/Umarfarook1/rag-document-qa",
    mode: "cite",
  },
  {
    title: "License Plate Privacy Blurring",
    type: "computer vision",
    metric: "mAP@0.5 0.782 · ~4.1 ms",
    year: "2026",
    repo: "https://github.com/Umarfarook1/street-view-plate-blurring",
    mode: "boxes",
  },
  {
    title: "IPL Franchise Analytics",
    type: "data analysis",
    metric: "1,095 matches · 17 seasons",
    year: "2026",
    repo: "https://github.com/Umarfarook1/ipl-data-analysis",
    mode: "scatter",
  },
  {
    title: "Shorts Performance Prediction",
    type: "ML analysis · negative result",
    metric: "p = 0.955 · no signal, published anyway",
    year: "2026",
    repo: "https://github.com/Umarfarook1/youtube-shorts-performance-prediction",
    mode: "flatline",
  },
];

// Canvas ramp: the inferno tokens, hex-approximated for 2D canvas.
const C = {
  bg: "#1c1524",
  dim: "#3a2c44",
  lo: "#a89583",
  crimson: "#d23a34",
  ember: "#f09b4e",
  solar: "#f0d878",
};

// Each project's hover preview is a generated rendering of its real artifact
// type: token streams, cost-capped SQL, eval heatmaps, citations, detections,
// clusters, and one honest flatline. No fake screenshots.
function drawFrame(ctx: CanvasRenderingContext2D, mode: Mode, t: number, w: number, h: number) {
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, w, h);
  ctx.font = "10px monospace";

  // Deterministic pseudo-random per slot: stable layouts, animated phase.
  const rnd = (i: number) => {
    const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };

  if (mode === "tokens") {
    const lines = 8;
    for (let li = 0; li < lines; li++) {
      const y = 24 + li * 24;
      let x = 18;
      const n = 4 + Math.floor(rnd(li) * 5);
      for (let wi = 0; wi < n; wi++) {
        const wordW = 14 + rnd(li * 17 + wi) * 42;
        // Stream in: each token appears on its own tick, looping.
        const appear = (li * n + wi) * 0.09;
        const cycle = (t * 0.35) % (lines * n * 0.09 + 1.6);
        if (cycle > appear) {
          const isHot = rnd(li * 31 + wi * 7) > 0.82;
          const fresh = cycle - appear < 0.35;
          ctx.fillStyle = fresh ? C.solar : isHot ? C.ember : C.dim;
          ctx.fillRect(x, y, wordW, 9);
        }
        x += wordW + 7;
        if (x > w - 40) break;
      }
    }
    ctx.fillStyle = C.lo;
    ctx.fillText("streaming pipeline stages · live", 18, h - 14);
  }

  if (mode === "table") {
    const q = ["SELECT brand, SUM(spend)", "FROM ads.meta_daily", "WHERE country = 'SE'", "GROUP BY 1 ORDER BY 2 DESC"];
    q.forEach((line, i) => {
      ctx.fillStyle = C.lo;
      ctx.fillText(line, 18, 28 + i * 16);
    });
    // Dry-run cost bar vs the hard cap.
    const capX = w - 66;
    const fill = Math.min((Math.sin(t * 0.8) * 0.5 + 0.5) * 0.62, 0.62);
    ctx.fillStyle = C.dim;
    ctx.fillRect(18, 118, w - 96, 8);
    ctx.fillStyle = fill > 0.55 ? C.ember : C.solar;
    ctx.fillRect(18, 118, (w - 96) * fill, 8);
    ctx.fillStyle = C.crimson;
    ctx.fillRect(capX - 12, 112, 2, 20);
    ctx.fillStyle = C.lo;
    ctx.fillText(`dry-run ${(fill * 160).toFixed(0)} MB`, 18, 148);
    ctx.fillStyle = C.crimson;
    ctx.fillText("cap 100 MB", capX - 12, 148);
    ctx.fillStyle = C.solar;
    ctx.fillText("✓ query allowed", 18, h - 14);
  }

  if (mode === "heatmap") {
    const cols = 12;
    const rows = 6;
    const cw = (w - 36) / cols;
    const ch = (h - 60) / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v = rnd(r * 31 + c);
        const sweep = ((t * 0.5) % 1.4) * cols * 1.4 - r * 0.8;
        const on = sweep > c;
        const heat = on ? v : 0.06;
        ctx.fillStyle =
          heat > 0.75 ? C.solar : heat > 0.5 ? C.ember : heat > 0.25 ? C.crimson : C.dim;
        ctx.globalAlpha = on ? 0.9 : 0.35;
        ctx.fillRect(18 + c * cw, 20 + r * ch, cw - 2, ch - 2);
      }
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = C.lo;
    ctx.fillText("6 trust dimensions × ticket slices", 18, h - 14);
  }

  if (mode === "cite") {
    for (let li = 0; li < 8; li++) {
      const y = 22 + li * 15;
      ctx.fillStyle = li === 3 || li === 4 ? C.ember : C.dim;
      ctx.fillRect(18, y, (0.5 + rnd(li) * 0.4) * (w - 130), 7);
    }
    // Source panel + citation line drawing to it.
    ctx.strokeStyle = C.dim;
    ctx.strokeRect(w - 96, 22, 78, 100);
    const p = (Math.sin(t * 1.2) + 1) / 2;
    ctx.strokeStyle = C.solar;
    ctx.beginPath();
    ctx.moveTo(18 + (w - 130) * 0.6, 74);
    ctx.lineTo(18 + (w - 130) * 0.6 + (w - 96 - 18 - (w - 130) * 0.6) * p, 74 - 10 * p);
    ctx.stroke();
    ctx.fillStyle = C.solar;
    ctx.fillText("[3]", w - 88, 40);
    ctx.fillStyle = C.lo;
    ctx.fillText("grounded answer · citation [3]", 18, h - 14);
  }

  if (mode === "scatter") {
    const centers = [
      [w * 0.3, h * 0.38],
      [w * 0.62, h * 0.3],
      [w * 0.5, h * 0.62],
    ];
    const colors = [C.crimson, C.ember, C.solar];
    for (let i = 0; i < 90; i++) {
      const cl = i % 3;
      const gather = Math.min(1, (t * 0.4) % 2.4);
      const bx = centers[cl][0] + (rnd(i) - 0.5) * 60;
      const by = centers[cl][1] + (rnd(i * 3) - 0.5) * 44;
      const sx = rnd(i * 7) * w;
      const sy = rnd(i * 11) * h;
      const x = sx + (bx - sx) * gather;
      const y = sy + (by - sy) * gather;
      ctx.fillStyle = colors[cl];
      ctx.globalAlpha = 0.85;
      ctx.fillRect(x, y, 3, 3);
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = C.lo;
    ctx.fillText("PCA team clusters · 17 seasons", 18, h - 14);
  }

  if (mode === "flatline") {
    ctx.strokeStyle = C.dim;
    ctx.beginPath();
    ctx.moveTo(18, h * 0.5);
    ctx.lineTo(w - 18, h * 0.5);
    ctx.stroke();
    ctx.strokeStyle = C.ember;
    ctx.beginPath();
    for (let x = 18; x < w - 18; x += 3) {
      const y = h * 0.5 + Math.sin(x * 0.3 + t * 2) * 2.5 + (rnd(x) - 0.5) * 3;
      if (x === 18) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = C.lo;
    ctx.fillText("macro-F1 0.334 vs 0.333 baseline", 18, h - 30);
    ctx.fillStyle = C.solar;
    ctx.fillText("p = 0.955 · no signal · published anyway", 18, h - 14);
  }

  if (mode === "boxes") {
    // Drifting street-scene dot field with detectors locked on.
    for (let i = 0; i < 130; i++) {
      const x = (rnd(i) * w + t * 14) % w;
      const y = rnd(i * 3) * h;
      ctx.fillStyle = C.dim;
      ctx.fillRect(x, y, 2, 2);
    }
    const boxes = [
      [0.22, 0.55, 74, 26, 0.91],
      [0.6, 0.34, 62, 22, 0.84],
    ] as const;
    boxes.forEach(([fx, fy, bw, bh, conf], i) => {
      const x = ((fx * w + t * 14) % w) - 10;
      const y = fy * h + Math.sin(t + i * 2) * 4;
      ctx.strokeStyle = C.ember;
      ctx.strokeRect(x, y, bw, bh);
      ctx.fillStyle = C.ember;
      ctx.fillRect(x, y - 12, 44, 12);
      ctx.fillStyle = C.bg;
      ctx.fillText(`${conf}`, x + 4, y - 3);
      // The point: the plate gets blurred.
      ctx.fillStyle = C.dim;
      ctx.fillRect(x + 2, y + 2, bw - 4, bh - 4);
    });
    ctx.fillStyle = C.lo;
    ctx.fillText("detect → box-scaled blur · YOLOv8n", 18, h - 14);
  }
}

function PreviewCanvas({ mode }: { mode: Mode }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = 400;
    const h = 240;
    canvas.width = w * 2;
    canvas.height = h * 2;
    ctx.scale(2, 2);

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      drawFrame(ctx, mode, (now - start) / 1000, w, h);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  return <canvas ref={ref} style={{ width: 400, height: 240 }} aria-hidden="true" />;
}

export function Work() {
  const [hovered, setHovered] = useState<Mode | null>(null);
  const [fine, setFine] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, springFollow);
  const sy = useSpring(my, springFollow);

  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!fine) return;
    const move = (e: PointerEvent) => {
      mx.set(e.clientX + 28);
      my.set(e.clientY - 130);
    };
    // Scrolling slides rows out from under the pointer without a mouseleave;
    // never strand the panel.
    const clear = () => setHovered(null);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", clear, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", clear);
    };
  }, [fine, mx, my]);

  return (
    <section id="work" className="relative py-28 sm:py-36">
      <div className="shell">
        <div className="flex items-baseline justify-between border-b border-line pb-5">
          <p className="mono-label text-lo">02 / work</p>
          <p className="mono-label hidden text-lo/60 sm:block">hover a row · open the repo</p>
        </div>

        <TokenStream
          text="Case studies with harnesses."
          wonkWord="harnesses."
          className="display mt-10 max-w-3xl text-[clamp(2rem,4.5vw,3.6rem)] text-hi"
        />

        <ol className="mt-14">
          {projects.map((p, i) => (
            <Rise key={p.title} delay={Math.min(i * 0.04, 0.2)}>
              <li className="border-b border-line first:border-t">
                <Link
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="row-heat group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-6 text-hi sm:grid-cols-[3.5rem_1fr_auto] sm:py-7"
                  onMouseEnter={() => setHovered(p.mode)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="mono-label tabular text-lo/60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display text-[clamp(1.7rem,4vw,3.2rem)] leading-tight">{p.title}</span>
                  <span className="col-start-2 flex flex-wrap items-baseline gap-x-5 sm:col-start-3 sm:text-right">
                    <span className="mono-label text-lo">{p.type}</span>
                    <span className="mono-label text-ember">{p.metric}</span>
                    <span className="mono-label text-lo/60">{p.year} ↗</span>
                  </span>
                </Link>
              </li>
            </Rise>
          ))}
        </ol>

        <Rise className="mt-10">
          <Link
            href="https://github.com/Umarfarook1"
            target="_blank"
            rel="noreferrer"
            className="navlink mono-label"
          >
            every repo → github.com/Umarfarook1 ↗
          </Link>
        </Rise>
      </div>

      {/* Cursor-following artifact preview: spring-lagged, fine pointers only. */}
      {fine && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-40 overflow-hidden rounded-[8px] border border-line bg-panel"
          style={{ x: sx, y: sy }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.96 }}
          transition={{ duration: 0.2 }}
        >
          {hovered && <PreviewCanvas mode={hovered} />}
        </motion.div>
      )}
    </section>
  );
}
