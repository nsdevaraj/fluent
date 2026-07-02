/**
 * Spinner — Design System loading indicator
 *
 * Usage:
 *   import { Spinner } from "../components/ui";
 *   <Spinner />
 *   <Spinner size="large" label="Loading data…" />
 *   <Spinner size="tiny" labelPosition="before" />
 */
import React from "react";
import { Spinner as FluentSpinner } from "@fluentui/react-components";
import type { SpinnerProps as FluentSpinnerProps } from "@fluentui/react-components";

export type SpinnerSize = "tiny" | "extra-small" | "small" | "medium" | "large" | "extra-large" | "huge";

export interface SpinnerProps extends Omit<FluentSpinnerProps, "size"> {
  size?: SpinnerSize;
  label?: string;
  labelPosition?: "above" | "below" | "before" | "after";
  /** Additional CSS class name(s) to apply to the root element */
  className?: string;
}

/**
 * Spinner alerts users that content is loading or processing by rendering an animated circular indicator. Used for indeterminate operations where a progress percentage cannot be provided.
 *
 * **When to use:** Operations in progress with unknown duration — lazy-loading a panel, submitting a form, waiting for an API response. Best for short or indeterminate loading states.
 *
 * **When NOT to use:** When the duration is known and representable as a percentage (use ProgressBar). Without an accessible label — screen readers must announce the loading state.
 */
export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({
  size = "medium",
  label,
  labelPosition = "after",
  ...rest
}: SpinnerProps, ref) => {
  // WCAG 4.1.2: role="progressbar" requires an accessible name.
  // When no visible label is provided, supply a screen-reader-only aria-label.
  const ariaLabel = rest["aria-label"] ?? (!label ? "Loading" : undefined);

  return (
    <FluentSpinner
      size={size}
      label={label}
      labelPosition={labelPosition}
      aria-label={ariaLabel}
      {...rest}
    />
  );
}
);
Spinner.displayName = "Spinner";
