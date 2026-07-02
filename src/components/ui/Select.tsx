/**
 * Select — Design System dropdown select
 *
 * Usage:
 *   import { Select } from "../components/ui";
 *   <Select label="Country" options={[{ value: "us", label: "United States" }]} />
 *   <Select label="Status" required validationState="error" validationMessage="Required" />
 */
import React from "react";
import {
  Select as FluentSelect,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import type { SelectProps as FluentSelectProps } from "@fluentui/react-components";
import { Field } from "./Field";
import type { FieldProps } from "./Field";
import type { ValidationState } from "./CONSTANTS";
export type { ValidationState };

const useStyles = makeStyles({
  // Wrapper for the bottom accent indicator — same clip-path approach as Textarea/SearchInput.
  inputWrapper: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    clipPath: "inset(0px round 4px)",
  },
  // Bottom accent line: 1px neutral at rest, 2px brand on focus.
  // :focus-within::after has higher CSS specificity than ::after alone, so focus wins.
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
  // Normalize all 4 border sides on the <select> element to be equal (Fluent makes bottom darker).
  // Also suppress Fluent's built-in gradient ::after on the root (we provide our own via wrapper).
  selectNormalize: {
    borderBottomColor: tokens.colorNeutralStroke1,
    "&:hover": {
      borderBottomColor: tokens.colorNeutralStroke1Hover,
    },
  },
  // Kill Fluent's gradient ::after on Select root so our wrapper's ::after is the only indicator.
  selectRootNoAfter: {
    "::after": { content: "none" },
  },
  // Applied to the `select` slot — Fluent's invalid style lives on state.select.className,
  // NOT state.root.className (root has transparent border).
  selectError: {
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

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectGroup {
  group: string;
  options: SelectOption[];
}

export type SelectOptions = SelectOption[] | SelectGroup[];

function isGrouped(options: SelectOptions): options is SelectGroup[] {
  return options.length > 0 && "group" in options[0];
}

export interface SelectProps extends Omit<FluentSelectProps, "children"> {
  label?: string;
  hint?: string;
  options: SelectOptions;
  placeholder?: string;
  validationState?: ValidationState;
  validationMessage?: string;
  required?: boolean;
  /** Additional CSS class name(s) to apply to the root element */
  className?: string;
  appearance?: InputAppearance;
}

/**
 * Select wraps the native browser `<select>` element with Fluent visual styling, preserving full cross-platform accessibility and mobile-native picker behavior.
 *
 * **When to use:** Form fields where a user picks one option from a list and native browser behavior is preferred — especially on mobile. The recommended default when filtering or multi-select are not required.
 * **When NOT to use:** When filtering/search is needed (use Combobox). Multi-select with custom rendering (use Combobox or Dropdown). When freeform input alongside list options is needed.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({
  label,
  hint,
  options,
  placeholder,
  validationState = "none",
  validationMessage,
  required,
  appearance = "outline",
  ...selectProps
}: SelectProps, ref) => {
  const styles = useStyles();
  const { className: userClassName, disabled, ...restSelectProps } = selectProps;
  const fieldValidation: FieldProps["validationState"] =
    validationState === "none" ? undefined : validationState;

  const renderOptions = () => {
    if (isGrouped(options)) {
      return options.map((group) => (
        <optgroup key={group.group} label={group.group}>
          {group.options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </optgroup>
      ));
    }
    return (options as SelectOption[]).map((opt) => (
      <option key={opt.value} value={opt.value} disabled={opt.disabled}>
        {opt.label}
      </option>
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
      {/* Wrapper provides the bottom accent indicator (clip-path clips to rounded corners).
          Field context flows through divs, so label/aria association is preserved. */}
      <div className={mergeClasses(
        styles.inputWrapper,
        appearance === "outline" && !disabled && styles.inputWrapperIndicator
      )}>
        <FluentSelect
            appearance={appearance}
            className={mergeClasses(userClassName, styles.selectRootNoAfter)}
            select={{ className: mergeClasses(styles.selectNormalize, validationState === "error" ? styles.selectError : undefined) }}
            disabled={disabled}
            {...restSelectProps}
          >
          {placeholder && <option value="">{placeholder}</option>}
          {renderOptions()}
        </FluentSelect>
      </div>
    </Field>
  );
}
);
Select.displayName = "Select";
