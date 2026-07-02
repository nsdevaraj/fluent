/**
 * Live interactive demos for every component in the Design System Explorer.
 */
import React, { useState } from "react";
import { tokens } from "@fluentui/react-components";
import {
  Add20Regular, Checkmark20Regular, Delete20Regular, Person20Regular,
  Settings20Regular, Star20Regular, Search20Regular, ArrowRight20Regular,
  DocumentText20Regular, Dismiss20Regular,
  TextBold20Regular, TextItalic20Regular, TextUnderline20Regular,
  AlignLeft20Regular, TextAlignCenter20Regular, AlignRight20Regular,
  Copy20Regular, Cut20Regular, Clipboard20Regular,
  Edit20Regular, Share20Regular, MoreHorizontal20Regular,
  ChevronRight20Regular, Folder20Regular,
  Alert20Regular,
} from "@fluentui/react-icons";

// ── Phase Next components ──────────────────────────────────────────────────────
import { Link } from "../../../components/ui/Link";
import { ToggleButton } from "../../../components/ui/ToggleButton";
import { CompoundButton } from "../../../components/ui/CompoundButton";
import { Menu } from "../../../components/ui/Menu";
import { MenuButton } from "../../../components/ui/MenuButton";
import { SplitButton } from "../../../components/ui/SplitButton";
import { Toolbar } from "../../../components/ui/Toolbar";
import { Dialog } from "../../../components/ui/Dialog";
import { Breadcrumb } from "../../../components/ui/Breadcrumb";
import { InfoLabel, InfoButton } from "../../../components/ui/InfoLabel";
import { SpinButton } from "../../../components/ui/SpinButton";
import { TagPicker } from "../../../components/ui/TagPicker";
import { CounterBadge } from "../../../components/ui/CounterBadge";
import { PresenceBadge } from "../../../components/ui/PresenceBadge";
import { AvatarGroup } from "../../../components/ui/AvatarGroup";
import { Rating, RatingDisplay } from "../../../components/ui/Rating";
import { Tree } from "../../../components/ui/Tree";
import { InteractionTag, InteractionTagGroup } from "../../../components/ui/InteractionTag";
import { Image } from "../../../components/ui/Image";
import { TeachingPopover } from "../../../components/ui/TeachingPopover";

import { Button } from "../../../components/ui/Button";
import { TextField } from "../../../components/ui/TextField";
import { Textarea } from "../../../components/ui/Textarea";
import { Select } from "../../../components/ui/Select";
import { Combobox } from "../../../components/ui/Combobox";
import { Checkbox } from "../../../components/ui/Checkbox";
import { RadioGroup } from "../../../components/ui/RadioGroup";
import { Switch } from "../../../components/ui/Switch";
import { Slider } from "../../../components/ui/Slider";
import { DatePicker } from "../../../components/ui/DatePicker";
import { TimePicker } from "../../../components/ui/TimePicker";
import { FileUpload } from "../../../components/ui/FileUpload";
import { SearchInput } from "../../../components/ui/SearchInput";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { Badge } from "../../../components/ui/Badge";
import { ProgressBar } from "../../../components/ui/ProgressBar";
import { MessageBar } from "../../../components/ui/MessageBar";
import { DSToaster, useToast } from "../../../components/ui/Toast";
import { Spinner } from "../../../components/ui/Spinner";
import { SkeletonText, SkeletonCard } from "../../../components/ui/Skeleton";
import { SideNav } from "../../../components/ui/SideNav";
import { Tabs } from "../../../components/ui/Tabs";
import { Accordion } from "../../../components/ui/Accordion";
import { Stepper } from "../../../components/ui/Stepper";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Drawer } from "../../../components/ui/Drawer";
import { Popover } from "../../../components/ui/Popover";
import { Tooltip } from "../../../components/ui/Tooltip";
import { ConfirmDialog } from "../../../components/ui/ConfirmDialog";
import { DataTable } from "../../../components/ui/DataTable";
import { DataCard } from "../../../components/ui/DataCard";
import { Card } from "../../../components/ui/Card";
import { Persona } from "../../../components/ui/Persona";
import { UserAvatar } from "../../../components/ui/UserAvatar";
import { Icon } from "../../../components/ui/Icon";
import { Tag } from "../../../components/ui/Tag";
import { Divider } from "../../../components/ui/Divider";
import { EmptyState } from "../../../components/ui/EmptyState";
import { Heading, Body, Caption } from "../../../components/ui/Typography";
import { Field } from "../../../components/ui/Field";
import { Label } from "../../../components/ui/Label";
import { Input } from "../../../components/ui/Input";
import { Dropdown } from "../../../components/ui/Dropdown";
import { List, ListItem } from "../../../components/ui/List";
import { Hamburger } from "../../../components/ui/Hamburger";
import { Portal } from "../../../components/ui/Portal";
import { Listbox, Option, OptionGroup } from "../../../components/ui/Listbox";
import { AriaLiveAnnouncer, useAnnounce } from "../../../components/ui/AnnounceProvider";
import { DSColorPicker } from "../../../components/ui/ColorPicker";
import { DSSwatchPicker } from "../../../components/ui/SwatchPicker";
import { DSCarousel } from "../../../components/ui/Carousel";
import { DSNavDrawer } from "../../../components/ui/NavDrawer";
import type { DSNavItem } from "../../../components/ui/NavDrawer";
import { OverflowWrapper, OverflowItem } from "../../../components/ui/Overflow";
import {
  Table, TableHeader, TableHeaderCell,
  TableBody, TableRow, TableCell, TableCellLayout,
} from "../../../components/ui/Table";

// ─── Shared layout helpers ────────────────────────────────────────────────────
const row: React.CSSProperties = { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" };
const col: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 12 };
const sectionStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 16 };
const groupLabel: React.CSSProperties = { fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 };

function DemoGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={sectionStyle}>
      <div style={groupLabel}>{title}</div>
      {children}
    </div>
  );
}

// ─── Form Input demos ─────────────────────────────────────────────────────────

function ButtonDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <div style={col}>
      <DemoGroup title="Appearances">
        <div style={row}>
          <Button appearance="primary">Primary</Button>
          <Button appearance="secondary">Secondary</Button>
          <Button appearance="subtle">Subtle</Button>
        </div>
      </DemoGroup>
      <DemoGroup title="With icons">
        <div style={row}>
          <Button appearance="primary" icon={<Add20Regular />}>New item</Button>
          <Button appearance="secondary" icon={<Settings20Regular />}>Settings</Button>
          <Button appearance="subtle" icon={<Delete20Regular />}>Delete</Button>
        </div>
      </DemoGroup>
      <DemoGroup title="Sizes">
        <div style={row}>
          <Button appearance="primary" size="small">Small</Button>
          <Button appearance="primary" size="medium">Medium</Button>
        </div>
      </DemoGroup>
      <DemoGroup title="States">
        <div style={row}>
          <Button appearance="primary" disabled>Disabled</Button>
          <Button
            appearance="primary"
            loading={loading}
            onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
          >
            {loading ? "Loading…" : "Click to load"}
          </Button>
        </div>
      </DemoGroup>
    </div>
  );
}

function TextFieldDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Basic">
        <TextField label="Full name" placeholder="Jane Smith" />
      </DemoGroup>
      <DemoGroup title="Validation states">
        <div style={row}>
          <TextField label="Email" defaultValue="jane@co.com" validationState="success" validationMessage="Valid email" />
          <TextField label="Username" defaultValue="taken!" validationState="error" validationMessage="Username is taken" />
          <TextField label="Password" type="password" validationState="warning" validationMessage="Weak password" />
        </div>
      </DemoGroup>
      <DemoGroup title="Required & disabled">
        <div style={row}>
          <TextField label="Required field" required />
          <TextField label="Disabled" defaultValue="Can't edit" disabled />
        </div>
      </DemoGroup>
    </div>
  );
}

function TextareaDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Basic">
        <Textarea label="Description" placeholder="Tell us about your project…" rows={3} />
      </DemoGroup>
      <DemoGroup title="With character limit">
        <Textarea label="Short bio" maxLength={200} rows={3} hint="Up to 200 characters" />
      </DemoGroup>
      <DemoGroup title="Validation">
        <Textarea label="Notes" validationState="error" validationMessage="This field is required" rows={2} />
      </DemoGroup>
    </div>
  );
}

function SelectDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Basic">
        <Select label="Country" options={[
          { value: "us", label: "United States" },
          { value: "gb", label: "United Kingdom" },
          { value: "de", label: "Germany" },
          { value: "jp", label: "Japan" },
        ]} />
      </DemoGroup>
      <DemoGroup title="Validation">
        <div style={row}>
          <Select label="Required" required options={[{ value: "a", label: "Option A" }, { value: "b", label: "Option B" }]} />
          <Select label="Disabled" disabled options={[{ value: "a", label: "Option A" }]} />
        </div>
      </DemoGroup>
    </div>
  );
}

function ComboboxDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Single select">
        <Combobox
          label="Framework"
          placeholder="Search or select…"
          options={[
            { value: "react", label: "React" },
            { value: "vue", label: "Vue" },
            { value: "angular", label: "Angular" },
            { value: "svelte", label: "Svelte" },
          ]}
        />
      </DemoGroup>
      <DemoGroup title="Freeform">
        <Combobox
          label="Tag"
          placeholder="Type anything or pick…"
          options={[
            { value: "design", label: "Design" },
            { value: "eng", label: "Engineering" },
            { value: "product", label: "Product" },
            { value: "research", label: "Research" },
          ]}
          freeform
        />
      </DemoGroup>
      <DemoGroup title="Multiselect">
        <Combobox
          label="Roles"
          placeholder="Select multiple…"
          options={[
            { value: "admin", label: "Admin" },
            { value: "editor", label: "Editor" },
            { value: "viewer", label: "Viewer" },
            { value: "owner", label: "Owner" },
          ]}
          multiselect
        />
      </DemoGroup>
    </div>
  );
}

function CheckboxDemo() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  return (
    <div style={col}>
      <DemoGroup title="Interactive states">
        <Checkbox label={checked1 ? "Checked ✓" : "Unchecked (click me)"} checked={checked1} onChange={setChecked1} />
        <Checkbox label="Pre-checked" checked={checked2} onChange={setChecked2} />
        <Checkbox label="Indeterminate" checked="mixed" onChange={() => {}} />
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" disabled checked />
      </DemoGroup>
    </div>
  );
}

