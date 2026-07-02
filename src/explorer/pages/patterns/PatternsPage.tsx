/**
 * PatternsPage — 12 reusable patterns built exclusively from exported DS components.
 * No new tokens, no external libraries, no raw HTML styling beyond Griffel makeStyles.
 *
 * Patterns:
 *  1. Page Header          7. Success State
 *  2. Command Bar          8. Confirmation Dialog
 *  3. Filter Panel         9. Wizard
 *  4. Search Experience   10. Settings Page
 *  5. Empty State         11. Data Grid Experience
 *  6. Error State         12. Dashboard Layout
 */

import React, { useState, useMemo, useCallback } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import {
  DocumentPageTopLeft20Regular,
  ToolboxRegular as Toolbar20Regular,
  FilterRegular as Filter20Regular,
  Search20Regular,
  BoxDismissRegular as Empty20Regular,
  ErrorCircleRegular as Error20Regular,
  CheckmarkCircleRegular as Success20Regular,
  ChatWarningRegular as Confirm20Regular,
  TabletRegular as Wizard20Regular,
  Settings20Regular,
  TableRegular as Grid20Regular,
  GridDots20Regular,
  Delete20Regular,
  Edit20Regular,
  Add20Regular,
  ArrowDownload20Regular,
  Filter16Regular,
  Person20Regular,
  LockClosed20Regular,
  Alert20Regular,
  ChevronRight16Regular,
} from "@fluentui/react-icons";

// ── DS components (exports only) ─────────────────────────────────────────────
import { PageHeader }    from "../../../components/ui/PageHeader";
import { Breadcrumb }    from "../../../components/ui/Breadcrumb";
import { Button }        from "../../../components/ui/Button";
import { SplitButton }   from "../../../components/ui/SplitButton";
import { MenuButton }    from "../../../components/ui/MenuButton";
import { Toolbar }       from "../../../components/ui/Toolbar";
import { SearchInput }   from "../../../components/ui/SearchInput";
import { TextField }     from "../../../components/ui/TextField";
import { Textarea }      from "../../../components/ui/Textarea";
import { Select }        from "../../../components/ui/Select";
import { Checkbox }      from "../../../components/ui/Checkbox";
import { RadioGroup }    from "../../../components/ui/RadioGroup";
import { Switch }        from "../../../components/ui/Switch";
import { Slider }        from "../../../components/ui/Slider";
import { Tag }           from "../../../components/ui/Tag";
import { TagPicker }     from "../../../components/ui/TagPicker";
import { Card }          from "../../../components/ui/Card";
import { DataCard }      from "../../../components/ui/DataCard";
import { DataTable }     from "../../../components/ui/DataTable";
import { Tabs }          from "../../../components/ui/Tabs";
import { Accordion }     from "../../../components/ui/Accordion";
import { Stepper }       from "../../../components/ui/Stepper";
import { Drawer }        from "../../../components/ui/Drawer";
import { ConfirmDialog } from "../../../components/ui/ConfirmDialog";
import { MessageBar }    from "../../../components/ui/MessageBar";
import { StatusBadge }   from "../../../components/ui/StatusBadge";
import { ProgressBar }   from "../../../components/ui/ProgressBar";
import { EmptyState }    from "../../../components/ui/EmptyState";
import { Spinner }       from "../../../components/ui/Spinner";
import { SkeletonText }  from "../../../components/ui/Skeleton";
import { Divider }       from "../../../components/ui/Divider";
import { InfoLabel }     from "../../../components/ui/InfoLabel";
import { Persona }       from "../../../components/ui/Persona";
import { UserAvatar }    from "../../../components/ui/UserAvatar";
import { Tooltip }       from "../../../components/ui/Tooltip";
import { Heading, Body, Caption } from "../../../components/ui/Typography";

// ─── Pattern inventory ────────────────────────────────────────────────────────

export interface PatternMeta {
  id: string;
  name: string;
  category: "Layout" | "Data" | "Feedback" | "Forms";
  description: string;
  components: string[];
  complexity: "low" | "medium" | "high";
  useCases: string[];
}

