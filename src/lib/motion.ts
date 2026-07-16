// GRADIENT DESCENT motion tokens — convergence: an attack, an overshoot, a settle.
// See DESIGN.md. Scroll-scrubbed scenes are linear and interruptible; the SGD
// settle spring is the ONE visible overshoot, reserved for stats and checkpoints.

export const easeExpoOut = [0.16, 1, 0.3, 1] as const;
export const easeExpoInOut = [0.87, 0, 0.13, 1] as const;

// SGD settle: one visible overshoot decaying to rest.
export const springSettle = { type: "spring", stiffness: 170, damping: 14, mass: 1 } as const;

// Cursor-follow preview panel lag.
export const springFollow = { stiffness: 300, damping: 30, mass: 0.5 } as const;

export const dur = {
  micro: 0.2,
  text: 0.8,
  cluster: 1.0,
  wipe: 0.9,
  denoise: 2.2,
} as const;

// Word-cluster stagger for token-stream reveals (seconds).
export const tokenStagger = 0.04;
