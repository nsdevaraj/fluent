/**
 * InfoLabel — Form label with an inline information tooltip.
 *
 * Wraps Fluent UI v9 `InfoLabel` and `InfoButton`. The InfoButton opens a
 * popover with supplementary context — common in enterprise forms where
 * field labels need elaboration without cluttering the UI.
 *
 * Usage:
 *   import { InfoLabel, InfoButton } from "../components/ui";
 *
 *   // Full label with info popover:
 *   <InfoLabel
 *     label="Retention period"
 *     info="How long records are kept before automatic deletion. Minimum 30 days."
 *     required
 *   />
 *
 *   // Standalone info button:
 *   <InfoButton content="This field controls X." />
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  InfoLabel as FluentInfoLabel,
  InfoButton as FluentInfoButton,
  tokens,
} from "@fluentui/react-components";
import type { PositioningShorthand } from "@fluentui/react-components";

// ── InfoButton ────────────────────────────────────────────────────────────────

export interface InfoButtonProps {
  /** Content shown inside the info popover */
  content: React.ReactNode;
  size?: "small" | "medium";
  positioning?: PositioningShorthand;
  /** aria-label for the info button itself */
  "aria-label"?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const InfoButton = React.forwardRef<HTMLButtonElement, InfoButtonProps>(
  ({
    content,
    size = "medium",
    "aria-label": ariaLabel = "More information",
    className,
    style,
  }: InfoButtonProps, ref) => {
    return (
      <FluentInfoButton
        ref={ref}
        size={size}
        aria-label={ariaLabel}
        className={className}
        style={style}
      >
        {content}
      </FluentInfoButton>
    );
  }
);
InfoButton.displayName = "InfoButton";

// ── InfoLabel ─────────────────────────────────────────────────────────────────

export type InfoLabelSize = "small" | "medium";
export type InfoLabelWeight = "regular" | "semibold";

export interface InfoLabelProps {
  /** The visible label text */
  label: React.ReactNode;
  /** Content for the info popover. If omitted, no info button is rendered. */
  info?: React.ReactNode;
  /** Mark label as required (adds asterisk) */
  required?: boolean;
  /** Mark label as disabled */
  disabled?: boolean;
  size?: InfoLabelSize;
  weight?: InfoLabelWeight;
  /** htmlFor — links the label to a form control */
  htmlFor?: string;
  infoPositioning?: PositioningShorthand;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * InfoLabel combines a label with a small information icon button that opens a Tooltip or Popover with explanatory content. Used to provide supplemental context for form fields or settings without cluttering the UI.
 *
 * **When to use:** Form fields, settings, or data points where users may need additional explanation that is too long for hint text — pricing explanations, technical term definitions, field purpose clarifications.
 * **When NOT to use:** When the explanation is short enough for hint text under a Field. When the extra icon would be visually noisy in dense layouts.
 */
export const InfoLabel = React.forwardRef<HTMLLabelElement, InfoLabelProps>(
  ({
    label,
    info,
    required,
    disabled,
    size = "medium",
    weight = "regular",
    htmlFor,
    infoPositioning = "above",
    className,
    style,
  }: InfoLabelProps, ref) => {
    if (!info) {
      // No info popover — render a plain label
      return (
        <label
          htmlFor={htmlFor}
          className={className}
          style={{
            fontSize: size === "small"
              ? tokens.fontSizeBase200
              : tokens.fontSizeBase300,
            fontWeight: weight === "semibold"
              ? tokens.fontWeightSemibold
              : tokens.fontWeightRegular,
            color: disabled
              ? tokens.colorNeutralForegroundDisabled
              : tokens.colorNeutralForeground1,
            display: "inline-flex",
            alignItems: "center",
            gap: tokens.spacingHorizontalXS,
            ...style,
          }}
        >
          {label}
          {required && (
            <span
              aria-hidden="true"
              style={{ color: tokens.colorStatusDangerForeground1 }}
            >
              *
            </span>
          )}
        </label>
      );
    }

    return (
      <FluentInfoLabel
        ref={ref}
        size={size}
        weight={weight}
        required={required}
        disabled={disabled}
        htmlFor={htmlFor}
        className={className}
        style={style}
        info={
          <FluentInfoButton
            aria-label="More information"
            size={size}
          >
            {info}
          </FluentInfoButton>
        }
      >
        {label}
      </FluentInfoLabel>
    );
  }
);
InfoLabel.displayName = "InfoLabel";
