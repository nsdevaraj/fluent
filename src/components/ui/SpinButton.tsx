/**
 * SpinButton — Numeric input with increment / decrement controls.
 *
 * Wraps Fluent UI v9 `SpinButton` inside the DS `Field` pattern for
 * consistent label, hint, and validation support.
 *
 * Usage:
 *   import { SpinButton } from "../components/ui";
 *   <SpinButton
 *     label="Quantity"
 *     min={1}
 *     max={100}
 *     step={1}
 *     defaultValue={10}
 *     onChange={(value) => setQty(value)}
 *   />
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  SpinButton as FluentSpinButton,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import { Field } from "./Field";
import type { SpinButtonChangeEvent, SpinButtonOnChangeData } from "@fluentui/react-components";
import type { ValidationState } from "./CONSTANTS";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXS },
  // Wrapper carries the bottom accent indicator via ::after.
  // SpinButton uses ::before for its border — no ::after to kill.
  inputWrapper: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    clipPath: "inset(0px round 4px)",
  },
  inputWrapperIndicator: {
    "::after": {
      content: '""',
      position: "absolute",
      bottom: "0px",
      left: "0px",
      right: "0px",
      height: "1px",
      backgroundColor: tokens.colorNeutralStrokeAccessible,
      pointerEvents: "none",
      zIndex: 1,
    },
    ":focus-within::after": {
      height: "2px",
      backgroundColor: tokens.colorBrandStroke1,
    },
  },
  // SpinButton uses ::before for its border. The base style sets borderBottomColor: colorNeutralStrokeAccessible
  // on ::before (darker than other sides). Normalize to match all four sides.
  spinButtonNormalize: {
    "::before": {
      borderBottomColor: tokens.colorNeutralStroke1,
    },
    ":hover::before": {
      borderBottomColor: tokens.colorNeutralStroke1Hover,
    },
  },
  // SpinButton uses ::before on root for its border (not direct border properties).
  // Fluent's invalid style: ':not(:focus-within),:hover:not(:focus-within)' → { '::before': { borderColor: ... } }
  // We must mirror the same structure to override it.
  spinButtonRootError: {
    ":not(:focus-within),:hover:not(:focus-within)": {
      "::before": {
        borderTopColor: tokens.colorStatusDangerBorder2,
        borderRightColor: tokens.colorStatusDangerBorder2,
        borderBottomColor: tokens.colorStatusDangerBorder2,
        borderLeftColor: tokens.colorStatusDangerBorder2,
      },
    },
  },
});

export type SpinButtonAppearance = "outline" | "underline" | "filled-darker" | "filled-lighter";

export interface SpinButtonProps {
  label?: string;
  /** Controlled value */
  value?: number;
  /** Uncontrolled default */
  defaultValue?: number;
  min?: number;
  max?: number;
  /** Step per click/arrow key. Default 1. */
  step?: number;
  /** Step multiplier when Shift is held. Default 10. */
  stepPage?: number;
  /** Decimal precision for display */
  precision?: number;
  /** Prefix text (e.g. "$") */
  prefix?: string;
  /** Suffix text (e.g. "kg") */
  suffix?: string;
  disabled?: boolean;
  required?: boolean;
  validationState?: ValidationState;
  validationMessage?: string;
  hint?: string;
  appearance?: SpinButtonAppearance;
  onChange?: (value: number | null) => void;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

/**
 * SpinButton is a numeric input with increment/decrement buttons, bounded between configurable min and max values. Values change via buttons, keyboard arrows, or direct text entry.
 *
 * **When to use:** Numeric value entry within a known range — quantity selectors, font size pickers, page numbers, any bounded integer or decimal input.
 * **When NOT to use:** Unbounded numeric input (use TextField with type='number'). Non-numeric values (use Dropdown). Very large ranges where direct keyboard entry is more efficient.
 */
export const SpinButton = React.forwardRef<HTMLInputElement, SpinButtonProps>(
  ({
    label,
    value,
    defaultValue,
    min,
    max,
    step = 1,
    stepPage,
    precision,
    prefix,
    suffix,
    disabled,
    required,
    validationState,
    validationMessage,
    hint,
    appearance = "outline",
    onChange,
    className,
    style,
    "aria-label": ariaLabel,
  }: SpinButtonProps, ref) => {
    const styles = useStyles();

    const handleChange = (_e: SpinButtonChangeEvent, data: SpinButtonOnChangeData) => {
      onChange?.(data.value ?? null);
    };

    const spinButton = (
      <div className={mergeClasses(
        styles.inputWrapper,
        appearance === "outline" && !disabled && validationState !== "error" && styles.inputWrapperIndicator
      )}>
        <FluentSpinButton
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          min={min}
          max={max}
          step={step}
          stepPage={stepPage}
          precision={precision}
          displayValue={
            value != null
              ? `${prefix ?? ""}${value}${suffix ?? ""}`
              : undefined
          }
          disabled={disabled}
          appearance={appearance}
          onChange={handleChange}
          className={mergeClasses(styles.spinButtonNormalize, className, validationState === "error" && styles.spinButtonRootError)}
          style={style}
          aria-label={ariaLabel ?? label}
          aria-valuemin={min}
          aria-valuemax={max}
        />
      </div>
    );

    if (!label && !validationMessage && !hint) return spinButton;

    return (
      <div className={styles.root}>
        <Field
          label={label}
          required={required}
          validationState={validationState}
          validationMessage={validationMessage}
          hint={hint}
        >
          {spinButton}
        </Field>
      </div>
    );
  }
);
SpinButton.displayName = "SpinButton";
