/**
 * DS Design Constants
 *
 * Centralised numeric/string constants used across multiple DS components.
 * Import from here instead of hard-coding values to keep components in sync.
 *
 * Usage:
 *   import { DS_ICON_SIZE_SM, DS_STROKE_1PX } from "./CONSTANTS";
 */

// ── Interactive control heights ────────────────────────────────────────────────
// All interactive controls (buttons, inputs, navigation items) use exactly
// these two heights. No `large` size exists in this design system.

/** Small interactive control height — 24px */
export const DS_HEIGHT_SMALL = "24px";

/** Medium interactive control height — 32px (default) */
export const DS_HEIGHT_MEDIUM = "32px";

// ── Strokes & icons ────────────────────────────────────────────────────────────

/** 1-pixel stroke used for borders and dividers (matches tokens.strokeWidthThin) */
export const DS_STROKE_1PX = "1px";

/** Small icon size used in inline/compact contexts (e.g. Stepper step number) */
export const DS_ICON_SIZE_SM = "20px";

/** Large icon size used in feature/upload contexts (e.g. FileUpload drop zone icon) */
export const DS_ICON_SIZE_LG = "32px";

/** Stepper: diameter of the step indicator circle */
export const DS_STEPPER_CIRCLE_SIZE = "28px";

/** SideNav: default collapsed width (icon-only mode) */
export const DS_SIDENAV_COLLAPSED_WIDTH = "56px";

/** SideNav: default expanded width */
export const DS_SIDENAV_EXPANDED_WIDTH = "240px";

/** EmptyState: icon container size (no Fluent token maps to this semantic size) */
export const DS_EMPTY_ICON_SIZE = "64px";

/** EmptyState: maximum width for the description text block */
export const DS_EMPTY_DESCRIPTION_MAX_WIDTH = "360px";

/** DataCard: minimum card width to maintain readable layout */
export const DS_DATA_CARD_MIN_WIDTH = "160px";

/** Popover: maximum width of the popover surface */
export const DS_POPOVER_MAX_WIDTH = "320px";

/** TagPicker / dropdown lists: maximum height before scroll activates */
export const DS_PICKER_LIST_MAX_HEIGHT = "220px";

/**
 * SideNav group label letter-spacing for uppercase nav section headings.
 * Fluent v9 has no letterSpacing token; this value is a DS-level design decision.
 */
export const DS_NAV_LABEL_LETTER_SPACING = "0.05em";

// ── Shared types ───────────────────────────────────────────────────────────────

/**
 * Validation state for all form input components.
 * Defined once here and re-exported by each form component to avoid duplication.
 */
export type ValidationState = "none" | "error" | "warning" | "success";
