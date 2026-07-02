import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FluentProvider, webLightTheme, Button } from "@fluentui/react-components";
import { DSToaster, useToast } from "../components/ui";

// Helper component to use the hook
function ToastDemo({ intent, title, body }: { intent?: string; title: string; body?: string }) {
  const { showToast } = useToast();
  return (
    <Button
      appearance="primary"
      onClick={() =>
        showToast({ title, body, intent: intent as any })
      }
    >
      Show toast
    </Button>
  );
}

function Wrapper({ intent, title, body }: { intent?: string; title: string; body?: string }) {
  return (
    <FluentProvider theme={webLightTheme}>
      <DSToaster />
      <ToastDemo intent={intent} title={title} body={body} />
    </FluentProvider>
  );
}

const meta: Meta = {
  title: "Phase 3/Toast",
  component: DSToaster,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Toast displays temporary, non-blocking notifications as a brief surface overlay. Uses an imperative API via the Toaster component and useToastController hook to dispatch notifications programmatically.\n\n**When to use:** Task status updates, progress notifications, non-critical error warnings, application update announcements. Best for transient messages that don't require immediate action and can auto-dismiss.\n\n**When NOT to use:** Critical confirmations requiring explicit user acknowledgment. Avoid rendering too many toasts at once or using different positions across the app.",
      },
    },
  },
  argTypes: {
    position: { control: "select", options: ["top","top-start","top-end","bottom","bottom-start","bottom-end"] },
    limit:    { control: "number" },
  },
};
export default meta;
type Story = StoryObj;

export const Info: Story = {
  render: () => <Wrapper intent="info" title="Info" body="This is an info message." />,
};

export const Success: Story = {
  render: () => <Wrapper intent="success" title="Saved!" body="Your changes have been saved." />,
};

export const Warning: Story = {
  render: () => <Wrapper intent="warning" title="Warning" body="Disk space is running low." />,
};

export const Error: Story = {
  render: () => <Wrapper intent="error" title="Error" body="Failed to connect to the server." />,
};
