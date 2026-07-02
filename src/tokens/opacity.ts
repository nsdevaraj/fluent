/**
 * Opacity tokens — consistent alpha multipliers for interaction and
 * overlay states. Use instead of hardcoding opacity values.
 *
 * Import: import { opacity } from "../tokens";
 *
 * Usage in makeStyles():
 *   disabled: { opacity: opacity.disabled },
 */
export const opacity = {
  /** Fully transparent. */
  transparent: 0,
  /** Subtle hover wash over a surface. */
  hover:       0.08,
  /** Pressed / active wash over a surface. */
  pressed:     0.12,
  /** Selected-state wash over a surface. */
  selected:    0.16,
  /** Disabled content (meets WCAG when paired with disabled color tokens). */
  disabled:    0.38,
  /** Modal/backdrop scrim over page content. */
  scrim:       0.4,
  /** Heavier overlay for full-screen blocking surfaces. */
  overlay:     0.6,
  /** Fully opaque. */
  opaque:      1,
} as const;

export type Opacity = typeof opacity;
