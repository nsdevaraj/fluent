import type { Meta, StoryObj } from "@storybook/react";
import { Tag, TagGroup } from "../components/ui/Tag";

const tagMeta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Tag is a compact label for categorizing, filtering, or displaying metadata associated with content. Read-only by default; use InteractionTag for clickable or dismissible behavior.",
      },
    },
  },
  argTypes: {
    appearance: { control: "select", options: ["filled", "outline", "brand"] },
    size:       { control: "select", options: ["extra-small", "small", "medium"] },
    shape:      { control: "select", options: ["circular", "rounded"] },
  },
};
export default tagMeta;

type TagStory = StoryObj<typeof Tag>;

export const Filled: TagStory    = { args: { children: "React", appearance: "filled" } };
export const Outline: TagStory   = { args: { children: "TypeScript", appearance: "outline" } };
export const Brand: TagStory     = { args: { children: "New", appearance: "brand" } };
export const ExtraSmall: TagStory = { args: { children: "xs", size: "extra-small" } };
export const Dismissible: TagStory = { args: { children: "Removable", dismissible: true, value: "removable" } };

export const Group: StoryObj<typeof TagGroup> = {
  render: () => (
    <TagGroup
      tags={["React", "TypeScript", "Fluent UI", "Design System", "Accessibility"]}
      maxVisible={3}
      onDismiss={(v) => console.log("dismissed", v)}
    />
  ),
};
