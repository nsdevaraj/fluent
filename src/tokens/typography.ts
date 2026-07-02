import { tokens } from "@fluentui/react-components";

/**
 * Typography tokens — font families, size scale, weight scale,
 * line heights, and letter spacing.
 *
 * Always use these instead of hardcoding font values in makeStyles().
 * Import: import { typography } from "../tokens";
 */

export const typography = {
  // ── Font families ─────────────────────────────────────────────────────────
  fontFamily: {
    base:    tokens.fontFamilyBase,      // Segoe UI, system-ui, …
    mono:    tokens.fontFamilyMonospace, // Courier New, monospace
    numeric: tokens.fontFamilyNumeric,   // Bahnschrift, …
  },

  // ── Font size scale ───────────────────────────────────────────────────────
  // Base scale:  100=10px  200=12px  300=14px  400=16px  500=20px  600=24px
  // Hero scale:  700=28px  800=32px  900=40px  1000=68px
  fontSize: {
    xs:         tokens.fontSizeBase100,  // 10px — Caption 2
    sm:         tokens.fontSizeBase200,  // 12px — Caption 1
    md:         tokens.fontSizeBase300,  // 14px — Body 1 (default)
    base:       tokens.fontSizeBase400,  // 16px — Body 2 / Subtitle 2
    lg:         tokens.fontSizeBase500,  // 20px — Subtitle 1
    xl:         tokens.fontSizeBase600,  // 24px — Title 3
    title2:     tokens.fontSizeHero700,  // 28px — Title 2
    title1:     tokens.fontSizeHero800,  // 32px — Title 1
    largeTitle: tokens.fontSizeHero900,  // 40px — Large Title
    display:    tokens.fontSizeHero1000, // 68px — Display
  },

  // ── Font weight scale ─────────────────────────────────────────────────────
  fontWeight: {
    regular:  tokens.fontWeightRegular,  // 400
    medium:   tokens.fontWeightMedium,   // 500
    semibold: tokens.fontWeightSemibold, // 600
    bold:     tokens.fontWeightBold,     // 700
  },

  // ── Line heights ──────────────────────────────────────────────────────────
  lineHeight: {
    xs:         tokens.lineHeightBase100,  // 14px
    sm:         tokens.lineHeightBase200,  // 16px
    md:         tokens.lineHeightBase300,  // 20px — Body 1 default
    base:       tokens.lineHeightBase400,  // 22px — Body 2 / Subtitle 2
    lg:         "26px",                    // 26px — Subtitle 1 (design spec; Fluent token is 28px)
    xl:         tokens.lineHeightBase600,  // 32px — Title 3
    title2:     tokens.lineHeightHero700,  // 36px — Title 2
    title1:     tokens.lineHeightHero800,  // 40px — Title 1
    largeTitle: tokens.lineHeightHero900,  // 52px — Large Title
    display:    tokens.lineHeightHero1000, // 92px — Display
  },

  // ── Semantic text styles (pre-composed) ───────────────────────────────────
  textStyles: {
    display: {
      fontSize:   tokens.fontSizeHero1000,
      fontWeight: tokens.fontWeightSemibold,
      lineHeight: tokens.lineHeightHero1000, // 92px
    },
    largeTitle: {
      fontSize:   tokens.fontSizeHero900,
      fontWeight: tokens.fontWeightSemibold,
      lineHeight: tokens.lineHeightHero900,  // 52px
    },
    title1: {
      fontSize:   tokens.fontSizeHero800,
      fontWeight: tokens.fontWeightSemibold,
      lineHeight: tokens.lineHeightHero800,  // 40px
    },
    title2: {
      fontSize:   tokens.fontSizeHero700,
      fontWeight: tokens.fontWeightSemibold,
      lineHeight: tokens.lineHeightHero700,  // 36px
    },
    title3: {
      fontSize:   tokens.fontSizeBase600,
      fontWeight: tokens.fontWeightSemibold,
      lineHeight: tokens.lineHeightBase600,  // 32px
    },
    subtitle1: {
      fontSize:   tokens.fontSizeBase500,
      fontWeight: tokens.fontWeightSemibold,
      lineHeight: "26px",                    // design spec (Fluent token resolves to 28px)
    },
    subtitle2: {
      fontSize:   tokens.fontSizeBase400,
      fontWeight: tokens.fontWeightSemibold,
      lineHeight: tokens.lineHeightBase400,  // 22px
    },
    subtitle2Stronger: {
      fontSize:   tokens.fontSizeBase400,
      fontWeight: tokens.fontWeightBold,
      lineHeight: tokens.lineHeightBase400,  // 22px
    },
    body1: {
      fontSize:   tokens.fontSizeBase300,
      fontWeight: tokens.fontWeightRegular,
      lineHeight: tokens.lineHeightBase300,  // 20px
    },
    body1Strong: {
      fontSize:   tokens.fontSizeBase300,
      fontWeight: tokens.fontWeightSemibold,
      lineHeight: tokens.lineHeightBase300,
    },
    body1Stronger: {
      fontSize:   tokens.fontSizeBase300,
      fontWeight: tokens.fontWeightBold,
      lineHeight: tokens.lineHeightBase300,
    },
    body2: {
      fontSize:   tokens.fontSizeBase400,
      fontWeight: tokens.fontWeightRegular,
      lineHeight: tokens.lineHeightBase400,  // 22px
    },
    caption1: {
      fontSize:   tokens.fontSizeBase200,
      fontWeight: tokens.fontWeightRegular,
      lineHeight: tokens.lineHeightBase200,  // 16px
    },
    caption1Strong: {
      fontSize:   tokens.fontSizeBase200,
      fontWeight: tokens.fontWeightSemibold,
      lineHeight: tokens.lineHeightBase200,
    },
    caption1Stronger: {
      fontSize:   tokens.fontSizeBase200,
      fontWeight: tokens.fontWeightBold,
      lineHeight: tokens.lineHeightBase200,
    },
    caption2: {
      fontSize:   tokens.fontSizeBase100,
      fontWeight: tokens.fontWeightRegular,
      lineHeight: tokens.lineHeightBase100,  // 14px
    },
    caption2Strong: {
      fontSize:   tokens.fontSizeBase100,
      fontWeight: tokens.fontWeightSemibold,
      lineHeight: tokens.lineHeightBase100,
    },
  },
} as const;

export type Typography = typeof typography;
