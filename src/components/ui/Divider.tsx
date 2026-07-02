/**
 * Divider — Design System separator, horizontal or vertical, with optional label
 *
 * Usage:
 *   import { Divider } from "../components/ui";
 *   <Divider />
 *   <Divider label="Or continue with" />
 *   <Divider vertical style={{ height: 40 }} />
 */
import React from "react";
import { Divider as FluentDivider } from "@fluentui/react-components";
import type { DividerProps as FluentDividerProps } from "@fluentui/react-components";

export interface DividerProps extends FluentDividerProps {
  label?: string;
  /** Additional CSS class name(s) to apply to the root element */
  className?: string;
}

/**
 * Divider is a thin horizontal or vertical line for visually separating content into sections. Can optionally contain a label or icon centered on the line.
 *
 * **When to use:** Organizing related content groups within a single surface — separating form sections, menu item groups, or logical groupings in a layout. A labeled Divider serves as a section header within a list.
 *
 * **When NOT to use:** As a substitute for proper heading hierarchy or whitespace/padding separation — prefer spacing tokens when a semantic section break is not needed.
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ label, children, ...rest }: DividerProps, ref) => {
  return (
    <FluentDivider {...rest}>
      {label ?? children}
    </FluentDivider>
  );
}
);
Divider.displayName = "Divider";