function RadioGroupDemo() {
  const [val, setVal] = useState("medium");
  return (
    <div style={col}>
      <DemoGroup title={`Selected: "${val}"`}>
        <RadioGroup
          label="Priority"
          value={val}
          onChange={setVal}
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
            { value: "critical", label: "Critical", hint: "Triggers immediate alerts" },
          ]}
        />
      </DemoGroup>
      <DemoGroup title="Horizontal layout">
        <RadioGroup
          label="Size"
          options={[{ value: "s", label: "S" }, { value: "m", label: "M" }, { value: "l", label: "L" }]}
          layout="horizontal"
        />
      </DemoGroup>
    </div>
  );
}

function SwitchDemo() {
  const [on1, setOn1] = useState(false);
  const [on2, setOn2] = useState(true);
  return (
    <div style={col}>
      <DemoGroup title="Interactive">
        <Switch label={on1 ? "Dark mode: ON" : "Dark mode: OFF"} checked={on1} onChange={setOn1} />
        <Switch label="Notifications" checked={on2} onChange={setOn2} />
        <Switch label="Disabled" disabled />
        <Switch label="Disabled + on" disabled checked />
      </DemoGroup>
      <DemoGroup title="Label positions">
        <div style={row}>
          <Switch label="Label before" labelPosition="before" />
          <Switch label="Label after" labelPosition="after" />
        </div>
      </DemoGroup>
    </div>
  );
}

function SliderDemo() {
  const [val, setVal] = useState(40);
  return (
    <div style={col}>
      <DemoGroup title={`Value: ${val}`}>
        <Slider min={0} max={100} value={val} onChange={setVal} />
      </DemoGroup>
      <DemoGroup title="Step: 10">
        <Slider min={0} max={100} step={10} defaultValue={50} />
      </DemoGroup>
      <DemoGroup title="Disabled">
        <Slider min={0} max={100} defaultValue={30} disabled />
      </DemoGroup>
    </div>
  );
}

function DatePickerDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Basic">
        <DatePicker label="Start date" placeholder="Select a date" />
      </DemoGroup>
      <DemoGroup title="With min date">
        <DatePicker label="End date" minDate={new Date()} placeholder="Pick a future date" />
      </DemoGroup>
      <DemoGroup title="Required">
        <DatePicker label="Due date" required />
      </DemoGroup>
    </div>
  );
}

function FileUploadDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Basic">
        <FileUpload label="Upload document" accept=".pdf,.docx" />
      </DemoGroup>
      <DemoGroup title="Multiple files">
        <FileUpload label="Upload images" accept="image/*" multiple />
      </DemoGroup>
      <DemoGroup title="Size limit">
        <FileUpload label="Upload (max 5 MB)" maxSizeBytes={5 * 1024 * 1024} />
      </DemoGroup>
    </div>
  );
}

function SearchInputDemo() {
  const [query, setQuery] = useState("");
  return (
    <div style={col}>
      <DemoGroup title={`Last search: "${query || "—"}"`}>
        <SearchInput placeholder="Search components…" onSearch={setQuery} debounceMs={200} />
      </DemoGroup>
      <DemoGroup title="Sizes">
        <div style={col}>
          <SearchInput placeholder="Small" size="small" onSearch={() => {}} />
          <SearchInput placeholder="Medium" size="medium" onSearch={() => {}} />
        </div>
      </DemoGroup>
    </div>
  );
}

// ─── Feedback demos ───────────────────────────────────────────────────────────

function StatusBadgeDemo() {
  return (
    <div style={col}>
      <DemoGroup title="All statuses">
        <div style={row}>
          <StatusBadge status="completed" />
          <StatusBadge status="in-progress" />
          <StatusBadge status="pending" />
          <StatusBadge status="blocked" />
          <StatusBadge status="warning" />
          <StatusBadge status="paused" />
        </div>
      </DemoGroup>
      <DemoGroup title="Custom labels">
        <div style={row}>
          <StatusBadge status="completed" label="Done" />
          <StatusBadge status="in-progress" label="Running" />
          <StatusBadge status="blocked" label="Stuck" />
        </div>
      </DemoGroup>
      <DemoGroup title="Sizes">
        <div style={row}>
          <StatusBadge status="completed" size="small" label="small" />
          <StatusBadge status="completed" size="medium" label="medium" />
          <StatusBadge status="completed" size="large" label="large" />
        </div>
      </DemoGroup>
    </div>
  );
}

function ProgressBarDemo() {
  const [val, setVal] = useState(65);
  return (
    <div style={col}>
      <DemoGroup title="Determinate — colors">
        <div style={col}>
          <ProgressBar value={0.3} label="30% — brand" color="brand" />
          <ProgressBar value={0.6} label="60% — success" color="success" />
          <ProgressBar value={0.75} label="75% — warning" color="warning" />
          <ProgressBar value={0.9} label="90% — error" color="error" />
        </div>
      </DemoGroup>
      <DemoGroup title="Indeterminate">
        <ProgressBar label="Loading…" />
      </DemoGroup>
      <DemoGroup title={`Interactive: ${val}%`}>
        <input
          type="range" min={0} max={100} value={val}
          onChange={e => setVal(Number(e.target.value))}
          style={{ width: 200 }}
        />
        <ProgressBar value={val / 100} label={`${val}%`} />
      </DemoGroup>
    </div>
  );
}

function MessageBarDemo() {
  return (
    <div style={col}>
      <MessageBar intent="info" title="Info">This is an informational message.</MessageBar>
      <MessageBar intent="success" title="Success">Your changes were saved successfully.</MessageBar>
      <MessageBar intent="warning" title="Warning">Your session expires in 5 minutes.</MessageBar>
      <MessageBar intent="error" title="Error">Failed to save. Please try again.</MessageBar>
    </div>
  );
}

function ToastDemo() {
  const { showToast } = useToast();
  return (
    <div style={col}>
      <DSToaster />
      <DemoGroup title="Trigger toasts">
        <div style={row}>
          <Button appearance="primary" onClick={() => showToast({ title: "Saved!", body: "Your changes are stored.", intent: "success" })}>
            Success
          </Button>
          <Button appearance="secondary" onClick={() => showToast({ title: "Info", body: "A new version is available.", intent: "info" })}>
            Info
          </Button>
          <Button appearance="subtle" onClick={() => showToast({ title: "Warning", body: "Disk space is low.", intent: "warning" })}>
            Warning
          </Button>
          <Button appearance="subtle" onClick={() => showToast({ title: "Error", body: "Failed to connect.", intent: "error" })}>
            Error
          </Button>
        </div>
      </DemoGroup>
    </div>
  );
}

function SpinnerDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Sizes">
        <div style={row}>
          {(["tiny", "extra-small", "small", "medium", "large"] as const).map(s => (
            <div key={s} style={{ ...col, alignItems: "center" }}>
              <Spinner size={s} />
              <Caption color="subtle">{s}</Caption>
            </div>
          ))}
        </div>
      </DemoGroup>
      <DemoGroup title="With label">
        <Spinner size="medium" label="Loading data…" />
      </DemoGroup>
    </div>
  );
}

function SkeletonDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Text lines (wave)">
        <SkeletonText lines={3} animation="wave" />
      </DemoGroup>
      <DemoGroup title="Text lines (pulse)">
        <SkeletonText lines={2} animation="pulse" />
      </DemoGroup>
      <DemoGroup title="Card skeleton">
        <SkeletonCard animation="wave" />
      </DemoGroup>
    </div>
  );
}

// ─── Navigation demos ─────────────────────────────────────────────────────────

function SideNavDemo() {
  const [selected, setSelected] = useState("components");
  return (
    <div style={{ height: 280, border: `1px solid ${tokens.colorNeutralStroke1}`, borderRadius: tokens.borderRadiusMedium, overflow: "hidden" }}>
      <SideNav
        selectedId={selected}
        onSelect={setSelected}
        groups={[
          {
            label: "Foundation",
            items: [
              { id: "tokens", label: "Design Tokens" },
              { id: "themes", label: "Themes" },
            ],
          },
          {
            label: "Library",
            items: [
              { id: "components", label: "Components" },
              { id: "patterns", label: "Patterns" },
              { id: "templates", label: "Templates" },
            ],
          },
        ]}
      />
    </div>
  );
}

function TabsDemo() {
  return (
    <Tabs
      defaultSelectedValue="overview"
      tabs={[
        { value: "overview", label: "Overview", icon: <DocumentText20Regular /> },
        { value: "props", label: "Props", icon: <Settings20Regular /> },
        { value: "code", label: "Code" },
      ]}
      panels={{
        overview: <Body size="sm">Component overview and description displayed here.</Body>,
        props: <Body size="sm">Prop definitions and TypeScript types shown in this tab.</Body>,
        code: <code style={{ fontFamily: "monospace", fontSize: 12 }}>{"<Tabs tabs={[...]} panels={{...}} />"}</code>,
      }}
    />
  );
}

function AccordionDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Single expand">
        <Accordion items={[
          { value: "a", header: "What is a design system?", content: <Body size="sm">A design system is a collection of reusable components guided by clear standards that can be assembled to build applications.</Body> },
          { value: "b", header: "Why Fluent 2?", content: <Body size="sm">Fluent 2 provides a cohesive, accessible design language backed by Microsoft's expertise and @fluentui/react-components.</Body> },
          { value: "c", header: "How do I install?", content: <code style={{ fontSize: 12, fontFamily: "monospace" }}>npm install @lumel/fluent2-ds</code> },
        ]} />
      </DemoGroup>
      <DemoGroup title="Multi-expand">
        <Accordion multiple items={[
          { value: "x", header: "Panel 1 (multi)", content: <Body size="sm">Both panels can be open simultaneously.</Body> },
          { value: "y", header: "Panel 2 (multi)", content: <Body size="sm">Click to collapse independently.</Body> },
        ]} />
      </DemoGroup>
    </div>
  );
}

function StepperDemo() {
  const [step, setStep] = useState(1);
  return (
    <div style={col}>
      <DemoGroup title={`Step ${step + 1} of 4`}>
        <Stepper
          orientation="horizontal"
          steps={[
            { label: "Account", description: "Name and email", status: step > 0 ? "completed" : "current" },
            { label: "Profile", description: "Avatar and bio", status: step > 1 ? "completed" : step === 1 ? "current" : "upcoming" },
            { label: "Review", description: "Confirm details", status: step > 2 ? "completed" : step === 2 ? "current" : "upcoming" },
            { label: "Done", status: step >= 3 ? "completed" : "upcoming" },
          ]}
        />
        <div style={row}>
          <Button appearance="secondary" size="small" disabled={step === 0} onClick={() => setStep(s => s - 1)}>Back</Button>
          <Button appearance="primary" size="small" disabled={step >= 3} onClick={() => setStep(s => s + 1)}>Next</Button>
        </div>
      </DemoGroup>
      <DemoGroup title="All statuses (vertical)">
        <Stepper
          orientation="vertical"
          steps={[
            { label: "Completed", status: "completed" },
            { label: "Current", status: "current" },
            { label: "Upcoming", status: "upcoming" },
            { label: "Error", status: "error" },
          ]}
        />
      </DemoGroup>
    </div>
  );
}

