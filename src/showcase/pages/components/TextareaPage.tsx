import React from "react";
import { makeStyles, tokens, Field, Textarea } from "@fluentui/react-components";
import { ShowcaseSection } from "../../ShowcaseSection";

const useStyles = makeStyles({
  row: { display: "flex", gap: tokens.spacingHorizontalXL, flexWrap: "wrap", width: "100%" },
});

export function TextareaPage() {
  const styles = useStyles();

  return (
    <ShowcaseSection
      title="Textarea"
      description="Multi-line text input. Always wrap in Field. Use resize='vertical' by default."
      preview={
        <div className={styles.row}>
          <Field label="Description" style={{ flex: 1, minWidth: "200px" }}>
            <Textarea appearance="outline" placeholder="Enter a description..." rows={3} resize="vertical" />
          </Field>
          <Field label="Notes (error)" validationState="error" validationMessage="This field is required" style={{ flex: 1, minWidth: "200px" }}>
            <Textarea appearance="outline" placeholder="Enter notes..." rows={3} />
          </Field>
        </div>
      }
      code={`import { Textarea, Field } from "@fluentui/react-components";

// Always wrap in Field for label + validation
<Field label="Description">
  <Textarea
    appearance="outline"
    placeholder="Enter description..."
    rows={4}
    resize="vertical"
    onChange={(_, d) => setVal(d.value)}
  />
</Field>

// resize: "none" | "vertical" | "horizontal" | "both"
// ⚠️ Always use appearance="outline" — matches Input style`}
    />
  );
}
