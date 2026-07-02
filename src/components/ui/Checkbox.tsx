/**
 * Checkbox — Design System checkbox with indeterminate state support
 *
 * Usage:
 *   import { Checkbox } from "../components/ui";
 *   <Checkbox label="Accept terms" checked={checked} onChange={setChecked} />
 *   <Checkbox label="Select all" checked="mixed" onChange={handleAll} />
 */
import React from "react";
import {
  Checkbox as FluentCheckbox,
} from "@fluentui/react-components";
import type { CheckboxProps as FluentCheckboxProps } from "@fluentui/react-components";
import { Field } from "./Field";
import type { FieldProps } from "./Field";

import type { ValidationState } from "./CONSTANTS";
export type { ValidationState };

export interface CheckboxProps extends Omit<FluentCheckboxProps, "checked" | "onChange"> {
  label: string;
  /** true = checked, false = unchecked, "mixed" = indeterminate */
  checked?: boolean | "mixed";
  onChange?: (checked: boolean) => void;
  hint?: string;
  validationState?: ValidationState;
  validationMessage?: string;
  required?: boolean;
  /** Shape of the checkbox indicator — "square" (default) or "circular" */
  shape?: "square" | "circular";
  /** Additional CSS class name(s) to apply to the root element */
  className?: string;
}

/**
 * Checkbox is a form control with three states (checked, unchecked, indeterminate) for binary
 * yes/no choices or selecting multiple independent items from a group. The indeterminate state
 * represents a parent whose children are partially selected.
 *
 * **When to use:** Single binary agreement (e.g., "I agree to terms"). Multiple independent
 * selections from a group of up to ~10 items. Indeterminate state for parent/child selection
 * patterns.
 *
 * **When NOT to use:** Mutually exclusive options (use RadioGroup). Immediate on/off actions
 * (use Switch). More than 10 options (use a multi-select list). When the unchecked-state meaning
 * is ambiguous.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
  label,
  checked,
  onChange,
  hint,
  validationState = "none",
  validationMessage,
  required,
  ...rest
}: CheckboxProps, ref) => {
  const fieldValidation: FieldProps["validationState"] =
    validationState === "none" ? undefined : validationState;

  const checkbox = (
    <FluentCheckbox
      label={label}
      checked={checked}
      onChange={(_, data) => onChange?.(!!data.checked)}
      required={required}
      {...rest}
    />
  );

  if (hint || validationState !== "none") {
    return (
      <Field
        hint={hint}
        validationState={fieldValidation}
        validationMessage={validationMessage}
      >
        {checkbox}
      </Field>
    );
  }

  return checkbox;
}
);
Checkbox.displayName = "Checkbox";