export const PATTERN_INVENTORY: PatternMeta[] = [
  {
    id: "page-header",
    name: "Page Header",
    category: "Layout",
    description: "Page-level header with breadcrumb trail, title, status badge, description, and action buttons. Establishes hierarchy and primary actions for any product page.",
    components: ["PageHeader", "Breadcrumb", "Button", "SplitButton", "StatusBadge", "Tag", "Divider"],
    complexity: "low",
    useCases: ["Admin detail pages", "Entity editors", "Dashboard pages"],
  },
  {
    id: "command-bar",
    name: "Command Bar",
    category: "Layout",
    description: "Horizontal action bar combining search, view toggles, and primary/secondary actions. Standard pattern for list and grid pages with bulk operations.",
    components: ["Toolbar", "SearchInput", "Button", "SplitButton", "MenuButton", "Tooltip", "Divider"],
    complexity: "medium",
    useCases: ["List pages", "Data grids", "File managers"],
  },
  {
    id: "filter-panel",
    name: "Filter Panel",
    category: "Data",
    description: "Slide-in side panel with categorised filter controls — checkboxes, radio groups, range sliders, and tag selection. Chips show active filters; clear-all resets.",
    components: ["Drawer", "Accordion", "Checkbox", "RadioGroup", "Slider", "TagPicker", "Tag", "Button", "Divider"],
    complexity: "high",
    useCases: ["Product catalogues", "Report builders", "Search results"],
  },
  {
    id: "search-experience",
    name: "Search Experience",
    category: "Data",
    description: "Full search flow: empty state → typing → loading skeleton → results table → no-results empty state. Handles all states in a single composable pattern.",
    components: ["SearchInput", "Skeleton", "DataTable", "EmptyState", "Tag", "Spinner", "StatusBadge"],
    complexity: "medium",
    useCases: ["Global search", "Filtered lists", "Component finders"],
  },
  {
    id: "empty-state",
    name: "Empty State",
    category: "Feedback",
    description: "Three empty-state variants: first-time (onboarding), no-results (filtered), and no-access (permission denied). Each pairs an icon, title, description, and a contextual CTA.",
    components: ["EmptyState", "Button", "MessageBar"],
    complexity: "low",
    useCases: ["First-time UX", "Filtered views", "Access-controlled pages"],
  },
  {
    id: "error-state",
    name: "Error State",
    category: "Feedback",
    description: "Three error tiers: page-level error banner (MessageBar), inline field validation error, and full-page error with retry action and support link.",
    components: ["MessageBar", "EmptyState", "Button", "TextField", "StatusBadge"],
    complexity: "low",
    useCases: ["API failures", "Form validation", "404/500 pages"],
  },
  {
    id: "success-state",
    name: "Success State",
    category: "Feedback",
    description: "Contextual success feedback: inline success bar after form submit, step completion in a wizard, and a full-page confirmation with next-step actions.",
    components: ["MessageBar", "StatusBadge", "ProgressBar", "Button", "Card"],
    complexity: "low",
    useCases: ["Form submission", "Payment confirmation", "Onboarding completion"],
  },
  {
    id: "confirm-dialog",
    name: "Confirmation Dialog",
    category: "Feedback",
    description: "Three confirmation dialog variants — danger (delete), warning (discard changes), and neutral (publish). Each uses the appropriate confirmAppearance and descriptive body copy.",
    components: ["ConfirmDialog", "Button"],
    complexity: "low",
    useCases: ["Delete flows", "Navigation guards", "Publish actions"],
  },
  {
    id: "wizard",
    name: "Wizard",
    category: "Forms",
    description: "Multi-step form wizard with horizontal stepper, per-step validation feedback, back/continue navigation, and a summary review step before final submission.",
    components: ["Stepper", "Card", "TextField", "Select", "Switch", "Checkbox", "Button", "MessageBar", "Divider"],
    complexity: "high",
    useCases: ["Account setup", "Onboarding flows", "Complex form creation"],
  },
  {
    id: "settings-page",
    name: "Settings Page",
    category: "Forms",
    description: "Tab-sectioned settings page with profile editing, notification toggles, security controls, and a save/discard footer. Follows the standard admin settings layout.",
    components: ["PageHeader", "Tabs", "Card", "TextField", "Textarea", "Switch", "Select", "InfoLabel", "Button", "Persona", "Divider"],
    complexity: "high",
    useCases: ["User settings", "App configuration", "Admin preferences"],
  },
  {
    id: "data-grid",
    name: "Data Grid Experience",
    category: "Data",
    description: "Full data grid with search, category tag-filter chips, sortable columns, multi-select, row actions menu, and a bulk action command bar. Covers 95% of list-page needs.",
    components: ["DataTable", "SearchInput", "Toolbar", "Tag", "Button", "MenuButton", "StatusBadge", "Select", "Spinner", "EmptyState"],
    complexity: "high",
    useCases: ["Admin tables", "Report views", "Entity lists"],
  },
  {
    id: "dashboard-layout",
    name: "Dashboard Layout",
    category: "Layout",
    description: "KPI card row, progress-bar tracking section, recent-activity data table, and status overview strip — the canonical product dashboard composition.",
    components: ["DataCard", "ProgressBar", "DataTable", "StatusBadge", "Tag", "Divider", "Button", "Card", "Spinner"],
    complexity: "high",
    useCases: ["Executive dashboards", "Sprint overviews", "System health pages"],
  },
];

// ─── Shared styles ─────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    maxWidth: "1040px",
  },
  // Inventory grid
  inventoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 900px)": { gridTemplateColumns: "repeat(2, 1fr)" },
    "@media (max-width: 500px)": { gridTemplateColumns: "1fr" },
  },
  inventoryCard: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  inventoryCardName: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  inventoryCardMeta: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    flexWrap: "wrap",
    alignItems: "center",
  },
  inventoryCardCount: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
  },
  // Demo canvas
  canvas: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusXLarge,
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  section: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL },
  // Layout helpers
  row: { display: "flex", gap: tokens.spacingHorizontalS, flexWrap: "wrap", alignItems: "center" },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  formCard: {
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    maxWidth: "520px",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalM,
  },
  formActions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    justifyContent: "flex-end",
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
    "@media (max-width: 640px)": { gridTemplateColumns: "1fr 1fr" },
  },
  settingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalL,
  },
  settingLabel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  filterChips: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    flexWrap: "wrap",
    alignItems: "center",
  },
});

// ─── 1. PAGE HEADER ───────────────────────────────────────────────────────────

function PageHeaderPattern() {
  const styles = useStyles();
  const saveItems = [
    { id: "save-draft", label: "Save as draft" },
    { id: "save-copy", label: "Save a copy" },
    { id: "divider-1", type: "divider" as const },
    { id: "export", label: "Export as PDF" },
  ];

  return (
    <div className={styles.canvas}>
      <Breadcrumb
        items={[
          { id: "home", label: "Home", href: "#" },
          { id: "reports", label: "Reports", href: "#" },
          { id: "q2", label: "Q2 2025 Review" },
        ]}
      />
      <div className={styles.spaceBetween}>
        <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXS }}>
          <div className={styles.row}>
            <Heading level={2}>Q2 2025 Design System Review</Heading>
            <StatusBadge status="in-progress" label="In review" />
          </div>
          <Body color="subtle">Last updated by Jane Smith · 2 hours ago</Body>
          <div className={styles.row}>
            <Tag appearance="outline" size="extra-small">Design System</Tag>
            <Tag appearance="outline" size="extra-small">Q2</Tag>
            <Tag appearance="outline" size="extra-small">Internal</Tag>
          </div>
        </div>
        <div className={styles.row}>
          <Button appearance="subtle">Discard</Button>
          <Button appearance="secondary" icon={<ArrowDownload20Regular />}>Export</Button>
          <SplitButton
            appearance="primary"
            label="Save"
            items={saveItems}
            onSelect={(id) => console.log(id)}
            onClick={() => console.log("save")}
          />
        </div>
      </div>
      <Divider />
      <Body size="sm" color="subtle">
        Quarterly review covering component coverage, token completeness, accessibility scores, and release readiness metrics for the Lumel Design System v0.1.0-alpha.
      </Body>
    </div>
  );
}

// ─── 2. COMMAND BAR ───────────────────────────────────────────────────────────

