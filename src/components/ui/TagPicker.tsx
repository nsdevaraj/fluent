/**
 * TagPicker — Multi-select input that renders selections as removable tags.
 *
 * Wraps Fluent UI v9 `TagPicker` family. Supports filtering, keyboard
 * navigation, custom option rendering, and controlled/uncontrolled modes.
 *
 * Usage:
 *   import { TagPicker } from "../components/ui";
 *   <TagPicker
 *     label="Assignees"
 *     options={[
 *       { value: "alice", label: "Alice Chen" },
 *       { value: "bob",   label: "Bob Smith" },
 *       { value: "carol", label: "Carol Jones" },
 *     ]}
 *     selectedValues={selected}
 *     onChange={setSelected}
 *     placeholder="Search people…"
 *   />
 *
 * Dependencies: @fluentui/react-components
 */
import React, { useState, useMemo } from "react";
import {
  TagPicker as FluentTagPicker,
  TagPickerControl as FluentTagPickerControl,
  TagPickerGroup as FluentTagPickerGroup,
  TagPickerInput as FluentTagPickerInput,
  TagPickerList as FluentTagPickerList,
  TagPickerOption as FluentTagPickerOption,
  TagPickerButton as FluentTagPickerButton,
  TagPickerOptionGroup as FluentTagPickerOptionGroup,
  Tag as FluentTag,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import { Field } from "./Field";
import type { TagPickerOnOptionSelectData } from "@fluentui/react-components";
import type { ValidationState } from "./CONSTANTS";
import { DS_PICKER_LIST_MAX_HEIGHT } from "./CONSTANTS";

// ── Sub-component re-exports for composable usage ────────────────────────────
export {
  FluentTagPickerControl    as TagPickerControl,
  FluentTagPickerGroup      as TagPickerGroup,
  FluentTagPickerInput      as TagPickerInput,
  FluentTagPickerList       as TagPickerList,
  FluentTagPickerOption     as TagPickerOption,
  FluentTagPickerButton     as TagPickerButton,
  FluentTagPickerOptionGroup as TagPickerOptionGroup,
};

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXS },
  list: { maxHeight: DS_PICKER_LIST_MAX_HEIGHT, overflowY: "auto" },
  noResults: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase300,
  },
  // Outer wrapper carries the bottom accent indicator via ::after.
  // TagPickerList renders via portal so clip-path does not clip the dropdown.
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
  // Normalize the dark bottom on TagPickerControl (same colorNeutralStrokeAccessible pattern).
  tagPickerControlNormalize: {
    borderBottomColor: tokens.colorNeutralStroke1,
    "&:hover": {
      borderBottomColor: tokens.colorNeutralStroke1Hover,
    },
  },
  // Kill TagPickerControl's built-in ::after focus indicator — outer wrapper provides one.
  tagPickerControlNoAfter: {
    "::after": { content: "none" },
  },
  tagPickerControlError: {
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

export interface TagPickerOption {
  value: string;
  label: string;
  /** Optional secondary text shown below the label */
  description?: string;
  disabled?: boolean;
}

export interface TagPickerProps {
  label?: string;
  options: TagPickerOption[];
  /** Controlled selected values */
  selectedValues?: string[];
  /** Callback when selection changes */
  onChange?: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  validationState?: ValidationState;
  validationMessage?: string;
  hint?: string;
  /** Allow typing values not in the options list */
  freeform?: boolean;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

/**
 * TagPicker combines a text search input with a tag display area, letting users select multiple
 * items from a searchable list and display them as removable tags. It's ideal for assigning
 * people, labels, or categories from large option sets.
 *
 * **When to use:** Selecting multiple items from a large, searchable dataset — assigning people,
 * adding labels or skills, tagging content. When the pool is too large for a checkbox list.
 *
 * **When NOT to use:** Small fixed option sets (use Checkbox group or multi-select Dropdown).
 * Single-selection scenarios (use Combobox or Select). Display-only tags (use Tag component
 * directly).
 */
export const TagPicker = React.forwardRef<HTMLDivElement, TagPickerProps>(
  ({
    label,
    options,
    selectedValues: controlledValues,
    onChange,
    placeholder = "Select…",
    disabled,
    required,
    validationState,
    validationMessage,
    hint,
    className,
    style,
    "aria-label": ariaLabel,
  }: TagPickerProps, ref) => {
    const styles = useStyles();
    const [query, setQuery] = useState("");
    const [internalSelected, setInternalSelected] = useState<string[]>([]);

    const isControlled = controlledValues !== undefined;
    const selectedValues = isControlled ? controlledValues : internalSelected;

    const handleOptionSelect = (_e: unknown, data: TagPickerOnOptionSelectData) => {
      const next = data.selectedOptions;
      if (!isControlled) setInternalSelected(next);
      onChange?.(next);
    };

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      return q
        ? options.filter((o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q))
        : options;
    }, [options, query]);

    const getLabel = (val: string) =>
      options.find((o) => o.value === val)?.label ?? val;

    // FluentTagPicker has strict children slot typing; alias bypasses without losing runtime behaviour
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const PickerComp: React.ComponentType<any> = FluentTagPicker;

    const picker = (
      <div className={mergeClasses(
        styles.inputWrapper,
        !disabled && validationState !== "error" && styles.inputWrapperIndicator
      )}>
        <PickerComp
          selectedOptions={selectedValues}
          onOptionSelect={handleOptionSelect}
          disabled={disabled}
          className={className}
          style={style}
          aria-label={ariaLabel ?? label}
        >
          <FluentTagPickerControl
            expandIcon={<FluentTagPickerButton aria-label="Open options" />}
            className={mergeClasses(
              styles.tagPickerControlNormalize,
              styles.tagPickerControlNoAfter,
              validationState === "error" ? styles.tagPickerControlError : undefined
            )}
          >
            <FluentTagPickerGroup aria-label="Selected items">
              {selectedValues.map((val) => (
                <FluentTag
                  key={val}
                  shape="rounded"
                  value={val}
                  aria-label={`Remove ${getLabel(val)}`}
                >
                  {getLabel(val)}
                </FluentTag>
              ))}
            </FluentTagPickerGroup>
            <FluentTagPickerInput
              placeholder={selectedValues.length === 0 ? placeholder : ""}
              aria-label={label ?? "Search options"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </FluentTagPickerControl>
          <FluentTagPickerList className={styles.list}>
            {filtered.length > 0
              ? filtered.map((opt) => (
                  <FluentTagPickerOption
                    key={opt.value}
                    value={opt.value}
                    aria-selected={selectedValues.includes(opt.value)}
                    secondaryContent={opt.description}
                  >
                    {opt.label}
                  </FluentTagPickerOption>
                ))
              : (
                <div className={styles.noResults} role="status" aria-live="polite">
                  No options match &ldquo;{query}&rdquo;
                </div>
              )}
          </FluentTagPickerList>
        </PickerComp>
      </div>
    );

    if (!label && !validationMessage && !hint) return picker;

    return (
      <div className={styles.root}>
        <Field
          label={label}
          required={required}
          validationState={validationState}
          validationMessage={validationMessage}
          hint={hint}
        >
          {picker}
        </Field>
      </div>
    );
  }
);
TagPicker.displayName = "TagPicker";
