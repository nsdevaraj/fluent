import type { Meta, StoryObj } from "@storybook/react";
import { UserAvatar } from "../components/ui/UserAvatar";

const meta: Meta<typeof UserAvatar> = {
  title: "Components/UserAvatar",
  component: UserAvatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "UserAvatar is a graphical representation of a user displayed as an image, initials, or fallback icon in a circular container. Wraps Fluent's Avatar with sensible defaults for user identity contexts.",
      },
    },
  },
  argTypes: {
    size:     { control: "select", options: [16,20,24,28,32,36,40,48,56,64,72,96,120,128] },
    shape:    { control: "select", options: ["circular","square"] },
    presence: { control: "select", options: ["none","available","away","busy","doNotDisturb","offline"] },
    name:     { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof UserAvatar>;

export const Default: Story = {
  args: { name: "Alice Martin", size: 32 },
};

export const WithPresenceAvailable: Story = {
  args: { name: "Bob Kane", presence: "available", size: 40 },
};

export const WithPresenceBusy: Story = {
  args: { name: "Carol Danes", presence: "busy", size: 40 },
};

export const WithPresenceAway: Story = {
  args: { name: "David Park", presence: "away", size: 40 },
};

export const WithPresenceOffline: Story = {
  args: { name: "Eve Torres", presence: "offline", size: 40 },
};

export const Large: Story = {
  args: { name: "Frank Liu", presence: "available", size: 64 },
};

export const Square: Story = {
  args: { name: "Grace Hall", size: 40, shape: "square" },
};

export const CustomInitials: Story = {
  args: { name: "Unknown User", initials: "?", size: 40 },
};
