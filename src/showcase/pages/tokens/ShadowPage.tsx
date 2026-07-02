import React from "react";
import { tokens, Text } from "@fluentui/react-components";
import { ShowcaseSection } from "../../ShowcaseSection";

const shadowTokens = [
  { name: "shadow2",  value: tokens.shadow2,  usage: "Subtle hover states" },
  { name: "shadow4",  value: tokens.shadow4,  usage: "Default cards" },
  { name: "shadow8",  value: tokens.shadow8,  usage: "Tooltips, popovers" },
  { name: "shadow16", value: tokens.shadow16, usage: "Side panels" },
  { name: "shadow28", value: tokens.shadow28, usage: "Floating menus" },
  { name: "shadow64", value: tokens.shadow64, usage: "Modals, dialogs" },
];

export function ShadowPage() {
  return (
    <ShowcaseSection
      title="Shadow"
      description="Use shadow tokens for elevation. Never write custom box-shadow values."
      preview={
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: tokens.spacingHorizontalXXL,
          padding: tokens.spacingVerticalXL,
          backgroundColor: tokens.colorNeutralBackground3,
          borderRadius: tokens.borderRadiusMedium,
          width: "100%",
        }}>
          {shadowTokens.map(({ name, value, usage }) => (
            <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: tokens.spacingVerticalS }}>
              <div style={{
                width: "72px",
                height: "72px",
                backgroundColor: tokens.colorNeutralBackground1,
                borderRadius: tokens.borderRadiusMedium,
                boxShadow: value,
              }} />
              <Text size={200} weight="semibold" style={{ fontFamily: "monospace", color: tokens.colorNeutralForeground1 }}>{name}</Text>
              <Text size={100} style={{ color: tokens.colorNeutralForeground3, textAlign: "center", maxWidth: "80px" }}>{usage}</Text>
            </div>
          ))}
        </div>
      }
      code={`import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  card:    { boxShadow: tokens.shadow4 },   // default card
  tooltip: { boxShadow: tokens.shadow8 },   // tooltip/popover
  panel:   { boxShadow: tokens.shadow16 },  // side panel
  dialog:  { boxShadow: tokens.shadow64 },  // modal/dialog
});

// Elevation scale: shadow2 < shadow4 < shadow8 < shadow16 < shadow28 < shadow64`}
    />
  );
}
