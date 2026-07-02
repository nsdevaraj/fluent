/**
 * Switch — Design System toggle switch
 *
 * Usage:
 *   import { Switch } from "../components/ui";
 *   <Switch label="Enable notifications" checked={enabled} onChange={setEnabled} />
 *   <Switch label="Dark mode" labelPosition="before" />
 */
import React from "react";
import {
  Switch as FluentSwitch,
} from "@fluentui/react-components";
import type { SwitchProps as FluentSwitchProps } from "@fluentui/react-components";
import { Field } from "./Field";
import type { FieldProps } from "./Field";

import type { ValidationState } from "./CONSTANTS";
export type { ValidationState };

export interface SwitchProps extends Omit<FluentSwitchProps, "onChange" | "checked"> {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  labelPosition?: "before" | "after";
  hint?: string;
  validationState?: ValidationState;
  validationMessage?: string;
  /** Additional CSS class name(s) to apply to the root element */
  className?: string;
}

/**
 * Switch is a toggle control representing a physical on/off switch for binary settings that
 * take immediate effect — no form submission required. The key criterion is immediacy: the
 * action happens the moment the switch is flipped.
 *
 * **When to use:** Settings that apply immediately on toggle — enabling features, turning on
 * notifications, activating dark mode. Use when the physical toggle metaphor aids understanding
 * of immediate effect.
 *
 * **When NOT to use:** When the change requires a subsequent submit step (use Checkbox in a
 * form). Selecting from several options (use RadioGroup). Multiple independent selections (use
 * Checkboxes).
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({
  label,
  checked,
  onChange,
  labelPosition = "after",
  hint,
  validationState = "none",
  validationMessage,
  ...rest
}: SwitchProps, ref) => {
  const fieldValidation: FieldProps["validationState"] =
    validationState === "none" ? undefined : validationState;

  const switchEl = (
    <FluentSwitch
      label={label}
      checked={checked}
      onChange={(_, data) => onChange?.(data.checked)}
      labelPosition={labelPosition}
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
        {switchEl}
      </Field>
    );
  }

  return switchEl;
}
);
Switch.displayName = "Switch";
