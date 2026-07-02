/**
 * EmptyState — Copy-paste ready empty state / zero-data placeholder
 *
 * Usage:
 *   import { EmptyState } from "./components/ui/EmptyState";
 *   <EmptyState
 *     icon={<Search48Regular />}
 *     title="No results found"
 *     description="Try adjusting your search or filters."
 *     action={<Button appearance="primary">Clear filters</Button>}
 *   />
 *
 * Dependencies: @fluentui/react-components
 */

import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Heading, Body } from "./Typography";
import { DS_EMPTY_ICON_SIZE, DS_EMPTY_DESCRIPTION_MAX_WIDTH } from "./CONSTANTS";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingVerticalM,
    padding: `${tokens.spacingVerticalXXXL} ${tokens.spacingHorizontalXXL}`,
    textAlign: "center",
  },
  iconWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // DS_EMPTY_ICON_SIZE: no semantic token maps to this size; kept in CONSTANTS.ts
    width: DS_EMPTY_ICON_SIZE,
    height: DS_EMPTY_ICON_SIZE,
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground3,
    // fontSizeBase600 = 40px, closest available; icons scale to parent font-size
    fontSize: tokens.fontSizeBase600,
  },
  title: {
    color: tokens.colorNeutralForeground1,
  },
  description: {
    color: tokens.colorNeutralForeground3,
    maxWidth: DS_EMPTY_DESCRIPTION_MAX_WIDTH,
  },
  actionWrapper: {
    marginTop: tokens.spacingVerticalS,
  },
});

export interface EmptyStateProps {
  /** A Fluent icon element, e.g. <Search48Regular /> */
  icon?: React.ReactNode;
  title: string;
  description?: string;
  /** Optional CTA button or link */
  action?: React.ReactNode;
}

/**
 * EmptyState displays a placeholder illustration, title, and description when a content area has no items — such as an empty search result, an empty inbox, or a first-run experience.
 *
 * **When to use:** Any content area that can have zero items — tables with no results, empty lists, first-run product tours, no-search-results states.
 * **When NOT to use:** When content is loading (use Skeleton). Error states that require action — provide a specific error message and recovery action instead.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action }: EmptyStateProps, ref) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {/* aria-hidden: icon is decorative — title conveys the meaning (WCAG 1.1.1) */}
      {icon && <div className={styles.iconWrap} aria-hidden="true">{icon}</div>}
      <Heading level={3} className={styles.title}>{title}</Heading>
      {description && <Body color="subtle" className={styles.description}>{description}</Body>}
      {action && <div className={styles.actionWrapper}>{action}</div>}
    </div>
  );
}
);
EmptyState.displayName = "EmptyState";
