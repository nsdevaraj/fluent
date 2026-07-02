export type ComponentCategory =
  | "Form Inputs"
  | "Feedback"
  | "Navigation"
  | "Overlay"
  | "Data Display"
  | "Layout"
  | "Typography"
  | "Action";

export interface ComponentMeta {
  id: string;          // route slug
  name: string;
  category: ComponentCategory;
  description: string;
  status: "stable" | "beta" | "alpha";
  props: { name: string; type: string; default?: string; description: string }[];
}

export const COMPONENTS: ComponentMeta[] = [
  // ── Form Inputs ────────────────────────────────────────────────────────────
  {
    id: "text-field",
    name: "TextField",
    category: "Form Inputs",
    description: "Single-line text input with label, helper text, and validation state.",
    status: "stable",
    props: [
      { name: "label", type: "string", description: "Input label" },
      { name: "placeholder", type: "string", description: "Placeholder text" },
      { name: "value", type: "string", description: "Controlled value" },
      { name: "validationState", type: '"none" | "error" | "warning" | "success"', default: '"none"', description: "Validation state" },
      { name: "required", type: "boolean", description: "Mark as required" },
      { name: "disabled", type: "boolean", description: "Disable the input" },
    ],
  },
  {
    id: "textarea",
    name: "Textarea",
    category: "Form Inputs",
    description: "Multi-line text input with auto-resize and character count.",
    status: "stable",
    props: [
      { name: "label", type: "string", description: "Input label" },
      { name: "rows", type: "number", default: "3", description: "Initial visible rows" },
      { name: "maxLength", type: "number", description: "Character limit" },
      { name: "resize", type: '"none" | "vertical" | "horizontal" | "both"', description: "Resize handle" },
    ],
  },
  {
    id: "select",
    name: "Select",
    category: "Form Inputs",
    description: "Dropdown select with option groups and validation.",
    status: "stable",
    props: [
      { name: "label", type: "string", description: "Select label" },
      { name: "options", type: "{ value: string; label: string }[]", description: "Options list" },
      { name: "validationState", type: "ValidationState", description: "Validation state" },
    ],
  },
  {
    id: "combobox",
    name: "Combobox",
    category: "Form Inputs",
    description: "Searchable dropdown with freeform text entry support.",
    status: "stable",
    props: [
      { name: "options", type: "string[]", description: "Option list" },
      { name: "freeform", type: "boolean", description: "Allow custom values" },
      { name: "multiselect", type: "boolean", description: "Allow multiple selections" },
    ],
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "Form Inputs",
    description: "Checkbox with indeterminate state support.",
    status: "stable",
    props: [
      { name: "checked", type: "boolean | 'mixed'", description: "Checked state" },
      { name: "label", type: "string", description: "Checkbox label" },
      { name: "disabled", type: "boolean", description: "Disable checkbox" },
    ],
  },
  {
    id: "radio-group",
    name: "RadioGroup",
    category: "Form Inputs",
    description: "Group of mutually exclusive radio options.",
    status: "stable",
    props: [
      { name: "options", type: "{ value: string; label: string }[]", description: "Radio options" },
      { name: "value", type: "string", description: "Selected value" },
      { name: "layout", type: '"horizontal" | "vertical"', default: '"vertical"', description: "Layout direction" },
    ],
  },
  {
    id: "switch",
    name: "Switch",
    category: "Form Inputs",
    description: "Toggle switch for boolean settings.",
    status: "stable",
    props: [
      { name: "checked", type: "boolean", description: "Toggle state" },
      { name: "label", type: "string", description: "Switch label" },
      { name: "labelPosition", type: '"before" | "after" | "above"', default: '"after"', description: "Label position" },
    ],
  },
  {
    id: "slider",
    name: "Slider",
    category: "Form Inputs",
    description: "Range slider with min, max, step, and marks.",
    status: "stable",
    props: [
      { name: "min", type: "number", default: "0", description: "Minimum value" },
      { name: "max", type: "number", default: "100", description: "Maximum value" },
      { name: "step", type: "number", default: "1", description: "Step increment" },
    ],
  },
  {
    id: "date-picker",
    name: "DatePicker",
    category: "Form Inputs",
    description: "Date picker with calendar popup.",
    status: "stable",
    props: [
      { name: "label", type: "string", description: "Label text" },
      { name: "onDateChange", type: "(date: Date | null) => void", description: "Change handler" },
      { name: "minDate", type: "Date", description: "Minimum selectable date" },
    ],
  },
  {
    id: "file-upload",
    name: "FileUpload",
    category: "Form Inputs",
    description: "File upload with drag-and-drop, multi-file, and preview.",
    status: "stable",
    props: [
      { name: "accept", type: "string", description: "Accepted MIME types" },
      { name: "multiple", type: "boolean", description: "Allow multiple files" },
      { name: "maxSizeMB", type: "number", description: "Max file size" },
    ],
  },
  {
    id: "search-input",
    name: "SearchInput",
    category: "Form Inputs",
    description: "Debounced search input with clear button.",
    status: "stable",
    props: [
      { name: "onSearch", type: "(query: string) => void", description: "Search handler" },
      { name: "debounceMs", type: "number", default: "300", description: "Debounce delay" },
      { name: "placeholder", type: "string", description: "Placeholder text" },
    ],
  },
  // ── Feedback ───────────────────────────────────────────────────────────────
  {
    id: "status-badge",
    name: "StatusBadge",
    category: "Feedback",
    description: "Contextual status indicator with icon and label.",
    status: "stable",
    props: [
      { name: "status", type: '"completed" | "in-progress" | "blocked" | "pending" | "paused" | "warning"', description: "Status value" },
      { name: "label", type: "string", description: "Override default label" },
      { name: "size", type: '"small" | "medium" | "large"', description: "Badge size" },
    ],
  },
  {
    id: "progress-bar",
    name: "ProgressBar",
    category: "Feedback",
    description: "Determinate and indeterminate progress bar.",
    status: "stable",
    props: [
      { name: "value", type: "number", description: "Progress 0–100" },
      { name: "color", type: '"brand" | "success" | "warning" | "error"', description: "Bar color" },
      { name: "label", type: "string", description: "Accessible label" },
    ],
  },
  {
    id: "message-bar",
    name: "MessageBar",
    category: "Feedback",
    description: "Inline notification with intent, title, and actions.",
    status: "stable",
    props: [
      { name: "intent", type: '"info" | "success" | "warning" | "error"', description: "Intent" },
      { name: "title", type: "string", description: "Message title" },
      { name: "dismissible", type: "boolean", description: "Show dismiss button" },
    ],
  },
  {
    id: "toast",
    name: "Toast",
    category: "Feedback",
    description: "Toaster with DSToaster and useToast hook.",
    status: "stable",
    props: [
      { name: "message", type: "string", description: "Toast message" },
      { name: "intent", type: '"info" | "success" | "warning" | "error"', description: "Intent" },
      { name: "timeout", type: "number", default: "4000", description: "Auto-dismiss timeout" },
    ],
  },
  {
    id: "spinner",
    name: "Spinner",
    category: "Feedback",
    description: "Loading spinner with size variants and label.",
    status: "stable",
    props: [
      { name: "size", type: '"tiny" | "extra-small" | "small" | "medium" | "large" | "extra-large" | "huge"', description: "Spinner size" },
      { name: "label", type: "string", description: "Accessible label" },
    ],
  },
  {
    id: "skeleton",
    name: "Skeleton",
    category: "Feedback",
    description: "Loading skeleton with text and card variants.",
    status: "stable",
    props: [
      { name: "lines", type: "number", default: "3", description: "Number of skeleton lines" },
      { name: "animation", type: '"wave" | "pulse"', default: '"wave"', description: "Animation style" },
    ],
  },
  // ── Navigation ────────────────────────────────────────────────────────────
  {
    id: "side-nav",
    name: "SideNav",
    category: "Navigation",
    description: "Vertical sidebar navigation with groups, icons, and collapse.",
    status: "stable",
    props: [
      { name: "groups", type: "SideNavGroup[]", description: "Navigation groups" },
      { name: "selectedId", type: "string", description: "Active item ID" },
      { name: "onSelect", type: "(id: string) => void", description: "Selection handler" },
      { name: "collapsed", type: "boolean", description: "Collapse to icon-only mode" },
    ],
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "Navigation",
    description: "Horizontal tab bar with underline and filled variants.",
    status: "stable",
    props: [
      { name: "tabs", type: "{ id: string; label: string; content: ReactNode }[]", description: "Tab definitions" },
      { name: "defaultTab", type: "string", description: "Initially selected tab" },
      { name: "appearance", type: '"underline" | "subtle" | "transparent"', description: "Tab appearance" },
    ],
  },
  {
    id: "accordion",
    name: "Accordion",
    category: "Navigation",
    description: "Collapsible accordion sections with single/multi expand.",
    status: "stable",
    props: [
      { name: "items", type: "{ id: string; header: ReactNode; content: ReactNode }[]", description: "Accordion panels" },
      { name: "multiple", type: "boolean", description: "Allow multiple open panels" },
      { name: "collapsible", type: "boolean", description: "Allow collapsing open panel" },
    ],
  },
  {
    id: "stepper",
    name: "Stepper",
    category: "Navigation",
    description: "Multi-step wizard indicator with vertical and horizontal layouts.",
    status: "stable",
    props: [
      { name: "steps", type: "{ label: string; description?: string; status: StepStatus }[]", description: "Step definitions" },
      { name: "activeStep", type: "number", description: "Current step index" },
      { name: "orientation", type: '"horizontal" | "vertical"', description: "Layout orientation" },
    ],
  },
  {
    id: "page-header",
    name: "PageHeader",
    category: "Navigation",
    description: "Page-level header with breadcrumbs, title, and actions slot.",
    status: "stable",
    props: [
      { name: "title", type: "string", description: "Page title" },
      { name: "description", type: "string", description: "Subtitle description" },
      { name: "breadcrumbs", type: "string[]", description: "Breadcrumb path" },
      { name: "actions", type: "ReactNode", description: "Action buttons slot" },
    ],
  },
  // ── Overlay ───────────────────────────────────────────────────────────────
  {
    id: "drawer",
    name: "Drawer",
    category: "Overlay",
    description: "Slide-in panel from start or end edge.",
    status: "stable",
    props: [
      { name: "open", type: "boolean", description: "Open state" },
      { name: "position", type: '"start" | "end"', description: "Slide-in direction" },
      { name: "size", type: '"small" | "medium" | "large" | "full"', description: "Panel width" },
      { name: "title", type: "string", description: "Drawer title" },
    ],
  },
  {
    id: "popover",
    name: "Popover",
    category: "Overlay",
    description: "Floating popover panel anchored to a trigger element.",
    status: "stable",
    props: [
      { name: "trigger", type: "ReactElement", description: "Trigger element" },
      { name: "content", type: "ReactNode", description: "Popover body" },
      { name: "positioning", type: "string", description: "Placement (above, below, before, after)" },
    ],
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: "Overlay",
    description: "Hover tooltip with delay and positioning.",
    status: "stable",
    props: [
      { name: "content", type: "string", description: "Tooltip text" },
      { name: "relationship", type: '"label" | "description"', description: "ARIA relationship" },
      { name: "positioning", type: "string", description: "Placement" },
    ],
  },
  {
    id: "confirm-dialog",
    name: "ConfirmDialog",
    category: "Overlay",
    description: "Confirmation dialog with title, body, and confirm/cancel actions.",
    status: "stable",
    props: [
      { name: "open", type: "boolean", description: "Open state" },
      { name: "title", type: "string", description: "Dialog title" },
      { name: "onConfirm", type: "() => void", description: "Confirm handler" },
      { name: "onCancel", type: "() => void", description: "Cancel handler" },
      { name: "confirmLabel", type: "string", description: "Confirm button text" },
    ],
  },
  // ── Data Display ──────────────────────────────────────────────────────────
  {
    id: "data-table",
    name: "DataTable",
    category: "Data Display",
    description: "Feature-rich data grid with sorting, selection, and pagination.",
    status: "stable",
    props: [
      { name: "columns", type: "DataTableColumn<T>[]", description: "Column definitions" },
      { name: "items", type: "T[]", description: "Data rows" },
      { name: "selectionMode", type: '"single" | "multiselect"', description: "Row selection mode" },
      { name: "pageSize", type: "number", description: "Items per page" },
      { name: "loading", type: "boolean", description: "Loading state" },
    ],
  },
  {
    id: "data-card",
    name: "DataCard",
    category: "Data Display",
    description: "Metric card with value, label, trend indicator, and icon.",
    status: "stable",
    props: [
      { name: "label", type: "string", description: "Metric label" },
      { name: "value", type: "string | number", description: "Primary value" },
      { name: "trend", type: "string", description: "Trend text (e.g. +12%)" },
      { name: "trendUp", type: "boolean", description: "Trend direction" },
      { name: "icon", type: "ReactElement", description: "Card icon" },
    ],
  },
  {
    id: "card",
    name: "Card",
    category: "Data Display",
    description: "Generic container card with header, preview, and footer slots.",
    status: "stable",
    props: [
      { name: "header", type: "CardHeaderConfig", description: "Title, subtitle, image, action" },
      { name: "footer", type: "ReactNode", description: "Footer content" },
      { name: "children", type: "ReactNode", description: "Card body" },
      { name: "selected", type: "boolean", description: "Selected state" },
    ],
  },
  {
    id: "persona",
    name: "Persona",
    category: "Data Display",
    description: "User identity card with avatar, name, secondary text, and presence.",
    status: "stable",
    props: [
      { name: "name", type: "string", description: "Person's name" },
      { name: "secondaryText", type: "string", description: "Role or email" },
      { name: "presence", type: '"available" | "busy" | "away" | "offline"', description: "Presence status" },
      { name: "size", type: '"small" | "medium" | "large" | "huge"', description: "Component size" },
    ],
  },
  {
    id: "user-avatar",
    name: "UserAvatar",
    category: "Data Display",
    description: "Avatar with image, initials fallback, and presence ring.",
    status: "stable",
    props: [
      { name: "name", type: "string", description: "Person's name (for initials)" },
      { name: "image", type: "string", description: "Image URL" },
      { name: "size", type: "number", description: "Avatar size in px" },
      { name: "presence", type: "string", description: "Presence indicator" },
    ],
  },
  {
    id: "icon",
    name: "Icon",
    category: "Data Display",
    description: "Icon wrapper with size, color, and label props.",
    status: "stable",
    props: [
      { name: "icon", type: "ReactElement", description: "Icon element" },
      { name: "size", type: '"small" | "medium" | "large"', description: "Icon size" },
      { name: "color", type: "string", description: "Icon color token" },
    ],
  },
  {
    id: "tag",
    name: "Tag / TagGroup",
    category: "Data Display",
    description: "Inline tag with optional dismiss. TagGroup manages a list with overflow.",
    status: "stable",
    props: [
      { name: "appearance", type: '"filled" | "outline" | "brand"', description: "Tag appearance" },
      { name: "dismissible", type: "boolean", description: "Show dismiss button" },
      { name: "size", type: '"extra-small" | "small" | "medium"', description: "Tag size" },
    ],
  },
  // ── Layout ────────────────────────────────────────────────────────────────
  {
    id: "divider",
    name: "Divider",
    category: "Layout",
    description: "Horizontal or vertical divider with optional label.",
    status: "stable",
    props: [
      { name: "vertical", type: "boolean", description: "Vertical orientation" },
      { name: "appearance", type: '"strong" | "brand" | "subtle" | "default"', description: "Divider style" },
    ],
  },
  {
    id: "empty-state",
    name: "EmptyState",
    category: "Layout",
    description: "Empty state with illustration, title, description, and action.",
    status: "stable",
    props: [
      { name: "title", type: "string", description: "Empty state title" },
      { name: "description", type: "string", description: "Helper description" },
      { name: "action", type: "ReactNode", description: "Primary action button" },
      { name: "icon", type: "ReactElement", description: "Illustration icon" },
    ],
  },
  // ── Typography ────────────────────────────────────────────────────────────
  {
    id: "typography",
    name: "Typography",
    category: "Typography",
    description: "Heading, Body, Caption, and DSLabel components with semantic variants.",
    status: "stable",
    props: [
      { name: "level", type: "1 | 2 | 3 | 4 | 5 | 6", description: "Heading level (Heading only)" },
      { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', description: "Body/Caption size" },
      { name: "color", type: '"default" | "subtle" | "brand" | "danger"', description: "Text color" },
    ],
  },
  // ── Action ────────────────────────────────────────────────────────────────
  {
    id: "button",
    name: "Button",
    category: "Action",
    description: "Button with primary, secondary, and subtle variants. Loading state and icon support.",
    status: "stable",
    props: [
      { name: "appearance", type: '"primary" | "secondary" | "subtle"', default: '"secondary"', description: "Visual variant" },
      { name: "size", type: '"small" | "medium"', default: '"medium"', description: "Button size" },
      { name: "loading", type: "boolean", description: "Show loading spinner" },
      { name: "icon", type: "ReactElement", description: "Leading icon" },
      { name: "iconPosition", type: '"before" | "after"', description: "Icon placement" },
      { name: "disabled", type: "boolean", description: "Disable the button" },
    ],
  },

  // ── Phase Next — New components ────────────────────────────────────────────

  // Actions
  { id: "link", name: "Link", category: "Action", description: "Inline hyperlink with visited, external, and disabled states.", status: "stable", props: [{ name: "href", type: "string", description: "URL" }, { name: "external", type: "boolean", description: "Open in new tab" }, { name: "disabled", type: "boolean", description: "Prevents navigation" }, { name: "appearance", type: '"default" | "subtle"', description: "Visual style" }] },
  { id: "toggle-button", name: "ToggleButton", category: "Action", description: "Button with pressed/active state for toggles, filters, and toolbar controls.", status: "stable", props: [{ name: "checked", type: "boolean", description: "Pressed state" }, { name: "onChange", type: "(checked: boolean) => void", description: "Toggle callback" }, { name: "appearance", type: "string", description: "Visual variant" }] },
  { id: "compound-button", name: "CompoundButton", category: "Action", description: "Two-line button with primary label and secondary description.", status: "stable", props: [{ name: "secondaryContent", type: "ReactNode", description: "Subtitle" }, { name: "block", type: "boolean", description: "Full-width" }] },
  { id: "menu", name: "Menu", category: "Action", description: "Dropdown and context menu with items, dividers, groups, icons, shortcuts, and sub-menus.", status: "stable", props: [{ name: "trigger", type: "ReactElement", description: "Trigger element" }, { name: "items", type: "MenuItemDef[]", description: "Menu items" }, { name: "onSelect", type: "(id: string) => void", description: "Selection callback" }] },
  { id: "menu-button", name: "MenuButton", category: "Action", description: "Button that opens a dropdown menu on click.", status: "stable", props: [{ name: "label", type: "ReactNode", description: "Button label" }, { name: "items", type: "MenuItemDef[]", description: "Dropdown items" }] },
  { id: "split-button", name: "SplitButton", category: "Action", description: "Primary action button with a separate dropdown chevron.", status: "stable", props: [{ name: "label", type: "ReactNode", description: "Primary label" }, { name: "onClick", type: "MouseEventHandler", description: "Primary action" }, { name: "items", type: "MenuItemDef[]", description: "Dropdown items" }] },
  { id: "toolbar", name: "Toolbar", category: "Action", description: "Horizontal action bar with buttons, toggle buttons, dividers, and grouped controls.", status: "stable", props: [{ name: "items", type: "ToolbarItem[]", description: "Toolbar items" }, { name: "aria-label", type: "string", description: "Accessible label" }, { name: "size", type: '"small" | "medium"', description: "Size" }] },

  // Navigation
  { id: "breadcrumb", name: "Breadcrumb", category: "Navigation", description: "Navigation trail showing the current page's position in the hierarchy.", status: "stable", props: [{ name: "items", type: "BreadcrumbItemDef[]", description: "Breadcrumb items" }, { name: "size", type: '"small" | "medium"', description: "Size" }] },

  // Overlay
  { id: "dialog", name: "Dialog", category: "Overlay", description: "General-purpose modal with free body and actions composition.", status: "stable", props: [{ name: "open", type: "boolean", description: "Controlled open state" }, { name: "title", type: "ReactNode", description: "Title" }, { name: "actions", type: "ReactNode", description: "Footer actions" }, { name: "modalType", type: '"modal" | "non-modal" | "alert"', description: "Behaviour" }] },
  { id: "teaching-popover", name: "TeachingPopover", category: "Overlay", description: "Guided onboarding overlay. Single-step or multi-step carousel.", status: "stable", props: [{ name: "trigger", type: "ReactElement", description: "Trigger" }, { name: "steps", type: "TeachingPopoverStep[]", description: "Carousel steps" }] },

  // Form Inputs
  { id: "info-label", name: "InfoLabel", category: "Form Inputs", description: "Form label with inline info button that opens a tooltip popover.", status: "stable", props: [{ name: "label", type: "ReactNode", description: "Label text" }, { name: "info", type: "ReactNode", description: "Popover content" }, { name: "required", type: "boolean", description: "Required marker" }] },
  { id: "spin-button", name: "SpinButton", category: "Form Inputs", description: "Numeric input with increment/decrement controls, step, min, max, prefix/suffix.", status: "stable", props: [{ name: "value", type: "number", description: "Controlled value" }, { name: "min", type: "number", description: "Min" }, { name: "max", type: "number", description: "Max" }, { name: "step", type: "number", default: "1", description: "Step" }] },
  { id: "tag-picker", name: "TagPicker", category: "Form Inputs", description: "Multi-select input that renders selected values as removable tags.", status: "stable", props: [{ name: "options", type: "TagPickerOption[]", description: "Options" }, { name: "selectedValues", type: "string[]", description: "Controlled selected" }, { name: "onChange", type: "(values: string[]) => void", description: "Callback" }] },

  // Feedback
  { id: "counter-badge", name: "CounterBadge", category: "Feedback", description: "Numeric notification count bubble for nav items, avatars, and icons.", status: "stable", props: [{ name: "count", type: "number", description: "Count" }, { name: "dot", type: "boolean", description: "Dot mode" }, { name: "overflowCount", type: "number", default: "99", description: "Max before overflow" }] },
  { id: "presence-badge", name: "PresenceBadge", category: "Feedback", description: "Availability status indicator: available, busy, away, offline, out-of-office.", status: "stable", props: [{ name: "status", type: "PresenceStatus", description: "Presence status" }, { name: "size", type: "PresenceBadgeSize", description: "Badge size" }] },

  // Data Display
  { id: "avatar-group", name: "AvatarGroup", category: "Data Display", description: "Stacked row of user avatars with overflow count and member popover.", status: "stable", props: [{ name: "members", type: "AvatarGroupMember[]", description: "Members" }, { name: "maxVisible", type: "number", default: "5", description: "Max before overflow" }, { name: "layout", type: '"stack" | "spread" | "pie"', description: "Layout mode" }] },
  { id: "rating", name: "Rating", category: "Data Display", description: "Interactive star rating and read-only RatingDisplay with half-star precision.", status: "stable", props: [{ name: "value", type: "number", description: "Rating value" }, { name: "max", type: "number", default: "5", description: "Max stars" }, { name: "onChange", type: "(value: number) => void", description: "Callback" }] },
  { id: "tree", name: "Tree", category: "Data Display", description: "Hierarchical tree view with expand/collapse, selection, icons, and persona layouts.", status: "stable", props: [{ name: "items", type: "TreeItemDef[]", description: "Items" }, { name: "selectionMode", type: '"none" | "single" | "multiselect"', description: "Selection mode" }] },
  { id: "interaction-tag", name: "InteractionTag", category: "Data Display", description: "Removable/clickable tag chip with primary and dismiss actions.", status: "stable", props: [{ name: "value", type: "string", description: "Unique value" }, { name: "onPrimaryClick", type: "(value: string) => void", description: "Primary click" }, { name: "onDismiss", type: "(value: string) => void", description: "Dismiss" }] },
  { id: "image", name: "Image", category: "Data Display", description: "Accessible image with fit modes, shapes, skeleton loading, and error fallback.", status: "stable", props: [{ name: "src", type: "string", description: "URL" }, { name: "alt", type: "string", description: "Alt text" }, { name: "fit", type: "ImageFit", description: "Object-fit" }, { name: "shape", type: "ImageShape", description: "Shape" }] },

  // ── Phase Next 2 — Additional components ──────────────────────────────────

  // Feedback
  { id: "badge", name: "Badge", category: "Feedback", description: "Simple label badge for counts, statuses, and short text indicators.", status: "stable", props: [{ name: "appearance", type: '"filled" | "ghost" | "outline" | "tint"', description: "Visual style" }, { name: "color", type: '"brand" | "danger" | "important" | "informative" | "severe" | "subtle" | "success" | "warning"', description: "Semantic color" }, { name: "size", type: '"tiny" | "extra-small" | "small" | "medium" | "large" | "extra-large"', description: "Badge size" }, { name: "shape", type: '"circular" | "rounded" | "square"', description: "Badge shape" }, { name: "icon", type: "ReactElement", description: "Leading or trailing icon" }] },

  // Form Inputs
  { id: "field", name: "Field", category: "Form Inputs", description: "Standalone label, hint, and validation wrapper for any form control.", status: "stable", props: [{ name: "label", type: "ReactNode", description: "Field label" }, { name: "hint", type: "ReactNode", description: "Helper text below the control" }, { name: "validationMessage", type: "ReactNode", description: "Error/warning/success message" }, { name: "validationState", type: '"none" | "error" | "warning" | "success"', description: "Validation state" }, { name: "required", type: "boolean", description: "Mark field as required" }, { name: "orientation", type: '"horizontal" | "vertical"', description: "Label position relative to control" }] },
  { id: "dropdown", name: "Dropdown", category: "Form Inputs", description: "Dropdown selector with custom rendering. Distinct from Select (native) and Combobox (searchable).", status: "stable", props: [{ name: "options", type: "DropdownOption[]", description: "Flat list of options" }, { name: "groups", type: "DropdownOptionGroup[]", description: "Grouped options" }, { name: "value", type: "string | string[]", description: "Selected value(s)" }, { name: "onValueChange", type: "(value: string, all: string[]) => void", description: "Selection callback" }, { name: "multiselect", type: "boolean", description: "Allow multiple selection" }, { name: "appearance", type: '"outline" | "underline" | "filled-darker" | "filled-lighter"', description: "Visual style" }] },
  { id: "time-picker", name: "TimePicker", category: "Form Inputs", description: "Time selection input with hour cycle, increment, and validation support.", status: "stable", props: [{ name: "value", type: "Date | null", description: "Selected time" }, { name: "onTimeChange", type: "(date: Date | null, timeString: string) => void", description: "Change callback" }, { name: "hourCycle", type: "12 | 24", description: "12 or 24 hour clock" }, { name: "increment", type: "number", description: "Minute increment (default: 30)" }, { name: "appearance", type: '"outline" | "underline" | "filled-darker" | "filled-lighter"', description: "Visual style" }, { name: "label", type: "string", description: "Field label" }] },
  { id: "color-picker", name: "ColorPicker", category: "Form Inputs", description: "Full color picker with hue/saturation area, color slider, and optional alpha slider.", status: "stable", props: [{ name: "color", type: "string", description: "Hex color string e.g. '#ff5500'" }, { name: "onChange", type: "(color: string) => void", description: "Color change callback" }, { name: "showAlpha", type: "boolean", description: "Show alpha/opacity slider" }] },
  { id: "swatch-picker", name: "SwatchPicker", category: "Form Inputs", description: "Grid of color or image swatches for theme and brand color selection.", status: "stable", props: [{ name: "swatches", type: "SwatchOption[]", description: "Swatch options" }, { name: "selectedValue", type: "string", description: "Selected swatch value" }, { name: "onValueChange", type: "(value: string) => void", description: "Selection callback" }, { name: "size", type: '"small" | "medium" | "large" | "extra-large"', description: "Swatch size" }, { name: "shape", type: '"circular" | "rounded" | "square"', description: "Swatch shape" }] },

  // Data Display
  { id: "list", name: "List", category: "Data Display", description: "Styled list container with ListItem for consistent item rendering.", status: "stable", props: [{ name: "children", type: "ReactNode", description: "ListItem children" }] },
  { id: "table", name: "Table", category: "Data Display", description: "Low-level table primitives for custom table layouts. Use DataTable for full-featured grids.", status: "stable", props: [{ name: "sortable", type: "boolean", description: "Enable column sorting" }, { name: "size", type: '"extra-small" | "small" | "medium"', description: "Row density" }, { name: "noNativeElements", type: "boolean", description: "Use div-based rendering instead of table elements" }] },
  { id: "carousel", name: "Carousel", category: "Data Display", description: "Slide-based carousel with autoplay, navigation dots, and prev/next buttons.", status: "stable", props: [{ name: "slides", type: "CarouselSlide[]", description: "Slide content definitions" }, { name: "autoplay", type: "boolean", description: "Enable auto-advance" }, { name: "showNav", type: "boolean", description: "Show navigation dots" }, { name: "showButtons", type: "boolean", description: "Show prev/next buttons" }, { name: "circular", type: "boolean", description: "Loop from last to first" }] },

  // Navigation
  { id: "nav-drawer", name: "NavDrawer", category: "Navigation", description: "Official Fluent navigation shell with drawer, categories, sub-items, and section headers.", status: "stable", props: [{ name: "items", type: "DSNavItem[]", description: "Navigation items (supports nesting)" }, { name: "selectedValue", type: "string", description: "Active item ID" }, { name: "onNavItemSelect", type: "(value: string) => void", description: "Selection callback" }, { name: "open", type: "boolean", description: "Drawer open state" }, { name: "type", type: '"overlay" | "inline"', description: "Overlay (modal) or inline drawer" }, { name: "header", type: "ReactNode", description: "Header slot — logo and app name" }, { name: "footer", type: "ReactNode", description: "Footer slot — settings/account" }] },
  { id: "hamburger", name: "Hamburger", category: "Navigation", description: "Specialized navigation toggle button with three-line icon.", status: "stable", props: [{ name: "onClick", type: "MouseEventHandler", description: "Click handler" }, { name: "aria-expanded", type: "boolean", description: "Whether the nav is open" }, { name: "size", type: '"small" | "medium" | "large"', description: "Button size" }] },

  // Layout
  { id: "overflow", name: "Overflow", category: "Layout", description: "Responsive overflow utility that hides items that don't fit and shows a more menu.", status: "stable", props: [{ name: "minimumVisible", type: "number", description: "Minimum number of items to always show" }, { name: "overflowAxis", type: '"horizontal" | "vertical"', description: "Direction of overflow measurement" }] },
  { id: "portal", name: "Portal", category: "Layout", description: "Renders children outside the normal DOM tree for custom overlay composition.", status: "stable", props: [{ name: "mountNode", type: "HTMLElement | null", description: "Target DOM node. Defaults to document.body" }] },

  // ── New components (v2 build sprint) ──────────────────────────────────────
  { id: "label", name: "Label", category: "Form Inputs", description: "Accessible standalone label element with required asterisk, disabled state, and size variants.", status: "stable", props: [{ name: "htmlFor", type: "string", description: "Associates label with a form control" }, { name: "required", type: "boolean | string", description: "Shows required asterisk" }, { name: "disabled", type: "boolean", description: "Grays out the label" }, { name: "size", type: '"small" | "medium" | "large"', default: '"medium"', description: "Label size" }, { name: "weight", type: '"regular" | "semibold"', description: "Font weight" }] },
  { id: "input", name: "Input", category: "Form Inputs", description: "Bare single-line text input primitive for custom form control composition.", status: "stable", props: [{ name: "value", type: "string", description: "Controlled value" }, { name: "onChange", type: "(e, data) => void", description: "Change callback" }, { name: "appearance", type: '"outline" | "underline" | "filled-darker" | "filled-lighter"', default: '"outline"', description: "Visual style" }, { name: "size", type: '"small" | "medium" | "large"', default: '"medium"', description: "Input size" }, { name: "type", type: '"text" | "email" | "password" | "number" | "search" | "tel" | "url"', description: "Input type" }, { name: "contentBefore", type: "ReactElement", description: "Icon or content before the input" }, { name: "contentAfter", type: "ReactElement", description: "Icon or content after the input" }] },
  { id: "listbox", name: "Listbox", category: "Form Inputs", description: "Bare listbox primitive for building fully custom select/dropdown controls.", status: "stable", props: [{ name: "children", type: "ReactNode", description: "Option or OptionGroup children" }, { name: "selectedOptions", type: "string[]", description: "Controlled selection" }, { name: "onOptionSelect", type: "(e, data) => void", description: "Selection callback" }, { name: "multiselect", type: "boolean", description: "Allow multiple selection" }] },
  { id: "announce-provider", name: "AnnounceProvider", category: "Layout", description: "Screen reader live-region provider. Wrap your app root to enable useAnnounce() in any child.", status: "stable", props: [{ name: "children", type: "ReactNode", description: "App content" }] },
];

export const CATEGORIES: ComponentCategory[] = [
  "Form Inputs",
  "Feedback",
  "Navigation",
  "Overlay",
  "Data Display",
  "Layout",
  "Typography",
  "Action",
];

export const CATEGORY_COUNTS = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
  acc[cat] = COMPONENTS.filter((c) => c.category === cat).length;
  return acc;
}, {});
