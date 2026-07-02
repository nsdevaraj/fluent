import { createLightTheme } from "@fluentui/react-components";
import { brandColors } from "../tokens/brand";
import { ribbonColorsLight } from "../tokens/ribbonColors";
import { dataVizColorsLight } from "../tokens/dataVizColors";

/**
 * Custom light theme.
 * createLightTheme() generates all 60+ colorBrand* tokens automatically
 * from the 16-shade brand ramp, then merges them with Fluent's light base.
 *
 * Custom token groups appended below:
 *   • ribbonColorsLight  — colorRibbonIcon* (7 tokens)
 *   • dataVizColorsLight — colorDataSlot*, colorSequence*, colorDiverging*,
 *                          colorAlert*, colorTransparencyDataSlot* (94 tokens)
 */
export const lightTheme = {
  ...createLightTheme(brandColors),

  // ── Ribbon icon colors ────────────────────────────────────────────────────
  ...ribbonColorsLight,

  // ── Data visualization colors ─────────────────────────────────────────────
  ...dataVizColorsLight,
};
