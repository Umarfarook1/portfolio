// Motion tokens — mirrors the CSS custom properties in globals.css.
// Red draws, ink settles. Fluid hand (curves), stepped machine (quantized).
// Zero bounce everywhere except springPlate (the fig. 01 plate).

export const dur = {
  fast: 0.14,
  base: 0.24,
  slow: 0.48,
  cinematic: 0.72,
} as const;

export const easeOutQuart = [0.25, 1, 0.5, 1] as const;
export const easeOutQuint = [0.22, 1, 0.36, 1] as const;
export const easeInOutQuint = [0.83, 0, 0.17, 1] as const;

export const springPress = { type: "spring", stiffness: 420, damping: 41, mass: 1 } as const;
export const springPlate = { type: "spring", visualDuration: 0.5, bounce: 0.15 } as const;

export const STAGGER_STEP = 0.06; // 60ms, capped at 6 children
export const BEAT = 0.12; // 120ms between typesetting beats

export const staggerDelay = (index: number) => Math.min(index, 5) * STAGGER_STEP;