function PageHeaderDemo() {
  return (
    <PageHeader
      title="Component Library"
      description="Browse 37 production-ready components with full TypeScript support."
      breadcrumbs={["Design System", "Components"]}
      actions={<Button appearance="primary" size="small" icon={<Add20Regular />}>New component</Button>}
    />
  );
}

// ─── Overlay demos ─────────────────────────────────────────────────────────────

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={col}>
      <DemoGroup title="End drawer">
        <Button appearance="primary" icon={<ArrowRight20Regular />} onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Settings"
          position="end"
          size="medium"
        >
          <div style={col}>
            <TextField label="Display name" defaultValue="Jane Smith" />
            <Switch label="Email notifications" defaultChecked />
            <Switch label="Dark mode" />
            <div style={row}>
              <Button appearance="primary" onClick={() => setOpen(false)}>Save</Button>
              <Button appearance="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            </div>
          </div>
        </Drawer>
      </DemoGroup>
    </div>
  );
}

function PopoverDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Click to open">
        <div style={row}>
          <Popover
            trigger={<Button appearance="secondary">User info</Button>}
            content={
              <div style={col}>
                <Persona name="Jane Smith" secondaryText="jane@company.com" presence="available" size="medium" />
                <Divider />
                <Button appearance="subtle" size="small">View profile</Button>
              </div>
            }
          />
          <Popover
            trigger={<Button appearance="subtle">Help</Button>}
            content={<Body size="sm">This popover provides additional context or actions anchored to a trigger element.</Body>}
            positioning="above"
          />
        </div>
      </DemoGroup>
    </div>
  );
}

function TooltipDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Hover to reveal">
        <div style={row}>
          <Tooltip content="Create a new item" relationship="label">
            <Button appearance="primary" icon={<Add20Regular />}>Add</Button>
          </Tooltip>
          <Tooltip content="Delete selected items permanently" relationship="description">
            <Button appearance="subtle" icon={<Delete20Regular />}>Delete</Button>
          </Tooltip>
          <Tooltip content="Configure settings" relationship="label">
            <Button appearance="subtle" icon={<Settings20Regular />}>Settings</Button>
          </Tooltip>
        </div>
      </DemoGroup>
    </div>
  );
}

function ConfirmDialogDemo() {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("");
  return (
    <div style={col}>
      <DemoGroup title={result ? `Result: ${result}` : "Click to open"}>
        <div style={row}>
          <Button appearance="primary" onClick={() => setOpen(true)}>Delete item</Button>
          {result && <StatusBadge status={result === "Confirmed" ? "completed" : "blocked"} label={result} />}
        </div>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Delete this item?"
          description="This action cannot be undone. The item will be permanently removed."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          confirmAppearance="primary"
          onConfirm={() => { setResult("Confirmed"); setOpen(false); }}
        />
      </DemoGroup>
    </div>
  );
}

// ─── Data Display demos ───────────────────────────────────────────────────────

const TABLE_COLUMNS = [
  { columnId: "name", label: "Name", renderCell: (r: { id: string; name: string; role: string; status: "completed" | "in-progress" | "pending" | "blocked" }) => <Body size="sm">{r.name}</Body> },
  { columnId: "role", label: "Role", renderCell: (r: { id: string; name: string; role: string; status: "completed" | "in-progress" | "pending" | "blocked" }) => <Caption color="subtle">{r.role}</Caption> },
  { columnId: "status", label: "Status", renderCell: (r: { id: string; name: string; role: string; status: "completed" | "in-progress" | "pending" | "blocked" }) => <StatusBadge status={r.status} size="small" /> },
];
const TABLE_ROWS = [
  { id: "1", name: "Jane Smith", role: "Designer", status: "completed" as const },
  { id: "2", name: "Alex Chen", role: "Engineer", status: "in-progress" as const },
  { id: "3", name: "Sam Park", role: "PM", status: "pending" as const },
  { id: "4", name: "Jordan Lee", role: "Researcher", status: "completed" as const },
  { id: "5", name: "Chris Patel", role: "Engineer", status: "blocked" as const },
];

function DataTableDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Sortable table">
        <DataTable columns={TABLE_COLUMNS} items={TABLE_ROWS} />
      </DemoGroup>
      <DemoGroup title="With multiselect">
        <DataTable columns={TABLE_COLUMNS} items={TABLE_ROWS} selectionMode="multiselect" />
      </DemoGroup>
    </div>
  );
}

function DataCardDemo() {
  return (
    <div style={row}>
      <DataCard label="Components" value="37" trend="+5 this release" trendUp icon={<Star20Regular />} />
      <DataCard label="Test coverage" value="100%" trend="211 passing" trendUp icon={<Checkmark20Regular />} />
      <DataCard label="Bundle size" value="148 KB" trend="-12% vs v0.0.9" trendUp={false} icon={<DocumentText20Regular />} />
      <DataCard label="Audit score" value="100/100" trend="GO ✓" trendUp />
    </div>
  );
}

function CardDemo() {
  return (
    <div style={row}>
      <Card style={{ width: 220 }}>
        <div style={{ padding: 16 }}>
          <Heading level={4}>Basic card</Heading>
          <Body size="sm" color="subtle">A flexible container for grouping related content.</Body>
        </div>
      </Card>
      <Card
        header={{ title: "Card with header", subtitle: "Optional subtitle" }}
        footer={<Button appearance="subtle" size="small">View more</Button>}
        style={{ width: 220 }}
      >
        <div style={{ padding: "0 16px 8px" }}>
          <Body size="sm">Card body content goes here.</Body>
        </div>
      </Card>
      <Card appearance="filled-alternative" style={{ width: 220 }}>
        <div style={{ padding: 16 }}>
          <Heading level={4}>Alt fill card</Heading>
          <Body size="sm" color="subtle">Filled-alternative appearance variant.</Body>
        </div>
      </Card>
    </div>
  );
}

function PersonaDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Sizes">
        <div style={row}>
          {(["small", "medium", "large", "huge"] as const).map(size => (
            <Persona key={size} name="Jane Smith" secondaryText="Designer" size={size} presence="available" />
          ))}
        </div>
      </DemoGroup>
      <DemoGroup title="Presence states">
        <div style={row}>
          <Persona name="Available" presence="available" size="medium" />
          <Persona name="Busy" presence="busy" size="medium" />
          <Persona name="Away" presence="away" size="medium" />
          <Persona name="Offline" presence="offline" size="medium" />
        </div>
      </DemoGroup>
    </div>
  );
}

function UserAvatarDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Sizes (initials)">
        <div style={row}>
          {([24, 32, 40, 56, 72] as const).map(size => (
            <div key={size} style={{ ...col, alignItems: "center" }}>
              <UserAvatar name="Jane Smith" size={size} />
              <Caption color="subtle">{size}px</Caption>
            </div>
          ))}
        </div>
      </DemoGroup>
      <DemoGroup title="Presence ring">
        <div style={row}>
          <UserAvatar name="Available" size={40} presence="available" />
          <UserAvatar name="Busy" size={40} presence="busy" />
          <UserAvatar name="Away" size={40} presence="away" />
          <UserAvatar name="Offline" size={40} presence="offline" />
        </div>
      </DemoGroup>
    </div>
  );
}

function IconDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Sizes (pixels)">
        <div style={row}>
          {([16, 20, 24, 32] as const).map(s => (
            <div key={s} style={{ ...col, alignItems: "center" }}>
              <Icon icon={<Star20Regular />} size={s} />
              <Caption color="subtle">{s}px</Caption>
            </div>
          ))}
        </div>
      </DemoGroup>
      <DemoGroup title="Color variants">
        <div style={row}>
          <Icon icon={<Person20Regular />} size={20} color="default" />
          <Icon icon={<Settings20Regular />} size={20} color="muted" />
          <Icon icon={<Star20Regular />} size={20} color="brand" />
          <Icon icon={<Checkmark20Regular />} size={20} color="success" />
          <Icon icon={<Add20Regular />} size={20} color="warning" />
          <Icon icon={<Delete20Regular />} size={20} color="danger" />
        </div>
      </DemoGroup>
    </div>
  );
}

function TagDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Appearances">
        <div style={row}>
          <Tag appearance="filled">Filled</Tag>
          <Tag appearance="outline">Outline</Tag>
          <Tag appearance="brand">Brand</Tag>
        </div>
      </DemoGroup>
      <DemoGroup title="Sizes">
        <div style={row}>
          <Tag appearance="brand" size="extra-small">Extra small</Tag>
          <Tag appearance="brand" size="small">Small</Tag>
          <Tag appearance="brand" size="medium">Medium</Tag>
        </div>
      </DemoGroup>
      <DemoGroup title="Category tags example">
        <div style={row}>
          {["React", "TypeScript", "Fluent 2", "WCAG 2.1 AA", "RTL"].map(t => (
            <Tag key={t} appearance="outline" size="small">{t}</Tag>
          ))}
        </div>
      </DemoGroup>
    </div>
  );
}

// ─── Layout demos ─────────────────────────────────────────────────────────────

function DividerDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Appearances">
        <div style={col}>
          <Divider />
          <Divider appearance="brand" />
          <Divider appearance="strong" />
          <Divider appearance="subtle" />
        </div>
      </DemoGroup>
      <DemoGroup title="With label">
        <Divider>Section heading</Divider>
      </DemoGroup>
      <DemoGroup title="Vertical">
        <div style={{ ...row, height: 40 }}>
          <Body size="sm">Left</Body>
          <Divider vertical />
          <Body size="sm">Right</Body>
        </div>
      </DemoGroup>
    </div>
  );
}

function EmptyStateDemo() {
  return (
    <EmptyState
      title="No components found"
      description="Try adjusting your search or filter criteria to find what you're looking for."
      icon={<Search20Regular />}
      action={<Button appearance="primary">Clear filters</Button>}
    />
  );
}

function TypographyDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Heading levels">
        <Heading level={1}>Heading 1 — Page title</Heading>
        <Heading level={2}>Heading 2 — Section</Heading>
        <Heading level={3}>Heading 3 — Sub-section</Heading>
        <Heading level={4}>Heading 4 — Card title</Heading>
      </DemoGroup>
      <DemoGroup title="Body">
        <Body>Base body — default paragraph text at 14px.</Body>
        <Body size="sm">Small body — helper text and secondary descriptions.</Body>
        <Body color="subtle">Subtle body — muted supporting text.</Body>
        <Body color="brand">Brand body — highlighted or linked text.</Body>
      </DemoGroup>
      <DemoGroup title="Caption">
        <Caption>Default caption — metadata and timestamps.</Caption>
        <Caption color="subtle">Subtle caption — secondary small labels.</Caption>
      </DemoGroup>
    </div>
  );
}

// ─── Phase Next Demo Functions ────────────────────────────────────────────────

function LinkDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Default">
        <div style={row}>
          <Link href="#">Go to Dashboard</Link>
          <Link href="#" appearance="subtle">Subtle link</Link>
        </div>
      </DemoGroup>
      <DemoGroup title="External">
        <Link href="https://fluent2.microsoft.design" external>Fluent 2 Design</Link>
      </DemoGroup>
      <DemoGroup title="Inline in text">
        <span>
          Read the{" "}
          <Link href="#">documentation</Link>
          {" "}or{" "}
          <Link href="#">contact support</Link>
          {" "}for help.
        </span>
      </DemoGroup>
      <DemoGroup title="States">
        <div style={row}>
          <Link disabled>Disabled link</Link>
        </div>
      </DemoGroup>
    </div>
  );
}

function ToggleButtonDemo() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <div style={col}>
      <DemoGroup title="Formatting toolbar">
        <div style={row}>
          <ToggleButton icon={<TextBold20Regular />} checked={bold} onChange={setBold} aria-label="Bold" />
          <ToggleButton icon={<TextItalic20Regular />} checked={italic} onChange={setItalic} aria-label="Italic" />
          <ToggleButton icon={<TextUnderline20Regular />} checked={underline} onChange={setUnderline} aria-label="Underline" />
        </div>
        <div style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>
          Bold: {bold ? "on" : "off"} · Italic: {italic ? "on" : "off"} · Underline: {underline ? "on" : "off"}
        </div>
      </DemoGroup>
      <DemoGroup title="View toggle">
        <div style={row}>
          <ToggleButton appearance="subtle" checked={view === "grid"} onChange={() => setView("grid")}>Grid</ToggleButton>
          <ToggleButton appearance="subtle" checked={view === "list"} onChange={() => setView("list")}>List</ToggleButton>
        </div>
      </DemoGroup>
      <DemoGroup title="Appearances">
        <div style={row}>
          <ToggleButton appearance="primary" checked>Primary checked</ToggleButton>
          <ToggleButton appearance="subtle" checked>Subtle checked (2)</ToggleButton>
          <ToggleButton appearance="subtle" checked>Subtle checked</ToggleButton>
        </div>
      </DemoGroup>
    </div>
  );
}

function CompoundButtonDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Options">
        <div style={row}>
          <CompoundButton appearance="primary" icon={<Add20Regular />} secondaryContent="Start from scratch">
            New project
          </CompoundButton>
          <CompoundButton icon={<DocumentText20Regular />} secondaryContent="Use an existing template">
            From template
          </CompoundButton>
        </div>
      </DemoGroup>
      <DemoGroup title="Appearances">
        <div style={{ ...col, maxWidth: 320 }}>
          <CompoundButton appearance="primary" secondaryContent="Creates a new workspace" block>Primary</CompoundButton>
          <CompoundButton appearance="subtle" secondaryContent="Import from file" block>Subtle</CompoundButton>
          <CompoundButton disabled secondaryContent="Not available" block>Disabled</CompoundButton>
        </div>
      </DemoGroup>
    </div>
  );
}

function MenuDemo() {
  const [last, setLast] = useState<string | null>(null);
  const items = [
    { id: "edit", label: "Edit", icon: <Edit20Regular /> },
    { id: "copy", label: "Copy", icon: <Copy20Regular />, shortcut: "⌘C" },
    { id: "cut",  label: "Cut",  icon: <Cut20Regular />,  shortcut: "⌘X" },
    { id: "divider-1", type: "divider" as const },
    { id: "share", label: "Share", icon: <Share20Regular /> },
    { id: "divider-2", type: "divider" as const },
    { id: "delete", label: "Delete", icon: <Delete20Regular />, danger: true },
  ];
  return (
    <div style={col}>
      <DemoGroup title="Data-driven menu">
        <div style={row}>
          <Menu
            trigger={<Button appearance="subtle" icon={<MoreHorizontal20Regular />}>More actions</Button>}
            items={items}
            onSelect={(id) => setLast(id)}
          />
          {last && <span style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>Last: {last}</span>}
        </div>
      </DemoGroup>
      <DemoGroup title="With groups">
        <Menu
          trigger={<Button appearance="secondary">File</Button>}
          items={[
            { id: "h-file", label: "File actions", type: "group-header" as const },
            { id: "new", label: "New", icon: <Add20Regular /> },
            { id: "open", label: "Open", icon: <DocumentText20Regular /> },
            { id: "divider-1", type: "divider" as const },
            { id: "h-edit", label: "Edit actions", type: "group-header" as const },
            { id: "undo", label: "Undo", shortcut: "⌘Z" },
            { id: "redo", label: "Redo", shortcut: "⌘⇧Z" },
          ]}
          onSelect={(id) => setLast(id)}
        />
      </DemoGroup>
    </div>
  );
}

function MenuButtonDemo() {
  const [last, setLast] = useState<string | null>(null);
  return (
    <div style={col}>
      <DemoGroup title="Appearances">
        <div style={row}>
          <MenuButton
            appearance="primary"
            label="Actions"
            items={[
              { id: "edit", label: "Edit", icon: <Edit20Regular /> },
              { id: "delete", label: "Delete", icon: <Delete20Regular />, danger: true },
            ]}
            onSelect={(id) => setLast(id)}
          />
          <MenuButton
            appearance="secondary"
            label="Options"
            items={[
              { id: "copy", label: "Copy" },
              { id: "share", label: "Share" },
            ]}
            onSelect={(id) => setLast(id)}
          />
          <MenuButton
            appearance="subtle"
            label="More"
            icon={<MoreHorizontal20Regular />}
            items={[
              { id: "a", label: "Option A" },
              { id: "b", label: "Option B" },
            ]}
            onSelect={(id) => setLast(id)}
          />
        </div>
        {last && <span style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>Selected: {last}</span>}
      </DemoGroup>
    </div>
  );
}

function SplitButtonDemo() {
  const [lastAction, setLastAction] = useState<string>("(none)");
  return (
    <div style={col}>
      <DemoGroup title="Primary + dropdown">
        <div style={row}>
          <SplitButton
            appearance="primary"
            label="Save"
            onClick={() => setLastAction("Save (primary)")}
            items={[
              { id: "save-as", label: "Save as…" },
              { id: "save-copy", label: "Save a copy" },
              { id: "div", type: "divider" as const },
              { id: "export", label: "Export" },
            ]}
            onSelect={(id) => setLastAction(id)}
          />
          <SplitButton
            appearance="secondary"
            label="Send"
            onClick={() => setLastAction("Send (primary)")}
            items={[
              { id: "send-later", label: "Send later…" },
              { id: "schedule", label: "Schedule send" },
            ]}
            onSelect={(id) => setLastAction(id)}
          />
        </div>
        <span style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>Last action: {lastAction}</span>
      </DemoGroup>
    </div>
  );
}

function ToolbarDemo() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  return (
    <div style={col}>
      <DemoGroup title="Text formatting toolbar">
        <Toolbar
          aria-label="Text formatting"
          items={[
            { id: "bold",      type: "toggle", label: "Bold",      icon: <TextBold20Regular />,      checked: bold,      onChange: setBold },
            { id: "italic",    type: "toggle", label: "Italic",    icon: <TextItalic20Regular />,    checked: italic,    onChange: setItalic },
            { id: "underline", type: "toggle", label: "Underline", icon: <TextUnderline20Regular />, checked: underline, onChange: setUnderline },
            { id: "div-1", type: "divider" },
            { id: "align-left",   type: "button", label: "Align left",   icon: <AlignLeft20Regular /> },
            { id: "align-center", type: "button", label: "Align center", icon: <TextAlignCenter20Regular /> },
            { id: "align-right",  type: "button", label: "Align right",  icon: <AlignRight20Regular /> },
            { id: "div-2", type: "divider" },
            { id: "copy",  type: "button", label: "Copy",  icon: <Copy20Regular /> },
            { id: "cut",   type: "button", label: "Cut",   icon: <Cut20Regular /> },
            { id: "paste", type: "button", label: "Paste", icon: <Clipboard20Regular /> },
          ]}
        />
      </DemoGroup>
      <DemoGroup title="Sizes">
        <div style={col}>
          <Toolbar aria-label="Small toolbar" size="small"
            items={[
              { id: "a", type: "button", label: "Edit", icon: <Edit20Regular /> },
              { id: "b", type: "button", label: "Copy", icon: <Copy20Regular /> },
              { id: "div", type: "divider" },
              { id: "c", type: "button", label: "Delete", icon: <Delete20Regular /> },
            ]}
          />
          <Toolbar aria-label="Medium toolbar" size="medium"
            items={[
              { id: "a", type: "button", label: "Edit", icon: <Edit20Regular /> },
              { id: "b", type: "button", label: "Copy", icon: <Copy20Regular /> },
              { id: "div", type: "divider" },
              { id: "c", type: "button", label: "Delete", icon: <Delete20Regular /> },
            ]}
          />
        </div>
      </DemoGroup>
    </div>
  );
}

function DialogDemo() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  return (
    <div style={col}>
      <DemoGroup title="Basic dialog">
        <div style={row}>
          <Button appearance="primary" onClick={() => setBasicOpen(true)}>Open dialog</Button>
          <Dialog
            open={basicOpen}
            onOpenChange={setBasicOpen}
            title="Rename project"
            actions={
              <div style={row}>
                <Button appearance="primary" onClick={() => setBasicOpen(false)}>Rename</Button>
                <Button onClick={() => setBasicOpen(false)}>Cancel</Button>
              </div>
            }
          >
            <TextField label="New name" defaultValue="My Project" style={{ width: "100%" }} />
          </Dialog>
        </div>
      </DemoGroup>
      <DemoGroup title="With form">
        <div style={row}>
          <Button appearance="secondary" onClick={() => setFormOpen(true)}>Edit profile</Button>
          <Dialog
            open={formOpen}
            onOpenChange={setFormOpen}
            title="Edit profile"
            actions={
              <div style={row}>
                <Button appearance="primary" onClick={() => setFormOpen(false)}>Save changes</Button>
                <Button onClick={() => setFormOpen(false)}>Cancel</Button>
              </div>
            }
          >
            <div style={{ ...col, gap: 12 }}>
              <TextField label="Display name" defaultValue="Jane Smith" />
              <TextField label="Email" defaultValue="jane@example.com" type="email" />
            </div>
          </Dialog>
        </div>
      </DemoGroup>
      <DemoGroup title="Trigger mode (uncontrolled)">
        <Dialog
          trigger={<Button appearance="secondary">Trigger dialog</Button>}
          title="Info"
          actions={<Button appearance="primary">OK</Button>}
        >
          This dialog opens from a trigger prop — no external state needed.
        </Dialog>
      </DemoGroup>
    </div>
  );
}

function BreadcrumbDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Basic">
        <Breadcrumb
          items={[
            { id: "home", label: "Home", href: "#" },
            { id: "ds", label: "Design System", href: "#" },
            { id: "components", label: "Components", href: "#" },
            { id: "current", label: "Breadcrumb", current: true },
          ]}
        />
      </DemoGroup>
      <DemoGroup title="Sizes">
        <div style={col}>
          <Breadcrumb size="small" items={[{ id: "a", label: "Home", href: "#" }, { id: "b", label: "Projects", href: "#" }, { id: "c", label: "Current", current: true }]} />
          <Breadcrumb size="medium" items={[{ id: "a", label: "Home", href: "#" }, { id: "b", label: "Projects", href: "#" }, { id: "c", label: "Current", current: true }]} />
        </div>
      </DemoGroup>
    </div>
  );
}

function InfoLabelDemo() {
  return (
    <div style={col}>
      <DemoGroup title="InfoLabel with popover">
        <div style={col}>
          <InfoLabel
            label="Retention period"
            info="How long records are kept before automatic deletion. Minimum is 30 days per compliance policy."
            required
          />
          <InfoLabel
            label="API endpoint"
            info="The base URL for outbound webhook calls. Must use HTTPS."
            size="small"
          />
          <InfoLabel
            label="Disabled field"
            info="This setting is managed by your administrator."
            disabled
          />
        </div>
      </DemoGroup>
      <DemoGroup title="Standalone InfoButton">
        <div style={row}>
          <span>Quota limit</span>
          <InfoButton content="Your organisation quota resets on the 1st of each month." />
        </div>
      </DemoGroup>
      <DemoGroup title="Sizes">
        <div style={col}>
          <InfoLabel size="small" label="Small label" info="Small size info" />
          <InfoLabel size="medium" label="Medium label" info="Medium size info" />
        </div>
      </DemoGroup>
    </div>
  );
}

function SpinButtonDemo() {
  const [qty, setQty] = useState<number | null>(10);
  const [price, setPrice] = useState<number | null>(29.99);
  return (
    <div style={col}>
      <DemoGroup title="Basic">
        <SpinButton
          label="Quantity"
          value={qty ?? 0}
          min={0}
          max={999}
          onChange={(v) => setQty(v)}
        />
      </DemoGroup>
      <DemoGroup title="With prefix / suffix">
        <div style={row}>
          <SpinButton label="Price" value={price ?? 0} min={0} step={0.01} precision={2} prefix="$" onChange={(v) => setPrice(v)} />
          <SpinButton label="Weight" defaultValue={1.5} min={0} step={0.5} suffix=" kg" />
        </div>
      </DemoGroup>
      <DemoGroup title="Validation states">
        <div style={row}>
          <SpinButton label="Required" required defaultValue={5} min={1} max={10} />
          <SpinButton label="Error" defaultValue={-1} min={0} validationState="error" validationMessage="Must be 0 or higher" />
        </div>
      </DemoGroup>
    </div>
  );
}

function TagPickerDemo() {
  const [selected, setSelected] = useState<string[]>(["react"]);
  const techOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "solid", label: "SolidJS" },
    { value: "next", label: "Next.js" },
  ];
  const peopleOptions = [
    { value: "alice", label: "Alice Chen", description: "Engineering" },
    { value: "bob", label: "Bob Smith", description: "Design" },
    { value: "carol", label: "Carol Jones", description: "Product" },
    { value: "dan", label: "Dan Park", description: "Engineering" },
  ];
  return (
    <div style={col}>
      <DemoGroup title="Technology picker">
        <TagPicker
          label="Technologies"
          options={techOptions}
          selectedValues={selected}
          onChange={setSelected}
          placeholder="Select frameworks…"
        />
        <span style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>
          Selected: {selected.join(", ") || "(none)"}
        </span>
      </DemoGroup>
      <DemoGroup title="People picker">
        <TagPicker
          label="Assignees"
          options={peopleOptions}
          placeholder="Search people…"
          hint="Select team members to assign"
        />
      </DemoGroup>
      <DemoGroup title="Validation">
        <TagPicker
          label="Required field"
          options={techOptions}
          required
          validationState="error"
          validationMessage="At least one technology is required"
        />
      </DemoGroup>
    </div>
  );
}

function CounterBadgeDemo() {
  const [count, setCount] = useState(3);
  return (
    <div style={col}>
      <DemoGroup title="On icons">
        <div style={row}>
          {(["brand", "danger", "important", "informative"] as const).map((color) => (
            <div key={color} style={{ position: "relative", display: "inline-flex" }}>
              <Button appearance="subtle" icon={<Alert20Regular />} aria-label={`Notifications (${color})`} />
              <CounterBadge
                count={count}
                color={color}
                style={{ position: "absolute", top: -6, insetInlineEnd: -6 }}
              />
            </div>
          ))}
        </div>
      </DemoGroup>
      <DemoGroup title="Sizes">
        <div style={row}>
          {(["extra-small", "small", "medium", "large", "extra-large"] as const).map((size) => (
            <CounterBadge key={size} count={count} size={size} />
          ))}
        </div>
      </DemoGroup>
      <DemoGroup title="Overflow + dot">
        <div style={row}>
          <CounterBadge count={42} />
          <CounterBadge count={100} />
          <CounterBadge count={999} />
          <CounterBadge dot />
        </div>
      </DemoGroup>
      <DemoGroup title="Interactive count">
        <div style={row}>
          <Button size="small" onClick={() => setCount((c) => Math.max(0, c - 1))}>−</Button>
          <CounterBadge count={count} showZero />
          <Button size="small" onClick={() => setCount((c) => c + 1)}>+</Button>
        </div>
      </DemoGroup>
    </div>
  );
}

function PresenceBadgeDemo() {
  const statuses = ["available", "away", "busy", "do-not-disturb", "offline", "out-of-office", "unknown"] as const;
  return (
    <div style={col}>
      <DemoGroup title="All statuses">
        <div style={row}>
          {statuses.map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <PresenceBadge status={s} size="large" />
              <span style={{ fontSize: tokens.fontSizeBase100, color: tokens.colorNeutralForeground3 }}>{s}</span>
            </div>
          ))}
        </div>
      </DemoGroup>
      <DemoGroup title="Sizes">
        <div style={row}>
          {(["extra-small", "small", "medium", "large", "extra-large"] as const).map((size) => (
            <PresenceBadge key={size} status="available" size={size} />
          ))}
        </div>
      </DemoGroup>
      <DemoGroup title="On avatars">
        <div style={row}>
          {statuses.slice(0, 4).map((s) => (
            <div key={s} style={{ position: "relative", width: 40, height: 40 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: tokens.colorBrandBackground, display: "flex", alignItems: "center", justifyContent: "center", color: tokens.colorNeutralBackground1, fontWeight: tokens.fontWeightSemibold }}>
                {s[0].toUpperCase()}
              </div>
              <PresenceBadge status={s} size="medium" style={{ position: "absolute", bottom: 0, right: 0 }} />
            </div>
          ))}
        </div>
      </DemoGroup>
    </div>
  );
}

function AvatarGroupDemo() {
  const members = [
    { name: "Alice Chen", color: "brand" as const },
    { name: "Bob Smith", color: "dark-red" as const },
    { name: "Carol Jones", color: "forest" as const, status: "available" as const },
    { name: "Dan Park", color: "navy" as const, status: "busy" as const },
    { name: "Elena Rodriguez", color: "pumpkin" as const },
    { name: "Frank Lee", color: "grape" as const, status: "away" as const },
    { name: "Grace Kim", color: "teal" as const },
    { name: "Henry Wilson", color: "cranberry" as const },
  ];
  return (
    <div style={col}>
      <DemoGroup title="Stack layout (maxVisible=5)">
        <AvatarGroup members={members} maxVisible={5} layout="stack" size={32} />
      </DemoGroup>
      <DemoGroup title="Spread layout">
        <AvatarGroup members={members} maxVisible={4} layout="spread" size={36} />
      </DemoGroup>
      <DemoGroup title="Sizes">
        <div style={col}>
          {([20, 28, 32, 40, 48] as const).map((size) => (
            <div key={size} style={row}>
              <AvatarGroup members={members.slice(0, 4)} size={size} />
              <span style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>{size}px</span>
            </div>
          ))}
        </div>
      </DemoGroup>
    </div>
  );
}

function RatingDemo() {
  const [value, setValue] = useState(3);
  return (
    <div style={col}>
      <DemoGroup title="Interactive rating">
        <Rating value={value} onChange={setValue} label="Rate this component" max={5} />
        <span style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>Value: {value}</span>
      </DemoGroup>
      <DemoGroup title="Half-star precision">
        <Rating defaultValue={3.5} step={0.5} max={5} label="Half-star rating" />
      </DemoGroup>
      <DemoGroup title="Colors">
        <div style={col}>
          <Rating defaultValue={4} color="marigold" label="Marigold (default)" />
          <Rating defaultValue={4} color="brand" label="Brand" />
          <Rating defaultValue={4} color="neutral" label="Neutral" />
        </div>
      </DemoGroup>
      <DemoGroup title="RatingDisplay (read-only)">
        <div style={col}>
          <RatingDisplay value={4.3} count={1284} />
          <RatingDisplay value={3.7} count={42} size="large" />
          <RatingDisplay value={5.0} count={8} size="small" />
        </div>
      </DemoGroup>
    </div>
  );
}