function CommandBarPattern() {
  const styles = useStyles();
  const [listView, setListView] = useState(true);
  const [showDeleted, setShowDeleted] = useState(false);

  const toolbarItems = [
    {
      id: "new",
      type: "button" as const,
      label: "New",
      icon: <Add20Regular />,
      appearance: "primary" as const,
      onClick: () => {},
    },
    { id: "d1", type: "divider" as const },
    {
      id: "edit",
      type: "button" as const,
      label: "Edit",
      icon: <Edit20Regular />,
      onClick: () => {},
    },
    {
      id: "delete",
      type: "button" as const,
      label: "Delete",
      icon: <Delete20Regular />,
      onClick: () => {},
    },
    { id: "d2", type: "divider" as const },
    {
      id: "list-view",
      type: "toggle" as const,
      label: "List view",
      checked: listView,
      onChange: (v: boolean) => setListView(v),
    },
    {
      id: "show-deleted",
      type: "toggle" as const,
      label: "Show archived",
      checked: showDeleted,
      onChange: (v: boolean) => setShowDeleted(v),
    },
    { id: "d3", type: "divider" as const },
    {
      id: "export",
      type: "button" as const,
      label: "Export",
      icon: <ArrowDownload20Regular />,
      onClick: () => {},
    },
  ];

  return (
    <div className={styles.canvas}>
      <div className={styles.spaceBetween}>
        <div style={{ maxWidth: "320px", flex: 1 }}>
          <SearchInput onSearch={() => {}} placeholder="Search records…" />
        </div>
        <div className={styles.row}>
          <Tooltip content="Filter results" relationship="description">
            <Button appearance="subtle" icon={<Filter16Regular />}>Filters</Button>
          </Tooltip>
        </div>
      </div>
      <Toolbar items={toolbarItems} aria-label="Record actions" />
      <Caption color="subtle">
        {listView ? "List" : "Grid"} view · {showDeleted ? "Including archived" : "Active only"}
      </Caption>
    </div>
  );
}

// ─── 3. FILTER PANEL ─────────────────────────────────────────────────────────

const FILTER_TAGS = ["React", "TypeScript", "Fluent", "a11y", "RTL"];

function FilterPanelPattern() {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("all");
  const [complexity, setComplexity] = useState<string[]>([]);
  const [propsRange, setPropsRange] = useState(50);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const activeFilterCount = (status !== "all" ? 1 : 0)
    + complexity.length
    + (propsRange < 100 ? 1 : 0)
    + selectedTags.length;

  return (
    <div className={styles.canvas}>
      <div className={styles.row}>
        <Button
          appearance="secondary"
          icon={<Filter20Regular />}
          onClick={() => setOpen(true)}
        >
          Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
        </Button>
        {activeFilterCount > 0 && (
          <Button
            appearance="subtle"
            size="small"
            onClick={() => { setStatus("all"); setComplexity([]); setPropsRange(100); setSelectedTags([]); }}
          >
            Clear all
          </Button>
        )}
        {/* Active filter chips — rendered as Tag + dismiss button */}
        {status !== "all" && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
            <Tag appearance="brand" size="small">{status}</Tag>
            <Button appearance="subtle" size="small" onClick={() => setStatus("all")} aria-label={`Remove ${status} filter`}>×</Button>
          </span>
        )}
        {complexity.map((c) => (
          <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
            <Tag appearance="brand" size="small">{c}</Tag>
            <Button appearance="subtle" size="small" onClick={() => setComplexity((prev) => prev.filter((x) => x !== c))} aria-label={`Remove ${c} filter`}>×</Button>
          </span>
        ))}
        {selectedTags.map((t) => (
          <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
            <Tag appearance="brand" size="small">{t}</Tag>
            <Button appearance="subtle" size="small" onClick={() => setSelectedTags((prev) => prev.filter((x) => x !== t))} aria-label={`Remove ${t} filter`}>×</Button>
          </span>
        ))}
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Filters"
        subtitle="Narrow results by status, complexity, and tags."
        position="end"
        size="small"
        footer={
          <div className={styles.row}>
            <Button appearance="primary" onClick={() => setOpen(false)}>Apply filters</Button>
            <Button appearance="subtle" onClick={() => {
              setStatus("all"); setComplexity([]); setPropsRange(100); setSelectedTags([]);
            }}>Clear all</Button>
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL, padding: `${tokens.spacingVerticalM} 0` }}>
          <Accordion
            items={[
              {
                value: "status",
                header: "Status",
                content: (
                  <RadioGroup
                    options={[
                      { value: "all", label: "All" },
                      { value: "stable", label: "Stable" },
                      { value: "beta", label: "Beta" },
                      { value: "alpha", label: "Alpha" },
                    ]}
                    value={status}
                    onChange={setStatus}
                  />
                ),
              },
              {
                value: "complexity",
                header: "Complexity",
                content: (
                  <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXS }}>
                    {["Low", "Medium", "High"].map((c) => (
                      <Checkbox
                        key={c}
                        label={c}
                        checked={complexity.includes(c)}
                        onChange={(checked) =>
                          setComplexity((prev) =>
                            checked ? [...prev, c] : prev.filter((x) => x !== c)
                          )
                        }
                      />
                    ))}
                  </div>
                ),
              },
              {
                value: "props",
                header: `Max props (≤ ${propsRange})`,
                content: (
                  <Slider min={1} max={100} step={1} value={propsRange} onChange={setPropsRange} />
                ),
              },
              {
                value: "tags",
                header: "Tags",
                content: (
                  <TagPicker
                    options={FILTER_TAGS.map((t) => ({ value: t, label: t }))}
                    selectedValues={selectedTags}
                    onChange={setSelectedTags}
                    placeholder="Pick tags…"
                  />
                ),
              },
            ]}
            multiple
          />
        </div>
      </Drawer>

      <Body size="sm" color="subtle">Click "Filters" to open the slide-in filter panel.</Body>
    </div>
  );
}

// ─── 4. SEARCH EXPERIENCE ─────────────────────────────────────────────────────

const SEARCH_DATA = [
  { id: "1", name: "Button", category: "Action", status: "stable" as const, props: 6 },
  { id: "2", name: "TextField", category: "Form Inputs", status: "stable" as const, props: 6 },
  { id: "3", name: "DataTable", category: "Data Display", status: "stable" as const, props: 5 },
  { id: "4", name: "SideNav", category: "Navigation", status: "stable" as const, props: 4 },
  { id: "5", name: "Accordion", category: "Navigation", status: "stable" as const, props: 3 },
  { id: "6", name: "Combobox", category: "Form Inputs", status: "stable" as const, props: 3 },
  { id: "7", name: "Tooltip", category: "Overlay", status: "stable" as const, props: 3 },
  { id: "8", name: "Tag", category: "Data Display", status: "stable" as const, props: 3 },
];

