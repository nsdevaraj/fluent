/**
 * PresenceGroup — Container that sizes a group of PresenceBadge indicators.
 *
 * Wraps Fluent UI v9 `PresenceGroup` and re-exports `PresenceBadge` sizing.
 * Use when you need to render multiple presence indicators at a consistent
 * size — e.g., a legend row in a people-picker or a status summary bar.
 *
 * Usage:
 *   import { PresenceGroup } from "../components/ui";
 *
 *   // All badges inside share the same size:
 *   <PresenceGroup size="large">
 *     <PresenceBadge status="available" />
 *     <PresenceBadge status="busy" />
 *     <PresenceBadge status="away" />
 *   </PresenceGroup>
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import { PresenceGroup as FluentPresenceGroup } from "@fluentui/react-components";

export type PresenceGroupSize =
  | "tiny"
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large"
  | "huge";

export interface PresenceGroupProps {
  children: React.ReactNode;
  /**
   * Uniform size applied to all child `PresenceBadge` components.
   * Defaults to "medium".
   */
  size?: PresenceGroupSize;
  className?: string;
  style?: React.CSSProperties;
}

export const PresenceGroup: React.FC<PresenceGroupProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div className={className} style={style}>
      <FluentPresenceGroup>
        {children}
      </FluentPresenceGroup>
    </div>
  );
};
PresenceGroup.displayName = "PresenceGroup";
