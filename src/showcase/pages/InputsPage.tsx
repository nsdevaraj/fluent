import React, { useState } from "react";
import {
  Input, Textarea, Field, Dropdown, Option,
  Combobox, SpinButton, Switch, Checkbox, RadioGroup, Radio,
  makeStyles, tokens, Text,
} from "@fluentui/react-components";
import { Search20Regular, Eye20Regular, EyeOff20Regular } from "@fluentui/react-icons";
import { ShowcaseSection } from "../ShowcaseSection";

const useStyles = makeStyles({
  group: { display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalL, alignItems: "flex-start", width: "100%" },
  col: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM, minWidth: "200px", flex: 1 },
});

export function InputsPage() {
  const styles = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <>
      <ShowcaseSection
        title="Input — Appearances"
        description="Always wrap Input in a Field for label + validation support."
        preview={
          <div className={styles.group}>
            <Field label="Outline (default)">
              <Input appearance="outline" placeholder="Enter text..." />
            </Field>
            <Field label="Underline">
              <Input appearance="underline" placeholder="Enter text..." />
            </Field>
            <Field label="Filled Darker">
              <Input appearance="filled-darker" placeholder="Enter text..." />
            </Field>
          </div>
        }
        code={`import { Input, Field } from "@fluentui/react-components";

// Always wrap Input in Field
<Field label="Email" required>
  <Input appearance="outline" placeholder="user@example.com" />
</Field>

// Appearances: "outline" | "underline" | "filled-darker" | "filled-lighter"`}
      />

      <ShowcaseSection
        title="Input — With Icons & Validation"
        description="contentBefore/contentAfter for icons. validationState drives error/warning/success styling."
        preview={
          <div className={styles.group}>
            <Field label="Search">
              <Input contentBefore={<Search20Regular />} placeholder="Search..." />
            </Field>
            <Field label="Password">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                contentAfter={
                  <span style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff20Regular /> : <Eye20Regular />}
                  </span>
                }
              />
            </Field>
            <Field label="Email" validationState="error" validationMessage="Enter a valid email">
              <Input type="email" defaultValue="notanemail" />
            </Field>
            <Field label="Username" validationState="success" validationMessage="Username available">
              <Input defaultValue="mx_fluent" />
            </Field>
          </div>
        }
        code={`// With icon prefix
<Field label="Search">
  <Input contentBefore={<Search20Regular />} placeholder="Search..." />
</Field>

// Validation states: "error" | "warning" | "success" | "none"
<Field label="Email" validationState="error" validationMessage="Enter a valid email">
  <Input type="email" value={email} onChange={(_, d) => setEmail(d.value)} />
</Field>

<Field label="Username" validationState="success" validationMessage="Available!">
  <Input value="mx_fluent" />
</Field>`}
      />

      <ShowcaseSection
        title="Textarea"
        description="Multi-line text input. Always wrap in Field."
        preview={
          <div className={styles.group}>
            <Field label="Description" style={{ flex: 1 }}>
              <Textarea placeholder="Enter a description..." rows={3} resize="vertical" />
            </Field>
          </div>
        }
        code={`import { Textarea, Field } from "@fluentui/react-components";

<Field label="Description">
  <Textarea
    placeholder="Enter description..."
    rows={4}
    resize="vertical"   // "none" | "vertical" | "horizontal" | "both"
    onChange={(_, d) => setVal(d.value)}
  />
</Field>`}
      />

      <ShowcaseSection
        title="Dropdown & Combobox"
        description="Dropdown for fixed options. Combobox for searchable/filterable options."
        preview={
          <div className={styles.group}>
            <Field label="Priority">
              <Dropdown placeholder="Select priority">
                <Option value="high">High</Option>
                <Option value="medium">Medium</Option>
                <Option value="low">Low</Option>
              </Dropdown>
            </Field>
            <Field label="Assignee (searchable)">
              <Combobox placeholder="Search team members...">
                <Option value="alice">Alice M.</Option>
                <Option value="bob">Bob K.</Option>
                <Option value="carol">Carol S.</Option>
              </Combobox>
            </Field>
          </div>
        }
        code={`import { Dropdown, Combobox, Option, Field } from "@fluentui/react-components";

// Fixed list — use Dropdown
<Field label="Priority">
  <Dropdown placeholder="Select priority" onOptionSelect={(_, d) => setValue(d.optionValue)}>
    <Option value="high">High</Option>
    <Option value="medium">Medium</Option>
  </Dropdown>
</Field>

// Searchable list — use Combobox
<Field label="Assignee">
  <Combobox placeholder="Search..." onOptionSelect={(_, d) => setAssignee(d.optionValue)}>
    <Option value="alice">Alice M.</Option>
  </Combobox>
</Field>`}
      />

      <ShowcaseSection
        title="Switch, Checkbox, Radio"
        description="Toggle controls. Use Switch for on/off settings. Checkbox for multi-select. Radio for single-select from a group."
        preview={
          <div className={styles.group}>
            <div className={styles.col}>
              <Switch
                label={switchOn ? "Notifications on" : "Notifications off"}
                checked={switchOn}
                onChange={(_, d) => setSwitchOn(d.checked)}
              />
              <Checkbox
                label="Remember me"
                checked={checked}
                onChange={(_, d) => setChecked(d.checked as boolean)}
              />
            </div>
            <div className={styles.col}>
              <RadioGroup defaultValue="medium" layout="horizontal">
                <Radio value="low" label="Low" />
                <Radio value="medium" label="Medium" />
                <Radio value="high" label="High" />
              </RadioGroup>
            </div>
          </div>
        }
        code={`import { Switch, Checkbox, RadioGroup, Radio } from "@fluentui/react-components";

<Switch
  label="Dark mode"
  checked={darkMode}
  onChange={(_, d) => setDarkMode(d.checked)}
/>

<Checkbox
  label="Accept terms"
  checked={accepted}
  onChange={(_, d) => setAccepted(d.checked as boolean)}
/>

<RadioGroup value={priority} onChange={(_, d) => setPriority(d.value)}>
  <Radio value="low" label="Low" />
  <Radio value="medium" label="Medium" />
  <Radio value="high" label="High" />
</RadioGroup>`}
      />

      <ShowcaseSection
        title="⚠️ Edge Cases & Limits"
        description=""
        preview={
          <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS }}>
            <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>❌ Never use <code>Input</code> without <code>Field</code> — labels and validation messages require it.</Text>
            <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>❌ <code>Dropdown</code> does not support free-text input — use <code>Combobox</code> for that.</Text>
            <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>✅ Use <code>required</code> on <code>Field</code> (not on <code>Input</code>) to show the required indicator.</Text>
            <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>✅ For controlled inputs, always use onChange with the second arg (data) to get the new value — e.g. {"onChange={(_, d) => setValue(d.value)}"}.</Text>
          </div>
        }
        code={`// ✅ Correct controlled input pattern
const [value, setValue] = useState("");

<Field label="Name" required>
  <Input
    value={value}
    onChange={(_, data) => setValue(data.value)}
    placeholder="Enter name"
  />
</Field>

// ✅ Correct Dropdown controlled pattern
const [selected, setSelected] = useState<string>("");

<Dropdown
  value={selected}
  onOptionSelect={(_, data) => setSelected(data.optionValue ?? "")}
>
  <Option value="a">Option A</Option>
</Dropdown>`}
      />
    </>
  );
}
