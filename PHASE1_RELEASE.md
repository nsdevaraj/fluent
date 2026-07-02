# Fluent 2 Design System — Phase 1 Release

**Version:** 1.0.0-phase1  
**Release Date:** July 2026  
**Status:** Developer Preview — Ready for Integration Review  

---

## Table of Contents

1. [Overview](#1-overview)
2. [Technology Stack](#2-technology-stack)
3. [Getting Started](#3-getting-started)
4. [Project Structure](#4-project-structure)
5. [Component Inventory](#5-component-inventory)
6. [Component Usage Guide](#6-component-usage-guide)
7. [Design Tokens & Theming](#7-design-tokens--theming)
8. [Architecture Notes](#8-architecture-notes)
9. [Phase 2 Roadmap](#9-phase-2-roadmap)
10. [References & Resources](#10-references--resources)

---

## 1. Overview

This is the **Phase 1 release** of the Lumel Design System, built on top of Microsoft's **Fluent UI v9** (`@fluentui/react-components`). The library provides a curated, production-ready set of UI components that are fully typed in TypeScript, documented with JSDoc, and browsable through an interactive Storybook.

### What Phase 1 delivers

- **59 components** covering every major UI pattern — inputs, navigation, overlays, feedback, data display, and custom business components
- **Full TypeScript support** — every prop is typed, exported, and auto-completes in your IDE
- **Interactive Storybook** — browse every component with live controls, copy usage code, read inline documentation
- **Design token system** — colours, spacing, typography, border radii all driven by Fluent v9 tokens so light/dark mode works out of the box
- **Accessibility built in** — all official Fluent components carry correct ARIA roles, keyboard navigation, and focus management by default
- **Custom components** — 12 additional components not in Fluent's core library, built to match the same visual language (DataTable, SideNav, StatusBadge, Stepper, etc.)
- **JSDoc on every component** — description, when to use, when NOT to use
- **Variant-audited** — every component's sizes, appearances, and states have been cross-checked against the official Fluent v9 API

---

## 2. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 18.x |
| Component Library | @fluentui/react-components | 9.x |
| CSS-in-JS | Griffel (bundled with Fluent) | — |
| Language | TypeScript | 4.9 |
| Documentation | Storybook | 8.x |
| Icons | @fluentui/react-icons | 2.x |
| Date Picker | @fluentui/react-datepicker-compat | 9.x |
| Time Picker | @fluentui/react-timepicker-compat | 0.x |
| Build Tool | Create React App (react-scripts) | 5.x |

---

## 3. Getting Started

### 3.1 Prerequisites

- Node.js **18.x or higher**
- npm **9.x or higher**
- A React 18 project (existing or new)

### 3.2 Clone and install

```bash
git clone <repository-url>
cd fluent2-app
npm install
```

### 3.3 Run Storybook

```bash
npm run storybook
```

Storybook opens at **http://localhost:6006**. Browse all 59 components, interact with live controls in the Controls panel, and read inline documentation on the Docs tab.

### 3.4 Run the dev app

```bash
npm run dev
```

Opens the Create React App dev server at **http://localhost:3000**.

### 3.5 Integrating into your existing project

**Step 1 — Copy the component library**

Copy the entire `src/components/ui/` folder into your project:

```
your-project/
  src/
    components/
      ui/           ← copy this entire folder
        Button.tsx
        TextField.tsx
        Dropdown.tsx
        ... (59 components)
```

**Step 2 — Install peer dependencies**

```bash
npm install @fluentui/react-components @fluentui/react-icons
npm install @fluentui/react-datepicker-compat @fluentui/react-timepicker-compat
```

**Step 3 — Wrap your app root with FluentProvider**

Every Fluent component must be a descendant of `FluentProvider`. Add it once at your app root:

```tsx
// App.tsx or main.tsx
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      {/* your entire app */}
    </FluentProvider>
  );
}
```

For dark mode, swap the theme:

```tsx
import { webDarkTheme } from "@fluentui/react-components";
<FluentProvider theme={webDarkTheme}>
```

For the DS light / dark themes (Lumel brand colours baked in):

```tsx
import { lightTheme, darkTheme } from "./themes";
<FluentProvider theme={lightTheme}>
```

**Step 4 — Import and use components**

```tsx
import { Button }     from "./components/ui/Button";
import { TextField }  from "./components/ui/TextField";
import { Dropdown }   from "./components/ui/Dropdown";

export function MyForm() {
  return (
    <form>
      <TextField label="Full name" required />
      <Dropdown
        options={[{ value: "admin", text: "Admin" }, { value: "viewer", text: "Viewer" }]}
        placeholder="Select role"
        aria-label="Role"
      />
      <Button appearance="primary" type="submit">Save</Button>
    </form>
  );
}
```

---

## 4. Project Structure

```
fluent2-app/
├── src/
│   ├── components/
│   │   └── ui/                  ← All 59 component source files (.tsx)
│   │       ├── Button.tsx
│   │       ├── TextField.tsx
│   │       ├── CONSTANTS.ts     ← Shared types (ValidationState, etc.)
│   │       ├── Field.tsx        ← Shared Field wrapper (label, hint, validation)
│   │       └── ...
│   ├── stories/                 ← Storybook stories (.stories.tsx)
│   │   ├── Button.stories.tsx
│   │   ├── TextField.stories.tsx
│   │   └── ...
│   └── themes/                  ← Theme definitions
│       ├── index.ts
│       └── brand.ts             ← Lumel brand palette
├── PHASE1_RELEASE.md            ← This document
├── design.html                  ← Visual design system reference (open in browser)
├── component-comparison.html    ← Component variant audit table (open in browser)
└── package.json
```

---

## 5. Component Inventory

59 components across 9 categories. **Official** = wraps a Fluent v9 component. **Custom** = built from scratch using Fluent tokens to match the design system.

### 5.1 Buttons & Actions (7 components)

| Component | Type | Sizes | Appearances | Key Stories |
|---|---|---|---|---|
| **Button** | Official | small, medium | primary, secondary, subtle | Default, Disabled, Loading, WithIcon, IconOnly, DarkMode, RTL |
| **ToggleButton** | Official | small, medium | primary, secondary, subtle | Default, Checked, WithIcon, Controlled, FormattingGroup, Disabled |
| **SplitButton** | Official | small, medium | primary, secondary, outline | Primary, Secondary, WithIcon, Disabled, Small |
| **MenuButton** | Official | small, medium | primary, secondary, subtle | Primary, Secondary, WithIcon, Disabled, Small |
| **Link** | Official | — | default, subtle | Default, Subtle, Inline, WithIcon, Disabled, RTL |
| **Toolbar** | Official | small, medium | — | Default, WithToggles, MixedWithDivider, Small, Vertical |
| **Menu** | Official | — | — | Default, WithDivider, WithShortcuts, WithGroupHeaders, WithDisabledItems, IconTrigger |

### 5.2 Input Components (8 components)

| Component | Type | Sizes | Appearances | Key Stories |
|---|---|---|---|---|
| **TextField** | Official | small | — | Default, WithHint, Required, ErrorState, SuccessState, WarningState, WithCharCount, DarkMode, RTL |
| **Textarea** | Official | — | — | Default, Required, WithCharCount, Error, Disabled |
| **SearchInput** | Official | small, medium | — | Default, Debounced, Disabled |
| **Combobox** | Official | small, medium | outline | Default, Small, Medium, Required, Grouped, Error, Disabled |
| **Dropdown** | Official | small, medium | outline | Default, WithDefaultValue, Grouped, WithDisabledOption, Multiselect, MultiselectWithDefaults, Small, Disabled, DarkMode |
| **Select** | Official | small, medium | — | Default, Small, Medium, Required, WithGroups, Error, Disabled |
| **SpinButton** | Official | small, medium | outline | Default, Small, Medium, WithPrecision, WithSuffix, Bounded, Disabled |
| **Slider** | Official | small | — | Default, WithValue, CustomRange, Small, Disabled, WithValidation |

### 5.3 Date / Time / Pickers (3 components)

| Component | Type | Sizes | Appearances | Key Stories |
|---|---|---|---|---|
| **DatePicker** | Official (compat) | — | — | Default, Required, WithMinMax, AllowTextInput, ErrorState, MondayStart, Disabled |
| **TimePicker** | Official (compat) | small, medium | outline, underline, filled-darker | Default, TwelveHourClock, FifteenMinuteIncrements, BusinessHoursOnly, Required, Small, DarkMode |
| **TagPicker** | Official | — | — | Default, Controlled, Required, WithValidation, Disabled, WithHint, NoLabel |

### 5.4 Selection Controls (4 components)

| Component | Type | Sizes | Appearances | Key Stories |
|---|---|---|---|---|
| **Checkbox** | Official | — | — | Default, Checked, Indeterminate, Disabled, WithHint |
| **RadioGroup** | Official | — | — | Vertical, Horizontal, WithDefault, Required, Disabled |
| **Switch** | Official | — | — | Default, Checked, LabelAfter, Disabled, WithValidation |
| **Slider** | Official | small | — | Default, WithValue, CustomRange, Disabled |

### 5.5 Navigation & Layout (6 components)

| Component | Type | Sizes | Appearances | Key Stories |
|---|---|---|---|---|
| **Accordion** | Official | — | — | Default, Multiple, DisabledPanel |
| **Tabs** | Official | small, medium | transparent, subtle | Default, Subtle, Small, WithDisabled, Vertical |
| **Breadcrumb** | Official | small, medium | — | Default, Small, TwoLevels, ManyLevels |
| **Tree** | Official | small, medium | subtle, transparent | Default, SingleSelect, MultiSelect, Small, FlatList |
| **SideNav** | **Custom** | — | — | Default, Collapsed, RTL, CollapsedRTL, WithGroups, DarkMode |

### 5.6 Overlays & Popovers (6 components)

| Component | Type | Sizes | Appearances | Key Stories |
|---|---|---|---|---|
| **Dialog** | Official | — | — | Default, Small, Large, Alert, Controlled |
| **Drawer** | Official | small, medium, large, full | — | Default, Start, Small, Large, WithSubtitle |
| **Popover** | Official | — | — | Default, WithHeading, NoArrow, PositionedAbove, TrapFocus |
| **Tooltip** | Official | — | — | Default, NoArrow, LabelRelationship, PositionedAbove, SlowReveal |
| **TeachingPopover** | Official | — | — | SingleStep, NoDismissButton, MultiStep, PositionedAbove |
| **ConfirmDialog** | **Custom** | — | — | Default, DestructiveDelete, NoDescription |

### 5.7 Feedback & Status (7 components)

| Component | Type | Sizes | Appearances | Key Stories |
|---|---|---|---|---|
| **Toast** | Official | — | — | Info, Success, Warning, Error |
| **MessageBar** | Official | — | — | Info, Success, Warning, Error, Dismissible, WithActions |
| **ProgressBar** | Official | — | — | Default, WithPercentage, Indeterminate, Success, Error, Warning, Large |
| **Spinner** | Official | tiny, extra-small, small, medium, large, extra-large, huge | — | Default, WithLabel, LabelAbove, Large, Tiny |
| **Skeleton** | Official | — | — | TextBlock, TextBlockPulse, Card, CustomLayout |
| **Rating** | Official | small, medium, large | — | Default, Controlled, ReadOnly, TenStars, Disabled, WithLabel |
| **CounterBadge** | Official | tiny → extra-large | filled, ghost | Brand, Danger, Important, Informative, Overflow, ShowZero, Dot |
| **PresenceBadge** | Official | tiny → extra-large | — | Available, Away, Busy, DoNotDisturb, Offline, OutOfOffice, AllStatuses |
| **StatusBadge** | **Custom** | small, medium | — | Completed, InProgress, Blocked, Pending, Warning, AllStatusesGrid, CustomLabel |

### 5.8 Display & Content (13 components)

| Component | Type | Sizes | Appearances | Key Stories |
|---|---|---|---|---|
| **Divider** | Official | — | — | Default, WithLabel, Vertical |
| **Card** | Official | small, medium, large | filled-alternative, subtle | Default, WithFooter, Clickable, Small |
| **DataCard** | **Custom** | — | — | WithTrendUp, WithTrendDown, WithDescription, MinimalNoIcon |
| **DataTable** | **Custom** | — | — | Default, WithSelection, WithPagination, Loading, Empty, DarkMode |
| **Pagination** | **Custom** | small, medium | — | Default, WithFirstLast, ManyPagesWithEllipses, Small, Disabled, NumbersOnly |
| **Persona** | Official | extra-small → huge | — | Default, Available, Busy, Away, Large, ExtraLarge |
| **UserAvatar** | Official | 16–128 px (14 sizes) | — | Default, WithPresenceAvailable/Busy/Away/Offline, Large, Square, CustomInitials |
| **AvatarGroup** | Official | 16–128 px (14 sizes) | — | Spread, Stack, Pie, WithOverflow, Large, Small |
| **Tag** | Official | extra-small, small, medium | filled, outline, brand | Filled, Outline, Brand, ExtraSmall, Dismissible, Group |
| **InteractionTag** | Official | extra-small, small, medium | filled, outline, brand | Default, WithIcons, Dismissible, Outline, Brand, ExtraSmall |
| **Typography** | **Custom** | — | — | Headings, BodyVariants, CaptionVariants, Labels |
| **Icon** | **Custom** | 20, 24, 32 | — | Decorative, Meaningful, Brand, Warning, Danger, Large |
| **Image** | Official | — | — | Default, Rounded, Circular, Cover, Contain, WithCaption, Bordered |
| **InfoLabel** | Official | small, medium, large | — | Default, Required, Small, Large, LongTooltip |

### 5.9 Custom Business Components (5 components)

| Component | Type | Key Stories | Description |
|---|---|---|---|
| **EmptyState** | **Custom** | NoResults, EmptyFolder, NoDocuments | Standardised empty/zero-data state layouts |
| **PageHeader** | **Custom** | Default, WithDescription, WithBreadcrumbs, WithActions, FullFeatured, LongTitle | Consistent page-level header with title, description, breadcrumbs, and action slots |
| **Stepper** | **Custom** | Default, Vertical, WithError, AllCompleted | Step-by-step progress indicator for multi-step forms and wizards |
| **FileUpload** | **Custom** | Default, Multiple, WithSizeLimit, Required, Disabled, WithError, CustomPrompt | Drag-and-drop + click file upload with validation |
| **SideNav** | **Custom** | Default, Collapsed, RTL, WithGroups, DarkMode | Collapsible sidebar navigation with icon + label items and group headers |

---

## 6. Component Usage Guide

### 6.1 Import pattern

Every component is a named export. Import from the barrel index (`src/components/ui/index.ts`) — or from the library entry `src/ds.ts`, which also re-exports tokens, themes, and hooks:

```tsx
import { Button, TextField, Dropdown, Dialog, Toast, DataTable } from "./components/ui";
```

### 6.2 Form example

A complete form using TextField, Dropdown, Combobox, Switch, and Button:

```tsx
import { useState } from "react";
import { Button }    from "./components/ui/Button";
import { TextField } from "./components/ui/TextField";
import { Dropdown }  from "./components/ui/Dropdown";
import { Switch }    from "./components/ui/Switch";

export function UserSettingsForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [notifications, setNotifications] = useState(true);

  const roles = [
    { value: "admin",  text: "Admin" },
    { value: "editor", text: "Editor" },
    { value: "viewer", text: "Viewer" },
  ];

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      <TextField
        label="Full name"
        required
        value={name}
        onChange={(_, d) => setName(d.value)}
      />

      <Dropdown
        options={roles}
        placeholder="Select a role"
        aria-label="Role"
        onOptionSelect={(_, d) => setRole(d.optionValue ?? "")}
      />

      <Switch
        label="Email notifications"
        checked={notifications}
        onChange={(_, d) => setNotifications(d.checked)}
      />

      <Button appearance="primary" type="submit">
        Save settings
      </Button>
    </form>
  );
}
```

### 6.3 Validation states

All form inputs (TextField, Combobox, Dropdown, Select, TimePicker, etc.) share a consistent validation API:

```tsx
<TextField
  label="Email"
  validationState="error"
  validationMessage="Please enter a valid email address."
/>

<TextField
  label="Username"
  validationState="success"
  validationMessage="Username is available."
/>

<TextField
  label="Password strength"
  validationState="warning"
  validationMessage="Consider adding numbers or symbols."
/>
```

### 6.4 Dialog (modal)

```tsx
import { useState } from "react";
import { Button } from "./components/ui/Button";
import { Dialog } from "./components/ui/Dialog";

export function DeleteConfirm() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button appearance="primary" onClick={() => setOpen(true)}>
        Delete record
      </Button>

      <Dialog
        open={open}
        onOpenChange={(_, d) => setOpen(d.open)}
        title="Delete record?"
        body="This action cannot be undone. The record will be permanently removed."
        primaryAction={{ label: "Delete", onClick: () => { /* delete */ setOpen(false); } }}
        secondaryAction={{ label: "Cancel", onClick: () => setOpen(false) }}
      />
    </>
  );
}
```

### 6.5 Toast notifications

```tsx
import { useToastController, ToastTitle, Toast } from "@fluentui/react-components";
import { Toast as DSToast } from "./components/ui/Toast";

// The Toast component wraps Fluent's useToastController.
// See Toast.stories.tsx for the full imperative usage pattern.
```

### 6.6 DataTable

```tsx
import { DataTable } from "./components/ui/DataTable";

const columns = [
  { key: "name",   label: "Name",   width: 200 },
  { key: "role",   label: "Role",   width: 150 },
  { key: "status", label: "Status", width: 120 },
];

const rows = [
  { id: "1", name: "Alice",   role: "Admin",  status: "Active" },
  { id: "2", name: "Bob",     role: "Viewer", status: "Inactive" },
];

export function UsersTable() {
  return (
    <DataTable
      columns={columns}
      rows={rows}
      selectable
      onSelectionChange={(ids) => console.log("Selected:", ids)}
    />
  );
}
```

### 6.7 SideNav

```tsx
import { SideNav } from "./components/ui/SideNav";
import { Home20Regular, Settings20Regular, People20Regular } from "@fluentui/react-icons";

const navItems = [
  { id: "home",     label: "Home",     icon: <Home20Regular />,     href: "/" },
  { id: "users",    label: "Users",    icon: <People20Regular />,   href: "/users" },
  { id: "settings", label: "Settings", icon: <Settings20Regular />, href: "/settings" },
];

export function AppShell() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <SideNav items={navItems} activeId="home" />
      <main style={{ flex: 1, padding: 24 }}>
        {/* page content */}
      </main>
    </div>
  );
}
```

### 6.8 StatusBadge

The custom `StatusBadge` is designed for task/ticket status displays in dashboards:

```tsx
import { StatusBadge } from "./components/ui/StatusBadge";

<StatusBadge status="completed"   />  {/* ✓ Completed   */}
<StatusBadge status="in-progress" />  {/* ⟳ In Progress  */}
<StatusBadge status="blocked"     />  {/* ✕ Blocked      */}
<StatusBadge status="pending"     />  {/* ○ Pending      */}
<StatusBadge status="warning"     />  {/* ⚠ Warning      */}

{/* With custom label */}
<StatusBadge status="completed" label="Shipped" />
```

---

## 7. Design Tokens & Theming

### 7.1 Using tokens in your own styles

Import tokens directly from Fluent. Do not hardcode colours or spacing values:

```tsx
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius:    tokens.borderRadiusMedium,
    padding:         tokens.spacingVerticalM,
    boxShadow:       tokens.shadow4,
  },
  title: {
    fontSize:   tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color:      tokens.colorNeutralForeground1,
  },
});
```

### 7.2 Key token categories

| Category | Example tokens | Values |
|---|---|---|
| **Brand colours** | `colorBrandBackground`, `colorBrandForeground1`, `colorBrandStroke1` | Lumel teal palette |
| **Neutral colours** | `colorNeutralBackground1–6`, `colorNeutralForeground1–4` | White → dark grey |
| **Status colours** | `colorStatusSuccessForeground1`, `colorStatusDangerBorder2` | Green / Red / Amber / Blue |
| **Spacing** | `spacingVerticalXS` → `spacingVerticalXXXL` | 2px → 96px |
| **Typography** | `fontSizeBase100` → `fontSizeHero1000` | 10px → 68px |
| **Border radius** | `borderRadiusNone`, `borderRadiusSmall`, `borderRadiusMedium`, `borderRadiusLarge`, `borderRadiusCircular` | 0 → 50% |
| **Shadows** | `shadow2`, `shadow4`, `shadow8`, `shadow16`, `shadow28`, `shadow64` | Elevation levels |
| **Duration** | `durationFaster`, `durationFast`, `durationNormal`, `durationSlow` | Animation timing |
| **Curves** | `curveEasyEase`, `curveDecelerateMid` | Easing functions |

### 7.3 Brand palette (Lumel)

The custom Lumel brand theme maps the following primary colour ramp:

| Shade | Token key | Hex |
|---|---|---|
| 10 (darkest) | `colorBrandBackground2Pressed` | `#0C695A` |
| 20 | `colorBrandForeground2Hover` | `#0E7868` |
| 30 | `colorBrandForeground1` | `#117865` |
| 40 | `colorBrandBackground` | `#1A9E85` |
| 50 | `colorBrandBackgroundHover` | `#22C4A6` |
| 60 (lightest) | `colorBrandBackgroundPressed` | `#E3F7EF` |

### 7.4 Switching themes at runtime

```tsx
import { useState } from "react";
import { FluentProvider, webLightTheme, webDarkTheme } from "@fluentui/react-components";

export function ThemedApp() {
  const [dark, setDark] = useState(false);

  return (
    <FluentProvider theme={dark ? webDarkTheme : webLightTheme}>
      <button onClick={() => setDark(!dark)}>
        Toggle {dark ? "Light" : "Dark"} Mode
      </button>
      {/* rest of app */}
    </FluentProvider>
  );
}
```

---

## 8. Architecture Notes

### 8.1 Griffel CSS-in-JS rules

All component styles are written using Fluent's **Griffel** CSS-in-JS engine via `makeStyles`. When writing custom styles inside this system, follow these rules:

**No border shorthand** — always write individual border sides:

```tsx
// ❌ WRONG — Griffel does not support border shorthand
border: `1px solid ${tokens.colorNeutralStroke1}`,

// ✅ CORRECT — individual properties only
borderTopColor:    tokens.colorNeutralStroke1,
borderRightColor:  tokens.colorNeutralStroke1,
borderBottomColor: tokens.colorNeutralStroke1,
borderLeftColor:   tokens.colorNeutralStroke1,
borderTopWidth:    "1px",
borderRightWidth:  "1px",
borderBottomWidth: "1px",
borderLeftWidth:   "1px",
borderTopStyle:    "solid",
borderRightStyle:  "solid",
borderBottomStyle: "solid",
borderLeftStyle:   "solid",
```

**Colors are always tokens** — never hardcode hex values in `makeStyles`. Always reference `tokens.*`.

**No dynamic class names** — Griffel generates atomic class names at build time. Never generate class names conditionally in a way that bypasses `makeStyles`.

### 8.2 Input border normalisation pattern

Fluent v9 input components (Input, Combobox, Dropdown, Select, SpinButton, DatePicker, TimePicker, TagPicker) render two visual border layers by default — a full-ring border via `box-shadow` and a separately darkened `border-bottom-color`. When both stack, the bottom edge appears double-dark.

All 7 affected components have been fixed using a **wrapper + clip-path** pattern:

```tsx
// Pattern applied to: TextField, Combobox, Dropdown, Select,
//                     SpinButton, DatePicker, TimePicker, TagPicker

const useStyles = makeStyles({
  // 1. Clip the wrapper so our ::after line is clipped at the border-radius
  inputWrapper: {
    position: "relative",
    clipPath: "inset(0px round 4px)",
  },
  // 2. Our bottom accent line — 1px neutral at rest, 2px brand on focus
  inputWrapperIndicator: {
    "::after": {
      content: '""',
      position: "absolute",
      bottom: "0px",
      left: "0px",
      right: "0px",
      height: "1px",
      backgroundColor: tokens.colorNeutralStrokeAccessible,
      pointerEvents: "none",
      zIndex: 1,
    },
    ":focus-within::after": {
      height: "2px",
      backgroundColor: tokens.colorBrandStroke1,
    },
  },
  // 3. Normalise Fluent's per-side border values so all sides are equal
  inputNormalize: {
    borderBottomColor: tokens.colorNeutralStroke1,
    "&:hover": {
      borderBottomColor: tokens.colorNeutralStroke1Hover,
    },
  },
  // 4. Kill Fluent's built-in ::after focus indicator — ours replaces it
  inputNoAfter: {
    "::after": { content: "none" },
  },
});
```

This pattern is already applied inside all wrapper components. You do not need to re-apply it when consuming the components.

### 8.3 Field wrapper

Most form inputs are wrapped by a shared `Field` component (`src/components/ui/Field.tsx`) that handles:

- Label rendering (with `required` asterisk)
- Hint text below the input
- Validation message (error / warning / success)
- `aria-describedby` wiring between label, hint, and validation message

When building new form inputs, use `Field` as the outer wrapper to get consistent label/validation layout for free.

### 8.4 Custom components

The 12 custom components are built entirely using Fluent design tokens and official sub-components where appropriate. They do not import any external CSS or styling libraries. Each follows the same `makeStyles` + tokens pattern and accepts standard React props (`className`, `style`, event handlers).

---

## 9. Phase 2 Roadmap

The following gaps were identified during the Phase 1 variant audit against the official Fluent v9 API. These are the target deliverables for Phase 2.

### 9.1 Missing sizes

| Component | Missing sizes |
|---|---|
| Button, ToggleButton | `large` |
| TextField (Input) | `medium` (explicit story), `large` |
| Textarea | `small`, `medium`, `large` |
| Combobox | `large` |
| Tabs | `large` |
| Breadcrumb | `large` |
| TimePicker | `large` |
| Spinner | `extra-tiny` |
| Rating | `extra-large` |
| Popover | `small`, `medium`, `large` |
| Switch | `small`, `medium` (explicit stories) |
| Checkbox | `medium`, `large` (explicit stories) |

### 9.2 Missing appearances

| Component | Missing appearances |
|---|---|
| Button, ToggleButton | `outline`, `transparent`, `shape: rounded/circular/square` |
| SplitButton, MenuButton | `shape` prop |
| Tabs | `subtle-circular`, `filled-circular` |
| Tree | `subtle-alpha` |
| Card | `filled`, `outline` |
| Popover | `brand`, `inverted` |
| Tooltip | `inverted` |
| Toast | `inverted` |
| Spinner | `inverted` |
| Divider | `brand`, `strong`, `subtle` |
| Skeleton | `translucent`, circle/square shapes |

### 9.3 Missing states & stories

| Component | Missing |
|---|---|
| Dropdown | `clearable`, validation state stories |
| Combobox | `freeform`, `clearable` |
| TimePicker | `freeform`, `clearable`, `showSeconds` |
| RadioGroup | `horizontal-stacked` layout |
| Accordion | `collapsible` (all-panels-closed) |
| Drawer | `position: bottom`, `type: inline` |
| Dialog | `non-modal` (modalType) |
| MessageBar | `shape: square`, `layout: multiline` |
| PresenceBadge | `unknown`, `blocked`, `outOfOffice` modifier |
| UserAvatar | colour variants, active ring story |
| Persona | full presence status coverage, `textPosition: below` |
| Card | `orientation: horizontal`, `selected` |
| Menu | context menu (right-click), checkmark items |
| Tag / InteractionTag | `disabled`, `selected` state stories |
| Rating | `step: 0.5` (half-star), `marigold` colour |
| Image | `shadow`, `block` stories |

### 9.4 New components planned

- **ColorPicker** — colour swatch + hex input
- **Timeline** — vertical event timeline
- **KanbanBoard** — drag-and-drop column layout
- **RichTextEditor** — basic formatting toolbar + content area

---

## 10. References & Resources

### Project files

| File | Description | How to open |
|---|---|---|
| `design.html` | Visual design system reference — tokens, colour swatches, component cards, decision tree | Open in any browser |
| `component-comparison.html` | Full variant audit — current vs. official Fluent v9 API, orange chips = gaps | Open in any browser |
| `PHASE1_RELEASE.md` | This document | Open in any Markdown viewer |

### External documentation

| Resource | URL |
|---|---|
| Fluent UI v9 Components | https://react.fluentui.dev |
| Fluent v9 GitHub | https://github.com/microsoft/fluentui |
| Griffel CSS-in-JS | https://griffel.js.org |
| Fluent Icons | https://react.fluentui.dev/?path=/docs/icons-catalog |
| Storybook Docs | https://storybook.js.org/docs |
| DatePicker (compat) | https://www.npmjs.com/package/@fluentui/react-datepicker-compat |
| TimePicker (compat) | https://www.npmjs.com/package/@fluentui/react-timepicker-compat |

### Quick reference — common tokens

```tsx
// Spacing
tokens.spacingVerticalXS   // 4px
tokens.spacingVerticalS    // 8px
tokens.spacingVerticalM    // 12px
tokens.spacingVerticalL    // 16px
tokens.spacingVerticalXL   // 20px
tokens.spacingVerticalXXL  // 24px

// Typography
tokens.fontSizeBase200  // 12px
tokens.fontSizeBase300  // 14px  ← body default
tokens.fontSizeBase400  // 16px
tokens.fontSizeBase500  // 20px
tokens.fontSizeBase600  // 24px

// Border radius
tokens.borderRadiusSmall   // 2px
tokens.borderRadiusMedium  // 4px
tokens.borderRadiusLarge   // 6px
tokens.borderRadiusXLarge  // 8px

// Elevation
tokens.shadow4   // card-level
tokens.shadow8   // dropdown-level
tokens.shadow16  // modal-level
tokens.shadow28  // dialog-level
```

---

*Phase 1 Release — Lumel Design System — July 2026*  
*Built on Microsoft Fluent UI v9 · React 18 · TypeScript 5 · Storybook 8*
