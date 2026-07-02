import React from "react";
import { tokens, Text } from "@fluentui/react-components";
import { ShowcaseSection } from "../../ShowcaseSection";

const radiusTokens = [
  { name: "None",     token: "borderRadiusNone",     value: tokens.borderRadiusNone,     usage: "Flat — data tables, dividers" },
  { name: "Small",    token: "borderRadiusSmall",    value: tokens.borderRadiusSmall,    usage: "Tags, small chips" },
  { name: "Medium",   token: "borderRadiusMedium",   value: tokens.borderRadiusMedium,   usage: "Inputs, buttons, badges" },
  { name: "Large",    token: "borderRadiusLarge",    value: tokens.borderRadiusLarge,    usage: "Cards, panels" },
  { name: "XLarge",   token: "borderRadiusXLarge",   value: tokens.borderRadiusXLarge,   usage: "Dialogs, large containers" },
  { name: "Circular", token: "borderRadiusCircular", value: tokens.borderRadiusCircular, usage: "Avatars, pills, FABs" },
];

export function CornerRadiusPage() {
  return (
    <ShowcaseSection
      title="Corner Radius"
      description="Use borderRadius* tokens for consistent rounded corners. Never hardcode px values."
      preview={
        <div style={{ display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalXL, padding: tokens.spacingVerticalL, width: "100%" }}>
          {radiusTokens.map(({ name, token, value, usage }) => (
            <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: tokens.spacingVerticalS }}>
              <div style={{
                width: "72px",
                height: "72px",
                backgroundColor: tokens.colorBrandBackground2,
                borderRadius: value,
                border: `2px solid ${tokens.colorBrandStroke1}`,
              }} />
              <Text size={200} weight="semibold" style={{ color: tokens.colorNeutralForeground1 }}>{name}</Text>
              <Text size={100} style={{ fontFamily: "monospace", color: tokens.colorNeutralForeground3, textAlign: "center" }}>
                {token}
              </Text>
              <Text size={100} style={{ color: tokens.colorNeutralForeground3, textAlign: "center", maxWidth: "80px" }}>
                {usage}
              </Text>
            </div>
          ))}
        </div>
      }
      code={`import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  input:   { borderRadius: tokens.borderRadiusMedium },   // inputs, buttons
  card:    { borderRadius: tokens.borderRadiusLarge },    // cards, panels
  dialog:  { borderRadius: tokens.borderRadiusXLarge },   // modals
  avatar:  { borderRadius: tokens.borderRadiusCircular }, // avatars, pills
  table:   { borderRadius: tokens.borderRadiusNone },     // data tables
});`}
    />
  );
}
