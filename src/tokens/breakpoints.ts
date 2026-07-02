/**
 * Responsive breakpoint tokens and media-query helpers.
 *
 * Values follow the Fluent 2 responsive grid tiers. Use the `media` helpers
 * inside makeStyles() so breakpoints stay consistent across components.
 *
 * Import: import { breakpoints, media } from "../tokens";
 *
 * Usage in makeStyles():
 *   root: {
 *     display: "grid",
 *     gridTemplateColumns: "1fr",
 *     [media.up("md")]: { gridTemplateColumns: "1fr 1fr" },
 *   },
 */

/** Minimum viewport width (px) for each named breakpoint. */
export const breakpoints = {
  xs:  0,     // phones (portrait)
  sm:  480,   // phones (landscape) / small tablets
  md:  640,   // tablets
  lg:  1024,  // small laptops
  xl:  1366,  // desktops
  xxl: 1920,  // large / wide desktops
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Subtract a hair below the next breakpoint for max-width ranges so that
// `down`/`between` do not overlap the following `up` breakpoint.
const NUDGE = 0.02;

/**
 * Media-query string builders keyed by named breakpoint.
 * Returned strings are valid object keys for Griffel/makeStyles.
 */
export const media = {
  /** Applies at the given breakpoint and wider. */
  up: (bp: Breakpoint): string =>
    `@media screen and (min-width: ${breakpoints[bp]}px)`,

  /** Applies below the given breakpoint. */
  down: (bp: Breakpoint): string =>
    `@media screen and (max-width: ${breakpoints[bp] - NUDGE}px)`,

  /** Applies from `min` up to (but not including) `max`. */
  between: (min: Breakpoint, max: Breakpoint): string =>
    `@media screen and (min-width: ${breakpoints[min]}px) and (max-width: ${breakpoints[max] - NUDGE}px)`,
} as const;

export type Media = typeof media;
