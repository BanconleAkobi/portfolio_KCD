"use client";
import type { Variants, Transition } from "framer-motion";

// ─── EASING CURVES ────────────────────────────────────────────────
export const ease = {
  standard:   [0.25, 0.46, 0.45, 0.94] as const,
  decelerate: [0.0,  0.0,  0.2,  1.0 ] as const,
  accelerate: [0.4,  0.0,  1.0,  1.0 ] as const,
  outExpo:    [0.16, 1.0,  0.3,  1.0 ] as const,
};

// ─── SHARED TRANSITIONS ────────────────────────────────────────────
export const transition = {
  fast:      { duration: 0.25, ease: ease.standard   } satisfies Transition,
  standard:  { duration: 0.45, ease: ease.decelerate } satisfies Transition,
  slow:      { duration: 0.65, ease: ease.decelerate } satisfies Transition,
  cinematic: { duration: 1.0,  ease: ease.outExpo    } satisfies Transition,
  spring:    { type: "spring" as const, stiffness: 220, damping: 30, mass: 1   } satisfies Transition,
  springHeavy: { type: "spring" as const, stiffness: 120, damping: 28, mass: 1.2 } satisfies Transition,
};

// ─── FADE UP (primary entrance) ───────────────────────────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transition.slow },
};

// ─── FADE IN ─────────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: transition.standard },
};

// ─── STAGGER CONTAINER ────────────────────────────────────────────
export function staggerContainer(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden:  {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

// ─── SCALE IN ────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: transition.slow },
};

// ─── SLIDE IN FROM LEFT ───────────────────────────────────────────
export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: transition.slow },
};

// ─── DRAW LINE (scaleX) ───────────────────────────────────────────
export const drawLine: Variants = {
  hidden:  { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: ease.decelerate, delay: 0.2 } },
};

// ─── WORD SPLIT HERO HEADLINE ─────────────────────────────────────
export const heroWord: Variants = {
  hidden:  { opacity: 0, y: 40, skewY: 1.5 },
  visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.7, ease: ease.outExpo } },
};

// ─── CLIP REVEAL (bottom to top) ─────────────────────────────────
export const clipReveal: Variants = {
  hidden:  { clipPath: "inset(100% 0% 0% 0%)" },
  visible: { clipPath: "inset(0% 0% 0% 0%)", transition: transition.slow },
};

// ─── CARD HOVER LIFT ──────────────────────────────────────────────
export const cardHover = {
  rest:  { y: 0, transition: transition.fast },
  hover: { y: -5, transition: transition.fast },
};

// ─── SECTION SCROLL TRIGGER DEFAULTS ─────────────────────────────
export const scrollViewport = { once: true, margin: "-80px 0px" };
