import { tokens } from "@fluentui/react-components";

/**
 * Motion tokens — duration and easing curves.
 * Use for all CSS transitions and animations.
 * Never hardcode ms or cubic-bezier values.
 *
 * Import: import { motion } from "../tokens";
 *
 * Usage example in makeStyles():
 *   transition: `opacity ${motion.duration.fast} ${motion.easing.easeOut}`,
 */
export const motion = {
  // ── Durations ─────────────────────────────────────────────────────────────
  duration: {
    ultraFast: tokens.durationUltraFast, // 50ms  — micro-interactions
    faster:    tokens.durationFaster,    // 100ms — icon swaps, badge updates
    fast:      tokens.durationFast,      // 150ms — hover states, tooltips
    normal:    tokens.durationNormal,    // 200ms — standard transitions
    gentle:    tokens.durationGentle,    // 250ms — gentle transitions
    slow:      tokens.durationSlow,      // 300ms — panels, sidebars
    slower:    tokens.durationSlower,    // 400ms — modals, full overlays
    ultraSlow: tokens.durationUltraSlow, // 500ms — page-level transitions
  },

  // ── Easing curves ─────────────────────────────────────────────────────────
  easing: {
    // Elements entering the screen
    easeIn:       tokens.curveEasyEase,
    // Elements leaving the screen
    easeOut:      tokens.curveEasyEaseMax,
    // Elements moving within the screen (repositioning)
    linear:       tokens.curveLinear,
    // Playful, spring-like motion
    decelerate:   tokens.curveDecelerateMax,
    accelerate:   tokens.curveAccelerateMax,
  },
} as const;

export type Motion = typeof motion;
