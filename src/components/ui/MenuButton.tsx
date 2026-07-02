/**
 * MenuButton — A button that opens a dropdown menu on click.
 *
 * Wraps Fluent UI v9 `MenuButton` inside the DS Menu system.
 * The entire button is the menu trigger (contrast with SplitButton where
 * only the chevron area opens the menu).
 *
 * Usage:
 *   import { MenuButton } from "../components/ui";
 *   <MenuButton
 *     label="Actions"
 *     appearance="primary"
 *     items={[
 *       { id: "edit", label: "Edit", icon: <Edit20Regular /> },
 *       { id: "delete", label: "Delete", danger: true },
 *     ]}
 *     onSelect={(id) => handle(id)}
 *   />
 *
 * Dependencies: Menu (./Menu), @fluentui/react-components
 */
import React from "react";
import {
  MenuButton as FluentMenuButton,
  Menu as FluentMenu,
  MenuTrigger as FluentMenuTrigger,
  MenuPopover as FluentMenuPopover,
  MenuList as FluentMenuList,
  tokens,
} from "@fluentui/react-components";
import type { PositioningShorthand } from "@fluentui/react-components";
import { MenuItemDef, MenuList, MenuDivider, MenuGroupHeader, MenuItem } from "./Menu";

export type MenuButtonAppearance = "primary" | "secondary" | "subtle";
export type MenuButtonSize = "small" | "medium";

export interface MenuButtonProps {
  /** Button label */
  label: React.ReactNode;
  /** Menu items */
  items: MenuItemDef[];
  /** Fires with selected item id */
  onSelect?: (id: string) => void;
  appearance?: MenuButtonAppearance;
  size?: MenuButtonSize;
  disabled?: boolean;
  icon?: React.ReactElement;
  positioning?: PositioningShorthand;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
}

function renderMenuItems(items: MenuItemDef[], onSelect?: (id: string) => void): React.ReactNode {
  return items.map((item) => {
    if (item.type === "divider") return <MenuDivider key={item.id} />;
    if (item.type === "group-header") return <MenuGroupHeader key={item.id}>{item.label}</MenuGroupHeader>;
    return (
      <MenuItem
        key={item.id}
        icon={item.icon}
        disabled={item.disabled}
        onClick={() => !item.disabled && onSelect?.(item.id)}
        style={item.danger ? { color: tokens.colorStatusDangerForeground1 } : undefined}
      >
        {item.label}
      </MenuItem>
    );
  });
}

/**
 * MenuButton is a Button with a built-in chevron indicating that clicking it always opens a dropdown menu. Unlike SplitButton, the entire button surface is a single target that always opens the menu — there is no standalone primary action.
 *
 * **When to use:** 'More actions', 'Insert…', 'Export to…' — any action that consistently resolves to choosing from a list.
 * **When NOT to use:** When there IS a clear primary action and the menu is secondary (use SplitButton). Only one menu item (use regular Button). Navigation (use Link or Nav).
 */
export const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({
    label,
    items,
    onSelect,
    appearance = "secondary",
    size = "medium",
    disabled,
    icon,
    positioning = "below-start",
    open,
    onOpenChange,
    className,
    style,
    "aria-label": ariaLabel,
  }: MenuButtonProps, ref) => {
    return (
      <FluentMenu
        positioning={positioning}
        open={open}
        onOpenChange={(_e, data) => onOpenChange?.(data.open)}
      >
        <FluentMenuTrigger disableButtonEnhancement>
          <FluentMenuButton
            ref={ref}
            appearance={appearance}
            size={size}
            disabled={disabled}
            icon={icon}
            className={className}
            style={style}
            aria-label={ariaLabel}
          >
            {label}
          </FluentMenuButton>
        </FluentMenuTrigger>
        <FluentMenuPopover>
          <FluentMenuList>
            {renderMenuItems(items, onSelect)}
          </FluentMenuList>
        </FluentMenuPopover>
      </FluentMenu>
    );
  }
);
MenuButton.displayName = "MenuButton";
