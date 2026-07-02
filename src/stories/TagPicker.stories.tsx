import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TagPicker } from "../components/ui/TagPicker";

const meta: Meta<typeof TagPicker> = {
  title: "Components/TagPicker",
  component: TagPicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "TagPicker combines a text search input with a tag display area, letting users select multiple items from a searchable list and display them as removable tags. It's ideal for assigning people, labels, or categories from large option sets.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof TagPicker>;

const people = [
  { value: "alice", label: "Alice Chen",  description: "Engineering" },
  { value: "bob",   label: "Bob Smith",   description: "Design" },
  { value: "carol", label: "Carol Jones", description: "Product" },
  { value: "david", label: "David Lee",   description: "Marketing" },
  { value: "eva",   label: "Eva Martinez",description: "Sales" },
];

export const Default: Story = {
  args: { label: "Assignees", options: people, placeholder: "Search people…" },
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["alice"]);
    return (
      <TagPicker
        label="Team members"
        options={people}
        selectedValues={selected}
        onChange={setSelected}
        placeholder="Add members…"
      />
    );
  },
};

export const Required: Story = {
  args: { label: "Required field", options: people, required: true },
};

export const WithValidation: Story = {
  args: {
    label: "Reviewers",
    options: people,
    validationState: "error",
    validationMessage: "At least one reviewer is required",
  },
};

export const Disabled: Story = {
  args: { label: "Assignees", options: people, disabled: true },
};

export const WithHint: Story = {
  args: {
    label: "CC",
    options: people,
    hint: "These people will receive a copy of the notification",
  },
};

export const NoLabel: Story = {
  args: { "aria-label": "Filter tags", options: people, placeholder: "Filter by tag…" },
};
