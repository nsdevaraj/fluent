/**
 * InteractionTag — Removable / clickable tag with primary and secondary slots.
 *
 * Wraps Fluent UI v9 `InteractionTag`, `InteractionTagPrimary`,
 * `InteractionTagSecondary`. Different from the display `Tag`:
 *  - Primary area is clickable (fires onPrimaryClick)
 *  - Secondary area is the dismiss/action button
 *  - Used in filter bars, tag pickers, selected-value chips
 *
 * Usage:
 *   import { InteractionTag, InteractionTagGroup } from "../components/ui";
 *
 *   <InteractionTagGroup>
 *     <InteractionTag
 *       value="design"
 *       onPrimaryClick={(v) => navigate(`/tag/${v}`)}
 *       onDismiss={(v) => removeFilter(v)}
 *     >
 *       Design
 *     </InteractionTag>
 *   </InteractionTagGroup>
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  InteractionTag as FluentInteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  TagGroup as FluentTagGroup,
} from "@fluentui/react-components";
import type { TagDismissData } from "@fluentui/react-components";

export type InteractionTagSize = "extra-small" | "small" | "medium";
export type InteractionTagShape = "rounded" | "circular" | "square";
export type InteractionTagAppearance = "filled" | "outline" | "brand" | "tint";

export interface InteractionTagProps {
  /** Unique value for this tag (used in dismiss callback) */
  value: string;
  children: React.ReactNode;
  /** Fires when the primary (label) area is clicked */
  onPrimaryClick?: (value: string) => void;
  /** Fires when the dismiss (×) button is clicked. If omitted, dismiss button is hidden. */
  onDismiss?: (value: string) => void;
  /** Dismiss button aria-label */
  dismissAriaLabel?: string;
  size?: InteractionTagSize;
  shape?: InteractionTagShape;
  appearance?: InteractionTagAppearance;
  disabled?: boolean;
  icon?: React.ReactElement;
  media?: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * InteractionTag extends Tag with interactive patterns — clickable for filtering/navigation, or dismissible so users can remove a selection. Used in filter bars and multi-select tag inputs.
 *
 * **When to use:** Tags that users interact with — clicking to filter content, or dismissing to remove a selected item in a filter bar or people-picker.
 * **When NOT to use:** Display-only tags (use Tag). Primary navigation elements or action buttons (use Button/Link). Permanent labels users should not be able to remove.
 */
export const InteractionTag = React.forwardRef<HTMLDivElement, InteractionTagProps>(
  ({
    value,
    children,
    onPrimaryClick,
    onDismiss,
    dismissAriaLabel,
    size = "medium",
    shape = "rounded",
    appearance = "filled",
    disabled,
    icon,
    media,
    className,
    style,
  }: InteractionTagProps, ref) => {
    return (
      <FluentInteractionTag
        ref={ref}
        value={value}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        size={size as any}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        shape={shape as any}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        appearance={appearance as any}
        disabled={disabled}
        className={className}
        style={style}
      >
        <InteractionTagPrimary
          icon={icon}
          media={media}
          onClick={onPrimaryClick ? () => onPrimaryClick(value) : undefined}
          aria-label={typeof children === "string" ? children : undefined}
          hasSecondaryAction={Boolean(onDismiss)}
        >
          {children}
        </InteractionTagPrimary>
        {onDismiss && (
          <InteractionTagSecondary
            aria-label={dismissAriaLabel ?? `Remove ${typeof children === "string" ? children : "tag"}`}
            onClick={() => onDismiss(value)}
          />
        )}
      </FluentInteractionTag>
    );
  }
);
InteractionTag.displayName = "InteractionTag";

// ── InteractionTagGroup ───────────────────────────────────────────────────────

export interface InteractionTagGroupProps {
  children: React.ReactNode;
  /** Fires when any tag is dismissed */
  onDismiss?: (value: string) => void;
  size?: InteractionTagSize;
  "aria-label"?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const InteractionTagGroup = React.forwardRef<HTMLDivElement, InteractionTagGroupProps>(
  ({
    children,
    onDismiss,
    size,
    "aria-label": ariaLabel,
    className,
    style,
  }: InteractionTagGroupProps, ref) => {
    const handleDismiss = (_e: unknown, data: TagDismissData) => {
      onDismiss?.(data.value as string);
    };

    return (
      <FluentTagGroup
        ref={ref}
        onDismiss={onDismiss ? handleDismiss : undefined}
        size={size as "extra-small" | "small" | "medium"}
        aria-label={ariaLabel}
        className={className}
        style={style}
      >
        {children}
      </FluentTagGroup>
    );
  }
);
InteractionTagGroup.displayName = "InteractionTagGroup";
