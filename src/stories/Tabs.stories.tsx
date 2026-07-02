import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "../components/ui";

const meta: Meta<typeof Tabs> = {
  title: "Phase 3/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Tabs organize content into multiple panels where only one panel is visible at a time, with tab labels displayed as a horizontal or vertical row. Each tab corresponds to a distinct but related content section.",
      },
    },
  },
  argTypes: {
    appearance: { control: "select", options: ["transparent","subtle","underline"] },
    size:       { control: "select", options: ["small","medium"] },
    vertical:   { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

const tabs = [
  { value: "overview", label: "Overview" },
  { value: "details", label: "Details" },
  { value: "history", label: "History" },
];

const panels = {
  overview: <p style={{ margin: 0 }}>Overview content</p>,
  details: <p style={{ margin: 0 }}>Details content</p>,
  history: <p style={{ margin: 0 }}>History content</p>,
};

export const Default: Story = {
  args: { tabs, panels, defaultSelectedValue: "overview" },
};

export const Subtle: Story = {
  args: { tabs, panels, defaultSelectedValue: "details", appearance: "subtle" },
};

export const Small: Story = {
  args: { tabs, panels, defaultSelectedValue: "overview", size: "small" },
};

export const WithDisabled: Story = {
  args: {
    tabs: [
      { value: "a", label: "Active" },
      { value: "b", label: "Disabled", disabled: true },
      { value: "c", label: "Another" },
    ],
    panels: { a: <p>A content</p>, b: <p>B content</p>, c: <p>C content</p> },
    defaultSelectedValue: "a",
  },
};

export const Vertical: Story = {
  args: { tabs, panels, defaultSelectedValue: "overview", vertical: true },
};
