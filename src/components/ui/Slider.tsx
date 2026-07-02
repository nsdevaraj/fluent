/**
 * Slider — Range slider following the Field + Input DS pattern
 *
 * Usage:
 *   import { Slider } from "../components/ui";
 *   <Slider label="Volume" min={0} max={100} defaultValue={50} showValue />
 *
 * Dependencies: @fluentui/react-components
 */

import React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import {
  Slider as FluentSlider,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Field } from "./Field";
import type { SliderProps as FluentSliderProps } from "@fluentui/react-components";
import type { ValidationState } from "./CONSTANTS";
export type { ValidationState };

const useStyles = makeStyles({
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  valueDisplay: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    minWidth: tokens.spacingHorizontalXXL,
    textAlign: "end",
  },
});

export interface SliderProps {
  label?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  size?: "small" | "medium";
  /** Show the current value alongside the label */
  showValue?: boolean;
  /** Format function for the displayed value */
  formatValue?: (value: number) => string;
  required?: boolean;
  validationState?: ValidationState;
  validationMessage?: string;
  hint?: string;
  /** Render the slider vertically */
  vertical?: boolean;
}

/**
 * Slider lets users select a value from a continuous or stepped range by dragging a thumb along
 * a track. Best for settings perceived as relative quantities rather than exact numbers — like
 * volume, brightness, or zoom.
 *
 * **When to use:** Settings like volume, brightness, opacity, zoom level. When users think in
 * relative terms (low/medium/high). When immediate visual feedback from adjusting the value is
 * beneficial. 4+ discrete steps.
 *
 * **When NOT to use:** Binary on/off settings (use Switch). Exact known values (use SpinButton
 * or TextField). Fewer than 4 options (use RadioGroup). Keyboard-heavy users who prefer direct
 * numeric input.
 */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({
  label,
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled,
  size = "medium",
  showValue = false,
  formatValue,
  required,
  validationState,
  validationMessage,
  hint,
  vertical,
}: SliderProps, ref) => {
  const styles = useStyles();

  const [current, setCurrent] = useControllableState<number>(controlledValue, defaultValue ?? 0);

  const handleChange: FluentSliderProps["onChange"] = (_, data) => {
    setCurrent(data.value);
    onChange?.(data.value);
  };

  const displayValue = formatValue ? formatValue(current) : String(current);

  const labelNode = (label || showValue) ? (
    <div className={styles.labelRow}>
      {label && <span>{label}{required && " *"}</span>}
      {showValue && <span className={styles.valueDisplay}>{displayValue}</span>}
    </div>
  ) : undefined;

  return (
    <Field
      label={labelNode}
      validationState={validationState !== "none" ? validationState : undefined}
      validationMessage={validationMessage}
      hint={hint}
    >
      <FluentSlider
        value={current}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        disabled={disabled}
        size={size}
        vertical={vertical}
        aria-valuetext={displayValue}
      />
    </Field>
  );
}
);
Slider.displayName = "Slider";