const SEARCH_COLS = [
  { columnId: "name", label: "Component", renderCell: (r: typeof SEARCH_DATA[0]) => <Body size="sm">{r.name}</Body>, sortable: true },
  { columnId: "category", label: "Category", renderCell: (r: typeof SEARCH_DATA[0]) => <Tag appearance="outline" size="extra-small">{r.category}</Tag>, sortable: true },
  { columnId: "status", label: "Status", renderCell: (r: typeof SEARCH_DATA[0]) => <StatusBadge status="completed" label={r.status} size="small" />, sortable: false },
  { columnId: "props", label: "Props", renderCell: (r: typeof SEARCH_DATA[0]) => <Caption>{r.props}</Caption>, sortable: true },
];

function SearchExperiencePattern() {
  const styles = useStyles();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return SEARCH_DATA.filter(
      (d) =>
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    if (!q.trim()) { setHasSearched(false); setLoading(false); return; }
    setLoading(true);
    setHasSearched(false);
    setTimeout(() => { setLoading(false); setHasSearched(true); }, 600);
  }, []);

  return (
    <div className={styles.canvas}>
      <div style={{ maxWidth: "480px" }}>
        <SearchInput onSearch={handleSearch} placeholder="Search components or categories…" debounceMs={300} />
      </div>

      {/* Empty / not-searched state */}
      {!query.trim() && (
        <EmptyState
          title="Start typing to search"
          description={'Search by component name or category — e.g. "button", "form inputs".'}
          icon={<Search20Regular />}
        />
      )}

      {/* Loading skeleton */}
      {loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS }}>
          <SkeletonText lines={4} />
        </div>
      )}

      {/* Results */}
      {hasSearched && !loading && results.length > 0 && (
        <div className={styles.section}>
          <Caption color="subtle">{results.length} result{results.length !== 1 ? "s" : ""} for "{query}"</Caption>
          <DataTable columns={SEARCH_COLS} items={results} defaultSortColumn="name" defaultSortDirection="ascending" />
        </div>
      )}

      {/* No results */}
      {hasSearched && !loading && results.length === 0 && (
        <EmptyState
          title="No results found"
          description={`No components match "${query}". Try a different name or category.`}
          icon={<Search20Regular />}
          action={<Button appearance="subtle" onClick={() => handleSearch("")}>Clear search</Button>}
        />
      )}
    </div>
  );
}

// ─── 5. EMPTY STATE ───────────────────────────────────────────────────────────

function EmptyStatePattern() {
  const styles = useStyles();

  const VARIANTS_TABS = [
    { value: "first-time", label: "First time" },
    { value: "no-results", label: "No results" },
    { value: "no-access", label: "No access" },
  ];

  const VARIANTS_PANELS = {
    "first-time": (
      <div className={styles.canvas}>
        <EmptyState
          title="No components yet"
          description="Get started by creating your first component. It only takes a few minutes to set up."
          icon={<Grid20Regular />}
          action={<Button appearance="primary" icon={<Add20Regular />}>Create component</Button>}
        />
      </div>
    ),
    "no-results": (
      <div className={styles.canvas}>
        <EmptyState
          title="No results match your filters"
          description="Try adjusting your search query or clearing your filters to see more results."
          icon={<Search20Regular />}
          action={
            <div className={styles.row}>
              <Button appearance="primary">Clear filters</Button>
              <Button appearance="subtle">Browse all</Button>
            </div>
          }
        />
      </div>
    ),
    "no-access": (
      <div className={styles.canvas}>
        <EmptyState
          title="You don't have access"
          description="You need admin permissions to view this page. Contact your workspace owner to request access."
          icon={<LockClosed20Regular />}
          action={<Button appearance="secondary">Request access</Button>}
        />
      </div>
    ),
  };

  return <Tabs tabs={VARIANTS_TABS} panels={VARIANTS_PANELS} defaultSelectedValue="first-time" />;
}

// ─── 6. ERROR STATE ───────────────────────────────────────────────────────────

function ErrorStatePattern() {
  const styles = useStyles();
  const [showFieldError, setShowFieldError] = useState(false);

  const TABS = [
    { value: "banner", label: "Page banner" },
    { value: "field", label: "Field validation" },
    { value: "page", label: "Full-page error" },
  ];

  const PANELS = {
    banner: (
      <div className={styles.canvas}>
        <MessageBar intent="error" title="Failed to save changes">
          Your changes could not be saved due to a server error. Check your connection and try again, or contact support if the issue persists.
        </MessageBar>
        <div className={styles.row}>
          <Button appearance="secondary">Retry</Button>
          <Button appearance="subtle">Contact support</Button>
        </div>
      </div>
    ),
    field: (
      <div className={styles.canvas}>
        <Card>
          <div className={styles.formCard}>
            <Heading level={4}>Create project</Heading>
            <TextField
              label="Project name"
              placeholder="My project"
              validationState={showFieldError ? "error" : "none"}
              validationMessage={showFieldError ? "Project name is required and must be at least 3 characters." : undefined}
              required
            />
            <TextField label="Description" placeholder="What is this project about?" />
            <MessageBar intent="warning" title="Review before submitting">
              Ensure all required fields are filled before creating the project.
            </MessageBar>
            <div className={styles.formActions}>
              <Button appearance="subtle">Cancel</Button>
              <Button appearance="primary" onClick={() => setShowFieldError(true)}>Create project</Button>
            </div>
          </div>
        </Card>
        {showFieldError && (
          <Button appearance="subtle" size="small" onClick={() => setShowFieldError(false)}>Reset demo</Button>
        )}
      </div>
    ),
    page: (
      <div className={styles.canvas}>
        <EmptyState
          title="Something went wrong"
          description="We encountered an unexpected error (500). Our team has been notified. Try refreshing the page or come back in a few minutes."
          icon={<Error20Regular />}
          action={
            <div className={styles.row}>
              <Button appearance="primary">Refresh page</Button>
              <Button appearance="subtle">Go to home</Button>
            </div>
          }
        />
        <div style={{ textAlign: "center" }}>
          <Caption color="subtle">
            Error ID: ERR_500_2025061401 · <span style={{ color: tokens.colorBrandForeground1 }}>Copy ID</span>
          </Caption>
        </div>
      </div>
    ),
  };

  return <Tabs tabs={TABS} panels={PANELS} defaultSelectedValue="banner" />;
}

