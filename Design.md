# Design System — `@lumel/fluent2-ds`

> A single-source design reference for the Lumel Design System: **59 React components** built on
> [Microsoft Fluent UI v9](https://react.fluentui.dev/), a token-driven theming layer, and
> accessibility + RTL support baked in.

**Stack:** React 18 · TypeScript 4.9 · `@fluentui/react-components` v9 · Griffel CSS-in-JS · Storybook 8 · Create React App (react-scripts 5)

**See also:** [COMPONENT_GUIDE.md](COMPONENT_GUIDE.md) for the full when-to-use / when-not-to-use matrix · [PHASE1_RELEASE.md](PHASE1_RELEASE.md) for the release inventory · [README.md](README.md) for install & quick start.

---

## Table of contents

1. [Design principles](#1-design-principles)
2. [Architecture](#2-architecture)
3. [Theming](#3-theming)
4. [Design tokens](#4-design-tokens)
5. [Component catalog](#5-component-catalog)
6. [Hooks](#6-hooks)
7. [Accessibility & RTL](#7-accessibility--rtl)
8. [Styling conventions](#8-styling-conventions)
9. [Tooling & scripts](#9-tooling--scripts)
10. [Storybook](#10-storybook)

---

## 1. Design principles

1. **Token-driven, never hardcoded.** Colours, spacing, radii, motion, and typography always come from tokens so light / dark / high-contrast themes work automatically. No raw hex, no magic `px`.
2. **Fluent v9 foundation.** Official components wrap `@fluentui/react-components`; custom components are built from the same tokens to match the visual language.
3. **Accessibility first.** WCAG 2.1 AA, full keyboard navigation, correct ARIA roles, and screen-reader announcements on state changes.
4. **RTL by default.** Layout uses CSS logical properties (`marginInlineStart`, `insetInlineEnd`, …) so everything mirrors under `dir="rtl"`.
5. **Griffel-only styling.** All styles use `makeStyles` — never plain CSS, Tailwind, or inline styles.
6. **Two control sizes.** Interactive controls expose only `small` (24px) and `medium` (32px) — there is intentionally no `large`.

---

## 2. Architecture

This library wraps Fluent UI v9 with project-specific defaults, validation wrappers, and custom tokens.

```
src/
├── components/ui/      ← All 59 wrapped components (one file per component)
│   ├── CONSTANTS.ts    ← Shared numeric/string design constants
│   ├── Field.tsx       ← Shared label + hint + validation wrapper
│   └── index.ts        ← Barrel export (import from here, not individual files)
├── hooks/              ← useControllableState, useClickKeydown, (useToast lives in Toast)
├── stories/            ← Storybook stories (one file per component)
├── themes/             ← lightTheme, darkTheme, highContrastTheme + themes map
└── tokens/             ← Custom token groups (see §4)
    ├── brand.ts            ← Brand colour ramp (16 shades)
    ├── colors.ts           ← Semantic colour aliases
    ├── typography.ts       ├── spacing.ts        ├── borderRadius.ts
    ├── shadows.ts          ├── motion.ts
    ├── zIndex.ts           ├── breakpoints.ts    ├── opacity.ts       ├── focus.ts
    ├── ribbonColors.ts     ← 7 ribbon icon colour tokens
    ├── dataVizColors.ts    ← 94 data-viz tokens
    └── index.ts            ← Barrel export for all tokens
```

`src/ds.ts` is the library entry point — it re-exports **components, hooks, tokens, and themes** from one path:

```tsx
import { Button, spacing, lightTheme, useControllableState } from "@lumel/fluent2-ds";
```

---

## 3. Theming

Wrap your app root once with `FluentProvider`. Three themes ship with the system.

```tsx
import { FluentProvider } from "@fluentui/react-components";
import { lightTheme } from "@lumel/fluent2-ds";

<FluentProvider theme={lightTheme}>
  <App />
</FluentProvider>
```

| Theme | Export | Built on |
|---|---|---|
| Light | `lightTheme` | `createLightTheme(brandColors)` |
| Dark | `darkTheme` | `createDarkTheme(brandColors)` |
| High contrast | `highContrastTheme` | `teamsHighContrastTheme` |

### Theme switching

A `themes` lookup map and `ThemeName` type make switchers trivial:

```tsx
import { themes, type ThemeName } from "@lumel/fluent2-ds";

const [mode, setMode] = React.useState<ThemeName>("light");
<FluentProvider theme={themes[mode]}>…</FluentProvider>
```

### Custom brand

Brand colour is generated from a 16-shade ramp (see §4). Swap the ramp and regenerate:

```tsx
import { createLightTheme, createDarkTheme, type BrandVariants } from "@fluentui/react-components";

const myBrand: BrandVariants = { 10: "#020B16", /* … 16 shades … */ 160: "#EAF3FF" };
const myLight = createLightTheme(myBrand);
const myDark  = createDarkTheme(myBrand);
```

---

## 4. Design tokens

Import everything from the token barrel:

```tsx
import {
  semanticColors, brandColors, typography, spacing, borderRadius, shadows, motion,
  zIndex, breakpoints, media, opacity, focus, focusRing,
  ribbonTokens, dataVizTokens,
} from "@lumel/fluent2-ds";
```

### 4.1 Brand colours · `tokens/brand.ts`

A 16-shade ramp from `10` (darkest) to `160` (lightest). Feeds `createLightTheme()` / `createDarkTheme()` to auto-generate every `colorBrand*` token.

| Shade | Hex | Role |
|---|---|---|
| 10 | `#001919` | Deepest dark |
| 80 | `#117865` | **Primary brand** |
| 100 | `#2AAC94` | **Dark primary** |
| 160 | `#E3F7EF` | Lightest tint |

> **Dark-mode overrides** — brand foregrounds are lightened for AA contrast: `colorBrandForeground1 → brandColors[110]`, `colorBrandForeground2 → brandColors[120]`.

### 4.2 Semantic colours · `tokens/colors.ts`

Intent-based aliases that resolve to Fluent CSS variables at runtime (so they theme automatically). Grouped by intent:

| Group | Keys (examples) |
|---|---|
| `brand` | `background`, `backgroundHover`, `backgroundPressed`, `foreground`, `foregroundLink`, `stroke` |
| `neutral` | `background1–4`, `foreground1–4`, `stroke1/2`, `strokeAccessible`, `*Disabled` |
| `success` / `warning` / `danger` | `background1–3`, `foreground1–3`, `border1/2`, `borderActive` |

```tsx
const useStyles = makeStyles({
  banner: { backgroundColor: semanticColors.success.background1, color: semanticColors.success.foreground1 },
});
```

### 4.3 Spacing · `tokens/spacing.ts`

Directional scales — `spacing.vertical.*` and `spacing.horizontal.*`. Never hardcode `px`.

| Key | Value | | Key | Value |
|---|---|---|---|---|
| `xxs` | 2px | | `l` | 12px |
| `xs` | 4px | | `xl` | 16px |
| `s` / `sNudge` | 6px | | `xxl` | 20px |
| `m` | 8px | | `xxxl` | 36px |
| `mNudge` | 10px | | `none` | 0 |

### 4.4 Typography · `tokens/typography.ts`

Font-size scale (plus matching `lineHeight`, `fontWeight`, `fontFamily`, and pre-composed `textStyles`):

| Key | Size | Semantic use |
|---|---|---|
| `xs` | 10px | Caption 2 |
| `sm` | 12px | Caption 1 |
| `md` | 14px | Body 1 (default) |
| `base` | 16px | Body 2 / Subtitle 2 |
| `lg` | 20px | Subtitle 1 |
| `xl` | 24px | Title 3 |
| `title2` | 28px | Title 2 |
| `title1` | 32px | Title 1 |
| `largeTitle` | 40px | Large Title |
| `display` | 68px | Display |

**Weights:** `regular` 400 · `medium` 500 · `semibold` 600 · `bold` 700.
**Typography component variants:** `Display`, `LargeTitle`, `Title1–3`, `Subtitle1/2`, `Body1`, `Body1Strong`, `Body2`, `Caption1/2` (plus `Heading`, `Body`, `Caption`, `DSLabel` helpers).

### 4.5 Border radius · `tokens/borderRadius.ts`

| Key | Value | | Key | Value |
|---|---|---|---|---|
| `none` | 0 | | `large` | 6px |
| `small` | 2px | | `xlarge` | 8px |
| `medium` | 4px | | `circular` | 10000px (pill) |

### 4.6 Shadows / elevation · `tokens/shadows.ts`

`shadows[n]` maps to Fluent's elevation ramp; `shadows.brand[n]` is the brand-tinted variant.

| Level | Use |
|---|---|
| `2` | Cards, inline elements |
| `4` | Dropdowns, popovers (resting) |
| `8` | Dropdowns (hover), tooltips |
| `16` | Dialogs, side panels |
| `28` | Modals, overlays |
| `64` | Full-screen overlays |

### 4.7 Motion · `tokens/motion.ts`

```tsx
transition: `opacity ${motion.duration.fast} ${motion.easing.easeOut}`,
```

| Duration | ms | | Easing | Use |
|---|---|---|---|---|
| `ultraFast` | 50 | | `easeIn` | Entering the screen |
| `faster` | 100 | | `easeOut` | Leaving the screen |
| `fast` | 150 | | `linear` | Repositioning |
| `normal` | 200 | | `decelerate` | Spring-in |
| `gentle` | 250 | | `accelerate` | Spring-out |
| `slow` | 300 | | | |
| `slower` | 400 | | | |
| `ultraSlow` | 500 | | | |

### 4.8 z-index · `tokens/zIndex.ts`

Semantic layering scale — use instead of hardcoding stacking order.

| Token | Value | Token | Value |
|---|---|---|---|
| `hide` | -1 | `overlay` | 1300 |
| `base` | 0 | `modal` | 1400 |
| `docked` | 10 | `popover` | 1500 |
| `dropdown` | 1000 | `toast` | 1600 |
| `sticky` | 1100 | `tooltip` | 1700 |
| `banner` | 1200 | | |

### 4.9 Breakpoints & media · `tokens/breakpoints.ts`

Responsive tiers plus media-query builders for `makeStyles`.

| Breakpoint | Min width |
|---|---|
| `xs` | 0 |
| `sm` | 480px |
| `md` | 640px |
| `lg` | 1024px |
| `xl` | 1366px |
| `xxl` | 1920px |

```tsx
const useStyles = makeStyles({
  grid: {
    gridTemplateColumns: "1fr",
    [media.up("md")]: { gridTemplateColumns: "1fr 1fr" },
    [media.between("md", "xl")]: { gap: spacing.horizontal.l },
  },
});
```

### 4.10 Opacity · `tokens/opacity.ts`

| Token | Value | Use |
|---|---|---|
| `transparent` | 0 | Fully clear |
| `hover` | 0.08 | Hover wash |
| `pressed` | 0.12 | Pressed wash |
| `selected` | 0.16 | Selected wash |
| `disabled` | 0.38 | Disabled content |
| `scrim` | 0.4 | Modal backdrop |
| `overlay` | 0.6 | Blocking overlay |
| `opaque` | 1 | Fully opaque |

### 4.11 Focus ring · `tokens/focus.ts`

A single source of truth for keyboard focus indicators, matching Fluent across themes.

```tsx
const useStyles = makeStyles({
  trigger: { ":focus-visible": focusRing() },
});
```

`focus` exposes `width` (2px), `color` (`colorStrokeFocus2`), `colorInner` (`colorStrokeFocus1`), `offset` (2px), and `style`.

### 4.12 Ribbon icon colours · `tokens/ribbonColors.ts`

7 tokens for coloured icons in ribbons/toolbars (not part of Fluent's palette) — each with a light + dark value: `Dismiss`, `Manage`, `Move`, `Object`, `Success`, `Trigger`, `Warning`.

### 4.13 Data-visualisation colours · `tokens/dataVizColors.ts`

94 tokens across four groups: **Data slots** (20 light + 20 dark categorical series), **Sequential** (6), **Diverging** (6), and **Alert** (4 severity levels).

---

## 5. Component catalog

**59 components across 9 categories.** _Official_ = wraps a Fluent v9 component · _Custom_ = built from tokens. Full usage rules live in [COMPONENT_GUIDE.md](COMPONENT_GUIDE.md).

### 5.1 Buttons & actions
| Component | Type | Use for |
|---|---|---|
| Button | Official | Any operation that doesn't navigate |
| CompoundButton | Official | Button with a secondary description line |
| ToggleButton | Official | Two-state formatting/mode toggles |
| SplitButton | Official | Primary action + secondary options |
| MenuButton | Official | A trigger that always opens a menu |
| Link | Official | Navigation / inline textual action |
| Toolbar | Official | Grouped actions with arrow-key nav |
| Menu | Official | Contextual popup of actions |

**Appearances:** `primary` (one per surface) · `secondary` (default) · `subtle` (no border) · `transparent` (inline/toolbar).

### 5.2 Input components
| Component | Use for |
|---|---|
| TextField / Textarea | Single- / multi-line free text |
| SearchInput | Search boxes (ARIA searchbox + clear) |
| Combobox | Filterable list, optional multi-select |
| Dropdown | Button-trigger list, no free text |
| Select | Native `<select>` (mobile-friendly) |
| SpinButton | Bounded numeric with steppers |
| Slider | Drag-thumb range value |

**Which input control?**

| Need | Use |
|---|---|
| Single freeform value | TextField / Textarea |
| Bounded numeric | SpinButton (steppers) or Slider (drag) |
| Pick from 2–5 options | RadioGroup or Select |
| Pick from list, filterable | Combobox |
| Pick from list, no typing | Dropdown |
| Multiple from a large set | TagPicker |
| Date / Time | DatePicker / TimePicker |
| Search query | SearchInput |

### 5.3 Date / time / pickers
`DatePicker` (calendar popup, compat) · `TimePicker` (12h/24h, compat) · `TagPicker` (removable tag chips).

### 5.4 Selection controls
`Checkbox` (checked / unchecked / indeterminate) · `RadioGroup` (one of 2–8, all visible) · `Switch` (immediate-effect on/off).

### 5.5 Navigation & layout
`Accordion` · `Tabs` · `Breadcrumb` · `Tree` · `SideNav` _(Custom)_ · `NavDrawer` · `Stepper` _(Custom)_.

### 5.6 Overlays & popovers
`Dialog` · `ConfirmDialog` _(Custom)_ · `Drawer` · `Popover` · `Tooltip` · `TeachingPopover`.

### 5.7 Feedback & status
`Toast` · `MessageBar` · `ProgressBar` · `Spinner` · `Skeleton` · `CounterBadge` · `PresenceBadge` · `StatusBadge` _(Custom)_ · `Rating` · `Badge`.

### 5.8 Display & content
`Card` · `DataCard` _(Custom)_ · `DataTable` _(Custom)_ · **`Pagination`** _(Custom)_ · `Persona` · `UserAvatar` · `AvatarGroup` · `Tag` · `InteractionTag` · `Typography` _(Custom)_ · `Icon` _(Custom)_ · `Image` · `InfoLabel` · `Divider`.

> **Pagination** pairs with `DataTable`: first/last, previous/next, and numbered pages with ellipses.
> ```tsx
> const [page, setPage] = React.useState(1);
> <Pagination page={page} count={12} onPageChange={setPage} showFirstLast />
> ```

### 5.9 Custom business components
`EmptyState` · `PageHeader` · `Stepper` · `FileUpload` · `SideNav` — not in Fluent core, built entirely from DS tokens.

---

## 6. Hooks

| Hook | Purpose |
|---|---|
| `useControllableState` | Bridge controlled / uncontrolled value + `onChange` in one call |
| `useClickKeydown` | Keyboard-accessible activation (`Enter` / `Space`) for non-button elements |
| `useToast` | Imperative API to show DS toasts (paired with `<DSToaster />`) |

```tsx
const [value, setValue] = useControllableState({ defaultValue: "", value: controlled, onChange });
const handlers = useClickKeydown(() => doAction());
<div role="button" tabIndex={0} {...handlers}>Click or Enter</div>
```

---

## 7. Accessibility & RTL

- **WCAG 2.1 AA** across all components; official Fluent components carry correct ARIA roles and focus management by default.
- **Keyboard navigation** via Fluent primitives; custom components add explicit handlers (`useClickKeydown`).
- **Screen-reader announcements** on interactive state changes (e.g. Button loading state via `aria-live`).
- **RTL** flips automatically under `<FluentProvider dir="rtl">` because layout uses CSS logical properties. Verify with `npm run audit:rtl` (see §9).
- **Testing:** `jest-axe` is wired into `setupTests.ts`; use the `checkA11y` helper from `test-utils`:
  ```tsx
  const { container } = render(<Pagination page={3} count={10} />);
  expect(await checkA11y(container)).toHaveNoViolations();
  ```

---

## 8. Styling conventions

All styling uses Griffel `makeStyles`. Two rules matter most:

### No border shorthand (Griffel is atomic)

```tsx
// ❌ Wrong
border: `1px solid ${tokens.colorNeutralStroke1}`,

// ✓ Correct — individual properties per side
borderTopWidth: "1px",
borderTopStyle: "solid",
borderTopColor: tokens.colorNeutralStroke1,
// …repeat for Right / Bottom / Left
```

### The double-border fix pattern

Fluent v9 inputs render a bottom accent indicator via an `::after` pseudo-element at `bottom: -1px` — **outside** the element box. Adding a custom indicator creates a visible double line.

Root causes:
1. `::after` sits outside the box, so `overflow: hidden` on the component does **not** clip it.
2. `borderBottomColor` on the input root is set separately from the `::after` — overriding one leaves the other stacked.
3. `DatePicker`'s `className` routes onto the `fui-Input` span directly, so descendant selectors like `"& .fui-Input"` never apply.

The fix — clip a wrapper with `clipPath`, reset the input border, and kill Fluent's `::after`:

```tsx
const useStyles = makeStyles({
  inputWrapper: {
    position: "relative",
    clipPath: "inset(0px round 4px)", // clips the indicator to the radius
  },
  inputWrapperIndicator: {
    "::after": {
      content: '""', position: "absolute", bottom: "0px", left: "0px", right: "0px",
      height: "1px", backgroundColor: tokens.colorNeutralStrokeAccessible,
    },
    ":focus-within::after": { height: "2px", backgroundColor: tokens.colorBrandStroke1 },
  },
  killAfter: { "::after": { content: "none" } },
  normalizeInput: {
    borderBottomColor: tokens.colorNeutralStroke1,
    ":hover": { borderBottomColor: tokens.colorNeutralStroke1Hover },
  },
});
```

> Use `clipPath: inset(...)` rather than `overflow: hidden` — the latter would clip portal-based dropdowns (Combobox, Dropdown, TagPicker); `clipPath` does not affect portals since they render outside the DOM subtree.

---

## 9. Tooling & scripts

| Script | What it does |
|---|---|
| `npm run dev` / `npm start` | Start the CRA dev server (http://localhost:3000) |
| `npm run storybook` | Start Storybook (http://localhost:6006) |
| `npm test` | Run tests (`jest` + `@testing-library` + `jest-axe`) |
| `npm run audit:tokens` | Flag hardcoded colour literals that should be tokens |
| `npm run audit:rtl` / `lint:rtl` | Flag physical CSS properties that break RTL |
| `npm run analyze:bundle` | Report raw + gzip size of the built library |
| `npm run build:lib` | Emit ESM + CJS + types to `dist/` |

The two audits are CI-friendly (non-zero exit on findings). `analyze:bundle` accepts a budget:

```bash
npm run build:lib && BUNDLE_BUDGET_KB=250 node scripts/bundle-size.js
```

### `npm run dev` output

Exact output of `npm run dev` (which runs `react-scripts start`). This run found port 3000 already in use, so the server exited instead of starting:

```text
> @lumel/fluent2-ds@0.1.0-alpha.1 dev
> react-scripts start

(node:30594) [DEP0176] DeprecationWarning: fs.F_OK is deprecated, use fs.constants.F_OK instead
(Use `node --trace-deprecation ...` to show where the warning was created)
Something is already running on port 3000.
```

> Free the port before starting — `lsof -ti:3000 | xargs kill` — or run on another port with `PORT=3001 npm run dev`.

---

## 10. Storybook

Stories live in `src/stories/`, one file per component.

```bash
npm run storybook   # http://localhost:6006
```

### Story template

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "../components/ui/ComponentName";

const meta: Meta<typeof ComponentName> = {
  title: "Components/ComponentName",
  component: ComponentName,
  tags: ["autodocs"],
  parameters: { docs: { description: { component: "What this is and when to use it." } } },
  argTypes: { disabled: { control: "boolean" } },
};
export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = { args: {} };
```

### Story naming conventions

| Story | Purpose |
|---|---|
| `Default` | Most common usage, minimal props |
| `Required` | Required-field state |
| `Error` / `Warning` / `Success` | Validation states |
| `Disabled` | Disabled state |
| `Small` / `Large` | Size variants |
| `DarkMode` | Dark theme via a `FluentProvider` decorator |
| `AllStates` / `AllAppearances` / `AllSizes` | Visual comparison grids |

> Autodocs is disabled in `.storybook/main.ts` (`autodocs: false`); component docs come from `parameters.docs.description`. The Storybook webpack config also strips `ESLintWebpackPlugin` so lint warnings don't block builds.
