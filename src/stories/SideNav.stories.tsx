import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { SideNav } from "../components/ui";
import { Home20Regular, ChartMultiple20Regular, Settings20Regular, People20Regular, DocumentMultiple20Regular } from "@fluentui/react-icons";
import { darkTheme } from "../themes";

const items = [
  { id: "home", label: "Home", icon: <Home20Regular /> },
  { id: "reports", label: "Reports", icon: <ChartMultiple20Regular />, children: [
    { id: "sales", label: "Sales" },
    { id: "usage", label: "Usage" },
  ]},
  { id: "people", label: "People", icon: <People20Regular /> },
  { id: "docs", label: "Documents", icon: <DocumentMultiple20Regular /> },
  { id: "settings", label: "Settings", icon: <Settings20Regular />, disabled: true },
];

function NavDemo({ collapsed }: { collapsed?: boolean }) {
  const [selected, setSelected] = useState("home");
  return (
    <div style={{ height: "400px", display: "flex" }}>
      <SideNav items={items} selectedId={selected} onSelect={setSelected} collapsed={collapsed} />
      <div style={{ padding: "16px" }}>Selected: <strong>{selected}</strong></div>
    </div>
  );
}

const meta: Meta = {
  title: "Phase 3/SideNav",
  component: SideNav,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "SideNav is a persistent vertical navigation panel providing top-level application navigation with support for nested items, icons, and selection state. Built on Fluent's NavDrawer and NavItem components.",
      },
    },
  },
  argTypes: {
    collapsed:       { control: "boolean" },
    collapsible:     { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <NavDemo />,
};

export const Collapsed: Story = {
  render: () => <NavDemo collapsed />,
};

/** RTL layout — border and padding should flip; chevrons should mirror */
export const RTL: Story = {
  render: () => {
    const [selected, setSelected] = useState("home");
    return (
      <FluentProvider theme={webLightTheme} dir="rtl">
        <div style={{ height: "400px", display: "flex", direction: "rtl" }}>
          <SideNav
            items={items}
            selectedId={selected}
            onSelect={setSelected}
          />
          <div style={{ padding: "16px" }}>Selected: <strong>{selected}</strong></div>
        </div>
      </FluentProvider>
    );
  },
};

export const CollapsedRTL: Story = {
  render: () => (
    <FluentProvider theme={webLightTheme} dir="rtl">
      <div style={{ height: "400px", display: "flex", direction: "rtl" }}>
        <SideNav items={items} selectedId="home" collapsed />
      </div>
    </FluentProvider>
  ),
};

export const WithGroups: Story = {
  render: () => {
    const [selected, setSelected] = useState("home");
    return (
      <div style={{ height: "400px", display: "flex" }}>
        <SideNav
          groups={[
            { label: "Main", items: [
              { id: "home", label: "Home", icon: <Home20Regular /> },
              { id: "reports", label: "Reports", icon: <ChartMultiple20Regular /> },
            ]},
            { label: "Admin", items: [
              { id: "people", label: "People", icon: <People20Regular /> },
              { id: "settings", label: "Settings", icon: <Settings20Regular /> },
            ]},
          ]}
          selectedId={selected}
          onSelect={setSelected}
        />
      </div>
    );
  },
};

// ── Theme & RTL stories ──────────────────────────────────────────────────────

const navItems = [
  { key: "home",     label: "Home",     icon: <Home20Regular /> },
  { key: "reports",  label: "Reports",  icon: <ChartMultiple20Regular />, active: true },
  { key: "settings", label: "Settings", icon: <Settings20Regular /> },
];

export const DarkMode: Story = {
  decorators: [(Story) => <FluentProvider theme={darkTheme}><Story /></FluentProvider>],
  args: { items: navItems, activeKey: "reports" },
};

export const RTLCollapsed: Story = {
  decorators: [(Story) => <FluentProvider theme={{}} dir="rtl"><Story /></FluentProvider>],
  args: { items: navItems, activeKey: "home", collapsed: true, collapsible: true },
};
