/**
 * Icon — Design System accessible icon wrapper
 *
 * All icons MUST come from @fluentui/react-icons.
 * Never use hard-coded SVGs or third-party icon libraries.
 *
 * Enforces:
 *  - Decorative icons get aria-hidden automatically
 *  - Interactive/meaningful icons require an aria-label
 *  - Consistent sizing via the size prop
 *
 * Usage:
 *   import { Icon } from "../components/ui";
 *   import { Add20Regular, Home20Regular } from "@fluentui/react-icons";
 *
 *   // Decorative (aria-hidden applied automatically)
 *   <Icon icon={<Add20Regular />} />
 *
 *   // Meaningful (aria-label required)
 *   <Icon icon={<Add20Regular />} aria-label="Add item" />
 *
 *   // Sized (use 16, 20, 24, 28, 32, 48 — matching Fluent icon size suffixes)
 *   <Icon icon={<Add20Regular />} size={24} color="brand" />
 *
 * Available Fluent icon sizes: 10, 12, 16, 20, 24, 28, 32, 48
 * Available Fluent icon styles: Regular, Filled, Color
 * Full icon catalog: https://react.fluentui.dev/?path=/docs/icons-catalog--docs
 */
import React from "react";
import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import type { FluentIconElement } from "../../types/icons";

const useStyles = makeStyles({
  base: { display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  colorDefault: { color: tokens.colorNeutralForeground1 },
  colorMuted:   { color: tokens.colorNeutralForeground3 },
  colorBrand:   { color: tokens.colorBrandForeground1 },
  colorSuccess: { color: tokens.colorStatusSuccessForeground1 },
  colorWarning: { color: tokens.colorStatusWarningForeground1 },
  colorDanger:  { color: tokens.colorStatusDangerForeground1 },
  colorInherit: { color: "inherit" },
});

export type IconColor = "default" | "muted" | "brand" | "success" | "warning" | "danger" | "inherit";

export interface IconProps {
  /** A rendered Fluent icon element. Must be from @fluentui/react-icons. */
  icon: FluentIconElement;
  /** px size override — sets width and height on the wrapper */
  size?: number;
  color?: IconColor;
  /** Required for non-decorative icons */
  "aria-label"?: string;
  className?: string;
}

/**
 * Icon renders Fluent icons from @fluentui/react-icons with consistent sizing and color inheriting from the surrounding text. Provides a thin wrapper for easy integration with design system tokens.
 *
 * **When to use:** Visual affordances alongside labels — button icons, nav item icons, status indicators. Always provide accessible context (aria-label or visible label) when the icon is the sole communicator.
 * **When NOT to use:** Decorative icons that add no information should have aria-hidden. Don't use Icon as a standalone clickable element without wrapping it in a Button or Link.
 */
export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({
  icon,
  size,
  color = "inherit",
  "aria-label": ariaLabel,
  className,
}: IconProps, ref) => {
  const styles = useStyles();
  const colorKey = `color${color.charAt(0).toUpperCase() + color.slice(1)}` as keyof ReturnType<typeof useStyles>;
  const colorClass = styles[colorKey] as string;

  return (
    <span
      className={mergeClasses(styles.base, colorClass, className)}
      style={size ? { width: size, height: size, fontSize: size } : undefined}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      {icon}
    </span>
  );
}
);
Icon.displayName = "Icon";
