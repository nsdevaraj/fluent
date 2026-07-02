import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Document20Regular, Folder20Regular, FolderOpen20Regular } from "@fluentui/react-icons";
import { Tree } from "../components/ui/Tree";

const meta: Meta<typeof Tree> = {
  title: "Components/Tree",
  component: Tree,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Tree displays hierarchical data in a collapsible and expandable structure, rendering parent-child relationships with indentation and expand/collapse controls. Use FlatTree for externally managed data.",
      },
    },
  },
  argTypes: {
    selectionMode: { control: "select", options: ["none", "single", "multiselect"] },
    size: { control: "select", options: ["small", "medium"] },
    appearance: { control: "select", options: ["subtle", "transparent"] },
  },
};
export default meta;

type Story = StoryObj<typeof Tree>;

const fileTree = [
  {
    id: "src",
    label: "src",
    icon: <Folder20Regular />,
    children: [
      {
        id: "components",
        label: "components",
        icon: <FolderOpen20Regular />,
        children: [
          { id: "button",    label: "Button.tsx",    icon: <Document20Regular /> },
          { id: "input",     label: "TextField.tsx", icon: <Document20Regular /> },
        ],
      },
      { id: "app",    label: "App.tsx",    icon: <Document20Regular /> },
      { id: "index",  label: "index.tsx",  icon: <Document20Regular /> },
    ],
  },
  { id: "package",  label: "package.json", icon: <Document20Regular /> },
  { id: "tsconfig", label: "tsconfig.json",icon: <Document20Regular /> },
];

export const Default: Story = {
  args: { items: fileTree, "aria-label": "File tree" },
};

export const SingleSelect: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <Tree
        items={fileTree}
        aria-label="Single-select file tree"
        selectionMode="single"
        onSelectionChange={setSelected}
      />
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div>
        <Tree
          items={fileTree}
          aria-label="Multi-select file tree"
          selectionMode="multiselect"
          onSelectionChange={setSelected}
        />
        {selected.length > 0 && (
          <p style={{ marginTop: 8, fontSize: 13 }}>Selected: {selected.join(", ")}</p>
        )}
      </div>
    );
  },
};

export const Small: Story = {
  args: { items: fileTree, "aria-label": "Small tree", size: "small" },
};

export const FlatList: Story = {
  args: {
    "aria-label": "Flat list",
    items: [
      { id: "a", label: "Item A", icon: <Document20Regular /> },
      { id: "b", label: "Item B", icon: <Document20Regular /> },
      { id: "c", label: "Item C", icon: <Document20Regular /> },
      { id: "d", label: "Item D", icon: <Document20Regular /> },
    ],
  },
};
