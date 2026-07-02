/**
 * DataCard — Copy-paste ready metric/stat card using Fluent 2
 *
 * Usage:
 *   import { DataCard } from "./components/ui/DataCard";
 *   <DataCard label="Total Users" value="1,284" trend="+12%" trendUp icon={<People20Regular />} />
 *
 * Dependencies: @fluentui/react-components, @fluentui/react-icons
 */

import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { ArrowTrending16Filled, ArrowTrendingDown16Filled } from "@fluentui/react-icons";
import { Heading, Body, Caption } from "./Typography";
import { DS_DATA_CARD_MIN_WIDTH } from "./CONSTANTS";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: tokens.shadow4,
    minWidth: DS_DATA_CARD_MIN_WIDTH,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: tokens.spacingHorizontalXXXL,
    height: tokens.spacingVerticalXXXL,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase500,
  },
  trendUp: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    color: tokens.colorStatusSuccessForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  trendDown: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    color: tokens.colorStatusDangerForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  value: {
    lineHeight: tokens.lineHeightBase100,
  },
  label: {
    color: tokens.colorNeutralForeground3,
  },
  description: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
});

export interface DataCardProps {
  label: string;
  value: string | number;
  trend?: string;
  /** true = green up arrow, false = red down arrow */
  trendUp?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

/**
 * DataCard is a metric display component for showing key performance indicators and summary statistics — a value, a label, and optional trend/comparison data — in a visually consistent card format.
 *
 * **When to use:** Dashboards and analytics surfaces where key metrics need to stand out at a glance — KPI cards, summary statistics, trend comparisons.
 * **When NOT to use:** Detailed tabular data (use DataTable). Non-numeric or non-metric content (use Card). Inline body content that does not represent a measurable value.
 */
export const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
  ({ label, value, trend, trendUp, icon, description }: DataCardProps, ref) => {
  const styles = useStyles();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {icon && <div className={styles.iconWrap}>{icon}</div>}
        {trend !== undefined && (
          <div className={trendUp ? styles.trendUp : styles.trendDown}>
            {trendUp ? <ArrowTrending16Filled /> : <ArrowTrendingDown16Filled />}
            {trend}
          </div>
        )}
      </div>

      <Heading level={1} as="p" className={styles.value}>
        {value}
      </Heading>
      <Caption color="subtle" className={styles.label}>{label}</Caption>
      {description && (
        <Body size="sm" color="subtle" className={styles.description}>
          {description}
        </Body>
      )}
    </div>
  );
}
);
DataCard.displayName = "DataCard";
