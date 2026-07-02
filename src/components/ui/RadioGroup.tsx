/**
 * RadioGroup — Design System radio button group with typed options
 *
 * Usage:
 *   import { RadioGroup } from "../components/ui";
 *   <RadioGroup
 *     label="Priority"
 *     value={priority}
 *     onChange={setPriority}
 *     options={[
 *       { value: "low", label: "Low" },
 *       { value: "high", label: "High", hint: "Notifies the team" },
 *     ]}
 *   />
 */
import React from "react";
import {
  RadioGroup as FluentRadioGroup,
  Radio,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import type { RadioGroupProps as FluentRadioGroupProps } from "@fluentui/react-components";
import { Field } from "./Field";
import type { FieldProps } from "./Field";
import type { ValidationState } from "./CONSTANTS";
export type { ValidationState };

const useStyles = makeStyles({
  hint: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXS,
    marginInlineStart: tokens.spacingHorizontalXL,
  },
});

export interface RadioOption {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<FluentRadioGroupProps, "onChange"> {
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  layout?: "vertical" | "horizontal";
  hint?: string;
  validationState?: ValidationState;
  validationMessage?: string;
  required?: boolean;
}

/**
 * RadioGroup presents a set of mutually exclusive option buttons where users must pick exactly
 * one choice. All options are visible simultaneously, and the component manages keyboard
 * navigation and ARIA grouping automatically.
 *
 * **When to use:** Exactly one selection from 2–8 mutually exclusive options where all choices
 * should be visible before deciding. Prefer RadioGroup over manually managing individual radio
 * buttons.
 *
 * **When NOT to use:** Binary yes/no (use Checkbox or Switch). More than 8 options (use
 * Dropdown/Select). Multi-select (use Checkbox group). When options vary dynamically based on
 * context.
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({
  label,
  options,
  value,
  onChange,
  layout = "vertical",
  hint,
  validationState = "none",
  validationMessage,
  required,
  ...rest
}: RadioGroupProps, ref) => {
  const styles = useStyles();
  const fieldValidation: FieldProps["validationState"] =
    validationState === "none" ? undefined : validationState;

  return (
    <Field
      label={label}
      hint={hint}
      validationState={fieldValidation}
      validationMessage={validationMessage}
      required={required}
    >
      <FluentRadioGroup
        value={value}
        onChange={(_, data) => onChange?.(data.value)}
        layout={layout}
        {...rest}
      >
        {options.map((opt) => (
          <div key={opt.value}>
            <Radio
              value={opt.value}
              label={opt.label}
              disabled={opt.disabled}
            />
            {opt.hint && (
              <div className={styles.hint}>{opt.hint}</div>
            )}
          </div>
        ))}
      </FluentRadioGroup>
    </Field>
  );
}
);
RadioGroup.displayName = "RadioGroup";
