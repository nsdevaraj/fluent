import React, { useState } from "react";
import { makeStyles, tokens, Text, Input } from "@fluentui/react-components";
import { Search20Regular } from "@fluentui/react-icons";
import { ShowcaseSection } from "../ShowcaseSection";

const useStyles = makeStyles({
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: tokens.spacingHorizontalS, width: "100%" },
  swatch: {
    display: "flex",
    flexDirection: "column",
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  swatchColor: { height: "40px" },
  swatchLabel: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    fontSize: tokens.fontSizeBase100,
    fontFamily: "monospace",
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground2,
  },
  spacingRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  spacingBar: {
    height: "20px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusSmall,
  },
});

const colorGroups = [
  {
    label: "Brand",
    tokens: [
      { name: "colorBrandBackground", value: tokens.colorBrandBackground },
      { name: "colorBrandBackground2", value: tokens.colorBrandBackground2 },
      { name: "colorBrandForeground1", value: tokens.colorBrandForeground1 },
      { name: "colorBrandStroke1", value: tokens.colorBrandStroke1 },
    ],
  },
  {
    label: "Neutral Backgrounds",
    tokens: [
      { name: "colorNeutralBackground1", value: tokens.colorNeutralBackground1 },
      { name: "colorNeutralBackground2", value: tokens.colorNeutralBackground2 },
      { name: "colorNeutralBackground3", value: tokens.colorNeutralBackground3 },
      { name: "colorNeutralBackground4", value: tokens.colorNeutralBackground4 },
      { name: "colorNeutralBackground1Hover", value: tokens.colorNeutralBackground1Hover },
    ],
  },
  {
    label: "Neutral Foreground (Text)",
    tokens: [
      { name: "colorNeutralForeground1", value: tokens.colorNeutralForeground1 },
      { name: "colorNeutralForeground2", value: tokens.colorNeutralForeground2 },
      { name: "colorNeutralForeground3", value: tokens.colorNeutralForeground3 },
      { name: "colorNeutralForeground4", value: tokens.colorNeutralForeground4 },
      { name: "colorNeutralForegroundDisabled", value: tokens.colorNeutralForegroundDisabled },
    ],
  },
  {
    label: "Semantic — Status",
    tokens: [
      { name: "colorStatusSuccessBackground1", value: tokens.colorStatusSuccessBackground1 },
      { name: "colorStatusSuccessForeground1", value: tokens.colorStatusSuccessForeground1 },
      { name: "colorStatusDangerBackground1", value: tokens.colorStatusDangerBackground1 },
      { name: "colorStatusDangerForeground1", value: tokens.colorStatusDangerForeground1 },
      { name: "colorStatusWarningBackground1", value: tokens.colorStatusWarningBackground1 },
      { name: "colorStatusWarningForeground1", value: tokens.colorStatusWarningForeground1 },
    ],
  },
  {
    label: "Strokes (Borders)",
    tokens: [
      { name: "colorNeutralStroke1", value: tokens.colorNeutralStroke1 },
      { name: "colorNeutralStroke2", value: tokens.colorNeutralStroke2 },
      { name: "colorNeutralStroke3", value: tokens.colorNeutralStroke3 },
      { name: "colorBrandStroke1", value: tokens.colorBrandStroke1 },
    ],
  },
];

const spacingTokens = [
  { name: "spacingVerticalXXS", value: "2px" },
  { name: "spacingVerticalXS", value: "4px" },
  { name: "spacingVerticalS", value: "6px" },
  { name: "spacingVerticalM", value: "8px" },
  { name: "spacingVerticalL", value: "12px" },
  { name: "spacingVerticalXL", value: "16px" },
  { name: "spacingVerticalXXL", value: "20px" },
  { name: "spacingVerticalXXXL", value: "36px" },
];

