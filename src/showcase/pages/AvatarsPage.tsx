import React from "react";
import { Avatar, AvatarGroup, AvatarGroupItem, AvatarGroupPopover, makeStyles, tokens, Text } from "@fluentui/react-components";
import { ShowcaseSection } from "../ShowcaseSection";

const useStyles = makeStyles({
  group: { display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalM, alignItems: "center" },
  col: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS },
  row: { display: "flex", alignItems: "center", gap: tokens.spacingHorizontalS },
});

export function AvatarsPage() {
  const styles = useStyles();

  return (
    <>
      <ShowcaseSection
        title="Avatar — Sizes"
        description="16 to 128px. Use 32 for lists, 40-56 for profiles, 20-24 for inline/comments."
        preview={
          <div className={styles.group}>
            {([16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 128] as const).map(size => (
              <div key={size} className={styles.col} style={{ alignItems: "center" }}>
                <Avatar name="Alice M." size={size} />
                <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{size}</Text>
              </div>
            ))}
          </div>
        }
        code={`import { Avatar } from "@fluentui/react-components";

// Sizes: 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 128
<Avatar name="Alice M." size={32} />   // Lists
<Avatar name="Alice M." size={40} />   // Cards, profiles
<Avatar name="Alice M." size={56} />   // Prominent profiles
<Avatar name="Alice M." size={24} />   // Inline / comments`}
      />

      <ShowcaseSection
        title="Avatar — Colors & Initials"
        description="Colors are auto-assigned from name, or can be set explicitly."
        preview={
          <div className={styles.group}>
            <Avatar name="Alice M." size={40} />
            <Avatar name="Bob K." size={40} />
            <Avatar name="Carol S." size={40} />
            <Avatar name="David L." size={40} />
            <Avatar name="Eva R." size={40} />
            <Avatar name="Frank B." size={40} color="brand" />
            <Avatar name="Gina T." size={40} color="dark-red" />
            <Avatar name="Harry P." size={40} color="forest" />
            <Avatar initials="MX" size={40} color="brand" />
          </div>
        }
        code={`// Auto color from name
<Avatar name="Alice M." size={40} />

// Explicit color
<Avatar name="Bob K." size={40} color="brand" />
<Avatar name="Carol S." size={40} color="dark-red" />
<Avatar name="David L." size={40} color="forest" />

// Custom initials
<Avatar initials="MX" size={40} color="brand" />

// Colors: "neutral" | "brand" | "colorful" | "dark-red" | "cranberry"
//         | "red" | "pumpkin" | "peach" | "marigold" | "gold" | "brass"
//         | "brown" | "forest" | "seafoam" | "dark-green" | "light-teal"
//         | "teal" | "steel" | "blue" | "royal-blue" | "cornflower"
//         | "navy" | "lavender" | "purple" | "grape" | "lilac" | "pink"
//         | "magenta" | "plum" | "beige" | "mink" | "platinum" | "anchor"`}
      />

      <ShowcaseSection
        title="Avatar — Shape & Active State"
        description="Circular (default) or square. Active ring shows online/active presence."
        preview={
          <div className={styles.group}>
            <div className={styles.col} style={{ alignItems: "center" }}>
              <Avatar name="Alice M." size={48} shape="circular" />
              <Text size={200}>Circular</Text>
            </div>
            <div className={styles.col} style={{ alignItems: "center" }}>
              <Avatar name="Bob K." size={48} shape="square" />
              <Text size={200}>Square</Text>
            </div>
            <div className={styles.col} style={{ alignItems: "center" }}>
              <Avatar name="Carol S." size={48} active="active" activeAppearance="ring" />
              <Text size={200}>Active ring</Text>
            </div>
            <div className={styles.col} style={{ alignItems: "center" }}>
              <Avatar name="David L." size={48} active="active" activeAppearance="shadow" />
              <Text size={200}>Active shadow</Text>
            </div>
            <div className={styles.col} style={{ alignItems: "center" }}>
              <Avatar name="Eva R." size={48} active="inactive" />
              <Text size={200}>Inactive</Text>
            </div>
          </div>
        }
        code={`// Shapes
<Avatar name="Alice" size={48} shape="circular" />  // default
<Avatar name="Bob" size={48} shape="square" />

// Active/inactive states
<Avatar name="Carol" active="active" activeAppearance="ring" />
<Avatar name="David" active="active" activeAppearance="shadow" />
<Avatar name="Eva" active="inactive" />`}
      />

      <ShowcaseSection
        title="AvatarGroup"
        description="Stacked group of avatars with overflow popover."
        preview={
          <div className={styles.group}>
            <AvatarGroup layout="stack">
              <AvatarGroupItem name="Alice M." />
              <AvatarGroupItem name="Bob K." />
              <AvatarGroupItem name="Carol S." />
              <AvatarGroupItem name="David L." />
              <AvatarGroupPopover>
                <AvatarGroupItem name="Eva R." />
                <AvatarGroupItem name="Frank B." />
                <AvatarGroupItem name="Gina T." />
              </AvatarGroupPopover>
            </AvatarGroup>

            <AvatarGroup layout="spread">
              <AvatarGroupItem name="Alice M." />
              <AvatarGroupItem name="Bob K." />
              <AvatarGroupItem name="Carol S." />
              <AvatarGroupPopover>
                <AvatarGroupItem name="David L." />
                <AvatarGroupItem name="Eva R." />
              </AvatarGroupPopover>
            </AvatarGroup>
          </div>
        }
        code={`import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover } from "@fluentui/react-components";

// layout: "stack" | "spread" | "pie"
<AvatarGroup layout="stack">
  <AvatarGroupItem name="Alice M." />
  <AvatarGroupItem name="Bob K." />
  <AvatarGroupItem name="Carol S." />
  {/* Overflow goes in AvatarGroupPopover */}
  <AvatarGroupPopover>
    <AvatarGroupItem name="David L." />
    <AvatarGroupItem name="Eva R." />
  </AvatarGroupPopover>
</AvatarGroup>`}
      />
    </>
  );
}
