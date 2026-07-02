import React from "react";
import { makeStyles, tokens, Text } from "@fluentui/react-components";
import { ShowcaseSection } from "../../ShowcaseSection";

const useStyles = makeStyles({
  row: { display: "flex", alignItems: "center", gap: tokens.spacingHorizontalM },
  bar: { height: "20px", backgroundColor: tokens.colorBrandBackground2, borderRadius: tokens.borderRadiusSmall },
});

const spacingTokens = [
  { name: "spacingVerticalXXS", value: "2px" },
  { name: "spacingVerticalXS",  value: "4px" },
  { name: "spacingVerticalS",   value: "6px" },
  { name: "spacingVerticalM",   value: "8px" },
  { name: "spacingVerticalL",   value: "12px" },
  { name: "spacingVerticalXL",  value: "16px" },
  { name: "spacingVerticalXXL", value: "20px" },
  { name: "spacingVerticalXXXL",value: "36px" },
];

export function SpacingPage() {
  const styles = useStyles();

  return (
    <ShowcaseSection
      title="Spacing"
      description="Use spacingVertical* and spacingHorizontal* for all padding, gap, and margin. Never hardcode px values."
      preview={
        <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS, width: "100%" }}>
          {spacingTokens.map(({ name, value }) => (
            <div key={name} className={styles.row}>
              <div className={styles.bar} style={{ width: value }} />
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
    padding: tokens.spacingVerticalL,          // 12px
    gap: tokens.spacingHorizontalM,            // 8px
    marginBottom: tokens.spacingVerticalXXL,   // 20px
  },
});

// Scale (same for Vertical and Horizontal):
// XXS=2  XS=4  S=6  M=8  L=12  XL=16  XXL=20  XXXL=36`}
    />
  );
}
