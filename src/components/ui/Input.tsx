/**
 * Input — Bare single-line text input primitive.
 *
 * Wraps Fluent UI v9 `Input`. This is the headless input element without
 * label or validation — use `TextField` for the full labeled field, or
 * compose this with `Field` and `Label` for custom form control layouts.
 *
 * Usage:
 *   import { Input, Field, Label } from "../components/ui";
 *
 *   // Standalone:
 *   <Input placeholder="Enter value" value={val} onChange={(e) => setVal(e.target.value)} />
 *
 *   // Composed with Field:
 *   <Field label="Username" required validationMessage={error}>
 *     <Input
 *       appearance="underline"
 *       value={username}
 *       onChange={(e) => setUsername(e.target.value)}
 *     />
 *   </Field>
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  Input as FluentInput,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import type { InputOnChangeData } from "@fluentui/react-components";

const useStyles = makeStyles({
  // Wrapper div carries the bottom accent indicator via ::after.
  // clip-path trims the indicator to the input's rounded corners.
  inputWrapper: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    clipPath: "inset(0px round 4px)",
  },
  // 1px neutral at rest → 2px brand on focus-within.
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
    // When Field injects error state it sets aria-invalid on the inner FluentInput.
    // :has() detects this and suppresses the neutral indicator so the red border shows cleanly.
    // Higher specificity than ::after alone so it always wins.
    "&:has([aria-invalid=true])::after": {
      content: "none",
    },
  },
  // Fluent sets colorNeutralStrokeAccessible (darker) on borderBottomColor.
  // Normalize all sides so the bottom doesn't appear double-dark.
  inputNormalize: {
    borderBottomColor: tokens.colorNeutralStroke1,
    "&:hover": {
      borderBottomColor: tokens.colorNeutralStroke1Hover,
    },
  },
  // Kill Fluent's built-in ::after focus indicator — our wrapper provides one.
  inputRootNoAfter: {
    "::after": { content: "none" },
  },
});

export type InputAppearance = "outline" | "underline" | "filled-darker" | "filled-lighter";
export type InputSize = "small" | "medium" | "large";
export type InputType = "text" | "email" | "password" | "number" | "search" | "tel" | "url";

export interface InputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  appearance?: InputAppearance;
  size?: InputSize;
  type?: InputType;
  /** Content slot rendered at the start of the input (e.g. an icon) */
  contentBefore?: React.ReactElement;
  /** Content slot rendered at the end of the input (e.g. an icon) */
  contentAfter?: React.ReactElement;
  id?: string;
  name?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling";
  className?: string;
  style?: React.CSSProperties;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    value,
    defaultValue,
    onChange,
    placeholder,
    disabled,
    readOnly,
    required,
    appearance = "outline",
    size = "medium",
    type = "text",
    contentBefore,
    contentAfter,
    id,
    name,
    autoFocus,
    autoComplete,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedby,
    "aria-invalid": ariaInvalid,
    className,
    style,
  }: InputProps, ref) => {
    const styles = useStyles();
    return (
      <div className={mergeClasses(
        styles.inputWrapper,
        appearance === "outline" && !disabled && styles.inputWrapperIndicator
      )}>
        <FluentInput
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          appearance={appearance}
          size={size}
          type={type}
          contentBefore={contentBefore}
          contentAfter={contentAfter}
          id={id}
          name={name}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          aria-invalid={ariaInvalid}
          className={mergeClasses(styles.inputNormalize, styles.inputRootNoAfter, className)}
          style={style}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