function TreeDemo() {
  const [selected, setSelected] = useState<string[]>([]);
  const items = [
    {
      id: "src", label: "src", icon: <Folder20Regular />,
      children: [
        {
          id: "components", label: "components", icon: <Folder20Regular />,
          children: [
            { id: "button", label: "Button.tsx", icon: <DocumentText20Regular /> },
            { id: "card", label: "Card.tsx", icon: <DocumentText20Regular /> },
            { id: "dialog", label: "Dialog.tsx", icon: <DocumentText20Regular /> },
          ],
        },
        { id: "app", label: "App.tsx", icon: <DocumentText20Regular /> },
        { id: "index", label: "index.tsx", icon: <DocumentText20Regular /> },
      ],
    },
    { id: "package", label: "package.json", icon: <DocumentText20Regular /> },
    { id: "tsconfig", label: "tsconfig.json", icon: <DocumentText20Regular /> },
  ];
  return (
    <div style={col}>
      <DemoGroup title="File tree (expand/collapse)">
        <Tree aria-label="File structure" items={items} />
      </DemoGroup>
      <DemoGroup title="Multi-select">
        <Tree
          aria-label="Selectable tree"
          items={items}
          selectionMode="multiselect"
          onSelectionChange={setSelected}
        />
        {selected.length > 0 && (
          <span style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>
            Selected: {selected.join(", ")}
          </span>
        )}
      </DemoGroup>
    </div>
  );
}

function InteractionTagDemo() {
  const [tags, setTags] = useState(["design", "engineering", "product", "research"]);
  const removeTag = (val: string) => setTags((t) => t.filter((x) => x !== val));
  return (
    <div style={col}>
      <DemoGroup title="Dismissible tags">
        <InteractionTagGroup onDismiss={removeTag} aria-label="Active filters">
          {tags.map((t) => (
            <InteractionTag key={t} value={t} onDismiss={removeTag}>{t}</InteractionTag>
          ))}
        </InteractionTagGroup>
        {tags.length === 0 && (
          <div style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>
            All tags removed. <button onClick={() => setTags(["design", "engineering", "product", "research"])} style={{ background: "none", border: "none", cursor: "pointer", color: tokens.colorBrandForeground1 }}>Reset</button>
          </div>
        )}
      </DemoGroup>
      <DemoGroup title="Appearances">
        <div style={row}>
          {(["filled", "outline", "brand", "tint"] as const).map((a) => (
            <InteractionTag key={a} value={a} appearance={a} onDismiss={() => {}}>{a}</InteractionTag>
          ))}
        </div>
      </DemoGroup>
      <DemoGroup title="Sizes">
        <div style={row}>
          {(["extra-small", "small", "medium"] as const).map((s) => (
            <InteractionTag key={s} value={s} size={s} onDismiss={() => {}}>{s}</InteractionTag>
          ))}
        </div>
      </DemoGroup>
      <DemoGroup title="Clickable primary (no dismiss)">
        <InteractionTagGroup aria-label="Clickable tags">
          <InteractionTag value="react" appearance="outline" onPrimaryClick={(v) => alert(`Clicked: ${v}`)}>React</InteractionTag>
          <InteractionTag value="vue" appearance="outline" onPrimaryClick={(v) => alert(`Clicked: ${v}`)}>Vue</InteractionTag>
          <InteractionTag value="angular" appearance="outline" onPrimaryClick={(v) => alert(`Clicked: ${v}`)}>Angular</InteractionTag>
        </InteractionTagGroup>
      </DemoGroup>
      <DemoGroup title="Clickable + dismissible">
        <InteractionTagGroup aria-label="Clickable and dismissible">
          <InteractionTag value="figma" appearance="brand" onPrimaryClick={(v) => alert(`Clicked: ${v}`)} onDismiss={() => {}}>Figma</InteractionTag>
          <InteractionTag value="storybook" appearance="tint" onPrimaryClick={(v) => alert(`Clicked: ${v}`)} onDismiss={() => {}}>Storybook</InteractionTag>
          <InteractionTag value="vscode" appearance="filled" onPrimaryClick={(v) => alert(`Clicked: ${v}`)} onDismiss={() => {}}>VS Code</InteractionTag>
        </InteractionTagGroup>
      </DemoGroup>
      <DemoGroup title="Disabled state">
        <div style={row}>
          <InteractionTag value="d1" disabled onDismiss={() => {}}>Disabled filled</InteractionTag>
          <InteractionTag value="d2" appearance="outline" disabled onDismiss={() => {}}>Disabled outline</InteractionTag>
        </div>
      </DemoGroup>
    </div>
  );
}

function ImageDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Fit modes">
        <div style={row}>
          {(["cover", "contain", "center", "none"] as const).map((fit) => (
            <div key={fit} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
              <Image
                src="https://picsum.photos/seed/ds/300/200"
                alt={`${fit} fit`}
                width={100}
                height={80}
                fit={fit}
                bordered
              />
              <span style={{ fontSize: tokens.fontSizeBase100, color: tokens.colorNeutralForeground3 }}>{fit}</span>
            </div>
          ))}
        </div>
      </DemoGroup>
      <DemoGroup title="Shapes">
        <div style={row}>
          {(["square", "rounded", "circular"] as const).map((shape) => (
            <div key={shape} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
              <Image src="https://picsum.photos/seed/avatar/200/200" alt={shape} width={80} height={80} fit="cover" shape={shape} />
              <span style={{ fontSize: tokens.fontSizeBase100, color: tokens.colorNeutralForeground3 }}>{shape}</span>
            </div>
          ))}
        </div>
      </DemoGroup>
      <DemoGroup title="Error fallback">
        <div style={row}>
          <Image src="https://invalid.url/img.png" alt="Broken image" width={120} height={80} fallbackSrc="https://picsum.photos/seed/fallback/120/80" bordered />
          <Image src="https://invalid.url/img2.png" alt="No fallback" width={120} height={80} bordered />
        </div>
      </DemoGroup>
    </div>
  );
}

function TeachingPopoverDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Single-step">
        <TeachingPopover
          trigger={<Button appearance="primary">What's new</Button>}
          title="Introducing dark mode"
          body="You can now toggle between light and dark themes using the button in the top navigation bar."
          primaryAction={{ label: "Got it", onClick: () => {} }}
          secondaryAction={{ label: "Learn more" }}
        />
      </DemoGroup>
      <DemoGroup title="Multi-step carousel">
        <TeachingPopover
          trigger={<Button appearance="secondary">Start tour</Button>}
          steps={[
            { title: "Welcome to the Design System", body: "This explorer lets you browse all components, tokens, and patterns in one place." },
            { title: "Browse components", body: "Use the sidebar to navigate to any component. Each page shows live demos, props, and code." },
            { title: "Switch themes", body: "Use the theme toggle in the header to switch between light and dark mode at any time." },
          ]}
          primaryAction={{ label: "Finish tour" }}
        />
      </DemoGroup>
    </div>
  );
}

// ─── Missing component demos ──────────────────────────────────────────────────

function BadgeDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Appearances">
        <div style={row}>
          <Badge appearance="filled">Filled</Badge>
          <Badge appearance="ghost">Ghost</Badge>
          <Badge appearance="outline">Outline</Badge>
          <Badge appearance="tint">Tint</Badge>
        </div>
      </DemoGroup>
      <DemoGroup title="Semantic colors (tint)">
        <div style={row}>
          <Badge appearance="tint" color="brand">Brand</Badge>
          <Badge appearance="tint" color="success">Success</Badge>
          <Badge appearance="tint" color="warning">Warning</Badge>
          <Badge appearance="tint" color="danger">Danger</Badge>
          <Badge appearance="tint" color="informative">Info</Badge>
          <Badge appearance="tint" color="important">Important</Badge>
          <Badge appearance="tint" color="severe">Severe</Badge>
        </div>
      </DemoGroup>
      <DemoGroup title="Sizes">
        <div style={row}>
          {(["tiny", "extra-small", "small", "medium", "large", "extra-large"] as const).map(s => (
            <Badge key={s} appearance="filled" color="brand" size={s}>{s}</Badge>
          ))}
        </div>
      </DemoGroup>
      <DemoGroup title="Shapes">
        <div style={row}>
          <Badge appearance="filled" color="brand" shape="circular">Circular</Badge>
          <Badge appearance="filled" color="brand" shape="rounded">Rounded</Badge>
          <Badge appearance="filled" color="brand" shape="square">Square</Badge>
        </div>
      </DemoGroup>
      <DemoGroup title="With icon">
        <div style={row}>
          <Badge appearance="tint" color="success" icon={<Checkmark20Regular />}>Passed</Badge>
          <Badge appearance="tint" color="danger" icon={<Delete20Regular />}>Failed</Badge>
          <Badge appearance="tint" color="warning" icon={<Alert20Regular />}>Warning</Badge>
        </div>
      </DemoGroup>
    </div>
  );
}

function FieldDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Wrapping a Slider">
        <Field label="Volume" hint="Drag to adjust">
          <Slider min={0} max={100} defaultValue={40} />
        </Field>
      </DemoGroup>
      <DemoGroup title="Validation states">
        <div style={col}>
          <Field label="Username" validationState="success" validationMessage="Username is available">
            <Input defaultValue="jane_smith" />
          </Field>
          <Field label="Email" validationState="error" validationMessage="Invalid email address">
            <Input defaultValue="not-an-email" />
          </Field>
          <Field label="Bio" validationState="warning" validationMessage="Getting close to character limit">
            <Input defaultValue="Short bio..." />
          </Field>
        </div>
      </DemoGroup>
      <DemoGroup title="Horizontal orientation">
        <Field label="Enable feature" orientation="horizontal">
          <Switch label="Enable feature" defaultChecked />
        </Field>
      </DemoGroup>
      <DemoGroup title="Required with hint">
        <Field label="Project name" required hint="Used for display and URL generation">
          <Input placeholder="Enter project name" />
        </Field>
      </DemoGroup>
    </div>
  );
}

function DropdownDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Flat options">
        <Dropdown
          placeholder="Select a color"
          aria-label="Color"
          options={[
            { value: "red",    text: "Red" },
            { value: "green",  text: "Green" },
            { value: "blue",   text: "Blue" },
            { value: "purple", text: "Purple", disabled: true },
          ]}
        />
      </DemoGroup>
      <DemoGroup title="Grouped options">
        <Dropdown
          placeholder="Select a fruit"
          aria-label="Fruit"
          groups={[
            { label: "Citrus",  options: [{ value: "orange", text: "Orange" }, { value: "lemon", text: "Lemon" }] },
            { label: "Berries", options: [{ value: "strawberry", text: "Strawberry" }, { value: "blueberry", text: "Blueberry" }] },
          ]}
        />
      </DemoGroup>
      <DemoGroup title="Appearances">
        <div style={col}>
          <Dropdown placeholder="outline (default)" aria-label="Outline" options={[{ value: "a", text: "Option A" }, { value: "b", text: "Option B" }]} />
          <Dropdown placeholder="underline" aria-label="Underline" appearance="underline" options={[{ value: "a", text: "Option A" }, { value: "b", text: "Option B" }]} />
          <Dropdown placeholder="filled-darker" aria-label="Filled darker" appearance="filled-darker" options={[{ value: "a", text: "Option A" }, { value: "b", text: "Option B" }]} />
        </div>
      </DemoGroup>
      <DemoGroup title="Disabled">
        <Dropdown placeholder="Disabled dropdown" aria-label="Disabled" disabled options={[{ value: "a", text: "Option A" }]} />
      </DemoGroup>
    </div>
  );
}

