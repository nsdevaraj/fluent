import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Color20Regular, TextFont20Regular, PaddingTop20Regular, CircleSmall20Regular, WeatherSunny20Regular } from "@fluentui/react-icons";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Card } from "../../../components/ui/Card";
import { DataCard } from "../../../components/ui/DataCard";
import { Heading, Caption } from "../../../components/ui/Typography";
import { Tag } from "../../../components/ui/Tag";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXL, maxWidth: "1000px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 700px)": { gridTemplateColumns: "repeat(2, 1fr)" },
    "@media (max-width: 480px)": { gridTemplateColumns: "1fr" },
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 700px)": { gridTemplateColumns: "1fr 1fr" },
  },
  card: {
    cursor: "pointer",
    ":hover": { boxShadow: tokens.shadow8 },
    transitionProperty: "box-shadow",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
  },
  icon: {
    color: tokens.colorBrandForeground1,
    fontSize: "24px",
    display: "flex",
    marginBottom: tokens.spacingVerticalXS,
  },
  colorStrip: {
    height: "6px",
    borderRadius: `${tokens.borderRadiusSmall} ${tokens.borderRadiusSmall} 0 0`,
  },
});

const TOKEN_SECTIONS = [
  {
    path: "/tokens/colors",
    label: "Colors",
    desc: "16-shade brand ramp + semantic intent colors (brand, success, warning, danger, info)",
    icon: <Color20Regular />,
    count: "16 brand + 6 semantic",
    strip: `linear-gradient(90deg, ${tokens.colorBrandBackground} 0%, #0078d4 50%, ${tokens.colorStatusSuccessBackground1} 75%, ${tokens.colorStatusWarningBackground1} 100%)`,
  },
  {
    path: "/tokens/typography",
    label: "Typography",
    desc: "Font size scale (xs–xl), weight scale, line heights, and semantic text styles",
    icon: <TextFont20Regular />,
    count: "5 sizes × 3 weights",
    strip: `linear-gradient(90deg, ${tokens.colorNeutralForeground3} 0%, ${tokens.colorNeutralForeground1} 100%)`,
  },
  {
    path: "/tokens/spacing",
    label: "Spacing",
    desc: "Vertical and horizontal spacing scale from xxs to xxxl — use in gap, padding, margin",
    icon: <PaddingTop20Regular />,
    count: "9 steps",
    strip: `linear-gradient(90deg, ${tokens.colorBrandBackground} 0%, ${tokens.colorBrandBackground2} 100%)`,
  },
  {
    path: "/tokens/shadows",
    label: "Shadows",
    desc: "6-level elevation ramp (2–64) plus brand-tinted shadow variants",
    icon: <CircleSmall20Regular />,
    count: "6 levels",
    strip: `linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 100%)`,
  },
  {
    path: "/tokens/motion",
    label: "Motion",
    desc: "Duration tokens (ultraFast–ultraSlow) and easing curve tokens",
    icon: <WeatherSunny20Regular />,
    count: "7 durations",
    strip: `linear-gradient(90deg, ${tokens.colorBrandBackground} 0%, ${tokens.colorBrandBackgroundHover} 100%)`,
  },
];

export function TokensIndex() {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <PageHeader
        title="Design Tokens"
        description="The foundational layer of the design system — semantic values that map directly to Fluent UI v9 token slots."
        breadcrumbs={["Design System", "Design Tokens"]}
      />

      <div className={styles.statsRow}>
        <DataCard label="Token Categories" value="7" icon={<Color20Regular />} />
        <DataCard label="Brand Color Shades" value="16" icon={<Color20Regular />} />
        <DataCard label="Spacing Steps" value="9" icon={<PaddingTop20Regular />} />
      </div>

      <div className={styles.grid}>
        {TOKEN_SECTIONS.map((section) => (
          <div
            key={section.path}
            className={styles.card}
            onClick={() => navigate(section.path)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate(section.path)}
            aria-label={`View ${section.label} tokens`}
          >
            <Card>
              <div style={{ background: section.strip }} className={styles.colorStrip} aria-hidden="true" />
              <div className={styles.cardBody}>
                <span className={styles.icon} aria-hidden="true">{section.icon}</span>
                <Heading level={4}>{section.label}</Heading>
                <Caption color="subtle">{section.desc}</Caption>
                <Tag appearance="outline" size="extra-small">{section.count}</Tag>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
