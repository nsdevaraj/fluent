import React, { useState } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { DataArea20Regular, Settings20Regular, TableSimple20Regular, Person20Regular } from "@fluentui/react-icons";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Tabs } from "../../../components/ui/Tabs";
import { DataCard } from "../../../components/ui/DataCard";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Heading, Body, Caption } from "../../../components/ui/Typography";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { DataTable } from "../../../components/ui/DataTable";
import { TextField } from "../../../components/ui/TextField";
import { Switch } from "../../../components/ui/Switch";
import { Select } from "../../../components/ui/Select";
import { Divider } from "../../../components/ui/Divider";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import { Tag } from "../../../components/ui/Tag";
import { MessageBar } from "../../../components/ui/MessageBar";
import { Persona } from "../../../components/ui/Persona";
import { Accordion } from "../../../components/ui/Accordion";
import { Spinner } from "../../../components/ui/Spinner";
import {
  People20Regular, AppsListDetail20Regular, CheckmarkCircle20Regular,
  ArrowTrending20Regular, Star20Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXL, maxWidth: "1100px" },
  section: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL },
  templateWrap: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusXLarge,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 800px)": { gridTemplateColumns: "repeat(2, 1fr)" },
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 700px)": { gridTemplateColumns: "1fr" },
  },
  settingsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 700px)": { gridTemplateColumns: "1fr" },
  },
  settingsSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
  },
  profileCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
    alignItems: "center",
    textAlign: "center",
  },
  activityItem: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    alignItems: "flex-start",
    padding: `${tokens.spacingVerticalS} 0`,
  },
});

// ── Dashboard template ────────────────────────────────────────────────────────
const COMPONENT_ITEMS = [
  { id: 1, name: "Button", category: "Action", tests: 24, status: "completed" },
  { id: 2, name: "TextField", category: "Form Inputs", tests: 18, status: "completed" },
  { id: 3, name: "DataTable", category: "Data Display", tests: 32, status: "completed" },
  { id: 4, name: "SideNav", category: "Navigation", tests: 12, status: "completed" },
  { id: 5, name: "StatusBadge", category: "Feedback", tests: 8, status: "completed" },
];

function DashboardTemplate() {
  const styles = useStyles();
  return (
    <div className={styles.templateWrap}>
      <PageHeader
        title="Design System Dashboard"
        description="Component library health overview for @lumel/fluent2-ds v0.1.0-alpha.1"
        actions={
          <div style={{ display: "flex", gap: "8px" }}>
            <Button appearance="subtle" size="small">Export</Button>
            <Button appearance="primary" size="small">Publish</Button>
          </div>
        }
      />
      <div className={styles.statsGrid}>
        <DataCard label="Components" value="37" trend="+0 this sprint" trendUp icon={<AppsListDetail20Regular />} />
        <DataCard label="Unit Tests" value="211" trend="100% passing" trendUp icon={<CheckmarkCircle20Regular />} />
        <DataCard label="Contributors" value="4" trend="+1 this month" trendUp icon={<People20Regular />} />
        <DataCard label="Audit Score" value="100/100" trend="GO for release" trendUp icon={<Star20Regular />} />
      </div>
      <div className={styles.contentGrid}>
        <div>
          <Heading level={4}>Component Status</Heading>
          <DataTable
            columns={[
              { columnId: "name", label: "Component", renderCell: (r: typeof COMPONENT_ITEMS[0]) => <Body size="sm">{r.name}</Body>, sortable: true },
              { columnId: "category", label: "Category", renderCell: (r: typeof COMPONENT_ITEMS[0]) => <Tag appearance="outline" size="extra-small">{r.category}</Tag>, sortable: true },
              { columnId: "tests", label: "Tests", renderCell: (r: typeof COMPONENT_ITEMS[0]) => <Caption>{r.tests}</Caption>, sortable: true },
              { columnId: "status", label: "Status", renderCell: (r: typeof COMPONENT_ITEMS[0]) => <StatusBadge status={r.status as any} size="small" />, sortable: false },
            ]}
            items={COMPONENT_ITEMS}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Heading level={4}>Build Health</Heading>
          <ProgressBar label="TypeScript" value={1} color="success" />
          <ProgressBar label="Tests" value={1} color="success" />
          <ProgressBar label="Token audit" value={1} color="success" />
          <ProgressBar label="RTL audit" value={1} color="success" />
          <ProgressBar label="Accessibility" value={0.95} color="brand" />
        </div>
      </div>
    </div>
  );
}

