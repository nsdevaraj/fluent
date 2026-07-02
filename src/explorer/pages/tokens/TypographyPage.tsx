import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Heading, Body, Caption } from "../../../components/ui/Typography";
import { Divider } from "../../../components/ui/Divider";
import { Tag } from "../../../components/ui/Tag";
import { Card } from "../../../components/ui/Card";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXL, maxWidth: "1000px" },
  section: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL },
  // Full type scale table
  scaleTable: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  scaleRow: {
    display: "flex",
    alignItems: "baseline",
    gap: tokens.spacingHorizontalL,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusMedium,
    ":nth-child(odd)": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  scaleMeta: {
    minWidth: "220px",
    display: "flex",
    flexDirection: "column",
    gap: "1px",
    flexShrink: 0,
  },
  scaleSample: {
    flex: 1,
    overflow: "hidden",
  },
  weightGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 700px)": { gridTemplateColumns: "repeat(2, 1fr)" },
  },
  weightCard: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  fontFamilyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 700px)": { gridTemplateColumns: "1fr" },
  },
  familyCard: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  mt4: { marginTop: "4px", display: "block" },
});

/** Full Fluent 2 type scale — matches design spec screenshot */
const TYPE_SCALE = [
  { name: "Caption 2",          size: "10px", lh: "14px", weight: "400 Regular",  token: "fontSizeBase100" },
  { name: "Caption 2 Strong",   size: "10px", lh: "14px", weight: "600 Semibold", token: "fontSizeBase100" },
  { name: "Caption 1",          size: "12px", lh: "16px", weight: "400 Regular",  token: "fontSizeBase200" },
  { name: "Caption 1 Strong",   size: "12px", lh: "16px", weight: "600 Semibold", token: "fontSizeBase200" },
  { name: "Caption 1 Stronger", size: "12px", lh: "16px", weight: "700 Bold",     token: "fontSizeBase200" },
  { name: "Body 1",             size: "14px", lh: "20px", weight: "400 Regular",  token: "fontSizeBase300" },
  { name: "Body 1 Strong",      size: "14px", lh: "20px", weight: "600 Semibold", token: "fontSizeBase300" },
  { name: "Body 1 Stronger",    size: "14px", lh: "20px", weight: "700 Bold",     token: "fontSizeBase300" },
  { name: "Body 2",             size: "16px", lh: "22px", weight: "400 Regular",  token: "fontSizeBase400" },
  { name: "Subtitle 2",         size: "16px", lh: "22px", weight: "600 Semibold", token: "fontSizeBase400" },
  { name: "Subtitle 2 Stronger",size: "16px", lh: "22px", weight: "700 Bold",     token: "fontSizeBase400" },
  { name: "Subtitle 1",         size: "20px", lh: "26px", weight: "600 Semibold", token: "fontSizeBase500" },
  { name: "Title 3",            size: "24px", lh: "32px", weight: "600 Semibold", token: "fontSizeBase600" },
  { name: "Title 2",            size: "28px", lh: "36px", weight: "600 Semibold", token: "fontSizeHero700"  },
  { name: "Title 1",            size: "32px", lh: "40px", weight: "600 Semibold", token: "fontSizeHero800"  },
  { name: "Large Title",        size: "40px", lh: "52px", weight: "600 Semibold", token: "fontSizeHero900"  },
  { name: "Display",            size: "68px", lh: "92px", weight: "600 Semibold", token: "fontSizeHero1000" },
];

const WEIGHT_MAP: Record<string, string> = {
  "400 Regular":  tokens.fontWeightRegular as unknown as string,
  "500 Medium":   tokens.fontWeightMedium  as unknown as string,
  "600 Semibold": tokens.fontWeightSemibold as unknown as string,
  "700 Bold":     tokens.fontWeightBold    as unknown as string,
};

