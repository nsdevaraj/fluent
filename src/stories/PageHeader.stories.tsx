import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "../components/ui/PageHeader";
import { Button } from "../components/ui/Button";

const meta: Meta<typeof PageHeader> = {
  title: "Phase 2/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "PageHeader displays the top section of a page with a title, optional subtitle, breadcrumb navigation, and action buttons aligned to the header bar — establishing page identity and primary actions.",
      },
    },
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: "User Management",
  },
};

export const WithDescription: Story = {
  args: {
    title: "User Management",
    description: "Manage team members, roles, and access permissions.",
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    title: "User Management",
    description: "Manage team members, roles, and access permissions.",
    breadcrumbs: ["Home", "Admin", "Users"],
  },
};

export const WithActions: Story = {
  args: {
    title: "User Management",
    breadcrumbs: ["Home", "Admin", "Users"],
    actions: <Button appearance="primary">Add user</Button>,
  },
};

export const FullFeatured: Story = {
  args: {
    title: "User Management",
    description: "Manage team members, roles, and access permissions.",
    breadcrumbs: ["Home", "Admin", "Users"],
    actions: (
      <>
        <Button appearance="outline">Export</Button>
        <Button appearance="primary">Add user</Button>
      </>
    ),
  },
};

export const LongTitle: Story = {
  args: {
    title: "Organizational Settings & Permissions Management",
    description: "Configure organization-wide defaults for new users.",
    breadcrumbs: ["Home", "Settings", "Organization", "Permissions"],
  },
};
