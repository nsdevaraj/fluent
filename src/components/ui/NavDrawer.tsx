/**
 * NavDrawer — Fluent v9 Nav Drawer system
 *
 * Two layers of API:
 *
 * 1. **Composable primitives** — Re-exports of every Fluent Nav primitive so
 *    consumers can assemble custom layouts without reaching into
 *    `@fluentui/react-components` directly:
 *
 *    ```tsx
 *    import { NavDrawer, NavDrawerBody, NavDrawerHeader, Nav, NavItem } from "../components/ui";
 *
 *    <NavProvider selectedValue={selected} onNavItemSelect={(_, d) => setSelected(d.value)}>
 *      <NavDrawer open={open} type="overlay" size="medium">
 *        <NavDrawerHeader><Text weight="semibold">My App</Text></NavDrawerHeader>
 *        <NavDrawerBody>
 *          <Nav>
 *            <NavItem value="home" icon={<HomeIcon />}>Home</NavItem>
 *          </Nav>
 *        </NavDrawerBody>
 *      </NavDrawer>
 *    </NavProvider>
 *    ```
 *
 * 2. **Data-driven `DSNavDrawer`** — A batteries-included composite that
 *    renders the full drawer from a plain `items` array:
 *
 *    ```tsx
 *    import { DSNavDrawer } from "../components/ui";
 *
 *    const items: DSNavItem[] = [
 *      { id: "home",     label: "Home",     icon: <HomeIcon /> },
 *      { id: "reports",  label: "Reports",  icon: <ChartIcon />,
 *        children: [
 *          { id: "reports-daily",   label: "Daily" },
 *          { id: "reports-monthly", label: "Monthly" },
 *        ]
 *      },
 *      { id: "div1", label: "", type: "divider" },
 *      { id: "sec1", label: "Admin", type: "section-header" },
 *      { id: "settings", label: "Settings", icon: <SettingsIcon /> },
 *    ];
 *
 *    <DSNavDrawer
 *      items={items}
 *      open={drawerOpen}
 *      onOpenChange={setDrawerOpen}
 *      selectedValue={activeId}
 *      onNavItemSelect={setActiveId}
 *      header={<AppLogo />}
 *      footer={<AccountRow />}
 *    />
 *    ```
 */

import React from "react";
import {
  Nav,
  NavDrawer as FluentNavDrawer,
  NavDrawerBody as FluentNavDrawerBody,
  NavDrawerHeader as FluentNavDrawerHeader,
  NavDrawerFooter as FluentNavDrawerFooter,
  NavItem as FluentNavItem,
  NavCategory as FluentNavCategory,
  NavCategoryItem as FluentNavCategoryItem,
  NavSectionHeader as FluentNavSectionHeader,
  NavSubItem as FluentNavSubItem,
  NavSubItemGroup as FluentNavSubItemGroup,
  NavDivider as FluentNavDivider,
  SplitNavItem as FluentSplitNavItem,
  NavCategoryItemProvider as FluentNavCategoryItemProvider,
  NavProvider as FluentNavProvider,
  AppItem as FluentAppItem,
  AppItemStatic as FluentAppItemStatic,
} from "@fluentui/react-components";

// ── 1. Re-export composable primitives ────────────────────────────────────────
export {
  Nav,
  FluentNavDrawer as NavDrawer,
  FluentNavDrawerBody as NavDrawerBody,
  FluentNavDrawerHeader as NavDrawerHeader,
  FluentNavDrawerFooter as NavDrawerFooter,
  FluentNavItem as NavItem,
  FluentNavCategory as NavCategory,
  FluentNavCategoryItem as NavCategoryItem,
  FluentNavSectionHeader as NavSectionHeader,
  FluentNavSubItem as NavSubItem,
  FluentNavSubItemGroup as NavSubItemGroup,
  FluentNavDivider as NavDivider,
  FluentSplitNavItem as SplitNavItem,
  FluentNavCategoryItemProvider as NavCategoryItemProvider,
  FluentNavProvider as NavProviderRoot,
  FluentAppItem as AppItem,
  FluentAppItemStatic as AppItemStatic,
};

// ── 2. Data-driven DSNavDrawer ────────────────────────────────────────────────

