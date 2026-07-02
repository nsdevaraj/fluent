/**
 * Skeleton — Design System loading placeholder
 *
 * Usage:
 *   import { Skeleton, SkeletonItem } from "../components/ui";
 *   <Skeleton>
 *     <SkeletonItem shape="circle" size={40} />
 *     <SkeletonItem shape="rectangle" style={{ width: "100%", height: 16 }} />
 *   </Skeleton>
 *
 *   // Preset patterns:
 *   <SkeletonText lines={3} />
 *   <SkeletonCard />
 */
import React from "react";
import {
  Skeleton as FluentSkeleton,
  SkeletonItem as FluentSkeletonItem,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import type {
  SkeletonProps as FluentSkeletonProps,
  SkeletonItemProps as FluentSkeletonItemProps,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  textLine:         { width: "100%", height: tokens.fontSizeBase200, borderRadius: tokens.borderRadiusSmall },
  textLineLast:     { width: "60%" },
  card:             { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS },
  cardRow:          { display: "flex", alignItems: "center", gap: tokens.spacingHorizontalM },
  cardBody:         { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXS, flex: 1 },
  // Card sub-items — defined here to eliminate inline hardcoded values
  cardBodyLine1:    { width: "50%", height: tokens.fontSizeBase200 },
  cardBodyLine2:    { width: "30%", height: tokens.fontSizeBase100 },
  cardContentArea:  { width: "100%", height: tokens.spacingVerticalXXXL, borderRadius: tokens.borderRadiusSmall },
  cardTextLine:     { width: "100%", height: tokens.fontSizeBase200, borderRadius: tokens.borderRadiusSmall },
  cardTextLineLast: { width: "70%", height: tokens.fontSizeBase200, borderRadius: tokens.borderRadiusSmall },
});

// ── Re-exported primitives ────────────────────────────────────────────────────
/**
 * Skeleton is a shimmer animation placeholder shown while data loads, mimicking the shape of the incoming content. It reduces perceived wait time by giving users a structural preview of the layout.
 *
 * **When to use:** In place of actual content while data is loading — cards, lists, feeds, profile sections where the content shape is predictable and a structural preview reduces perceived latency.
 *
 * **When NOT to use:** Very brief async operations (use Spinner). When skeleton shapes bear no resemblance to actual content. When content loads near-instantly.
 */
export function Skeleton(props: FluentSkeletonProps) {
  return <FluentSkeleton {...props} />;
}

export function SkeletonItem(props: FluentSkeletonItemProps) {
  return <FluentSkeletonItem {...props} />;
}

// ── Preset: text block ────────────────────────────────────────────────────────
export interface SkeletonTextProps {
  lines?: number;
  animation?: "wave" | "pulse";
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, animation = "wave" }: SkeletonTextProps, ref) => {
  const styles = useStyles();
  return (
    <FluentSkeleton animation={animation}>
      {Array.from({ length: lines }).map((_, i) => (
        <FluentSkeletonItem
          key={i}
          className={
            i === lines - 1
              ? `${styles.textLine} ${styles.textLineLast}`
              : styles.textLine
          }
        />
      ))}
    </FluentSkeleton>
  );
}
);
SkeletonText.displayName = "SkeletonText";
// ── Preset: card with avatar ──────────────────────────────────────────────────
export interface SkeletonCardProps {
  animation?: "wave" | "pulse";
}

export function SkeletonCard({ animation = "wave" }: SkeletonCardProps) {
  const styles = useStyles();
  return (
    <FluentSkeleton animation={animation} className={styles.card}>
      <div className={styles.cardRow}>
        <FluentSkeletonItem shape="circle" size={40} />
        <div className={styles.cardBody}>
          <FluentSkeletonItem className={styles.cardBodyLine1} />
          <FluentSkeletonItem className={styles.cardBodyLine2} />
        </div>
      </div>
      <FluentSkeletonItem className={styles.cardContentArea} />
      <FluentSkeletonItem className={styles.cardTextLine} />
      <FluentSkeletonItem className={styles.cardTextLineLast} />
    </FluentSkeleton>
  );
}
Skeleton.displayName = "Skeleton";
SkeletonItem.displayName = "SkeletonItem";
SkeletonText.displayName = "SkeletonText";
SkeletonCard.displayName = "SkeletonCard";
