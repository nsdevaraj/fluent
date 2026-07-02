/**
 * TimePicker — Time selection input field.
 *
 * Wraps @fluentui/react-timepicker-compat TimePicker.
 *
 * Usage:
 *   import { TimePicker } from "../components/ui";
 *   <TimePicker
 *     label="Meeting time"
 *     value={selectedTime}
 *     onTimeChange={(time) => setSelectedTime(time)}
 *   />
 *
 * Dependencies: @fluentui/react-timepicker-compat, @fluentui/react-components
 */

import React from "react";
import { TimePicker as FluentTimePicker } from "@fluentui/react-timepicker-compat";
import type { TimeSelectionData } from "@fluentui/react-timepicker-compat";
import { makeStyles, mergeClasses, tokens } from "@fluentui/react-components";
import { Field } from "./Field";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  timePicker: {
    width: "100%",
  },
  // Wrapper carries the bottom accent indicator via ::after.
  // TimePicker internally wraps Combobox; className flows into the Combobox root.
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
  timePickerNormalize: {
    borderBottomColor: tokens.colorNeutralStroke1,
    "&:hover": {
      borderBottomColor: tokens.colorNeutralStroke1Hover,
    },
  },
  // Kill Fluent's built-in ::after focus indicator — our wrapper provides one.
  timePickerRootNoAfter: {
    "::after": { content: "none" },
  },
  timePickerError: {
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

export type TimePickerAppearance = "outline" | "underline" | "filled-darker" | "filled-lighter";

export interface TimePickerProps {
  label?: string;
  /** Controlled selected time */
  value?: Date | null;
  /** Default selected time for uncontrolled scenarios */
  defaultValue?: Date | null;
  /** Callback when a time is selected. Receives the Date (or null) and the display time string. */
  onTimeChange?: (date: Date | null, timeString: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  /** 12-hour or 24-hour clock. Mapped to hourCycle h12/h23. Default: 24 */
  hourCycle?: 12 | 24;
  /** Minute increment for the dropdown options (default: 30) */
  increment?: number;
  appearance?: TimePickerAppearance;
  size?: "small" | "medium";
  validationState?: "none" | "error" | "warning" | "success";
  validationMessage?: string;
  hint?: string;
  /** Start hour (inclusive), 0–24. Default: 0 */
  startHour?: number;
  /** End hour (exclusive), 0–24. Default: 24 */
  endHour?: number;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

/**
 * TimePicker is a dropdown/freeform input (from @fluentui/react-timepicker-compat) for selecting
 * a time value. Supports 12-hour and 24-hour clock formats and configurable minute increments
 * such as every 15 or 30 minutes.
 *
 * **When to use:** Selecting an appointment time, meeting time, or departure time. Pair with
 * DatePicker when both date and time are required.
 *
 * **When NOT to use:** Displaying a live clock. Selecting a time duration or elapsed time (use
 * a numeric input). When only hours or a free-text time entry is needed.
 */
export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  (
    {
      label,
      value,
      defaultValue,
      onTimeChange,
      placeholder = "Select a time",
      disabled,
      required,
      hourCycle = 24,
      increment = 30,
      appearance = "outline",
      size = "medium",
      validationState,
      validationMessage,
      hint,
      startHour,
      endHour,
      className,
      style,
      "aria-label": ariaLabel,
    },
    ref
  ) => {
    const styles = useStyles();

    const handleTimeChange = React.useCallback(
      (_event: unknown, data: TimeSelectionData) => {
        onTimeChange?.(data.selectedTime, data.selectedTimeText ?? "");
      },
      [onTimeChange]
    );

    return (
      <div className={styles.root} style={style}>
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
            appearance === "outline" && !disabled && validationState !== "error" && styles.inputWrapperIndicator
          )}>
            <FluentTimePicker
              ref={ref}
              selectedTime={value ?? null}
              defaultSelectedTime={defaultValue ?? undefined}
              onTimeChange={handleTimeChange}
              placeholder={placeholder}
              disabled={disabled}
              hourCycle={hourCycle === 12 ? "h12" : "h23"}
              increment={increment}
              appearance={appearance}
              size={size}
              startHour={startHour as Parameters<typeof FluentTimePicker>[0]["startHour"]}
              endHour={endHour as Parameters<typeof FluentTimePicker>[0]["endHour"]}
              className={mergeClasses(
                styles.timePickerNormalize,
                styles.timePickerRootNoAfter,
                className ?? styles.timePicker,
                validationState === "error" && styles.timePickerError
              )}
              aria-label={ariaLabel}
              aria-required={required}
              aria-invalid={validationState === "error"}
            />
          </div>
        </Field>
      </div>
    );
  }
);

TimePicker.displayName = "TimePicker";
