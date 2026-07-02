import { tokens } from "@fluentui/react-components";

/**
 * Border radius tokens — use for all rounded corners.
 * Never hardcode border-radius values.
 *
 * Import: import { borderRadius } from "../tokens";
 */
export const borderRadius = {
  none:    tokens.borderRadiusNone,    // 0
  small:   tokens.borderRadiusSmall,   // 2px
  medium:  tokens.borderRadiusMedium,  // 4px
  large:   tokens.borderRadiusLarge,   // 6px
  xlarge:  tokens.borderRadiusXLarge,  // 8px
  circular:tokens.borderRadiusCircular,// 10000px (pill/circle)
} as const;

export type BorderRadius = typeof borderRadius;