export interface DSNavItem {
  /** Unique identifier — used as the Nav value for selection tracking. */
  id: string;
  /** Display label. For type "divider" this is ignored. */
  label: string;
  /** Optional Fluent icon element, e.g. `<HomeRegular />`. */
  icon?: React.ReactElement;
  /** If provided, the nav item acts as an anchor. */
  href?: string;
  /** Renders the item in a disabled state. */
  disabled?: boolean;
  /**
   * - `"item"` (default) — standard nav item
   * - `"section-header"` — renders a `NavSectionHeader`
   * - `"divider"` — renders a `NavDivider`
   */
  type?: "item" | "section-header" | "divider";
  /**
   * When provided, the item becomes a `NavCategory` and its children are
   * rendered as `NavSubItem`s inside a `NavSubItemGroup`.
   */
  children?: DSNavItem[];
}

export interface DSNavDrawerProps {
  /** The list of nav items to render. */
  items: DSNavItem[];
  /** The currently selected nav item id. */
  selectedValue?: string;
  /** Called when the user selects a nav item. */
  onNavItemSelect?: (value: string) => void;
  /** Controls the open/closed state of the drawer. */
  open?: boolean;
  /** Called when the drawer requests an open/close state change. */
  onOpenChange?: (open: boolean) => void;
  /** Width preset: "small" | "medium". Defaults to "medium". */
  size?: "small" | "medium";
  /** Drawer behaviour: "overlay" (default) floats above content; "inline" pushes content. */
  type?: "overlay" | "inline";
  /** Optional slot rendered inside `NavDrawerHeader`, e.g. a logo or app name. */
  header?: React.ReactNode;
  /** Optional slot rendered inside `NavDrawerFooter`, e.g. account or settings links. */
  footer?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Recursively render a single DSNavItem (and its children) into Fluent Nav primitives. */
function renderNavItem(item: DSNavItem): React.ReactNode {
  // Divider
  if (item.type === "divider") {
    return <FluentNavDivider key={item.id} />;
  }

  // Section header
  if (item.type === "section-header") {
    return (
      <FluentNavSectionHeader key={item.id}>
        {item.label}
      </FluentNavSectionHeader>
    );
  }

  // Category (item with children)
  if (item.children && item.children.length > 0) {
    return (
      <FluentNavCategory key={item.id} value={item.id}>
        <FluentNavCategoryItem
          icon={item.icon}
          disabled={item.disabled}
        >
          {item.label}
        </FluentNavCategoryItem>
        <FluentNavSubItemGroup>
          {item.children.map((child) => (
            <FluentNavSubItem
              key={child.id}
              value={child.id}
              href={child.href}
              disabled={child.disabled}
            >
              {child.label}
            </FluentNavSubItem>
          ))}
        </FluentNavSubItemGroup>
      </FluentNavCategory>
    );
  }

  // Standard item
  return (
    <FluentNavItem
      key={item.id}
      value={item.id}
      icon={item.icon}
      href={item.href}
      disabled={item.disabled}
    >
      {item.label}
    </FluentNavItem>
  );
}

/**
 * `DSNavDrawer` — data-driven composite nav drawer.
 *
 * Wraps Fluent's `NavProvider > NavDrawer > NavDrawerHeader? + NavDrawerBody >
 * Nav + NavDrawerFooter?` in a single component driven by a plain `items` array.
 */
export const DSNavDrawer: React.FC<DSNavDrawerProps> = ({
  items,
  selectedValue,
  onNavItemSelect,
  open = false,
  onOpenChange,
  size = "medium",
  type = "overlay",
  header,
  footer,
  className,
  style,
}) => {
  return (
    <FluentNavDrawer
      open={open}
      onOpenChange={(_event: unknown, data: { open: boolean }) => onOpenChange?.(data.open)}
      size={size}
      type={type}
      className={className}
      style={style}
    >
      {header && (
        <FluentNavDrawerHeader>
          {header}
        </FluentNavDrawerHeader>
      )}

      <FluentNavDrawerBody>
        <Nav
          selectedValue={selectedValue}
          onNavItemSelect={(_event: unknown, data: { value: string }) => {
            onNavItemSelect?.(data.value);
          }}
        >
          {items.map(renderNavItem)}
        </Nav>
      </FluentNavDrawerBody>

        {footer && (
          <FluentNavDrawerFooter>
            {footer}
          </FluentNavDrawerFooter>
        )}
      </FluentNavDrawer>
  );
};

DSNavDrawer.displayName = "DSNavDrawer";
