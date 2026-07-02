/**
 * StatusBadge — Copy-paste ready status indicator using Fluent 2
 *
 * Usage:
 *   import { StatusBadge } from "./components/ui/StatusBadge";
 *   <StatusBadge status="completed" />
 *   <StatusBadge status="in-progress" label="Deploying" />
 *
 * Dependencies: @fluentui/react-components, @fluentui/react-icons
 */

import React from "react";
import { Badge } from "@fluentui/react-components";
import {
  CheckmarkCircle16Filled,
  DismissCircle16Filled,
  Clock16Regular,
  Play16Filled,
  Pause16Regular,
  Warning16Regular,
} from "@fluentui/react-icons";

type Status =
  | "completed"
  | "in-progress"
  | "blocked"
  | "pending"
  | "paused"
  | "warning"
  | "draft"
  | "cancelled";

export interface StatusBadgeProps {
  status: Status;
  /** Override the default label */
  label?: string;
  size?: "small" | "medium" | "large";
  /** Additional CSS class name(s) to apply to the root element */
  className?: string;
}

const STATUS_CONFIG: Record<
  Status,
  {
    label: string;
    color: "success" | "warning" | "danger" | "informative" | "subtle" | "brand";
    icon: React.ReactElement;
    appearance: "tint" | "filled" | "ghost" | "outline";
  }
> = {
  completed:   { label: "Completed",   color: "success",     icon: <CheckmarkCircle16Filled />, appearance: "tint" },
  "in-progress":{ label: "In Progress", color: "brand",       icon: <Play16Filled />,            appearance: "tint" },
  blocked:     { label: "Blocked",     color: "danger",      icon: <DismissCircle16Filled />,   appearance: "tint" },
  pending:     { label: "Pending",     color: "informative", icon: <Clock16Regular />,           appearance: "tint" },
  paused:      { label: "Paused",      color: "subtle",      icon: <Pause16Regular />,           appearance: "tint" },
  warning:     { label: "Warning",     color: "warning",     icon: <Warning16Regular />,         appearance: "tint" },
  draft:       { label: "Draft",       color: "subtle",      icon: <Clock16Regular />,           appearance: "ghost" },
  cancelled:   { label: "Cancelled",   color: "subtle",      icon: <DismissCircle16Filled />,   appearance: "outline" },
};

/**
 * StatusBadge is a compact label used to communicate the status or category of an item — such as workflow states, priority levels, or lifecycle stages. Supports predefined semantic colors for common statuses.
 *
 * **When to use:** Displaying item states in data tables, cards, and lists — order status (Pending, Shipped, Delivered), task priority (High, Medium, Low), or lifecycle stages.
 *
 * **When NOT to use:** Counting items (use CounterBadge). User presence (use PresenceBadge). As a standalone interactive element — badges are non-interactive.
 */
export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, label, size = "medium" }: StatusBadgeProps, ref) => {
  const config = STATUS_CONFIG[status];
  return (
    <Badge
      appearance={config.appearance}
      color={config.color}
      icon={config.icon}
      size={size}
    >
      {label ?? config.label}
    </Badge>
  );
}
);
StatusBadge.displayName = "StatusBadge";
