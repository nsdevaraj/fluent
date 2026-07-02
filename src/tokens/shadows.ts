import { tokens } from "@fluentui/react-components";

/**
 * Shadow / elevation tokens.
 * Use to communicate z-axis layering (cards, panels, dialogs, menus).
 *
 * Import: import { shadows } from "../tokens";
 */
export const shadows = {
  // ── Standard elevation ramp ───────────────────────────────────────────────
  2:  tokens.shadow2,   // cards, inline elements
  4:  tokens.shadow4,   // dropdowns, popovers (resting)
  8:  tokens.shadow8,   // dropdowns (hover), tooltips
  16: tokens.shadow16,  // dialogs, side panels
  28: tokens.shadow28,  // modals, overlays
  64: tokens.shadow64,  // full-screen overlays, teaching popover

  // ── Brand-tinted elevation (for highlighted/featured surfaces) ────────────
  brand: {
    2:  tokens.shadow2Brand,
    4:  tokens.shadow4Brand,
    8:  tokens.shadow8Brand,
    16: tokens.shadow16Brand,
    28: tokens.shadow28Brand,
    64: tokens.shadow64Brand,
  },
} as const;

export type Shadows = typeof shadows;