// ── Settings template ─────────────────────────────────────────────────────────
function SettingsTemplate() {
  const styles = useStyles();
  const [saved, setSaved] = useState(false);

  const SETTINGS_ITEMS = [
    {
      value: "appearance",
      header: "Appearance",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Switch label="Enable dark mode" />
          <Switch label="Compact navigation" />
          <Select label="Default language" options={[{ value: "en", label: "English" }, { value: "ar", label: "Arabic (RTL)" }, { value: "fr", label: "French" }]} />
        </div>
      ),
    },
    {
      value: "notifications",
      header: "Notifications",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Switch label="Email notifications" defaultChecked />
          <Switch label="Release announcements" defaultChecked />
          <Switch label="Component update alerts" />
        </div>
      ),
    },
    {
      value: "account",
      header: "Account",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextField label="Display name" defaultValue="Muralidharane" />
          <TextField label="Email" defaultValue="muralidharane@lumel.com" />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.templateWrap}>
      <PageHeader
        title="Settings"
        description="Manage your preferences and account settings."
        breadcrumbs={["Dashboard", "Settings"]}
        actions={<Button appearance="primary" size="small" onClick={() => setSaved(true)}>Save changes</Button>}
      />
      {saved && (
        <MessageBar intent="success" title="Settings saved" dismissible onDismiss={() => setSaved(false)}>
          Your preferences have been updated.
        </MessageBar>
      )}
      <Accordion items={SETTINGS_ITEMS} multiple />
    </div>
  );
}

// ── Profile template ──────────────────────────────────────────────────────────
function ProfileTemplate() {
  const styles = useStyles();
  const activities = [
    { action: "Published", target: "@lumel/fluent2-ds v0.1.0-alpha.1", time: "2 hours ago", status: "completed" as const },
    { action: "Resolved", target: "DataTable innerRef TS error", time: "4 hours ago", status: "completed" as const },
    { action: "Completed", target: "Final design system audit (100/100)", time: "Yesterday", status: "completed" as const },
    { action: "Started", target: "DS Explorer application", time: "Today", status: "in-progress" as const },
  ];

  return (
    <div className={styles.templateWrap}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" }}>
        <Card>
          <div className={styles.profileCard}>
            <Persona name="Muralidharane" secondaryText="Design System Lead" presence="available" size="huge" />
            <Divider />
            <Caption color="subtle">muralidharane@lumel.com</Caption>
            <Tag appearance="brand">Admin</Tag>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button appearance="primary" size="small">Edit profile</Button>
              <Button appearance="subtle" size="small">Share</Button>
            </div>
          </div>
        </Card>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Heading level={4}>Recent Activity</Heading>
          {activities.map((a, i) => (
            <div key={i} className={styles.activityItem}>
              <StatusBadge status={a.status} size="small" />
              <div>
                <Body size="sm">{a.action} <strong>{a.target}</strong></Body>
                <Caption color="subtle">{a.time}</Caption>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Templates page ───────────────────────────────────────────────────────────
export function TemplatesPage() {
  const styles = useStyles();

  const TABS = [
    { value: "dashboard", label: "Dashboard", icon: <DataArea20Regular /> },
    { value: "settings", label: "Settings", icon: <Settings20Regular /> },
    { value: "profile", label: "Profile", icon: <Person20Regular /> },
  ];

  const PANELS = {
    dashboard: (
      <div className={styles.section}>
        <div>
          <Heading level={3}>Dashboard Template</Heading>
          <Body size="sm" color="subtle">Full dashboard using DataCard, DataTable, ProgressBar, PageHeader, and Button.</Body>
        </div>
        <DashboardTemplate />
      </div>
    ),
    settings: (
      <div className={styles.section}>
        <div>
          <Heading level={3}>Settings Template</Heading>
          <Body size="sm" color="subtle">Settings page using Accordion, Switch, Select, TextField, MessageBar, and PageHeader.</Body>
        </div>
        <SettingsTemplate />
      </div>
    ),
    profile: (
      <div className={styles.section}>
        <div>
          <Heading level={3}>Profile Template</Heading>
          <Body size="sm" color="subtle">User profile page using Persona, Tag, StatusBadge, Card, and Divider.</Body>
        </div>
        <ProfileTemplate />
      </div>
    ),
  };

  return (
    <div className={styles.root}>
      <PageHeader
        title="Templates"
        description="Full-page templates assembled from design system components — ready to adapt for your product."
        breadcrumbs={["Design System", "Templates"]}
      />
      <Tabs tabs={TABS} panels={PANELS} defaultSelectedValue="dashboard" />
    </div>
  );
}
