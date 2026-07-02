/**
 * Design System — Unified Public Entry Point
 *
 * Single import path for all DS exports: components, hooks, tokens, and themes.
 *
 * Usage (post-packaging):
 *   import { Button, spacing, lightTheme, useControllableState } from "@org/ds";
 *
 * Usage (local / pre-packaging):
 *   import { Button, spacing, lightTheme } from "../ds";
 *
 * Note: src/index.tsx is the CRA application entry point and is separate.
 *       This file (src/ds.ts) is the library entry point used by tsconfig.build.json.
 */

// ── Components (59), hooks (useToast), types, and constants ──────────────────
export * from "./components/ui";

// ── Utility hooks ─────────────────────────────────────────────────────────────
export * from "./hooks";

// ── Design tokens ─────────────────────────────────────────────────────────────
export * from "./tokens";

// ── Themes ────────────────────────────────────────────────────────────────────
export * from "./themes";

// ── Icon types ────────────────────────────────────────────────────────────────
export type { FluentIcon, FluentIconElement, FluentIconOrElement } from "./types/icons";
export { isFluentIconElement, toFluentIconElement }                from "./types/icons";
