/**
 * DatePicker — Date selection field following the Field + Input DS pattern
 *
 * Usage:
 *   import { DatePicker } from "../components/ui";
 *   <DatePicker
 *     label="Start date"
 *     onSelectDate={(date) => handleDateChange(date)}
 *     placeholder="Select a date"
 *   />
 *
 * Dependencies: @fluentui/react-datepicker-compat, @fluentui/react-components
 */

import React from "react";
import {
  DatePicker as FluentDatePicker,
  defaultDatePickerStrings,
} from "@fluentui/react-datepicker-compat";
import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { Field } from "./Field";
import type { DayOfWeek } from "@fluentui/react-calendar-compat";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  datePicker: {
    width: "100%",
  },
  // Wrapper div carries the bottom accent indicator via ::after.
  // clipPath clips the indicator to the input's rounded corners.
  // The calendar portal renders outside this div so it won't be clipped.
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
  // KEY: FluentDatePicker's root slot IS the fui-Input span — className goes there directly.
  // Use direct properties (no "& .fui-Input" descendant selector).
  datePickerNormalize: {
    borderBottomColor: tokens.colorNeutralStroke1,
    "&:hover": {
      borderBottomColor: tokens.colorNeutralStroke1Hover,
    },
  },
  // Kill Fluent's built-in ::after (positioned at bottom:-1px, outside the element).
  // Our wrapper ::after provides a clean indicator at bottom:0 instead.
  datePickerNoAfter: {
    "::after": { content: "none" },
  },
  datePickerError: {
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

export type DatePickerValidationState = "none" | "error" | "warning" | "success";

export interface DatePickerProps {
  label?: string;
  /** Controlled selected date */
  value?: Date | null;
  onSelectDate?: (date: Date | null | undefined) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  required?: boolean;
  /** Allow the user to type a date directly */
  allowTextInput?: boolean;
  /** First day of the week (0 = Sunday, 1 = Monday, etc.) */
  firstDayOfWeek?: DayOfWeek;
  validationState?: DatePickerValidationState;
  validationMessage?: string;
  hint?: string;
  className?: string;
}

/**
 * DatePicker is a popup calendar control (from @fluentui/react-datepicker-compat) for selecting
 * a single date. It shows a calendar view where day-of-week context is important — ideal for
 * appointments, scheduling, and date-range bounded inputs.
 *
 * **When to use:** Picking a specific date where calendar context matters — appointment dates,
 * departure dates, event scheduling. Also when limiting selectable ranges with minDate/maxDate.
 *
 * **When NOT to use:** When calendar context is irrelevant (e.g., date of birth — use a plain
 * text input with masking). Selecting a date range (use two DatePickers). When only year or
 * month is needed.
 */
export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({
  label,
  value,
  onSelectDate,
  placeholder = "Select a date",
  minDate,
  maxDate,
  disabled,
  required,
  allowTextInput = false,
  firstDayOfWeek,
  validationState,
  validationMessage,
  hint,
  className,
}: DatePickerProps, ref) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Field
        label={label ? `${label}${required ? " *" : ""}` : undefined}
        validationState={
          validationState && validationState !== "none" ? validationState : undefined
        }
        validationMessage={validationMessage}
        hint={hint}
      >
        <div className={mergeClasses(
          styles.inputWrapper,
          !disabled && validationState !== "error" && styles.inputWrapperIndicator
        )}>
          <FluentDatePicker
            value={value ?? undefined}
            onSelectDate={onSelectDate}
            placeholder={placeholder}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            allowTextInput={allowTextInput}
            firstDayOfWeek={firstDayOfWeek}
            strings={defaultDatePickerStrings}
            className={mergeClasses(
              className ?? styles.datePicker,
              styles.datePickerNormalize,
              styles.datePickerNoAfter,
              validationState === "error" && styles.datePickerError
            )}
            aria-required={required}
            aria-invalid={validationState === "error"}
          />
        </div>
      </Field>
    </div>
  );
}
);
DatePicker.displayName = "DatePicker";
