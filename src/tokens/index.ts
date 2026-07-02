/**
 * Design System — Token Index
 *
 * Single entry point for all design tokens.
 * Developers should import only from this file:
 *
 *   import { spacing, typography, borderRadius, shadows, motion,
 *            semanticColors, brandColors, ribbonTokens, dataVizTokens,
 *            zIndex, breakpoints, media, opacity, focus, focusRing } from "../tokens";
 *
 * For Fluent's raw token object (CSS variables at runtime):
 *   import { tokens } from "@fluentui/react-components";
 */

export { brandColors }                                    from "./brand";

export { semanticColors }                                 from "./colors";
export type { SemanticColors }                            from "./colors";

export { typography }                                     from "./typography";
export type { Typography }                                from "./typography";

export { spacing }                                        from "./spacing";
export type { Spacing }                                   from "./spacing";

export { borderRadius }                                   from "./borderRadius";
export type { BorderRadius }                              from "./borderRadius";

export { shadows }                                        from "./shadows";
export type { Shadows }                                   from "./shadows";

export { motion }                                         from "./motion";
export type { Motion }                                    from "./motion";

export { ribbonTokens, ribbonColorsLight, ribbonColorsDark } from "./ribbonColors";
export type { RibbonTokens }                              from "./ribbonColors";

export { dataVizTokens, dataVizColorsLight, dataVizColorsDark } from "./dataVizColors";
export type { DataVizTokens }                             from "./dataVizColors";

export { zIndex }                                         from "./zIndex";
export type { ZIndex }                                    from "./zIndex";

export { breakpoints, media }                             from "./breakpoints";
export type { Breakpoint, Media }                         from "./breakpoints";

export { opacity }                                        from "./opacity";
export type { Opacity }                                   from "./opacity";

export { focus, focusRing }                               from "./focus";
export type { Focus }                                     from "./focus";
