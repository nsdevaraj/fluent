import React, { useState } from "react";
import { makeStyles, tokens, Switch, Checkbox, RadioGroup, Radio } from "@fluentui/react-components";
import { ShowcaseSection } from "../../ShowcaseSection";

const useStyles = makeStyles({
  row: { display: "flex", gap: tokens.spacingHorizontalXXL, flexWrap: "wrap", alignItems: "flex-start", width: "100%" },
  col: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM },
});

export function TogglesPage() {
  const styles = useStyles();
  const [switchOn, setSwitchOn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [priority, setPriority] = useState("medium");

  return (
    <>
      <ShowcaseSection
        title="Switch"
        description="On/off toggle for settings. Use when the action takes effect immediately."
        preview={
          <div className={styles.col}>
            <Switch
              label={switchOn ? "Notifications on" : "Notifications off"}
              checked={switchOn}
              onChange={(_, d) => setSwitchOn(d.checked)}
            />
            <Switch label="Dark mode" disabled />
          </div>
        }
        code={`import { Switch } from "@fluentui/react-components";

<Switch
  label="Dark mode"
  checked={darkMode}
  onChange={(_, d) => setDarkMode(d.checked)}
/>

// Disabled
<Switch label="Disabled option" disabled />`}
      />

      <ShowcaseSection
        title="Checkbox"
        description="Multi-select option. Use when multiple items can be selected at once."
        preview={
          <div className={styles.col}>
            <Checkbox
              label="Remember me"
              checked={checked}
              onChange={(_, d) => setChecked(d.checked as boolean)}
            />
            <Checkbox label="Accept terms" disabled />
            <Checkbox label="Indeterminate state" checked="mixed" />
          </div>
        }
        code={`import { Checkbox } from "@fluentui/react-components";

<Checkbox
  label="Remember me"
  checked={accepted}
  onChange={(_, d) => setAccepted(d.checked as boolean)}
/>

// Indeterminate (partial select in a group)
<Checkbox label="Select all" checked="mixed" />`}
      />

      <ShowcaseSection
        title="Radio Group"
        description="Single selection from a group. Use when only one option can be chosen."
        preview={
          <div className={styles.row}>
            <div className={styles.col}>
              <RadioGroup
                value={priority}
                onChange={(_, d) => setPriority(d.value)}
              >
                <Radio value="low" label="Low" />
                <Radio value="medium" label="Medium" />
                <Radio value="high" label="High" />
              </RadioGroup>
            </div>
            <div className={styles.col}>
              <RadioGroup defaultValue="email" layout="horizontal">
                <Radio value="email" label="Email" />
                <Radio value="sms" label="SMS" />
                <Radio value="push" label="Push" />
              </RadioGroup>
            </div>
          </div>
        }
        code={`import { RadioGroup, Radio } from "@fluentui/react-components";

// Vertical (default)
<RadioGroup value={priority} onChange={(_, d) => setPriority(d.value)}>
  <Radio value="low" label="Low" />
  <Radio value="medium" label="Medium" />
  <Radio value="high" label="High" />
</RadioGroup>

// Horizontal
<RadioGroup defaultValue="email" layout="horizontal">
  <Radio value="email" label="Email" />
  <Radio value="sms" label="SMS" />
</RadioGroup>`}
      />
    </>
  );
}
