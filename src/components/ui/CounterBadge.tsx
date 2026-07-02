/**
 * CounterBadge — Numeric notification count badge.
 *
 * Wraps Fluent UI v9 `CounterBadge`. Shows counts on nav items, icons,
 * avatar corners, and tab labels. Automatically shows "99+" for counts > 99
 * (configurable via `overflowCount`).
 *
 * Usage:
 *   import { CounterBadge } from "../components/ui";
 *
 *   // On an icon button:
 *   <div style={{ position: "relative", display: "inline-flex" }}>
 *     <Button icon={<Alert20Regular />} aria-label="Alerts" />
 *     <CounterBadge count={5} />
 *   </div>
 *
 *   // Dot mode (just a dot, no number):
 *   <CounterBadge dot />
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import { CounterBadge as FluentCounterBadge } from "@fluentui/react-components";

export type CounterBadgeColor =
  | "brand"
  | "danger"
  | "important"
  | "informative";

export type CounterBadgeAppearance = "filled" | "ghost";
export type CounterBadgeSize = "extra-small" | "small" | "medium" | "large" | "extra-large";

export interface CounterBadgeProps {
  /** The numeric count to display */
  count?: number;
  /** Render as a dot (ignores count) */
  dot?: boolean;
  /** Maximum count before showing overflow label. Default 99. */
  overflowCount?: number;
  /** Show the badge even when count === 0 */
  showZero?: boolean;
  color?: CounterBadgeColor;
  appearance?: CounterBadgeAppearance;
  size?: CounterBadgeSize;
  /** Shape — "circular" (default) or "rounded" */
  shape?: "circular" | "rounded";
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

/**
 * CounterBadge displays a numeric count indicator — unread messages, notification counts — attached to a nav item, button, or avatar. Shows a dot when count is 0, and caps display at the overflowCount (default 99+).
 *
 * **When to use:** Indicating unread counts on nav items, buttons, or avatars — email unread count, notification badge, cart item count.
 *
 * **When NOT to use:** Non-count metadata (use Badge). Multiple badges on the same anchor element. Counts that don't represent unread/new items.
 */
export const CounterBadge = React.forwardRef<HTMLDivElement, CounterBadgeProps>(
  ({
    count = 0,
    dot = false,
    overflowCount = 99,
    showZero = false,
    color = "brand",
    appearance = "filled",
    size = "medium",
    shape = "circular",
    className,
    style,
    "aria-label": ariaLabel,
  }: CounterBadgeProps, ref) => {
    if (!dot && !showZero && count === 0) return null;

    const displayCount = count > overflowCount ? overflowCount : count;
    const accessibleLabel = ariaLabel ?? (dot ? "New notification" : `${count} notifications`);

    return (
      <FluentCounterBadge
        ref={ref}
        count={displayCount}
        dot={dot}
        overflowCount={overflowCount}
        showZero={showZero}
        color={color}
        appearance={appearance}
        size={size}
        shape={shape}
        className={className}
        style={style}
        aria-label={accessibleLabel}
      />
    );
  }
);
CounterBadge.displayName = "CounterBadge";
