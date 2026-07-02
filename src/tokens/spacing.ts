import { tokens } from "@fluentui/react-components";

/**
 * Spacing tokens — use for padding, gap, and margin.
 * Never hardcode px values. Always use these aliases.
 *
 * Import: import { spacing } from "../tokens";
 */
export const spacing = {
  // ── Vertical (top/bottom padding, row gap) ────────────────────────────────
  vertical: {
    none:  "0",
    xxs:   tokens.spacingVerticalXXS,  // 2px
    xs:    tokens.spacingVerticalXS,   // 4px
    s:     tokens.spacingVerticalS,    // 6px
    sNudge:tokens.spacingVerticalSNudge,// 6px (alias)
    m:     tokens.spacingVerticalM,    // 8px
    mNudge:tokens.spacingVerticalMNudge,// 10px
    l:     tokens.spacingVerticalL,    // 12px
    xl:    tokens.spacingVerticalXL,   // 16px
    xxl:   tokens.spacingVerticalXXL,  // 20px
    xxxl:  tokens.spacingVerticalXXXL, // 36px
  },

  // ── Horizontal (left/right padding, column gap) ───────────────────────────
  horizontal: {
    none:  "0",
    xxs:   tokens.spacingHorizontalXXS,  // 2px
    xs:    tokens.spacingHorizontalXS,   // 4px
    s:     tokens.spacingHorizontalS,    // 6px
    sNudge:tokens.spacingHorizontalSNudge,// 6px
    m:     tokens.spacingHorizontalM,    // 8px
    mNudge:tokens.spacingHorizontalMNudge,// 10px
    l:     tokens.spacingHorizontalL,    // 12px
    xl:    tokens.spacingHorizontalXL,   // 16px
    xxl:   tokens.spacingHorizontalXXL,  // 20px
    xxxl:  tokens.spacingHorizontalXXXL, // 36px
  },
} as const;

export type Spacing = typeof spacing;
