/**
 * Card — Generic container card with header, body, footer slots
 *
 * Usage:
 *   import { Card } from "../components/ui";
 *   <Card
 *     header={{ title: "Project Alpha", subtitle: "Engineering", image: <Avatar /> }}
 *     footer={<Button>View</Button>}
 *   >
 *     Card body content goes here.
 *   </Card>
 *
 * Dependencies: @fluentui/react-components
 */

import React from "react";
import {
  Card as FluentCard,
  CardHeader,
  CardFooter,
  CardPreview,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  headerTitle: {
    fontWeight: tokens.fontWeightSemibold,
  },
});

export interface CardHeaderConfig {
  /** Primary title text */
  title: React.ReactNode;
  /** Subtitle / description line */
  subtitle?: React.ReactNode;
  /** Avatar, icon, or image */
  image?: React.ReactElement;
  /** Trailing action (e.g. overflow menu button) */
  action?: React.ReactElement;
}

export interface CardProps {
  header?: CardHeaderConfig;
  /** Preview image or media above the header */
  preview?: React.ReactNode;
  /** Card body content */
  children?: React.ReactNode;
  /** Footer actions or metadata */
  footer?: React.ReactNode;
  /** Makes the card itself clickable */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  appearance?: "filled" | "filled-alternative" | "outline" | "subtle";
  size?: "small" | "medium" | "large";
  /** Orientation of header + preview layout */
  orientation?: "vertical" | "horizontal";
  /** Enables selection mode on the card */
  selectable?: boolean;
  /** Controlled selected state (use with selectable) */
  selected?: boolean;
  /** Callback fired when the card's selection state changes */
  onSelectionChange?: (selected: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Card is a visually bounded container grouping related content and actions about a single subject — such as a file, person, email, or article. Supports interactive (selectable/clickable) and non-interactive variants.
 *
 * **When to use:** Presenting a discrete object with associated metadata and actions in grid or list layouts where each item needs spatial separation.
 * **When NOT to use:** Generic layout wrapper or page section container — use layout primitives instead. Nesting Cards inside other Cards. Overloaded with too many actions or too much content.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
  header,
  preview,
  children,
  footer,
  onClick,
  appearance = "outline",
  size = "medium",
  orientation = "vertical",
  selectable,
  selected,
  onSelectionChange,
  className,
  style,
}: CardProps, ref) => {
  const styles = useStyles();
  return (
    <FluentCard
      appearance={appearance}
      size={size}
      orientation={orientation}
      onClick={onClick}
      className={className}
      style={style}
      focusMode={onClick && !selectable ? "off" : undefined}
      selected={selectable ? selected : undefined}
      onSelectionChange={selectable && onSelectionChange ? (_e, data) => onSelectionChange(data.selected) : undefined}
    >
      {preview && <CardPreview>{preview}</CardPreview>}

      {header && (
        <CardHeader
          image={header.image}
          header={
            <span className={styles.headerTitle}>{header.title}</span>
          }
          description={header.subtitle != null ? <span>{header.subtitle}</span> : undefined}
          action={header.action}
        />
      )}

      {children}

      {footer && <CardFooter>{footer}</CardFooter>}
    </FluentCard>
  );
}
);
Card.displayName = "Card";
