import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "../components/ui/StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  title: "Phase 2/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "StatusBadge is a compact label used to communicate the status or category of an item — such as workflow states, priority levels, or lifecycle stages. Supports predefined semantic colors for common statuses.\n\n**When to use:** Displaying item states in data tables, cards, and lists — order status (Pending, Shipped, Delivered), task priority (High, Medium, Low), or lifecycle stages.\n\n**When NOT to use:** Counting items (use CounterBadge). User presence (use PresenceBadge). As a standalone interactive element — badges are non-interactive.",
      },
    },
  },
  argTypes: {
    status: {
      control: "select",
      options: ["completed", "in-progress", "blocked", "pending", "warning"],
    },
    size: {
      control: "radio",
      options: ["small", "medium"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Completed: Story = {
  args: { status: "completed" },
};

export const InProgress: Story = {
  args: { status: "in-progress" },
};

export const Blocked: Story = {
  args: { status: "blocked" },
};

export const Pending: Story = {
  args: { status: "pending" },
};

export const Warning: Story = {
  args: { status: "warning" },
};

/** Shows all five statuses at both sizes — use for visual regression baseline */
export const AllStatusesGrid: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <StatusBadge status="completed" />
        <StatusBadge status="in-progress" />
        <StatusBadge status="blocked" />
        <StatusBadge status="pending" />
        <StatusBadge status="warning" />
      </div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <StatusBadge status="completed" size="small" />
        <StatusBadge status="in-progress" size="small" />
        <StatusBadge status="blocked" size="small" />
        <StatusBadge status="pending" size="small" />
        <StatusBadge status="warning" size="small" />
      </div>
    </div>
  ),
};

export const CustomLabel: Story = {
  args: { status: "in-progress", label: "Deploying" },
};
