import React, { useState } from "react";
import { makeStyles, tokens, Text, Badge } from "@fluentui/react-components";
import { CodeBlock } from "./CodeBlock";

const useStyles = makeStyles({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalXXL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    "&:last-child": { borderBottom: "none" },
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  description: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
  },
  tabs: {
    display: "flex",
    gap: "2px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  tab: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    cursor: "pointer",
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    borderBottom: "2px solid transparent",
    marginBottom: "-1px",
    "&:hover": { color: tokens.colorNeutralForeground1 },
  },
  tabActive: {
    color: tokens.colorBrandForeground1,
    borderBottom: `2px solid ${tokens.colorBrandBackground}`,
    fontWeight: tokens.fontWeightSemibold,
  },
  preview: {
    padding: tokens.spacingVerticalXL,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalM,
    alignItems: "center",
    minHeight: "80px",
  },
});

interface ShowcaseSectionProps {
  title: string;
  description?: string;
  status?: "stable" | "beta" | "new";
  preview: React.ReactNode;
  code: string;
}

export function ShowcaseSection({ title, description, status, preview, code }: ShowcaseSectionProps) {
  const styles = useStyles();
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <Text weight="semibold" size={400}>{title}</Text>
        {status === "new" && <Badge appearance="filled" color="success" size="small">New</Badge>}
        {status === "beta" && <Badge appearance="filled" color="warning" size="small">Beta</Badge>}
      </div>
      {description && <div className={styles.description}>{description}</div>}

      <div className={styles.tabs}>
        {(["preview", "code"] as const).map(t => (
          <div
            key={t}
            className={`${styles.tab} ${tab === t ? styles.tabActive : ""}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </div>
        ))}
      </div>

      {tab === "preview" ? (
        <div className={styles.preview}>{preview}</div>
      ) : (
        <CodeBlock code={code} />
      )}
    </div>
  );
}
