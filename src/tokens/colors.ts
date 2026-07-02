/**
 * Semantic color aliases.
 *
 * These are intent-based aliases that map to Fluent's resolved CSS custom
 * properties at runtime. Use these in makeStyles() to ensure correct
 * light/dark theme switching.
 *
 * Import: import { semanticColors } from "../tokens";
 */
import { tokens } from "@fluentui/react-components";

export const semanticColors = {
  // ── Brand ────────────────────────────────────────────────────────────────
  brand: {
    background:        tokens.colorBrandBackground,
    backgroundHover:   tokens.colorBrandBackgroundHover,
    backgroundPressed: tokens.colorBrandBackgroundPressed,
    foreground:        tokens.colorBrandForeground1,
    foregroundLink:    tokens.colorBrandForegroundLink,
    stroke:            tokens.colorBrandStroke1,
    strokeHover:       tokens.colorBrandStroke2,
  },

  // ── Neutral ───────────────────────────────────────────────────────────────
  neutral: {
    background1:       tokens.colorNeutralBackground1,
    background2:       tokens.colorNeutralBackground2,
    background3:       tokens.colorNeutralBackground3,
    background4:       tokens.colorNeutralBackground4,
    backgroundDisabled:tokens.colorNeutralBackgroundDisabled,
    foreground1:       tokens.colorNeutralForeground1,
    foreground2:       tokens.colorNeutralForeground2,
    foreground3:       tokens.colorNeutralForeground3,
    foreground4:       tokens.colorNeutralForeground4,
    foregroundDisabled:tokens.colorNeutralForegroundDisabled,
    foregroundOnBrand: tokens.colorNeutralForegroundOnBrand,
    stroke1:           tokens.colorNeutralStroke1,
    stroke2:           tokens.colorNeutralStroke2,
    strokeDisabled:    tokens.colorNeutralStrokeDisabled,
    strokeAccessible:  tokens.colorNeutralStrokeAccessible,
  },

  // ── Status: Success ───────────────────────────────────────────────────────
  success: {
    background1: tokens.colorStatusSuccessBackground1,
    background2: tokens.colorStatusSuccessBackground2,
    background3: tokens.colorStatusSuccessBackground3,
    foreground1: tokens.colorStatusSuccessForeground1,
    foreground2: tokens.colorStatusSuccessForeground2,
    foreground3: tokens.colorStatusSuccessForeground3,
    borderActive: tokens.colorStatusSuccessBorderActive,
    border1:      tokens.colorStatusSuccessBorder1,
    border2:      tokens.colorStatusSuccessBorder2,
  },

  // ── Status: Warning ───────────────────────────────────────────────────────
  warning: {
    background1: tokens.colorStatusWarningBackground1,
    background2: tokens.colorStatusWarningBackground2,
    background3: tokens.colorStatusWarningBackground3,
    foreground1: tokens.colorStatusWarningForeground1,
    foreground2: tokens.colorStatusWarningForeground2,
    foreground3: tokens.colorStatusWarningForeground3,
    borderActive: tokens.colorStatusWarningBorderActive,
    border1:      tokens.colorStatusWarningBorder1,
    border2:      tokens.colorStatusWarningBorder2,
  },

  // ── Status: Danger / Error ────────────────────────────────────────────────
  danger: {
    background1: tokens.colorStatusDangerBackground1,
    background2: tokens.colorStatusDangerBackground2,
    background3: tokens.colorStatusDangerBackground3,
    foreground1: tokens.colorStatusDangerForeground1,
    foreground2: tokens.colorStatusDangerForeground2,
    foreground3: tokens.colorStatusDangerForeground3,
    borderActive: tokens.colorStatusDangerBorderActive,
    border1:      tokens.colorStatusDangerBorder1,
    border2:      tokens.colorStatusDangerBorder2,
  },

  // ── Palette: Informational ────────────────────────────────────────────────
  info: {
    background2: tokens.colorPaletteBlueBackground2,
    foreground2: tokens.colorPaletteBlueForeground2,
    stroke1:     tokens.colorPaletteBlueBorderActive,
  },
} as const;

export type SemanticColors = typeof semanticColors;
