/**
 * Dropdown — Design System custom-rendered listbox dropdown
 *
 * Unlike `Select` (native HTML select) and `Combobox` (searchable input + dropdown),
 * `Dropdown` renders a fully custom listbox with rich option rendering and
 * optional multiselect — no type-to-search by default.
 *
 * Usage (flat options):
 *   import { Dropdown } from "../components/ui";
 *
 *   <Dropdown
 *     placeholder="Select a color"
 *     aria-label="Color"
 *     options={[
 *       { value: "red",   text: "Red" },
 *       { value: "green", text: "Green" },
 *       { value: "blue",  text: "Blue", disabled: true },
 *     ]}
 *     onValueChange={(value, selectedOptions) => console.log(value, selectedOptions)}
 *   />
 *
 * Usage (grouped options):
 *   <Dropdown
 *     placeholder="Select a fruit"
 *     aria-label="Fruit"
 *     groups={[
 *       {
 *         label: "Citrus",
 *         options: [
 *           { value: "orange", text: "Orange" },
 *           { value: "lemon",  text: "Lemon" },
 *         ],
 *       },
 *       {
 *         label: "Berries",
 *         options: [
 *           { value: "strawberry", text: "Strawberry" },
 *           { value: "blueberry",  text: "Blueberry" },
 *         ],
 *       },
 *     ]}
 *   />
 *
 * Usage (multiselect):
 *   <Dropdown
 *     multiselect
 *     aria-label="Tags"
 *     options={tagOptions}
 *     value={selectedTags}
 *     onValueChange={(_lastValue, all) => setSelectedTags(all)}
 *   />
 */
import React from "react";
import {
  Dropdown as FluentDropdown,
  Option,
  OptionGroup,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import type {
  DropdownProps as FluentDropdownProps,
  OptionOnSelectData,
  SelectionEvents,
} from "@fluentui/react-components";

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
  // Fluent sets colorNeutralStrokeAccessible (darker) on borderBottomColor. Normalize all sides.
  dropdownNormalize: {
    borderBottomColor: tokens.colorNeutralStroke1,
    "&:hover": {
      borderBottomColor: tokens.colorNeutralStroke1Hover,
    },
  },
  // Kill Fluent's built-in ::after focus indicator — our wrapper provides one.
  dropdownRootNoAfter: {
    "::after": { content: "none" },
  },
});

// ── Public types ──────────────────────────────────────────────────────────────

export interface DropdownOption {
  value: string;
  text: string;
  disabled?: boolean;
}

export interface DropdownOptionGroup {
  label: string;
  options: DropdownOption[];
}

export type DropdownAppearance =
  | "outline"
  | "underline"
  | "filled-darker"
  | "filled-lighter";

export type DropdownSize = "small" | "medium" | "large";

export interface DropdownProps {
  /** Options list (flat). Use `groups` instead for grouped options. */
  options?: DropdownOption[];
  /** Grouped options. Use instead of `options`. */
  groups?: DropdownOptionGroup[];
  /** Selected value(s) for controlled mode. */
  value?: string | string[];
  /** Default selected value(s) for uncontrolled mode. */
  defaultValue?: string | string[];
  /** Fires when the selection changes. Receives the last-clicked value and the full selected array. */
  onValueChange?: (value: string, selectedOptions: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Allow multiple selection. */
  multiselect?: boolean;
  appearance?: DropdownAppearance;
  size?: DropdownSize;
  /** Accessible label (prefer this over aria-labelledby when there is no visible label element). */
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Normalise value / defaultValue to the `selectedOptions` string[] format Fluent expects. */
function toStringArray(v: string | string[] | undefined): string[] | undefined {
  if (v === undefined) return undefined;
  return Array.isArray(v) ? v : [v];
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Dropdown is a selection control that presents a bounded list of options in a popup. Unlike Combobox, the trigger is button-like — users pick from the list without typing to filter.
 *
 * **When to use:** Selecting from a bounded list where free-text entry is not appropriate. Medium-length lists where the selected value should always be visible. Multi-select with checkmarks.
 * **When NOT to use:** Long lists needing search/filter (use Combobox). Very short option sets of 2–4 items (use RadioGroup). When native select behavior is preferred for mobile (use Select).
 */
export const Dropdown: React.FC<DropdownProps> = ({
  options,
  groups,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  multiselect = false,
  appearance = "outline",
  size = "medium",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  style,
}) => {
  const styles = useStyles();

  // Build the selectedOptions / defaultSelectedOptions props only when provided,
  // so the component can operate in fully uncontrolled mode when neither is set.
  const controlledProps: Partial<FluentDropdownProps> = {};

  const selectedArray = toStringArray(value);
  const defaultSelectedArray = toStringArray(defaultValue);

  if (selectedArray !== undefined) {
    controlledProps.selectedOptions = selectedArray;
    // Derive the display value shown in the trigger button from the option text.
    const allOptions: DropdownOption[] = groups
      ? groups.flatMap((g) => g.options)
      : (options ?? []);
    controlledProps.value = allOptions
      .filter((o) => selectedArray.includes(o.value))
      .map((o) => o.text)
      .join(", ");
  }

  if (defaultSelectedArray !== undefined) {
    controlledProps.defaultSelectedOptions = defaultSelectedArray;
  }

  const handleOptionSelect = (
    _ev: SelectionEvents,
    data: OptionOnSelectData
  ) => {
    if (onValueChange) {
      onValueChange(data.optionValue ?? "", data.selectedOptions);
    }
  };

  const renderFlatOptions = (opts: DropdownOption[]) =>
    opts.map((opt) => (
      <Option key={opt.value} value={opt.value} disabled={opt.disabled}>
        {opt.text}
      </Option>
    ));

  const renderContent = () => {
    if (groups && groups.length > 0) {
      return groups.map((group) => (
        <OptionGroup key={group.label} label={group.label}>
          {renderFlatOptions(group.options)}
        </OptionGroup>
      ));
    }
    return renderFlatOptions(options ?? []);
  };

  return (
    <div className={mergeClasses(
      styles.inputWrapper,
      appearance === "outline" && !disabled && styles.inputWrapperIndicator
    )}>
      <FluentDropdown
        appearance={appearance}
        size={size}
        placeholder={placeholder}
        disabled={disabled}
        multiselect={multiselect}
        onOptionSelect={handleOptionSelect}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={mergeClasses(styles.dropdownNormalize, styles.dropdownRootNoAfter, className)}
        style={style}
        {...controlledProps}
      >
        {renderContent()}
      </FluentDropdown>
    </div>
  );
};

Dropdown.displayName = "Dropdown";
