import { lightTheme } from "./lightTheme";
import { darkTheme } from "./darkTheme";
import { highContrastTheme } from "./highContrastTheme";

export { lightTheme } from "./lightTheme";
export { darkTheme }  from "./darkTheme";
export { highContrastTheme } from "./highContrastTheme";

/** Named theme identifiers supported by the design system. */
export type ThemeName = "light" | "dark" | "highContrast";

/**
 * Lookup map of every DS theme, keyed by {@link ThemeName}.
 * Handy for theme switchers:
 *
 *   <FluentProvider theme={themes[mode]}>…</FluentProvider>
 */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  highContrast: highContrastTheme,
} as const;

