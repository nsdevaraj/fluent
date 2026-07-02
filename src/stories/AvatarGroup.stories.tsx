import type { Meta, StoryObj } from "@storybook/react";
import { AvatarGroup } from "../components/ui/AvatarGroup";

const meta: Meta<typeof AvatarGroup> = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "AvatarGroup renders a stacked or spread cluster of Avatar components, used to represent a group of people associated with an item — such as file collaborators, meeting attendees, or team members.",
      },
    },
  },
  argTypes: {
    layout: { control: "select", options: ["spread", "stack", "pie"] },
    size: { control: "select", options: [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128] },
  },
};
export default meta;

type Story = StoryObj<typeof AvatarGroup>;

const members = [
  { name: "Alice Chen",   initials: "AC" },
  { name: "Bob Smith",    initials: "BS" },
  { name: "Carol Jones",  initials: "CJ" },
  { name: "David Lee",    initials: "DL" },
  { name: "Eva Martinez", initials: "EM" },
];

export const Spread: Story = {
  args: { members, layout: "spread", size: 32 },
};

export const Stack: Story = {
  args: { members, layout: "stack", size: 32 },
};

export const Pie: Story = {
  args: { members, layout: "pie", size: 32 },
};

export const WithOverflow: Story = {
  args: {
    members: [...members, { name: "Frank Brown", initials: "FB" }, { name: "Gina White", initials: "GW" }],
    layout: "stack",
    size: 32,
    maxVisible: 4,
  },
};

export const Large: Story = {
  args: { members: members.slice(0, 3), layout: "spread", size: 48 },
};

export const Small: Story = {
  args: { members: members.slice(0, 3), layout: "stack", size: 24 },
};
