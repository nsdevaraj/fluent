/**
 * SideNav — Vertical navigation sidebar with groups, icons, and active state
 *
 * Usage:
 *   import { SideNav } from "../components/ui";
 *   <SideNav
 *     items={[
 *       { id: "home", label: "Home", icon: <Home20Regular /> },
 *       {
 *         id: "reports",
 *         label: "Reports",
 *         icon: <ChartMultiple20Regular />,
 *         children: [
 *           { id: "sales", label: "Sales" },
 *           { id: "usage", label: "Usage" },
 *         ],
 *       },
 *     ]}
 *     selectedId="home"
 *     onSelect={(id) => navigate(id)}
 *   />
 *
 * Dependencies: @fluentui/react-components, DS Typography
 */

import React, { useState, useCallback } from "react";
import { makeStyles, tokens, mergeClasses } from "@fluentui/react-components";
import { ChevronDown20Regular, ChevronRight20Regular } from "@fluentui/react-icons";
import { Caption, Body } from "./Typography";
import { useClickKeydown } from "../../hooks/useClickKeydown";
import {
  DS_SIDENAV_EXPANDED_WIDTH,
  DS_SIDENAV_COLLAPSED_WIDTH,
  DS_NAV_LABEL_LETTER_SPACING,
  DS_ICON_SIZE_SM,
} from "./CONSTANTS";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: DS_SIDENAV_EXPANDED_WIDTH,
    minHeight: "100%",
    backgroundColor: tokens.colorNeutralBackground2,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    borderInlineEndWidth: tokens.strokeWidthThin,
    borderInlineEndStyle: "solid",
    borderInlineEndColor: tokens.colorNeutralStroke1,
  },
  rootCollapsed: {
    width: DS_SIDENAV_COLLAPSED_WIDTH,
  },
  groupLabel: {
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalXS,
    paddingInlineStart: tokens.spacingHorizontalM,
    paddingInlineEnd: tokens.spacingHorizontalM,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: DS_NAV_LABEL_LETTER_SPACING,
  },
  groupDivider: {
    height: tokens.strokeWidthThin,
    backgroundColor: tokens.colorNeutralStroke1,
    marginTop: tokens.spacingVerticalXS,
    marginBottom: tokens.spacingVerticalXS,
    marginInlineStart: tokens.spacingHorizontalM,
    marginInlineEnd: tokens.spacingHorizontalM,
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minHeight: "32px",
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingInlineStart: tokens.spacingHorizontalM,
    paddingInlineEnd: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    marginInlineStart: tokens.spacingHorizontalXS,
    marginInlineEnd: tokens.spacingHorizontalXS,
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    outline: "none",
    transitionProperty: "background-color, color",
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1,
    },
    ":focus-visible": {
      outlineWidth: tokens.strokeWidthThick,
      outlineStyle: "solid",
      outlineColor: tokens.colorBrandStroke1,
      outlineOffset: `calc(${tokens.strokeWidthThin} * -1)`,
    },
  },
  itemActive: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Selected,
    },
  },
  itemDisabled: {
    // Use semantic disabled tokens so HC theme renders GrayText (not just opacity)
    color: tokens.colorNeutralForegroundDisabled,
    cursor: "not-allowed",
    pointerEvents: "none",
    ":hover": {
      backgroundColor: "transparent",
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  itemIcon: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    color: "inherit",
    fontSize: DS_ICON_SIZE_SM,
  },
  itemLabel: {
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  chevron: {
    display: "flex",
    alignItems: "center",
    color: tokens.colorNeutralForeground3,
    marginInlineStart: "auto",
    flexShrink: 0,
  },
  badge: {
    marginInlineStart: "auto",
  },
  children: {
    display: "flex",
    flexDirection: "column",
    paddingInlineStart: tokens.spacingHorizontalXL,
  },
  childItem: {
    // paddingInlineStart aligns child text under parent text:
    // container(20) + margin(4) + this(20) = 44px = parent margin(4) + padding(12) + icon(20) + gap(8)
    minHeight: "28px",
    paddingTop: tokens.spacingVerticalXXS,
    paddingBottom: tokens.spacingVerticalXXS,
    paddingInlineStart: tokens.spacingHorizontalXL,
  },
  collapsedLabel: {
    display: "none",
  },
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SideNavItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactElement;
  disabled?: boolean;
  badge?: React.ReactNode;
  /** Nested child items */
  children?: SideNavItem[];
}

export interface SideNavGroup {
  /** Optional group heading */
  label?: string;
  items: SideNavItem[];
}

export interface SideNavProps {
  /** Flat list of items OR grouped items */
  items?: SideNavItem[];
  groups?: SideNavGroup[];
  /** Currently active item ID */
  selectedId?: string;
  onSelect?: (id: string) => void;
  /** Collapse to icon-only mode */
  collapsed?: boolean;
}

// ─── NavItem sub-component ───────────────────────────────────────────────────

interface NavItemProps {
  item: SideNavItem;
  selectedId?: string;
  onSelect?: (id: string) => void;
  collapsed?: boolean;
  isChild?: boolean;
  styles: ReturnType<typeof useStyles>;
}

function NavItem({ item, selectedId, onSelect, collapsed, isChild, styles }: NavItemProps) {
  const [open, setOpen] = useState(
    // Auto-open if a child is active
    !!item.children?.some((c) => c.id === selectedId)
  );

  const isActive = item.id === selectedId;
  const hasChildren = item.children && item.children.length > 0;

  const doAction = useCallback(() => {
    if (hasChildren) {
      setOpen((o) => !o);
    } else {
      onSelect?.(item.id);
    }
  }, [hasChildren, onSelect, item.id]);

  const { onClick: handleClick, onKeyDown: handleKeyDown } = useClickKeydown(doAction, item.disabled);

  return (
    <>
      <div
        role={hasChildren ? "button" : undefined}
        aria-current={isActive ? "page" : undefined}
        aria-disabled={item.disabled}
        aria-expanded={hasChildren ? open : undefined}
        tabIndex={item.disabled ? -1 : 0}
        className={mergeClasses(
          styles.item,
          isChild ? styles.childItem : undefined,
          isActive ? styles.itemActive : undefined,
          item.disabled ? styles.itemDisabled : undefined
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {item.icon && (
          <span className={styles.itemIcon} aria-hidden="true">
            {item.icon}
          </span>
        )}

        {!collapsed && (
          <span className={styles.itemLabel}>
            <Body size={isChild ? "sm" : "base"} as="span">{item.label}</Body>
          </span>
        )}

        {!collapsed && item.badge && (
          <span className={styles.badge}>{item.badge}</span>
        )}

        {!collapsed && hasChildren && (
          <span className={styles.chevron} aria-hidden="true">
            {open ? <ChevronDown20Regular /> : <ChevronRight20Regular />}
          </span>
        )}
      </div>

      {hasChildren && open && !collapsed && (
        <div className={styles.children} role="group">
          {item.children!.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              selectedId={selectedId}
              onSelect={onSelect}
              collapsed={false}
              isChild
              styles={styles}
            />
          ))}
        </div>
      )}
    </>
  );
}

// ─── SideNav ─────────────────────────────────────────────────────────────────

/**
 * SideNav is a persistent vertical navigation panel providing top-level application navigation with support for nested items, icons, and selection state. Built on Fluent's NavDrawer and NavItem components.
 *
 * **When to use:** Top-level navigation in applications with multiple distinct sections. When persistent navigation context aids orientation and frequent section switching.
 * **When NOT to use:** Content navigation within a single page (use Tabs or Accordion). Mobile-first layouts where a hamburger menu or bottom navigation would be more appropriate.
 */
export const SideNav = React.forwardRef<HTMLDivElement, SideNavProps>(
  ({
  items,
  groups,
  selectedId,
  onSelect,
  collapsed = false,
}: SideNavProps, ref) => {
  const styles = useStyles();

  // Normalise: either items or groups
  const resolvedGroups: SideNavGroup[] = groups
    ? groups
    : items
    ? [{ items }]
    : [];

  return (
    <nav
      aria-label="Main navigation"
      className={mergeClasses(styles.root, collapsed ? styles.rootCollapsed : undefined)}
      role="navigation"
    >
      {resolvedGroups.map((group, gi) => (
        // WCAG 4.1.2: role="group" must always have an accessible name
        <div key={gi} role="group" aria-label={typeof group.label === "string" ? group.label : `Navigation group ${gi + 1}`}>
          {group.label && !collapsed && (
            <div className={styles.groupLabel}>
              <Caption>{group.label}</Caption>
            </div>
          )}
          {gi > 0 && !group.label && <div className={styles.groupDivider} aria-hidden="true" />}
          {group.items.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              selectedId={selectedId}
              onSelect={onSelect}
              collapsed={collapsed}
              styles={styles}
            />
          ))}
        </div>
      ))}
    </nav>
  );
}
);
SideNav.displayName = "SideNav";