export function TypographyPage() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <PageHeader
        title="Typography"
        description="The complete Fluent 2 type scale — from Caption 2 (10px) to Display (68px). All sizes, weights, and line heights aligned to the design spec."
        breadcrumbs={["Design System", "Design Tokens", "Typography"]}
      />

      {/* Full type scale */}
      <div className={styles.section}>
        <div>
          <Heading level={2}>Type Scale</Heading>
          <Body size="sm" color="subtle">17 named styles. Size / line-height / weight match the Fluent 2 design specification.</Body>
        </div>
        <div className={styles.scaleTable}>
          {TYPE_SCALE.map(({ name, size, lh, weight, token }) => {
            const fontWeight = WEIGHT_MAP[weight] ?? weight.split(" ")[0];
            return (
              <div key={name} className={styles.scaleRow}>
                <div className={styles.scaleMeta}>
                  <Body size="sm">{name}</Body>
                  <Caption color="subtle">{size} / {lh} / {weight}</Caption>
                  <Caption color="subtle">{token}</Caption>
                </div>
                <div
                  className={styles.scaleSample}
                  style={{
                    fontSize: size,
                    lineHeight: lh,
                    fontWeight,
                    color: tokens.colorNeutralForeground1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  The quick brown fox
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Divider />

      {/* Font weights */}
      <div className={styles.section}>
        <Heading level={2}>Font Weights</Heading>
        <div className={styles.weightGrid}>
          {[
            { label: "Regular",  value: "400", tok: "fontWeightRegular",  weight: tokens.fontWeightRegular  },
            { label: "Medium",   value: "500", tok: "fontWeightMedium",   weight: tokens.fontWeightMedium   },
            { label: "Semibold", value: "600", tok: "fontWeightSemibold", weight: tokens.fontWeightSemibold },
            { label: "Bold",     value: "700", tok: "fontWeightBold",     weight: tokens.fontWeightBold     },
          ].map(({ label, value, tok, weight }) => (
            <Card key={label}>
              <div className={styles.weightCard}>
                <div style={{ fontWeight: weight, fontSize: tokens.fontSizeBase500, lineHeight: "26px" }}>
                  Fluent 2
                </div>
                <Body>{label}</Body>
                <Caption color="subtle">{value} · {tok}</Caption>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Divider />

      {/* Font families */}
      <div className={styles.section}>
        <Heading level={2}>Font Families</Heading>
        <div className={styles.fontFamilyGrid}>
          {[
            { label: "Base",    tok: "fontFamilyBase",      sample: "Segoe UI, system-ui",  text: "AaBbCcDd 0123" },
            { label: "Mono",    tok: "fontFamilyMonospace", sample: "Courier New",           text: "const x = 42;" },
            { label: "Numeric", tok: "fontFamilyNumeric",   sample: "Bahnschrift",           text: "1,234,567.89" },
          ].map(({ label, tok, sample, text }) => (
            <Card key={label}>
              <div className={styles.familyCard}>
                <Tag appearance="outline" size="small">{label}</Tag>
                <div style={{ fontFamily: `var(--${tok})`, fontSize: tokens.fontSizeBase500, lineHeight: "26px", color: tokens.colorNeutralForeground1 }}>
                  {text}
                </div>
                <Caption color="subtle">{tok}</Caption>
                <Caption color="subtle">{sample}</Caption>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Divider />

      {/* DS components quick reference */}
      <div className={styles.section}>
        <Heading level={2}>Typography Components</Heading>
        <Body size="sm" color="subtle">Use these DS components instead of raw HTML tags — they carry the correct token, spacing, and color.</Body>
        <Card>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {[1, 2, 3, 4].map(level => (
              <div key={level}>
                <Tag appearance="outline" size="small">{`<Heading level={${level}}>`}</Tag>
                <div className={styles.mt4}>
                  <Heading level={level as 1 | 2 | 3 | 4}>Heading Level {level}</Heading>
                </div>
              </div>
            ))}
            <Divider />
            <div>
              <Tag appearance="outline" size="small">{"<Body>"}</Tag>
              <div className={styles.mt4}>
                <Body>Body text at default size — 14px / Regular. Use for all paragraph and UI content.</Body>
              </div>
            </div>
            <div>
              <Tag appearance="outline" size="small">{"<Body size=\"sm\" color=\"subtle\">"}</Tag>
              <div className={styles.mt4}>
                <Body size="sm" color="subtle">Small body text — 12px / Regular. Use for helper text and secondary descriptions.</Body>
              </div>
            </div>
            <div>
              <Tag appearance="outline" size="small">{"<Caption>"}</Tag>
              <div className={styles.mt4}>
                <Caption>Caption — 10px / Regular. Labels, timestamps, and metadata.</Caption>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
