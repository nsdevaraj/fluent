/**
 * Ribbon icon color tokens.
 * Used for color icons in ribbons and toolbars.
 * These are custom tokens — not part of Fluent's built-in palette.
 *
 * Light/dark values are wired into lightTheme.ts and darkTheme.ts so they
 * respect the FluentProvider theme toggle automatically.
 *
 * Usage in makeStyles():
 *   color: ribbonTokens.colorRibbonIconDismiss,
 *
 * Import: import { ribbonTokens } from "../tokens";
 */

export const ribbonTokens = {
  colorRibbonIconDismiss: "var(--colorRibbonIconDismiss)",
  colorRibbonIconManage:  "var(--colorRibbonIconManage)",
  colorRibbonIconMove:    "var(--colorRibbonIconMove)",
  colorRibbonIconObject:  "var(--colorRibbonIconObject)",
  colorRibbonIconSuccess: "var(--colorRibbonIconSuccess)",
  colorRibbonIconTrigger: "var(--colorRibbonIconTrigger)",
  colorRibbonIconWarning: "var(--colorRibbonIconWarning)",
} as const;

/** Light theme values */
export const ribbonColorsLight = {
  colorRibbonIconDismiss: "#B10E1C",
  colorRibbonIconManage:  "#004377",
  colorRibbonIconMove:    "#881798",
  colorRibbonIconObject:  "#424242",
  colorRibbonIconSuccess: "#0E700E",
  colorRibbonIconTrigger: "#835B00",
  colorRibbonIconWarning: "#8A3707",
} as const;

/** Dark theme values */
export const ribbonColorsDark = {
  colorRibbonIconDismiss: "#C50F1F",
  colorRibbonIconManage:  "#0078D4",
  colorRibbonIconMove:    "#B146C2",
  colorRibbonIconObject:  "#FFFFFF",
  colorRibbonIconSuccess: "#13A10E",
  colorRibbonIconTrigger: "#C19C00",
  colorRibbonIconWarning: "#F7630C",
} as const;

export type RibbonTokens = typeof ribbonTokens;