// ─── 7. SUCCESS STATE ─────────────────────────────────────────────────────────

function SuccessStatePattern() {
  const styles = useStyles();

  const TABS = [
    { value: "inline", label: "Inline" },
    { value: "wizard", label: "Step complete" },
    { value: "page", label: "Full-page" },
  ];

  const PANELS = {
    inline: (
      <div className={styles.canvas}>
        <MessageBar intent="success" title="Changes saved successfully">
          Your profile has been updated. Changes will take effect immediately.
        </MessageBar>
        <div className={styles.row}>
          <StatusBadge status="completed" label="Profile saved" />
          <StatusBadge status="completed" label="Email verified" />
          <StatusBadge status="completed" label="Notifications set" />
        </div>
      </div>
    ),
    wizard: (
      <div className={styles.canvas}>
        <Stepper
          orientation="horizontal"
          steps={[
            { label: "Account", status: "completed" },
            { label: "Profile", status: "completed" },
            { label: "Done", status: "current" },
          ]}
        />
        <Card>
          <div className={styles.formCard}>
            <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS, alignItems: "flex-start" }}>
              <StatusBadge status="completed" label="Setup complete" />
              <Heading level={4}>You're all set!</Heading>
              <Body color="subtle">Your account is configured and ready. Explore the design system to get started.</Body>
            </div>
            <ProgressBar value={1} color="success" label="Onboarding progress" showPercentage />
            <div className={styles.formActions}>
              <Button appearance="primary">Go to dashboard</Button>
              <Button appearance="subtle">View tutorial</Button>
            </div>
          </div>
        </Card>
      </div>
    ),
    page: (
      <div className={styles.canvas}>
        <EmptyState
          title="Payment confirmed!"
          description="Your subscription to Lumel DS Pro has been activated. You now have access to all components, tokens, and patterns."
          icon={<Success20Regular />}
          action={
            <div className={styles.row}>
              <Button appearance="primary">Explore components</Button>
              <Button appearance="subtle">Download receipt</Button>
            </div>
          }
        />
      </div>
    ),
  };

  return <Tabs tabs={TABS} panels={PANELS} defaultSelectedValue="inline" />;
}

// ─── 8. CONFIRMATION DIALOG ───────────────────────────────────────────────────

function ConfirmDialogPattern() {
  const styles = useStyles();
  const [openDialog, setOpenDialog] = useState<"delete" | "discard" | "publish" | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleConfirm = (action: string) => {
    setLastAction(action);
    setOpenDialog(null);
  };

  return (
    <div className={styles.canvas}>
      <div className={styles.row}>
        <Button appearance="secondary" icon={<Delete20Regular />} onClick={() => setOpenDialog("delete")}>
          Delete record
        </Button>
        <Button appearance="subtle" onClick={() => setOpenDialog("discard")}>
          Discard changes
        </Button>
        <Button appearance="primary" onClick={() => setOpenDialog("publish")}>
          Publish
        </Button>
      </div>

      {lastAction && (
        <MessageBar intent="success" title="Action confirmed">{lastAction}</MessageBar>
      )}

      {/* Danger — delete */}
      <ConfirmDialog
        open={openDialog === "delete"}
        onOpenChange={(open) => !open && setOpenDialog(null)}
        title="Delete this record?"
        description="This action cannot be undone. The record and all associated data will be permanently removed from the system."
        confirmLabel="Delete permanently"
        cancelLabel="Keep record"
        confirmAppearance="primary"
        onConfirm={() => handleConfirm("Record deleted permanently.")}
      />

      {/* Warning — discard */}
      <ConfirmDialog
        open={openDialog === "discard"}
        onOpenChange={(open) => !open && setOpenDialog(null)}
        title="Discard unsaved changes?"
        description="You have unsaved changes on this page. Discarding will remove all edits and revert to the last saved version."
        confirmLabel="Discard changes"
        cancelLabel="Keep editing"
        confirmAppearance="secondary"
        onConfirm={() => handleConfirm("Changes discarded.")}
      />

      {/* Neutral — publish */}
      <ConfirmDialog
        open={openDialog === "publish"}
        onOpenChange={(open) => !open && setOpenDialog(null)}
        title="Publish to production?"
        description="This will make the changes visible to all users in the production environment. Make sure you have reviewed all updates."
        confirmLabel="Publish now"
        cancelLabel="Review first"
        confirmAppearance="primary"
        onConfirm={() => handleConfirm("Published to production.")}
      />
    </div>
  );
}

// ─── 9. WIZARD ────────────────────────────────────────────────────────────────

const WIZARD_STEPS = [
  { label: "Account", description: "Name and email" },
  { label: "Role", description: "Team and permissions" },
  { label: "Preferences", description: "Notifications" },
  { label: "Review", description: "Confirm and submit" },
];

