import type { Meta, StoryObj } from "@storybook/react";
import { Copy20Regular, Delete20Regular, Edit20Regular, MoreHorizontal20Regular } from "@fluentui/react-icons";
import { Button } from "../components/ui/Button";
import { Menu } from "../components/ui/Menu";

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Menu presents a contextual overlay of actionable items, checkable items, radio groups, or nested submenus, triggered by a button or interactive element and dismissed on selection or outside click.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Menu>;

const basicItems = [
  { id: "edit",   label: "Edit",   icon: <Edit20Regular /> },
  { id: "copy",   label: "Copy",   icon: <Copy20Regular /> },
  { id: "delete", label: "Delete", icon: <Delete20Regular />, danger: true },
];

export const Default: Story = {
  args: {
    trigger: <Button appearance="secondary">Open menu</Button>,
    items: basicItems,
  },
};

export const WithDivider: Story = {
  args: {
    trigger: <Button appearance="secondary">Actions</Button>,
    items: [
      { id: "edit",   label: "Edit",   icon: <Edit20Regular /> },
      { id: "copy",   label: "Copy",   icon: <Copy20Regular /> },
      { id: "div-1",  type: "divider" },
      { id: "delete", label: "Delete", icon: <Delete20Regular />, danger: true },
    ],
  },
};

export const WithShortcuts: Story = {
  args: {
    trigger: <Button appearance="secondary">Edit</Button>,
    items: [
      { id: "undo",  label: "Undo",  shortcut: "⌘Z" },
      { id: "redo",  label: "Redo",  shortcut: "⌘⇧Z" },
      { id: "div",   type: "divider" },
      { id: "cut",   label: "Cut",   shortcut: "⌘X" },
      { id: "copy",  label: "Copy",  shortcut: "⌘C" },
      { id: "paste", label: "Paste", shortcut: "⌘V" },
    ],
  },
};

export const WithGroupHeaders: Story = {
  args: {
    trigger: <Button appearance="secondary">File</Button>,
    items: [
      { id: "h1",   type: "group-header", label: "Create" },
      { id: "new",  label: "New document" },
      { id: "dup",  label: "Duplicate" },
      { id: "h2",   type: "group-header", label: "Manage" },
      { id: "move", label: "Move to…" },
      { id: "del",  label: "Delete", danger: true },
    ],
  },
};

export const WithDisabledItems: Story = {
  args: {
    trigger: <Button appearance="secondary">Options</Button>,
    items: [
      { id: "a", label: "Available action" },
      { id: "b", label: "Unavailable action", disabled: true },
      { id: "c", label: "Another action" },
    ],
  },
};

export const IconTrigger: Story = {
  args: {
    trigger: <Button appearance="subtle" icon={<MoreHorizontal20Regular />} aria-label="More actions" />,
    items: basicItems,
  },
};
