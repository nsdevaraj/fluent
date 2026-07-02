import type { Meta, StoryObj } from "@storybook/react";
import { CounterBadge } from "../components/ui/CounterBadge";

const meta: Meta<typeof CounterBadge> = {
  title: "Components/CounterBadge",
  component: CounterBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "CounterBadge displays a numeric count indicator — unread messages, notification counts — attached to a nav item, button, or avatar. Shows a dot when count is 0, and caps display at the overflowCount (default 99+).\n\n**When to use:** Indicating unread counts on nav items, buttons, or avatars — email unread count, notification badge, cart item count.\n\n**When NOT to use:** Non-count metadata (use Badge). Multiple badges on the same anchor element. Counts that don't represent unread/new items.",
      },
    },
  },
  argTypes: {
    color: { control: "select", options: ["brand", "danger", "important", "informative"] },
    size: { control: "select", options: ["tiny", "extra-small", "small", "medium", "large", "extra-large"] },
    appearance: { control: "select", options: ["filled", "ghost"] },
  },
};
export default meta;

type Story = StoryObj<typeof CounterBadge>;

export const Brand: Story = {
  args: { count: 5, color: "brand" },
};

export const Danger: Story = {
  args: { count: 99, color: "danger" },
};

export const Important: Story = {
  args: { count: 3, color: "important" },
};

export const Informative: Story = {
  args: { count: 12, color: "informative" },
};

export const Overflow: Story = {
  args: { count: 150, overflowCount: 99, color: "danger" },
};

export const ShowZero: Story = {
  args: { count: 0, showZero: true, color: "brand" },
};

export const Ghost: Story = {
  args: { count: 7, color: "brand", appearance: "ghost" },
};

export const Dot: Story = {
  args: { dot: true, color: "danger" },
};

export const Small: Story = {
  args: { count: 4, color: "brand", size: "small" },
};

export const Large: Story = {
  args: { count: 4, color: "brand", size: "large" },
};
