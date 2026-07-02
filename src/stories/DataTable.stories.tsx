import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FluentProvider } from "@fluentui/react-components";
import { DataTable } from "../components/ui";
import { darkTheme } from "../themes";

interface User {
  id: number;
  name: string;
  role: string;
  status: string;
  joined: string;
}

const users: User[] = [
  { id: 1, name: "Alice Johnson", role: "Admin", status: "Active", joined: "2022-01-15" },
  { id: 2, name: "Bob Chen", role: "Developer", status: "Active", joined: "2022-03-20" },
  { id: 3, name: "Carol White", role: "Designer", status: "Inactive", joined: "2021-11-01" },
  { id: 4, name: "David Kim", role: "Manager", status: "Active", joined: "2023-06-10" },
  { id: 5, name: "Eve Martinez", role: "Developer", status: "Active", joined: "2023-02-28" },
];

const columns = [
  { columnId: "name", label: "Name", renderCell: (u: User) => u.name, sortable: true },
  { columnId: "role", label: "Role", renderCell: (u: User) => u.role, sortable: true },
  { columnId: "status", label: "Status", renderCell: (u: User) => u.status },
  { columnId: "joined", label: "Joined", renderCell: (u: User) => u.joined, sortable: true },
];

const meta: Meta = {
  title: "Phase 3/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "DataTable is a full-featured data grid built on Fluent's Table components, supporting sorting, selection, pagination, and custom cell rendering for structured datasets.",
      },
    },
  },
  argTypes: {
    selectionMode: { control: "select", options: ["single","multiselect","none"] },
    pageSize:      { control: "number" },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <DataTable items={users} columns={columns} />,
};

export const WithSelection: Story = {
  render: () => <DataTable items={users} columns={columns} selectionMode="multiselect" />,
};

export const WithPagination: Story = {
  render: () => <DataTable items={users} columns={columns} pageSize={2} />,
};

export const Loading: Story = {
  render: () => <DataTable items={users} columns={columns} loading />,
};

export const Empty: Story = {
  render: () => <DataTable items={[]} columns={columns} emptyMessage="No users found" />,
};

// ── Theme stories ─────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  decorators: [(Story) => <FluentProvider theme={darkTheme}><div style={{padding:"1rem"}}><Story /></div></FluentProvider>],
  render: () => (
    <DataTable
      columns={[
        { columnId: "name", label: "Name", renderCell: (r: any) => r.name, sortable: true },
        { columnId: "role", label: "Role",  renderCell: (r: any) => r.role },
      ]}
      items={[
        { id: 1, name: "Alice", role: "Engineer" },
        { id: 2, name: "Bob",   role: "Designer" },
      ]}
    />
  ),
};
