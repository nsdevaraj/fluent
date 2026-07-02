/**
 * TextField — Design System input with full validation state support
 *
 * Usage:
 *   import { TextField } from "../components/ui";
 *   <TextField label="Email" type="email" required />
 *   <TextField label="Name" validationState="error" validationMessage="Required" />
 */
import React, { useState } from "react";
import {
  Field,
  Input,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import type { InputProps, FieldProps } from "@fluentui/react-components";
import type { ValidationState } from "./CONSTANTS";
export type { ValidationState };

export type InputAppearance = "outline" | "underline" | "filled-darker" | "filled-lighter";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", width: "100%" },
  charCount: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    textAlign: "end",
    marginTop: tokens.spacingVerticalXS,
  },
  charCountError: { color: tokens.colorStatusDangerForeground1 },

  /**
   * Fluent's Field uses colorPaletteRedForeground1 (#bc2f32) for error text/icon.
   * Design token "Status/Danger/Foreground/1/Rest" = colorStatusDangerForeground1 (#b10e1c).
   */
  validationMessageError: { color: tokens.colorStatusDangerForeground1 },
  validationMessageIconError: { color: tokens.colorStatusDangerForeground1 },

  /**
   * Wrapper clips ::after at the corner radius so the accent line is
   * always straight — never curved like Fluent's own ::after.
   */
  inputWrapper: {
    position: "relative",
    width: "100%",
    // display:flex removes the inline-flex baseline gap so bottom:0 aligns
    // exactly with the Input's visual bottom edge.
    display: "flex",
    flexDirection: "column",
    // clip-path is more reliable than overflow:hidden+borderRadius for
    // clipping ::after pseudo-elements across all browser rendering paths.
    // 4px = tokens.borderRadiusMedium
    clipPath: "inset(0px round 4px)",
  },

  /**
   * Rest / hover: 1px dark-grey accent line via the wrapper's ::after.
   */
  inputWrapperRest: {
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
  },

  /**
   * Focus: 2px brand-teal accent line via the wrapper's ::after.
   */
  inputWrapperFocused: {
    "::after": {
      content: '""',
      position: "absolute",
      bottom: "0px",
      left: "0px",
      right: "0px",
      height: "2px",
      backgroundColor: tokens.colorBrandStroke1,
      pointerEvents: "none",
      zIndex: 1,
    },
  },

  /**
   * Disable Fluent's built-in curved ::after entirely, and normalise
   * border-bottom-color so all four sides use the same token.
   * Fluent sets border-bottom-color: colorNeutralStrokeAccessible on the
   * Input root span, which creates a double-dark bottom — our ::after
   * handles the indicator instead.
   */
  inputRoot: {
    width: "100%",
    borderBottomColor: tokens.colorNeutralStroke1,
    ":hover": { borderBottomColor: tokens.colorNeutralStroke1Hover },
    "::after": { display: "none" },
    ":focus-within::after": { display: "none" },
  },

  /**
   * Error state: Fluent uses colorPaletteRedBorder2 (#d13438) by default,
   * but the design token "Status/Danger/Stroke/2/Rest" = colorStatusDangerBorder2 (#c50f1f).
   * Override to use the correct token.
   */
  inputRootError: {
    ":not(:focus-within)": {
      borderTopColor: tokens.colorStatusDangerBorder2,
      borderRightColor: tokens.colorStatusDangerBorder2,
      borderBottomColor: tokens.colorStatusDangerBorder2,
      borderLeftColor: tokens.colorStatusDangerBorder2,
    },
    ":hover:not(:focus-within)": {
      borderTopColor: tokens.colorStatusDangerBorder2,
      borderRightColor: tokens.colorStatusDangerBorder2,
      borderBottomColor: tokens.colorStatusDangerBorder2,
      borderLeftColor: tokens.colorStatusDangerBorder2,
    },
  },
});

export interface TextFieldProps extends Omit<InputProps, "size"> {
  label?: string;
  hint?: string;
  validationState?: ValidationState;
  validationMessage?: string;
  required?: boolean;
  size?: "small" | "medium";
  maxLength?: number;
  currentLength?: number;
  appearance?: InputAppearance;
}

/**
 * TextField is a styled single-line text input for capturing short freeform values such as names, email addresses, passwords, and URLs. It wraps Fluent UI's Input with a Field wrapper for consistent label, validation, and hint text support.
 *
 * **When to use:** Short, single-line user input in forms — names, emails, passwords, search terms. Always wrap in a Field for accessible labels and validation messages.
 * **When NOT to use:** Multi-line content (use Textarea), numeric bounded inputs (use SpinButton), or selecting from a predefined list (use Dropdown or Combobox).
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({
  label,
  hint,
  validationState = "none",
  validationMessage,
  required,
  maxLength,
  currentLength,
  appearance = "outline",
  disabled,
  readOnly,
  ...inputProps
}: TextFieldProps, ref) => {
  const styles = useStyles();
  const [isFocused, setIsFocused] = useState(false);

  const fieldValidation: FieldProps["validationState"] =
    validationState === "none" ? undefined : validationState;

  const isOverLimit =
    maxLength !== undefined &&
    currentLength !== undefined &&
    currentLength > maxLength;

  const effectiveValidation = isOverLimit ? "error" : validationState;

  // Only outline, non-disabled, non-readonly, non-error gets the accent line
  const showBottomLine =
    appearance === "outline" &&
    !disabled &&
    !readOnly &&
    effectiveValidation !== "error";

  const { onFocus: userOnFocus, onBlur: userOnBlur, ...restInputProps } = inputProps;

  return (
    <div className={styles.root}>
      <Field
        label={label}
        hint={hint}
        validationState={isOverLimit ? "error" : fieldValidation}
        validationMessage={effectiveValidation === "error"
          ? { children: isOverLimit ? `${currentLength}/${maxLength} — exceeded limit` : validationMessage, className: styles.validationMessageError }
          : isOverLimit ? `${currentLength}/${maxLength} — exceeded limit` : validationMessage}
        validationMessageIcon={effectiveValidation === "error" ? { className: styles.validationMessageIconError } : undefined}
        required={required}
      >
        <div
          className={mergeClasses(
            styles.inputWrapper,
            showBottomLine && !isFocused && styles.inputWrapperRest,
            showBottomLine && isFocused && styles.inputWrapperFocused,
          )}
        >
          <Input
            root={{ className: mergeClasses(styles.inputRoot, effectiveValidation === "error" && styles.inputRootError) }}
            ref={ref}
            appearance={appearance}
            disabled={disabled}
            readOnly={readOnly}
            onFocus={(e) => {
              setIsFocused(true);
              userOnFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              userOnBlur?.(e);
            }}
            {...restInputProps}
          />
        </div>
      </Field>
      {maxLength !== undefined && currentLength !== undefined && (
        <span
          className={
            isOverLimit
              ? `${styles.charCount} ${styles.charCountError}`
              : styles.charCount
          }
          aria-live="polite"
          aria-atomic="true"
        >
          {currentLength}/{maxLength}
          {isOverLimit ? " — exceeded limit" : ""}
        </span>
      )}
    </div>
  );
}
);
TextField.displayName = "TextField";
