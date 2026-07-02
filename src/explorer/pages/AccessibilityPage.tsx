import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { Accessibility20Regular, Keyboard20Regular, Eye20Regular, Speaker0Regular, CheckmarkCircle20Regular } from "@fluentui/react-icons";
import { PageHeader } from "../../components/ui/PageHeader";
import { DataCard } from "../../components/ui/DataCard";
import { Card } from "../../components/ui/Card";
import { Heading, Body, Caption } from "../../components/ui/Typography";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Tag } from "../../components/ui/Tag";
import { Divider } from "../../components/ui/Divider";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Accordion } from "../../components/ui/Accordion";
import { MessageBar } from "../../components/ui/MessageBar";
import { DataTable } from "../../components/ui/DataTable";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXL, maxWidth: "1000px" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 800px)": { gridTemplateColumns: "repeat(2, 1fr)" },
  },
  section: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL },
  pillarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 600px)": { gridTemplateColumns: "1fr" },
  },
  pillarCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
  },
  pillarIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: "24px",
    display: "flex",
    marginBottom: tokens.spacingVerticalXS,
  },
});

const TEST_RESULTS = [
  { id: "btn", component: "Button", violations: 0, impact: "—", passes: 18, status: "completed" },
  { id: "tf", component: "TextField", violations: 0, impact: "—", passes: 14, status: "completed" },
  { id: "dt", component: "DataTable", violations: 0, impact: "—", passes: 22, status: "completed" },
  { id: "snav", component: "SideNav", violations: 0, impact: "—", passes: 11, status: "completed" },
  { id: "dlg", component: "ConfirmDialog", violations: 0, impact: "—", passes: 9, status: "completed" },
  { id: "sel", component: "Select", violations: 0, impact: "—", passes: 8, status: "completed" },
  { id: "cb", component: "Checkbox", violations: 0, impact: "—", passes: 7, status: "completed" },
  { id: "msg", component: "MessageBar", violations: 0, impact: "—", passes: 6, status: "completed" },
];

const TEST_COLUMNS = [
  { columnId: "component", label: "Component", renderCell: (r: typeof TEST_RESULTS[0]) => <Body size="sm">{r.component}</Body>, sortable: true },
  { columnId: "violations", label: "Violations", renderCell: (r: typeof TEST_RESULTS[0]) => <Caption>{r.violations}</Caption>, sortable: true },
  { columnId: "impact", label: "Impact", renderCell: (r: typeof TEST_RESULTS[0]) => <Caption color="subtle">{r.impact}</Caption>, sortable: false },
  { columnId: "passes", label: "Passes", renderCell: (r: typeof TEST_RESULTS[0]) => <Caption>{r.passes}</Caption>, sortable: true },
  { columnId: "status", label: "Status", renderCell: (r: typeof TEST_RESULTS[0]) => <StatusBadge status={r.status as any} size="small" />, sortable: false },
];

const KEYBOARD_SHORTCUTS = [
  { value: "nav", header: "Global navigation", content: (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {[["Tab", "Move focus to next interactive element"], ["Shift + Tab", "Move focus to previous element"], ["Enter / Space", "Activate focused button or link"], ["Escape", "Close overlays, menus, dialogs"]].map(([key, desc]) => (
        <div key={key} style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Tag appearance="outline" size="small">{key}</Tag>
          <Caption>{desc}</Caption>
        </div>
      ))}
    </div>
  )},
  { value: "nav2", header: "SideNav", content: (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {[["Enter", "Expand/collapse group or activate item"], ["Arrow Up/Down", "Move between nav items"], ["Home/End", "First/last item in group"]].map(([key, desc]) => (
        <div key={key} style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Tag appearance="outline" size="small">{key}</Tag>
          <Caption>{desc}</Caption>
        </div>
      ))}
    </div>
  )},
  { value: "table", header: "DataTable", content: (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {[["Space", "Toggle row selection"], ["Shift + Click", "Range select rows"], ["Arrow keys", "Move between cells (composite focus mode)"]].map(([key, desc]) => (
        <div key={key} style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Tag appearance="outline" size="small">{key}</Tag>
          <Caption>{desc}</Caption>
        </div>
      ))}
    </div>
  )},
];

export function AccessibilityPage() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <PageHeader
        title="Accessibility"
        description="WCAG 2.1 AA compliance report, keyboard navigation reference, and axe test results for all 37 components."
        breadcrumbs={["Design System", "Accessibility"]}
      />

      <MessageBar intent="success" title="WCAG 2.1 AA — All clear">
        0 critical violations detected across 37 components. 211 axe tests passing.
      </MessageBar>

      <div className={styles.statsGrid}>
        <DataCard label="axe Tests" value="211" trend="All passing" trendUp icon={<CheckmarkCircle20Regular />} />
        <DataCard label="Violations" value="0" trend="Critical + Serious" trendUp icon={<Accessibility20Regular />} />
        <DataCard label="WCAG Level" value="AA" trend="WCAG 2.1" trendUp icon={<Eye20Regular />} />
        <DataCard label="RTL Support" value="100%" trend="Logical CSS" trendUp icon={<Accessibility20Regular />} />
      </div>

      <div className={styles.section}>
        <Heading level={2}>Accessibility Pillars</Heading>
        <div className={styles.pillarGrid}>
          {[
            { icon: <Keyboard20Regular />, title: "Keyboard Navigation", body: "All interactive elements are reachable by Tab/Shift+Tab. Enter and Space activate buttons. Escape closes overlays. Arrow keys navigate menus and tables.", score: 1 },
            { icon: <Eye20Regular />, title: "Color Contrast", body: "All text/background combinations meet WCAG 2.1 AA (4.5:1 for body text, 3:1 for large text). Dark theme includes an explicit foreground override for compliance.", score: 1 },
            { icon: <Speaker0Regular />, title: "Screen Reader Support", body: "Fluent UI primitives include ARIA roles, labels, and live regions. All form inputs have associated labels. Interactive elements have aria-label where needed.", score: 0.95 },
            { icon: <Accessibility20Regular />, title: "RTL Layout", body: "All spacing, padding, and positioning uses logical CSS properties (marginInlineStart, insetInlineEnd, etc.). FluentProvider dir=\"rtl\" flips the entire layout automatically.", score: 1 },
          ].map(({ icon, title, body, score }) => (
            <Card key={title}>
              <div className={styles.pillarCard}>
                <span className={styles.pillarIcon} aria-hidden="true">{icon}</span>
                <Heading level={4}>{title}</Heading>
                <Body size="sm" color="subtle">{body}</Body>
                <ProgressBar label={`${Math.round(score * 100)}% compliant`} value={score} color={score === 1 ? "success" : "brand"} />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Divider />

      <div className={styles.section}>
        <Heading level={2}>Keyboard Shortcuts Reference</Heading>
        <Accordion items={KEYBOARD_SHORTCUTS} multiple />
      </div>

      <Divider />

      <div className={styles.section}>
        <Heading level={2}>axe Test Results</Heading>
        <Body size="sm" color="subtle">Showing 8 of 37 components. All components pass with 0 critical or serious violations.</Body>
        <DataTable
          columns={TEST_COLUMNS}
          items={TEST_RESULTS}
          defaultSortColumn="component"
          defaultSortDirection="ascending"
        />
      </div>
    </div>
  );
}
