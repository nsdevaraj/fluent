# @lumel/fluent2-ds

> Lumel Design System — 59 production-ready React components built on [Microsoft Fluent UI v9](https://react.fluentui.dev/), with full TypeScript support, WCAG 2.1 AA accessibility, RTL layout, and light/dark theming.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)

---

## Installation

```bash
npm install @lumel/fluent2-ds
```

### Peer dependencies (install if not already present)

```bash
npm install react react-dom @fluentui/react-components @fluentui/react-icons
```

---

## Quick start

```tsx
import { FluentProvider } from "@fluentui/react-components";
import { lightTheme, Button, TextField } from "@lumel/fluent2-ds";

function App() {
  return (
    <FluentProvider theme={lightTheme}>
      <TextField label="Name" placeholder="Enter your name" />
      <Button appearance="primary" onClick={() => console.log("clicked")}>
        Submit
      </Button>
    </FluentProvider>
  );
}
```

---

## Theming

### Light / Dark

```tsx
import { FluentProvider } from "@fluentui/react-components";
import { lightTheme, darkTheme } from "@lumel/fluent2-ds";

<FluentProvider theme={isDark ? darkTheme : lightTheme}>
  {/* your app */}
</FluentProvider>
```

### Custom brand colours

```tsx
import { createLightTheme, createDarkTheme } from "@fluentui/react-components";
import type { BrandVariants } from "@fluentui/react-components";

const myBrand: BrandVariants = {
  10: "#020B16", 20: "#071E38", 30: "#0B3063", /* ... 16 shades */
};

const myLight = createLightTheme(myBrand);
const myDark  = createDarkTheme(myBrand);
```

---

## RTL support

```tsx
<FluentProvider theme={lightTheme} dir="rtl">
  {/* all layout flips automatically via logical CSS */}
</FluentProvider>
```

---

## Components

| Category | Components |
|---|---|
| **Form inputs** | TextField, Textarea, Select, Combobox, Checkbox, RadioGroup, Switch, Slider, DatePicker, FileUpload, SearchInput |
| **Feedback** | StatusBadge, ProgressBar, MessageBar, Toast, Spinner, Skeleton |
| **Navigation** | SideNav, Tabs, Accordion, Stepper, PageHeader |
| **Overlay** | Drawer, Popover, Tooltip, ConfirmDialog |
| **Data display** | DataTable, Pagination, DataCard, Card, Persona, UserAvatar, Icon, Tag |
| **Layout** | Divider, EmptyState |
| **Typography** | Typography (Heading, Body, Caption, DSLabel) |
| **Button** | Button |

---

## Design tokens

```tsx
import {
  spacing, typography, semanticColors, borderRadius, shadows, motion,
  zIndex, breakpoints, media, opacity, focus,
} from "@lumel/fluent2-ds";

// In makeStyles():
const useStyles = makeStyles({
  card: {
    padding: spacing.vertical.xl,
    borderRadius: borderRadius.large,
    boxShadow: shadows[4],
  },
});
```

---

## Hooks

```tsx
import { useControllableState, useClickKeydown } from "@lumel/fluent2-ds";

// Controlled/uncontrolled state bridge
const [value, setValue] = useControllableState({ defaultValue: "", value: controlled, onValueChange: onChange });

// Keyboard-accessible click handler
const handlers = useClickKeydown(() => doAction());
<div role="button" {...handlers}>Click or Enter</div>
```

---

## Accessibility

All components are WCAG 2.1 AA compliant:
- Tested with `jest-axe` on every component
- Full keyboard navigation via Fluent UI primitives
- RTL support via logical CSS properties (`marginInlineStart`, `insetInlineEnd`, etc.)
- Screen reader announcements on interactive state changes

---

## Package

| Field | Value |
|---|---|
| Entry (ESM) | `dist/esm/ds.js` |
| Entry (CJS) | `dist/cjs/ds.js` |
| Types | `dist/types/ds.d.ts` |
| Tree-shakeable | ✅ `sideEffects: false` |
| Min Node | 16.0.0 |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

[MIT](LICENSE) © Lumel Technologies
