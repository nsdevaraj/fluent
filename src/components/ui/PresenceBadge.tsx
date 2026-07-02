/**
 * PresenceBadge — Presence/availability status indicator.
 *
 * Wraps Fluent UI v9 `PresenceBadge`. Shows online/offline/busy/away status
 * on avatars, persona components, and user cards.
 *
 * Usage:
 *   import { PresenceBadge } from "../components/ui";
 *
 *   // Overlay on avatar (position with CSS):
 *   <div style={{ position: "relative", display: "inline-flex" }}>
 *     <Avatar name="Jane Smith" />
 *     <PresenceBadge status="available" style={{ position: "absolute", bottom: 0, right: 0 }} />
 *   </div>
 *
 *   // Standalone:
 *   <PresenceBadge status="busy" size="large" />
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import { PresenceBadge as FluentPresenceBadge } from "@fluentui/react-components";

export type PresenceStatus =
  | "available"
  | "away"
  | "busy"
  | "do-not-disturb"
  | "offline"
  | "out-of-office"
  | "unknown"
  | "blocked";

export type PresenceBadgeSize = "extra-small" | "small" | "medium" | "large" | "extra-large";

const PRESENCE_LABELS: Record<PresenceStatus, string> = {
  available:      "Available",
  away:           "Away",
  busy:           "Busy",
  "do-not-disturb": "Do not disturb",
  offline:        "Offline",
  "out-of-office": "Out of office",
  unknown:        "Unknown status",
  blocked:        "Blocked",
};

export interface PresenceBadgeProps {
  status: PresenceStatus;
  size?: PresenceBadgeSize;
  /** "regular" (default) — solid fill. "out-of-office" — striped pattern. */
  outOfOffice?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Overrides the auto-generated aria-label */
  "aria-label"?: string;
}

/**
 * PresenceBadge conveys a user's online status — available, away, busy, do-not-disturb, offline, out-of-office, or unknown. Typically positioned on an Avatar in communication surfaces.
 *
 * **When to use:** Communication surfaces where a user's availability status matters — chat applications, meeting participants, contact lists.
 *
 * **When NOT to use:** Non-person entities (use a status indicator or Badge instead). Surfaces where presence information is irrelevant or distracting.
 */
export const PresenceBadge = React.forwardRef<HTMLDivElement, PresenceBadgeProps>(
  ({
    status,
    size = "medium",
    outOfOffice = false,
    className,
    style,
    "aria-label": ariaLabel,
  }: PresenceBadgeProps, ref) => {
    return (
      <FluentPresenceBadge
        ref={ref}
        status={status}
        size={size}
        outOfOffice={outOfOffice}
        className={className}
        style={style}
        aria-label={ariaLabel ?? PRESENCE_LABELS[status]}
      />
    );
  }
);
PresenceBadge.displayName = "PresenceBadge";
