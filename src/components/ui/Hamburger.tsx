/**
 * Hamburger — Navigation drawer toggle button (three-line icon).
 *
 * Wraps Fluent UI v9 `Hamburger`. Use to open/close a side navigation drawer
 * or any panel-style overlay. Provides the standard three-line menu icon and
 * correct ARIA attributes for an expanded/collapsed toggle.
 *
 * Usage:
 *   import { Hamburger } from "../components/ui";
 *
 *   const [open, setOpen] = React.useState(false);
 *
 *   // Basic toggle:
 *   <Hamburger onClick={() => setOpen(o => !o)} aria-expanded={open} />
 *
 *   // Custom label and small size:
 *   <Hamburger
 *     aria-label="Open main menu"
 *     aria-expanded={open}
 *     size="small"
 *     onClick={() => setOpen(o => !o)}
 *   />
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import { Hamburger as FluentHamburger } from "@fluentui/react-components";

export type HamburgerSize = "small" | "medium" | "large";

export interface HamburgerProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Accessible label for the button. Defaults to "Navigation menu". */
  "aria-label"?: string;
  /** Reflects the open/closed state of the controlled panel for screen readers. */
  "aria-expanded"?: boolean;
  size?: HamburgerSize;
  className?: string;
  style?: React.CSSProperties;
}

export const Hamburger = React.forwardRef<HTMLButtonElement, HamburgerProps>(
  ({
    onClick,
    "aria-label": ariaLabel = "Navigation menu",
    "aria-expanded": ariaExpanded,
    size = "medium",
    className,
    style,
  }: HamburgerProps, ref) => {
    return (
      <FluentHamburger
        ref={ref}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        size={size}
        className={className}
        style={style}
      />
    );
  }
);
Hamburger.displayName = "Hamburger";
