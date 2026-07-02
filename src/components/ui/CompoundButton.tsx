/**
 * CompoundButton — A two-line button with a primary label and secondary description.
 *
 * Wraps Fluent UI v9 `CompoundButton`. Common uses:
 *  - Onboarding option cards ("Get started" / "Import existing data")
 *  - Feature selection screens
 *  - Wizard step navigation
 *
 * Usage:
 *   import { CompoundButton } from "../components/ui";
 *   <CompoundButton
 *     appearance="primary"
 *     icon={<AddCircle24Regular />}
 *     secondaryContent="Start from scratch"
 *   >
 *     Create new project
 *   </CompoundButton>
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import { CompoundButton as FluentCompoundButton } from "@fluentui/react-components";

export type CompoundButtonAppearance = "primary" | "secondary" | "subtle";
export type CompoundButtonSize = "small" | "medium";

export interface CompoundButtonProps {
  /** Main label (primary line) */
  children: React.ReactNode;
  /** Subtitle shown below the primary label */
  secondaryContent?: React.ReactNode;
  appearance?: CompoundButtonAppearance;
  size?: CompoundButtonSize;
  disabled?: boolean;
  icon?: React.ReactElement;
  iconPosition?: "before" | "after";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
  /** Block-level (full width) */
  block?: boolean;
}

/**
 * CompoundButton is a Button that displays a secondary line of descriptive text beneath the primary label, giving the user additional context about the action. Used in wizard/onboarding flows or feature-selection screens.
 *
 * **When to use:** When a single-word label is insufficient and a short supporting description adds meaningful clarity — e.g., 'Create new' with secondary text 'Start from a blank template'.
 * **When NOT to use:** Toolbars or dense UIs where vertical space is constrained (use a regular Button with a Tooltip). When the secondary content merely repeats the primary label.
 */
export const CompoundButton = React.forwardRef<HTMLButtonElement, CompoundButtonProps>(
  ({
    children,
    secondaryContent,
    appearance = "secondary",
    size = "medium",
    disabled,
    icon,
    iconPosition = "before",
    onClick,
    type = "button",
    className,
    style,
    "aria-label": ariaLabel,
    block = false,
  }: CompoundButtonProps, ref) => {
    return (
      <FluentCompoundButton
        ref={ref}
        secondaryContent={secondaryContent as string}
        appearance={appearance}
        size={size}
        disabled={disabled}
        icon={icon}
        iconPosition={iconPosition}
        onClick={onClick}
        type={type}
        className={className}
        style={block ? { width: "100%", ...style } : style}
        aria-label={ariaLabel}
      >
        {children}
      </FluentCompoundButton>
    );
  }
);
CompoundButton.displayName = "CompoundButton";
