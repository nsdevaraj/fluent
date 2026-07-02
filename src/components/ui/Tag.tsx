/**
 * Tag / TagGroup — Design System tag components
 *
 * Usage:
 *   import { Tag, TagGroup } from "../components/ui";
 *
 *   <Tag>React</Tag>
 *   <Tag appearance="brand">TypeScript</Tag>
 *
 *   <TagGroup
 *     tags={["React", "TypeScript", "Fluent UI"]}
 *     onDismiss={(tag) => remove(tag)}
 *     maxVisible={2}
 *   />
 */
import React, { useState } from "react";
import {
  Tag as FluentTag,
  TagGroup as FluentTagGroup,
  makeStyles,
  tokens,
  Badge,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  group: { display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalXS, alignItems: "center" },
  overflowBadge: {
    cursor: "pointer",
    outline: "none",
    // Focus ring that works in Light, Dark, and High Contrast themes
    ":focus-visible": {
      outlineWidth: tokens.strokeWidthThick,
      outlineStyle: "solid",
      outlineColor: tokens.colorBrandStroke1,
      outlineOffset: tokens.strokeWidthThin,
    },
  },
});

// ── Single Tag ────────────────────────────────────────────────────────────────
export interface TagProps {
  children: React.ReactNode;
  value?: string;
  appearance?: "filled" | "outline" | "brand";
  size?: "extra-small" | "small" | "medium";
  dismissible?: boolean;
  icon?: React.ReactElement;
  disabled?: boolean;
  shape?: "circular" | "rounded";
}

/**
 * Tag is a compact label for categorizing, filtering, or displaying metadata associated with content. Read-only by default; use InteractionTag for clickable or dismissible behavior.
 *
 * **When to use:** Displaying read-only categorical labels, keywords, or attributes — file tags, skill labels, category chips.
 * **When NOT to use:** Primary navigation or action buttons (use Button or Link). Too many tags on a single item. Permanent system-assigned labels that should not be removable.
 */
export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ children, value, appearance, size, dismissible, icon, disabled, shape }: TagProps, ref) => {
  return (
    <FluentTag
      value={value}
      appearance={appearance}
      size={size}
      dismissible={dismissible}
      icon={icon}
      disabled={disabled}
      shape={shape}
    >
      {children}
    </FluentTag>
  );
}
);
Tag.displayName = "Tag";
// ── TagGroup ──────────────────────────────────────────────────────────────────
export interface TagItem {
  value: string;
  label: string;
  icon?: React.ReactElement;
  disabled?: boolean;
}

export interface TagGroupProps {
  tags: TagItem[] | string[];
  onDismiss?: (value: string) => void;
  /** Max tags shown before overflow badge */
  maxVisible?: number;
  appearance?: "filled" | "outline" | "brand";
  size?: "extra-small" | "small" | "medium";
}

export function TagGroup({
  tags,
  onDismiss,
  maxVisible,
  appearance = "filled",
  size = "medium",
}: TagGroupProps) {
  const styles = useStyles();
  const [showAll, setShowAll] = useState(false);

  const normalised: TagItem[] = tags.map((t) =>
    typeof t === "string" ? { value: t, label: t } : t
  );

  const visible =
    maxVisible && !showAll ? normalised.slice(0, maxVisible) : normalised;
  const hiddenCount = normalised.length - visible.length;

  return (
    <FluentTagGroup
      className={styles.group}
      onDismiss={(_, data) => onDismiss?.(data.value as string)}
    >
      {visible.map((tag) => (
        <FluentTag
          key={tag.value}
          value={tag.value}
          dismissible={!!onDismiss}
          appearance={appearance}
          size={size}
          icon={tag.icon}
          disabled={tag.disabled}
        >
          {tag.label}
        </FluentTag>
      ))}
      {hiddenCount > 0 && (
        // role="button" + tabIndex + onKeyDown make this keyboard-accessible in all themes
        <Badge
          appearance="tint"
          role="button"
          tabIndex={0}
          className={styles.overflowBadge}
          onClick={() => setShowAll(true)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setShowAll(true); } }}
          aria-label={`Show ${hiddenCount} more tags`}
        >
          +{hiddenCount} more
        </Badge>
      )}
    </FluentTagGroup>
  );
}
Tag.displayName = "Tag";
TagGroup.displayName = "TagGroup";
