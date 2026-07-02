/**
 * Combobox — Design System searchable select with filtering
 *
 * Usage:
 *   import { Combobox } from "../components/ui";
 *   <Combobox label="Framework" options={[{ value: "react", label: "React" }]} />
 *   <Combobox label="User" options={users} freeform placeholder="Type to search…" />
 */
import React from "react";
import {
  Combobox as FluentCombobox,
  Option,
  OptionGroup,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import type { ComboboxProps as FluentComboboxProps } from "@fluentui/react-components";
import { Field } from "./Field";
import type { FieldProps } from "./Field";
import type { ValidationState } from "./CONSTANTS";
export type { ValidationState };

const useStyles = makeStyles({
  // Wrapper carries the bottom accent indicator via ::after.
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
  // Fluent's outline appearance sets colorNeutralStrokeAccessible (darker) on borderBottomColor.
  // Normalize all sides so the bottom doesn't appear double-dark.
  comboboxNormalize: {
    borderBottomColor: tokens.colorNeutralStroke1,
    "&:hover": {
      borderBottomColor: tokens.colorNeutralStroke1Hover,
    },
  },
  // Kill Fluent's built-in ::after focus indicator — our wrapper provides one.
  comboboxRootNoAfter: {
    "::after": { content: "none" },
  },
  comboboxRootError: {
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

export type InputAppearance = "outline" | "underline" | "filled-darker" | "filled-lighter";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxGroup {
  group: string;
  options: ComboboxOption[];
}

export type ComboboxOptions = ComboboxOption[] | ComboboxGroup[];

function isGrouped(options: ComboboxOptions): options is ComboboxGroup[] {
  return options.length > 0 && "group" in options[0];
}

export interface ComboboxProps extends Omit<FluentComboboxProps, "children"> {
  label?: string;
  hint?: string;
  options: ComboboxOptions;
  validationState?: ValidationState;
  validationMessage?: string;
  required?: boolean;
  /** Additional CSS class name(s) to apply to the root element */
  className?: string;
  appearance?: InputAppearance;
}

/**
 * Combobox combines a text input with a dropdown list, letting users type to filter options or select from a predefined set. Supports single and multi-select, option grouping, and freeform input.
 *
 * **When to use:** Long option lists where filtering by typing improves usability. Multi-select scenarios. When freeform input alongside predefined choices is acceptable.
 * **When NOT to use:** Very short lists under 5 items (use RadioGroup or Select). When free text is not desired (use Dropdown). When native browser select behavior is preferred on mobile (use Select).
 */
export const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  ({
  label,
  hint,
  options,
  validationState = "none",
  validationMessage,
  required,
  appearance = "outline",
  ...comboboxProps
}: ComboboxProps, ref) => {
  const styles = useStyles();
  const { className: userClassName, disabled, ...restComboboxProps } = comboboxProps;
  const fieldValidation: FieldProps["validationState"] =
    validationState === "none" ? undefined : validationState;

  const renderOptions = () => {
    if (isGrouped(options)) {
      return options.map((group) => (
        <OptionGroup key={group.group} label={group.group}>
          {group.options.map((opt) => (
            <Option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </Option>
          ))}
        </OptionGroup>
      ));
    }
    return (options as ComboboxOption[]).map((opt) => (
      <Option key={opt.value} value={opt.value} disabled={opt.disabled}>
        {opt.label}
      </Option>
    ));
  };

  return (
    <Field
      label={label}
      hint={hint}
      validationState={fieldValidation}
      validationMessage={validationMessage}
      required={required}
    >
      <div className={mergeClasses(
        styles.inputWrapper,
        appearance === "outline" && !disabled && validationState !== "error" && styles.inputWrapperIndicator
      )}>
        <FluentCombobox
            appearance={appearance}
            className={mergeClasses(
              styles.comboboxNormalize,
              styles.comboboxRootNoAfter,
              userClassName,
              validationState === "error" && styles.comboboxRootError
            )}
            disabled={disabled}
            {...restComboboxProps}
          >
          {renderOptions()}
        </FluentCombobox>
      </div>
    </Field>
  );
}
);
Combobox.displayName = "Combobox";
