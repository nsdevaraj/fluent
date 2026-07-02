/**
 * Field — Label + validation + hint wrapper for form controls.
 *
 * Wraps Fluent UI v9 `Field`. Provides a consistent label, required marker,
 * validation message, and hint for any form control that does not already
 * bundle its own label support.
 *
 * NOTE: Use Field to add label/validation to any form control that doesn't
 * already have built-in label support. TextField, Select etc. have label
 * built in; use Field for Slider, Checkbox, or custom controls.
 *
 * Usage:
 *   import { Field } from "../components/ui";
 *
 *   // Wrap a Slider (no built-in label):
 *   <Field label="Volume" hint="Drag to adjust" required>
 *     <Slider min={0} max={100} defaultValue={50} />
 *   </Field>
 *
 *   // Error state:
 *   <Field
 *     label="Custom input"
 *     validationState="error"
 *     validationMessage="This field is required."
 *   >
 *     <input type="text" />
 *   </Field>
 *
 *   // Horizontal orientation:
 *   <Field label="Enable feature" orientation="horizontal">
 *     <Switch />
 *   </Field>
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import { Field as FluentField, makeStyles, mergeClasses, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  /**
   * Fluent's Field uses colorPaletteRedForeground1 (#bc2f32) for error
   * validation message text and icon. Design token
   * "Status/Danger/Foreground/1/Rest" = colorStatusDangerForeground1 (#b10e1c).
   * Override both slots so all components wrapping Field get the correct token.
   */
  validationMessageError: { color: tokens.colorStatusDangerForeground1 },
  validationMessageIconError: { color: tokens.colorStatusDangerForeground1 },
});

export type FieldValidationState = "none" | "error" | "warning" | "success";
export type FieldOrientation = "horizontal" | "vertical";
export type FieldSize = "small" | "medium" | "large";

export interface FieldProps {
  /** Label rendered above (or beside) the control */
  label?: React.ReactNode;
  /** Supplementary hint text rendered below the control */
  hint?: React.ReactNode;
  /** Validation message rendered below the control, styled per validationState */
  validationMessage?: React.ReactNode;
  /**
   * Controls the icon and colour of the validation message.
   * "none" renders no icon; omit or pass undefined to hide the message area.
   */
  validationState?: FieldValidationState;
  /** Appends a required marker (*) to the label */
  required?: boolean;
  /** Layout direction — "vertical" stacks label above control (default) */
  orientation?: FieldOrientation;
  /** Scales the label text. Defaults to "medium". */
  size?: FieldSize;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({
    label,
    hint,
    validationMessage,
    validationState,
    required = false,
    orientation = "vertical",
    size = "medium",
    children,
    className,
    style,
  }: FieldProps, ref) => {
    const styles = useStyles();

    // Fluent Field does not accept "none" as a validationState value —
    // treat it as undefined so no icon is rendered.
    const fluentValidationState =
      validationState === "none" ? undefined : validationState;

    const isError = fluentValidationState === "error";

    return (
      <FluentField
        ref={ref}
        label={label as Parameters<typeof FluentField>[0]["label"]}
        hint={hint as Parameters<typeof FluentField>[0]["hint"]}
        validationMessage={
          isError
            ? { children: validationMessage as React.ReactNode, className: styles.validationMessageError }
            : (validationMessage as Parameters<typeof FluentField>[0]["validationMessage"])
        }
        validationMessageIcon={
          isError ? { className: styles.validationMessageIconError } : undefined
        }
        validationState={fluentValidationState}
        required={required}
        orientation={orientation}
        size={size}
        className={className}
        style={style}
      >
        {children}
      </FluentField>
    );
  }
);
Field.displayName = "Field";
