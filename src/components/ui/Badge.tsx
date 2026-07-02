/**
 * Badge — General-purpose status / label badge.
 *
 * Wraps Fluent UI v9 `Badge`. Use for status labels, category tags,
 * and decorative indicators. For numeric counts use `CounterBadge`;
 * for presence/availability use `PresenceBadge`.
 *
 * Usage:
 *   import { Badge } from "../components/ui";
 *
 *   // Filled brand badge:
 *   <Badge color="brand">New</Badge>
 *
 *   // Ghost danger badge with icon:
 *   <Badge appearance="ghost" color="danger" icon={<ErrorCircle16Regular />}>Error</Badge>
 *
 *   // Tint success badge, square shape:
 *   <Badge appearance="tint" color="success" shape="square">Passed</Badge>
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import { Badge as FluentBadge } from "@fluentui/react-components";

export type BadgeAppearance = "filled" | "ghost" | "outline" | "tint";
export type BadgeColor =
  | "brand"
  | "danger"
  | "important"
  | "informative"
  | "severe"
  | "subtle"
  | "success"
  | "warning";
export type BadgeSize =
  | "tiny"
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large";
export type BadgeShape = "circular" | "rounded" | "square";

export interface BadgeProps {
  appearance?: BadgeAppearance;
  color?: BadgeColor;
  size?: BadgeSize;
  shape?: BadgeShape;
  /** Icon rendered inside the badge */
  icon?: React.ReactElement;
  /** Whether the icon appears before or after the text */
  iconPosition?: "before" | "after";
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({
    appearance = "filled",
    color,
    size = "medium",
    shape = "circular",
    icon,
    iconPosition = "before",
    children,
    className,
    style,
  }: BadgeProps, ref) => {
    return (
      <FluentBadge
        ref={ref}
        appearance={appearance}
        color={color}
        size={size}
        shape={shape}
        icon={icon}
        iconPosition={iconPosition}
        className={className}
        style={style}
      >
        {children}
      </FluentBadge>
    );
  }
);
Badge.displayName = "Badge";
