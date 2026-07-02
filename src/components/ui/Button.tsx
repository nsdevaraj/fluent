/**
 * Button — Design System wrapper around Fluent UI Button
 *
 * Enforces DS constraints:
 *  - Only `small` and `medium` sizes (no `large`)
 *  - Loading state pattern with spinner
 *  - Typed icon position
 *  - aria-live region announces loading state to screen readers
 *
 * Usage:
 *   import { Button } from "../components/ui";
 *   <Button appearance="primary" icon={<Add20Regular />}>Add Item</Button>
 *   <Button appearance="secondary" loading>Saving…</Button>
 */
import React from "react";
import {
  Button as FluentButton,
  Spinner,
} from "@fluentui/react-components";

const srOnly: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

export type ButtonAppearance = "primary" | "secondary" | "subtle";
export type ButtonSize = "small" | "medium";

/**
 * Extends React.ButtonHTMLAttributes so that event handlers and aria-*
 * attributes injected by Fluent overlays (Tooltip, Popover, TeachingPopover)
 * via React.cloneElement are forwarded to the underlying <button> element.
 */
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  appearance?: ButtonAppearance;
  size?: ButtonSize;
  /** Shows a spinner and disables the button while true */
  loading?: boolean;
  /** Optional label announced to screen readers when loading is true */
  loadingLabel?: string;
  icon?: React.ReactElement;
  iconPosition?: "before" | "after";
}

/**
 * Button triggers an action or event when activated — such as submitting a form, opening a dialog, or performing an operation. Use the `primary` appearance for the single most important action; `subtle` or `transparent` for lower-emphasis actions.
 *
 * **When to use:** Standalone, clearly-labeled call-to-action that results in an immediate operation. One `primary` button maximum per surface.
 * **When NOT to use:** Navigation to a URL (use Link). Two-line secondary label (use CompoundButton). Opening a menu of options (use MenuButton or SplitButton).
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
  appearance = "secondary",
  size = "medium",
  loading = false,
  loadingLabel = "Loading",
  disabled,
  icon,
  iconPosition = "before",
  children,
  onClick,
  type = "button",
  className,
  style,
  "aria-label": ariaLabel,
  ...rest
}: ButtonProps, ref) => {
  return (
    <FluentButton
      {...rest}
      appearance={appearance}
      size={size}
      disabled={disabled || loading}
      icon={loading ? <Spinner size="tiny" aria-label={loadingLabel} /> : icon}
      iconPosition={iconPosition}
      onClick={onClick}
      type={type}
      className={className}
      style={style}
      aria-label={ariaLabel}
      aria-busy={loading}
      ref={ref}
    >
      {/* Loading announcement — inside the button so it's a single root element */}
      <span role="status" aria-live="polite" style={srOnly}>
        {loading ? loadingLabel : ""}
      </span>
      {children}
    </FluentButton>
  );
}
);
Button.displayName = "Button";
