/**
 * Rating — Interactive star rating input and read-only display.
 *
 * Wraps Fluent UI v9 `Rating` (interactive) and `RatingDisplay` (read-only).
 * Both are accessible via keyboard and screen reader.
 *
 * Usage:
 *   import { Rating, RatingDisplay } from "../components/ui";
 *
 *   // Interactive:
 *   <Rating value={rating} onChange={setRating} label="Product rating" />
 *
 *   // Read-only:
 *   <RatingDisplay value={4.3} count={142} />
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  Rating as FluentRating,
  RatingDisplay as FluentRatingDisplay,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXS },
  label: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
  },
  displayRow: { display: "flex", alignItems: "center", gap: tokens.spacingHorizontalXS },
  count: { fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 },
});

export type RatingSize = "small" | "medium" | "large" | "extra-large";
export type RatingColor = "brand" | "marigold" | "neutral";
export type RatingShape = "circular" | "square";

// ── Interactive Rating ─────────────────────────────────────────────────────────

export interface RatingProps {
  /** Controlled value (1–max) */
  value?: number;
  defaultValue?: number;
  /** Maximum stars. Default 5. */
  max?: number;
  /** Allow half-star precision */
  step?: 0.5 | 1;
  onChange?: (value: number) => void;
  disabled?: boolean;
  size?: RatingSize;
  color?: RatingColor;
  shape?: RatingShape;
  /** Accessible label for the rating control */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

/**
 * Rating allows users to view or input a star-based (or custom icon) score. The `Rating` component is interactive for input; `RatingDisplay` is read-only for showing existing scores.
 *
 * **When to use:** Capturing user satisfaction scores for products, reviews, or experiences. Displaying aggregate ratings in product cards, listings, or feedback forms.
 *
 * **When NOT to use:** Precise numeric scale input (use Slider or radio group for NPS surveys). Binary or non-scalar choices (use Checkbox or Switch). More than one interactive Rating per form section without clear labels.
 */
export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({
    value,
    defaultValue,
    max = 5,
    step = 1,
    onChange,
    disabled,
    size = "medium",
    color = "marigold",
    shape = "circular",
    label,
    className,
    style,
    "aria-label": ariaLabel,
  }: RatingProps, ref) => {
    const styles = useStyles();

    return (
      <div className={styles.root} style={style}>
        {label && <span className={styles.label}>{label}</span>}
        <FluentRating
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          max={max}
          step={step}
          onChange={(_e, data) => onChange?.(data.value)}
          size={size}
          color={color}
          className={className}
          aria-label={ariaLabel ?? label ?? "Rating"}
          style={disabled ? { pointerEvents: "none", opacity: 0.4 } : undefined}
        />
      </div>
    );
  }
);
Rating.displayName = "Rating";

// ── RatingDisplay (read-only) ─────────────────────────────────────────────────

export interface RatingDisplayProps {
  /** Numeric value to display */
  value: number;
  /** Total review count shown after stars (e.g. "(142)") */
  count?: number;
  max?: number;
  size?: RatingSize;
  color?: RatingColor;
  shape?: RatingShape;
  /** Show count label */
  showCount?: boolean;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

export const RatingDisplay = React.forwardRef<HTMLDivElement, RatingDisplayProps>(
  ({
    value,
    count,
    max = 5,
    size = "medium",
    color = "marigold",
    shape = "circular",
    showCount = true,
    className,
    style,
    "aria-label": ariaLabel,
  }: RatingDisplayProps, ref) => {
    const styles = useStyles();
    const label = ariaLabel ?? `${value} out of ${max} stars${count ? `, ${count} ratings` : ""}`;

    return (
      <div ref={ref} className={`${styles.displayRow} ${className ?? ""}`} style={style} aria-label={label}>
        <FluentRatingDisplay
          value={value}
          max={max}
          size={size}
          color={color}
          aria-hidden="true"
        />
        {showCount && count != null && (
          <span className={styles.count} aria-hidden="true">
            {value.toFixed(1)} ({count.toLocaleString()})
          </span>
        )}
      </div>
    );
  }
);
RatingDisplay.displayName = "RatingDisplay";
