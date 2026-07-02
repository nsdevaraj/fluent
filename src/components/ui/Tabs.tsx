/**
 * Tabs — Controlled/uncontrolled tabbed navigation
 *
 * Usage:
 *   import { Tabs } from "../components/ui";
 *   <Tabs
 *     tabs={[
 *       { value: "overview", label: "Overview", icon: <Home20Regular /> },
 *       { value: "settings", label: "Settings" },
 *     ]}
 *     defaultSelectedValue="overview"
 *     panels={{ overview: <p>Overview content</p>, settings: <p>Settings content</p> }}
 *   />
 *
 * Dependencies: @fluentui/react-components
 */

import React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import {
  TabList,
  Tab,
  makeStyles,
  tokens,
  mergeClasses,
} from "@fluentui/react-components";
import type { SelectTabData, SelectTabEvent } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  rootVertical: {
    flexDirection: "row",
    gap: tokens.spacingHorizontalL,
  },
  panel: {
    paddingTop: tokens.spacingVerticalM,
    outline: "none",
    // WCAG 2.4.7: provide visible focus indicator for keyboard users
    ":focus-visible": {
      outlineWidth: tokens.strokeWidthThick,
      outlineStyle: "solid",
      outlineColor: tokens.colorBrandStroke1,
      outlineOffset: tokens.strokeWidthThin,
    },
  },
  panelVertical: {
    paddingTop: 0,
    paddingInlineStart: tokens.spacingHorizontalM,
    flex: 1,
  },
});

export interface TabItem {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactElement;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  /** Panel content keyed by tab value */
  panels?: Record<string, React.ReactNode>;
  /** Controlled selected tab value */
  selectedValue?: string;
  defaultSelectedValue?: string;
  onTabSelect?: (value: string) => void;
  size?: "small" | "medium";
  appearance?: "transparent" | "subtle";
  vertical?: boolean;
}

/**
 * Tabs organize content into multiple panels where only one panel is visible at a time, with tab labels displayed as a horizontal or vertical row. Each tab corresponds to a distinct but related content section.
 *
 * **When to use:** Organizing closely related content into parallel views — 'Overview / Details / History' within a record, or 'All / Active / Archived' filter views. 2–8 tabs of roughly equal importance.
 * **When NOT to use:** Sequential workflows where order matters (use a Stepper/wizard). Primary site navigation (use NavDrawer or SideNav). More than 8–10 tabs (they become hard to scan).
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({
  tabs,
  panels,
  selectedValue: controlledValue,
  defaultSelectedValue,
  onTabSelect,
  size = "medium",
  appearance = "transparent",
  vertical = false,
}: TabsProps, ref) => {
  const styles = useStyles();

  const [activeValue, setActiveValue] = useControllableState<string>(
    controlledValue,
    defaultSelectedValue ?? tabs[0]?.value ?? ""
  );

  const handleSelect = (_: SelectTabEvent, data: SelectTabData) => {
    const val = data.value as string;
    setActiveValue(val);
    onTabSelect?.(val);
  };

  return (
    <div className={mergeClasses(styles.root, vertical ? styles.rootVertical : undefined)}>
      <TabList
        selectedValue={activeValue}
        onTabSelect={handleSelect}
        size={size}
        appearance={appearance}
        vertical={vertical}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            icon={tab.icon}
            disabled={tab.disabled}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>

      {panels && (
        <div
          role="tabpanel"
          aria-label={
            // WCAG 4.1.2: always provide accessible name for the panel
            typeof tabs.find((t) => t.value === activeValue)?.label === "string"
              ? (tabs.find((t) => t.value === activeValue)?.label as string)
              : (tabs.find((t) => t.value === activeValue)?.value ?? "Tab panel")
          }
          tabIndex={0}
          className={mergeClasses(
            styles.panel,
            vertical ? styles.panelVertical : undefined
          )}
        >
          {panels[activeValue]}
        </div>
      )}
    </div>
  );
}
);
Tabs.displayName = "Tabs";
