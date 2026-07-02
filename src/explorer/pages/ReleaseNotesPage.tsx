import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { DocumentText20Regular, Rocket20Regular, Star20Regular, Code20Regular } from "@fluentui/react-icons";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Heading, Body, Caption } from "../../components/ui/Typography";
import { Tag } from "../../components/ui/Tag";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Divider } from "../../components/ui/Divider";
import { Accordion } from "../../components/ui/Accordion";
import { DataCard } from "../../components/ui/DataCard";
import { MessageBar } from "../../components/ui/MessageBar";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXL, maxWidth: "900px" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
  },
  section: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL },
  releaseHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  changeList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  changeItem: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    alignItems: "flex-start",
    padding: `${tokens.spacingVerticalXS} 0`,
  },
  roadmapCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
  },
  roadmapGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 700px)": { gridTemplateColumns: "1fr" },
  },
});

const ADDED = [
  "37 production-ready components with full TypeScript support",
  "React.forwardRef on all components with correct DOM ref types",
  ".displayName set on all 37 components for React DevTools",
  "className prop accepted on all 37 components",
  "Dual ESM + CJS build output (dist/esm/, dist/cjs/)",
  "TypeScript declaration files (dist/types/)",
  "sideEffects: false — fully tree-shakeable",
  "lightTheme and darkTheme via createLightTheme / createDarkTheme",
  "7 token categories: colors, typography, spacing, borderRadius, shadows, motion, brand",
  "Single-source ValidationState type in CONSTANTS.ts",
  "useControllableState and useClickKeydown hooks",
  "189 Storybook stories (avg 5.1 per component)",
  "argTypes defined for all 37 story files",
  "DarkMode and RTL stories on key components",
  "211 unit + axe accessibility tests (100% passing)",
  "0 circular imports across 118 source files",
  "0 RTL physical CSS violations",
  "0 hardcoded token violations",
  "MIT License, README.md, CHANGELOG.md, CONTRIBUTING.md",
  "prepublishOnly build + test gate",
];

const ROADMAP = [
  { version: "0.1.0", status: "in-progress" as const, title: "Stable release", items: ["Remove alpha tag after internal adoption validation", "Address feedback from initial rollout", "Performance profiling pass"] },
  { version: "0.2.0", status: "pending" as const, title: "Expanded library", items: ["DateRangePicker", "MultiSelect (Combobox v2)", "CommandBar", "Component-level CSS custom property overrides"] },
  { version: "1.0.0", status: "pending" as const, title: "Stable API", items: ["API freeze and stability commitment", "Full migration guide from previous internal library", "Extended testing — E2E + visual regression"] },
];

export function ReleaseNotesPage() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <PageHeader
        title="Release Notes"
        description="What's new, changed, and planned for @lumel/fluent2-ds."
        breadcrumbs={["Design System", "Release Notes"]}
      />

      <MessageBar intent="info" title="Current release">
        You are viewing @lumel/fluent2-ds v0.1.0-alpha.1 — the first public alpha. Feedback welcome via the Feedback page.
      </MessageBar>

      <div className={styles.statsGrid}>
        <DataCard label="Components" value="37" icon={<Code20Regular />} />
        <DataCard label="Tests" value="211" trend="100% passing" trendUp icon={<Star20Regular />} />
        <DataCard label="Audit Score" value="100/100" trend="GO" trendUp icon={<Rocket20Regular />} />
      </div>

      {/* Current release */}
      <div className={styles.section}>
        <div className={styles.releaseHeader}>
          <Heading level={2}>v0.1.0-alpha.1</Heading>
          <Tag appearance="brand">Latest</Tag>
          <StatusBadge status="completed" label="Released" />
          <Caption color="subtle">2026-06-12</Caption>
        </div>
        <Body color="subtle">Initial alpha release of the Lumel Fluent 2 Design System. This release includes the full component library, design tokens, theming, and governance documentation.</Body>

        <Accordion
          items={[
            {
              value: "added",
              header: `Added (${ADDED.length} items)`,
              content: (
                <div className={styles.changeList}>
                  {ADDED.map((item, i) => (
                    <div key={i} className={styles.changeItem}>
                      <Tag appearance="brand" size="extra-small">+</Tag>
                      <Body size="sm">{item}</Body>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              value: "breaking",
              header: "Breaking Changes",
              content: (
                <Body size="sm" color="subtle">No breaking changes — this is the initial release.</Body>
              ),
            },
          ]}
          multiple
        />
      </div>

      <Divider />

      {/* Roadmap */}
      <div className={styles.section}>
        <Heading level={2}>Roadmap</Heading>
        <div className={styles.roadmapGrid}>
          {ROADMAP.map((r) => (
            <Card key={r.version}>
              <div className={styles.roadmapCard}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <Tag appearance={r.version === "0.1.0" ? "brand" : "outline"}>{r.version}</Tag>
                  <StatusBadge status={r.status} size="small" />
                </div>
                <Heading level={4}>{r.title}</Heading>
                {r.items.map((item) => (
                  <Body key={item} size="sm" color="subtle">· {item}</Body>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
