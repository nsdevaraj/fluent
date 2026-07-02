import React from "react";
import {
  Title1, Title2, Title3,
  Subtitle1, Subtitle2,
  Body1, Body1Strong, Body1Stronger,
  Body2,
  Caption1, Caption1Strong,
  Caption2,
  Display, LargeTitle,
  makeStyles, tokens,
} from "@fluentui/react-components";
import { ShowcaseSection } from "../ShowcaseSection";

const useStyles = makeStyles({
  stack: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM, width: "100%" },
  row: { display: "flex", alignItems: "baseline", gap: tokens.spacingHorizontalXXL, width: "100%" },
  label: { color: tokens.colorNeutralForeground3, fontSize: tokens.fontSizeBase100, minWidth: "120px", fontFamily: "monospace" },
});

export function TypographyPage() {
  const styles = useStyles();

  return (
    <>
      <ShowcaseSection
        title="Type Ramp — Display to Caption"
        description="Fluent's full type hierarchy. Use semantic components — not raw Text size — for headings."
        preview={
          <div className={styles.stack}>
            {[
              { comp: <Display>Display</Display>, name: "Display" },
              { comp: <LargeTitle>Large Title</LargeTitle>, name: "LargeTitle" },
              { comp: <Title1>Title 1</Title1>, name: "Title1" },
              { comp: <Title2>Title 2</Title2>, name: "Title2" },
              { comp: <Title3>Title 3</Title3>, name: "Title3" },
              { comp: <Subtitle1>Subtitle 1</Subtitle1>, name: "Subtitle1" },
              { comp: <Subtitle2>Subtitle 2</Subtitle2>, name: "Subtitle2" },
              { comp: <Body1>Body 1 — default body text for content</Body1>, name: "Body1" },
              { comp: <Body2>Body 2 — slightly smaller body text</Body2>, name: "Body2" },
              { comp: <Caption1>Caption 1 — metadata, timestamps</Caption1>, name: "Caption1" },
              { comp: <Caption2>Caption 2 — smallest label text</Caption2>, name: "Caption2" },
            ].map(({ comp, name }) => (
              <div key={name} className={styles.row}>
                <span className={styles.label}>{name}</span>
                {comp}
              </div>
            ))}
          </div>
        }
        code={`import {
  Display, LargeTitle,
  Title1, Title2, Title3,
  Subtitle1, Subtitle2,
  Body1, Body2,
  Caption1, Caption2,
} from "@fluentui/react-components";

// Page hero
<Display>Dashboard</Display>

// Page titles
<Title1>Projects</Title1>
<Title2>Recent Activity</Title2>
<Title3>This Week</Title3>

// Body
<Body1>Default body text for paragraphs.</Body1>
<Body2>Slightly smaller body text.</Body2>

// Labels, timestamps
<Caption1>Jun 9, 2026</Caption1>`}
      />

      <ShowcaseSection
        title="Text — Weight Variants"
        description="Regular, semibold, bold — available on most type components."
        preview={
          <div className={styles.stack}>
            <div className={styles.row}>
              <span className={styles.label}>Body1</span>
              <Body1>Regular weight</Body1>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Body1Strong</span>
              <Body1Strong>Semibold weight</Body1Strong>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Body1Stronger</span>
              <Body1Stronger>Bold weight</Body1Stronger>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Caption1</span>
              <Caption1>Regular caption</Caption1>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Caption1Strong</span>
              <Caption1Strong>Strong caption</Caption1Strong>
            </div>
          </div>
        }
        code={`import { Body1, Body1Strong, Body1Stronger, Caption1, Caption1Strong } from "@fluentui/react-components";

<Body1>Regular</Body1>
<Body1Strong>Semibold</Body1Strong>
<Body1Stronger>Bold</Body1Stronger>

<Caption1>Regular caption</Caption1>
<Caption1Strong>Semibold caption</Caption1Strong>`}
      />

      <ShowcaseSection
        title="Text — Color Variants"
        description="Use token-based colors for consistent semantic meaning."
        preview={
          <div className={styles.stack}>
            {[
              { color: tokens.colorNeutralForeground1, label: "Foreground1", text: "Primary text — main content" },
              { color: tokens.colorNeutralForeground2, label: "Foreground2", text: "Secondary text — supporting info" },
              { color: tokens.colorNeutralForeground3, label: "Foreground3", text: "Tertiary text — hints, placeholders" },
              { color: tokens.colorNeutralForeground4, label: "Foreground4", text: "Disabled text" },
              { color: tokens.colorBrandForeground1, label: "BrandForeground1", text: "Brand / link text" },
              { color: tokens.colorStatusDangerForeground1, label: "DangerForeground1", text: "Error messages" },
              { color: tokens.colorStatusSuccessForeground1, label: "SuccessForeground1", text: "Success messages" },
              { color: tokens.colorStatusWarningForeground1, label: "WarningForeground1", text: "Warning messages" },
            ].map(({ color, label, text }) => (
              <div key={label} className={styles.row}>
                <span className={styles.label}>{label}</span>
                <Body1 style={{ color }}>{text}</Body1>
              </div>
            ))}
          </div>
        }
        code={`import { Body1, tokens } from "@fluentui/react-components";

// Never hardcode colors — use tokens
<Body1 style={{ color: tokens.colorNeutralForeground1 }}>Primary text</Body1>
<Body1 style={{ color: tokens.colorNeutralForeground2 }}>Secondary text</Body1>
<Body1 style={{ color: tokens.colorNeutralForeground3 }}>Hint text</Body1>
<Body1 style={{ color: tokens.colorBrandForeground1 }}>Link text</Body1>
<Body1 style={{ color: tokens.colorStatusDangerForeground1 }}>Error</Body1>
<Body1 style={{ color: tokens.colorStatusSuccessForeground1 }}>Success</Body1>`}
      />

      <ShowcaseSection
        title="Text — as prop (block vs inline)"
        description="Use the as prop to render the correct HTML element."
        preview={
          <div className={styles.stack}>
            <Body1 as="p">Paragraph element with Body1 styling.</Body1>
            <Title2 as="h2">H2 heading with Title2 styling</Title2>
            <Caption1 as="span">Inline span with Caption1 styling</Caption1>
            <Body1 block>Block-level Body1 (takes full width)</Body1>
          </div>
        }
        code={`// Use "as" to control HTML element — keeps semantics correct
<Title1 as="h1">Page Title</Title1>
<Title2 as="h2">Section Heading</Title2>
<Body1 as="p">Paragraph text</Body1>
<Caption1 as="span">Inline label</Caption1>

// "block" makes inline text take full width
<Body1 block>Full width text</Body1>`}
      />
    </>
  );
}
