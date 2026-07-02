import { tokens } from "@fluentui/react-components";

/**
 * Focus-ring tokens — a single source of truth for keyboard focus indicators.
 *
 * Fluent v9 provides `createFocusOutlineStyle` for its own components; use
 * these tokens (and the `focusRing` helper) when styling custom DS components
 * so the focus indicator matches Fluent's look in every theme.
 *
 * Import: import { focus, focusRing } from "../tokens";
 *
 * Usage in makeStyles():
 *   trigger: {
 *     ":focus-visible": focusRing(),
 *   },
 */
export const focus = {
  /** Outline thickness (2px). */
  width:  tokens.strokeWidthThick,
  /** Outline color — outer ring, contrasts against most backgrounds. */
  color:  tokens.colorStrokeFocus2,
  /** Inner ring color, used for a dual-ring effect on dark surfaces. */
  colorInner: tokens.colorStrokeFocus1,
  /** Gap between the element edge and the ring. */
  offset: "2px",
  /** Outline line style. */
  style:  "solid",
} as const;

export type Focus = typeof focus;

/**
 * Returns a style object for a visible focus ring, suitable for spreading
 * into a `:focus-visible` selector inside makeStyles().
 */
export const focusRing = (): {
  outlineWidth: string;
  outlineStyle: string;
  outlineColor: string;
  outlineOffset: string;
  borderRadius: string;
} => ({
  outlineWidth:  focus.width,
  outlineStyle:  focus.style,
  outlineColor:  focus.color,
  outlineOffset: focus.offset,
  borderRadius:  tokens.borderRadiusMedium,
});
