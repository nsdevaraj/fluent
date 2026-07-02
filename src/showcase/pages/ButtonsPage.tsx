import React, { useState } from "react";
import { Button, ToggleButton, makeStyles, tokens, Text } from "@fluentui/react-components";
import { Add20Regular, ArrowRight20Regular, Delete20Regular } from "@fluentui/react-icons";
import { ShowcaseSection } from "../ShowcaseSection";

const useStyles = makeStyles({
  group: { display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalS, alignItems: "center" },
  label: { color: tokens.colorNeutralForeground3, fontSize: tokens.fontSizeBase200, minWidth: "80px" },
  row: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS, width: "100%" },
});

export function ButtonsPage() {
  const styles = useStyles();
  const [toggled, setToggled] = useState(false);

  return (
    <>
      <ShowcaseSection
        title="Appearances"
        description="Five button appearances for different visual hierarchies."
        preview={
          <div className={styles.group}>
            <Button appearance="primary">Primary</Button>
            <Button appearance="secondary">Secondary</Button>
            <Button appearance="outline">Outline</Button>
            <Button appearance="subtle">Subtle</Button>
            <Button appearance="transparent">Transparent</Button>
          </div>
        }
        code={`import { Button } from "@fluentui/react-components";

<Button appearance="primary">Primary</Button>
<Button appearance="secondary">Secondary</Button>
<Button appearance="outline">Outline</Button>
<Button appearance="subtle">Subtle</Button>
<Button appearance="transparent">Transparent</Button>`}
      />

      <ShowcaseSection
        title="Sizes"
        description="Small and medium only. Large is not used in our design system."
        preview={
          <div className={styles.group}>
            <Button appearance="primary" size="small">Small</Button>
            <Button appearance="primary" size="medium">Medium</Button>
          </div>
        }
        code={`<Button appearance="primary" size="small">Small</Button>
<Button appearance="primary" size="medium">Medium</Button>

// ⚠️ Large size is NOT used in our design system`}
      />

      <ShowcaseSection
        title="With Icons"
        description="Icons can go before or after the label. Icon-only buttons need aria-label."
        preview={
          <div className={styles.group}>
            <Button appearance="primary" icon={<Add20Regular />}>Add Item</Button>
            <Button appearance="secondary" icon={<ArrowRight20Regular />} iconPosition="after">Next</Button>
            <Button appearance="outline" icon={<Delete20Regular />} />
            <Button appearance="primary" icon={<Add20Regular />} aria-label="Add item" />
          </div>
        }
        code={`import { Add20Regular, ArrowRight20Regular } from "@fluentui/react-icons";

// Icon before label (default)
<Button appearance="primary" icon={<Add20Regular />}>Add Item</Button>

// Icon after label
<Button icon={<ArrowRight20Regular />} iconPosition="after">Next</Button>

// Icon only — ALWAYS add aria-label for accessibility
<Button icon={<Add20Regular />} appearance="outline" aria-label="Add item" />`}
      />

      <ShowcaseSection
        title="States"
        description="Disabled and loading states."
        preview={
          <div className={styles.group}>
            <Button appearance="primary" disabled>Disabled</Button>
            <Button appearance="secondary" disabled>Disabled</Button>
            <Button appearance="primary" disabledFocusable>Disabled Focusable</Button>
          </div>
        }
        code={`// Fully disabled (not focusable)
<Button appearance="primary" disabled>Disabled</Button>

// Disabled but still focusable (better for accessibility)
<Button appearance="primary" disabledFocusable>Disabled Focusable</Button>`}
      />

      <ShowcaseSection
        title="ToggleButton"
        description="A button that tracks checked/unchecked state."
        preview={
          <div className={styles.group}>
            <ToggleButton checked={toggled} onClick={() => setToggled(!toggled)}>
              {toggled ? "Enabled" : "Disabled"}
            </ToggleButton>
            <ToggleButton appearance="outline" checked={false}>Bold</ToggleButton>
            <ToggleButton appearance="outline" checked={true}>Italic</ToggleButton>
          </div>
        }
        code={`import { ToggleButton } from "@fluentui/react-components";
import { useState } from "react";

const [checked, setChecked] = useState(false);

<ToggleButton checked={checked} onClick={() => setChecked(!checked)}>
  {checked ? "On" : "Off"}
</ToggleButton>`}
      />

      <ShowcaseSection
        title="Shapes"
        description="Rounded (default), circular, and square."
        preview={
          <div className={styles.group}>
            <Button appearance="primary" shape="rounded">Rounded</Button>
            <Button appearance="primary" shape="circular">Circular</Button>
            <Button appearance="primary" shape="square">Square</Button>
          </div>
        }
        code={`<Button appearance="primary" shape="rounded">Rounded</Button>
<Button appearance="primary" shape="circular">Circular</Button>
<Button appearance="primary" shape="square">Square</Button>`}
      />

      <ShowcaseSection
        title="⚠️ Edge Cases & Limits"
        description="Things to watch out for."
        preview={
          <div className={styles.row}>
            <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
              ❌ Don't use <code>primary</code> for more than one action per section — it creates visual confusion.
            </Text>
            <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
              ❌ Icon-only buttons without <code>aria-label</code> will fail accessibility audits.
            </Text>
            <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
              ✅ Use <code>disabledFocusable</code> instead of <code>disabled</code> when you want keyboard users to still reach the button (e.g., with a tooltip explaining why it's disabled).
            </Text>
            <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
              ✅ For destructive actions (delete, remove), use <code>appearance="primary"</code> with a danger background token, or wrap in a Dialog for confirmation.
            </Text>
          </div>
        }
        code={`// ✅ Correct: accessible icon-only button
<Button icon={<Delete20Regular />} aria-label="Delete item" appearance="subtle" />

// ✅ Correct: destructive action goes in a Dialog
<Dialog>
  <DialogTrigger>
    <Button appearance="secondary">Delete</Button>
  </DialogTrigger>
  <DialogSurface>
    <DialogBody>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogActions>
        <DialogTrigger><Button appearance="secondary">Cancel</Button></DialogTrigger>
        <Button appearance="primary">Delete</Button>
      </DialogActions>
    </DialogBody>
  </DialogSurface>
</Dialog>`}
      />
    </>
  );
}
