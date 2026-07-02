import { createDarkTheme } from "@fluentui/react-components";
import { brandColors } from "../tokens/brand";
import { ribbonColorsDark } from "../tokens/ribbonColors";
import { dataVizColorsDark } from "../tokens/dataVizColors";

/**
 * Custom dark theme.
 * createDarkTheme() flips the neutral palette and adjusts contrast ratios
 * automatically, while keeping your brand colors consistent.
 *
 * Custom token groups appended below:
 *   • ribbonColorsDark  — colorRibbonIcon* (7 tokens)
 *   • dataVizColorsDark — colorDataSlot*, colorSequence*, colorDiverging*,
 *                         colorAlert*, colorTransparencyDataSlot* (94 tokens)
 */
export const darkTheme = {
  ...createDarkTheme(brandColors),

  // ── Dark mode brand foreground tweak ──────────────────────────────────────
  // In dark mode, brand foreground needs to be lighter for WCAG AA contrast.
  colorBrandForeground1: brandColors[110],
  colorBrandForeground2: brandColors[120],

  // ── Ribbon icon colors ────────────────────────────────────────────────────
  ...ribbonColorsDark,

  // ── Data visualization colors ─────────────────────────────────────────────
  ...dataVizColorsDark,
};
