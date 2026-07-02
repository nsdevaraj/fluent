/**
 * Toolbar — Horizontal action bar with buttons, toggles, dividers, and overflow.
 *
 * Wraps Fluent UI v9 Toolbar family. Re-exports all sub-components for
 * composable usage and provides a data-driven wrapper.
 *
 * Composable usage:
 *   import { ToolbarRoot, ToolbarBtn, ToolbarToggleBtn,
 *            ToolbarDivider, ToolbarGroup } from "../components/ui";
 *   <ToolbarRoot aria-label="Text formatting">
 *     <ToolbarToggleBtn icon={<TextBoldRegular />} aria-label="Bold" />
 *     <ToolbarToggleBtn icon={<TextItalicRegular />} aria-label="Italic" />
 *     <ToolbarDivider />
 *     <ToolbarBtn icon={<AlignLeftRegular />} aria-label="Align left" />
 *   </ToolbarRoot>
 *
 * Data-driven usage:
 *   <Toolbar
 *     aria-label="Actions"
 *     items={[
 *       { id: "bold", type: "toggle", icon: <TextBoldRegular />, label: "Bold" },
 *       { id: "div-1", type: "divider" },
 *       { id: "copy", type: "button", icon: <CopyRegular />, label: "Copy", onClick: handleCopy },
 *     ]}
 *   />
 *
 * Dependencies: @fluentui/react-components
 */
import React from "react";
import {
  Toolbar as FluentToolbar,
  ToolbarButton as FluentToolbarButton,
  ToolbarToggleButton as FluentToolbarToggleButton,
  ToolbarDivider as FluentToolbarDivider,
  ToolbarGroup as FluentToolbarGroup,
  ToolbarRadioButton as FluentToolbarRadioButton,
  ToolbarRadioGroup as FluentToolbarRadioGroup,
} from "@fluentui/react-components";

// ── Re-exports for composable usage ──────────────────────────────────────────
export {
  FluentToolbar        as ToolbarRoot,
  FluentToolbarButton  as ToolbarBtn,
  FluentToolbarToggleButton as ToolbarToggleBtn,
  FluentToolbarDivider as ToolbarDivider,
  FluentToolbarGroup   as ToolbarGroup,
  FluentToolbarRadioButton  as ToolbarRadioBtn,
  FluentToolbarRadioGroup   as ToolbarRadioGroup,
};

// ── Data-driven item types ─────────────────────────────────────────────────────

export interface ToolbarItemBase {
  id: string;
}

export interface ToolbarButtonItem extends ToolbarItemBase {
  type: "button";
  label: string;
  icon?: React.ReactElement;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  appearance?: "primary" | "secondary" | "subtle";
}

export interface ToolbarToggleItem extends ToolbarItemBase {
  type: "toggle";
  label: string;
  icon?: React.ReactElement;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export interface ToolbarDividerItem extends ToolbarItemBase {
  type: "divider";
}

export type ToolbarItem = ToolbarButtonItem | ToolbarToggleItem | ToolbarDividerItem;

export interface ToolbarProps {
  /** All toolbar items in order */
  items: ToolbarItem[];
  /** Accessible label for the toolbar region */
  "aria-label": string;
  size?: "small" | "medium";
  checkedValues?: Record<string, string[]>;
  onCheckedValueChange?: (name: string, values: string[]) => void;
  className?: string;
  style?: React.CSSProperties;
  /** Vertical orientation (default: horizontal) */
  vertical?: boolean;
}

/**
 * Toolbar groups related action controls — Buttons, ToggleButtons, MenuButtons — into a horizontal band with a single tab stop. Arrow-key navigation within the toolbar reduces keyboard burden and ARIA role='toolbar' communicates grouping to assistive technologies.
 *
 * **When to use:** 3 or more related actions forming a coherent functional group — text formatting controls, drawing tool selectors, contextual actions for a selected item.
 * **When NOT to use:** Navigation links (use NavMenu or TabList). Fewer than 3 unrelated actions (use standalone Buttons). Page-level headers or app bars.
 */
export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({
    items,
    "aria-label": ariaLabel,
    size = "medium",
    checkedValues: controlledChecked,
    onCheckedValueChange,
    className,
    style,
    vertical = false,
  }: ToolbarProps, ref) => {
    // Build checkedValues from item.checked if not controlled externally
    const derivedChecked = React.useMemo(() => {
      const cv: Record<string, string[]> = {};
      items.forEach((item) => {
        if (item.type === "toggle") {
          const t = item as ToolbarToggleItem;
          if (t.checked) cv[t.id] = [t.id];
        }
      });
      return cv;
    }, [items]);

    const handleCheckedValueChange = (_e: unknown, data: { name: string; checkedItems: string[] }) => {
      // Dispatch per-item onChange callbacks
      const toggleItem = items.find(
        (i) => i.id === data.name && i.type === "toggle"
      ) as ToolbarToggleItem | undefined;
      toggleItem?.onChange?.(data.checkedItems.includes(data.name));
      onCheckedValueChange?.(data.name, data.checkedItems);
    };

    return (
      <FluentToolbar
        ref={ref}
        aria-label={ariaLabel}
        size={size}
        checkedValues={controlledChecked ?? derivedChecked}
        onCheckedValueChange={handleCheckedValueChange as Parameters<typeof FluentToolbar>[0]["onCheckedValueChange"]}
        className={className}
        style={style}
        vertical={vertical}
      >
        {items.map((item) => {
          if (item.type === "divider") {
            return <FluentToolbarDivider key={item.id} />;
          }
          if (item.type === "toggle") {
            const t = item as ToolbarToggleItem;
            return (
              <FluentToolbarToggleButton
                key={t.id}
                name={t.id}
                value={t.id}
                icon={t.icon}
                disabled={t.disabled}
                aria-label={t.label}
              />
            );
          }
          const b = item as ToolbarButtonItem;
          return (
            <FluentToolbarButton
              key={b.id}
              icon={b.icon}
              disabled={b.disabled}
              onClick={b.onClick}
              appearance={b.appearance as "primary" | "subtle" | undefined}
              aria-label={b.label}
            >
              {b.label}
            </FluentToolbarButton>
          );
        })}
      </FluentToolbar>
    );
  }
);
Toolbar.displayName = "Toolbar";
