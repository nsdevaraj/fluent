/**
 * AvatarGroup — Stacked row of avatars with overflow count.
 *
 * Wraps Fluent UI v9 `AvatarGroup`, `AvatarGroupItem`, `AvatarGroupPopover`.
 * Displays a compact row of user avatars; excess avatars collapse into an
 * overflow bubble that opens a popover listing all members.
 *
 * Usage:
 *   import { AvatarGroup } from "../components/ui";
 *   <AvatarGroup
 *     members={[
 *       { name: "Jane Smith", color: "brand" },
 *       { name: "John Doe", image: "/avatars/john.jpg" },
 *       { name: "Alice Chen" },
 *     ]}
 *     maxVisible={3}
 *   />
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  AvatarGroup as FluentAvatarGroup,
  AvatarGroupItem as FluentAvatarGroupItem,
  AvatarGroupPopover as FluentAvatarGroupPopover,
  Persona as FluentPersona,
} from "@fluentui/react-components";
import type { AvatarNamedColor } from "@fluentui/react-components";

// ── Sub-component re-exports for composable usage ────────────────────────────
export {
  FluentAvatarGroupItem    as AvatarGroupItem,
  FluentAvatarGroupPopover as AvatarGroupPopover,
};

export type AvatarGroupLayout = "stack" | "spread" | "pie";
export type AvatarGroupSize = 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128;

export interface AvatarGroupMember {
  /** Display name (used for initials and aria-label) */
  name: string;
  /** Image URL */
  image?: string;
  /** Avatar color (used when no image) */
  color?: "neutral" | "brand" | "colorful" | AvatarNamedColor;
  /** Status shown on the avatar */
  status?: "available" | "away" | "busy" | "do-not-disturb" | "offline" | "out-of-office";
}

export interface AvatarGroupProps {
  members: AvatarGroupMember[];
  /** Maximum avatars to show before collapsing into overflow. Default 5. */
  maxVisible?: number;
  layout?: AvatarGroupLayout;
  size?: AvatarGroupSize;
  /** aria-label for the group */
  "aria-label"?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * AvatarGroup renders a stacked or spread cluster of Avatar components, used to represent a group of people associated with an item — such as file collaborators, meeting attendees, or team members.
 *
 * **When to use:** Showing multiple people associated with an item at a glance — file co-authors, project team members, meeting participants. When individual identity is secondary to group membership.
 * **When NOT to use:** When individual people need full Persona detail. More than 5–7 visible avatars without an overflow count indicator. When order or hierarchy within the group matters.
 */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({
    members,
    maxVisible = 5,
    layout = "stack",
    size = 32,
    "aria-label": ariaLabel,
    className,
    style,
  }: AvatarGroupProps, ref) => {
    const visible = members.slice(0, maxVisible);
    const overflow = members.slice(maxVisible);

    return (
      <FluentAvatarGroup
        ref={ref}
        layout={layout}
        size={size}
        aria-label={ariaLabel ?? `${members.length} members`}
        className={className}
        style={style}
      >
        {visible.map((m, i) => (
          <FluentAvatarGroupItem
            key={`${m.name}-${i}`}
            name={m.name}
            image={m.image ? { src: m.image, alt: m.name } : undefined}
            color={m.color ?? "colorful"}
            badge={m.status ? { status: m.status } : undefined}
          />
        ))}
        {overflow.length > 0 && (
          <FluentAvatarGroupPopover
            count={overflow.length}
            indicator="count"
          >
            {overflow.map((m, i) => (
              <FluentPersona
                key={`${m.name}-ov-${i}`}
                name={m.name}
                presence={m.status ? { status: m.status } : undefined}
                avatar={{
                  image: m.image ? { src: m.image } : undefined,
                  color: m.color ?? "colorful",
                }}
                secondaryText={m.status}
              />
            ))}
          </FluentAvatarGroupPopover>
        )}
      </FluentAvatarGroup>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";
