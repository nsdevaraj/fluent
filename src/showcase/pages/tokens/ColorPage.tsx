import React, { useState } from "react";
import { makeStyles, tokens, Text, Input } from "@fluentui/react-components";
import { Search20Regular } from "@fluentui/react-icons";
import { ShowcaseSection } from "../../ShowcaseSection";

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

export function ColorPage() {
  const styles = useStyles();
  const [search, setSearch] = useState("");

  return (
    <ShowcaseSection
      title="Color Hierarchy"
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
  );
}