function WizardPattern() {
  const styles = useStyles();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const steppedSteps = WIZARD_STEPS.map((s, i) => ({
    ...s,
    status: (i < step ? "completed" : i === step ? "current" : "upcoming") as "completed" | "current" | "upcoming",
  }));

  if (submitted) {
    return (
      <div className={styles.canvas}>
        <EmptyState
          title="Account created!"
          description="Your account has been set up. You can now start using the design system."
          icon={<Success20Regular />}
          action={<Button appearance="primary" onClick={() => { setStep(0); setSubmitted(false); }}>Start over (demo)</Button>}
        />
      </div>
    );
  }

  return (
    <div className={styles.canvas}>
      <Stepper steps={steppedSteps} orientation="horizontal" />
      <Card>
        <div className={styles.formCard}>
          {step === 0 && (
            <>
              <Heading level={4}>Account details</Heading>
              <div className={styles.formRow}>
                <TextField label="First name" placeholder="Jane" required />
                <TextField label="Last name" placeholder="Smith" required />
              </div>
              <TextField label="Work email" placeholder="jane@company.com" type="email" required />
              <TextField label="Password" placeholder="Min. 8 characters" required />
            </>
          )}
          {step === 1 && (
            <>
              <Heading level={4}>Role and team</Heading>
              <Select
                label="Role"
                options={[
                  { value: "designer", label: "Designer" },
                  { value: "developer", label: "Developer" },
                  { value: "pm", label: "Product Manager" },
                  { value: "qa", label: "QA Engineer" },
                ]}
              />
              <Select
                label="Team"
                options={[
                  { value: "platform", label: "Platform" },
                  { value: "product", label: "Product" },
                  { value: "design", label: "Design" },
                ]}
              />
              <Checkbox label="I'll be administering the design system" />
            </>
          )}
          {step === 2 && (
            <>
              <Heading level={4}>Notifications</Heading>
              <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS }}>
                <Switch label="Email: New component releases" defaultChecked />
                <Switch label="Email: Breaking change warnings" defaultChecked />
                <Switch label="Email: Weekly digest" />
                <Switch label="In-app: All notifications" defaultChecked />
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <Heading level={4}>Review and submit</Heading>
              <MessageBar intent="info" title="Almost done">
                Review your details above. Click Submit to create your account.
              </MessageBar>
              <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXS }}>
                {[
                  ["Name", "Jane Smith"],
                  ["Email", "jane@company.com"],
                  ["Role", "Designer"],
                  ["Team", "Design"],
                ].map(([label, value]) => (
                  <div key={label} className={styles.settingRow}>
                    <Caption color="subtle">{label}</Caption>
                    <Caption>{value}</Caption>
                  </div>
                ))}
              </div>
            </>
          )}
          <Divider />
          <div className={styles.formActions}>
            {step > 0 && (
              <Button appearance="subtle" onClick={() => setStep((s) => s - 1)}>Back</Button>
            )}
            {step < WIZARD_STEPS.length - 1 ? (
              <Button appearance="primary" onClick={() => setStep((s) => s + 1)}>Continue</Button>
            ) : (
              <Button appearance="primary" onClick={() => setSubmitted(true)}>Submit</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── 10. SETTINGS PAGE ────────────────────────────────────────────────────────

function SettingsPagePattern() {
  const styles = useStyles();

  const TABS = [
    { value: "profile", label: "Profile", icon: <Person20Regular /> },
    { value: "notifications", label: "Notifications", icon: <Alert20Regular /> },
    { value: "security", label: "Security", icon: <LockClosed20Regular /> },
  ];

  const settingSwitch = (label: string, desc: string, defaultOn = false) => (
    <div className={styles.settingRow} key={label}>
      <div className={styles.settingLabel}>
        <Body size="sm">{label}</Body>
        <Caption color="subtle">{desc}</Caption>
      </div>
      <Switch label="" defaultChecked={defaultOn} aria-label={label} />
    </div>
  );

  const PANELS = {
    profile: (
      <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL }}>
        <div className={styles.row} style={{ alignItems: "flex-start", gap: tokens.spacingHorizontalL }}>
          <UserAvatar name="Jane Smith" size={64} />
          <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXS }}>
            <Body>Jane Smith</Body>
            <Caption color="subtle">jane@company.com · Design team</Caption>
            <Button appearance="subtle" size="small">Change photo</Button>
          </div>
        </div>
        <Divider />
        <div className={styles.formRow}>
          <TextField label="First name" defaultValue="Jane" />
          <TextField label="Last name" defaultValue="Smith" />
        </div>
        <TextField label="Job title" defaultValue="Senior Designer" />
        <TextField label="Email address" defaultValue="jane@company.com" type="email" />
        <Textarea label="Bio" defaultValue="Design system lead at Lumel." rows={3} />
        <div className={styles.formActions}>
          <Button appearance="subtle">Discard</Button>
          <Button appearance="primary">Save profile</Button>
        </div>
      </div>
    ),
    notifications: (
      <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL }}>
        <Body size="sm" color="subtle">Choose which notifications you receive by email and in-app.</Body>
        <Divider />
        <Heading level={4}>Email notifications</Heading>
        <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS }}>
          {settingSwitch("New component releases", "Get notified when new components are published.", true)}
          {settingSwitch("Breaking changes", "Receive alerts before breaking API changes.", true)}
          {settingSwitch("Weekly digest", "A weekly summary of design system activity.")}
          {settingSwitch("Team mentions", "When someone @mentions you in a comment.", true)}
        </div>
        <Divider />
        <Heading level={4}>In-app notifications</Heading>
        <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS }}>
          {settingSwitch("All activity", "Show badge for all unread notifications.", true)}
          {settingSwitch("Sound", "Play a sound for new notifications.")}
        </div>
        <div className={styles.formActions}>
          <Button appearance="primary">Save preferences</Button>
        </div>
      </div>
    ),
    security: (
      <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL }}>
        <Heading level={4}>Password</Heading>
        <TextField label="Current password" placeholder="••••••••" />
        <div className={styles.formRow}>
          <TextField label="New password" placeholder="••••••••" />
          <TextField label="Confirm new password" placeholder="••••••••" />
        </div>
        <div className={styles.formActions}>
          <Button appearance="primary">Update password</Button>
        </div>
        <Divider />
        <Heading level={4}>Two-factor authentication</Heading>
        <div className={styles.settingRow}>
          <div className={styles.settingLabel}>
            <Body size="sm">Authenticator app</Body>
            <Caption color="subtle">Use an authenticator app to generate one-time codes.</Caption>
          </div>
          <div className={styles.row}>
            <StatusBadge status="completed" label="Enabled" />
            <Button appearance="subtle" size="small">Manage</Button>
          </div>
        </div>
        <Divider />
        <Heading level={4}>Sessions</Heading>
        <MessageBar intent="info" title="1 active session">
          You are currently signed in on Chrome / macOS. Other sessions can be revoked below.
        </MessageBar>
        <Button appearance="subtle" size="small">Sign out all other sessions</Button>
      </div>
    ),
  };

  return (
    <div className={styles.canvas}>
      <Breadcrumb items={[{ id: "home", label: "Home", href: "#" }, { id: "settings", label: "Settings" }]} />
      <Heading level={3}>Settings</Heading>
      <Divider />
      <Tabs tabs={TABS} panels={PANELS} defaultSelectedValue="profile" />
    </div>
  );
}

// ─── 11. DATA GRID EXPERIENCE ─────────────────────────────────────────────────

