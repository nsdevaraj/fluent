import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { makeStyles, tokens, shorthands } from "@fluentui/react-components";
import {
  ArrowLeft16Regular,
  ArrowRight16Regular,
} from "@fluentui/react-icons";
import { Body, Caption } from "../../../components/ui/Typography";
import { Tag } from "../../../components/ui/Tag";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { Divider } from "../../../components/ui/Divider";
import { DataTable } from "../../../components/ui/DataTable";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Tabs } from "../../../components/ui/Tabs";
import { Button } from "../../../components/ui/Button";
import { COMPONENTS } from "../../data/componentManifest";
import { COMPONENT_DEMOS } from "./componentDemos";

// ─── Styles ───────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    maxWidth: "960px",
  },

  // ── Header (above tabs) ─────────────────────────────────────────────────────
  header: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  pageTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase600,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },

  // ── Tab content areas ───────────────────────────────────────────────────────
  overviewLayout: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXL,
  },

  // Demo stage
  demoSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  sectionLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  demoStage: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    minHeight: "120px",
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalM,
    alignItems: "flex-start",
  },
  demoEmpty: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: "80px",
  },

  // Import / code blocks
  importSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  codeBlock: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    fontFamily: "'SF Mono', 'Consolas', monospace",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    overflowX: "auto",
    margin: 0,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorNeutralForeground1,
  },
  codeComment: {
    color: tokens.colorNeutralForeground3,
  },

  // Props section
  propsSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  propsTable: {
    overflowX: "auto",
  },

  // ── Prev / Next bar ─────────────────────────────────────────────────────────
  navBar: {
    display: "flex",
    alignItems: "stretch",
    gap: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalXXL,
    paddingTop: tokens.spacingVerticalL,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  navCard: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    backgroundColor: tokens.colorNeutralBackground1,
    transitionProperty: "background-color, border-color, box-shadow",
    transitionDuration: tokens.durationFaster,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      ...shorthands.borderColor(tokens.colorBrandStroke1),
      boxShadow: tokens.shadow4,
    },
  },
  navCardRight: {
    alignItems: "flex-end",
    textAlign: "right",
  },
  navCardSpacer: { flex: 1 },
  navLabel: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  navName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
});

// ─── Props table ──────────────────────────────────────────────────────────────

type PropRow = { id: string; name: string; type: string; default?: string; description: string };

