/**
 * Menu — Dropdown / context menu system.
 *
 * Composes Fluent UI v9 Menu primitives into a data-driven API while
 * also re-exporting the lower-level building blocks for custom layouts.
 *
 * Two usage patterns:
 *
 * 1. Data-driven (recommended):
 *   import { Menu } from "../components/ui";
 *   <Menu
 *     trigger={<Button>Options</Button>}
 *     items={[
 *       { id: "edit", label: "Edit", icon: <Edit20Regular /> },
 *       { id: "divider-1", type: "divider" },
 *       { id: "delete", label: "Delete", icon: <Delete20Regular />, danger: true },
 *     ]}
 *     onSelect={(id) => console.log(id)}
 *   />
 *
 * 2. Composable:
 *   import { MenuRoot, MenuTrigger, MenuPopover, MenuList,
 *            MenuItem, MenuDivider, MenuGroup, MenuGroupHeader } from "../components/ui";
 *   <MenuRoot>
 *     <MenuTrigger><Button>More</Button></MenuTrigger>
 *     <MenuPopover>
 *       <MenuList>
 *         <MenuItem icon={<Edit20Regular />}>Edit</MenuItem>
 *         <MenuDivider />
 *         <MenuItem icon={<Delete20Regular />}>Delete</MenuItem>
 *       </MenuList>
 *     </MenuPopover>
 *   </MenuRoot>
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  Menu as FluentMenu,
  MenuTrigger as FluentMenuTrigger,
  MenuPopover as FluentMenuPopover,
  MenuList as FluentMenuList,
  MenuItem as FluentMenuItem,
  MenuDivider as FluentMenuDivider,
  MenuGroup as FluentMenuGroup,
  MenuGroupHeader as FluentMenuGroupHeader,
  MenuItemCheckbox as FluentMenuItemCheckbox,
  MenuItemRadio as FluentMenuItemRadio,
  MenuItemLink as FluentMenuItemLink,
  MenuItemSwitch as FluentMenuItemSwitch,
  tokens,
} from "@fluentui/react-components";
import type { PositioningShorthand } from "@fluentui/react-components";

// ── Re-exports of Fluent primitives for composable usage ──────────────────────
export {
  FluentMenu      as MenuRoot,
  FluentMenuTrigger  as MenuTrigger,
  FluentMenuPopover  as MenuPopover,
  FluentMenuList     as MenuList,
  FluentMenuItem     as MenuItem,
  FluentMenuDivider  as MenuDivider,
  FluentMenuGroup    as MenuGroup,
  FluentMenuGroupHeader as MenuGroupHeader,
  FluentMenuItemCheckbox as MenuItemCheckbox,
  FluentMenuItemRadio    as MenuItemRadio,
  FluentMenuItemLink     as MenuItemLink,
  FluentMenuItemSwitch   as MenuItemSwitch,
};

// ── Data-driven item types ─────────────────────────────────────────────────────

export interface MenuItemDef {
  id: string;
  /** "item" (default) | "divider" | "group-header" | "switch" */
  type?: "item" | "divider" | "group-header" | "switch";
  label?: string;
  icon?: React.ReactElement;
  /** Disable this item */
  disabled?: boolean;
  /** Render as a destructive/danger item */
  danger?: boolean;
  /** Shortcut hint displayed on the trailing side */
  shortcut?: string;
  /** Sub-menu items */
  submenu?: MenuItemDef[];
  /** Checked state for switch-type items */
  checked?: boolean;
}

export interface MenuProps {
  /** The trigger element (button, icon-button, etc.) */
  trigger: React.ReactElement;
  /** Menu items */
  items: MenuItemDef[];
  /** Fires with the selected item id */
  onSelect?: (id: string) => void;
  /** Popover positioning */
  positioning?: PositioningShorthand;
  /** Open state — omit for uncontrolled */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function renderItems(items: MenuItemDef[], onSelect?: (id: string) => void): React.ReactNode {
  return items.map((item) => {
    if (item.type === "divider") {
      return <FluentMenuDivider key={item.id} />;
    }
    if (item.type === "group-header") {
      return <FluentMenuGroupHeader key={item.id}>{item.label}</FluentMenuGroupHeader>;
    }
    if (item.type === "switch") {
      return (
        <FluentMenuItemSwitch
          key={item.id}
          name={item.id}
          value={item.id}
          icon={item.icon}
          disabled={item.disabled}
          onClick={() => !item.disabled && onSelect?.(item.id)}
        >
          {item.label}
        </FluentMenuItemSwitch>
      );
    }
    if (item.submenu && item.submenu.length > 0) {
      return (
        <FluentMenu key={item.id} positioning="after">
          <FluentMenuTrigger disableButtonEnhancement>
            <FluentMenuItem icon={item.icon} disabled={item.disabled}>
              {item.label}
            </FluentMenuItem>
          </FluentMenuTrigger>
          <FluentMenuPopover>
            <FluentMenuList>
              {renderItems(item.submenu, onSelect)}
            </FluentMenuList>
          </FluentMenuPopover>
        </FluentMenu>
      );
    }
    return (
      <FluentMenuItem
        key={item.id}
        icon={item.icon}
        disabled={item.disabled}
        onClick={() => !item.disabled && onSelect?.(item.id)}
        aria-label={item.shortcut ? `${item.label}, shortcut: ${item.shortcut}` : undefined}
        style={item.danger ? { color: tokens.colorStatusDangerForeground1 } : undefined}
      >
        <span style={{ flex: 1 }}>{item.label}</span>
        {item.shortcut && (
          <span
            style={{
              fontSize: tokens.fontSizeBase100,
              color: tokens.colorNeutralForeground3,
              marginInlineStart: tokens.spacingHorizontalM,
            }}
            aria-hidden="true"
          >
            {item.shortcut}
          </span>
        )}
      </FluentMenuItem>
    );
  });
}

/**
 * Menu presents a contextual overlay of actionable items, checkable items, radio groups, or nested submenus, triggered by a button or interactive element and dismissed on selection or outside click.
 *
 * **When to use:** Contextual/right-click menus, action overflow ('…' / 'More'), dropdown command lists triggered by MenuButton or SplitButton. When actions are contextual to a selected item.
 * **When NOT to use:** Selecting a single value from a list (use Dropdown/Select — proper form semantics). Primary navigation (use Nav or TabList). Deeply nested menus beyond 2 levels.
 *
 * For full compositional control use the MenuRoot / MenuTrigger / MenuPopover / MenuList primitives directly.
 */
export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({
    trigger,
    items,
    onSelect,
    positioning = "below-start",
    open,
    onOpenChange,
  }: MenuProps, _ref) => {
    return (
      <FluentMenu
        positioning={positioning}
        open={open}
        onOpenChange={(_e, data) => onOpenChange?.(data.open)}
      >
        <FluentMenuTrigger disableButtonEnhancement>
          {trigger}
        </FluentMenuTrigger>
        <FluentMenuPopover>
          <FluentMenuList>
            {renderItems(items, onSelect)}
          </FluentMenuList>
        </FluentMenuPopover>
      </FluentMenu>
    );
  }
);
Menu.displayName = "Menu";
