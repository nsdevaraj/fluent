/**
 * Icon Types — Design System Fluent Icon integration
 *
 * Re-exports the official FluentIcon type from @fluentui/react-icons and provides
 * helper types so consumers can type their icon props correctly.
 *
 * ──────────────────────────────────────────────────────────────────────────────
 * Usage patterns:
 *
 * 1. Accepting a rendered icon element (most DS components use this pattern):
 *
 *    interface MyProps {
 *      icon?: FluentIconElement;       // pass as <Home20Regular />
 *    }
 *
 * 2. Accepting the icon component itself (for lazy rendering / size switching):
 *
 *    interface MyProps {
 *      icon?: FluentIcon;              // pass as Home20Regular (no JSX)
 *    }
 *    // Render: const Ic = props.icon; return <Ic />;
 *
 * 3. Accepting either (most flexible):
 *
 *    interface MyProps {
 *      icon?: FluentIconOrElement;
 *    }
 *
 * ──────────────────────────────────────────────────────────────────────────────
 * Imports:
 *
 *   import type { FluentIcon, FluentIconElement, FluentIconOrElement } from "@lumel/fluent2-ds";
 *   // or locally:
 *   import type { FluentIcon, FluentIconElement, FluentIconOrElement } from "../../types/icons";
 */

import React from "react";
import type { FluentIcon as _FluentIcon } from "@fluentui/react-icons";

/**
 * A Fluent icon **component** (not yet rendered).
 * Use when you want to accept the icon and control its rendering (e.g. to swap size).
 *
 * @example
 *   const icon: FluentIcon = Home20Regular;
 *   // Render: <icon />
 */
export type FluentIcon = _FluentIcon;

/**
 * A rendered Fluent icon **element** (already JSX).
 * This is the pattern used by all DS components that accept an `icon` prop.
 *
 * @example
 *   const icon: FluentIconElement = <Home20Regular />;
 */
export type FluentIconElement = React.ReactElement;

/**
 * Either a Fluent icon component or a rendered element.
 * Use when your API needs to accept both forms.
 */
export type FluentIconOrElement = FluentIcon | FluentIconElement;

/**
 * Helper: returns `true` if a `FluentIconOrElement` is already a rendered element.
 */
export function isFluentIconElement(icon: FluentIconOrElement): icon is FluentIconElement {
  return typeof icon !== "function";
}

/**
 * Helper: normalises any `FluentIconOrElement` into a rendered `React.ReactElement`.
 * If the value is already a rendered element it is returned as-is.
 *
 * @example
 *   const el = toFluentIconElement(props.icon);  // works with both patterns
 *   return <span>{el}</span>;
 */
export function toFluentIconElement(icon: FluentIconOrElement): FluentIconElement {
  if (isFluentIconElement(icon)) return icon;
  return React.createElement(icon as FluentIcon);
}
