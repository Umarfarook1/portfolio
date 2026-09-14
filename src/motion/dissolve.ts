/**
 * The route dissolve: a WebGL value-noise cover.
 *
 *   cover  uProgress 1.5 to -0.75, 0.85s, power1.in
 *   clear  uProgress -0.75 to 1.5, 0.70s, power1.out
 *
 * With no WebGL context, and under prefers-reduced-motion, the same cover runs
 * as a plain opacity cross-fade on the same mount, in the same colour: reduced
 * motion gets a gentler equivalent, not nothing.
 */
import { gsap, reduced, type Cleanup } from "./env";

const DISSOLVE_START = 1.5;
const DISSOLVE_END = -0.75;
const DISSOLVE_DUR = 0.85;
const DISSOLVE_EASE = "power1.in";
const CLEAR_DUR = 0.7;
const CLEAR_EASE = "power1.out";
const FADE_MS = 200;

const VERT = [
  "attribute vec2 aPosition;",
  "varying vec2 vUv;",
  "void main(){ vUv = aPosition * 0.5 + 0.5; gl_Position = vec4(aPosition, 0.0, 1.0); }",
].join("\n");

const FRAG = [
  "precision mediump float;",
  "varying vec2 vUv;",
  "uniform float uProgress;",
  "uniform vec3 uColor;",
  "float rand(vec2 n){ return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }",
  "float noise(vec2 p){",
  "  vec2 ip = floor(p); vec2 u = fract(p); u = u * u * (3.0 - 2.0 * u);",
  "  float a = rand(ip); float b = rand(ip + vec2(1.0, 0.0));",
  "  float c = rand(ip + vec2(0.0, 1.0)); float d = rand(ip + vec2(1.0, 1.0));",
  "  float res = mix(mix(a, b, u.x), mix(c, d, u.x), u.y); return res * res;",
  "}",
  "void main(){",
  "  float n = noise(vUv * 5.0);",
  "  float edge = 0.185;",
  "  float dissolve = smoothstep(1.0 - uProgress - edge, 1.0 - uProgress + edge, n);",
  "  gl_FragColor = vec4(uColor, 1.0 - dissolve);",
  "}",
].join("\n");

type GlState = {
  kind: "gl";
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  uProgress: WebGLUniformLocation | null;
  uColor: WebGLUniformLocation | null;
  progress: number;
  color: [number, number, number];
  tween: gsap.core.Tween | null;
  onResize: () => void;
};

type FadeState = {
  kind: "fade";
  el: HTMLElement;
  tween: gsap.core.Tween | null;
};

type State = GlState | FadeState;

let state: State | null = null;
let failed = false;

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const sh = gl.createShader(type);
  if (!sh) throw new Error("shader");
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    throw new Error("shader");
  }
  return sh;
}

function mountEl(): HTMLElement {
  return document.getElementById("dissolve-mount") || document.body;
}

function makeFade(): FadeState {
  const el = document.createElement("div");
  el.className = "dissolve-fallback";
  el.setAttribute("aria-hidden", "true");
  mountEl().appendChild(el);
  return { kind: "fade", el, tween: null };
}

function makeGl(): GlState {
  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;z-index:300;pointer-events:none;visibility:hidden;";
  mountEl().appendChild(canvas);
  const gl = (canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
  if (!gl) {
    canvas.remove();
    throw new Error("no webgl");
  }
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  const prog = gl.createProgram();
  if (!prog) throw new Error("program");
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link");
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "aPosition");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  function size() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    gl!.viewport(0, 0, canvas.width, canvas.height);
  }
  size();
  window.addEventListener("resize", size, { passive: true });
  return {
    kind: "gl",
    canvas,
    gl,
    program: prog,
    uProgress: gl.getUniformLocation(prog, "uProgress"),
    uColor: gl.getUniformLocation(prog, "uColor"),
    progress: DISSOLVE_START,
    color: [0, 0, 0],
    tween: null,
    onResize: size,
  };
}

function ready(): State | null {
  if (state) return state;
  if (failed) return null;
  if (reduced()) {
    state = makeFade();
    return state;
  }
  try {
    state = makeGl();
  } catch {
    try {
      state = makeFade();
    } catch {
      failed = true;
      return null;
    }
  }
  return state;
}

function draw(st: GlState): void {
  const gl = st.gl;
  gl.useProgram(st.program);
  gl.uniform1f(st.uProgress, st.progress);
  gl.uniform3f(st.uColor, st.color[0], st.color[1], st.color[2]);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function setColor(st: State, hex: string): void {
  if (st.kind === "fade") {
    st.el.style.setProperty("--dissolve-color", hex);
    return;
  }
  st.color = [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  ];
}

export function dissolveCover(hex: string, done?: () => void): void {
  const st = ready();
  if (!st) {
    if (done) done();
    return;
  }
  setColor(st, hex);
  if (st.tween) st.tween.kill();
  if (st.kind === "fade") {
    st.el.style.visibility = "visible";
    /* animates from the live opacity, so a second navigation part-way through
       a cover carries on from where the screen actually is */
    st.tween = gsap.to(st.el, {
      opacity: 1,
      duration: reduced() ? FADE_MS / 1000 : DISSOLVE_DUR,
      ease: reduced() ? "none" : DISSOLVE_EASE,
      overwrite: "auto",
      onComplete: () => {
        st.tween = null;
        if (done) done();
      },
    });
    return;
  }
  st.canvas.style.visibility = "visible";
  st.progress = DISSOLVE_START;
  draw(st);
  st.tween = gsap.to(st, {
    progress: DISSOLVE_END,
    duration: DISSOLVE_DUR,
    ease: DISSOLVE_EASE,
    overwrite: "auto",
    onUpdate: () => draw(st),
    onComplete: () => {
      draw(st);
      st.tween = null;
      if (done) done();
    },
  });
}

export function dissolveClear(): void {
  if (!state) return;
  const st = state;
  if (st.tween) st.tween.kill();
  if (st.kind === "fade") {
    st.tween = gsap.to(st.el, {
      opacity: 0,
      duration: reduced() ? FADE_MS / 1000 : CLEAR_DUR,
      ease: reduced() ? "none" : CLEAR_EASE,
      overwrite: "auto",
      onComplete: () => {
        st.tween = null;
        st.el.style.visibility = "hidden";
      },
    });
    return;
  }
  st.tween = gsap.to(st, {
    progress: DISSOLVE_START,
    duration: CLEAR_DUR,
    ease: CLEAR_EASE,
    overwrite: "auto",
    onUpdate: () => draw(st),
    onComplete: () => {
      st.tween = null;
      st.canvas.style.visibility = "hidden";
    },
  });
}

export function isCovering(): boolean {
  if (!state) return false;
  if (state.kind === "fade") return state.el.style.visibility === "visible";
  return state.canvas.style.visibility === "visible";
}

export function destroyDissolve(): Cleanup {
  return () => {
    if (!state) return;
    if (state.tween) state.tween.kill();
    if (state.kind === "gl") {
      window.removeEventListener("resize", state.onResize);
      state.canvas.remove();
    } else {
      state.el.remove();
    }
    state = null;
    failed = false;
  };
}
