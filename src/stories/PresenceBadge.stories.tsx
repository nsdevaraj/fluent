import type { Meta, StoryObj } from "@storybook/react";
import { PresenceBadge } from "../components/ui/PresenceBadge";

const meta: Meta<typeof PresenceBadge> = {
  title: "Components/PresenceBadge",
  component: PresenceBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "PresenceBadge conveys a user's online status — available, away, busy, do-not-disturb, offline, out-of-office, or unknown. Typically positioned on an Avatar in communication surfaces.\n\n**When to use:** Communication surfaces where a user's availability status matters — chat applications, meeting participants, contact lists.\n\n**When NOT to use:** Non-person entities (use a status indicator or Badge instead). Surfaces where presence information is irrelevant or distracting.",
      },
    },
  },
  argTypes: {
    status: {
      control: "select",
      options: ["available", "away", "busy", "do-not-disturb", "offline", "out-of-office", "unknown"],
    },
    size: { control: "select", options: ["tiny", "extra-small", "small", "medium", "large", "extra-large"] },
    outOfOffice: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof PresenceBadge>;

export const Available: Story = {
  args: { status: "available" },
};

export const Away: Story = {
  args: { status: "away" },
};

export const Busy: Story = {
  args: { status: "busy" },
};

export const DoNotDisturb: Story = {
  args: { status: "do-not-disturb" },
};

export const Offline: Story = {
  args: { status: "offline" },
};

export const OutOfOffice: Story = {
  args: { status: "out-of-office" },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      {(["available", "away", "busy", "do-not-disturb", "offline", "out-of-office", "unknown"] as const).map((s) => (
        <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <PresenceBadge status={s} size="medium" />
          <span style={{ fontSize: 10 }}>{s}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      {(["tiny", "extra-small", "small", "medium", "large", "extra-large"] as const).map((size) => (
        <PresenceBadge key={size} status="available" size={size} />
      ))}
    </div>
  ),
};