const PROP_COLUMNS = [
  {
    columnId: "name",
    label: "Prop",
    renderCell: (row: PropRow) => (
      <code style={{ fontSize: "12px", fontFamily: "'SF Mono', monospace", color: tokens.colorBrandForeground1 }}>
        {row.name}
      </code>
    ),
    sortable: false,
  },
  {
    columnId: "type",
    label: "Type",
    renderCell: (row: PropRow) => (
      <code style={{ fontSize: "11px", fontFamily: "'SF Mono', monospace", color: tokens.colorNeutralForeground2 }}>
        {row.type}
      </code>
    ),
    sortable: false,
  },
  {
    columnId: "default",
    label: "Default",
    renderCell: (row: PropRow) =>
      row.default ? (
        <code style={{ fontSize: "11px" }}>{row.default}</code>
      ) : (
        <Caption color="subtle">—</Caption>
      ),
    sortable: false,
  },
  {
    columnId: "description",
    label: "Description",
    renderCell: (row: PropRow) => <Caption>{row.description}</Caption>,
    sortable: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ComponentDetail() {
  const { componentId } = useParams<{ componentId: string }>();
  const navigate = useNavigate();
  const styles = useStyles();

  const component = COMPONENTS.find((c) => c.id === componentId);

  if (!component) {
    return (
      <EmptyState
        title="Component not found"
        description={`No component with ID "${componentId}" exists.`}
        action={
          <Button appearance="primary" onClick={() => navigate("/components")}>
            All Components
          </Button>
        }
      />
    );
  }

  const siblingComponents = COMPONENTS.filter((c) => c.category === component.category);
  const siblingIndex = siblingComponents.findIndex((c) => c.id === componentId);
  const prevComp = siblingIndex > 0 ? siblingComponents[siblingIndex - 1] : null;
  const nextComp = siblingIndex < siblingComponents.length - 1 ? siblingComponents[siblingIndex + 1] : null;

  const propsData: PropRow[] = component.props.map((p, i) => ({ id: String(i), ...p }));
  const importSnippet = `import { ${component.name} } from "@lumel/fluent2-ds";`;

  const usageSnippet = `import { FluentProvider } from "@fluentui/react-components";
import { lightTheme, ${component.name} } from "@lumel/fluent2-ds";

function Example() {
  return (
    <FluentProvider theme={lightTheme}>
      <${component.name}${component.props.slice(0, 2).map((p) => `\n        ${p.name}={/* ${p.type} */}`).join("")}
      />
    </FluentProvider>
  );
}`;

  const TABS = [
    { value: "overview", label: "Overview" },
    { value: "props", label: `Props (${component.props.length})` },
    { value: "code", label: "Code" },
  ];

  const demoContent = COMPONENT_DEMOS[component.id];

  const PANELS = {
    overview: (
      <div className={styles.overviewLayout}>
        {/* Live demo */}
        <div className={styles.demoSection}>
          <span className={styles.sectionLabel}>Live demo</span>
          <div className={styles.demoStage} aria-label={`${component.name} live demo`}>
            {demoContent ?? (
              <div className={styles.demoEmpty}>
                <Caption color="subtle">No demo available for this component.</Caption>
              </div>
            )}
          </div>
        </div>

        {/* Import snippet */}
        <div className={styles.importSection}>
          <span className={styles.sectionLabel}>Import</span>
          <pre className={styles.codeBlock}>{importSnippet}</pre>
        </div>
      </div>
    ),

    props: (
      <div className={styles.propsSection}>
        <Caption color="subtle">{propsData.length} configurable props</Caption>
        <div className={styles.propsTable}>
          <DataTable
            columns={PROP_COLUMNS}
            items={propsData}
            emptyMessage="No props defined for this component."
          />
        </div>
      </div>
    ),

    code: (
      <div className={styles.propsSection}>
        <span className={styles.sectionLabel}>Installation</span>
        <pre className={styles.codeBlock}>npm install @lumel/fluent2-ds</pre>
        <span className={styles.sectionLabel}>Usage</span>
        <pre className={styles.codeBlock}>{usageSnippet}</pre>
        <span className={styles.sectionLabel}>TypeScript</span>
        <pre className={styles.codeBlock}>{`import type { ${component.name}Props } from "@lumel/fluent2-ds";`}</pre>
      </div>
    ),
  };

  return (
    <div className={styles.root}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.pageTitle}>{component.name}</h1>
          <StatusBadge status="completed" label={component.status} />
        </div>
        <div className={styles.metaRow}>
          <Tag appearance="filled" size="small">{component.category}</Tag>
          <Divider vertical />
          <Caption color="subtle">{component.props.length} props</Caption>
        </div>
        <Body color="subtle">{component.description}</Body>
      </div>

      {/* ── Tab content ── */}
      <Tabs tabs={TABS} panels={PANELS} defaultSelectedValue="overview" />

      {/* ── Prev / Next ── */}
      <div className={styles.navBar}>
        {prevComp ? (
          <div
            className={styles.navCard}
            onClick={() => navigate(`/components/${prevComp.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/components/${prevComp.id}`)}
            aria-label={`Previous: ${prevComp.name}`}
          >
            <span className={styles.navLabel}><ArrowLeft16Regular /> Previous</span>
            <span className={styles.navName}>{prevComp.name}</span>
            <Caption color="subtle">{prevComp.category}</Caption>
          </div>
        ) : (
          <div className={styles.navCardSpacer} />
        )}

        {nextComp ? (
          <div
            className={`${styles.navCard} ${styles.navCardRight}`}
            onClick={() => navigate(`/components/${nextComp.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/components/${nextComp.id}`)}
            aria-label={`Next: ${nextComp.name}`}
          >
            <span className={styles.navLabel}>Next <ArrowRight16Regular /></span>
            <span className={styles.navName}>{nextComp.name}</span>
            <Caption color="subtle">{nextComp.category}</Caption>
          </div>
        ) : (
          <div className={styles.navCardSpacer} />
        )}
      </div>
    </div>
  );
}
