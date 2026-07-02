/**
 * ProgressBar — Determinate and indeterminate progress indicator
 *
 * Usage:
 *   import { ProgressBar } from "../components/ui";
 *   <ProgressBar label="Uploading…" value={0.65} showPercentage />
 *   <ProgressBar label="Processing…" />  // indeterminate
 *
 * Dependencies: @fluentui/react-components
 */

import React from "react";
import {
  ProgressBar as FluentProgressBar,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Caption } from "./Typography";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export type ProgressColor = "brand" | "success" | "warning" | "error";
export type ProgressThickness = "medium" | "large";

export interface ProgressBarProps {
  /** Visible label shown above the bar */
  label?: string;
  /**
   * Current progress, 0–1.
   * Omit (or undefined) for indeterminate animation.
   */
  value?: number;
  /** Show percentage text alongside the label */
  showPercentage?: boolean;
  color?: ProgressColor;
  thickness?: ProgressThickness;
  /** Hint text shown below the bar */
  hint?: string;
}

/**
 * ProgressBar provides a visual representation of loading or processing as a horizontal bar. Supports determinate mode (known percentage) and indeterminate mode (unknown duration, animated shimmer).
 *
 * **When to use:** Showing meaningful loading/processing progress — file uploads, multi-step form submissions, data loading where a completion percentage can be communicated.
 *
 * **When NOT to use:** When progress duration is completely unknown and cannot be approximated (use Spinner). Decorative percentage displays unrelated to an active process.
 */
export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({
  label,
  value,
  showPercentage = false,
  color = "brand",
  thickness = "medium",
  hint,
}: ProgressBarProps, ref) => {
  const styles = useStyles();
  const percentage = value !== undefined ? Math.round(value * 100) : undefined;

  return (
    <div className={styles.root}>
      {(label || (showPercentage && percentage !== undefined)) && (
        <div className={styles.labelRow}>
          {label && <Caption weight="semibold">{label}</Caption>}
          {showPercentage && percentage !== undefined && (
            <Caption color="subtle">{percentage}%</Caption>
          )}
        </div>
      )}

      <FluentProgressBar
        value={value}
        color={color}
        thickness={thickness}
        aria-label={label ?? "Progress"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      />

      {hint && <Caption color="subtle">{hint}</Caption>}
    </div>
  );
}
);
ProgressBar.displayName = "ProgressBar";
