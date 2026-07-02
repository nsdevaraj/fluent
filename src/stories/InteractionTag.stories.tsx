import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Person20Regular } from "@fluentui/react-icons";
import { InteractionTag } from "../components/ui/InteractionTag";

const meta: Meta<typeof InteractionTag> = {
  title: "Components/InteractionTag",
  component: InteractionTag,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "InteractionTag extends Tag with interactive patterns — clickable for filtering/navigation, or dismissible so users can remove a selection. Used in filter bars and multi-select tag inputs.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["extra-small", "small", "medium"] },
    appearance: { control: "select", options: ["filled", "outline", "brand"] },
    shape: { control: "select", options: ["rounded", "circular", "square"] },
  },
};
export default meta;

type Story = StoryObj<typeof InteractionTag>;

export const Default: Story = {
  args: {
    tags: [
      { value: "react",  label: "React" },
      { value: "ts",     label: "TypeScript" },
      { value: "fluent", label: "Fluent UI" },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    tags: [
      { value: "alice", label: "Alice Chen",  icon: <Person20Regular />, secondaryText: "Engineering" },
      { value: "bob",   label: "Bob Smith",   icon: <Person20Regular />, secondaryText: "Design" },
      { value: "carol", label: "Carol Jones", icon: <Person20Regular />, secondaryText: "Product" },
    ],
  },
};

export const Dismissible: Story = {
  render: () => {
    const [tags, setTags] = useState([
      { value: "react",  label: "React" },
      { value: "ts",     label: "TypeScript" },
      { value: "fluent", label: "Fluent UI" },
    ]);
    return (
      <InteractionTag
        tags={tags}
        dismissible
        onDismiss={(value) => setTags((t) => t.filter((tag) => tag.value !== value))}
      />
    );
  },
};

export const Outline: Story = {
  args: {
    tags: [
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
    ],
    appearance: "outline",
  },
};

export const Brand: Story = {
  args: {
    tags: [
      { value: "a", label: "Featured" },
      { value: "b", label: "New" },
    ],
    appearance: "brand",
  },
};

export const ExtraSmall: Story = {
  args: {
    tags: [
      { value: "a", label: "Tag A" },
      { value: "b", label: "Tag B" },
      { value: "c", label: "Tag C" },
    ],
    size: "extra-small",
  },
};
