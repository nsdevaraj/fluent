import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/Button";
import { TeachingPopover } from "../components/ui/TeachingPopover";

const meta: Meta<typeof TeachingPopover> = {
  title: "Components/TeachingPopover",
  component: TeachingPopover,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "TeachingPopover is a specialized popover for onboarding users to new features. It supports multi-step pagination, title, body text, media, and dismiss controls — purpose-built for feature discovery flows.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof TeachingPopover>;

export const SingleStep: Story = {
  args: {
    trigger: <Button appearance="primary">What's new</Button>,
    title: "Introducing Smart Search",
    body: "Find anything faster with our new AI-powered search. Just type what you're looking for in natural language.",
    primaryAction: { label: "Try it now" },
    secondaryAction: { label: "Dismiss" },
  },
};

export const NoDismissButton: Story = {
  args: {
    trigger: <Button appearance="secondary">Help</Button>,
    title: "Keyboard shortcuts",
    body: "Press Ctrl+K to open command palette. Press ? anywhere to see all shortcuts.",
    withDismiss: false,
    primaryAction: { label: "Got it" },
  },
};

export const MultiStep: Story = {
  args: {
    trigger: <Button appearance="primary">Start tour</Button>,
    title: "Get started",
    steps: [
      {
        title: "Welcome to the dashboard",
        body: "This is your command center. Here you can see an overview of all your projects and recent activity.",
      },
      {
        title: "Create your first project",
        body: "Click the + button in the top right to create a new project. You can choose from templates or start blank.",
      },
      {
        title: "Invite your team",
        body: "Share projects with teammates by clicking Share. They'll get an email invitation to collaborate.",
      },
    ],
    primaryAction: { label: "Done" },
  },
};

export const PositionedAbove: Story = {
  args: {
    trigger: <Button appearance="secondary">Tooltip above</Button>,
    title: "Positioned above",
    body: "This teaching popover opens above its trigger.",
    positioning: "above-start",
    primaryAction: { label: "OK" },
  },
};
