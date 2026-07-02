/**
 * ToggleButton — A button that has a pressed/active state.
 *
 * Wraps Fluent UI v9 `ToggleButton`. Common uses:
 *  - Filter chips (Bold/Italic/Underline formatting)
 *  - View toggles (Grid / List)
 *  - Toolbar toggles
 *
 * Usage:
 *   import { ToggleButton } from "../components/ui";
 *   <ToggleButton icon={<GridRegular />} checked={isGrid} onChange={setIsGrid}>Grid</ToggleButton>
 *   <ToggleButton checked={isBold} onChange={setIsBold}>B</ToggleButton>
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import { ToggleButton as FluentToggleButton } from "@fluentui/react-components";

export type ToggleButtonAppearance = "primary" | "secondary" | "subtle";
export type ToggleButtonSize = "small" | "medium";

export interface ToggleButtonProps {
  /** Whether the button is in the pressed/active state */
  checked?: boolean;
  /** Callback when toggled */
  onChange?: (checked: boolean) => void;
  appearance?: ToggleButtonAppearance;
  size?: ToggleButtonSize;
  disabled?: boolean;
  icon?: React.ReactElement;
  iconPosition?: "before" | "after";
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
  /** Controlled — omit to use uncontrolled behaviour */
  defaultChecked?: boolean;
}

/**
 * ToggleButton maintains a checked/unchecked state and visually communicates that state. Ideal for toolbar formatting controls — Bold, Italic, Underline — or any two-state mode switch.
 *
 * **When to use:** Single action that switches between two states where the current state must be visible — formatting buttons in an editor, mute/unmute, show/hide a panel.
 * **When NOT to use:** Choosing from many mutually exclusive options (use RadioGroup). More than two states. On/off settings outside toolbars (consider Switch instead).
 */
export const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({
    checked,
    onChange,
    appearance = "secondary",
    size = "medium",
    disabled,
    icon,
    iconPosition = "before",
    children,
    onClick,
    className,
    style,
    "aria-label": ariaLabel,
    defaultChecked,
  }: ToggleButtonProps, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      // Fluent fires onChange via checked prop; we derive it from aria-pressed
    };

    return (
      <FluentToggleButton
        ref={ref}
        checked={checked}
        defaultChecked={defaultChecked}
        appearance={appearance}
        size={size}
        disabled={disabled}
        icon={icon}
        iconPosition={iconPosition}
        onClick={handleClick}
        onChange={onChange ? ((_e: unknown, data: unknown) =>
          onChange((data as { checked: boolean }).checked)
        ) as React.FormEventHandler<HTMLButtonElement> : undefined}
        className={className}
        style={style}
        aria-label={ariaLabel}
      >
        {children}
      </FluentToggleButton>
    );
  }
);
ToggleButton.displayName = "ToggleButton";
