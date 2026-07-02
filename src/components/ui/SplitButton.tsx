/**
 * SplitButton — Primary action button with a separate dropdown trigger.
 *
 * Left zone = primary action (onClick).
 * Right zone = chevron → opens dropdown menu.
 *
 * Wraps Fluent UI v9 `SplitButton` + `MenuSplitGroup` pattern.
 *
 * Usage:
 *   import { SplitButton } from "../components/ui";
 *   <SplitButton
 *     label="Save"
 *     appearance="primary"
 *     onClick={() => handleSave()}
 *     items={[
 *       { id: "save-as", label: "Save as…" },
 *       { id: "save-copy", label: "Save a copy" },
 *       { id: "divider-1", type: "divider" },
 *       { id: "export", label: "Export" },
 *     ]}
 *     onSelect={(id) => handle(id)}
 *   />
 *
 * Dependencies: Menu (./Menu), @fluentui/react-components
 */
import React from "react";
import {
  SplitButton as FluentSplitButton,
  Menu as FluentMenu,
  MenuTrigger as FluentMenuTrigger,
  MenuPopover as FluentMenuPopover,
  MenuList as FluentMenuList,
  MenuButtonProps as FluentMenuButtonProps,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import type { PositioningShorthand } from "@fluentui/react-components";
import { MenuItemDef, MenuItem, MenuDivider, MenuGroupHeader } from "./Menu";

const useStyles = makeStyles({
  /**
   * The separator between the primary action and the chevron zone is Fluent's
   * internal ::before pseudo-element on the menuButton. Adding symmetric
   * horizontal padding to the menuButton slots gives the separator breathing
   * room and aligns the chevron icon centrally within its zone.
   */
  menuButtonSlot: {
    paddingInlineStart: tokens.spacingHorizontalS,
    paddingInlineEnd: tokens.spacingHorizontalS,
  },
});
export type SplitButtonAppearance = "primary" | "secondary" | "subtle";
export type SplitButtonSize = "small" | "medium";

export interface SplitButtonProps {
  /** Primary button label */
  label: React.ReactNode;
  /** Fires when the primary (left) button is clicked */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Dropdown menu items */
  items: MenuItemDef[];
  /** Fires with selected dropdown item id */
  onSelect?: (id: string) => void;
  appearance?: SplitButtonAppearance;
  size?: SplitButtonSize;
  disabled?: boolean;
  /** Icon shown in the primary button */
  icon?: React.ReactElement;
  positioning?: PositioningShorthand;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  /** aria-label for the primary button zone */
  "aria-label"?: string;
  /** aria-label for the chevron/dropdown zone */
  menuAriaLabel?: string;
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
 * SplitButton combines a primary action button with a chevron that opens a dropdown menu of related secondary actions. The left area executes the default action directly; the right chevron reveals alternatives.
 *
 * **When to use:** Clear primary/default action with a small set of closely related alternatives — 'Save' + 'Save as…', 'Send' + 'Schedule Send'.
 * **When NOT to use:** All options are equally important (use separate Buttons or MenuButton). Only one action exists (use Button). Secondary options are unrelated to the primary.
 */
export const SplitButton = React.forwardRef<HTMLButtonElement, SplitButtonProps>(
  ({
    label,
    onClick,
    items,
    onSelect,
    appearance = "secondary",
    size = "medium",
    disabled,
    icon,
    positioning = "below-end",
    open,
    onOpenChange,
    className,
    style,
    "aria-label": ariaLabel,
    menuAriaLabel = "More options",
  }: SplitButtonProps, ref) => {
    const styles = useStyles();
    return (
      <FluentMenu
        positioning={positioning}
        open={open}
        onOpenChange={(_e, data) => onOpenChange?.(data.open)}
      >
        <FluentMenuTrigger disableButtonEnhancement>
          <FluentSplitButton
            ref={ref}
            appearance={appearance}
            size={size}
            disabled={disabled}
            icon={icon}
            className={className}
            style={style}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            primaryActionButton={{ onClick, "aria-label": ariaLabel } as any}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            menuButton={{ "aria-label": menuAriaLabel, className: styles.menuButtonSlot } as any}
          >
            {label}
          </FluentSplitButton>
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
SplitButton.displayName = "SplitButton";