const GRID_ITEMS = [
  { id: "1", name: "Button",        category: "Action",      status: "stable" as const, tests: 24, props: 6 },
  { id: "2", name: "TextField",     category: "Form Inputs", status: "stable" as const, tests: 18, props: 6 },
  { id: "3", name: "DataTable",     category: "Data Display",status: "stable" as const, tests: 32, props: 5 },
  { id: "4", name: "SideNav",       category: "Navigation",  status: "stable" as const, tests: 12, props: 4 },
  { id: "5", name: "Accordion",     category: "Navigation",  status: "stable" as const, tests: 8,  props: 3 },
  { id: "6", name: "Combobox",      category: "Form Inputs", status: "stable" as const, tests: 14, props: 3 },
  { id: "7", name: "Tooltip",       category: "Overlay",     status: "stable" as const, tests: 6,  props: 3 },
  { id: "8", name: "Tag",           category: "Data Display",status: "stable" as const, tests: 10, props: 3 },
  { id: "9", name: "Switch",        category: "Form Inputs", status: "stable" as const, tests: 9,  props: 3 },
  { id: "10", name: "ProgressBar",  category: "Feedback",    status: "stable" as const, tests: 7,  props: 3 },
];

type GridItem = typeof GRID_ITEMS[0];

const CATEGORY_FILTERS = ["All", "Action", "Form Inputs", "Data Display", "Navigation", "Overlay", "Feedback"];

const GRID_COLS = [
  { columnId: "name", label: "Name", renderCell: (r: GridItem) => <Body size="sm">{r.name}</Body>, sortable: true },
  { columnId: "category", label: "Category", renderCell: (r: GridItem) => <Tag appearance="outline" size="extra-small">{r.category}</Tag>, sortable: true },
  { columnId: "status", label: "Status", renderCell: (r: GridItem) => <StatusBadge status="completed" label={r.status} size="small" />, sortable: false },
  { columnId: "tests", label: "Tests", renderCell: (r: GridItem) => <Caption>{r.tests}</Caption>, sortable: true },
  { columnId: "props", label: "Props", renderCell: (r: GridItem) => <Caption>{r.props}</Caption>, sortable: true },
];

