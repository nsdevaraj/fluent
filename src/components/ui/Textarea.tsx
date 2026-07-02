/**
 * Textarea — Design System multiline input
 *
 * Usage:
 *   import { Textarea } from "../components/ui";
 *   <Textarea label="Description" rows={4} maxLength={300} />
 *   <Textarea label="Notes" validationState="error" validationMessage="Required" />
 */
import React, { useState } from "react";
import {
  Textarea as FluentTextarea,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import type { TextareaProps as FluentTextareaProps } from "@fluentui/react-components";
import { Field } from "./Field";
import type { ValidationState } from "./CONSTANTS";
export type { ValidationState };

export type InputAppearance = "outline" | "filled-darker" | "filled-lighter" | "filled-darker-shadow" | "filled-lighter-shadow";

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
   * Wrapper clips ::after at the corner radius so the accent line is
   * always straight — never curved like Fluent's own ::after.
   * display:flex removes the inline-flex baseline gap so bottom:0
   * aligns exactly with the textarea's visual bottom edge.
   */
  inputWrapper: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    clipPath: "inset(0px round 4px)",
  },

  /** Rest / hover: 1px dark-grey accent line via the wrapper's ::after. */
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

  /** Focus: 2px brand-teal accent line via the wrapper's ::after. */
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
   */
  textareaRoot: {
    width: "100%",
    borderBottomColor: tokens.colorNeutralStroke1,
    ":hover": { borderBottomColor: tokens.colorNeutralStroke1Hover },
    "::after": { display: "none" },
    ":focus-within::after": { display: "none" },
  },

  /**
   * Error state: override to colorStatusDangerBorder2 (#c50f1f)
   * instead of Fluent's colorPaletteRedBorder2 (#d13438).
   */
  textareaRootError: {
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

export interface TextareaProps extends Omit<FluentTextareaProps, "appearance"> {
  label?: string;
  hint?: string;
  validationState?: ValidationState;
  validationMessage?: string;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  currentLength?: number;
  appearance?: InputAppearance;
}

/**
 * Textarea is a multi-line text input for capturing longer freeform content like comments, descriptions, notes, or messages. It wraps Fluent UI's Textarea with configurable resize behavior and row count.
 *
 * **When to use:** When users need to enter multiple lines of text — comments, feedback, notes, descriptions.
 * **When NOT to use:** Short single-line input (use TextField). Rich text with formatting (use a rich-text editor). Structured or constrained input like dates or numbers.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    label,
    hint,
    validationState = "none",
    validationMessage,
    required,
    rows = 3,
    maxLength,
    currentLength,
    appearance = "outline",
    disabled,
    readOnly,
    ...textareaProps
  }: TextareaProps, ref) => {
    const styles = useStyles();
    const [isFocused, setIsFocused] = useState(false);

    const { onFocus: userOnFocus, onBlur: userOnBlur, ...restTextareaProps } = textareaProps;

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

    return (
      <div className={styles.root}>
        <Field
          label={label}
          hint={hint}
          validationState={isOverLimit ? "error" : validationState}
          validationMessage={
            isOverLimit
              ? `${currentLength}/${maxLength} — exceeded limit`
              : validationMessage
          }
          required={required}
        >
          <div
            className={mergeClasses(
              styles.inputWrapper,
              showBottomLine && !isFocused && styles.inputWrapperRest,
              showBottomLine && isFocused && styles.inputWrapperFocused,
            )}
          >
            <FluentTextarea
              root={{
                className: mergeClasses(
                  styles.textareaRoot,
                  effectiveValidation === "error" && styles.textareaRootError,
                ),
              }}
              ref={ref}
              appearance={appearance}
              disabled={disabled}
              readOnly={readOnly}
              rows={rows}
              onFocus={(e) => {
                setIsFocused(true);
                userOnFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                userOnBlur?.(e);
              }}
              {...restTextareaProps}
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
Textarea.displayName = "Textarea";
