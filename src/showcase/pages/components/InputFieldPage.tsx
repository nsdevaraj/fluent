import React, { useState } from "react";
import {
  makeStyles, useId, tokens,
  Input, Label, Field,
} from "@fluentui/react-components";
import { Search20Regular, Eye20Regular, EyeOff20Regular, Mail20Regular } from "@fluentui/react-icons";
import { ShowcaseSection } from "../../ShowcaseSection";

const useStyles = makeStyles({
  // Official Fluent 2 pattern: stack label above input with 2px gap
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    "> div": { display: "flex", flexDirection: "column", gap: "2px" },
  },
  sizesRow: {
    display: "flex",
    gap: tokens.spacingHorizontalXXL,
    alignItems: "flex-start",
  },
  statesGrid: {
    display: "grid",
    gridTemplateColumns: "80px 1fr",
    gap: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    alignItems: "start",
    width: "100%",
    maxWidth: "360px",
  },
  stateLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    paddingTop: "6px",
  },
  stateLabelMuted: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
    paddingTop: "6px",
  },
  iconsRow: {
    display: "flex",
    gap: tokens.spacingHorizontalXL,
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
});

export function InputFieldPage() {
  const styles = useStyles();
  const smallId = useId("input-small");
  const mediumId = useId("input-medium");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <>
      {/* Sizes */}
      <ShowcaseSection
        title="Input Field — Sizes"
        description="Use small and medium only. Always place a Label above the input with 2px gap — this is the Fluent 2 design system spec."
        preview={
          <div className={styles.sizesRow}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Label size="small" htmlFor={smallId}>Small input</Label>
              <Input size="small" id={smallId} appearance="outline" placeholder="Enter text..." />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Label size="medium" htmlFor={mediumId}>Medium input</Label>
              <Input size="medium" id={mediumId} appearance="outline" placeholder="Enter text..." />
            </div>
          </div>
        }
        code={`import { Input, Label, useId } from "@fluentui/react-components";

const smallId = useId("input-small");
const mediumId = useId("input-medium");

// Small
<div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
  <Label size="small" htmlFor={smallId}>Small input</Label>
  <Input size="small" id={smallId} appearance="outline" />
</div>

// Medium
<div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
  <Label size="medium" htmlFor={mediumId}>Medium input</Label>
  <Input size="medium" id={mediumId} appearance="outline" />
</div>

// ⚠️ Large size is NOT used in our design system`}
      />

      {/* States */}
      <ShowcaseSection
        title="Input Field — States"
        description="Outline appearance only. Hover, Focus, and Pressed states are handled automatically by Fluent — no custom styles needed."
        preview={
          <div className={styles.statesGrid}>
            <span className={styles.stateLabel}>Rest</span>
            <Input appearance="outline" defaultValue="Text" />

            <span className={styles.stateLabel}>Disabled</span>
            <Input appearance="outline" defaultValue="Text" disabled />

            <span className={styles.stateLabelMuted}>Read-only</span>
            <Input appearance="outline" defaultValue="Text" readOnly />

            <span className={styles.stateLabel}>Error</span>
            <Field validationState="error" validationMessage="Message text">
              <Input appearance="outline" defaultValue="Text" />
            </Field>
          </div>
        }
        code={`import { Input, Field } from "@fluentui/react-components";

// Rest (default)
<Input appearance="outline" value={value} onChange={(_, d) => setValue(d.value)} />

// Disabled
<Input appearance="outline" value="Text" disabled />

// Read-only
<Input appearance="outline" value="Text" readOnly />

// Error — validationState belongs on Field, not on Input
<Field validationState="error" validationMessage="Enter a valid email">
  <Input appearance="outline" value={value} onChange={(_, d) => setValue(d.value)} />
</Field>

// ℹ️ Hover, Focus, Pressed are automatic — Fluent handles them`}
      />

      {/* With Icons */}
      <ShowcaseSection
        title="Input Field — With Icons"
        description="Use contentBefore for prefix icons (search, mail). Use contentAfter for action icons (show/hide password)."
        preview={
          <div className={styles.iconsRow}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Label htmlFor="search-input">Search</Label>
              <Input
                id="search-input"
                appearance="outline"
                contentBefore={<Search20Regular />}
                placeholder="Search..."
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Label htmlFor="email-input">Email</Label>
              <Input
                id="email-input"
                type="email"
                appearance="outline"
                contentBefore={<Mail20Regular />}
                placeholder="you@company.com"
                value={email}
                onChange={(_, d) => setEmail(d.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Label htmlFor="pass-input">Password</Label>
              <Input
                id="pass-input"
                appearance="outline"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                contentAfter={
                  <span
                    style={{ cursor: "pointer", display: "flex" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff20Regular /> : <Eye20Regular />}
                  </span>
                }
              />
            </div>
          </div>
        }
        code={`import { Input, Label, useId } from "@fluentui/react-components";
import { Search20Regular, Mail20Regular, Eye20Regular } from "@fluentui/react-icons";

// Prefix icon
<Input appearance="outline" contentBefore={<Search20Regular />} placeholder="Search..." />

// Suffix action (show/hide password)
<Input
  appearance="outline"
  type={showPassword ? "text" : "password"}
  contentAfter={
    <span style={{ cursor: "pointer", display: "flex" }} onClick={() => setShow(!show)}>
      {showPassword ? <EyeOff20Regular /> : <Eye20Regular />}
    </span>
  }
/>`}
      />
    </>
  );
}