function TimePickerDemo() {
  const [time12, setTime12] = useState<Date | null>(null);
  return (
    <div style={col}>
      <DemoGroup title="12-hour clock">
        <TimePicker
          label="Meeting time"
          hourCycle={12}
          placeholder="Select time"
          onTimeChange={(d) => setTime12(d)}
        />
        {time12 && <Caption color="subtle">Selected: {time12.toLocaleTimeString()}</Caption>}
      </DemoGroup>
      <DemoGroup title="24-hour clock (30-min steps)">
        <TimePicker label="Start time" hourCycle={24} increment={30} placeholder="hh:mm" />
      </DemoGroup>
      <DemoGroup title="Business hours only (09:00–17:00)">
        <TimePicker label="Business hours" startHour={9} endHour={17} increment={60} placeholder="09:00 – 17:00" />
      </DemoGroup>
      <DemoGroup title="Appearances">
        <div style={col}>
          <TimePicker label="Outline" appearance="outline" placeholder="outline" />
          <TimePicker label="Underline" appearance="underline" placeholder="underline" />
          <TimePicker label="Filled darker" appearance="filled-darker" placeholder="filled-darker" />
        </div>
      </DemoGroup>
      <DemoGroup title="Validation states">
        <div style={col}>
          <TimePicker label="Required" required placeholder="Required field" />
          <TimePicker label="Disabled" disabled placeholder="Disabled" />
        </div>
      </DemoGroup>
    </div>
  );
}

function ColorPickerDemo() {
  const [color, setColor] = useState("#117865");
  return (
    <div style={col}>
      <DemoGroup title="Interactive color picker">
        <div style={row}>
          <DSColorPicker color={color} onChange={setColor} />
          <div style={{
            padding: "8px 16px", borderRadius: 6,
            background: color, color: "#fff",
            alignSelf: "flex-start", fontSize: 13, fontFamily: "monospace",
            boxShadow: tokens.shadow4,
          }}>
            {color}
          </div>
        </div>
      </DemoGroup>
      <DemoGroup title="With alpha slider">
        <DSColorPicker color={color} onChange={setColor} showAlpha />
      </DemoGroup>
    </div>
  );
}

function SwatchPickerDemo() {
  const [selected, setSelected] = useState("teal");
  const brandSwatches = [
    { value: "teal",   color: "#117865", label: "Teal"   },
    { value: "blue",   color: "#0078d4", label: "Blue"   },
    { value: "purple", color: "#8764b8", label: "Purple" },
    { value: "red",    color: "#d13438", label: "Red"    },
    { value: "orange", color: "#ca5010", label: "Orange" },
    { value: "yellow", color: "#dcb900", label: "Yellow" },
    { value: "green",  color: "#107c10", label: "Green"  },
    { value: "grey",   color: "#605e5c", label: "Grey"   },
  ];
  return (
    <div style={col}>
      <DemoGroup title={`Selected: ${selected}`}>
        <DSSwatchPicker
          swatches={brandSwatches}
          selectedValue={selected}
          onValueChange={setSelected}
          size="large"
          shape="rounded"
        />
      </DemoGroup>
      <DemoGroup title="Sizes">
        <div style={col}>
          {(["small", "medium", "large"] as const).map(sz => (
            <div key={sz} style={row}>
              <span style={{ minWidth: 72, fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>{sz}</span>
              <DSSwatchPicker swatches={brandSwatches.slice(0, 5)} size={sz} />
            </div>
          ))}
        </div>
      </DemoGroup>
      <DemoGroup title="Shapes">
        <div style={col}>
          {(["square", "rounded", "circular"] as const).map(shape => (
            <div key={shape} style={row}>
              <span style={{ minWidth: 72, fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>{shape}</span>
              <DSSwatchPicker swatches={brandSwatches.slice(0, 5)} shape={shape} />
            </div>
          ))}
        </div>
      </DemoGroup>
    </div>
  );
}

function ListDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Unordered list">
        <List>
          <ListItem>Design tokens — spacing, color, typography</ListItem>
          <ListItem>74 production-ready components</ListItem>
          <ListItem>Light and dark theme support</ListItem>
          <ListItem>WCAG 2.1 AA accessibility compliance</ListItem>
        </List>
      </DemoGroup>
      <DemoGroup title="In a card">
        <Card style={{ padding: 16, maxWidth: 320 }}>
          <Heading level={4}>Release highlights</Heading>
          <List>
            <ListItem>Added TimePicker and ColorPicker</ListItem>
            <ListItem>Fixed NavDrawer scroll behavior</ListItem>
            <ListItem>Brand token updated to teal #117865</ListItem>
          </List>
        </Card>
      </DemoGroup>
    </div>
  );
}

function TableDemo() {
  const rows = [
    { id: "1", name: "Alice Chen",   role: "Designer", dept: "UX"       },
    { id: "2", name: "Bob Smith",    role: "Engineer", dept: "Frontend"  },
    { id: "3", name: "Carol Jones",  role: "PM",       dept: "Product"   },
  ];
  return (
    <div style={col}>
      <DemoGroup title="Basic table primitives">
        <Table aria-label="Team members">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Department</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(r => (
              <TableRow key={r.id}>
                <TableCell><TableCellLayout>{r.name}</TableCellLayout></TableCell>
                <TableCell><TableCellLayout>{r.role}</TableCellLayout></TableCell>
                <TableCell><TableCellLayout>{r.dept}</TableCellLayout></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DemoGroup>
      <DemoGroup title="Density sizes">
        <div style={col}>
          {(["extra-small", "small", "medium"] as const).map(size => (
            <div key={size}>
              <Caption color="subtle">{size}</Caption>
              <Table size={size} aria-label={`${size} table`}>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Role</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.slice(0, 2).map(r => (
                    <TableRow key={r.id}>
                      <TableCell><TableCellLayout>{r.name}</TableCellLayout></TableCell>
                      <TableCell><TableCellLayout>{r.role}</TableCellLayout></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </DemoGroup>
    </div>
  );
}

function CarouselDemo() {
  const slides = [
    {
      id: "s1",
      content: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "32px 24px" }}>
          <Icon icon={<Star20Regular />} size={40} color="brand" />
          <Heading level={3}>Design Tokens</Heading>
          <div style={{ textAlign: "center" }}>
            <Body size="sm" color="subtle">A complete token system with semantic naming, light/dark themes, and teal brand palette.</Body>
          </div>
        </div>
      ),
    },
    {
      id: "s2",
      content: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "32px 24px" }}>
          <Icon icon={<Checkmark20Regular />} size={40} color="success" />
          <Heading level={3}>74 Components</Heading>
          <div style={{ textAlign: "center" }}>
            <Body size="sm" color="subtle">Production-ready Fluent 2 components with full TypeScript support and accessibility.</Body>
          </div>
        </div>
      ),
    },
    {
      id: "s3",
      content: (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "32px 24px" }}>
          <Icon icon={<DocumentText20Regular />} size={40} color="brand" />
          <Heading level={3}>Figma Library</Heading>
          <div style={{ textAlign: "center" }}>
            <Body size="sm" color="subtle">Matching Figma design library with variables, components, and auto-layout patterns.</Body>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div style={col}>
      <DemoGroup title="With nav dots + prev/next">
        <div style={{ border: `1px solid ${tokens.colorNeutralStroke1}`, borderRadius: tokens.borderRadiusMedium, overflow: "hidden" }}>
          <DSCarousel aria-label="Feature highlights" slides={slides} showNav showButtons />
        </div>
      </DemoGroup>
    </div>
  );
}

function NavDrawerDemo() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("dashboard");
  const items: DSNavItem[] = [
    { id: "dashboard",  label: "Dashboard",   icon: <DocumentText20Regular /> },
    { id: "components", label: "Components",  icon: <Star20Regular />         },
    { id: "patterns",   label: "Patterns",    icon: <Copy20Regular />         },
    { id: "div1",       label: "",            type: "divider"                 },
    { id: "sec1",       label: "Settings",    type: "section-header"          },
    { id: "settings",   label: "Preferences", icon: <Settings20Regular />     },
    { id: "about",      label: "About",       icon: <Alert20Regular />        },
  ];
  return (
    <div style={col}>
      <DemoGroup title="Overlay drawer (click hamburger)">
        <div style={row}>
          <Hamburger onClick={() => setOpen(true)} aria-expanded={open} />
          <Body size="sm" color="subtle">Click to open overlay nav</Body>
        </div>
        <DSNavDrawer
          open={open}
          onOpenChange={setOpen}
          type="overlay"
          items={items}
          selectedValue={selected}
          onNavItemSelect={setSelected}
          header={<div style={{ padding: "16px 16px 8px", fontWeight: 600, fontSize: tokens.fontSizeBase300 }}>Design System</div>}
        />
      </DemoGroup>
      <DemoGroup title="Inline drawer (persistent)">
        <div style={{
          height: 260,
          border: `1px solid ${tokens.colorNeutralStroke1}`,
          borderRadius: tokens.borderRadiusMedium,
          overflow: "hidden",
          display: "flex",
        }}>
          <DSNavDrawer
            open={true}
            type="inline"
            items={items}
            selectedValue={selected}
            onNavItemSelect={setSelected}
          />
          <div style={{ flex: 1, padding: 16 }}>
            <Body size="sm" color="subtle">Active: <strong>{selected}</strong></Body>
          </div>
        </div>
      </DemoGroup>
    </div>
  );
}

function HamburgerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={col}>
      <DemoGroup title={`Toggle — ${open ? "Open" : "Closed"}`}>
        <div style={row}>
          <Hamburger onClick={() => setOpen(o => !o)} aria-expanded={open} />
          <Body size="sm" color="subtle">{open ? "Nav is open" : "Nav is closed"}</Body>
        </div>
      </DemoGroup>
      <DemoGroup title="Sizes">
        <div style={row}>
          {(["small", "medium", "large"] as const).map(sz => (
            <div key={sz} style={{ ...col, alignItems: "center" }}>
              <Hamburger size={sz} aria-expanded={false} />
              <Caption color="subtle">{sz}</Caption>
            </div>
          ))}
        </div>
      </DemoGroup>
    </div>
  );
}

