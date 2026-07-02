import React from "react";
import { makeStyles, tokens, Field, Dropdown, Option, Combobox } from "@fluentui/react-components";
import { ShowcaseSection } from "../../ShowcaseSection";

const useStyles = makeStyles({
  row: { display: "flex", gap: tokens.spacingHorizontalXL, flexWrap: "wrap", alignItems: "flex-start", width: "100%" },
});

export function DropdownPage() {
  const styles = useStyles();

  return (
    <ShowcaseSection
      title="Dropdown & Combobox"
      description="Dropdown for a fixed list of options. Combobox when the user needs to search or filter the list."
      preview={
        <div className={styles.row}>
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
              <Option value="david">David L.</Option>
            </Combobox>
          </Field>
        </div>
      }
      code={`import { Dropdown, Combobox, Option, Field } from "@fluentui/react-components";

// Fixed list — use Dropdown
<Field label="Priority">
  <Dropdown
    placeholder="Select priority"
    onOptionSelect={(_, d) => setValue(d.optionValue)}
  >
    <Option value="high">High</Option>
    <Option value="medium">Medium</Option>
    <Option value="low">Low</Option>
  </Dropdown>
</Field>

// Searchable list — use Combobox
<Field label="Assignee">
  <Combobox
    placeholder="Search..."
    onOptionSelect={(_, d) => setAssignee(d.optionValue)}
  >
    <Option value="alice">Alice M.</Option>
  </Combobox>
</Field>

// ❌ Dropdown does NOT support free-text input — use Combobox for that`}
    />
  );
}
