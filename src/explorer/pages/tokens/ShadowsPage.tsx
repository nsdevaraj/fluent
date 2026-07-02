import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Heading, Body, Caption } from "../../../components/ui/Typography";
import { Tag } from "../../../components/ui/Tag";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXL, maxWidth: "900px" },
  section: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 600px)": { gridTemplateColumns: "repeat(2, 1fr)" },
  },
  shadowCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalL}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalS,
    textAlign: "center",
  },
  shadowSwatch: {
    width: "64px",
    height: "64px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

const SHADOWS = [
  { name: "shadow2", token: tokens.shadow2, level: 2, usage: "Cards at rest, subtle elevation" },
  { name: "shadow4", token: tokens.shadow4, level: 4, usage: "Dropdown menus, hovered cards" },
  { name: "shadow8", token: tokens.shadow8, level: 8, usage: "Popovers, focused cards" },
  { name: "shadow16", token: tokens.shadow16, level: 16, usage: "Drawers, sidebars, panels" },
  { name: "shadow28", token: tokens.shadow28, level: 28, usage: "Modals, dialogs, critical overlays" },
  { name: "shadow64", token: tokens.shadow64, level: 64, usage: "Tooltips requiring high contrast" },
];

export function ShadowsPage() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <PageHeader
        title="Shadows"
        description="6-level elevation ramp. Use shadows to communicate the z-axis position of surfaces."
        breadcrumbs={["Design System", "Design Tokens", "Shadows"]}
      />

      <div className={styles.section}>
        <div>
          <Heading level={2}>Elevation Scale</Heading>
          <Body size="sm" color="subtle">Higher elevation numbers = more prominent shadow. Use the lowest level that communicates the correct hierarchy.</Body>
        </div>
        <div className={styles.grid}>
          {SHADOWS.map(({ name, token: shadow, level, usage }) => (
            <div key={name} className={styles.shadowCard} style={{ boxShadow: shadow }}>
              <div className={styles.shadowSwatch} style={{ boxShadow: shadow }} aria-hidden="true" />
              <Tag appearance="brand" size="extra-small">{name}</Tag>
              <Caption>Level {level}</Caption>
              <Caption color="subtle">{usage}</Caption>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