function OverflowDemo() {
  const navItems = ["Home", "Dashboard", "Analytics", "Reports", "Users", "Billing", "Settings", "Docs", "Changelog"];
  return (
    <div style={col}>
      <DemoGroup title="Responsive row — items hidden when container is narrow">
        <div style={{ border: `1px solid ${tokens.colorNeutralStroke1}`, borderRadius: tokens.borderRadiusMedium, padding: 4, maxWidth: 380, overflow: "hidden" }}>
          <OverflowWrapper style={{ gap: 2 }}>
            {navItems.map(item => (
              <OverflowItem key={item} id={item}>
                <Button appearance="subtle" size="small">{item}</Button>
              </OverflowItem>
            ))}
          </OverflowWrapper>
        </div>
        <Caption color="subtle">Items beyond the container width are hidden. Wrap with a custom "…more" menu using useOverflowMenu.</Caption>
      </DemoGroup>
    </div>
  );
}

function PortalDemo() {
  const [show, setShow] = useState(false);
  return (
    <div style={col}>
      <DemoGroup title="Renders outside the parent DOM tree">
        <div style={row}>
          <Button appearance="secondary" onClick={() => setShow(s => !s)}>
            {show ? "Hide portal" : "Show portal"}
          </Button>
        </div>
        <Body size="sm" color="subtle">
          The banner below is rendered via Portal into document.body — it is not a descendant of this panel in the DOM.
        </Body>
        {show && (
          <Portal>
            <div style={{
              position: "fixed", bottom: 24, right: 24, zIndex: 9999,
              background: tokens.colorBrandBackground,
              color: tokens.colorNeutralForegroundOnBrand,
              padding: "12px 16px", borderRadius: 8, boxShadow: tokens.shadow16,
              display: "flex", alignItems: "center", gap: 12, fontSize: 14,
            }}>
              Rendered via Portal (document.body)
              <Button
                appearance="subtle"
                size="small"
                onClick={() => setShow(false)}
                style={{ color: tokens.colorNeutralForegroundOnBrand }}
              >
                ✕
              </Button>
            </div>
          </Portal>
        )}
      </DemoGroup>
    </div>
  );
}

function LabelDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Sizes">
        <div style={col}>
          <Label size="small">Small label</Label>
          <Label size="medium">Medium label (default)</Label>
          <Label size="large">Large label</Label>
        </div>
      </DemoGroup>
      <DemoGroup title="Required + disabled">
        <div style={col}>
          <Label required>Required field *</Label>
          <Label required="(required — must be unique)">Custom required text</Label>
          <Label disabled>Disabled label</Label>
        </div>
      </DemoGroup>
      <DemoGroup title="Font weight">
        <div style={row}>
          <Label weight="regular">Regular weight</Label>
          <Label weight="semibold">Semibold weight</Label>
        </div>
      </DemoGroup>
      <DemoGroup title="Associated with input (htmlFor)">
        <div style={col}>
          <Label htmlFor="demo-label-input" required>Display name</Label>
          <Input id="demo-label-input" placeholder="Jane Smith" />
        </div>
      </DemoGroup>
    </div>
  );
}

function InputDemo() {
  const [val, setVal] = useState("");
  return (
    <div style={col}>
      <DemoGroup title="Appearances">
        <div style={col}>
          <Input placeholder="outline (default)" appearance="outline" />
          <Input placeholder="underline" appearance="underline" />
          <Input placeholder="filled-darker" appearance="filled-darker" />
          <Input placeholder="filled-lighter" appearance="filled-lighter" />
        </div>
      </DemoGroup>
      <DemoGroup title="Content slots (before / after)">
        <div style={col}>
          <Input
            placeholder="Search…"
            contentBefore={<Search20Regular style={{ fontSize: 16 }} />}
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <Input
            placeholder="Amount"
            contentBefore={<span style={{ fontSize: 14 }}>$</span>}
            contentAfter={<span style={{ fontSize: 12, color: tokens.colorNeutralForeground3 }}>USD</span>}
          />
        </div>
      </DemoGroup>
      <DemoGroup title="Sizes">
        <div style={col}>
          <Input size="small" placeholder="Small" />
          <Input size="medium" placeholder="Medium (default)" />
          <Input size="large" placeholder="Large" />
        </div>
      </DemoGroup>
      <DemoGroup title="States">
        <div style={col}>
          <Input placeholder="Disabled" disabled />
          <Input defaultValue="Read only value" readOnly />
          <Input type="password" defaultValue="mysecretpassword" />
        </div>
      </DemoGroup>
    </div>
  );
}

function ListboxDemo() {
  return (
    <div style={col}>
      <DemoGroup title="Basic options">
        <Listbox aria-label="Color options">
          <Option value="red">Red</Option>
          <Option value="green">Green</Option>
          <Option value="blue">Blue</Option>
          <Option value="purple" disabled>Purple (disabled)</Option>
          <Option value="orange">Orange</Option>
        </Listbox>
      </DemoGroup>
      <DemoGroup title="Grouped options">
        <Listbox aria-label="Fruit picker">
          <OptionGroup label="Citrus">
            <Option value="orange">Orange</Option>
            <Option value="lemon">Lemon</Option>
            <Option value="lime">Lime</Option>
          </OptionGroup>
          <OptionGroup label="Berries">
            <Option value="strawberry">Strawberry</Option>
            <Option value="blueberry">Blueberry</Option>
          </OptionGroup>
        </Listbox>
      </DemoGroup>
    </div>
  );
}

function AnnounceProviderInner() {
  const { announce } = useAnnounce();
  const [log, setLog] = useState<string[]>([]);
  const fire = (msg: string, polite: boolean) => {
    announce(msg, { alert: !polite });
    setLog(l => [...l.slice(-4), msg]);
  };
  return (
    <div style={col}>
      <DemoGroup title="Trigger live-region announcements">
        <div style={row}>
          <Button appearance="secondary" size="small" onClick={() => fire("File saved successfully", true)}>
            Polite: saved
          </Button>
          <Button appearance="subtle" size="small" onClick={() => fire("Error: Connection lost", false)}>
            Assertive: error
          </Button>
          <Button appearance="subtle" size="small" onClick={() => fire("5 items deleted", true)}>
            Polite: deleted
          </Button>
        </div>
        {log.length > 0 && (
          <div style={{ border: `1px solid ${tokens.colorNeutralStroke1}`, borderRadius: 6, padding: 10 }}>
            <Caption color="subtle">Announced (screen-reader live region):</Caption>
            {log.map((msg, i) => <Body key={i} size="sm">• {msg}</Body>)}
          </div>
        )}
      </DemoGroup>
      <DemoGroup title="Usage">
        <Body size="sm" color="subtle">
          Wrap your app root with AnnounceProvider, then call useAnnounce() from any child to push polite or assertive messages to screen readers without visual output.
        </Body>
      </DemoGroup>
    </div>
  );
}
function AnnounceProviderDemo() {
  return (
    <AriaLiveAnnouncer>
      <AnnounceProviderInner />
    </AriaLiveAnnouncer>
  );
}

// ─── Master map ───────────────────────────────────────────────────────────────

export const COMPONENT_DEMOS: Record<string, React.ReactNode> = {
  "button":        <ButtonDemo />,
  "text-field":    <TextFieldDemo />,
  "textarea":      <TextareaDemo />,
  "select":        <SelectDemo />,
  "combobox":      <ComboboxDemo />,
  "checkbox":      <CheckboxDemo />,
  "radio-group":   <RadioGroupDemo />,
  "switch":        <SwitchDemo />,
  "slider":        <SliderDemo />,
  "date-picker":   <DatePickerDemo />,
  "file-upload":   <FileUploadDemo />,
  "search-input":  <SearchInputDemo />,
  "status-badge":  <StatusBadgeDemo />,
  "progress-bar":  <ProgressBarDemo />,
  "message-bar":   <MessageBarDemo />,
  "toast":         <ToastDemo />,
  "spinner":       <SpinnerDemo />,
  "skeleton":      <SkeletonDemo />,
  "side-nav":      <SideNavDemo />,
  "tabs":          <TabsDemo />,
  "accordion":     <AccordionDemo />,
  "stepper":       <StepperDemo />,
  "page-header":   <PageHeaderDemo />,
  "drawer":        <DrawerDemo />,
  "popover":       <PopoverDemo />,
  "tooltip":       <TooltipDemo />,
  "confirm-dialog":<ConfirmDialogDemo />,
  "data-table":    <DataTableDemo />,
  "data-card":     <DataCardDemo />,
  "card":          <CardDemo />,
  "persona":       <PersonaDemo />,
  "user-avatar":   <UserAvatarDemo />,
  "icon":          <IconDemo />,
  "tag":           <TagDemo />,
  "divider":       <DividerDemo />,
  "empty-state":   <EmptyStateDemo />,
  "typography":    <TypographyDemo />,

  // ── Previously missing demos ──────────────────────────────────────────────
  "badge":            <BadgeDemo />,
  "field":            <FieldDemo />,
  "dropdown":         <DropdownDemo />,
  "time-picker":      <TimePickerDemo />,
  "color-picker":     <ColorPickerDemo />,
  "swatch-picker":    <SwatchPickerDemo />,
  "list":             <ListDemo />,
  "table":            <TableDemo />,
  "carousel":         <CarouselDemo />,
  "nav-drawer":       <NavDrawerDemo />,
  "hamburger":        <HamburgerDemo />,
  "overflow":         <OverflowDemo />,
  "portal":           <PortalDemo />,
  "label":            <LabelDemo />,
  "input":            <InputDemo />,
  "listbox":          <ListboxDemo />,
  "announce-provider":<AnnounceProviderDemo />,

  // ── Phase Next ──────────────────────────────────────────────────────────────
  "link":            <LinkDemo />,
  "toggle-button":   <ToggleButtonDemo />,
  "compound-button": <CompoundButtonDemo />,
  "menu":            <MenuDemo />,
  "menu-button":     <MenuButtonDemo />,
  "split-button":    <SplitButtonDemo />,
  "toolbar":         <ToolbarDemo />,
  "dialog":          <DialogDemo />,
  "breadcrumb":      <BreadcrumbDemo />,
  "info-label":      <InfoLabelDemo />,
  "spin-button":     <SpinButtonDemo />,
  "tag-picker":      <TagPickerDemo />,
  "counter-badge":   <CounterBadgeDemo />,
  "presence-badge":  <PresenceBadgeDemo />,
  "avatar-group":    <AvatarGroupDemo />,
  "rating":          <RatingDemo />,
  "tree":            <TreeDemo />,
  "interaction-tag": <InteractionTagDemo />,
  "image":           <ImageDemo />,
  "teaching-popover":<TeachingPopoverDemo />,
};
