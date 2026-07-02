/**
 * UserAvatar — Copy-paste ready avatar with optional presence badge
 *
 * Usage:
 *   import { UserAvatar } from "./components/ui/UserAvatar";
 *   <UserAvatar name="Alice M." presence="available" />
 *   <UserAvatar name="Bob K." size={40} imageUrl="https://..." />
 *
 * Dependencies: @fluentui/react-components
 */

import React from "react";
import { Avatar, PresenceBadge } from "@fluentui/react-components";
import type { AvatarNamedColor } from "@fluentui/react-components";

type PresenceStatus = "available" | "busy" | "away" | "offline" | "do-not-disturb" | "out-of-office";
type AvatarSize = 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 128;

export interface UserAvatarProps {
  /** Display name — used for initials and color assignment */
  name: string;
  size?: AvatarSize;
  /** Direct image URL */
  imageUrl?: string;
  presence?: PresenceStatus;
  /** Override initials (max 2 chars) */
  initials?: string;
  color?: AvatarNamedColor;
  shape?: "circular" | "square";
  /** Marks the avatar as active or inactive */
  active?: "active" | "inactive";
  /** Visual style of the active indicator */
  activeAppearance?: "ring" | "shadow" | "ring-shadow";
  /** Additional CSS class name(s) to apply to the root element */
  className?: string;
}

/**
 * UserAvatar is a graphical representation of a user displayed as an image, initials, or fallback icon in a circular container. Wraps Fluent's Avatar with sensible defaults for user identity contexts.
 *
 * **When to use:** Identifying a person in comments, lists, headers, and cards. Use initials as a fallback when no image is available. Add PresenceBadge for communication surfaces.
 * **When NOT to use:** As a standalone button or navigation element without proper keyboard accessibility. Square shape for individual people (use circular).
 */
export const UserAvatar = React.forwardRef<HTMLSpanElement, UserAvatarProps>(
  ({
  name,
  size = 32,
  imageUrl,
  presence,
  initials,
  color,
  shape = "circular",
  active,
  activeAppearance,
}: UserAvatarProps, ref) => {
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <Avatar
        name={name}
        size={size}
        image={imageUrl ? { src: imageUrl } : undefined}
        initials={initials}
        color={color}
        shape={shape}
        active={active}
        activeAppearance={activeAppearance}
      />
      {presence && (
        <PresenceBadge
          status={presence}
          size={size >= 56 ? "large" : size >= 32 ? "medium" : "small"}
          style={{
            position: "absolute",
            bottom: 0,
            insetInlineEnd: 0,
          }}
        />
      )}
    </div>
  );
}
);
UserAvatar.displayName = "UserAvatar";