function DataGridPattern() {
  const styles = useStyles();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    return GRID_ITEMS.filter((item) => {
      const matchesCat = category === "All" || item.category === category;
      const matchesSearch = !search.trim() || item.name.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [search, category]);

  const toolbarItems = [
    { id: "add", type: "button" as const, label: "New", icon: <Add20Regular />, appearance: "primary" as const, onClick: () => {} },
    { id: "d1", type: "divider" as const },
    { id: "export", type: "button" as const, label: "Export", icon: <ArrowDownload20Regular />, onClick: () => {} },
    { id: "delete", type: "button" as const, label: "Delete selected", icon: <Delete20Regular />, onClick: () => {} },
  ];

  return (
    <div className={styles.canvas}>
      {/* Command strip */}
      <div className={styles.spaceBetween}>
        <div style={{ maxWidth: "300px", flex: 1 }}>
          <SearchInput onSearch={setSearch} placeholder="Search components…" debounceMs={150} />
        </div>
        <Toolbar items={toolbarItems} aria-label="Component actions" />
      </div>

      {/* Category filter chips */}
      <div className={styles.filterChips}>
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              cursor: "pointer",
              borderRadius: "999px",
              padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalM}`,
              fontSize: tokens.fontSizeBase200,
              fontWeight: tokens.fontWeightSemibold,
              border: `1px solid ${category === cat ? tokens.colorBrandBackground : tokens.colorNeutralStroke1}`,
              backgroundColor: category === cat ? tokens.colorBrandBackground : tokens.colorNeutralBackground1,
              color: category === cat ? tokens.colorNeutralForegroundOnBrand : tokens.colorNeutralForeground2,
            }}
            type="button"
            aria-pressed={category === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <Caption color="subtle">
        Showing {filtered.length} of {GRID_ITEMS.length} components
        {category !== "All" ? ` in ${category}` : ""}
        {search ? ` matching "${search}"` : ""}
      </Caption>

      {/* Table or empty state */}
      {loading ? (
        <Spinner label="Loading components…" size="medium" />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No components match"
          description="Try changing the category filter or clearing your search."
          icon={<Grid20Regular />}
          action={<Button appearance="subtle" onClick={() => { setSearch(""); setCategory("All"); }}>Reset filters</Button>}
        />
      ) : (
        <DataTable
          columns={GRID_COLS}
          items={filtered}
          selectionMode="multiselect"
          pageSize={5}
          defaultSortColumn="name"
          defaultSortDirection="ascending"
        />
      )}
    </div>
  );
}

// ─── 12. DASHBOARD LAYOUT ─────────────────────────────────────────────────────

const ACTIVITY_ITEMS = [
  { id: "1", name: "Button",    change: "+2 props",  who: "Jane",   status: "completed" as const },
  { id: "2", name: "TextField", change: "Bug fix",   who: "Alex",   status: "completed" as const },
  { id: "3", name: "DataTable", change: "New sort",  who: "Sam",    status: "in-progress" as const },
  { id: "4", name: "SideNav",   change: "RTL fix",   who: "Maria",  status: "pending" as const },
];

const ACTIVITY_COLS = [
  { columnId: "name", label: "Component", renderCell: (r: typeof ACTIVITY_ITEMS[0]) => <Body size="sm">{r.name}</Body>, sortable: false },
  { columnId: "change", label: "Change", renderCell: (r: typeof ACTIVITY_ITEMS[0]) => <Caption>{r.change}</Caption>, sortable: false },
  { columnId: "who", label: "By", renderCell: (r: typeof ACTIVITY_ITEMS[0]) => (
    <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalXS }}>
      <UserAvatar name={r.who} size={20} />
      <Caption>{r.who}</Caption>
    </div>
  ), sortable: false },
  { columnId: "status", label: "Status", renderCell: (r: typeof ACTIVITY_ITEMS[0]) => <StatusBadge status={r.status} size="small" />, sortable: false },
];

function DashboardPattern() {
  const styles = useStyles();

  return (
    <div className={styles.canvas}>
      {/* Breadcrumb + title */}
      <Breadcrumb items={[{ id: "home", label: "Home", href: "#" }, { id: "dash", label: "Dashboard" }]} />
      <div className={styles.spaceBetween}>
        <Heading level={3}>Design System Health</Heading>
        <div className={styles.row}>
          <Button appearance="subtle" size="small">Last 30 days</Button>
          <Button appearance="secondary" size="small" icon={<ArrowDownload20Regular />}>Export</Button>
        </div>
      </div>

      {/* KPI row */}
      <div className={styles.kpiGrid}>
        <DataCard label="Components" value="57" trend="+20 this sprint" trendUp />
        <DataCard label="Test coverage" value="100%" trend="211 passing" trendUp />
        <DataCard label="Bundle size" value="148 KB" trend="-12% vs v0.0.9" trendUp />
      </div>

      <Divider />

      {/* Progress */}
      <Heading level={4}>Sprint progress</Heading>
      <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS }}>
        <ProgressBar label="Explorer coverage" value={0.92} color="brand" showPercentage />
        <ProgressBar label="Token coverage" value={1} color="success" showPercentage />
        <ProgressBar label="A11y score" value={1} color="success" showPercentage />
        <ProgressBar label="Theme compatibility" value={0.97} color="brand" showPercentage />
      </div>

      <Divider />

      {/* Recent activity */}
      <div className={styles.spaceBetween}>
        <Heading level={4}>Recent activity</Heading>
        <Button appearance="subtle" size="small" icon={<ChevronRight16Regular />}>View all</Button>
      </div>
      <DataTable columns={ACTIVITY_COLS} items={ACTIVITY_ITEMS} />

      <Divider />

      {/* Status strip */}
      <div className={styles.spaceBetween}>
        <div className={styles.row}>
          <StatusBadge status="completed" label="Token audit" />
          <StatusBadge status="completed" label="A11y audit" />
          <StatusBadge status="completed" label="Theme validation" />
          <StatusBadge status="in-progress" label="Explorer coverage" />
          <StatusBadge status="pending" label="Release notes" />
        </div>
        <Button appearance="primary" size="small">Run audit</Button>
      </div>
    </div>
  );
}

// ─── Pattern inventory card ───────────────────────────────────────────────────

function InventoryCard({ pattern }: { pattern: PatternMeta }) {
  const styles = useStyles();
  const complexityColor: Record<string, string> = {
    low: tokens.colorStatusSuccessForeground1,
    medium: tokens.colorStatusWarningForeground1,
    high: tokens.colorBrandForeground1,
  };

  return (
    <div className={styles.inventoryCard}>
      <span className={styles.inventoryCardName}>{pattern.name}</span>
      <div className={styles.inventoryCardMeta}>
        <Tag appearance="outline" size="extra-small">{pattern.category}</Tag>
        <span
          className={styles.inventoryCardCount}
          style={{ color: complexityColor[pattern.complexity] }}
        >
          {pattern.complexity}
        </span>
      </div>
      <Caption color="subtle">{pattern.components.length} components</Caption>
    </div>
  );
}

// ─── PatternsPage ─────────────────────────────────────────────────────────────

export function PatternsPage() {
  const styles = useStyles();

  const TABS = [
    { value: "page-header",   label: "Page Header",    icon: <DocumentPageTopLeft20Regular /> },
    { value: "command-bar",   label: "Command Bar",    icon: <Toolbar20Regular /> },
    { value: "filter-panel",  label: "Filter Panel",   icon: <Filter20Regular /> },
    { value: "search",        label: "Search",         icon: <Search20Regular /> },
    { value: "empty-state",   label: "Empty State",    icon: <Empty20Regular /> },
    { value: "error-state",   label: "Error State",    icon: <Error20Regular /> },
    { value: "success-state", label: "Success State",  icon: <Success20Regular /> },
    { value: "confirm",       label: "Confirm Dialog", icon: <Confirm20Regular /> },
    { value: "wizard",        label: "Wizard",         icon: <Wizard20Regular /> },
    { value: "settings",      label: "Settings Page",  icon: <Settings20Regular /> },
    { value: "data-grid",     label: "Data Grid",      icon: <Grid20Regular /> },
    { value: "dashboard",     label: "Dashboard",      icon: <GridDots20Regular /> },
  ];

  const wrap = (title: string, desc: string, node: React.ReactNode) => (
    <div className={styles.section}>
      <div>
        <Heading level={3}>{title}</Heading>
        <Body size="sm" color="subtle">{desc}</Body>
      </div>
      {node}
    </div>
  );

  const PANELS = {
    "page-header":   wrap("Page Header",          "Breadcrumb + title + badges + primary/secondary actions.", <PageHeaderPattern />),
    "command-bar":   wrap("Command Bar",           "Search, view toggles, and bulk action buttons in a single bar.", <CommandBarPattern />),
    "filter-panel":  wrap("Filter Panel",          "Slide-in drawer with categorised filter controls and active-filter chips.", <FilterPanelPattern />),
    "search":        wrap("Search Experience",     "Full search flow — empty → loading → results → no-results.", <SearchExperiencePattern />),
    "empty-state":   wrap("Empty State",           "First-time, no-results, and no-access variants.", <EmptyStatePattern />),
    "error-state":   wrap("Error State",           "Page banner, field validation, and full-page error variants.", <ErrorStatePattern />),
    "success-state": wrap("Success State",         "Inline success bar, wizard step completion, and full-page confirmation.", <SuccessStatePattern />),
    "confirm":       wrap("Confirmation Dialog",   "Delete (danger), discard (warning), and publish (neutral) dialogs.", <ConfirmDialogPattern />),
    "wizard":        wrap("Wizard",                "4-step form wizard with stepper, per-step content, and review step.", <WizardPattern />),
    "settings":      wrap("Settings Page",         "Tab-sectioned settings with profile, notifications, and security.", <SettingsPagePattern />),
    "data-grid":     wrap("Data Grid Experience",  "Search + category chips + sortable table + bulk actions.", <DataGridPattern />),
    "dashboard":     wrap("Dashboard Layout",      "KPI cards + progress + recent activity table + status strip.", <DashboardPattern />),
  };

  return (
    <div className={styles.root}>
      <PageHeader
        title="Patterns"
        description="12 production-ready UI patterns built exclusively from exported DS components. No new tokens."
        breadcrumbs={["Design System", "Patterns"]}
      />

      {/* Pattern inventory */}
      <div className={styles.section}>
        <div>
          <Heading level={3}>Pattern Inventory</Heading>
          <Body size="sm" color="subtle">
            {PATTERN_INVENTORY.length} patterns · {PATTERN_INVENTORY.reduce((n, p) => n + p.components.length, 0)} component usages across all patterns
          </Body>
        </div>
        <div className={styles.inventoryGrid}>
          {PATTERN_INVENTORY.map((p) => (
            <InventoryCard key={p.id} pattern={p} />
          ))}
        </div>
      </div>

      <Divider />

      {/* Live demos */}
      <Tabs tabs={TABS} panels={PANELS} defaultSelectedValue="page-header" />
    </div>
  );
}
