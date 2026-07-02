/**
 * z-index tokens — semantic layering scale for stacked surfaces.
 *
 * Use these named layers instead of hardcoding z-index values so that
 * overlapping surfaces (dropdowns, sticky headers, dialogs, toasts, tooltips)
 * stack in a predictable, documented order.
 *
 * Import: import { zIndex } from "../tokens";
 *
 * Usage in makeStyles():
 *   stickyHeader: { position: "sticky", top: 0, zIndex: zIndex.sticky },
 */
export const zIndex = {
  /** Pushed behind normal flow (decorative backgrounds). */
  hide:     -1,
  /** Default document flow. */
  base:      0,
  /** Docked elements that stay above content (e.g. floating action button). */
  docked:    10,
  /** Dropdown / listbox surfaces anchored to an input. */
  dropdown:  1000,
  /** Sticky headers, table header rows, sticky toolbars. */
  sticky:    1100,
  /** Full-width banners / notification strips. */
  banner:    1200,
  /** Scrim / backdrop behind a modal surface. */
  overlay:   1300,
  /** Modal dialogs and drawers. */
  modal:     1400,
  /** Popovers anchored above modals. */
  popover:   1500,
  /** Transient toast notifications. */
  toast:     1600,
  /** Tooltips — always on top of interactive surfaces. */
  tooltip:   1700,
} as const;

export type ZIndex = typeof zIndex;
