import type { Meta, StoryObj } from "@storybook/react";
import { MessageBar } from "../components/ui";

const meta: Meta<typeof MessageBar> = {
  title: "Phase 3/MessageBar",
  component: MessageBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "MessageBar communicates important state or contextual information about the entire application or a specific surface. Information persists until the user performs a required action — it is not transient like a Toast.\n\n**When to use:** Persistent status information important enough to stay on screen until dismissed or acted upon — unsaved changes warnings, service degradation banners, feature info notes.\n\n**When NOT to use:** Brief transient notifications that auto-dismiss (use Toast). Very long message content (keep under 100 characters). Multiple unrelated messages (group related ones in a MessageBarGroup).",
      },
    },
  },
  argTypes: {
    intent:      { control: "select", options: ["info","success","warning","error"] },
    dismissible: { control: "boolean" },
    title:       { control: "text" },
    children:    { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof MessageBar>;

export const Info: Story = {
  args: { intent: "info", title: "Info", children: "Your session will expire in 10 minutes." },
};

export const Success: Story = {
  args: { intent: "success", title: "Saved", children: "Your changes have been saved." },
};

export const Warning: Story = {
  args: { intent: "warning", title: "Warning", children: "This action cannot be undone." },
};

export const Error: Story = {
  args: { intent: "error", title: "Error", children: "Failed to load data. Please try again." },
};

export const Dismissible: Story = {
  args: {
    intent: "info",
    title: "Dismissible",
    children: "Click the X to dismiss.",
    dismissible: true,
    onDismiss: () => alert("dismissed"),
  },
};

export const WithActions: Story = {
  args: {
    intent: "warning",
    title: "Update available",
    children: "A new version is available.",
    actions: [
      { label: "Update now", onClick: () => alert("update") },
      { label: "Remind later", onClick: () => alert("later") },
    ],
  },
};
