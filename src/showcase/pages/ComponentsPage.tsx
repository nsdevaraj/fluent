import React, { useState } from "react";
import { Button, tokens } from "@fluentui/react-components";
import {
  People20Regular,
  Add20Regular,
  Search48Regular,
} from "@fluentui/react-icons";
import { ShowcaseSection } from "../ShowcaseSection";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { UserAvatar } from "../../components/ui/UserAvatar";
import { DataCard } from "../../components/ui/DataCard";
import { EmptyState } from "../../components/ui/EmptyState";
import { PageHeader } from "../../components/ui/PageHeader";
import { SearchInput } from "../../components/ui/SearchInput";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { TextField } from "../../components/ui/TextField";

export function ComponentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [tfName, setTfName] = useState("");
  const [tfEmail, setTfEmail] = useState("");

  return (
    <>
      <ShowcaseSection
        title="StatusBadge"
        description="Drop-in status indicator — 8 statuses, correct colors & icons wired up."
        preview={
          <div style={{ display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalS }}>
            <StatusBadge status="completed" />
            <StatusBadge status="in-progress" />
            <StatusBadge status="blocked" />
            <StatusBadge status="pending" />
            <StatusBadge status="paused" />
            <StatusBadge status="warning" />
            <StatusBadge status="draft" />
            <StatusBadge status="cancelled" />
          </div>
        }
        code={`import { StatusBadge } from "./components/ui/StatusBadge";

// Statuses: completed | in-progress | blocked | pending | paused | warning | draft | cancelled
<StatusBadge status="completed" />
<StatusBadge status="in-progress" />
<StatusBadge status="blocked" />

// Override label
<StatusBadge status="in-progress" label="Deploying" />`}
      />

      <ShowcaseSection
        title="UserAvatar"
        description="Avatar with optional presence badge — wraps Avatar + PresenceBadge correctly."
        preview={
          <div style={{ display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalL, alignItems: "center" }}>
            <UserAvatar name="Alice M." size={40} />
            <UserAvatar name="Bob K." size={40} presence="available" />
            <UserAvatar name="Carol S." size={40} presence="busy" />
            <UserAvatar name="David L." size={40} presence="away" />
            <UserAvatar name="Eva R." size={40} presence="offline" />
            <UserAvatar name="Frank B." size={56} presence="available" />
          </div>
        }
        code={`import { UserAvatar } from "./components/ui/UserAvatar";

<UserAvatar name="Alice M." size={40} />
<UserAvatar name="Bob K." size={40} presence="available" />
<UserAvatar name="Carol S." size={40} presence="busy" />

// With image
<UserAvatar name="Alice" size={40} imageUrl="https://..." />

// presence: available | busy | away | offline | do-not-disturb | out-of-office`}
      />

      <ShowcaseSection
        title="DataCard"
        description="Metric card with icon, trend indicator, and value. For dashboards and stat rows."
        preview={
          <div style={{ display: "flex", flexWrap: "wrap", gap: tokens.spacingHorizontalM }}>
            <DataCard label="Total Users" value="1,284" trend="+12%" trendUp icon={<People20Regular />} />
            <DataCard label="Active Projects" value="48" trend="-3%" trendUp={false} icon={<Add20Regular />} />
            <DataCard label="Completed" value="312" description="This quarter" />
          </div>
        }
        code={`import { DataCard } from "./components/ui/DataCard";
import { People20Regular } from "@fluentui/react-icons";

<DataCard
  label="Total Users"
  value="1,284"
  trend="+12%"
  trendUp
  icon={<People20Regular />}
/>

<DataCard
  label="Active Projects"
  value="48"
  trend="-3%"
  trendUp={false}
/>`}
      />

      <ShowcaseSection
        title="EmptyState"
        description="Zero-data placeholder with icon, message, and optional CTA."
        preview={
          <EmptyState
            icon={<Search48Regular />}
            title="No results found"
            description="Try adjusting your search or filters to find what you're looking for."
            action={<Button appearance="primary">Clear filters</Button>}
          />
        }
        code={`import { EmptyState } from "./components/ui/EmptyState";
import { Search48Regular } from "@fluentui/react-icons";

<EmptyState
  icon={<Search48Regular />}
  title="No results found"
  description="Try adjusting your search or filters."
  action={<Button appearance="primary">Clear filters</Button>}
/>`}
      />

      <ShowcaseSection
        title="PageHeader"
        description="Page title with optional breadcrumbs and action buttons."
        preview={
          <PageHeader
            title="Projects"
            description="Manage your team's projects and tasks."
            breadcrumbs={["Home", "Work", "Projects"]}
            actions={<Button appearance="primary" icon={<Add20Regular />}>New Project</Button>}
          />
        }
        code={`import { PageHeader } from "./components/ui/PageHeader";
import { Add20Regular } from "@fluentui/react-icons";

<PageHeader
  title="Projects"
  description="Manage your team's projects and tasks."
  breadcrumbs={["Home", "Work", "Projects"]}
  actions={
    <Button appearance="primary" icon={<Add20Regular />}>New Project</Button>
  }
/>`}
      />

      <ShowcaseSection
        title="SearchInput"
        description="Search input with debounce and clear button. Drop-in, no boilerplate needed."
        preview={
          <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS, width: "100%" }}>
            <SearchInput
              onSearch={setSearchResult}
              placeholder="Search projects..."
            />
            {searchResult && (
              <div style={{ color: tokens.colorNeutralForeground3, fontSize: tokens.fontSizeBase200 }}>
                Searching for: <strong>{searchResult}</strong>
              </div>
            )}
          </div>
        }
        code={`import { SearchInput } from "./components/ui/SearchInput";

const [query, setQuery] = useState("");

<SearchInput
  onSearch={setQuery}
  placeholder="Search projects..."
  debounceMs={300}   // default: 300ms; set 0 to disable
/>`}
      />

      <ShowcaseSection
        title="ConfirmDialog"
        description="Controlled confirm/delete dialog. Pass open state from parent."
        preview={
          <div>
            <Button appearance="primary" onClick={() => setDialogOpen(true)}>
              Open Confirm Dialog
            </Button>
            <ConfirmDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              title="Delete project?"
              description="This action cannot be undone. All tasks and files will be permanently removed."
              confirmLabel="Delete"
              onConfirm={() => alert("Confirmed!")}
            />
          </div>
        }
        code={`import { ConfirmDialog } from "./components/ui/ConfirmDialog";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Delete</Button>

<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Delete project?"
  description="This action cannot be undone."
  confirmLabel="Delete"
  onConfirm={() => handleDelete()}
/>`}
      />

      <ShowcaseSection
        title="TextField"
        description="Field + Input composed correctly — label, hint, validation, icons, all variants."
        preview={
          <div style={{ display: "flex", gap: tokens.spacingHorizontalXXL, alignItems: "flex-start" }}>
            <TextField
              label="Small input"
              value={tfName}
              onChange={(_, d) => setTfName(d.value)}
              size="small"
              placeholder="Enter text..."
            />
            <TextField
              label="Medium input"
              value={tfEmail}
              onChange={(_, d) => setTfEmail(d.value)}
              size="medium"
              placeholder="Enter text..."
            />
          </div>
        }
        code={`import { TextField } from "./components/ui/TextField";

const [value, setValue] = useState("");

// onChange signature: (event, data: { value: string }) => void
<TextField label="Small input" value={value} onChange={(_, d) => setValue(d.value)} size="small" />

// Medium (default)
<TextField label="Medium input" value={value} onChange={(_, d) => setValue(d.value)} size="medium" />

// Only "small" and "medium" are supported — large is not used`}
      />
    </>
  );
}