export function TokensPage() {
  const styles = useStyles();
  const [search, setSearch] = useState("");

  return (
    <>
      <ShowcaseSection
        title="Color Tokens"
        description="Never hardcode hex values. Always use tokens.color* from @fluentui/react-components."
        preview={
          <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL, width: "100%" }}>
            <Input
              contentBefore={<Search20Regular />}
              placeholder="Filter tokens..."
              value={search}
              onChange={(_, d) => setSearch(d.value)}
            />
            {colorGroups.map(group => {
              const filtered = group.tokens.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
              if (filtered.length === 0) return null;
              return (
                <div key={group.label} style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS }}>
                  <Text weight="semibold" size={300}>{group.label}</Text>
                  <div className={styles.grid}>
                    {filtered.map(token => (
                      <div key={token.name} className={styles.swatch}>
                        <div className={styles.swatchColor} style={{ backgroundColor: token.value }} />
                        <div className={styles.swatchLabel}>{token.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        }
        code={`import { tokens } from "@fluentui/react-components";

// ✅ Always use tokens
backgroundColor: tokens.colorNeutralBackground2
color: tokens.colorNeutralForeground1
border: \`1px solid \${tokens.colorNeutralStroke1}\`

// ❌ Never hardcode
backgroundColor: "#f5f5f5"
color: "#242424"`}
      />

      <ShowcaseSection
        title="Spacing Tokens"
        description="Use spacingVertical* and spacingHorizontal* for all padding, gap, and margin."
        preview={
          <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS, width: "100%" }}>
            {spacingTokens.map(({ name, value }) => (
              <div key={name} className={styles.spacingRow}>
                <div className={styles.spacingBar} style={{ width: value }} />
                <Text size={200} style={{ fontFamily: "monospace", color: tokens.colorNeutralForeground2 }}>
                  tokens.{name} = {value}
                </Text>
              </div>
            ))}
          </div>
        }
        code={`import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  card: {
    padding: tokens.spacingVerticalL,         // 12px vertical
    gap: tokens.spacingHorizontalM,           // 8px horizontal
    marginBottom: tokens.spacingVerticalXXL,  // 20px

    // spacingVertical:  XXS=2 XS=4 S=6 M=8 L=12 XL=16 XXL=20 XXXL=36
    // spacingHorizontal: same scale
  },
});`}
      />

      <ShowcaseSection
        title="Border Radius Tokens"
        description="Use borderRadius* tokens for consistent rounded corners."
        preview={
          <div style={{ display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalL, alignItems: "center" }}>
            {[
              { name: "None", value: tokens.borderRadiusNone },
              { name: "Small", value: tokens.borderRadiusSmall },
              { name: "Medium", value: tokens.borderRadiusMedium },
              { name: "Large", value: tokens.borderRadiusLarge },
              { name: "XLarge", value: tokens.borderRadiusXLarge },
              { name: "Circular", value: tokens.borderRadiusCircular },
            ].map(({ name, value }) => (
              <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <div style={{
                  width: "60px", height: "60px",
                  backgroundColor: tokens.colorBrandBackground2,
                  borderRadius: value,
                  border: `2px solid ${tokens.colorBrandStroke1}`,
                }} />
                <Text size={100} style={{ fontFamily: "monospace", color: tokens.colorNeutralForeground3 }}>{name}</Text>
              </div>
            ))}
          </div>
        }
        code={`import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  card: { borderRadius: tokens.borderRadiusLarge },     // cards, panels
  chip: { borderRadius: tokens.borderRadiusMedium },    // badges, chips
  pill: { borderRadius: tokens.borderRadiusCircular },  // pills, avatars
  input: { borderRadius: tokens.borderRadiusMedium },   // inputs, buttons
});`}
      />

      <ShowcaseSection
        title="Shadow Tokens"
        description="Use shadow tokens for elevation — don't write custom box-shadow."
        preview={
          <div style={{ display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalXL, padding: tokens.spacingVerticalL, backgroundColor: tokens.colorNeutralBackground3, borderRadius: tokens.borderRadiusMedium, width: "100%" }}>
            {[
              { name: "shadow2", value: tokens.shadow2 },
              { name: "shadow4", value: tokens.shadow4 },
              { name: "shadow8", value: tokens.shadow8 },
              { name: "shadow16", value: tokens.shadow16 },
              { name: "shadow28", value: tokens.shadow28 },
              { name: "shadow64", value: tokens.shadow64 },
            ].map(({ name, value }) => (
              <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "64px", height: "64px",
                  backgroundColor: tokens.colorNeutralBackground1,
                  borderRadius: tokens.borderRadiusMedium,
                  boxShadow: value,
                }} />
                <Text size={100} style={{ fontFamily: "monospace", color: tokens.colorNeutralForeground3 }}>{name}</Text>
              </div>
            ))}
          </div>
        }
        code={`import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  card: { boxShadow: tokens.shadow4 },     // default card
  panel: { boxShadow: tokens.shadow16 },   // side panels
  dialog: { boxShadow: tokens.shadow64 },  // modals/dialogs
  tooltip: { boxShadow: tokens.shadow8 },  // tooltips/popovers

  // Levels: shadow2 < shadow4 < shadow8 < shadow16 < shadow28 < shadow64
});`}
      />
    </>
  );
}
